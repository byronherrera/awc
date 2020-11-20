QoDesk.ActosInicioappWindow = Ext.extend(Ext.app.Module, {
    id: 'actosinicioapp',
    type: 'desktop/actosinicioapp',

    init: function () {
        this.launcher = {
            text: 'ActosInicioapp',
            iconCls: 'actosinicioapp-icon',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function () {
        var desktop = this.app.getDesktop();

        var grabarDenuncia = this.app.isAllowedTo('grabarDenuncia', this.id);

        var win = desktop.getWindow('grid-win-actosinicioapp');
        //var urlActosInicioapp = "amcserver/";
        //var urlActosInicioapp = "http://agenciadecontrol.quito.gob.ec/amcserver/"; // servidor produccion
        var urlActosInicioapp = "modules/desktop/actosinicioapp/server/";

        this.urlActosInicioapp = urlActosInicioapp;
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

        function actosinicioappActivo(id) {
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
                url: urlActosInicioapp + 'uploadimagen.php',
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

        //ActosInicioapp tab
        var proxyActosInicioapp = new Ext.data.HttpProxy({
            api: {
                create: urlActosInicioapp + "crudActosInicioapp.php?operation=insert",
                read: urlActosInicioapp + "crudActosInicioapp.php?operation=select",
                update: urlActosInicioapp + "crudActosInicioapp.php?operation=upda",
                destroy: urlActosInicioapp + "crudActosInicioapp.php?operation=delete"
            }
        });

        var readerActosInicioapp = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: false},
                {name: 'cedula', allowBlank: false},
                {name: 'direccionDomicilio', allowBlank: false},
                {name: 'direccionTrabajo', allowBlank: false},
                {name: 'email', allowBlank: false},
                {name: 'telefonoCelular', allowBlank: false},
                {name: 'telefonoFijo', allowBlank: false},
                {name: 'hechosInfraccion', allowBlank: false},
                {name: 'direccionInfraccion', allowBlank: false},
                {name: 'fechaInfraccion', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'horaInfraccion', allowBlank: false},
                {name: 'aislamiento_obligatorio', allowBlank: false},
                {name: 'conductorSinMascarilla', allowBlank: false},
                {name: 'foto', allowBlank: false},
                {name: 'foto1', allowBlank: false},
                {name: 'infraccionSinMascarilla', allowBlank: false},
                {name: 'infraccionSinMascarilla2', allowBlank: false},
                {name: 'infraccioncedula', allowBlank: false},
                {name: 'infracciondistancia', allowBlank: false},
                {name: 'nombres', allowBlank: false},
                {name: 'sancion_25_SMU', allowBlank: false},
                {name: 'sancion_50_SMU', allowBlank: false},
                {name: 'sancion_tres_salarios', allowBlank: false},
                {name: 'sancion_un_salario_medio', allowBlank: false},
            ]
        });

        var writerActosInicioapp = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        var storeActosInicioapp = new Ext.data.Store({
            id: "storeActosInicioapp",
            proxy: proxyActosInicioapp,
            reader: readerActosInicioapp,
            writer: writerActosInicioapp,
            autoSave: true
        });
        storeActosInicioapp.load();
        limiteactosinicioapp = 50

        this.storeActosInicioapp = storeActosInicioapp;

        this.gridActosInicioapp = new Ext.grid.EditorGridPanel({
            height: 200,
            widht: '100%',
            store: storeActosInicioapp, columns: [
                new Ext.grid.RowNumberer({width: 30})
                , {header: 'id', dataIndex: 'id', sortable: true, width: 50, hidden: true, scope: this}
                , {header: 'Cédula', dataIndex: 'cedula', sortable: true, width: 80, scope: this}
                , {header: 'Nombres', dataIndex: 'nombres', sortable: true, width: 250, scope: this}
                , {header: 'Dirección de Domicilio', dataIndex: 'direccionDomicilio', sortable: true, width: 200, scope: this}
                , {header: 'Dirección de Trabajo', dataIndex: 'direccionTrabajo', sortable: true, width: 200, scope: this}
                , {header: 'Email', dataIndex: 'email', sortable: true, width: 150, scope: this}
                , {header: 'Celular', dataIndex: 'telefonoCelular', sortable: true, width: 80, scope: this}
                , {header: 'Teléfono', dataIndex: 'telefonoFijo', sortable: true, width: 70, scope: this}
                , {header: 'Hechos Infracción', dataIndex: 'hechosInfraccion', sortable: true, width: 200, scope: this}
                , {header: 'Dirección de Infracción', dataIndex: 'direccionInfraccion', sortable: true, width: 200, scope: this}
                , {header: 'Fecha Infracción', dataIndex: 'fechaInfraccion', sortable: true, width: 100, renderer: formatDate}
                , {header: 'Hora Infracción', dataIndex: 'horaInfraccion', sortable: true, width: 90, scope: this}
                , {header: 'Aislamiento Obligatorio', dataIndex: 'aislamiento_obligatorio', sortable: true, width: 130, scope: this}
                , {header: 'Conductor sin Mascarilla', dataIndex: 'conductorSinMascarilla', sortable: true, width: 140, scope: this}
                // , {header: 'Foto', dataIndex: 'foto', sortable: true, width: 50, scope: this}
                // , {header: 'Foto 1', dataIndex: 'foto1', sortable: true, width: 20, scope: this}
                , {header: 'Sin Mascarilla Espacios Públicos', dataIndex: 'infraccionSinMascarilla', sortable: true, width: 180, scope: this}
                , {header: 'Sin Mascarilla Aire Libre', dataIndex: 'infraccionSinMascarilla2', sortable: true, width: 130, scope: this}
                , {header: 'Sin Cédula', dataIndex: 'infraccioncedula', sortable: true, width: 80, scope: this}
                , {header: 'Sin Distancia', dataIndex: 'infracciondistancia', sortable: true, width: 80, scope: this}
                , {header: 'Sanción 25 SMU', dataIndex: 'sancion_25_SMU', sortable: true, width: 100, scope: this}
                , {header: 'Sanción 50 SMU', dataIndex: 'sancion_50_SMU', sortable: true, width: 100, scope: this}
                , {header: 'Sanción tres salarios', dataIndex: 'sancion_tres_salarios', sortable: true, width: 120, scope: this}
                , {header: 'Sanción un salario medio', dataIndex: 'sancion_un_salario_medio', sortable: true, width: 150, scope: this}

            ],
            viewConfig: {
                forceFit: false,
                getRowClass: function (record, index) {
                    //if (record.get('prosesado') == 'false') return 'gold';
                    return 'gold';
                }
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: function (sm, row, rec) {
                        this.record = rec;
                        this.idDenunciasRecuperada = rec.id;
                        cargaDetalle(rec.id);

                        if (grabarDenuncia) {
                        }
                    }
                }
            }),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: limiteactosinicioapp,
                store: storeActosInicioapp,
                displayInfo: true,
                displayMsg: 'Mostrando actos inicio {0} - {1} of {2}',
                emptyMsg: "No existen actos inicio que mostrar"
            }),
        });
        //fin ActosInicioapp tab

        //var desktop = this.app.getDesktop();
        var win = desktop.getWindow('layout-win');

        if (!win) {

            var checkHandler = function (item, checked) {
                if (checked) {
                    var store = this.storeActosInicioapp;
                    store.baseParams.filterField = item.key;
                    searchFieldBtn.setText(item.text);
                }
            };

            var searchFieldBtn = new Ext.Button({
                menu: new Ext.menu.Menu({
                    items: [
                        {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'cedula',
                            scope: this,
                            text: 'Cédula'
                        },
                        {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'nombres',
                            scope: this,
                            text: 'Nombres'
                        }
                    ]
                })
                , text: 'Cédula'
            });

            this.formActosInicioappDetalle = new Ext.FormPanel({
                id: 'formActosInicioappDetalle',
                cls: 'no-border',
                items: [
                    {
                        region: 'north',
                        height: 200,
                        id: 'formcabeceradenuncias',
                        items: this.gridActosInicioapp
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
                                text: 'Migrar',
                                scope: this,
                                handler: this.migrar,
                                iconCls: 'save-icon',
                                disabled: false,
                                id: 'tbMigrar',
                                formBind: true
                            }
                        ],
                        items: [
                            {
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
                                            {
                                                xtype: 'displayfield',
                                                hideLabel: true,
                                                value: '1. DATOS PERSONALES',
                                                cls: 'negrilla',
                                                anchor: '95%'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Cédula',
                                                name: 'cedula'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Nombres',
                                                name: 'nombres',
                                            }
                                            ,{
                                                xtype: 'displayfield',
                                                fieldLabel: 'Dirección Domicilio',
                                                name: 'direccionDomicilio',
                                            }
                                            ,{
                                                xtype: 'displayfield',
                                                fieldLabel: 'Dirección Trabajo',
                                                name: 'direccionTrabajo',
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Email',
                                                name: 'email'}
                                            ,{
                                                xtype: 'displayfield',
                                                fieldLabel: 'Teléfono',
                                                name: 'telefonoFijo'
                                            }
                                            ,{
                                                xtype: 'displayfield',
                                                fieldLabel: 'Celular',
                                                name: 'telefonoCelular'
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
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Hechos',
                                                name: 'hechosInfraccion'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Dirección',
                                                name: 'direccionInfraccion'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Fecha',
                                                name: 'fechaInfraccion'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Hora',
                                                name: 'horaInfraccion'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Conductor Sin Mascarilla',
                                                name: 'conductorSinMascarilla'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Sin Mascarilla Espacios Públicos',
                                                name: 'infraccionSinMascarilla'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Sin Mascarilla Aire Libre',
                                                name: 'infraccionSinMascarilla2'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Sin Cédula',
                                                name: 'infraccioncedula'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Sin Distancia',
                                                name: 'infracciondistancia'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Sanción 25 SMU',
                                                name: 'sancion_25_SMU'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Sanción 50 SMU',
                                                name: 'sancion_50_SMU'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Sanción tres salarios',
                                                name: 'sancion_tres_salarios'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Sanción un salario y medio',
                                                name: 'sancion_un_salario_medio'
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
                                                fieldLabel: 'Foto',
                                                name: 'foto',
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Foto 1',
                                                name: 'foto1',
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Foto 2',
                                                name: 'foto2',
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
                id: 'grid-win-actosinicioapp',
                title: 'Actos de Inicio App',
                width: winWidth,
                height: winHeight,
                iconCls: 'actosinicioapp-icon',
                shim: false,
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                tbar: [
                    {
                        id: 'recargardatos',
                        iconCls: 'reload-icon',
                        handler: this.requestActosInicioappData,
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
                        , store: this.storeActosInicioapp
                    })
                ],
                items: this.formActosInicioappDetalle
            });
        }
        win.show();
        function cargaDetalle(id) {
            forma = Ext.getCmp('formActosInicioappDetalle');
            forma.getForm().load({
                waitMsg: 'Recuperando información',
                url: urlActosInicioapp + 'crudActosInicioapp.php?operation=selectForm',
                params: {
                    id: id
                },
                success: function (response, opts) {
                    //mensaje = Ext.getCmp('textDenunciasAnteriores');
                    //mensaje.setText('Denuncias anteriores: ' + (response.findField('totaldenuncias').getValue() - 1))
                }
            });
        };

        function bloquearLectura(forma, activar) {
        };
    },
    migrar: function () {
        store = this.storeActosInicioapp;
        var urlActosInicioapp = this.urlActosInicioapp;
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Desea migrar.<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var myForm = Ext.getCmp('formActosInicioappDetalle').getForm();
                    myForm.submit({
                        url: urlActosInicioapp + 'crudActosInicioapp.php?operation=migrar',
                        method: 'POST',
                        waitMsg: 'Saving data',
                        success: function (form, action) {
                            //se actualiza tabla en la web
                            //var dataReceived = JSON.parse(action.response.responseText);
                            myForm.submit({
                                url: urlActosInicioapp + 'migracionActoInicio.php?operation=migrar',
                                method: 'POST',
                                waitMsg: 'Saving data',
                                params: {
                                    //codigo_tramite: dataReceived.data
                                },
                                success: function (form, action) {
                                    //Ext.getCmp('tb_negardenuncias').setDisabled(true);
                                    //Ext.getCmp('tb_aprobardenuncias').setDisabled(true);
                                    store.load();
                                },
                                failure: function (form, action) {
                                    var errorJson = JSON.parse(action.response.responseText);
                                    Ext.Msg.show({
                                        title: 'Error...'
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
                                title: 'Error...'
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
    requestActosInicioappParticipantesData: function () {
        this.storeActosInicioappParticipantes.load();
    },
    requestActosInicioappParticipantesDataExport: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Descargue el archivo xls  .<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/actosinicioapp/server/ActosInicioappParticipantes.php';
                }
            }
        });
    },
    requestActosInicioappIntentosData: function () {
        this.storeActosInicioappIntentos.load();
    },
    requestActosInicioappIntentosDataExport: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Descargue el archivo xls  .<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/actosinicioapp/server/ActosInicioappIntentos.php';
                }
            }
        });
    },
    requestActosInicioappData: function () {
        this.storeActosInicioapp.load();
    },
    requestActosInicioappDataExport: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Descargue el archivo xls  .<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/actosinicioapp/server/ActosInicioapp.php';
                }
            }
        });
    },
    requestActosInicioappEstadisticasDataExport: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Descargue el archivo xls  .<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/actosinicioapp/server/ActosInicioappEstadisticas.php';
                }
            }
        });
    }
});
