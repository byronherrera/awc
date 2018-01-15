QoDesk.MantenimientoWindow = Ext.extend(Ext.app.Module, {
    id: 'mantenimiento',
    type: 'desktop/mantenimiento',

    init: function () {
        this.launcher = {
            text: 'Recepción documentos',
            iconCls: 'mantenimiento-icon',
            handler: this.createWindow,
            scope: this
        }
    },
    createWindow: function () {
        var accesosAdministrador = this.app.isAllowedTo('accesosAdministrador', this.id);
        var accesosSecretaria = this.app.isAllowedTo('accesosSecretaria', this.id);
        var accesosZonales = this.app.isAllowedTo('accesosZonales', this.id);
        var acceso = (accesosAdministrador || accesosSecretaria || accesosZonales) ? true : false
        var desktop = this.app.getDesktop();
        var AppMsg = new Ext.AppMsg({});
        var win = desktop.getWindow('grid-win-mantenimiento');

        var urlOrdenanzas = "modules/desktop/mantenimiento/server/";

        var textField = new Ext.form.TextField({allowBlank: false});
        function formatDate(value) {
            return value ? value.dateFormat('Y-m-d H:i:s') : '';
        }

        // inicio ventana mantenimiento ordenanzas
        var proxyOrdenanzas = new Ext.data.HttpProxy({
            api: {
                create: urlOrdenanzas + "crudOrdenanzas.php?operation=insert",
                read: urlOrdenanzas + "crudOrdenanzas.php?operation=select",
                update: urlOrdenanzas + "crudOrdenanzas.php?operation=update",
                destroy: urlOrdenanzas + "crudOrdenanzas.php?operation=delete"
            }
        });

        var readerOrdenanzas = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'nombre', allowBlank: true},
                {name: 'nombre_completo', allowBlank: true},
                {name: 'activo', allowBlank: true},
                {name: 'orden', allowBlank: true}

            ]
        });

        var writerOrdenanzas = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        this.storeOrdenanzas = new Ext.data.Store({
            id: "id",
            proxy: proxyOrdenanzas,
            reader: readerOrdenanzas,
            writer: writerOrdenanzas,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            autoSave: true,
            baseParams: {}
        });
        storeOrdenanzas = this.storeOrdenanzas;
        limitemantenimiento = 100;

        storeOrdenanzas.baseParams = {
            limit: limitemantenimiento
        };

        this.gridOrdenanzas = new Ext.grid.EditorGridPanel({
            height: '100%',
            store: this.storeOrdenanzas,
            columns: [
                new Ext.grid.RowNumberer(),
                {header: 'nombre', dataIndex: 'nombre', sortable: true,width: 200, editor: textField},
                {header: 'nombre_completo', dataIndex: 'nombre_completo', sortable: true,width: 200, editor: textField},
                {header: 'activo', dataIndex: 'activo', sortable: true,width: 100, editor: textField},
                {header: 'orden', dataIndex: 'orden', sortable: true,width: 100, editor: textField}
            ],
            viewConfig: {
                forceFit: false
            },
            sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: limitemantenimiento,
                store: storeOrdenanzas,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "No existen trámites que mostrar"
            })
        });

        var win = desktop.getWindow('layout-win');

        if (!win) {
            var winWidth = desktop.getWinWidth();
            var winHeight = desktop.getWinHeight();

            this.seleccionDepar = 3;

            var checkHandler = function (item, checked) {
                if (checked) {
                    var store = this.storeOrdenanzas;
                    store.baseParams.filterField = item.key;
                    searchFieldBtn.setText(item.text);
                }
            };

            var targetHandler = function (item, checked) {
                if (checked) {
                    //var store = this.storeOrdenanzas;
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

            win = desktop.createWindow({
                id: 'grid-win-mantenimiento',
                title: 'Consulta LUAE',
                width: winWidth,
                height: winHeight,
                iconCls: 'mantenimiento-icon',
                shim: false,
                animCollapse: false,
                constrainHeader: true,
                tbar: [
                     { text: 'Buscar por:', xtype: 'tbtext'}
                    , searchFieldBtn
                    , ' ', ' '
                    , new QoDesk.QoAdmin.SearchField({
                        paramName: 'filterText'
                        , store: this.storeOrdenanzas
                    })
                ],
                layout: 'fit',
                items: this.gridOrdenanzas
            });
        }
        win.show();
        setTimeout(function () {
            this.storeOrdenanzas.load({
                params: {
                    start: 0,
                    limit: limitemantenimiento
                }
            });
        }, 10);
    },

    deleteoperativos: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridOperativos.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeOperativos.remove(rows);
                }
            }
        });
    },
    addoperativos: function () {
        var operativos = new this.storeOperativos.recordType({
            id: '',
            nombre: '',
            nombre_completo: '',
            activo: '',
            orden: '',
        });
        this.gridOperativos.stopEditing();
        this.storeOperativos.insert(0, operativos);
        this.gridOperativos.startEditing(0, 0);
    },
    requestGridData: function () {
        this.storeOperativos.load();
    },


    requestGridData: function () {
        this.storeOrdenanzas.load({params:
            {
                start: 0,
                limit: limitemantenimiento
            }
        });
    },

});