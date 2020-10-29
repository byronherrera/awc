QoDesk.ConsultaciudadanaWindow = Ext.extend(Ext.app.Module, {
    id: 'consultaciudadana',
    type: 'desktop/consultaciudadana',

    init: function () {
        this.launcher = {
            text: 'Consulta ciudadana',
            iconCls: 'consultaciudadana-icon',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function () {
        var desktop = this.app.getDesktop();
        // define a que tiene acceso los funcionario de acuerdo al perfil

        var accesosSecretaria = this.app.isAllowedTo('accesosSecretaria', this.id);
        var accesosAdministrador = this.app.isAllowedTo('accesosAdministrador', this.id);
        var accesosConsultas = this.app.isAllowedTo('accesosConsultas', this.id);

        var acceso = (accesosSecretaria || accesosAdministrador) ? true : false

        var win = desktop.getWindow('grid-win-consultaciudadana');
        var AppMsg = new Ext.AppMsg({});
        var urlConsultaciudadanaLocal = "modules/desktop/consultaciudadana/server/";

        this.urlConsultaciudadanaLocal = urlConsultaciudadanaLocal;
        var winWidth = desktop.getWinWidth();
        var winHeight = desktop.getWinHeight();

        //inicio combo activo
        storeSASINO = new Ext.data.JsonStore({
            root: 'users',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                users: [
                    {"id": 1, "nombre": "Si"},
                    {"id": 0, "nombre": "No"}

                ]
            }
        });

        var comboSASINO = new Ext.form.ComboBox({
            id: 'comboSASINO',
            store: storeSASINO,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function consultaciudadanaActivo(id) {
            var index = storeSASINO.findExact('id', id);
            if (index > -1) {
                var record = storeSASINO.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo activo

        var textField = new Ext.form.TextField({allowBlank: false});

        function formatDate(value) {
            return value ? value.dateFormat('Y-m-d H:i') : '';
        }

        function renderGeneraImagen(value, id, r) {
            var url = Ext.util.JSON.decode(value);
            return '<a href="' + url.archivo1 + ' " target="_blank">Ver Cédula</\>';
        }

        //inicio combo persona recepta la operativos CCM
        storeCCM = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personalsecretaria',
            baseParams: {
                todos: 'true',
                accesosAdministradorOpe: true,
                accesosOperativos: true,
                acceso: true
            }

        });

        var comboCCM = new Ext.form.ComboBox({
            id: 'comboCCM',
            store: storeCCM,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            //forceSelection: true,
            allowBlank: true
        });

        function personaEnviaRespuesta(id) {
            //var index = storeCCM.findExact('id', id);
            var index = storeCCM.findExact('id', id);
            if (index > -1) {
                var record = storeCCM.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo persona recepta la operativos CCM

        //inicio combo Estado consulta
        storeESTCONS = new Ext.data.JsonStore({
            root: 'users',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                users: [
                    {"id": 'Emitido', "nombre": "Emitido"},
                    {"id": 'En proceso', "nombre": "En proceso"},
                    {"id": 'Finalizado', "nombre": "Finalizado"}
                ]
            }
        });

        var comboESTCONS = new Ext.form.ComboBox({
            id: 'comboOPNICO',
            store: storeESTCONS,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function estadoConsultaCiudadanan(id) {
            var index = storeESTCONS.findExact('id', id);
            if (index > -1) {
                var record = storeESTCONS.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo combo Estado consulta

        //Consultaciudadana tab
        var proxyConsultaciudadana = new Ext.data.HttpProxy({
            api: {

                create: urlConsultaciudadanaLocal + "crudConsultaciudadana.php?operation=insert",
                read: urlConsultaciudadanaLocal + "crudConsultaciudadana.php?operation=select",
                update: urlConsultaciudadanaLocal + "crudConsultaciudadana.php?operation=update",
                destroy: urlConsultaciudadanaLocal + "crudConsultaciudadana.php?operation=delete"
            },
            listeners: {
                exception: function (proxy, type, action, options, response, arg) {
                    if (typeof response.message !== 'undefined') {
                        if (response.message != '') {
                            AppMsg.setAlert(AppMsg.STATUS_NOTICE, response.message);
                        }
                    }
                }
            }
        });

        var readerConsultaciudadana = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: false},
                {name: 'cedula', allowBlank: false},
                {name: 'nombres', allowBlank: false},
                {name: 'apellidos', allowBlank: false},
                {name: 'correoelectronico', allowBlank: false},
                {name: 'celular', allowBlank: false},
                {name: 'solicitud', allowBlank: false},
                {name: 'observaciones', allowBlank: false},
                {name: 'idzonal', allowBlank: false},
                {name: 'zonal', allowBlank: false},
                {name: 'imagencedula', allowBlank: false},
                {name: 'fecha', type: 'date', dateFormat: 'c', allowBlank: true},

                {name: 'secretaria_id_secretaria', allowBlank: true},
                {name: 'secretaria_estado', allowBlank: false},
                {name: 'secretaria_fecha_inicio', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'secretaria_fecha_finalizado', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'secretaria_sitra_respuesta', allowBlank: true},
                {name: 'secretaria_observacion', allowBlank: true}

            ]
        });

        var writerConsultaciudadana = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        var storeConsultaciudadana = new Ext.data.Store({
            id: "storeConsultaciudadana",
            proxy: proxyConsultaciudadana,
            reader: readerConsultaciudadana,
            writer: writerConsultaciudadana,
            autoSave: true
        });
        storeConsultaciudadana.load();
        limiteconsultaciudadana = 50

        this.storeConsultaciudadana = storeConsultaciudadana;

        this.gridConsultaciudadana = new Ext.grid.EditorGridPanel({
            height: 200,
            widht: '100%',
            store: storeConsultaciudadana,
            columns: [
                new Ext.grid.RowNumberer({width: 40})
                , {header: 'Id', dataIndex: 'id', sortable: true, width: 50, scope: this}
                , {
                    header: 'Encargado',
                    dataIndex: 'secretaria_id_secretaria',
                    sortable: true,
                    width: 90,
                    scope: this,
                    hidden: true
                }, {
                    header: 'Estado',
                    dataIndex: 'secretaria_estado',
                    sortable: true,
                    width: 70,
                    scope: this,
                    editor: comboESTCONS,
                    renderer: estadoConsultaCiudadanan
                }
                , {header: 'Fecha pedido', dataIndex: 'fecha', sortable: true, width: 100, renderer: formatDate}
                , {
                    header: 'Fecha Inicio',
                    dataIndex: 'secretaria_fecha_inicio',
                    sortable: true,
                    width: 100,
                    scope: this,
                    renderer: formatDate
                }
                , {
                    header: 'Fecha Fin',
                    dataIndex: 'secretaria_fecha_finalizado',
                    sortable: true,
                    width: 100,
                    scope: this,
                    renderer: formatDate
                }
                , {
                    header: 'Respuesta SITRA',
                    dataIndex: 'secretaria_sitra_respuesta',
                    sortable: true,
                    width: 120,
                    scope: this
                }

                , {header: 'cedula', dataIndex: 'cedula', sortable: true, width: 70, scope: this}
                , {header: 'nombres', dataIndex: 'nombres', sortable: true, width: 120, scope: this}
                , {header: 'apellidos', dataIndex: 'apellidos', sortable: true, width: 120, scope: this}
                , {
                    header: 'Correo electronico',
                    dataIndex: 'correoelectronico',
                    sortable: true,
                    width: 180,
                    scope: this
                }
                , {header: 'Celular', dataIndex: 'celular', sortable: true, width: 100, scope: this}
                , {header: 'Zonal', dataIndex: 'zonal', sortable: true, width: 80, scope: this}
                , {
                    header: 'Imagen cédula',
                    dataIndex: 'imagencedula',
                    sortable: true,
                    width: 70,
                    scope: this,
                    renderer: renderGeneraImagen
                }

                , {header: 'observaciones', dataIndex: 'observaciones', sortable: true, width: 180, scope: this}
            ],
            clicksToEdit: 1,
            viewConfig: {
                forceFit: false,
                getRowClass: function (record, index) {
                    if (record.get('secretaria_estado') == 'Emitido') return 'gold';
                    if (record.get('secretaria_estado') == 'En proceso') return 'bluestate';
                }
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: function (sm, row, rec) {
                        this.record = rec;
                        /*cargar el formulario*/
                        cargaDetalle(rec.id);

                        //   storeMensajesConsultas.baseParams.id  = rec.id;
                        var id_local = rec.id;
                        storeMensajesConsultas.baseParams.id = id_local;
                        storeMensajesConsultas.load();
                        this.record.get("secretaria_estado")
                        if (acceso) {
                            if (this.record.get("secretaria_estado") != 'En proceso') {
                                Ext.getCmp('tb_grabarconsultaciudadana').setDisabled(true);
                            }
                            else {
                                Ext.getCmp('tb_grabarconsultaciudadana').setDisabled(false);
                            }
                        } else {
                            Ext.getCmp('tb_grabarconsultaciudadana').setDisabled(true);
                        }
                    }
                }
            }),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            listeners: {
                beforeedit: function (e) {
                    // si el operativo ya esta marcado como finalizado no se lo puede editar
                    if (acceso) {

                        if (accesosAdministrador)
                            return true;
                        if (e.field == 'secretaria_estado') {
                            // en caso que ya este finalizado no se puede editar
                            if (e.value == 'Finalizado') {
                                return false
                            }
                        }
                        return true;
                    } else {
                        // si no se tiene acceso se bloquea el registro
                        return false;
                    }
                }
            },

            bbar: new Ext.PagingToolbar({
                pageSize: limiteconsultaciudadana,
                store: storeConsultaciudadana,
                displayInfo: true,
                displayMsg: 'Mostrando solicitudes consultas ciudadanas {0} - {1} of {2}',
                emptyMsg: "No existen consultas ciudadanas que mostrar"
            }),
        });
        //fin Consultaciudadana tab


        //MensajesConsultas tab
        var proxyMensajesConsultas = new Ext.data.HttpProxy({
            api: {

                create: urlConsultaciudadanaLocal + "crudMensajesConsultas.php?operation=insert",
                read: urlConsultaciudadanaLocal + "crudMensajesConsultas.php?operation=select",
                update: urlConsultaciudadanaLocal + "crudMensajesConsultas.php?operation=update",
                destroy: urlConsultaciudadanaLocal + "crudMensajesConsultas.php?operation=delete"
            },
            listeners: {
                exception: function (proxy, type, action, options, response, arg) {
                    if (typeof response.message !== 'undefined') {
                        if (response.message != '') {
                            AppMsg.setAlert(AppMsg.STATUS_NOTICE, response.message);
                        }
                    }
                }
            }
        });

        var readerMensajesConsultas = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: false},
                {name: 'id_solicitud', allowBlank: false},
                {name: 'contenido', allowBlank: false},
                {name: 'estado_envio', allowBlank: false},
                {name: 'id_funcionario', allowBlank: true},
                {name: 'fecha_envio', type: 'date', dateFormat: 'c', allowBlank: false}
            ]
        });

        var writerMensajesConsultas = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        var storeMensajesConsultas = new Ext.data.Store({
            id: "storeMensajesConsultas",
            proxy: proxyMensajesConsultas,
            reader: readerMensajesConsultas,
            writer: writerMensajesConsultas,
            autoSave: true
        });


        this.storeMensajesConsultas = storeMensajesConsultas;

        this.gridMensajesConsultas = new Ext.grid.EditorGridPanel({
            autoHeight: true,
            autoScroll: true,
            store: storeMensajesConsultas,
            columns: [
                new Ext.grid.RowNumberer(),
                {
                    header: 'id',
                    dataIndex: 'id',
                    sortable: true,
                    width: 30,
                    hidden: true
                },{
                    header: 'id_solicitud',
                    dataIndex: 'id_solicitud',
                    sortable: true,
                    width: 30,
                    hidden: true
                },
                {
                    header: 'Contenido mensaje',
                    dataIndex: 'contenido',
                    sortable: true,
                    width: 140,
                    editor: textField
                },
                {
                    header: 'Estado envio mensaje',
                    dataIndex: 'estado_envio',
                    sortable: true,
                    width: 60
                },
                {
                    header: 'Funcionario envia mensaje',
                    dataIndex: 'id_funcionario',
                    sortable: true,
                    width: 20,
                    align: 'left',
                    renderer: personaEnviaRespuesta
                },
                {
                    header: 'Fecha envio mensaje',
                    dataIndex: 'fecha_envio',
                    sortable: true,
                    width: 60,
                    renderer: formatDate
                },
                {
                    xtype: 'actioncolumn',
                    header: 'Enviar',
                    width: 50,
                    align: 'center',
                    items: [
                        {
                            icon: 'email_go.png',
                            iconCls: 'save-icon',
                            tooltip: 'Enviar',
                            handler: function (grid, rowIndex, colIndex, item, e, record) {
                                var rec = storeMensajesConsultas.getAt(rowIndex);

                                console.log (rec);
                                console.log ("Sell " + rec.get('id'),  rec.get('id_solicitud'));
                            },
                            scope: this
                        }
                    ]
                }
            ],
            clicksToEdit: 1,
            viewConfig: {
                forceFit: true,
                getRowClass: function (record, index) {
                    if (record.get('estado_envio') == 'No enviado') return 'gold';
                    if (record.get('estado_envio') == 'Enviado') return 'bluestate';
                }
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: function (sm, row, rec) {
                        this.record = rec;
                        /*cargar el formulario*/

                    }
                }
            }),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            listeners: {
                beforeedit: function (e) {
                    // si el operativo ya esta marcado como finalizado no se lo puede editar
                    /* if (acceso) {

                         if (accesosAdministrador)
                             return true;
                         if (e.field == 'secretaria_estado') {
                             // en caso que ya este finalizado no se puede editar
                             if (e.value == 'Finalizado') {
                                 return false
                             }
                         }
                         return true;
                     } else {
                         // si no se tiene acceso se bloquea el registro
                         return false;
                     }*/
                }
            }

        });
        //fin MensajesConsultas tab


        var win = desktop.getWindow('layout-win');

        if (!win) {

            var checkHandler = function (item, checked) {
                if (checked) {
                    var store = this.storeConsultaciudadana;
                    store.baseParams.filterField = item.key;
                    searchFieldBtn.setText(item.text);
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
                        }
                        , {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'cedula',
                            scope: this,
                            text: 'Cédula'
                        }
                        , {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'apellido',
                            scope: this,
                            text: 'Apellido'
                        }
                        , {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'fecha',
                            scope: this,
                            text: 'Fecha'
                        }
                        , {
                            checked: false,
                            checkHandler: checkHandler,
                            group: 'filterField',
                            key: 'direccion',
                            scope: this,
                            text: 'Dirección'
                        }
                    ]
                })
                , text: 'Código trámite'
            });


            this.formConsultaciudadanaDetalle = new Ext.FormPanel({
                id: 'formConsultaciudadanaDetalle',
                cls: 'no-border',
                width: winWidth - 24,
                tbar: [
                    {
                        text: 'Grabar cambios',
                        scope: this,
                        handler: this.grabarconsultaciudadana,
                        iconCls: 'save-icon',
                        disabled: true,
                        id: 'tb_grabarconsultaciudadana',
                        formBind: true
                    },
                    '->',
                    {
                        text: 'Solicitudes anteriores:'
                        , xtype: 'tbtext',
                        id: 'textDenunciasAnteriores'
                    }
                ],
                items: [
                    {
                        activeTab: 0,
                        autoWidth: true,
                        cls: 'no-border',
                        layout: 'column',
                        items: [
                            {
                                columnWidth: 1 / 3,
                                cls: 'margen10',
                                layout: 'form',
                                monitorValid: true,
                                items: [
                                    {xtype: 'hidden', name: 'id'},
                                    {xtype: 'hidden', name: 'fecha'},
                                    {xtype: 'hidden', name: 'nombres'},
                                    {xtype: 'hidden', name: 'apellidos'},
                                    {xtype: 'hidden', name: 'cedula'},
                                    {xtype: 'hidden', name: 'correoelectronico'},
                                    {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Fecha',
                                        name: 'fecha2'
                                    },
                                    //  {xtype: 'displayfield', fieldLabel: 'Denuncia', name: 'urlconsultaciudadana2'},
                                    {
                                        xtype: 'displayfield',
                                        hideLabel: true,
                                        value: '1. DATOS DEL SOLICITANTE',
                                        cls: 'negrilla',
                                        anchor: '95%'
                                    }
                                    , {
                                        xtype: 'compositefield',
                                        fieldLabel: 'Nombres',
                                        msgTarget: 'under',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                name: 'nombres2',
                                                width: '45%',
                                                disabled: true,
                                                cls: 'disabled'
                                            },
                                            {
                                                xtype: 'textfield',
                                                name: 'apellidos2',
                                                width: '45%',
                                                margins: '0 5 0 0',
                                                disabled: true,
                                                cls: 'disabled'
                                            }
                                        ]
                                    }
                                    , {xtype: 'displayfield', fieldLabel: 'Email', name: 'correoelectronico2'}
                                    , {xtype: 'displayfield', fieldLabel: 'Cédula', name: 'cedula2'}
                                    , {
                                        xtype: 'compositefield',
                                        fieldLabel: 'Teléfono',
                                        msgTarget: 'under',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                name: 'celular',
                                                width: '45%',
                                                disabled: true,
                                                cls: 'disabled'
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                cls: 'fondogris',
                                columnWidth: 1 / 3,
                                layout: 'form',
                                items: [

                                    {
                                        xtype: 'displayfield',
                                        hideLabel: true,
                                        value: '2. DATOS DE LA SOLICITUD',
                                        cls: 'negrilla',
                                        anchor: '95%'
                                    },
                                    /* {xtype: 'displayfield', fieldLabel: 'materia ??', name: 'materia', anchor: '96%'},*/
                                    {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Zonal',
                                        name: 'zonal',
                                        anchor: '96%'
                                    },
                                    {
                                        xtype: 'displayfield',
                                        fieldLabel: 'solicitud',
                                        name: 'solicitud',
                                        anchor: '96%'
                                    },
                                    {
                                        xtype: 'displayfield',
                                        fieldLabel: 'observaciones',
                                        name: 'observaciones',
                                        anchor: '96%'
                                    },
                                    {
                                        xtype: 'displayfield',
                                        fieldLabel: 'imagencedula',
                                        name: 'imagencedula',
                                        anchor: '96%'
                                    }
                                ]
                            },
                            {
                                columnWidth: 1 / 3,
                                layout: 'form',
                                cls: 'margen10',
                                items: [
                                    {
                                        xtype: 'displayfield',
                                        hideLabel: true,
                                        value: '3. Respuesta Secretaria General',
                                        cls: 'negrilla',
                                        anchor: '95%'
                                    }
                                    , {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Funcionario Atiende',
                                        name: 'secretaria_id_secretaria'
                                    }
                                    , {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Estado',
                                        name: 'secretaria_estado'
                                    }


                                    , {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Fecha Inicio',
                                        name: 'secretaria_fecha_inicio'
                                    }
                                    , {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Fecha Finalizado',
                                        name: 'secretaria_fecha_finalizado',
                                        anchor: '95%'
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'SITRA',
                                        name: 'secretaria_sitra_respuesta',
                                        anchor: '95%',
                                        allowBlank: false,
                                        id: 'secretaria_sitra_respuesta'
                                    },
                                    {
                                        xtype: 'textfield',
                                        fieldLabel: 'Observaciones',
                                        name: 'secretaria_observacion',
                                        anchor: '95%',
                                        allowBlank: false,
                                        id: 'secretaria_observacion',
                                        listeners: {
                                            'change': function (value, newValue, oldValue) {
                                                if (newValue != oldValue) {

                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }

                ]
            });

            win = desktop.createWindow({
                id: 'grid-win-consultaciudadana',
                title: 'Gestión Consultaciudadana',
                width: winWidth,
                height: winHeight,
                iconCls: 'consultaciudadana-icon',
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
                            title: 'Solicitudes de Consulta Ciudadana',
                            closable: true,

                            items: [
                                {
                                    id: 'formcabeceraoperativos',
                                    titleCollapse: true,
                                    split: true,
                                    flex: 1,
                                    autoScroll: true,
                                    layout: 'column',
                                    tbar: [
                                        {
                                            id: 'recargardatos',
                                            iconCls: 'reload-icon',
                                            handler: this.requestConsultaciudadanaData,
                                            scope: this,
                                            text: 'Recargar Datos',
                                            tooltip: 'Recargar datos en la grilla'
                                        },

                                        '->'
                                        , {
                                            text: 'Buscar por:'
                                            , xtype: 'tbtext'
                                        }
                                        , searchFieldBtn
                                        , ' ', ' '
                                        , new QoDesk.QoAdmin.SearchField({
                                            paramName: 'filterText'
                                            , store: this.storeConsultaciudadana
                                        })
                                    ],
                                    items: this.gridConsultaciudadana
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
                                                    title: 'Resumen Solicitud',
                                                    layout: 'column',
                                                    id: 'detalleOperativosTab',
                                                    height: winHeight - 325,
                                                    width: winWidth,
                                                    items: this.formConsultaciudadanaDetalle,
                                                    disabled: false,
                                                    autoScroll: true
                                                },
                                                {
                                                    title: 'Menajes enviados',
                                                    layout: 'column',
                                                    height: winHeight - 325,
                                                    items: this.gridMensajesConsultas,
                                                    autoScroll: true,
                                                    tbar: [
                                                        {
                                                            text: 'Nuevo',
                                                            scope: this,
                                                            //TODO funcion nuevo
                                                            handler: this.addMensajesConsultas,
                                                            iconCls: 'save-icon',
//                                                            disabled: true,
                                                            id: 'addMensajesConsultas'
                                                            //disabled: !acceso
                                                        },
                                                        '-',
                                                        {
                                                            text: "Eliminar",
                                                            scope: this,
                                                            handler: this.deleteMensajesConsultas,
                                                            id: 'deleteMensajesConsultas',
                                                            iconCls: 'delete-icon',
                                                            //disabled: this.app.isAllowedTo('accesosAdministradorOpe', this.id) ? false : true
                                                            //                                                          disabled: true
                                                        },

                                                    ]
                                                },
                                            ]
                                        }

                                    ]
                                }
                            ]
                        },
                        /* {
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
                                 },
                                 {
                                     iconCls: 'excel-icon',
                                     handler: this.botonExportarDocumentoReporteCalendarioPersonal,
                                     scope: this,
                                     text: 'Calendario  personas',
                                     tooltip: 'Se genera archivo Excel con la información solicitada'
                                 }
                                 ,
                                 {
                                     iconCls: 'excel-icon',
                                     handler: this.botonExportarDocumentoReporteCalendarioOperativos,
                                     scope: this,
                                     text: 'Calendario  operativos',
                                     tooltip: 'Se genera archivo Excel con la información solicitada'
                                 }
                                 ,
                                 {
                                     iconCls: 'excel-icon',
                                     handler: this.botonExportarDocumentoReporteTotalOperativos,
                                     scope: this,
                                     text: 'Operativos tiempo',
                                     tooltip: 'Se genera archivo Excel con total tiempo por operativo'
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
                         } */
                    ]
                })
            });
        }
        win.show();

        function cargaDetalle(consultaciudadana) {
            forma = Ext.getCmp('formConsultaciudadanaDetalle');
            forma.getForm().load({
                waitMsg: 'Recuperando información',
                url: urlConsultaciudadanaLocal + 'crudConsultaciudadana.php?operation=selectForm',
                params: {
                    id: consultaciudadana
                },
                success: function (response, opts) {
                    mensaje = Ext.getCmp('textDenunciasAnteriores');
                    mensaje.setText('Solicitudes consultaciudadana anteriores: ' + (opts.result.data["totalconsultaciudadana"] - 1))
                }
            });
        };


    },
    grabarconsultaciudadana: function () {
        store = this.storeConsultaciudadana;

        var urlConsultaciudadanaLocal = this.urlConsultaciudadanaLocal;
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Desea aprobar la consultaciudadana.<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var myForm = Ext.getCmp('formConsultaciudadanaDetalle').getForm();
                    myForm.submit({
                        url: urlConsultaciudadanaLocal + 'crudConsultaciudadana.php?operation=grabarDetalle',
                        method: 'POST',
                        waitMsg: 'Saving data',
                        success: function (form, action) {
                            Ext.getCmp('tb_grabarconsultaciudadana').setDisabled(true);
                            //storeConsultaciudadana.load();
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

    requestConsultaciudadanaParticipantesData: function () {
        this.storeConsultaciudadanaParticipantes.load();
    },
    requestConsultaciudadanaParticipantesDataExport: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Descargue el archivo xls  .<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/consultaciudadana/server/ConsultaciudadanaParticipantes.php';
                }
            }
        });
    },
    requestConsultaciudadanaIntentosData: function () {
        this.storeConsultaciudadanaIntentos.load();
    },
    requestConsultaciudadanaIntentosDataExport: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Descargue el archivo xls  .<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/consultaciudadana/server/ConsultaciudadanaIntentos.php';
                }
            }
        });
    },
    requestConsultaciudadanaData: function () {
        this.storeConsultaciudadana.load();
    },
    requestConsultaciudadanaDataExport: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Descargue el archivo xls  .<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/consultaciudadana/server/Consultaciudadana.php';
                }
            }
        });
    },
    requestConsultaciudadanaEstadisticasDataExport: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Descargue el archivo xls  .<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/consultaciudadana/server/ConsultaciudadanaEstadisticas.php';
                }
            }
        });
    }
});



