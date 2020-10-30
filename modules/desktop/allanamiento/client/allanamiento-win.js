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

        var urlAllanamientoLocal = "modules/desktop/allanamiento/server/";

        this.urlAllanamientoLocal = urlAllanamientoLocal;
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

        //inicio combos Allanamiento
        storeEtapaAllanamiento = new Ext.data.JsonStore({
            root: 'users',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                users: [
                    {"id": 'Secretaria', "nombre": "Secretaria"},
                    {"id": 'Instruccion', "nombre": "Instruccion"},
                    {"id": 'Resolucion', "nombre": "Resolucion"},
                    {"id": 'Ejecucion', "nombre": "Ejecucion"}
                ]
            }
        });

        var comboEtapaAllanamiento = new Ext.form.ComboBox({
            id: 'comboEtapaAllanamiento',
            store: storeEtapaAllanamiento,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function obtenerNombreEtapa(id) {
            var index = storeEtapaAllanamiento.findExact('id', id);
            if (index > -1) {
                var record = storeEtapaAllanamiento.getAt(index);
                return record.get('nombre');
            }
        }

        /*storeEstadoAllanamiento = new Ext.data.JsonStore({
            root: 'users',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                users: [
                    {"id": 'Asignado', "nombre": "Asignado"},
                    {"id": 'Enviado', "nombre": "Enviado"},
                    {"id": 'Devuelto', "nombre": "Devuelto"}
                ]
            }
        });

        var comboEstadoAllanamiento = new Ext.form.ComboBox({
            id: 'comboEstadoAllanamiento',
            store: storeEstadoAllanamiento,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function obtenerNombreEstado(id) {
            var index = storeEstadoAllanamiento.findExact('id', id);
            if (index > -1) {
                var record = storeEstadoAllanamiento.getAt(index);
                return record.get('nombre');
            }
        }*/

        //Fin combos Allanamientos

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
            Pic = Pic.replace(/^data:image\/(png|jpg);base64,/, "");

            Ext.Ajax.request({
                url: urlAllanamientoLocal + 'uploadimagen.php',
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

                create: urlAllanamientoLocal + "crudAllanamiento.php?operation=insert",
                read: urlAllanamientoLocal + "crudAllanamiento.php?operation=select",
                update: urlAllanamientoLocal + "crudAllanamiento.php?operation=upda",
                destroy: urlAllanamientoLocal + "crudAllanamiento.php?operation=delete"
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

                {name: 'estapa', allowBlank: true},
                {name: 'estado', allowBlank: true},
                {name: 'fechaprocesado', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'usuario_id', allowBlank: true},
                {name: 'codigo_sitra', allowBlank: true},
                {name: 'observacion_sitra', allowBlank: true},
                {name: 'enviar',  disabled: true },
                {name: 'devolver',  disabled: true },
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
            autoSave: false
        });

        storeAllanamiento.load();
        limiteallanamiento = 50;

        this.storeAllanamiento = storeAllanamiento;

        this.gridAllanamiento = new Ext.grid.EditorGridPanel({
            height: 200,
            widht: '100%',
            store: storeAllanamiento, columns: [
                new Ext.grid.RowNumberer({width: 40})
                , {header: 'Id', dataIndex: 'id', sortable: true, width: 60, scope: this}
                , {
                    header: 'SITRA',
                    //id: 'codigo_sitra',
                    dataIndex: 'codigo_sitra',
                    sortable: true,
                    width: 50,
                    scope: this,
                    editor: new Ext.form.TextField({
                        id: 'codigo_sitra1', allowBlank: false, listeners: {
                            'change': function (value, newValue, oldValue) {
                                if (newValue != oldValue) {
                                    //console.log("Valores", value, newValue, oldValue)
                                }
                            }
                        }
                    }),
                    listeners: {}
                }
                , {
                    header: 'Observación',
                    //id: 'obervacion_sitra',
                    dataIndex: 'obervacion_sitra',
                    sortable: true,
                    width: 170,
                    scope: this,
                    editor: new Ext.form.TextArea({id: 'obervacion_sitra1', allowBlank: true})
                }
                , {
                    header: 'etapa',
                    dataIndex: 'etapa',
                    sortable: true,
                    width: 80,
                    scope: this,
                    editor: comboEtapaAllanamiento,
                    renderer: obtenerNombreEtapa
                }
                , {
                    header: 'estado',
                    dataIndex: 'estado',
                    sortable: true,
                    width: 80,
                    scope: this,
                    //renderer: obtenerNombreEstado
                }
                , {
                    header: 'fechaprocesado',
                    dataIndex: 'fechaprocesado',
                    sortable: true,
                    width: 100,
                    renderer: formatDate
                }
                , {header: 'usuario', dataIndex: 'usuario_id', sortable: true, width: 70, scope: this}
                , {
                    xtype: 'actioncolumn',
                    header: 'Enviar',
                    dataIndex: 'enviar',
                    width: 50,
                    //hidden: true,
                    align: 'center',
                    renderer: function(value, metadata, record) {
                        //var rec = storeAllanamiento.getAt(rowIndex);
                        //console.log("aaa",metadata);
                        if(record.data.codigo_sitra != null){
                            //record.disabled = true;
                        }else{
                            //record.disabled = false;
                        }
                    },
                    items: [
                        {
                            icon: 'email_go.png',
                            tooltip: 'Enviar',
                            handler: function (grid, rowIndex, colIndex, item, record) {
                                var rec = storeAllanamiento.getAt(rowIndex);
                                this.enviarAllanamiento(rec.data);
                            },
                            scope: this
                        }
                    ]
                }
                , {
                    xtype : 'actioncolumn',
                    header: 'Devolver',
                    dataIndex: 'devolver',
                    width: 50,
                    align: 'center',
                    items: [
                        {
                            icon: 'email_go.png',
                            tooltip: 'Devolver',
                            handler: function (grid, rowIndex, colIndex) {
                                var rec = storeAllanamiento.getAt(rowIndex);
                                //this.devolverAllanamiento(rec.data.id);
                                Ext.Ajax.request({
                                    url: this.urlAllanamientoLocal + 'crudAllanamiento.php?operation=enviar',
                                    success: function (response, opts) {
                                        mensaje = Ext.getCmp('textDenunciasAnteriores');
                                        mensaje.setText('Solicitudes consultaciudadana anteriores: ' + (opts.result.data["totalconsultaciudadana"] - 1))
                                    },
                                    //failure: funcionMal,
                                    params: { data: rec.data  }
                                });
                            },
                            scope: this
                        }
                    ]
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
                    if (record.get('estado') == 'Asignado') {
                        return 'gold';
                    } else {
                        return 'bluestate';
                    }
                }
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: function (sm, row, rec) {
                        this.record = rec;
                        //this.idDenunciasRecuperada = rec.id;
                        /*cargar el formulario*/
                        cargaDetalle(rec.id);
                        //Ext.getCmp('tb_negarallanamiento').setDisabled(true);
                        if (accesosSecretaria) {
                            if (this.record.get("procesado") == 'true') {
                                //         Ext.getCmp('tb_negarallanamiento').setDisabled(true);

                                //Ext.getCmp('tb_aprobarallanamiento').setDisabled(true);
                                //Ext.getCmp('obervacion_sitra1').setDisabled(true);
                                //Ext.getCmp('codigo_sitra1').setDisabled(true);
                            }
                            else {
                                //       Ext.getCmp('tb_negarallanamiento').setDisabled(false);
                                // Ext.getCmp('tb_aprobarallanamiento').setDisabled(false);

                                //Ext.getCmp('obervacion_sitra1').setDisabled(false);
                                //Ext.getCmp('codigo_sitra1').setDisabled(false);
                            }
                        } else {
                            //    Ext.getCmp('tb_negarallanamiento').setDisabled(true);

                            // Ext.getCmp('tb_aprobarallanamiento').setDisabled(true);
                            // Ext.getCmp('obervacion_sitra1').setDisabled(true);
                            // Ext.getCmp('codigo_sitra1').setDisabled(true);
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
                width: winWidth - 24,
                tbar: [
                    {
                        text: 'Receptar solicitud allanamiento',
                        scope: this,
                        handler: this.aprobarallanamiento,
                        iconCls: 'save-icon',
                        disabled: true,
                        id: 'tb_aprobarallanamiento',
                        formBind: true
                    }, {
                        text: 'Devolver solicitud allanamiento',
                        scope: this,
                        handler: this.negarallanamiento,
                        iconCls: 'save-icon',
                        disabled: true,
                        id: 'tb_negarallanamiento',
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
                                    /* {
                                         xtype: 'textfield',
                                         fieldLabel: 'SITRA',
                                         name: 'codigo_sitra',
                                         anchor: '95%',
                                         allowBlank: false,
                                         id: 'codigo_sitra',
                                         listeners: {
                                             'change': function (value, newValue, oldValue) {
                                                 if (newValue != oldValue) {
                                                     Ext.getCmp('tb_aprobarallanamiento').setDisabled(false);
                                                 }
                                             }
                                         }
                                     },
                                     {
                                         xtype: 'textfield',
                                         fieldLabel: 'Observacion',
                                         name: 'observacion_sitra',
                                         anchor: '95%',
                                         allowBlank: false,
                                         id: 'observacion_sitra',
                                         listeners: {
                                             'change': function (value, newValue, oldValue) {
                                                 if (newValue != oldValue) {
                                                     Ext.getCmp('tb_negarallanamiento').setDisabled(false);
                                                 }
                                             }
                                         }
                                     }*/
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
                items: new Ext.TabPanel({
                    activeTab: 0,
                    border: false,
                    items: [
                        {
                            autoScroll: true,
                            title: 'Solicitudesde Allanamiento',
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
                                    items: this.gridAllanamiento
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
                                                    items: this.formAllanamientoDetalle,
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

        function cargaDetalle(allanamiento) {
            forma = Ext.getCmp('formAllanamientoDetalle');
            forma.getForm().load({
                waitMsg: 'Recuperando información',
                url: urlAllanamientoLocal + 'crudAllanamiento.php?operation=selectForm',
                params: {
                    id: allanamiento
                },
                success: function (response, opts) {
                    mensaje = Ext.getCmp('textDenunciasAnteriores');
                    mensaje.setText('Solicitudes allanamiento anteriores: ' + (response.findField('totalallanamiento').getValue() - 1))
                }

            });

        }
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
        }
    },
    enviarAllanamiento: function (data) {
        console.log(">>>>>>idTramite",data);
        store = this.storeAllanamiento;
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Desea aprobar la allanamiento.<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {

                    Ext.Ajax.request({
                        url: this.urlAllanamientoLocal + 'crudAllanamiento.php?operation=enviar',
                        params: { data: Ext.util.JSON.encode(data) },
                        //jsonData: { data },
                        success: function (response, opts) {
                            storeAllanamiento.load();
                            //mensaje = Ext.getCmp('textDenunciasAnteriores');
                            //mensaje.setText('Solicitudes consultaciudadana anteriores: ' + (opts.result.data["totalconsultaciudadana"] - 1))
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

                    /*var myForm = Ext.getCmp('formEnviar').getForm();
                    myForm.submit({
                        url: this.urlAllanamientoLocal + 'crudAllanamiento.php?operation=enviar',
                        method: 'POST',
                        waitMsg: 'Saving data',
                        success: function (form, action) {
                            //se actualiza tabla en la web
                            //var dataReceived = JSON.parse(action.response.responseText);
                            myForm.submit({
                                url: this.urlAllanamientoLocal + 'crudAllanamiento.php?operation=enviar',
                                method: 'POST',
                                waitMsg: 'Saving data',
                                params: {
                                    //codigo_tramite: dataReceived.data
                                    data: data
                                },
                                success: function (form, action) {
                                    //Ext.getCmp('tb_negarallanamiento').setDisabled(true);
                                    //Ext.getCmp('tb_aprobarallanamiento').setDisabled(true);
                                    storeAllanamiento.load();
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
                    });*/

                }
            }
        });

    },
    devolverAllanamiento: function () {
        store = this.storeAllanamiento;
        var urlAllanamientoLocal = this.urlAllanamientoLocal;
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Desea negar el allanamiento, .<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    Ext.getCmp('codigo_tramite_formulario').setValue("n/a");

                    var myForm = Ext.getCmp('formAllanamientoDetalle').getForm();

                    myForm.submit({
                        url: urlAllanamientoLocal + 'crudAllanamiento.php?operation=negarDenuncia',
                        method: 'POST',
                        waitMsg: 'Saving data',
                        success: function (form, action) {
                            Ext.getCmp('tb_negarallanamiento').setDisabled(true);
                            Ext.getCmp('tb_aprobarallanamiento').setDisabled(true);
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



