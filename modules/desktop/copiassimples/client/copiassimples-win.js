QoDesk.CopiassimplesWindow = Ext.extend(Ext.app.Module, {
    id: 'copiassimples',
    type: 'desktop/copiassimples',

    init: function () {
        this.launcher = {
            text: 'Copias simples',
            iconCls: 'copiassimples-icon',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function () {
        var desktop = this.app.getDesktop();

        var accesosSecretaria = this.app.isAllowedTo('accesosSecretaria', this.id);
        var registroProcesado = '';
        var win = desktop.getWindow('grid-win-copiassimples');
        //var urlCopiassimples = "http://agenciadecontrol.quito.gob.ec/amcserver/"; // servidor produccion
        var urlCopiassimples = "modules/desktop/copiassimples/server/";

        //this.urlCopiassimples = urlCopiassimples;
        this.urlCopiassimples = urlCopiassimples;
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

        function copiassimplesActivo(id) {
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

        var formatoFechaMax = new Ext.form.DateField({
            format: 'Y-m-d',
            background: '#0000ff'
        });

        function renderGeneraImagen(value, id, r) {
            return '<input type="button" value="Genera Imagen' + value + ' " id="' + value + '"/>';
        }

        function llenaVideo(canvasId, videoSubidoId, nombreArchivoSubido) {
            var canvas = document.getElementById(canvasId);
            var video = document.getElementById(videoSubidoId);
            canvas.width = 200;
            canvas.height = 157;
            canvas.getContext('2d').drawImage(video, 0, 0, 300, 150);

            var Pic = document.getElementById(canvasId).toDataURL("image/png");
            Pic = Pic.replace(/^data:image\/(png|jpg);base64,/, "")

            Ext.Ajax.request({
                url: urlCopiassimples + 'uploadimagen.php',
                method: 'POST',
                params: {
                    imageData: Pic,
                    nombreArchivoSubido: nombreArchivoSubido
                },
                success: function (response, opts) {
                    var obj = Ext.decode(response.responseText);

                },
                failure: function (response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        }

        //Copiassimples tab
        var proxyCopiassimples = new Ext.data.HttpProxy({
            api: {

                create: urlCopiassimples + "crudCopiassimples.php?operation=insert",
                read: urlCopiassimples + "crudCopiassimples.php?operation=select",
                update: urlCopiassimples + "crudCopiassimples.php?operation=upda",
                destroy: urlCopiassimples + "crudCopiassimples.php?operation=delete"
            }
        });

        var readerCopiassimples = new Ext.data.JsonReader({
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
                {name: 'idzonal', allowBlank: false},
                {name: 'zonal', allowBlank: false},
                {name: 'correoelectronico', allowBlank: false},
                {name: 'imagenasolicitud', allowBlank: false},
                {name: 'abogado', allowBlank: false},
                {name: 'abogadomatricula', allowBlank: false},
                {name: 'expediente', allowBlank: false},
                {name: 'otrodocumento', allowBlank: false},
                {name: 'direccion', allowBlank: false},
                {name: 'fecha', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'ip', allowBlank: false},
                {name: 'idingreso', allowBlank: false},
                {name: 'confirmed', allowBlank: false},
                {name: 'procesado', allowBlank: false},
                {name: 'fechaprocesado', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'asignado', allowBlank: false}
            ]
        });

        var writerCopiassimples = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        var storeCopiassimples = new Ext.data.Store({
            id: "storeCopiassimples",
            proxy: proxyCopiassimples,
            reader: readerCopiassimples,
            writer: writerCopiassimples,
            autoSave: true
        });
        storeCopiassimples.load();
        limitecopiassimples = 50

        this.storeCopiassimples = storeCopiassimples;

        this.gridCopiassimples = new Ext.grid.EditorGridPanel({
            height: 200,
            widht: '100%',
            store: storeCopiassimples, columns: [
                new Ext.grid.RowNumberer({width: 40})
                , {header: 'Id', dataIndex: 'id', sortable: true, width: 60, scope: this}
                , {header: 'confirmed', dataIndex: 'confirmed', sortable: true, width: 70, scope: this}
                , {header: 'procesado', dataIndex: 'procesado', sortable: true, width: 70, scope: this}
                , {
                    header: 'fechaprocesado',
                    dataIndex: 'fechaprocesado',
                    sortable: true,
                    width: 100,
                    renderer: formatDate
                }
                , {header: 'asignado', dataIndex: 'asignado', sortable: true, width: 70, scope: this}
                , {header: 'cedula', dataIndex: 'cedula', sortable: true, width: 70, scope: this}
                , {header: 'nombres', dataIndex: 'nombres', sortable: true, width: 70, scope: this}
                , {header: 'apellidos', dataIndex: 'apellidos', sortable: true, width: 70, scope: this}
                , {header: 'idzonal', dataIndex: 'idzonal', sortable: true, width: 70, scope: this}
                , {header: 'zonal', dataIndex: 'zonal', sortable: true, width: 70, scope: this}
                , {header: 'correoelectronico', dataIndex: 'correoelectronico', sortable: true, width: 70, scope: this}
                , {header: 'imagenasolicitud', dataIndex: 'imagenasolicitud', sortable: true, width: 70, scope: this}
                , {header: 'abogado', dataIndex: 'abogado', sortable: true, width: 70, scope: this}
                , {header: 'abogadomatricula', dataIndex: 'abogadomatricula', sortable: true, width: 70, scope: this}
                , {header: 'expediente', dataIndex: 'expediente', sortable: true, width: 70, scope: this}
                , {header: 'otrodocumento', dataIndex: 'otrodocumento', sortable: true, width: 70, scope: this}
                , {header: 'direccion', dataIndex: 'direccion', sortable: true, width: 70, scope: this}
                , {header: 'fecha', dataIndex: 'fecha', sortable: true, width: 100, renderer: formatDate}
                , {header: 'ip', dataIndex: 'ip', sortable: true, width: 70, scope: this}
                , {header: 'idingreso', dataIndex: 'idingreso', sortable: true, width: 70, scope: this}],
            viewConfig: {
                forceFit: false,
                getRowClass: function (record, index) {
                    if (record.get('procesado') == 'false') return 'gold';
                }
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: function (sm, row, rec) {
                        this.record = rec;
                        this.idDenunciasRecuperada = rec.id;
                        /*cargar el formulario*/
                        cargaDetalle(rec.id, this.formCopiassimplesDetalle, rec);
                        registroProcesado = this.record.get("procesado");
                        if (accesosSecretaria) {
                            if (registroProcesado == 'true') {
                                Ext.getCmp('tb_negarcopiassimples').setDisabled(true);
                                Ext.getCmp('tb_aprobarcopiassimples').setDisabled(true);
                                Ext.getCmp('motivoNegarDenuncia').setDisabled(true);
                                //   Ext.getCmp('codigo_tramite_formulario').setDisabled(true);
                            }
                            else {
                                Ext.getCmp('tb_negarcopiassimples').setDisabled(false);
                                // Ext.getCmp('tb_aprobarcopiassimples').setDisabled(false);
                                Ext.getCmp('motivoNegarDenuncia').setDisabled(false);
                                //   Ext.getCmp('codigo_tramite_formulario').setDisabled(false);
                            }
                        } else {
                            Ext.getCmp('tb_negarcopiassimples').setDisabled(true);
                            Ext.getCmp('tb_aprobarcopiassimples').setDisabled(true);
                            Ext.getCmp('motivoNegarDenuncia').setDisabled(true);
                            //    Ext.getCmp('codigo_tramite_formulario').setDisabled(true);
                        }
                    }
                }
            }),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: limitecopiassimples,
                store: storeCopiassimples,
                displayInfo: true,
                displayMsg: 'Mostrando solicitudes Copias Simpless {0} - {1} of {2}',
                emptyMsg: "No existen copiassimpless que mostrar"
            }),
        });
        //fin Copiassimples tab

        var win = desktop.getWindow('layout-win');

        if (!win) {

            var checkHandler = function (item, checked) {
                if (checked) {
                    var store = this.storeCopiassimples;
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
                            key: 'expediente',
                            scope: this,
                            text: 'Expediente'
                        }
                    ]
                })
                , text: 'Código trámite'
            });


            this.formCopiassimplesDetalle = new Ext.FormPanel({
                id: 'formCopiassimplesDetalle',
                cls: 'no-border',
                fileUpload: true,
                items: [
                    {
                        region: 'north',
                        height: 200,

                        autoScroll: false,
                        id: 'formcabeceracopiassimples',
                        items: this.gridCopiassimples
                    },
                    {
                        region: 'center',
                        split: true,
                        autoScroll: true,

                        height: winHeight - 265,
                        minSize: 100,
                        margins: '0 0 0 0',
                        tbar: [
                            {
                                text: 'Aprobar solicitud Copias Simples',
                                scope: this,
                                handler: this.aprobarcopiassimples,
                                iconCls: 'save-icon',
                                disabled: true,
                                id: 'tb_aprobarcopiassimples'
                                , formBind: true
                            }, {
                                text: 'Negar solicitud copias simples',
                                scope: this,
                                handler: this.negarcopiassimples,
                                iconCls: 'save-icon',
                                disabled: true,
                                id: 'tb_negarcopiassimples',
                                formBind: true
                            },
                            {
                                text: '| Motivo negar:'
                                , xtype: 'tbtext',
                            },
                            {
                                xtype: 'textfield',
                                id: 'motivoNegarDenuncia',
                                disabled: true,
                                anchor: '40%',
                                width: '500'
                            },
                            '->',
                            {
                                text: 'Solicitudes anteriores:'
                                , xtype: 'tbtext',
                                id: 'textSolicitudesAnteriores'
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
                                            {xtype: 'hidden', name: 'urlcopiassimples'},
                                            {xtype: 'hidden', name: 'nombres'},
                                            {xtype: 'hidden', name: 'apellidos'},
                                            {xtype: 'hidden', name: 'cedula'},
                                            {xtype: 'hidden', name: 'correoelectronico'},
                                            {xtype: 'hidden', name: 'ampliacioncopiassimples'},
                                            {xtype: 'hidden', name: 'direccioncopiassimplesdo'},
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Fecha',
                                                name: 'fecha2'
                                            },
                                            //  {xtype: 'displayfield', fieldLabel: 'Denuncia', name: 'urlcopiassimples2'},
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
                                                value: '2. DATOS SOLICITUD',
                                                cls: 'negrilla',
                                                anchor: '95%'
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Zonal',
                                                name: 'zonal',
                                                anchor: '96%'
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Expediente',
                                                name: 'expediente',
                                                anchor: '96%'
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Otro documento',
                                                name: 'otrodocumento',
                                                anchor: '96%'
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Dirección / Unidad',
                                                name: 'direccion',
                                                anchor: '96%'
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Abogado',
                                                name: 'abogado',
                                                anchor: '96%'
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Matrícula abogado',
                                                name: 'abogadomatricula',
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
                                                value: '3. ANEXOS',
                                                cls: 'negrilla',
                                                anchor: '95%'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Solicitud',
                                                name: 'imagenasolicitud'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Motivo negar',
                                                name: 'motivo_negar',
                                                anchor: '95%'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Total pedidos anteriores',
                                                name: 'totalcopiassimples',
                                                anchor: '95%'
                                            },
                                            {
                                                xtype: 'fileuploadfield',
                                                id: 'archivoexpediente',
                                                emptyText: 'Seleccione el archivo pdf del expediente ',
                                                fieldLabel: 'Archivo PDF',
                                                name: 'archivoexpediente',
                                                buttonText: '',
                                                anchor: '95%',
                                                //allowBlank: false,
                                                buttonCfg: {
                                                    iconCls: 'upload-icon'
                                                },
                                                listeners: {
                                                    fileselected: function (value, newValue, oldValue) {
                                                        //
                                                        if (accesosSecretaria) {
                                                            if (registroProcesado == 'false') {
                                                                if (newValue != oldValue) {
                                                                    //en caso que ya no sea editable
                                                                    Ext.getCmp('tb_aprobarcopiassimples').setDisabled(false);
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Expediente',
                                                name: 'urlexpediente'
                                            }
                                            ,
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Observaciones',
                                                name: 'observaciones',
                                                anchor: '95%',
                                                //allowBlank: false,
                                                id: 'observaciones'
                                            }
                                        ]
                                    }
                                ]
                            }

                        ]
                    }
                ]
            });

            win = desktop.createWindow({
                id: 'grid-win-copiassimples',
                title: 'Gestión Copias simples',
                width: winWidth,
                height: winHeight,
                iconCls: 'copiassimples-icon',
                shim: false,
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                tbar: [
                    {
                        id: 'recargardatos',
                        iconCls: 'reload-icon',
                        handler: this.requestCopiassimplesData,
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
                        , store: this.storeCopiassimples
                    })
                ],
                items: this.formCopiassimplesDetalle
            });
        }
        win.show();

        function cargaDetalle(copiassimples, forma, bloqueo) {
            forma = Ext.getCmp('formCopiassimplesDetalle');
            forma.getForm().load({
                waitMsg: 'Recuperando información',
                url: urlCopiassimples + 'crudCopiassimples.php?operation=selectForm',
                params: {
                    id: copiassimples
                },
                success: function (response, opts) {
                    mensaje = Ext.getCmp('textSolicitudesAnteriores');
                    mensaje.setText('Solicitudes Copias Simples anteriores: ' + (response.findField('totalcopiassimples').getValue() - 1))
                }

            });

        };

        function bloquearLectura(forma, activar) {
            Ext.getCmp('id_persona').setReadOnly(activar);
            Ext.getCmp('recepcion_documento').setReadOnly(activar);
            Ext.getCmp('id_tipo_documento').setReadOnly(activar);
            Ext.getCmp('num_documento').setReadOnly(activar);
            Ext.getCmp('remitente').setReadOnly(activar);
            Ext.getCmp('cedula').setReadOnly(activar);
            Ext.getCmp('email').setReadOnly(activar);
            Ext.getCmp('descripcion_anexos').setReadOnly(activar);
            Ext.getCmp('cantidad_fojas').setReadOnly(activar);
            Ext.getCmp('asunto').setReadOnly(activar);
            Ext.getCmp('id_caracter_tramite').setReadOnly(activar);
            Ext.getCmp('observacion_secretaria').setReadOnly(activar);
            Ext.getCmp('reasignacion').setReadOnly(activar);
        };

    },
    aprobarcopiassimples: function () {
        store = this.storeCopiassimples;
        var urlCopiassimples = this.urlCopiassimples;
        var urlCopiassimples = this.urlCopiassimples;
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Desea grabar la solicitud de Copia Simple.<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var myForm = Ext.getCmp('formCopiassimplesDetalle').getForm();
                    myForm.submit({
                        url: urlCopiassimples + 'crudCopiassimples.php?operation=aprobarDenuncia',
                        method: 'POST',
                        waitMsg: 'Saving data',
                        success: function (form, action) {
                            //se actualiza tabla en la web
                            Ext.getCmp('tb_negarcopiassimples').setDisabled(true);
                            Ext.getCmp('tb_aprobarcopiassimples').setDisabled(true);
                            store.load();
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
    negarcopiassimples: function () {
        store = this.storeCopiassimples;
        var urlCopiassimples = this.urlCopiassimples;
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Desea negar el copiassimples, .<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var myForm = Ext.getCmp('formCopiassimplesDetalle').getForm();
                    if (myForm.isValid()) {
                        myForm.submit({
                            url: urlCopiassimples + 'crudCopiassimples.php?operation=negarDenuncia',
                            method: 'POST',
                            waitMsg: 'Grabando',
                            success: function (form, action) {
                                Ext.getCmp('tb_negarcopiassimples').setDisabled(true);
                                Ext.getCmp('tb_aprobarcopiassimples').setDisabled(true);
                                store.load();
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
            }

        });
    },
    requestCopiassimplesParticipantesData: function () {
        this.storeCopiassimplesParticipantes.load();
    },
    requestCopiassimplesParticipantesDataExport: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Descargue el archivo xls  .<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/copiassimples/server/CopiassimplesParticipantes.php';
                }
            }
        });
    },
    requestCopiassimplesIntentosData: function () {
        this.storeCopiassimplesIntentos.load();
    },
    requestCopiassimplesIntentosDataExport: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Descargue el archivo xls  .<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/copiassimples/server/CopiassimplesIntentos.php';
                }
            }
        });
    },
    requestCopiassimplesData: function () {
        this.storeCopiassimples.load();
    },
    requestCopiassimplesDataExport: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Descargue el archivo xls  .<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/copiassimples/server/Copiassimples.php';
                }
            }
        });
    },
    requestCopiassimplesEstadisticasDataExport: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Descargue el archivo xls  .<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/copiassimples/server/CopiassimplesEstadisticas.php';
                }
            }
        });
    }
});



