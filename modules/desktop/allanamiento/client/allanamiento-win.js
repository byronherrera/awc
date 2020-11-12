var solicitudSelected =  {};
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

                {name: 'etapa', allowBlank: true},
                {name: 'estado', allowBlank: true},
                {name: 'fecha_procesado', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'id_usuario', allowBlank: true},
                {name: 'codigo_sitra', allowBlank: true},
                {name: 'observacion_sitra', allowBlank: true}
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
                    dataIndex: 'codigo_sitra',
                    sortable: true,
                    width: 50,
                    scope: this,
                    /*editor: new Ext.form.TextField({
                        id: 'codigo_sitra1', allowBlank: false, listeners: {
                            'change': function (value, newValue, oldValue) {
                                if (newValue != oldValue) {

                                }
                            }
                        }
                    })*/
                }
                , {
                    header: 'observación',
                    dataIndex: 'observacion_sitra',
                    sortable: true,
                    width: 170,
                    scope: this,
                    /*editor: new Ext.form.TextArea({id: 'observacion_sitra', allowBlank: true})*/
                }
                , {
                    header: 'etapa',
                    dataIndex: 'etapa',
                    sortable: true,
                    width: 80,
                    scope: this,
                    //editor: comboEtapaAllanamiento,
                    //renderer: obtenerNombreEtapa
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
                    header: 'fecha procesado',
                    dataIndex: 'fecha_procesado',
                    sortable: true,
                    width: 100,
                    renderer: formatDate
                }
                , {
                    header: 'usuario',
                    dataIndex: 'id_usuario',
                    sortable: true,
                    width: 70,
                    scope: this
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
                        solicitudSelected = rec;
                        cargaDetalle(rec.id);
                        storeHistorico.baseParams.id = rec.id;
                        storeHistorico.load();
                        if(accesosSecretaria){
                            if (this.record.get("etapa") === 'Secretaria' && this.record.get("estado") !== 'Finalizado') {
                                Ext.getCmp('codigo_sitra').setDisabled(false);
                                Ext.getCmp('observacion_sitra').setDisabled(false);
                                Ext.getCmp('tabEnviarAllanamiento').setDisabled(false);
                                Ext.getCmp('tabDevolverAllanamiento').setDisabled(false);
                            }
                        }
                        if(accesosInstruccion){
                            if (this.record.get("etapa") === 'Instruccion' && this.record.get("estado") !== 'Finalizado') {
                                Ext.getCmp('tabEnviarAllanamiento').setDisabled(false);
                                Ext.getCmp('tabDevolverAllanamiento').setDisabled(false);
                                Ext.getCmp('codigo_sitra').setDisabled(true);
                                Ext.getCmp('observacion_sitra').setDisabled(false);
                            }
                        }
                        if(accesosResolucion){
                            if (this.record.get("etapa") === 'Resolucion' && this.record.get("estado") !== 'Finalizado') {
                                Ext.getCmp('tabEnviarAllanamiento').setDisabled(false);
                                Ext.getCmp('tabDevolverAllanamiento').setDisabled(false);
                                Ext.getCmp('codigo_sitra').setDisabled(true);
                                Ext.getCmp('observacion_sitra').setDisabled(false);
                            }
                        }
                        if(accesosEjecucion){
                            if (this.record.get("etapa") === 'Ejecucion' && this.record.get("estado") !== 'Finalizado') {
                                Ext.getCmp('tabEnviarAllanamiento').setDisabled(false);
                                Ext.getCmp('tabDevolverAllanamiento').setDisabled(false);
                                Ext.getCmp('codigo_sitra').setDisabled(true);
                                Ext.getCmp('observacion_sitra').setDisabled(false);
                            }
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


        //Inicio Tab Historico

        var proxyHistorico = new Ext.data.HttpProxy({
            api: {

                create: urlAllanamientoLocal + "crudAllanamiento.php?operation=insertHist",
                read: urlAllanamientoLocal + "crudAllanamiento.php?operation=selectHist",
                update: urlAllanamientoLocal + "crudAllanamiento.php?operation=updateHist",
                destroy: urlAllanamientoLocal + "crudAllanamiento.php?operation=deleteHist"
            },
            listeners: {
                exception: function (proxy, type, action, options, response, arg) {
                    if (typeof response.message !== 'undefined') {
                        if (response.message != '') {
                            AppMsg.setAlert(AppMsg.STATUS_NOTICE, response.message);
                        }
                    }
                }
            }
        });

        var readerHistorico = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: false},
                {name: 'id_proc_rec_resp', allowBlank: false},
                {name: 'codigo_sitra', allowBlank: false},
                {name: 'observacion_sitra', allowBlank: false},
                {name: 'etapa', allowBlank: false},
                {name: 'estado', allowBlank: false},
                {name: 'id_usuario', allowBlank: false},
                {name: 'fecha_procesado', type: 'date', dateFormat: 'c', allowBlank: false},
            ]
        });

        var writerHistorico = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        var storeHistorico = new Ext.data.Store({
            id: "storeHistorico",
            proxy: proxyHistorico,
            reader: readerHistorico,
            writer: writerHistorico,
            autoSave: false
        });

        this.storeHistorico = storeHistorico;

        this.gridHistorico = new Ext.grid.EditorGridPanel({
            autoHeight: true,
            autoScroll: true,
            store: storeHistorico,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'id',
                    dataIndex: 'id',
                    sortable: true,
                    width: 30,
                    hidden: true
                }, {
                    header: 'id_proc_rec_resp',
                    dataIndex: 'id_proc_rec_resp',
                    sortable: true,
                    width: 30,
                    hidden: true
                },
                {
                    header: 'SITRA',
                    dataIndex: 'codigo_sitra',
                    sortable: true,
                    width: 20
                },
                {
                    header: 'observacion',
                    dataIndex: 'observacion_sitra',
                    sortable: true,
                    width: 30
                },
                {
                    header: 'etapa',
                    dataIndex: 'etapa',
                    sortable: true,
                    width: 15,
                },
                {
                    header: 'estado',
                    dataIndex: 'estado',
                    sortable: true,
                    width: 15
                },
                {
                    header: 'usuario',
                    dataIndex: 'id_usuario',
                    sortable: true,
                    width: 15,
                    align: 'left',
                    //renderer: personaEnviaRespuesta
                },
                {
                    header: 'fecha proceso',
                    dataIndex: 'fecha_procesado',
                    sortable: true,
                    width: 15,
                    renderer: formatDate
                }
            ],
            clicksToEdit: 1,
            viewConfig: {
                forceFit: true,
                getRowClass: function (record, index) {

                }
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: function (sm, row, rec) {
                        this.record = rec;
                        /*cargar el formulario*/
                    }
                }
            }),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            listeners: {
                beforeedit: function (e) {
                    // en caso de no enviar todavia el mensaje se puede editar
                }
            }
        });

        //Fin Tab Historico

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


            this.formDetalle = new Ext.FormPanel({
                id: 'formDetalle',
                cls: 'no-border',
                width: winWidth - 24,
                tbar: [
                    {
                        text: 'Asignar',
                        scope: this,
                        handler: this.enviarAllanamiento,
                        iconCls: 'save-icon',
                        disabled: true,
                        id: 'tabEnviarAllanamiento',
                        formBind: true
                    }, {
                        text: 'Devolver',
                        scope: this,
                        handler: this.devolverAllanamiento,
                        iconCls: 'delete-icon',
                        disabled: true,
                        id: 'tabDevolverAllanamiento',
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
                                    /*, {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Acto Inicio',
                                        name: 'imagenactoinicio'
                                    }*/
                                    ,{
                                        xtype: 'displayfield',
                                        fieldLabel: 'Total pedidos anteriores',
                                        name: 'totalallanamiento',
                                        anchor: '95%'
                                    },
                                    {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Etapa',
                                        name: 'etapa',
                                        style : {'color' : 'red'},
                                        anchor: '95%'
                                    },
                                    {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Estado',
                                        name: 'estado',
                                        style : {'color' : 'red'},
                                        anchor: '95%'
                                    },
                                    {
                                        xtype: 'textfield',
                                        id: 'codigo_sitra',
                                        name: 'codigo_sitra',
                                        fieldLabel: 'SITRA',
                                        anchor: '95%',
                                        allowBlank: true,
                                        disabled: true,
                                        listeners: {
                                            'change': function (value, newValue, oldValue) {
                                                if (newValue != oldValue) {

                                                }
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'textarea',
                                        id: 'observacion_sitra',
                                        name: 'observacion_sitra',
                                        fieldLabel: 'Observacion',
                                        anchor: '95%',
                                        allowBlank: false,
                                        disabled: true,
                                        listeners: {
                                            'change': function (value, newValue, oldValue) {
                                                if (newValue != oldValue) {
                                                    /*if(solicitudSelected.etapa === 'Secretaria' && solicitudSelected.estado !== 'Finalizado'){
                                                        Ext.getCmp('tabEnviarAllanamiento').setDisabled(false);
                                                        Ext.getCmp('tabDevolverAllanamiento').setDisabled(false);
                                                    }*/
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
                            title: 'Solicitudes de Allanamiento',
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
                                                    id: 'tabDetalle',
                                                    height: winHeight - 325,
                                                    width: winWidth,
                                                    items: this.formDetalle,
                                                    disabled: false,
                                                    autoScroll: true
                                                },
                                                {
                                                    title: 'Historial',
                                                    layout: 'column',
                                                    id: 'tabHistorial',
                                                    height: winHeight - 325,
                                                    width: winWidth,
                                                    items: this.gridHistorico,
                                                    disabled: false,
                                                    autoScroll: true
                                                }
                                            ]
                                        }

                                    ]
                                }
                            ]
                        },
                    ]
                })
            });
        }
        win.show();

        function cargaDetalle(idAllanamiento) {
            forma = Ext.getCmp('formDetalle');
            forma.getForm().load({
                waitMsg: 'Recuperando información',
                url: urlAllanamientoLocal + 'crudAllanamiento.php?operation=selectForm',
                params: {
                    id: idAllanamiento
                },
                success: function (response, opts) {
                    Ext.getCmp('observacion_sitra').setValue("");
                    //mensaje = Ext.getCmp('textDenunciasAnteriores');
                    //mensaje.setText('Solicitudes allanamiento anteriores: ' + (response.findField('totalallanamiento').getValue() - 1));
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
    enviarAllanamiento: function () {
        solicitudSelected.data.codigo_sitra = Ext.getCmp('codigo_sitra').getValue();
        solicitudSelected.data.observacion_sitra = Ext.getCmp('observacion_sitra').getValue();
        var etapa =  solicitudSelected.data.etapa;
        storeAllanamiento = this.storeAllanamiento;
        storeHistorico = this.storeHistorico;

        debugger
        if(etapa === 'Secretaria' &&  solicitudSelected.data.codigo_sitra === ''){
            var AppMsg = new Ext.AppMsg({});
            return AppMsg.setAlert(AppMsg.STATUS_NOTICE, 'Ingrese el código SITRA');
        }

        if( solicitudSelected.data.observacion_sitra === ''){
            var AppMsg = new Ext.AppMsg({});
            return AppMsg.setAlert(AppMsg.STATUS_NOTICE, 'Ingrese la observación');
        }

        if(etapa === 'Secretaria'){
            solicitudSelected.data.etapa = 'Instruccion';
            solicitudSelected.data.estado = 'Asignado';
        }
        if(etapa === 'Instruccion'){
            solicitudSelected.data.etapa = 'Resolucion';
            solicitudSelected.data.estado = 'Asignado';
        }
        if(etapa === 'Resolucion'){
            solicitudSelected.data.etapa = 'Ejecucion';
            solicitudSelected.data.estado = 'Asignado';
        }
        if(etapa === 'Ejecucion'){
            solicitudSelected.data.estado = 'Finalizado';
        }
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Desea asignar a la siguente etapa el allanamiento.<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: this.urlAllanamientoLocal + 'crudAllanamiento.php?operation=enviar',
                        params: { data: Ext.util.JSON.encode(solicitudSelected.data) },
                        //jsonData: { data },
                        success: function (response, opts) {
                            storeAllanamiento.load();
                            cargaDetalle(solicitudSelected.data.id);
                            storeHistorico.baseParams.id = solicitudSelected.data.id;
                            storeHistorico.load();
                            mensaje = Ext.getCmp('textDenunciasAnteriores');
                            mensaje.setText('Se asignó a la siguiente fase exitosamente: ');
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
    devolverAllanamiento: function () {

        solicitudSelected.data.observacion_sitra = Ext.getCmp('observacion_sitra').getValue();
        var etapa =  solicitudSelected.data.etapa;
        storeAllanamiento = this.storeAllanamiento;
        storeHistorico = this.storeHistorico;

        if( solicitudSelected.data.observacion_sitra === ''){
            var AppMsg = new Ext.AppMsg({});
            return AppMsg.setAlert(AppMsg.STATUS_NOTICE, 'Ingrese la observación');
        }

        if(etapa === 'Secretaria'){
            solicitudSelected.data.estado = 'Finalizado';
        }
        if(etapa === 'Instruccion'){
            solicitudSelected.data.etapa = 'Secretaria';
            solicitudSelected.data.estado = 'Devuelto';
        }
        if(etapa === 'Resolucion'){
            solicitudSelected.data.etapa = 'Instruccion';
            solicitudSelected.data.estado = 'Devuelto';
        }
        if(etapa === 'Ejecucion'){
            solicitudSelected.data.etapa = 'Resolucion';
            solicitudSelected.data.estado = 'Devuelto';
        }
        var urlAllanamientoLocal = this.urlAllanamientoLocal;
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Desea devolver el allanamiento.<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url: this.urlAllanamientoLocal + 'crudAllanamiento.php?operation=devolver',
                        params: { data: Ext.util.JSON.encode(solicitudSelected.data) },
                        //jsonData: { data },
                        success: function (response, opts) {
                            storeAllanamiento.load();
                            cargaDetalle(solicitudSelected.data.id);
                            storeHistorico.baseParams.id = solicitudSelected.data.id;
                            storeHistorico.load();
                            mensaje = Ext.getCmp('textDenunciasAnteriores');
                            mensaje.setText('Se devolvió a la fase exitosamente: ');
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
