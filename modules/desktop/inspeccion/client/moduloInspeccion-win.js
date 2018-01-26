QoDesk.InspeccionWindow = Ext.extend(Ext.app.Module, {
    id: 'inspeccion',
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
        var accesosAdministradorIns = this.app.isAllowedTo('accesosAdministradorIns', this.id);
        var accesosInspeccion = this.app.isAllowedTo('accesosInspeccion', this.id);
        var accesosRecepciónIns = this.app.isAllowedTo('accesosRecepciónIns', this.id);

        var acceso = (accesosAdministradorIns || accesosInspeccion || accesosRecepciónIns) ? true : false


        var desktop = this.app.getDesktop();
        var AppMsg = new Ext.AppMsg({});
        var win = desktop.getWindow('grid-win-moduloInspeccion');

        //Ubicación de la carpeta de Inspeccion
        var urlInspeccion = "modules/desktop/inspeccion/server/";

        var textField = new Ext.form.TextField({allowBlank: false});

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
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'codigo_tramite', readOnly: true, allowBlank: true},
                {name: 'recepcion_documento', readOnly: true, allowBlank: true},
                {name: 'id_ordenanza', readOnly: true, allowBlank: true},
                {name: 'num_documento', readOnly: true, allowBlank: true},
                {name: 'remitente', readOnly: true, allowBlank: true},
                {name: 'cedula', readOnly: true, allowBlank: true},
                {name: 'institucion', readOnly: true, allowBlank: true},
                {name: 'asunto', readOnly: true, allowBlank: true},
                {name: 'descripcion_anexos', readOnly: true, allowBlank: true},
                {name: 'id_caracter_tramite', readOnly: true, allowBlank: true},
                {name: 'cantidad_fojas', readOnly: true, allowBlank: true}
                /*
                {name: 'reasignacion', allowBlank: true},
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

        //Definición de store para módulo Inspeccion
        this.storeModuloInspeccion = new Ext.data.Store({
            id: "id",
            proxy: proxyModuloInspeccion,
            reader: readerModuloInspeccion,
            writer: writerModuloInspeccion,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            autoSave: true,
            baseParams: {}
        });

        var checkHandler = function (item, checked) {
            if (checked) {
                var store = this.storeModuloInspeccion;
                store.baseParams.filterField = item.key;
                searchFieldBtn.setText(item.text);
            }
        };

        //inicio combo persona recepta la denuncia PRD
        storePRD = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalsecretaria'

        });

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

        //inicio combo denuncias ordenanza DETIORD
        storeDETIORD = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=ordenanzas'
        });

        //inicio combo guia  REAGUIA
        storeREAGUIA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=guia'
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
                    ,{
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
                        key: 'institucion',
                        scope: this,
                        text: 'Institución'
                    }
                ]
            })
            , text: 'Código trámite'
        });

        this.storeModuloInspeccion.load();
        storeModuloInspeccion = this.storeModuloInspeccion;
        limiteModuloInspeccion = 100;
        storeModuloInspeccion.baseParams = {
            limit: limiteModuloInspeccion
        };


        //Inicio formato grid Inspeccion
        this.gridModuloInspeccion = new Ext.grid.EditorGridPanel({
            id: 'gridModuloInspeccion',
            xtype: "grid",
            height: 200,
            store: this.storeModuloInspeccion,
            columns: [
                //Definición de campos bdd Inspeccion
                new Ext.grid.RowNumberer(),
                {header: 'Trámite', dataIndex: 'codigo_tramite', sortable: true, width: 100},
                {header: 'Fecha recepción', dataIndex: 'recepcion_documento', sortable: true, width: 300},
                {header: 'Ordenanza', dataIndex: 'id_ordenanza', sortable: true, width: 200},
                {header: 'Numero Documento', dataIndex: 'num_documento', sortable: true, width: 200, editor: textField},
                {header: 'Remitente', dataIndex: 'remitente', sortable: true, width: 300, editor: textField},
                {header: 'Cédula', dataIndex: 'cedula', sortable: true, width: 200, editor: textField},
                {header: 'Institución', dataIndex: 'institucion', sortable: true, width: 200, editor: textField},
                {header: 'Asunto', dataIndex: 'asunto', sortable: true, width: 600, editor: textField},
                {header: 'Caracter trámite', dataIndex: 'id_caracter_tramite', sortable: true, width: 200, editor: comboCDT,
                    renderer: caracterTramite},
                {header: 'Fojas', dataIndex: 'cantidad_fojas', width: 70}
                /*
                {header: 'Reasignación', dataIndex: 'reasignacion', sortable: true, width: 100, editor: comboREA,
                    renderer: departamentoReasignacion},
                {header: 'Despachado', dataIndex: 'despacho_secretaria', align: 'center', falseText: 'No',
                    menuDisabled: true, trueText: 'Si', sortable: true, width: 20, xtype: 'booleancolumn'},
                {header: 'Email', dataIndex: 'email', sortable: true, width: 300, editor: textField},
                {header: 'Observación', dataIndex: 'observacion', sortable: true, width: 300, editor: textField}*/
                ],
            viewConfig: {
                forceFit: true
            },
            sm: new Ext.grid.RowSelectionModel({singleSelect: false}),
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
        //Fin ventana Inspeccion

        //Creación variable ventana
        var win = desktop.getWindow('layout-win');

        if (!win) {
            //Creación variables de tamaño vertical y horizontal en función del espacio utilizado por el browser en la pantalla
            var winWidth = desktop.getWinWidth();
            var winHeight = desktop.getWinHeight();
            //this.seleccionDepar = 3;
            var checkHandler = function (item, checked) {
                if (checked) {
                     var store = this.storeModuloInspeccion;
                    store.baseParams.filterField = item.key;
                    searchFieldBtn.setText(item.text);
                }
            };

            var targetHandler = function (item, checked) {
                if (checked) {
                    //var store = this.storeInspeccion;
                    this.seleccionDepar = item.key;
                    this.targetFieldBtn.setText(item.text);
                }
            };


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
                            title: 'Inspección',
                            closable: true,
                            //layout: 'fit',
                            //height: winHeight-70,
                            //disabled: this.app.isAllowedTo('accesosAdministrador', this.id) ? false : true,
                            //Barra de botones
                            tbar: [
                                /*
                                //Definición de botón nuevo
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.addUnidades,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                //Definición de botón eliminar
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deleteUnidades,
                                    iconCls: 'delete-icon'
                                },
                                '-',
                                //Definición de botón regargar datos
                                {
                                    iconCls: 'demo-grid-add',
                                    handler: this.requestGridDataUnidades,
                                    scope: this,
                                    text: 'Recargar Datos'
                                }
                                */
                                {
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
                                id: 'formcabeceraoperativos',
                                titleCollapse: true,
                                flex: 1,
                                autoScroll: true,
                                layout: 'column',
                                items: this.gridModuloInspeccion
                            },{
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
                            }],

                        }
                    ]
                })
            });
        }
        //Llamado a función que muestra la ventana en pantalla
        win.show();
        setTimeout(function () {
            this.storeModuloInspeccion.load({
                params: {
                    start: 0,
                    limit: limiteModuloInspeccion
                }
            });
        }, 10);
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
                nombre: '',
                nombre_completo: '',
                activo: '',
                orden: '',
            });
            this.gridModuloInspeccion.stopEditing();
            this.storeModuloInspeccion.insert(0, inspeccion);
            this.gridModuloInspeccion.startEditing(0, 0);
        },

        //Función para actualizar los datos mostrados en pantalla de la pestaña de ModuloInspeccion
        requestGridDataModuloInspeccion: function () {
            this.storeModuloInspeccion.load();
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

});

