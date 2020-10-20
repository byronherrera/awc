QoDesk.ConsultaciudadanaWindow = Ext.extend(Ext.app.Module, {
    id: 'consultaciudadana',
    type: 'desktop/consultaciudadana',

    init: function () {
        this.launcher = {
            text: 'Consultaciudadana',
            iconCls: 'consultaciudadana-icon',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function () {
        var desktop = this.app.getDesktop();
        // define a que tiene acceso los funcionario de acuerdo al perfil

        var accesosSecretaria = this.app.isAllowedTo('accesosSecretaria', this.id);
        var accesosInstruccion = this.app.isAllowedTo('accesosInstruccion', this.id);
        var accesosResolucion = this.app.isAllowedTo('accesosResolucion', this.id);
        var accesosEjecucion = this.app.isAllowedTo('accesosEjecucion', this.id);
        var accesosAdministrador = this.app.isAllowedTo('accesosAdministrador', this.id);
        var accesosConsultas = this.app.isAllowedTo('accesosConsultas', this.id);


        var win = desktop.getWindow('grid-win-consultaciudadana');

        var urlConsultaciudadanaLocal = "modules/desktop/consultaciudadana/server/";

        this.urlConsultaciudadanaLocal = urlConsultaciudadanaLocal;
        var winWidth = desktop.getWinWidth();
        var winHeight = desktop.getWinHeight();
        //inicio combo activo
        storeSASINO = new Ext.data.JsonStore({
            root: 'users',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                users: [
                    {"id": 1, "nombre": "Si"},
                    {"id": 0, "nombre": "No"}

                ]
            }
        });

        var comboSASINO = new Ext.form.ComboBox({
            id: 'comboSASINO',
            store: storeSASINO,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function consultaciudadanaActivo(id) {
            var index = storeSASINO.findExact('id', id);
            if (index > -1) {
                var record = storeSASINO.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo activo

        var textField = new Ext.form.TextField({allowBlank: false});

        function formatDate(value) {
            return value ? value.dateFormat('Y-m-d H:i') : '';
        }

        var formatoFechaMax = new Ext.form.DateField({
            format: 'Y-m-d',
            background: '#0000ff'
        });

        function renderGeneraImagen(value, id, r) {
            return '<input type="button" value="Genera Imagen' + value + ' " id="' + value + '"/>';
        }

        function llenaVideo(canvasId, videoSubidoId, nombreArchivoSubido) {
            var canvas = document.getElementById(canvasId);
            var video = document.getElementById(videoSubidoId);
            canvas.width = 200;
            canvas.height = 157;
            canvas.getContext('2d').drawImage(video, 0, 0, 300, 150);

            var Pic = document.getElementById(canvasId).toDataURL("image/png");
            Pic = Pic.replace(/^data:image\/(png|jpg);base64,/, "")

            Ext.Ajax.request({
                url: urlConsultaciudadanaLocal + 'uploadimagen.php',
                method: 'POST',
                params: {
                    imageData: Pic,
                    nombreArchivoSubido: nombreArchivoSubido
                },
                success: function (response, opts) {
                    var obj = Ext.decode(response.responseText);

                },
                failure: function (response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        }

        //Consultaciudadana tab
        var proxyConsultaciudadana = new Ext.data.HttpProxy({
            api: {

                create: urlConsultaciudadanaLocal + "crudConsultaciudadana.php?operation=insert",
                read: urlConsultaciudadanaLocal + "crudConsultaciudadana.php?operation=select",
                update: urlConsultaciudadanaLocal + "crudConsultaciudadana.php?operation=upda",
                destroy: urlConsultaciudadanaLocal + "crudConsultaciudadana.php?operation=delete"
            }
        });

        var readerConsultaciudadana = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: false},
                {name: 'cedula', allowBlank: false},
                {name: 'nombres', allowBlank: false},
                {name: 'apellidos', allowBlank: false},
                {name: 'correoelectronico', allowBlank: false},
                {name: 'celular', allowBlank: false},
                {name: 'solicitud', allowBlank: false},
                {name: 'observaciones', allowBlank: false},
                {name: 'idzonal', allowBlank: false},
                {name: 'zonal', allowBlank: false},
                {name: 'imagencedula', allowBlank: false},
                {name: 'fecha', type: 'date', dateFormat: 'c', allowBlank: true},

                {name: 'secretaria_id_secretaria', allowBlank: false},
                {name: 'secretaria_confirmed', allowBlank: false},
                {name: 'secretaria_motivonegar', allowBlank: false},
                {name: 'secretaria_fecha_procesado', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'secretaria_sitra_respuesta', allowBlank: false},
                {name: 'secretaria_url_respuesta', allowBlank: false},
                {name: 'secretaria_procesado', allowBlank: false},

                {name: 'ip', allowBlank: false}
            ]
        });

        var writerConsultaciudadana = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        var storeConsultaciudadana = new Ext.data.Store({
            id: "storeConsultaciudadana",
            proxy: proxyConsultaciudadana,
            reader: readerConsultaciudadana,
            writer: writerConsultaciudadana,
            autoSave: true
        });
        storeConsultaciudadana.load();
        limiteconsultaciudadana = 50

        this.storeConsultaciudadana = storeConsultaciudadana;

        this.gridConsultaciudadana = new Ext.grid.EditorGridPanel({
            height: 200,
            widht: '100%',
            store: storeConsultaciudadana, columns: [
                new Ext.grid.RowNumberer({width: 40})
                , {header: 'Id', dataIndex: 'id', sortable: true, width: 60, scope: this}
                , {
                    header: 'Finalizado',
                    dataIndex: 'secretaria_confirmed',
                    sortable: true,
                    width: 170,
                    scope: this
                }
                , {
                    header: 'SITRA',
                    dataIndex: 'secretaria_sitra_respuesta',
                    sortable: true,
                    width: 70,
                    scope: this
                }
                , {
                    header: 'Procesado',
                    dataIndex: 'secretaria_procesado',
                    sortable: true,
                    width: 70,
                    scope: this
                }
                , {
                    header: 'Fecha respuesta',
                    dataIndex: 'secretaria_fecha_procesado',
                    sortable: true,
                    width: 100,
                    renderer: formatDate
                }

                , {header: 'cedula', dataIndex: 'cedula', sortable: true, width: 70, scope: this}
                , {header: 'nombres', dataIndex: 'nombres', sortable: true, width: 120, scope: this}
                , {header: 'apellidos', dataIndex: 'apellidos', sortable: true, width: 120, scope: this}
                , {header: 'Correo electronico', dataIndex: 'correoelectronico', sortable: true, width: 180, scope: this}
                , {header: 'Celular', dataIndex: 'celular', sortable: true, width: 100, scope: this}
                , {header: 'Zonal', dataIndex: 'zonal', sortable: true, width: 80, scope: this}
                , {header: 'Imagen cédula', dataIndex: 'imagenaluae', sortable: true, width: 50, scope: this}
                , {header: 'Fecha', dataIndex: 'fecha', sortable: true, width: 100, renderer: formatDate}
                , {header: 'observaciones', dataIndex: 'observaciones', sortable: true, width: 280, scope: this}
            ],
            viewConfig: {
                forceFit: false,
                getRowClass: function (record, index) {
                    if (record.get('procesado') == 'false') return 'gold';
                }
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: function (sm, row, rec) {
                        this.record = rec;
                        this.idDenunciasRecuperada = rec.id;
                        /*cargar el formulario*/
                        cargaDetalle(rec.id, this.formConsultaciudadanaDetalle, rec);
                        Ext.getCmp('tb_negarconsultaciudadana').setDisabled(true);
                        if (accesosSecretaria) {
                            if (this.record.get("procesado") == 'true') {
                                //         Ext.getCmp('tb_negarconsultaciudadana').setDisabled(true);
                                Ext.getCmp('tb_aprobarconsultaciudadana').setDisabled(true);
                                Ext.getCmp('motivoNegarDenuncia').setDisabled(true);
                                Ext.getCmp('codigo_tramite_formulario').setDisabled(true);
                            }
                            else {
                                //       Ext.getCmp('tb_negarconsultaciudadana').setDisabled(false);
                                // Ext.getCmp('tb_aprobarconsultaciudadana').setDisabled(false);
                                Ext.getCmp('motivoNegarDenuncia').setDisabled(false);
                                Ext.getCmp('codigo_tramite_formulario').setDisabled(false);
                            }
                        } else {
                            //    Ext.getCmp('tb_negarconsultaciudadana').setDisabled(true);
                            Ext.getCmp('tb_aprobarconsultaciudadana').setDisabled(true);
                            Ext.getCmp('motivoNegarDenuncia').setDisabled(true);
                            Ext.getCmp('codigo_tramite_formulario').setDisabled(true);
                        }
                    }
                }
            }),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: limiteconsultaciudadana,
                store: storeConsultaciudadana,
                displayInfo: true,
                displayMsg: 'Mostrando solicitudes consultas ciudadanas {0} - {1} of {2}',
                emptyMsg: "No existen consultas ciudadanas que mostrar"
            }),
        });
        //fin Consultaciudadana tab

        var win = desktop.getWindow('layout-win');

        if (!win) {

            var checkHandler = function (item, checked) {
                if (checked) {
                    var store = this.storeConsultaciudadana;
                    store.baseParams.filterField = item.key;
                    searchFieldBtn.setText(item.text);
                }
            };

            var searchFieldBtn = new Ext.Button({
                menu: new Ext.menu.Menu({
                    items: [
                        {
                            checked: true,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'codigo_tramite',
                            scope: this,
                            text: 'Código trámite'
                        }
                        , {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'cedula',
                            scope: this,
                            text: 'Cédula'
                        }
                        , {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'apellido',
                            scope: this,
                            text: 'Apellido'
                        }
                        , {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'fecha',
                            scope: this,
                            text: 'Fecha'
                        }
                        , {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'direccion',
                            scope: this,
                            text: 'Dirección'
                        }
                    ]
                })
                , text: 'Código trámite'
            });


            this.formConsultaciudadanaDetalle = new Ext.FormPanel({
                id: 'formConsultaciudadanaDetalle',
                cls: 'no-border',
                width: winWidth - 24,
                tbar: [
                    {
                        text: 'Receptar solicitud consultaciudadana',
                        scope: this,
                        handler: this.aprobarconsultaciudadana,
                        iconCls: 'save-icon',
                        disabled: true,
                        id: 'tb_aprobarconsultaciudadana',
                        formBind: true
                    }, {
                        text: 'Devolver solicitud consultaciudadana',
                        scope: this,
                        handler: this.negarconsultaciudadana,
                        iconCls: 'save-icon',
                        disabled: true,
                        id: 'tb_negarconsultaciudadana',
                        formBind: true
                    },

                    '->',
                    {
                        text: 'Denuncias anteriores:'
                        , xtype: 'tbtext',
                        id: 'textDenunciasAnteriores'
                    }
                ],
                items: [
                    {
                        activeTab: 0,
                        autoWidth: true,
                        cls: 'no-border',
                        layout: 'column',
                        items: [
                            {
                                columnWidth: 1 / 3,
                                cls: 'margen10',
                                layout: 'form',
                                monitorValid: true,
                                items: [
                                    {xtype: 'hidden', name: 'id'},
                                    {xtype: 'hidden', name: 'fecha'},
                                    {xtype: 'hidden', name: 'urlconsultaciudadana'},
                                    {xtype: 'hidden', name: 'nombres'},
                                    {xtype: 'hidden', name: 'apellidos'},
                                    {xtype: 'hidden', name: 'cedula'},
                                    {xtype: 'hidden', name: 'correoelectronico'},

                                    {xtype: 'hidden', name: 'ampliacionconsultaciudadana'},
                                    {xtype: 'hidden', name: 'direccionconsultaciudadanado'},
                                    {xtype: 'hidden', name: 'geoposicionamiento2'},
                                    {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Fecha',
                                        name: 'fecha2'
                                    },
                                    //  {xtype: 'displayfield', fieldLabel: 'Denuncia', name: 'urlconsultaciudadana2'},
                                    {
                                        xtype: 'displayfield',
                                        hideLabel: true,
                                        value: '1. DATOS DEL SOLICITANTE',
                                        cls: 'negrilla',
                                        anchor: '95%'
                                    }
                                    , {
                                        xtype: 'compositefield',
                                        fieldLabel: 'Nombres',
                                        msgTarget: 'under',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                name: 'nombres2',
                                                width: '45%',
                                                disabled: true,
                                                cls: 'disabled'
                                            },
                                            {
                                                xtype: 'textfield',
                                                name: 'apellidos2',
                                                width: '45%',
                                                margins: '0 5 0 0',
                                                disabled: true,
                                                cls: 'disabled'
                                            }
                                        ]
                                    }
                                    , {xtype: 'displayfield', fieldLabel: 'Email', name: 'correoelectronico2'}
                                    , {xtype: 'displayfield', fieldLabel: 'Cédula', name: 'cedula2'}
                                    , {
                                        xtype: 'compositefield',
                                        fieldLabel: 'Teléfonos',
                                        msgTarget: 'under',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                name: 'celular',
                                                width: '45%',
                                                disabled: true,
                                                cls: 'disabled'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Dirección domicilio',
                                        name: 'domicilio',
                                        anchor: '96%'
                                    }
                                ]
                            },
                            {


                                cls: 'fondogris',
                                columnWidth: 1 / 3,
                                layout: 'form',
                                items: [

                                    {
                                        xtype: 'displayfield',
                                        hideLabel: true,
                                        value: '2. DATOS DE LA INFRACCIÓN',
                                        cls: 'negrilla',
                                        anchor: '95%'
                                    },
                                    {
                                        xtype: 'displayfield',
                                        fieldLabel: 'materia',
                                        name: 'materia',
                                        anchor: '96%'
                                    },
                                    {
                                        xtype: 'displayfield',
                                        fieldLabel: 'tipoadministrador',
                                        name: 'tipoadministrador',
                                        anchor: '96%'
                                    },
                                    {
                                        xtype: 'displayfield',
                                        fieldLabel: 'establecimiento',
                                        name: 'establecimiento',
                                        anchor: '96%'
                                    },
                                    {
                                        xtype: 'displayfield',
                                        fieldLabel: 'ubicacion',
                                        name: 'ubicacion',
                                        anchor: '96%'
                                    },
                                    {
                                        xtype: 'displayfield',
                                        fieldLabel: 'actividad',
                                        name: 'actividad',
                                        anchor: '96%'
                                    },
                                    {
                                        xtype: 'displayfield',
                                        fieldLabel: 'descripcion',
                                        name: 'descripcion',
                                        anchor: '96%'
                                    },
                                    {
                                        xtype: 'displayfield',
                                        fieldLabel: 'observaciones',
                                        name: 'observaciones',
                                        anchor: '96%'
                                    },
                                    {
                                        xtype: 'displayfield',
                                        fieldLabel: 'fechaacto',
                                        name: 'fechaacto',
                                        anchor: '96%'
                                    }
                                ]
                            },
                            {
                                columnWidth: 1 / 3,
                                layout: 'form',
                                cls: 'margen10',
                                items: [
                                    {
                                        xtype: 'displayfield',
                                        hideLabel: true,
                                        value: '3. ANEXOS',
                                        cls: 'negrilla',
                                        anchor: '95%'
                                    }
                                    , {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Solicitud Consulta Ciudadana',
                                        name: 'imagenasolicitud'
                                    }
                                    , {
                                        xtype: 'displayfield',
                                        fieldLabel: 'LUAE',
                                        name: 'imagenaluae'
                                    }
                                    , {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Acto Inicio',
                                        name: 'imagenactoinicio'
                                    }
                                    , {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Motivo negar',
                                        name: 'motivonegar',
                                        anchor: '95%'
                                    }
                                    , {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Total pedidos anteriores',
                                        name: 'totalconsultaciudadana',
                                        anchor: '95%'
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'SITRA',
                                        name: 'codigo_tramite',
                                        anchor: '95%',
                                        allowBlank: false,
                                        id: 'codigo_tramite_formulario',
                                        listeners: {
                                            'change': function (value, newValue, oldValue) {
                                                if (newValue != oldValue) {
                                                    Ext.getCmp('tb_aprobarconsultaciudadana').setDisabled(false);
                                                }
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Motivo negar',
                                        name: 'motivoNegarDenuncia',
                                        anchor: '95%',
                                        allowBlank: false,
                                        id: 'motivoNegarDenuncia',
                                        listeners: {
                                            'change': function (value, newValue, oldValue) {
                                                if (newValue != oldValue) {
                                                    Ext.getCmp('tb_negarconsultaciudadana').setDisabled(false);
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }

                ]
            });

            win = desktop.createWindow({
                id: 'grid-win-consultaciudadana',
                title: 'Gestión Consultaciudadana',
                width: winWidth,
                height: winHeight,
                iconCls: 'consultaciudadana-icon',
                shim: false,
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                items: new Ext.TabPanel({
                    activeTab: 0,
                    border: false,
                    items: [
                        {
                            autoScroll: true,
                            title: 'Solicitudes de Consulta Ciudadana',
                            closable: true,

                            items: [
                                {
                                    id: 'formcabeceraoperativos',
                                    titleCollapse: true,
                                    split: true,
                                    flex: 1,
                                    autoScroll: true,
                                    layout: 'column',
                                    tbar: [
                                        {
                                            id: 'recargardatos',
                                            iconCls: 'reload-icon',
                                            handler: this.requestConsultaciudadanaData,
                                            scope: this,
                                            text: 'Recargar Datos',
                                            tooltip: 'Recargar datos en la grilla'
                                        },

                                        '->'
                                        , {
                                            text: 'Buscar por:'
                                            , xtype: 'tbtext'
                                        }
                                        , searchFieldBtn
                                        , ' ', ' '
                                        , new QoDesk.QoAdmin.SearchField({
                                            paramName: 'filterText'
                                            , store: this.storeConsultaciudadana
                                        })
                                    ],
                                    items: this.gridConsultaciudadana
                                },
                                {
                                    flex: 2,
                                    bodyStyle: 'padding:0; background: #DFE8F6',
                                    layout: 'column',
                                    items: [
                                        {
                                            xtype: 'tabpanel',
                                            activeTab: 0,
                                            width: winWidth,
                                            cls: 'no-border',
                                            items: [
                                                {
                                                    title: 'Resumen Solicitud',
                                                    layout: 'column',
                                                    id: 'detalleOperativosTab',
                                                    height: winHeight - 325,
                                                    width: winWidth,
                                                    items: this.formConsultaciudadanaDetalle,
                                                    disabled: false,
                                                    autoScroll: true
                                                },
                                                /* {
                                                     title: 'Instituciones Participantes',
                                                     layout: 'column',
                                                     height: 250,
                                                     items: this.gridOperativosParticipantes,
                                                     autoScroll: true,
                                                     tbar: [
                                                         {
                                                             text: 'Nuevo',
                                                             scope: this,
                                                             //handler: this.addoperativosPersonal,
                                                             handler: this.addoperativosParticipantes,
                                                             iconCls: 'save-icon',
                                                             disabled: true,
                                                             id: 'addoperativoparticipantes'
                                                             //disabled: !acceso
                                                         },
                                                         '-',
                                                         {
                                                             text: "Eliminar",
                                                             scope: this,
                                                             handler: this.deleteoperativosPersonal,
                                                             handler: this.deleteoperativosParticipantes,
                                                             id: 'borraroperativoparticipantes',
                                                             iconCls: 'delete-icon',
                                                             //disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                                             disabled: true
                                                         }
                                                     ]
                                                 },
                                                 {
                                                     title: 'Personal asignado',
                                                     layout: 'column',
                                                     height: 250,
                                                     items: this.gridOperativosPersonal,
                                                     autoScroll: true,
                                                     tbar: [
                                                         {
                                                             text: 'Nuevo',
                                                             scope: this,
                                                             handler: this.addoperativosPersonal,
                                                             iconCls: 'save-icon',
                                                             //disabled: true,
                                                             id: 'addoperativodetalle',
                                                             //disabled: !acceso
                                                         },
                                                         '-',
                                                         {
                                                             text: "Eliminar",
                                                             scope: this,
                                                             handler: this.deleteoperativosPersonal,
                                                             id: 'borraroperativodetalle',
                                                             iconCls: 'delete-icon',
                                                             //disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                                             //disabled: true
                                                         }
                                                     ]
                                                 },*/

                                            ]
                                        }

                                    ]
                                }
                            ]
                        },
                        /* {
                             title: 'Reportes',
                             closable: true,
                             layout: 'border',
                             //disabled: this.app.isAllowedTo('accesosOperativos', this.id) ? false : true,
                             tbar: [
                                 {
                                     iconCls: 'reload-icon',
                                     handler: this.requestGridDataDocumentoReporte,
                                     scope: this,
                                     text: 'Buscar'

                                 },
                                 {
                                     iconCls: 'reload-icon',
                                     handler: this.requestGridDataDocumentoReporteReset,
                                     scope: this,
                                     text: 'Borrar formulario'

                                 },
                                 {
                                     xtype: 'checkbox',
                                     boxLabel: 'Detalle acciones',
                                     id: 'checkDetalleAcciones',
                                     name: 'detalleacciones',
                                     checked: false,
                                     inputValue: '1',
                                     tooltip: 'Detalle de las acciones efectuados en el reporte',
                                     cls: 'barramenu',
                                     handler: function (checkbox, isChecked) {
                                     }
                                 }, {
                                     xtype: 'checkbox',
                                     boxLabel: 'Detalle actas',
                                     id: 'checkDetalleActas',
                                     name: 'detalleactas',
                                     checked: false,
                                     inputValue: '1',
                                     tooltip: 'Detalle de las actas efectuados en el reporte',
                                     cls: 'barramenu',
                                     handler: function (checkbox, isChecked) {
                                     }
                                 }, {
                                     xtype: 'checkbox',
                                     boxLabel: 'Detalle retiros',
                                     id: 'checkDetalleRecibidos',
                                     name: 'detalleretiros',
                                     checked: false,
                                     inputValue: '1',
                                     tooltip: 'Detalle de los retiros efectuados en el reporte',
                                     cls: 'barramenu',
                                     handler: function (checkbox, isChecked) {
                                     }
                                 }, {
                                     xtype: 'checkbox',
                                     boxLabel: 'Totales personal',
                                     id: 'checkTotalesPersonal',
                                     name: 'totalespersonal',
                                     checked: false,
                                     inputValue: '1',
                                     tooltip: 'Detalle de los retiros efectuados en el reporte',
                                     cls: 'barramenu',
                                     handler: function (checkbox, isChecked) {
                                     }
                                 }, '-',

                                 {
                                     iconCls: 'excel-icon',
                                     handler: this.botonExportarDocumentoReporte,
                                     scope: this,
                                     text: 'Exportar listado',
                                     tooltip: 'Se genera archivo Excel con la información solicitada'
                                 },
                                 {
                                     iconCls: 'excel-icon',
                                     handler: this.botonExportarDocumentoReporteCalendarioPersonal,
                                     scope: this,
                                     text: 'Calendario  personas',
                                     tooltip: 'Se genera archivo Excel con la información solicitada'
                                 }
                                 ,
                                 {
                                     iconCls: 'excel-icon',
                                     handler: this.botonExportarDocumentoReporteCalendarioOperativos,
                                     scope: this,
                                     text: 'Calendario  operativos',
                                     tooltip: 'Se genera archivo Excel con la información solicitada'
                                 }
                                 ,
                                 {
                                     iconCls: 'excel-icon',
                                     handler: this.botonExportarDocumentoReporteTotalOperativos,
                                     scope: this,
                                     text: 'Operativos tiempo',
                                     tooltip: 'Se genera archivo Excel con total tiempo por operativo'
                                 }
                             ],
                             items: [
                                 {
                                     region: 'north',
                                     height: 175,
                                     minSize: 100,
                                     maxSize: 170,
                                     closable: true,
                                     autoScroll: false,
                                     items: this.formConsultaDocumentos
                                 },
                                 {
                                     // lazily created panel (xtype:'panel' is default)
                                     region: 'center',
                                     split: true,
                                     autoScroll: true,
                                     height: 270,
                                     minSize: 100,
                                     maxSize: 150,
                                     items: this.gridDocumentosReporte
                                 }
                             ]

                             //this.gridReportes
                         } */
                    ]
                })
            });
        }
        win.show();

        function cargaDetalle(consultaciudadana, forma, bloqueo) {
            forma = Ext.getCmp('formConsultaciudadanaDetalle');
            forma.getForm().load({
                waitMsg: 'Recuperando información',
                url: urlConsultaciudadanaLocal + 'crudConsultaciudadana.php?operation=selectForm',
                params: {
                    id: consultaciudadana
                },
                success: function (response, opts) {
                    mensaje = Ext.getCmp('textDenunciasAnteriores');
                    mensaje.setText('Solicitudes consultaciudadana anteriores: ' + (response.findField('totalconsultaciudadana').getValue() - 1))
                }

            });

        };

        function bloquearLectura(forma, activar) {
            Ext.getCmp('id_persona').setReadOnly(activar);
            Ext.getCmp('recepcion_documento').setReadOnly(activar);
            Ext.getCmp('id_tipo_documento').setReadOnly(activar);
            Ext.getCmp('num_documento').setReadOnly(activar);
            Ext.getCmp('remitente').setReadOnly(activar);
            Ext.getCmp('cedula').setReadOnly(activar);
            Ext.getCmp('email').setReadOnly(activar);
            Ext.getCmp('descripcion_anexos').setReadOnly(activar);
            Ext.getCmp('cantidad_fojas').setReadOnly(activar);
            Ext.getCmp('asunto').setReadOnly(activar);
            Ext.getCmp('id_caracter_tramite').setReadOnly(activar);
            Ext.getCmp('observacion_secretaria').setReadOnly(activar);
            Ext.getCmp('reasignacion').setReadOnly(activar);
        };

    },
    aprobarconsultaciudadana: function () {
        store = this.storeConsultaciudadana;

        var urlConsultaciudadanaLocal = this.urlConsultaciudadanaLocal;
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Desea aprobar la consultaciudadana.<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var myForm = Ext.getCmp('formConsultaciudadanaDetalle').getForm();
                    myForm.submit({
                        url: urlConsultaciudadanaLocal + 'crudConsultaciudadana.php?operation=aprobarDenuncia',
                        method: 'POST',
                        waitMsg: 'Saving data',
                        success: function (form, action) {
                            //se actualiza tabla en la web
                            var dataReceived = JSON.parse(action.response.responseText);
                            myForm.submit({
                                url: urlConsultaciudadanaLocal + 'crudConsultaciudadana.php?operation=aprobarDenuncia',
                                method: 'POST',
                                waitMsg: 'Saving data',
                                params: {
                                    codigo_tramite: dataReceived.data
                                },
                                success: function (form, action) {
                                    Ext.getCmp('tb_negarconsultaciudadana').setDisabled(true);
                                    Ext.getCmp('tb_aprobarconsultaciudadana').setDisabled(true);
                                    storeConsultaciudadana.load();
                                },
                                failure: function (form, action) {
                                    var errorJson = JSON.parse(action.response.responseText);
                                    Ext.Msg.show({
                                        title: 'Error campos obligatorios'
                                        , msg: errorJson.msg
                                        , modal: true
                                        , icon: Ext.Msg.ERROR
                                        , buttons: Ext.Msg.OK
                                    });
                                }
                            });
                        },
                        failure: function (form, action) {
                            var errorJson = JSON.parse(action.response.responseText);
                            Ext.Msg.show({
                                title: 'Error campos obligatorios'
                                , msg: errorJson.msg
                                , modal: true
                                , icon: Ext.Msg.ERROR
                                , buttons: Ext.Msg.OK
                            });
                        }
                    });

                }
            }
        });

    },
    negarconsultaciudadana: function () {
        store = this.storeConsultaciudadana;
        var urlConsultaciudadanaLocal = this.urlConsultaciudadanaLocal;
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Desea negar el consultaciudadana, .<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    Ext.getCmp('codigo_tramite_formulario').setValue("n/a");

                    var myForm = Ext.getCmp('formConsultaciudadanaDetalle').getForm();

                    myForm.submit({
                        url: urlConsultaciudadanaLocal + 'crudConsultaciudadana.php?operation=negarDenuncia',
                        method: 'POST',
                        waitMsg: 'Saving data',
                        success: function (form, action) {
                            Ext.getCmp('tb_negarconsultaciudadana').setDisabled(true);
                            Ext.getCmp('tb_aprobarconsultaciudadana').setDisabled(true);
                            // store.load();
                        },
                        failure: function (form, action) {
                            var errorJson = JSON.parse(action.response.responseText);
                            Ext.Msg.show({
                                title: 'Error campos obligatorios'
                                , msg: errorJson.msg
                                , modal: true
                                , icon: Ext.Msg.ERROR
                                , buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            }

        });
    },

    requestConsultaciudadanaParticipantesData: function () {
        this.storeConsultaciudadanaParticipantes.load();
    },
    requestConsultaciudadanaParticipantesDataExport: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Descargue el archivo xls  .<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/consultaciudadana/server/ConsultaciudadanaParticipantes.php';
                }
            }
        });
    },
    requestConsultaciudadanaIntentosData: function () {
        this.storeConsultaciudadanaIntentos.load();
    },
    requestConsultaciudadanaIntentosDataExport: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Descargue el archivo xls  .<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/consultaciudadana/server/ConsultaciudadanaIntentos.php';
                }
            }
        });
    },
    requestConsultaciudadanaData: function () {
        this.storeConsultaciudadana.load();
    },
    requestConsultaciudadanaDataExport: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Descargue el archivo xls  .<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/consultaciudadana/server/Consultaciudadana.php';
                }
            }
        });
    },
    requestConsultaciudadanaEstadisticasDataExport: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Descargue el archivo xls  .<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/consultaciudadana/server/ConsultaciudadanaEstadisticas.php';
                }
            }
        });
    }
});



