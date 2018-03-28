var tramiteSeleccionado = '';
var inspeccionSeleccionada = '';
var todosInspectores = '';
var todasInspecciones = true;
//var fecha = date('Y-m-d H:i:s');
QoDesk.InspeccionWindow = Ext.extend(Ext.app.Module, {
    id: 'moduloInspeccion',
    type: 'desktop/moduloInspeccion',

    init: function () {
        this.launcher = {
            text: 'Inspeccion',
            iconCls: 'mantenimiento-icon',
            handler: this.createWindow,
            scope: this
        }
    },
    createWindow: function () {
        //Variables de acceso
        var accesosCoordinadorInspeccion = this.app.isAllowedTo('accesosAdministrador', this.id); //Todos los accesos, visualiza todos los trámites
        var accesosSecretaria = this.app.isAllowedTo('accesosSecretaria', this.id); //Todos los accesos, visualiza trámites pendientes
        var accesosInspectores = this.app.isAllowedTo('accesosInspeccion', this.id); //Sin acceso a pestaña trámites pendientes, acceso a inspecciones asignadas
        var accesosSupervision = this.app.isAllowedTo('accesosSupervision', this.id); //Solo modo lectura

        //Control en caso de tener asignado el perfil de administrador
        if (accesosCoordinadorInspeccion && accesosSecretaria && accesosInspectores && accesosSupervision == true) {
            accesosSecretaria = false;
            accesosInspectores = false;
            accesosSupervision = false;
        }
        //Acceso para creación y edición en pestaña Datos inspección
        if (accesosCoordinadorInspeccion || accesosInspectores == true) {
            var creacionDatosInspeccion = true;
        }
        else {
            var creacionDatosInspeccion = false;
        }

        //Acceso para creación y edición en pestaña Trámites pendientes
        if (accesosCoordinadorInspeccion || accesosSecretaria == true) {
            var creacionTramites = true;
        }
        else {
            var creacionTramites = false;
        }

        //Acceso para pestaña Inspecciones
        //if (accesosCoordinadorInspeccion || accesosInspectores || accesosSupervision == true){
        if (accesosInspectores || accesosCoordinadorInspeccion == true) {
            var pestInspeccion = true;
        }
        else {
            var pestInspeccion = false;
        }

        todosInspectores = accesosInspectores;
        console.log('accesosAdministrador ' + accesosCoordinadorInspeccion);
        console.log('accesosSecretaria ' + accesosSecretaria);
        console.log('accesosInspeccion ' + accesosInspectores);
        console.log('accesosSupervision ' + accesosSupervision);
        console.log('creacionDatosInspeccion ' + creacionDatosInspeccion);
        console.log('creacionTramites ' + creacionTramites);
        console.log('pestInspeccion ' + pestInspeccion);
        console.log('todosInspectores ' + todosInspectores);
        console.log('todasInspecciones ' + todasInspecciones);

        if (accesosSecretaria) {
            isChecked = true;
        }
        else {
            isChecked = false;
        }

        var bloqueo = (accesosCoordinadorInspeccion || accesosSecretaria || accesosInspectores || accesosSupervision) ? true : false

        var desktop = this.app.getDesktop();
        var winHeight = desktop.getWinHeight();
        var winWidth = desktop.getWinWidth();

        console.log('winHeight ' + winHeight);
        console.log('winWidth ' + winWidth);

        var AppMsg = new Ext.AppMsg({});
        var win = desktop.getWindow('grid-win-moduloInspeccion');

        //Ubicación de la carpeta de Inspeccion
        var urlInspeccion = "modules/desktop/inspeccion/server/";
        todasInspecciones = todosInspectores;
        var textField = new Ext.form.TextField({allowBlank: false, readOnly: accesosSupervision});
        var textFieldDetalle = new Ext.form.TextField({allowBlank: true, readOnly: accesosSupervision});
        var textFieldControlProgramado = new Ext.form.TextField({allowBlank: true, readOnly: accesosSupervision});
        var textFieldListadoControlProgramado = new Ext.form.TextField({
            allowBlank: true,
            readOnly: accesosSupervision
        });
        var textFieldCCF = new Ext.form.TextField({allowBlank: true, readOnly: accesosSupervision});
        var textFieldNIO = new Ext.form.TextField({allowBlank: true, readOnly: accesosSupervision});
        var textFieldListadoCCF = new Ext.form.TextField({allowBlank: true, readOnly: accesosSupervision});

        //Definición del formato de fecha
        function formatDate(value) {
            return value ? value.dateFormat('Y-m-d H:i:s') : '';
        }

        //Inicio ventana inspeccion
        //Definición de url CRUD
        var proxyModuloInspeccion = new Ext.data.HttpProxy({
            api: {
                create: urlInspeccion + "crudModuloInspeccion.php?operation=insert",
                read: urlInspeccion + "crudModuloInspeccion.php?operation=select",
                update: urlInspeccion + "crudModuloInspeccion.php?operation=update",
                destroy: urlInspeccion + "crudModuloInspeccion.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Inspeccion
        var readerModuloInspeccion = new Ext.data.JsonReader({
            //totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'codigo_tramite', readOnly: true, allowBlank: true},
                {name: 'recepcion_documento', readOnly: true, allowBlank: true},
                //{name: 'id_ordenanza', readOnly: true, allowBlank: true},
                {name: 'id_tipo_documento', readOnly: true, allowBlank: true},
                {name: 'num_documento', readOnly: true, allowBlank: true},
                {name: 'remitente', readOnly: true, allowBlank: true},
                {name: 'cedula', readOnly: true, allowBlank: true},
                {name: 'email', readOnly: true, allowBlank: true},
                {name: 'institucion', readOnly: true, allowBlank: true},
                {name: 'asunto', readOnly: true, allowBlank: true},
                //{name: 'descripcion_anexos', readOnly: true, allowBlank: true},
                {name: 'id_caracter_tramite', readOnly: true, allowBlank: true},
                {name: 'cantidad_fojas', readOnly: true, allowBlank: true},
                {name: 'procesado_inspeccion', allowBlank: true},
                {name: 'id_planificacion', allowBlank: true}
                /*
                {name: 'despacho_secretaria', allowBlank: true},
                {name: 'email', allowBlank: true},
                {name: 'observacion', allowBlank: true}*/
            ]

        });

        //Definición de escritura en campos bdd Inspeccion
        var writerModuloInspeccion = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Inicio ventana inspeccion
        //Definición de url CRUD
        var proxyDetalleInspeccion = new Ext.data.HttpProxy({
            api: {
                create: urlInspeccion + "crudDetalleInspeccion.php?operation=insert",
                read: urlInspeccion + "crudDetalleInspeccion.php?operation=select",
                update: urlInspeccion + "crudDetalleInspeccion.php?operation=update",
                destroy: urlInspeccion + "crudDetalleInspeccion.php?operation=delete"
            }
        });

        //Inicio ventana inspeccion
        //Definición de url CRUD
        var proxyDetalleTodasInspecciones = new Ext.data.HttpProxy({
            api: {
                create: urlInspeccion + "crudDetalleInspeccion.php?operation=insert",
                read: urlInspeccion + "crudDetalleInspeccion.php?operation=selectTodasInspecciones",
                update: urlInspeccion + "crudDetalleInspeccion.php?operation=update",
                destroy: urlInspeccion + "crudDetalleInspeccion.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Inspeccion
        var readerDetalleInspeccion = new Ext.data.JsonReader({
            //totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id_denuncia', readOnly: false, allowBlank: true},
                {name: 'id_inspeccion', readOnly: false, allowBlank: true},
                //{name: 'codificacion', readOnly: false, allowBlank: true},
                {name: 'nombre_denunciado', readOnly: false, allowBlank: true},
                {name: 'fecha_asignacion', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'id_actividad', readOnly: false, allowBlank: true},
                {name: 'funcionario_entrega', readOnly: false, allowBlank: true},
                {name: 'respuesta', readOnly: false, allowBlank: true},
                {name: 'guia', readOnly: false, allowBlank: true},
                {name: 'fecha_despacho', readOnly: false, allowBlank: true},
                {name: 'id_zona', readOnly: false, allowBlank: true},
                {name: 'predio', readOnly: false, allowBlank: true},
                {name: 'id_acta', readOnly: false, allowBlank: true},
                {name: 'prioridad', readOnly: false, allowBlank: true},
                {name: 'funcionario_reasignacion', readOnly: false, allowBlank: true},
                //{name: 'acta_verificacion', readOnly:false, allowBlank:true}
            ]
        });

        //Definición de lectura de campos bdd Inspeccion
        var readerDetalleTodasInspecciones = new Ext.data.JsonReader({
            //totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id_denuncia', readOnly: false, allowBlank: true},
                {name: 'id_inspeccion', readOnly: false, allowBlank: true},
                //{name: 'codificacion', readOnly: false, allowBlank: true},
                {name: 'nombre_denunciado', readOnly: false, allowBlank: true},
                {name: 'fecha_asignacion', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'id_actividad', readOnly: false, allowBlank: true},
                {name: 'funcionario_entrega', readOnly: false, allowBlank: true},
                {name: 'respuesta', readOnly: false, allowBlank: true},
                {name: 'guia', readOnly: false, allowBlank: true},
                {name: 'fecha_despacho', readOnly: false, allowBlank: true},
                {name: 'id_zona', readOnly: false, allowBlank: true},
                {name: 'predio', readOnly: false, allowBlank: true},
                {name: 'id_acta', readOnly: false, allowBlank: true},
                {name: 'prioridad', readOnly: false, allowBlank: true},
                {name: 'funcionario_reasignacion', readOnly: false, allowBlank: true}
            ]
        });

        //Definición de escritura en campos bdd Inspeccion
        var writerDetalleInspeccion = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de escritura en campos bdd Inspeccion
        var writerDetalleTodasInspecciones = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de url CRUD
        var proxyListadoInspeccion = new Ext.data.HttpProxy({
            api: {
                create: urlInspeccion + "crudListadoInspecciones.php?operation=insert",
                read: urlInspeccion + "crudListadoInspecciones.php?operation=select",
                update: urlInspeccion + "crudListadoInspecciones.php?operation=update",
                destroy: urlInspeccion + "crudListadoInspecciones.php?operation=delete"
            }
        });

        //Definición de url CRUD
        var proxyListadoControlProgramado = new Ext.data.HttpProxy({
            api: {
                create: urlInspeccion + "crudListadoControlProgramado.php?operation=insert",
                read: urlInspeccion + "crudListadoControlProgramado.php?operation=select",
                update: urlInspeccion + "crudListadoControlProgramado.php?operation=update",
                destroy: urlInspeccion + "crudListadoControlProgramado.php?operation=delete"
            }
        });

        //Definición de url CRUD
        var proxyListadoControlProgramadoTodos = new Ext.data.HttpProxy({
            api: {
                create: urlInspeccion + "crudListadoControlProgramado.php?operation=insert",
                read: urlInspeccion + "crudListadoControlProgramado.php?operation=selectTodos",
                update: urlInspeccion + "crudListadoControlProgramado.php?operation=update",
                destroy: urlInspeccion + "crudListadoControlProgramado.php?operation=delete"
            }
        });

        //Definición de url CRUD
        var proxyListadoTodosInspectores = new Ext.data.HttpProxy({
            api: {
                create: urlInspeccion + "crudListadoInspecciones.php?operation=insert",
                read: urlInspeccion + "crudListadoInspecciones.php?operation=selectTodos",
                update: urlInspeccion + "crudListadoInspecciones.php?operation=update",
                destroy: urlInspeccion + "crudListadoInspecciones.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Inspeccion
        var readerListadoInspeccion = new Ext.data.JsonReader({
            //totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id_denuncia', readOnly: false, allowBlank: true},
                {name: 'id_inspeccion', readOnly: false, allowBlank: true},
                //{name: 'codificacion', readOnly: false, allowBlank: true},
                {name: 'nombre_denunciado', readOnly: false, allowBlank: true},
                //{name: 'id_ordenanza', readOnly: true, allowBlank: true},
                {name: 'fecha_despacho', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'id_actividad', readOnly: false, allowBlank: true},
                {name: 'respuesta', readOnly: false, allowBlank: true},
                {name: 'funcionario_entrega', readOnly: false, allowBlank: true},
                {name: 'guia', readOnly: false, allowBlank: true},
                {name: 'id_zona', readOnly: false, allowBlank: true},
                {name: 'predio', readOnly: false, allowBlank: true},
                {name: 'id_control_programado', readOnly: false, allow: true},
                {name: 'id_motivo_acta', readOnly: false, allow: true},
                {name: 'id_acta', readOnly: false, allow: true},
                {name: 'num_fojas', readOnly: false, allowBlank: true},
                {name: 'acta_verificacion', readOnly: false, allowBlank: true}
            ]
        });

        //Definición de lectura de campos bdd Inspeccion
        var readerListadoControlProgramado = new Ext.data.JsonReader({
            //totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                //{name: 'id_denuncia', readOnly: false, allowBlank: true},
                {name: 'id_inspeccion', readOnly: false, allowBlank: true},
                {name: 'fecha_recepcion_documento', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'codigo_tramite', readOnly: false, allowBlank: true},
                //{name: 'tecnico', readOnly: false, allowBlank: true},
                //{name: 'fecha_asignacion_inspector', readOnly: false, allowBlank: true},
                {name: 'asunto', readOnly: false, allowBlank: true},
                {name: 'sector', readOnly: false, allowBlank: true},
                {name: 'parroquia', readOnly: false, allowBlank: true},
                {name: 'zona', readOnly: false, allowBlank: true},
                {name: 'calle', readOnly: false, allowBlank: true},
                {name: 'predio', readOnly: false, allowBlank: true},
                {name: 'clave_catastral', readOnly: false, allowBlank: true},
                {name: 'inventariado', readOnly: false, allow: true},
                {name: 'nombre_propietario', readOnly: false, allow: true},
                {name: 'cedula_propietario', readOnly: false, allow: true},
                {name: 'proyecto', readOnly: false, allow: true},
                {name: 'etapas', readOnly: false, allow: true},
                {name: 'tramite', readOnly: false, allow: true},
                {name: 'aprobacion_registro', readOnly: false, allow: true},
                {name: 'telefono', readOnly: false, allow: true},
                {name: 'registro_actas_licencias', readOnly: false, allow: true},
                {name: 'gdoc', readOnly: false, allow: true},
                {name: 'responsable_tecnico', readOnly: false, allow: true},
                {name: 'licencia_profesional', readOnly: false, allow: true},
                {name: 'licencia_municipal', readOnly: false, allow: true}
            ]
        });

        //Definición de lectura de campos bdd Inspeccion
        var readerListadoControlProgramadoTodos = new Ext.data.JsonReader({
            //totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                //{name: 'id_denuncia', readOnly: false, allowBlank: true},
                {name: 'id_inspeccion', readOnly: false, allowBlank: true},
                {name: 'fecha_recepcion_documento', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'codigo_tramite', readOnly: false, allowBlank: true},
                {name: 'tecnico', readOnly: false, allowBlank: true},
                {name: 'fecha_asignacion_inspector', readOnly: false, allowBlank: true},
                {name: 'asunto', readOnly: false, allowBlank: true},
                {name: 'sector', readOnly: false, allowBlank: true},
                {name: 'parroquia', readOnly: false, allowBlank: true},
                {name: 'zona', readOnly: false, allowBlank: true},
                {name: 'calle', readOnly: false, allowBlank: true},
                {name: 'predio', readOnly: false, allowBlank: true},
                {name: 'clave_catastral', readOnly: false, allowBlank: true},
                {name: 'inventariado', readOnly: false, allow: true},
                {name: 'nombre_propietario', readOnly: false, allow: true},
                {name: 'cedula_propietario', readOnly: false, allow: true},
                {name: 'proyecto', readOnly: false, allow: true},
                {name: 'etapas', readOnly: false, allow: true},
                {name: 'tramite', readOnly: false, allow: true},
                {name: 'aprobacion_registro', readOnly: false, allow: true},
                {name: 'telefono', readOnly: false, allow: true},
                {name: 'registro_actas_licencias', readOnly: false, allow: true},
                {name: 'gdoc', readOnly: false, allow: true},
                {name: 'responsable_tecnico', readOnly: false, allow: true},
                {name: 'licencia_profesional', readOnly: false, allow: true},
                {name: 'licencia_municipal', readOnly: false, allow: true}
            ]
        });

        //Definición de escritura en campos bdd Inspeccion
        var writerListadoInspeccion = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de escritura en campos bdd Inspeccion
        var writerListadoControlProgramado = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de escritura en campos bdd Inspeccion
        var writerListadoControlProgramadoTodos = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });


        //Definición de url CRUD
        var proxyControlProgramadoInspeccion = new Ext.data.HttpProxy({
            api: {
                create: urlInspeccion + "crudInspeccionControlProgramado.php?operation=insert",
                read: urlInspeccion + "crudInspeccionControlProgramado.php?operation=select",
                update: urlInspeccion + "crudInspeccionControlProgramado.php?operation=update",
                destroy: urlInspeccion + "crudInspeccionControlProgramado.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Inspeccion
        var readerControlProgramadoInspeccion = new Ext.data.JsonReader({
            //totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                //{name: 'id_denuncia', readOnly: false, allowBlank: true},
                {name: 'id_inspeccion', readOnly: false, allowBlank: true},
                {name: 'fecha_recepcion_documento', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'codigo_tramite', readOnly: false, allowBlank: true},
                //{name: 'tecnico', readOnly: false, allowBlank: true},
                //{name: 'fecha_asignacion_inspector', readOnly: false, allowBlank: true},
                {name: 'asunto', readOnly: false, allowBlank: true},
                {name: 'sector', readOnly: false, allowBlank: true},
                {name: 'parroquia', readOnly: false, allowBlank: true},
                {name: 'zona', readOnly: false, allowBlank: true},
                {name: 'calle', readOnly: false, allowBlank: true},
                {name: 'predio', readOnly: false, allowBlank: true},
                {name: 'clave_catastral', readOnly: false, allowBlank: true},
                {name: 'inventariado', readOnly: false, allow: true},
                {name: 'nombre_propietario', readOnly: false, allow: true},
                {name: 'cedula_propietario', readOnly: false, allow: true},
                {name: 'proyecto', readOnly: false, allow: true},
                {name: 'etapas', readOnly: false, allow: true},
                {name: 'tramite', readOnly: false, allow: true},
                {name: 'aprobacion_registro', readOnly: false, allow: true},
                {name: 'telefono', readOnly: false, allow: true},
                {name: 'registro_actas_licencias', readOnly: false, allow: true},
                {name: 'gdoc', readOnly: false, allow: true},
                {name: 'responsable_tecnico', readOnly: false, allow: true},
                {name: 'licencia_profesional', readOnly: false, allow: true},
                {name: 'licencia_municipal', readOnly: false, allow: true}
            ]
        });

        //Definición de escritura en campos bdd Inspeccion
        var writerControlProgramadoInspeccion = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });


        //Definición de url CRUD
        var proxyCCFInspeccion = new Ext.data.HttpProxy({
            api: {
                create: urlInspeccion + "crudInspeccionCCF.php?operation=insert",
                read: urlInspeccion + "crudInspeccionCCF.php?operation=select",
                update: urlInspeccion + "crudInspeccionCCF.php?operation=update",
                destroy: urlInspeccion + "crudInspeccionCCF.php?operation=delete"
            }
        });

        //Definición de url CRUD
        var proxyNIOInspeccion = new Ext.data.HttpProxy({
            api: {
                create: urlInspeccion + "crudInspeccionNIO.php?operation=insert",
                read: urlInspeccion + "crudInspeccionNIO.php?operation=select",
                update: urlInspeccion + "crudInspeccionNIO.php?operation=update",
                destroy: urlInspeccion + "crudInspeccionNIO.php?operation=delete"
            }
        });

        //Definición de url CRUD
        var proxyListadoCCFInspeccionTodos = new Ext.data.HttpProxy({
            api: {
                create: urlInspeccion + "crudListadoCCF.php?operation=insert",
                read: urlInspeccion + "crudListadoCCF.php?operation=selectTodos",
                update: urlInspeccion + "crudListadoCCF.php?operation=update",
                destroy: urlInspeccion + "crudListadoCCF.php?operation=delete"
            }
        });

        //Definición de url CRUD
        var proxyListadoCCFInspeccion = new Ext.data.HttpProxy({
            api: {
                create: urlInspeccion + "crudListadoCCF.php?operation=insert",
                read: urlInspeccion + "crudListadoCCF.php?operation=select",
                update: urlInspeccion + "crudListadoCCF.php?operation=update",
                destroy: urlInspeccion + "crudListadoCCF.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Inspeccion
        var readerCCFInspeccion = new Ext.data.JsonReader({
            //totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                //{name: 'id_denuncia', readOnly: false, allowBlank: true},
                {name: 'id_inspeccion', readOnly: false, allowBlank: true},
                {name: 'fecha_recepcion_documento', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'num_registro', readOnly: false, allowBlank: true},
                {name: 'tecnico', readOnly: false, allowBlank: true},
                {name: 'fecha_asignacion_inspector', readOnly: false, allowBlank: true},
                {name: 'fecha_inicio', readOnly: false, allowBlank: true},
                {name: 'fecha_finalizacion', readOnly: false, allowBlank: true},
                {name: 'asunto', readOnly: false, allowBlank: true},
                {name: 'tipo', readOnly: false, allowBlank: true},
                {name: 'zona', readOnly: false, allowBlank: true},
                {name: 'predio', readOnly: false, allowBlank: true},
                {name: 'clave_catastral', readOnly: false, allowBlank: true},
                {name: 'proyecto', readOnly: false, allow: true},
                {name: 'etapa', readOnly: false, allow: true},
                {name: 'tecnico', readOnly: false, allow: true},
                {name: 'fecha_inspeccion', readOnly: false, allow: true},
                {name: 'fecha_egreso_verificacion', readOnly: false, allow: true},
                {name: 'fecha_certificado_informe', readOnly: false, allow: true},
                {name: 'resultado', readOnly: false, allow: true},
                {name: 'numero_informe_certificado', readOnly: false, allow: true}
            ]
        });

        //Definición de lectura de campos bdd Inspeccion
        var readerNIOInspeccion = new Ext.data.JsonReader({
            //totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                //{name: 'id_denuncia', readOnly: false, allowBlank: true},
                {name: 'id_inspeccion', readOnly: false, allowBlank: true},
                {name: 'num_nio', readOnly: false, allowBlank: true},
                {name: 'proyecto', readOnly: false, allowBlank: true},
                {name: 'predio', readOnly: false, allowBlank: true},
                {name: 'zona', readOnly: false, allowBlank: true},
                {name: 'guia', readOnly: false, allowBlank: true},
                {name: 'certificado', readOnly: false, allowBlank: true},
                {name: 'fecha_ingreso', readOnly: false, allowBlank: true}
            ]
        });

        //Definición de lectura de campos bdd Inspeccion
        var readerListadoCCFInspeccionTodos = new Ext.data.JsonReader({
            //totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                //{name: 'id_denuncia', readOnly: false, allowBlank: true},
                {name: 'id_inspeccion', readOnly: false, allowBlank: true},
                {name: 'fecha_recepcion_documento', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'num_registro', readOnly: false, allowBlank: true},
                {name: 'tecnico', readOnly: false, allowBlank: true},
                {name: 'fecha_asignacion_inspector', readOnly: false, allowBlank: true},
                {name: 'fecha_inicio', readOnly: false, allowBlank: true},
                {name: 'fecha_finalizacion', readOnly: false, allowBlank: true},
                {name: 'asunto', readOnly: false, allowBlank: true},
                {name: 'tipo', readOnly: false, allowBlank: true},
                {name: 'zona', readOnly: false, allowBlank: true},
                {name: 'predio', readOnly: false, allowBlank: true},
                {name: 'clave_catastral', readOnly: false, allowBlank: true},
                {name: 'proyecto', readOnly: false, allow: true},
                {name: 'etapa', readOnly: false, allow: true},
                {name: 'tecnico', readOnly: false, allow: true},
                {name: 'fecha_inspeccion', readOnly: false, allow: true},
                {name: 'fecha_egreso_verificacion', readOnly: false, allow: true},
                {name: 'fecha_certificado_informe', readOnly: false, allow: true},
                {name: 'resultado', readOnly: false, allow: true},
                {name: 'numero_informe_certificado', readOnly: false, allow: true}
            ]
        });

        //Definición de lectura de campos bdd Inspeccion
        var readerListadoCCFInspeccion = new Ext.data.JsonReader({
            //totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                //{name: 'id_denuncia', readOnly: false, allowBlank: true},
                {name: 'id_inspeccion', readOnly: false, allowBlank: true},
                {name: 'fecha_recepcion_documento', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'num_registro', readOnly: false, allowBlank: true},
                {name: 'tecnico', readOnly: false, allowBlank: true},
                {name: 'fecha_asignacion_inspector', readOnly: false, allowBlank: true},
                {name: 'fecha_inicio', readOnly: false, allowBlank: true},
                {name: 'fecha_finalizacion', readOnly: false, allowBlank: true},
                {name: 'asunto', readOnly: false, allowBlank: true},
                {name: 'tipo', readOnly: false, allowBlank: true},
                {name: 'zona', readOnly: false, allowBlank: true},
                {name: 'predio', readOnly: false, allowBlank: true},
                {name: 'clave_catastral', readOnly: false, allowBlank: true},
                {name: 'proyecto', readOnly: false, allow: true},
                {name: 'etapa', readOnly: false, allow: true},
                {name: 'fecha_inspeccion', readOnly: false, allow: true},
                {name: 'fecha_egreso_verificacion', readOnly: false, allow: true},
                {name: 'fecha_certificado_informe', readOnly: false, allow: true},
                {name: 'resultado', readOnly: false, allow: true},
                {name: 'numero_informe_certificado', readOnly: false, allow: true}
            ]
        });

        //Definición de escritura en campos bdd Inspeccion
        var writerCCFInspeccion = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de escritura en campos bdd Inspeccion
        var writerNIOInspeccion = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de escritura en campos bdd Inspeccion
        var writerListadoCCFInspeccionTodos = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de escritura en campos bdd Inspeccion
        var writerListadoCCFInspeccion = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });


        //Definición de store para módulo Inspeccion
        this.storeModuloInspeccion = new Ext.data.Store({
            id: "id",
            proxy: proxyModuloInspeccion,
            reader: readerModuloInspeccion,
            writer: writerModuloInspeccion,
            autoSave: !accesosSupervision, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            //autoSave: true
            //baseParams: {}
        });

        //Definición de store para módulo Inspeccion
        this.storeDetalleInspeccion = new Ext.data.Store({
            id: "id",
            proxy: proxyDetalleInspeccion,
            reader: readerDetalleInspeccion,
            writer: writerDetalleInspeccion,
            autoSave: !accesosSupervision, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            //baseParams: {}
        });

        //Definición de store para módulo Inspeccion
        this.storeDetalleTodasInspecciones = new Ext.data.Store({
            id: "id",
            proxy: proxyDetalleTodasInspecciones,
            reader: readerDetalleTodasInspecciones,
            writer: writerDetalleTodasInspecciones,
            autoSave: !accesosSupervision, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            //baseParams: {}
        });

        this.storeListadoInspeccion = new Ext.data.Store({
            id: "id",
            proxy: proxyListadoInspeccion,
            reader: readerListadoInspeccion,
            writer: writerListadoInspeccion,
            autoSave: !accesosSupervision, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            //baseParams: {}
        });

        this.storeListadoTodosInspectores = new Ext.data.Store({
            id: "id",
            proxy: proxyListadoTodosInspectores,
            reader: readerListadoInspeccion,
            writer: writerListadoInspeccion,
            autoSave: !accesosSupervision, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            //baseParams: {}
        });

        this.storeListadoControlProgramado = new Ext.data.Store({
            id: "id",
            proxy: proxyListadoControlProgramado,
            reader: readerListadoControlProgramado,
            writer: writerListadoControlProgramado,
            autoSave: !accesosSupervision, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            //baseParams: {}
        });

        this.storeListadoControlProgramadoTodos = new Ext.data.Store({
            id: "id",
            proxy: proxyListadoControlProgramadoTodos,
            reader: readerListadoControlProgramadoTodos,
            writer: writerListadoControlProgramadoTodos,
            autoSave: !accesosSupervision, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            //baseParams: {}
        });

        this.storeControlProgramadoInspeccion = new Ext.data.Store({
            id: "id",
            proxy: proxyControlProgramadoInspeccion,
            reader: readerControlProgramadoInspeccion,
            writer: writerControlProgramadoInspeccion,
            autoSave: !accesosSupervision, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            //baseParams: {}
        });

        this.storeNIOInspeccion = new Ext.data.Store({
            id: "id",
            proxy: proxyNIOInspeccion,
            reader: readerNIOInspeccion,
            writer: writerNIOInspeccion,
            autoSave: !accesosSupervision, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            //baseParams: {}
        });

        this.storeCCFInspeccion = new Ext.data.Store({
            id: "id",
            proxy: proxyCCFInspeccion,
            reader: readerCCFInspeccion,
            writer: writerCCFInspeccion,
            autoSave: !accesosSupervision, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            //baseParams: {}
        });

        this.storeListadoCCFInspeccion = new Ext.data.Store({
            id: "id",
            proxy: proxyListadoCCFInspeccion,
            reader: readerListadoCCFInspeccion,
            writer: writerListadoCCFInspeccion,
            autoSave: !accesosSupervision, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            //baseParams: {}
        });

        this.storeListadoCCFInspeccionTodos = new Ext.data.Store({
            id: "id",
            proxy: proxyListadoCCFInspeccionTodos,
            reader: readerListadoCCFInspeccionTodos,
            writer: writerListadoCCFInspeccionTodos,
            autoSave: !accesosSupervision, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            //baseParams: {}
        });

        var checkHandler = function (item, checked) {
            if (checked) {
                var store = this.storeModuloInspeccion;
                store.baseParams.filterField = item.key;
                searchFieldBtn.setText(item.text);
            }
        };

        var checkHandlerInspecciones = function (item, checked) {
            if (checked) {
                if (todosInspectores == true) {
                    var store = this.storeListadoInspeccion;
                } else {
                    var store = this.storeListadoTodosInspectores;
                }
                //var store = this.storeModuloInspeccion;

                store.baseParams.filterField = item.key;
                searchListadoInpeccionesBtn.setText(item.text);
            }
        };

        var checkHandlerListadoControlProgramado = function (item, checked) {
            if (checked) {
                if (todosInspectores == true) {
                    var store = this.storeListadoControlProgramado;
                } else {
                    var store = this.storeListadoControlProgramadoTodos;
                }
                store.baseParams.filterField = item.key;
                searchListadoControlProgramadoBtn.setText(item.text);
            }
        };

        var checkHandlerListadoCCF = function (item, checked) {
            if (checked) {
                if (todosInspectores == true) {
                    var store = this.storeListadoCCFInspeccion;
                } else {
                    var store = this.storeListadoCCFInspeccionTodos;
                }
                store.baseParams.filterField = item.key;
                searchListadoCCFBtn.setText(item.text);
            }
        };

        var checkHandlerControlProgramado = function (item, checked) {
            if (checked) {
                var store = this.storeControlProgramadoInspeccion;
                store.baseParams.filterField = item.key;
                searchControlProgramadoBtn.setText(item.text);
            }
        };

        var checkHandlerNIO = function (item, checked) {
            if (checked) {
                var store = this.storeNIOInspeccion;
                store.baseParams.filterField = item.key;
                searchNIOBtn.setText(item.text);
            }
        };

        var checkHandlerCCF = function (item, checked) {
            if (checked) {
                var store = this.storeCCFInspeccion;
                store.baseParams.filterField = item.key;
                searchCCFBtn.setText(item.text);
            }
        };

        //inicio combo tipo documento  TID
        storeTID = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 1, "nombre": "Denuncia"},
                    {"id": 2, "nombre": "Comunicado"},
                    {"id": 3, "nombre": "Oficio"},
                    {"id": 4, "nombre": "Memorando"}
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
            //forceSelection: true,
            //allowBlank: true
        });

        function personaTipoDocumento(id) {
            var index = storeTID.find('id', id);
            if (index > -1) {
                var record = storeTID.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo tipo documento  TID

        //inicio combo reasignacion  REATOT
        storeREATOT = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=unidadestotal'
        });

        //inicio combo persona recepta la denuncia PRD
        storePRD = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalsecretaria'

        });


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

        //inicio combo caracter del tramite CDT
        storePRIORIDAD = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "Bajo"},
                    {"id": 1, "nombre": "Medio"},
                    {"id": 2, "nombre": "Alto"}
                ]
            }
        });

        //inicio combo aprobación secretaría inspección
        storeAPROBADO = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 1, "nombre": "Verificado"},
                    {"id": 2, "nombre": "Devuelto"},
                    {"id": 0, "nombre": "Pendiente"}
                ]
            }
        });

        //Inicio combo Asunto - Control programado
        storeASUNTO = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 8, "nombre": "Construcción informal"},
                    {"id": 7, "nombre": "Anulado"},
                    {"id": 6, "nombre": "Actualización/homologación"},
                    {"id": 5, "nombre": "Alcance informe anterior"},
                    {"id": 4, "nombre": "Anulado por usuario"},
                    {"id": 3, "nombre": "Edificaciones - seguimiento"},
                    {"id": 2, "nombre": "Contestación a oficio"},
                    {"id": 1, "nombre": "Control edificaciones"},
                    {"id": 0, "nombre": "Sin selección"}
                ]
            }
        });

        //Inicio combo Asunto - Tipo trámite
        storeTIPOTRAMITE = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 20, "nombre": "Homologación por pedido de administración zonal"},
                    {"id": 19, "nombre": "Anulado mediante documento"},
                    {"id": 18, "nombre": "Informe de verificación"},
                    {"id": 17, "nombre": "Alcance informe anterior"},
                    {"id": 16, "nombre": "Control áreas históricas"},
                    {"id": 15, "nombre": "Control medidas de mitigación EPMMOP"},
                    {"id": 14, "nombre": "Control documentos"},
                    {"id": 13, "nombre": "Contestación a oficio"},
                    {"id": 12, "nombre": "Control técnico"},
                    {"id": 11, "nombre": "Control seguimientos"},
                    {"id": 10, "nombre": "Control rutinario"},
                    {"id": 9, "nombre": "Control final"},
                    {"id": 8, "nombre": "Control programado 8"},
                    {"id": 7, "nombre": "Control programado 7"},
                    {"id": 6, "nombre": "Control programado 6"},
                    {"id": 5, "nombre": "Control programado 5"},
                    {"id": 4, "nombre": "Control programado 4"},
                    {"id": 3, "nombre": "Control programado 3"},
                    {"id": 2, "nombre": "Control programado 2"},
                    {"id": 1, "nombre": "Control programado 1"},
                    {"id": 0, "nombre": "Sin selección"}
                ]
            }
        });

        //inicio combo aprobación o registro de planos
        storeAPROBACIONPLANOS = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 7, "nombre": "Unificación de predios"},
                    {"id": 6, "nombre": "Actualización/reconocimiento edificaciones"},
                    {"id": 5, "nombre": "Ampliatorio"},
                    {"id": 4, "nombre": "Nuevo"},
                    {"id": 3, "nombre": "Modificatorio-apliatorio"},
                    {"id": 2, "nombre": "Modificatorio"},
                    {"id": 1, "nombre": "Aprobado"},
                    {"id": 0, "nombre": "Sin selección"}
                ]
            }
        });

        //inicio combo estado de obra
        storeESTADOOBRA = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 14, "nombre": "Derrocamiento"},
                    {"id": 13, "nombre": "Obra suspendida"},
                    {"id": 12, "nombre": "No fue posible ubicar el predio"},
                    {"id": 11, "nombre": "No se permitió ingreso a obra"},
                    {"id": 10, "nombre": "Revisión en planos"},
                    {"id": 9, "nombre": "Terminada y/o en funcionamiento"},
                    {"id": 8, "nombre": "Terminada y/o habitada"},
                    {"id": 7, "nombre": "Terminada"},
                    {"id": 6, "nombre": "En acabados"},
                    {"id": 5, "nombre": "Obra gris"},
                    {"id": 4, "nombre": "Mampostería"},
                    {"id": 3, "nombre": "Estructura y losas"},
                    {"id": 2, "nombre": "Cimentación"},
                    {"id": 1, "nombre": "No construida"},
                    {"id": 0, "nombre": "Sin selección"}
                ]
            }
        });

        //Inicio combo Asunto - Control programado
        storeINVENTARIADO = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 2, "nombre": "No"},
                    {"id": 1, "nombre": "Si"},
                    {"id": 0, "nombre": "Sin selección"}
                ]
            }
        });

        //inicio combo aprobación secretaría inspección
        storeCONTROLPROGRAMADO = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 9, "nombre": "Insistencia a informes"},
                    {"id": 8, "nombre": "Denuncia"},
                    {"id": 7, "nombre": "CCF"},
                    {"id": 5, "nombre": "Construcciones"},
                    {"id": 4, "nombre": "Fauna Urbana"},
                    {"id": 3, "nombre": "Operativo"},
                    {"id": 2, "nombre": "Inspeccion"},
                    {"id": 1, "nombre": "Inspeccion conjunta"},
                    {"id": 0, "nombre": "Control programado"},
                    {"id": 6, "nombre": "Otros"}
                ]
            }
        });

        var comboCONTROLPROGRAMADO = new Ext.form.ComboBox({
            id: 'comboCONTROLPROGRAMADO',
            store: storeCONTROLPROGRAMADO,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function controlProgramado(id) {
            var index = storeCONTROLPROGRAMADO.find('id', id);
            if (index > -1) {
                var record = storeCONTROLPROGRAMADO.getAt(index);
                return record.get('nombre');
            } else {
                return ''
            }
        }

        //inicio combo aprobación secretaría inspección
        storeMOTIVOACTA = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "De oficio"},
                    {"id": 1, "nombre": "Atención a trámite"},
                    {"id": 2, "nombre": "Denuncia"},
                    {"id": 3, "nombre": "Denuncia redes sociales"},
                    {"id": 4, "nombre": "Operativo"},
                    {"id": 5, "nombre": "Pedido del director"},
                ]
            }
        });

        //inicio combo aprobación secretaría inspección
        storeACTAVERIFICACION = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "Infracción"},
                    {"id": 1, "nombre": "Obstrucción"},
                    {"id": 2, "nombre": "Advertencia"},
                    {"id": 3, "nombre": "Conformidad"}
                ]
            }
        });

        var comboMOTIVOACTA = new Ext.form.ComboBox({
            id: 'comboMOTIVOACTA',
            store: storeMOTIVOACTA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        var comboACTAVERIFICACION = new Ext.form.ComboBox({
            id: 'comboACTAVERIFICACION',
            store: storeACTAVERIFICACION,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function motivoActa(id) {
            var index = storeMOTIVOACTA.find('id', id);
            if (index > -1) {
                var record = storeMOTIVOACTA.getAt(index);
                return record.get('nombre');
            } else {
                return ''
            }
        }

        function actaVerificacion(id) {
            var index = storeACTAVERIFICACION.find('id', id);
            if (index > -1) {
                var record = storeACTAVERIFICACION.getAt(index);
                return record.get('nombre');
            } else {
                return ''
            }
        }

        //inicio combo guia  REAGUIA
        storeREAGUIA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=guia'
        });

        //inicio combo tipo de actividad
        storeACTIVIDAD = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre_actividad'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=tipo_actividad'
        });

        //inicio combo unidad asignada Inspección
        storePERDIS = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personal_distributivo'
        });

        //inicio combo unidad asignada Inspección
        storeACTUALIZARFECHA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'fecha_asignacion'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=actualizar_fecha'
        });

        //inicio combo unidad asignada Inspección
        storeFUNREA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personal_distributivo'
        });

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

        //inicio combo actividad  ACTA
        storeACTA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=depInspeccion'
        });

        //inicio combo persona asignada PRASA
        storePRASA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalinspeccion'
        });

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

        //inicio combo denuncias ordenanza DETIORD
        storeORD = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=ordenanzas'
        });

        var comboORD = new Ext.form.ComboBox({
            id: 'comboORD',
            store: storeORD,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            //forceSelection: true,
            //allowBlank: false
        });

        var comboCDT = new Ext.form.ComboBox({
            id: 'comboCDT',
            store: storeCDT,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        var comboPRIORIDAD = new Ext.form.ComboBox({
            id: 'comboPRIORIDAD',
            store: storePRIORIDAD,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });


        var comboAPROBADO = new Ext.form.ComboBox({
            id: 'comboAPROBADO',
            store: storeAPROBADO,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        var comboASUNTO = new Ext.form.ComboBox({
            id: 'comboASUNTO',
            store: storeASUNTO,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        var comboTIPOTRAMITE = new Ext.form.ComboBox({
            id: 'comboTIPOTRAMITE',
            store: storeTIPOTRAMITE,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        var comboAPROBACIONPLANOS = new Ext.form.ComboBox({
            id: 'comboAPROBACIONPLANOS',
            store: storeAPROBACIONPLANOS,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        var comboESTADOOBRA = new Ext.form.ComboBox({
            id: 'comboESTADOOBRA',
            store: storeESTADOOBRA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        var comboLISTADOESTADOOBRA = new Ext.form.ComboBox({
            id: 'comboLISTADOESTADOOBRA',
            store: storeESTADOOBRA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        var comboCONTROLPROGRAMADO = new Ext.form.ComboBox({
            id: 'comboCONTROLPROGRAMADO',
            store: storeCONTROLPROGRAMADO,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        var comboINVENTARIADO = new Ext.form.ComboBox({
            id: 'comboINVENTARIADO',
            store: storeINVENTARIADO,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function inventariado(id) {
            var index = storeINVENTARIADO.find('id', id);
            if (index > -1) {
                var record = storeINVENTARIADO.getAt(index);
                return record.get('nombre');
            }
        }

        function listaOrdenanzas(id) {
            var index = storeORD.find('id', id);
            if (index > -1) {
                var record = storeORD.getAt(index);
                return record.get('nombre');
            }
        }

        function asunto(id) {
            var index = storeASUNTO.find('id', id);
            if (index > -1) {
                var record = storeASUNTO.getAt(index);
                return record.get('nombre');
            }
        }

        function tipoTramite(id) {
            var index = storeTIPOTRAMITE.find('id', id);
            if (index > -1) {
                var record = storeTIPOTRAMITE.getAt(index);
                return record.get('nombre');
            }
        }

        function aprobacionPlanos(id) {
            var index = storeAPROBACIONPLANOS.find('id', id);
            if (index > -1) {
                var record = storeAPROBACIONPLANOS.getAt(index);
                return record.get('nombre');
            }
        }

        function estadoObra(id) {
            var index = storeESTADOOBRA.find('id', id);
            if (index > -1) {
                var record = storeESTADOOBRA.getAt(index);
                return record.get('nombre');
            }
        }

        function caracterTramite(id) {
            var index = storeCDT.find('id', id);
            if (index > -1) {
                var record = storeCDT.getAt(index);
                // return record.get('nombre');
                if (record.get('nombre') == 'Ordinario') {
                    return '<span style="color:darkgreen; font-weight:bold !important">' + record.get('nombre') + '</span>';
                } else {
                    return '<span style="color:red; font-weight:bold !important">' + record.get('nombre') + '</span>';
                }
            }
        }

        function prioridad(id) {
            var index = storePRIORIDAD.find('id', id);
            if (index > -1) {
                var record = storePRIORIDAD.getAt(index);
                // return record.get('nombre');
                if (record.get('nombre') == 'Bajo') {
                    return '<span style="color:darkgreen; font-weight:bold !important">' + record.get('nombre') + '</span>';
                } else if (record.get('nombre') == 'Medio') {
                    return '<span style="color:darkorange; font-weight:bold !important">' + record.get('nombre') + '</span>';
                } else {
                    return '<span style="color:red; font-weight:bold !important">' + record.get('nombre') + '</span>';
                }

            }
        }

        function aprobacion(id) {
            var index = storeAPROBADO.find('id', id);
            if (index > -1) {
                var record = storeAPROBADO.getAt(index);
                // return record.get('nombre');
                if (record.get('nombre') == 'Verificado') {
                    return '<span style="color:darkgreen; font-weight:bold !important">' + record.get('nombre') + '</span>';
                } else {
                    return '<span style="color:red; font-weight:bold !important">' + record.get('nombre') + '</span>';
                }
            }
        }

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


        function departamentoReasignacion(id) {
            var index = storeREA.find('id', id);
            if (index > -1) {
                var record = storeREA.getAt(index);
                return record.get('nombre');
            } else {
                return ''
            }

        }

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

        storeACTIVIDAD.sort('orden', 'ASC');
        var comboACTIVIDAD = new Ext.form.ComboBox({
            id: 'comboACTIVIDAD',
            store: storeACTIVIDAD,
            valueField: 'id',
            displayField: 'nombre_actividad',
            mode: 'local',
            forceSelection: true,
            triggerAction: 'all',
            allowBlank: false
        });


        storePERDIS.sort('orden', 'ASC');
        var comboINSPECTOR = new Ext.form.ComboBox({
            id: 'comboINSPECTOR',
            store: storePERDIS,
            valueField: 'id',
            displayField: 'nombre',
            mode: 'local',
            forceSelection: true,
            triggerAction: 'all',
            allowBlank: false,
            typeAhead: true,
            selectOnFocus: true,
            disabled: false
        });
        comboINSPECTOR.on('select', function () {
            AppMsg.setAlert("Alerta ", 'Funcionario asignado');
            this.gridCCFInspeccion.stopEditing();
            this.storeCCFInspeccion.insert(0, inspeccion);

        })

        storeFUNREA.sort('orden', 'ASC');
        var comboFUNREA = new Ext.form.ComboBox({
            id: 'comboFUNREA',
            store: storeFUNREA,
            valueField: 'id',
            displayField: 'nombre',
            //mode: 'local',
            forceSelection: false,
            triggerAction: 'all',
            allowBlank: true
        });

        function tipoActividad(id) {
            var index = storeACTIVIDAD.find('id', id);
            if (index > -1) {
                var record = storeACTIVIDAD.getAt(index);
                return record.get('nombre_actividad');
            }
        }

        function tipoUnidadesPersonal(id) {
            var index = storePERDIS.findExact('id', id);
            if (index > -1) {
                var record = storePERDIS.getAt(index);
                return record.get('nombre');
            }
        }

        function tipoFuncionarioReasignacion(id) {
            var index = storeFUNREA.find('id', id);
            if (index > -1) {
                var record = storeFUNREA.getAt(index);
                return record.get('nombre');
            }
        }

        storePERDIS.sort('orden', 'ASC');
        var comboPERDIS = new Ext.form.ComboBox({
            id: 'comboPERDIS',
            store: storePERDIS,
            valueField: 'id',
            displayField: 'nombre',
            mode: 'local',
            forceSelection: true,
            triggerAction: 'all',
            allowBlank: false,
            typeAhead: true,
            selectOnFocus: true,
            disabled: false
        });
        comboPERDIS.on('select', function () {
            //AppMsg.setAlert("Alerta ", inspeccionSeleccionada);
            //AppMsg.setAlert("Alerta ", tramiteSeleccionado);
            //storeACTUALIZARFECHA.load({params: {id_inspeccion: inspeccionSeleccionada}});
            //storeACTUALIZARFECHA.load();
        })

        storePERDIS.sort('orden', 'ASC');
        var comboINSP = new Ext.form.ComboBox({
            id: 'comboINSP',
            store: storePERDIS,
            valueField: 'id',
            displayField: 'nombre',
            mode: 'local',
            forceSelection: true,
            triggerAction: 'all',
            allowBlank: false,
            typeAhead: true,
            selectOnFocus: true,
            disabled: false
        });
        comboINSP.on('select', function () {
            //AppMsg.setAlert("Alerta ", inspeccionSeleccionada);
            //AppMsg.setAlert("Alerta ", tramiteSeleccionado);
            //storeACTUALIZARFECHA.load({params: {id_inspeccion: inspeccionSeleccionada}});
            //storeACTUALIZARFECHA.load();
        })

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
                    }
                    , {
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
                        key: 'recepcion_documento',
                        scope: this,
                        text: 'Fecha Ingreso'
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
                        key: 'email',
                        scope: this,
                        text: 'Email'
                    }, {
                        checked: false,
                        checkHandler: checkHandler,
                        group: 'filterField',
                        key: 'institucion',
                        scope: this,
                        text: 'Entidad'
                    }, {
                        checked: false,
                        checkHandler: checkHandler,
                        group: 'filterField',
                        key: 'asunto',
                        scope: this,
                        text: 'Asunto'
                    }, {
                        checked: false,
                        checkHandler: checkHandler,
                        group: 'filterField',
                        key: 'guia',
                        scope: this,
                        text: 'Guía'
                    }
                ]
            })
            , text: 'Código trámite'
        });

        var searchListadoInpeccionesBtn = new Ext.Button({
            menu: new Ext.menu.Menu({
                items: [
                    {
                        checked: true,
                        checkHandler: checkHandlerInspecciones,
                        group: 'filterField',
                        key: 'id_inspeccion',
                        scope: this,
                        text: 'Código inspección'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerInspecciones,
                        group: 'filterField',
                        key: 'nombre_denunciado',
                        scope: this,
                        text: 'Nombre denunciado'
                    }
                ]
            })
            , text: 'Código trámite'
        });

        var searchListadoControlProgramadoBtn = new Ext.Button({
            menu: new Ext.menu.Menu({
                items: [
                    {
                        checked: true,
                        checkHandler: checkHandlerListadoControlProgramado,
                        group: 'filterField',
                        key: 'id_inspeccion',
                        scope: this,
                        text: 'Código inspección'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerListadoControlProgramado,
                        group: 'filterField',
                        key: 'zona',
                        scope: this,
                        text: 'Zona'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerListadoControlProgramado,
                        group: 'filterField',
                        key: 'parroquia',
                        scope: this,
                        text: 'Parroquia'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerListadoControlProgramado,
                        group: 'filterField',
                        key: 'sector',
                        scope: this,
                        text: 'Sector'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerListadoControlProgramado,
                        group: 'filterField',
                        key: 'predio',
                        scope: this,
                        text: 'Predio'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerListadoControlProgramado,
                        group: 'filterField',
                        key: 'clave_catastral',
                        scope: this,
                        text: 'Clave catastral'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerListadoControlProgramado,
                        group: 'filterField',
                        key: 'asunto',
                        scope: this,
                        text: 'Asunto'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerListadoControlProgramado,
                        group: 'filterField',
                        key: 'nombre_propietario',
                        scope: this,
                        text: 'Nombre propietario'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerListadoControlProgramado,
                        group: 'filterField',
                        key: 'cedula_propietario',
                        scope: this,
                        text: 'Cedula propietario'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerListadoControlProgramado,
                        group: 'filterField',
                        key: 'proyecto',
                        scope: this,
                        text: 'Proyecto'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerListadoControlProgramado,
                        group: 'filterField',
                        key: 'registro_actas_licencias',
                        scope: this,
                        text: 'Registro actas licencias'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerListadoControlProgramado,
                        group: 'filterField',
                        key: 'gdoc',
                        scope: this,
                        text: 'Gdoc'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerListadoControlProgramado,
                        group: 'filterField',
                        key: 'licencia_municipal',
                        scope: this,
                        text: 'Licencia Municipal'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerListadoControlProgramado,
                        group: 'filterField',
                        key: 'licencia_profesional',
                        scope: this,
                        text: 'Licencia Profesional'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerListadoControlProgramado,
                        group: 'filterField',
                        key: 'responsable_tecnico',
                        scope: this,
                        text: 'Responsable técnico'
                    }
                ]
            })
            , text: 'Código trámite'
        });

        var searchListadoCCFBtn = new Ext.Button({
            menu: new Ext.menu.Menu({
                items: [
                    {
                        checked: true,
                        checkHandler: checkHandlerListadoCCF,
                        group: 'filterField',
                        key: 'id_inspeccion',
                        scope: this,
                        text: 'Código inspección'
                    }
                    , {
                        checked: true,
                        checkHandler: checkHandlerListadoCCF,
                        group: 'filterField',
                        key: 'zona',
                        scope: this,
                        text: 'Zona'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerListadoCCF,
                        group: 'filterField',
                        key: 'predio',
                        scope: this,
                        text: 'Predio'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerListadoCCF,
                        group: 'filterField',
                        key: 'clave_catastral',
                        scope: this,
                        text: 'Clave catastral'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerListadoCCF,
                        group: 'filterField',
                        key: 'proyecto',
                        scope: this,
                        text: 'Proyecto'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerListadoCCF,
                        group: 'filterField',
                        key: 'asunto',
                        scope: this,
                        text: 'Asunto'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerListadoCCF,
                        group: 'filterField',
                        key: 'tipo',
                        scope: this,
                        text: 'Tipo'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerListadoCCF,
                        group: 'filterField',
                        key: 'numero_informe_certificado',
                        scope: this,
                        text: 'Número informe/certificado'
                    }
                    /*,{
                        checked: false,
                        checkHandler: checkHandlerListadoCCF,
                        group: 'filterField',
                        key: 'nombre_denunciado',
                        scope: this,
                        text: 'Nombre denunciado'
                    }*/
                ]
            })
            , text: 'Código trámite'
        });

        var searchInspeccionesBtn = new Ext.Button({
            menu: new Ext.menu.Menu({
                items: [
                    {
                        checked: true,
                        checkHandler: checkHandlerInspecciones,
                        group: 'filterField',
                        key: 'id_inspeccion',
                        scope: this,
                        text: 'Código inspección'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerInspecciones,
                        group: 'filterField',
                        key: 'nombre_denunciado',
                        scope: this,
                        text: 'Nombre denunciado'
                    }
                ]
            })
            , text: 'Código trámite'
        });

        var searchControlProgramadoBtn = new Ext.Button({
            menu: new Ext.menu.Menu({
                items: [
                    {
                        checked: true,
                        checkHandler: checkHandlerControlProgramado,
                        group: 'filterField',
                        key: 'id_inspeccion',
                        scope: this,
                        text: 'Código inspección'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerControlProgramado,
                        group: 'filterField',
                        key: 'zona',
                        scope: this,
                        text: 'Zona'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerControlProgramado,
                        group: 'filterField',
                        key: 'parroquia',
                        scope: this,
                        text: 'Parroquia'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerControlProgramado,
                        group: 'filterField',
                        key: 'sector',
                        scope: this,
                        text: 'Sector'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerControlProgramado,
                        group: 'filterField',
                        key: 'predio',
                        scope: this,
                        text: 'Predio'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerControlProgramado,
                        group: 'filterField',
                        key: 'clave_catastral',
                        scope: this,
                        text: 'Clave catastral'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerControlProgramado,
                        group: 'filterField',
                        key: 'asunto',
                        scope: this,
                        text: 'Asunto'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerControlProgramado,
                        group: 'filterField',
                        key: 'nombre_propietario',
                        scope: this,
                        text: 'Nombre propietario'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerControlProgramado,
                        group: 'filterField',
                        key: 'cedula_propietario',
                        scope: this,
                        text: 'Cedula propietario'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerControlProgramado,
                        group: 'filterField',
                        key: 'proyecto',
                        scope: this,
                        text: 'Proyecto'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerControlProgramado,
                        group: 'filterField',
                        key: 'registro_actas_licencias',
                        scope: this,
                        text: 'Registro actas licencias'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerControlProgramado,
                        group: 'filterField',
                        key: 'gdoc',
                        scope: this,
                        text: 'Gdoc'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerControlProgramado,
                        group: 'filterField',
                        key: 'licencia_municipal',
                        scope: this,
                        text: 'Licencia Municipal'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerControlProgramado,
                        group: 'filterField',
                        key: 'licencia_profesional',
                        scope: this,
                        text: 'Licencia Profesional'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerControlProgramado,
                        group: 'filterField',
                        key: 'responsable_tecnico',
                        scope: this,
                        text: 'Responsable técnico'
                    }
                ]
            })
            , text: 'Código trámite'
        });

        var searchNIOBtn = new Ext.Button({
            menu: new Ext.menu.Menu({
                items: [
                    {
                        checked: true,
                        checkHandler: checkHandlerNIO,
                        group: 'filterField',
                        key: 'id_inspeccion',
                        scope: this,
                        text: 'Código inspección'
                    }
                    /*t: 'Zona'
                    }
                    ,{
                        checked: false,
                        checkHandler: checkHandlerCCF,
                        group: 'filterField',
                        key: 'predio',
                        scope: this,
                        text: 'Predio'
                    }*/
                ]
            })
            , text: 'Código trámite'
        });

        var searchCCFBtn = new Ext.Button({
            menu: new Ext.menu.Menu({
                items: [
                    {
                        checked: true,
                        checkHandler: checkHandlerCCF,
                        group: 'filterField',
                        key: 'id_inspeccion',
                        scope: this,
                        text: 'Código inspección'
                    }
                    , {
                        checked: true,
                        checkHandler: checkHandlerCCF,
                        group: 'filterField',
                        key: 'zona',
                        scope: this,
                        text: 'Zona'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerCCF,
                        group: 'filterField',
                        key: 'predio',
                        scope: this,
                        text: 'Predio'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerCCF,
                        group: 'filterField',
                        key: 'clave_catastral',
                        scope: this,
                        text: 'Clave catastral'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerCCF,
                        group: 'filterField',
                        key: 'proyecto',
                        scope: this,
                        text: 'Proyecto'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerCCF,
                        group: 'filterField',
                        key: 'asunto',
                        scope: this,
                        text: 'Asunto'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerCCF,
                        group: 'filterField',
                        key: 'tipo',
                        scope: this,
                        text: 'Tipo'
                    }
                    , {
                        checked: false,
                        checkHandler: checkHandlerCCF,
                        group: 'filterField',
                        key: 'numero_informe_certificado',
                        scope: this,
                        text: 'Número informe/certificado'
                    }
                ]
            })
            , text: 'Código trámite'
        });


        //this.storeModuloInspeccion.load();
        //this.storeDetalleInspeccion.load();
        this.storeControlProgramadoInspeccion.load();

        this.storeCCFInspeccion.load();
        this.storeNIOInspeccion.load();

        if (todosInspectores == true) {
            this.storeListadoInspeccion.load();
        } else {
            this.storeListadoTodosInspectores.load();
        }

        if (todosInspectores == true) {
            this.storeListadoControlProgramado.load();
        } else {
            this.storeListadoControlProgramadoTodos.load();
        }

        if (todosInspectores == true) {
            this.storeListadoCCFInspeccion.load();
        } else {
            this.storeListadoCCFInspeccionTodos.load();
        }

        storeModuloInspeccion = this.storeModuloInspeccion;
        limiteModuloInspeccion = 100;
        storeDetalleInspeccion = this.storeDetalleInspeccion;
        storeDetalleTodasInspecciones = this.storeDetalleTodasInspecciones;
        limiteDetalleInspeccion = 10;
        storeModuloInspeccion.baseParams = {
            limit: limiteModuloInspeccion
        };

        //Inicio formato grid Inspeccion
        this.gridModuloInspeccion = new Ext.grid.EditorGridPanel({
            id: 'gridModuloInspeccion',
            xtype: "grid",
            //Calculo de tamaño vertical frame superior de pestaña Trámites pendientes
            height: winHeight * 0.42,
            //Calculo de tamaño horizontal frame superior de pestaña Trámites pendientes
            width: winWidth * 0.98,
            store: this.storeModuloInspeccion,
            columns: [
                //Definición de campos bdd Inspeccion
                new Ext.grid.RowNumberer(),
                {header: 'Trámite', dataIndex: 'codigo_tramite', sortable: true, width: 62},
                {
                    header: 'Fecha ingreso', dataIndex: 'recepcion_documento', sortable: true, width: 120, sorters: [{
                        direction: 'ASC'
                    }]
                },
                {
                    header: 'Aceptación',
                    dataIndex: 'procesado_inspeccion',
                    sortable: true,
                    width: 100,
                    editor: comboAPROBADO,
                    renderer: aprobacion
                },
                {
                    header: 'Tipo documento', dataIndex: 'id_tipo_documento', sortable: true, width: 110,
                    editor: comboTID, renderer: personaTipoDocumento
                },
                {header: 'Núm documento', dataIndex: 'num_documento', sortable: true, width: 145, editor: textField},
                //{header: 'Ordenanza', dataIndex: 'id_ordenanza', sortable: true, width: 180, editor: comboORD, renderer: listaOrdenanzas},
                {header: 'Nombre remitente', dataIndex: 'remitente', sortable: true, width: 200, editor: textField},
                {header: 'Cédula', dataIndex: 'cedula', sortable: true, width: 100, editor: textField},
                {header: 'Email denunciante', dataIndex: 'email', sortable: true, width: 150, editor: textField},
                {header: 'Entidad', dataIndex: 'institucion', sortable: true, width: 120, editor: textField},
                {header: 'Asunto', dataIndex: 'asunto', sortable: true, width: 200, editor: textField},
                {
                    header: 'Urgencia', dataIndex: 'id_caracter_tramite', sortable: true, width: 100, editor: comboCDT,
                    renderer: caracterTramite
                },
                {header: 'Fojas', dataIndex: 'cantidad_fojas', width: 55, editor: textField},

                {
                    header: 'Planificación',
                    dataIndex: 'id_planificacion',
                    sortable: true,
                    width: 150,
                    editor: comboCONTROLPROGRAMADO,
                    renderer: controlProgramado
                }
            ],
            viewConfig: {
                forceFit: winWidth > 1024 ? true : false
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: function (sm, row, rec) {
                        // recuperamos la informacion de personal asignado a ese operativo
                        //select_codigo_tramite = rec.id;
                        storeDetalleInspeccion.load({params: {id: rec.id}});
                        tramiteSeleccionado = rec.id;
                        inspeccionSeleccionada = rec.id_denuncia;
                        //storeDetalleInspeccion.load({params: {filterText: rec.data.codigo_tramite}});
                        if (creacionDatosInspeccion) {
                            Ext.getCmp('btnNuevoDetalleInspeccion').setDisabled(false);
                            Ext.getCmp('btnEliminarDetalleInspeccion').setDisabled(false);
                            Ext.getCmp('checkTodasInspecciones').setValue(false);
                            Ext.getCmp('gridDetalleTodasInspecciones').setVisible(false);
                            Ext.getCmp('gridDetalleInspeccion').setVisible(true);
                        }
                    }
                }
            }),
            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteModuloInspeccion,
                store: storeModuloInspeccion,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "No existen trámites que mostrar"
            })
        });
        //Fin formato grid Inspeccion

        //inicio mantenimiento InspeccionActa
        var proxyInspeccionActa = new Ext.data.HttpProxy({
            api: {
                create: urlInspeccion + "crudInspeccionActa.php?operation=insert",
                read: urlInspeccion + "crudInspeccionActa.php?operation=select",
                update: urlInspeccion + "crudInspeccionActa.php?operation=update",
                destroy: urlInspeccion + "crudInspeccionActa.php?operation=delete"
            }
        });

        var readerInspeccionActa = new Ext.data.JsonReader({
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

        var writerInspeccionActa = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        this.storeInspeccionActa = new Ext.data.Store({
            id: "id",
            proxy: proxyInspeccionActa,
            reader: readerInspeccionActa,
            writer: writerInspeccionActa,
            autoSave: true
        });
        this.storeInspeccionActa.load();

        this.gridInspeccionActa = new Ext.grid.EditorGridPanel({
            id: 'gridInspeccionActa',
            xtype: "grid",
            height: 200,
            store: this.storeInspeccionActa,
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
                        storeInspeccionActaSimple.load({params: {filterField: 'guia', filterText: rec.get("id")}})
                    }
                }
            }),
            border: false,
            stripeRows: true,
            bbar: new Ext.PagingToolbar({
                pageSize: 100,
                store: this.storeInspeccionActa,
                displayInfo: true,
                displayMsg: 'Mostrando denuncias {0} - {1} de {2} AMC',
                emptyMsg: "No existen nada  que mostrar"
            }),
        });

        //fin mantenimiento InspeccionActa

        // Inicio mantenimiento InspeccionActa simple
        this.storeInspeccionActaSimple = new Ext.data.Store({
            id: "id",
            proxy: proxyDetalleInspeccion,
            reader: readerDetalleInspeccion,
            writer: writerDetalleInspeccion,
            autoSave: accesosSupervision, // dependiendo de si se tiene acceso para grabar
            remoteSort: true
        });
        storeInspeccionActaSimple = this.storeInspeccionActaSimple
        this.gridInspeccionActaSimple = new Ext.grid.EditorGridPanel({
            autoHeight: true,
            autoScroll: true,
            height:100,
            store: this.storeInspeccionActaSimple,
            columns: [
                new Ext.grid.RowNumberer(),
                {header: 'Código trámite', dataIndex: 'id_denuncia', hidden: true},
                {header: 'Cod. inspección', dataIndex: 'id_inspeccion', sortable: true, width: 90},
                //{header: 'Codificacion', dataIndex: 'codificacion', sortable: true, width: 200, editor: textFieldDetalle, autoSave:true},
                {
                    header: 'Codificacion',
                    dataIndex: 'id_actividad',
                    sortable: true,
                    width: 140,
                    renderer: tipoActividad
                },
                {
                    header: 'Nombre denunciado',
                    dataIndex: 'nombre_denunciado',
                    sortable: true,
                    width: 180,
                },
                {
                    header: 'Zona', dataIndex: 'id_zona', sortable: true, width: 120,
                    renderer: zonaAdm
                },
                {header: 'Predio', dataIndex: 'predio', sortable: true, width: 150},
                {
                    header: 'Inspector',
                    dataIndex: 'funcionario_entrega',
                    sortable: true,
                    width: 200,
                    renderer: tipoUnidadesPersonal
                },
                {
                    header: 'Fecha asignación',
                    dataIndex: 'fecha_asignacion',
                    sortable: true,
                    width: 120,
                    allowBlank: true
                    ,
                    renderer: formatDate
                },
                {
                    header: 'Funcionario Reasignación',
                    dataIndex: 'funcionario_reasignacion',
                    sortable: true,
                    width: 200,
                    renderer: tipoFuncionarioReasignacion
                },
                {header: 'Guia', dataIndex: 'guia', sortable: true, width: 100},
                {header: 'Sumilla DMI', dataIndex: 'fecha_despacho', sortable: true, width: 120, allowBlank: true},
                //{header: 'Acta', dataIndex: 'id_acta', sortable: true, width: 100 },
                {
                    header: 'Prioridad', dataIndex: 'prioridad', sortable: true, width: 100 ,
                    renderer: prioridad
                },
                {
                    header: 'Fecha memo/oficio',
                    dataIndex: 'fecha_memo_oficio',
                    sortable: true,
                    width: 150,
                    allowBlank: true
                    ,
                    renderer: formatDate
                },
                {
                    header: 'Num memo/oficio',
                    dataIndex: 'numero_memo_oficio',
                    sortable: true,
                    width: 150
                },
                {
                    header: 'Cargo (enviado)',
                    dataIndex: 'cargo_enviado',
                    sortable: true,
                    width: 150
                },
                {
                    header: 'Institución recibe',
                    dataIndex: 'institucion_recibe',
                    sortable: true,
                    width: 150
                },
                {header: 'Num acta', dataIndex: 'numero_acta', sortable: true, width: 150, editor: textFieldDetalle},
                {
                    header: 'Num informe',
                    dataIndex: 'numero_informe',
                    sortable: true,
                    width: 150
                },
                {
                    header: 'Ordenanza aplicada',
                    dataIndex: 'id_ordenanza',
                    sortable: true,
                    width: 180 ,
                    renderer: listaOrdenanzas
                },
                {header: 'Infraccion', dataIndex: 'infraccion', sortable: true, width: 150 },
                {
                    header: 'Observaciones',
                    dataIndex: 'observaciones',
                    sortable: true,
                    width: 150
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

        });
        // Inicio mantenimiento InspeccionActa simple

        //////////////////////////////////////////

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

                var geoSecretaria = "";

                var acceso = (accesosAdministrador || accesosSecretaria || accesosZonales) ? true : false

                var desktop = this.app.getDesktop();
                var AppMsg = new Ext.AppMsg({});

                var win = desktop.getWindow('grid-win-denuncias');
                var urlDenuncias = "modules/desktop/denuncias/server/";

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
                            {"id": 1, "nombre": "Denuncias"},
                            {"id": 3, "nombre": "Oficio"},
                            {"id": 4, "nombre": "Memorando"}

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
                    var index = storeOFAC.findExact('id', id);
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
                    var index = storeREA.findExact('id', id);
                    if (index > -1) {
                        var record = storeREA.getAt(index);
                        return record.get('nombre');
                    } else {
                        return ''
                    }

                }

                //fin combo reasignacion REA


                //inicio combo aprobación secretaría inspección
                storeCONTROLPROGRAMADO = new Ext.data.JsonStore({
                    root: 'datos',
                    fields: ['id', 'nombre'],
                    autoLoad: true,
                    data: {
                        datos: [
                            {"id": 8, "nombre": "Denuncia"},
                            {"id": 7, "nombre": "CCF"},
                            {"id": 6, "nombre": "Operativos"},
                            {"id": 5, "nombre": "Construcciones"},
                            {"id": 4, "nombre": "Fauna Urbana"},
                            {"id": 3, "nombre": "Operativo"},
                            {"id": 2, "nombre": "Inspeccion"},
                            {"id": 1, "nombre": "Inspeccion conjunta"},
                            {"id": 0, "nombre": "Control programado"}
                        ]
                    }
                });

                var comboCONTROLPROGRAMADO= new Ext.form.ComboBox({
                    id: 'comboCONTROLPROGRAMADO',
                    store: storeCONTROLPROGRAMADO,
                    valueField: 'id',
                    displayField: 'nombre',
                    triggerAction: 'all',
                    mode: 'local'
                });

                function controlProgramado(id) {
                    var index = storeCONTROLPROGRAMADO.find('id', id);
                    if (index > -1) {
                        var record = storeCONTROLPROGRAMADO.getAt(index);
                        return record.get('nombre');
                    } else {
                        return ''
                    }
                }

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
                    var index = storeREATOT.findExact('id', id);
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
                    var index = storeREAGUIA.findExact('id', id);
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

                //inicio combo denuncias ordenanza DETIORD
                storeDETIORD = new Ext.data.JsonStore({
                    root: 'data',
                    fields: ['id', 'nombre'],
                    autoLoad: true,
                    url: 'modules/common/combos/combos.php?tipo=ordenanzas'
                });

                var comboDETIORD = new Ext.form.ComboBox({
                    id: 'comboDETIORD',
                    store: storeDETIORD,
                    valueField: 'id',
                    displayField: 'nombre',
                    triggerAction: 'all',
                    mode: 'local',
                    forceSelection: true,
                    allowBlank: false
                });

                function denunciasListaOrdenanza(id) {
                    var index = storeDETIORD.findExact('id', id);
                    if (index > -1) {
                        var record = storeDETIORD.getAt(index);
                        return record.get('nombre');
                    }
                }

                //fin  combo denuncias ordenanza

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
                    var index = storePRD.findExact('id', id);
                    if (index > -1) {
                        var record = storePRD.getAt(index);
                        return  '<span style="font-size: 10px!important">' + record.get('nombre') + '</span>';
                    }
                }

                function smalltext (id) {
                    return '<span style="font-size: 10px!important">' + id + '</span>';
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
                //inicio combo instituciones REMITENTE
                storeREMI = new Ext.data.JsonStore({
                    root: 'data',
                    fields: ['nombre'],
                    autoLoad: true,
                    url: 'modules/common/combos/combos.php?tipo=remitente'

                });

                var comboREMI = new Ext.form.ComboBox({
                    id: 'comboREMI',
                    store: storeREMI,
                    valueField: 'nombre',
                    displayField: 'nombre',
                    triggerAction: 'all',
                    mode: 'local',
                    allowBlank: false
                });

                function listadoRemitentes(id) {
                    return id;
                }

                //fin combo instituciones REMI

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
                    var index = storeACTA.findExact('id', id);
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
                    var index = storeESREA.findExact('id', id);
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
                    var index = storePRASA.findExact('id', id);
                    if (index > -1) {
                        var record = storePRASA.getAt(index);
                        return record.get('nombre');
                    }
                }

                //fin combo caracter del tramite PRASA
// inicio combos inspeccion

// inicio pestañas de mantenimiento



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

                this.gridInspeccionActa = new Ext.data.Store({
                    id: "id",
                    proxy: proxyDenunciasGuia,
                    reader: readerDenunciasGuia,
                    writer: writerDenunciasGuia,
                    autoSave: true
                });
                this.gridInspeccionActa.load();

                this.gridDenunciasGuia = new Ext.grid.EditorGridPanel({
                    id: 'gridDenunciasGuia',
                    xtype: "grid",
                    height: 200,
                    store: this.gridInspeccionActa,
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
                                storeInspeccionActaSimple.load({params: {filterField: 'guia', filterText: rec.get("id")}})
                            }
                        }
                    }),
                    border: false,
                    stripeRows: true,
                    bbar: new Ext.PagingToolbar({
                        pageSize: 100,
                        store: this.gridInspeccionActa,
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
                                if (res.message != '') {
                                    AppMsg.setAlert(AppMsg.STATUS_NOTICE, res.message);
                                }
                            }
                        },
                        exception: function (proxy, response, operation ) {
                            if (operation == 'create') {

                                console.log (proxy)
                            }
                        },
                        loadexception: function (proxy, response, operation ) {
                            console.log (proxy)
                            console.log (response)
                            console.log (operation)

                            if (operation == 'create') {

                                console.log (proxy)
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
                        {name: 'recepcion_documento', type: 'date', dateFormat: 'c', allowBlank: false},
                        {name: 'id_tipo_documento', allowBlank: false},
                        {name: 'id_ordenanza', allowBlank: true},
                        {name: 'cedula', allowBlank: true},
                        {name: 'email', allowBlank: true},
                        {name: 'num_documento', allowBlank: false},
                        {name: 'remitente', allowBlank: false},
                        {name: 'asunto', allowBlank: false},
                        {name: 'institucion', allowBlank: true},
                        {name: 'descripcion_anexos', allowBlank: false},
                        {name: 'reasignacion', allowBlank: false},
                        {name: 'id_caracter_tramite', allowBlank: false},
                        {name: 'cantidad_fojas', allowBlank: false},

                        {name: 'despacho_secretaria', type: 'boolean', allowBlank: false}
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
                    remoteSort: true,
                    baseParams: {}
                });
                storeDenuncias = this.storeDenuncias;
                limitedenuncias = 100;

                storeDenuncias.baseParams = {
                    limit: limitedenuncias
                };

                this.gridDenuncias = new Ext.grid.EditorGridPanel({
                    height: 160,
                    store: this.storeDenuncias,
                    columns: [
                        new Ext.grid.RowNumberer(),
                        {
                            header: 'Código',
                            dataIndex: 'codigo_tramite',
                            sortable: true,
                            width: 18
                        },
                        {
                            header: 'Persona recepta',
                            dataIndex: 'id_persona',
                            sortable: true,
                            width: 28,
                            renderer: personaReceptaDenuncia
                        }, {
                            header: 'Recepción documento',
                            dataIndex: 'recepcion_documento',
                            sortable: true,
                            width: 40,
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
                            width: 30,
                            editor: comboTID, renderer: personaTipoDocumento
                        },
                        {
                            header: 'Ordenanza',
                            dataIndex: 'id_ordenanza',
                            sortable: true,
                            width: 24,
                            editor: comboDETIORD, renderer: denunciasListaOrdenanza

                        },
                        {
                            header: 'N. documento',
                            dataIndex: 'num_documento',
                            sortable: true,
                            width: 36,
                            editor: new Ext.form.TextField({allowBlank: false}), renderer: smalltext
                        },
                        {
                            header: 'Remitente/denunciante',
                            dataIndex: 'remitente',
                            sortable: true,
                            width: 50,
                            editor: comboREMI, renderer: listadoRemitentes
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
                            width: 50,
                            editor: new Ext.form.TextField({allowBlank: false}), renderer: smalltext
                        },
                        {
                            header: 'Descripción anexos',
                            dataIndex: 'descripcion_anexos',
                            sortable: true,
                            width: 38,
                            editor: new Ext.form.TextField({allowBlank: false}), renderer: smalltext
                        }
                        , {
                            header: 'Caracter',
                            dataIndex: 'id_caracter_tramite',
                            sortable: true,
                            width: 22,
                            editor: comboCDT, renderer: caracterTramite
                        }, {
                            header: 'Fojas',
                            dataIndex: 'cantidad_fojas',
                            align: 'center',
                            width: 16,
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
                            width: 45,
                            editor: comboREA, renderer: departamentoReasignacion
                        }
                        , {
                            header: 'Despachado'
                            , dataIndex: 'despacho_secretaria'
                            , align: 'center'
                            , falseText: 'No'
                            , menuDisabled: true
                            , trueText: 'Si'
                            , sortable: true
                            , width: 18
                            , xtype: 'booleancolumn'
                        }
                    ],
                    viewConfig: {
                        forceFit: true,
                        getRowClass: function (record, index) {
                            if (record.get('despacho_secretaria') == false) {
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

                                    cargaDetalle(rec.id, this.formDenunciasDetalle, rec.get("despacho_secretaria"));
                                    if (acceso) {
                                        if (rec.get("despacho_secretaria"))
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
                        displayMsg: 'Mostrando trámites  {0} - {1} of {2}',
                        emptyMsg: "No existen trámites que mostrar"
                        //filter: Ext.getCmp('tb_seleccionarUnidad').getValue()

                    }),

                    listeners: {
                        beforeedit: function (e) {
                            if (acceso) {
                                if (e.record.get("despacho_secretaria")) {
                                    return false;
                                }
                                return true;
                            } else {
                                return false;
                            }
                        },
                        afteredit: function (sm) {
                            //rowselect: function (sm, row, rec) {
                            /*cargar el formulario*/
                            cargaDetalle(sm.record.i, this.formDenunciaswebDetalle, false);


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
                            width: 15
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
                            header: 'Remitente/denunciante',
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
                            , dataIndex: 'despacho_secretaria'
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
                                if (e.record.get("despacho_secretaria")) {
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

                    height: desktop.getWinHeight() - 238,
                    autoScroll: true,
                    store: this.storeDocumentosReporte,
                    columns: [
                        new Ext.grid.RowNumberer(),
                        {
                            header: 'Código',
                            dataIndex: 'codigo_tramite',
                            sortable: true,
                            width: 15
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
                            header: 'Ordenanza',
                            dataIndex: 'id_ordenanza',
                            sortable: true,
                            width: 28,
                            renderer: denunciasListaOrdenanza

                        },
                        {
                            header: 'N. documento',
                            dataIndex: 'num_documento',
                            sortable: true,
                            width: 40
                        },
                        {
                            header: 'Remitente/ Denunciante',
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
                            , dataIndex: 'despacho_secretaria'
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
                        displayMsg: 'Mostrando guías {0} - {1} of {2}',
                        emptyMsg: "No existen guías que mostrar"
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
                                                                fieldLabel: 'Remitente/ Denunciante',
                                                                id: 'remitente',
                                                                name: 'remitente',
                                                                anchor: '95%'
                                                            },
                                                            {
                                                                fieldLabel: 'CI denunciante',
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
                                                            },
                                                            {
                                                                fieldLabel: 'Dirección denuncia',
                                                                id: 'direccion_denuncia',
                                                                name: 'direccion_denuncia',
                                                                anchor: '95%'
                                                            },
                                                            {
                                                                fieldLabel: 'Georeferencia',
                                                                id: 'georeferenciaSecretaria',
                                                                name: 'georeferencia',
                                                                anchor: '95%',
                                                                allowBlank: true,
                                                                handleMouseEvents: true,
                                                                readOnly: true,
                                                                listeners: {
                                                                    render: function(c){
                                                                        //evento click sobre el campo de geo referenciacion
                                                                        c.getEl().on('click', function(){
                                                                            Ext.getCmp('panelPrincipal').setActiveTab(3);
                                                                        }, c);
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {

                                                        columnWidth: 1 / 3,
                                                        layout: 'form',
                                                        items: [
                                                            {
                                                                xtype: 'combo',
                                                                fieldLabel: 'Ordenanza',
                                                                id: 'id_ordenanza',
                                                                name: 'id_ordenanza',
                                                                anchor: '95%',

                                                                hiddenName: 'id_ordenanza',
                                                                store: storeDETIORD,
                                                                valueField: 'id',
                                                                displayField: 'nombre',
                                                                typeAhead: true,
                                                                triggerAction: 'all',
                                                                mode: 'local'
                                                            },
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

                                                                    if (field.getName() == 'despacho_secretaria') {
                                                                        if (oldVal == 'true') {
                                                                            if (newVal == 'false') {
                                                                                Ext.getCmp('tb_grabardenuncias').setDisabled(false);
                                                                                Ext.getCmp('reasignacion').enable();
                                                                            }
                                                                        }
                                                                    }

                                                                    if (field.getName() == 'guia') {
                                                                        if (oldVal != newVal) {

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
                                                                name: 'despacho_secretaria',
                                                                id: 'despacho_secretaria',
                                                                anchor: '95%',

                                                                hiddenName: 'despacho_secretaria',
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
                        ],
                        defaults: {
                            /*  listeners: {
                                  change: function (field, newVal, oldVal) {
                                      consolo.log ("ccc");
                                      var myForm = Ext.getCmp('formDenunciasDetalle').getForm();
                                      myForm.submit({
                                          url: 'modules/desktop/denuncias/server/crudDenuncias.php?operation=updateForm',
                                          method: 'POST'
                                      });
                                  }
                              }*/
                        }

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
                                    text: 'Remitente/ Denunciante'
                                }
                                , {
                                    checked: false,
                                    checkHandler: checkHandler,
                                    group: 'filterField',
                                    key: 'descripcion_anexos',
                                    scope: this,
                                    text: 'Descripcion Anexos'
                                }

                                ,
                                {
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
                                },
                                {
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
                                }, {
                                    checked: false,
                                    checkHandler: checkHandler,
                                    group: 'filterField',
                                    key: 'asunto',
                                    scope: this,
                                    text: 'Asunto'
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
                            id: 'panelPrincipal',
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
                                                //storeDenuncias.load({params: {noenviados: isChecked}});
                                                storeDenuncias.baseParams = {
                                                    noenviados: isChecked
                                                };
                                                storeDenuncias.load();
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
                                                    storeDenuncias.baseParams = {
                                                        noenviados: isChecked,
                                                        unidadfiltro: t.value
                                                    };
                                                    storeDenuncias.load();
                                                }

                                            }

                                        },
                                        {
                                            iconCls: 'excel-icon',
                                            handler: this.botonExportarReporte,
                                            scope: this,
                                            text: 'Generar copia Acta',
                                            tooltip: 'Se genera la descarga del acta seleccionada',
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
                                    title: 'Reportes',
                                    closable: true,
                                    layout: 'border',
                                    //disabled: this.app.isAllowedTo('accesosSecretaria', this.id) ? false : true,
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


                                ,{
                                    autoScroll: true,
                                    title: 'Geolocalización',
                                    closable: true,

                                    items: [{
                                        region: 'center',
                                        xtype: 'gmappanel',
                                        zoomLevel: 12,
                                        gmapType: 'map',
                                        id: 'my_map',
                                        border: false,
                                        fbar: [
                                            {
                                                text: 'Confirmar dirección',
                                                handler: function() {
                                                    Ext.getCmp('georeferenciaSecretaria').setValue(geoSecretaria);
                                                    Ext.getCmp('panelPrincipal').setActiveTab(0);
                                                }
                                            } ],
                                        mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
                                        mapControls: ['GSmallMapControl','GMapTypeControl'],
                                        setCenter: {
                                            lat: -0.1756096,
                                            lng: -78.4761627
                                        },
                                        markers: [{
                                            lat:  -0.17157021176359674,
                                            lng: -78.47847476417087,
                                            marker: {title: 'Quito', draggable: true},
                                            listeners: {
                                                click: function(e){
                                                    //console.log ("Click al boton");
                                                },
                                                dragend: function(e){
                                                    geoSecretaria = e.latLng.lat() + ", " + e.latLng.lng()

                                                }
                                            }
                                        }]
                                    }]
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


                    Ext.getCmp('despacho_secretaria').setReadOnly(!acceso);
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
                    asunto:'',
                    id_caracter_tramite: '1',
                    cantidad_fojas: '0',
                    despacho_secretaria: false

                });
                this.gridDenuncias.stopEditing();
                this.storeDenuncias.insert(0, denuncias);
                this.gridDenuncias.startEditing(0, 0);

            },
            requestGridData: function () {


                this.storeDenuncias.load({params: {noenviados: Ext.getCmp('checkNoEnviados').getValue()}});
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
                                    if (typeof action.response.responseText !== 'undefined') {
                                        var errorJson = JSON.parse(action.response.responseText);
                                        Ext.Msg.show({
                                            title: 'Error campos obligatorios'
                                            , msg: errorJson.msg
                                            , modal: true
                                            , icon: Ext.Msg.ERROR
                                            , buttons: Ext.Msg.OK
                                        });
                                    }
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


            requestGridDataDenunciasGuia: function () {
                this.gridInspeccionActa.load();
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
                            window.location.href = 'modules/desktop/denuncias/server/descargaReporte.inc.php?param=' + valueParams;
                        }
                    }
                });
            }
        });QoDesk.DenunciasWindow = Ext.extend(Ext.app.Module, {
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

                var geoSecretaria = "";

                var acceso = (accesosAdministrador || accesosSecretaria || accesosZonales) ? true : false

                var desktop = this.app.getDesktop();
                var AppMsg = new Ext.AppMsg({});

                var win = desktop.getWindow('grid-win-denuncias');
                var urlDenuncias = "modules/desktop/denuncias/server/";

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
                            {"id": 1, "nombre": "Denuncias"},
                            {"id": 3, "nombre": "Oficio"},
                            {"id": 4, "nombre": "Memorando"}

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
                    var index = storeOFAC.findExact('id', id);
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
                    var index = storeREA.findExact('id', id);
                    if (index > -1) {
                        var record = storeREA.getAt(index);
                        return record.get('nombre');
                    } else {
                        return ''
                    }

                }

                //fin combo reasignacion REA


                //inicio combo aprobación secretaría inspección
                storeCONTROLPROGRAMADO = new Ext.data.JsonStore({
                    root: 'datos',
                    fields: ['id', 'nombre'],
                    autoLoad: true,
                    data: {
                        datos: [
                            {"id": 8, "nombre": "Denuncia"},
                            {"id": 7, "nombre": "CCF"},
                            {"id": 6, "nombre": "Operativos"},
                            {"id": 5, "nombre": "Construcciones"},
                            {"id": 4, "nombre": "Fauna Urbana"},
                            {"id": 3, "nombre": "Operativo"},
                            {"id": 2, "nombre": "Inspeccion"},
                            {"id": 1, "nombre": "Inspeccion conjunta"},
                            {"id": 0, "nombre": "Control programado"}
                        ]
                    }
                });

                var comboCONTROLPROGRAMADO= new Ext.form.ComboBox({
                    id: 'comboCONTROLPROGRAMADO',
                    store: storeCONTROLPROGRAMADO,
                    valueField: 'id',
                    displayField: 'nombre',
                    triggerAction: 'all',
                    mode: 'local'
                });

                function controlProgramado(id) {
                    var index = storeCONTROLPROGRAMADO.find('id', id);
                    if (index > -1) {
                        var record = storeCONTROLPROGRAMADO.getAt(index);
                        return record.get('nombre');
                    } else {
                        return ''
                    }
                }

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
                    var index = storeREATOT.findExact('id', id);
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
                    var index = storeREAGUIA.findExact('id', id);
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

                //inicio combo denuncias ordenanza DETIORD
                storeDETIORD = new Ext.data.JsonStore({
                    root: 'data',
                    fields: ['id', 'nombre'],
                    autoLoad: true,
                    url: 'modules/common/combos/combos.php?tipo=ordenanzas'
                });

                var comboDETIORD = new Ext.form.ComboBox({
                    id: 'comboDETIORD',
                    store: storeDETIORD,
                    valueField: 'id',
                    displayField: 'nombre',
                    triggerAction: 'all',
                    mode: 'local',
                    forceSelection: true,
                    allowBlank: false
                });

                function denunciasListaOrdenanza(id) {
                    var index = storeDETIORD.findExact('id', id);
                    if (index > -1) {
                        var record = storeDETIORD.getAt(index);
                        return record.get('nombre');
                    }
                }

                //fin  combo denuncias ordenanza

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
                    var index = storePRD.findExact('id', id);
                    if (index > -1) {
                        var record = storePRD.getAt(index);
                        return  '<span style="font-size: 10px!important">' + record.get('nombre') + '</span>';
                    }
                }

                function smalltext (id) {
                    return '<span style="font-size: 10px!important">' + id + '</span>';
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
                //inicio combo instituciones REMITENTE
                storeREMI = new Ext.data.JsonStore({
                    root: 'data',
                    fields: ['nombre'],
                    autoLoad: true,
                    url: 'modules/common/combos/combos.php?tipo=remitente'

                });

                var comboREMI = new Ext.form.ComboBox({
                    id: 'comboREMI',
                    store: storeREMI,
                    valueField: 'nombre',
                    displayField: 'nombre',
                    triggerAction: 'all',
                    mode: 'local',
                    allowBlank: false
                });

                function listadoRemitentes(id) {
                    return id;
                }

                //fin combo instituciones REMI

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
                    var index = storeACTA.findExact('id', id);
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
                    var index = storeESREA.findExact('id', id);
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
                    var index = storePRASA.findExact('id', id);
                    if (index > -1) {
                        var record = storePRASA.getAt(index);
                        return record.get('nombre');
                    }
                }

                //fin combo caracter del tramite PRASA
// inicio combos inspeccion

// inicio pestañas de mantenimiento



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

                this.gridInspeccionActa = new Ext.data.Store({
                    id: "id",
                    proxy: proxyDenunciasGuia,
                    reader: readerDenunciasGuia,
                    writer: writerDenunciasGuia,
                    autoSave: true
                });
                this.gridInspeccionActa.load();

                this.gridDenunciasGuia = new Ext.grid.EditorGridPanel({
                    id: 'gridDenunciasGuia',
                    xtype: "grid",
                    height: 200,
                    store: this.gridInspeccionActa,
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
                        store: this.gridInspeccionActa,
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
                                if (res.message != '') {
                                    AppMsg.setAlert(AppMsg.STATUS_NOTICE, res.message);
                                }
                            }
                        },
                        exception: function (proxy, response, operation ) {
                            if (operation == 'create') {

                                console.log (proxy)
                            }
                        },
                        loadexception: function (proxy, response, operation ) {
                            console.log (proxy)
                            console.log (response)
                            console.log (operation)

                            if (operation == 'create') {

                                console.log (proxy)
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
                        {name: 'recepcion_documento', type: 'date', dateFormat: 'c', allowBlank: false},
                        {name: 'id_tipo_documento', allowBlank: false},
                        {name: 'id_ordenanza', allowBlank: true},
                        {name: 'cedula', allowBlank: true},
                        {name: 'email', allowBlank: true},
                        {name: 'num_documento', allowBlank: false},
                        {name: 'remitente', allowBlank: false},
                        {name: 'asunto', allowBlank: false},
                        {name: 'institucion', allowBlank: true},
                        {name: 'descripcion_anexos', allowBlank: false},
                        {name: 'reasignacion', allowBlank: false},
                        {name: 'id_caracter_tramite', allowBlank: false},
                        {name: 'cantidad_fojas', allowBlank: false},

                        {name: 'despacho_secretaria', type: 'boolean', allowBlank: false}
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
                    remoteSort: true,
                    baseParams: {}
                });
                storeDenuncias = this.storeDenuncias;
                limitedenuncias = 100;

                storeDenuncias.baseParams = {
                    limit: limitedenuncias
                };

                this.gridDenuncias = new Ext.grid.EditorGridPanel({
                    height: 160,
                    store: this.storeDenuncias,
                    columns: [
                        new Ext.grid.RowNumberer(),
                        {
                            header: 'Código',
                            dataIndex: 'codigo_tramite',
                            sortable: true,
                            width: 18
                        },
                        {
                            header: 'Persona recepta',
                            dataIndex: 'id_persona',
                            sortable: true,
                            width: 28,
                            renderer: personaReceptaDenuncia
                        }, {
                            header: 'Recepción documento',
                            dataIndex: 'recepcion_documento',
                            sortable: true,
                            width: 40,
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
                            width: 30,
                            editor: comboTID, renderer: personaTipoDocumento
                        },
                        {
                            header: 'Ordenanza',
                            dataIndex: 'id_ordenanza',
                            sortable: true,
                            width: 24,
                            editor: comboDETIORD, renderer: denunciasListaOrdenanza

                        },
                        {
                            header: 'N. documento',
                            dataIndex: 'num_documento',
                            sortable: true,
                            width: 36,
                            editor: new Ext.form.TextField({allowBlank: false}), renderer: smalltext
                        },
                        {
                            header: 'Remitente/denunciante',
                            dataIndex: 'remitente',
                            sortable: true,
                            width: 50,
                            editor: comboREMI, renderer: listadoRemitentes
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
                            width: 50,
                            editor: new Ext.form.TextField({allowBlank: false}), renderer: smalltext
                        },
                        {
                            header: 'Descripción anexos',
                            dataIndex: 'descripcion_anexos',
                            sortable: true,
                            width: 38,
                            editor: new Ext.form.TextField({allowBlank: false}), renderer: smalltext
                        }
                        , {
                            header: 'Caracter',
                            dataIndex: 'id_caracter_tramite',
                            sortable: true,
                            width: 22,
                            editor: comboCDT, renderer: caracterTramite
                        }, {
                            header: 'Fojas',
                            dataIndex: 'cantidad_fojas',
                            align: 'center',
                            width: 16,
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
                            width: 45,
                            editor: comboREA, renderer: departamentoReasignacion
                        }
                        , {
                            header: 'Despachado'
                            , dataIndex: 'despacho_secretaria'
                            , align: 'center'
                            , falseText: 'No'
                            , menuDisabled: true
                            , trueText: 'Si'
                            , sortable: true
                            , width: 18
                            , xtype: 'booleancolumn'
                        }
                    ],
                    viewConfig: {
                        forceFit: true,
                        getRowClass: function (record, index) {
                            if (record.get('despacho_secretaria') == false) {
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

                                    cargaDetalle(rec.id, this.formDenunciasDetalle, rec.get("despacho_secretaria"));
                                    if (acceso) {
                                        if (rec.get("despacho_secretaria"))
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
                        displayMsg: 'Mostrando trámites  {0} - {1} of {2}',
                        emptyMsg: "No existen trámites que mostrar"
                        //filter: Ext.getCmp('tb_seleccionarUnidad').getValue()

                    }),

                    listeners: {
                        beforeedit: function (e) {
                            if (acceso) {
                                if (e.record.get("despacho_secretaria")) {
                                    return false;
                                }
                                return true;
                            } else {
                                return false;
                            }
                        },
                        afteredit: function (sm) {
                            //rowselect: function (sm, row, rec) {
                            /*cargar el formulario*/
                            cargaDetalle(sm.record.i, this.formDenunciaswebDetalle, false);


                        }

                    }
                });



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

                    height: desktop.getWinHeight() - 238,
                    autoScroll: true,
                    store: this.storeDocumentosReporte,
                    columns: [
                        new Ext.grid.RowNumberer(),
                        {
                            header: 'Código',
                            dataIndex: 'codigo_tramite',
                            sortable: true,
                            width: 15
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
                            header: 'Ordenanza',
                            dataIndex: 'id_ordenanza',
                            sortable: true,
                            width: 28,
                            renderer: denunciasListaOrdenanza

                        },
                        {
                            header: 'N. documento',
                            dataIndex: 'num_documento',
                            sortable: true,
                            width: 40
                        },
                        {
                            header: 'Remitente/ Denunciante',
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
                            , dataIndex: 'despacho_secretaria'
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
                        displayMsg: 'Mostrando guías {0} - {1} of {2}',
                        emptyMsg: "No existen guías que mostrar"
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
                                                                fieldLabel: 'Remitente/ Denunciante',
                                                                id: 'remitente',
                                                                name: 'remitente',
                                                                anchor: '95%'
                                                            },
                                                            {
                                                                fieldLabel: 'CI denunciante',
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
                                                            },
                                                            {
                                                                fieldLabel: 'Dirección denuncia',
                                                                id: 'direccion_denuncia',
                                                                name: 'direccion_denuncia',
                                                                anchor: '95%'
                                                            },
                                                            {
                                                                fieldLabel: 'Georeferencia',
                                                                id: 'georeferenciaSecretaria',
                                                                name: 'georeferencia',
                                                                anchor: '95%',
                                                                allowBlank: true,
                                                                handleMouseEvents: true,
                                                                readOnly: true,
                                                                listeners: {
                                                                    render: function(c){
                                                                        //evento click sobre el campo de geo referenciacion
                                                                        c.getEl().on('click', function(){
                                                                            Ext.getCmp('panelPrincipal').setActiveTab(3);
                                                                        }, c);
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {

                                                        columnWidth: 1 / 3,
                                                        layout: 'form',
                                                        items: [
                                                            {
                                                                xtype: 'combo',
                                                                fieldLabel: 'Ordenanza',
                                                                id: 'id_ordenanza',
                                                                name: 'id_ordenanza',
                                                                anchor: '95%',

                                                                hiddenName: 'id_ordenanza',
                                                                store: storeDETIORD,
                                                                valueField: 'id',
                                                                displayField: 'nombre',
                                                                typeAhead: true,
                                                                triggerAction: 'all',
                                                                mode: 'local'
                                                            },
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

                                                                    if (field.getName() == 'despacho_secretaria') {
                                                                        if (oldVal == 'true') {
                                                                            if (newVal == 'false') {
                                                                                Ext.getCmp('tb_grabardenuncias').setDisabled(false);
                                                                                Ext.getCmp('reasignacion').enable();
                                                                            }
                                                                        }
                                                                    }

                                                                    if (field.getName() == 'guia') {
                                                                        if (oldVal != newVal) {

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
                                                                name: 'despacho_secretaria',
                                                                id: 'despacho_secretaria',
                                                                anchor: '95%',

                                                                hiddenName: 'despacho_secretaria',
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
                        ],
                        defaults: {
                            /*  listeners: {
                                  change: function (field, newVal, oldVal) {
                                      consolo.log ("ccc");
                                      var myForm = Ext.getCmp('formDenunciasDetalle').getForm();
                                      myForm.submit({
                                          url: 'modules/desktop/denuncias/server/crudDenuncias.php?operation=updateForm',
                                          method: 'POST'
                                      });
                                  }
                              }*/
                        }

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
                                    text: 'Remitente/ Denunciante'
                                }
                                , {
                                    checked: false,
                                    checkHandler: checkHandler,
                                    group: 'filterField',
                                    key: 'descripcion_anexos',
                                    scope: this,
                                    text: 'Descripcion Anexos'
                                }

                                ,
                                {
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
                                },
                                {
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
                                }, {
                                    checked: false,
                                    checkHandler: checkHandler,
                                    group: 'filterField',
                                    key: 'asunto',
                                    scope: this,
                                    text: 'Asunto'
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
                            id: 'panelPrincipal',
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
                                                //storeDenuncias.load({params: {noenviados: isChecked}});
                                                storeDenuncias.baseParams = {
                                                    noenviados: isChecked
                                                };
                                                storeDenuncias.load();
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
                                                    storeDenuncias.baseParams = {
                                                        noenviados: isChecked,
                                                        unidadfiltro: t.value
                                                    };
                                                    storeDenuncias.load();
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
                                    title: 'Reportes',
                                    closable: true,
                                    layout: 'border',
                                    //disabled: this.app.isAllowedTo('accesosSecretaria', this.id) ? false : true,
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


                                ,{
                                    autoScroll: true,
                                    title: 'Geolocalización',
                                    closable: true,

                                    items: [{
                                        region: 'center',
                                        xtype: 'gmappanel',
                                        zoomLevel: 12,
                                        gmapType: 'map',
                                        id: 'my_map',
                                        border: false,
                                        fbar: [
                                            {
                                                text: 'Confirmar dirección',
                                                handler: function() {
                                                    Ext.getCmp('georeferenciaSecretaria').setValue(geoSecretaria);
                                                    Ext.getCmp('panelPrincipal').setActiveTab(0);
                                                }
                                            } ],
                                        mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
                                        mapControls: ['GSmallMapControl','GMapTypeControl'],
                                        setCenter: {
                                            lat: -0.1756096,
                                            lng: -78.4761627
                                        },
                                        markers: [{
                                            lat:  -0.17157021176359674,
                                            lng: -78.47847476417087,
                                            marker: {title: 'Quito', draggable: true},
                                            listeners: {
                                                click: function(e){
                                                    //console.log ("Click al boton");
                                                },
                                                dragend: function(e){
                                                    geoSecretaria = e.latLng.lat() + ", " + e.latLng.lng()

                                                }
                                            }
                                        }]
                                    }]
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


                    Ext.getCmp('despacho_secretaria').setReadOnly(!acceso);
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
                    asunto:'',
                    id_caracter_tramite: '1',
                    cantidad_fojas: '0',
                    despacho_secretaria: false

                });
                this.gridDenuncias.stopEditing();
                this.storeDenuncias.insert(0, denuncias);
                this.gridDenuncias.startEditing(0, 0);

            },
            requestGridData: function () {


                this.storeDenuncias.load({params: {noenviados: Ext.getCmp('checkNoEnviados').getValue()}});
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
                                    if (typeof action.response.responseText !== 'undefined') {
                                        var errorJson = JSON.parse(action.response.responseText);
                                        Ext.Msg.show({
                                            title: 'Error campos obligatorios'
                                            , msg: errorJson.msg
                                            , modal: true
                                            , icon: Ext.Msg.ERROR
                                            , buttons: Ext.Msg.OK
                                        });
                                    }
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


            requestGridDataDenunciasGuia: function () {
                this.gridInspeccionActa.load();
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
                            window.location.href = 'modules/desktop/denuncias/server/descargaReporte.inc.php?param=' + valueParams;
                        }
                    }
                });
            }
        });

        //////////////////////////////////////////////////////


        this.gridDetalleInspeccion = new Ext.grid.EditorGridPanel({
            id: 'gridDetalleInspeccion',
            //Calculo de tamaño vertical frame inferior de pestaña Trámites pendientes
            height: winHeight * 0.32,
            //Calculo de tamaño horizontal frame inferior de pestaña Trámites pendientes
            width: winWidth * 0.98,
            readOnly: accesosSupervision,
            store: this.storeDetalleInspeccion,
            columns: [
                new Ext.grid.RowNumberer(),
                {header: 'Código trámite', dataIndex: 'id_denuncia', hidden: true},
                {header: 'Cod. inspección', dataIndex: 'id_inspeccion', sortable: true, width: 90},
                //{header: 'Codificacion', dataIndex: 'codificacion', sortable: true, width: 200, editor: textFieldDetalle, autoSave:true},
                {
                    header: 'Codificacion',
                    dataIndex: 'id_actividad',
                    sortable: true,
                    width: 140,
                    editor: comboACTIVIDAD,
                    renderer: tipoActividad
                },
                {
                    header: 'Nombre denunciado',
                    dataIndex: 'nombre_denunciado',
                    sortable: true,
                    width: 180,
                    editor: textFieldDetalle
                },
                {
                    header: 'Zona', dataIndex: 'id_zona', sortable: true, width: 120, editor: comboZONA,
                    renderer: zonaAdm
                },
                {header: 'Predio', dataIndex: 'predio', sortable: true, width: 150, editor: textFieldDetalle},
                //{header: 'Sumilla DMI', dataIndex: 'sumilla_dmi', sortable: true, width: 400, editor: textFieldDetalle, autoSave:true},
                //{header: 'Tipo de actividad', dataIndex: 'id_actividad', sortable: true, width: 200,  editor: comboACTIVIDAD,
                //autoSave:true, renderer: tipoActividad},
                {
                    header: 'Inspector',
                    dataIndex: 'funcionario_entrega',
                    sortable: true,
                    width: 200,
                    editor: comboPERDIS,
                    renderer: tipoUnidadesPersonal
                },
                {
                    header: 'Fecha asignación',
                    dataIndex: 'fecha_asignacion',
                    sortable: true,
                    width: 120,
                    allowBlank: true
                    ,
                    renderer: formatDate,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d H:i:s'})
                },
                {
                    header: 'Funcionario Reasignación',
                    dataIndex: 'funcionario_reasignacion',
                    sortable: true,
                    width: 200,
                    editor: comboFUNREA,
                    renderer: tipoFuncionarioReasignacion
                },
                //{header: 'Respuesta', dataIndex: 'respuesta', sortable: true, width: 200, editor: textFieldDetalle, autoSave:true},
                //{header: 'Guia', dataIndex: 'guia', sortable: true, width: 100, editor: textFieldDetalle},
                {header: 'Guia', dataIndex: 'guia', sortable: true, width: 100},
                {header: 'Sumilla DMI', dataIndex: 'fecha_despacho', sortable: true, width: 120, allowBlank: true},
                //{header: 'Acta', dataIndex: 'id_acta', sortable: true, width: 100, editor: textFieldDetalle},
                {
                    header: 'Prioridad', dataIndex: 'prioridad', sortable: true, width: 100, editor: comboPRIORIDAD,
                    renderer: prioridad
                },
                //{header: 'Tipo documento', dataIndex: 'id_control_programado', sortable: true, width: 200, editor: comboCONTROLPROGRAMADO,
                //renderer: controlProgramado}
                {
                    header: 'Fecha memo/oficio',
                    dataIndex: 'fecha_memo_oficio',
                    sortable: true,
                    width: 150,
                    allowBlank: true
                    ,
                    renderer: formatDate,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d H:i:s'})
                },
                {
                    header: 'Num memo/oficio',
                    dataIndex: 'numero_memo_oficio',
                    sortable: true,
                    width: 150,
                    editor: textFieldDetalle
                },
                {
                    header: 'Cargo (enviado)',
                    dataIndex: 'cargo_enviado',
                    sortable: true,
                    width: 150,
                    editor: textFieldDetalle
                },
                {
                    header: 'Institución recibe',
                    dataIndex: 'institucion_recibe',
                    sortable: true,
                    width: 150,
                    editor: textFieldDetalle
                },
                {header: 'Num acta', dataIndex: 'numero_acta', sortable: true, width: 150, editor: textFieldDetalle},
                {
                    header: 'Num informe',
                    dataIndex: 'numero_informe',
                    sortable: true,
                    width: 150,
                    editor: textFieldDetalle
                },
                {
                    header: 'Ordenanza aplicada',
                    dataIndex: 'id_ordenanza',
                    sortable: true,
                    width: 180,
                    editor: comboORD,
                    renderer: listaOrdenanzas
                },
                {header: 'Infraccion', dataIndex: 'infraccion', sortable: true, width: 150, editor: textFieldDetalle},
                {
                    header: 'Observaciones',
                    dataIndex: 'observaciones',
                    sortable: true,
                    width: 150,
                    editor: textFieldDetalle
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
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteDetalleInspeccion,
                store: storeDetalleInspeccion,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "Seleccione un trámite"
            })
        });


        this.gridDetalleTodasInspecciones = new Ext.grid.EditorGridPanel({
            id: 'gridDetalleTodasInspecciones',
            //Calculo de tamaño vertical frame inferior de pestaña Trámites pendientes
            height: winHeight * 0.32,
            //Calculo de tamaño horizontal frame inferior de pestaña Trámites pendientes
            width: winWidth * 0.98,
            readOnly: accesosSupervision,
            store: this.storeDetalleTodasInspecciones,
            columns: [
                new Ext.grid.RowNumberer(),
                {header: 'Código trámite', dataIndex: 'id_denuncia', hidden: true},
                {header: 'Cod. inspección', dataIndex: 'id_inspeccion', sortable: true, width: 90},
                //{header: 'Codificacion', dataIndex: 'codificacion', sortable: true, width: 200, editor: textFieldDetalle, autoSave:true},
                {
                    header: 'Codificacion',
                    dataIndex: 'id_actividad',
                    sortable: true,
                    width: 140,
                    editor: comboACTIVIDAD,
                    renderer: tipoActividad
                },
                {
                    header: 'Nombre denunciado',
                    dataIndex: 'nombre_denunciado',
                    sortable: true,
                    width: 180,
                    editor: textFieldDetalle
                },
                {
                    header: 'Zona', dataIndex: 'id_zona', sortable: true, width: 120, editor: comboZONA,
                    renderer: zonaAdm
                },
                {header: 'Predio', dataIndex: 'predio', sortable: true, width: 150, editor: textFieldDetalle},
                //{header: 'Sumilla DMI', dataIndex: 'sumilla_dmi', sortable: true, width: 400, editor: textFieldDetalle, autoSave:true},
                //{header: 'Tipo de actividad', dataIndex: 'id_actividad', sortable: true, width: 200,  editor: comboACTIVIDAD,
                //autoSave:true, renderer: tipoActividad},
                {
                    header: 'Inspector',
                    dataIndex: 'funcionario_entrega',
                    sortable: true,
                    width: 200,
                    editor: comboPERDIS,
                    renderer: tipoUnidadesPersonal
                },
                {
                    header: 'Fecha asignación',
                    dataIndex: 'fecha_asignacion',
                    sortable: true,
                    width: 120,
                    allowBlank: true
                    ,
                    renderer: formatDate,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d H:i:s'})
                },
                {
                    header: 'Funcionario Reasignación',
                    dataIndex: 'funcionario_reasignacion',
                    sortable: true,
                    width: 200,
                    editor: comboFUNREA,
                    renderer: tipoFuncionarioReasignacion
                },
                //{header: 'Respuesta', dataIndex: 'respuesta', sortable: true, width: 200, editor: textFieldDetalle, autoSave:true},
                //{header: 'Guia', dataIndex: 'guia', sortable: true, width: 100, editor: textFieldDetalle},
                {header: 'Guia', dataIndex: 'guia', sortable: true, width: 100},
                {header: 'Sumilla DMI', dataIndex: 'fecha_despacho', sortable: true, width: 120, allowBlank: true},
                //{header: 'Acta', dataIndex: 'id_acta', sortable: true, width: 100, editor: textFieldDetalle},
                {
                    header: 'Prioridad', dataIndex: 'prioridad', sortable: true, width: 100, editor: comboPRIORIDAD,
                    renderer: prioridad
                },
                //{header: 'Tipo documento', dataIndex: 'id_control_programado', sortable: true, width: 200, editor: comboCONTROLPROGRAMADO,
                //renderer: controlProgramado}
                {
                    header: 'Fecha memo/oficio',
                    dataIndex: 'fecha_memo_oficio',
                    sortable: true,
                    width: 150,
                    allowBlank: true
                    ,
                    renderer: formatDate,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d H:i:s'})
                },
                {
                    header: 'Num memo/oficio',
                    dataIndex: 'numero_memo_oficio',
                    sortable: true,
                    width: 150,
                    editor: textFieldDetalle
                },
                {
                    header: 'Cargo (enviado)',
                    dataIndex: 'cargo_enviado',
                    sortable: true,
                    width: 150,
                    editor: textFieldDetalle
                },
                {
                    header: 'Institución recibe',
                    dataIndex: 'institucion_recibe',
                    sortable: true,
                    width: 150,
                    editor: textFieldDetalle
                },
                {header: 'Num acta', dataIndex: 'numero_acta', sortable: true, width: 150, editor: textFieldDetalle},
                {
                    header: 'Num informe',
                    dataIndex: 'numero_informe',
                    sortable: true,
                    width: 150,
                    editor: textFieldDetalle
                },
                {
                    header: 'Ordenanza aplicada',
                    dataIndex: 'id_ordenanza',
                    sortable: true,
                    width: 180,
                    editor: comboORD,
                    renderer: listaOrdenanzas
                },
                {header: 'Infraccion', dataIndex: 'infraccion', sortable: true, width: 150, editor: textFieldDetalle},
                {
                    header: 'Observaciones',
                    dataIndex: 'observaciones',
                    sortable: true,
                    width: 150,
                    editor: textFieldDetalle
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
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteDetalleInspeccion,
                store: storeDetalleTodasInspecciones,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "Seleccione un trámite"
            })
        });


        //Fin formato grid detalle inspeccion

        //Inicio pestaña inspecciones
        this.gridListadoInspeccion = new Ext.grid.EditorGridPanel({
            id: 'gridListadoInspeccion',
            //Calculo de tamaño vertical frame inferior de pestaña Inspecciones
            height: winHeight * 0.85,
            //Calculo de tamaño vertical frame inferior de pestaña Inspecciones
            width: winWidth * 0.99,
            //readOnly: accesosSupervision,
            store: this.storeListadoInspeccion,
            columns: [
                new Ext.grid.RowNumberer(),
                {header: 'Código trámite', dataIndex: 'id_denuncia', hidden: true},
                {header: 'Cód inspección', dataIndex: 'id_inspeccion', sortable: true, width: 200},
                {
                    header: 'Codificacion',
                    dataIndex: 'id_actividad',
                    sortable: true,
                    width: 200,
                    editor: comboACTIVIDAD,
                    renderer: tipoActividad
                },
                {
                    header: 'Nombre denunciado',
                    dataIndex: 'nombre_denunciado',
                    sortable: true,
                    width: 200,
                    editor: textFieldDetalle
                },
                // {header: 'Ordenanza', dataIndex: 'id_ordenanza', sortable: true, width: 150, editor: comboORD, renderer: listaOrdenanzas},
                {
                    header: 'Zona', dataIndex: 'id_zona', sortable: true, width: 200, editor: comboZONA,
                    renderer: zonaAdm
                },
                {header: 'Predio', dataIndex: 'predio', sortable: true, width: 200, editor: textFieldDetalle},
                //{header: 'Sumilla DMI', dataIndex: 'sumilla_dmi', sortable: true, width: 400, editor: textFieldDetalle, autoSave:true},
                {header: 'Sumilla DMI', dataIndex: 'fecha_despacho', sortable: true, width: 150, readOnly: true},
                //{header: 'Tipo de actividad', dataIndex: 'id_actividad', sortable: true, width: 200,  editor: comboACTIVIDAD,
                //autoSave:true, renderer: tipoActividad},
                {
                    header: 'Inspector',
                    dataIndex: 'funcionario_entrega',
                    sortable: true,
                    width: 200,
                    editor: comboPERDIS,
                    renderer: tipoUnidadesPersonal
                },
                //{header: 'Respuesta', dataIndex: 'respuesta', sortable: true, width: 200, editor: textFieldDetalle, autoSave:true},
                {header: 'Guias', dataIndex: 'guia', sortable: true, width: 150},
                {
                    header: 'Planificación',
                    hidden: true,
                    dataIndex: 'id_control_programado',
                    sortable: true,
                    width: 200,
                    editor: comboCONTROLPROGRAMADO,
                    renderer: controlProgramado
                },
                {header: 'Acta', dataIndex: 'id_acta', sortable: true, width: 150, editor: textFieldDetalle},
                {
                    header: 'Acta verificación',
                    dataIndex: 'acta_verificacion',
                    sortable: true,
                    width: 200,
                    editor: comboACTAVERIFICACION,
                    renderer: actaVerificacion
                },
                {header: 'Fojas', dataIndex: 'num_fojas', sortable: true, width: 200, editor: textFieldDetalle},
                {
                    header: 'Motivo del acta',
                    hidden: true,
                    dataIndex: 'id_motivo_acta',
                    sortable: true,
                    width: 200,
                    editor: comboMOTIVOACTA,
                    renderer: motivoActa
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
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteModuloInspeccion,
                store: this.storeListadoInspeccion,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "Seleccione un trámite"
            })
        });

        //Fin ventana Inspeccion

        //Inicio pestaña inspecciones
        this.gridListadoTodosInspectores = new Ext.grid.EditorGridPanel({
            id: 'gridListadoTodosInspectores',
            //Calculo de tamaño vertical frame inferior de pestaña Inspecciones
            height: winHeight * 0.85,
            //Calculo de tamaño vertical frame inferior de pestaña Inspecciones
            width: winWidth * 0.99,
            //readOnly: accesosSupervision,
            store: this.storeListadoTodosInspectores,
            columns: [
                new Ext.grid.RowNumberer(),
                {header: 'Código trámite', dataIndex: 'id_denuncia', hidden: true},
                {header: 'Cód inspección', dataIndex: 'id_inspeccion', sortable: true, width: 200},
                {
                    header: 'Codificacion',
                    dataIndex: 'id_actividad',
                    sortable: true,
                    width: 200,
                    editor: comboACTIVIDAD,
                    renderer: tipoActividad
                },
                {
                    header: 'Nombre denunciado',
                    dataIndex: 'nombre_denunciado',
                    sortable: true,
                    width: 200,
                    editor: textFieldDetalle
                },
                {
                    header: 'Zona', dataIndex: 'id_zona', sortable: true, width: 200, editor: comboZONA,
                    renderer: zonaAdm
                },
                {header: 'Predio', dataIndex: 'predio', sortable: true, width: 200, editor: textFieldDetalle},
                //{header: 'Sumilla DMI', dataIndex: 'sumilla_dmi', sortable: true, width: 400, editor: textFieldDetalle, autoSave:true},
                {header: 'Sumilla DMI', dataIndex: 'fecha_despacho', sortable: true, width: 150, readOnly: true},
                //{header: 'Tipo de actividad', dataIndex: 'id_actividad', sortable: true, width: 200,  editor: comboACTIVIDAD,
                //autoSave:true, renderer: tipoActividad},
                {
                    header: 'Inspector',
                    dataIndex: 'funcionario_entrega',
                    sortable: true,
                    width: 200,
                    editor: comboPERDIS,
                    renderer: tipoUnidadesPersonal
                },
                //{header: 'Respuesta', dataIndex: 'respuesta', sortable: true, width: 200, editor: textFieldDetalle, autoSave:true},
                {header: 'Guia', dataIndex: 'guia', sortable: true, width: 150},
                {
                    header: 'Planificación',
                    hidden: true,
                    dataIndex: 'id_control_programado',
                    sortable: true,
                    width: 200,
                    editor: comboCONTROLPROGRAMADO,
                    renderer: controlProgramado
                },
                {header: 'Acta', dataIndex: 'id_acta', sortable: true, width: 150, editor: textFieldDetalle},
                {
                    header: 'Acta verificación',
                    dataIndex: 'acta_verificacion',
                    sortable: true,
                    width: 200,
                    editor: comboACTAVERIFICACION,
                    renderer: actaVerificacion
                },
                {header: 'Fojas', dataIndex: 'num_fojas', sortable: true, width: 200, editor: textFieldDetalle},
                {
                    header: 'Motivo del acta',
                    hidden: true,
                    dataIndex: 'id_motivo_acta',
                    sortable: true,
                    width: 200,
                    editor: comboMOTIVOACTA,
                    renderer: motivoActa
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
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteModuloInspeccion,
                store: this.storeListadoTodosInspectores,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "Seleccione un trámite"
            })
        });
        //Fin ventana Inspeccion

        this.gridControlProgramadoInspeccion = new Ext.grid.EditorGridPanel({
            id: 'gridControlProgramadoInspeccion',
            //Calculo de tamaño vertical frame inferior de pestaña Trámites pendientes
            height: winHeight * 0.32,
            //Calculo de tamaño horizontal frame inferior de pestaña Trámites pendientes
            width: winWidth * 0.99,
            readOnly: accesosSupervision,
            store: this.storeControlProgramadoInspeccion,
            columns: [
                new Ext.grid.RowNumberer(),
                //{header: 'Código trámite', dataIndex: 'id_denuncia', hidden: true},
                {header: 'Cod. inspección', dataIndex: 'id_inspeccion', sortable: true, width: 90},
                {
                    header: 'Fecha registro', dataIndex: 'fecha_recepcion_documento', sortable: true, width: 150,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d H:i:s'}), renderer: formatDate
                },
                {
                    header: 'Código trámite',
                    dataIndex: 'codigo_tramite',
                    sortable: true,
                    width: 100,
                    editor: textFieldControlProgramado
                },
                //{header: 'Inspector', dataIndex: 'tecnico', sortable: true, width: 150, editor: comboINSP,
                //renderer: tipoUnidadesPersonal},
                //{header: 'Técnico', dataIndex: 'tecnico', sortable: true, width: 200, editor: textFieldControlProgramado},
                //{header: 'Fecha asignación inspector', dataIndex: 'fecha_asignacion_inspector', sortable: true, width: 150,
                //editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d', timeFormat: 'H:i:s'})},
                {
                    header: 'Asunto', dataIndex: 'asunto', sortable: true, width: 200, editor: comboASUNTO,
                    renderer: asunto
                },
                {header: 'Sector', dataIndex: 'sector', sortable: true, width: 100, editor: textFieldControlProgramado},
                {
                    header: 'Parroquia',
                    dataIndex: 'parroquia',
                    sortable: true,
                    width: 100,
                    editor: textFieldControlProgramado
                },
                {header: 'Zona', dataIndex: 'zona', sortable: true, width: 100, editor: textFieldControlProgramado},
                {header: 'Calle', dataIndex: 'calle', sortable: true, width: 150, editor: textFieldControlProgramado},
                {header: 'Predio', dataIndex: 'predio', sortable: true, width: 100, editor: textFieldControlProgramado},
                {
                    header: 'Clave catastral',
                    dataIndex: 'clave_catastral',
                    sortable: true,
                    width: 100,
                    editor: textFieldControlProgramado
                },
                {
                    header: 'Inventariado',
                    dataIndex: 'inventariado',
                    sortable: true,
                    width: 100,
                    editor: comboINVENTARIADO,
                    renderer: inventariado
                },
                {
                    header: 'Nombre propietario',
                    dataIndex: 'nombre_propietario',
                    sortable: true,
                    width: 200,
                    editor: textFieldControlProgramado
                },
                {
                    header: 'Cedula propietario',
                    dataIndex: 'cedula_propietario',
                    sortable: true,
                    width: 100,
                    editor: textFieldControlProgramado
                },
                {
                    header: 'Proyecto',
                    dataIndex: 'proyecto',
                    sortable: true,
                    width: 200,
                    editor: textFieldControlProgramado
                },
                {header: 'Etapas', dataIndex: 'etapas', sortable: true, width: 80, editor: textFieldControlProgramado},
                {
                    header: 'Tipo Tramite', dataIndex: 'tramite', sortable: true, width: 100, editor: comboTIPOTRAMITE,
                    renderer: tipoTramite
                },
                {
                    header: 'Aprobacion/registro',
                    dataIndex: 'aprobacion_registro',
                    sortable: true,
                    width: 110,
                    editor: comboAPROBACIONPLANOS,
                    renderer: aprobacionPlanos
                },
                {
                    header: 'Estado obra',
                    dataIndex: 'estado_obra',
                    sortable: true,
                    width: 110,
                    editor: comboLISTADOESTADOOBRA,
                    renderer: estadoObra
                },
                {
                    header: 'Telefono',
                    dataIndex: 'telefono',
                    sortable: true,
                    width: 80,
                    editor: textFieldControlProgramado
                },
                {
                    header: 'Registro actas licencias',
                    dataIndex: 'registro_actas_licencias',
                    sortable: true,
                    width: 130,
                    editor: textFieldControlProgramado
                },
                {header: 'Gdoc', dataIndex: 'gdoc', sortable: true, width: 100, editor: textFieldControlProgramado},
                {
                    header: 'Responsable tecnico',
                    dataIndex: 'responsable_tecnico',
                    sortable: true,
                    width: 150,
                    editor: textFieldControlProgramado
                },
                {
                    header: 'Licencia profesional',
                    dataIndex: 'licencia_profesional',
                    sortable: true,
                    width: 110,
                    editor: textFieldControlProgramado
                },
                {
                    header: 'Licencia municipal',
                    dataIndex: 'licencia_municipal',
                    sortable: true,
                    width: 100,
                    editor: textFieldControlProgramado
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
            border: true,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteDetalleInspeccion,
                store: this.storeControlProgramadoInspeccion,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "Seleccione un trámite"
            })
        });

        this.gridControlProgramadoAsignacion = new Ext.grid.EditorGridPanel({
            id: 'gridControlProgramadoInspeccion',
            //Calculo de tamaño vertical frame inferior de pestaña Trámites pendientes
            height: winHeight * 0.32,
            //Calculo de tamaño horizontal frame inferior de pestaña Trámites pendientes
            width: winWidth * 0.99,
            readOnly: accesosSupervision,
            store: this.storeControlProgramadoInspeccion,
            columns: [
                new Ext.grid.RowNumberer(),
                //{header: 'Código trámite', dataIndex: 'id_denuncia', hidden: true},
                {header: 'Cod. inspección', dataIndex: 'id_inspeccion', sortable: true, width: 90},
                {
                    header: 'Fecha registro', dataIndex: 'fecha_recepcion_documento', sortable: true, width: 150,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d H:i:s'}), renderer: formatDate
                },
                {
                    header: 'Código trámite',
                    dataIndex: 'codigo_tramite',
                    sortable: true,
                    width: 100,
                    editor: textFieldControlProgramado
                },
                {
                    header: 'Inspector', dataIndex: 'tecnico', sortable: true, width: 150, editor: comboINSP,
                    renderer: tipoUnidadesPersonal
                },
                //{header: 'Técnico', dataIndex: 'tecnico', sortable: true, width: 200, editor: textFieldControlProgramado},
                {
                    header: 'Fecha asignación inspector',
                    dataIndex: 'fecha_asignacion_inspector',
                    sortable: true,
                    width: 150,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d', timeFormat: 'H:i:s'})
                },
                {header: 'Sector', dataIndex: 'sector', sortable: true, width: 100, editor: textFieldControlProgramado},
                {
                    header: 'Parroquia',
                    dataIndex: 'parroquia',
                    sortable: true,
                    width: 100,
                    editor: textFieldControlProgramado
                },
                {header: 'Zona', dataIndex: 'zona', sortable: true, width: 100, editor: textFieldControlProgramado},
                //{header: 'Calle', dataIndex: 'calle', sortable: true, width: 150, editor: textFieldControlProgramado},
                {header: 'Predio', dataIndex: 'predio', sortable: true, width: 100, editor: textFieldControlProgramado},
                {
                    header: 'Clave catastral',
                    dataIndex: 'clave_catastral',
                    sortable: true,
                    width: 100,
                    editor: textFieldControlProgramado
                },
                {header: 'Etapas', dataIndex: 'etapas', sortable: true, width: 80, editor: textFieldControlProgramado},
                {
                    header: 'Tipo Tramite', dataIndex: 'tramite', sortable: true, width: 100, editor: comboTIPOTRAMITE,
                    renderer: tipoTramite
                },

            ],

            viewConfig: {
                forceFit: true
            },
            sm: new Ext.grid.RowSelectionModel(
                {
                    singleSelect: true
                }
            ),
            border: true,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteDetalleInspeccion,
                store: this.storeControlProgramadoInspeccion,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "Seleccione un trámite"
            })
        });

        this.gridListadoControlProgramado = new Ext.grid.EditorGridPanel({
            id: 'gridListadoControlProgramado',
            //Calculo de tamaño vertical frame inferior de pestaña Trámites pendientes
            height: winHeight * 0.85,
            //Calculo de tamaño horizontal frame inferior de pestaña Trámites pendientes
            width: winWidth * 0.99,
            readOnly: accesosSupervision,
            store: this.storeListadoControlProgramado,
            columns: [
                new Ext.grid.RowNumberer(),
                //{header: 'Código trámite', dataIndex: 'id_denuncia', hidden: true},
                {header: 'Cod. inspección', dataIndex: 'id_inspeccion', sortable: true, width: 90},
                {
                    header: 'Fecha registro',
                    dataIndex: 'fecha_recepcion_documento',
                    sortable: true,
                    width: 150,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d', timeFormat: 'H:i:s'}),
                    renderer: formatDate
                },
                {
                    header: 'Código trámite',
                    dataIndex: 'codigo_tramite',
                    sortable: true,
                    width: 100,
                    editor: textFieldListadoControlProgramado
                },
                //{header: 'Técnico', dataIndex: 'tecnico', sortable: true, width: 200, editor: textFieldListadoControlProgramado},
                {
                    header: 'Inspector', dataIndex: 'tecnico', sortable: true, width: 150, editor: comboINSP,
                    renderer: tipoUnidadesPersonal
                },
                {
                    header: 'Fecha asignación inspector',
                    dataIndex: 'fecha_asignacion_inspector',
                    sortable: true,
                    width: 150
                },
                {
                    header: 'Asunto', dataIndex: 'asunto', sortable: true, width: 200, editor: comboASUNTO,
                    renderer: asunto
                },
                {
                    header: 'Sector',
                    dataIndex: 'sector',
                    sortable: true,
                    width: 100,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Parroquia',
                    dataIndex: 'parroquia',
                    sortable: true,
                    width: 100,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Zona',
                    dataIndex: 'zona',
                    sortable: true,
                    width: 100,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Calle',
                    dataIndex: 'calle',
                    sortable: true,
                    width: 150,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Predio',
                    dataIndex: 'predio',
                    sortable: true,
                    width: 100,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Clave catastral',
                    dataIndex: 'clave_catastral',
                    sortable: true,
                    width: 100,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Inventariado',
                    dataIndex: 'inventariado',
                    sortable: true,
                    width: 100,
                    editor: comboINVENTARIADO,
                    renderer: inventariado
                },
                {
                    header: 'Nombre propietario',
                    dataIndex: 'nombre_propietario',
                    sortable: true,
                    width: 200,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Cedula propietario',
                    dataIndex: 'cedula_propietario',
                    sortable: true,
                    width: 100,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Proyecto',
                    dataIndex: 'proyecto',
                    sortable: true,
                    width: 200,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Etapas',
                    dataIndex: 'etapas',
                    sortable: true,
                    width: 80,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Tipo Tramite', dataIndex: 'tramite', sortable: true, width: 100, editor: comboTIPOTRAMITE,
                    renderer: tipoTramite
                },
                {
                    header: 'Aprobacion/registros',
                    dataIndex: 'aprobacion_registro',
                    sortable: true,
                    width: 110,
                    editor: comboAPROBACIONPLANOS,
                    renderer: aprobacionPlanos
                },
                {
                    header: 'Estado obra',
                    dataIndex: 'estado_obra',
                    sortable: true,
                    width: 110,
                    editor: comboESTADOOBRA,
                    renderer: estadoObra
                },
                {
                    header: 'Telefono',
                    dataIndex: 'telefono',
                    sortable: true,
                    width: 80,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Registro actas licencias',
                    dataIndex: 'registro_actas_licencias',
                    sortable: true,
                    width: 130,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Gdoc',
                    dataIndex: 'gdoc',
                    sortable: true,
                    width: 100,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Responsable tecnico',
                    dataIndex: 'responsable_tecnico',
                    sortable: true,
                    width: 150,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Licencia profesional',
                    dataIndex: 'licencia_profesional',
                    sortable: true,
                    width: 110,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Licencia municipal',
                    dataIndex: 'licencia_municipal',
                    sortable: true,
                    width: 100,
                    editor: textFieldListadoControlProgramado
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
            border: true,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteModuloInspeccion,
                store: this.storeListadoControlProgramado,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "Seleccione un trámite"
            })
        });

        this.gridListadoControlProgramadoTodos = new Ext.grid.EditorGridPanel({
            id: 'gridListadoControlProgramadoTodos',
            //Calculo de tamaño vertical frame inferior de pestaña Trámites pendientes
            height: winHeight * 0.85,
            //Calculo de tamaño horizontal frame inferior de pestaña Trámites pendientes
            width: winWidth * 0.99,
            readOnly: accesosSupervision,
            store: this.storeListadoControlProgramadoTodos,
            columns: [
                new Ext.grid.RowNumberer(),
                //{header: 'Código trámite', dataIndex: 'id_denuncia', hidden: true},
                {header: 'Cod. inspección', dataIndex: 'id_inspeccion', sortable: true, width: 90},
                {
                    header: 'Fecha registro',
                    dataIndex: 'fecha_recepcion_documento',
                    sortable: true,
                    width: 150,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d', timeFormat: 'H:i:s'}),
                    renderer: formatDate
                },
                {
                    header: 'Código trámite',
                    dataIndex: 'codigo_tramite',
                    sortable: true,
                    width: 100,
                    editor: textFieldListadoControlProgramado
                },
                //{header: 'Técnico', dataIndex: 'tecnico', sortable: true, width: 200, editor: textFieldListadoControlProgramado},
                {
                    header: 'Inspector', dataIndex: 'tecnico', sortable: true, width: 150, editor: comboINSP,
                    renderer: tipoUnidadesPersonal
                },
                {
                    header: 'Fecha asignación inspector',
                    dataIndex: 'fecha_asignacion_inspector',
                    sortable: true,
                    width: 150
                },
                {
                    header: 'Asunto', dataIndex: 'asunto', sortable: true, width: 200, editor: comboASUNTO,
                    renderer: asunto
                },
                {
                    header: 'Sector',
                    dataIndex: 'sector',
                    sortable: true,
                    width: 100,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Parroquia',
                    dataIndex: 'parroquia',
                    sortable: true,
                    width: 100,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Zona',
                    dataIndex: 'zona',
                    sortable: true,
                    width: 100,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Calle',
                    dataIndex: 'calle',
                    sortable: true,
                    width: 150,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Predio',
                    dataIndex: 'predio',
                    sortable: true,
                    width: 100,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Clave catastral',
                    dataIndex: 'clave_catastral',
                    sortable: true,
                    width: 100,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Inventariado',
                    dataIndex: 'inventariado',
                    sortable: true,
                    width: 100,
                    editor: comboINVENTARIADO,
                    renderer: inventariado
                },
                {
                    header: 'Nombre propietario',
                    dataIndex: 'nombre_propietario',
                    sortable: true,
                    width: 200,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Cedula propietario',
                    dataIndex: 'cedula_propietario',
                    sortable: true,
                    width: 100,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Proyecto',
                    dataIndex: 'proyecto',
                    sortable: true,
                    width: 200,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Etapas',
                    dataIndex: 'etapas',
                    sortable: true,
                    width: 80,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Tipo Tramite', dataIndex: 'tramite', sortable: true, width: 100, editor: comboTIPOTRAMITE,
                    renderer: tipoTramite
                },
                {
                    header: 'Aprobacion/registros',
                    dataIndex: 'aprobacion_registro',
                    sortable: true,
                    width: 110,
                    editor: comboAPROBACIONPLANOS,
                    renderer: aprobacionPlanos
                },
                {
                    header: 'Estado obra',
                    dataIndex: 'estado_obra',
                    sortable: true,
                    width: 110,
                    editor: comboESTADOOBRA,
                    renderer: estadoObra
                },
                {
                    header: 'Telefono',
                    dataIndex: 'telefono',
                    sortable: true,
                    width: 80,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Registro actas licencias',
                    dataIndex: 'registro_actas_licencias',
                    sortable: true,
                    width: 130,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Gdoc',
                    dataIndex: 'gdoc',
                    sortable: true,
                    width: 100,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Responsable tecnico',
                    dataIndex: 'responsable_tecnico',
                    sortable: true,
                    width: 150,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Licencia profesional',
                    dataIndex: 'licencia_profesional',
                    sortable: true,
                    width: 110,
                    editor: textFieldListadoControlProgramado
                },
                {
                    header: 'Licencia municipal',
                    dataIndex: 'licencia_municipal',
                    sortable: true,
                    width: 100,
                    editor: textFieldListadoControlProgramado
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
            border: true,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteModuloInspeccion,
                store: this.storeListadoControlProgramadoTodos,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "Seleccione un trámite"
            })
        });

        this.gridCCFInspeccion = new Ext.grid.EditorGridPanel({
            id: 'gridCCFInspeccion',
            //Calculo de tamaño vertical frame inferior de pestaña Trámites pendientes
            height: winHeight * 0.32,
            //Calculo de tamaño horizontal frame inferior de pestaña Trámites pendientes
            width: winWidth * 0.99,
            readOnly: accesosSupervision,
            store: this.storeCCFInspeccion,
            columns: [
                new Ext.grid.RowNumberer(),
                //{header: 'Código trámite', dataIndex: 'id_denuncia', hidden: true},
                {header: 'Cod. inspección', dataIndex: 'id_inspeccion', sortable: true, width: 90},
                {
                    header: 'Fecha recepción',
                    dataIndex: 'fecha_recepcion_documento',
                    sortable: true,
                    width: 150,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d', timeFormat: 'H:i:s'}),
                    renderer: formatDate
                },
                {
                    header: 'Número registro',
                    dataIndex: 'num_registro',
                    sortable: true,
                    width: 100,
                    editor: textFieldCCF
                },
                {
                    header: 'Inspector', dataIndex: 'tecnico', sortable: true, width: 150, editor: comboINSPECTOR,
                    renderer: tipoUnidadesPersonal
                },
                {
                    header: 'Fecha asignación inspector',
                    dataIndex: 'fecha_asignacion_inspector',
                    sortable: true,
                    width: 150,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d', timeFormat: 'H:i:s'})
                },
                {
                    header: 'Fecha inicio', dataIndex: 'fecha_inicio', sortable: true, width: 150,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d', timeFormat: 'H:i:s'})
                },
                {
                    header: 'Fecha finalización', dataIndex: 'fecha_finalizacion', sortable: true, width: 150,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d', timeFormat: 'H:i:s'})
                },
                {header: 'Asunto', dataIndex: 'asunto', sortable: true, width: 200, editor: textFieldCCF},
                {header: 'Tipo', dataIndex: 'tipo', sortable: true, width: 100, editor: textFieldCCF},
                {header: 'Zona', dataIndex: 'zona', sortable: true, width: 100, editor: textFieldCCF},
                {header: 'Predio', dataIndex: 'predio', sortable: true, width: 100, editor: textFieldCCF},
                {
                    header: 'Clave Catastral',
                    dataIndex: 'clave_catastral',
                    sortable: true,
                    width: 100,
                    editor: textFieldCCF
                },
                {header: 'Proyecto', dataIndex: 'proyecto', sortable: true, width: 100, editor: textFieldCCF},
                {header: 'Etapa', dataIndex: 'etapa', sortable: true, width: 80, editor: textFieldCCF},
                {
                    header: 'Fecha inspección', dataIndex: 'fecha_inspeccion', sortable: true, width: 150,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d', timeFormat: 'H:i:s'})
                },
                {
                    header: 'Fecha egreso verificación',
                    dataIndex: 'fecha_egreso_verificacion',
                    sortable: true,
                    width: 150,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d', timeFormat: 'H:i:s'})
                },
                {
                    header: 'Fecha certificado informe',
                    dataIndex: 'fecha_certificado_informe',
                    sortable: true,
                    width: 150,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d', timeFormat: 'H:i:s'})
                },
                {header: 'Resultado', dataIndex: 'resultado', sortable: true, width: 80, editor: textFieldCCF},
                {
                    header: 'Numero informe ertificado',
                    dataIndex: 'numero_informe_certificado',
                    sortable: true,
                    width: 100,
                    editor: textFieldCCF
                },
            ],
            viewConfig: {
                forceFit: false
            },
            sm: new Ext.grid.RowSelectionModel(
                {
                    singleSelect: true
                }
            ),
            border: true,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteDetalleInspeccion,
                store: this.storeCCFInspeccion,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "Seleccione un trámite"
            })
        });

        this.gridNIOInspeccion = new Ext.grid.EditorGridPanel({
            id: 'gridNIOInspeccion',
            //Calculo de tamaño vertical frame inferior de pestaña Trámites pendientes
            height: winHeight * 0.32,
            //Calculo de tamaño horizontal frame inferior de pestaña Trámites pendientes
            width: winWidth * 0.99,
            readOnly: accesosSupervision,
            store: this.storeNIOInspeccion,
            columns: [
                new Ext.grid.RowNumberer(),
                //{header: 'Código trámite', dataIndex: 'id_denuncia', hidden: true},
                {header: 'Cod. inspección', dataIndex: 'id_inspeccion', sortable: true, width: 90},
                {header: 'Número NIO', dataIndex: 'num_nio', sortable: true, width: 100, editor: textFieldNIO},
                {header: 'Proyecto', dataIndex: 'proyecto', sortable: true, width: 100, editor: textFieldNIO},
                {header: 'Predio', dataIndex: 'predio', sortable: true, width: 100, editor: textFieldNIO},
                {header: 'Zona', dataIndex: 'zona', sortable: true, width: 100, editor: textFieldNIO},
                {header: 'Guía', dataIndex: 'guia', sortable: true, width: 100, editor: textFieldNIO},
                {header: 'Certificado', dataIndex: 'certificado', sortable: true, width: 100, editor: textFieldNIO},
                {
                    header: 'Fecha ingreso', dataIndex: 'fecha_ingreso', sortable: true, width: 150,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d', timeFormat: 'H:i:s'})
                },
            ],
            viewConfig: {
                forceFit: false
            },
            sm: new Ext.grid.RowSelectionModel(
                {
                    singleSelect: true
                }
            ),
            border: true,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteDetalleInspeccion,
                store: this.storeNIOInspeccion,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "Seleccione un trámite"
            })
        });

        this.gridListadoCCFInspeccion = new Ext.grid.EditorGridPanel({
            id: 'gridListadoCCFInspeccion',
            //Calculo de tamaño vertical frame inferior de pestaña Trámites pendientes
            height: winHeight * 0.85,
            //Calculo de tamaño horizontal frame inferior de pestaña Trámites pendientes
            width: winWidth * 0.99,
            readOnly: accesosSupervision,
            store: this.storeListadoCCFInspeccion,
            columns: [
                new Ext.grid.RowNumberer(),
                {header: 'Código trámite', dataIndex: 'id_denuncia', hidden: true},
                {header: 'Cod. inspección', dataIndex: 'id_inspeccion', sortable: true, width: 90},
                {
                    header: 'Fecha recepción',
                    dataIndex: 'fecha_recepcion_documento',
                    sortable: true,
                    width: 150,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d', timeFormat: 'H:i:s'}),
                    renderer: formatDate
                },
                {
                    header: 'Número registro',
                    dataIndex: 'num_registro',
                    sortable: true,
                    width: 100,
                    editor: textFieldListadoCCF
                },
                {header: 'Inspector', dataIndex: 'tecnico', sortable: true, width: 200, renderer: tipoUnidadesPersonal},
                {
                    header: 'Fecha asignación inspector',
                    dataIndex: 'fecha_asignacion_inspector',
                    sortable: true,
                    width: 150
                },
                {
                    header: 'Fecha recepción', dataIndex: 'fecha_inicio', sortable: true, width: 150,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d', timeFormat: 'H:i:s'})
                },
                {
                    header: 'Fecha finalización', dataIndex: 'fecha_finalizacion', sortable: true, width: 150,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d', timeFormat: 'H:i:s'})
                },
                {header: 'Asunto', dataIndex: 'asunto', sortable: true, width: 200, editor: textFieldListadoCCF},
                {header: 'Tipo', dataIndex: 'tipo', sortable: true, width: 100, editor: textFieldListadoCCF},
                {header: 'Zona', dataIndex: 'zona', sortable: true, width: 100, editor: textFieldListadoCCF},
                {header: 'Predio', dataIndex: 'predio', sortable: true, width: 100, editor: textFieldListadoCCF},
                {
                    header: 'Clave Catastral',
                    dataIndex: 'clave_catastral',
                    sortable: true,
                    width: 100,
                    editor: textFieldListadoCCF
                },
                {header: 'Proyecto', dataIndex: 'proyecto', sortable: true, width: 100, editor: textFieldListadoCCF},
                {header: 'Etapa', dataIndex: 'etapa', sortable: true, width: 80, editor: textFieldListadoCCF},
                {
                    header: 'Fecha inspección', dataIndex: 'fecha_inspeccion', sortable: true, width: 150,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d', timeFormat: 'H:i:s'})
                },
                {
                    header: 'Fecha egreso verificación',
                    dataIndex: 'fecha_egreso_verificacion',
                    sortable: true,
                    width: 150,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d', timeFormat: 'H:i:s'})
                },
                {
                    header: 'Fecha certificado informe',
                    dataIndex: 'fecha_certificado_informe',
                    sortable: true,
                    width: 150,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d', timeFormat: 'H:i:s'})
                },
                {header: 'Resultado', dataIndex: 'resultado', sortable: true, width: 80, editor: textFieldListadoCCF},
                {
                    header: 'Numero informe certificado',
                    dataIndex: 'numero_informe_certificado',
                    sortable: true,
                    width: 100,
                    editor: textFieldListadoCCF
                },
            ],
            viewConfig: {
                forceFit: false
            },
            sm: new Ext.grid.RowSelectionModel(
                {
                    singleSelect: true
                }
            ),
            border: true,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteModuloInspeccion,
                store: this.storeListadoCCFInspeccion,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "Seleccione un trámite"
            })
        });

        this.gridListadoCCFInspeccionTodos = new Ext.grid.EditorGridPanel({
            id: 'gridListadoCCFInspeccionTodos',
            //Calculo de tamaño vertical frame inferior de pestaña Trámites pendientes
            height: winHeight * 0.85,
            //Calculo de tamaño horizontal frame inferior de pestaña Trámites pendientes
            width: winWidth * 0.99,
            readOnly: accesosSupervision,
            store: this.storeListadoCCFInspeccionTodos,
            columns: [
                new Ext.grid.RowNumberer(),
                {header: 'Código trámite', dataIndex: 'id_denuncia', hidden: true},
                {header: 'Cod. inspección', dataIndex: 'id_inspeccion', sortable: true, width: 90},
                {
                    header: 'Fecha recepción',
                    dataIndex: 'fecha_recepcion_documento',
                    sortable: true,
                    width: 150,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d', timeFormat: 'H:i:s'}),
                    renderer: formatDate
                },
                {
                    header: 'Número registro',
                    dataIndex: 'num_registro',
                    sortable: true,
                    width: 100,
                    editor: textFieldListadoCCF
                },
                {header: 'Inspector', dataIndex: 'tecnico', sortable: true, width: 200, renderer: tipoUnidadesPersonal},
                {
                    header: 'Fecha asignación inspector',
                    dataIndex: 'fecha_asignacion_inspector',
                    sortable: true,
                    width: 150
                },
                {
                    header: 'Fecha recepción', dataIndex: 'fecha_inicio', sortable: true, width: 150,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d', timeFormat: 'H:i:s'})
                },
                {
                    header: 'Fecha finalización', dataIndex: 'fecha_finalizacion', sortable: true, width: 150,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d', timeFormat: 'H:i:s'})
                },
                {header: 'Asunto', dataIndex: 'asunto', sortable: true, width: 200, editor: textFieldListadoCCF},
                {header: 'Tipo', dataIndex: 'tipo', sortable: true, width: 100, editor: textFieldListadoCCF},
                {header: 'Zona', dataIndex: 'zona', sortable: true, width: 100, editor: textFieldListadoCCF},
                {header: 'Predio', dataIndex: 'predio', sortable: true, width: 100, editor: textFieldListadoCCF},
                {
                    header: 'Clave Catastral',
                    dataIndex: 'clave_catastral',
                    sortable: true,
                    width: 100,
                    editor: textFieldListadoCCF
                },
                {header: 'Proyecto', dataIndex: 'proyecto', sortable: true, width: 100, editor: textFieldListadoCCF},
                {header: 'Etapa', dataIndex: 'etapa', sortable: true, width: 80, editor: textFieldListadoCCF},
                {
                    header: 'Fecha inspección', dataIndex: 'fecha_inspeccion', sortable: true, width: 150,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d', timeFormat: 'H:i:s'})
                },
                {
                    header: 'Fecha egreso verificación',
                    dataIndex: 'fecha_egreso_verificacion',
                    sortable: true,
                    width: 150,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d', timeFormat: 'H:i:s'})
                },
                {
                    header: 'Fecha certificado informe',
                    dataIndex: 'fecha_certificado_informe',
                    sortable: true,
                    width: 150,
                    editor: new Ext.ux.form.DateTimeField({dateFormat: 'Y-m-d', timeFormat: 'H:i:s'})
                },
                {header: 'Resultado', dataIndex: 'resultado', sortable: true, width: 80, editor: textFieldListadoCCF},
                {
                    header: 'Numero informe certificado',
                    dataIndex: 'numero_informe_certificado',
                    sortable: true,
                    width: 100,
                    editor: textFieldListadoCCF
                },
            ],
            viewConfig: {
                forceFit: false
            },
            sm: new Ext.grid.RowSelectionModel(
                {
                    singleSelect: true
                }
            ),
            border: true,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteModuloInspeccion,
                store: this.storeListadoCCFInspeccionTodos,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "Seleccione un trámite"
            })
        });

        //Creación variable ventana
        var win = desktop.getWindow('layout-win');

        if (!win) {
            //Creación variables de tamaño vertical y horizontal en función del espacio utilizado por el browser en la pantalla
            var winWidth = desktop.getWinWidth();
            var winHeight = desktop.getWinHeight();

            //Creación de la ventana win
            win = desktop.createWindow({
                id: 'grid-win-moduloInspeccion',
                //Definición del título de la ventana
                title: 'Inspección',
                //Definición de tamaños de la ventana
                width: winWidth,
                height: winHeight,
                iconCls: 'mantenimiento-icon',
                shim: false,
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                //Creación de panel de pestañas
                items: new Ext.TabPanel({
                    activeTab: 0,
                    border: false,
                    items: [
                        //Pestaña Secretaría murillo edw torres alba haro
                        /*{
                            autoScroll: true,
                            title: 'Secretaría',
                            closable: true,
                            layout: 'fit',
                            height: winHeight-70

                            //Llamado a función que arma la tabla de datos
                            ,items: this.gridInspeccion
                        }
                        //Pestaña Inspección
                        ,*/
                        {
                            autoScroll: true,
                            title: 'Trámites pendientes',
                            closable: false,
                            //layout: 'fit',
                            //height: winHeight-70,
                            //disabled: accesosInspectores,
                            //hidden:true,
                            id: 'tramites-pendientes',
                            //Barra de botones
                            tbar: [
                                //Definición de botón nuevo
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.addModuloInspeccion,
                                    disabled: !creacionTramites,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                //Definición de botón eliminar
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deleteModuloInspeccion,
                                    disabled: true,
                                    //disabled: !creacionTramites,
                                    iconCls: 'delete-icon'
                                },
                                '-',
                                //Definición de botón Recargar datos
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataModuloInspeccion,
                                    scope: this,
                                    text: 'Recargar'
                                },
                                '-',
                                {
                                    xtype: 'checkbox',
                                    boxLabel: 'Pendientes por aprobar ',
                                    id: 'checkPendientesAprobar',
                                    name: 'pendientesAprobar',
                                    checked: accesosSecretaria,
                                    inputValue: '1',
                                    tooltip: 'Recargar datos',
                                    //disabled: !acceso,
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
                                //bh boton generar
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonGenerarGuia,
                                    scope: this,
                                    text: 'Generar Nueva Acta',
                                    tooltip: 'Se genera acta con las ',
                                    id: 'tb_repoteDenuncias',
                                    disabled: false
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
                                    , store: this.storeModuloInspeccion
                                })
                            ],
                            //Llamado a función que arma la tabla de datos
                            items: [{
                                id: 'formModuloInspeccion',
                                titleCollapse: true,
                                flex: 1,
                                autoScroll: true,
                                layout: 'column',
                                items: this.gridModuloInspeccion
                            }, {
                                flex: 2,
                                bodyStyle: 'padding:0; background: #0f6dff',
                                //layout: 'column',

                                items: [
                                    {
                                        xtype: 'tabpanel',

                                        activeTab: 0,
                                        width: winWidth,
                                        cls: 'no-border',
                                        items: [
                                            {
                                                title: 'Asignación inspección',
                                                //layout: 'column',
                                                //closable: true,
                                                //titleCollapse: true,
                                                //disabled: !accesosSecretaria
                                                autoScroll: true,
                                                height: winHeight * 0.36,
                                                tbar: [
                                                    //Definición de botón nuevo
                                                    {
                                                        id: 'btnNuevoDetalleInspeccion',
                                                        text: 'Nuevo',
                                                        scope: this,
                                                        handler: this.addDetalleInspeccion,
                                                        disabled: true,
                                                        iconCls: 'save-icon'
                                                    },
                                                    '-',
                                                    //Definición de botón eliminar
                                                    {
                                                        id: 'btnEliminarDetalleInspeccion',
                                                        text: "Eliminar",
                                                        scope: this,
                                                        handler: this.deleteDetalleInspeccion,
                                                        disabled: true,
                                                        iconCls: 'delete-icon'
                                                    },
                                                    '-',
                                                    //Definición de botón Recargar datos
                                                    {
                                                        id: 'btnRecargarDatosDetalleInspeccion',
                                                        iconCls: 'reload-icon',
                                                        handler: this.requestGridDataDetalleInspeccion,
                                                        disabled: false,
                                                        scope: this,
                                                        text: 'Recargar'
                                                    },
                                                    '-',
                                                    {
                                                        xtype: 'checkbox',
                                                        boxLabel: 'Mostrar todas las inspecciones',
                                                        id: 'checkTodasInspecciones',
                                                        name: 'todasInspecciones',
                                                        checked: false,
                                                        inputValue: '1',
                                                        tooltip: 'Muestra todas las inspecciones',
                                                        disabled: !creacionDatosInspeccion,
                                                        cls: 'barramenu',
                                                        handler: function (checkbox, isChecked) {
                                                            Ext.getCmp('btnNuevoDetalleInspeccion').setDisabled(this.checked);
                                                            Ext.getCmp('btnEliminarDetalleInspeccion').setDisabled(this.checked);
                                                            //Ext.getCmp('btnRecargarDatosDetalleInspeccion').setDisabled(this.checked);
                                                            Ext.getCmp('gridDetalleTodasInspecciones').setVisible(this.checked);
                                                            Ext.getCmp('gridDetalleInspeccion').setVisible(!this.checked);
                                                            storeDetalleTodasInspecciones.baseParams = {
                                                                pendientesAprobar: isChecked
                                                            };
                                                            todasInspecciones = this.checked;
                                                            if (this.checked) {
                                                                storeDetalleTodasInspecciones.load();
                                                            } else {
                                                                storeDetalleInspeccion.load();
                                                            }
                                                        }
                                                    },
                                                    '-',
                                                    '->'
                                                    , {
                                                        text: 'Buscar por:'
                                                        , xtype: 'tbtext'
                                                    }

                                                    , searchInspeccionesBtn
                                                    , ' ', ' '
                                                    , new QoDesk.QoAdmin.SearchField({
                                                        paramName: 'filterText',
                                                        store: this.storeDetalleTodasInspecciones
                                                        //store: function(){this.storeDetalleInspeccion}
                                                        //store: storeDetalleInspeccion.load({params: {id: tramiteSeleccionado}})
                                                        //store: todasInspecciones ? this.storeDetalleTodasInspecciones : storeDetalleInspeccion.load({params: {id: tramiteSeleccionado}})
                                                        //store: todasInspecciones ? this.storeDetalleTodasInspecciones : this.storeDetalleInspeccion.load({params: {id: tramiteSeleccionado}})
                                                        //store: todasInspecciones ? this.storeDetalleTodasInspecciones : this.storeDetalleInspeccion
                                                        //store: todosInspectores ? this.storeDetalleInspeccion : this.storeDetalleTodasInspecciones
                                                        //store:  Ext.getCmp('checkTodasInspecciones').getChecked() ? this.storeListadoInspeccion : this.storeListadoTodosInspectores
                                                    })
                                                    /*,
                                                    '-',
                                                    //Definición de botón guardar datos
                                                    {
                                                        text: 'Guardar datos Inspección',
                                                        scope: this,
                                                        handler: this.grabardenuncias,
                                                        iconCls: 'save-icon',
                                                        disabled: !acceso,
                                                        id: 'tb_grabardenuncias'
                                                        , formBind: true
                                                    }*/
                                                ],
                                                //items: this.gridDetalleInspeccion
                                                items: [this.gridDetalleInspeccion, this.gridDetalleTodasInspecciones.setVisible(false)]
                                                //items: Ext.getCmp('checkTodasInspecciones').getValue() ? this.gridDetalleInspeccion : this.gridDetalleTodasInspecciones

                                            },
                                            {
                                                title: 'Control programado',
                                                //titleCollapse: true,
                                                layout: 'column',
                                                //disabled: !accesosSecretaria
                                                autoScroll: true,
                                                height: winHeight * 0.36,
                                                tbar: [
                                                    //Definición de botón nuevo
                                                    {
                                                        id: 'btnNuevoControlProgramado',
                                                        text: 'Nuevo',
                                                        scope: this,
                                                        handler: this.addControlProgramado,
                                                        disabled: !creacionDatosInspeccion,
                                                        iconCls: 'save-icon'
                                                    },
                                                    '-',
                                                    //Definición de botón eliminar
                                                    {
                                                        id: 'btnEliminarControlProgramado',
                                                        text: "Eliminar",
                                                        scope: this,
                                                        handler: this.deleteControlProgramado,
                                                        disabled: !creacionDatosInspeccion,
                                                        iconCls: 'delete-icon'
                                                    },
                                                    '-',
                                                    //Definición de botón Recargar datos
                                                    {
                                                        id: 'btnRecargarDatosControlProgramado',
                                                        iconCls: 'reload-icon',
                                                        handler: this.requestGridDataControlProgramado,
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
                                                    //, searchInspeccionesBtn
                                                    , searchControlProgramadoBtn
                                                    , ' ', ' '
                                                    , new QoDesk.QoAdmin.SearchField({
                                                        paramName: 'filterText',
                                                        store: this.storeControlProgramadoInspeccion
                                                        //store: todasInspecciones ? this.storeDetalleTodasInspecciones : this.storeDetalleInspeccion.load({params: {id: tramiteSeleccionado}})
                                                        //store: todasInspecciones ? this.storeDetalleTodasInspecciones : this.storeDetalleInspeccion
                                                        //store: todosInspectores ? this.storeDetalleInspeccion : this.storeDetalleTodasInspecciones
                                                        //store:  Ext.getCmp('checkTodasInspecciones').getChecked() ? this.storeListadoInspeccion : this.storeListadoTodosInspectores
                                                    })
                                                ],
                                                items: this.gridControlProgramadoInspeccion
                                            }, {
                                                title: 'Asignación control programado',
                                                //titleCollapse: true,
                                                layout: 'column',
                                                //disabled: !accesosSecretaria
                                                autoScroll: true,
                                                height: winHeight * 0.36,
                                                tbar: [
                                                    /*
                                                    //Definición de botón nuevo
                                                    {
                                                        id: 'btnNuevoControlProgramado',
                                                        text: 'Nuevo',
                                                        scope: this,
                                                        handler: this.addControlProgramado,
                                                        disabled: !creacionDatosInspeccion,
                                                        iconCls: 'save-icon'
                                                    },
                                                    '-',
                                                    //Definición de botón eliminar
                                                    {
                                                        id: 'btnEliminarControlProgramado',
                                                        text: "Eliminar",
                                                        scope: this,
                                                        handler: this.deleteControlProgramado,
                                                        disabled: !creacionDatosInspeccion,
                                                        iconCls: 'delete-icon'
                                                    },
                                                    '-',*/
                                                    //Definición de botón Recargar datos
                                                    {
                                                        id: 'btnRecargarDatosControlProgramado',
                                                        iconCls: 'reload-icon',
                                                        handler: this.requestGridDataControlProgramado,
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
                                                    //, searchInspeccionesBtn
                                                    , searchControlProgramadoBtn
                                                    , ' ', ' '
                                                    , new QoDesk.QoAdmin.SearchField({
                                                        paramName: 'filterText',
                                                        store: this.storeControlProgramadoInspeccion
                                                        //store: todasInspecciones ? this.storeDetalleTodasInspecciones : this.storeDetalleInspeccion.load({params: {id: tramiteSeleccionado}})
                                                        //store: todasInspecciones ? this.storeDetalleTodasInspecciones : this.storeDetalleInspeccion
                                                        //store: todosInspectores ? this.storeDetalleInspeccion : this.storeDetalleTodasInspecciones
                                                        //store:  Ext.getCmp('checkTodasInspecciones').getChecked() ? this.storeListadoInspeccion : this.storeListadoTodosInspectores
                                                    })
                                                ],
                                                items: this.gridControlProgramadoAsignacion
                                            },
                                            {
                                                title: 'NIO',
                                                layout: 'column',
                                                disabled: false,
                                                height: winHeight * 0.36,
                                                tbar: [
                                                    //Definición de botón nuevo
                                                    {
                                                        id: 'btnNuevoNIO',
                                                        text: 'Nuevo',
                                                        scope: this,
                                                        handler: this.addNIO,
                                                        disabled: !creacionDatosInspeccion,
                                                        iconCls: 'save-icon'
                                                    },
                                                    '-',
                                                    //Definición de botón eliminar
                                                    {
                                                        id: 'btnEliminarNIO',
                                                        text: "Eliminar",
                                                        scope: this,
                                                        handler: this.deleteNIO,
                                                        disabled: !creacionDatosInspeccion,
                                                        iconCls: 'delete-icon'
                                                    },
                                                    '-',
                                                    //Definición de botón Recargar datos
                                                    {
                                                        id: 'btnRecargarDatosNIO',
                                                        iconCls: 'reload-icon',
                                                        handler: this.requestGridDataNIO,
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
                                                    //, searchInspeccionesBtn
                                                    , searchNIOBtn
                                                    , ' ', ' '
                                                    , new QoDesk.QoAdmin.SearchField({
                                                        paramName: 'filterText',
                                                        store: this.storeNIOInspeccion
                                                        //store: todasInspecciones ? this.storeDetalleTodasInspecciones : this.storeDetalleInspeccion.load({params: {id: tramiteSeleccionado}})
                                                        //store: todasInspecciones ? this.storeDetalleTodasInspecciones : this.storeDetalleInspeccion
                                                        //store: todosInspectores ? this.storeDetalleInspeccion : this.storeDetalleTodasInspecciones
                                                        //store:  Ext.getCmp('checkTodasInspecciones').getChecked() ? this.storeListadoInspeccion : this.storeListadoTodosInspectores
                                                    })
                                                ],
                                                items: this.gridNIOInspeccion
                                            }
                                            , {
                                                title: 'CCF',
                                                layout: 'column',
                                                disabled: false,
                                                height: winHeight * 0.36,
                                                tbar: [
                                                    //Definición de botón nuevo
                                                    {
                                                        id: 'btnNuevoCCF',
                                                        text: 'Nuevo',
                                                        scope: this,
                                                        handler: this.addCCF,
                                                        disabled: !creacionDatosInspeccion,
                                                        iconCls: 'save-icon'
                                                    },
                                                    '-',
                                                    //Definición de botón eliminar
                                                    {
                                                        id: 'btnEliminarCCF',
                                                        text: "Eliminar",
                                                        scope: this,
                                                        handler: this.deleteCCF,
                                                        disabled: !creacionDatosInspeccion,
                                                        iconCls: 'delete-icon'
                                                    },
                                                    '-',
                                                    //Definición de botón Recargar datos
                                                    {
                                                        id: 'btnRecargarDatosCCF',
                                                        iconCls: 'reload-icon',
                                                        handler: this.requestGridDataCCF,
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
                                                    //, searchInspeccionesBtn
                                                    , searchCCFBtn
                                                    , ' ', ' '
                                                    , new QoDesk.QoAdmin.SearchField({
                                                        paramName: 'filterText',
                                                        store: this.storeCCFInspeccion
                                                        //store: todasInspecciones ? this.storeDetalleTodasInspecciones : this.storeDetalleInspeccion.load({params: {id: tramiteSeleccionado}})
                                                        //store: todasInspecciones ? this.storeDetalleTodasInspecciones : this.storeDetalleInspeccion
                                                        //store: todosInspectores ? this.storeDetalleInspeccion : this.storeDetalleTodasInspecciones
                                                        //store:  Ext.getCmp('checkTodasInspecciones').getChecked() ? this.storeListadoInspeccion : this.storeListadoTodosInspectores
                                                    })
                                                ],
                                                items: this.gridCCFInspeccion
                                            }
                                        ]
                                    }
                                ]
                            }],
                        },
                        {
                            title: 'Actas',
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
                            autoScroll: true,
                            title: 'Inspecciones',
                            closable: false,
                            //layout: 'fit',
                            //height: winHeight-70,
                            disabled: !pestInspeccion,
                            //Barra de botones
                            tbar: [
                                //Definición de botón Recargar datos
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataListadoInspeccion,
                                    scope: this,
                                    text: 'Recargar'
                                },
                                '-',
                                '->'
                                , {
                                    text: 'Buscar por:'
                                    , xtype: 'tbtext'
                                }

                                , searchListadoInpeccionesBtn
                                , ' ', ' '
                                , new QoDesk.QoAdmin.SearchField({
                                    paramName: 'filterText'
                                    ,
                                    store: todosInspectores ? this.storeListadoInspeccion : this.storeListadoTodosInspectores
                                })
                            ], items: [{
                                id: 'formListadoInspeccion',
                                titleCollapse: true,
                                flex: 1,
                                autoScroll: true,
                                layout: 'column',
                                items: todosInspectores ? this.gridListadoInspeccion : this.gridListadoTodosInspectores
                                //items: this.gridListadoInspeccion
                            }]
                        },
                        {
                            autoScroll: true,
                            title: 'Control programado',
                            closable: false,
                            //layout: 'fit',
                            //height: winHeight-70,
                            disabled: !pestInspeccion,
                            //Barra de botones
                            tbar: [
                                //Definición de botón Recargar datos
                                {
                                    iconCls: 'reload-icon',
                                    //handler: this.requestGridDataListadoInspeccion,
                                    scope: this,
                                    text: 'Recargar'
                                },
                                '-',
                                '->'
                                , {
                                    text: 'Buscar por:'
                                    , xtype: 'tbtext'
                                }

                                , searchListadoControlProgramadoBtn
                                , ' ', ' '
                                , new QoDesk.QoAdmin.SearchField({
                                    paramName: 'filterText'
                                    ,
                                    store: todosInspectores ? this.storeListadoControlProgramado : this.storeListadoControlProgramadoTodos
                                })
                            ], items: [{
                                id: 'formListadoControlProgramado',
                                titleCollapse: true,
                                flex: 1,
                                autoScroll: true,
                                layout: 'column',
                                items: todosInspectores ? this.gridListadoControlProgramado : this.gridListadoControlProgramadoTodos
                                //items: this.gridListadoControlProgramado
                            }]
                        },
                        {
                            autoScroll: true,
                            title: 'CCF',
                            closable: false,
                            //layout: 'fit',
                            //height: winHeight-70,
                            //disabled: !pestInspeccion,
                            disabled: false,
                            //Barra de botones
                            tbar: [
                                //Definición de botón Recargar datos
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataListadoInspeccion,
                                    scope: this,
                                    text: 'Recargar'
                                },
                                '-',
                                '->'
                                , {
                                    text: 'Buscar por:'
                                    , xtype: 'tbtext'
                                }
                                , searchListadoCCFBtn
                                , ' ', ' '
                                , new QoDesk.QoAdmin.SearchField({
                                    paramName: 'filterText'
                                    ,
                                    store: todosInspectores ? this.storeListadoCCFInspeccion : this.storeListadoCCFInspeccionTodos
                                })
                            ], items: [{
                                id: 'formListadoCCF',
                                titleCollapse: true,
                                flex: 1,
                                autoScroll: true,
                                layout: 'column',
                                items: todosInspectores ? this.gridListadoCCFInspeccion : this.gridListadoCCFInspeccionTodos
                                //items: this.gridListadoCCFInspeccion
                            }]
                        },
                        {
                            autoScroll: true,
                            title: 'Geolocalización',
                            closable: false,
                            disabled: false,
                            items: [{
                                split: true,
                                height: 400,
                                minSize: 100,
                                maxSize: 150,
                                region: 'center',
                                autoEl: {
                                    id: 'iframemap',
                                    tag: 'iframe',
                                    style: 'height: 98%; width: 100%; border: none',
                                    src: 'http://localhost/mapaRecorrido.html'
                                    //src: 'http://agenciadecontrol.quito.gob.ec/mapaPersonal.html'
                                },
                                id: 'data_export_iframe'
                            }]
                        }
                    ]
                })
            });
        }
        //Llamado a función que muestra la ventana en pantalla
        win.show();

        /*
       if(accesosSecretaria){
           var activar = true;

           Ext.getCmp('id_tipo_documento').setReadOnly(activar);
           Ext.getCmp('num_documento').setReadOnly(activar);
           Ext.getCmp('id_ordenanza').setReadOnly(activar);
           Ext.getCmp('remitente').setReadOnly(activar);
           Ext.getCmp('cedula').setReadOnly(activar);
           Ext.getCmp('email').setReadOnly(activar);
           Ext.getCmp('institucion').setReadOnly(activar);
           Ext.getCmp('asunto').setReadOnly(activar);
           Ext.getCmp('id_caracter_tramite').setReadOnly(activar);
           Ext.getCmp('cantidad_fojas').setReadOnly(activar);
           Ext.getCmp('procesado_inspeccion').setReadOnly(activar);
       }

                function cargaDetalle(idModuloInspeccion) {
                    forma = Ext.getCmp('formModuloInspeccion');
                    console.log(idModuloInspeccion);
                    console.log(urlInspeccion);
                    forma.getForm().load({
                        url: urlInspeccion + 'crudModuloInspeccion.php?operation=selectForm',
                        params: {
                            id: idModuloInspeccion
                        }
                        ,
                        success: function (response, opts) {
                            mensaje = Ext.getCmp('textRecepcionAnteriores');
                            if (response.findField('totaldocumentos').getValue() != '0')
                                mensaje.setText('Total documentos anteriores: ' + response.findField('totaldocumentos').getValue())
                            else
                                mensaje.setText('')
                        }
                    });
                    //console.log(url);

                    bloquearLectura(forma, bloqueo);
                };

        function bloquearLectura(forma, activar) {
            //en caso que se pueda editar .. revisamos permiso por perfil

            //validate if have access adminsitrator
            if (activar)
                activar2 = activar
            else
                activar2 = !accesosCoordinadorInspeccion

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


            Ext.getCmp('despacho_secretaria').setReadOnly(!acceso);
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
*/
        setTimeout(function () {
            this.storeModuloInspeccion.load({
                params: {
                    start: 0,
                    limit: limiteModuloInspeccion,
                    pendientesAprobar: isChecked
                }
            });
        }, 1500);
    },

    //Función para eliminación de registros de Inspeccion
    deleteModuloInspeccion: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de borrar el registro seleccionado?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridModuloInspeccion.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeModuloInspeccion.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de Inspeccion
    addModuloInspeccion: function () {
        var inspeccion = new this.storeModuloInspeccion.recordType({
            codigo_tramite: '',
            recepción_documento: '',
            //id_ordenanza: '0',
            id_tipo_documento: '0',
            num_documento: '',
            //remitente: '',
            //cedula: '',
            //email: '',
            //institucion: '',
            //asunto: '',
            id_caracter_tramite: '',
            cantidad_fojas: '0',
            procesado_inspeccion: '1'
        });
        this.gridModuloInspeccion.stopEditing();
        this.storeModuloInspeccion.insert(0, inspeccion);
        this.gridModuloInspeccion.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de ModuloInspeccion
    requestGridDataModuloInspeccion: function () {
        this.storeModuloInspeccion.load();
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de ModuloInspeccion
    requestGridDataListadoInspeccion: function () {
        if (todosInspectores == true) {
            this.storeListadoInspeccion.load();
        } else {
            this.storeListadoTodosInspectores.load();
        }
    },

    //Función para eliminación de registros de Inspeccion
    deleteDetalleInspeccion: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de borrar el registro seleccionado?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridDetalleInspeccion.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeDetalleInspeccion.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de detalle de inspeccion
    addDetalleInspeccion: function () {
        var inspeccion = new this.storeDetalleInspeccion.recordType({
            'id_denuncia': tramiteSeleccionado,
            'id_inspeccion': '',
            'codificacion': '',
            //'fecha_despacho' : '',
            'id_actividad': '',
            'funcionario_entrega': '',
            'id_zona': '',
            'respuesta': '',
            //'guia' : '',
            'id_control_programado': '',
            'funcionario_reasignacion': '0',
            'fecha_asignacion': '',
            'prioridad': '0'
        });
        this.gridDetalleInspeccion.stopEditing();
        this.storeDetalleInspeccion.insert(0, inspeccion);
        this.gridDetalleInspeccion.startEditing(0, 0);
    },

    //Función para inserción de registros de detalle de inspeccion
    addControlProgramado: function () {
        var inspeccion = new this.storeControlProgramadoInspeccion.recordType({
            //'id_denuncia' : tramiteSeleccionado,
            'id_inspeccion': '',
            'fecha_recepcion_documento': '',
            'codificacion': '',
            //'fecha_despacho' : '',
            'id_actividad': '',
            'funcionario_entrega': '',
            'id_zona': '',
            'respuesta': '',
            //'guia' : '',
            'id_control_programado': '',
            //'funcionario_reasignacion' : '',
            'fecha_asignacion': ''
        });
        this.gridControlProgramadoInspeccion.stopEditing();
        this.storeControlProgramadoInspeccion.insert(0, inspeccion);
        this.gridControlProgramadoInspeccion.startEditing(0, 0);
    },

    //Función para eliminación de registros de Inspeccion
    deleteControlProgramado: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de borrar el registro seleccionado?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridControlProgramadoInspeccion.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeControlProgramadoInspeccion.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de detalle de inspeccion
    addCCF: function () {
        var inspeccion = new this.storeCCFInspeccion.recordType({
            //'id_denuncia' : tramiteSeleccionado,
            'id_inspeccion': '',
            'codificacion': '',
            //'fecha_despacho' : '',
            'id_actividad': '',
            'funcionario_entrega': '',
            'id_zona': '',
            'respuesta': '',
            //'guia' : '',
            'id_control_programado': '',
            //'funcionario_reasignacion' : '',
            ' _asignacion': ''
        });
        this.gridCCFInspeccion.stopEditing();
        this.storeCCFInspeccion.insert(0, inspeccion);
        this.gridCCFInspeccion.startEditing(0, 0);
    },

    //Función para eliminación de registros de Inspeccion
    deleteCCF: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de borrar el registro seleccionado?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridCCFInspeccion.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeCCFInspeccion.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de detalle de inspeccion
    addNIO: function () {
        var nio = new this.storeNIOInspeccion.recordType({
            'id_inspeccion': '',
            'num_nio': '0',
            'proyecto': '',
            'predio': '',
            'zona': '',
            'guia': '',
            'certificado': '',
            'fecha_ingreso': ''
        });
        this.gridNIOInspeccion.stopEditing();
        this.storeNIOInspeccion.insert(0, nio);
        this.gridNIOInspeccion.startEditing(0, 0);
    },

    //Función para eliminación de registros de Inspeccion
    deleteNIO: function () {
        //Popup de confirmación
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de borrar el registro seleccionado?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            //En caso de presionar el botón SI, se eliminan los datos del registro seleccionado
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridNIOInspeccion.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeNIOInspeccion.remove(rows);
                }
            }
        });
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de detalle inspeccion
    requestGridDataDetalleInspeccion: function () {
        this.storeDetalleInspeccion.load({
            params: {
                id: tramiteSeleccionado
            }
        });
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de detalle inspeccion
    requestGridDataControlProgramado: function () {
        this.storeControlProgramadoInspeccion.load({
            params: {
                id: tramiteSeleccionado
            }
        });
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de detalle inspeccion
    requestGridDataCCF: function () {
        this.storeCCFInspeccion.load({
            params: {
                id: tramiteSeleccionado
            }
        });
    },

    //Función para carga de datos
    requestGridData: function () {
        this.storeModuloInspeccion.load({
            params:
                {
                    start: 0,
                    limit: limiteModuloInspeccion
                }
        });
    },
    // bh boton generar nueva guía
    botonGenerarGuia: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Descargar acta<br>El estado del trámite será actualizado.<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/inspeccion/server/generarNuevasGuias.php';
                    setTimeout(function () {
                        AppMsg.setAlert("Alerta ", Ext.getCmp('checkPendientesAprobar').getValue());
                        storeModuloInspeccion.load({params: {noenviados: Ext.getCmp('checkPendientesAprobar').getValue()}});
                    }, 1000);
                }
            }
        });
    },
});

