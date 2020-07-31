QoDesk.RecordatoriosWindow = Ext.extend(Ext.app.Module, {
    id: 'recordatorios',
    type: 'desktop/recordatorios',

    init: function () {
        this.launcher = {
            text: 'Recordatorios',
            iconCls: 'recordatorios-icon',
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
        var win = desktop.getWindow('grid-win-recordatorios');
        var urlRecordatorios = "modules/desktop/recordatorios/server/";
        var textField = new Ext.form.TextField({allowBlank: false});
        function formatDate(value) {
            return value ? value.dateFormat('Y-m-d H:i:s') : '';
        }

        // inicio ventana recordatorios
        var proxyRecordatorios = new Ext.data.HttpProxy({
            api: {
                create: urlRecordatorios + "crudRecordatorios.php?operation=insert",
                read: urlRecordatorios + "crudRecordatorios.php?operation=select",
                update: urlRecordatorios + "crudRecordatorios.php?operation=update",
                destroy: urlRecordatorios + "crudRecordatorios.php?operation=delete"
            },
            listeners: {
                write: function (proxy, action, result, res, rs) {
                    if (typeof res.message !== 'undefined') {
                        if (res.message != '') {
                            AppMsg.setAlert(AppMsg.STATUS_NOTICE, res.message);
                        }
                    }
                }
            }
        });

        var readerRecordatorios = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name:'id', allowBlank: true},
                {name:'id_responsable', allowBlank: true},
                {name:'nombres', allowBlank: true},
                {name:'apellidos', allowBlank: true},
                {name:'tema', allowBlank: true},
                {name:'fecha_inicio', allowBlank: true},
                {name:'fecha_entrega', allowBlank: true},
                {name:'activo', allowBlank: true},
                {name:'idingreso', allowBlank: true},
                {name:'observaciones', allowBlank: true}

            ]
        });
        var writerRecordatorios = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        this.storeRecordatorios = new Ext.data.Store({
            id: "id",
            proxy: proxyRecordatorios,
            reader: readerRecordatorios,
            writer: writerRecordatorios,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            baseParams: {}
        });
        storeRecordatorios = this.storeRecordatorios;
        limiterecordatorios = 100;

        storeRecordatorios.baseParams = {
            limit: limiterecordatorios
        };

        this.gridRecordatorios = new Ext.grid.EditorGridPanel({
            height: '100%',
            store: this.storeRecordatorios,
            columns: [
                new Ext.grid.RowNumberer(),
                {header:'id', dataIndex:'id', sortable: true,width: 125},
                {header:'cedula', dataIndex:'cedula', sortable: true,width: 125},
                {header:'lugarinfraccion', dataIndex:'lugarinfraccion', sortable: true,width: 125},
                {header:'nombres', dataIndex:'nombres', sortable: true,width: 125},
                {header:'apellidos', dataIndex:'apellidos', sortable: true,width: 125},
                {header:'observaciones', dataIndex:'observaciones', sortable: true,width: 125},
                {header:'geoposicionamiento', dataIndex:'geoposicionamiento', sortable: true,width: 125},
                {header:'funcionario', dataIndex:'funcionario', sortable: true,width: 125},
                {header:'idzonal', dataIndex:'idzonal', sortable: true,width: 125},
                {header:'zonal', dataIndex:'zonal', sortable: true,width: 125},
                {header:'fecha', dataIndex:'fecha', sortable: true,width: 125}
            ],
            viewConfig: {
                forceFit: false
            },
            sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: limiterecordatorios,
                store: storeRecordatorios,
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
                    var store = this.storeRecordatorios;
                    store.baseParams.filterField = item.key;
                    searchFieldBtn.setText(item.text);
                }
            };

            var targetHandler = function (item, checked) {
                if (checked) {
                    //var store = this.storeRecordatorios;
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
                id: 'grid-win-recordatorios',
                title: 'Consulta Sanción Recordatorios',
                width: winWidth,
                height: winHeight,
                iconCls: 'recordatorios-icon',
                shim: false,
                animCollapse: false,
                constrainHeader: true,
                tbar: [
                     { text: 'Buscar por:', xtype: 'tbtext'}
                    , searchFieldBtn
                    , ' ', ' '
                    , new QoDesk.QoAdmin.SearchField({
                        paramName: 'filterText'
                        , store: this.storeRecordatorios
                    })
                ],
                layout: 'fit',
                items: this.gridRecordatorios
            });
        }
        win.show();
        setTimeout(function () {
            this.storeRecordatorios.load({
                params: {
                    start: 0,
                    limit: limiterecordatorios
                }
            });
        }, 10);
    },

    requestGridData: function () {
        this.storeRecordatorios.load({params:
            {
                start: 0,
                limit: limiterecordatorios
            }
        });
    },

});