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
                                    handler: this.botonGenerarActa,
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
                                                disabled: true,
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
                                                disabled: true,
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
                            disabled: true,
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
    botonGenerarActa: function () {
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
    // bh boton generar nueva guía
    // ?reimpresion=true&guia=' + rows[0].get('id')
    botonImprimirActa: function () {
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
        window.location.href = 'modules/desktop/inspeccion/server/generarNuevasGuias2.php?reimpresion=true&guia=' + rows[0].get('id');
    },

});

