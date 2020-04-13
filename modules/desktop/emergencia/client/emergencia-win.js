QoDesk.EmergenciaWindow = Ext.extend(Ext.app.Module, {
    id: 'emergencia',
    type: 'desktop/emergencia',

    init: function () {
        this.launcher = {
            text: 'Recepción documentos',
            iconCls: 'emergencia-icon',
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
        var win = desktop.getWindow('grid-win-emergencia');
        var urlEmergencia = "modules/desktop/emergencia/server/";
        var textField = new Ext.form.TextField({allowBlank: false});
        function formatDate(value) {
            return value ? value.dateFormat('Y-m-d H:i:s') : '';
        }

        // inicio ventana emergencia
        var proxyEmergencia = new Ext.data.HttpProxy({
            api: {
                create: urlEmergencia + "crudEmergencia.php?operation=insert",
                read: urlEmergencia + "crudEmergencia.php?operation=select",
                update: urlEmergencia + "crudEmergencia.php?operation=update",
                destroy: urlEmergencia + "crudEmergencia.php?operation=delete"
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

        var readerEmergencia = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name:'id', allowBlank: true},
                {name:'cedula', allowBlank: true},
                {name:'lugarinfraccion', allowBlank: true},
                {name:'nombres', allowBlank: true},
                {name:'apellidos', allowBlank: true},
                {name:'observaciones', allowBlank: true},
                {name:'geoposicionamiento', allowBlank: true},
                {name:'funcionario', allowBlank: true},
                {name:'idzonal', allowBlank: true},
                {name:'zonal', allowBlank: true},
                {name:'fecha', allowBlank: true}
            ]
        });
        var writerEmergencia = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        this.storeEmergencia = new Ext.data.Store({
            id: "id",
            proxy: proxyEmergencia,
            reader: readerEmergencia,
            writer: writerEmergencia,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            baseParams: {}
        });
        storeEmergencia = this.storeEmergencia;
        limiteemergencia = 100;

        storeEmergencia.baseParams = {
            limit: limiteemergencia
        };

        this.gridEmergencia = new Ext.grid.EditorGridPanel({
            height: '100%',
            store: this.storeEmergencia,
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
                pageSize: limiteemergencia,
                store: storeEmergencia,
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
                    var store = this.storeEmergencia;
                    store.baseParams.filterField = item.key;
                    searchFieldBtn.setText(item.text);
                }
            };

            var targetHandler = function (item, checked) {
                if (checked) {
                    //var store = this.storeEmergencia;
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
                id: 'grid-win-emergencia',
                title: 'Consulta Sanción Emergencia',
                width: winWidth,
                height: winHeight,
                iconCls: 'emergencia-icon',
                shim: false,
                animCollapse: false,
                constrainHeader: true,
                tbar: [
                     { text: 'Buscar por:', xtype: 'tbtext'}
                    , searchFieldBtn
                    , ' ', ' '
                    , new QoDesk.QoAdmin.SearchField({
                        paramName: 'filterText'
                        , store: this.storeEmergencia
                    })
                ],
                layout: 'fit',
                items: this.gridEmergencia
            });
        }
        win.show();
        setTimeout(function () {
            this.storeEmergencia.load({
                params: {
                    start: 0,
                    limit: limiteemergencia
                }
            });
        }, 10);
    },

    requestGridData: function () {
        this.storeEmergencia.load({params:
            {
                start: 0,
                limit: limiteemergencia
            }
        });
    },

});