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
            return value ? value.dateFormat('Y-m-d') : '';
        }

        //inicio combo persona recepta la operativos GRC
        storeGRC = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personaloperativos',
            baseParams: {
                todos: 'true',
                // accesosAdministradorOpe: accesosAdministradorOpe,
                // accesosOperativos: accesosOperativos,
                acceso: acceso
            }

        });


        var comboGRC = new Ext.form.ComboBox({
            id: 'comboGRC',
            store: storeGRC,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            //forceSelection: true,
            allowBlank: true
        });

        var comboGRC2 = new Ext.form.ComboBox({
            id: 'comboGRC2',
            store: storeGRC,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            //forceSelection: true,
            allowBlank: true
        });

        function personaRecordatorio(id) {
            var index = storeGRC.findExact('id', id);
            if (index > -1) {
                var record = storeGRC.getAt(index);
                return record.get('nombre');
            }
        }

        storeGRC2 = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personaloperativos',
            baseParams: {
                todos: 'true',
                //   accesosAdministradorOpe: true,
                //    accesosOperativos: false,
                acceso: acceso
            }

        });

        var comboGRC2 = new Ext.form.ComboBox({
            id: 'comboGRC2',
            store: storeGRC2,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            //forceSelection: true,
            allowBlank: true
        });

        function personaReceptaRecordatorio(id) {
            //var index = storeGRC2.findExact('id', id);
            var index = storeGRC2.findExact('id', id);
            if (index > -1) {
                var record = storeGRC2.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo persona recepta la operativos GRC


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
                {name: 'id', allowBlank: true},
                {name: 'id_responsable', allowBlank: false},
                {name: 'nombres', allowBlank: true},
                {name: 'apellidos', allowBlank: true},
                {name: 'tema', allowBlank: false    },
                {name: 'fecha_inicio', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'fecha_entrega', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'activo', allowBlank: true},
                {name: 'idingreso', allowBlank: true},
                {name: 'observaciones', allowBlank: true}

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
                {header: 'id', dataIndex: 'id', sortable: true, width: 30},
                {
                    header: 'Responsable', dataIndex: 'id_responsable', sortable: true, width: 220, editor: comboGRC,
                    renderer: personaRecordatorio
                },

                //  {header: 'nombres', dataIndex: 'nombres', sortable: true, width: 125},
                //  {header: 'apellidos', dataIndex: 'apellidos', sortable: true, width: 125},
                {
                    header: 'Descripción',
                    dataIndex: 'tema',
                    sortable: true,
                    width: 300,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {header: 'Fecha Inicio', dataIndex: 'fecha_inicio', sortable: true, width: 125, renderer: formatDate,
                    editor: new Ext.form.DateField({
                        format: 'Y-m-d'
                    })
                },
                {header: 'Fecha Entrega', dataIndex: 'fecha_entrega', sortable: true, width: 125, renderer: formatDate,
                    editor: new Ext.form.DateField({
                        format: 'Y-m-d'
                    })
                },
                {
                    header: 'Activo'
                    , dataIndex: 'activo'
                    , editor: {
                        xtype: 'checkbox'
                    }
                    , falseText: 'No'
                    , menuDisabled: true
                    , trueText: 'Yes'
                    , sortable: true
                    , width: 50
                    , xtype: 'booleancolumn'
                },

                {header: 'idingreso', dataIndex: 'idingreso', sortable: true, width: 125, hidden: true},
                {
                    header: 'observaciones',
                    dataIndex: 'observaciones',
                    sortable: true,
                    width: 125,
                    editor: new Ext.form.TextField({allowBlank: false})
                }
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
                emptyMsg: "No existen recordatorios  que mostrar"
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
                        }
                    ]
                })
                , text: 'Todos'
            });

            win = desktop.createWindow({
                id: 'grid-win-recordatorios',
                title: 'Consulta Recordatorios',
                width: winWidth,
                height: winHeight,
                iconCls: 'recordatorios-icon',
                shim: false,
                animCollapse: false,
                constrainHeader: true,
                tbar: [
                    {
                        text: 'Nuevo',
                        scope: this,
                        handler: this.addrecordatorios,
                        iconCls: 'save-icon',
                        id: 'addrecordatorios',
                     //   disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                    },
                    '-',
                    {
                        text: "Eliminar",
                        scope: this,
                        handler: this.deleterecordatorios,
                        id: 'deleterecordatorios',
                        iconCls: 'delete-icon',
                        //disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                        //disabled: true
                    },
                    '-',
                    {
                        iconCls: 'reload-icon',
                        handler: this.requestGridData,
                        scope: this,
                        text: 'Recargar Datos',
                        tooltip: 'Recargar datos'
                    },'->',
                    {text: 'Buscar por:', xtype: 'tbtext'}
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
        }, 400);
    },

    deleterecordatorios: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridRecordatorios.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeRecordatorios.remove(rows);
                }
            }
        });
    },

    addrecordatorios: function () {
        var recordatorios = new this.storeRecordatorios.recordType({
            id_responsable: '',
            tema: '',
            fecha_inicio: (new Date()),
            fecha_entrega: (new Date()),
            activo: 1,
            observaciones: ''
        });
        this.gridRecordatorios.stopEditing();
        this.storeRecordatorios.insert(0, recordatorios);
        this.gridRecordatorios.startEditing(0, 0);
    },
    requestGridData: function () {
        this.storeRecordatorios.load({
            params:
                {
                    start: 0,
                    limit: limiterecordatorios
                }
        });
    },

});