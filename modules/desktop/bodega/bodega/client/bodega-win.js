var libroDiarioSeleccionado = '';

QoDesk.BodegaWindow = Ext.extend(Ext.app.Module, {
    id: 'bodega',

    type: 'desktop/bodega',

    init: function () {
        this.launcher = {
            text: 'Bodega',
            iconCls: 'resolucion-icon',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function () {
        var accesosAdministradorOpe = this.app.isAllowedTo('accesosAdministradorOpe', this.id);
        var accesosEjecutores = this.app.isAllowedTo('accesosEjecutores', this.id);
        var accesosSecretaria = this.app.isAllowedTo('accesosSecretaria', this.id);
        var accesosAdminResolucion = this.app.isAllowedTo('accesosAdminResolucion', this.id);

        finalizados = true;
        limiteresolucion = 100;
        this.selectResolucion = 0;
        selectResolucion = 0;
        select_retiro_bodega = 0;

        var acceso = (accesosEjecutores || accesosSecretaria) ? false : true
        var accesoLibroDiario = (accesosSecretaria || accesosEjecutores) ? false : true
        var accesoResoluciones = (accesosEjecutores || accesosAdminResolucion) ? true : false
        var accesoTotalesResoluciones = (accesosSecretaria || accesosEjecutores) ? false : true
        console.log("accesosAdministradorOpe ",accesosAdministradorOpe);
        console.log("accesosEjecutores ",accesosEjecutores);
        console.log("accesosSecretaria ",accesosSecretaria);
        console.log("accesosAdminResolucion ",accesosAdminResolucion);
        console.log("acceso ",acceso);

        var desktop = this.app.getDesktop();
        var AppMsg = new Ext.AppMsg({});

        var winWidth = desktop.getWinWidth();
        var winHeight = desktop.getWinHeight();

        var win = desktop.getWindow('grid-win-bodega');
        var urlBodegas = "modules/desktop/bodega/server/";

        var textFieldBienes = new Ext.form.TextField({allowBlank: true});
        var textFieldProductos = new Ext.form.TextField({allowBlank: true});
        var textFieldRetiros = new Ext.form.TextField({allowBlank: true});
        var textFieldNTLibroDiario = new Ext.form.TextField({allowBlank: false});
        var textFieldResolucionesLibroDiario = new Ext.form.TextField({allowBlank: false});
        var textFieldProvidenciasLibroDiario = new Ext.form.TextField({allowBlank: false});

        function formatDate(value) {
            return value ? value.dateFormat('Y-m-d H:i') : '';
        }

        function formatPositive(value) {
            return value<0 ? value*(-1) : value;
        }

        function formatDateMin(value) {
            return value ? value.dateFormat('Y-m-d') : '';
        }

        function formatDateFull(value) {
            return value ? value.dateFormat('Y-m-d H:i') : '';
        }

        // inicio combos resolucion
        //Inicio combo REINCIDENCIA
        storeREINCIDENCIA = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "No"},
                    {"id": 1, "nombre": "Si"}
                ]
            }
        });

        var comboREINCIDENCIA = new Ext.form.ComboBox({
            id: 'comboREINCIDENCIA',
            store: storeREINCIDENCIA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function functionREINCIDENCIA(id) {
            var index = storeREINCIDENCIA.find('id', id);
            if (index > -1) {
                var record = storeREINCIDENCIA.getAt(index);
                return record.get('nombre');
            }
        }
        //Fin combo REINCIDENCIA

        //Inicio combo TIPO DE UNIDAD RESOLUCION
        storeTIPOUNIDAD = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "UDC"},
                    {"id": 1, "nombre": "ASEO"}
                ]
            }
        });

        var comboTIPOUNIDAD = new Ext.form.ComboBox({
            id: 'comboTIPOUNIDAD',
            store: storeTIPOUNIDAD,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function funcionTIPOUNIDAD(id) {
            var index = storeTIPOUNIDAD.find('id', id);
            if (index > -1) {
                var record = storeTIPOUNIDAD.getAt(index);
                return record.get('nombre');
            }
        }
        //Fin combo TIPOUNIDAD RESOLUCION

        //Inicio combo TIPO ZONA EJECUCION
        storeTIPOZONA = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "UDCMCL"},
                    {"id": 1, "nombre": "UDTCL"},
                    {"id": 2, "nombre": "UMASA"}
                ]
            }
        });

        var comboTIPOZONA = new Ext.form.ComboBox({
            id: 'comboTIPOZONA',
            store: storeTIPOZONA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function funcionTIPOZONA(id) {
            var index = storeTIPOZONA.find('id', id);
            if (index > -1) {
                var record = storeTIPOZONA.getAt(index);
                return record.get('nombre');
            }
        }
        //Fin combo TIPOZONA EJECUCION


        //Inicio combo INICIADO POR
        storeINICIADOPOR = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "Auto de Flagrancia"},
                    {"id": 1, "nombre": "Auto ordinario"}
                ]
            }
        });

        var comboINICIADOPOR = new Ext.form.ComboBox({
            id: 'comboINICIADOPOR',
            store: storeINICIADOPOR,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function functionINICIADOPOR(id) {
            var index = storeINICIADOPOR.find('id', id);
            if (index > -1) {
                var record = storeINICIADOPOR.getAt(index);
                return record.get('nombre');
            }
        }
        //Fin combo INICIADO POR

        //Inicio combo MEDIDA CAUTELAR
        storeMEDIDACAUTELAR = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "Sin medida"},
                    {"id": 1, "nombre": "Clausura"},
                    {"id": 2, "nombre": "Suspención de actividad"},
                    {"id": 3, "nombre": "Retiro de bienes"}
                ]
            }
        });

        var comboMEDIDACAUTELAR = new Ext.form.ComboBox({
            id: 'comboMEDIDACAUTELAR',
            store: storeMEDIDACAUTELAR,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function functionMEDIDACAUTELAR(id) {
            var index = storeMEDIDACAUTELAR.find('id', id);
            if (index > -1) {
                var record = storeMEDIDACAUTELAR.getAt(index);
                return record.get('nombre');
            }
        }
        //Fin combo MEDIDA CAUTELAR


        //Inicio combo ESTADO
        storeESTADO = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "Levantado"},
                    {"id": 1, "nombre": "Continúa"}
                ]
            }
        });

        var comboESTADO = new Ext.form.ComboBox({
            id: 'comboESTADO',
            store: storeESTADO,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function functionESTADO(id) {
            var index = storeESTADO.find('id', id);
            if (index > -1) {
                var record = storeESTADO.getAt(index);
                return record.get('nombre');
            }
        }
        //Fin combo ESTADO

        //Inicio combo ESTADO EJECUCIÓN
        storeESTADOEjecucion = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": ""},
                    {"id": 1, "nombre": "Archivado"},
                    {"id": 2, "nombre": "Devuelto"},
                    {"id": 3, "nombre": "Por ejecutar"},
                    {"id": 4, "nombre": "Ejecutandose"},
                    {"id": 5, "nombre": "Para sorteo"},
                    {"id": 6, "nombre": "Recurso"},
                ]
            }
        });

        var comboESTADOEjecucion = new Ext.form.ComboBox({
            id: 'comboESTADOEjecucion',
            store: storeESTADOEjecucion,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function functionESTADOEjecucion(id) {
            var index = storeESTADOEjecucion.find('id', id);
            if (index > -1) {
                var record = storeESTADOEjecucion.getAt(index);
                return record.get('nombre');
            }
        }
        //Fin combo ESTADO EJECUCIÓN

        //Inicio combo ENVIO EXPEDIENTE
        storeENVIOEXPEDIENTE = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "Ejecución"},
                    {"id": 1, "nombre": "Instrucción"},
                    {"id": 2, "nombre": "Secretaría"},
                    {"id": 3, "nombre": "Apelación"}
                ]
            }
        });

        var comboENVIOEXPEDIENTE = new Ext.form.ComboBox({
            id: 'comboENVIOEXPEDIENTE',
            store: storeENVIOEXPEDIENTE,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function functionENVIOEXPEDIENTE(id) {
            var index = storeENVIOEXPEDIENTE.find('id', id);
            if (index > -1) {
                var record = storeENVIOEXPEDIENTE.getAt(index);
                return record.get('nombre');
            }
        }
        //Fin combo ESTADO

        //Inicio combo RESOLUCION DE
        storeRESOLUCIONDE = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "Por favor seleccione"},
                    {"id": 1, "nombre": "Sanción"},
                    {"id": 2, "nombre": "Archivo"},
                    {"id": 3, "nombre": "Nulidad"},
                    {"id": 4, "nombre": "Caducidad"},
                    {"id": 5, "nombre": "Anulado"}
                ]
            }
        });

        var comboRESOLUCIONDE = new Ext.form.ComboBox({
            id: 'comboRESOLUCIONDE',
            store: storeRESOLUCIONDE,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function functionRESOLUCIONDE(id) {
            var index = storeRESOLUCIONDE.find('id', id);
            if (index > -1) {
                var record = storeRESOLUCIONDE.getAt(index);
                return record.get('nombre');
            }
        }
        //Fin combo RESOLUCION DE

        //Inicio combo REPORTE RESOLUCION DE
        storeREPORTERESOLUCIONDE = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "Por favor seleccione"},
                    {"id": 1, "nombre": "Sanción"},
                    {"id": 2, "nombre": "Archivo"},
                    {"id": 3, "nombre": "Nulidad"},
                    {"id": 4, "nombre": "Caducidad"},
                    {"id": 5, "nombre": "Anulado"}
                ]
            }
        });

        var comboREPORTERESOLUCIONDE = new Ext.form.ComboBox({
            id: 'comboREPORTERESOLUCIONDE',
            store: storeREPORTERESOLUCIONDE,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function functionREPORTENTRESOLUCIONDE(id) {
            var index = storeREPORTENTRESOLUCIONDE.find('id', id);
            if (index > -1) {
                var record = storeREPORTENTRESOLUCIONDE.getAt(index);
                return record.get('nombre');
            }
        }
        //Fin combo RESOLUCION DE

        //Inicio combo REPORTE RESOLUCION DE
        storeREPORTENTRESOLUCIONDE = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "Por favor seleccione"},
                    {"id": 1, "nombre": "Sanción"},
                    {"id": 2, "nombre": "Archivo"},
                    {"id": 3, "nombre": "Nulidad"},
                    {"id": 4, "nombre": "Caducidad"},
                    {"id": 5, "nombre": "Anulado"}
                ]
            }
        });

        var comboREPORTENTRESOLUCIONDE = new Ext.form.ComboBox({
            id: 'comboREPORTENTRESOLUCIONDE',
            store: storeREPORTENTRESOLUCIONDE,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function functionREPORTERESOLUCIONDE(id) {
            var index = storeREPORTERESOLUCIONDE.find('id', id);
            if (index > -1) {
                var record = storeREPORTERESOLUCIONDE.getAt(index);
                return record.get('nombre');
            }
        }
        //Fin combo RESOLUCION DE

        //Inicio combo REPORTE PROVIDENCIAS RESOLUCION DE
        storeREPORTEPROVIDENCIASRESOLUCIONDE = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "Por favor seleccione"},
                    {"id": 1, "nombre": "Sanción"},
                    {"id": 2, "nombre": "Archivo"},
                    {"id": 3, "nombre": "Nulidad"},
                    {"id": 4, "nombre": "Caducidad"},
                    {"id": 5, "nombre": "Anulado"}
                ]
            }
        });

        var comboREPORTEPROVIDENCIASRESOLUCIONDE = new Ext.form.ComboBox({
            id: 'comboREPORTERPROVIDENCIASESOLUCIONDE',
            store: storeREPORTEPROVIDENCIASRESOLUCIONDE,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function functionREPORTEPROVIDENCIASRESOLUCIONDE(id) {
            var index = storeREPORTEPROVIDENCIASRESOLUCIONDE.find('id', id);
            if (index > -1) {
                var record = storeREPORTEPROVIDENCIASRESOLUCIONDE.getAt(index);
                return record.get('nombre');
            }
        }
        //Fin combo PROVIDENCIAS RESOLUCION DE


        //Inicio combo TIPO PROVIDENCIA
        storeTIPOPROVIDENCIA = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "Por favor seleccione"},
                    {"id": 1, "nombre": "Nulidad"},
                    {"id": 2, "nombre": "Subsanación"},
                    {"id": 3, "nombre": "Atención a escrito"},
                    {"id": 4, "nombre": "Subsanación"},
                    {"id": 5, "nombre": "Previo a resolver"},
                    {"id": 6, "nombre": "Copias"},
                    {"id": 7, "nombre": "Insistencia a informe"},
                    {"id": 8, "nombre": "Archivo"},
                    {"id": 9, "nombre": "Derecho a recurso"},
                    {"id": 10, "nombre": "Extensión del plazo"}
                ]
            }
        });

        var comboTIPOPROVIDENCIA = new Ext.form.ComboBox({
            id: 'comboTIPOPROVIDENCIA',
            store: storeTIPOPROVIDENCIA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function functionTIPOPROVIDENCIA(id) {
            var index = storeTIPOPROVIDENCIA.find('id', id);
            if (index > -1) {
                var record = storeTIPOPROVIDENCIA.getAt(index);
                return record.get('nombre');
            }
        }
        //Fin combo TIPO PROVIDENCIA


        //inicio combo ORDENANZA
        storeOrdenanza = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=ordenanzas'
        });

        var comboOrdenanza = new Ext.form.ComboBox({
            id: 'comboOrdenanza',
            store: storeOrdenanza,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function rendererOrdenanza(id) {
            var index = storeOrdenanza.findExact('id', id);
            if (index > -1) {
                var record = storeOrdenanza.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo ORDENANZA

        //inicio combo ORDENANZA EJECUCIÓN
        storeOrdenanzaEjecucion = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=ordenanzas'
        });

        var comboOrdenanzaEjecucion = new Ext.form.ComboBox({
            id: 'comboOrdenanzaEjecucion',
            store: storeOrdenanzaEjecucion,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function rendererOrdenanzaEjecucion(id) {
            var index = storeOrdenanzaEjecucion.findExact('id', id);
            if (index > -1) {
                var record = storeOrdenanzaEjecucion.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo ORDENANZA EJECUCIÓN

        //inicio combo ORDENANZATEMAS(ARTICULO Y NUMERAL)
        storeOrdenanzaTema = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=ordenanzastemas'
        });

        var comboOrdenanzaTema = new Ext.form.ComboBox({
            id: 'comboOrdenanzaTema',
            store: storeOrdenanzaTema,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function rendererOrdenanzaTema(id) {
            var index = storeOrdenanzaTema.findExact('id', id);
            if (index > -1) {
                var record = storeOrdenanzaTema.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo ORDENANZATEMAS

        //inicio combo UNIDAD
        storeUnidad = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=zonas'
        });

        var comboUnidad = new Ext.form.ComboBox({
            id: 'comboUnidad',
            store: storeUnidad,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function rendererUnidad(id) {
            var index = storeUnidad.findExact('id', id);
            if (index > -1) {
                var record = storeUnidad.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo UNIDAD

        //inicio combo UNIDAD EJECUCION
        storeUnidadEjecucion = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=zonas'
        });

        var comboUnidadEjecucion = new Ext.form.ComboBox({
            id: 'comboUnidadEjecucion',
            store: storeUnidadEjecucion,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function rendererUnidadEjecucion(id) {
            var index = storeUnidadEjecucion.findExact('id', id);
            if (index > -1) {
                var record = storeUnidadEjecucion.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo UNIDAD EJECUCION

        // inicio combo PERSONAL
        storePersonal = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalresolucion'
        });

        var comboPersonal = new Ext.form.ComboBox({
            id: 'comboPersonal',
            store: storePersonal,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function rendererPersonal(id) {
            var index = storePersonal.findExact('id', id);
            if (index > -1) {
                var record = storePersonal.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo PERSONAL


        // inicio combo PERSONAL EJECUCIÓN
        storePersonalEjecucion = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalejecucion'
        });

        var comboPersonalEjecucion = new Ext.form.ComboBox({
            id: 'comboPersonalEjecucion',
            store: storePersonalEjecucion,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function rendererPersonalEjecucion(id) {
            var index = storePersonalEjecucion.findExact('id', id);
            if (index > -1) {
                var record = storePersonalEjecucion.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo PERSONAL EJECUCIÓN

        //inicio combo PROVIDENCIA
        storeProvidencia = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=zonas'
        });

        var comboProvidencia = new Ext.form.ComboBox({
            id: 'comboProvidencia',
            store: storeProvidencia,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function rendererProvidencia(id) {
            var index = storeProvidencia.findExact('id', id);
            if (index > -1) {
                var record = storeProvidencia.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo PROVIDENCIA


        //inicio combo ORDENANZA2
        storeOrdenanza2 = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=ordenanzas'
        });

        var comboOrdenanza2 = new Ext.form.ComboBox({
            id: 'comboOrdenanza2',
            store: storeOrdenanza2,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function rendererOrdenanza2(id) {
            var index = storeOrdenanza2.findExact('id', id);
            if (index > -1) {
                var record = storeOrdenanza2.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo ORDENANZA2

        //inicio combo ORDENANZATEMAS2(ARTICULO Y NUMERAL)
        storeOrdenanzaTema2 = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=ordenanzastemas'
        });

        var comboOrdenanzaTema2 = new Ext.form.ComboBox({
            id: 'comboOrdenanzaTema2',
            store: storeOrdenanzaTema2,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function rendererOrdenanzaTema2(id) {
            var index = storeOrdenanzaTema2.findExact('id', id);
            if (index > -1) {
                var record = storeOrdenanzaTema2.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo ORDENANZATEMAS2

        //inicio combo UNIDAD2
        storeUnidad2 = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=zonas'
        });

        var comboUnidad2 = new Ext.form.ComboBox({
            id: 'comboUnidad2',
            store: storeUnidad2,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function rendererUnidad2(id) {
            var index = storeUnidad2.findExact('id', id);
            if (index > -1) {
                var record = storeUnidad2.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo UNIDAD2

        // inicio combo PERSONAL2
        storePersonal2 = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personal_distributivo'
        });

        var comboPersonal2 = new Ext.form.ComboBox({
            id: 'comboPersonal2',
            store: storePersonal2,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function rendererPersonal2(id) {
            var index = storePersonal2.findExact('id', id);
            if (index > -1) {
                var record = storePersonal2.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo UNIDAD2

        //inicio combo PROVIDENCIA2
        storeProvidencia2 = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=zonas'
        });

        var comboProvidencia2 = new Ext.form.ComboBox({
            id: 'comboProvidencia2',
            store: storeProvidencia2,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function rendererProvidencia2(id) {
            var index = storeProvidencia2.findExact('id', id);
            if (index > -1) {
                var record = storeProvidencia2.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo PROVIDENCIA2

// fin combos resolucion

// inicio pestañas de mantenimiento


// fin pestañas de mantenimiento

        // inicio ventana resolucion
        //Definición de url CRUD
        var proxyProducto = new Ext.data.HttpProxy({
            api: {
                create: urlBodegas + "crudProductos.php?operation=insert",
                read: urlBodegas + "crudProductos.php?operation=select",
                update: urlBodegas + "crudProductos.php?operation=update",
                destroy: urlBodegas + "crudProductos.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Resoluciones
        var readerResoluciones = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id_bodega', allowBlank: false},
                {name: 'producto', allowBlank: true},
                {name: 'estado_producto', allowBlank: true},
                {name: 'unidades_recibidas', allowBlank: true},
                {name: 'peso', allowBlank: true},


            ]
        });

        //Definición de escritura en campos bdd Resoluciones
        var writerResoluciones = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para módulo Resoluciones
        this.storeProducto = new Ext.data.Store({
            id: "idStoreProductos",
            proxy: proxyProducto,
            reader: readerResoluciones,
            writer: writerResoluciones,
            //autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            autoSave: true,
            remoteSort: true,
            autoSave: true,
            baseParams: {}
        });
        storeProducto = this.storeProducto;
        limiteresolucion = 100;
        storeProducto.baseParams = {
            limit: limiteresolucion
        };

        //Inicio formato grid Resoluciones
        this.gridProducto = new Ext.grid.EditorGridPanel({
            height: winHeight/2-100,
            store: this.storeProducto,
            columns: [
                //Definición de campos bdd Resoluciones
                new Ext.grid.RowNumberer(),
                {header: 'id', dataIndex: 'id', width: 100, hidden: true},
                {header: 'id_bodega', dataIndex: 'id', width: 100, hidden: true},
                {
                    header: 'Unidades recibidas',
                    dataIndex: 'unidades_recibidas',
                    allowBlank: true,
                    sortable: true,
                    width: 140,
                    editor: textFieldProductos
                },
                {
                    header: 'Producto',
                    dataIndex: 'producto',
                    allowBlank: true,
                    sortable: true,
                    width: 140,
                    editor: textFieldProductos
                },
                {
                    header: 'Estado producto',
                    dataIndex: 'estado_producto',
                    allowBlank: true,
                    sortable: true,
                    width: 140,
                    editor: textFieldProductos
                },
                {
                    header: 'Peso',
                    dataIndex: 'peso',
                    allowBlank: true,
                    sortable: true,
                    width: 140,
                    editor: textFieldProductos
                },

            ],
            viewConfig: {
                forceFit: false
            },
            sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteresolucion,
                store: storeProducto,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "No existen trámites que mostrar"
            }),
            listeners:{
                beforeedit: function (e) {
                    // si el operativo ya esta marcado como finalizado no se lo puede editar
                    if (acceso) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        });
        //Fin formato grid Resoluciones
        //Fin ventana resolucion Resoluciones

        // inicio ventana Libro Diario
        //Definición de url CRUD
        var proxyBodega = new Ext.data.HttpProxy({
            api: {
                create: urlBodegas + "crudBodega.php?operation=insert",
                read: urlBodegas + "crudBodega.php?operation=select",
                update: urlBodegas + "crudBodega.php?operation=update",
                destroy: urlBodegas + "crudBodega.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Libro Diario
        var readerBodega = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'fecha_retiro', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'fecha', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'fecha_devolucion', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'numero_retiros', allowBlank: true},
                {name: 'codigo', allowBlank: true},
                {name: 'perecible', allowBlank: true},
                {name: 'bien', allowBlank: true},
                {name: 'direccion_retiro', allowBlank: true},
                {name: 'donacion_institucion', allowBlank: true},
                {name: 'dado_baja', allowBlank: true},
                {name: 'en_bodega', allowBlank: true},
                {name: 'devolucion', allowBlank: true},
                {name: 'unidad', allowBlank: true},
                {name: 'observaciones', allowBlank: true},

            ]
        });

        //Definición de escritura en campos bdd Libro Diario
        var writerBodega = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para módulo Libro Diario
        this.storeBodega = new Ext.data.Store({
            id: "idStoreLibroDiario",
            proxy: proxyBodega,
            reader: readerBodega,
            writer: writerBodega,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            autoSave: true,
            baseParams: {}
        });

        storeBodega = this.storeBodega;
        limiteresolucion = 100;
        storeBodega.baseParams = {
            limit: limiteresolucion,
            //accesosEjecutores : accesosEjecutores
        };

        this.storeBodega.load();

        //Inicio formato grid Libro Diario
        this.gridBodega = new Ext.grid.EditorGridPanel({
            height: winHeight / 2 - 50,  //CC ESTRUCTURA DE 2
            //height: winHeight-110, //CC ESTRUCTURA DE 1
            store: this.storeBodega,
            columns: [
                //Definición de campos bdd Libro Diario
                new Ext.grid.RowNumberer(),
                {header: 'id', dataIndex: 'id', width: 100, hidden: true, editor: textFieldRetiros},
                {
                    header: 'Número Retiros',
                    dataIndex: 'numero_retiros',
                    allowBlank: true,
                    sortable: true,
                    hidden: true,
                    editor: textFieldRetiros,
                    width: 100
                },
                {
                    header: 'Código',
                    dataIndex: 'codigo',
                    allowBlank: true,
                    sortable: true,
                    editor: textFieldRetiros,
                    width: 120
                },
                {
                    header: 'Perecible',
                    dataIndex: 'perecible',
                    allowBlank: true,
                    sortable: true,
                    editor: textFieldRetiros,
                    width: 70
                },
                {
                    header: 'Bienes',
                    dataIndex: 'bien',
                    allowBlank: true,
                    sortable: true,
                    editor: textFieldRetiros,
                    width: 500
                },
                {
                    header: 'Direccion Retiro',
                    dataIndex: 'direccion_retiro',
                    allowBlank: true,
                    sortable: true,
                    editor: textFieldRetiros,
                    width: 250
                },
                {
                    header: 'Donacion Institucion',
                    dataIndex: 'donacion_institucion',
                    allowBlank: true,
                    sortable: true,
                    editor: textFieldRetiros,
                    width: 120
                },
                {
                    header: 'Dado Baja',
                    dataIndex: 'dado_baja',
                    allowBlank: true,
                    sortable: true,
                    editor: textFieldRetiros,
                    width: 80
                },
                {
                    header: 'En Bodega',
                    dataIndex: 'en_bodega',
                    allowBlank: true,
                    sortable: true,
                    editor: textFieldRetiros,
                    width: 80
                },
                {
                    header: 'Devolución',
                    dataIndex: 'devolucion',
                    allowBlank: true,
                    sortable: true,
                    editor: textFieldRetiros,
                    width: 80
                },
                {
                    header: 'Unidad',
                    dataIndex: 'unidad',
                    allowBlank: true,
                    sortable: true,
                    editor: textFieldRetiros,
                    width: 80
                },
                {
                    header: 'Observaciones',
                    dataIndex: 'observaciones',
                    allowBlank: true,
                    sortable: true,
                    editor: textFieldRetiros,
                    width: 100
                },
               {
                    header: 'Fecha Retiro',
                    dataIndex: 'fecha_retiro',
                    allowBlank: true,
                    sortable: true,
                    width: 80,
                    editor: new Ext.form.DateField({
                        format: 'Y-m-d'
                    }),
                    renderer: Ext.util.Format.dateRenderer('Y-m-d')
                },
               {
                    header: 'Fecha',
                    dataIndex: 'fecha',
                    allowBlank: true,
                    sortable: true,
                    width: 80,
                    editor: new Ext.form.DateField({
                       format: 'Y-m-d'
                   }),
                    renderer: Ext.util.Format.dateRenderer('Y-m-d')
                },
               {
                    header: 'Fecha Devolución',
                    dataIndex: 'fecha_devolucion',
                    allowBlank: true,
                    sortable: true,
                    width: 100,
                    editor: new Ext.form.DateField({
                       format: 'Y-m-d'
                   }),
                    renderer: Ext.util.Format.dateRenderer('Y-m-d')
                },

            ],
            viewConfig: {
                forceFit: false
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: function (sm, row, rec) {
                        // recuperamos la informacion de personal asignado a ese operativo
                        select_retiro_bodega = rec.id;
                        storeProvidencias.baseParams.id =  rec.id;
                        storeProducto.baseParams.id =  rec.id;
                        storeProducto.load();
                        storeProvidencias.load();
                        // storeProducto.load({params: {id: rec.id}});
                        // storeProvidencias.load({params: {id: rec.id}});
                        libroDiarioSeleccionado = rec.id;
                        // {params: id: libroDiarioSeleccionado
                        //inspeccionSeleccionada = rec.id_denuncia;
                        // Ext.getCmp('botonExportarActaIngreso').setDisabled(false);
                        // Ext.getCmp('btnEliminarResoluciones').setDisabled(false);
                        // Ext.getCmp('btnNuevoProvidencias').setDisabled(false);
                        // Ext.getCmp('btnEliminarProvidencias').setDisabled(false);
                    }
                }
            }),
            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteresolucion,
                store: storeBodega,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "No existen trámites que mostrar"
            }),
            listeners:{
                beforeedit: function (e) {
                    // si el operativo ya esta marcado como finalizado no se lo puede editar
                    if (accesoLibroDiario) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        });
        //Fin formato grid Libro Diario
        //Fin ventana resolucion Libro Diario


        // inicio ventana Reporte Libro Diario
        //Definición de url CRUD
        var proxyReporteLibroDiario = new Ext.data.HttpProxy({
            api: {
                create: urlBodegas + "crudReporteLibroDiario.php?operation=insert",
                read: urlBodegas + "crudReporteLibroDiario.php?operation=select",
                update: urlBodegas + "crudReporteLibroDiario.php?operation=update",
                destroy: urlBodegas + "crudReporteLibroDiario.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Libro Diario
        var readerReporteLibroDiario = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'memo_ingreso_ejecucion', allowBlank: false},
                {name: 'fecha_ingreso_ejecucion', allowBlank: false},
                {name: 'numero_expediente_ejecucion', allowBlank: false},
                {name: 'anio_ejecucion', allowBlank: false},
                {name: 'fojas_ejecucion', allowBlank: false},
                {name: 'nombre_administrado_ejecucion', allowBlank: false},
                {name: 'nombre_establecimiento_ejecucion', allowBlank: false},
                {name: 'ordenanza_ejecucion', allowBlank: false},
                {name: 'articulo_ejecucion', allowBlank: false},
                {name: 'estado', allowBlank: false},
                {name: 'funcionario_ejecutor_ejecucion', allowBlank: false},
                {name: 'fecha_sorteo_ejecucion', allowBlank: false},
                {name: 'observaciones_ejecucion', allowBlank: false},
                {name: 'memo_ingreso', allowBlank: false},
                {name: 'numero_interno', allowBlank: false},
                {name: 'numero_resolucion', allowBlank: false},
                {name: 'fecha_resolucion', allowBlank: false},
                {name: 'articulo_actual', allowBlank: false},
                {name: 'resolucion_de', allowBlank: false},
                {name: 'multa_impuesta', allowBlank: false},
                {name: 'fecha_ingreso', allowBlank: false},
                {name: 'unidad', allowBlank: false},
                {name: 'unidad_ejecucion', allowBlank: false},
                {name: 'tipo_zona_ejecucion', allowBlank: false},
                {name: 'tipo_unidad', allowBlank: false},
                {name: 'numero_expediente', allowBlank: false},
                {name: 'nombre_administrado', allowBlank: false},
                {name: 'nombre_establecimiento', allowBlank: false},
                {name: 'direccion_notificacion', allowBlank: false},
                {name: 'direccion_domicilio', allowBlank: false},
                {name: 'cedula_ruc', allowBlank: false},
                {name: 'reincidencia', allowBlank: false},
                {name: 'ordenanza', allowBlank: false},
                // {name: 'articulo_numeral', allowBlank: false},
                {name: 'iniciado_por', allowBlank: false},
                {name: 'entidad', allowBlank: false},
                {name: 'numero_informe', allowBlank: false},
                {name: 'medida_cautelar', allowBlank: false},
                {name: 'estado', allowBlank: false},
                {name: 'funcionario', allowBlank: false},
                {name: 'envio_expediente', allowBlank: false},
                {name: 'fecha_envio', allowBlank: false},
                {name: 'fecha_sorteo', allowBlank: false},
                {name: 'numero_memorando', allowBlank: false}
            ]
        });

        //Definición de escritura en campos bdd Libro Diario
        var writerReporteLibroDiario = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para módulo Libro Diario
        this.storeReporteLibroDiario = new Ext.data.Store({
            id: "idStoreLibroDiario",
            proxy: proxyReporteLibroDiario,
            reader: readerReporteLibroDiario,
            writer: writerReporteLibroDiario,
            // autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            autoSave: true,
            // baseParams: {
            //     test:1,
            //     accesosEjecutores:this.accesosEjecutores
            // }
        });

        storeReporteLibroDiario = this.storeReporteLibroDiario;
        limiteresolucion = 100;
        storeReporteLibroDiario.baseParams = {
            limit: limiteresolucion,
            accesosEjecutores : accesosEjecutores
        };

        this.storeReporteLibroDiario.load();

        //Inicio formato grid Reportes Libro Diario
        this.gridReporteLibroDiario = new Ext.grid.EditorGridPanel({
            height: winHeight / 2 + 50,
            store: this.storeReporteLibroDiario,
            columns: [
                //Definición de campos bdd Libro Diario
                new Ext.grid.RowNumberer(),
                {header: 'id', dataIndex: 'id', width: 100, hidden: true, editor: textFieldResolucionesLibroDiario},
                {
                    header: 'Números de Resolución',
                    dataIndex: 'numero_resolucion',
                    allowBlank: true,
                    sortable: true,
                    width: 120,
                    // editor: textFieldLibroDiario
                },
                {
                    header: 'Fecha de Resolucion',
                    dataIndex: 'fecha_resolucion',
                    sortable: true,
                    width: 120,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    // editor: new Ext.form.DateField({
                    //     format: 'Y-m-d'
                    // })
                },
                {
                    header: 'Artículo Actual',
                    dataIndex: 'articulo_actual',
                    allowBlank: true,
                    sortable: true,
                    width: 100,
                    // editor: textFieldLibroDiario
                },
                {
                    header: 'Resolucion de',
                    dataIndex: 'resolucion_de',
                    allowBlank: true,
                    width: 140,
                    // editor: comboRESOLUCIONDE,
                    renderer: functionREPORTERESOLUCIONDE
                },
                {
                    header: 'Multa impuesta',
                    dataIndex: 'multa_impuesta',
                    allowBlank: true,
                    width: 100,
                    renderer: 'usMoney',
                },
                {
                    header: 'Número Interno',
                    dataIndex: 'numero_interno',
                    allowBlank: true,
                    sortable: true,
                    width: 120,
                    // editor: textFieldLibroDiario
                },
                {
                    header: 'Número de Expediente',
                    dataIndex: 'numero_expediente',
                    allowBlank: true,
                    sortable: true,
                    width: 120,
                    // editor: textFieldResolucionesLibroDiario
                },
                // {header: 'Memo Ingreso', dataIndex: 'memo_ingreso', allowBlank: true, sortable: true, width: 150, editor: textFieldLibroDiario},
                {
                    header: 'Fecha de Ingreso',
                    dataIndex: 'fecha_ingreso',
                    sortable: true,
                    width: 100,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    editor: new Ext.form.DateField({
                        format: 'Y-m-d'
                    })
                },
                {
                    header: 'Unidad',
                    dataIndex: 'unidad',
                    allowBlank: true,
                    sortable: true,
                    width: 100,
                    // editor: comboUnidad,
                    renderer: rendererUnidad2
                },                {
                    header: 'Tipo Unidad',
                    dataIndex: 'tipo_unidad',
                    allowBlank: true,
                    sortable: true,
                    width: 100,
                    // editor: comboTIPOUNIDAD,
                    renderer: funcionTIPOUNIDAD
                },

                {
                    header: 'Nombre del Administrado',
                    dataIndex: 'nombre_administrado',
                    allowBlank: true,
                    sortable: true,
                    width: 250,
                    // editor: textFieldResolucionesLibroDiario
                },
                {
                    header: 'Nombre del Establecimiento',
                    dataIndex: 'nombre_establecimiento',
                    allowBlank: true,
                    sortable: true,
                    width: 180,
                    // editor: textFieldResolucionesLibroDiario
                },
                {header: 'Cédula o Ruc', dataIndex: 'cedula_ruc', allowBlank: true, sortable: true, width: 100,
                    // editor: textFieldResolucionesLibroDiario
                },
                {header: 'Reincidencia', dataIndex: 'reincidencia', allowBlank: true, sortable: true, width: 80,
                    // editor: comboREINCIDENCIA,
                    renderer: functionREINCIDENCIA
                },
                {
                    header: 'Dirección de Notificación',
                    dataIndex: 'direccion_notificacion',
                    allowBlank: true,
                    sortable: true,
                    width: 250,
                    // editor: textFieldResolucionesLibroDiario
                },
                {
                    header: 'Dirección de Domicilio',
                    dataIndex: 'direccion_domicilio',
                    allowBlank: true,
                    sortable: true,
                    width: 250,
                    // editor: textFieldResolucionesLibroDiario
                },
                {
                    header: 'Nombre de Administrado',
                    dataIndex: 'nombre_administrado',
                    allowBlank: true,
                    sortable: true,
                    width: 250,
                    // editor: textFieldResolucionesLibroDiario
                },
                //{header: 'Número de Predio', dataIndex: 'numero_predio', allowBlank:true, width: 100, editor: textField},
                {
                    header: 'Ordenanza',
                    dataIndex: 'ordenanza',
                    allowBlank: true,
                    sortable: true,
                    width: 180,
                    // editor: comboOrdenanza,
                    renderer: rendererOrdenanza
                },
                // {
                //     header: 'Artículo y numeral',
                //     dataIndex: 'articulo_numeral',
                //     allowBlank: true,
                //     width: 300,
                //     editor: comboOrdenanzaTema,
                //     renderer: rendererOrdenanzaTema
                // },
                {header: 'Iniciado por', dataIndex: 'iniciado_por', allowBlank: true, sortable: true, width: 120,
                    // editor: comboINICIADOPOR,
                    renderer: functionINICIADOPOR
                },
                {header: 'Entidad', dataIndex: 'entidad', allowBlank: true, sortable: true, width: 200,
                    // editor: textFieldResolucionesLibroDiario
                },
                {
                    header: 'Número de Informe',
                    dataIndex: 'numero_informe',
                    allowBlank: true,
                    sortable: true,
                    width: 150,
                    // editor: textFieldResolucionesLibroDiario
                },
                {
                    header: 'Medida Cautelar',
                    dataIndex: 'medida_cautelar',
                    allowBlank: true,
                    sortable: true,
                    width: 150,
                    // editor: comboMEDIDACAUTELAR,
                    renderer: functionMEDIDACAUTELAR
                },
                {header: 'Estado', dataIndex: 'estado', allowBlank: true, sortable: true, width: 80,
                    // editor: comboESTADO,
                    renderer: functionESTADO},
                {
                    header: 'Funcionario',
                    dataIndex: 'funcionario',
                    allowBlank: true,
                    sortable: true,
                    width: 300,
                    // editor: comboPersonal,
                    renderer: rendererPersonal
                },
                {
                    header: 'Fecha de Sorteo',
                    dataIndex: 'fecha_sorteo',
                    sortable: true,
                    width: 100,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    // editor: new Ext.form.DateField({
                    //     format: 'Y-m-d'
                    // })
                },
                {
                    header: 'Envio Expediente',
                    dataIndex: 'envio_expediente',
                    allowBlank: true,
                    sortable: true,
                    width: 100,
                    // editor: comboENVIOEXPEDIENTE,
                    renderer: functionENVIOEXPEDIENTE
                },
                {
                    header: 'Número de memorando',
                    dataIndex: 'numero_memorando',
                    allowBlank: true,
                    sortable: true,
                    width: 250,
                    // editor: textFieldResolucionesLibroDiario
                },
                {
                    header: 'Fecha de Envío',
                    dataIndex: 'fecha_envio',
                    sortable: true,
                    width: 100,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    // editor: new Ext.form.DateField({
                    //     format: 'Y-m-d'
                    // })
                },

            ],
            viewConfig: {
                forceFit: false
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: function (sm, row, rec) {
                        // recuperamos la informacion de personal asignado a ese operativo
                        //select_codigo_tramite = rec.id;
                        storeProvidencias.baseParams.id =  rec.id;
                        storeProducto.baseParams.id =  rec.id;
                        storeProducto.load();
                        storeProvidencias.load();
                        // storeProducto.load({params: {id: rec.id}});
                        // storeProvidencias.load({params: {id: rec.id}});
                        libroDiarioSeleccionado = rec.id;
                        // {params: id: libroDiarioSeleccionado
                        //inspeccionSeleccionada = rec.id_denuncia;
                    }
                }
            }),
            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteresolucion,
                store: storeReporteLibroDiario,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "No existen trámites que mostrar"
            }),
            listeners:{
                beforeedit: function (e) {
                    // si el operativo ya esta marcado como finalizado no se lo puede editar
                    if (!accesosEjecutores) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        });
        //Fin formato grid Libro Diario
        //Fin ventana resolucion Libro Diario


        // inicio ventana Reporte NT Libro Diario
        //Definición de url CRUD
        var proxyReporteNTLibroDiario = new Ext.data.HttpProxy({
            api: {
                create: urlBodegas + "crudReporteNoTramitados.php?operation=insert",
                read: urlBodegas + "crudReporteNoTramitados.php?operation=select",
                update: urlBodegas + "crudReporteNoTramitados.php?operation=update",
                destroy: urlBodegas + "crudReporteNoTramitados.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Libro Diario
        var readerReporteNTLibroDiario = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'memo_ingreso', allowBlank: false},
                {name: 'numero_interno', allowBlank: false},
                {name: 'numero_resolucion', allowBlank: false},
                {name: 'fecha_resolucion', allowBlank: false},
                {name: 'articulo_actual', allowBlank: false},
                {name: 'resolucion_de', allowBlank: false},
                {name: 'multa_impuesta', allowBlank: false},
                {name: 'fecha_ingreso', allowBlank: false},
                {name: 'unidad', allowBlank: false},
                {name: 'tipo_unidad', allowBlank: false},
                {name: 'numero_expediente', allowBlank: false},
                {name: 'nombre_administrado', allowBlank: false},
                {name: 'nombre_establecimiento', allowBlank: false},
                {name: 'direccion_notificacion', allowBlank: false},
                {name: 'direccion_domicilio', allowBlank: false},
                {name: 'cedula_ruc', allowBlank: false},
                {name: 'reincidencia', allowBlank: false},
                {name: 'ordenanza', allowBlank: false},
                // {name: 'articulo_numeral', allowBlank: false},
                {name: 'iniciado_por', allowBlank: false},
                {name: 'entidad', allowBlank: false},
                {name: 'numero_informe', allowBlank: false},
                {name: 'medida_cautelar', allowBlank: false},
                {name: 'estado', allowBlank: false},
                {name: 'funcionario', allowBlank: false},
                {name: 'envio_expediente', allowBlank: false},
                {name: 'fecha_envio', allowBlank: false},
                {name: 'fecha_sorteo', allowBlank: false},
                {name: 'numero_memorando', allowBlank: false}
            ]
        });

        //Definición de escritura en campos bdd Libro Diario
        var writerReporteNTLibroDiario = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para módulo Libro Diario
        this.storeReporteNTLibroDiario = new Ext.data.Store({
            id: "idStoreNTLibroDiario",
            proxy: proxyReporteNTLibroDiario,
            reader: readerReporteNTLibroDiario,
            writer: writerReporteNTLibroDiario,
            // autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            autoSave: true,
            // baseParams: {
            //     test:1,
            //     accesosEjecutores:this.accesosEjecutores
            // }
        });

        storeReporteNTLibroDiario = this.storeReporteNTLibroDiario;
        limiteresolucion = 100;
        storeReporteNTLibroDiario.baseParams = {
            limit: limiteresolucion,
            accesosEjecutores : accesosEjecutores
        };

        this.storeReporteNTLibroDiario.load();

        //Inicio formato grid Reportes Libro Diario
        this.gridReporteNTLibroDiario = new Ext.grid.EditorGridPanel({
            height: winHeight / 2 + 50,
            store: this.storeReporteNTLibroDiario,
            columns: [
                //Definición de campos bdd Libro Diario
                new Ext.grid.RowNumberer(),
                {header: 'id', dataIndex: 'id', width: 100, hidden: true, editor: textFieldNTLibroDiario},
                {header: 'Memo Ingreso', dataIndex: 'memo_ingreso', allowBlank: true, sortable: true, width: 100, editor: textFieldNTLibroDiario},
                {
                    header: 'Número Interno',
                    dataIndex: 'numero_interno',
                    allowBlank: true,
                    sortable: true,
                    width: 120,
                    editor: textFieldNTLibroDiario
                },
                {
                    header: 'Fecha de Ingreso',
                    dataIndex: 'fecha_ingreso',
                    sortable: true,
                    width: 110,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    editor: new Ext.form.DateField({
                        format: 'Y-m-d'
                    })
                },
                {
                    header: 'Unidad',
                    dataIndex: 'unidad',
                    allowBlank: true,
                    sortable: true,
                    width: 100,
                    editor: comboUnidad,
                    renderer: rendererUnidad
                },
                {
                    header: 'Tipo Unidad',
                    dataIndex: 'tipo_unidad',
                    allowBlank: true,
                    sortable: true,
                    width: 80,
                    editor: comboTIPOUNIDAD,
                    renderer: funcionTIPOUNIDAD
                },
                {
                    header: 'Número de Expediente',
                    dataIndex: 'numero_expediente',
                    allowBlank: true,
                    sortable: true,
                    width: 120,
                    editor: textFieldNTLibroDiario
                },
                {
                    header: 'Nombre de Administrado',
                    dataIndex: 'nombre_administrado',
                    allowBlank: true,
                    sortable: true,
                    width: 250,
                    editor: textFieldNTLibroDiario
                },
                {
                    header: 'Nombre del Establecimiento',
                    dataIndex: 'nombre_establecimiento',
                    allowBlank: true,
                    sortable: true,
                    width: 180,
                    editor: textFieldNTLibroDiario
                },
                {header: 'Cédula o Ruc', dataIndex: 'cedula_ruc', allowBlank: true, sortable: true, width: 100, editor: textFieldNTLibroDiario},
                {header: 'Reincidencia', dataIndex: 'reincidencia', allowBlank: true, sortable: true, width: 80, editor: comboREINCIDENCIA,
                    renderer: functionREINCIDENCIA
                },
                {
                    header: 'Dirección de Notificación',
                    dataIndex: 'direccion_notificacion',
                    allowBlank: true,
                    sortable: true,
                    width: 250,
                    editor: textFieldNTLibroDiario
                },
                {
                    header: 'Dirección de Domicilio',
                    dataIndex: 'direccion_domicilio',
                    allowBlank: true,
                    sortable: true,
                    width: 250,
                    editor: textFieldNTLibroDiario
                },
                {
                    header: 'Nombre del Administrado',
                    dataIndex: 'nombre_administrado',
                    allowBlank: true,
                    sortable: true,
                    width: 250,
                    editor: textFieldNTLibroDiario
                },
                //{header: 'Número de Predio', dataIndex: 'numero_predio', allowBlank:true, width: 100, editor: textField},
                {
                    header: 'Ordenanza',
                    dataIndex: 'ordenanza',
                    allowBlank: true,
                    sortable: true,
                    width: 180,
                    editor: comboOrdenanza,
                    renderer: rendererOrdenanza
                },
                // {
                //     header: 'Artículo y numeral',
                //     dataIndex: 'articulo_numeral',
                //     allowBlank: true,
                //     width: 300,
                //     editor: comboOrdenanzaTema,
                //     renderer: rendererOrdenanzaTema
                // },
                {header: 'Iniciado por', dataIndex: 'iniciado_por', allowBlank: true, sortable: true, width: 120, editor: comboINICIADOPOR,
                    renderer: functionINICIADOPOR
                },
                {header: 'Entidad', dataIndex: 'entidad', allowBlank: true, sortable: true, width: 200, editor: textFieldNTLibroDiario},
                {
                    header: 'Número de Informe',
                    dataIndex: 'numero_informe',
                    allowBlank: true,
                    sortable: true,
                    width: 150,
                    editor: textFieldNTLibroDiario
                },
                {
                    header: 'Medida Cautelar',
                    dataIndex: 'medida_cautelar',
                    allowBlank: true,
                    sortable: true,
                    width: 150,
                    editor: comboMEDIDACAUTELAR,
                    renderer: functionMEDIDACAUTELAR
                },
                {header: 'Estado', dataIndex: 'estado', allowBlank: true, sortable: true, width: 80, editor: comboESTADO,
                    renderer: functionESTADO},
                {
                    header: 'Funcionario',
                    dataIndex: 'funcionario',
                    allowBlank: true,
                    sortable: true,
                    width: 300,
                    editor: comboPersonal,
                    renderer: rendererPersonal
                },
                {
                    header: 'Fecha de Sorteo',
                    dataIndex: 'fecha_sorteo',
                    sortable: true,
                    width: 100,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    editor: new Ext.form.DateField({
                        format: 'Y-m-d'
                    })
                },
                {
                    header: 'Envio Expediente',
                    dataIndex: 'envio_expediente',
                    allowBlank: true,
                    sortable: true,
                    width: 100,
                    editor: comboENVIOEXPEDIENTE,
                    renderer: functionENVIOEXPEDIENTE
                },
                {
                    header: 'Número de Memorando',
                    dataIndex: 'numero_memorando',
                    allowBlank: true,
                    sortable: true,
                    width: 150,
                    editor: textFieldNTLibroDiario
                },
                {
                    header: 'Fecha de Envío',
                    dataIndex: 'fecha_envio',
                    sortable: true,
                    width: 100,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    editor: new Ext.form.DateField({
                        format: 'Y-m-d'
                    })
                },

            ],
            viewConfig: {
                forceFit: false
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: function (sm, row, rec) {
                        // recuperamos la informacion de personal asignado a ese operativo
                        //select_codigo_tramite = rec.id;
                        storeProvidencias.baseParams.id =  rec.id;
                        storeProducto.baseParams.id =  rec.id;
                        storeProducto.load();
                        storeProvidencias.load();
                        // storeProducto.load({params: {id: rec.id}});
                        // storeProvidencias.load({params: {id: rec.id}});
                        libroDiarioSeleccionado = rec.id;
                        // {params: id: libroDiarioSeleccionado
                        //inspeccionSeleccionada = rec.id_denuncia;
                    }
                }
            }),
            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteresolucion,
                store: storeReporteNTLibroDiario,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "No existen trámites que mostrar"
            }),
            listeners:{
                beforeedit: function (e) {
                    // si el operativo ya esta marcado como finalizado no se lo puede editar
                    if (!accesosEjecutores) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        });
        //Fin formato grid Libro Diario
        //Fin ventana resolucion Libro Diario

        // inicio ventana Reporte Providencias Libro Diario
        //Definición de url CRUD
        var proxyReporteProvidenciasLibroDiario = new Ext.data.HttpProxy({
            api: {
                create: urlBodegas + "crudReporteProvidencias.php?operation=insert",
                read: urlBodegas + "crudReporteProvidencias.php?operation=select",
                update: urlBodegas + "crudReporteProvidencias.php?operation=update",
                destroy: urlBodegas + "crudReporteProvidencias.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Libro Diario
        var readerReporteProvidenciasLibroDiario = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'numero_providencia', allowBlank: false},
                {name: 'fecha_providencia', allowBlank: false},
                {name: 'tipo_providencia', allowBlank: false},
                {name: 'fecha_providencia', allowBlank: false},
                {name: 'memo_ingreso', allowBlank: false},
                {name: 'numero_interno', allowBlank: false},
                {name: 'fecha_ingreso', allowBlank: false},
                {name: 'unidad', allowBlank: false},
                {name: 'tipo_unidad', allowBlank: false},
                {name: 'numero_expediente', allowBlank: false},
                {name: 'nombre_administrado', allowBlank: false},
                {name: 'nombre_establecimiento', allowBlank: false},
                {name: 'direccion_notificacion', allowBlank: false},
                {name: 'direccion_domicilio', allowBlank: false},
                {name: 'cedula_ruc', allowBlank: false},
                {name: 'reincidencia', allowBlank: false},
                {name: 'ordenanza', allowBlank: false},
                // {name: 'articulo_numeral', allowBlank: false},
                {name: 'iniciado_por', allowBlank: false},
                {name: 'entidad', allowBlank: false},
                {name: 'numero_informe', allowBlank: false},
                {name: 'medida_cautelar', allowBlank: false},
                {name: 'estado', allowBlank: false},
                {name: 'funcionario', allowBlank: false},
                {name: 'envio_expediente', allowBlank: false},
                {name: 'fecha_envio', allowBlank: false},
                {name: 'fecha_sorteo', allowBlank: false},
                {name: 'numero_memorando', allowBlank: false}
            ]
        });

        //Definición de escritura en campos bdd Libro Diario
        var writerReporteProvidenciasLibroDiario = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para módulo Libro Diario
        this.storeReporteProvidenciasLibroDiario = new Ext.data.Store({
            id: "idStoreProvidenciasLibroDiario",
            proxy: proxyReporteProvidenciasLibroDiario,
            reader: readerReporteProvidenciasLibroDiario,
            writer: writerReporteProvidenciasLibroDiario,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            autoSave: true,
            baseParams: {}
        });

        storeReporteProvidenciasLibroDiario = this.storeReporteProvidenciasLibroDiario;
        limiteresolucion = 100;
        storeReporteProvidenciasLibroDiario.baseParams = {
            limit: limiteresolucion,
            accesosEjecutores : accesosEjecutores
        };

        this.storeReporteProvidenciasLibroDiario.load();

        //Inicio formato grid Reportes Providencias Libro Diario
        this.gridReporteProvidenciasLibroDiario = new Ext.grid.EditorGridPanel({
            height: winHeight / 2 + 50,
            store: this.storeReporteProvidenciasLibroDiario,
            columns: [
                //Definición de campos bdd Libro Diario
                new Ext.grid.RowNumberer(),
                {header: 'id', dataIndex: 'id', width: 100, hidden: true, editor: textFieldProvidenciasLibroDiario},
                {
                    header: 'Número de Providencia',
                    dataIndex: 'numero_providencia',
                    allowBlank: true,
                    sortable: true,
                    width: 120,
                    // editor: textFieldLibroDiario
                },
                {
                    header: 'Fecha de Providencia',
                    dataIndex: 'fecha_providencia',
                    sortable: true,
                    width: 140,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    // editor: new Ext.form.DateField({
                    //     format: 'Y-m-d'
                    // })
                },
                {
                    header: 'Tipo de Providencia',
                    dataIndex: 'tipo_providencia',
                    allowBlank: true,
                    sortable: true,
                    width: 120,
                    // editor: comboTIPOPROVIDENCIA,
                    renderer: functionTIPOPROVIDENCIA
                    // editor: textFieldLibroDiario
                },
                {
                    header: 'Número Interno',
                    dataIndex: 'numero_interno',
                    allowBlank: true,
                    sortable: true,
                    width: 120,
                    // editor: textFieldLibroDiario
                },
                {
                    header: 'Número de Expediente',
                    dataIndex: 'numero_expediente',
                    allowBlank: true,
                    sortable: true,
                    width: 120,
                    // editor: textFieldProvidenciasLibroDiario
                },
                // {header: 'Memo Ingreso', dataIndex: 'memo_ingreso', allowBlank: true, sortable: true, width: 150, editor: textFieldLibroDiario},
                {
                    header: 'Fecha de Ingreso',
                    dataIndex: 'fecha_ingreso',
                    sortable: true,
                    width: 100,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    // editor: new Ext.form.DateField({
                    //     format: 'Y-m-d'
                    // })
                },
                {
                    header: 'Unidad',
                    dataIndex: 'unidad',
                    allowBlank: true,
                    sortable: true,
                    width: 100,
                    // editor: comboUnidad,
                    renderer: rendererUnidad
                },                {
                    header: 'Tipo Unidad',
                    dataIndex: 'tipo_unidad',
                    allowBlank: true,
                    sortable: true,
                    width: 100,
                    // editor: comboTIPOUNIDAD,
                    renderer: funcionTIPOUNIDAD
                },

                {
                    header: 'Nombre de Administrado',
                    dataIndex: 'nombre_administrado',
                    allowBlank: true,
                    sortable: true,
                    width: 250,
                    // editor: textFieldProvidenciasLibroDiario
                },
                {
                    header: 'Nombre del Establecimiento',
                    dataIndex: 'nombre_establecimiento',
                    allowBlank: true,
                    sortable: true,
                    width: 180,
                    // editor: textFieldProvidenciasLibroDiario
                },
                {header: 'Cédula o Ruc', dataIndex: 'cedula_ruc', allowBlank: true, sortable: true, width: 100,
                    // editor: textFieldLibroDiario
                },
                {header: 'Reincidencia', dataIndex: 'reincidencia', allowBlank: true, sortable: true, width: 80,
                    // editor: comboREINCIDENCIA,
                    renderer: functionREINCIDENCIA
                },
                {
                    header: 'Dirección de Notificación',
                    dataIndex: 'direccion_notificacion',
                    allowBlank: true,
                    sortable: true,
                    width: 250,
                    // editor: textFieldProvidenciasLibroDiario
                },
                {
                    header: 'Dirección de Domicilio',
                    dataIndex: 'direccion_domicilio',
                    allowBlank: true,
                    sortable: true,
                    width: 250,
                    // editor: textFieldProvidenciasLibroDiario
                },
                {
                    header: 'Nombre de Administrado',
                    dataIndex: 'nombre_administrado',
                    allowBlank: true,
                    sortable: true,
                    width: 250,
                    // editor: textFieldProvidenciasLibroDiario
                },
                //{header: 'Número de Predio', dataIndex: 'numero_predio', allowBlank:true, width: 100, editor: textField},
                {
                    header: 'Ordenanza',
                    dataIndex: 'ordenanza',
                    allowBlank: true,
                    sortable: true,
                    width: 180,
                    // editor: comboOrdenanza,
                    renderer: rendererOrdenanza
                },
                // {
                //     header: 'Artículo y numeral',
                //     dataIndex: 'articulo_numeral',
                //     allowBlank: true,
                //     width: 300,
                //     editor: comboOrdenanzaTema,
                //     renderer: rendererOrdenanzaTema
                // },
                {header: 'Iniciado por', dataIndex: 'iniciado_por', allowBlank: true, sortable: true, width: 120,
                    // editor: comboINICIADOPOR,
                    renderer: functionINICIADOPOR
                },
                {header: 'Entidad', dataIndex: 'entidad', allowBlank: true, sortable: true, width: 200,
                    // editor: textFieldLibroDiario
                },
                {
                    header: 'Número de Informe',
                    dataIndex: 'numero_informe',
                    allowBlank: true,
                    sortable: true,
                    width: 150,
                    // editor: textFieldProvidenciasLibroDiario
                },
                {
                    header: 'Medida Cautelar',
                    dataIndex: 'medida_cautelar',
                    allowBlank: true,
                    sortable: true,
                    width: 150,
                    // editor: comboMEDIDACAUTELAR,
                    renderer: functionMEDIDACAUTELAR
                },
                {header: 'Estado', dataIndex: 'estado', allowBlank: true, sortable: true, width: 80,
                    // , editor: comboESTADO,
                    renderer: functionESTADO},
                {
                    header: 'Funcionario',
                    dataIndex: 'funcionario',
                    allowBlank: true,
                    sortable: true,
                    width: 300,
                    // editor: comboPersonal,
                    renderer: rendererPersonal
                },
                {
                    header: 'Fecha de Sorteo',
                    dataIndex: 'fecha_sorteo',
                    sortable: true,
                    width: 100,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    // editor: new Ext.form.DateField({
                    //     format: 'Y-m-d'
                    // })
                },
                {
                    header: 'Envio Expediente',
                    dataIndex: 'envio_expediente',
                    allowBlank: true,
                    sortable: true,
                    width: 100,
                    // editor: comboENVIOEXPEDIENTE,
                    renderer: functionENVIOEXPEDIENTE
                },
                {
                    header: 'Número de Memorando',
                    dataIndex: 'numero_memorando',
                    allowBlank: true,
                    sortable: true,
                    width: 250,
                    // editor: textFieldProvidenciasLibroDiario
                },
                {
                    header: 'Fecha de Envío',
                    dataIndex: 'fecha_envio',
                    sortable: true,
                    width: 100,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    // editor: new Ext.form.DateField({
                    //     format: 'Y-m-d'
                    // })
                },

            ],
            viewConfig: {
                forceFit: false
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: function (sm, row, rec) {
                        // recuperamos la informacion de personal asignado a ese operativo
                        //select_codigo_tramite = rec.id;
                        storeProvidencias.baseParams.id =  rec.id;
                        storeProducto.baseParams.id =  rec.id;
                        storeProducto.load();
                        storeProvidencias.load();
                        // storeProducto.load({params: {id: rec.id}});
                        // storeProvidencias.load({params: {id: rec.id}});
                        libroDiarioSeleccionado = rec.id;
                        // {params: id: libroDiarioSeleccionado
                        //inspeccionSeleccionada = rec.id_denuncia;
                    }
                }
            }),
            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteresolucion,
                store: storeReporteProvidenciasLibroDiario,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "No existen trámites que mostrar"
            }),
            listeners:{
                beforeedit: function (e) {
                    // si el operativo ya esta marcado como finalizado no se lo puede editar
                    if (!accesosEjecutores) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        });
        //Fin formato grid Providencias Libro Diario
        //Fin ventana resolucion Providencias Libro Diario


       // inicio ventana Reporte Resoluciones
        //Definición de url CRUD
        var proxyReporteResoluciones = new Ext.data.HttpProxy({
            api: {
                create: urlBodegas + "crudReporteResoluciones.php?operation=insert",
                read: urlBodegas + "crudReporteResoluciones.php?operation=select",
                update: urlBodegas + "crudReporteResoluciones.php?operation=update",
                destroy: urlBodegas + "crudReporteResoluciones.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Resoluciones
        var readerReporteResoluciones = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'nombre', allowBlank: false},
                {name: 'total', allowBlank: false},
                {name: 'veces', allowBlank: false}

            ]
        });

        //Definición de escritura en campos bdd Resoluciones
        var writerReporteResoluciones = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para módulo Resoluciones
        this.storeReporteResoluciones = new Ext.data.Store({
            id: "idStoreResoluciones",
            proxy: proxyReporteResoluciones,
            reader: readerReporteResoluciones,
            writer: writerReporteResoluciones,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            autoSave: true,
            baseParams: {}
        });

        storeReporteResoluciones = this.storeReporteResoluciones;
        limiteresolucion = 100;
        storeReporteResoluciones.baseParams = {
            limit: limiteresolucion,
            accesosEjecutores : accesosEjecutores
        };

        this.storeReporteResoluciones.load();

        //Inicio formato grid Reportes Resoluciones
        this.gridReporteResoluciones = new Ext.grid.EditorGridPanel({
            height: winHeight / 2 + 50,
            store: this.storeReporteResoluciones,
            columns: [
                //Definición de campos bdd Resoluciones
                new Ext.grid.RowNumberer(),
                {header: 'id', dataIndex: 'id', width: 100, hidden: true,
                    // editor: textFieldResoluciones
                },
                {header: 'Nombre', dataIndex: 'nombre', allowBlank: true, sortable: true, width: 250,
                    // editor: textFieldResoluciones
                },
                {
                    header: 'Total asignadas',
                    dataIndex: 'total',
                    allowBlank: true,
                    sortable: true,
                    width: 180
                },
                {
                    header: 'Total de resoluciones emitidas',
                    dataIndex: 'veces',
                    allowBlank: true,
                    sortable: true,
                    width: 180
                    // editor: textFieldResoluciones
                }

            ],
            viewConfig: {
                forceFit: false
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true
            }),
            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteresolucion,
                store: storeReporteResoluciones,
                displayInfo: true,
                displayMsg: 'Mostrando funcionarios: {0} - {1} de {2} - AMC',
                emptyMsg: "No existen funcionarios que mostrar"
            }),
            listeners:{
                beforeedit: function (e) {
                    // si el operativo ya esta marcado como finalizado no se lo puede editar
                    if (!accesosEjecutores) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        });
        //Fin formato grid Resoluciones
        //Fin ventana resolucion Resoluciones

        //Inicio ventana resolucion Providencias
        //Definición de url CRUD
        var proxyProvidencias = new Ext.data.HttpProxy({
            api: {
                create: urlBodegas + "crudBienes.php?operation=insert",
                read: urlBodegas + "crudBienes.php?operation=select",
                update: urlBodegas + "crudBienes.php?operation=update",
                destroy: urlBodegas + "crudBienes.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Providencias
        var readerProvidencias = new Ext.data.JsonReader({
            //totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: true},
                {name: 'id_bodega', allowBlank: true},
                {name: 'bien', allowBlank: true},
                {name: 'estado_bien', allowBlank: true},
                {name: 'cantidad', allowBlank: true},
                {name: 'peso', allowBlank: true},
            ]
        });

        //Definición de escritura de campos bdd Providencias
        var writerProvidencias = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para pestaña Providencias
        this.storeProvidencias = new Ext.data.Store({
            id: "idStoreProvidencias",
            proxy: proxyProvidencias,
            reader: readerProvidencias,
            writer: writerProvidencias,
            //autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            autoSave: true,
            baseParams: {}
        });
        storeProvidencias = this.storeProvidencias;
        limiteresolucion = 20;
        storeProvidencias.baseParams = {
            limit: limiteresolucion
        };

        this.storeProvidencias.load();


        //Inicio formato grid pestaña Providencias
        this.gridBienes = new Ext.grid.EditorGridPanel({
            height: winHeight/2-100,
            store: this.storeProvidencias,
            columns: [
                //Definición de campos bdd Providencias
                new Ext.grid.RowNumberer(),
                {header: 'id', dataIndex: 'id', width: 100, hidden: true},
                {header: 'Cantidad', dataIndex: 'cantidad', width: 100, hidden: false, editor: textFieldBienes},
                {header: 'Bien', dataIndex: 'bien', width: 100, hidden: false, editor: textFieldBienes},
                {header: 'Estado del bien', dataIndex: 'estado_bien', sortable: true, width: 140, editor: textFieldBienes},
                {header: 'Peso', dataIndex: 'peso', sortable: true, width: 140, editor: textFieldBienes},
            ],
            viewConfig: {
                forceFit: false
            },
            sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteresolucion,
                store: storeProvidencias,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "No existen trámites que mostrar"
            }),
            listeners:{
                beforeedit: function (e) {
                    // si el operativo ya esta marcado como finalizado no se lo puede editar
                    if (acceso) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        });
        //Fin formato grid pestaña Providencias
        //Fin ventana resolucion Providencias

        // fin ventana resolucion

        // datastore and datagrid in Guia
        this.storeDocumentosReporte = new Ext.data.Store({
            id: "id",
            proxy: proxyProducto,
            reader: readerResoluciones,
            writer: writerResoluciones,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
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
                }
            ],
            viewConfig: {
                forceFit: false
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
                displayMsg: 'Mostrando resolucion {0} - {1} de {2}  >>',
                emptyMsg: "No existen resolucion que mostrar"
            }),
        });
        // fin datastore and datagrid in Guia


        var win = desktop.getWindow('layout-win');

        if (!win) {

            var winWidth = desktop.getWinWidth();
            var winHeight = desktop.getWinHeight();
            this.seleccionDepar = 3;

            this.formConsultaLibroDiario = new Ext.FormPanel({
                layout: 'column',
                // title: 'Ingrese los parámetros',
                frame: true,
                bodyStyle: 'padding:5px 5px 0',
                items: [
                    {
                        columnWidth: 1 / 2,
                        layout: 'form',
                        items: [
                            {
                                xtype: 'hidden',
                                id: 'accesosEjecutores',
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Num. expediente',
                                id: 'numero_expediente',
                                name: 'numero_expediente',
                                anchor: '80%'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Administrado',
                                id: 'nombre_administrado',
                                name: 'nombre_administrado',
                                anchor: '80%'
                            },
                        ]
                    },
                    {
                        columnWidth: 2 / 2,
                        layout: 'form',
                        items: [
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Cédula',
                                id: 'cedula_ruc',
                                name: 'cedula_ruc',
                                anchor: '40%'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Zona',
                                id: 'unidad_ejecucion',
                                name: 'unidad_ejecucion',
                                hiddenName: 'unidad_ejecucion',

                                anchor: '40%',
                                store:  storeUnidadEjecucion,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                        ]
                    }
                ]
            });

            this.formConsultaNTLibroDiario = new Ext.FormPanel({
                layout: 'column',
                // title: 'Ingrese los parámetros',
                frame: true,
                bodyStyle: 'padding:5px 5px 0',
                items: [
                    {
                        columnWidth: 1 / 3,
                        layout: 'form',
                        items: [
                            {
                                xtype: 'hidden',
                                id: 'accesosNTResolutores',
                            },{
                                xtype: 'datefield',
                                fieldLabel: 'Fecha Inicio',
                                id: 'busqueda_fecha_inicio',
                                anchor: '95%',
                                format: 'Y-m-d',
                            },
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Fecha Fin',
                                id: 'busqueda_fecha_fin',
                                anchor: '95%',
                                format: 'Y-m-d'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Ordenanza',
                                id: 'ordenanza',
                                name: 'ordenanza',
                                hiddenName: 'ordenanza',

                                anchor: '95%',
                                store:  storeOrdenanza,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Resolución de',
                                id: 'resolucion_de',
                                name: 'resolucion_de',
                                hiddenName: 'resolucion_de',

                                anchor: '95%',
                                store:  storeRESOLUCIONDE,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Funcionario',
                                id: 'funcionario',
                                name: 'funcionario',
                                hiddenName: 'funcionario',

                                anchor: '95%',
                                store:  storePersonal,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            // {
                            //     xtype: 'textfield',
                            //     fieldLabel: 'Artículo actual',
                            //     id: 'articulo_actual',
                            //     name: 'articulo_actual',
                            //     anchor: '95%'
                            // },
                        ]
                    },
                    {
                        columnWidth: 1 / 3,
                        layout: 'form',
                        items: [
                            {
                                xtype: 'textfield',
                                fieldLabel: 'No. resolución',
                                id: 'numero_resolucion',
                                name: 'numero_resolucion',
                                anchor: '95%'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Artículo actual',
                                id: 'articulo_actual',
                                name: 'articulo_actual',
                                anchor: '95%'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Unidad',
                                id: 'unidad',
                                name: 'unidad',
                                hiddenName: 'unidad',

                                anchor: '95%',
                                store:  storeUnidad2,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Iniciado por',
                                id: 'iniciado_por',
                                name: 'iniciado_por',
                                hiddenName: 'iniciado_por',

                                anchor: '95%',
                                store:  storeINICIADOPOR,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Medida cautelar',
                                id: 'medida_cautelar',
                                name: 'medida_cautelar',
                                hiddenName: 'medida_cautelar',

                                anchor: '95%',
                                store:  storeMEDIDACAUTELAR,
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
                                fieldLabel: 'Tipo',
                                id: 'tipo_unidad',
                                name: 'tipo_unidad',
                                hiddenName: 'tipo_unidad',

                                anchor: '95%',
                                store:  storeTIPOUNIDAD,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Envío expediente',
                                id: 'envio_expediente',
                                name: 'envio_expediente',
                                hiddenName: 'envio_expediente',

                                anchor: '95%',
                                store:  storeENVIOEXPEDIENTE,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            // {
                            //     xtype: 'textfield',
                            //     fieldLabel: 'Multa',
                            //     id: 'multa',
                            //     name: 'multa',
                            //     anchor: '95%'
                            // },
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Fecha Inicio (Envío)',
                                id: 'fecha_envio_inicio',
                                anchor: '95%',
                                format: 'Y-m-d'
                            },
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Fecha de Fin (Envío)',
                                id: 'fecha_envio_fin',
                                anchor: '95%',
                                format: 'Y-m-d'
                            },
                        ]
                    }
                ]
            });

            this.formConsultaProvidenciasLibroDiario = new Ext.FormPanel({
                layout: 'column',
                // title: 'Ingrese los parámetros',
                frame: true,
                bodyStyle: 'padding:5px 5px 0',
                items: [
                    {
                        columnWidth: 1 / 3,
                        layout: 'form',
                        items: [
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Fecha Inicio',
                                id: 'busqueda_fecha_inicio_providencias',
                                anchor: '95%',
                                format: 'Y-m-d',
                            },
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Fecha Fin',
                                id: 'busqueda_fecha_fin_providencias',
                                anchor: '95%',
                                format: 'Y-m-d'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Ordenanza',
                                id: 'ordenanza_providencias',
                                name: 'ordenanza',
                                hiddenName: 'ordenanza',

                                anchor: '95%',
                                store:  storeOrdenanza,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Tipo providencia',
                                id: 'tipo_providencia',
                                name: 'tipo_providencia',
                                hiddenName: 'tipo_providencia',

                                anchor: '95%',
                                store:  storeTIPOPROVIDENCIA,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Funcionario',
                                id: 'funcionario_providencias',
                                name: 'funcionario',
                                hiddenName: 'funcionario',

                                anchor: '95%',
                                store:  storePersonal,
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
                                fieldLabel: 'Unidad',
                                id: 'unidad_providencias',
                                name: 'unidad',
                                hiddenName: 'unidad',

                                anchor: '95%',
                                store:  storeUnidad2,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Iniciado por',
                                id: 'iniciado_por_providencias',
                                name: 'iniciado_por',
                                hiddenName: 'iniciado_por',

                                anchor: '95%',
                                store:  storeINICIADOPOR,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Medida cautelar',
                                id: 'medida_cautelar_providencias',
                                name: 'medida_cautelar',
                                hiddenName: 'medida_cautelar',

                                anchor: '95%',
                                store:  storeMEDIDACAUTELAR,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Tipo',
                                id: 'tipo_providencias',
                                name: 'tipo',
                                hiddenName: 'tipo',

                                anchor: '95%',
                                store:  storeTIPOUNIDAD,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },{
                                xtype: 'combo',
                                fieldLabel: 'Envío expediente',
                                id: 'tipo_expediente_providencias',
                                name: 'tipo_expediente',
                                hiddenName: 'tipo_expediente',

                                anchor: '95%',
                                store:  storeENVIOEXPEDIENTE,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                        ]
                    },
                    {
                        columnWidth: 1 / 3,
                        layout: 'form',
                        items: [
                            // {
                            //     xtype: 'textfield',
                            //     fieldLabel: 'Multa',
                            //     id: 'multa_providencias',
                            //     name: 'multa',
                            //     anchor: '95%'
                            // },
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Fecha Inicio (Envío)',
                                id: 'fecha_envio_inicio_providencia',
                                anchor: '95%',
                                format: 'Y-m-d'
                            },
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Fecha de Fin (Envío)',
                                id: 'fecha_envio_fin_providencia',
                                anchor: '95%',
                                format: 'Y-m-d'
                            },
                        ]
                    }
                ]
            });

            this.formConsultaResoluciones = new Ext.FormPanel({
                layout: 'column',
                // title: 'Ingrese los parámetros',
                frame: true,
                bodyStyle: 'padding:5px 5px 0',
                items: [
                    {
                        columnWidth: 1 / 3,
                        layout: 'form',
                        items: [
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Fecha Inicio',
                                id: 'busqueda_fecha_inicio_resoluciones',
                                anchor: '95%',
                                format: 'Y-m-d',
                            },
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Fecha Fin',
                                id: 'busqueda_fecha_fin_resoluciones',
                                anchor: '95%',
                                format: 'Y-m-d'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Ordenanza',
                                id: 'ordenanza_resoluciones',
                                name: 'ordenanza',
                                hiddenName: 'ordenanza',

                                anchor: '95%',
                                store:  storeOrdenanza,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Resolución de',
                                id: 'resolucion_de_resoluciones',
                                name: 'resolucion_de',
                                hiddenName: 'resolucion_de',

                                anchor: '95%',
                                store:  storeRESOLUCIONDE,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Funcionario',
                                id: 'funcionario_resoluciones',
                                name: 'funcionario',
                                hiddenName: 'funcionario',

                                anchor: '95%',
                                store:  storePersonal,
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
                                fieldLabel: 'Unidad',
                                id: 'unidad_resoluciones',
                                name: 'unidad',
                                hiddenName: 'unidad',

                                anchor: '95%',
                                store:  storeUnidad2,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Iniciado por',
                                id: 'iniciado_por_resoluciones',
                                name: 'iniciado_por',
                                hiddenName: 'iniciado_por',

                                anchor: '95%',
                                store:  storeINICIADOPOR,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Medida cautelar',
                                id: 'medida_cautelar_resoluciones',
                                name: 'medida_cautelar',
                                hiddenName: 'medida_cautelar',

                                anchor: '95%',
                                store:  storeMEDIDACAUTELAR,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Tipo',
                                id: 'tipo_resoluciones',
                                name: 'tipo',
                                hiddenName: 'tipo',

                                anchor: '95%',
                                store:  storeTIPOUNIDAD,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },{
                                xtype: 'combo',
                                fieldLabel: 'Envío expediente',
                                id: 'tipo_expediente_resoluciones',
                                name: 'tipo_expediente',
                                hiddenName: 'tipo_expediente',

                                anchor: '95%',
                                store:  storeENVIOEXPEDIENTE,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                        ]
                    },
                    {
                        columnWidth: 1 / 3,
                        layout: 'form',
                        items: [
                            // {
                            //     xtype: 'textfield',
                            //     fieldLabel: 'Multa',
                            //     id: 'multa_resoluciones',
                            //     name: 'multa',
                            //     anchor: '95%'
                            // },
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Fecha Inicio (Envío)',
                                id: 'busqueda_fecha_inicio_envio_resoluciones',
                                anchor: '95%',
                                format: 'Y-m-d'
                            },
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Fecha de Fin (Envío)',
                                id: 'busqueda_fecha_fin_envio_resoluciones',
                                anchor: '95%',
                                format: 'Y-m-d'
                            },
]
                    }
                ]
            });


            var checkHandler = function (item, checked) {
                if (checked) {
                    var store = this.storeProducto;
                    store.baseParams.filterField = item.key;
                    searchFieldBtn.setText(item.text);
                }
            };

            var targetHandler = function (item, checked) {
                if (checked) {
                    //var store = this.storeProducto;
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

            var checkHandlerResoluciones = function (item, checked) {
                if (checked) {
                    var store = this.storeProducto;
                    store.baseParams.filterField = item.key;
                    searchFieldBtnResoluciones.setText(item.text);
                }
            };

            var targetHandlerResoluciones = function (item, checked) {
                if (checked) {
                    //var store = this.storeProducto;
                    this.seleccionDepar = item.key;
                    this.targetFieldBtn.setText(item.text);
                }
            };
            var searchFieldBtnResoluciones = new Ext.Button({
                menu: new Ext.menu.Menu({
                    items: [
                        {
                            checked: true,
                            checkHandler: checkHandlerResoluciones,
                            group: 'filterField',
                            key: 'busqueda_todos',
                            scope: this,
                            text: 'Todos'
                        }
                    ]
                })
                , text: 'Todos'
            });

            var checkHandlerProvidencias = function (item, checked) {
                if (checked) {
                    var store = this.storeProvidencias;
                    store.baseParams.filterField = item.key;
                    searchFieldBtnProvidencias.setText(item.text);
                }
            };

            var targetHandlerProvidencias = function (item, checked) {
                if (checked) {
                    //var store = this.storeProducto;
                    this.seleccionDepar = item.key;
                    this.targetFieldBtn.setText(item.text);
                }
            };
            var searchFieldBtnProvidencias = new Ext.Button({
                menu: new Ext.menu.Menu({
                    items: [
                        {
                            checked: true,
                            checkHandler: checkHandlerProvidencias,
                            group: 'filterField',
                            key: 'busqueda_todos',
                            scope: this,
                            text: 'Todos'
                        }
                    ]
                })
                , text: 'Todos'
            });

            var checkHandler2 = function (item, checked) {
                if (checked) {
                    var store = this.storeProvidencias;
                    store.baseParams.filterField = item.key;
                    searchFieldBtn2.setText(item.text);
                }
            };

            var targetHandler2 = function (item, checked) {
                if (checked) {
                    //var store = this.storeProducto;
                    this.seleccionDepar = item.key;
                    this.targetFieldBtn.setText(item.text);
                }
            };
            var searchFieldBtn2 = new Ext.Button({
                menu: new Ext.menu.Menu({
                    items: [
                        {
                            checked: true,
                            checkHandler: checkHandler2,
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
                id: 'grid-win-resolucion',
                title: 'Módulo de Bodega',
                width: winWidth,
                height: winHeight,
                iconCls: 'resolucion-icon',
                shim: false,
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',

                items: new Ext.TabPanel({
                    activeTab: 0,
                    border: false,
                    items: [
                        //Pestaña Libro diario
                        {
                            autoScroll: true,
                            title: 'Registro de Retiros',
                            closable: false,
                            //  layout: 'fit',
                            height: winHeight,
                            //disabled: accesosEjecutores,
                            hidden: true,
                            id: 'libro-diario',
                            //Barra de botones
                            tbar: [
                                //Definición de botón nuevo
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.addLibroDiario,
                                    disabled: accesosEjecutores,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                //Definición de botón eliminar
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deleteLibroDiario,
                                    disabled: accesosEjecutores,
                                    //disabled: !creacionTramites,
                                    iconCls: 'delete-icon'
                                },
                                '-',
                                //Definición de botón Recargar datos
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataLibroDiario,
                                    scope: this,
                                    text: 'Recargar'
                                },
                                '-',
                                {
                                    iconCls: 'send-icon',
                                    handler: this.requestGridDataLibroDiario,
                                    scope: this,
                                    text: 'Buscar'

                                },
                                // {
                                //     iconCls: 'send-icon',
                                //     handler: this.requestGridDataLibroDiarioReset,
                                //     scope: this,
                                //     text: 'Borrar formulario',
                                //     disabled: true,
                                //
                                // },
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarActaIngreso,
                                    scope: this,
                                    text: 'Acta de Ingreso',
                                    tooltip: 'Se genera archivo Excel con la información solicitada',
                                    // disabled: accesosEjecutores,
                                    disabled: false,
                                },{
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarActaDevolucion,
                                    scope: this,
                                    text: 'Acta de Devolución',
                                    tooltip: 'Se genera archivo Excel con la información solicitada',
                                    // disabled: accesosEjecutores,
                                    disabled: false,
                                },{
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarActaDonacion,
                                    scope: this,
                                    text: 'Acta de Donación',
                                    tooltip: 'Se genera archivo Excel con la información solicitada',
                                    // disabled: accesosEjecutores,
                                    disabled: false,
                                },{
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarActaEntregaRecepcion,
                                    scope: this,
                                    text: 'Acta de Entrega-Recepción',
                                    tooltip: 'Se genera archivo Excel con la información solicitada',
                                    // disabled: accesosEjecutores,
                                    disabled: false,
                                },{
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarActaRetiroProductos,
                                    scope: this,
                                    text: 'Acta de Retiro de Productos',
                                    tooltip: 'Se genera archivo Excel con la información solicitada',
                                    // disabled: accesosEjecutores,
                                    disabled: false,
                                },
                         /*       {
                                    xtype: 'checkbox',
                                    boxLabel: 'Filtro pendientes',
                                    id: 'checkPendientesAprobarLibroDiario',
                                    name: 'pendientesAprobarLibroDiario',
                                    //checked: accesosSecretaria,
                                    inputValue: '1',
                                    tooltip: 'Recargar datos',
                                    //disabled: !acceso,
                                    disabled: true,
                                    cls: 'barramenu',
                                    handler: function (checkbox, isChecked) {
                                        //Ext.getCmp('tb_repoteDenuncias').setDisabled(!this.checked);
                                        //Ext.getCmp('tb_seleccionarUnidad').setDisabled(!this.checked);
                                        //Ext.getCmp('tb_seleccionarUnidad').getValue();
                                        //storeDenuncias.load({params: {noenviados: isChecked}});
                                        storeModuloInspeccion.baseParams = {
                                            pendientesAprobar: isChecked
                                        };
                                        storeModuloInspeccion.load();
                                        // if (!this.checked) {
                                        //Ext.getCmp('tb_seleccionarUnidad').setValue('Seleccionar Unidad');
                                        //}
                                    }
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
                                            emptyText: 'Seleccione documento a subir',
                                            fieldLabel: 'Documento',
                                            name: 'doc-path',
                                            regex: /^.*.(pdf|PDF|jpg|JPG|png|PNG)$/,
                                            regexText: 'Solo pdf ',
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
                                    text: "Subir Archivo",
                                    scope: this,
                                    handler: function () {
                                        if (libroDiarioSeleccionado != '') {
                                            if (Ext.getCmp('fp').getForm().isValid()) {
                                                Ext.getCmp('fp').getForm().submit({
                                                    url: urlBodegas +  'file-upload.php',
                                                    params: {data: libroDiarioSeleccionado},
                                                    waitMsg: 'Subiendo Documento...',
                                                    success: function (fp, o) {

                                                        //storeOperativosImagenes.load({params: {id_operativo: selectOperativos}});
                                                        //Ext.getCmp('fp').getForm().reset();
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
                                        }
                                    },
                                    id: 'subirimagen',
                                    iconCls: 'subir-icon',
                                    //disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                    disabled: false
                                },*/
                                // '-',
                                //bh boton generar
                                // {
                                //     iconCls: 'excel-icon',
                                //     handler: this.botonGenerarActa,
                                //     scope: this,
                                //     text: 'Generar reporte',
                                //     tooltip: 'Se genera acta con las ',
                                //     id: 'tb_reporteDenuncias',
                                //     disabled: true
                                // },
                                // '-',
                                '->'
                                , {
                                    text: 'Buscar por:'
                                    , xtype: 'tbtext'
                                }

                                , searchFieldBtn
                                , ' ', ' '
                                , new QoDesk.QoAdmin.SearchField({
                                    paramName: 'filterText'
                                    , store: this.storeBodega
                                }),
                            ],
                            //Llamado a función que arma la tabla de datos
                            items: [
                                /*{
                                id: 'formLibroDiario',
                                titleCollapse: true,
                                //flex: 1,
                                autoScroll: true,
                                //height: winHeight/2-120,
                                layout: 'column',
                                items: this.gridBodega
                            }*/
                // {
                //     region: 'north',
                //     height: 120,
                //     minSize: 50,
                //     maxSize: 150,
                //     closable: true,
                //     autoScroll: false,
                //     items: this.formConsultaLibroDiario
                // },
                {
                    region: 'center',
                    height: winHeight/2-50,
                    minSize: 50,
                    maxSize: 100,
                    closable: true,
                    autoScroll: true,
                    layout: 'column',
                    items: this.gridBodega
                }

                            , {
                                flex: 2,
                                bodyStyle: 'padding:0; background: #0f6dff',
                                items: [
                                    {
                                        xtype: 'tabpanel',
                                        activeTab: 0,
                                        width: winWidth - 15,
                                        //height: winHeight / 2 ,
                                        cls: 'no-border',
                                        items: [
                                            {
                                                title: 'Productos',
                                                autoScroll: true,
                                                height: winHeight / 2 - 72,
//                                                height: winHeight * 0.41,
                                                tbar: [
                                                    //Definición de botón nuevo
                                                    {
                                                        id: 'btnNuevoProducto',
                                                        text: 'Nuevo',
                                                        scope: this,
                                                        handler: this.addProducto,
                                                        disabled: false,
                                                        iconCls: 'save-icon'
                                                    },
                                                    '-',
                                                    //Definición de botón eliminar
                                                    {
                                                        id: 'btnEliminarProducto',
                                                        text: "Eliminar",
                                                        scope: this,
                                                        handler: this.deleteProducto,
                                                        disabled: false,
                                                        iconCls: 'delete-icon'
                                                    },
                                                    '-',
                                                    //Definición de botón Recargar datos
                                                    {
                                                        id: 'btnRecargarDatosProducto',
                                                        iconCls: 'reload-icon',
                                                        handler: this.requestGridDataResoluciones,
                                                        disabled: false,
                                                        scope: this,
                                                        text: 'Recargar'
                                                    },
                                                    '->'
                                                    , {
                                                        text: 'Buscar por:'
                                                        , xtype: 'tbtext'
                                                    }

                                                    , searchFieldBtnResoluciones
                                                    , ' ', ' '
                                                    , new QoDesk.QoAdmin.SearchField({
                                                        paramName: 'filterText',
                                                        store: this.storeProducto
                                                    })
                                                    ,

                                                ],
                                                items: this.gridProducto

                                            },
                                            {
                                                title: 'Bienes',
                                                //titleCollapse: true,
                                                layout: 'column',
                                                //disabled: !accesosSecretaria
                                                autoScroll: true,
                                                height: winHeight / 2 - 72,
                                                //height: winHeight * 0.41,
                                                tbar: [
                                                    //Definición de botón nuevo
                                                    {
                                                        id: 'btnNuevoProvidencias',
                                                        text: 'Nuevo',
                                                        scope: this,
                                                        handler: this.addProvidencias,
                                                        //disabled: !creacionDatosInspeccion,
                                                        disabled: false,
                                                        iconCls: 'save-icon'
                                                    },
                                                    '-',
                                                    //Definición de botón eliminar
                                                    {
                                                        id: 'btnEliminarProvidencias',
                                                        text: "Eliminar",
                                                        scope: this,
                                                        handler: this.deleteProvidencias,
                                                        //disabled: !creacionDatosInspeccion,
                                                        disabled: false,
                                                        iconCls: 'delete-icon'
                                                    },
                                                    '-',
                                                    //Definición de botón Recargar datos
                                                    {
                                                        id: 'btnRecargarDatosProvidencias',
                                                        iconCls: 'reload-icon',
                                                        handler: this.requestGridDataProvidencias,
                                                        disabled: false,
                                                        scope: this,
                                                        text: 'Recargar'
                                                    },
                                                    '-',
                                                    '->'
                                                    , {
                                                        text: 'Buscar por:'
                                                        , xtype: 'tbtext'
                                                    }
                                                    //, searchControlProgramadoInspeccionBtn
                                                    , ' ', ' '
                                                    , new QoDesk.QoAdmin.SearchField({
                                                        paramName: 'filterText',
                                                        store: this.storeProvidencias
                                                    })
                                                ],
                                                items: this.gridBienes
                                            }
                                        ]
                                    }
                                ]
                            }
                            ],
                        }
                        /*,
                        {
                            title: 'Reportes Resoluciones - Libro Diario',
                            closable: true,
                            layout: 'border',
                            height: winHeight/4,
                            // disabled: accesosEjecutores,
                            disabled: false,
                            tbar: [
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataReporteLibroDiario,
                                    scope: this,
                                    text: 'Buscar'

                                },
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataReporteLibroDiarioReset,
                                    scope: this,
                                    text: 'Borrar formulario'

                                },
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarReporteResolucion,
                                    scope: this,
                                    text: 'Exportar reporte de Resoluciones',
                                    tooltip: 'Se genera archivo Excel con la información solicitada',
                                    // disabled: accesosEjecutores,
                                    disabled: false,
                                }
                            ],
                            items: [
                                {
                                    region: 'north',
                                    height: 150,
                                    minSize: 50,
                                    maxSize: 150,
                                    closable: true,
                                    autoScroll: false,
                                    items: this.formConsultaLibroDiario
                                },
                                {
                                    region: 'center',
                                    height: 100,
                                    minSize: 50,
                                    maxSize: 100,
                                    closable: true,
                                    autoScroll: false,
                                    items: this.gridReporteLibroDiario
                                }
                            ]

                        },
                        {
                            title: 'Reportes Providencias - Libro Diario',
                            closable: true,
                            layout: 'border',
                            height: winHeight/3,
                            // disabled: accesosEjecutores,
                            disabled: false,
                            tbar: [
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataReporteProvidencias,
                                    scope: this,
                                    text: 'Buscar'
                                },
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataReporteProvidenciasReset,
                                    scope: this,
                                    text: 'Borrar formulario'
                                },
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarReporteProvidencias,
                                    scope: this,
                                    text: 'Exportar reporte de Providencias',
                                    tooltip: 'Se genera archivo Excel con la información solicitada',
                                    // disabled: accesosEjecutores,
                                    disabled: false,
                                }

                            ],
                            items: [
                                {
                                    region: 'north',
                                    height: 150,
                                    minSize: 50,
                                    maxSize: 150,
                                    closable: true,
                                    autoScroll: false,
                                    items: this.formConsultaProvidenciasLibroDiario
                                },
                                {
                                    region: 'center',
                                    height: 100,
                                    minSize: 50,
                                    maxSize: 100,
                                    closable: true,
                                    autoScroll: false,
                                    items: this.gridReporteProvidenciasLibroDiario
                                },
                            ]

                        },
                        {
                            title: 'Reportes No Tramitados - Libro Diario',
                            closable: true,
                            layout: 'border',
                            height: winHeight/4,
                            // disabled: accesosEjecutores,
                            disabled: false,
                            tbar: [
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataReporteNTLibroDiario,
                                    scope: this,
                                    text: 'Buscar'

                                },
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataReporteNTLibroDiarioReset,
                                    scope: this,
                                    text: 'Borrar formulario'

                                },
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarReporteNTResolucion,
                                    scope: this,
                                    text: 'Exportar reporte de No tramitados',
                                    tooltip: 'Se genera archivo Excel con la información solicitada',
                                    // disabled: accesosEjecutores,
                                    disabled: false,
                                }
                            ],
                            items: [
                                {
                                    region: 'north',
                                    height: 150,
                                    minSize: 50,
                                    maxSize: 150,
                                    closable: true,
                                    autoScroll: false,
                                    items: this.formConsultaNTLibroDiario
                                },
                                {
                                    region: 'center',
                                    height: 100,
                                    minSize: 50,
                                    maxSize: 100,
                                    closable: true,
                                    autoScroll: false,
                                    items: this.gridReporteNTLibroDiario
                                }
                            ]

                        },
                        {
                            title: 'Reportes Resoluciones',
                            closable: true,
                            layout: 'border',
                            disabled: !accesoTotalesResoluciones,
                            // disabled: false,
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
                                // {
                                //     iconCls: 'excel-icon',
                                //     handler: this.botonExportarDocumentoReporte,
                                //     scope: this,
                                //     text: 'Exportar listado',
                                //     tooltip: 'Se genera archivo Excel con la información solicitada',
                                //     disabled: true,
                                // },
                            ],
                            items: [
                                {
                                    region: 'north',
                                    height: 150,
                                    minSize: 50,
                                    maxSize: 150,
                                    closable: true,
                                    autoScroll: false,
                                    items: this.formConsultaResoluciones
                                },
                                {
                                    region: 'center',
                                    height: 100,
                                    minSize: 50,
                                    maxSize: 100,
                                    closable: true,
                                    autoScroll: false,
                                    items: this.gridReporteResoluciones
                                },
                                // {
                                //     // lazily created panel (xtype:'panel' is default)
                                //     split: true,
                                //     height: 270,
                                //     minSize: 100,
                                //     maxSize: 150,
                                //     region: 'center',
                                //     autoEl: {
                                //         id: 'iframemap',
                                //         tag: 'iframe',
                                //         style: 'height: 360px; width: 100%; border: none',
                                //         src: 'http://localhost:8080/mapaRecorrido.html'
                                //         //src: 'http://agenciadecontrol.quito.gob.ec/mapaResolucion.html'
                                //     },
                                //     id: 'data_export_iframe'
                                // }
                            ]

                        }*/

                    ]
                })
            });
        }
        win.show();

        setTimeout(function () {
            this.storeBodega.load();
            this.storeProducto.load({
                params: {
                    id: 0,
                    start: 0,
                    limit: limiteresolucion,
                    //finalizados: Ext.getCmp('checkNoRecibidos').getValue(),
                    accesosAdministradorOpe: accesosAdministradorOpe,
                    accesosEjecutores: accesosEjecutores
                }
            });
            this.storeProvidencias.load({
                params: {
                    id: 0,
                }
            });
        }, 600);
    },


    //Función para eliminación de Libro Diario
    deleteLibroDiario: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de borrar el registro seleccionado?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridBodega.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeBodega.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de Libro Diario
    addLibroDiario: function () {
        var libroDiario = new this.storeBodega.recordType({
            fecha_retiro: (new Date()),
            fecha: (new Date()),
            fecha_devolucion: (new Date()),
            numero_retiros: 0,
            codigo: '',
            perecible: '',
            bien: '',
            direccion_retiro: '',
            donacion_institucion: '',
            dado_baja: '',
            en_bodega: '',
            devolucion: '',
            unidad: '0',
            observaciones: ''
        });
        this.gridBodega.stopEditing();
        this.storeBodega.insert(0, libroDiario);
        this.gridBodega.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de Libro Diario
    requestGridDataLibroDiario: function () {
        this.storeBodega.baseParams = this.formConsultaLibroDiario.getForm().getValues();
 //cc obtiene solo los expedientes asignados       this.storeBodega.baseParams.accesosEjecutores = this.app.isAllowedTo('accesosEjecutores', this.id);
        this.storeBodega.load();
        //
    },

    requestGridDataLibroDiarioReset: function () {
        this.formConsultaLibroDiario.getForm().reset();
    },


    deleteProducto: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridProducto.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeProducto.remove(rows);
                }
            }
        });
    },
    addProducto: function () {
        var producto = new this.storeProducto.recordType({
            //id: '',
            id_bodega: libroDiarioSeleccionado,
            producto: '',
            estado_producto: '',
            unidades_recibidas: '',
            peso: '',
            fecha_registro: (new Date()),

        });
        this.gridProducto.stopEditing();
        this.storeProducto.insert(0, producto);
        this.gridProducto.startEditing(0, 0);
    },
    requestGridData: function () {
        this.storeProducto.load();
    },


    //Función para eliminación de datos
    deleteProvidencias: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridBienes.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeProvidencias.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de Providencias
    addProvidencias: function () {
        var providencias = new this.storeProvidencias.recordType({
            //id: '',
            id_bodega: libroDiarioSeleccionado,
            bien: '',
            estado_bien: '',
            cantidad: '',
            peso: '',
            fecha_registro: (new Date()),
        });
        this.gridBienes.stopEditing();
        this.storeProvidencias.insert(0, providencias);
        this.gridBienes.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de Providencias
    requestGridDataProvidencias: function () {
        this.storeProvidencias.load();
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
        this.storeReporteResoluciones.baseParams = this.formConsultaResoluciones.getForm().getValues();
        this.storeReporteLibroDiario.baseParams.accesosEjecutores = this.app.isAllowedTo('accesosEjecutores', this.id);
        this.storeReporteResoluciones.load();
    },

    requestGridDataDocumentoReporteReset: function () {
        this.formConsultaResoluciones.getForm().reset();
    },

    requestGridDataReporteLibroDiario: function () {
        this.storeReporteLibroDiario.baseParams = this.formConsultaLibroDiario.getForm().getValues();
        this.storeReporteLibroDiario.baseParams.accesosEjecutores = this.app.isAllowedTo('accesosEjecutores', this.id);
        this.storeReporteLibroDiario.load();
    },

    requestGridDataReporteLibroDiarioReset: function () {
        this.formConsultaLibroDiario.getForm().reset();
    },

    requestGridDataReporteProvidencias: function () {
        // this.storeDocumentosReporte.baseParams = this.formConsultaDocumentos.getForm().getValues();
        this.storeReporteProvidenciasLibroDiario.baseParams = this.formConsultaProvidenciasLibroDiario.getForm().getValues();
        this.storeReporteProvidenciasLibroDiario.baseParams.accesosEjecutores = this.app.isAllowedTo('accesosEjecutores', this.id);
        this.storeReporteProvidenciasLibroDiario.load();
    },

    requestGridDataReporteProvidenciasReset: function () {
        this.formConsultaProvidenciasLibroDiario.getForm().reset();
    },
    botonExportarActaIngreso: function () {
        var rows = this.storeBodega.getCount()
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
                    // agrego el valor de parametro accesoresolutores

                    //this.formConsultaLibroDiario.getForm().setValues( {accesosEjecutores : this.app.isAllowedTo('accesosEjecutores', this.id) })
                    //valueParams = JSON.stringify(this.formConsultaLibroDiario.getForm().getValues());

                    //window.location.href = 'modules/desktop/bodega/server/descargaActaIngreso.inc.php?param=' + valueParams;
                    window.location.href = 'modules/desktop/bodega/server/descargaActaIngreso.inc.php?param=' + select_retiro_bodega;
                }
            }
        });
    },
    botonExportarActaDevolucion: function () {
        var rows = this.storeBodega.getCount()
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
                    // agrego el valor de parametro accesoresolutores

                    //this.formConsultaLibroDiario.getForm().setValues( {accesosEjecutores : this.app.isAllowedTo('accesosEjecutores', this.id) })
                    //valueParams = JSON.stringify(this.formConsultaLibroDiario.getForm().getValues());

                    //window.location.href = 'modules/desktop/bodega/server/descargaActaIngreso.inc.php?param=' + valueParams;
                    window.location.href = 'modules/desktop/bodega/server/descargaActaDevolucion.inc.php?param=' + select_retiro_bodega;
                }
            }
        });
    },
    botonExportarActaDonacion: function () {
        var rows = this.storeBodega.getCount()
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
                    // agrego el valor de parametro accesoresolutores

                    //this.formConsultaLibroDiario.getForm().setValues( {accesosEjecutores : this.app.isAllowedTo('accesosEjecutores', this.id) })
                    //valueParams = JSON.stringify(this.formConsultaLibroDiario.getForm().getValues());

                    //window.location.href = 'modules/desktop/bodega/server/descargaActaIngreso.inc.php?param=' + valueParams;
                    window.location.href = 'modules/desktop/bodega/server/descargaActaDonacion.inc.php?param=' + select_retiro_bodega;
                }
            }
        });
    },
    botonExportarActaEntregaRecepcion: function () {
        var rows = this.storeBodega.getCount()
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
                    // agrego el valor de parametro accesoresolutores

                    //this.formConsultaLibroDiario.getForm().setValues( {accesosEjecutores : this.app.isAllowedTo('accesosEjecutores', this.id) })
                    //valueParams = JSON.stringify(this.formConsultaLibroDiario.getForm().getValues());

                    //window.location.href = 'modules/desktop/bodega/server/descargaActaIngreso.inc.php?param=' + valueParams;
                    window.location.href = 'modules/desktop/bodega/server/descargaActaEntregaRecepcion.inc.php?param=' + select_retiro_bodega;
                }
            }
        });
    },
    botonExportarActaRetiroProductos: function () {
        var rows = this.storeBodega.getCount()
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
                    // agrego el valor de parametro accesoresolutores

                    //this.formConsultaLibroDiario.getForm().setValues( {accesosEjecutores : this.app.isAllowedTo('accesosEjecutores', this.id) })
                    //valueParams = JSON.stringify(this.formConsultaLibroDiario.getForm().getValues());

                    //window.location.href = 'modules/desktop/bodega/server/descargaActaIngreso.inc.php?param=' + valueParams;
                    window.location.href = 'modules/desktop/bodega/server/descargaActaRetiroProductos.inc.php?param=' + select_retiro_bodega;
                }
            }
        });
    },
    botonExportarReporteProvidencias: function () {
        var rows = this.storeReporteProvidenciasLibroDiario.getCount()
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
                    valueParams = JSON.stringify(this.formConsultaProvidenciasLibroDiario.getForm().getValues());
                    window.location.href = 'modules/desktop/resolucion/server/descargaReporteProvidencias.inc.php?param=' + valueParams;
                }
            }
        });
    },

});
