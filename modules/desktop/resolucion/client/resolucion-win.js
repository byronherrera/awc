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

        var acceso = (accesosAdministradorOpe || accesosResolucion ) ? true : false


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
            url: 'modules/common/combos/combos.php?tipo=personal_distributivo'
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
                {name: 'ordenanza', allowBlank: false},
                {name: 'articulo_numeral', allowBlank: false},
                {name: 'unidad', allowBlank: false},
                {name: 'comisaria', allowBlank: false},
                {name: 'numero_expediente', allowBlank: false},
                {name: 'numero_predio', allowBlank: false},
                {name: 'nombre_administrado', allowBlank: false},
                {name: 'nombre_establecimiento', allowBlank: false},
                {name: 'cedula_ruc', allowBlank: false},
                {name: 'funcionario', allowBlank: false},
                {name: 'numero_resolucion', allowBlank: false},
                {name: 'fecha_resolucion', allowBlank: false},
                {name: 'nulidad', allowBlank: false},
                {name: 'caducidad', allowBlank: false},
                {name: 'archivo', allowBlank: false},
                {name: 'es_obligatorio', allowBlank: false},
                {name: 'multa_impuesta', allowBlank: false},
                {name: 'observaciones', allowBlank: false},
                {name: 'direccion_infraccion', allowBlank: false},
                {name: 'direccion_notificacion', allowBlank: false},
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
            height: '100%',
            store: this.storeResoluciones,
            columns: [
                //Definición de campos bdd Resoluciones
                new Ext.grid.RowNumberer(),
                {header: 'id', dataIndex: 'id',width: 100, hidden:true, editor: textField},
                {header: 'Ordenanza', dataIndex: 'ordenanza', allowBlank:true, width: 180, editor: comboOrdenanza, renderer: rendererOrdenanza},
                {header: 'Artículo y numeral', dataIndex: 'articulo_numeral', allowBlank:true, width: 300, editor: comboOrdenanzaTema, renderer: rendererOrdenanzaTema},
                {header: 'Unidad', dataIndex: 'unidad', allowBlank:true, width: 150, editor: comboUnidad, renderer: rendererUnidad},
                {header: 'Comisaría', dataIndex: 'comisaria', allowBlank:true, width: 150, editor: textField},
                {header: 'Número de expediente', dataIndex: 'numero_expediente', allowBlank:true, width: 150, editor: textField},
                {header: 'Número de predio', dataIndex: 'numero_predio', allowBlank:true, width: 100, editor: textField},
                {header: 'Nombre de Administrado', dataIndex: 'nombre_administrado', allowBlank:true, width: 250, editor: textField},
                {header: 'Nombre del Establecimiento', dataIndex: 'nombre_estbleacimiento', allowBlank:true, width: 180, editor: textField},
                {header: 'Cédula o Ruc', dataIndex: 'cedula_ruc', allowBlank:true, width: 100, editor: textField},
                {header: 'Funcionario', dataIndex: 'funcionario', allowBlank:true, width: 200, editor: comboPersonal, renderer: rendererPersonal},
                {header: 'Número de Resolución', dataIndex: 'numero_resolucion', allowBlank:true, width: 140, editor: textField},

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
                {header: 'Nulidad', dataIndex: 'nulidad', allowBlank:true, width: 80, editor: textField},
                {header: 'Caducidad', dataIndex: 'caducidad', allowBlank:true, width: 80, editor: textField},
                {header: 'Archivo', dataIndex: 'archivo', allowBlank:true, width: 80, editor: textField},
                {header: 'Obligatorio', dataIndex: 'es_obligatorio', allowBlank:true, width: 100, editor: textField},
                {header: 'Multa impuesta', dataIndex: 'multa_impuesta', allowBlank:true, width: 140, editor: textField},
                {header: 'Observaciones-Motivo de sanción/cumplimiento', allowBlank:true, dataIndex: 'observaciones', width: 140, editor: textField},
                {header: 'Dirección infracción', dataIndex: 'direccion_infraccion', allowBlank:true, width: 140, editor: textField},
                {header: 'Dirección notificación', dataIndex: 'direccion_notificacion', allowBlank:true, width: 140, editor: textField},
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
        //Fin ventana resolucion ordenanzas

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
                {name: 'ordenanza', allowBlank: false},
                {name: 'articulo_numeral', allowBlank: false},
                {name: 'unidad', allowBlank: false},
                {name: 'comisaria', allowBlank: false},
                {name: 'numero_expediente', allowBlank: false},
                {name: 'numero_predio', allowBlank: false},
                {name: 'nombre_administrado', allowBlank: false},
                {name: 'nombre_establecimiento', allowBlank: false},
                {name: 'cedula_ruc', allowBlank: false},
                {name: 'funcionario', allowBlank: false},
                {name: 'numero_providencia', allowBlank: false},
                {name: 'fecha_providencia', allowBlank: false},
                {name: 'providencia', allowBlank: false},
                {name: 'valor_coactiva', allowBlank: false},
                {name: 'valor_cancelado', allowBlank: false},
                {name: 'clausura', allowBlank: false},
                {name: 'observaciones', allowBlank: false},


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
            //autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            autoSave: true
            //baseParams: {}
        });
        storeProvidencias = this.storeProvidencias;
        limiteresolucion = 20;
        storeProvidencias.baseParams = {
            limit: limiteresolucion
        };

        this.storeProvidencias.load();



        //Inicio formato grid pestaña Providencias
        this.gridProvidencias = new Ext.grid.EditorGridPanel({
            height: '100%',
            store: this.storeProvidencias,
            columns: [
                //Definición de campos bdd Providencias
                new Ext.grid.RowNumberer(),
                {header: 'id', dataIndex: 'id',width: 100, hidden:true},
                {header: 'Ordenanza', dataIndex: 'ordenanza', allowBlank:true, width: 180, editor: comboOrdenanza, renderer: rendererOrdenanza},
                {header: 'Artículo y numeral', dataIndex: 'articulo_numeral', allowBlank:true, width: 300, editor: comboOrdenanzaTema, renderer: rendererOrdenanzaTema},
                {header: 'Unidad', dataIndex: 'unidad', allowBlank:true, width: 150, editor: comboUnidad, renderer: rendererUnidad},
                {header: 'Comisaría', dataIndex: 'comisaria', allowBlank: true, width: 150, editor: textField},
                {header: 'Número de expediente', dataIndex: 'numero_expediente', allowBlank: true, width: 150, editor: textField},
                {header: 'Número de predio', dataIndex: 'numero_predio', sortable: true, width: 100, editor: textField},
                {header: 'Nombre de Administrado', dataIndex: 'nombre_administrado', sortable: true, width: 250, editor: textField},
                {header: 'Nombre del Establecimiento', dataIndex: 'nombre_establecimiento', sortable: true, width: 180, editor: textField},
                {header: 'Cédula o Ruc', dataIndex: 'cedula_ruc', sortable: true, width: 100, editor: textField},
                {header: 'Funcionario', dataIndex: 'funcionario', allowBlank:true, width: 200, editor: comboPersonal, renderer: rendererPersonal},
                //{header: 'Número de Providencia', dataIndex: 'numero_providencia', sortable: true, width: 140, editor: textField},
                {header: 'Fecha de Providencia', dataIndex: 'fecha_providencia', sortable: true, width: 140, editor: textField},
                {header: 'Providencia', dataIndex: 'providencia', sortable: true, width: 140, editor: textField},
                {header: 'Valor Coactiva', dataIndex: 'valor_coactiva', sortable: true, width: 140, editor: textField},
                {header: 'Valor Cancelado', dataIndex: 'valor_cancelado', sortable: true, width: 140, editor: textField},
                {header: 'Clausura', dataIndex: 'clausura', sortable: true, width: 140, editor: textField},
                {header: 'Observaciones', dataIndex: 'observaciones', sortable: true, width: 140, editor: textField},


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
                        {

                            autoScroll: true,
                            title: 'Resoluciones',
                            closable: true,
                            layout: 'fit',
                            height: winHeight - 70,
                            tbar: [
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.addResoluciones,
                                    iconCls: 'save-icon',
                                    id: 'addresolucion',
                                    //disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                },
                                '-',
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deleteResoluciones,
                                    id: 'borrarresolucion',
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
                                    boxLabel: 'Resolucion activo',
                                    id: 'checkNoRecibidos',
                                    name: 'noenviados',
                                    checked: true,
                                    inputValue: '1',
                                    tooltip: 'Recargar datos',
                                    disabled: !acceso,
                                    cls: 'barramenu',
                                    handler: function (checkbox, isChecked) {
                                        storeResoluciones.baseParams.finalizados = isChecked;
                                        storeResoluciones.load();
                                    }
                                }, '-',
                                {
                                    id: 'tb_repoteResolucion',
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarReporteResolucion,
                                    scope: this,
                                    text: 'Generar Distributivo resolucion',
                                    tooltip: 'Se genera el distributivo de resolucion',
                                    disabled: false
                                },
                                '-',
                                {
                                    id: 'tb_repoteResolucionTodo',
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarReporteResolucionTodo,
                                    scope: this,
                                    text: 'Generar Reporte',
                                    tooltip: 'Se genera el reporte con todos los campos',
                                    disabled: false
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
                                    , store: this.storeResoluciones
                                })
                            ],
                            items: this.gridResoluciones,
                        }
                        //Pestaña Providencias
                        , {
                            autoScroll: true,
                            title: 'Providencias',
                            closable: true,
                            layout: 'fit',
                            height: winHeight - 70,
                            //disabled: this.app.isAllowedTo('accesosAdministrador', this.id) ? false : true,
                            //Barra de botones
                            tbar: [
                                //Definición de botón nuevo
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.addProvidencias,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                //Definición de botón eliminar
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deleteProvidencias,
                                    iconCls: 'delete-icon'
                                },
                                '-',
                                //Definición de botón regargar datos
                                {
                                    iconCls: 'demo-grid-add',
                                    handler: this.requestGridDataProvidencias,
                                    scope: this,
                                    text: 'Recargar Datos'
                                }
                            ],
                            //Llamado a función que arma la tabla de datos
                            items: this.gridProvidencias
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
            ordenanza: ' ',
            articulo_numeral: ' ',
            unidad: ' ',
            comisaria: ' ',
            numero_expediente: ' ',
            numero_predio: ' ',
            nombre_administrado: ' ',
            nombre_establecimiento: ' ',
            cedula_ruc: ' ',
            funcionario: ' ',
            numero_resolucion: ' ',
            fecha_resolucion: ' ',
            nulidad: ' ',
            caducidad: ' ',
            archivo: ' ',
            es_obligatorio: ' ',
            multa_impuesta: ' ',
            observaciones: ' ',
            direccion_infraccion: ' ',
            direccion_notificacion: ' ',
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
            ordenanza: ' ',
            articulo_numeral: ' ',
            unidad: ' ',
            comisaria: ' ',
            numero_expediente: ' ',
            numero_predio: ' ',
            nombre_administrado: ' ',
            nombre_establecimiento: ' ',
            cedula_ruc: ' ',
            funcionario: ' ',
            fecha_providencia: ' ',
            providencia: ' ',
            valor_coactiva: ' ',
            valor_cancelado: ' ',
            clausura: ' ',
            observaciones: ' '
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