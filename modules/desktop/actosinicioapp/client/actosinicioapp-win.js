QoDesk.ActosInicioAppWindow = Ext.extend(Ext.app.Module, {
    id: 'actosinicioapp',
    type: 'desktop/actosinicioapp',
    init: function () {
        this.launcher = {
            text: 'Actosinicioapp',
            iconCls: 'actosinicioapp-icon',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function () {
        var desktop = this.app.getDesktop();
        //var grabarDenuncia = this.app.isAllowedTo('grabarDenuncia', this.id);
        var win = desktop.getWindow('grid-win-actosinicioapp');
        var urlActosInicioapp = "http://agenciadecontrol.quito.gob.ec/amcserver/"; // servidor produccion
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

        function actosInicioappActivo(id) {
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
                url: urlDenunciasweb + 'uploadimagen.php',
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

        //Denunciasweb tab
        var proxyActosInicioApp = new Ext.data.HttpProxy({
            api: {
                create: urlActosInicioapp + "crudActosinicioapp.php?operation=insert",
                read: urlActosInicioapp + "crudActosinicioapp.php?operation=select",
                update: urlActosInicioapp + "crudActosinicioapp.php?operation=upda",
                destroy: urlActosInicioapp + "crudActosinicioapp.php?operation=delete"
            }
        });

        var readerActosInicioApp = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: false},
                {name: 'aislamiento_obligatorio', allowBlank: false},
                {name: 'cedula', allowBlank: false},
                {name: 'conductorSinMascarilla', allowBlank: false},
                {name: 'direccionDomicilio', allowBlank: false},
                {name: 'direccionInfraccion', allowBlank: false},
                {name: 'email', allowBlank: false},
                {name: 'fechaInfraccion', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'foto', allowBlank: false},
                {name: 'foto1', allowBlank: false},
                {name: 'hechosInfraccion', allowBlank: false},
                {name: 'horaInfraccion', allowBlank: false},
                {name: 'infraccionSinMascarilla', allowBlank: false},
                {name: 'infraccioncedula', allowBlank: false},
                {name: 'infracciondistancia', allowBlank: false},
                {name: 'nombres', allowBlank: false},
                {name: 'sancion_25_SMU', allowBlank: false},
                {name: 'sancion_50_SMU', allowBlank: false},
                {name: 'sancion_tres_salarios', allowBlank: false},
                {name: 'sancion_un_salario_medio', allowBlank: false}
            ]
        });

        var writerActosInicioApp = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        var storeActosInicioApp = new Ext.data.Store({
            id: "storeDenunciasweb",
            proxy: proxyActosInicioApp,
            reader: readerActosInicioApp,
            writer: writerActosInicioApp,
            autoSave: true
        });
        storeActosInicioApp.load();
        limitActosInicioApp = 50

        this.storeActosInicioApp = storeActosInicioApp;

        this.gridActosInicioApp = new Ext.grid.EditorGridPanel({
            height: 200,
            widht: '100%',
            store: storeActosInicioApp, columns: [
                new Ext.grid.RowNumberer({width: 40})
                , {header: 'Id', dataIndex: 'id', sortable: true, width: 10, scope: this}
                , {header: 'Aislamiento Obligatorio', dataIndex: 'aislamiento_obligatorio', sortable: true, width: 15, scope: this}
                , {header: 'Cédula', dataIndex: 'cedula', sortable: true, width: 15, scope: this}
                , {header: 'Conductor sin Mascarilla', dataIndex: 'conductorSinMascarilla', sortable: true, width: 25, scope: this}
                , {header: 'Dirección de Domicilio', dataIndex: 'direccionDomicilio', sortable: true, width: 15, scope: this}
                , {header: 'Dirección de Infracción', dataIndex: 'direccionInfraccion', sortable: true, width: 15, scope: this}
                , {header: 'Email', dataIndex: 'email', sortable: true, width: 30, scope: this}
                , {header: 'Fecha Infracción', dataIndex: 'fechaInfraccion', sortable: true, width: 30, scope: this}
                , {header: 'Foto', dataIndex: 'foto', sortable: true, width: 50, scope: this}
                , {header: 'Foto 1', dataIndex: 'foto1', sortable: true, width: 20, scope: this}
                , {header: 'Hechos Infracción', dataIndex: 'hechosInfraccion', sortable: true, width: 30, renderer: formatDate}
                , {header: 'Hora Infracción', dataIndex: 'horaInfraccion', sortable: true, width: 20, scope: this}
                , {header: 'Infracción sin Mascarilla', dataIndex: 'infraccionSinMascarilla', sortable: true, width: 30, scope: this}
                , {header: 'Infraccción Cédula', dataIndex: 'infraccioncedula', sortable: true, width: 30, scope: this}
                , {header: 'Infraccción Distancia', dataIndex: 'infracciondistancia', sortable: true, width: 30, scope: this}
                , {header: 'Nombres', dataIndex: 'nombres', sortable: true, width: 30, scope: this}
                , {header: 'Sanción 25 SMU', dataIndex: 'sancion_25_SMU', sortable: true, width: 30, scope: this}
                , {header: 'Sanción 50 SMU', dataIndex: 'sancion_50_SMU', sortable: true, width: 30, scope: this}
                , {header: 'Sanción tres salarios', dataIndex: 'sancion_tres_salarios', sortable: true, width: 30, scope: this}
                , {header: 'Sanción un salario medio', dataIndex: 'sancion_un_salario_medio', sortable: true, width: 30, scope: this}
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
                        this.actoInicioAppSelected = rec;
                        cargaDetalle(rec.id);
                    }
                }
            }),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: limitActosInicioApp,
                store: storeActosInicioApp,
                displayInfo: true,
                displayMsg: 'Mostrando actos inicio {0} - {1} of {2}',
                emptyMsg: "No existen actos inicio que mostrar"
            }),
        });

        //var desktop = this.app.getDesktop();
        var win = desktop.getWindow('layout-win');

        if (!win) {

            var checkHandler = function (item, checked) {
                if (checked) {
                    var store = this.storeActosInicioApp;
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
                        }
                        , {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'nombres',
                            scope: this,
                            text: 'Nombres'
                        }
                        , {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'fechaInfraccion',
                            scope: this,
                            text: 'Fecha Infracción'
                        }
                        , {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'direccionDomicilio',
                            scope: this,
                            text: 'Dirección de Domicilio'
                        }
                        , {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'direccionInfraccion',
                            scope: this,
                            text: 'Dirección de Infracción'
                        }
                    ]
                })
                , text: 'Cédula'
            });


            this.formActosInicioApp = new Ext.FormPanel({
                id: 'formActosInicioApp',
                cls: 'no-border',
                items: [
                    {
                        region: 'north',
                        height: 200,

                        autoScroll: false,
                        id: 'formCabeceraActosInicioApp',
                        items: this.gridActosInicioApp
                    },
                    {
                        region: 'center',
                        split: true,
                        autoScroll: true,

                        height: winHeight - 265,
                        minSize: 100,
                        margins: '0 0 0 0',
                        tbar: [],
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
                                            {
                                                xtype: 'displayfield',
                                                hideLabel: true,
                                                value: '1. DATOS PERSONALES',
                                                cls: 'negrilla',
                                                anchor: '95%'
                                            }
                                            , {xtype: 'displayfield',
                                                fieldLabel: 'Cédula',
                                                name: 'cedula'}
                                            , {
                                                xtype: 'compositefield',
                                                fieldLabel: 'Nombres',
                                                name: 'nombres',
                                            }
                                            , {xtype: 'displayfield',
                                                fieldLabel: 'Email',
                                                name: 'email'}
                                            ,{
                                                xtype: 'displayfield',
                                                fieldLabel: 'Dirección Domicilio',
                                                name: 'direccionDomicilio',
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
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Hechos',
                                                name: 'hechosInfraccion',
                                                anchor: '96%'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Dirección',
                                                name: 'direccionInfraccion',
                                                anchor: '96%'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Fecha',
                                                name: 'fechaInfraccion',
                                                anchor: '96%'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Hora',
                                                name: 'horaInfraccion',
                                                anchor: '96%'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Conductor Sin Mascarilla',
                                                name: 'conductorSinMascarilla',
                                                anchor: '96%'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Sin Mascarilla',
                                                name: 'infraccionSinMascarilla',
                                                anchor: '96%'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Sin Cédula',
                                                name: 'infraccioncedula',
                                                anchor: '96%'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Sin Distancia',
                                                name: 'infracciondistancia',
                                                anchor: '96%'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Sin Distancia',
                                                name: 'infracciondistancia',
                                                anchor: '96%'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Sanción 25 SMU',
                                                name: 'sancion_25_SMU',
                                                anchor: '96%'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Sanción 50 SMU',
                                                name: 'sancion_50_SMU',
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
                                                fieldLabel: 'Foto',
                                                name: 'foto'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Foto 1',
                                                name: 'foto1'
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
                id: 'grid-win-actoInicioApp',
                title: 'Acto Inicio',
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
                        handler: this.requestDenunciaswebData,
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
                        , store: this.storeActosInicioApp
                    })
                ],
                items: this.formActosInicioApp
            });
        }
        win.show();
        function cargaDetalle(id) {
            forma = Ext.getCmp('formActosInicioApp');
            forma.getForm().load({
                waitMsg: 'Recuperando información',
                url: urlActosInicioapp + 'crudActosinicioapp.php?operation=selectForm',
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
            Ext.getCmp('cedula').setReadOnly(activar);
            Ext.getCmp('aislamiento_obligatorio').setReadOnly(activar);
            Ext.getCmp('conductorSinMascarilla').setReadOnly(activar);
            Ext.getCmp('direccionDomicilio').setReadOnly(activar);
            Ext.getCmp('direccionInfraccion').setReadOnly(activar);
            Ext.getCmp('email').setReadOnly(activar);
            Ext.getCmp('fechaInfraccion').setReadOnly(activar);
            Ext.getCmp('foto').setReadOnly(activar);
            Ext.getCmp('foto1').setReadOnly(activar);
            Ext.getCmp('hechosInfraccion').setReadOnly(activar);
            Ext.getCmp('horaInfraccion').setReadOnly(activar);
            Ext.getCmp('infraccionSinMascarilla').setReadOnly(activar);
            Ext.getCmp('infraccioncedula').setReadOnly(activar);
            Ext.getCmp('infracciondistancia').setReadOnly(activar);
            Ext.getCmp('nombres').setReadOnly(activar);
            Ext.getCmp('sancion_25_SMU').setReadOnly(activar);
            Ext.getCmp('sancion_50_SMU').setReadOnly(activar);
            Ext.getCmp('sancion_tres_salarios').setReadOnly(activar);
            Ext.getCmp('sancion_un_salario_medio').setReadOnly(activar);
        };


    },
    requestActosInicioAppData: function () {
        this.storeActosInicioApp.load();
    }
});


