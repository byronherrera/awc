selectProceso = 0;
QoDesk.RecordatoriosWindow = Ext.extend(Ext.app.Module, {
    id: 'SegPOA',
    type: 'desktop/recordatorios',

    init: function () {
        this.launcher = {
            text: 'SegPOA',
            iconCls: 'recordatorios-icon',
            handler: this.createWindow,
            scope: this
        }
    },
    createWindow: function () {
        //variables de acceso
        var accesosPlanificacion = this.app.isAllowedTo('accesosPlanificacion', this.id);
        var accesosConsulta = this.app.isAllowedTo('accesosConsulta', this.id);
        var accesosFuncionario = this.app.isAllowedTo('accesosFuncionario', this.id);
        var acceso = false;
        acceso = (accesosPlanificacion ||  accesosFuncionario) ? true : false

        var desktop = this.app.getDesktop();
        var AppMsg = new Ext.AppMsg({});
        var win = desktop.getWindow('grid-win-recordatorios');
        var urlRecordatorios = "modules/desktop/recordatorios/server/";
        var textField = new Ext.form.TextField({allowBlank: false});

        limiterecordatorios = 100;

        function formatDate(value) {
            return value ? value.dateFormat('Y-m-d') : '';
        }

        var textField2 = new Ext.form.TextField({allowBlank: false});
        var numberField = new Ext.ux.form.SpinnerField({
            minValue: 0,
            maxValue: 1000
        });

        var numberFieldDecimal = new Ext.ux.form.SpinnerField({
            minValue: 0,
            maxValue: 1,
            value: .00,
            stepValue: .01
        });

        //inicio combo tipo contratacion
        storeSINO = new Ext.data.JsonStore({
            root: 'users',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                users: [
                    {"id": '1', "nombre": "Si"},
                    {"id": '0', "nombre": "Si"}
                ]
            }
        });
        //si no

        //inicio combo tipo MEDIDA operativo
        storeTIPOACTIVPOA = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=tiposActivPoa'
        });

        var comboTIPOACTIVPOA = new Ext.form.ComboBox({
            id: 'comboTIPOACTIVPOA',
            store: storeTIPOACTIVPOA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function tipoActividadPoa(id) {
            var index = storeTIPOACTIVPOA.findExact('id', id);
            if (index > -1) {
                var record = storeTIPOACTIVPOA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo nivel MEDIDA OPERATIVO
        //inicio combo tipo fase
        storeTIPOACTIVPOAFASE = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=tiposActivPoaFase'
        });

        var comboTIPOACTIVPOAFASE = new Ext.form.ComboBox({
            id: 'comboTIPOACTIVPOAFASE',
            store: storeTIPOACTIVPOAFASE,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function tipoActividadPoaFase(id) {
            var index = storeTIPOACTIVPOAFASE.findExact('id', id);
            if (index > -1) {
                var record = storeTIPOACTIVPOAFASE.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo nivel fase

        //inicio combo tipo contratacion
        storeTIPOCONTRATA = new Ext.data.JsonStore({
            root: 'users',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                users: [
                    {"id": 'Ínfima cuantía', "nombre": "Ínfima cuantía"},
                    {"id": 'Consultoría', "nombre": "Consultoría"},
                    {"id": 'Procedimiento especial', "nombre": "Procedimiento especial"},
                    {"id": 'Caja chica', "nombre": "Caja chica"},
                    {"id": 'Contratación directa', "nombre": "Contratación directa"},
                    {"id": 'Servicios básicos', "nombre": "Servicios básicos"},
                    {"id": 'Menor cuantía', "nombre": "Menor cuantía"},
                    {"id": 'Catálogo electrónico', "nombre": "Catálogo electrónico"},
                    {"id": 'Subasta inversa', "nombre": "Subasta inversa"},
                    {"id": 'Régimen especial', "nombre": "Régimen especial"}
                ]
            }
        });

        var comboTIPOCONTRATA = new Ext.form.ComboBox({
            id: 'comboTIPOCONTRATA',
            store: storeTIPOCONTRATA,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function planificacionTipoContratacio(id) {
            var index = storeTIPOCONTRATA.findExact('id', id);
            if (index > -1) {
                var record = storeTIPOCONTRATA.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo tipo contratacion

        //inicio combo estado
        storeTIPOESTADO = new Ext.data.JsonStore({
            root: 'users',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                users: [
                    {"id": 'En propuesta', "nombre": "En propuesta"}
                    , {"id": 'En ejecución', "nombre": "En ejecución"}
                    , {"id": 'Dado de baja', "nombre": "Dado de baja"}
                    , {"id": 'Detenido', "nombre": "Detenido"}
                    , {"id": 'Finalizado', "nombre": "Finalizado"}
                ]
            }
        });

        var comboTIPOESTADO = new Ext.form.ComboBox({
            id: 'comboTIPOESTADO',
            store: storeTIPOESTADO,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function planificacionTipoEstado(id) {
            var index = storeTIPOESTADO.findExact('id', id);
            if (index > -1) {
                var record = storeTIPOESTADO.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo estado


        //inicio combo semaforo
        storeSEMAFORO = new Ext.data.JsonStore({
            root: 'users',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                users: [
                    {"id": 'Verde', "nombre": "<div class='Verde'>Verde</div>"},
                    {"id": 'Amarillo', "nombre": "<div class='Amarillo'>Amarillo</div>"},
                    {"id": 'Rojo', "nombre": "<div class='Rojo'>Rojo</div>"},
                    {"id": 'Gris', "nombre": "<div class='Gris'>Gris</div>"}

                ]
            }
        });

        var comboSEMAFORO = new Ext.form.ComboBox({
            id: 'comboSEMAFORO',
            store: storeSEMAFORO,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function planificacionSemaforo(id) {
            var index = storeSEMAFORO.findExact('id', id);
            if (index > -1) {
                var record = storeSEMAFORO.getAt(index);
                return record.get("nombre");
            }
        }

        //fin combo semaforo

        //inicio combo fase
        storeFASE = new Ext.data.JsonStore({
            root: 'users',
            fields: ['id', 'nombre'],
            autoLoad: true,
            data: {
                users: [
                    {"id": 'Fase preparatoria', "nombre": "Fase preparatoria"},
                    {"id": 'Fase precontractual', "nombre": "Fase precontractual"},
                    {"id": 'Fase contractual', "nombre": "Fase contractual"},
                    {"id": 'Pago', "nombre": "Pago"}
                ]
            }
        });

        var comboFASE = new Ext.form.ComboBox({
            id: 'comboFASE',
            store: storeFASE,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function planificacionFase(id) {
            var index = storeFASE.findExact('id', id);
            if (index > -1) {
                var record = storeFASE.getAt(index);
                return record.get('nombre');
            }
        }

        var comboFASE2 = new Ext.form.ComboBox({
            id: 'comboFASE',
            store: storeFASE,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local'
        });

        function planificacionFase2(id) {
            var index = storeFASE.findExact('id', id);
            if (index > -1) {
                var record = storeFASE.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo fase

        //inicio combo persona recepta
        storeGRC = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personaloperativos',
            baseParams: {
                todos: 'true',
                acceso: acceso
            }
        });
        var comboGRC = new Ext.form.ComboBox({
            id: 'comboGRC',
            store: storeGRC,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            //forceSelection: true,
            allowBlank: true
        });
        var comboGRC2 = new Ext.form.ComboBox({
            id: 'comboGRC2',
            store: storeGRC,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            //forceSelection: true,
            allowBlank: true
        });

        function personaRecordatorio(id) {
            var index = storeGRC.findExact('id', id);
            if (index > -1) {
                var record = storeGRC.getAt(index);
                return record.get('nombre');
            }
        }

        storeGRC2 = new Ext.data.JsonStore({
            root: 'data',
            fields: ['id', 'nombre'],
            autoLoad: true,
            url: 'modules/common/combos/combos.php?tipo=personaloperativos',
            baseParams: {
            }

        });
        var comboGRC2 = new Ext.form.ComboBox({
            id: 'comboGRC2',
            store: storeGRC2,
            valueField: 'id',
            displayField: 'nombre',
            triggerAction: 'all',
            mode: 'local',
            //forceSelection: true,
            allowBlank: true
        });

        function personaReceptaRecordatorio(id) {
            //var index = storeGRC2.findExact('id', id);
            var index = storeGRC2.findExact('id', id);
            if (index > -1) {
                var record = storeGRC2.getAt(index);
                return record.get('nombre');
            }
        }

        //fin combo persona recepta la operativos GRC

        // inicio ventana recordatorios
        var proxyRecordatorios = new Ext.data.HttpProxy({
            api: {
                create: urlRecordatorios + "crudRecordatorios.php?operation=insert",
                read: urlRecordatorios + "crudRecordatorios.php?operation=select",
                update: urlRecordatorios + "crudRecordatorios.php?operation=update",
                destroy: urlRecordatorios + "crudRecordatorios.php?operation=delete"
            },
            listeners: {
                write: function (proxy, action, result, res, rs) {
                    if (typeof res.message !== 'undefined') {
                        if (res.message != '') {
                            AppMsg.setAlert(AppMsg.STATUS_NOTICE, res.message);
                        }
                    }
                }
            }
        });
        var readerRecordatorios = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: true}
                , {name: 'id_responsable', allowBlank: false}
                , {name: 'nombres', allowBlank: true}
                , {name: 'apellidos', allowBlank: true}
                , {name: 'tema', allowBlank: false}
                , {name: 'fecha_inicio', type: 'date', dateFormat: 'c', allowBlank: true}
                , {name: 'fecha_entrega', type: 'date', dateFormat: 'c', allowBlank: true}
                , {name: 'estado', allowBlank: true}
                , {name: 'idingreso', allowBlank: true}
                , {name: 'detalle_avance', allowBlank: true}
                , {name: 'tipocontratacion', allowBlank: true}
                , {name: 'semaforo', allowBlank: true}
                , {name: 'fase', allowBlank: true}
                , {name: 'valor', allowBlank: true}
                , {name: 'porcentaje', allowBlank: true}
                , {name: 'observaciones', allowBlank: true}

            ]
        });
        var writerRecordatorios = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        this.storeRecordatorios = new Ext.data.Store({
            id: "id",
            proxy: proxyRecordatorios,
            reader: readerRecordatorios,
            writer: writerRecordatorios,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            baseParams: {},
            listeners: {
                exception: function (proxy, response, operation) {
                    if (operation === 'destroy') {
                        Ext.Msg.show({
                            title: 'Error'
                            , msg: 'No se puede borrar este proceso pues estan ingresados actividades'
                            , modal: true
                            , icon: Ext.Msg.ERROR
                            , buttons: Ext.Msg.OK
                        });
                    }
                }
            }
        });

        storeRecordatorios = this.storeRecordatorios;
        storeRecordatorios.baseParams = {
            limit: limiterecordatorios
        };
// se envian variables de perfil
        storeRecordatorios.baseParams.accesosPlanificacion = accesosPlanificacion;
        storeRecordatorios.baseParams.accesosConsulta = accesosConsulta;
        storeRecordatorios.baseParams.accesosFuncionario = accesosFuncionario;

        this.gridRecordatorios = new Ext.grid.EditorGridPanel({
            height: 220,
            store: this.storeRecordatorios,
            clicksToEdit: 1,
            columns: [
                new Ext.grid.RowNumberer(),
                {header: 'id', dataIndex: 'id', sortable: true, width: 30, hidden: true},
                {
                    header: '',
                    dataIndex: 'semaforo',
                    width: 24,
                    renderer: function (value, metaData, record) {
                        return '<span class="circleBase ' + value + '"></span>';
                    }
                },
                {
                    header: 'Responsable', dataIndex: 'id_responsable', sortable: true, width: 220, editor: comboGRC,
                    renderer: personaRecordatorio
                },

                //  {header: 'nombres', dataIndex: 'nombres', sortable: true, width: 125},
                //  {header: 'apellidos', dataIndex: 'apellidos', sortable: true, width: 125},
                {
                    header: 'Producto / servicio',
                    dataIndex: 'tema',
                    sortable: true,
                    width: 300,
                    editor: textField
                },
                {
                    header: 'Fecha Inicio', dataIndex: 'fecha_inicio', sortable: true, width: 80, renderer: formatDate,
                    editor: new Ext.form.DateField({
                        format: 'Y-m-d'
                    })
                },
                {
                    header: 'Fecha Entrega',
                    dataIndex: 'fecha_entrega',
                    sortable: true,
                    width: 80,
                    renderer: formatDate,
                    editor: new Ext.form.DateField({
                        format: 'Y-m-d'
                    })
                },
                {
                    header: 'Estado',
                    dataIndex: 'estado',
                    sortable: true,
                    width: 125,
                    renderer: planificacionTipoEstado,
                    editor: comboTIPOESTADO,
                },
                {
                    header: 'Encargado Ingreso', dataIndex: 'idingreso', sortable: true, width: 125, hidden: true,
                    renderer: personaReceptaRecordatorio
                }
                , {
                    header: 'Detalle avance',
                    dataIndex: 'detalle_avance',
                    sortable: true,
                    width: 150,
                    editor: textField
                }
                , {
                    header: 'Tipo contratación',
                    dataIndex: 'tipocontratacion',
                    sortable: true,
                    width: 125,
                    editor: comboTIPOCONTRATA,
                    renderer: planificacionTipoContratacio
                }
                , {
                    header: 'Semáforo',
                    dataIndex: 'semaforo',
                    sortable: true,
                    align: 'center',
                    width: 70,
                    editor: comboSEMAFORO,
                    renderer: planificacionSemaforo
                }
                , {
                    header: 'Valor',
                    dataIndex: 'valor',
                    sortable: true,
                    width: 100,
                    align: 'right',
                    renderer: 'usMoney',
                    editor: new Ext.form.NumberField({
                        allowBlank: false,
                        allowNegative: false,
                        maxValue: 100000000
                    })
                }

                , {
                    header: 'Fase',
                    dataIndex: 'fase',
                    sortable: true,
                    width: 120,
                    editor: comboFASE,
                    renderer: planificacionFase
                }
                , {
                    header: 'Avance físico',
                    dataIndex: 'porcentaje',
                    sortable: true,
                    align: 'center',
                    width: 80,
                    editor: new Ext.form.NumberField({
                        allowBlank: false,
                        allowNegative: false,
                        maxValue: 1,
                        minValue: 0
                    }),
                    renderer: function (rate) {
                        return Ext.util.Format.number(rate * 100, '0 %');
                    }
                },
                {
                    header: 'Observaciones',
                    dataIndex: 'observaciones',
                    sortable: true,
                    width: 160,
                    editor: textField
                },
            ],
            viewConfig: {
                forceFit: false
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,


                listeners: {
                    rowselect: function (sm, row, rec) {
                        //fecha_inicio_planificacion = rec.get('fecha_inicio_planificacion')
                        //fecha_fin_planificacion = rec.get('fecha_fin_planificacion');

                        // recuperamos la informacion de personal asignado a ese operativo
                        selectProceso = rec.id;
                        storeRecordatoriosDetalle.load({params: {id_proceso: rec.id}});
                        Ext.getCmp('cargaAutomaticaSubasta').setDisabled(false);
                        Ext.getCmp('cargaAutomaticaInfima').setDisabled(false);
//                        Ext.getCmp('cargaAutomaticaSubasta').setDisabled(acceso ? false : true);
//                        Ext.getCmp('cargaAutomaticaInversa').setDisabled(acceso ? false : true);

                        // para el caso que el operativo se haya finalizado se bloquea ya el borrar o editar
                        /*   if (acceso) {
                               if (rec.get("id_estado") != 1) {
                                   Ext.getCmp('informesAccionesTab').setDisabled(acceso ? false : true);
                                   Ext.getCmp('informesOperativosTab').setDisabled(acceso ? false : true);
                                   Ext.getCmp('imagenesOperativosTab').setDisabled(acceso ? false : true);
                                   Ext.getCmp('detalleOperativosTab').setDisabled(acceso ? false : true);
                                   Ext.getCmp('retirosOperativosTab').setDisabled(acceso ? false : true);
                               }
                               else {
                                   Ext.getCmp('informesAccionesTab').setDisabled(true);
                                   Ext.getCmp('informesOperativosTab').setDisabled(true);
                                   Ext.getCmp('imagenesOperativosTab').setDisabled(true);
                                   Ext.getCmp('detalleOperativosTab').setDisabled(true);
                                   Ext.getCmp('retirosOperativosTab').setDisabled(true);
                               }
                               cargaDetalle(rec.id);

                               if ((rec.get("id_estado") == 1) || (rec.get("id_estado") == 4)) {
                                   gridBlockOperativos = false;
                                   Ext.getCmp('savedetalleoperativo').setDisabled(false);

                                   Ext.getCmp('borraroperativo').setDisabled(accesosAdministradorOpe ? false : true);
                                   Ext.getCmp('addoperativos').setDisabled(accesosAdministradorOpe ? false : true);

                                   Ext.getCmp('borraroperativoparticipantes').setDisabled(false);
                                   Ext.getCmp('addoperativoparticipantes').setDisabled(false);
                                   // en caso que se tenga acceso tambien se habilitan o deshabilitan los botones para agregar detalle
                                   // valido si es el caso operativo tipo Permanentes Zonales


                                   if (rec.get("tipo_operativo") == 2) {
                                       Ext.getCmp('borraroperativodetalle').setDisabled(false);
                                       Ext.getCmp('addoperativodetalle').setDisabled(false);
                                       //Ext.getCmp('borraroperativoparticipantes').setDisabled(false);
                                       // Ext.getCmp('addoperativoparticipantes').setDisabled(false);
                                   } else {
                                       Ext.getCmp('borraroperativodetalle').setDisabled(accesosAdministradorOpe ? false : true);
                                       Ext.getCmp('addoperativodetalle').setDisabled(accesosAdministradorOpe ? false : true);
                                   }

                                   Ext.getCmp('borraroperativodetalleacciones').setDisabled(false);
                                   Ext.getCmp('addoperativodetalleacciones').setDisabled(false);

                                   Ext.getCmp('borraroperativodetalleInforme').setDisabled(false);
                                   Ext.getCmp('addoperativodetalleInforme').setDisabled(false);

                                   Ext.getCmp('borraroperativoimagenes').setDisabled(false);

                                   Ext.getCmp('addoperativoimagenes').setDisabled(false);
                                   Ext.getCmp('subirimagen').setDisabled(false);
                                   // solamente para el caso
                               }
                               else {

                                   // caso que el operativo sea tipo 2, 3, 5 ( cumplido, fallido, cancelado
                                   gridBlockOperativos = true;
                                   Ext.getCmp('savedetalleoperativo').setDisabled(true);

                                   Ext.getCmp('borraroperativo').setDisabled(true);
                                   Ext.getCmp('addoperativos').setDisabled(true);

                                   Ext.getCmp('borraroperativodetalle').setDisabled(true);
                                   Ext.getCmp('addoperativodetalle').setDisabled(true);

                                   Ext.getCmp('borraroperativoparticipantes').setDisabled(true);
                                   Ext.getCmp('addoperativoparticipantes').setDisabled(true);

                                   Ext.getCmp('borraroperativodetalleacciones').setDisabled(true);
                                   Ext.getCmp('addoperativodetalleacciones').setDisabled(true);

                                   Ext.getCmp('borraroperativodetalleInforme').setDisabled(true);
                                   Ext.getCmp('addoperativodetalleInforme').setDisabled(true);

                                   Ext.getCmp('borraroperativoimagenes').setDisabled(true);
                                   Ext.getCmp('addoperativoimagenes').setDisabled(true);
                                   Ext.getCmp('subirimagen').setDisabled(true);

                               }


                               //para el caso que se es administrador
                               if (accesosAdministradorOpe) {
                                   Ext.getCmp('savedetalleoperativo').setDisabled(false);
                               }
                           }
                           //para el caso  de los botones
                           if ((rec.get("id_estado") == 2) || (rec.get("id_estado") == 3) || (rec.get("id_estado") == 5)) {
                               Ext.getCmp('tb_repoteOperativos').setDisabled(false);
                           } else {
                               Ext.getCmp('tb_repoteOperativos').setDisabled(true);
                           }
                        */
                    }
                }
            }),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: limiterecordatorios,
                store: storeRecordatorios,
                displayInfo: true,
                displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                emptyMsg: "No existen recordatorios  que mostrar"
            })
        });
        // fin ventana recordatorios

        // inicio ventana recordatoriosDetalle
        var proxyRecordatoriosDetalle = new Ext.data.HttpProxy({
            api: {
                create: urlRecordatorios + "crudRecordatoriosDetalle.php?operation=insert",
                read: urlRecordatorios + "crudRecordatoriosDetalle.php?operation=select",
                update: urlRecordatorios + "crudRecordatoriosDetalle.php?operation=update",
                destroy: urlRecordatorios + "crudRecordatoriosDetalle.php?operation=delete"
            },
            listeners: {
                write: function (proxy, action, result, res, rs) {
                    if (typeof res.message !== 'undefined') {
                        if (res.message != '') {
                            AppMsg.setAlert(AppMsg.STATUS_NOTICE, res.message);
                        }
                    }

                    storeRecordatorios.load();
                }

            }
        });
        var readerRecordatoriosDetalle = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: true}
                , {name: 'id_proceso', allowBlank: false}
                , {name: 'id_actividad', allowBlank: false}
                , {name: 'cumplimiento', allowBlank: false}
                , {name: 'detalle', allowBlank: true}
                , {name: 'fecha_cumplimiento', type: 'date', dateFormat: 'c', allowBlank: true}
                , {name: 'dias', allowBlank: true}
                , {name: 'fecha_compromiso', type: 'date', dateFormat: 'c', allowBlank: false}
                , {name: 'notas', allowBlank: true}
                , {name: 'entregable', allowBlank: true}
                , {name: 'id_asignado', allowBlank: true}
            ]
        });

        var writerRecordatoriosDetalle = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        this.storeRecordatoriosDetalle = new Ext.data.Store({
            id: "storeRecordatoriosDetalle",
            proxy: proxyRecordatoriosDetalle,
            reader: readerRecordatoriosDetalle,
            writer: writerRecordatoriosDetalle,
            autoSave: acceso,
            remoteSort: true,
            baseParams: {}
        });
        storeRecordatoriosDetalle = this.storeRecordatoriosDetalle;


        storeRecordatoriosDetalle.baseParams = {
            limit: limiterecordatorios
        };

        this.gridRecordatoriosDetalle = new Ext.grid.EditorGridPanel({
            id: 'gridRecordatoriosDetalle',
            height: desktop.getWinHeight() - 315,
            store: this.storeRecordatoriosDetalle,
            title: 'Detalle Proceso Planificación - Listado de Actividades',
            clicksToEdit: 1,
            tbar: [
                {
                    text: 'Nuevo',
                    scope: this,
                    handler: this.addrecordatoriosDetalle,
                    iconCls: 'save-icon',
                    id: 'addrecordatoriosDetalle',
                    disabled: !acceso
                },
                '-',
                {
                    text: "Eliminar",
                    handler: this.deleterecordatoriosDetalle,
                    id: 'deleterecordatoriosDetalle',
                    iconCls: 'delete-icon',
                    disabled: !acceso
                },
                '-',
                {
                    iconCls: 'reload-icon',
                    handler: this.requestGridDatarecordatoriosDetalle,
                    scope: this,
                    text: 'Recargar Datos',
                    tooltip: 'Recargar datos'
                }, '-',
                {
                    id: 'cargaAutomaticaSubasta',
                    scope: this,
                    iconCls: 'save-icon',
                    handler: this.cargaAutomatica,
                    text: 'Subasta Inversa',
                    tooltip: 'Agregar todas las actividades automaticamente de subasta inversa',
                    disabled: true
                }, '-',
                {
                    id: 'cargaAutomaticaInfima',
                    scope: this,
                    iconCls: 'save-icon',
                    handler: this.cargaAutomatica,
                    text: 'Infima/Regimen Especial',
                    tooltip: 'Agregar todas las actividades automaticamente de Infima/Régimen especial',
                    disabled: true
                }
            ],
            columns: [
                new Ext.grid.RowNumberer(),
                {header: 'id', dataIndex: 'id', sortable: true, width: 30, hidden: true},
                {header: 'id_proceso', dataIndex: 'id_proceso', sortable: true, width: 30, hidden: true},
                {
                    header: 'Fase', dataIndex: 'id_actividad', sortable: true, width: 120,
                    renderer: tipoActividadPoaFase
                },
                {
                    header: 'Actividad', dataIndex: 'id_actividad', sortable: true, width: 220,
                    editor: comboTIPOACTIVPOA,
                    renderer: tipoActividadPoa
                },
                {
                    header: 'Cumplimiento'
                    , dataIndex: 'cumplimiento'
                    , editor: {
                        xtype: 'checkbox'
                    }
                    , falseText: 'No'
                    , trueText: 'Si'
                    , menuDisabled: true
                    , sortable: true
                    , width: 75
                    , xtype: 'booleancolumn'
                    , align: 'center'
                },
                {
                    id: 'descripcion',
                    header: 'Detalle',
                    dataIndex: 'detalle',
                    sortable: true,
                    width: 350,
                    editor: textField2
                },
                {
                    header: 'Fecha<br>Compromiso',
                    dataIndex: 'fecha_compromiso',
                    sortable: true,
                    width: 80,
                    renderer: formatDate,
                    editor: new Ext.form.DateField({
                        format: 'Y-m-d'
                    })
                },
                {
                    header: 'Dias<br>Compromiso'
                    , dataIndex: 'dias'
                    , sortable: true
                    , width: 70
                    , editor: numberField
                    , align: 'center'
                },
                {
                    header: 'Fecha<br>Cumplimiento',
                    dataIndex: 'fecha_cumplimiento',
                    sortable: true,
                    width: 80,
                    renderer: formatDate,
                    editor: new Ext.form.DateField({
                        format: 'Y-m-d'
                    })
                },
                {
                    header: 'Entregable',
                    dataIndex: 'entregable',
                    sortable: true,
                    width: 300,
                    editor: textField2
                },
                {
                    header: 'Funcionario Asignado',
                    dataIndex: 'id_asignado',
                    sortable: true,
                    width: 220,
                    editor: comboGRC2,
                    renderer: personaReceptaRecordatorio
                },
                {
                    header: 'Observaciones',
                    dataIndex: 'notas',
                    sortable: true,
                    width: 300,
                    editor: textField2
                }

            ],
            viewConfig: {
                forceFit: false
            },
            sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            /* bbar: new Ext.PagingToolbar({
                 pageSize: limiterecordatorios,
                 store: storeRecordatoriosDetalle,
                 displayInfo: true,
                 displayMsg: 'Mostrando trámites: {0} - {1} de {2} - AMC',
                 emptyMsg: "No existen recordatorios  que mostrar"
             })*/
        });
        // fin ventana recordatorios detalle

        // inicio ventana recordatorios
        var proxyTipoActividades = new Ext.data.HttpProxy({
            api: {
                create: urlRecordatorios + "crudTipoActividades.php?operation=insert",
                read: urlRecordatorios + "crudTipoActividades.php?operation=select",
                update: urlRecordatorios + "crudTipoActividades.php?operation=update",
                destroy: urlRecordatorios + "crudTipoActividades.php?operation=delete"
            },
            listeners: {
                write: function (proxy, action, result, res, rs) {
                    if (typeof res.message !== 'undefined') {
                        if (res.message != '') {
                            AppMsg.setAlert(AppMsg.STATUS_NOTICE, res.message);
                        }
                    }
                }
            }
        });
        var readerTipoActividades = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'message',
            idProperty: 'id',
            root: 'data',
            fields: [
                {name: 'id', allowBlank: true}
                , {name: 'fase', allowBlank: false}
                , {name: 'actividad', allowBlank: false}
                , {name: 'porcentaje', allowBlank: false}
                , {name: 'tipo', allowBlank: false}
                , {name: 'orden', allowBlank: false}
                , {name: 'activo', type: 'boolean', allowBlank: false}
            ]
        });
        var writerTipoActividades = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: true
        });
        this.storeTipoActividades = new Ext.data.Store({
            id: "id",
            proxy: proxyTipoActividades,
            reader: readerTipoActividades,
            writer: writerTipoActividades,
            autoSave: acceso, // dependiendo de si se tiene acceso para grabar
            remoteSort: true,
            baseParams: {},
            listeners: {
                exception: function (proxy, response, operation) {
                    if (operation === 'destroy') {
                        Ext.Msg.show({
                            title: 'Error'
                            , msg: 'Error al borrar '
                            , modal: true
                            , icon: Ext.Msg.ERROR
                            , buttons: Ext.Msg.OK
                        });
                    }
                }
            }
        });

        storeTipoActividades = this.storeTipoActividades;
        storeTipoActividades.baseParams = {
            limit: limiterecordatorios
        };

        this.gridTipoActividades = new Ext.grid.EditorGridPanel({
            height: desktop.getWinHeight() - 68,
            store: this.storeTipoActividades,
            clicksToEdit: 1,
            tbar: [
                {
                    text: 'Nuevo',
                    scope: this,
                    handler: this.addTipoActividades,
                    iconCls: 'save-icon',
                    id: 'addTipoActividades',
                    disabled: !acceso
                },
                '-',
                {
                    text: "Eliminar",
                    scope: this,
                    handler: this.deleteTipoActividades,
                    id: 'deleteTipoActividades',
                    iconCls: 'delete-icon',
                    disabled: !acceso
                },
                '-',
                {
                    iconCls: 'reload-icon',
                    handler: this.requestGridDataTipoActividades,
                    scope: this,
                    text: 'Recargar Datos',
                    tooltip: 'Recargar datos'
                }

            ],
            columns: [
                new Ext.grid.RowNumberer(),
                {header: 'id', dataIndex: 'id', sortable: true, width: 30, hidden: true},
                {
                    header: 'Fase', dataIndex: 'fase', sortable: true, width: 160, editor: comboFASE2,
                    renderer: planificacionFase2
                },
                {
                    header: 'Actividad',
                    dataIndex: 'actividad',
                    sortable: true,
                    width: 360,
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'Porcentaje',
                    dataIndex: 'porcentaje',
                    sortable: true,
                    width: 80,
                    align: 'center',
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {
                    header: 'tipo',
                    dataIndex: 'tipo',
                    sortable: true,
                    width: 60,
                    align: 'center',
                    editor: new Ext.form.TextField({allowBlank: false})
                },
                {header: 'orden', dataIndex: 'orden', sortable: true, width: 60, editor: numberField, align: 'center'},

                {
                    header: 'Activo',
                    dataIndex: 'activo',
                    sortable: true,
                    width: 45,
                    align: 'center',
                    editor: {
                        xtype: 'checkbox'
                    }
                    , falseText: 'No'
                    , menuDisabled: true
                    , trueText: 'Si'
                    , xtype: 'booleancolumn'
                },
            ],
            viewConfig: {
                forceFit: false
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: function (sm, row, rec) {
                    }
                }
            }),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: limiterecordatorios,
                store: storeTipoActividades,
                displayInfo: true,
                displayMsg: 'Mostrando actividades: {0} - {1} de {2} - AMC',
                emptyMsg: "No existen actividades que mostrar"
            })
        });
        // fin ventana recordatorios


        //datastore y grid para reporte
        this.storeRecordatoriosReporte = new Ext.data.Store({
            id: "storeRecordatoriosReporte",
            proxy: proxyRecordatorios,
            reader: readerRecordatorios,
            writer: writerRecordatorios,
            remoteSort: true,
            baseParams: {}
        });
        storeRecordatoriosReporte = this.storeRecordatoriosReporte;

        storeRecordatoriosReporte.baseParams = {
            limit: limiterecordatorios
        };

        this.gridRecordatoriosReporte = new Ext.grid.EditorGridPanel({
            //height: '100%',
            height: desktop.getWinHeight() - 220,
            with: '100%',
            store: this.storeRecordatoriosReporte,
            clicksToEdit: 1,
            columns: [
                new Ext.grid.RowNumberer(),
                {header: 'id', dataIndex: 'id', sortable: true, width: 30, hidden: true},
                {
                    header: '',
                    dataIndex: 'semaforo',
                    width: 24,
                    renderer: function (value, metaData, record) {
                        return '<span class="circleBase ' + value + '"></span>';
                    }
                },
                {
                    header: 'Responsable', dataIndex: 'id_responsable', sortable: true, width: 220,
                    renderer: personaRecordatorio
                },
                {
                    header: 'Producto / servicio',
                    dataIndex: 'tema',
                    sortable: true,
                    width: 300
                },
                {
                    header: 'Fecha Inicio', dataIndex: 'fecha_inicio', sortable: true, width: 80, renderer: formatDate

                },
                {
                    header: 'Fecha Finalizado',
                    dataIndex: 'fecha_entrega',
                    sortable: true,
                    width: 80,
                    renderer: formatDate

                },
                {
                    header: 'Estado'
                    , dataIndex: 'estado',

                    sortable: true,
                    width: 125,
                    renderer: planificacionTipoEstado
                },
                {
                    header: 'Encargado Ingreso', dataIndex: 'idingreso', sortable: true, width: 125, hidden: true,
                    renderer: personaReceptaRecordatorio
                }
                , {
                    header: 'Detalle avance',
                    dataIndex: 'detalle_avance',
                    sortable: true,
                    width: 125
                }
                , {
                    header: 'Tipo contratación',
                    dataIndex: 'tipocontratacion',
                    sortable: true,
                    width: 125,
                    renderer: planificacionTipoContratacio
                }
                , {
                    header: 'Semáforo',
                    dataIndex: 'semaforo',
                    sortable: true,
                    align: 'center',
                    width: 70,
                    renderer: planificacionSemaforo
                }
                , {
                    header: 'Fase',
                    dataIndex: 'fase',
                    sortable: true,
                    width: 70,
                    renderer: planificacionFase
                }
                , {
                    header: 'Valor',
                    dataIndex: 'valor',
                    sortable: true,
                    width: 100,
                    align: 'right',
                    renderer: 'usMoney'
                }
                , {
                    header: 'Avance físico',
                    dataIndex: 'porcentaje',
                    sortable: true,
                    align: 'right',
                    width: 50,
                    renderer: function (rate) {
                        return Ext.util.Format.number(rate * 100, '0 %');
                    }
                },
                {
                    header: 'Observaciones',
                    dataIndex: 'observaciones',
                    sortable: true,
                    width: 160
                },
            ],
            viewConfig: {
                forceFit: false
            },
            sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
            border: false,
            stripeRows: true,
            // paging bar on the bottom
            bbar: new Ext.PagingToolbar({
                pageSize: limiterecordatorios,
                store: storeRecordatorios,
                displayInfo: true,
                displayMsg: 'Mostrando : {0} - {1} de {2} - AMC',
                emptyMsg: "No existen recordatorios  que mostrar"
            })
        });
        //findatastore y grid para reporte


        var win = desktop.getWindow('layout-win');

        if (!win) {
            var winWidth = desktop.getWinWidth();
            var winHeight = desktop.getWinHeight();

            this.seleccionDepar = 3;


            //boton busqueda
            var checkHandler = function (item, checked) {
                if (checked) {
                    var store = this.storeRecordatorios;
                    store.baseParams.filterField = item.key;
                    searchFieldBtn.setText(item.text);
                }
            };

            var targetHandler = function (item, checked) {
                if (checked) {

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
            //fin boton busqueda


            this.formConsultaRecordatorios = new Ext.FormPanel({
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
                                fieldLabel: 'Responsable',
                                id: 'busqueda_persona_encargada',
                                name: 'busqueda_persona_encargada',
                                hiddenName: 'busqueda_persona_encargada',

                                anchor: '95%',
                                store: storeGRC,
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
                                fieldLabel: 'Estado',
                                id: 'busqueda_estado',
                                name: 'busqueda_estado',
                                hiddenName: 'busqueda_estado',

                                anchor: '95%',
                                store: storeTIPOESTADO,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Tipo Contratación',
                                id: 'busqueda_tipo_contratacion',
                                name: 'busqueda_tipo_contratacion',
                                hiddenName: 'busqueda_tipo_contratacion',

                                anchor: '95%',
                                store: storeTIPOCONTRATA,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: 'Semáforo',
                                id: 'busqueda_semaforo',
                                name: 'busqueda_semaforo',
                                hiddenName: 'busqueda_semaforo',

                                anchor: '95%',
                                store: storeSEMAFORO,
                                valueField: 'id',
                                displayField: 'id',
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
                                fieldLabel: 'Fase',
                                id: 'busqueda_fase',
                                name: 'busqueda_fase',
                                hiddenName: 'busqueda_fase',

                                anchor: '95%',
                                store: storeFASE,
                                valueField: 'id',
                                displayField: 'nombre',
                                typeAhead: true,
                                triggerAction: 'all',
                                mode: 'local'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Palabra clave',
                                id: 'busqueda_observaciones',
                                name: 'busqueda_observaciones',
                                anchor: '95%'
                            }
                        ]
                    }
                ]
            });


            win = desktop.createWindow({
                id: 'grid-win-recordatorios',
                title: 'SegPOA',
                width: winWidth,
                height: winHeight,
                iconCls: 'recordatorios-icon',
                shim: false,
                animCollapse: false,
                constrainHeader: true,
                layout: 'fit',
                items: new Ext.TabPanel({
                    activeTab: 0,
                    border: false,
                    items: [
                        {
                            title: 'Listado Procesos Contratación',
                            autoScroll: true,
                            closable: true,
                            items: [
                                {
                                    id: 'cabeceraOperativos',
                                    titleCollapse: true,
                                    split: true,
                                    flex: 1,
                                    autoScroll: true,
                                    layout: 'column',
                                    tbar: [
                                        {
                                            text: 'Nuevo',
                                            scope: this,
                                            handler: this.addrecordatorios,
                                            iconCls: 'save-icon',
                                            id: 'addrecordatorios',
                                            disabled: !acceso
                                        },
                                        '-',
                                        {
                                            text: "Eliminar",
                                            scope: this,
                                            handler: this.deleterecordatorios,
                                            id: 'deleterecordatorios',
                                            iconCls: 'delete-icon',
                                            disabled: !acceso
                                        },
                                        '-',
                                        {
                                            iconCls: 'reload-icon',
                                            handler: this.requestGridData,
                                            scope: this,
                                            text: 'Recargar Datos',
                                            tooltip: 'Recargar datos'
                                        }, '->',
                                        {text: 'Buscar por:', xtype: 'tbtext'}
                                        , searchFieldBtn
                                        , ' ', ' '
                                        , new QoDesk.QoAdmin.SearchField({
                                            paramName: 'filterText'
                                            , store: this.storeRecordatorios
                                        })
                                    ],
                                    items: this.gridRecordatorios,
                                },
                                {
                                    id: 'detalleOperativos',
                                    flex: 2,
                                    bodyStyle: 'padding:0; background: #DFE8F6',
                                    layout: 'column',
                                    items: this.gridRecordatoriosDetalle
                                }
                            ]

                        },
                        {
                            title: 'Reportes',
                            layout: 'column',
                            id: 'reportesRecordatoriosTab',
                            disabled: false,
                            autoScroll: true,
                            tbar: [
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataRecordatoriosReporte,
                                    scope: this,
                                    text: 'Buscar'

                                },
                                {
                                    iconCls: 'reload-icon',
                                    handler: this.requestGridDataRecordatoriosReporteReset,
                                    scope: this,
                                    text: 'Borrar formulario'

                                },
                                '-',

                                {
                                    iconCls: 'excel-icon',
                                    handler: this.botonExportarRecordatoriosReporte,
                                    scope: this,
                                    text: 'Exportar listado',
                                    tooltip: 'Se genera archivo Excel con la información solicitada'
                                }

                            ],
                            items: [
                                {
                                    region: 'north',
                                    height: 130,
                                    minSize: 100,
                                    maxSize: 190,
                                    closable: true,
                                    autoScroll: false,
                                    items: this.formConsultaRecordatorios
                                },
                                {
                                    // lazily created panel (xtype:'panel' is default)
                                    region: 'center',
                                    split: true,
                                    autoScroll: true,
                                    minSize: 100,
                                    maxSize: 150,
                                    items: this.gridRecordatoriosReporte
                                }
                            ]

                        },
                        {
                            title: 'Listados de actividades',
                            autoScroll: true,
                            closable: true,

                            id: 'detalleOperativos',
                            flex: 2,
                            bodyStyle: 'padding:0; background: #DFE8F6',
                            layout: 'column',
                            items: this.gridTipoActividades


                        }
                    ]
                })


            });
        }
        win.show();
        setTimeout(function () {
            this.storeRecordatorios.load({
                params: {
                    start: 0,
                    limit: limiterecordatorios
                }
            });
            this.storeTipoActividades.load()
        }, 600);
    },

    deleterecordatorios: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridRecordatorios.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeRecordatorios.remove(rows);
                }
            }
        });
    },
    addrecordatorios: function () {
        var recordatorios = new this.storeRecordatorios.recordType({
            id_responsable: '',
            tema: '',
            fecha_inicio: (new Date()),
            fecha_entrega: (new Date()),
            estado: 'En propuesta',
            detalle_avance: ''
        });
        this.gridRecordatorios.stopEditing();
        this.storeRecordatorios.insert(0, recordatorios);
        this.gridRecordatorios.startEditing(0, 0);
    },
    requestGridData: function () {
        this.storeRecordatorios.load({
            params:
                {
                    start: 0,
                    limit: limiterecordatorios
                }
        });
    },

    deleterecordatoriosDetalle: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridRecordatoriosDetalle.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeRecordatoriosDetalle.remove(rows);
                }
            }
        });
    },
    addrecordatoriosDetalle: function () {
        var recordatorios = new this.storeRecordatoriosDetalle.recordType({
            id_proceso: selectProceso,
            id_actividad: '',
            actividad: '',
            cumplimiento: '',
            detalle: '',
            dias: 0,
            fecha_compromiso: (new Date()),
            fecha_cumplimiento: (new Date()),
            notas: '',
            entregable: ''
        });
        this.gridRecordatoriosDetalle.stopEditing();
        this.storeRecordatoriosDetalle.insert(0, recordatorios);
        this.gridRecordatoriosDetalle.startEditing(0, 0);
    },
    requestGridDatarecordatoriosDetalle: function () {
        this.storeRecordatoriosDetalle.load({
            params:
                {
                    start: 0,
                    limit: limiterecordatorios,
                    id_proceso: selectProceso
                }
        });
    },

    cargaAutomatica: function (tipo) {
        if (tipo.id == 'cargaAutomaticaSubasta') {
            tipo = 'subasta'
        }
        if (tipo.id == 'cargaAutomaticaInfima') {
            tipo = 'infima'
        }


        var rows = this.storeRecordatoriosDetalle.getCount()
        if (rows === 0) {
            // mensaje continuar y llamada a descarga archivo
            Ext.Msg.show({
                title: 'Advertencia',
                msg: 'Se generaran automaticamente las actividades para <strong>Subasta Inversa</strong> <br>¿Desea continuar?',
                scope: this,
                icon: Ext.Msg.WARNING,
                buttons: Ext.Msg.YESNO,
                fn: function (btn) {
                    if (btn == 'yes') {
                        //    window.location.href = 'modules/desktop/recordatorios/server/descargaReporteRecordatorios.php?param=' + valueParams;
                        var dataObj = null;
                        var urlRecordatorios = "modules/desktop/recordatorios/server/";
                        // envio a la carga de actividades
                        Ext.Ajax.request({
                            url: urlRecordatorios + 'crudRecordatoriosDetalle.php?operation=fillAuto&tipo=' + tipo + '&id_proceso=' + selectProceso,
                            params: {tipo: tipo, id_proceso: selectProceso},
                            failure: function (response, options) {
                                // error
                                console.log('Error de carga ');
                            },
                            success: function (response, options) {
                                //assuming the response is a JSON string...
                                dataObj = Ext.decode(response.responseText);
                                //luego de la carga se recarga el dataStore
                                this.storeRecordatoriosDetalle.load({
                                    params:
                                        {
                                            start: 0,
                                            limit: limiterecordatorios,
                                            id_proceso: selectProceso
                                        }
                                });
                            }
                        });
                    }
                }
            });
        } else {
            Ext.Msg.show({
                title: 'Atencion',
                msg: 'Ya existen datos',
                scope: this,
                icon: Ext.Msg.WARNING
            });
            return false;
        }
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
    requestGridDataRecordatoriosReporte: function () {
        this.storeRecordatoriosReporte.baseParams = this.formConsultaRecordatorios.getForm().getValues();

        var accesosPlanificacion = this.app.isAllowedTo('accesosPlanificacion', this.id);
        var accesosConsulta = this.app.isAllowedTo('accesosConsulta', this.id);
        var accesosFuncionario = this.app.isAllowedTo('accesosFuncionario', this.id);

        this.storeRecordatoriosReporte.baseParams.accesosPlanificacion = accesosPlanificacion;
        this.storeRecordatoriosReporte.baseParams.accesosConsulta = accesosConsulta;
        this.storeRecordatoriosReporte.baseParams.accesosFuncionario = accesosFuncionario;

        // para indicar en la busqueda que es desde el formulario
        var formularioBusqueda = 1;
        this.storeRecordatoriosReporte.baseParams.formularioBusqueda = formularioBusqueda;

        this.storeRecordatoriosReporte.load();
    },

    requestGridDataRecordatoriosReporteReset: function () {
        this.formConsultaRecordatorios.getForm().reset();
    },
    botonExportarRecordatoriosReporte: function () {
        var rows = this.storeRecordatoriosReporte.getCount()
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
                    valueParams = JSON.stringify(this.formConsultaRecordatorios.getForm().getValues());

                    //generaAcciones = (Ext.getCmp('checkDetalleAcciones').getValue());
                    //generaActas = (Ext.getCmp('checkDetalleActas').getValue());
                    //generaRetiros = (Ext.getCmp('checkDetalleRecibidos').getValue());
                    //generaTotalesPersonal = (Ext.getCmp('checkTotalesPersonal').getValue());

                    window.location.href = 'modules/desktop/recordatorios/server/descargaReporteRecordatorios.php?param=' + valueParams;
                }
            }
        });
    },

    // eventos de boton Tipo Actividades
    deleteTipoActividades: function () {
        Ext.Msg.show({
            title: 'Confirmación',
            msg: 'Está seguro de querer borrar?',
            scope: this,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    var rows = this.gridTipoActividades.getSelectionModel().getSelections();
                    if (rows.length === 0) {
                        return false;
                    }
                    this.storeTipoActividades.remove(rows);
                }
            }
        });
    },
    addTipoActividades: function () {
        var recordatorios = new this.storeTipoActividades.recordType({
            id_proceso: selectProceso,
            id_actividad: '',
            actividad: '',
            cumplimiento: '',
            detalle: '',
            dias: 0,
            fecha_compromiso: (new Date()),
            fecha_cumplimiento: (new Date()),
            notas: '',
            entregable: ''
        });
        this.gridTipoActividades.stopEditing();
        this.storeTipoActividades.insert(0, recordatorios);
        this.gridTipoActividades.startEditing(0, 0);
    },
    requestGridDataTipoActividades: function () {
        this.storeTipoActividades.load({
            params:
                {
                    start: 0,
                    limit: limiterecordatorios,
                    id_proceso: selectProceso
                }
        });
    }
    // eventos de boton Tipo Actividades
});