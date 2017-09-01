/**
 * Created by bherrera on 31/08/2017.
 */
var
    checkboxSel = new Ext.grid.CheckboxSelectionModel({
        checkOnly: true
    }),
    grid5=new Ext.grid.GridPanel({
        title: "Grid #5",
        colModel: new Ext.grid.ColumnModel({
            columns: [
                checkboxSel,
                { dataIndex: "Id", header: "ID", width: 30, sortable: true, hidden: true },
                { id: "ColName", dataIndex: "Name", header: "Name", width: 180, sortable: true }
            ]
        }),
        sm: checkboxSel,
        store: new Ext.data.JsonStore({
            url: "DataSource1.aspx",
            root: "rows",
            idProperty: "Id",
            successProperty: "success",
            totalProperty: "count",
            fields: [
                { name: "Id", type: "int" },
                "Name"
            ],
            writer: new Ext.data.JsonWriter(),
            autoSave: false,
            batch: true
        }),
        autoExpandColumn: "ColName",
        tbar: new Ext.Toolbar({
            items: [{
                xtype: "button",
                text: "selectRecords()",
                handler: function(){
                    var
                        rs=[],
                        store=grid5.getStore();

                    store.each(function(r){
                        rs.push(r);
                    });

                    grid5.getSelectionModel().selectRecords(rs, true);
                }
            }]
        }),
        listeners: {
            render: function(grid) {
                grid.getStore().load();
            }
        }
    });