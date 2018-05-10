QoDesk.InstruccionWindow = Ext.extend(Ext.app.Module, {
    id: 'instruccion',
    type: 'desktop/instruccion',

    init: function () {
        this.launcher = {
            text: 'Instrucción',
            iconCls: 'instruccion-icon',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function () {
        //todo ver que perfiles dejar
        var accesosAdministradorOpe = this.app.isAllowedTo('accesosAdministradorOpe', this.id);
        var accesosAdministradorIns = this.app.isAllowedTo('accesosAdministradorIns', this.id);
        var accesosInstruccion = this.app.isAllowedTo('accesosInstruccion', this.id);

        var accesosCoordinadorInspeccion = this.app.isAllowedTo('accesosAdministrador', this.id); //Todos los accesos, visualiza todos los trámites
        var accesosSecretaria = this.app.isAllowedTo('accesosSecretaria', this.id); //Todos los accesos, visualiza trámites pendientes
        var accesosInspectores = this.app.isAllowedTo('accesosInspeccion', this.id); //Sin acceso a pestaña trámites pendientes, acceso a inspecciones asignadas
        var accesosSupervision = this.app.isAllowedTo('accesosSupervision', this.id); //Solo modo lectura

        // todo eliminar estas fechas ?
        var fecha_inicio_planificacion;
        var fecha_fin_planificacion;

        //todo borrar variable

        var fechaOperativo;

        //variable define que registro de instruccion se seleccion
        selectInstruccion = 0;

        // variable define
        finalizados = true;

        // variable para paginamiento
        limiteinstruccion = 100;

        // todo revisar los accesp
        var acceso = (accesosAdministradorOpe || accesosInstruccion) ? true : false
        var acceso = true;

        var gridBlockInstruccion = false;
        var desktop = this.app.getDesktop();
        var AppMsg = new Ext.AppMsg({});

        var win = desktop.getWindow('grid-win-instruccion');

        var urlInstruccion = "modules/desktop/instruccion/server/";

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

        function instruccionTipoInstruccionSimple(id) {
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

        function instruccionTipoInstruccionSimple2(id) {
            var index = storeOPTID.findExact('id', id);
            if (index > -1) {
                var record = storeOPTID.getAt(index);
                return record.get('nombre');
            }
        }


        function instruccionTipoInstruccion(id) {
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
            url: 'modules/common/combos/combos.php?tipo=tiposMedidasInstruccion'
        });

        var comboOPINFOMEDIDA = new Ext.form.ComboBox({
            id: 'comboOPINFOMEDIDA',
            store: storeOPINFOMEDIDA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function instruccionTipoMedida(id) {
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
            url: 'modules/common/combos/combos.php?tipo=tiposAccioInstruccion'
        });

        var comboOPTIPOACC = new Ext.form.ComboBox({
            id: 'comboOPTIPOACC',
            store: storeOPTIPOACC,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function instruccionTipoAccion(id) {
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

        function instruccionDespachadoActivo(id) {
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

        function instruccionNivelComplejidad(id) {
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
            url: 'modules/common/combos/combos.php?tipo=tiposinstruccion'
        });

        var comboOPTIPO = new Ext.form.ComboBox({
            id: 'comboOPTIPO',
            store: storeOPTIPO,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function instruccionTipo(id) {
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

        function instruccionUnidades(id) {
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
        //inicio combo instruccion estado
        storeOPESTA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=instruccionestados'
        });

        var comboOPESTA = new Ext.form.ComboBox({
            id: 'comboOPESTA',
            store: storeOPESTA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function instruccionEstados(id) {
            var index = storeOPESTA.findExact('id', id);
            if (index > -1) {
                var record = storeOPESTA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo instruccion estado
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
            url: 'modules/common/combos/combos.php?tipo=personalinstruccion',
            baseParams: {
                accesosAdministradorOpe: accesosAdministradorOpe,
                accesosInstruccion: accesosInstruccion,
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

        function instruccionPersonalEncargado(id) {

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


        //inicio combo persona recepta la instruccion PRD
        storePRD = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalinstruccion',
            baseParams: {
                todos: 'true',
                accesosAdministradorOpe: accesosAdministradorOpe,
                accesosInstruccion: accesosInstruccion,
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

        function personaReceptaDenuncia(id) {
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
            url: 'modules/common/combos/combos.php?tipo=personalinstruccion',
            baseParams: {
                todos: 'true',
                accesosAdministradorOpe: true,
                accesosInstruccion: false,
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

        function personaReceptaDenuncia2(id) {
            //var index = storePRD2.findExact('id', id);
            var index = storePRD2.findExact('id', id);
            if (index > -1) {
                var record = storePRD2.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo persona recepta la instruccion PRD

// fin combos secretaria

// inicio combos instruccion

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
            url: 'modules/common/combos/combos.php?tipo=depInstruccion'
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
        //inicio combo Estado Recepcion Información Instruccion ESOPREA
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

        //fin combo Estado Recepcion Información Instruccion ESOPREA

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

        //fin combo Estado Recepcion Información Instruccion ESREOP

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
            url: 'modules/common/combos/combos.php?tipo=personalinstruccion'
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
// inicio combos instruccion

// inicio pestañas de mantenimiento


// fin pestañas de mantenimiento

        // inicio ventana instruccion
        var proxyInstruccion = new Ext.data.HttpProxy({
            api: {
                create: urlInstruccion + "crudInstruccion.php?operation=insert",
                read: urlInstruccion + "crudInstruccion.php?operation=select",
                update: urlInstruccion + "crudInstruccion.php?operation=update",
                destroy: urlInstruccion + "crudInstruccion.php?operation=delete"
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

        var readerInstruccion = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id_persona', allowBlank: false},
                {name: 'codigo_expediente', allowBlank: false},
                {name: 'id_persona_encargada', allowBlank: false},
                {name: 'id_persona_reasignado', allowBlank: false},
                {name: 'id_acta', allowBlank: false},
                {name: 'fecha_asignación', type: 'date', dateFormat: 'c', allowBlank: false},
                {name: 'id_tramite', allowBlank: false},
                {name: 'detalle', allowBlank: false},
                {name: 'observaciones', allowBlank: false},
                {name: 'clausura', allowBlank: false},
                {name: 'predio', allowBlank: false},
                {name: 'nombre_administrado', allowBlank: false},
                {name: 'nombre_establecimiento', allowBlank: false},
                {name: 'direccion', allowBlank: false},
                {name: 'ruc', allowBlank: false},
                {name: 'cedula', allowBlank: false},
                {name: 'casillero_judicial', allowBlank: false},
                {name: 'id_ordenanza', allowBlank: false},
                {name: 'id_articulo', allowBlank: false},
                {name: 'id_literal', allowBlank: false},
                {name: 'auto', allowBlank: false},
                {name: 'dmi', allowBlank: false},
                {name: 'informe_otros', allowBlank: false},
                {name: 'entidad', allowBlank: false},
                {name: 'informe', allowBlank: false},
                {name: 'medida_cautelar', allowBlank: false},
                {name: 'ultima_actividad', allowBlank: false}
            ]
        });
        var writerInstruccion = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        this.storeInstruccion = new Ext.data.Store({
            id: "id",
            proxy: proxyInstruccion,
            reader: readerInstruccion,
            writer: writerInstruccion,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            baseParams: {//limit: limiteinstruccion,
                finalizados: finalizados,
                accesosAdministradorOpe: accesosAdministradorOpe,
                accesosAdministradorIns: accesosAdministradorIns,
                accesosInstruccion: accesosInstruccion,
                acceso: acceso
            }
        });
        storeInstruccion = this.storeInstruccion;

        this.gridInstruccion = new Ext.grid.EditorGridPanel({
            height: desktop.getWinHeight() - 380,
            store: this.storeInstruccion,
            columns: [
                new Ext.grid.RowNumberer(),
                { header: 'id_persona', dataIndex: 'id_persona', sortable: true, width: 100 },

                { header: 'codigo_expediente', dataIndex: 'codigo_expediente', sortable: true, width: 100 },
                { header: 'id_persona_reasignado', dataIndex: 'id_persona_reasignado', sortable: true, width: 100 },

                {
                    header: 'fecha_asignación',
                    dataIndex: 'fecha_asignación',
                    sortable: true,
                    width: 100,
                    renderer: formatDate,
                    editor: new Ext.ux.form.DateTimeField({
                        dateFormat: 'Y-m-d',
                        timeFormat: 'H:i',
                        listeners: {
                            change: function (field, val, valOld) {
                            }
                        }
                    })
                },
                { header: 'id_tramite', dataIndex: 'id_tramite', sortable: true, width: 100 },
                { header: 'id_acta', dataIndex: 'id_acta', sortable: true, width: 100 },
                { header: 'id_estado', dataIndex: 'id_estado', sortable: true, width: 100 },
                { header: 'detalle', dataIndex: 'detalle', sortable: true, width: 100 },
                { header: 'observaciones', dataIndex: 'observaciones', sortable: true, width: 100 },
                { header: 'clausura', dataIndex: 'clausura', sortable: true, width: 100 },
                { header: 'predio', dataIndex: 'predio', sortable: true, width: 100 },
                { header: 'nombre_administrado', dataIndex: 'nombre_administrado', sortable: true, width: 100 },
                { header: 'nombre_establecimiento', dataIndex: 'nombre_establecimiento', sortable: true, width: 100 },
                { header: 'direccion', dataIndex: 'direccion', sortable: true, width: 100 },
                { header: 'ruc', dataIndex: 'ruc', sortable: true, width: 100 },
                { header: 'cedula', dataIndex: 'cedula', sortable: true, width: 100 },
                { header: 'casillero_judicial', dataIndex: 'casillero_judicial', sortable: true, width: 100 },
                { header: 'id_ordenanza', dataIndex: 'id_ordenanza', sortable: true, width: 100 },
                { header: 'id_articulo', dataIndex: 'id_articulo', sortable: true, width: 100 },
                { header: 'id_literal', dataIndex: 'id_literal', sortable: true, width: 100 },
                { header: 'auto', dataIndex: 'auto', sortable: true, width: 100 },
                { header: 'dmi', dataIndex: 'dmi', sortable: true, width: 100 },
                { header: 'informe_otros', dataIndex: 'informe_otros', sortable: true, width: 100 },
                { header: 'entidad', dataIndex: 'entidad', sortable: true, width: 100 },
                { header: 'informe', dataIndex: 'informe', sortable: true, width: 100 },
                { header: 'medida_cautelar', dataIndex: 'medida_cautelar', sortable: true, width: 100 },
                { header: 'ultima_actividad', dataIndex: 'ultima_actividad', sortable: true, width: 100 },


                /*                { header: 'Código', dataIndex: 'id', sortable: true, width: 45 },
                                { header: 'Visible', dataIndex: 'visible', sortable: true, width: 45,
                                    align: 'center',
                                    editor: {
                                        xtype: 'checkbox'
                                    }
                                    , falseText: 'No'
                                    , menuDisabled: true
                                    , trueText: 'Si'
                                    , xtype: 'booleancolumn'
                                },
                                {
                                    header: 'Estado',
                                    dataIndex: 'id_estado',
                                    sortable: true,
                                    width: 100,
                                    editor: comboOPESTA,
                                    renderer: instruccionEstados
                                },
                                {
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
                                                if (val > fecha_fin_planificacion)
                                                //AppMsg.setAlert("Alerta ", 'Fecha inicial no  debe ser mayor que fecha final');
                                                    fecha_inicio_planificacion = val
                                                //fecha inicial no debe ser mayor de 12 horas
                                                var diff = Math.abs(fecha_fin_planificacion - fecha_inicio_planificacion) / 3600000;
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
                                },
                                {
                                    header: 'Fecha Fin',
                                    dataIndex: 'fecha_fin_planificacion',
                                    sortable: true,
                                    width: 100,
                                    renderer: formatDate,
                                    editor: new Ext.ux.form.DateTimeField({
                                        dateFormat: 'Y-m-d',
                                        timeFormat: 'H:i',
                                        listeners: {
                                            change: function (field, val, valOld) {
                                                //fecha inicial debe ser mayor que la final
                                                if (val < fecha_inicio_planificacion)
                                                    AppMsg.setAlert("Alerta ", 'Fecha final debe ser mayor que fecha inicial');
                                                fecha_fin_planificacion = val
                                                //fecha inicial no debe ser mayor de 12 horas
                                                var diff = Math.abs(fecha_fin_planificacion - fecha_inicio_planificacion) / 3600000;
                                                if (diff > 12)
                                                    AppMsg.setAlert("Alerta ", 'Fecha final supera las 12 horas de operativo, están ' + parseFloat(diff).toFixed(1) + " horas");
                                                else
                                                    AppMsg.setAlert("Observación ", 'Están ' + parseFloat(diff).toFixed(1) + " horas de operativo");
                                                // alerta fecha menor a la actual
                                                fecha_actual = new Date();
                                                if (val < fecha_actual) {
                                                    AppMsg.setAlert("Observación ", 'La fecha del operativo anterior a la fecha actual');
                                                }
                                            }
                                        }
                                    })
                                },
                                {
                                    header: 'Zonal',
                                    dataIndex: 'id_zonal',
                                    sortable: true,
                                    width: 100,
                                    editor: comboZONA, renderer: zonaAdm
                                },
                                {
                                    header: 'Tipo de control',
                                    dataIndex: 'id_tipo_control',
                                    sortable: true,
                                    width: 100,
                                    editor: comboOPTID, renderer: instruccionTipoInstruccion
                                },
                                {
                                    header: 'Unidad',
                                    dataIndex: 'id_unidad',
                                    sortable: true,
                                    width: 120, editor: comboOPREA,
                                    renderer: instruccionUnidades
                                },

                                {
                                    header: 'Complejidad',
                                    dataIndex: 'id_nivel_complejidad',
                                    sortable: true,
                                    width: 60,
                                    editor: comboOPNICO, renderer: instruccionNivelComplejidad
                                },
                                {
                                    header: 'Responsable',
                                    dataIndex: 'id_persona_encargada',
                                    sortable: true,
                                    width: 190,
                                    editor: comboPRD,
                                    renderer: personaReceptaDenuncia,

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
                                    header: 'Punto Encuentro',
                                    dataIndex: 'punto_encuentro_planificado',
                                    sortable: true,
                                    width: 160,
                                    editor: new Ext.form.TextField({allowBlank: false})
                                },
                                {
                                    header: 'Observaciones',
                                    dataIndex: 'observaciones',
                                    sortable: true,
                                    width: 200,
                                    editor: new Ext.form.TextField({allowBlank: false})
                                },
                                {
                                    header: 'Trámite',
                                    dataIndex: 'tramite',
                                    sortable: true,
                                    width: 90,
                                    editor: new Ext.form.TextField({allowBlank: false})
                                },
                                {
                                    header: 'Elaborado',
                                    dataIndex: 'id_persona',
                                    sortable: true,
                                    width: 100,
                                    hidden: true,
                                    //editor: comboPRD,
                                    renderer: personaReceptaDenuncia
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
                                    header: 'Tipo planificación'
                                    , dataIndex: 'tipo_operativo'
                                    , align: 'left'
                                    , falseText: 'No'
                                    , menuDisabled: true
                                    , trueText: 'Si'
                                    , sortable: true
                                    , width: 140
                                    , editor: comboOPTIPO
                                    , renderer: instruccionTipo
                                },
                                {
                                    header: 'Fecha informe',
                                    dataIndex: 'fecha_informe',
                                    sortable: true,
                                    width: 100, hidden: true,
                                    renderer: formatDate
                                },
                                {
                                    header: 'fecha_impresion_informe',
                                    dataIndex: 'fecha_impresion_informe',
                                    sortable: true,
                                    width: 100, hidden: true,
                                    renderer: formatDate
                                },
                                {
                                    header: 'Fecha Real Inicio',
                                    dataIndex: 'fecha_real_inicio',
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
                                }*/
            ],
            viewConfig: {
                forceFit: false,
                getRowClass: function (record, index) {
                    // validamos la fecha
                  /*  fechaActual = new Date();
                    fechaOperativo = record.get('fecha_fin_planificacion')

                    var diasDif = fechaActual.getTime() - fechaOperativo.getTime();
                    var horas = Math.round(diasDif / (1000 * 60 * 60));


                    if ((record.get('id_estado') == 1) && (horas > 86)) {
                        return 'redstate';
                    }

                    // registros que estan en planificacion
                    if (record.get('id_estado') == 1) {
                        // Ext.getCmp('id_persona_encargada').setReadOnly(true);
                        return 'gold';
                    }
                    // registros que ya estan realizados
                    if (record.get('id_estado') == 4) {
                        return 'bluestate';
                    }*/
                }
            },
            sm: new Ext.grid.RowSelectionModel(
                {
                    singleSelect: true,
                    listeners: {
                        rowselect: function (sm, row, rec) {
                            //fecha_inicio_planificacion = rec.get('fecha_inicio_planificacion')
                            //fecha_fin_planificacion = rec.get('fecha_fin_planificacion');

                            // recuperamos la informacion de personal asignado a ese operativo
                            selectInstruccion = rec.id;
                            storeInstruccionPersonal.load({params: {id_operativo: rec.id}});
                            storeInstruccionAcciones.load({params: {id_operativo: rec.id}});
                            storeInstruccionInforme.load({params: {id_operativo: rec.id}});
                            storeInstruccionAcciones.load({params: {id_operativo: rec.id}});
                            storeInstruccionParticipantes.load({params: {id_operativo: rec.id}});
                            storeInstruccionRetiros.load({params: {id_operativo: rec.id}});
                            storeInstruccionImagenes.load({params: {id_operativo: rec.id}});

                            // para el caso que el operativo se haya finalizado se bloquea ya el borrar o editar

/*                            if (acceso) {
                                if (rec.get("id_estado") != 1) {
                                    Ext.getCmp('informesAccionesTab').setDisabled(acceso ? false : true);
                                    Ext.getCmp('informesInstruccionTab').setDisabled(acceso ? false : true);
                                    Ext.getCmp('imagenesInstruccionTab').setDisabled(acceso ? false : true);
                                    Ext.getCmp('detalleInstruccionTab').setDisabled(acceso ? false : true);
                                    Ext.getCmp('retirosInstruccionTab').setDisabled(acceso ? false : true);
                                    cargaDetalle(rec.id);
                                }
                                else {
                                    Ext.getCmp('informesAccionesTab').setDisabled(true);
                                    Ext.getCmp('informesInstruccionTab').setDisabled(true);
                                    Ext.getCmp('imagenesInstruccionTab').setDisabled(true);
                                    Ext.getCmp('detalleInstruccionTab').setDisabled(true);
                                    Ext.getCmp('retirosInstruccionTab').setDisabled(true);
                                    cargaDetalle(rec.id);
                                }

                                if ((rec.get("id_estado") == 1) || (rec.get("id_estado") == 4)) {
                                    gridBlockInstruccion = false;
                                    Ext.getCmp('savedetalleoperativo').setDisabled(false);

                                    Ext.getCmp('borraroperativo').setDisabled(accesosAdministradorOpe ? false : true);
                                    Ext.getCmp('addinstruccion').setDisabled(accesosAdministradorOpe ? false : true);

                                    Ext.getCmp('borraroperativoparticipantes').setDisabled(false);
                                    Ext.getCmp('addoperativoparticipantes').setDisabled(false);
                                    // en caso que se tenga acceso tambien se habilitan o deshabilitan los botones para agregar detalle
                                    // valido si es el caso operativo tipo Permanentes Zonales


                                    if (rec.get("tipo_operativo") == 2) {
                                        Ext.getCmp('borraroperativodetalle').setDisabled(false);
                                        Ext.getCmp('addoperativodetalle').setDisabled(false);
                                        //Ext.getCmp('borraroperativoparticipantes').setDisabled(false);
                                        // Ext.getCmp('addoperativoparticipantes').setDisabled(false);
                                    } else {
                                        Ext.getCmp('borraroperativodetalle').setDisabled(accesosAdministradorOpe ? false : true);
                                        Ext.getCmp('addoperativodetalle').setDisabled(accesosAdministradorOpe ? false : true);
                                        // Ext.getCmp('borraroperativoparticipantes').setDisabled(accesosAdministradorOpe ? false : true);
                                        // Ext.getCmp('addoperativoparticipantes').setDisabled(accesosAdministradorOpe ? false : true);
                                    }

                                    Ext.getCmp('borraroperativodetalleacciones').setDisabled(false);
                                    Ext.getCmp('addoperativodetalleacciones').setDisabled(false);

                                    Ext.getCmp('borraroperativodetalleInforme').setDisabled(false);
                                    Ext.getCmp('addoperativodetalleInforme').setDisabled(false);

                                    Ext.getCmp('borraroperativoimagenes').setDisabled(false);

                                    Ext.getCmp('addoperativoimagenes').setDisabled(false);
                                    Ext.getCmp('subirimagen').setDisabled(false);
                                    // solamente para el caso
                                }
                                else {
                                    gridBlockInstruccion = true;
                                    Ext.getCmp('savedetalleoperativo').setDisabled(true);

                                    Ext.getCmp('borraroperativo').setDisabled(true);
                                    Ext.getCmp('addinstruccion').setDisabled(true);

                                    Ext.getCmp('borraroperativodetalle').setDisabled(true);
                                    Ext.getCmp('addoperativodetalle').setDisabled(true);

                                    Ext.getCmp('borraroperativoparticipantes').setDisabled(true);
                                    Ext.getCmp('addoperativoparticipantes').setDisabled(true);

                                    Ext.getCmp('borraroperativodetalleacciones').setDisabled(true);
                                    Ext.getCmp('addoperativodetalleacciones').setDisabled(true);

                                    Ext.getCmp('borraroperativodetalleInforme').setDisabled(true);
                                    Ext.getCmp('addoperativodetalleInforme').setDisabled(true);

                                    Ext.getCmp('borraroperativoimagenes').setDisabled(true);
                                    Ext.getCmp('addoperativoimagenes').setDisabled(true);
                                    Ext.getCmp('subirimagen').setDisabled(true);

                                }


                                //para el caso  de los botones
                                if ((rec.get("id_estado") == 2) || (rec.get("id_estado") == 3) || (rec.get("id_estado") == 5)) {
                                    Ext.getCmp('tb_repoteInstruccion').setDisabled(false);
                                } else {
                                    Ext.getCmp('tb_repoteInstruccion').setDisabled(true);
                                }
                                //para el caso que se es administrador
                                if (accesosAdministradorOpe) {
                                    Ext.getCmp('savedetalleoperativo').setDisabled(false);
                                }
                            }
*/
                        }
                    }
                }
            ),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: limiteinstruccion,
                store: storeInstruccion,
                displayInfo: true,
                displayMsg: 'Mostrando instruccion {0} - {1} de {2} - AMC',
                emptyMsg: "No existen instruccion que mostrar"
            }),

            listeners: {
                beforeedit: function (e) {
                    // si el operativo esta identificado como estado o planificado (1) o informe (4) se peude editar
                    /*if (acceso) {
                        if ((e.record.get("id_estado") == 1) || (e.record.get("id_estado") == 4)) {
                            return true;
                        }
                        return false;
                    } else {
                        return false;
                    }
                    */
                }
            }
        });
        // fin ventana instruccion

        // inicio ventana instruccion detalle personal
        var proxyInstruccionPersonal = new Ext.data.HttpProxy({
            api: {
                create: urlInstruccion + "crudInstruccionPersonal.php?operation=insert",
                read: urlInstruccion + "crudInstruccionPersonal.php?operation=select",
                update: urlInstruccion + "crudInstruccionPersonal.php?operation=update",
                destroy: urlInstruccion + "crudInstruccionPersonal.php?operation=delete"
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

        var readerInstruccionPersonal = new Ext.data.JsonReader({
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
        var writerInstruccionPersonal = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeInstruccionPersonal = new Ext.data.Store({
            id: "id",
            proxy: proxyInstruccionPersonal,
            reader: readerInstruccionPersonal,
            writer: writerInstruccionPersonal,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });

        storeInstruccionPersonal = this.storeInstruccionPersonal;

        this.gridInstruccionPersonal = new Ext.grid.EditorGridPanel({
            id: 'gridInstruccionPersonal',

            autoHeight: true,
            autoScroll: true,
            store: this.storeInstruccionPersonal,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Personal',
                    dataIndex: 'id_member',
                    sortable: true,
                    width: 30,
                    editor: comboPRD2,
                    renderer: personaReceptaDenuncia2
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
                    // si el operativo ya esta marcado como finalizado no se lo puede editar
                    if (acceso) {
                        // verifico variable que permite editar o no
                        if (gridBlockInstruccion) {
                            //verifico que si no es administrador se bloque la edicion
                            if (!accesosAdministradorOpe)
                                return false;
                        }
                        return true;
                    } else {
                        return false;
                    }
                }

            }
        });

        var gridInstruccionPersonal = this.gridInstruccionPersonal
        // fin  ventana instruccion detalle personal

        // inicio ventana instruccion detalle participantes
        var proxyInstruccionParticipantes = new Ext.data.HttpProxy({
            api: {
                create: urlInstruccion + "crudInstruccionParticipantes.php?operation=insert",
                read: urlInstruccion + "crudInstruccionParticipantes.php?operation=select",
                update: urlInstruccion + "crudInstruccionParticipantes.php?operation=update",
                destroy: urlInstruccion + "crudInstruccionParticipantes.php?operation=delete"
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

        var readerInstruccionParticipantes = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id_entidad', allowBlank: false},
                {name: 'id_operativo', allowBlank: false},
                {name: 'jefe_grupo', allowBlank: false},
                {name: 'personas', allowBlank: true},
                {name: 'observaciones', allowBlank: true},
                {name: 'asistencia', type: 'boolean', allowBlank: true}
            ]
        });
        var writerInstruccionParticipantes = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeInstruccionParticipantes = new Ext.data.Store({
            id: "id",
            proxy: proxyInstruccionParticipantes,
            reader: readerInstruccionParticipantes,
            writer: writerInstruccionParticipantes,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });

        storeInstruccionParticipantes = this.storeInstruccionParticipantes;

        this.gridInstruccionParticipantes = new Ext.grid.EditorGridPanel({
            id: 'gridInstruccionParticipantes',
            autoHeight: true,
            autoScroll: true,
            store: this.storeInstruccionParticipantes,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Participantes',
                    dataIndex: 'id_entidad',
                    sortable: true,
                    width: 30,
                    editor: comboOPENTT,
                    renderer: entidadesTipo
                },
                {
                    header: 'Operativo',
                    dataIndex: 'id_operativo',
                    sortable: true,
                    width: 30, hidden: true
                },
                {
                    header: 'Jefe Grupo',
                    dataIndex: 'jefe_grupo',
                    sortable: true,
                    width: 60,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Total personal',
                    dataIndex: 'personas',
                    sortable: true,
                    width: 20,
                    align: 'right',
                    editor: new Ext.form.NumberField({
                        allowBlank: false,
                        allowNegative: false,
                        maxValue: 100000
                    })
                },
                {
                    header: 'Observaciones',
                    dataIndex: 'observaciones',
                    sortable: true,
                    width: 60,
                    editor: new Ext.form.TextField({allowBlank: false})
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
                    // si el operativo ya esta marcado como finalizado no se lo puede editar
                    if (acceso) {
                        // verifico variable que permite editar o no
                        if (gridBlockInstruccion) {
                            //verifico que si no es administrador se bloque la edicion
                            if (!accesosAdministradorOpe)
                                return false;
                        }
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        });

        var gridInstruccionParticipantes = this.gridInstruccionParticipantes
        // fin ventana instruccion detalle participantes

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
                            url: 'modules/desktop/instruccion/server/crudInstruccion.php?operation=updateForm',
                            method: 'POST',
                            success: function (form, action) {
                            }
                        });
                    }
                },
            }


        });

        // inicio ventana instruccion detalle imagenes
        var proxyInstruccionImagenes = new Ext.data.HttpProxy({
            api: {
                create: urlInstruccion + "crudInstruccionImagenes.php?operation=insert",
                read: urlInstruccion + "crudInstruccionImagenes.php?operation=select",
                update: urlInstruccion + "crudInstruccionImagenes.php?operation=update",
                destroy: urlInstruccion + "crudInstruccionImagenes.php?operation=delete"
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

        var readerInstruccionImagenes = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id_operativo', allowBlank: false},
                {name: 'url', allowBlank: false},

            ]
        });
        var writerInstruccionImagenes = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeInstruccionImagenes = new Ext.data.Store({
            id: "id",
            proxy: proxyInstruccionImagenes,
            reader: readerInstruccionImagenes,
            writer: writerInstruccionImagenes,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });

        storeInstruccionImagenes = this.storeInstruccionImagenes;

        this.gridInstruccionImagenes = new Ext.grid.EditorGridPanel({
            id: 'gridInstruccionImagenes',
            autoHeight: true,
            store: this.storeInstruccionImagenes,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Url imagen',
                    dataIndex: 'url',
                    sortable: true,
                    width: 100,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Imagen',
                    dataIndex: 'url',
                    renderer: function (value) {
                        return '<img src="' + value + '" width="300" />';
                    }
                }
                /*, {
                 header: 'Test',
                 dataIndex: 'url',
                 sortable: true,
                 width: 60,
                 editor: new Ext.ux.form.FileUploadField({
                 buttonOnly: true,

                 })
                 }
                 */
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
                    // si el operativo ya esta marcado como finalizado no se lo puede editar
                    if (acceso) {
                        if (gridBlockInstruccion) {
                            //verifico que si no es administrador se bloque la edicion
                            if (!accesosAdministradorOpe)
                                return false;
                        }
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        });

        var gridInstruccionImagenes = this.gridInstruccionImagenes
        // fin ventana instruccion detalle imagenes


        // inicio ventana instruccion detalle informe
        var proxyInstruccionInforme = new Ext.data.HttpProxy({
            api: {
                create: urlInstruccion + "crudInstruccionInforme.php?operation=insert",
                read: urlInstruccion + "crudInstruccionInforme.php?operation=select",
                update: urlInstruccion + "crudInstruccionInforme.php?operation=update",
                destroy: urlInstruccion + "crudInstruccionInforme.php?operation=delete"
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

        var readerInstruccionInforme = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id_operativo', allowBlank: false},
                {name: 'id_ordenanza', allowBlank: false},
                {name: 'administrado', allowBlank: true},
                {name: 'direccion', allowBlank: true},
                {name: 'hecho', allowBlank: false},
                {name: 'medida', allowBlank: true},
                {name: 'numero_auto_inicio', allowBlank: true},
                {name: 'observaciones', allowBlank: true}

            ]
        });
        var writerInstruccionInforme = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeInstruccionInforme = new Ext.data.Store({
            id: "id",
            proxy: proxyInstruccionInforme,
            reader: readerInstruccionInforme,
            writer: writerInstruccionInforme,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });

        storeInstruccionInforme = this.storeInstruccionInforme;

        this.gridInstruccionInforme = new Ext.grid.EditorGridPanel({
            id: 'gridInstruccionInforme',

            autoHeight: true,
            autoScroll: true,
            store: this.storeInstruccionInforme,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'Ordenanza',
                    dataIndex: 'id_ordenanza',
                    sortable: true,
                    width: 30,
                    editor: comboOPTIDSimple2,
                    renderer: instruccionTipoInstruccionSimple2
                },
                {
                    header: 'Operativo',
                    dataIndex: 'id_operativo',
                    sortable: true,
                    width: 30, hidden: true
                },
                {
                    header: 'Nombre administrado',
                    dataIndex: 'administrado',
                    sortable: true,
                    width: 60,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Dirección infracción',
                    dataIndex: 'direccion',
                    sortable: true,
                    width: 60,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Hecho constatado',
                    dataIndex: 'hecho',
                    sortable: true,
                    width: 60,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Número documento',
                    dataIndex: 'numero_auto_inicio',
                    sortable: true,
                    width: 60,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Medida',
                    dataIndex: 'medida',
                    sortable: true,
                    width: 60,
                    editor: comboOPINFOMEDIDA,
                    renderer: instruccionTipoMedida
                },
                {
                    header: 'Observaciones',
                    dataIndex: 'observaciones',
                    sortable: true,
                    width: 120,
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
                    // si el operativo ya esta marcado como finalizado no se lo puede editar
                    if (acceso) {
                        if (gridBlockInstruccion) {
                            //verifico que si no es administrador se bloque la edicion
                            if (!accesosAdministradorOpe)
                                return false;
                        }
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        });

        var gridInstruccionInforme = this.storeInstruccionInforme
        // inicio ventana instruccion detalle personal


        // inicio ventana retiros detalle personal
        var proxyInstruccionRetiros = new Ext.data.HttpProxy({
            api: {
                create: urlInstruccion + "crudInstruccionRetiros.php?operation=insert",
                read: urlInstruccion + "crudInstruccionRetiros.php?operation=select",
                update: urlInstruccion + "crudInstruccionRetiros.php?operation=update",
                destroy: urlInstruccion + "crudInstruccionRetiros.php?operation=delete"
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

        var readerInstruccionRetiros = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id_operativo', allowBlank: false},
                {name: 'nombre', allowBlank: true},
                {name: 'direccion', allowBlank: false},
                {name: 'tipo', allowBlank: true},
                {name: 'codigo_bodega', allowBlank: false},
                {name: 'detalle', allowBlank: true}
            ]
        });
        var writerInstruccionRetiros = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeInstruccionRetiros = new Ext.data.Store({
            id: "id",
            proxy: proxyInstruccionRetiros,
            reader: readerInstruccionRetiros,
            writer: writerInstruccionRetiros,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });

        storeInstruccionRetiros = this.storeInstruccionRetiros;

        this.gridInstruccionRetiros = new Ext.grid.EditorGridPanel({
            id: 'gridInstruccionRetiros',

            autoHeight: true,
            autoScroll: true,
            store: this.storeInstruccionRetiros,
            columns: [
                new Ext.grid.RowNumberer(),
                /*       {
                           header: 'Retiros',
                           dataIndex: 'id_member',
                           sortable: true,
                           width: 30,
                           editor: comboPRD2,
                           renderer: personaReceptaDenuncia2

                       },*/
                {
                    header: 'Operativo',
                    dataIndex: 'id_operativo',
                    sortable: true,
                    width: 30, hidden: true

                },
                {
                    header: 'nombre',
                    dataIndex: 'nombre',
                    sortable: true,
                    width: 60,
                    editor: new Ext.form.TextField({allowBlank: false})
                }
                ,
                {
                    header: 'Dirección',
                    dataIndex: 'direccion',
                    sortable: true,
                    width: 80,
                    editor: new Ext.form.TextField({allowBlank: false})
                }
                ,
                {
                    header: 'Tipo',
                    dataIndex: 'tipo',
                    sortable: true,
                    width: 25,
                    editor: comboESREOP,
                    renderer: estadoRetirosAdm
                }
                ,
                {
                    header: 'Código bodega',
                    dataIndex: 'codigo_bodega',
                    sortable: true,
                    width: 60,
                    editor: new Ext.form.TextField({allowBlank: false})
                }
                ,
                {
                    header: 'Detalle',
                    dataIndex: 'detalle',
                    sortable: true,
                    width: 200,
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
                    // si el operativo ya esta marcado como finalizado no se lo puede editar
                    if (acceso) {
                        // verifico variable que permite editar o no
                        if (gridBlockInstruccion) {
                            //verifico que si no es administrador se bloque la edicion
                            if (!accesosAdministradorOpe)
                                return false;
                        }
                        return true;
                    } else {
                        return false;
                    }
                }

            }
        });

        var gridInstruccionRetiros = this.gridInstruccionRetiros
        // fin  ventana retiros detalle personal


        // inicio ventana instruccion detalle vehiculos
        var proxyInstruccionAcciones = new Ext.data.HttpProxy({
            api: {
                create: urlInstruccion + "crudInstruccionAcciones.php?operation=insert",
                read: urlInstruccion + "crudInstruccionAcciones.php?operation=select",
                update: urlInstruccion + "crudInstruccionAcciones.php?operation=update",
                destroy: urlInstruccion + "crudInstruccionAcciones.php?operation=delete"
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

        var readerInstruccionAcciones = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id_operativo', allowBlank: false},
                {name: 'id_accion', allowBlank: false},
                {name: 'cantidad', allowBlank: false},
                {name: 'observaciones', allowBlank: true}
            ]
        });
        var writerInstruccionAcciones = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeInstruccionAcciones = new Ext.data.Store({
            id: "id",
            proxy: proxyInstruccionAcciones,
            reader: readerInstruccionAcciones,
            writer: writerInstruccionAcciones,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });

        storeInstruccionAcciones = this.storeInstruccionAcciones;

        this.gridInstruccionAcciones = new Ext.grid.EditorGridPanel({
            id: 'gridInstruccionAcciones',

            autoHeight: true,
            autoScroll: true,
            store: this.storeInstruccionAcciones,
            columns: [
                {
                    header: 'Operativo',
                    dataIndex: 'id_operativo',
                    sortable: true,
                    width: 30, hidden: true

                },
                {
                    header: 'Accion',
                    dataIndex: 'id_accion',
                    sortable: true,
                    width: 60,
                    editor: comboOPTIPOACC,
                    renderer: instruccionTipoAccion
                },
                {
                    header: 'Cantidad',
                    dataIndex: 'cantidad',
                    sortable: true,
                    width: 60,
                    align: 'right',
                    editor: new Ext.ux.form.SpinnerField({
                        minValue: 0,
                        maxValue: 200
                    })
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
            listeners: {
                beforeedit: function (e) {
                    // si el operativo ya esta marcado como finalizado no se lo puede editar
                    if (acceso) {
                        if (gridBlockInstruccion) {
                            //verifico que si no es administrador se bloque la edicion
                            if (!accesosAdministradorOpe)
                                return false;
                        }
                        return true;
                    } else {
                        return false;
                    }
                }
            }


        });

        var gridInstruccionAcciones = this.gridInstruccionAcciones
        // inicio ventana instruccion detalle vehiculos


        // datastore and datagrid in Guia
        this.storeDocumentosReporte = new Ext.data.Store({
            id: "id",
            proxy: proxyInstruccion,
            reader: readerInstruccion,
            writer: writerInstruccion,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            baseParams: {//limit: limiteinstruccion,
                accesosAdministradorOpe: accesosAdministradorOpe,
                accesosAdministradorIns: accesosAdministradorIns,
                accesosInstruccion: accesosInstruccion

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
                {
                    header: 'Fecha inicio',
                    dataIndex: 'fecha_inicio_planificacion',
                    sortable: true,
                    width: 37,
                    renderer: formatDate
                },
                {
                    header: 'Fecha Fin',
                    dataIndex: 'fecha_fin_planificacion',
                    sortable: true,
                    width: 37,
                    renderer: formatDate
                },
                {
                    header: 'Tipo de control',
                    dataIndex: 'id_tipo_control',
                    sortable: true,
                    width: 45,
                    renderer: instruccionTipoInstruccion
                },
                {
                    header: 'Estado',
                    dataIndex: 'id_estado',
                    sortable: true,
                    width: 45,
                    renderer: instruccionEstados
                },
                {
                    header: 'Complejidad',
                    dataIndex: 'id_nivel_complejidad',
                    sortable: true,
                    width: 30,
                    renderer: instruccionNivelComplejidad
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
                    renderer: personaReceptaDenuncia
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
                    renderer: personaReceptaDenuncia
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
                    , renderer: instruccionTipo
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
                displayMsg: 'Mostrando instruccion {0} - {1} de {2}  >>',
                emptyMsg: "No existen instruccion que mostrar"
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
                                fieldLabel: 'Observaciones',
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
                    var store = this.storeInstruccion;
                    store.baseParams.filterField = item.key;
                    searchFieldBtn.setText(item.text);
                }
            };

            var targetHandler = function (item, checked) {
                if (checked) {
                    //var store = this.storeInstruccion;
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
                id: 'grid-win-instruccion',
                title: 'Instrucción - Gestión trámites ',
                width: winWidth,
                height: winHeight,
                iconCls: 'instruccion-icon',
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
                            title: 'Planificación instruccion',
                            closable: true,
                            tbar: [
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.addinstruccion,
                                    iconCls: 'save-icon',
                                    id: 'addinstruccion',
                                    disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                },
                                '-',
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deleteinstruccion,
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
                                    boxLabel: 'Instruccion no finalizados',
                                    id: 'checkNoRecibidos',
                                    name: 'noenviados',
                                    checked: true,
                                    inputValue: '1',
                                    tooltip: 'Recargar datos',
                                    //disabled: !acceso,
                                    cls: 'barramenu',
                                    handler: function (checkbox, isChecked) {
                                        storeInstruccion.baseParams.finalizados = isChecked;
                                        storeInstruccion.load();
                                    }
                                }, '-',
                                {
                                    id: 'tb_repoteInstruccion',
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
                                    , store: this.storeInstruccion
                                })
                            ],
                            items: [
                                {
                                    id: 'formcabecerainstruccion',
                                    titleCollapse: true,
                                    flex: 1,
                                    autoScroll: true,
                                    layout: 'column',
                                    items: this.gridInstruccion,
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
                                                    title: 'Resumen Operativo',
                                                    layout: 'column',
                                                    id: 'detalleInstruccionTab',
                                                    height: 250,
                                                    items: detalleOperativo,
                                                    disabled: true,
                                                    autoScroll: true,
                                                    tbar: [
                                                        {
                                                            text: 'Grabar',
                                                            scope: this,
                                                            handler: this.updateOperativo,
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
                                                },
                                                {
                                                    title: 'Instituciones Participantes',
                                                    layout: 'column',
                                                    height: 250,
                                                    items: this.gridInstruccionParticipantes,
                                                    autoScroll: true,
                                                    tbar: [
                                                        {
                                                            text: 'Nuevo',
                                                            scope: this,
                                                            //handler: this.addinstruccionPersonal,
                                                            handler: this.addinstruccionParticipantes,
                                                            iconCls: 'save-icon',
                                                            disabled: true,
                                                            id: 'addoperativoparticipantes'
                                                            //disabled: !acceso
                                                        },
                                                        '-',
                                                        {
                                                            text: "Eliminar",
                                                            scope: this,
                                                            handler: this.deleteinstruccionPersonal,
                                                            handler: this.deleteinstruccionParticipantes,
                                                            id: 'borraroperativoparticipantes',
                                                            iconCls: 'delete-icon',
                                                            //disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                                            disabled: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    title: 'Personal asignado',
                                                    layout: 'column',
                                                    height: 250,
                                                    items: this.gridInstruccionPersonal,
                                                    autoScroll: true,
                                                    tbar: [
                                                        {
                                                            text: 'Nuevo',
                                                            scope: this,
                                                            handler: this.addinstruccionPersonal,
                                                            iconCls: 'save-icon',
                                                            //disabled: true,
                                                            id: 'addoperativodetalle',
                                                            //disabled: !acceso
                                                        },
                                                        '-',
                                                        {
                                                            text: "Eliminar",
                                                            scope: this,
                                                            handler: this.deleteinstruccionPersonal,
                                                            id: 'borraroperativodetalle',
                                                            iconCls: 'delete-icon',
                                                            //disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                                            //disabled: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    title: 'Acciones Operativo',
                                                    layout: 'column',
                                                    height: 250,
                                                    items: this.gridInstruccionAcciones,
                                                    id: 'informesAccionesTab',
                                                    autoScroll: true,
                                                    disabled: true,
                                                    tbar: [
                                                        {
                                                            text: 'Nuevo',
                                                            scope: this,
                                                            handler: this.addAcciones,
                                                            id: 'addoperativodetalleacciones',
                                                            iconCls: 'save-icon',
                                                            disabled: true
                                                        },
                                                        '-',
                                                        {
                                                            text: "Eliminar",
                                                            scope: this,
                                                            handler: this.deleteAcciones,
                                                            id: 'borraroperativodetalleacciones',
                                                            iconCls: 'delete-icon',
                                                            disabled: true
                                                        }
                                                    ]
                                                },

                                                {
                                                    title: 'Auto Inicio  / Actas',
                                                    layout: 'column',
                                                    id: 'informesInstruccionTab',
                                                    disabled: true,
                                                    height: 250,
                                                    items: this.gridInstruccionInforme,
                                                    autoScroll: true,
                                                    tbar: [
                                                        {
                                                            text: 'Nuevo',
                                                            scope: this,
                                                            handler: this.addInforme,
                                                            id: 'addoperativodetalleInforme',
                                                            iconCls: 'save-icon',
                                                            disabled: true
                                                        },
                                                        '-',
                                                        {
                                                            text: "Eliminar",
                                                            scope: this,
                                                            handler: this.deleteInforme,
                                                            id: 'borraroperativodetalleInforme',
                                                            iconCls: 'delete-icon',
                                                            disabled: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    title: 'Retiros',
                                                    layout: 'column',
                                                    disabled: true,
                                                    height: 250,
                                                    id: 'retirosInstruccionTab',
                                                    items: this.gridInstruccionRetiros,
                                                    autoScroll: true,
                                                    tbar: [
                                                        {
                                                            text: 'Nuevo',
                                                            scope: this,
                                                            handler: this.addretirosRetiros,
                                                            iconCls: 'save-icon',
                                                            //disabled: true,
                                                            id: 'addoperativodetalle2',
                                                            //disabled: !acceso
                                                        },
                                                        '-',
                                                        {
                                                            text: "Eliminar",
                                                            scope: this,
                                                            handler: this.deleteretirosRetiros,
                                                            id: 'borraroperativodetalle2',
                                                            iconCls: 'delete-icon',
                                                            //disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                                            //disabled: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    title: 'Imágenes',
                                                    id: 'imagenesInstruccionTab',
                                                    layout: 'column',
                                                    height: 235,
                                                    disabled: true,
                                                    items: this.gridInstruccionImagenes,
                                                    autoScroll: true,
                                                    tbar: [
                                                        {
                                                            text: 'Nuevo',
                                                            scope: this,
                                                            handler: this.addinstruccionImagenes,
                                                            iconCls: 'save-icon',
                                                            disabled: true,
                                                            id: 'addoperativoimagenes',
                                                            hidden: true
                                                            //disabled: !acceso
                                                        },
                                                        '-',
                                                        {
                                                            text: "Eliminar",
                                                            scope: this,
                                                            handler: this.deleteinstruccionImagenes,
                                                            id: 'borraroperativoimagenes',
                                                            iconCls: 'delete-icon',
                                                            //disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                                            disabled: true
                                                        },
                                                        '-',
                                                        {
                                                            xtype: 'form',
                                                            fileUpload: true,
                                                            width: 300,
                                                            frame: true,
                                                            autoHeight: 60,
                                                            defaults: {
                                                                anchor: '100%',
                                                                allowBlank: false

                                                            },
                                                            id: "fp",
                                                            items: [
                                                                {
                                                                    xtype: 'fileuploadfield',
                                                                    id: 'form-file',
                                                                    emptyText: 'Seleccione imagen a subir',
                                                                    fieldLabel: 'Imagen',
                                                                    name: 'photo-path',
                                                                    regex: /^.*.(jpg|JPG|jpeg|JPEG)$/,
                                                                    regexText: 'Solo imagenes ',
                                                                    buttonText: '',
                                                                    //buttonOnly: true,
                                                                    buttonCfg: {
                                                                        iconCls: 'ux-start-menu-submenu'
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        '-',
                                                        {
                                                            text: "Subir Imagen",
                                                            scope: this,
                                                            handler: function () {
                                                                if (Ext.getCmp('fp').getForm().isValid()) {
                                                                    Ext.getCmp('fp').getForm().submit({
                                                                        url: urlInstruccion + 'file-upload.php',
                                                                        params: {data: selectInstruccion},
                                                                        waitMsg: 'Subiendo Imagen...',
                                                                        success: function (fp, o) {

                                                                            storeInstruccionImagenes.load({params: {id_operativo: selectInstruccion}});
                                                                            Ext.getCmp('fp').getForm().reset();
                                                                        },
                                                                        failure: function (form, action) {
                                                                            var errorJson = JSON.parse(action.response.responseText);
                                                                            Ext.Msg.show({
                                                                                title: 'Error '
                                                                                , msg: errorJson.msg
                                                                                , modal: true
                                                                                , icon: Ext.Msg.ERROR
                                                                                , buttons: Ext.Msg.OK
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            },
                                                            id: 'subirimagen',
                                                            iconCls: 'subir-icon',
                                                            //disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                                            disabled: true
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
                            title: 'Actas',
                            closable: true,
                            layout: 'border',
                            id: 'actas',
                            disabled: accesosInspectores,
                            tbar: [
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataDenunciasActa,
                                    scope: this,
                                    text: 'Recargar Datos'

                                },
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonImprimirActa,
                                    scope: this,
                                    text: 'Imprimir Acta',
                                    tooltip: 'Se reimprime el acta seleccionada.',
                                    id: 'tb_repoteActas',
                                    // disabled: !acceso
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
                                    items: this.gridInspeccionActa

                                },
                                // create instance immediately
                                {

                                    region: 'center',
                                    split: true,
                                    autoScroll: true,
                                    height: 300,
                                    minSize: 100,
                                    maxSize: 150,
                                    margins: '0 0 0 0',
                                    items: this.gridInspeccionActaSimple
                                }
                            ]

                        },

                        {
                            title: 'Reportes',
                            closable: true,
                            layout: 'border',
                            //disabled: this.app.isAllowedTo('accesosInstruccion', this.id) ? false : true,
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
                                    boxLabel: 'Detalle retiros',
                                    id: 'checkDetalleRecibidos',
                                    name: 'detalleretiros',
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
                                },
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarDocumentoReporteCalendarioPersonal,
                                    scope: this,
                                    text: 'Exportar calendario  personas',
                                    tooltip: 'Se genera archivo Excel con la información solicitada'
                                }
                                ,
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarDocumentoReporteCalendarioInstruccion,
                                    scope: this,
                                    text: 'Exportar calendario  instruccion',
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

        function cargaDetalle(instruccion) {
            //forma = Ext.getCmp('formaDetalleOperativo');
            detalleOperativo.getForm().load({
                url: urlInstruccion + 'crudInstruccion.php?operation=selectForm',
                params: {
                    id: instruccion
                }
            });
        };

        setTimeout(function () {
            this.storeInstruccion.load({
                params: {
                    start: 0,
                    limit: limiteinstruccion,
                    finalizados: Ext.getCmp('checkNoRecibidos').getValue(),
                    accesosAdministradorOpe: accesosAdministradorOpe,
                    accesosInstruccion: accesosInstruccion
                }
            });
        }, 1800);
    },
    deleteinstruccion: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridInstruccion.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeInstruccion.remove(rows);
                }
            }
        });
    },
    addinstruccion: function () {
        var instruccion = new this.storeInstruccion.recordType({
            id_persona: '-',
            id: ' ',
            visible: '',
            fecha_planificacion: (new Date()),
            fecha_inicio_planificacion: (new Date()),
            fecha_fin_planificacion: (new Date()),
            id_tipo_control: '',
            id_nivel_complejidad: ' ',
            observaciones: ' ',
            punto_encuentro_planificado: ' ',
            id_zonal: ' ',
            tipo_operativo: '2',
            id_persona_encargada: ' ',
            id_estado: 1
        });
        this.gridInstruccion.stopEditing();
        this.storeInstruccion.insert(0, instruccion);
        this.gridInstruccion.startEditing(0, 0);
    },
    requestGridData: function () {
        this.storeInstruccion.load();
    },

    deleteinstruccionPersonal: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridInstruccionPersonal.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeInstruccionPersonal.remove(rows);
                }
            }
        });
    },
    addinstruccionPersonal: function () {
        var instruccion = new this.storeInstruccionPersonal.recordType({
            id_persona: '-',
            id_operativo: selectInstruccion,
            asistencia: true,
            observaciones: ''
        });
        this.gridInstruccionPersonal.stopEditing();
        this.storeInstruccionPersonal.insert(0, instruccion);
        this.gridInstruccionPersonal.startEditing(0, 0);
    },
    requestGridDataPersonal: function () {
        this.storeInstruccionPersonal.load();
    },
    // controles insercion eliminar reload Participantes
    deleteinstruccionParticipantes: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridInstruccionParticipantes.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeInstruccionParticipantes.remove(rows);
                }
            }
        });
    },
    updateOperativo: function () {
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
                        url: 'modules/desktop/instruccion/server/crudInstruccion.php?operation=updateForm',
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


    addinstruccionParticipantes: function () {
        var instruccion = new this.storeInstruccionParticipantes.recordType({
            id_persona: '-',
            id_operativo: selectInstruccion,
            asistencia: true,
            observaciones: '',
            id_entidad: '-',
            jefe_grupo: '-',
            personas: 0
        });
        this.gridInstruccionParticipantes.stopEditing();
        this.storeInstruccionParticipantes.insert(0, instruccion);
        this.gridInstruccionParticipantes.startEditing(0, 0);
    },
    requestGridDataParticipantes: function () {
        this.storeInstruccionParticipantes.load();
    },

    // controles insercion eliminar reload Imagenes
    deleteinstruccionImagenes: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridInstruccionImagenes.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeInstruccionImagenes.remove(rows);
                }
            }
        });
    },
    addinstruccionImagenes: function () {
        var instruccion = new this.storeInstruccionImagenes.recordType({
            id_persona: '-',
            id_operativo: selectInstruccion,
            asistencia: true,
            observaciones: '',
            id_entidad: '-',
            jefe_grupo: '-',
            personas: 0
        });
        this.gridInstruccionImagenes.stopEditing();
        this.storeInstruccionImagenes.insert(0, instruccion);
        this.gridInstruccionImagenes.startEditing(0, 0);
    },
    requestGridDataImagenes: function () {
        this.storeInstruccionImagenes.load();
    },

    deleteretirosRetiros: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridInstruccionRetiros.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeInstruccionRetiros.remove(rows);
                }
            }
        });
    },
    addretirosRetiros: function () {
        var retiros = new this.storeInstruccionRetiros.recordType({
            id_persona: '-',
            id_operativo: selectInstruccion,
            asistencia: true,
            observaciones: ''
        });
        this.gridInstruccionRetiros.stopEditing();
        this.storeInstruccionRetiros.insert(0, retiros);
        this.gridInstruccionRetiros.startEditing(0, 0);
    },
    requestGridDataRetiros: function () {
        this.storeInstruccionRetiros.load();
    },

    deleteAcciones: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridInstruccionAcciones.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeInstruccionAcciones.remove(rows);
                }
            }
        });
    },
    addAcciones: function () {
        var vehiculos = new this.storeInstruccionAcciones.recordType({

            id_operativo: selectInstruccion,
            conductor: '',
            telefono: '',
            observaciones: ''
        });


        this.gridInstruccionAcciones.stopEditing();
        this.storeInstruccionAcciones.insert(0, vehiculos);
        this.gridInstruccionAcciones.startEditing(0, 0);
    },
    requestGridDataVehiculos: function () {
        this.storeInstruccionAcciones.load();
    },

    deleteInforme: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridInstruccionInforme.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeInstruccionInforme.remove(rows);
                }
            }
        });
    },
    addInforme: function () {
        var informe = new this.storeInstruccionInforme.recordType({
            id_operativo: selectInstruccion
        });

        this.gridInstruccionInforme.stopEditing();
        this.storeInstruccionInforme.insert(0, informe);
        this.gridInstruccionInforme.startEditing(0, 0);
    },
    requestGridDataInforme: function () {
        this.storeInstruccionInforme.load();
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
                    window.location.href = 'modules/desktop/instruccion/server/descargaInstruccionId.inc.php?operativo=' + selectInstruccion;
                    /*setTimeout(function () {
                     storeInstruccion.load({params: {finalizados: Ext.getCmp('checkNoRecibidos').getValue()}});
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
        var accesosInstruccion = this.app.isAllowedTo('accesosInstruccion', this.id);
        var accesosAdministradorIns = this.app.isAllowedTo('accesosAdministradorIns', this.id);

        this.storeDocumentosReporte.baseParams.accesosAdministradorOpe = accesosAdministradorOpe;
        this.storeDocumentosReporte.baseParams.accesosInstruccion = accesosInstruccion;
        this.storeDocumentosReporte.baseParams.accesosAdministradorIns = accesosAdministradorIns;


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
                    generaRetiros = checkDetalleRecibidos
                    generaRetiros = (Ext.getCmp('checkDetalleRecibidos').getValue());
                    window.location.href = 'modules/desktop/instruccion/server/descargaReporteInstruccion.inc.php?param=' + valueParams + '&retiros=' + generaRetiros;
                }
            }
        });
    },
    botonExportarDocumentoReporteCalendarioPersonal: function () {
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
                    window.location.href = 'modules/desktop/instruccion/server/descargaReporteInstruccioncalendario.inc.php?param=' + valueParams;
                }
            }
        });
    },
    botonExportarDocumentoReporteCalendarioInstruccion: function () {
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
                    window.location.href = 'modules/desktop/instruccion/server/descargaReporteInstruccioncalendario2.inc.php?param=' + valueParams;
                }
            }
        });
    }
});