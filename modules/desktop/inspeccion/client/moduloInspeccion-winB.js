QoDesk.InspeccionWindow = Ext.extend(Ext.app.Module, {
    id: 'moduloInspeccion',
    type: 'desktop/inspeccion',

    init: function () {
        this.launcher = {
            text: 'Inspeccion',
            iconCls: 'mantenimiento-icon',
            handler: this.createWindow,
            scope: this
        }
    },
    createWindow: function () {
        var accesosAdministrador = this.app.isAllowedTo('accesosAdministrador', this.id);
        var accesosSecretaria = this.app.isAllowedTo('accesosSecretaria', this.id);
        var accesosZonales = this.app.isAllowedTo('accesosZonales', this.id);

        var acceso = (accesosAdministrador || accesosSecretaria || accesosZonales) ? true : false
        var isChecked = true;
        var desktop = this.app.getDesktop();
        var winHeight = desktop.getWinHeight();
        var winWidth = desktop.getWinWidth();

        var desktop = this.app.getDesktop();
        var AppMsg = new Ext.AppMsg({});
        var win = desktop.getWindow('grid-win-moduloInspeccion');

        //Ubicación de la carpeta de Inspeccion
        var urlInspeccion = "modules/desktop/inspeccion/server/";

        var textField = new Ext.form.TextField({allowBlank: false});
        var textFieldDetalle = new Ext.form.TextField({allowBlank: false});

        //Definición del formato de fecha
        function formatDate(value) {
            return value ? value.dateFormat('Y-m-d H:i:s') : '';
        }

        //Inicio ventana inspeccion
        //Definición de url CRUD
        var  proxyModuloInspeccion = new Ext.data.HttpProxy({
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
                {name: 'id_ordenanza', readOnly: true, allowBlank: true},
                {name: 'id_tipo_documento', readOnly: true, allowBlank: true},
                {name: 'num_documento', readOnly: true, allowBlank: true},
                {name: 'remitente', readOnly: true, allowBlank: true},
                {name: 'cedula', readOnly: true, allowBlank: true},
                {name: 'institucion', readOnly: true, allowBlank: true},
                {name: 'asunto', readOnly: true, allowBlank: true},
                //{name: 'descripcion_anexos', readOnly: true, allowBlank: true},
                {name: 'id_caracter_tramite', readOnly: true, allowBlank: true},
                {name: 'cantidad_fojas', readOnly: true, allowBlank: true},
                {name: 'procesado_inspeccion', allowBlank: true}
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
                {name: 'codificacion', readOnly: false, allowBlank: true},
                {name: 'nombre_denunciado', readOnly: false, allowBlank: true},
                {name: 'fecha_despacho', readOnly: false, allowBlank: true},
                {name: 'id_actividad', readOnly: false, allowBlank: true},
                {name: 'funcionario_entrega', readOnly: false, allowBlank: true},
                {name: 'respuesta', readOnly: false, allowBlank: true},
                {name: 'guia', readOnly: false, allowBlank: true}
            ]
        });

        //Definición de escritura en campos bdd Inspeccion
        var writerDetalleInspeccion = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });

        //Definición de store para módulo Inspeccion
        this.storeModuloInspeccion = new Ext.data.Store({
            id: "id",
            proxy: proxyModuloInspeccion,
            reader: readerModuloInspeccion,
            writer: writerModuloInspeccion,
            //autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            autoSave: true
            //baseParams: {}
        });

        //Definición de store para módulo Inspeccion
        this.storeDetalleInspeccion = new Ext.data.Store({
            id: "id",
            proxy: proxyDetalleInspeccion,
            reader: readerDetalleInspeccion,
            writer: writerDetalleInspeccion,
            //autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            //remoteSort: true,
            autoSave: true
            //baseParams: {}
        });

        var checkHandler = function (item, checked) {
            if (checked) {
                var store = this.storeModuloInspeccion;
                store.baseParams.filterField = item.key;
                searchFieldBtn.setText(item.text);
            }
        };

        //inicio combo tipo documento  TID
        storeTID = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 0, "nombre": "Seleccionar"},
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

        //inicio combo aprobación secretaría inspección
        storeAPROBADO = new Ext.data.JsonStore({
            root: 'datos',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                datos: [
                    {"id": 1, "nombre": "Aprobado"},
                    {"id": 2, "nombre": "Devuelto"},
                    {"id": 0, "nombre": "Pendiente"}
                ]
            }
        });

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


        var comboAPROBADO = new Ext.form.ComboBox({
            id: 'comboAPROBADO',
            store: storeAPROBADO,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function listaOrdenanzas(id) {
            var index = storeORD.find('id', id);
            if (index > -1) {
                var record = storeORD.getAt(index);
                return record.get('nombre');
            }
        }

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

        function aprobacion(id) {
            var index = storeAPROBADO.find('id', id);
            if (index > -1) {
                var record = storeAPROBADO.getAt(index);
                // return record.get('nombre');
                if (record.get('nombre') == 'Aprobado') {
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
        var comboPERDIS = new Ext.form.ComboBox({
            id: 'comboPERDIS',
            store: storePERDIS,
            valueField: 'id',
            displayField: 'nombre',
            mode: 'local',
            forceSelection: true,
            triggerAction: 'all',
            allowBlank: false
        });

        function tipoActividad(id) {
            var index = storeACTIVIDAD.find('id', id);
            if (index > -1) {
                var record = storeACTIVIDAD.getAt(index);
                return record.get('nombre_actividad');
            }
        }

        function tipoUnidadesPersonal(id) {
            var index = storePERDIS.find('id', id);
            if (index > -1) {
                var record = storePERDIS.getAt(index);
                return record.get('nombre');
            }
        }

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
        //bh llamada innecesaria
        //this.storeModuloInspeccion.load();
        //this.storeDetalleInspeccion.load();
        storeModuloInspeccion = this.storeModuloInspeccion;
        limiteModuloInspeccion = 100;
        storeDetalleInspeccion = this.storeDetalleInspeccion;
        limiteDetalleInspeccion = 100;
        storeModuloInspeccion.baseParams = {
            limit: limiteModuloInspeccion
        };



        //Inicio formato grid Inspeccion
        this.gridModuloInspeccion = new Ext.grid.EditorGridPanel({
            id: 'gridModuloInspeccion',
            xtype: "grid",
            height: winHeight*0.5,
            width: winWidth*0.99,
            store: this.storeModuloInspeccion,
            columns: [
                //Definición de campos bdd Inspeccion
                new Ext.grid.RowNumberer(),
                {header: 'Trámite', dataIndex: 'codigo_tramite', sortable: true, width: 100},
                {header: 'Fecha ingreso SG', dataIndex: 'recepcion_documento', sortable: true, width: 250, sorters: [{
                        direction: 'ASC'}]},
                {header: 'Tipo documento', dataIndex: 'id_tipo_documento', sortable: true, width: 200,
                    editor: comboTID, renderer: personaTipoDocumento},
                {header: 'Número Documento', dataIndex: 'num_documento', sortable: true, width: 300, editor: textField},
                {header: 'Ordenanza', dataIndex: 'id_ordenanza', sortable: true, width: 150, editor: comboORD, renderer: listaOrdenanzas},
                {header: 'Nombre Remitente', dataIndex: 'remitente', sortable: true, width: 400, editor: textField},
                {header: 'Cédula', dataIndex: 'cedula', sortable: true, width: 200, editor: textField},
                {header: 'Entidad', dataIndex: 'institucion', sortable: true, width: 200, editor: textField},
                {header: 'Asunto', dataIndex: 'asunto', sortable: true, width: 600, editor: textField},
                {header: 'Caracter trámite', dataIndex: 'id_caracter_tramite', sortable: true, width: 200, editor: comboCDT,
                    renderer: caracterTramite},
                {header: 'Fojas', dataIndex: 'cantidad_fojas', width: 100,editor: textField},
                {header: 'Aceptación', dataIndex: 'procesado_inspeccion', sortable: true, width: 150, editor: comboAPROBADO,
                    renderer: aprobacion}
                ],
            viewConfig: {
                forceFit: true
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: function (sm, row, rec) {
                        // recuperamos la informacion de personal asignado a ese operativo
                        select_codigo_tramite = rec.data.codigo_tramite;
                        storeDetalleInspeccion.load({params: {id: rec.data.codigo_tramite}});
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

        this.gridDetalleInspeccion = new Ext.grid.EditorGridPanel({
            id: 'gridDetalleInspeccion',
            //autoHeight: true,
            //autoScroll: true,
            height: winHeight*0.25,
            width: winWidth*0.99,
            store: this.storeDetalleInspeccion,
            columns: [
                new Ext.grid.RowNumberer(),
                {header: 'Código trámite', dataIndex: 'id_denuncia', autoSave:true, hidden: true},
                {header: 'Cód inspección', dataIndex: 'id_inspeccion', autoSave:true, sortable: true, width: 200},
                //{header: 'Codificacion', dataIndex: 'codificacion', sortable: true, width: 200, editor: textFieldDetalle, autoSave:true},
                {header: 'Codificacion', dataIndex: 'id_actividad', sortable: true, width: 200,  editor: comboACTIVIDAD,
                    autoSave:true, renderer: tipoActividad},
                {header: 'Nombre denunciado', dataIndex: 'nombre_denunciado', sortable: true, width: 200, editor: textFieldDetalle, autoSave:true},
                //{header: 'Sumilla DMI', dataIndex: 'sumilla_dmi', sortable: true, width: 400, editor: textFieldDetalle, autoSave:true},
                {header: 'Sumilla DMI', dataIndex: 'fecha_despacho', sortable: true, width: 200, renderer: formatDate,
                    editor: new Ext.ux.form.DateTimeField({
                        dateFormat: 'Y-m-d',
                        timeFormat: 'H:i:s'
                    })
                },
                //{header: 'Tipo de actividad', dataIndex: 'id_actividad', sortable: true, width: 200,  editor: comboACTIVIDAD,
                    //autoSave:true, renderer: tipoActividad},
                {header: 'Funcionario Entrega', dataIndex: 'nombres', sortable: true, width: 200, editor: comboPERDIS,
                        autoSave:true, renderer: tipoUnidadesPersonal},
                {header: 'Respuesta', dataIndex: 'respuesta', sortable: true, width: 200, editor: textFieldDetalle, autoSave:true},
                {header: 'Guia', dataIndex: 'guia', sortable: true, width: 150, editor: textFieldDetalle, autoSave:true}
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
                pageSize: limiteDetalleInspeccion,
                store: storeDetalleInspeccion,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "Seleccione un trámite"
            })
        });


        //Fin formato grid detalle inspeccion

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
                            title: 'Trámites pendientes',
                            closable: true,
                            //layout: 'fit',
                            //height: winHeight-70,
                            //disabled: this.app.isAllowedTo('accesosAdministrador', this.id) ? false : true,
                            //Barra de botones
                            tbar: [
                                //Definición de botón nuevo
                                {
                                    text: 'Nuevo',
                                    scope: this,
                                    handler: this.addModuloInspeccion,
                                    iconCls: 'save-icon'
                                },
                                '-',
                                //Definición de botón eliminar
                                {
                                    text: "Eliminar",
                                    scope: this,
                                    handler: this.deleteModuloInspeccion,
                                    iconCls: 'delete-icon'
                                },
                                '-',
                                //Definición de botón regargar datos
                                {
                                    iconCls: 'demo-grid-add',
                                    handler: this.requestGridDataModuloInspeccion,
                                    scope: this,
                                    text: 'Recargar Datos'
                                },
                                '-',
                                {
                                    xtype: 'checkbox',
                                    boxLabel: 'Pendientes por aprobar ',
                                    id: 'checkPendientesAprobar',
                                    name: 'pendientesAprobar',
                                    checked: false,
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
                                }, /*this.targetFieldBtn,*/

                                //bh boton generar
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonGenerarGuia,
                                    scope: this,
                                    text: 'Generar Nueva Guía',
                                    tooltip: 'Se genera guía con los ',
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
                            },{
                                flex: 2,
                                bodyStyle: 'padding:0; background: #DFE8F6',
                                layout: 'column',
                                tbar: [
                                    //Definición de botón nuevo
                                    {
                                        id: 'btnNuevoDetalleInspeccion',
                                        text: 'Nuevo',
                                        scope: this,
                                        handler: this.addDetalleInspeccion,
                                        disabled: false,
                                        iconCls: 'save-icon'
                                    },
                                    '-',
                                    //Definición de botón eliminar
                                    {
                                        id: 'btnEliminarDetalleInspeccion',
                                        text: "Eliminar",
                                        scope: this,
                                        handler: this.deleteDetalleInspeccion,
                                        disabled: false,
                                        iconCls: 'delete-icon'
                                    },
                                    '-',
                                    //Definición de botón regargar datos
                                    {
                                        id: 'btnRegargarDatosDetalleInspeccion',
                                        iconCls: 'demo-grid-add',
                                        handler: this.requestGridDataDetalleInspeccion,
                                        disabled: true,
                                        scope: this,
                                        text: 'Recargar Datos'
                                    }
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
                                items: [
                                    {
                                        xtype: 'tabpanel',

                                        activeTab: 0,
                                        width: winWidth,
                                        cls: 'no-border',
                                        items: [
                                            {
                                                title: 'Datos inspección',
                                                layout: 'column',
                                                items: this.gridDetalleInspeccion
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
/*
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

            //bloquearLectura(forma, bloqueo);
        };
*/
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
            this.storeModuloInspeccion.load({
                params: {
                    start: 0,
                    limit: limiteModuloInspeccion,
                    pendientesAprobar: isChecked
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
                recepción_documento: '',
                id_ordenanza: '0',
                id_tipo_documento: '0',
                num_documento: '',
                remitente: '',
                cedula: '',
                institucion: '',
                asunto: '',
                id_caracter_tramite: '0',
                cantidad_fojas: '0',
                procesado_inspeccion: '0'
            });
            this.gridModuloInspeccion.stopEditing();
            this.storeModuloInspeccion.insert(0, inspeccion);
            this.gridModuloInspeccion.startEditing(0, 0);
        },

        //Función para actualizar los datos mostrados en pantalla de la pestaña de ModuloInspeccion
        requestGridDataModuloInspeccion: function () {
            this.storeModuloInspeccion.load();
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
            'id_denuncia' : select_codigo_tramite,
            'id_inspeccion' : '',
            'codificacion' : '',
            'fecha_despacho' : '',
            'id_actividad' : '',
            'funcionario_entrega' : '',
            'respuesta' : '',
            'guia' : ''
    });
        this.gridDetalleInspeccion.stopEditing();
        this.storeDetalleInspeccion.insert(0, inspeccion);
        this.gridDetalleInspeccion.startEditing(0, 0);
    },

    //Función para actualizar los datos mostrados en pantalla de la pestaña de detalle inspeccion
    requestGridDataDetalleInspeccion: function () {
        this.storeDetalleInspeccion.load();
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
            msg: 'Se descará el formato Excel<br>Se cambiará el estado de generado Si.<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/inspeccion/server/generarNuevasGuias.php';
                    setTimeout(function () {
                        storeModuloInspeccion.load({params: {noenviados: Ext.getCmp('checkNoRecibidos').getValue()}});
                    }, 1000);
                }
            }
        });
    },
});