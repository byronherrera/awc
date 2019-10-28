QoDesk.TurnosWindow = Ext.extend(Ext.app.Module, {
    id: 'turnos',
    type: 'desktop/turnos',

    init: function () {
        this.launcher = {
            text: 'Turnos Inspectores',
            iconCls: 'turnos-icon',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function () {
        var accesosAdministradorOpe = this.app.isAllowedTo('accesosAdministradorOpe', this.id);
        var accesosAdministradorIns = this.app.isAllowedTo('accesosAdministradorIns', this.id);
        var accesosTurnos = this.app.isAllowedTo('accesosTurnos', this.id);

       // var fecha_inicio_planificacion;
        var fechaasignada;

        finalizados = true;
        limiteturnos = 100;
        this.selectTurnos = 0;
        selectTurnos = 0;
        // estado no usado
        //var accesosRecepciónIns = this.app.isAllowedTo('accesosRecepciónOpe', this.id);

        //var acceso = (accesosAdministradorOpe || accesosTurnos || accesosRecepciónIns) ? true : false
        var acceso = (accesosAdministradorOpe || accesosTurnos) ? true : false

        var gridBlockTurnos = false;
        var desktop = this.app.getDesktop();
        var AppMsg = new Ext.AppMsg({});

        var win = desktop.getWindow('grid-win-turnos');
        var urlTurnos = "modules/desktop/turnos/server/";

        var textField = new Ext.form.TextField({allowBlank: false});

        function formatDate(value, field) {
            return value ? value.dateFormat('Y-m-d H:i') : '';
        }


// inicio combos secretaria

        //inicio combo tipo documento  OPTID
        storeOPTID = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=ordenanzas'
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

        var comboOPTIDSimple = new Ext.form.ComboBox({
            id: 'comboOPNICO',
            store: storeOPTID,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function turnosTipoTurnosSimple(id) {
            var index = storeOPTID.findExact('id', id);
            if (index > -1) {
                var record = storeOPTID.getAt(index);
                return record.get('nombre');
            }
        }


        var comboOPTIDSimple2 = new Ext.form.ComboBox({
            id: 'comboOPNICO',
            store: storeOPTID,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function turnosTipoTurnosSimple2(id) {
            var index = storeOPTID.findExact('id', id);
            if (index > -1) {
                var record = storeOPTID.getAt(index);
                return record.get('nombre');
            }
        }


        function turnosTipoTurnos(id) {
            if (id === '') return '';
            var nombres = id.split(",");
            retorno = '';
            for (var i = 0; i < nombres.length; i++) {
                index = storeOPTID.findExact('id', nombres[i]);
                var record = storeOPTID.getAt(index);
                if (typeof record !== 'undefined') {
                    retorno = record.data.nombre + ',' + retorno
                }
            }
            return retorno
        }

        //fin combo tipo documento  OPTID
        //inicio combo tipo MEDIDA operativo
        storeOPINFOMEDIDA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=tiposMedidasTurnos'
        });

        var comboOPINFOMEDIDA = new Ext.form.ComboBox({
            id: 'comboOPINFOMEDIDA',
            store: storeOPINFOMEDIDA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function turnosTipoMedida(id) {
            var index = storeOPINFOMEDIDA.findExact('id', id);
            if (index > -1) {
                var record = storeOPINFOMEDIDA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo nivel MEDIDA OPERATIVO

        //inicio combo tipo TIPO ACCION operativo
        storeOPTIPOACC = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=tiposAccioTurnos'
        });

        var comboOPTIPOACC = new Ext.form.ComboBox({
            id: 'comboOPTIPOACC',
            store: storeOPTIPOACC,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function turnosTipoAccion(id) {
            var index = storeOPTIPOACC.findExact('id', id);
            if (index > -1) {
                var record = storeOPTIPOACC.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo tipo TIPO ACCION operativo


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

        function turnosDespachadoActivo(id) {
            var index = storeOPOFAC.findExact('id', id);
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

        function turnosNivelComplejidad(id) {
            var index = storeOPNICO.findExact('id', id);
            if (index > -1) {
                var record = storeOPNICO.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo nivel complejidad

        //inicio combo tipo operativo
        storeOPTIPO = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=tiposturnos'
        });

        var comboOPTIPO = new Ext.form.ComboBox({
            id: 'comboOPTIPO',
            store: storeOPTIPO,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function turnosTipo(id) {
            var index = storeOPTIPO.findExact('id', id);
            if (index > -1) {
                var record = storeOPTIPO.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo nivel complejidad

        //inicio combo tipo operativo
        storeOPENTT = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=tiposentidades'
        });

        var comboOPENTT = new Ext.form.ComboBox({
            id: 'comboOPENTT',
            store: storeOPENTT,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function entidadesTipo(id) {
            var index = storeOPENTT.findExact('id', id);
            if (index > -1) {
                var record = storeOPENTT.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo nivel complejidad

        //inicio combo Unidades
        storeOPREA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre', 'orden'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=unidadessinfiltro',
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

        function turnosUnidades(id) {
            var index = storeOPREA.findExact('id', id);
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
            var index = storeOPREATOT.findExact('id', id);
            var record = storeOPREATOT.getAt(index);
            return record.get('nombre');
        }

        //fin combo reasignacion OPREATOT
        //inicio combo turnos estado
        storeOPESTA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=turnosestados'
        });

        var comboOPESTA = new Ext.form.ComboBox({
            id: 'comboOPESTA',
            store: storeOPESTA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function turnosEstados(id) {
            var index = storeOPESTA.findExact('id', id);
            if (index > -1) {
                var record = storeOPESTA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo turnos estado
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
            var index = storeOPREAGUIA.findExact('id', id);
            var record = storeOPREAGUIA.getAt(index);
            return record.get('nombre');
        }

        //fin combo reasignacion OPREAGUIA

        //inicio combo tipo documento  OPPERENC
        storeOPPERENC = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalturnos',
            baseParams: {
                accesosAdministradorOpe: accesosAdministradorOpe,
                accesosTurnos: accesosTurnos,
                acceso: acceso
            }
        });

        var comboOPPERENC = new Ext.ux.form.CheckboxCombo({
            width: 250,
            mode: 'local',
            store: storeOPPERENC,
            valueField: 'id',
            displayField: 'nombre',
            allowBlank: false,
            listeners: {
                'change': function (cmb, arr) {
                }
            }
        });

        function turnosPersonalEncargado(id) {

            if (id === '') return ' ';
            if (id === null) return ' ';
            var nombres = id.split(",");
            retorno = '';

            for (var i = 0; i < nombres.length; i++) {
                index = storeOPPERENC.findExact('id', nombres[i]);
                var record = storeOPPERENC.getAt(index);
                if (typeof record !== 'undefined') {
                    retorno = record.data.nombre + ',' + retorno
                }
            }
            return retorno
        }

        //fin combo tipo documento  OPPERENC


        //inicio combo persona recepta la turnos PRD
        storePRD = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalturnos',
            baseParams: {
                todos: 'true',
                accesosAdministradorOpe: accesosAdministradorOpe,
                accesosTurnos: accesosTurnos,
                acceso: acceso
            }

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

        function personaTurno(id) {
            var index = storePRD.findExact('id', id);
            if (index > -1) {
                var record = storePRD.getAt(index);
                return record.get('nombre');
            }
        }

        storePRD2 = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalturnos',
            baseParams: {
                todos: 'true',
                accesosAdministradorOpe: true,
                accesosTurnos: false,
                acceso: acceso
            }

        });

        var comboPRD2 = new Ext.form.ComboBox({
            id: 'comboPRD2',
            store: storePRD2,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            //forceSelection: true,
            allowBlank: true
        });

        function personaTurno2(id) {
            //var index = storePRD2.findExact('id', id);
            var index = storePRD2.findExact('id', id);
            if (index > -1) {
                var record = storePRD2.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo persona recepta la turnos PRD

// fin combos secretaria

// inicio combos turnos

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
            var index = storeZONA.findExact('id', id);
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
            url: 'modules/common/combos/combos.php?tipo=depTurnos'
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
            var index = storeACTA.findExact('id', id);
            if (index > -1) {
                var record = storeACTA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo actividad  ACTA
        storeSINO = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 'false', "nombre": "NO"},
                    {"id": 'true', "nombre": "SI"}
                ]
            }
        });
        //inicio combo Estado Recepcion Información Turnos ESOPREA
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
            var index = storeESOPREA.findExact('id', id);
            if (index > -1) {
                var record = storeESOPREA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo Estado Recepcion Información Turnos ESOPREA

        //inicio combo estado retiros operativo ESREOP
        storeESREOP = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": "Perecible", "nombre": "Perecible"},
                    {"id": "No perecible", "nombre": "No perecible"},
                    {"id": "Vehículos", "nombre": "Vehículos"},
                    {"id": "Otros", "nombre": "Otros"}
                ]
            }
        });

        var comboESREOP = new Ext.form.ComboBox({
            id: 'comboESREOP',
            store: storeESREOP,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function estadoRetirosAdm(id) {
            return id;
        }

        //fin combo Estado Recepcion Información Turnos ESREOP

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
            var index = storePRSA.findExact('id', id);
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
            url: 'modules/common/combos/combos.php?tipo=personalturnos'
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
            var index = storePRASA.findExact('id', id);
            if (index > -1) {
                var record = storePRASA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo caracter del tramite PRASA
// inicio combos turnos

// inicio pestañas de mantenimiento


// fin pestañas de mantenimiento

        // inicio ventana turnos
        var proxyTurnos = new Ext.data.HttpProxy({
            api: {
                create: urlTurnos + "crudTurnos.php?operation=insert",
                read: urlTurnos + "crudTurnos.php?operation=select",
                update: urlTurnos + "crudTurnos.php?operation=update",
                destroy: urlTurnos + "crudTurnos.php?operation=delete"
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

        var readerTurnos = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: false},
                {name: 'id_persona', allowBlank: false},
                {name: 'email', allowBlank: true},
                {name: 'cedula', allowBlank: true},
                {name: 'nombre', allowBlank: true},
                {name: 'apellido', allowBlank: true},
                {name: 'telefono1', allowBlank: true},
                {name: 'expediente', allowBlank: true},
                {name: 'inspector', allowBlank: true},
                {name: 'comentarios', allowBlank: true},
                {name: 'motivonegar', allowBlank: true},
                {name: 'motivonegar', allowBlank: true},
                {name: 'resultados', allowBlank: true},
                {name: 'id_atendido', allowBlank: true},
                {name: 'id_inspector', allowBlank: true},
                {name: 'resultados', allowBlank: true},

                {name: 'fecha', type: 'date', dateFormat: 'c', allowBlank: false},
                {name: 'fechaatendido', type: 'date', dateFormat: 'c', allowBlank: false},
                {name: 'fechaasignada', type: 'date', dateFormat: 'c', allowBlank: false},

                {name: 'estado', allowBlank: false},
                {name: 'visible', type: 'boolean', allowBlank: true},
                {name: 'mail_enviado', allowBlank: true}
            ]
        });
        var writerTurnos = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        this.storeTurnos = new Ext.data.Store({
            id: "id",
            proxy: proxyTurnos,
            reader: readerTurnos,
            writer: writerTurnos,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            baseParams: {//limit: limiteturnos,
                finalizados: finalizados,
                accesosAdministradorOpe: accesosAdministradorOpe,
                accesosAdministradorIns: accesosAdministradorIns,
                accesosTurnos: accesosTurnos,
                acceso: acceso
            }
        });
        storeTurnos = this.storeTurnos;

        this.gridTurnos = new Ext.grid.EditorGridPanel({
            height: desktop.getWinHeight() - 380,
            store: this.storeTurnos,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Código',
                    dataIndex: 'id',
                    sortable: true,
                    width: 45
                },
                {
                    header: 'Enviado',
                    dataIndex: 'mail_enviado',
                    sortable: true,
                    width: 50
                },
                {
                    header: 'Estado',
                    dataIndex: 'estado',
                    sortable: true,
                    width: 100,
                    editor: comboOPESTA,
                    renderer: turnosEstados
                },
            /*    {
                    header: 'Fecha inicio',
                    dataIndex: 'fecha_inicio_planificacion',
                    sortable: true,
                    width: 100,
                    renderer: formatDate,
                    editor: new Ext.ux.form.DateTimeField({
                        dateFormat: 'Y-m-d',
                        timeFormat: 'H:i',
                        listeners: {
                            change: function (field, val, valOld) {
                                //fecha inicial debe ser mayor que la final
                                if (val > fechaasignada)
                                //AppMsg.setAlert("Alerta ", 'Fecha inicial no  debe ser mayor que fecha final');
                                    fecha_inicio_planificacion = val
                                //fecha inicial no debe ser mayor de 12 horas
                                var diff = Math.abs(fechaasignada - fecha_inicio_planificacion) / 3600000;
                                if (diff > 12)
                                    AppMsg.setAlert("Alerta ", 'Fecha final supera las 12 horas de operativo, están ' + parseFloat(diff).toFixed(1) + " horas");
                                else
                                    AppMsg.setAlert("Observación ", 'Están ' + parseFloat(diff).toFixed(1) + " horas de operativo");
                                // alerta fecha menor a la actual
                                fecha_actual = new Date();
                                if (val < fecha_actual) {
                                    //AppMsg.setAlert("Observación ", 'La fecha del operativo anterior a la fecha actual');
                                }
                            }
                        }
                    })
                },*/
                {
                    header: 'Fecha Turno',
                    dataIndex: 'fechaasignada',
                    sortable: true,
                    width: 100,
                    renderer: formatDate,
                   /* editor: new Ext.ux.form.DateTimeField({
                        dateFormat: 'Y-m-d',
                        timeFormat: 'H:i',
                        listeners: {
                            change: function (field, val, valOld) {
                                // //fecha inicial debe ser mayor que la final
                                // if (val < fecha_inicio_planificacion)
                                //     AppMsg.setAlert("Alerta ", 'Fecha final debe ser mayor que fecha inicial');
                                // fechaasignada = val
                                // //fecha inicial no debe ser mayor de 12 horas
                                // var diff = Math.abs(fechaasignada - fecha_inicio_planificacion) / 3600000;
                                // if (diff > 12)
                                //     AppMsg.setAlert("Alerta ", 'Fecha final supera las 12 horas de operativo, están ' + parseFloat(diff).toFixed(1) + " horas");
                                // else
                                //     AppMsg.setAlert("Observación ", 'Están ' + parseFloat(diff).toFixed(1) + " horas de operativo");
                                // // alerta fecha menor a la actual
                                // fecha_actual = new Date();
                                // if (val < fecha_actual) {
                                //     AppMsg.setAlert("Observación ", 'La fecha del operativo anterior a la fecha actual');
                                // }
                            }
                        }
                    })*/
                },
                {
                    header: 'Zonal',
                    dataIndex: 'id_zonal',
                    sortable: true,
                    width: 100,
                    editor: comboZONA, renderer: zonaAdm
                },
                {
                    header: 'Responsable',
                    dataIndex: 'id_inspector',
                    sortable: true,
                    width: 190,
                    editor: comboPRD,
                    renderer: personaTurno,

                    id: 'id_persona_encargada'
                },
                {
                    header: 'Lugar intervención',
                    dataIndex: 'zona',
                    sortable: true,
                    width: 160,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Elaborado',
                    dataIndex: 'id_persona',
                    sortable: true,
                    width: 100,
                    hidden: true,
                    //editor: comboPRD,
                    renderer: personaTurno2
                },
                {
                    header: 'Fecha elaboracion',
                    dataIndex: 'fecha_planificacion',
                    sortable: true,
                    width: 100, hidden: true,
                    renderer: formatDate,
                    editor: new Ext.ux.form.DateTimeField({
                        dateFormat: 'Y-m-d',
                        timeFormat: 'H:i'
                    })
                },
                {
                    header: 'Fecha Real Fin',
                    dataIndex: 'fecha_real_fin',
                    sortable: true,
                    width: 100, hidden: true,
                    renderer: formatDate,
                    editor: new Ext.ux.form.DateTimeField({
                        dateFormat: 'Y-m-d',
                        timeFormat: 'H:i'
                    })
                }
            ],
            viewConfig: {
                forceFit: false,
                getRowClass: function (record, index) {
                    // validamos la fecha
                    fechaActual = new Date();
                    fechaasignada = record.get('fechaasignada')

                    var diasDif = fechaActual.getTime() - fechaasignada.getTime();
                    var horas = Math.round(diasDif / (1000 * 60 * 60));

                    if ((record.get('estado') == 1) && (horas > 0) && (horas < 10)) {
                        return 'bluestate';
                    }

                    if ((record.get('estado') == 1) && (horas > 86)) {
                        return 'redstate';
                    }

                    // registros que estan en planificacion
                    if (record.get('estado') == 1) {
                        return 'gold';
                    }
                    // registros que ya estan realizados
                    if (record.get('estado') == 4) {
                        return 'bluestate';
                    }
                }
            },

            sm: new Ext.grid.RowSelectionModel(
                {
                    singleSelect: true,
                    listeners: {
                        rowselect: function (sm, row, rec) {
                            fecha_inicio_planificacion = rec.get('fecha_inicio_planificacion')
                            fechaasignada = rec.get('fechaasignada');

                            // recuperamos la informacion de personal asignado a ese operativo
                            selectTurnos = rec.id;

                            // para el caso que el operativo se haya finalizado se bloquea ya el borrar o editar
                            if (acceso) {
                                if (rec.get("estado") != 1) {
                                    Ext.getCmp('detalleTurnosTab').setDisabled(acceso ? false : true);
                                }
                                else {
                                    Ext.getCmp('detalleTurnosTab').setDisabled(true);
                                }
                                cargaDetalle(rec.id);

                                if ((rec.get("estado") == 1) || (rec.get("estado") == 4)) {
                                    gridBlockTurnos = false;
                                    Ext.getCmp('savedetalleoperativo').setDisabled(false);

                                    //Ext.getCmp('borraroperativo').setDisabled(accesosAdministradorOpe ? false : true);
                                    //Ext.getCmp('addturnos').setDisabled(accesosAdministradorOpe ? false : true);

                                    //Ext.getCmp('borraroperativoparticipantes').setDisabled(false);
                                    //Ext.getCmp('addoperativoparticipantes').setDisabled(false);
                                    // en caso que se tenga acceso tambien se habilitan o deshabilitan los botones para agregar detalle
                                    // valido si es el caso operativo tipo Permanentes Zonales


                                    if (rec.get("tipo_operativo") == 2) {
                                      //  Ext.getCmp('borraroperativodetalle').setDisabled(false);
                                        //  Ext.getCmp('addoperativodetalle').setDisabled(false);
                                        //Ext.getCmp('borraroperativoparticipantes').setDisabled(false);
                                        // Ext.getCmp('addoperativoparticipantes').setDisabled(false);
                                    } else {
                                        //  Ext.getCmp('borraroperativodetalle').setDisabled(accesosAdministradorOpe ? false : true);
                                        //  Ext.getCmp('addoperativodetalle').setDisabled(accesosAdministradorOpe ? false : true);
                                    }

                                    // Ext.getCmp('borraroperativodetalleacciones').setDisabled(false);
                                    //Ext.getCmp('addoperativodetalleacciones').setDisabled(false);

                                    //Ext.getCmp('borraroperativodetalleInforme').setDisabled(false);
                                    //Ext.getCmp('addoperativodetalleInforme').setDisabled(false);

                                    // Ext.getCmp('borraroperativoimagenes').setDisabled(false);

                                    // Ext.getCmp('addoperativoimagenes').setDisabled(false);
                                    //Ext.getCmp('subirimagen').setDisabled(false);
                                    // solamente para el caso
                                }
                                else {

                                    // caso que el operativo sea tipo 2, 3, 5 ( cumplido, fallido, cancelado
                                    gridBlockTurnos = true;
                                    Ext.getCmp('savedetalleoperativo').setDisabled(true);

                                    //  Ext.getCmp('borraroperativo').setDisabled(true);
                                    // Ext.getCmp('addturnos').setDisabled(true);

                                    //  Ext.getCmp('borraroperativodetalle').setDisabled(true);
                                    //  Ext.getCmp('addoperativodetalle').setDisabled(true);

                                    ///  Ext.getCmp('borraroperativoparticipantes').setDisabled(true);
                                    // Ext.getCmp('addoperativoparticipantes').setDisabled(true);

                                    // Ext.getCmp('borraroperativodetalleacciones').setDisabled(true);
                                    // Ext.getCmp('addoperativodetalleacciones').setDisabled(true);

                                    // Ext.getCmp('borraroperativodetalleInforme').setDisabled(true);
                                    //   Ext.getCmp('addoperativodetalleInforme').setDisabled(true);

                                    // Ext.getCmp('borraroperativoimagenes').setDisabled(true);
                                    // Ext.getCmp('addoperativoimagenes').setDisabled(true);
                                    // Ext.getCmp('subirimagen').setDisabled(true);

                                }


                                //para el caso que se es administrador
                                if (accesosAdministradorOpe) {
                                    Ext.getCmp('savedetalleoperativo').setDisabled(false);
                                }
                            }
                            //para el caso  de los botones
                            if ((rec.get("estado") == 2) || (rec.get("estado") == 3) || (rec.get("estado") == 5)) {
                                Ext.getCmp('tb_repoteTurnos').setDisabled(false);
                            } else {
                                Ext.getCmp('tb_repoteTurnos').setDisabled(true);
                            }
                            //console.log (accesosAdministradorOpe);
                            //console.log (rec.get("estado"));
                        }
                    }
                }
            ),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: limiteturnos,
                store: storeTurnos,
                displayInfo: true,
                displayMsg: 'Mostrando turnos {0} - {1} de {2} - AMC',
                emptyMsg: "No existen turnos que mostrar"
            }),

            listeners: {
                beforeedit: function (e) {
                    // si el operativo esta identificado como estado o planificado (1) o informe (4) se peude editar
                    if (acceso) {
                        // si el que edita es administrador de turnos puede cambiar
                        if (accesosAdministradorOpe) {
                            return true;
                        }

                        // si es usuario normal solo puede editar cuado este en estado editable
                        if ((e.record.get("estado") == 1) || (e.record.get("estado") == 4)) {
                            return true;
                        }
                        return false;
                    } else {
                        return false;
                    }
                }
            }
        });
        // fin ventana turnos


        var detalleOperativo = new Ext.FormPanel({
            id: 'formaDetalleOperativo',
            frame: true,
            bodyStyle: 'padding:0',
            width: '100%',
            items: [{
                layout: 'column',
                items: [{
                    xtype: 'hidden',
                    fieldLabel: 'Id',
                    name: 'id'
                }, {
                    columnWidth: .5,
                    layout: 'form',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Parroquias Intervenidas',
                        name: 'parroquias',
                        id: 'parroquias',
                        anchor: '95%'
                    }]
                }, {
                    columnWidth: .5,
                    layout: 'form',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Barrios Intervenidos',
                        name: 'barrios',
                        id: 'barrios',
                        anchor: '95%'
                    }]
                }]
            }, {
                xtype: 'textarea',
                id: 'detalle',
                fieldLabel: 'Resumen Operativo',
                height: 145,
                anchor: '98%',
                name: 'detalle'
            }],
            defaults: {
                listeners: {
                    change: function (field, newVal, oldVal) {
                        var myForm = Ext.getCmp('formaDetalleOperativo').getForm();
                        myForm.submit({
                            url: 'modules/desktop/turnos/server/crudTurnos.php?operation=updateForm',
                            method: 'POST',
                            success: function (form, action) {
                            }
                        });
                    }
                },
            }


        });


        // datastore and datagrid in Guia
        this.storeDocumentosReporte = new Ext.data.Store({
            id: "id",
            proxy: proxyTurnos,
            reader: readerTurnos,
            writer: writerTurnos,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            baseParams: {//limit: limiteturnos,
                accesosAdministradorOpe: accesosAdministradorOpe,
                accesosAdministradorIns: accesosAdministradorIns,
                accesosTurnos: accesosTurnos

            }
        });

        storeDocumentosReporte = this.storeDocumentosReporte
        this.gridDocumentosReporte = new Ext.grid.EditorGridPanel({

            height: desktop.getWinHeight() - 268,
            autoScroll: true,
            store: this.storeDocumentosReporte,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Código',
                    dataIndex: 'id',
                    sortable: true,
                    width: 17
                },
                // {
                //     header: 'Fecha inicio',
                //     dataIndex: 'fecha_inicio_planificacion',
                //     sortable: true,
                //     width: 37,
                //     renderer: formatDate
                // },
                {
                    header: 'Fecha Fin',
                    dataIndex: 'fechaasignada',
                    sortable: true,
                    width: 37,
                    renderer: formatDate
                },
                {
                    header: 'Tipo de control',
                    dataIndex: 'id_tipo_control',
                    sortable: true,
                    width: 45,
                    renderer: turnosTipoTurnos
                },
                {
                    header: 'Estado',
                    dataIndex: 'estado',
                    sortable: true,
                    width: 45,
                    renderer: turnosEstados
                },
                {
                    header: 'Complejidad',
                    dataIndex: 'id_nivel_complejidad',
                    sortable: true,
                    width: 30,
                    renderer: turnosNivelComplejidad
                },
                {
                    header: 'Zonal',
                    dataIndex: 'id_zonal',
                    sortable: true,
                    width: 40,
                    renderer: zonaAdm
                },
                {
                    header: 'Responsable',
                    dataIndex: 'id_persona_encargada',
                    sortable: true,
                    width: 40,
                    renderer: personaTurno
                },
                /*                {
                 header: 'Participantes',
                 dataIndex: 'participantes',
                 sortable: true,
                 width: 55
                 },*/
                {
                    header: 'Punto Encuentro',
                    dataIndex: 'punto_encuentro_planificado',
                    sortable: true,
                    width: 55
                },
                {
                    header: 'Lugar intervención ',
                    dataIndex: 'zona',
                    sortable: true,
                    width: 55
                },
                {
                    header: 'Observaciones',
                    dataIndex: 'observaciones',
                    sortable: true,
                    width: 60
                },
                {
                    header: 'Trámite',
                    dataIndex: 'tramite',
                    sortable: true,
                    width: 30
                },
                {
                    header: 'Elaborado',
                    dataIndex: 'id_persona',
                    sortable: true,
                    width: 30,
                    hidden: true,
                    renderer: personaTurno2()
                },
                {
                    header: 'Fecha elaboracion',
                    dataIndex: 'fecha_planificacion',
                    sortable: true,
                    width: 45, hidden: true,
                    renderer: formatDate
                },
                {
                    header: 'Tipo'
                    , dataIndex: 'tipo_operativo'
                    , align: 'center'
                    , sortable: true
                    , width: 30
                    //,hidden: true
                    , renderer: turnosTipo
                },
                /* {
                 header: 'Fallido'
                 , dataIndex: 'fallido'
                 , align: 'center'
                 , falseText: 'No'
                 , menuDisabled: true
                 , trueText: 'Si'
                 , sortable: true
                 , width: 25
                 , xtype: 'booleancolumn'
                 },*/
                /*{
                 header: 'Finalizado'
                 , dataIndex: 'finalizado'
                 , align: 'center'
                 , falseText: 'No'
                 , menuDisabled: true
                 , trueText: 'Si'
                 , sortable: true
                 , width: 25
                 , xtype: 'booleancolumn'
                 }*/
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
                displayMsg: 'Mostrando turnos {0} - {1} de {2}  >>',
                emptyMsg: "No existen turnos que mostrar"
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
                                fieldLabel: 'Tipo control',
                                id: 'busqueda_tipo_control',
                                name: 'busqueda_tipo_control',
                                hiddenName: 'busqueda_tipo_control',

                                anchor: '95%',
                                store: storeOPTID,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Nivel Complejidad',
                                id: 'busqueda_nivel_complejidad',
                                name: 'busqueda_nivel_complejidad',
                                hiddenName: 'busqueda_nivel_complejidad',

                                anchor: '95%',
                                store: storeOPNICO,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Responsable',
                                id: 'busqueda_persona_encargada',
                                name: 'busqueda_persona_encargada',
                                hiddenName: 'busqueda_persona_encargada',

                                anchor: '95%',
                                store: storePRD,
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
                                fieldLabel: 'Zonal',
                                id: 'busqueda_zonal',
                                name: 'busqueda_zonal',
                                hiddenName: 'busqueda_zonal',

                                anchor: '95%',
                                store: storeZONA,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Unidad',
                                id: 'busqueda_unidad_asignado',
                                name: 'busqueda_unidad_asignado',
                                hiddenName: 'busqueda_unidad_asignado',

                                anchor: '95%',
                                store: storeOPREA,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Oper. Tipo',
                                id: 'busqueda_tipo_operativo',
                                name: 'busqueda_tipo_operativo',
                                hiddenName: 'busqueda_tipo_operativo',

                                anchor: '95%',
                                store: storeOPTIPO,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Estado',

                                id: 'busqueda_estado',
                                name: 'busqueda_estado',
                                hiddenName: 'busqueda_estado',


                                anchor: '95%',
                                store: storeOPESTA,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },

                            {
                                xtype: 'combo',
                                fieldLabel: 'Func.operante',
                                id: 'busqueda_personal_asignado',
                                name: 'busqueda_personal_asignado',
                                hiddenName: 'busqueda_personal_asignado',

                                anchor: '95%',
                                store: storePRD,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            }
                            /*{
                             xtype: 'combo',
                             fieldLabel: 'Oper. Finalizado',
                             id: 'busqueda_finalizado',
                             name: 'busqueda_finalizado',
                             hiddenName: 'busqueda_finalizado',
                             anchor: '95%',
                             store: storeSINO,
                             valueField: 'id',
                             displayField: 'nombre',
                             typeAhead: true,
                             triggerAction: 'all',
                             mode: 'local'
                             },*/

                        ]
                    },
                    {
                        columnWidth: 1 / 3,
                        layout: 'form',
                        items: [

                            {
                                xtype: 'textfield',
                                fieldLabel: 'Informe',
                                id: 'busqueda_informe',
                                name: 'busqueda_informe',
                                anchor: '95%'
                            },
                            /*{   xtype: 'textfield',
                             fieldLabel: 'Punto Encuentro',
                             id: 'busqueda_punto_encuentro',
                             name: 'busqueda_punto_encuentro',
                             anchor: '95%'
                             },*/
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Palabra clave',
                                id: 'busqueda_observaciones',
                                name: 'busqueda_observaciones',
                                anchor: '95%'
                            },

                            {
                                xtype: 'combo',
                                fieldLabel: 'Elaborado por',
                                id: 'busqueda_elaborado_por',
                                name: 'busqueda_elaborado_por',
                                hiddenName: 'busqueda_elaborado_por',

                                anchor: '95%',
                                store: storePRD,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },

                            {
                                xtype: 'combo',
                                fieldLabel: 'Revisado por',
                                id: 'busqueda_revisado_por',
                                name: 'busqueda_revisado_por',
                                hiddenName: 'busqueda_revisado_por',

                                anchor: '95%',
                                store: storePRD,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Aprobado por',
                                id: 'busqueda_aprobado_por',
                                name: 'busqueda_aprobado_por',
                                hiddenName: 'busqueda_aprobado_por',

                                anchor: '95%',
                                store: storePRD,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            }]
                    }
                ]
            });


            var checkHandler = function (item, checked) {
                if (checked) {
                    var store = this.storeTurnos;
                    store.baseParams.filterField = item.key;
                    searchFieldBtn.setText(item.text);
                }
            };

            var targetHandler = function (item, checked) {
                if (checked) {
                    //var store = this.storeTurnos;
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
                            key: 'id',
                            scope: this,
                            text: 'Código'
                        },
                        {
                            checked: true,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'id_zonal',
                            scope: this,
                            text: 'Zona'
                        },
                        {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'id_persona_encargada',
                            scope: this,
                            text: 'Responsable'
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
                , text: 'Código'
            });

            win = desktop.createWindow({
                id: 'grid-win-turnos',
                title: 'Turnos Inspectores - Gestión Turnos',
                width: winWidth,
                height: winHeight,
                iconCls: 'turnos-icon',
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
                            title: 'Planificación turnos',
                            closable: true,
                            tbar: [
                                /* {
                                     text: 'Nuevo',
                                     scope: this,
                                     handler: this.addturnos,
                                     iconCls: 'save-icon',
                                     id: 'addturnos',
                                     disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                 },
                                 '-',
                                 {
                                     text: "Eliminar",
                                     scope: this,
                                     handler: this.deleteturnos,
                                     id: 'borraroperativo',
                                     iconCls: 'delete-icon',
                                     disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                     //disabled: true
                                 },
                                 '-',*/
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
                                    boxLabel: 'Turnos no finalizados',
                                    id: 'checkNoRecibidos',
                                    name: 'noenviados',
                                    checked: true,
                                    inputValue: '1',
                                    tooltip: 'Recargar datos',
                                    //disabled: !acceso,
                                    cls: 'barramenu',
                                    handler: function (checkbox, isChecked) {
                                        storeTurnos.baseParams.finalizados = isChecked;
                                        storeTurnos.load();
                                    }
                                }, '-',
                                {
                                    id: 'tb_repoteTurnos',
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarReporteOperativo,
                                    scope: this,
                                    text: 'Generar Reporte',
                                    tooltip: 'Se genera el reporte de los operativo',
                                    disabled: true
                                },
                                /*'-',
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
                                 storePRD.load({params: {todos: isChecked}});
                                 }
                                 },*/
                                '->'
                                , {
                                    text: 'Buscar por:'
                                    , xtype: 'tbtext'
                                }

                                , searchFieldBtn
                                , ' '
                                , new QoDesk.QoAdmin.SearchField({
                                    paramName: 'filterText'
                                    , store: this.storeTurnos
                                })
                            ],
                            items: [
                                {
                                    id: 'formcabeceraturnos',
                                    items: this.gridTurnos,
                                    titleCollapse: true,
                                    split: true,
                                    flex: 1,
                                    autoScroll: true,
                                    layout: 'column'
                                },
                                {
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
                                                    title: 'Resumen Actividades realizadas',
                                                    layout: 'column',
                                                    id: 'detalleTurnosTab',
                                                    height: 250,
                                                    items: detalleOperativo,
                                                    disabled: true,
                                                    autoScroll: true,
                                                    tbar: [
                                                        {
                                                            text: 'Grabar',
                                                            scope: this,
                                                            handler: this.updateTurno,
                                                            iconCls: 'save-icon',
                                                            disabled: true,
                                                            id: 'savedetalleoperativo',
                                                            //disabled: !acceso
                                                        },
                                                        {
                                                            text: 'Ingresar el detalle de las acciones realizadas, retiros y actas en la pestaña respectiva.'
                                                            , xtype: 'tbtext'
                                                        }
                                                    ]
                                                }

                                            ]
                                        }

                                    ]
                                }
                            ]
                        },
                        {
                            title: 'Reportes',
                            closable: true,
                            layout: 'border',
                            //disabled: this.app.isAllowedTo('accesosTurnos', this.id) ? false : true,
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
                                    xtype: 'checkbox',
                                    boxLabel: 'Detalle acciones',
                                    id: 'checkDetalleAcciones',
                                    name: 'detalleacciones',
                                    checked: false,
                                    inputValue: '1',
                                    tooltip: 'Detalle de las acciones efectuados en el reporte',
                                    cls: 'barramenu',
                                    handler: function (checkbox, isChecked) {
                                    }
                                }, {
                                    xtype: 'checkbox',
                                    boxLabel: 'Detalle actas',
                                    id: 'checkDetalleActas',
                                    name: 'detalleactas',
                                    checked: false,
                                    inputValue: '1',
                                    tooltip: 'Detalle de las actas efectuados en el reporte',
                                    cls: 'barramenu',
                                    handler: function (checkbox, isChecked) {
                                    }
                                }, {
                                    xtype: 'checkbox',
                                    boxLabel: 'Detalle retiros',
                                    id: 'checkDetalleRecibidos',
                                    name: 'detalleretiros',
                                    checked: false,
                                    inputValue: '1',
                                    tooltip: 'Detalle de los retiros efectuados en el reporte',
                                    cls: 'barramenu',
                                    handler: function (checkbox, isChecked) {
                                    }
                                }, {
                                    xtype: 'checkbox',
                                    boxLabel: 'Totales personal',
                                    id: 'checkTotalesPersonal',
                                    name: 'totalespersonal',
                                    checked: false,
                                    inputValue: '1',
                                    tooltip: 'Detalle de los retiros efectuados en el reporte',
                                    cls: 'barramenu',
                                    handler: function (checkbox, isChecked) {
                                    }
                                }, '-',

                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarDocumentoReporte,
                                    scope: this,
                                    text: 'Exportar listado',
                                    tooltip: 'Se genera archivo Excel con la información solicitada'
                                }
                            ],
                            items: [
                                {
                                    region: 'north',
                                    height: 175,
                                    minSize: 100,
                                    maxSize: 170,
                                    closable: true,
                                    autoScroll: false,
                                    items: this.formConsultaDocumentos
                                },
                                {
                                    // lazily created panel (xtype:'panel' is default)
                                    region: 'center',
                                    split: true,
                                    autoScroll: true,
                                    height: 270,
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

        function cargaDetalle(turnos) {
            //forma = Ext.getCmp('formaDetalleOperativo');
            detalleOperativo.getForm().load({
                url: urlTurnos + 'crudTurnos.php?operation=selectForm',
                params: {
                    id: turnos
                }
            });
        };

        setTimeout(function () {
            this.storeTurnos.load({
                params: {
                    start: 0,
                    limit: limiteturnos,
                    finalizados: Ext.getCmp('checkNoRecibidos').getValue(),
                    accesosAdministradorOpe: accesosAdministradorOpe,
                    accesosTurnos: accesosTurnos
                }
            });
        }, 1800);
    },
    /*    deleteturnos: function () {
            Ext.Msg.show({
                title: 'Confirmación',
                msg: 'Está seguro de querer borrar?',
                scope: this,
                buttons: Ext.Msg.YESNO,
                fn: function (btn) {
                    if (btn == 'yes') {
                        var rows = this.gridTurnos.getSelectionModel().getSelections();
                        if (rows.length === 0) {
                            return false;
                        }
                        this.storeTurnos.remove(rows);
                    }
                }
            });
        },
        addturnos: function () {
            var turnos = new this.storeTurnos.recordType({
                id_persona: '-',
                estado: '1',
                id: ' ',
                visible: '',
                fecha_planificacion: (new Date()),
                fechaasignada: (new Date()),
                id_tipo_control: '',
                id_nivel_complejidad: ' ',
                observaciones: ' ',
                punto_encuentro_planificado: ' ',
                id_zonal: ' ',
                tipo_operativo: '2',
                id_persona_encargada: ' ',
                mail_enviado: 0
            });
            this.gridTurnos.stopEditing();
            this.storeTurnos.insert(0, turnos);
            this.gridTurnos.startEditing(0, 0);
        },*/
    requestGridData: function () {
        this.storeTurnos.load();
    },

    updateTurno: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Desea Guardar los cambios.<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var myForm = Ext.getCmp('formaDetalleOperativo').getForm();
                    myForm.submit({
                        url: 'modules/desktop/turnos/server/crudTurnos.php?operation=updateForm',
                        method: 'POST',
                        waitMsg: 'Saving data',
                        success: function (form, action) {
                            //storeDenuncias.load({params: {noenviados: Ext.getCmp('checkNoEnviados').getValue()}});
                            //Ext.getCmp('tb_grabardenuncias').setDisabled(true);
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

    botonExportarReporteOperativo: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Se descarga el archivo con el informe<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/turnos/server/descargaTurnosId.inc.php?operativo=' + selectTurnos;
                    /*setTimeout(function () {
                     storeTurnos.load({params: {finalizados: Ext.getCmp('checkNoRecibidos').getValue()}});
                     }, 1000);*/

                }
            }
        });
    },

// funcion usada por boton

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

        var accesosAdministradorOpe = this.app.isAllowedTo('accesosAdministradorOpe', this.id);
        var accesosTurnos = this.app.isAllowedTo('accesosTurnos', this.id);
        var accesosAdministradorIns = this.app.isAllowedTo('accesosAdministradorIns', this.id);
        this.storeDocumentosReporte.baseParams.accesosAdministradorOpe = accesosAdministradorOpe;

        this.storeDocumentosReporte.baseParams.accesosTurnos = accesosTurnos;
        this.storeDocumentosReporte.baseParams.accesosAdministradorIns = accesosAdministradorIns;
        // para indicar en la busqueda que es desde el formulario
        var formularioBusqueda = 1;
        this.storeDocumentosReporte.baseParams.formularioBusqueda = formularioBusqueda;


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

                    generaAcciones = (Ext.getCmp('checkDetalleAcciones').getValue());
                    generaActas = (Ext.getCmp('checkDetalleActas').getValue());
                    generaRetiros = (Ext.getCmp('checkDetalleRecibidos').getValue());
                    generaTotalesPersonal = (Ext.getCmp('checkTotalesPersonal').getValue());

                    window.location.href = 'modules/desktop/turnos/server/descargaReporteTurnos.inc.php?param=' + valueParams + '&acciones=' + generaAcciones + '&totalespersonal=' + generaTotalesPersonal + '&actas=' + generaActas + '&retiros=' + generaRetiros;
                }
            }
        });
    }

});