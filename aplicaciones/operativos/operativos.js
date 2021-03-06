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
            height: 'auto',
            fieldDefaults: {
                anchor: '100%',
                labelAlign: 'right'
            },
            items: [
                {fieldLabel: 'Parroquias', name: 'parroquias', allowBlank: false},
                {fieldLabel: 'Barrios', name: 'barrios', allowBlank: false},
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Detalle',
                    name: 'fecha_respuesta_devolucion',
                    labelAlign: 'left'

                },

                {name: 'detalle', allowBlank: false, xtype: 'htmleditor', height: 200},
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
                }/*, {
                    iconCls: 'icon-user-add',
                    text: 'Create',
                    scope: this,
                    handler: this.onCreate
                }, {
                    iconCls: 'icon-reset',
                    text: 'Reset',
                    scope: this,
                    handler: this.onReset
                }*/]
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
            this.onReset();
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
            dockedItems: [
                /*{
                xtype: 'toolbar',
                items: [{
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
                }]
            },*/
                /*{
                    weight: 2,
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [{
                        xtype: 'tbtext',
                        text: '<b>@cfg</b>'
                    }, '|', {
                        text: 'autoSync',
                        enableToggle: true,
                        pressed: true,
                        tooltip: 'When enabled, Store will execute Ajax requests as soon as a Record becomes dirty.',
                        scope: this,
                        toggleHandler: function (btn, pressed) {
                            this.store.autoSync = pressed;
                        }
                    }, {
                        text: 'batch',
                        enableToggle: true,
                        pressed: true,
                        tooltip: 'When enabled, Store will batch all records for each type of CRUD verb into a single Ajax request.',
                        scope: this,
                        toggleHandler: function (btn, pressed) {
                            this.store.getProxy().batchActions = pressed;
                        }
                    }, {
                        text: 'writeAllFields',
                        enableToggle: true,
                        pressed: false,
                        tooltip: 'When enabled, Writer will write *all* fields to the server -- not just those that changed.',
                        scope: this,
                        toggleHandler: function (btn, pressed) {
                            this.store.getProxy().getWriter().writeAllFields = pressed;
                        }
                    }]
                },*/
                {
                    weight: 1,
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    items: [{
                        xtype: 'pagingtoolbar',
                        dock: 'bottom',
                        store: this.store
                    }/*,'->', {
                        iconCls: 'icon-save',
                        text: 'Sync',
                        scope: this,
                        handler: this.onSync
                    }*/]
                }],
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
                    //field: {type: 'textfield'}
                }, {
                    header: 'Fin',
                    width: 140,
                    sortable: true,
                    dataIndex: 'fecha_fin_planificacion',
                    //field: {type: 'textfield'}
                }
                , {
                    header: 'Lugar', width: 200, sortable: true, dataIndex: 'zona',
                    //field: {type: 'textfield'}
                }
                , {
                    header: 'Punto encuento',
                    width: 200,
                    sortable: true,
                    dataIndex: 'punto_encuentro_planificado',
                    //field: {type: 'textfield'}
                }
                , {
                    header: 'Observaciones',
                    width: 200,
                    sortable: true,
                    dataIndex: 'observaciones',
                    //field: {type: 'textfield'}
                }
                , {
                    header: 'Tipo control',
                    width: 100,
                    sortable: true,
                    dataIndex: 'id_tipo_control',
                    //field: {type: 'textfield'}
                }
                , {
                    header: 'Zonal',
                    width: 100,
                    sortable: true,
                    dataIndex: 'id_zonal',
                    //field: {type: 'textfield'}
                }
                , {
                    header: 'Tipo operativo',
                    width: 100,
                    sortable: true,
                    dataIndex: 'tipo_operativo',
                    //field: {type: 'textfield'}
                }
                , {
                    header: 'Estado',
                    width: 100,
                    sortable: true,
                    dataIndex: 'id_estado',
                    //field: {type: 'textfield'}
                }
                , {
                    header: ' ',
                    width: 100,
                    sortable: true,
                    dataIndex: 'detalle',
                    // field: {type: 'textfield'}
                }
                , {
                    header: ' ',
                    width: 100,
                    sortable: true,
                    dataIndex: 'parroquias',
                    //  field: {type: 'textfield'}
                }
                , {
                    header: ' ',
                    width: 100,
                    sortable: true,
                    dataIndex: 'barrios',
                    //  field: {type: 'textfield'}
                }

            ]
        });
        this.callParent();
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
    },

    onSelectChange: function (selModel, selections) {
        //this.down('#delete').setDisabled(selections.length === 0);
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
                email: ''
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
    }, 'detalle', 'parroquias', 'barrios'],
    validators: {
        detalle: {
            type: 'length',
            min: 1
        },
        parroquias: {
            type: 'length',
            min: 1
        },
        barrios: {
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

    Ext.tip.QuickTipManager.init();

    var urlOperativos = "../../modules/desktop/operativos/server/";
    store = Ext.create('Ext.data.Store', {
        model: 'Writer.Person',
        autoLoad: true,
        autoSync: true,
        proxy: {
            type: 'ajax',
            api: {
                create: urlOperativos + "crudOperativos.php?operation=insert",
                read: urlOperativos + "crudOperativos.php?operation=select",
                update: urlOperativos + "crudOperativos.php?operation=update",
                destroy: urlOperativos + "crudOperativos.php?operation=delete"
            },
            reader: {
                type: 'json',
                successProperty: 'success',
                root: 'data',
                messageProperty: 'message'
            },
            writer: {
                type: 'json',
                writeAllFields: false,
                root: 'data'
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

    main = Ext.create('Ext.container.Container', {
        padding: '0 0 0 0',
        width: '100%',
        height: Ext.themeName === 'neptune' ? 800 : 800,
        renderTo: document.body,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            itemId: 'grid',
            xtype: 'writergrid',
            title: 'Operativos',
            height: '40%',
            margin: '0 0 10 0',
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
        }
        ]
    });
});
