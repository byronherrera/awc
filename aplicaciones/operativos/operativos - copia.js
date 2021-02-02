Ext.define('Writer.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.writerform',

    requires: ['Ext.form.field.Text'],

    initComponent: function () {
        Ext.apply(this, {
            activeRecord: null,
            iconCls: 'icon-user',
            frame: true,
            title: 'Detalle operativo',
            defaultType: 'textfield',
            bodyPadding: 5,
            fieldDefaults: {
                anchor: '100%',
                labelAlign: 'right'
            },
            items: [
                {name: 'detalle', type: 'date', dateFormat: 'c', allowBlank: false},
                {name: 'parroquias', type: 'date', dateFormat: 'c', allowBlank: false},
                {name: 'barrios', type: 'date', dateFormat: 'c', allowBlank: false},
                // {name: 'fecha_fin_planificacion', type: 'date', dateFormat: 'c', allowBlank: false},
                // {name: 'id_tipo_control', allowBlank: true},
                // {name: 'id_zonal', allowBlank: true},
                // {name: 'observaciones', allowBlank: true},
                // {name: 'tipo_operativo', allowBlank: true},
                // {name: 'zona', allowBlank: true},
                // {name: 'punto_encuentro_planificado', allowBlank: true},
                // {name: 'id_estado', allowBlank: false}
            ],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                items: ['->', {
                    iconCls: 'icon-save',
                    itemId: 'save',
                    text: 'Grabar',
                    disabled: true,
                    scope: this,
                    handler: this.onSave
                }]
            }]
        });
        this.callParent();
    },

    setActiveRecord: function (record) {
        this.activeRecord = record;

        if (record) {
            this.down('#save').enable();
            this.getForm().loadRecord(record);
        }
        else {
            this.down('#save').disable();
            this.getForm().reset();
        }
    },

    onSave: function () {
        var active = this.activeRecord,
            form = this.getForm();
        if (!active) {
            return;
        }

        if (form.isValid()) {
            form.updateRecord(active);
          //  this.onReset();
        }
    },

    onCreate: function () {
        var form = this.getForm();

        if (form.isValid()) {
            this.fireEvent('create', this, form.getValues());
            form.reset();
        }

    },

    onReset: function () {
        this.setActiveRecord(null);
        this.getForm().reset();
    }
});

Ext.define('Writer.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.writergrid',

    requires: [
        'Ext.grid.plugin.CellEditing',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],

    initComponent: function () {
        Ext.apply(this, {
            iconCls: 'icon-grid',
            frame: true,
            plugins: {
                cellediting: true
            },
            dockedItems: [{
                xtype: 'toolbar',
                items: [
                    /*                   {
                                           iconCls: 'icon-add',
                                           text: 'Add',
                                           scope: this,
                                           handler: this.onAddClick
                                       }, {
                                           iconCls: 'icon-delete',
                                           text: 'Delete',
                                           disabled: true,
                                           itemId: 'delete',
                                           scope: this,
                                           handler: this.onDeleteClick
                                       }*/
                ]
            }
                , {
                    weight: 1,
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    items: [{
                        xtype: 'pagingtoolbar',
                        dock: 'bottom',
                        store: this.store,
                        pageSize: 10
                    }]
                }
            ],
            columns: [
                {
                    text: 'ID',
                    width: 60,
                    sortable: true,
                    resizable: false,
                    draggable: false,
                    hideable: false,
                    menuDisabled: true,
                    dataIndex: 'id',
                    renderer: function (value) {
                        return Ext.isNumber(value) ? value : '&nbsp;';
                    }
                }, {
                    header: 'Inicio',
                    //flex: 1,
                    width: 140,
                    sortable: true,
                    dataIndex: 'fecha_inicio_planificacion',
                    field: {
                        type: 'textfield'
                    }
                }, {
                    header: 'Fin',
                    width: 140,
                    sortable: true,
                    dataIndex: 'fecha_fin_planificacion',
                    field: {
                        type: 'textfield'
                    }
                }
                , {header: 'Lugar', width: 200, sortable: true, dataIndex: 'zona', field: {type: 'textfield'}}
                , {
                    header: 'Punto encuento',
                    width: 200,
                    sortable: true,
                    dataIndex: 'punto_encuentro_planificado'
                }
                , {
                    header: 'Observaciones',
                    width: 200,
                    sortable: true,
                    dataIndex: 'observaciones',
                    field: {type: 'textfield'}
                }
                , {
                    header: 'Tipo control',
                    width: 100,
                    sortable: true,
                    dataIndex: 'id_tipo_control',
                    field: {
                        type: 'textfield'
                    }
                }
                , {
                    header: 'Zonal',
                    width: 100,
                    sortable: true,
                    dataIndex: 'id_zonal',
                    field: {type: 'textfield'}
                }
                , {
                    header: 'Tipo operativo',
                    width: 100,
                    sortable: true,
                    dataIndex: 'tipo_operativo',
                    field: {type: 'textfield'}
                }
                , {
                    header: 'Estado',
                    width: 100,
                    sortable: true,
                    dataIndex: 'id_estado',
                    field: {type: 'textfield'}
                }
                , {
                    header: ' ',
                    width: 100,
                    sortable: true,
                    dataIndex: 'detalle',
                    field: {type: 'textfield'}
                }
                , {
                    header: ' ',
                    width: 100,
                    sortable: true,
                    dataIndex: 'parroquias',
                    field: {type: 'textfield'}
                }
                , {
                    header: ' ',
                    width: 100,
                    sortable: true,
                    dataIndex: 'barrios',
                    field: {type: 'textfield'}
                }

            ]
        });
        this.callParent();
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
    },

    onSelectChange: function (selModel, selections) {
        this.down('#delete').setDisabled(selections.length === 0);
    },

    onSync: function () {
        this.store.sync();
    },

    onDeleteClick: function () {
        var selection = this.getView().getSelectionModel().getSelection()[0];

        if (selection) {
            this.store.remove(selection);
        }
    },

    onAddClick: function () {
        // eslint-disable-next-line no-undef
        var rec = new Writer.Person({
                first: '',
                last: '',
                fecha_inicio_planificacion: ''
            }),
            edit = this.findPlugin('cellediting');

        edit.cancelEdit();
        this.store.insert(0, rec);
        edit.startEditByPosition({
            row: rec,
            column: 1
        });
    }
});

Ext.define('Writer.Person', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }, 'fecha_inicio_planificacion', 'fecha_fin_planificacion', 'id_tipo_control'],
    validators: {
        fecha_inicio_planificacion: {
            type: 'length',
            min: 1
        },
        fecha_fin_planificacion: {
            type: 'length',
            min: 1
        },
        id_tipo_control: {
            type: 'length',
            min: 1
        }
    }
});

Ext.require([
    'Ext.data.*',
    'Ext.tip.QuickTipManager',
    'Ext.window.MessageBox'
]);

Ext.onReady(function () {
    var store, main;
    var urlOperativos = "../../modules/desktop/operativos/server/";
    Ext.tip.QuickTipManager.init();

    store = Ext.create('Ext.data.Store', {
        model: 'Writer.Person',
        autoLoad: true,
        autoSync: true,
        pageSize: 10,
        baseParams: {limit: 11},
        proxy: {
            type: 'ajax',
            extraParams: {
                limit: 10
            },
            api: {
                create: urlOperativos + "crudOperativos.php?operation=insert",
                read: urlOperativos + "crudOperativos.php?operation=select",
                update: urlOperativos + "crudOperativos.php?operation=update",
                destroy: urlOperativos + "crudOperativos.php?operation=delete"
            },
            reader: {
                type: 'json',
                successProperty: 'success',
                rootProperty: 'data',
                messageProperty: 'message'
            },
            writer: {
                type: 'json',
                encode: true,
                writeAllFields: false,
                rootProperty: 'data'
            },
            listeners: {
                exception: function (proxy, response, operation) {
                    Ext.MessageBox.show({
                        title: 'REMOTE EXCEPTION',
                        msg: operation.getError(),
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            }
        },
        listeners: {
            write: function (proxy, operation) {
                if (operation.action === 'destroy') {
                    main.child('#form').setActiveRecord(null);
                }
                Ext.example.msg(operation.action, operation.getResultSet().message);
            }
        }
    });

    main = Ext.create('Ext.container.Container',
        {
            padding: '0 0 0 0',
            width: '100%',
            renderTo: document.body,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                itemId: 'grid',
                xtype: 'writergrid',
                title: 'Listado de operativos',
                margin: '0 0 10 0',
                flex: 1,
                store: store,
                listeners: {
                    selectionchange: function (selModel, selected) {
                        main.child('#form').setActiveRecord(selected[0] || null);
                    }
                }
            }, {
                itemId: 'form',
                xtype: 'writerform',
                manageHeight: false,
                margin: '0 0 10 0',
                listeners: {
                    create: function (form, data) {
                        store.insert(0, data);
                    }
                }
            }]
        });
});
