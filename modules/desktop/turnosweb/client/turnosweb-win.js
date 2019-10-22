QoDesk.TurnoswebWindow = Ext.extend(Ext.app.Module, {
    id: 'turnosweb',
    type: 'desktop/turnosweb',

    init: function () {
        this.launcher = {
            text: 'Turnosweb',
            iconCls: 'turnosweb-icon',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function () {
        var desktop = this.app.getDesktop();

        var grabarTurnos = this.app.isAllowedTo('grabarTurnos', this.id);

        var win = desktop.getWindow('grid-win-turnosweb');
        //var urlTurnosweb = "amcserver/";
        var urlTurnosweb = "http://agenciadecontrol.quito.gob.ec/amcserver/"; // servidor produccion
        var urlTurnosLocal = "modules/desktop/turnosweb/server/";

        this.urlTurnosweb = urlTurnosweb;
        this.urlTurnosLocal = urlTurnosLocal;
        var winWidth = desktop.getWinWidth();
        var winHeight = desktop.getWinHeight();
        //inicio combo activo
        storeSASINO = new Ext.data.JsonStore({
            root: 'users',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                users: [
                    {"id": "true", "nombre": "Si"},
                    {"id": "false", "nombre": "No"}
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

        function sinoOpcionProcesado(id) {
            var index = storeSASINO.findExact('id', id);
            if (index > -1) {
                var record = storeSASINO.getAt(index);
                return record.get('nombre');
            }
        }

        //inicio combo Inspector
        storePERDISTUR = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personal_distributivo'
        });

        var comboPERDISTUR = new Ext.form.ComboBox({
            id: 'comboPERDISTUR',
            store: storePERDISTUR,
            valueField: 'id',
            displayField: 'nombre',
            mode: 'local',
            forceSelection: true,
            triggerAction: 'all',
            allowBlank: false,
            typeAhead: true,
            selectOnFocus: true,
            disabled: false
        });

        function tipoUnidadesPersonalTUR(id) {
            var index = storePERDISTUR.findExact('id', id);
            if (index > -1) {
                var record = storePERDISTUR.getAt(index);
                return record.get('nombre');
            }
        }
        //fin combo Inspector

        function turnoswebActivo(id) {
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



        //Turnosweb tab
        var proxyTurnosweb = new Ext.data.HttpProxy({
            api: {
                create: urlTurnosweb + "crudTurnosweb.php?operation=insert",
                read: urlTurnosweb + "crudTurnosweb.php?operation=select",
                update: urlTurnosweb + "crudTurnosweb.php?operation=upda",
                destroy: urlTurnosweb + "crudTurnosweb.php?operation=delete"
            }
        });

        var readerTurnosweb = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: false},
                {name: 'asignado', allowBlank: false},
                {name: 'confirmed', allowBlank: false},
                {name: 'prosesado', allowBlank: false},
                {name: 'nombre', allowBlank: false},
                {name: 'apellido', allowBlank: false},
                {name: 'email', allowBlank: false},
                {name: 'cedula', allowBlank: false},
                {name: 'telefono1', allowBlank: false},
                {name: 'fecha', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'expediente', allowBlank: false},
                {name: 'id_inspector', allowBlank: false},
                {name: 'fechaasignada', type: 'date', dateFormat: 'c', allowBlank: true}
            ]
        });

        var writerTurnosweb = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        var storeTurnosweb = new Ext.data.Store({
            id: "storeTurnosweb",
            proxy: proxyTurnosweb,
            reader: readerTurnosweb,
            writer: writerTurnosweb,
            autoSave: true
        });
        storeTurnosweb.load();
        limiteturnosweb = 50

        this.storeTurnosweb = storeTurnosweb;

        this.gridTurnosweb = new Ext.grid.EditorGridPanel({
            height: 200,
            widht: '100%',
            store: storeTurnosweb, columns: [
                new Ext.grid.RowNumberer({width: 40})
                , {header: 'Id', dataIndex: 'id', sortable: true, width: 10, scope: this}
                , {header: 'Aprobado/negado', dataIndex: 'confirmed', sortable: true, width: 15, scope: this}
                , {header: 'Procesado', dataIndex: 'prosesado', sortable: true, width: 15, scope: this, renderer: sinoOpcionProcesado}
                , {header: 'Nombre', dataIndex: 'nombre', sortable: true, width: 35, scope: this}
                , {header: 'Apellido', dataIndex: 'apellido', sortable: true, width: 35, scope: this}
                , {header: 'Celular', dataIndex: 'telefono1', sortable: true, width: 35, scope: this}
                , {header: 'Cédula', dataIndex: 'cedula', sortable: true, width: 35, scope: this}
                , {header: 'Email', dataIndex: 'email', sortable: true, width: 35, scope: this}
                , {header: 'Fecha solicitud', dataIndex: 'fecha', sortable: true, width: 30, renderer: formatDate}
                , {header: 'Expediente/Informe', dataIndex: 'expediente', sortable: true, width: 30, scope: this}
                , {header: 'Asignado a (inspector)', dataIndex: 'id_inspector', sortable: true, width: 50, scope: this, renderer: tipoUnidadesPersonalTUR}
                , {header: 'Fecha cita', dataIndex: 'fechaasignada', sortable: true, width: 30, renderer: formatDate }
            ],
            viewConfig: {
                forceFit: true,
                getRowClass: function (record, index) {
                    if (record.get('prosesado') == 'false') return 'gold';
                }
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: function (sm, row, rec) {
                        this.record = rec;
                        this.idTurnosRecuperada = rec.id;
                        /*cargar el formulario*/
                        cargaDetalle(rec.id, this.formTurnoswebDetalle, rec);
                        console.log (grabarTurnos);
                        console.log (this.record.get("prosesado"));
                        if (grabarTurnos) {
                            if (this.record.get("prosesado") == 'true') {
                                Ext.getCmp('tb_negarturnos').setDisabled(true);
                                Ext.getCmp('tb_aprobarturnos').setDisabled(true);
                                Ext.getCmp('motivoNegarTurnos').setDisabled(true);
                            }
                            else {
                                Ext.getCmp('tb_negarturnos').setDisabled(false);
                                Ext.getCmp('tb_aprobarturnos').setDisabled(false);
                                Ext.getCmp('motivoNegarTurnos').setDisabled(false);
                            }
                        } else {
                            Ext.getCmp('tb_negarturnos').setDisabled(true);
                            Ext.getCmp('tb_aprobarturnos').setDisabled(true);
                            Ext.getCmp('motivoNegarTurnos').setDisabled(true);
                        }
                    }
                }
            }),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: limiteturnosweb,
                store: storeTurnosweb,
                displayInfo: true,
                displayMsg: 'Mostrando solicitudes {0} - {1} of {2}',
                emptyMsg: "No existen solicitures que mostrar"
            }),
        });
        //fin Turnosweb tab

        //var desktop = this.app.getDesktop();
        var win = desktop.getWindow('layout-win');

        if (!win) {

            var checkHandler = function (item, checked) {
                if (checked) {
                    var store = this.storeTurnosweb;
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


            this.formTurnoswebDetalle = new Ext.FormPanel({
                id: 'formTurnoswebDetalle',
                cls: 'no-border',
                items: [
                    {
                        region: 'north',
                        height: 200,

                        autoScroll: false,
                        id: 'formcabeceraturnos',
                        items: this.gridTurnosweb
                    },
                    {
                        region: 'center',
                        split: true,
                        autoScroll: true,

                        height: winHeight - 265,
                        minSize: 100,
                        margins: '0 0 0 0',
                        tbar: [
                            {
                                text: 'Aprobar turno',
                                scope: this,
                                handler: this.aprobarturnos,
                                iconCls: 'save-icon',
                                disabled: true,
                                id: 'tb_aprobarturnos'
                                , formBind: true
                            }, {
                                text: 'Negar Turno',
                                scope: this,
                                handler: this.negarturnos,
                                iconCls: 'save-icon',
                                disabled: true,
                                id: 'tb_negarturnos',
                                formBind: true
                            },
                            {
                                text: '| Motivo negar:'
                                , xtype: 'tbtext',
                            },
                            {
                                xtype: 'textfield',
                                id: 'motivoNegarTurnos',
                                disabled: true,
                                anchor: '40%',
                                width: '500'
                            },
                            '->',
                            {
                                text: 'Turnos anteriores:'
                                , xtype: 'tbtext',
                                id: 'textTurnosAnteriores'
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
                                        columnWidth: 1 / 4,
                                        cls: 'margen10',
                                        layout: 'form',
                                        monitorValid: true,
                                        items: [
                                            {xtype: 'displayfield', name: 'id'},
                                            {xtype: 'hidden', name: 'fecha'},
                                            {xtype: 'hidden', name: 'urldenuncia'},
                                            {xtype: 'hidden', name: 'nombre'},
                                            {xtype: 'hidden', name: 'apellido'},
                                            {xtype: 'hidden', name: 'cedula'},
                                            {xtype: 'hidden', name: 'email'},
                                            {xtype: 'hidden', name: 'ampliaciondenuncia'},
                                            {xtype: 'hidden', name: 'direcciondenunciado'},
                                            {xtype: 'hidden', name: 'geoposicionamiento2'},
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Fecha',
                                                name: 'fecha2'
                                            }, {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Turnos',
                                                name: 'urldenuncia2'
                                            },
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
                                                        name: 'nombre2',
                                                        width: '45%',
                                                        disabled: true,
                                                        cls: 'disabled'
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        name: 'apellido2',
                                                        width: '45%',
                                                        margins: '0 5 0 0',
                                                        disabled: true,
                                                        cls: 'disabled'
                                                    }
                                                ]
                                            }
                                            , {xtype: 'displayfield', fieldLabel: 'Email', name: 'email2'}
                                            , {xtype: 'displayfield', fieldLabel: 'Cédula', name: 'cedula2'}
                                            , {
                                                xtype: 'compositefield',
                                                fieldLabel: 'Teléfonos',
                                                msgTarget: 'under',
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        name: 'telefono1',
                                                        width: '45%',
                                                        disabled: true,
                                                        cls: 'disabled'
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        name: 'telefono2',
                                                        width: '45%',
                                                        margins: '0 5 0 0',
                                                        disabled: true,
                                                        cls: 'disabled'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Dirección',
                                                name: 'direccion',
                                                anchor: '96%'
                                            }
                                            , {
                                                xtype: 'compositefield',
                                                fieldLabel: '<span ext:qtip="Zona, Parroquia<br>Sector, Barrio">Ubicación</span>',
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        name: 'zonal',
                                                        width: '45%',
                                                        disabled: true,
                                                        cls: 'disabled'
                                                    }
                                                    , {
                                                        xtype: 'textfield',
                                                        name: 'parroquia',
                                                        width: '45%',
                                                        margins: '0 5 0 0',
                                                        disabled: true,
                                                        cls: 'disabled'
                                                    }

                                                ]
                                            }
                                            , {
                                                xtype: 'compositefield',
                                                msgTarget: 'under',
                                                fieldLabel: '<span ext:qtip="Sector, Barrio">Sector, Barrio</span>',
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        name: 'sector',
                                                        width: '45%',
                                                        disabled: true,
                                                        cls: 'disabled'
                                                    }
                                                    , {
                                                        xtype: 'textfield',
                                                        name: 'barrio',
                                                        width: '45%',
                                                        disabled: true,
                                                        cls: 'disabled',
                                                        margins: '0 5 0 0',
                                                    }

                                                ]
                                            }
                                            , {xtype: 'displayfield', fieldLabel: 'Num predio', name: 'numpredio'}

                                        ]
                                    },
                                    {
                                        cls: 'fondogris',
                                        columnWidth: 1 / 4,
                                        layout: 'form',
                                        items: [

                                            {
                                                xtype: 'displayfield',
                                                hideLabel: true,
                                                value: '2. DATOS DE LA REUNION',
                                                cls: 'negrilla',
                                                anchor: '95%'
                                            }
                                            , {xtype: 'displayfield', fieldLabel: 'Nombre', name: 'nombredenunciado'}
                                            , {xtype: 'displayfield', fieldLabel: 'Email', name: 'emaildenunciado'}
                                            , {
                                                xtype: 'compositefield',
                                                fieldLabel: 'Teléfonos',
                                                msgTarget: 'under',
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        name: 'telefono1denunciado',
                                                        width: '45%',
                                                        disabled: true,
                                                        cls: 'disabled'
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        name: 'telefono2denunciado',
                                                        width: '45%',
                                                        margins: '0 5 0 0',
                                                        disabled: true,
                                                        cls: 'disabled'
                                                    }
                                                ]
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Dirección',
                                                name: 'direcciondenunciado',
                                                anchor: '96%'
                                            }
                                            , {
                                                xtype: 'compositefield',
                                                fieldLabel: '<span ext:qtip="Zona, Parroquia<br>Sector, Barrio">Ubicación</span>',
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        name: 'zonaldenunciado',
                                                        width: '45%',
                                                        disabled: true,
                                                        cls: 'disabled'
                                                    }
                                                    , {
                                                        xtype: 'textfield',
                                                        name: 'parroquiadenunciado',
                                                        width: '45%',
                                                        margins: '0 5 0 0',
                                                        disabled: true,
                                                        cls: 'disabled'
                                                    }

                                                ]
                                            }
                                            , {
                                                xtype: 'compositefield',
                                                msgTarget: 'under',
                                                fieldLabel: '<span ext:qtip="Sector, barrio del denunciado">Sector, barrio</span>',
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        name: 'sectordenunciado',
                                                        width: '45%',
                                                        disabled: true,
                                                        cls: 'disabled'
                                                    }
                                                    , {
                                                        xtype: 'textfield',
                                                        name: 'barriodenunciado',
                                                        width: '45%',
                                                        disabled: true,
                                                        cls: 'disabled',
                                                        margins: '0 5 0 0',
                                                    }
                                                ]
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Num Predio',
                                                name: 'numprediodenunciado'
                                            }

                                        ]
                                    },
                                    {
                                        columnWidth: 2 / 4,
                                        layout: 'form',
                                        cls: 'margen10',
                                        items: [
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Infracción',
                                                name: 'infraccion',
                                                anchor: '96%'
                                            },
                                            {
                                                xtype: 'displayfield',
                                                name: 'ampliaciondenuncia2',
                                                fieldLabel: 'Ampliacion denuncia',
                                                anchor: '96%'
                                            }
                                            ,
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Coordenadas',
                                                name: 'geoposicionamiento'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Croquis',
                                                name: 'croquis'
                                            }

                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Persona',
                                                name: 'persona'
                                            }
                                            , {
                                                xtype: 'compositefield',
                                                msgTarget: 'under',
                                                fieldLabel: 'Imágenes ',
                                                items: [
                                                    {xtype: 'displayfield', name: 'imagencedula', width: '25%',}
                                                    , {xtype: 'displayfield', name: 'imagenvideo', width: '25%',}
                                                    , {xtype: 'displayfield', name: 'imagennombramiento', width: '25%',}
                                                    , {
                                                        xtype: 'textfield',
                                                        name: 'imagenvideo',
                                                        width: '1%',
                                                        disabled: true,
                                                        cls: 'disabled'
                                                    }

                                                ]
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Fecha imágenes',
                                                name: 'fechaimagenes',
                                                anchor: '95%'
                                            }
                                            , {xtype: 'displayfield', fieldLabel: 'tipo', name: 'tipo', anchor: '95%'}
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Motivo negar',
                                                name: 'motivonegar',
                                                anchor: '95%'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'total turnos',
                                                name: 'totalturnos',
                                                anchor: '95%'
                                            }
                                        ]
                                    }
                                ]
                            }

                        ]
                    }
                ]
            });

            win = desktop.createWindow({
                id: 'grid-win-turnosweb',
                title: 'Turnos web',
                width: winWidth,
                height: winHeight,
                iconCls: 'turnosweb-icon',
                shim: false,
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                tbar: [
                    {
                        id: 'recargardatos',
                        iconCls: 'reload-icon',
                        handler: this.requestTurnoswebData,
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
                        , store: this.storeTurnosweb
                    })
                ],
                items: this.formTurnoswebDetalle
            });
        }
        win.show();
        function cargaDetalle(turnos, forma, bloqueo) {
            forma = Ext.getCmp('formTurnoswebDetalle');
            forma.getForm().load({
                waitMsg: 'Recuperando información',
                url: urlTurnosweb + 'crudTurnosweb.php?operation=selectForm',
                params: {
                    id: turnos
                },
                success: function (response, opts) {
                    mensaje = Ext.getCmp('textTurnosAnteriores');
                    mensaje.setText('Turnos anteriores: ' + (response.findField('totalturnos').getValue() - 1))
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
    aprobarturnos: function () {
        store = this.storeTurnosweb;
        var urlTurnosweb = this.urlTurnosweb;
        var urlTurnosLocal = this.urlTurnosLocal;
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Desea aprobar la denuncia.<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var myForm = Ext.getCmp('formTurnoswebDetalle').getForm();
                    myForm.submit({
                        url: urlTurnosLocal + 'crudTurnosweb.php?operation=aprobarTurnos',
                        method: 'POST',
                        waitMsg: 'Saving data',
                        success: function (form, action) {
                            //se actualiza tabla en la web
                            var dataReceived = JSON.parse(action.response.responseText);
                            myForm.submit({
                                url: urlTurnosweb + 'crudTurnosweb.php?operation=aprobarTurnos',
                                method: 'POST',
                                waitMsg: 'Saving data',
                                params: {
                                    codigo_tramite: dataReceived.data
                                },
                                success: function (form, action) {
                                    Ext.getCmp('tb_negarturnos').setDisabled(true);
                                    Ext.getCmp('tb_aprobarturnos').setDisabled(true);
                                    store.load();
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
    negarturnos: function () {
        store = this.storeTurnosweb;
        var urlTurnosweb = this.urlTurnosweb;
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Desea negar la denuncia, .<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var myForm = Ext.getCmp('formTurnoswebDetalle').getForm();

                    myForm.submit({
                        url: urlTurnosweb + 'crudTurnosweb.php?operation=negarTurnos',
                        method: 'POST',
                        waitMsg: 'Saving data',

                        success: function (form, action) {

                            Ext.getCmp('tb_negarturnos').setDisabled(true);
                            Ext.getCmp('tb_aprobarturnos').setDisabled(true);
                            store.load();
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
    requestTurnoswebData: function () {
        this.storeTurnosweb.load();
    }
});


