QoDesk.ResolucionWindow = Ext.extend(Ext.app.Module, {
    id: 'resolucion',
    type: 'desktop/resolucion',

    init: function () {
        this.launcher = {
            text: 'Recepción documentos',
            iconCls: 'resolucion-icon',
            handler: this.createWindow,
            scope: this
        }
    },
    createWindow: function () {
        //Variables de acceso
        var accesosAdministrador = this.app.isAllowedTo('accesosAdministrador', this.id);
        var accesosSecretaria = this.app.isAllowedTo('accesosSecretaria', this.id);
        var accesosZonales = this.app.isAllowedTo('accesosZonales', this.id);
        var acceso = (accesosAdministrador || accesosSecretaria || accesosZonales) ? true : false
        var desktop = this.app.getDesktop();
        var AppMsg = new Ext.AppMsg({});
        var win = desktop.getWindow('grid-win-resolucion');

        //Ubicación de la carpeta de resolucion
        var urlResolucion = "modules/desktop/resolucion/server/";

        var textField = new Ext.form.TextField({allowBlank: false});

        //Definición del formato de fecha
        function formatDate(value) {
            return value ? value.dateFormat('Y-m-d H:i:s') : '';
        }

        //Inicio ventana resolucion ordenanzas
        //inicio combo ORDENANZA
        storeOrdenanza = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=ordenanzas'
        });

        var comboOrdenanza = new Ext.form.ComboBox({
            id: 'comboOrdenanza',
            store: storeOrdenanza,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function rendererOrdenanza(id) {
            var index = storeOrdenanza.findExact('id', id);
            if (index > -1) {
                var record = storeOrdenanza.getAt(index);
                return record.get('nombre');
            }
        }
        //fin combo ORDENANZA

        //inicio combo ZONAL
        storeZONALM = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=zonas'
        });

        var comboZONALM = new Ext.form.ComboBox({
            id: 'comboZONALM',
            store: storeZONALM,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function zonaAdmMantenimi(id) {
            var index = storeZONALM.findExact('id', id);
            if (index > -1) {
                var record = storeZONALM.getAt(index);
                return record.get('nombre');
            }
        }
        //fin combo ZONA

        //Definición de url CRUD
        var proxyResoluciones = new Ext.data.HttpProxy({
            api: {
                create: urlResolucion + "crudResoluciones.php?operation=insert",
                read: urlResolucion + "crudResoluciones.php?operation=select",
                update: urlResolucion + "crudResoluciones.php?operation=update",
                destroy: urlResolucion + "crudResoluciones.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Resoluciones
        var readerResoluciones = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'ordenanza', allowBlank: false},
                {name: 'articulo_numeral', allowBlank: false},
                {name: 'unidad', allowBlank: false},
                {name: 'comisaria', allowBlank: false},
                {name: 'numero_expediente', allowBlank: false},
                {name: 'numero_predio', allowBlank: false},
                {name: 'nombre_administrado', allowBlank: false},
                {name: 'nombre_establecimiento', allowBlank: false},
                {name: 'cedula_ruc', allowBlank: false},
                {name: 'funcionario', allowBlank: false},
                {name: 'numero_resolucion', allowBlank: false},
                {name: 'fecha_resolucion', allowBlank: false},
                {name: 'nulidad', allowBlank: false},
                {name: 'caducidad', allowBlank: false},
                {name: 'archivo', allowBlank: false},
                {name: 'es_obligatorio', allowBlank: false},
                {name: 'multa_impuesta', allowBlank: false},
                {name: 'observaciones', allowBlank: false},
                {name: 'direccion_infraccion', allowBlank: false},
                {name: 'direccion_notificacion', allowBlank: false},
            ]
        });

        //Definición de escritura en campos bdd Resoluciones
        var writerResoluciones = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para módulo Resoluciones
        this.storeResoluciones = new Ext.data.Store({
            id: "id",
            proxy: proxyResoluciones,
            reader: readerResoluciones,
            writer: writerResoluciones,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            autoSave: true,
            baseParams: {}
        });
        storeResoluciones = this.storeResoluciones;
        limiteresolucion = 100;
        storeResoluciones.baseParams = {
            limit: limiteresolucion
        };

        //Inicio formato grid Resoluciones
        this.gridResoluciones = new Ext.grid.EditorGridPanel({
            height: '100%',
            store: this.storeResoluciones,
            columns: [
                //Definición de campos bdd Resoluciones
                new Ext.grid.RowNumberer(),
                {header: 'id', dataIndex: 'id',width: 100, editor: textField},
                {header: 'Ordenanza', dataIndex: 'ordenanza', allowBlank:true, width: 80, editor: comboOrdenanza, renderer: rendererOrdenanza},
                {header: 'Artículo y numeral', dataIndex: 'articulo_numeral', allowBlank:true, width: 100, editor: textField},
                {header: 'Unidad', dataIndex: 'unidad', allowBlank:true, width: 150, editor: textField},
                {header: 'Comisaría', dataIndex: 'comisaria', allowBlank:true, width: 150, editor: textField},
                {header: 'Número de expediente', dataIndex: 'numero_expediente', allowBlank:true, width: 150, editor: textField},
                {header: 'Número de predio', dataIndex: 'numero_predio', allowBlank:true, width: 100, editor: textField},
                {header: 'Nombre de Administrado', dataIndex: 'nombre_administrado', allowBlank:true, width: 250, editor: textField},
                {header: 'Nombre del Establecimiento', dataIndex: 'nombre_estbleacimiento', allowBlank:true, width: 180, editor: textField},
                {header: 'Cédula o Ruc', dataIndex: 'cedula_ruc', allowBlank:true, width: 100, editor: textField},
                {header: 'Funcionario', dataIndex: 'funcionario', allowBlank:true, width: 200, editor: textField},
                {header: 'Número de Resolución', dataIndex: 'numero_resolucion', allowBlank:true, width: 140, editor: textField},
                {header: 'Fecha de Resolución', dataIndex: 'fecha_resolucion', allowBlank:true, width: 140, editor: textField},
                {header: 'Nulidad', dataIndex: 'nulidad', allowBlank:true, width: 140, editor: textField},
                {header: 'Caducidad', dataIndex: 'caducidad', allowBlank:true, width: 140, editor: textField},
                {header: 'Archivo', dataIndex: 'archivo', allowBlank:true, width: 140, editor: textField},
                {header: 'Obligación de hacer', dataIndex: 'es_obligatorio', allowBlank:true, width: 140, editor: textField},
                {header: 'Multa impuesta', dataIndex: 'multa_impuesta', allowBlank:true, width: 140, editor: textField},
                {header: 'Observaciones-Motivo de sanción/cumplimiento', allowBlank:true, dataIndex: 'observaciones', width: 140, editor: textField},
                {header: 'Dirección infracción', dataIndex: 'direccion_infraccion', allowBlank:true, width: 140, editor: textField},
                {header: 'Dirección notificación', dataIndex: 'direccion_notificacion', allowBlank:true, width: 140, editor: textField},
            ],
            viewConfig: {
                forceFit: false
            },
            sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteresolucion,
                store: storeResoluciones,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "No existen trámites que mostrar"
            })
        });
        //Fin formato grid Resoluciones
        //Fin ventana resolucion ordenanzas

        //Inicio ventana resolucion Providencias
        //Definición de url CRUD
        var proxyProvidencias = new Ext.data.HttpProxy({
            api: {
                create: urlResolucion + "crudProvidencias.php?operation=insert",
                read: urlResolucion + "crudProvidencias.php?operation=select",
                update: urlResolucion + "crudProvidencias.php?operation=update",
                destroy: urlResolucion + "crudProvidencias.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Providencias
        var readerProvidencias = new Ext.data.JsonReader({
            //totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'ordenanza', allowBlank: false},
                {name: 'articulo_numeral', allowBlank: false},
                {name: 'unidad', allowBlank: false},
                {name: 'comisaria', allowBlank: false},
                {name: 'numero_expediente', allowBlank: false},
                {name: 'numero_predio', allowBlank: false},
                {name: 'nombre_administrado', allowBlank: false},
                {name: 'nombre_establecimiento', allowBlank: false},
                {name: 'cedula_ruc', allowBlank: false},
                {name: 'funcionario', allowBlank: false},
                {name: 'numero_providencia', allowBlank: false},
                {name: 'fecha_providencia', allowBlank: false},
                {name: 'providencia', allowBlank: false},
                {name: 'valor_coactiva', allowBlank: false},
                {name: 'valor_cancelado', allowBlank: false},
                {name: 'clausura', allowBlank: false},
                {name: 'observaciones', allowBlank: false},


            ]
        });

        //Definición de escritura de campos bdd Providencias
        var writerProvidencias = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para pestaña Providencias
        this.storeProvidencias = new Ext.data.Store({
            id: "id",
            proxy: proxyProvidencias,
            reader: readerProvidencias,
            writer: writerProvidencias,
            //autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            autoSave: true
            //baseParams: {}
        });
        storeProvidencias = this.storeProvidencias;
        limiteresolucion = 20;
        storeProvidencias.baseParams = {
            limit: limiteresolucion
        };

        this.storeProvidencias.load();



        //Inicio formato grid pestaña Providencias
        this.gridProvidencias = new Ext.grid.EditorGridPanel({
            height: '100%',
            store: this.storeProvidencias,
            columns: [
                //Definición de campos bdd Providencias
                new Ext.grid.RowNumberer(),
                {header: 'Ordenanza', dataIndex: 'ordenanza', sortable: true, width: 80, editor: textField},
                {header: 'Artículo y numeral', dataIndex: 'articulo_numeral', sortable: true, width: 100, editor: textField},
                {header: 'Unidad', dataIndex: 'unidad', sortable: true, width: 150, editor: textField},
                {header: 'Comisaría', dataIndex: 'comisaria', sortable: true, width: 150, editor: textField},
                {header: 'Número de expediente', dataIndex: 'numero_expediente', sortable: true, width: 150, editor: textField},
                {header: 'Número de predio', dataIndex: 'numero_predio', sortable: true, width: 100, editor: textField},
                {header: 'Nombre de Administrado', dataIndex: 'nombre_administrado', sortable: true, width: 250, editor: textField},
                {header: 'Nombre del Establecimiento', dataIndex: 'nombre_establecimiento', sortable: true, width: 180, editor: textField},
                {header: 'Cédula o Ruc', dataIndex: 'cedula_ruc', sortable: true, width: 100, editor: textField},
                {header: 'Funcionario', dataIndex: 'funcionario', sortable: true, width: 200, editor: textField},
                {header: 'Número de Providencia', dataIndex: 'numero_providencia', sortable: true, width: 140, editor: textField},
                {header: 'Fecha de Resolución', dataIndex: 'fecha_resolucion', sortable: true, width: 140, editor: textField},
                {header: 'Número de Providencia', dataIndex: 'numero_providencia', sortable: true, width: 140, editor: textField},
                {header: 'Fecha de Providencia', dataIndex: 'fecha_providencia', sortable: true, width: 140, editor: textField},
                {header: 'Providencia', dataIndex: 'providencia', sortable: true, width: 140, editor: textField},
                {header: 'Valor Coactiva', dataIndex: 'valor_coactiva', sortable: true, width: 140, editor: textField},
                {header: 'Valor Cancelado', dataIndex: 'valor_cancelado', sortable: true, width: 140, editor: textField},
                {header: 'Clausura', dataIndex: 'clausura', sortable: true, width: 140, editor: textField},
                {header: 'Observaciones', dataIndex: 'observaciones', sortable: true, width: 140, editor: textField},


            ],
            viewConfig: {
                forceFit: false
            },
            sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteresolucion,
                store: storeProvidencias,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "No existen trámites que mostrar"
            })
        });
        //Fin formato grid pestaña Providencias
        //Fin ventana resolucion Providencias



        //Creación variable ventana
        var win = desktop.getWindow('layout-win');

        if (!win) {
            //Creación variables de tamaño vertical y horizontal en función del espacio utilizado por el browser en la pantalla
            var winWidth = desktop.getWinWidth();
            var winHeight = desktop.getWinHeight();
            //this.seleccionDepar = 3;
            var checkHandler = function (item, checked) {
                if (checked) {
                    var store = this.storeResoluciones;
                    store.baseParams.filterField = item.key;
                    searchFieldBtn.setText(item.text);
                }
            };

            var targetHandler = function (item, checked) {
                if (checked) {
                    //var store = this.storeResoluciones;
                    this.seleccionDepar = item.key;
                    this.targetFieldBtn.setText(item.text);
                }
            };

            var searchFieldBtn = new Ext.Button({
                menu: new Ext.menu.Menu({
                    items: [
                        {
                            checked: true,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'busqueda_todos',
                            scope: this,
                            text: 'Todos'
                        },
                        {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'numero_tramite',
                            scope: this,
                            text: 'Número trámite'
                        }
                        , {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'ruc_licencia',
                            scope: this,
                            text: 'RUC/licencia'
                        }
                        , {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'codigo',
                            scope: this,
                            text: 'Código'
                        }

                        , {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'patente',
                            scope: this,
                            text: 'Patente'
                        }, {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'predio',
                            scope: this,
                            text: 'Predio'
                        }, {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'razon_social',
                            scope: this,
                            text: 'Razón social'
                        }
                    ]
                })
                , text: 'Todos'
            });

            //Creación de la ventana win
            win = desktop.createWindow({
                id: 'grid-win-resolucion',
                //Definición del título de la ventana
                title: 'Consulta Resolucion',
                //Definición de tamaños de la ventana
                width: winWidth,
                height: winHeight,
                iconCls: 'resolucion-icon',
                shim: false,
                animCollapse: false,
                constrainHeader: true,
                //Creación de panel de pestañas
                items: new Ext.TabPanel({
                    activeTab: 0,
                    border: false,
                    items: [
                        //Pestaña Resoluciones
                        {
                            autoScroll: true,
                            title: 'Resoluciones',
                            closable: true,
                            layout: 'fit',
                            height: winHeight - 70,
                            //Barra de botones
                            tbar: [
                                //Definición de botón nuevo
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.addResoluciones,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                {
                                    //Definición de botón eliminar
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deleteResoluciones,
                                    iconCls: 'delete-icon'
                                },
                                '-',
                                //Definición de botón regargar datos
                                {
                                    iconCls: 'demo-grid-add',
                                    handler: this.requestGridDataResoluciones,
                                    scope: this,
                                    text: 'Recargar Datos'
                                }
                            ]
                            //Llamado a función que arma la tabla de datos
                            , items: this.gridResoluciones
                        }
                        //Pestaña unidades
                        , {
                            autoScroll: true,
                            title: 'Providencias',
                            closable: true,
                            layout: 'fit',
                            height: winHeight - 70,
                            //disabled: this.app.isAllowedTo('accesosAdministrador', this.id) ? false : true,
                            //Barra de botones
                            tbar: [
                                //Definición de botón nuevo
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.addProvidencias,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                //Definición de botón eliminar
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deleteProvidencias,
                                    iconCls: 'delete-icon'
                                },
                                '-',
                                //Definición de botón regargar datos
                                {
                                    iconCls: 'demo-grid-add',
                                    handler: this.requestGridDataProvidencias,
                                    scope: this,
                                    text: 'Recargar Datos'
                                }
                            ],
                            //Llamado a función que arma la tabla de datos
                            items: this.gridProvidencias
                        }

                    ]
                }),
            });
        }
        //Llamado a función que muestra la ventana en pantalla
        win.show();
        setTimeout(function () {
            this.storeResoluciones.load({
                params: {
                    start: 0,
                    limit: limiteresolucion
                }
            });
        }, 10);
    },

    //Función para eliminación de registros de Resoluciones
    deleteResoluciones: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de borrar el registro seleccionado?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridResoluciones.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeResoluciones.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de Resoluciones
    addResoluciones: function () {
        var operativos = new this.storeResoluciones.recordType({
            id: '',
            nombre: '',
            nombre_completo: '',
            activo: '',
            orden: '',
        });
        this.gridResoluciones.stopEditing();
        this.storeResoluciones.insert(0, operativos);
        this.gridResoluciones.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de Resoluciones
    requestGridDataResoluciones: function () {
        this.storeResoluciones.load();
    },

    //Función para carga de datos
    requestGridData: function () {
        this.storeResoluciones.load({
            params:
                {
                    start: 0,
                    limit: limiteresolucion
                }
        });
    },

    //Función para eliminación de datos
    deleteProvidencias: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridProvidencias.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeProvidencias.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de Providencias
    addProvidencias: function () {
        var ordenanzasProvidencias = new this.storeProvidencias.recordType({
            id: ' ',
            nombre: '',
            activo: '1',
            secretaria: '0'
        });
        this.gridProvidencias.stopEditing();
        this.storeProvidencias.insert(0, ordenanzasProvidencias);
        this.gridProvidencias.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de Providencias
    requestGridDataProvidencias: function () {
        this.storeProvidencias.load();
    },

    //Función para eliminación de registros de Zonas
    deleteZonas: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridZonas.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeZonas.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de Zonas
    addZonas: function () {
        var denunciasZonas = new this.storeZonas.recordType({
            id: ' ',
            nombre: '',
            activo: '1'
        });
        this.gridZonas.stopEditing();
        this.storeZonas.insert(0, denunciasZonas);
        this.gridZonas.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de Zonas
    requestGridDataZonas: function () {
        this.storeZonas.load();
    },

});

