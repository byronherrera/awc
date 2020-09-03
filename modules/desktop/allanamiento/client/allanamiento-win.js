QoDesk.AllanamientoWindow = Ext.extend(Ext.app.Module, {
    id: 'allanamiento',
    type: 'desktop/allanamiento',

    init: function () {
        this.launcher = {
            text: 'Allanamiento',
            iconCls: 'allanamiento-icon',
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



        var win = desktop.getWindow('grid-win-allanamiento');

        var urlAllanamiento = "http://agenciadecontrol.quito.gob.ec/amcserver/"; // servidor produccion
        var urlDenunciasLocal = "modules/desktop/allanamiento/server/";

        this.urlAllanamiento = urlAllanamiento;
        this.urlDenunciasLocal = urlDenunciasLocal;
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

        function allanamientoActivo(id) {
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
                url: urlAllanamiento + 'uploadimagen.php',
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

        //Allanamiento tab
        var proxyAllanamiento = new Ext.data.HttpProxy({
            api: {

                create: urlDenunciasLocal + "crudAllanamiento.php?operation=insert",
                read: urlDenunciasLocal + "crudAllanamiento.php?operation=select",
                update: urlDenunciasLocal + "crudAllanamiento.php?operation=upda",
                destroy: urlDenunciasLocal + "crudAllanamiento.php?operation=delete"
            }
        });

        var readerAllanamiento = new Ext.data.JsonReader({
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
                {name: 'materia', allowBlank: false},
                {name: 'idzonal', allowBlank: false},
                {name: 'tipoadministrador', allowBlank: false},
                {name: 'establecimiento', allowBlank: false},
                {name: 'ubicacion', allowBlank: false},
                {name: 'actividad', allowBlank: false},
                {name: 'fechaacto', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'descripcion', allowBlank: false},
                {name: 'domicilio', allowBlank: false},
                {name: 'correoelectronico', allowBlank: false},
                {name: 'celular', allowBlank: false},
                {name: 'fecha', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'observaciones', allowBlank: false},
                {name: 'imagenasolicitud', allowBlank: false},
                {name: 'imagenaluae', allowBlank: false},
                {name: 'zonal', allowBlank: false},
                {name: 'ip', allowBlank: false},

                {name: 'confirmed', allowBlank: false},
                {name: 'procesado', allowBlank: false},
                {name: 'fechaprocesado', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'asignado', allowBlank: false},
                {name: 'codigo_tramite', allowBlank: false},
            ]
        });

        var writerAllanamiento = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        var storeAllanamiento = new Ext.data.Store({
            id: "storeAllanamiento",
            proxy: proxyAllanamiento,
            reader: readerAllanamiento,
            writer: writerAllanamiento,
            autoSave: true
        });
        storeAllanamiento.load();
        limiteallanamiento = 50

        this.storeAllanamiento = storeAllanamiento;

        this.gridAllanamiento = new Ext.grid.EditorGridPanel({
            height: 200,
            widht: '100%',
            store: storeAllanamiento, columns: [
                new Ext.grid.RowNumberer({width: 40})
                , {header: 'Id', dataIndex: 'id', sortable: true, width: 60, scope: this}
                , {header: 'SITRA', dataIndex: 'codigo_tramite', sortable: true, width: 170, scope: this}
                , {header: 'asignado', dataIndex: 'asignado', sortable: true, width: 80, scope: this}
                , {header: 'confirmed', dataIndex: 'confirmed', sortable: true, width: 70, scope: this}
                , {header: 'procesado', dataIndex: 'procesado', sortable: true, width: 70, scope: this}
                , {
                    header: 'fechaprocesado',
                    dataIndex: 'fechaprocesado',
                    sortable: true,
                    width: 100,
                    renderer: formatDate
                }

                , {header: 'cedula', dataIndex: 'cedula', sortable: true, width: 70, scope: this}
                , {header: 'nombres', dataIndex: 'nombres', sortable: true, width: 130, scope: this}
                , {header: 'apellidos', dataIndex: 'apellidos', sortable: true, width: 130, scope: this}
                , {header: 'materia', dataIndex: 'materia', sortable: true, width: 180, scope: this}
                , {header: 'zonal', dataIndex: 'zonal', sortable: true, width: 80, scope: this}
                , {header: 'tipoadministrador', dataIndex: 'tipoadministrador', sortable: true, width: 80, scope: this}
                , {header: 'establecimiento', dataIndex: 'establecimiento', sortable: true, width: 140, scope: this}
                , {header: 'ubicacion', dataIndex: 'ubicacion', sortable: true, width: 160, scope: this}
                , {header: 'actividad', dataIndex: 'actividad', sortable: true, width: 160, scope: this}
                , {header: 'Fecha acto', dataIndex: 'fechaacto', sortable: true, width: 100, renderer: formatDate}
                , {header: 'descripcion', dataIndex: 'descripcion', sortable: true, width: 180, scope: this}
                , {header: 'domicilio', dataIndex: 'domicilio', sortable: true, width: 180, scope: this}
                , {header: 'correoelectronico', dataIndex: 'correoelectronico', sortable: true, width: 180, scope: this}
                , {header: 'celular', dataIndex: 'celular', sortable: true, width: 100, scope: this}
                , {header: 'Fecha recibido', dataIndex: 'fecha', sortable: true, width: 100, renderer: formatDate}
                , {header: 'observaciones', dataIndex: 'observaciones', sortable: true, width: 280, scope: this}
                //, {header: 'imagenasolicitud', dataIndex: 'imagenasolicitud', sortable: true, width: 15, scope: this}
                //, {header: 'imagenaluae', dataIndex: 'imagenaluae', sortable: true, width: 15, scope: this}
                , {header: 'ip', dataIndex: 'ip', allowBlank: false, hidden: true, hidden: true}
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
                        cargaDetalle(rec.id, this.formAllanamientoDetalle, rec);

                        if (accesosSecretaria) {
                            if (this.record.get("procesado") == 'true') {
                                Ext.getCmp('tb_negarallanamiento').setDisabled(true);
                                Ext.getCmp('tb_aprobarallanamiento').setDisabled(true);
                                Ext.getCmp('motivoNegarDenuncia').setDisabled(true);
                                Ext.getCmp('codigo_tramite_formulario').setDisabled(true);
                            }
                            else {
                                Ext.getCmp('tb_negarallanamiento').setDisabled(false);
                                // Ext.getCmp('tb_aprobarallanamiento').setDisabled(false);
                                Ext.getCmp('motivoNegarDenuncia').setDisabled(false);
                                Ext.getCmp('codigo_tramite_formulario').setDisabled(false);
                            }
                        } else {
                            Ext.getCmp('tb_negarallanamiento').setDisabled(true);
                            Ext.getCmp('tb_aprobarallanamiento').setDisabled(true);
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
                pageSize: limiteallanamiento,
                store: storeAllanamiento,
                displayInfo: true,
                displayMsg: 'Mostrando solicitudes allanamientos {0} - {1} of {2}',
                emptyMsg: "No existen allanamientos que mostrar"
            }),
        });
        //fin Allanamiento tab

        var win = desktop.getWindow('layout-win');

        if (!win) {

            var checkHandler = function (item, checked) {
                if (checked) {
                    var store = this.storeAllanamiento;
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


            this.formAllanamientoDetalle = new Ext.FormPanel({
                id: 'formAllanamientoDetalle',
                cls: 'no-border',
                items: [
                    {
                        region: 'north',
                        height: 200,

                        autoScroll: false,
                        id: 'formcabeceraallanamiento',
                        items: this.gridAllanamiento
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
                                text: 'Aprobar solicitud allanamiento',
                                scope: this,
                                handler: this.aprobarallanamiento,
                                iconCls: 'save-icon',
                                disabled: true,
                                id: 'tb_aprobarallanamiento'
                                , formBind: true
                            }, {
                                text: 'Negar solicitud allanamiento',
                                scope: this,
                                handler: this.negarallanamiento,
                                iconCls: 'save-icon',
                                disabled: true,
                                id: 'tb_negarallanamiento',
                                formBind: true
                            },
                            {
                                text: '| Motivo negar:'
                                , xtype: 'tbtext',
                            },
                            {
                                xtype: 'textfield',
                                id: 'motivoNegarDenuncia',
                                disabled: true,
                                anchor: '40%',
                                width: '500'
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
                                            {xtype: 'hidden', name: 'urlallanamiento'},
                                            {xtype: 'hidden', name: 'nombres'},
                                            {xtype: 'hidden', name: 'apellidos'},
                                            {xtype: 'hidden', name: 'cedula'},
                                            {xtype: 'hidden', name: 'correoelectronico'},

                                            {xtype: 'hidden', name: 'ampliacionallanamiento'},
                                            {xtype: 'hidden', name: 'direccionallanamientodo'},
                                            {xtype: 'hidden', name: 'geoposicionamiento2'},
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Fecha',
                                                name: 'fecha2'
                                            },
                                            //  {xtype: 'displayfield', fieldLabel: 'Denuncia', name: 'urlallanamiento2'},
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
                                                fieldLabel: 'Solicitud Allanamiento',
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
                                                name: 'totalallanamiento',
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
                                                            Ext.getCmp('tb_aprobarallanamiento').setDisabled(false);
                                                        }
                                                    }
                                                }
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
                id: 'grid-win-allanamiento',
                title: 'Gestión Allanamiento',
                width: winWidth,
                height: winHeight,
                iconCls: 'allanamiento-icon',
                shim: false,
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                tbar: [
                    {
                        id: 'recargardatos',
                        iconCls: 'reload-icon',
                        handler: this.requestAllanamientoData,
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
                        , store: this.storeAllanamiento
                    })
                ],
                items: this.formAllanamientoDetalle
            });
        }
        win.show();

        function cargaDetalle(allanamiento, forma, bloqueo) {
            forma = Ext.getCmp('formAllanamientoDetalle');
            forma.getForm().load({
                waitMsg: 'Recuperando información',
                url: urlDenunciasLocal + 'crudAllanamiento.php?operation=selectForm',
                params: {
                    id: allanamiento
                },
                success: function (response, opts) {
                    mensaje = Ext.getCmp('textDenunciasAnteriores');
                    mensaje.setText('Solicitudes allanamiento anteriores: ' + (response.findField('totalallanamiento').getValue() - 1))
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
    aprobarallanamiento: function () {
        store = this.storeAllanamiento;
        var urlAllanamiento = this.urlAllanamiento;
        var urlDenunciasLocal = this.urlDenunciasLocal;
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Desea aprobar la allanamiento.<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var myForm = Ext.getCmp('formAllanamientoDetalle').getForm();
                    myForm.submit({
                        url: urlDenunciasLocal + 'crudAllanamiento.php?operation=aprobarDenuncia',
                        method: 'POST',
                        waitMsg: 'Saving data',
                        success: function (form, action) {
                            //se actualiza tabla en la web
                            var dataReceived = JSON.parse(action.response.responseText);
                            myForm.submit({
                                url: urlAllanamiento + 'crudAllanamiento.php?operation=aprobarDenuncia',
                                method: 'POST',
                                waitMsg: 'Saving data',
                                params: {
                                    codigo_tramite: dataReceived.data
                                },
                                success: function (form, action) {
                                    Ext.getCmp('tb_negarallanamiento').setDisabled(true);
                                    Ext.getCmp('tb_aprobarallanamiento').setDisabled(true);
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
    negarallanamiento: function () {
        store = this.storeAllanamiento;
        var urlAllanamiento = this.urlAllanamiento;
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Desea negar el allanamiento, .<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var myForm = Ext.getCmp('formAllanamientoDetalle').getForm();
                    myForm.submit({
                        url: urlAllanamiento + 'crudAllanamiento.php?operation=negarDenuncia',
                        method: 'POST',
                        waitMsg: 'Saving data',
                        success: function (form, action) {
                            Ext.getCmp('tb_negarallanamiento').setDisabled(true);
                            Ext.getCmp('tb_aprobarallanamiento').setDisabled(true);
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
    requestAllanamientoParticipantesData: function () {
        this.storeAllanamientoParticipantes.load();
    },
    requestAllanamientoParticipantesDataExport: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Descargue el archivo xls  .<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/allanamiento/server/AllanamientoParticipantes.php';
                }
            }
        });
    },
    requestAllanamientoIntentosData: function () {
        this.storeAllanamientoIntentos.load();
    },
    requestAllanamientoIntentosDataExport: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Descargue el archivo xls  .<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/allanamiento/server/AllanamientoIntentos.php';
                }
            }
        });
    },
    requestAllanamientoData: function () {
        this.storeAllanamiento.load();
    },
    requestAllanamientoDataExport: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Descargue el archivo xls  .<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/allanamiento/server/Allanamiento.php';
                }
            }
        });
    },
    requestAllanamientoEstadisticasDataExport: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Descargue el archivo xls  .<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/allanamiento/server/AllanamientoEstadisticas.php';
                }
            }
        });
    }
});



