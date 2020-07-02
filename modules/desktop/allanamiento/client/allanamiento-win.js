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

        var grabarDenuncia = this.app.isAllowedTo('grabarDenuncia', this.id);

        var win = desktop.getWindow('grid-win-allanamiento');
        //var urlAllanamiento = "amcserver/";
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
                , {header: 'Id', dataIndex: 'id', sortable: true, width: 10, scope: this}
                , {header: 'codigo_tramite', dataIndex: 'codigo_tramite', sortable: true, width: 70, scope: this}
                , {header: 'asignado', dataIndex: 'asignado', sortable: true, width: 25, scope: this}
                , {header: 'confirmed', dataIndex: 'confirmed', sortable: true, width: 25, scope: this}
                , {header: 'procesado', dataIndex: 'procesado', sortable: true, width: 25, scope: this}
                , {header: 'fechaprocesado', dataIndex: 'fechaprocesado', sortable: true, width: 40, renderer: formatDate}

                , {header: 'cedula', dataIndex: 'cedula', sortable: true, width:30, scope: this}
                , {header: 'nombres', dataIndex: 'nombres', sortable: true, width:60, scope: this}
                , {header: 'apellidos', dataIndex: 'apellidos', sortable: true, width: 60, scope: this}
                , {header: 'materia', dataIndex: 'materia', sortable: true, width: 55, scope: this}
                , {header: 'zonal', dataIndex: 'zonal', sortable: true, width: 40, scope: this}
                , {header: 'tipoadministrador', dataIndex: 'tipoadministrador', sortable: true, width: 30, scope: this}
                , {header: 'establecimiento', dataIndex: 'establecimiento', sortable: true, width: 40, scope: this}
                , {header: 'ubicacion', dataIndex: 'ubicacion', sortable: true, width: 60, scope: this}
                , {header: 'actividad', dataIndex: 'actividad', sortable: true, width: 60, scope: this}
                , {header: 'fechaacto', dataIndex: 'fechaacto', sortable: true, width: 40, renderer: formatDate}
                , {header: 'descripcion', dataIndex: 'descripcion', sortable: true, width: 60, scope: this}
                , {header: 'domicilio', dataIndex: 'domicilio', sortable: true, width: 60, scope: this}
                , {header: 'correoelectronico', dataIndex: 'correoelectronico', sortable: true, width: 60, scope: this}
                , {header: 'celular', dataIndex: 'celular', sortable: true, width: 40, scope: this}
                , {header: 'fecha', dataIndex: 'fecha', sortable: true, width: 40, renderer: formatDate}
                , {header: 'observaciones', dataIndex: 'observaciones', sortable: true, width: 60, scope: this}
                , {header: 'imagenasolicitud', dataIndex: 'imagenasolicitud', sortable: true, width: 15, scope: this}
                , {header: 'imagenaluae', dataIndex: 'imagenaluae', sortable: true, width: 15, scope: this}
                , {header: 'ip', dataIndex: 'ip', allowBlank: false, hidden:true}

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
                        this.idDenunciasRecuperada = rec.id;
                        /*cargar el formulario*/
                        cargaDetalle(rec.id, this.formAllanamientoDetalle, rec);

                        if (grabarDenuncia) {
                            if (this.record.get("prosesado") == 'true') {
                                Ext.getCmp('tb_negardenuncias').setDisabled(true);
                                Ext.getCmp('tb_aprobardenuncias').setDisabled(true);
                                Ext.getCmp('motivoNegarDenuncia').setDisabled(true);
                            }
                            else {
                                Ext.getCmp('tb_negardenuncias').setDisabled(false);
                                Ext.getCmp('tb_aprobardenuncias').setDisabled(false);
                                Ext.getCmp('motivoNegarDenuncia').setDisabled(false);
                            }
                        } else {
                            Ext.getCmp('tb_negardenuncias').setDisabled(true);
                            Ext.getCmp('tb_aprobardenuncias').setDisabled(true);
                            Ext.getCmp('motivoNegarDenuncia').setDisabled(true);
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
                displayMsg: 'Mostrando denuncias {0} - {1} of {2}',
                emptyMsg: "No existen denuncias que mostrar"
            }),
        });
        //fin Allanamiento tab

        //var desktop = this.app.getDesktop();
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
                        id: 'formcabeceradenuncias',
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
                                text: 'Aprobar denuncia',
                                scope: this,
                                handler: this.aprobardenuncias,
                                iconCls: 'save-icon',
                                disabled: true,
                                id: 'tb_aprobardenuncias'
                                , formBind: true
                            }, {
                                text: 'Negar denuncia',
                                scope: this,
                                handler: this.negardenuncias,
                                iconCls: 'save-icon',
                                disabled: true,
                                id: 'tb_negardenuncias',
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
                                        columnWidth: 1 / 4,
                                        cls: 'margen10',
                                        layout: 'form',
                                        monitorValid: true,
                                        items: [
                                            {xtype: 'hidden', name: 'id'},
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
                                                fieldLabel: 'Denuncia',
                                                name: 'urldenuncia2'
                                            },
                                            {
                                                xtype: 'displayfield',
                                                hideLabel: true,
                                                value: '1. DATOS DEL DENUNCIANTE',
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
                                                value: '2. DATOS DEL DENUNCIADO',
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
                                                fieldLabel: 'total denuncias',
                                                name: 'totaldenuncias',
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
                    /*'-',
                     {
                     iconCls: 'demo-grid-add',
                     handler: this.requestAllanamientoDataExport,
                     scope: this,
                     text: 'Boton 1',
                     tooltip: 'Exportar datos en la grilla'
                     },
                     '-',
                     {
                     iconCls: 'demo-grid-add',
                     handler: this.requestAllanamientoEstadisticasDataExport,
                     scope: this,
                     text: 'Boton 2',
                     tooltip: 'Exportar Estadisticas'
                     },*/
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
        function cargaDetalle(denuncias, forma, bloqueo) {
            forma = Ext.getCmp('formAllanamientoDetalle');
            forma.getForm().load({
                waitMsg: 'Recuperando información',
                url: urlDenunciasLocal + 'crudAllanamiento.php?operation=selectForm',
                params: {
                    id: denuncias
                },
                success: function (response, opts) {
                    mensaje = Ext.getCmp('textDenunciasAnteriores');
                    mensaje.setText('Denuncias anteriores: ' + (response.findField('totaldenuncias').getValue() - 1))
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
    aprobardenuncias: function () {
        store = this.storeAllanamiento;
        var urlAllanamiento = this.urlAllanamiento;
        var urlDenunciasLocal = this.urlDenunciasLocal;
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Desea aprobar la denuncia.<br>¿Desea continuar?',
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
                                    Ext.getCmp('tb_negardenuncias').setDisabled(true);
                                    Ext.getCmp('tb_aprobardenuncias').setDisabled(true);
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
    negardenuncias: function () {
        store = this.storeAllanamiento;
        var urlAllanamiento = this.urlAllanamiento;
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Desea negar la denuncia, .<br>¿Desea continuar?',
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

                            Ext.getCmp('tb_negardenuncias').setDisabled(true);
                            Ext.getCmp('tb_aprobardenuncias').setDisabled(true);
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



