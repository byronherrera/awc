QoDesk.ResolucionWindow = Ext.extend(Ext.app.Module, {
    id: 'resolucion',

    type: 'desktop/resolucion',

    init: function () {
        this.launcher = {
            text: 'Resolucion',
            iconCls: 'resolucion-icon',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function () {
        var accesosAdministradorOpe = this.app.isAllowedTo('accesosAdministradorOpe', this.id);
        var accesosResolucion = this.app.isAllowedTo('accesosResolucion', this.id);
        finalizados = true;
        limiteresolucion = 100;
        this.selectResolucion = 0;
        selectResolucion = 0;

        var acceso = (accesosAdministradorOpe || accesosResolucion) ? true : false


        var desktop = this.app.getDesktop();
        var AppMsg = new Ext.AppMsg({});

        var winWidth = desktop.getWinWidth();
        var winHeight = desktop.getWinHeight();

        var win = desktop.getWindow('grid-win-resolucion');
        var urlResolucion = "modules/desktop/resolucion/server/";

        var textField = new Ext.form.TextField({allowBlank: false});

        function formatDate(value) {
            return value ? value.dateFormat('Y-m-d H:i') : '';
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
                    {"id": 0, "nombre": "Clausura"},
                    {"id": 1, "nombre": "Suspención de actividad"},
                    {"id": 2, "nombre": "Retiro de bienes"}
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
                    {"id": 0, "nombre": "Sanción"},
                    {"id": 1, "nombre": "Archivo"},
                    {"id": 2, "nombre": "Nulidad"},
                    {"id": 3, "nombre": "Caducidad"}
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


        //Inicio combo TIPO PROVIDENCIA
        storeTIPOPROVIDENCIA = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "Nulidad"},
                    {"id": 1, "nombre": "Corrección"},
                    {"id": 2, "nombre": "Atención a escrito"},
                    {"id": 3, "nombre": "Subsanación"},
                    {"id": 4, "nombre": "Previo a resolver"},
                    {"id": 5, "nombre": "Copias"},
                    {"id": 6, "nombre": "Insistencia a informe"}
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

        //fin combo UNIDAD

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
        var proxyResoluciones = new Ext.data.HttpProxy({
            api: {
                create: urlResolucion + "crudResoluciones.php?operation=insert",
                read: urlResolucion + "crudResoluciones.php?operation=select",
                update: urlResolucion + "crudResoluciones.php?operation=update",
                destroy: urlResolucion + "crudResoluciones.php?operation=delete"
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
                {name: 'numero_resolucion', allowBlank: false},
                {name: 'fecha_resolucion', allowBlank: false},
                {name: 'resolucion_de', allowBlank: false},
                {name: 'multa_impuesta', allowBlank: false},
                {name: 'observaciones', allowBlank: false},
            ]
        });

        //Definición de escritura en campos bdd Resoluciones
        var writerResoluciones = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para módulo Resoluciones
        this.storeResoluciones = new Ext.data.Store({
            id: "id",
            proxy: proxyResoluciones,
            reader: readerResoluciones,
            writer: writerResoluciones,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            autoSave: true,
            baseParams: {}
        });
        storeResoluciones = this.storeResoluciones;
        limiteresolucion = 100;
        storeResoluciones.baseParams = {
            limit: limiteresolucion
        };

        //Inicio formato grid Resoluciones
        this.gridResoluciones = new Ext.grid.EditorGridPanel({
            height: winHeight/2-100,
            store: this.storeResoluciones,
            columns: [
                //Definición de campos bdd Resoluciones
                new Ext.grid.RowNumberer(),
                {header: 'id', dataIndex: 'id', width: 100, hidden: true, editor: textField},
                {
                    header: 'Número de Resolución',
                    dataIndex: 'numero_resolucion',
                    allowBlank: true,
                    width: 140,
                    editor: textField
                },
                {
                    header: 'Fecha de Resolución',
                    dataIndex: 'fecha_resolucion',
                    sortable: true,
                    width: 140,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    editor: new Ext.form.DateField({
                        format: 'Y-m-d'
                    })
                },
                {
                    header: 'Resolucion de',
                    dataIndex: 'resolucion_de',
                    allowBlank: true,
                    width: 140,
                    editor: comboRESOLUCIONDE,
                    renderer: functionRESOLUCIONDE
                },
                {
                    header: 'Multa impuesta',
                    dataIndex: 'multa_impuesta',
                    allowBlank: true,
                    width: 140,
                    editor: textField
                },
                {
                    header: 'Observaciones',
                    allowBlank: true,
                    dataIndex: 'observaciones',
                    width: 300,
                    editor: textField
                },
                // {
                //     header: 'Dirección infracción',
                //     dataIndex: 'direccion_infraccion',
                //     allowBlank: true,
                //     width: 140,
                //     editor: textField
                // },
                // {
                //     header: 'Dirección notificación',
                //     dataIndex: 'direccion_notificacion',
                //     allowBlank: true,
                //     width: 140,
                //     editor: textField
                // },
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
                store: storeResoluciones,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "No existen trámites que mostrar"
            })
        });
        //Fin formato grid Resoluciones
        //Fin ventana resolucion Resoluciones

        // inicio ventana Libro Diario
        //Definición de url CRUD
        var proxyLibroDiario = new Ext.data.HttpProxy({
            api: {
                create: urlResolucion + "crudLibroDiario.php?operation=insert",
                read: urlResolucion + "crudLibroDiario.php?operation=select",
                update: urlResolucion + "crudLibroDiario.php?operation=update",
                destroy: urlResolucion + "crudLibroDiario.php?operation=delete"
            }
        });

        //Definición de lectura de campos bdd Libro Diario
        var readerLibroDiario = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'memo_ingreso', allowBlank: false},
                {name: 'fecha_ingreso', allowBlank: false},
                {name: 'unidad', allowBlank: false},
                {name: 'numero_expediente', allowBlank: false},
                {name: 'nombre_administrado', allowBlank: false},
                {name: 'nombre_establecimiento', allowBlank: false},
                {name: 'cedula_ruc', allowBlank: false},
                {name: 'reincidencia', allowBlank: false},
                {name: 'ordenanza', allowBlank: false},
                {name: 'articulo_numeral', allowBlank: false},
                {name: 'iniciado_por', allowBlank: false},
                {name: 'entidad', allowBlank: false},
                {name: 'numero_informe', allowBlank: false},
                {name: 'medida_cautelar', allowBlank: false},
                {name: 'estado', allowBlank: false},
                {name: 'funcionario', allowBlank: false},
                {name: 'envio_expediente', allowBlank: false},
                {name: 'fecha_envio', allowBlank: false}
            ]
        });

        //Definición de escritura en campos bdd Libro Diario
        var writerLibroDiario = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para módulo Libro Diario
        this.storeLibroDiario = new Ext.data.Store({
            id: "id",
            proxy: proxyLibroDiario,
            reader: readerLibroDiario,
            writer: writerLibroDiario,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            autoSave: true,
            baseParams: {}
        });
        storeLibroDiario = this.storeLibroDiario;
        limiteresolucion = 100;
        storeLibroDiario.baseParams = {
            limit: limiteresolucion
        };

        this.storeLibroDiario.load();

        //Inicio formato grid Libro Diario
        this.gridLibroDiario = new Ext.grid.EditorGridPanel({
            height: winHeight / 2 - 50,
            store: this.storeLibroDiario,
            columns: [
                //Definición de campos bdd Libro Diario
                new Ext.grid.RowNumberer(),
                {header: 'id', dataIndex: 'id', width: 100, hidden: true, editor: textField},
                {header: 'Memo Ingreso', dataIndex: 'memo_ingreso', allowBlank: true, width: 150, editor: textField},
                {
                    header: 'Fecha de Ingreso',
                    dataIndex: 'fecha_ingreso',
                    sortable: true,
                    width: 140,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    editor: new Ext.form.DateField({
                        format: 'Y-m-d'
                    })
                },
                {
                    header: 'Unidad',
                    dataIndex: 'unidad',
                    allowBlank: true,
                    width: 150,
                    editor: comboUnidad,
                    renderer: rendererUnidad
                },
                {
                    header: 'Número de Expediente',
                    dataIndex: 'numero_expediente',
                    allowBlank: true,
                    width: 150,
                    editor: textField
                },
                {
                    header: 'Nombre de Administrado',
                    dataIndex: 'nombre_administrado',
                    allowBlank: true,
                    width: 250,
                    editor: textField
                },
                {
                    header: 'Nombre del Establecimiento',
                    dataIndex: 'nombre_estbleacimiento',
                    allowBlank: true,
                    width: 180,
                    editor: textField
                },
                {header: 'Cédula o Ruc', dataIndex: 'cedula_ruc', allowBlank: true, width: 100, editor: textField},
                {header: 'Reincidencia', dataIndex: 'reincidencia', allowBlank: true, width: 80, editor: comboREINCIDENCIA,
                    renderer: functionREINCIDENCIA
                },
                //{header: 'Número de Predio', dataIndex: 'numero_predio', allowBlank:true, width: 100, editor: textField},
                {
                    header: 'Ordenanza',
                    dataIndex: 'ordenanza',
                    allowBlank: true,
                    width: 180,
                    editor: comboOrdenanza,
                    renderer: rendererOrdenanza
                },
                {
                    header: 'Artículo y numeral',
                    dataIndex: 'articulo_numeral',
                    allowBlank: true,
                    width: 300,
                    editor: comboOrdenanzaTema,
                    renderer: rendererOrdenanzaTema
                },
                {header: 'Iniciado por', dataIndex: 'iniciado_por', allowBlank: true, width: 120, editor: comboINICIADOPOR,
                    renderer: functionINICIADOPOR
                },
                {header: 'Entidad', dataIndex: 'entidad', allowBlank: true, width: 200, editor: textField},
                {
                    header: 'Número de Informe',
                    dataIndex: 'numero_informe',
                    allowBlank: true,
                    width: 150,
                    editor: textField
                },
                {
                    header: 'Medida Cautelar',
                    dataIndex: 'medida_cautelar',
                    allowBlank: true,
                    width: 150,
                    editor: comboMEDIDACAUTELAR,
                    renderer: functionMEDIDACAUTELAR
                },
                {header: 'Estado', dataIndex: 'estado', allowBlank: true, width: 80, editor: comboESTADO,
                    renderer: functionESTADO},
                {
                    header: 'Funcionario',
                    dataIndex: 'funcionario',
                    allowBlank: true,
                    width: 300,
                    editor: comboPersonal,
                    renderer: rendererPersonal
                },
                {
                    header: 'Envio Expediente',
                    dataIndex: 'envio_expediente',
                    allowBlank: true,
                    width: 100,
                    editor: comboENVIOEXPEDIENTE,
                    renderer: functionENVIOEXPEDIENTE
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
                        storeResoluciones.load({params: {id: rec.id}});
                        storeProvidencias.load({params: {id: rec.id}});
                        //tramiteSeleccionado = rec.id;
                        //inspeccionSeleccionada = rec.id_denuncia;
                    }
                }
            }),
            border: false,
            stripeRows: true,
            //Definición de barra de paginado
            bbar: new Ext.PagingToolbar({
                pageSize: limiteresolucion,
                store: storeLibroDiario,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "No existen trámites que mostrar"
            })
        });
        //Fin formato grid Libro Diario
        //Fin ventana resolucion Libro Diario

        //Inicio ventana resolucion Providencias
        //Definición de url CRUD
        var proxyProvidencias = new Ext.data.HttpProxy({
            api: {
                create: urlResolucion + "crudProvidencias.php?operation=insert",
                read: urlResolucion + "crudProvidencias.php?operation=select",
                update: urlResolucion + "crudProvidencias.php?operation=update",
                destroy: urlResolucion + "crudProvidencias.php?operation=delete"
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
                {name: 'numero_providencia', allowBlank: false},
                {name: 'fecha_providencia', allowBlank: false},
                {name: 'tipo_providencia', allowBlank: false},
            ]
        });

        //Definición de escritura de campos bdd Providencias
        var writerProvidencias = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para pestaña Providencias
        this.storeProvidencias = new Ext.data.Store({
            id: "id",
            proxy: proxyProvidencias,
            reader: readerProvidencias,
            writer: writerProvidencias,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
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
        this.gridProvidencias = new Ext.grid.EditorGridPanel({
            height: winHeight/2-100,
            store: this.storeProvidencias,
            columns: [
                //Definición de campos bdd Providencias
                new Ext.grid.RowNumberer(),
                {header: 'id', dataIndex: 'id', width: 100, hidden: true},
                {header: 'Número de Providencia', dataIndex: 'numero_providencia', sortable: true, width: 140, editor: textField},
                {
                    header: 'Fecha de Providencia',
                    dataIndex: 'fecha_providencia',
                    sortable: true,
                    width: 140,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                    editor: new Ext.form.DateField({
                        format: 'Y-m-d'
                    })
                },
                {header: 'Tipo', dataIndex: 'tipo_providencia', sortable: true, width: 140, editor: comboTIPOPROVIDENCIA,
                    renderer: functionTIPOPROVIDENCIA},
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
            })
        });
        //Fin formato grid pestaña Providencias
        //Fin ventana resolucion Providencias

        // fin ventana resolucion

        // datastore and datagrid in Guia
        this.storeDocumentosReporte = new Ext.data.Store({
            id: "id",
            proxy: proxyResoluciones,
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

            this.formConsultaDocumentos = new Ext.FormPanel({
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
                                ////store:  storeOPTID,
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
                                //store:  storeOPNICO,
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
                                //store:  storePRD,
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
                                //store:  storeZONA,
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
                                //store:  storeOPREA,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Oper. Tipo',
                                id: 'busqueda_tipo_resolucion',
                                name: 'busqueda_tipo_resolucion',
                                hiddenName: 'busqueda_tipo_resolucion',

                                anchor: '95%',
                                //store:  storeOPTIPO,
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
                                //store:  storeOPESTA,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },

                            {
                                xtype: 'combo',
                                fieldLabel: 'Func.operante',
                                id: 'busqueda_resolucion_asignado',
                                name: 'busqueda_resolucion_asignado',
                                hiddenName: 'busqueda_resolucion_asignado',

                                anchor: '95%',
                                //store:  storePRD,
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
                                //store:  storePRD,
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
                                //store:  storePRD,
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
                                //store:  storePRD,
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
                    var store = this.storeResoluciones;
                    store.baseParams.filterField = item.key;
                    searchFieldBtn.setText(item.text);
                }
            };

            var targetHandler = function (item, checked) {
                if (checked) {
                    //var store = this.storeResoluciones;
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

            var checkHandler2 = function (item, checked) {
                if (checked) {
                    var store = this.storeProvidencias;
                    store.baseParams.filterField = item.key;
                    searchFieldBtn2.setText(item.text);
                }
            };

            var targetHandler2 = function (item, checked) {
                if (checked) {
                    //var store = this.storeResoluciones;
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
                title: 'Consulta Resolucion',
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
                            title: 'Libro Diario',
                            closable: false,
                            //  layout: 'fit',
                            height: winHeight - 70,
                            disabled: accesosResolucion,
                            hidden: true,
                            id: 'libro-diario',
                            //Barra de botones
                            tbar: [
                                //Definición de botón nuevo
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.addLibroDiario,
                                    //disabled: !creacionTramites,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                //Definición de botón eliminar
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deleteLibroDiario,
                                    disabled: true,
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
                                    xtype: 'checkbox',
                                    boxLabel: 'Pendientes por aprobar ',
                                    id: 'checkPendientesAprobar',
                                    name: 'pendientesAprobar',
                                    //checked: accesosSecretaria,
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
                                    text: 'Buscarr por:'
                                    , xtype: 'tbtext'
                                }

                                , searchFieldBtn
                                , ' ', ' '
                                , new QoDesk.QoAdmin.SearchField({
                                    paramName: 'filterText'
                                    , store: this.storeModuloInspeccion
                                }),
                            ],
                            //Llamado a función que arma la tabla de datos
                            items: [{
                                id: 'formModuloInspeccion',
                                titleCollapse: true,
                                flex: 1,
                                autoScroll: true,
                                //height: winHeight/2-120,
                                layout: 'column',
                                items: this.gridLibroDiario
                            }, {
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
                                                title: 'Resoluciones',
                                                autoScroll: true,
                                                height: winHeight / 2 - 72,
//                                                height: winHeight * 0.41,
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
                                                        //disabled: !creacionDatosInspeccion,
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

                                                    //, searchInspeccionesBtn
                                                    , ' ', ' '
                                                    , new QoDesk.QoAdmin.SearchField({
                                                        paramName: 'filterText',
                                                        store: this.storeDetalleTodasInspecciones
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
                                                items: this.gridResoluciones

                                            },
                                            {
                                                title: 'Providencias',
                                                //titleCollapse: true,
                                                layout: 'column',
                                                //disabled: !accesosSecretaria
                                                autoScroll: true,
                                                height: winHeight / 2 - 72,
                                                //height: winHeight * 0.41,
                                                tbar: [
                                                    //Definición de botón nuevo
                                                    {
                                                        id: 'btnNuevoControlProgramado',
                                                        text: 'Nuevo',
                                                        scope: this,
                                                        handler: this.addControlProgramado,
                                                        //disabled: !creacionDatosInspeccion,
                                                        disabled: true,
                                                        iconCls: 'save-icon'
                                                    },
                                                    '-',
                                                    //Definición de botón eliminar
                                                    {
                                                        id: 'btnEliminarControlProgramado',
                                                        text: "Eliminar",
                                                        scope: this,
                                                        handler: this.deleteControlProgramado,
                                                        //disabled: !creacionDatosInspeccion,
                                                        disabled: true,
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
                                                    //, searchControlProgramadoInspeccionBtn
                                                    , ' ', ' '
                                                    , new QoDesk.QoAdmin.SearchField({
                                                        paramName: 'filterText',
                                                        store: this.storeControlProgramadoInspeccion
                                                    })
                                                ],
                                                items: this.gridProvidencias
                                            }
                                        ]
                                    }
                                ]
                            }],
                        }
                        ,
                        {
                            title: 'Reportes',
                            closable: true,
                            layout: 'border',
                            //disabled:true,
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
                                    disabled: !acceso,
                                },
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarDocumentoReporteCalendarioResolucion,
                                    scope: this,
                                    text: 'Exportar calendario  personas',
                                    tooltip: 'Se genera archivo Excel con la información solicitada',
                                    disabled: !acceso,
                                }
                                ,
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarDocumentoReporteCalendarioResolucion,
                                    scope: this,
                                    text: 'Exportar calendario  resolucion',
                                    tooltip: 'Se genera archivo Excel con la información solicitada',
                                    disabled: !acceso,
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
                                    split: true,
                                    height: 270,
                                    minSize: 100,
                                    maxSize: 150,
                                    region: 'center',
                                    autoEl: {
                                        id: 'iframemap',
                                        tag: 'iframe',
                                        style: 'height: 360px; width: 100%; border: none',
                                        src: 'http://localhost:8080/mapaRecorrido.html'
                                        //src: 'http://agenciadecontrol.quito.gob.ec/mapaResolucion.html'
                                    },
                                    id: 'data_export_iframe'
                                }
                            ]

                        }

                    ]
                })
            });
        }
        win.show();

        setTimeout(function () {
            this.storeLibroDiario.load();
            this.storeResoluciones.load({
                params: {
                    start: 0,
                    limit: limiteresolucion,
                    finalizados: Ext.getCmp('checkNoRecibidos').getValue(),
                    accesosAdministradorOpe: accesosAdministradorOpe,
                    accesosResolucion: accesosResolucion
                }
            });
            this.storeProvidencias.load();
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
                    var rows = this.gridLibroDiario.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeLibroDiario.remove(rows);
                }
            }
        });
    },

    //Función para inserción de registros de Libro Diario
    addLibroDiario: function () {
        var libroDiario = new this.storeLibroDiario.recordType({
            memo_ingreso: '',
            fecha_ingreso: (new Date()),
            unidad: 0,
            numero_expediente: '',
            nombre_administrado: '',
            nombre_establecimiento: '',
            cedula_ruc: '',
            reincidencia: '',
            ordenanza: 0,
            articulo_numeral: 0,
            iniciado_por: '',
            entidad: '',
            numero_informe: '',
            medida_cautelar: '',
            estado: '',
            funcionario: '',
            envio_expediente: '',
            fecha_envio: (new Date()),
        });
        this.gridLibroDiario.stopEditing();
        this.storeLibroDiario.insert(0, libroDiario);
        this.gridLibroDiario.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de Libro Diario
    requestGridDataLibroDiario: function () {
        this.storeLibroDiario.load();
    },


    deleteResoluciones: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridResoluciones.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeResoluciones.remove(rows);
                }
            }
        });
    },
    addResoluciones: function () {
        var resoluciones = new this.storeResoluciones.recordType({
            id: '',
            numero_resolucion: ' ',
            fecha_resolucion: ' ',
            resolucion_de: '0',
            multa_impuesta: ' ',
            observaciones: ' ',
        });
        this.gridResoluciones.stopEditing();
        this.storeResoluciones.insert(0, resoluciones);
        this.gridResoluciones.startEditing(0, 0);
    },
    requestGridData: function () {
        this.storeResoluciones.load();
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
                    var rows = this.gridProvidencias.getSelectionModel().getSelections();
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
        var providencias = new this.storeResoluciones.recordType({
            id: '',
            numero_providencia: ' ',
            fecha_providencia: ' ',
            tipo_providencia: ' '
        });
        this.gridProvidencias.stopEditing();
        this.storeProvidencias.insert(0, providencias);
        this.gridProvidencias.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de Providencias
    requestGridDataProvidencias: function () {
        this.storeProvidencias.load();
    },


    botonExportarReporteResolucion: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Se descarga el archivo con el informe<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/resolucion/server/descargaResolucionId.inc.php?resolucion=' + selectResolucion;
                }
            }
        });
    },
    botonExportarReporteResolucionTodo: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Se descarga el archivo con el informe<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/resolucion/server/descargaResolucionTodo.php?resolucion=' + selectResolucion;
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
        this.storeDocumentosReporte.baseParams = this.formConsultaDocumentos.getForm().getValues();

        var accesosAdministradorOpe = this.app.isAllowedTo('accesosAdministradorOpe', this.id);
        var accesosResolucion = this.app.isAllowedTo('accesosResolucion', this.id);

        this.storeDocumentosReporte.baseParams.accesosAdministradorOpe = accesosAdministradorOpe;
        this.storeDocumentosReporte.baseParams.accesosResolucion = accesosResolucion;

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
                    window.location.href = 'modules/desktop/resolucion/server/descargaReporteResolucion.inc.php?param=' + valueParams;
                }
            }
        });
    },
    botonExportarDocumentoReporteCalendarioResolucion: function () {
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
                    window.location.href = 'modules/desktop/resolucion/server/descargaReporteResolucioncalendario.inc.php?param=' + valueParams;
                }
            }
        });
    },
    botonExportarDocumentoReporteCalendarioResolucion: function () {
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
                    window.location.href = 'modules/desktop/resolucion/server/descargaReporteResolucioncalendario2.inc.php?param=' + valueParams;
                }
            }
        });
    }
});