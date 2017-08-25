QoDesk.DenunciasWindow = Ext.extend(Ext.app.Module, {
    id: 'denuncias',
    type: 'desktop/denuncias',

    init: function () {
        this.launcher = {
            text: 'Recepción documentos',
            iconCls: 'denuncias-icon',
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
        var AppMsg =  new Ext.AppMsg({});

        var win = desktop.getWindow('grid-win-denuncias');
        var urlDenuncias = "modules/desktop/denuncias/server/";

        var textField = new Ext.form.TextField({allowBlank: false});

        Ext.Ajax.request({
            url: 'modules/common/combos/combos.php?tipo=usuario',
            params: {
                count: 1
            },
            // http success : code 200
            success: function (response) {
                obj = JSON.parse(response.responseText);
                var usuarioLog = obj['data'];

            }
        });

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
                    {"id": 1, "nombre": "Denuncias"}
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

        //inicio combo persona recepta la denuncia PRD
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

        //fin combo persona recepta la denuncia PRD

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


        //inicio mantenimiento Denuncias Procedimientos

        var proxyDenunciasProcedimientos = new Ext.data.HttpProxy({
            api: {
                create: urlDenuncias + "crudDenunciasProcedimientos.php?operation=insert",
                read: urlDenuncias + "crudDenunciasProcedimientos.php?operation=select",
                update: urlDenuncias + "crudDenunciasProcedimientos.php?operation=update",
                destroy: urlDenuncias + "crudDenunciasProcedimientos.php?operation=delete"
            }
        });

        var readerDenunciasProcedimientos = new Ext.data.JsonReader({
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

        var writerDenunciasProcedimientos = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeDenunciasProcedimientos = new Ext.data.Store({
            id: "id",
            proxy: proxyDenunciasProcedimientos,
            reader: readerDenunciasProcedimientos,
            writer: writerDenunciasProcedimientos,
            autoSave: true
        });
        this.storeDenunciasProcedimientos.load();

        this.gridDenunciasProcedimientos = new Ext.grid.EditorGridPanel({

            autoHeight: true,
            autoScroll: true,
            store: this.storeDenunciasProcedimientos, columns: [
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

        // fin DenunciasProcedimientos

        //inicio mantenimiento DenunciasZonas

        var proxyDenunciasZonas = new Ext.data.HttpProxy({
            api: {
                create: urlDenuncias + "crudDenunciasZonas.php?operation=insert",
                read: urlDenuncias + "crudDenunciasZonas.php?operation=select",
                update: urlDenuncias + "crudDenunciasZonas.php?operation=update",
                destroy: urlDenuncias + "crudDenunciasZonas.php?operation=delete"
            }
        });

        var readerDenunciasZonas = new Ext.data.JsonReader({
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

        var writerDenunciasZonas = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeDenunciasZonas = new Ext.data.Store({
            id: "id",
            proxy: proxyDenunciasZonas,
            reader: readerDenunciasZonas,
            writer: writerDenunciasZonas,
            autoSave: true
        });
        this.storeDenunciasZonas.load();

        this.gridDenunciasZonas = new Ext.grid.EditorGridPanel({
            autoHeight: true,
            autoScroll: true,
            store: this.storeDenunciasZonas, columns: [
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
                    , editor: {
                    xtype: 'checkbox'
                }
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

        //fin mantenimiento DenunciasZonas

        //inicio mantenimiento DenunciasReasignacion

        var proxyDenunciasReasignacion = new Ext.data.HttpProxy({
            api: {
                create: urlDenuncias + "crudDenunciasReasignacion.php?operation=insert",
                read: urlDenuncias + "crudDenunciasReasignacion.php?operation=select",
                update: urlDenuncias + "crudDenunciasReasignacion.php?operation=update",
                destroy: urlDenuncias + "crudDenunciasReasignacion.php?operation=delete"
            }
        });

        var readerDenunciasReasignacion = new Ext.data.JsonReader({
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

        var writerDenunciasReasignacion = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeDenunciasReasignacion = new Ext.data.Store({
            id: "id",
            proxy: proxyDenunciasReasignacion,
            reader: readerDenunciasReasignacion,
            writer: writerDenunciasReasignacion,
            autoSave: true
        });
        this.storeDenunciasReasignacion.load();

        this.gridDenunciasReasignacion = new Ext.grid.EditorGridPanel({
            autoHeight: true,
            autoScroll: true,
            store: this.storeDenunciasReasignacion, columns: [
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
                    , editor: {
                    xtype: 'checkbox'
                }
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
        //fin mantenimiento DenunciasReasignacion

        //inicio mantenimiento DenunciasGuia
        var proxyDenunciasGuia = new Ext.data.HttpProxy({
            api: {
                create: urlDenuncias + "crudDenunciasGuia.php?operation=insert",
                read: urlDenuncias + "crudDenunciasGuia.php?operation=select",
                update: urlDenuncias + "crudDenunciasGuia.php?operation=update",
                destroy: urlDenuncias + "crudDenunciasGuia.php?operation=delete"
            }
        });

        var readerDenunciasGuia = new Ext.data.JsonReader({
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

        var writerDenunciasGuia = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeDenunciasGuia = new Ext.data.Store({
            id: "id",
            proxy: proxyDenunciasGuia,
            reader: readerDenunciasGuia,
            writer: writerDenunciasGuia,
            autoSave: true
        });
        this.storeDenunciasGuia.load();

        this.gridDenunciasGuia = new Ext.grid.EditorGridPanel({
            id: 'gridDenunciasGuia',
            xtype: "grid",
            height: 200,
            store: this.storeDenunciasGuia,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'id',
                    dataIndex: 'id',
                    sortable: true,
                    width: 5
                }, {
                    header: 'Número',
                    dataIndex: 'numero',
                    sortable: true,
                    width: 30
                },
                {
                    header: 'Unidad Enviada',
                    dataIndex: 'unidad',
                    sortable: true,
                    width: 40
                },
                {
                    header: 'Fecha',
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
                        storeDenunciasSimple.load({params: {filterField: 'guia', filterText: rec.get("id")}})
                    }
                }
            }),
            border: false,
            stripeRows: true,
            bbar: new Ext.PagingToolbar({
                pageSize: 100,
                store: this.storeDenunciasGuia,
                displayInfo: true,
                displayMsg: 'Mostrando denuncias {0} - {1} of {2}',
                emptyMsg: "No existen denuncias que mostrar"
            }),
        });

        //fin mantenimiento DenunciasGuías


// fin pestañas de mantenimiento

        // inicio ventana denuncias
        var proxyDenuncias = new Ext.data.HttpProxy({
            api: {
                create: urlDenuncias + "crudDenuncias.php?operation=insert",
                read: urlDenuncias + "crudDenuncias.php?operation=select",
                update: urlDenuncias + "crudDenuncias.php?operation=update",
                destroy: urlDenuncias + "crudDenuncias.php?operation=delete"
            },
            listeners: {
                write: function (proxy, action, result, res, rs) {
                    if (typeof res.message !== 'undefined') {
                        if  (res.message != ''){
                            AppMsg.setAlert(AppMsg.STATUS_NOTICE, res.message );
                        }
                    }
                }
            }
        });

        var readerDenuncias = new Ext.data.JsonReader({
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
        var writerDenuncias = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        this.storeDenuncias = new Ext.data.Store({
            id: "id",
            proxy: proxyDenuncias,
            reader: readerDenuncias,
            writer: writerDenuncias,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });
        storeDenuncias = this.storeDenuncias;
        limitedenuncias = 100;

        this.gridDenuncias = new Ext.grid.EditorGridPanel({
            height: 160,
            store: this.storeDenuncias,
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
                }, {
                    header: 'Recepción documento',
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
                }
                , {
                    header: 'Caracter trámite',
                    dataIndex: 'id_caracter_tramite',
                    sortable: true,
                    width: 30,
                    editor: comboCDT, renderer: caracterTramite
                }, {
                    header: 'Fojas',
                    dataIndex: 'cantidad_fojas',

                    width: 20,
                    editor: new Ext.ux.form.SpinnerField({
                        fieldLabel: 'Age',
                        name: 'age',
                        minValue: 0,
                        maxValue: 100
                    })
                }
                , {
                    header: 'Reasignación',
                    dataIndex: 'reasignacion',
                    sortable: true,
                    width: 60,
                    editor: comboREA, renderer: departamentoReasignacion
                }
                , {
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
                            /*cargar el formulario*/
                            // cargaDetalle(rec.id, this.formDenunciaswebDetalle, rec);

                            cargaDetalle(rec.id, this.formDenunciasDetalle, rec.get("envio_inspeccion"));
                            if (acceso) {
                                if (rec.get("envio_inspeccion"))
                                    Ext.getCmp('tb_grabardenuncias').setDisabled(true);
                                else
                                    Ext.getCmp('tb_grabardenuncias').setDisabled(false);
                            }
                            ;
                            storeINST.load();
                        }
                    }
                }),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: limitedenuncias,
                store: storeDenuncias,
                displayInfo: true,
                displayMsg: 'Mostrando denuncias {0} - {1} of {2}',
                emptyMsg: "No existen denuncias que mostrar"
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
        this.storeDenunciasSimple = new Ext.data.Store({
            id: "id",
            proxy: proxyDenuncias,
            reader: readerDenuncias,
            writer: writerDenuncias,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });
        storeDenunciasSimple = this.storeDenunciasSimple
        this.gridDenunciasSimple = new Ext.grid.EditorGridPanel({
            autoHeight: true,
            autoScroll: true,
            store: this.storeDenunciasSimple,
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
                }, {
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
                }
                , {
                    header: 'Caracter trámite',
                    dataIndex: 'id_caracter_tramite',
                    sortable: true,
                    width: 30,
                    renderer: caracterTramite
                }, {
                    header: 'Fojas',
                    dataIndex: 'cantidad_fojas',
                    sortable: true,
                    width: 20
                }
                , {
                    header: 'Reasignación',
                    dataIndex: 'reasignacion',
                    sortable: true,
                    width: 60,
                    renderer: departamentoReasignacion
                }
                , {
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
            proxy: proxyDenuncias,
            reader: readerDenuncias,
            writer: writerDenuncias,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });

        storeDocumentosReporte = this.storeDocumentosReporte
        this.gridDocumentosReporte = new Ext.grid.EditorGridPanel({

            height: desktop.getWinHeight() -  238,
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
                }, {
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
                }
                , {
                    header: 'Caracter trámite',
                    dataIndex: 'id_caracter_tramite',
                    sortable: true,
                    width: 30,
                    renderer: caracterTramite
                }, {
                    header: 'Fojas',
                    dataIndex: 'cantidad_fojas',
                    sortable: true,
                    width: 20
                }
                , {
                    header: 'Reasignación',
                    dataIndex: 'reasignacion',
                    sortable: true,
                    width: 60,
                    renderer: departamentoReasignacion
                }
                , {
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
                }),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: 100,
                store: this.storeDocumentosReporte,
                displayInfo: true,
                displayMsg: 'Mostrando denuncias {0} - {1} of {2}',
                emptyMsg: "No existen denuncias que mostrar"
            }),
        });
        // fin datastore and datagrid in Guia


        var win = desktop.getWindow('layout-win');

        if (!win) {
            var winWidth = desktop.getWinWidth();
            var winHeight = desktop.getWinHeight();
            this.seleccionDepar = 3;

            this.formDenunciasDetalle = new Ext.FormPanel({
                id: 'formDenunciasDetalle',
                cls: 'no-border',
                items: [
                    {
                        id: 'formcabeceradenuncias',
                        /* collapsedTitle: true,
                         collapsible: true,
                         title: 'Listado Recepción Documentos',*/

                        titleCollapse: true,
                        split: true,
                        flex: 1,
                        autoScroll: true,
                        layout: 'column', items: this.gridDenuncias
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
                                handler: this.grabardenuncias,
                                iconCls: 'save-icon',
                                disabled: true,
                                id: 'tb_grabardenuncias'
                                , formBind: true
                            },
                            '->',
                            {
                                text: 'Denuncias anteriores:'
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
                                                                        Ext.getCmp('tb_grabardenuncias').setDisabled(false);
                                                                        Ext.getCmp('reasignacion').enable();
                                                                    }
                                                                }
                                                            }

                                                            if (field.getName() == 'guia') {
                                                                if (oldVal != newVal) {
                                                                    console.log("cambio")
                                                                    Ext.getCmp('tb_grabardenuncias').setDisabled(false);
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
                    var store = this.storeDenuncias;
                    store.baseParams.filterField = item.key;
                    searchFieldBtn.setText(item.text);
                }
            };

            var targetHandler = function (item, checked) {
                if (checked) {
                    //var store = this.storeDenuncias;
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
                id: 'grid-win-denuncias',
                title: 'Recepción Documentos',
                width: winWidth,
                height: winHeight,
                iconCls: 'denuncias-icon',
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
                                    handler: this.adddenuncias,
                                    iconCls: 'save-icon',
                                    disabled: !acceso
                                },
                                '-',
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deletedenuncias,
                                    iconCls: 'delete-icon',
                                    //disabled: this.app.isAllowedTo('accesosAdministrador', this.id) ? false : true
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
                                        Ext.getCmp('tb_repoteDenuncias').setDisabled(!this.checked);
                                        //Ext.getCmp('tb_seleccionarUnidad').setDisabled(!this.checked);
                                        //Ext.getCmp('tb_seleccionarUnidad').getValue();
                                        storeDenuncias.load({params: {noenviados: isChecked}});
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
                                    value: 'Seleccionar unidad',
                                    listeners: {
                                        'select': function (t) {
                                            isChecked = (Ext.getCmp('checkNoEnviados').getValue());
                                            storeDenuncias.load({
                                                params: {
                                                    noenviados: isChecked,
                                                    unidadfiltro: t.value
                                                }
                                            });
                                        }

                                    }

                                },
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarReporte,
                                    scope: this,
                                    text: 'Generar Reporte',
                                    tooltip: 'Se genera el reporte de los items',
                                    id: 'tb_repoteDenuncias',
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
                                    , store: this.storeDenuncias
                                })
                            ],
                            items: this.formDenunciasDetalle
                        }
                        , {
                            title: 'Guías',
                            closable: true,
                            layout: 'border',
                            tbar: [
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataDenunciasGuia,
                                    scope: this,
                                    text: 'Recargar Datos'

                                },
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarReporteReimpresion,
                                    scope: this,
                                    text: 'Generar Reporte',
                                    tooltip: 'Se genera el reporte de la guía seleccionada',
                                    id: 'tb_repoteDenunciasGuias',
                                    disabled: !acceso
                                }
                            ],
                            items: [
                                {
                                    region: 'north',
                                    height: 200,

                                    minSize: 100,
                                    maxSize: 150,
                                    closable: true,
                                    autoScroll: false,
                                    items: this.gridDenunciasGuia

                                },
                                // create instance immediately
                                {
                                    // lazily created panel (xtype:'panel' is default)
                                    region: 'center',
                                    split: true,
                                    autoScroll: true,
                                    height: 300,
                                    minSize: 100,
                                    maxSize: 150,
                                        margins: '0 0 0 0',
                                    items: this.gridDenunciasSimple
                                }
                            ]

                            //this.gridDenunciasGuia
                        }
                        , {
                            autoScroll: true,
                            title: 'Unidades',
                            closable: true,
                            disabled: this.app.isAllowedTo('accesosAdministrador', this.id) ? false : true,
                            tbar: [
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.addDenunciasReasignacion,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deleteDenunciasReasignacion,
                                    iconCls: 'delete-icon'
                                },
                                '-', {
                                    iconCls: 'demo-grid-add',
                                    handler: this.requestGridDataDenunciasReasignacion,
                                    scope: this,
                                    text: 'Recargar Datos'
                                }
                            ],
                            items: this.gridDenunciasReasignacion
                        }
                        , {
                            autoScroll: true,
                            title: 'Zonas',
                            closable: true,
                            disabled: this.app.isAllowedTo('accesosAdministrador', this.id) ? false : true,
                            tbar: [
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.addDenunciasZonas,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deleteDenunciasZonas,
                                    iconCls: 'delete-icon'
                                },
                                '-', {
                                    iconCls: 'demo-grid-add',
                                    handler: this.requestGridDataDenunciasZonas,
                                    scope: this,
                                    text: 'Recargar Datos'
                                }
                            ],
                            items: this.gridDenunciasZonas
                        }
                        , {
                            title: 'Reportes',
                            closable: true,
                            layout: 'border',
                            disabled: this.app.isAllowedTo('accesosSecretaria', this.id) ? false : true,
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
                                    id: 'tb_repoteDenunciasGuias',
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
                            disabled: this.app.isAllowedTo('accesosAdministrador', this.id) ? false : true,

                            tbar: [
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.adddenunciasProcedimientos,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deletedenunciasProcedimientos,
                                    iconCls: 'delete-icon'
                                },
                                '-', {
                                    iconCls: 'demo-grid-add',
                                    handler: this.requestGridDataDenunciasProcedimientos,
                                    scope: this,
                                    text: 'Recargar Datos'
                                }
                            ],
                            items: this.gridDenunciasProcedimientos
                        }

                    ]
                })
            });
        }
        win.show();
        function cargaDetalle(denuncias, forma, bloqueo) {
            forma = Ext.getCmp('formDenunciasDetalle');
            forma.getForm().load({
                url: urlDenuncias + 'crudDenuncias.php?operation=selectForm',
                params: {
                    id: denuncias
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
                activar2 = !accesosAdministrador

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


            if (accesosZonales)
                Ext.getCmp('reasignacion').disable();
            else {
                if (!activar)
                    Ext.getCmp('reasignacion').enable();
                else
                    Ext.getCmp('reasignacion').disable();
            }

        };


        setTimeout(function () {
            this.storeDenuncias.load({
                params: {
                    start: 0,
                    limit: limitedenuncias,
                    noenviados: Ext.getCmp('checkNoEnviados').getValue()
                }
            });
        }, 500);


    },
    deletedenuncias: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridDenuncias.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeDenuncias.remove(rows);
                }
            }
        });
    },
    adddenuncias: function () {
        var denuncias = new this.storeDenuncias.recordType({
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
        this.gridDenuncias.stopEditing();
        this.storeDenuncias.insert(0, denuncias);
        this.gridDenuncias.startEditing(0, 0);
        // this.cargaDetalle(rec.id, this.formDenunciasDetalle, rec.get("envio_inspeccion"));
    },
    requestGridData: function () {


        this.storeDenuncias.load({params: {noenviados: Ext.getCmp('checkNoEnviados').getValue()}});
    },

    botonExportarReporte: function () {

        if (Ext.getCmp('tb_seleccionarUnidad').getValue() == 'Seleccionar unidad')
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
                        window.location.href = 'modules/desktop/denuncias/server/descargaDenunciasNuevas.inc.php?unidad=' + Ext.getCmp('tb_seleccionarUnidad').getValue();
                        setTimeout(function () {
                            storeDenuncias.load({params: {noenviados: Ext.getCmp('checkNoEnviados').getValue()}});
                        }, 1000);

                    }
                }
            });
    },

// funcion usada por boton
    botonExportarReporteReimpresion: function () {
        // recuperamos registro seleccionado de datagrid denunciaguia
        var rows = this.gridDenunciasGuia.getSelectionModel().getSelections();
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
                    window.location.href = 'modules/desktop/denuncias/server/descargaDenunciasNuevas.inc.php?reimpresion=true&guia=' + rows[0].get('id');
                }
            }
        });
    },

    grabardenuncias: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Desea Guardar los cambios.<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var myForm = Ext.getCmp('formDenunciasDetalle').getForm();
                    myForm.submit({
                        url: 'modules/desktop/denuncias/server/crudDenuncias.php?operation=updateForm',
                        method: 'POST',
                        waitMsg: 'Saving data',
                        success: function (form, action) {
                            storeDenuncias.load({params: {noenviados: Ext.getCmp('checkNoEnviados').getValue()}});
                            Ext.getCmp('tb_grabardenuncias').setDisabled(true);
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
    deletedenunciasProcedimientos: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridDenunciasProcedimientos.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeDenunciasProcedimientos.remove(rows);
                }
            }
        });
    },
    adddenunciasProcedimientos: function () {
        var denunciasProcedimientos = new this.storeDenunciasProcedimientos.recordType({
            id: ' ',
            nombre: '',
            observacion: ''
        });
        this.gridDenunciasProcedimientos.stopEditing();
        this.storeDenunciasProcedimientos.insert(0, denunciasProcedimientos);
        this.gridDenunciasProcedimientos.startEditing(0, 0);
    },
    requestGridDataDenunciasProcedimientos: function () {
        this.storeDenunciasProcedimientos.load();
    },

    deleteDenunciasZonas: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridDenunciasZonas.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeDenunciasZonas.remove(rows);
                }
            }
        });
    },
    addDenunciasZonas: function () {
        var DenunciasZonas = new this.storeDenunciasZonas.recordType({
            id: ' ',
            nombre: '',
            activo: '1'
        });
        this.gridDenunciasZonas.stopEditing();
        this.storeDenunciasZonas.insert(0, DenunciasZonas);
        this.gridDenunciasZonas.startEditing(0, 0);
    },
    requestGridDataDenunciasZonas: function () {
        this.storeDenunciasZonas.load();
    },

    deleteDenunciasReasignacion: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridDenunciasReasignacion.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeDenunciasReasignacion.remove(rows);
                }
            }
        });
    },
    addDenunciasReasignacion: function () {
        var DenunciasReasignacion = new this.storeDenunciasReasignacion.recordType({
            id: ' ',
            nombre: '',
            activo: '1'
        });
        this.gridDenunciasReasignacion.stopEditing();
        this.storeDenunciasReasignacion.insert(0, DenunciasReasignacion);
        this.gridDenunciasReasignacion.startEditing(0, 0);
    },
    requestGridDataDenunciasReasignacion: function () {
        this.storeDenunciasReasignacion.load();
    },
    requestGridDataDenunciasGuia: function () {
        this.storeDenunciasGuia.load();
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
                    valueParams =   JSON.stringify(this.formConsultaDocumentos.getForm().getValues());
                    window.location.href = 'modules/desktop/denuncias/server/descargaReporte.inc.php?param=' + valueParams;
                }
            }
        });
    }
});