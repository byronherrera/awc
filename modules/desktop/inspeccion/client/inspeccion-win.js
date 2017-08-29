QoDesk.InspeccionWindow = Ext.extend(Ext.app.Module, {
    id: 'inspeccion',
    type: 'desktop/inspeccion',

    init: function () {
        this.launcher = {
            text: 'Inspección',
            iconCls: 'inspeccion-icon',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function () {
        var accesosAdministradorIns = this.app.isAllowedTo('accesosAdministradorIns', this.id);
        var accesosInspeccion = this.app.isAllowedTo('accesosInspeccion', this.id);
        var accesosRecepciónIns = this.app.isAllowedTo('accesosRecepciónIns', this.id);

        var acceso = (accesosAdministradorIns || accesosInspeccion || accesosRecepciónIns) ? true : false

        var desktop = this.app.getDesktop();
        var AppMsg = new Ext.AppMsg({});

        var win = desktop.getWindow('grid-win-inspeccion');
        var urlInspeccion = "modules/desktop/inspeccion/server/";

        var textField = new Ext.form.TextField({allowBlank: false});


        function formatDate(value) {
            return value ? value.dateFormat('Y-m-d H:i:s') : '';
        }

// inicio combos secretaria

        //inicio combo tipo documento  TID
        storeTID = new Ext.data.JsonStore({
            root: 'documento',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                documento: [
                    {"id": 2, "nombre": "Comunicados"},
                    {"id": 1, "nombre": "Inspeccion"}
                ]
            }
        });

        var comboTID = new Ext.form.ComboBox({
            id: 'comboTID',
            store: storeTID,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            forceSelection: true,
            allowBlank: false
        });

        function personaTipoDocumento(id) {
            var index = storeTID.find('id', id);
            if (index > -1) {
                var record = storeTID.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo tipo documento  TID

        //inicio combo activo

        storeOFAC = new Ext.data.JsonStore({
            root: 'users',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                users: [
                    {"id": 'true', "nombre": "Si"},
                    {"id": 'false', "nombre": "No"},
                    {"id": '', "nombre": "No"}
                ]
            }
        });

        var comboOFAC = new Ext.form.ComboBox({
            id: 'comboOFAC',
            store: storeOFAC,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function despachadoActivo(id) {
            var index = storeOFAC.find('id', id);
            if (index > -1) {
                var record = storeOFAC.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo activo


        //inicio combo reasignacion  REA
        storeREA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre', 'orden'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=unidades',
            remoteSort: true, //true for server sorting
            sorters: [{
                property: 'orden',
                direction: 'ASC' // or 'ASC'
            }],
        });

        storeREA.sort('orden', 'ASC');
        var comboREA = new Ext.form.ComboBox({
            id: 'comboREA',
            store: storeREA,
            valueField: 'id',
            displayField: 'nombre',
            mode: 'local',
            forceSelection: true,
            allowBlank: false
        });

        function departamentoReasignacion(id) {
            var index = storeREA.find('id', id);
            if (index > -1) {
                var record = storeREA.getAt(index);
                return record.get('nombre');
            } else {
                return ''
            }

        }

        //fin combo reasignacion REA
        //inicio combo reasignacion  REATOT
        storeREATOT = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=unidadestotal'
        });


        var comboREATOT = new Ext.form.ComboBox({
            id: 'comboREATOT',
            store: storeREATOT,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function departamentoREATOTsignacion(id) {
            var index = storeREATOT.find('id', id);
            var record = storeREATOT.getAt(index);
            return record.get('nombre');
        }

        //fin combo reasignacion REATOT

        //inicio combo guia  REAGUIA
        storeREAGUIA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=guia'
        });


        var comboREAGUIA = new Ext.form.ComboBox({
            id: 'comboREAGUIA',
            store: storeREAGUIA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function departamentoREAGUIAS(id) {
            var index = storeREAGUIA.find('id', id);
            var record = storeREAGUIA.getAt(index);
            return record.get('nombre');
        }

        //fin combo reasignacion REAGUIA


        //inicio combo caracter del tramite CDT
        storeCDT = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 1, "nombre": "Ordinario"},
                    {"id": 2, "nombre": "Urgente"}
                ]
            }
        });

        var comboCDT = new Ext.form.ComboBox({
            id: 'comboCDT',
            store: storeCDT,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function caracterTramite(id) {
            var index = storeCDT.find('id', id);
            if (index > -1) {
                var record = storeCDT.getAt(index);
                // return record.get('nombre');
                if (record.get('nombre') == 'Ordinario') {
                    return '<span style="color:green;">' + record.get('nombre') + '</span>';
                } else {
                    return '<span style="color:red;">' + record.get('nombre') + '</span>';
                }
            }
        }

        function change(val) {
            if (val > 0) {
                return '<span style="color:green;">' + val + '</span>';
            } else if (val < 0) {
                return '<span style="color:red;">' + val + '</span>';
            }
            return val;
        }


        //fin combo caracter del tramite CDT

        //inicio combo persona recepta la inspeccion PRD
        storePRD = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalsecretaria'

        });

        var comboPRD = new Ext.form.ComboBox({
            id: 'comboPRD',
            store: storePRD,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            //forceSelection: true,
            allowBlank: true
        });

        function personaReceptaDenuncia(id) {
            var index = storePRD.find('id', id);
            if (index > -1) {
                var record = storePRD.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo persona recepta la inspeccion PRD

        //inicio combo instituciones INST
        storeINST = new Ext.data.JsonStore({
            root: 'data',
            fields: ['nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=instituciones'

        });

        var comboINST = new Ext.form.ComboBox({
            id: 'comboINST',
            store: storeINST,
            valueField: 'nombre',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            allowBlank: false
        });

        function listadoInstituciones(id) {

            return id;

        }

        //fin combo instituciones INST

// fin combos secretaria

// inicio combos inspeccion

        //inicio combo ZONA
        storeZONA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=zonas'
        });

        var comboZONA = new Ext.form.ComboBox({
            id: 'comboZONA',
            store: storeZONA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function zonaAdm(id) {
            var index = storeZONA.find('id', id);
            if (index > -1) {
                var record = storeZONA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo ZONA

        //inicio combo actividad  ACTA
        storeACTA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=depInspeccion'
        });

        var comboACTA = new Ext.form.ComboBox({
            id: 'comboACTA',
            store: storeACTA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function actividadAdm(id) {
            var index = storeACTA.find('id', id);
            if (index > -1) {
                var record = storeACTA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo actividad  ACTA

        //inicio combo Estado Recepcion Información Inspeccion ESREA
        storeESREA = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "Sin información"},
                    {"id": 1, "nombre": "Conforme"},
                    {"id": 2, "nombre": "Inconforme"}
                ]
            }
        });

        var comboESREA = new Ext.form.ComboBox({
            id: 'comboESREA',
            store: storeESREA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function estadoRecepcionAdm(id) {
            var index = storeESREA.find('id', id);
            if (index > -1) {
                var record = storeESREA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo Estado Recepcion Información Inspeccion ESREA

        //inicio combo procedimientos PRSA
        storePRSA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=procedimiento'
        });

        var comboPRSA = new Ext.form.ComboBox({
            id: 'comboPRSA',
            store: storePRSA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function procedimientosAdm(id) {
            var index = storePRSA.find('id', id);
            if (index > -1) {
                var record = storePRSA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo procedimientos PRSA

        //inicio combo persona asignada PRASA
        storePRASA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalinspeccion'
        });

        var comboPRASA = new Ext.form.ComboBox({
            id: 'comboPRASA',
            store: storePRASA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function personaAsignadaAdm(id) {
            var index = storePRASA.find('id', id);
            if (index > -1) {
                var record = storePRASA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo caracter del tramite PRASA
// inicio combos inspeccion

// inicio pestañas de mantenimiento


        //inicio mantenimiento Inspeccion Procedimientos

        var proxyInspeccionProcedimientos = new Ext.data.HttpProxy({
            api: {
                create: urlInspeccion + "crudInspeccionProcedimientos.php?operation=insert",
                read: urlInspeccion + "crudInspeccionProcedimientos.php?operation=select",
                update: urlInspeccion + "crudInspeccionProcedimientos.php?operation=update",
                destroy: urlInspeccion + "crudInspeccionProcedimientos.php?operation=delete"
            }
        });

        var readerInspeccionProcedimientos = new Ext.data.JsonReader({
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: false},
                {name: 'nombre', allowBlank: false},
                {name: 'observacion', allowBlank: false}
            ]
        });

        var writerInspeccionProcedimientos = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeInspeccionProcedimientos = new Ext.data.Store({
            id: "id",
            proxy: proxyInspeccionProcedimientos,
            reader: readerInspeccionProcedimientos,
            writer: writerInspeccionProcedimientos,
            autoSave: true
        });
        this.storeInspeccionProcedimientos.load();

        this.gridInspeccionProcedimientos = new Ext.grid.EditorGridPanel({

            autoHeight: true,
            autoScroll: true,
            store: this.storeInspeccionProcedimientos, columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'ID',
                    dataIndex: 'id',
                    sortable: true,
                    width: 10
                },
                {
                    header: 'Nombre',
                    dataIndex: 'nombre',
                    sortable: true,
                    width: 40,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Observación',
                    dataIndex: 'observacion',
                    sortable: true,
                    width: 40,
                    editor: new Ext.form.TextField({allowBlank: false})
                }
            ],
            viewConfig: {forceFit: true},
            sm: new Ext.grid.RowSelectionModel({singleSelect: false}),
            border: false,
            stripeRows: true
        });

        // fin InspeccionProcedimientos

        //inicio mantenimiento InspeccionZonas

        var proxyInspeccionZonas = new Ext.data.HttpProxy({
            api: {
                create: urlInspeccion + "crudInspeccionZonas.php?operation=insert",
                read: urlInspeccion + "crudInspeccionZonas.php?operation=select",
                update: urlInspeccion + "crudInspeccionZonas.php?operation=update",
                destroy: urlInspeccion + "crudInspeccionZonas.php?operation=delete"
            }
        });

        var readerInspeccionZonas = new Ext.data.JsonReader({
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: false},
                {name: 'nombre', allowBlank: false},
                {name: 'activo', allowBlank: false}
            ]
        });

        var writerInspeccionZonas = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeInspeccionZonas = new Ext.data.Store({
            id: "id",
            proxy: proxyInspeccionZonas,
            reader: readerInspeccionZonas,
            writer: writerInspeccionZonas,
            autoSave: true
        });
        this.storeInspeccionZonas.load();

        this.gridInspeccionZonas = new Ext.grid.EditorGridPanel({
            autoHeight: true,
            autoScroll: true,
            store: this.storeInspeccionZonas, columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'ID',
                    dataIndex: 'id',
                    sortable: true,
                    width: 10
                },
                {
                    header: 'Nombre',
                    dataIndex: 'nombre',
                    sortable: true,
                    width: 40,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Activo'
                    , dataIndex: 'activo'
                    , editor: {xtype: 'checkbox'}
                    , falseText: 'No'
                    , menuDisabled: true
                    , trueText: 'Si'
                    , sortable: true
                    , width: 50
                    , xtype: 'booleancolumn'
                }
            ],
            viewConfig: {forceFit: true},
            sm: new Ext.grid.RowSelectionModel({singleSelect: false}),
            border: false,
            stripeRows: true
        });
        //fin mantenimiento InspeccionZonas

        //inicio mantenimiento InspeccionReasignacion
        var proxyInspeccionReasignacion = new Ext.data.HttpProxy({
            api: {
                create: urlInspeccion + "crudInspeccionReasignacion.php?operation=insert",
                read: urlInspeccion + "crudInspeccionReasignacion.php?operation=select",
                update: urlInspeccion + "crudInspeccionReasignacion.php?operation=update",
                destroy: urlInspeccion + "crudInspeccionReasignacion.php?operation=delete"
            }
        });

        var readerInspeccionReasignacion = new Ext.data.JsonReader({
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: false},
                {name: 'nombre', allowBlank: false},
                {name: 'nombre_completo', allowBlank: false},
                {name: 'orden', allowBlank: false},
                {name: 'activo', allowBlank: false}
            ]
        });

        var writerInspeccionReasignacion = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeInspeccionReasignacion = new Ext.data.Store({
            id: "id",
            proxy: proxyInspeccionReasignacion,
            reader: readerInspeccionReasignacion,
            writer: writerInspeccionReasignacion,
            autoSave: true
        });
        this.storeInspeccionReasignacion.load();

        this.gridInspeccionReasignacion = new Ext.grid.EditorGridPanel({
            autoHeight: true,
            autoScroll: true,
            store: this.storeInspeccionReasignacion, columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'ID',
                    dataIndex: 'id',
                    sortable: true,
                    width: 10
                },
                {
                    header: 'Nombre',
                    dataIndex: 'nombre',
                    sortable: true,
                    width: 50,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Nombre completo',
                    dataIndex: 'nombre_completo',
                    sortable: true,
                    width: 80,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Activo'
                    , dataIndex: 'activo'
                    , editor: {xtype: 'checkbox'}
                    , falseText: 'No'
                    , menuDisabled: true
                    , trueText: 'Si'
                    , sortable: true
                    , width: 50
                    , xtype: 'booleancolumn'
                }, {
                    header: 'Orden',
                    dataIndex: 'orden',
                    sortable: true,
                    width: 40,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
            ],
            viewConfig: {forceFit: true},
            sm: new Ext.grid.RowSelectionModel({singleSelect: false}),
            border: false,
            stripeRows: true
        });
        //fin mantenimiento InspeccionReasignacion

        //inicio mantenimiento InspeccionGuia
        var proxyInspeccionGuia = new Ext.data.HttpProxy({
            api: {
                create: urlInspeccion + "crudInspeccionGuia.php?operation=insert",
                read: urlInspeccion + "crudInspeccionGuia.php?operation=select",
                update: urlInspeccion + "crudInspeccionGuia.php?operation=update",
                destroy: urlInspeccion + "crudInspeccionGuia.php?operation=delete"
            }
        });

        var readerInspeccionGuia = new Ext.data.JsonReader({
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: false},
                {name: 'numero', allowBlank: false},
                {name: 'unidad', allowBlank: false},
                {name: 'id_member', allowBlank: false},
                {name: 'creado', allowBlank: false}
            ]
        });

        var writerInspeccionGuia = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeInspeccionGuia = new Ext.data.Store({
            id: "id",
            proxy: proxyInspeccionGuia,
            reader: readerInspeccionGuia,
            writer: writerInspeccionGuia,
            autoSave: true
        });
        this.storeInspeccionGuia.load();

        this.gridInspeccionGuia = new Ext.grid.EditorGridPanel({
            id: 'gridInspeccionGuia',
            xtype: "grid",
            height: 200,
            store: this.storeInspeccionGuia,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Número',
                    dataIndex: 'numero',
                    sortable: true,
                    width: 30
                },
                {
                    header: 'Unidad',
                    dataIndex: 'unidad',
                    sortable: true,
                    width: 40
                },
                {
                    header: 'Fecha Guía',
                    dataIndex: 'creado',
                    sortable: true,
                    width: 30
                },
                {
                    header: 'Encargado',
                    dataIndex: 'id_member',
                    sortable: true,
                    width: 40
                }
            ],
            viewConfig: {forceFit: true},
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: false,
                listeners: {
                    rowselect: function (sm, row, rec) {
                        storeInspeccionSimple.load({params: {filterField: 'guia', filterText: rec.get("id")}})
                    }
                }
            }),
            border: false,
            stripeRows: true,
            bbar: new Ext.PagingToolbar({
                pageSize: 100,
                store: this.storeInspeccionGuia,
                displayInfo: true,
                displayMsg: 'Mostrando inspeccion {0} - {1} of {2}',
                emptyMsg: "No existen inspeccion que mostrar"
            }),
        });

        //fin mantenimiento InspeccionGuías


// fin pestañas de mantenimiento

        // inicio ventana inspeccion
        var proxyInspeccion = new Ext.data.HttpProxy({
            api: {
                create: urlInspeccion + "crudInspeccion.php?operation=insert",
                read: urlInspeccion + "crudInspeccion.php?operation=select",
                update: urlInspeccion + "crudInspeccion.php?operation=update",
                destroy: urlInspeccion + "crudInspeccion.php?operation=delete"
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

        var readerInspeccion = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'codigo_tramite', allowBlank: false},
                {name: 'id_persona', allowBlank: false},
                {name: 'recepcion_documento', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'id_tipo_documento', allowBlank: false},
                {name: 'num_documento', allowBlank: false},
                {name: 'remitente', allowBlank: false},
                {name: 'asunto', allowBlank: false},
                {name: 'institucion', allowBlank: true},
                {name: 'descripcion_anexos', allowBlank: false},
                {name: 'reasignacion', allowBlank: false},
                {name: 'id_caracter_tramite', allowBlank: false},
                {name: 'cantidad_fojas', allowBlank: false},
                {name: 'envio_inspeccion', type: 'boolean', allowBlank: false}
            ]
        });
        var writerInspeccion = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        this.storeInspeccion = new Ext.data.Store({
            id: "id",
            proxy: proxyInspeccion,
            reader: readerInspeccion,
            writer: writerInspeccion,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });
        storeInspeccion = this.storeInspeccion;
        limiteinspeccion = 100;

        this.gridInspeccion = new Ext.grid.EditorGridPanel({
            height: 160,
            store: this.storeInspeccion,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Código',
                    dataIndex: 'codigo_tramite',
                    sortable: true,
                    width: 24
                },
                {
                    header: 'Persona recepta',
                    dataIndex: 'id_persona',
                    sortable: true,
                    width: 30,
                    renderer: personaReceptaDenuncia
                },
                {
                    header: 'Instrucción trámites',
                    dataIndex: 'recepcion_documento',
                    sortable: true,
                    width: 42,
                    renderer: formatDate,
                    editor: new Ext.ux.form.DateTimeField({
                        dateFormat: 'Y-m-d',
                        timeFormat: 'H:i:s'
                    })
                },
                {
                    header: 'Tipo documento',
                    dataIndex: 'id_tipo_documento',
                    sortable: true,
                    width: 28,
                    editor: comboTID, renderer: personaTipoDocumento
                },
                {
                    header: 'N. documento',
                    dataIndex: 'num_documento',
                    sortable: true,
                    width: 38,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Remitente',
                    dataIndex: 'remitente',
                    sortable: true,
                    width: 55,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Institución',
                    dataIndex: 'institucion',
                    sortable: true,
                    width: 30,
                    editor: comboINST, renderer: listadoInstituciones,
                    cls: 'expand-panel'
                },
                {
                    header: 'Asunto',
                    dataIndex: 'asunto',
                    sortable: true,
                    width: 55,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Descripción anexos',
                    dataIndex: 'descripcion_anexos',
                    sortable: true,
                    width: 40,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Caracter trámite',
                    dataIndex: 'id_caracter_tramite',
                    sortable: true,
                    width: 30,
                    editor: comboCDT, renderer: caracterTramite
                },
                {
                    header: 'Fojas',
                    dataIndex: 'cantidad_fojas',
                    width: 20,
                    editor: new Ext.ux.form.SpinnerField({
                        fieldLabel: 'Age',
                        name: 'age',
                        minValue: 0,
                        maxValue: 100
                    })
                },
                {
                    header: 'Reasignación',
                    dataIndex: 'reasignacion',
                    sortable: true,
                    width: 60,
                    editor: comboREA, renderer: departamentoReasignacion
                },
                {
                    header: 'Despachado'
                    , dataIndex: 'envio_inspeccion'
                    , align: 'center'
                    , falseText: 'No'
                    , menuDisabled: true
                    , trueText: 'Si'
                    , sortable: true
                    , width: 20
                    , xtype: 'booleancolumn'
                }
            ],
            viewConfig: {
                forceFit: true,
                getRowClass: function (record, index) {
                    if (record.get('envio_inspeccion') == false) {
                        return 'gold';
                    }
                }
            },
            sm: new Ext.grid.RowSelectionModel(
                {
                    singleSelect: true,
                    listeners: {
                        rowselect: function (sm, row, rec) {
                            cargaDetalle(rec.id, this.formInspeccionDetalle, rec.get("envio_inspeccion"));
                            if (acceso) {
                                if (rec.get("envio_inspeccion"))
                                    Ext.getCmp('tb_grabarinspeccion').setDisabled(true);
                                else
                                    Ext.getCmp('tb_grabarinspeccion').setDisabled(false);
                            }
                            ;
                            storeINST.load();
                        }
                    }
                }
            ),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: limiteinspeccion,
                store: storeInspeccion,
                displayInfo: true,
                displayMsg: 'Mostrando inspeccion {0} - {1} of {2}',
                emptyMsg: "No existen inspeccion que mostrar"
            }),

            listeners: {
                beforeedit: function (e) {
                    if (acceso) {
                        if (e.record.get("envio_inspeccion")) {
                            return false;
                        }
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        });

        // datastore and datagrid in Guia
        this.storeInspeccionSimple = new Ext.data.Store({
            id: "id",
            proxy: proxyInspeccion,
            reader: readerInspeccion,
            writer: writerInspeccion,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });
        storeInspeccionSimple = this.storeInspeccionSimple
        this.gridInspeccionSimple = new Ext.grid.EditorGridPanel({
            autoHeight: true,
            autoScroll: true,
            store: this.storeInspeccionSimple,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Código',
                    dataIndex: 'codigo_tramite',
                    sortable: true,
                    width: 20
                },
                {
                    header: 'Persona recepta',
                    dataIndex: 'id_persona',
                    sortable: true,
                    width: 35,
                    renderer: personaReceptaDenuncia
                },
                {
                    header: 'Fecha recepción',
                    dataIndex: 'recepcion_documento',
                    sortable: true,
                    width: 45,
                    renderer: formatDate
                },
                {
                    header: 'Tipo documento',
                    dataIndex: 'id_tipo_documento',
                    sortable: true,
                    width: 30,
                    renderer: personaTipoDocumento
                },
                {
                    header: 'N. documento',
                    dataIndex: 'num_documento',
                    sortable: true,
                    width: 40
                },
                {
                    header: 'Remitente',
                    dataIndex: 'remitente',
                    sortable: true,
                    width: 60
                },
                {
                    header: 'Asunto',
                    dataIndex: 'asunto',
                    sortable: true,
                    width: 55
                },
                {
                    header: 'Descripción anexos',
                    dataIndex: 'descripcion_anexos',
                    sortable: true,
                    width: 55
                },
                {
                    header: 'Caracter trámite',
                    dataIndex: 'id_caracter_tramite',
                    sortable: true,
                    width: 30,
                    renderer: caracterTramite
                },
                {
                    header: 'Fojas',
                    dataIndex: 'cantidad_fojas',
                    sortable: true,
                    width: 20
                }
            ],
            viewConfig: {
                forceFit: true
            },
            sm: new Ext.grid.RowSelectionModel(
                {
                    singleSelect: true
                }),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            listeners: {
                beforeedit: function (e) {
                    if (acceso) {
                        if (e.record.get("envio_inspeccion")) {
                            return false;
                        }
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        });
        // fin datastore and datagrid in Guia

        // datastore and datagrid in Guia
        this.storeDocumentosReporte = new Ext.data.Store({
            id: "id",
            proxy: proxyInspeccion,
            reader: readerInspeccion,
            writer: writerInspeccion,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });

        storeDocumentosReporte = this.storeDocumentosReporte
        this.gridDocumentosReporte = new Ext.grid.EditorGridPanel({

            height: desktop.getWinHeight() - 238,
            autoScroll: true,
            store: this.storeDocumentosReporte,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Código',
                    dataIndex: 'codigo_tramite',
                    sortable: true,
                    width: 20
                },
                {
                    header: 'Persona recepta',
                    dataIndex: 'id_persona',
                    sortable: true,
                    width: 35,
                    renderer: personaReceptaDenuncia
                },
                {
                    header: 'Recepción documento',
                    dataIndex: 'recepcion_documento',
                    sortable: true,
                    width: 45,
                    renderer: formatDate
                },
                {
                    header: 'Tipo documento',
                    dataIndex: 'id_tipo_documento',
                    sortable: true,
                    width: 30,
                    renderer: personaTipoDocumento
                },
                {
                    header: 'N. documento',
                    dataIndex: 'num_documento',
                    sortable: true,
                    width: 40
                },
                {
                    header: 'Remitente',
                    dataIndex: 'remitente',
                    sortable: true,
                    width: 60
                },
                {
                    header: 'Institución',
                    dataIndex: 'institucion',
                    sortable: true,
                    width: 60
                },
                {
                    header: 'Asunto',
                    dataIndex: 'asunto',
                    sortable: true,
                    width: 55
                },
                {
                    header: 'Descripción anexos',
                    dataIndex: 'descripcion_anexos',
                    sortable: true,
                    width: 55
                },
                {
                    header: 'Caracter trámite',
                    dataIndex: 'id_caracter_tramite',
                    sortable: true,
                    width: 30,
                    renderer: caracterTramite
                },
                {
                    header: 'Fojas',
                    dataIndex: 'cantidad_fojas',
                    sortable: true,
                    width: 20
                },
                {
                    header: 'Reasignación',
                    dataIndex: 'reasignacion',
                    sortable: true,
                    width: 60,
                    renderer: departamentoReasignacion
                },
                {
                    header: 'Despachado'
                    , dataIndex: 'envio_inspeccion'
                    , align: 'center'
                    , falseText: 'No'
                    , menuDisabled: true
                    , trueText: 'Si'
                    , sortable: true
                    , width: 20
                    , xtype: 'booleancolumn'
                }
            ],
            viewConfig: {
                forceFit: true
            },
            sm: new Ext.grid.RowSelectionModel(
                {
                    singleSelect: true
                }
            ),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: 100,
                store: this.storeDocumentosReporte,
                displayInfo: true,
                displayMsg: 'Mostrando inspeccion {0} - {1} of {2}',
                emptyMsg: "No existen inspeccion que mostrar"
            }),
        });
        // fin datastore and datagrid in Guia


        var win = desktop.getWindow('layout-win');

        if (!win) {
            var winWidth = desktop.getWinWidth();
            var winHeight = desktop.getWinHeight();

            this.seleccionDepar = 3;
            this.formInspeccionDetalle = new Ext.FormPanel({
                id: 'formInspeccionDetalle',
                cls: 'no-border',
                items: [
                    {
                        id: 'formcabecerainspeccion',
                        /* collapsedTitle: true,
                         collapsible: true,
                         title: 'Listado Recepción Documentos',*/

                        titleCollapse: true,
                        split: true,
                        flex: 1,
                        autoScroll: true,
                        layout: 'column', items: this.gridInspeccion
                    },
                    {
                        split: true,
                        flex: 2,
                        bodyStyle: 'padding:0; background: #DFE8F6',
                        layout: 'column',
                        tbar: [
                            {
                                text: 'Grabar Recepción Detalle',
                                scope: this,
                                handler: this.grabarinspeccion,
                                iconCls: 'save-icon',
                                disabled: true,
                                id: 'tb_grabarinspeccion'
                                , formBind: true
                            },
                            '->',
                            {
                                text: 'Inspeccion anteriores:'
                                , xtype: 'tbtext',
                                id: 'textRecepcionAnteriores'
                            }
                        ],
                        items: [
                            {
                                xtype: 'tabpanel',

                                activeTab: 0,
                                width: winWidth,
                                cls: 'no-border',
                                items: [
                                    {
                                        title: 'Secretaría',
                                        layout: 'column',
                                        items: [
                                            {
                                                columnWidth: 1 / 3,
                                                layout: 'form',
                                                monitorValid: true,
                                                defaultType: 'textfield',
                                                items: [
                                                    {
                                                        xtype: 'hidden',
                                                        fieldLabel: 'Id',
                                                        name: 'id'
                                                    },
                                                    {
                                                        fieldLabel: 'Código trámite',
                                                        name: 'codigo_tramite',
                                                        anchor: '95%',
                                                        readOnly: true,
                                                        cls: 'sololectura'
                                                    },
                                                    {
                                                        xtype: 'combo',
                                                        fieldLabel: 'Persona recepta',
                                                        name: 'id_persona',
                                                        id: 'id_persona',
                                                        anchor: '95%',
                                                        hiddenName: 'id_persona',

                                                        store: storePRD,
                                                        valueField: 'id',
                                                        displayField: 'nombre',
                                                        typeAhead: true,
                                                        triggerAction: 'all',
                                                        mode: 'local'

                                                    },
                                                    {
                                                        xtype: 'datetimefield',
                                                        fieldLabel: 'Fecha recepción',
                                                        id: 'recepcion_documento',
                                                        name: 'recepcion_documento',
                                                        anchor: '95%',

                                                        dateFormat: 'Y-m-d',
                                                        timeFormat: 'H:i:s'


                                                    },
                                                    {
                                                        xtype: 'combo',
                                                        fieldLabel: 'Tipo documento',
                                                        id: 'id_tipo_documento',
                                                        name: 'id_tipo_documento',
                                                        anchor: '95%',

                                                        hiddenName: 'id_tipo_documento',
                                                        store: storeTID,
                                                        valueField: 'id',
                                                        displayField: 'nombre',
                                                        typeAhead: true,
                                                        triggerAction: 'all',
                                                        mode: 'local'

                                                    },
                                                    {
                                                        fieldLabel: 'Núm documento',
                                                        id: 'num_documento',
                                                        name: 'num_documento',
                                                        anchor: '95%'
                                                    },
                                                    {
                                                        fieldLabel: 'Remitente',
                                                        id: 'remitente',
                                                        name: 'remitente',
                                                        anchor: '95%'
                                                    },
                                                    {
                                                        fieldLabel: 'C:I. denunciante',
                                                        id: 'cedula',
                                                        name: 'cedula',
                                                        allowBlank: true,
                                                        anchor: '95%'
                                                    },
                                                    {
                                                        fieldLabel: 'Email denunciante',
                                                        id: 'email',
                                                        name: 'email',
                                                        anchor: '95%',
                                                        allowBlank: true
                                                        , vtype: 'email'
                                                    }
                                                ]
                                            },
                                            {

                                                columnWidth: 1 / 3,
                                                layout: 'form',
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        fieldLabel: 'Descripción anexo',
                                                        id: 'descripcion_anexos',
                                                        name: 'descripcion_anexos',
                                                        anchor: '95%'
                                                    },
                                                    {

                                                        xtype: 'spinnerfield',
                                                        fieldLabel: 'Cantidad de fojas',
                                                        id: 'cantidad_fojas',
                                                        name: 'cantidad_fojas',
                                                        minValue: 0,
                                                        maxValue: 200,
                                                        anchor: '95%'
                                                    },
                                                    {
                                                        xtype: 'textarea',
                                                        fieldLabel: 'Asunto',
                                                        id: 'asunto',
                                                        name: 'asunto',
                                                        height: 45,
                                                        anchor: '95%'
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        fieldLabel: 'Institución',
                                                        id: 'institucion',
                                                        name: 'institucion',
                                                        anchor: '95%'
                                                    },
                                                    {
                                                        xtype: 'combo',
                                                        fieldLabel: 'Caracter del trámite',
                                                        id: 'id_caracter_tramite',
                                                        name: 'id_caracter_tramite',
                                                        anchor: '95%',

                                                        hiddenName: 'id_caracter_tramite',
                                                        store: storeCDT,
                                                        valueField: 'id',
                                                        displayField: 'nombre',
                                                        typeAhead: true,
                                                        triggerAction: 'all',
                                                        mode: 'local'

                                                    },
                                                    {
                                                        xtype: 'textarea',
                                                        fieldLabel: 'Observaciones secretaria',
                                                        id: 'observacion_secretaria',
                                                        name: 'observacion_secretaria',
                                                        height: 45,
                                                        anchor: '95%'
                                                    }
                                                ]
                                            },
                                            {
                                                columnWidth: 1 / 3,
                                                layout: 'form',
                                                defaults: {
                                                    listeners: {
                                                        change: function (field, newVal, oldVal) {

                                                            if (field.getName() == 'envio_inspeccion') {
                                                                if (oldVal == 'true') {
                                                                    if (newVal == 'false') {
                                                                        Ext.getCmp('tb_grabarinspeccion').setDisabled(false);
                                                                        Ext.getCmp('reasignacion').enable();
                                                                    }
                                                                }
                                                            }

                                                            if (field.getName() == 'guia') {
                                                                if (oldVal != newVal) {
                                                                    console.log("cambio")
                                                                    Ext.getCmp('tb_grabarinspeccion').setDisabled(false);
//                                                                        Ext.getCmp('reasignacion').enable();
                                                                }
                                                            }


                                                        }
                                                    },
                                                },
                                                items: [
                                                    /* {
                                                     xtype: 'combo',
                                                     fieldLabel: 'Reasignado a',
                                                     name: 'reasignacion',
                                                     anchor: '95%',

                                                     hiddenName: 'reasignacion',
                                                     store: storeREA,
                                                     valueField: 'id',
                                                     displayField: 'nombre',
                                                     typeAhead: true,
                                                     triggerAction: 'all',
                                                     mode: 'local'
                                                     },*/
                                                    {
                                                        xtype: 'multiselect',
                                                        fieldLabel: 'Reasignado a:<br />(Para seleccion<br /> multiple mantenga<br /> pulsada la tecla Ctrl)',
                                                        id: 'reasignacion',
                                                        name: 'reasignacion',
                                                        width: 300,
                                                        height: 130,
                                                        allowBlank: false, store: storeREA,
                                                        hiddenName: 'reasignacion',
                                                        displayField: 'nombre',
                                                        valueField: 'id',
                                                        ddReorder: true
                                                    }
                                                    , {
                                                        xtype: 'displayfield',
                                                        fieldLabel: 'Total documentos anteriores:',
                                                        name: 'totaldocumentos',
                                                        anchor: '95%'
                                                    }, {
                                                        xtype: 'combo',
                                                        fieldLabel: 'Guía',
                                                        name: 'guia',
                                                        id: 'guia',
                                                        anchor: '95%',

                                                        hiddenName: 'guia',
                                                        store: storeREAGUIA,
                                                        valueField: 'id',
                                                        displayField: 'nombre',
                                                        typeAhead: true,
                                                        triggerAction: 'all',
                                                        mode: 'local'
                                                    }, {
                                                        xtype: 'combo',
                                                        fieldLabel: 'Despachado',
                                                        name: 'envio_inspeccion',
                                                        id: 'envio_inspeccion',
                                                        anchor: '95%',

                                                        hiddenName: 'envio_inspeccion',
                                                        store: storeOFAC,
                                                        valueField: 'id',
                                                        displayField: 'nombre',
                                                        typeAhead: true,
                                                        triggerAction: 'all',
                                                        mode: 'local'
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        title: 'Inspección',
                                        layout: 'column',
                                        autoScroll: true,
                                        items: [
                                            {
                                                type: 'container',
                                                columnWidth: 1 / 2,
                                                layout: 'form',
                                                items: [
                                                    {
                                                        bodyStyle: 'padding:0; background: #ebfaeb',
                                                        xtype: 'combo',
                                                        fieldLabel: 'Estado Recepcion Información',
                                                        name: 'estado_recepcion_informacion',
                                                        anchor: '95%',
                                                        hiddenName: 'estado_recepcion_informacion',

                                                        store: storeESREA,
                                                        valueField: 'id',
                                                        displayField: 'nombre',
                                                        typeAhead: true,
                                                        triggerAction: 'all',
                                                        mode: 'local',
                                                        readOnly: true,
                                                        cls: 'sololectura'
                                                    },
                                                    {
                                                        xtype: 'combo',
                                                        fieldLabel: 'Actividad',
                                                        name: 'actividad',
                                                        anchor: '95%',
                                                        hiddenName: 'actividad',

                                                        store: storeACTA,
                                                        valueField: 'id',
                                                        displayField: 'nombre',
                                                        typeAhead: true,
                                                        triggerAction: 'all',
                                                        mode: 'local',
                                                        readOnly: true,
                                                        cls: 'sololectura'
                                                    },
                                                    {
                                                        xtype: 'combo',
                                                        fieldLabel: 'Persona asignada',
                                                        name: 'persona_asignada',
                                                        anchor: '95%',
                                                        hiddenName: 'persona_asignada',

                                                        store: storePRASA,
                                                        valueField: 'id',
                                                        displayField: 'nombre',
                                                        typeAhead: true,
                                                        triggerAction: 'all',
                                                        mode: 'local',
                                                        readOnly: true,
                                                        cls: 'sololectura'
                                                    },

                                                    {
                                                        xtype: 'textfield',
                                                        fieldLabel: 'Cod inspección',
                                                        name: 'codigo_inspeccion',
                                                        anchor: '95%',
                                                        readOnly: true,
                                                        cls: 'sololectura'
                                                    }
                                                ]
                                            },
                                            {
                                                type: 'container',
                                                columnWidth: 1 / 2,
                                                layout: 'form',
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        fieldLabel: 'Cod procedimiento',
                                                        name: 'codigo_procedimiento',
                                                        anchor: '95%',
                                                        readOnly: true,
                                                        cls: 'sololectura'
                                                    },
                                                    {
                                                        xtype: 'combo',
                                                        fieldLabel: 'Zona',
                                                        name: 'id_zona',
                                                        anchor: '95%',
                                                        hiddenName: 'id_zona',

                                                        store: storeZONA,
                                                        valueField: 'id',
                                                        displayField: 'nombre',
                                                        typeAhead: true,
                                                        triggerAction: 'all',
                                                        mode: 'local',
                                                        readOnly: true,
                                                        cls: 'sololectura'
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        fieldLabel: 'Predio',
                                                        name: 'predio',
                                                        anchor: '95%',
                                                        readOnly: true,
                                                        cls: 'sololectura'
                                                    }
                                                    ,
                                                    {
                                                        xtype: 'textfield',
                                                        fieldLabel: 'Observación',
                                                        name: 'observacion',
                                                        anchor: '95%',
                                                        readOnly: true,
                                                        cls: 'sololectura'
                                                    },

                                                    {

                                                        xtype: 'textarea',
                                                        fieldLabel: 'Procedimiento',
                                                        name: 'procedimientosdetalle',
                                                        anchor: '95%',
                                                        readOnly: true,
                                                        cls: 'sololectura'

                                                    }
                                                ]
                                            }
                                        ]
                                    }

                                ]
                            }

                        ]
                    }
                ]
            });

            this.formConsultaDocumentos = new Ext.FormPanel({
                layout: 'column',
                title: 'Ingrese los parámetros',
                frame: true,
                bodyStyle: 'padding:5px 5px 0',
                items: [
                    {
                        columnWidth: 1 / 3,
                        layout: 'form',
                        items: [
                            {
                                xtype: 'datetimefield',
                                fieldLabel: 'Fecha Inicio',
                                id: 'busqueda_fecha_inicio',
                                anchor: '95%',
                                dateFormat: 'Y-m-d',
                                timeFormat: 'H:i:s'
                            },
                            {
                                xtype: 'datetimefield',
                                fieldLabel: 'Fecha Fin',
                                id: 'busqueda_fecha_fin',
                                anchor: '95%',
                                dateFormat: 'Y-m-d',
                                timeFormat: 'H:i:s'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Tipo documento',
                                id: 'busqueda_tipo_documento',
                                name: 'busqueda_tipo_documento',
                                hiddenName: 'busqueda_tipo_documento',

                                anchor: '95%',
                                store: storeTID,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'

                            }
                        ]
                    },
                    {
                        columnWidth: 1 / 3,
                        layout: 'form',
                        items: [
                            {
                                xtype: 'combo',
                                fieldLabel: 'Institución',
                                id: 'busqueda_institucion',
                                name: 'busqueda_institucion',
                                hiddenName: 'busqueda_institucion',
                                anchor: '95%',
                                store: storeINST,
                                valueField: 'nombre',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Caracter',
                                id: 'busqueda_caracter_tramite',
                                name: 'busqueda_caracter_tramite',
                                anchor: '95%',
                                hiddenName: 'busqueda_caracter_tramite',
                                store: storeCDT,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Guía',
                                name: 'busqueda_guia',
                                id: 'busqueda_guia',
                                anchor: '95%',
                                hiddenName: 'busqueda_guia',
                                store: storeREAGUIA,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            }
                        ]
                    },
                    {
                        columnWidth: 1 / 3,
                        layout: 'form',
                        items: [
                            {
                                xtype: 'multiselect',
                                fieldLabel: 'Unidades',
                                id: 'busqueda_reasignacion',
                                name: 'busqueda_reasignacion',
                                width: 300,
                                height: 100,
                                allowBlank: false, store: storeREA,
                                hiddenName: 'busqueda_reasignacion',
                                displayField: 'nombre',
                                valueField: 'id',
                                ddReorder: true
                            }
                        ]
                    }
                ]
            });


            var checkHandler = function (item, checked) {
                if (checked) {
                    var store = this.storeInspeccion;
                    store.baseParams.filterField = item.key;
                    searchFieldBtn.setText(item.text);
                }
            };

            var targetHandler = function (item, checked) {
                if (checked) {
                    //var store = this.storeInspeccion;
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
                            key: 'codigo_tramite',
                            scope: this,
                            text: 'Código trámite'
                        },
                        {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'num_documento',
                            scope: this,
                            text: 'Número documento'
                        }
                        , {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'remitente',
                            scope: this,
                            text: 'Remitente'
                        }
                        , {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'descripcion_anexos',
                            scope: this,
                            text: 'Descripcion Anexos'
                        }

                        , {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'recepcion_documento',
                            scope: this,
                            text: 'Fecha'
                        }, {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'cedula',
                            scope: this,
                            text: 'Cédula'
                        }, {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'guia',
                            scope: this,
                            text: 'Guía'
                        }, {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'institucion',
                            scope: this,
                            text: 'Institución'
                        }
                    ]
                })
                , text: 'Código trámite'
            });
            var targetFieldBtn = new Ext.Button({
                menu: new Ext.menu.Menu({
                    id: 'tb_seleccionarUnidad1',
                    disabled: true,
                    items: [
                        {
                            checked: false,
                            checkHandler: targetHandler,
                            group: 'targetField',
                            key: '2',
                            scope: this,
                            text: 'Secretaría'
                        }
                        , {
                            checked: true,
                            checkHandler: targetHandler,
                            group: 'targetField',
                            key: '3',
                            scope: this,
                            text: 'Inspeccion'
                        }
                        , {
                            checked: false,
                            checkHandler: targetHandler,
                            group: 'targetField',
                            key: '4',
                            scope: this,
                            text: 'Instrucción'
                        }
                        , {
                            checked: false,
                            checkHandler: targetHandler,
                            group: 'targetField',
                            key: '5',
                            scope: this,
                            text: 'Resolución y Ejecución'
                        }
                        , {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: '6',
                            scope: this,
                            text: 'Administrativa y financiera'
                        }
                    ]
                })
                , text: 'Inspeccion'
            });
            this.targetFieldBtn = targetFieldBtn;
            win = desktop.createWindow({
                id: 'grid-win-inspeccion',
                title: 'Recepción Documentos',
                width: winWidth,
                height: winHeight,
                iconCls: 'inspeccion-icon',
                shim: false,
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',

                items: new Ext.TabPanel({
                    activeTab: 0,
                    border: false,
                    items: [
                        {
                            autoScroll: true,
                            title: 'General',
                            closable: true,
                            tbar: [
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.addinspeccion,
                                    iconCls: 'save-icon',
                                    disabled: !acceso
                                },
                                '-',
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deleteinspeccion,
                                    iconCls: 'delete-icon',
                                    //disabled: this.app.isAllowedTo('accesosAdministradorIns', this.id) ? false : true
                                    disabled: true
                                },
                                '-',
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridData,
                                    scope: this,
                                    text: 'Recargar Datos',
                                    tooltip: 'Recargar datos'
                                },
                                '-',
                                {
                                    xtype: 'checkbox',
                                    boxLabel: 'No despachados -- ',
                                    id: 'checkNoEnviados',
                                    name: 'noenviados',
                                    checked: false,
                                    inputValue: '1',
                                    tooltip: 'Recargar datos',
                                    disabled: !acceso,
                                    cls: 'barramenu',
                                    handler: function (checkbox, isChecked) {
                                        Ext.getCmp('tb_repoteInspeccion').setDisabled(!this.checked);
                                        //Ext.getCmp('tb_seleccionarUnidad').setDisabled(!this.checked);
                                        //Ext.getCmp('tb_seleccionarUnidad').getValue();
                                        storeInspeccion.load({params: {noenviados: isChecked}});
                                        // if (!this.checked) {
                                        Ext.getCmp('tb_seleccionarUnidad').setValue('Seleccionar Unidad');
                                        //}
                                    }
                                }, /*this.targetFieldBtn,*/
                                {
                                    xtype: 'combo',

                                    fieldLabel: 'Reasignado a',
                                    name: 'tb_reasignacion',
                                    anchor: '95%',
                                    id: 'tb_seleccionarUnidad',
                                    /* disabled: true,*/
                                    hiddenName: 'tb_reasignacion',
                                    store: storeREATOT,
                                    valueField: 'id',
                                    displayField: 'nombre',
                                    typeAhead: true,
                                    triggerAction: 'all',
                                    mode: 'local',
                                    width: 250,
                                    value: 'Seleccionar Unidad',
                                    listeners: {
                                        'select': function (t) {
                                            isChecked = (Ext.getCmp('checkNoEnviados').getValue());
                                            storeInspeccion.baseParams = {
                                                noenviados: isChecked,
                                                unidadfiltro: t.value
                                            };
                                            storeInspeccion.load();

                                        }
                                    }
                                },
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarReporte,
                                    scope: this,
                                    text: 'Generar Reporte',
                                    tooltip: 'Se genera el reporte de los items',
                                    id: 'tb_repoteInspeccion',
                                    disabled: true
                                },
                                '-',
                                '->'
                                , {
                                    text: 'Buscar por:'
                                    , xtype: 'tbtext'
                                }

                                , searchFieldBtn
                                , ' ', ' '
                                , new QoDesk.QoAdmin.SearchField({
                                    paramName: 'filterText'
                                    , store: this.storeInspeccion
                                })
                            ],
                            items: this.formInspeccionDetalle
                        }
                        ,
                        {
                            title: 'Recepción Guías',
                            closable: true,
                            layout: 'border',
                            tbar: [
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataInspeccionGuia,
                                    scope: this,
                                    text: 'Recargar Datos'

                                }/*,
                                 {
                                 iconCls: 'excel-icon',
                                 handler: this.botonExportarReporteReimpresion,
                                 scope: this,
                                 text: 'Generar Reporte',
                                 tooltip: 'Se genera el reporte de la guía seleccionada',
                                 id: 'tb_repoteInspeccionGuias',
                                 disabled: !acceso
                                 }*/
                            ],
                            items: [
                                {
                                    region: 'north',
                                    height: 200,
                                    minSize: 100,
                                    maxSize: 150,
                                    closable: true,
                                    autoScroll: false,
                                    items: this.gridInspeccionGuia
                                },
                                {
                                    region: 'center',
                                    split: true,
                                    autoScroll: true,
                                    height: 300,
                                    minSize: 100,
                                    maxSize: 150,
                                    margins: '0 0 0 0',
                                    items: this.gridInspeccionSimple
                                }
                            ]
                        }
                        , {
                            autoScroll: true,
                            title: 'Unidades',
                            closable: true,
                            disabled: this.app.isAllowedTo('accesosAdministradorIns', this.id) ? false : true,
                            tbar: [
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.addInspeccionReasignacion,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deleteInspeccionReasignacion,
                                    iconCls: 'delete-icon'
                                },
                                '-', {
                                    iconCls: 'demo-grid-add',
                                    handler: this.requestGridDataInspeccionReasignacion,
                                    scope: this,
                                    text: 'Recargar Datos'
                                }
                            ],
                            items: this.gridInspeccionReasignacion
                        }
                        , {
                            autoScroll: true,
                            title: 'Zonas',
                            closable: true,
                            disabled: this.app.isAllowedTo('accesosAdministradorIns', this.id) ? false : true,
                            tbar: [
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.addInspeccionZonas,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deleteInspeccionZonas,
                                    iconCls: 'delete-icon'
                                },
                                '-', {
                                    iconCls: 'demo-grid-add',
                                    handler: this.requestGridDataInspeccionZonas,
                                    scope: this,
                                    text: 'Recargar Datos'
                                }
                            ],
                            items: this.gridInspeccionZonas
                        }
                        , {
                            title: 'Reportes',
                            closable: true,
                            layout: 'border',
                            disabled: this.app.isAllowedTo('accesosInspeccion', this.id) ? false : true,
                            tbar: [
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataDocumentoReporte,
                                    scope: this,
                                    text: 'Buscar'

                                },
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataDocumentoReporteReset,
                                    scope: this,
                                    text: 'Borrar formulario'

                                },
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarDocumentoReporte,
                                    scope: this,
                                    text: 'Exportar listado',
                                    tooltip: 'Se genera archivo Excel con la información solicitada',
                                    id: 'tb_repoteInspeccionGuias',
                                    disabled: !acceso,


                                }
                            ],
                            items: [
                                {
                                    region: 'north',
                                    height: 145,
                                    minSize: 100,
                                    maxSize: 150,
                                    closable: true,
                                    autoScroll: false,
                                    items: this.formConsultaDocumentos
                                },
                                {
                                    // lazily created panel (xtype:'panel' is default)
                                    region: 'center',
                                    split: true,
                                    autoScroll: true,
                                    height: 300,
                                    minSize: 100,
                                    maxSize: 150,
                                    items: this.gridDocumentosReporte
                                }
                            ]

                            //this.gridReportes
                        }

                        , {
                            autoScroll: true,
                            title: 'Procedimientos',
                            closable: true,
                            disabled: this.app.isAllowedTo('accesosAdministradorIns', this.id) ? false : true,

                            tbar: [
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.addinspeccionProcedimientos,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deleteinspeccionProcedimientos,
                                    iconCls: 'delete-icon'
                                },
                                '-', {
                                    iconCls: 'demo-grid-add',
                                    handler: this.requestGridDataInspeccionProcedimientos,
                                    scope: this,
                                    text: 'Recargar Datos'
                                }
                            ],
                            items: this.gridInspeccionProcedimientos
                        }

                    ]
                })
            });
        }
        win.show();
        function cargaDetalle(inspeccion, forma, bloqueo) {
            forma = Ext.getCmp('formInspeccionDetalle');
            forma.getForm().load({
                url: urlInspeccion + 'crudInspeccion.php?operation=selectForm',
                params: {
                    id: inspeccion
                },
                success: function (response, opts) {
                    mensaje = Ext.getCmp('textRecepcionAnteriores');
                    if (response.findField('totaldocumentos').getValue() != '0')
                        mensaje.setText('Total documentos anteriores: ' + response.findField('totaldocumentos').getValue())
                    else
                        mensaje.setText('')
                }
            });
            bloquearLectura(forma, bloqueo);
        };


        function bloquearLectura(forma, activar) {
            //en caso que se pueda editar .. revisamos permiso por perfil

            //validate if have access adminsitrator
            if (activar)
                activar2 = activar
            else
                activar2 = !accesosAdministradorIns

            //en caso que es solo lectura
            if (!acceso) {
                activar2 = activar = true;
            }

            Ext.getCmp('id_persona').setReadOnly(activar2);
            Ext.getCmp('recepcion_documento').setReadOnly(activar);
            Ext.getCmp('id_tipo_documento').setReadOnly(activar);
            Ext.getCmp('num_documento').setReadOnly(activar);
            Ext.getCmp('remitente').setReadOnly(activar);
            Ext.getCmp('cedula').setReadOnly(activar);
            Ext.getCmp('email').setReadOnly(activar);
            Ext.getCmp('descripcion_anexos').setReadOnly(activar);
            Ext.getCmp('cantidad_fojas').setReadOnly(activar);
            Ext.getCmp('asunto').setReadOnly(activar);
            Ext.getCmp('institucion').setReadOnly(activar);
            Ext.getCmp('id_caracter_tramite').setReadOnly(activar);
            Ext.getCmp('observacion_secretaria').setReadOnly(activar);


            Ext.getCmp('envio_inspeccion').setReadOnly(!acceso);
            Ext.getCmp('guia').setReadOnly(!acceso);


            if (accesosRecepciónIns)
                Ext.getCmp('reasignacion').disable();
            else {
                if (!activar)
                    Ext.getCmp('reasignacion').enable();
                else
                    Ext.getCmp('reasignacion').disable();
            }

        };


        setTimeout(function () {
            this.storeInspeccion.load({
                params: {
                    start: 0,
                    limit: limiteinspeccion,
                    noenviados: Ext.getCmp('checkNoEnviados').getValue()
                }
            });
        }, 500);


    },
    deleteinspeccion: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridInspeccion.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeInspeccion.remove(rows);
                }
            }
        });
    },
    addinspeccion: function () {
        var inspeccion = new this.storeInspeccion.recordType({
            codigo_tramite: ' ',
            id_persona: ' ',
            recepcion_documento: (new Date()),
            id_tipo_documento: '2',
            num_documento: 'S/N',
            descripcion_anexos: '-',
            institucion: '',
            remitente: '',
            reasignacion: '',
            id_caracter_tramite: '1',
            cantidad_fojas: '0',
            envio_inspeccion: false

        });
        this.gridInspeccion.stopEditing();
        this.storeInspeccion.insert(0, inspeccion);
        this.gridInspeccion.startEditing(0, 0);
        // this.cargaDetalle(rec.id, this.formInspeccionDetalle, rec.get("envio_inspeccion"));
    },
    requestGridData: function () {


        this.storeInspeccion.load({params: {noenviados: Ext.getCmp('checkNoEnviados').getValue()}});
    },

    botonExportarReporte: function () {

        if (Ext.getCmp('tb_seleccionarUnidad').getValue() == 'Seleccionar Unidad')
            Ext.Msg.show({
                title: 'Advertencia',
                msg: 'Seleccione unidad',
                scope: this,
                icon: Ext.Msg.WARNING
            });
        else
            Ext.Msg.show({
                title: 'Advertencia',
                msg: 'Se descarga el archivo Excel<br>Se cambia el estado de Enviado a Si.<br>¿Desea continuar?',
                scope: this,
                icon: Ext.Msg.WARNING,
                buttons: Ext.Msg.YESNO,
                fn: function (btn) {
                    if (btn == 'yes') {
                        window.location.href = 'modules/desktop/inspeccion/server/descargaInspeccionNuevas.inc.php?unidad=' + Ext.getCmp('tb_seleccionarUnidad').getValue();
                        setTimeout(function () {
                            storeInspeccion.load({params: {noenviados: Ext.getCmp('checkNoEnviados').getValue()}});
                        }, 1000);

                    }
                }
            });
    },

// funcion usada por boton
    botonExportarReporteReimpresion: function () {
        // recuperamos registro seleccionado de datagrid inspeccion
        var rows = this.gridInspeccionGuia.getSelectionModel().getSelections();
        //validamos si existe seleccion  y mensaje error
        if (rows.length === 0) {
            Ext.Msg.show({
                title: 'Atencion',
                msg: 'Seleccione una guía a imprimir',
                scope: this,
                icon: Ext.Msg.WARNING
            });
            return false;
        }
        // mensaje continuar y llamada a descarga archivo
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Se descarga el archivo Excel<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {

                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/inspeccion/server/descargaInspeccionNuevas.inc.php?reimpresion=true&guia=' + rows[0].get('id');
                }
            }
        });
    },

    grabarinspeccion: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Desea Guardar los cambios.<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var myForm = Ext.getCmp('formInspeccionDetalle').getForm();
                    myForm.submit({
                        url: 'modules/desktop/inspeccion/server/crudInspeccion.php?operation=updateForm',
                        method: 'POST',
                        waitMsg: 'Saving data',
                        success: function (form, action) {
                            storeInspeccion.load({params: {noenviados: Ext.getCmp('checkNoEnviados').getValue()}});
                            Ext.getCmp('tb_grabarinspeccion').setDisabled(true);
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
    showError: function (msg, title) {
        title = title || 'Error';
        Ext.Msg.show({
            title: title
            , msg: msg
            , modal: true
            , icon: Ext.Msg.ERROR
            , buttons: Ext.Msg.OK
        });
    },
    deleteinspeccionProcedimientos: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridInspeccionProcedimientos.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeInspeccionProcedimientos.remove(rows);
                }
            }
        });
    },
    addinspeccionProcedimientos: function () {
        var inspeccionProcedimientos = new this.storeInspeccionProcedimientos.recordType({
            id: ' ',
            nombre: '',
            observacion: ''
        });
        this.gridInspeccionProcedimientos.stopEditing();
        this.storeInspeccionProcedimientos.insert(0, inspeccionProcedimientos);
        this.gridInspeccionProcedimientos.startEditing(0, 0);
    },
    requestGridDataInspeccionProcedimientos: function () {
        this.storeInspeccionProcedimientos.load();
    },

    deleteInspeccionZonas: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridInspeccionZonas.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeInspeccionZonas.remove(rows);
                }
            }
        });
    },
    addInspeccionZonas: function () {
        var InspeccionZonas = new this.storeInspeccionZonas.recordType({
            id: ' ',
            nombre: '',
            activo: '1'
        });
        this.gridInspeccionZonas.stopEditing();
        this.storeInspeccionZonas.insert(0, InspeccionZonas);
        this.gridInspeccionZonas.startEditing(0, 0);
    },
    requestGridDataInspeccionZonas: function () {
        this.storeInspeccionZonas.load();
    },

    deleteInspeccionReasignacion: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridInspeccionReasignacion.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeInspeccionReasignacion.remove(rows);
                }
            }
        });
    },
    addInspeccionReasignacion: function () {
        var InspeccionReasignacion = new this.storeInspeccionReasignacion.recordType({
            id: ' ',
            nombre: '',
            activo: '1'
        });
        this.gridInspeccionReasignacion.stopEditing();
        this.storeInspeccionReasignacion.insert(0, InspeccionReasignacion);
        this.gridInspeccionReasignacion.startEditing(0, 0);
    },
    requestGridDataInspeccionReasignacion: function () {
        this.storeInspeccionReasignacion.load();
    },
    requestGridDataInspeccionGuia: function () {
        this.storeInspeccionGuia.load();
    },
    requestGridDataDocumentoReporte: function () {
        this.storeDocumentosReporte.baseParams = this.formConsultaDocumentos.getForm().getValues();
        this.storeDocumentosReporte.load();
    },
    requestGridDataDocumentoReporteReset: function () {
        this.formConsultaDocumentos.getForm().reset();
    },
    botonExportarDocumentoReporte: function () {
        var rows = this.storeDocumentosReporte.getCount()
        if (rows === 0) {
            Ext.Msg.show({
                title: 'Atencion',
                msg: 'Busqueda sin resultados',
                scope: this,
                icon: Ext.Msg.WARNING
            });
            return false;
        }
        // mensaje continuar y llamada a descarga archivo
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Se descarga el archivo Excel<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    valueParams = JSON.stringify(this.formConsultaDocumentos.getForm().getValues());
                    window.location.href = 'modules/desktop/inspeccion/server/descargaReporte.inc.php?param=' + valueParams;
                }
            }
        });
    }
});