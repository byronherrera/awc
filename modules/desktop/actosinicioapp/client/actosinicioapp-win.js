QoDesk.ActosInicioappWindow = Ext.extend(Ext.app.Module, {
    id: 'actosinicioapp',
    type: 'desktop/actosinicioapp',

    init: function () {
        this.launcher = {
            text: 'ActosInicioapp',
            iconCls: 'actosinicioapp-icon',
            handler: this.createWindow,
            scope: this
        }
    },

    createWindow: function () {
        var accesosAdministradorOpe = this.app.isAllowedTo('accesosAdministradorOpe', this.id);
        var accesosAdministradorIns = this.app.isAllowedTo('accesosAdministradorIns', this.id);
        var accesosOperativos = this.app.isAllowedTo('accesosOperativos', this.id);

        var acceso = (accesosAdministradorOpe || accesosOperativos) ? true : false;

        var desktop = this.app.getDesktop();

        var grabarDenuncia = this.app.isAllowedTo('grabarDenuncia', this.id);

        var win = desktop.getWindow('grid-win-actosinicioapp');
        //var urlActosInicioapp = "amcserver/";
        //var urlActosInicioapp = "http://agenciadecontrol.quito.gob.ec/amcserver/"; // servidor produccion
        var urlActosInicioapp = "modules/desktop/actosinicioapp/server/";

        this.urlActosInicioapp = urlActosInicioapp;
        var winWidth = desktop.getWinWidth();
        var winHeight = desktop.getWinHeight();

        //inicio combos
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

        storePRD = new Ext.data.JsonStore({
            root: 'data',
            fields: ['email_address', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personal_distributivo_email',
            baseParams: {
                todos: 'true',
                accesosAdministradorOpe: accesosAdministradorOpe,
                accesosOperativos: accesosOperativos,
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
        function actosinicioappActivo(id) {
            var index = storeSASINO.findExact('id', id);
            if (index > -1) {
                var record = storeSASINO.getAt(index);
                return record.get('nombre');
            }
        }

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
        function operativosUnidades(id) {
            var index = storeOPREA.findExact('id', id);
            if (index > -1) {
                var record = storeOPREA.getAt(index);
                return record.get('nombre');
            } else {
                return ''
            }

        }

        storeOPTIPO = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=tiposoperativos'
        });
        var comboOPTIPO = new Ext.form.ComboBox({
            id: 'comboOPTIPO',
            store: storeOPTIPO,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });
        function operativosTipo(id) {
            var index = storeOPTIPO.findExact('id', id);
            if (index > -1) {
                var record = storeOPTIPO.getAt(index);
                return record.get('nombre');
            }
        }

        storeOPESTA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=operativosestados'
        });
        var comboOPESTA = new Ext.form.ComboBox({
            id: 'comboOPESTA',
            store: storeOPESTA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        //fin combos


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
                url: urlActosInicioapp + 'uploadimagen.php',
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

        //ActosInicioapp tab
        var proxyActosInicioapp = new Ext.data.HttpProxy({
            api: {
                create: urlActosInicioapp + "crudActosInicioapp.php?operation=insert",
                read: urlActosInicioapp + "crudActosInicioapp.php?operation=select",
                update: urlActosInicioapp + "crudActosInicioapp.php?operation=upda",
                destroy: urlActosInicioapp + "crudActosInicioapp.php?operation=delete"
            }
        });
        var readerActosInicioapp = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: false},
                {name: 'cedula', allowBlank: false},
                {name: 'direccionDomicilio', allowBlank: false},
                {name: 'direccionTrabajo', allowBlank: false},
                {name: 'email', allowBlank: false},
                {name: 'telefonoCelular', allowBlank: false},
                {name: 'telefonoFijo', allowBlank: false},
                {name: 'hechosInfraccion', allowBlank: false},
                {name: 'direccionInfraccion', allowBlank: false},
                {name: 'fechaInfraccion', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'horaInfraccion', allowBlank: false},
                {name: 'aislamiento_obligatorio', allowBlank: false},
                {name: 'conductorSinMascarilla', allowBlank: false},
                {name: 'foto', allowBlank: false},
                {name: 'foto1', allowBlank: false},
                {name: 'infraccionSinMascarilla', allowBlank: false},
                {name: 'infraccionSinMascarilla2', allowBlank: false},
                {name: 'infraccioncedula', allowBlank: false},
                {name: 'infracciondistancia', allowBlank: false},
                {name: 'nombres', allowBlank: false},
                {name: 'sancion_25_SMU', allowBlank: false},
                {name: 'sancion_50_SMU', allowBlank: false},
                {name: 'sancion_tres_salarios', allowBlank: false},
                {name: 'sancion_un_salario_medio', allowBlank: false},
            ]
        });
        var writerActosInicioapp = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        var storeActosInicioapp = new Ext.data.Store({
            id: "storeActosInicioapp",
            proxy: proxyActosInicioapp,
            reader: readerActosInicioapp,
            writer: writerActosInicioapp,
            autoSave: true
        });
        storeActosInicioapp.load();
        limiteactosinicioapp = 50;
        this.storeActosInicioapp = storeActosInicioapp;
        this.gridActosInicioapp = new Ext.grid.EditorGridPanel({
            height: 200,
            widht: '100%',
            store: storeActosInicioapp, columns: [
                new Ext.grid.RowNumberer({width: 30})
                , {header: 'id', dataIndex: 'id', sortable: true, width: 50, hidden: true, scope: this}
                , {header: 'Cédula', dataIndex: 'cedula', sortable: true, width: 80, scope: this}
                , {header: 'Nombres', dataIndex: 'nombres', sortable: true, width: 250, scope: this}
                , {header: 'Dirección de Domicilio', dataIndex: 'direccionDomicilio', sortable: true, width: 200, scope: this}
                , {header: 'Dirección de Trabajo', dataIndex: 'direccionTrabajo', sortable: true, width: 200, scope: this}
                , {header: 'Email', dataIndex: 'email', sortable: true, width: 150, scope: this}
                , {header: 'Celular', dataIndex: 'telefonoCelular', sortable: true, width: 80, scope: this}
                , {header: 'Teléfono', dataIndex: 'telefonoFijo', sortable: true, width: 70, scope: this}
                , {header: 'Hechos Infracción', dataIndex: 'hechosInfraccion', sortable: true, width: 200, scope: this}
                , {header: 'Dirección de Infracción', dataIndex: 'direccionInfraccion', sortable: true, width: 200, scope: this}
                , {header: 'Fecha Infracción', dataIndex: 'fechaInfraccion', sortable: true, width: 100, renderer: formatDate}
                , {header: 'Hora Infracción', dataIndex: 'horaInfraccion', sortable: true, width: 90, scope: this}
                , {header: 'Aislamiento Obligatorio', dataIndex: 'aislamiento_obligatorio', sortable: true, width: 130, scope: this}
                , {header: 'Conductor sin Mascarilla', dataIndex: 'conductorSinMascarilla', sortable: true, width: 140, scope: this}
                // , {header: 'Foto', dataIndex: 'foto', sortable: true, width: 50, scope: this}
                // , {header: 'Foto 1', dataIndex: 'foto1', sortable: true, width: 20, scope: this}
                , {header: 'Sin Mascarilla Espacios Públicos', dataIndex: 'infraccionSinMascarilla', sortable: true, width: 180, scope: this}
                , {header: 'Sin Mascarilla Aire Libre', dataIndex: 'infraccionSinMascarilla2', sortable: true, width: 130, scope: this}
                , {header: 'Sin Cédula', dataIndex: 'infraccioncedula', sortable: true, width: 80, scope: this}
                , {header: 'Sin Distancia', dataIndex: 'infracciondistancia', sortable: true, width: 80, scope: this}
                , {header: 'Sanción 25 SMU', dataIndex: 'sancion_25_SMU', sortable: true, width: 100, scope: this}
                , {header: 'Sanción 50 SMU', dataIndex: 'sancion_50_SMU', sortable: true, width: 100, scope: this}
                , {header: 'Sanción tres salarios', dataIndex: 'sancion_tres_salarios', sortable: true, width: 120, scope: this}
                , {header: 'Sanción un salario medio', dataIndex: 'sancion_un_salario_medio', sortable: true, width: 150, scope: this}

            ],
            viewConfig: {
                forceFit: false,
                getRowClass: function (record, index) {
                    //if (record.get('prosesado') == 'false') return 'gold';
                    return 'gold';
                }
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: function (sm, row, rec) {
                        this.record = rec;
                        this.idDenunciasRecuperada = rec.id;
                        cargaDetalle(rec.id);

                        if (grabarDenuncia) {
                        }
                    }
                }
            }),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: limiteactosinicioapp,
                store: storeActosInicioapp,
                displayInfo: true,
                displayMsg: 'Mostrando actos inicio {0} - {1} of {2}',
                emptyMsg: "No existen actos inicio que mostrar"
            }),
        });
        //fin ActosInicioapp tab

        //Actos Inicio Reporte
        var proxyReporteActosInicioapp = new Ext.data.HttpProxy({
            api: {
                create: urlActosInicioapp + "crudActosInicioReporteapp.php?operation=insertRep",
                read: urlActosInicioapp + "crudActosInicioReporteapp.php?operation=selectRep",
                update: urlActosInicioapp + "crudActosInicioReporteapp.php?operation=updateRep",
                destroy: urlActosInicioapp + "crudActosInicioReporteapp.php?operation=deleteRep"
            }
        });
        var readerReporteActosInicioapp = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: false},
                {name: 'cedula', allowBlank: false},
                {name: 'direccionDomicilio', allowBlank: false},
                {name: 'direccionTrabajo', allowBlank: false},
                {name: 'email', allowBlank: false},
                {name: 'telefonoCelular', allowBlank: false},
                {name: 'telefonoFijo', allowBlank: false},
                {name: 'hechosInfraccion', allowBlank: false},
                {name: 'direccionInfraccion', allowBlank: false},
                {name: 'fechaInfraccion', type: 'date', dateFormat: 'c', allowBlank: true},
                {name: 'horaInfraccion', allowBlank: false},
                {name: 'aislamiento_obligatorio', allowBlank: false},
                {name: 'conductorSinMascarilla', allowBlank: false},
                {name: 'foto', allowBlank: false},
                {name: 'foto1', allowBlank: false},
                {name: 'infraccionSinMascarilla', allowBlank: false},
                {name: 'infraccionSinMascarilla2', allowBlank: false},
                {name: 'infraccioncedula', allowBlank: false},
                {name: 'infracciondistancia', allowBlank: false},
                {name: 'nombres', allowBlank: false},
                {name: 'sancion_25_SMU', allowBlank: false},
                {name: 'sancion_50_SMU', allowBlank: false},
                {name: 'sancion_tres_salarios', allowBlank: false},
                {name: 'sancion_un_salario_medio', allowBlank: false},
            ]
        });
        var writerReporteActosInicioapp = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        var storeReporteActosInicioapp = new Ext.data.Store({
            id: "storeReporteActosInicioapp",
            proxy: proxyReporteActosInicioapp,
            reader: readerReporteActosInicioapp,
            writer: writerReporteActosInicioapp,
            autoSave: true
        });
        //storeReporteActosInicioapp.load();
        //limitereporteactosinicioapp = 50;
        this.storeReporteActosInicioapp = storeReporteActosInicioapp;
        //storeReporteActosInicioapp = this.storeReporteActosInicioapp;
        this.gridReporteActosInicioapp = new Ext.grid.EditorGridPanel({
            height: desktop.getWinHeight() - 268,
            autoScroll: true,
            //widht: '100%',
            store: this.storeReporteActosInicioapp,
            columns: [
                new Ext.grid.RowNumberer()
                , {header: 'id', dataIndex: 'id', sortable: true, width: 50, hidden: true, scope: this}
                , {header: 'Cédula', dataIndex: 'cedula', sortable: true, width: 80, scope: this}
                , {header: 'Nombres', dataIndex: 'nombres', sortable: true, width: 250, scope: this}
                , {header: 'Dirección de Domicilio', dataIndex: 'direccionDomicilio', sortable: true, width: 200, scope: this}
                , {header: 'Dirección de Trabajo', dataIndex: 'direccionTrabajo', sortable: true, width: 200, scope: this}
                , {header: 'Email', dataIndex: 'email', sortable: true, width: 150, scope: this}
                , {header: 'Celular', dataIndex: 'telefonoCelular', sortable: true, width: 80, scope: this}
                , {header: 'Teléfono', dataIndex: 'telefonoFijo', sortable: true, width: 70, scope: this}
                , {header: 'Hechos Infracción', dataIndex: 'hechosInfraccion', sortable: true, width: 200, scope: this}
                , {header: 'Dirección de Infracción', dataIndex: 'direccionInfraccion', sortable: true, width: 200, scope: this}
                , {header: 'Fecha Infracción', dataIndex: 'fechaInfraccion', sortable: true, width: 100, renderer: formatDate}
                , {header: 'Hora Infracción', dataIndex: 'horaInfraccion', sortable: true, width: 90, scope: this}
                , {header: 'Aislamiento Obligatorio', dataIndex: 'aislamiento_obligatorio', sortable: true, width: 130, scope: this}
                , {header: 'Conductor sin Mascarilla', dataIndex: 'conductorSinMascarilla', sortable: true, width: 140, scope: this}
                , {header: 'Sin Mascarilla Espacios Públicos', dataIndex: 'infraccionSinMascarilla', sortable: true, width: 180, scope: this}
                , {header: 'Sin Mascarilla Aire Libre', dataIndex: 'infraccionSinMascarilla2', sortable: true, width: 130, scope: this}
                , {header: 'Sin Cédula', dataIndex: 'infraccioncedula', sortable: true, width: 80, scope: this}
                , {header: 'Sin Distancia', dataIndex: 'infracciondistancia', sortable: true, width: 80, scope: this}
                , {header: 'Sanción 25 SMU', dataIndex: 'sancion_25_SMU', sortable: true, width: 100, scope: this}
                , {header: 'Sanción 50 SMU', dataIndex: 'sancion_50_SMU', sortable: true, width: 100, scope: this}
                , {header: 'Sanción tres salarios', dataIndex: 'sancion_tres_salarios', sortable: true, width: 120, scope: this}
                , {header: 'Sanción un salario medio', dataIndex: 'sancion_un_salario_medio', sortable: true, width: 150, scope: this}

            ],
            viewConfig: {
                forceFit: false,
                getRowClass: function (record, index) {
                    return 'gold';
                }
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
            }),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: limiteactosinicioapp,
                store: this.storeReporteActosInicioapp,
                displayInfo: true,
                displayMsg: 'Mostrando actos inicio {0} - {1} of {2}',
                emptyMsg: "No existen actos inicio que mostrar"
            }),
        });
        //Fin Actos Inicio Reporte

        //var desktop = this.app.getDesktop();
        var win = desktop.getWindow('layout-win');

        if (!win) {

            var checkHandler = function (item, checked) {
                if (checked) {
                    var store = this.storeActosInicioapp;
                    store.baseParams.filterField = item.key;
                    searchFieldBtn.setText(item.text);
                }
            };

            var searchFieldBtn = new Ext.Button({
                menu: new Ext.menu.Menu({
                    items: [
                        {
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
                            key: 'nombres',
                            scope: this,
                            text: 'Nombres'
                        }
                    ]
                })
                , text: 'Cédula'
            });

            this.formActosInicioappDetalle = new Ext.FormPanel({
                id: 'formActosInicioappDetalle',
                cls: 'no-border',
                items: [
                    {
                        region: 'north',
                        height: 200,
                        id: 'formcabeceradenuncias',
                        items: this.gridActosInicioapp
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
                                text: 'Migrar',
                                scope: this,
                                handler: this.migrar,
                                iconCls: 'save-icon',
                                disabled: false,
                                id: 'tbMigrar',
                                formBind: true
                            }
                        ],
                        items: [
                            {
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
                                            {
                                                xtype: 'displayfield',
                                                hideLabel: true,
                                                value: '1. DATOS PERSONALES',
                                                cls: 'negrilla',
                                                anchor: '95%'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Cédula',
                                                name: 'cedula'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Nombres',
                                                name: 'nombres',
                                            }
                                            ,{
                                                xtype: 'displayfield',
                                                fieldLabel: 'Dirección Domicilio',
                                                name: 'direccionDomicilio',
                                            }
                                            ,{
                                                xtype: 'displayfield',
                                                fieldLabel: 'Dirección Trabajo',
                                                name: 'direccionTrabajo',
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Email',
                                                name: 'email'}
                                            ,{
                                                xtype: 'displayfield',
                                                fieldLabel: 'Teléfono',
                                                name: 'telefonoFijo'
                                            }
                                            ,{
                                                xtype: 'displayfield',
                                                fieldLabel: 'Celular',
                                                name: 'telefonoCelular'
                                            }
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
                                                value: '2. DATOS DE LA INFRACCIÓN',
                                                cls: 'negrilla',
                                                anchor: '95%'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Hechos',
                                                name: 'hechosInfraccion'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Dirección',
                                                name: 'direccionInfraccion'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Fecha',
                                                name: 'fechaInfraccion'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Hora',
                                                name: 'horaInfraccion'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Conductor Sin Mascarilla',
                                                name: 'conductorSinMascarilla'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Sin Mascarilla Espacios Públicos',
                                                name: 'infraccionSinMascarilla'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Sin Mascarilla Aire Libre',
                                                name: 'infraccionSinMascarilla2'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Sin Cédula',
                                                name: 'infraccioncedula'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Sin Distancia',
                                                name: 'infracciondistancia'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Sanción 25 SMU',
                                                name: 'sancion_25_SMU'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Sanción 50 SMU',
                                                name: 'sancion_50_SMU'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Sanción tres salarios',
                                                name: 'sancion_tres_salarios'
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Sanción un salario y medio',
                                                name: 'sancion_un_salario_medio'
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
                                                fieldLabel: 'Foto',
                                                name: 'foto',
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Foto 1',
                                                name: 'foto1',
                                            }
                                            , {
                                                xtype: 'displayfield',
                                                fieldLabel: 'Foto 2',
                                                name: 'foto2',
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });

            this.formConsultaActosInicio = new Ext.FormPanel({
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
                            }
                        ]
                    },
                    {
                        columnWidth: 1 / 3,
                        layout: 'form',
                        items: [
                            {
                                xtype: 'combo',
                                fieldLabel: 'Responsable',
                                id: 'busqueda_usuario',
                                name: 'busqueda_usuario',
                                hiddenName: 'busqueda_usuario',

                                anchor: '95%',
                                store: storePRD,
                                valueField: 'email_address',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
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
                            }
                        ]
                    },
                    {
                        columnWidth: 1 / 3,
                        layout: 'form',
                        items: [
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Palabra clave',
                                id: 'busqueda_hechos',
                                name: 'busqueda_hechos',
                                anchor: '95%'
                            }
                           ]
                    }
                ]
            });

            win = desktop.createWindow({
                id: 'grid-win-actosinicioapp',
                title: 'Actos de Inicio App',
                width: winWidth,
                height: winHeight,
                iconCls: 'actosinicioapp-icon',
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
                          title: 'Actos de Inicio',
                          closable: true,
                          tbar: [
                                  {
                                    id: 'recargardatos',
                                    iconCls: 'reload-icon',
                                    handler: this.requestActosInicioappData,
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
                                        , store: this.storeActosInicioapp
                                  })
                                ],
                                items: this.formActosInicioappDetalle
                        },
                        {
                            title: 'Reportes',
                            closable: true,
                            layout: 'border',
                            //disabled: this.app.isAllowedTo('accesosOperativos', this.id) ? false : true,
                            tbar: [
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridActosInicioReporte,
                                    scope: this,
                                    text: 'Buscar'
                                },
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridActosInicioReporteReset,
                                    scope: this,
                                    text: 'Borrar formulario'

                                },
                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarActosInicioReporte,
                                    scope: this,
                                    text: 'Exportar listado',
                                    tooltip: 'Se genera archivo Excel con la información solicitada'
                                },
                            ],
                            items: [
                                {
                                    region: 'north',
                                    height: 125,
                                    minSize: 100,
                                    maxSize: 170,
                                    closable: true,
                                    autoScroll: false,
                                    items: this.formConsultaActosInicio
                                },
                                {
                                    region: 'center',
                                    split: true,
                                    autoScroll: true,
                                   // height: 270,
                                    minSize: 100,
                                    maxSize: 150,
                                    //margins: '0 0 0 0',
                                    items: this.gridReporteActosInicioapp
                                }
                            ]
                        }
                    ]
                })
            });
        }
        win.show();
        function cargaDetalle(id) {
            forma = Ext.getCmp('formActosInicioappDetalle');
            forma.getForm().load({
                waitMsg: 'Recuperando información',
                url: urlActosInicioapp + 'crudActosInicioapp.php?operation=selectForm',
                params: {
                    id: id
                },
                success: function (response, opts) {
                    //mensaje = Ext.getCmp('textDenunciasAnteriores');
                    //mensaje.setText('Denuncias anteriores: ' + (response.findField('totaldenuncias').getValue() - 1))
                }
            });
        };
        function bloquearLectura(forma, activar) {
        };
    },
    migrar: function () {
        store = this.storeActosInicioapp;
        var urlActosInicioapp = this.urlActosInicioapp;
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Desea migrar.<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var myForm = Ext.getCmp('formActosInicioappDetalle').getForm();
                    myForm.submit({
                        //url: urlActosInicioapp + 'crudActosInicioapp.php?operation=migrar',
                        url: '/procesos-amc/actualizacion/cronActoInicio.php',
                        method: 'POST',
                        waitMsg: 'Saving data',
                        success: function (form, action) {
                            //se actualiza tabla en la web
                            //var dataReceived = JSON.parse(action.response.responseText);
                            myForm.submit({
                                //url: urlActosInicioapp + 'migracionActoInicio.php?operation=migrar',
                                url: '/procesos-amc/actualizacion/cronActoInicio.php',
                                method: 'POST',
                                waitMsg: 'Saving data',
                                params: {
                                    //codigo_tramite: dataReceived.data
                                },
                                success: function (form, action) {
                                    //Ext.getCmp('tb_negardenuncias').setDisabled(true);
                                    //Ext.getCmp('tb_aprobardenuncias').setDisabled(true);
                                    store.load();
                                },
                                failure: function (form, action) {
                                    var errorJson = JSON.parse(action.response.responseText);
                                    Ext.Msg.show({
                                        title: 'Error...'
                                        , msg: errorJson.msg
                                        , modal: true
                                        , icon: Ext.Msg.ERROR
                                        , buttons: Ext.Msg.OK
                                    });
                                }
                            });
                        },
                        failure: function (form, action) {
                            var errorJson = JSON.parse(action.response.responseText);
                            Ext.Msg.show({
                                title: 'Error...'
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
    requestActosInicioappData: function () {
        this.storeActosInicioapp.load();
    },
    requestActosInicioappDataExport: function () {
        Ext.Msg.show({
            title: 'Advertencia',
            msg: 'Descargue el archivo xls  .<br>¿Desea continuar?',
            scope: this,
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    window.location.href = 'modules/desktop/actosinicioapp/server/ActosInicioapp.php';
                }
            }
        });
    },
    requestGridActosInicioReporte: function () {
        this.storeReporteActosInicioapp.baseParams = this.formConsultaActosInicio.getForm().getValues();
        var accesosAdministradorOpe = this.app.isAllowedTo('accesosAdministradorOpe', this.id);
        var accesosOperativos = this.app.isAllowedTo('accesosOperativos', this.id);
        var accesosAdministradorIns = this.app.isAllowedTo('accesosAdministradorIns', this.id);
        this.storeReporteActosInicioapp.baseParams.accesosAdministradorOpe = accesosAdministradorOpe;
        this.storeReporteActosInicioapp.baseParams.accesosOperativos = accesosOperativos;
        this.storeReporteActosInicioapp.baseParams.accesosAdministradorIns = accesosAdministradorIns;
        this.storeReporteActosInicioapp.baseParams.formularioBusqueda = 1;
        this.storeReporteActosInicioapp.load();
    },
    requestGridActosInicioReporteReset: function () {
        this.formConsultaActosInicio.getForm().reset();
    },
    botonExportarActosInicioReporte: function () {
        var rows = this.storeReporteActosInicioapp.getCount()
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
                    valueParams = JSON.stringify(this.formConsultaActosInicio.getForm().getValues());

                    generaAcciones = (Ext.getCmp('checkDetalleAcciones').getValue());
                    generaActas = (Ext.getCmp('checkDetalleActas').getValue());
                    generaRetiros = (Ext.getCmp('checkDetalleRecibidos').getValue());
                    generaTotalesPersonal = (Ext.getCmp('checkTotalesPersonal').getValue());

                    window.location.href = 'modules/desktop/operativos/server/descargaReporteOperativos.inc.php?param=' + valueParams + '&acciones=' + generaAcciones + '&totalespersonal=' + generaTotalesPersonal + '&actas=' + generaActas + '&retiros=' + generaRetiros;
                }
            }
        });
    },
});
