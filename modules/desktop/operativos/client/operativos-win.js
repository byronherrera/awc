QoDesk.OperativosWindow = Ext.extend(Ext.app.Module, {
    id: 'operativos',
    type: 'desktop/operativos',

    init: function () {
        this.launcher = {
            text: 'Inspección',
            iconCls: 'operativos-icon',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function () {
        var accesosAdministradorOpe = this.app.isAllowedTo('accesosAdministradorOpe', this.id);
        var accesosOperativos = this.app.isAllowedTo('accesosOperativos', this.id);
        // estado no usado
        //var accesosRecepciónIns = this.app.isAllowedTo('accesosRecepciónOpe', this.id);

        //var acceso = (accesosAdministradorOpe || accesosOperativos || accesosRecepciónIns) ? true : false
        var acceso = (accesosAdministradorOpe || accesosOperativos ) ? true : false

        var desktop = this.app.getDesktop();
        var AppMsg = new Ext.AppMsg({});

        var win = desktop.getWindow('grid-win-operativos');
        var urlOperativos = "modules/desktop/operativos/server/";

        var textField = new Ext.form.TextField({allowBlank: false});

        function formatDate(value) {
            return value ? value.dateFormat('Y-m-d H:i') : '';
        }

        function formatDateFull(value) {
            return value ? value.dateFormat('Y-m-d H:i:s') : '';
        }

// inicio combos secretaria

        //inicio combo tipo documento  OPTID
        storeOPTID = new Ext.data.JsonStore({
            root: 'documento',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                documento: [
                    {"id": 1, "nombre": "Licenciamiento"},
                    {"id": 2, "nombre": "Espacio Público"}
                ]
            }
        });

        var comboOPTID = new Ext.ux.form.CheckboxCombo({
            width: 250,
            mode: 'local',
            store: storeOPTID,
            valueField: 'id',
            displayField: 'nombre',
            allowBlank: false,
            listeners: {
                'change': function (cmb, arr) {
                }
            }
        });

        function operativosTipoOperativos(id) {
            if (id === '') return '';
            var nombres = id.split(",");
            retorno = '';
            for (var i = 1; i <= nombres.length; i++) {
                index = storeOPTID.find('id', i);
                var record = storeOPTID.getAt(index);
                retorno = record.get('nombre') + ',' + retorno
            }
            return retorno
        }
        //fin combo tipo documento  OPTID

        //inicio combo activo
        storeOPOFAC = new Ext.data.JsonStore({
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

        var comboOPOFAC = new Ext.form.ComboBox({
            id: 'comboOPOFAC',
            store: storeOPOFAC,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function operativosDespachadoActivo(id) {
            var index = storeOPOFAC.find('id', id);
            if (index > -1) {
                var record = storeOPOFAC.getAt(index);
                return record.get('nombre');
            }
        }
        //fin combo activo

        //inicio combo nivel complejidad
        storeOPNICO = new Ext.data.JsonStore({
            root: 'users',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                users: [
                    {"id": '1', "nombre": "Alto"},
                    {"id": '2', "nombre": "Medio"},
                    {"id": '3', "nombre": "Bajo"}
                ]
            }
        });

        var comboOPNICO = new Ext.form.ComboBox({
            id: 'comboOPNICO',
            store: storeOPNICO,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function operativosNivelComplejidad(id) {
            var index = storeOPNICO.find('id', id);
            if (index > -1) {
                var record = storeOPNICO.getAt(index);
                return record.get('nombre');
            }
        }
        //fin combo nivel complejidad

        //inicio combo reasignacion  OPREA
        storeOPREA = new Ext.data.JsonStore({
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

        storeOPREA.sort('orden', 'ASC');
        var comboOPREA = new Ext.form.ComboBox({
            id: 'comboOPREA',
            store: storeOPREA,
            valueField: 'id',
            displayField: 'nombre',
            mode: 'local',
            forceSelection: true,
            allowBlank: false
        });

        function operativosDepartamentoReasignacion(id) {
            var index = storeOPREA.find('id', id);
            if (index > -1) {
                var record = storeOPREA.getAt(index);
                return record.get('nombre');
            } else {
                return ''
            }

        }
        //fin combo reasignacion OPREA

        //inicio combo reasignacion  OPREATOT
        storeOPREATOT = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=unidadestotal'
        });

        var comboOPREATOT = new Ext.form.ComboBox({
            id: 'comboOPREATOT',
            store: storeOPREATOT,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function departamentoOPREATOTsignacion(id) {
            var index = storeOPREATOT.find('id', id);
            var record = storeOPREATOT.getAt(index);
            return record.get('nombre');
        }
        //fin combo reasignacion OPREATOT

        //inicio combo guia  OPREAGUIA
        storeOPREAGUIA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=guia'
        });

        var comboOPREAGUIA = new Ext.form.ComboBox({
            id: 'comboOPREAGUIA',
            store: storeOPREAGUIA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function departamentoOPREAGUIAS(id) {
            var index = storeOPREAGUIA.find('id', id);
            var record = storeOPREAGUIA.getAt(index);
            return record.get('nombre');
        }
        //fin combo reasignacion OPREAGUIA

        //inicio combo persona recepta la operativos PRD
        storePRD = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personaloperativos'

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
        //fin combo persona recepta la operativos PRD

// fin combos secretaria

// inicio combos operativos

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

        //inicio combo actividad  ACTAºº
        storeACTA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=depOperativos'
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

        //inicio combo Estado Recepcion Información Operativos ESOPREA
        storeESOPREA = new Ext.data.JsonStore({
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

        var comboESOPREA = new Ext.form.ComboBox({
            id: 'comboESOPREA',
            store: storeESOPREA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function estadoRecepcionAdm(id) {
            var index = storeESOPREA.find('id', id);
            if (index > -1) {
                var record = storeESOPREA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo Estado Recepcion Información Operativos ESOPREA

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
            url: 'modules/common/combos/combos.php?tipo=personaloperativos'
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
// inicio combos operativos

// inicio pestañas de mantenimiento


        //inicio mantenimiento OperativosGuia
        var proxyOperativosGuia = new Ext.data.HttpProxy({
            api: {
                create: urlOperativos + "crudOperativosGuia.php?operation=insert",
                read: urlOperativos + "crudOperativosGuia.php?operation=select",
                update: urlOperativos + "crudOperativosGuia.php?operation=update",
                destroy: urlOperativos + "crudOperativosGuia.php?operation=delete"
            }
        });

        var readerOperativosGuia = new Ext.data.JsonReader({
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

        var writerOperativosGuia = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeOperativosGuia = new Ext.data.Store({
            id: "id",
            proxy: proxyOperativosGuia,
            reader: readerOperativosGuia,
            writer: writerOperativosGuia,
            autoSave: true
        });
        this.storeOperativosGuia.load();

        this.gridOperativosGuia = new Ext.grid.EditorGridPanel({
            id: 'gridOperativosGuia',
            xtype: "grid",
            height: 200,
            store: this.storeOperativosGuia,
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
                        storeOperativosSimple.load({params: {filterField: 'guia', filterText: rec.get("id")}})
                    }
                }
            }),
            border: false,
            stripeRows: true,
            bbar: new Ext.PagingToolbar({
                pageSize: 100,
                store: this.storeOperativosGuia,
                displayInfo: true,
                displayMsg: 'Mostrando trámite {0} - {1} de {2}',
                emptyMsg: "No existen tramites que mostrar"
            }),
        });

        //fin mantenimiento OperativosGuías


// fin pestañas de mantenimiento

        // inicio ventana operativos
        var proxyOperativos = new Ext.data.HttpProxy({
            api: {
                create: urlOperativos + "crudOperativos.php?operation=insert",
                read: urlOperativos + "crudOperativos.php?operation=select",
                update: urlOperativos + "crudOperativos.php?operation=update",
                destroy: urlOperativos + "crudOperativos.php?operation=delete"
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

        var readerOperativos = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id_persona', allowBlank: false},
                {name: 'codigo_operativo', allowBlank: false},
                {name: 'fecha_planificacion', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'fecha_inicio_planificacion', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'fecha_fin_planificacion', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'id_tipo_control', allowBlank: false},
                {name: 'id_nivel_complejidad', allowBlank: false},
                {name: 'observaciones', allowBlank: false},
                {name: 'punto_encuentro_planificado', allowBlank: false},
                {name: 'id_zona', allowBlank: true},
                {name: 'id_persona_encargada', allowBlank: false},
                {name: 'finalizado', type: 'boolean', allowBlank: false}
            ]
        });
        var writerOperativos = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        this.storeOperativos = new Ext.data.Store({
            id: "id",
            proxy: proxyOperativos,
            reader: readerOperativos,
            writer: writerOperativos,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });
        storeOperativos = this.storeOperativos;
        limiteoperativos = 100;
        this.gridOperativos = new Ext.grid.EditorGridPanel({
            height: 200,
            store: this.storeOperativos,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Código',
                    dataIndex: 'codigo_operativo',
                    sortable: true,
                    width: 20
                },
                {
                    header: 'Fecha inicio',
                    dataIndex: 'fecha_inicio_planificacion',
                    sortable: true,
                    width: 45,
                    renderer: formatDate,
                    editor: new Ext.ux.form.DateTimeField({
                        dateFormat: 'Y-m-d',
                        timeFormat: 'H:i'
                    })
                },
                {
                    header: 'Fecha Fin',
                    dataIndex: 'fecha_fin_planificacion',
                    sortable: true,
                    width: 45,
                    renderer: formatDate,
                    editor: new Ext.ux.form.DateTimeField({
                        dateFormat: 'Y-m-d',
                        timeFormat: 'H:i'
                    })
                },
                {
                    header: 'Tipo de control',
                    dataIndex: 'id_tipo_control',
                    sortable: true,
                    width: 45,
                    editor: comboOPTID, renderer: operativosTipoOperativos
                },
                {
                    header: 'Nivel complejidad',
                    dataIndex: 'id_nivel_complejidad',
                    sortable: true,
                    width: 38,
                    editor: comboOPNICO, renderer: operativosNivelComplejidad
                },
                {
                    header: 'Zona',
                    dataIndex: 'id_zona',
                    sortable: true,
                    width: 55,
                    editor: comboZONA, renderer: zonaAdm
                },
                {
                    header: 'Persona Encargada',
                    dataIndex: 'id_persona_encargada',
                    sortable: true,
                    width: 30,
                    editor: comboPRD,
                    renderer: personaReceptaDenuncia
                },
                {
                    header: 'Punto Encuentro',
                    dataIndex: 'punto_encuentro_planificado',
                    sortable: true,

                    width: 55,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Observaciones',
                    dataIndex: 'observaciones',
                    sortable: true,
                    width: 60,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Elaborado',
                    dataIndex: 'id_persona',
                    sortable: true,
                    width: 30,
                    //editor: comboPRD,

                    renderer: personaReceptaDenuncia
                },
                {
                    header: 'Fecha elaboracion',
                    dataIndex: 'fecha_planificacion',
                    sortable: true,
                    width: 45,
                    renderer: formatDate,
                    editor: new Ext.ux.form.DateTimeField({
                        dateFormat: 'Y-m-d',
                        timeFormat: 'H:i'
                    })
                },
                {
                    header: 'Finalizado'
                    , dataIndex: 'finalizado'
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
                    if (record.get('finalizado') == false) {
                        return 'gold';
                    }
                }
            },
            sm: new Ext.grid.RowSelectionModel(
                {
                    singleSelect: true,
                    listeners: {
                        rowselect: function (sm, row, rec) {
                            cargaDetalle(rec.id, this.formOperativosDetalle, rec.get("finalizado"));
                            if (acceso) {
                                if (rec.get("finalizado")) {
                                    Ext.getCmp('tb_grabaroperativos').setDisabled(true);
                                    Ext.getCmp('borraroperativo').setDisabled(true);
                                }
                                else {
                                    Ext.getCmp('tb_grabaroperativos').setDisabled(false);
                                    Ext.getCmp('borraroperativo').setDisabled(accesosAdministradorOpe ? false : true);
                                }
                            }
                        }
                    }
                }
            ),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: limiteoperativos,
                store: storeOperativos,
                displayInfo: true,
                displayMsg: 'Mostrando operativos {0} - {1} de {2}',
                emptyMsg: "No existen operativos que mostrar"
            }),

            listeners: {
                beforeedit: function (e) {
                    // si el operativo ya esta marcado como finalizado no se lo puede editar
                    if (acceso) {
                        if (e.record.get("finalizado")) {
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
        this.storeOperativosSimple = new Ext.data.Store({
            id: "id",
            proxy: proxyOperativos,
            reader: readerOperativos,
            writer: writerOperativos,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });

        storeOperativosSimple = this.storeOperativosSimple;


        var checkboxSel = new Ext.grid.CheckboxSelectionModel({
            checkOnly: true,
            dataIndex: 'cantidad_fojas',
            listeners: {
                // On selection change, set enabled state of the removeButton
                // which was placed into the GridPanel using the ref config
                selectionchange: function (sm) {
                    if (sm.getCount() > 0) {
                        Ext.getCmp('tb_grabarRecepcionTramites').enable();
                    }
                    else {
                        Ext.getCmp('tb_grabarRecepcionTramites').disable();
                    }
                }
            }
        })

        this.gridOperativosSimple = new Ext.grid.EditorGridPanel({
            id: 'gridOperativosSimple',
            autoHeight: true,
            autoScroll: true,
            store: this.storeOperativosSimple,
            columns: [
                new Ext.grid.RowNumberer(),
                checkboxSel,
                {
                    header: 'Código',
                    dataIndex: 'codigo_operativo',
                    sortable: true,
                    width: 20
                },
                {
                    header: '2Persona recepta',
                    dataIndex: 'id_persona',
                    sortable: true,
                    width: 35,
                    renderer: personaReceptaDenuncia
                },
                {
                    header: 'Fecha recepción',
                    dataIndex: 'fecha_inicio_planificacion',
                    sortable: true,
                    width: 45,
                    renderer: formatDate
                },
                {
                    header: 'Tipo documento',
                    dataIndex: 'id_tipo_control',
                    sortable: true,
                    width: 30,
                    renderer: operativosTipoOperativos
                },
                {
                    header: 'N. documento',
                    dataIndex: 'id_nivel_complejidad',
                    sortable: true,
                    width: 40
                },
                {
                    header: 'Remitente',
                    dataIndex: 'punto_encuentro_planificado',
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
                    header: 'Fojas',
                    dataIndex: 'cantidad_fojas',
                    sortable: true,
                    width: 20
                }
            ],
            viewConfig: {
                forceFit: true
            },
            sm: checkboxSel,
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            listeners: {

                beforeedit: function (e) {
                    /*    if (acceso) {
                     if (e.record.get("finalizado")) {
                     return false;
                     }
                     return true;
                     } else {
                     return false;
                     }*/
                }
            }
        });
        // fin datastore and datagrid in Guia
        var gridOperativosSimple = this.gridOperativosSimple
        // datastore and datagrid in Guia
        this.storeDocumentosReporte = new Ext.data.Store({
            id: "id",
            proxy: proxyOperativos,
            reader: readerOperativos,
            writer: writerOperativos,
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
                    dataIndex: 'codigo_operativo',
                    sortable: true,
                    width: 20
                },
                {
                    header: '4Persona recepta',
                    dataIndex: 'id_persona',
                    sortable: true,
                    width: 35,
                    renderer: personaReceptaDenuncia
                },
                {
                    header: 'Recepción documento',
                    dataIndex: 'fecha_inicio_planificacion',
                    sortable: true,
                    width: 45,
                    renderer: formatDate
                },
                {
                    header: 'Tipo documento',
                    dataIndex: 'id_tipo_control',
                    sortable: true,
                    width: 30,
                    renderer: operativosTipoOperativos
                },
                {
                    header: 'N. documento',
                    dataIndex: 'id_nivel_complejidad',
                    sortable: true,
                    width: 40
                },
                {
                    header: 'Remitente',
                    dataIndex: 'punto_encuentro_planificado',
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
                    renderer: operativosDepartamentoReasignacion
                },
                {
                    header: 'Despachado'
                    , dataIndex: 'finalizado'
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
                displayMsg: 'Mostrando operativos {0} - {1} de {2}',
                emptyMsg: "No existen operativos que mostrar"
            }),
        });
        // fin datastore and datagrid in Guia


        var win = desktop.getWindow('layout-win');

        if (!win) {
            var winWidth = desktop.getWinWidth();
            var winHeight = desktop.getWinHeight();

            this.seleccionDepar = 3;
            this.formOperativosDetalle = new Ext.FormPanel({
                id: 'formOperativosDetalle',
                cls: 'no-border',
                items: [
                    {
                        id: 'formcabeceraoperativos',
                        titleCollapse: true,
                        split: true,
                        flex: 1,
                        autoScroll: true,
                        layout: 'column', items: this.gridOperativos
                    },
                    {
                        split: true,
                        flex: 2,
                        bodyStyle: 'padding:0; background: #DFE8F6',
                        layout: 'column',
                        items: [
                            {
                                xtype: 'tabpanel',

                                activeTab: 0,
                                width: winWidth,
                                cls: 'no-border',
                                items: [
                                    {
                                        title: 'Personal asignado',
                                        layout: 'column',
                                        tbar: [
                                            {
                                                text: 'Nuevo',
                                                scope: this,
                                                handler: this.addoperativos,
                                                iconCls: 'save-icon',
                                                disabled: !acceso
                                            },
                                            '-',
                                            {
                                                text: "Eliminar",
                                                scope: this,
                                                handler: this.deleteoperativos,
                                                id: 'borraroperativo',
                                                iconCls: 'delete-icon',
                                                disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                                //disabled: true
                                            }
                                        ],
                                        items: [
                                            //todo datagrid aca mismo
                                        ]
                                    },
                                    {
                                        title: 'Vehículos asignados',
                                        layout: 'column',
                                        autoScroll: true,
                                        tbar: [
                                            {
                                                text: 'Nuevo',
                                                scope: this,
                                                handler: this.addoperativos,
                                                iconCls: 'save-icon',
                                                disabled: !acceso
                                            },
                                            '-',
                                            {
                                                text: "Eliminar",
                                                scope: this,
                                                handler: this.deleteoperativos,
                                                id: 'borraroperativo',
                                                iconCls: 'delete-icon',
                                                disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                                //disabled: true
                                            }
                                        ],
                                        items: [
                                            //todo datagrid aca mismo

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
                                store: storeOPTID,
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
                                fieldLabel: 'Guía',
                                name: 'busqueda_guia',
                                id: 'busqueda_guia',
                                anchor: '95%',
                                hiddenName: 'busqueda_guia',
                                store: storeOPREAGUIA,
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
                                allowBlank: false, store: storeOPREA,
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
                    var store = this.storeOperativos;
                    store.baseParams.filterField = item.key;
                    searchFieldBtn.setText(item.text);
                }
            };

            var targetHandler = function (item, checked) {
                if (checked) {
                    //var store = this.storeOperativos;
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
                            key: 'codigo_operativo',
                            scope: this,
                            text: 'Código trámite'
                        },
                        {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'id_nivel_complejidad',
                            scope: this,
                            text: 'Número documento'
                        }
                        , {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'punto_encuentro_planificado',
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
                            key: 'fecha_inicio_planificacion',
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
                            text: 'Operativos'
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
                , text: 'Operativos'
            });
            this.targetFieldBtn = targetFieldBtn;
            win = desktop.createWindow({
                id: 'grid-win-operativos',
                title: 'Trámites Inspección',
                width: winWidth,
                height: winHeight,
                iconCls: 'operativos-icon',
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
                            title: 'Planificación operativos',
                            closable: true,
                            tbar: [
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.addoperativos,
                                    iconCls: 'save-icon',
                                    disabled: !acceso
                                },
                                '-',
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deleteoperativos,
                                    id: 'borraroperativo',
                                    iconCls: 'delete-icon',
                                    disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                    //disabled: true
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
                                    boxLabel: 'No finalizados -- ',
                                    id: 'checkNoRecibidos',
                                    name: 'noenviados',
                                    checked: true,
                                    inputValue: '1',
                                    tooltip: 'Recargar datos',
                                    disabled: !acceso,
                                    cls: 'barramenu',
                                    handler: function (checkbox, isChecked) {
                                        //   Ext.getCmp('tb_repoteOperativos').setDisabled(!this.checked);
                                        storeOperativos.load({params: {finalizados: isChecked}});
                                        //   Ext.getCmp('tb_seleccionarUnidad').setValue('Seleccionar Unidad');
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
                                    store: storeOPREATOT,
                                    valueField: 'id',
                                    displayField: 'nombre',
                                    typeAhead: true,
                                    triggerAction: 'all',
                                    mode: 'local',
                                    width: 250,
                                    value: 'Seleccionar Unidad',
                                    listeners: {
                                        'select': function (t) {
                                            isChecked = (Ext.getCmp('checkNoRecibidos').getValue());
                                            storeOperativos.baseParams = {
                                                finalizados: isChecked,
                                                unidadfiltro: t.value
                                            };
                                            storeOperativos.load();

                                        }
                                    }
                                },
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarReporte,
                                    scope: this,
                                    text: 'Generar Reporte',
                                    tooltip: 'Se genera el reporte de los items',
                                    id: 'tb_repoteOperativos',
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
                                    , store: this.storeOperativos
                                })
                            ],
                            items: this.formOperativosDetalle
                        }
                        , {
                            title: 'Recepción Guías',
                            closable: true,
                            layout: 'border',
                            tbar: [
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataOperativosGuia,
                                    scope: this,
                                    text: 'Recargar Datos'

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
                                    items: this.gridOperativosGuia
                                },
                                {
                                    region: 'center',
                                    split: true,
                                    autoScroll: true,
                                    height: 300,
                                    minSize: 100,
                                    maxSize: 150,
                                    tbar: [
                                        {
                                            text: 'Grabar Recepción Trámites'
                                            , scope: this
                                            , handler: this.grabardenuncias
                                            , iconCls: 'save-icon'
                                            , disabled: true
                                            , id: 'tb_grabarRecepcionTramites'
                                            , formBind: true
                                        }
                                    ],
                                    margins: '0 0 0 0',
                                    items: this.gridOperativosSimple
                                }
                            ]
                        }


                        , {
                            title: 'Reportes',
                            closable: true,
                            layout: 'border',
                            //disabled: this.app.isAllowedTo('accesosOperativos', this.id) ? false : true,
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
                                    id: 'tb_repoteOperativosGuias',
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

                    ]
                })
            });
        }
        win.show();
        function cargaDetalle(operativos, forma, bloqueo) {
            forma = Ext.getCmp('formOperativosDetalle');
            forma.getForm().load({
                url: urlOperativos + 'crudOperativos.php?operation=selectForm',
                params: {
                    id: operativos
                },
                success: function (response, opts) {/*
                 // para el caso que existan denuncias anteriores
                 mensaje = Ext.getCmp('textRecepcionAnteriores');
                 if (response.findField('totaldocumentos').getValue() != '0')
                 mensaje.setText('Total documentos anteriores: ' + response.findField('totaldocumentos').getValue())
                 else
                 mensaje.setText('')*/
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
                activar2 = !accesosAdministradorOpe

            //en caso que es solo lectura
            if (!acceso) {
                activar2 = activar = true;
            }

            Ext.getCmp('id_persona').setReadOnly(activar2);
            Ext.getCmp('fecha_inicio_planificacion').setReadOnly(activar);
            Ext.getCmp('id_tipo_control').setReadOnly(activar);
            Ext.getCmp('id_nivel_complejidad').setReadOnly(activar);
            Ext.getCmp('punto_encuentro_planificado').setReadOnly(activar);
            Ext.getCmp('cedula').setReadOnly(activar);
            Ext.getCmp('email').setReadOnly(activar);
            Ext.getCmp('descripcion_anexos').setReadOnly(activar);
            Ext.getCmp('cantidad_fojas').setReadOnly(activar);
            Ext.getCmp('asunto').setReadOnly(activar);
            Ext.getCmp('institucion').setReadOnly(activar);
            Ext.getCmp('id_caracter_tramite').setReadOnly(activar);
            Ext.getCmp('observacion_secretaria').setReadOnly(activar);


            Ext.getCmp('finalizado').setReadOnly(!acceso);
            Ext.getCmp('guia').setReadOnly(!acceso);


            if (!activar)
                Ext.getCmp('reasignacion').enable();
            else
                Ext.getCmp('reasignacion').disable();

        };

        setTimeout(function () {
            this.storeOperativos.load({
                params: {
                    start: 0,
                    limit: limiteoperativos,
                    finalizados: Ext.getCmp('checkNoRecibidos').getValue()
                }
            });
        }, 500);

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
            id_persona: '-',
            codigo_operativo: '-',
            fecha_planificacion: (new Date()),
            fecha_inicio_planificacion: (new Date()),
            fecha_fin_planificacion: (new Date()),
            id_tipo_control: '',
            id_nivel_complejidad: ' ',
            observaciones: '',
            punto_encuentro_planificado: ' ',
            id_zona: ' ',
            id_persona_encargada: ' ',
            finalizado: false,
        });
        this.gridOperativos.stopEditing();
        this.storeOperativos.insert(0, operativos);
        this.gridOperativos.startEditing(0, 0);
    },
    requestGridData: function () {
        this.storeOperativos.load({params: {finalizados: Ext.getCmp('checkNoRecibidos').getValue()}});
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
                        window.location.href = 'modules/desktop/operativos/server/descargaOperativosNuevas.inc.php?unidad=' + Ext.getCmp('tb_seleccionarUnidad').getValue();
                        setTimeout(function () {
                            storeOperativos.load({params: {finalizados: Ext.getCmp('checkNoRecibidos').getValue()}});
                        }, 1000);

                    }
                }
            });
    },

// funcion usada por boton
    botonExportarReporteReimpresion: function () {
        // recuperamos registro seleccionado de datagrid operativos
        var rows = this.gridOperativosGuia.getSelectionModel().getSelections();
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
                    window.location.href = 'modules/desktop/operativos/server/descargaOperativosNuevas.inc.php?reimpresion=true&guia=' + rows[0].get('id');
                }
            }
        });
    },

    grabaroperativos: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Desea Guardar los cambios.<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var myForm = Ext.getCmp('formOperativosDetalle').getForm();
                    myForm.submit({
                        url: 'modules/desktop/operativos/server/crudOperativos.php?operation=updateForm',
                        method: 'POST',
                        waitMsg: 'Saving data',
                        success: function (form, action) {
                            storeOperativos.load({params: {finalizados: Ext.getCmp('checkNoRecibidos').getValue()}});
                            Ext.getCmp('tb_grabaroperativos').setDisabled(true);
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
                    window.location.href = 'modules/desktop/operativos/server/descargaReporte.inc.php?param=' + valueParams;
                }
            }
        });
    }
});