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

        this.selectOperativos = 0;
        selectOperativos = 0;
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
                    {"id": 'false', "nombre": "No"}
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
        var comboPRD2 = new Ext.form.ComboBox({
            id: 'comboPRD2',
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

        //inicio combo actividad  ACTA
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
                        storeOperativosPersonal.load({params: {idOperativo: rec.get("id")}})
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
                {name: 'fallido', type: 'boolean', allowBlank: false},
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
            height: desktop.getWinHeight() - 322,
            store: this.storeOperativos,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Código',
                    dataIndex: 'codigo_operativo',
                    sortable: true,
                    width: 17
                },
                {
                    header: 'Fecha inicio',
                    dataIndex: 'fecha_inicio_planificacion',
                    sortable: true,
                    width: 37,
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
                    width: 37,
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
                    header: 'Complejidad',
                    dataIndex: 'id_nivel_complejidad',
                    sortable: true,
                    width: 30,
                    editor: comboOPNICO, renderer: operativosNivelComplejidad
                },
                {
                    header: 'Zona',
                    dataIndex: 'id_zona',
                    sortable: true,
                    width: 40,
                    editor: comboZONA, renderer: zonaAdm
                },
                {
                    header: 'Persona Encargada',
                    dataIndex: 'id_persona_encargada',
                    sortable: true,
                    width: 40,
                    editor: comboPRD2,
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
                    hidden: true,
                    //editor: comboPRD,
                    renderer: personaReceptaDenuncia
                },
                {
                    header: 'Fecha elaboracion',
                    dataIndex: 'fecha_planificacion',
                    sortable: true,
                    width: 45, hidden: true,
                    renderer: formatDate,
                    editor: new Ext.ux.form.DateTimeField({
                        dateFormat: 'Y-m-d',
                        timeFormat: 'H:i'
                    })
                },
                {
                    header: 'Fallido',
                    dataIndex: 'fallido',
                    sortable: true,
                    width: 25,
                    editor: {
                        xtype: 'checkbox'
                    }
                    , falseText: 'No'
                    , menuDisabled: true
                    , trueText: 'Si'
                    , xtype: 'booleancolumn'
                },
                {
                    header: 'Finalizado'
                    , dataIndex: 'finalizado'
                    , align: 'center'
                    , falseText: 'No'
                    , menuDisabled: true
                    , trueText: 'Si'
                    , sortable: true
                    , width: 25,
                    editor: {
                        xtype: 'checkbox'
                    }
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
                            // recuperamos la informacion de personal asignado a ese operativo
                            selectOperativos = rec.id;
                            storeOperativosPersonal.load({params: {id_operativo: rec.id}})
                            storeOperativosVehiculos.load({params: {id_operativo: rec.id}})

                            // para el caso que el operativo se haya finalizado se bloquea ya el borrar o editar
                            if (acceso) {
                                if (rec.get("finalizado")) {
                                    Ext.getCmp('borraroperativo').setDisabled(true);
                                    Ext.getCmp('borraroperativodetalle').setDisabled(true);
                                    Ext.getCmp('addoperativodetalle').setDisabled(true);

                                    Ext.getCmp('borraroperativodetallevehiculo').setDisabled(true);
                                    Ext.getCmp('addoperativodetallevehiculo').setDisabled(true);

                                }
                                else {
                                    Ext.getCmp('borraroperativo').setDisabled(accesosAdministradorOpe ? false : true);
                                    // en caso que se tenga acceso tambien se habilitan o deshabilitan los botones para agregar detalle
                                    Ext.getCmp('borraroperativodetalle').setDisabled(accesosAdministradorOpe ? false : true);
                                    Ext.getCmp('addoperativodetalle').setDisabled(accesosAdministradorOpe ? false : true);

                                    Ext.getCmp('borraroperativodetallevehiculo').setDisabled(accesosAdministradorOpe ? false : true);
                                    Ext.getCmp('addoperativodetallevehiculo').setDisabled(accesosAdministradorOpe ? false : true);


                                    //disabled: !acceso
                                    //disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true

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
        // fin ventana operativos

        // inicio ventana operativos detalle personal
        var proxyOperativosPersonal = new Ext.data.HttpProxy({
            api: {
                create: urlOperativos + "crudOperativosPersonal.php?operation=insert",
                read: urlOperativos + "crudOperativosPersonal.php?operation=select",
                update: urlOperativos + "crudOperativosPersonal.php?operation=update",
                destroy: urlOperativos + "crudOperativosPersonal.php?operation=delete"
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

        var readerOperativosPersonal = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id_member', allowBlank: false},
                {name: 'id_operativo', allowBlank: false},
                {name: 'observaciones', allowBlank: true},
                {name: 'asistencia', type: 'boolean', allowBlank: true}
            ]
        });
        var writerOperativosPersonal = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeOperativosPersonal = new Ext.data.Store({
            id: "id",
            proxy: proxyOperativosPersonal,
            reader: readerOperativosPersonal,
            writer: writerOperativosPersonal,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });

        storeOperativosPersonal = this.storeOperativosPersonal;

        this.gridOperativosPersonal = new Ext.grid.EditorGridPanel({
            id: 'gridOperativosPersonal',

            autoHeight: true,
            autoScroll: true,
            store: this.storeOperativosPersonal,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Personal',
                    dataIndex: 'id_member',
                    sortable: true,
                    width: 30,
                    editor: comboPRD,
                    renderer: personaReceptaDenuncia
                },
                {
                    header: 'Operativo',
                    dataIndex: 'id_operativo',
                    sortable: true,
                    width: 30, hidden: true

                },
                {
                    header: 'Asistencia',
                    dataIndex: 'asistencia',
                    sortable: true,
                    width: 30,
                    editor: {
                        xtype: 'checkbox'
                    }
                    , falseText: 'No'
                    , menuDisabled: true
                    , trueText: 'Si'
                    , xtype: 'booleancolumn'
                },
                {
                    header: 'Observaciones',
                    dataIndex: 'observaciones',
                    sortable: true,
                    width: 60,
                    editor: new Ext.form.TextField({allowBlank: false})
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

        var gridOperativosPersonal = this.gridOperativosPersonal
        // inicio ventana operativos detalle personal

        // inicio ventana operativos detalle vehiculos
        var proxyOperativosVehiculos = new Ext.data.HttpProxy({
            api: {
                create: urlOperativos + "crudOperativosVehiculos.php?operation=insert",
                read: urlOperativos + "crudOperativosVehiculos.php?operation=select",
                update: urlOperativos + "crudOperativosVehiculos.php?operation=update",
                destroy: urlOperativos + "crudOperativosVehiculos.php?operation=delete"
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

        var readerOperativosVehiculos = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id_operativo', allowBlank: false},
                {name: 'conductor', allowBlank: false},
                {name: 'telefono', allowBlank: false},
                {name: 'observaciones', allowBlank: true}
            ]
        });
        var writerOperativosVehiculos = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeOperativosVehiculos = new Ext.data.Store({
            id: "id",
            proxy: proxyOperativosVehiculos,
            reader: readerOperativosVehiculos,
            writer: writerOperativosVehiculos,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });

        storeOperativosVehiculos = this.storeOperativosVehiculos;

        this.gridOperativosVehiculos = new Ext.grid.EditorGridPanel({
            id: 'gridOperativosVehiculos',

            autoHeight: true,
            autoScroll: true,
            store: this.storeOperativosVehiculos,
            columns: [
                {
                    header: 'Operativo',
                    dataIndex: 'id_operativo',
                    sortable: true,
                    width: 30, hidden: true

                },
                {
                    header: 'Conductor',
                    dataIndex: 'conductor',
                    sortable: true,
                    width: 60,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Teléfono',
                    dataIndex: 'telefono',
                    sortable: true,
                    width: 60,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Observaciones',
                    dataIndex: 'observaciones',
                    sortable: true,
                    width: 60,
                    editor: new Ext.form.TextField({allowBlank: false})
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


        });

        var gridOperativosVehiculos = this.gridOperativosVehiculos
        // inicio ventana operativos detalle vehiculos


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
                            key: 'id_zona',
                            scope: this,
                            text: 'Zona'
                        },
                        {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'id_persona_encargada',
                            scope: this,
                            text: 'Persona encargada'
                        },
                        {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'punto_encuentro_planificado',
                            scope: this,
                            text: 'Punto encuentro'
                        },
                        {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'observaciones',
                            scope: this,
                            text: 'Observaciones'
                        }
                    ]
                })
                , text: 'Zona'
            });

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
                                    boxLabel: 'Operativos no finalizados',
                                    id: 'checkNoRecibidos',
                                    name: 'noenviados',
                                    checked: true,
                                    inputValue: '1',
                                    tooltip: 'Recargar datos',
                                    disabled: !acceso,
                                    cls: 'barramenu',
                                    handler: function (checkbox, isChecked) {
                                        // recargamos el combo
                                        storeOperativos.load({params: {finalizados: isChecked}});
                                    }
                                },'-',
                                {
                                    xtype: 'checkbox',
                                    boxLabel: 'Todo personal',
                                    id: 'checkTodoPersonal',
                                    name: 'noenviados',
                                    checked: false,
                                    inputValue: '0',
                                    tooltip: 'Recargar datos',
                                    disabled: !acceso,
                                    cls: 'barramenu',
                                    handler: function (checkbox, isChecked) {
                                        storePRD.load({params: {finalizados: isChecked}});
                                    }
                                },
                                '->'
                                , {
                                    text: 'Buscar por:'
                                    , xtype: 'tbtext'
                                }

                                , searchFieldBtn
                                , ' '
                                , new QoDesk.QoAdmin.SearchField({
                                    paramName: 'filterText'
                                    , store: this.storeOperativos
                                })
                            ],
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
                                                    height: 200,
                                                    items: this.gridOperativosPersonal,
                                                    autoScroll: true,
                                                    tbar: [
                                                        {
                                                            text: 'Nuevo',
                                                            scope: this,
                                                            handler: this.addoperativosPersonal,
                                                            iconCls: 'save-icon',
                                                            disabled: true,
                                                            id: 'addoperativodetalle',
                                                            //disabled: !acceso
                                                        },
                                                        '-',
                                                        {
                                                            text: "Eliminar",
                                                            scope: this,
                                                            handler: this.deleteoperativosPersonal,
                                                            id: 'borraroperativodetalle',
                                                            iconCls: 'delete-icon',
                                                            //disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                                            disabled: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    title: 'Vehículos asignados',
                                                    layout: 'column',
                                                    height: 200,
                                                    items: this.gridOperativosVehiculos,
                                                    autoScroll: true,
                                                    tbar: [
                                                        {
                                                            text: 'Nuevo',
                                                            scope: this,

                                                            handler: this.addVehiculos,
                                                            id: 'addoperativodetallevehiculo',
                                                            iconCls: 'save-icon',
                                                            disabled: true
                                                        },
                                                        '-',
                                                        {
                                                            text: "Eliminar",
                                                            scope: this,
                                                            handler: this.deleteVehiculos,
                                                            id: 'borraroperativodetallevehiculo',
                                                            iconCls: 'delete-icon',
                                                            disabled: true
                                                        }
                                                    ]
                                                }

                                            ]
                                        }

                                    ]
                                }
                            ]
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
                                    //items: this.gridOperativosPersonal
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
            /* forma = Ext.getCmp('formOperativosPersonal');
             forma.getForm().load({
             url: urlOperativos + 'crudOperativos.php?operation=selectForm',
             params: {
             id: operativos
             },
             success: function (response, opts) {
             }
             });
             bloquearLectura(forma, bloqueo);*/
        };


        setTimeout(function () {
            this.storeOperativos.load({
                params: {
                    start: 0,
                    limit: limiteoperativos,
                    finalizados: Ext.getCmp('checkNoRecibidos').getValue()
                }
            });
        }, 300);
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
            fallido: false,
            finalizado: false,
        });
        this.gridOperativos.stopEditing();
        this.storeOperativos.insert(0, operativos);
        this.gridOperativos.startEditing(0, 0);
    },
    requestGridData: function () {
        this.storeOperativos.load({params: {finalizados: Ext.getCmp('checkNoRecibidos').getValue()}});
    },

    deleteoperativosPersonal: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridOperativosPersonal.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeOperativosPersonal.remove(rows);
                }
            }
        });
    },
    addoperativosPersonal: function () {
        var operativos = new this.storeOperativosPersonal.recordType({
            id_persona: '-',
            id_operativo: selectOperativos,
            asistencia: false,
            observaciones: ''
        });
        this.gridOperativosPersonal.stopEditing();
        this.storeOperativosPersonal.insert(0, operativos);
        this.gridOperativosPersonal.startEditing(0, 0);
    },
    requestGridDataPersonal: function () {
        this.storeOperativosPersonal.load();
    },

    deleteVehiculos: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridOperativosVehiculos.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeOperativosVehiculos.remove(rows);
                }
            }
        });
    },
    addVehiculos: function () {
        var vehiculos = new this.storeOperativosVehiculos.recordType({

            id_operativo: selectOperativos,
            conductor: '',
            telefono: '',
            observaciones: ''
        });


        this.gridOperativosVehiculos.stopEditing();
        this.storeOperativosVehiculos.insert(0, vehiculos);
        this.gridOperativosVehiculos.startEditing(0, 0);
    },
    requestGridDataVehiculos: function () {
        this.storeOperativosVehiculos.load();
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
                    var myForm = Ext.getCmp('formOperativosPersonal').getForm();
                    myForm.submit({
                        url: 'modules/desktop/operativos/server/crudOperativos.php?operation=updateForm',
                        method: 'POST',
                        waitMsg: 'Saving data',
                        success: function (form, action) {
                            storeOperativos.load({params: {finalizados: Ext.getCmp('checkNoRecibidos').getValue()}});
                            //Ext.getCmp('tb_grabaroperativos').setDisabled(true);
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