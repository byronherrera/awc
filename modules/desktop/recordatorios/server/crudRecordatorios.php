<?php
require_once '../../../../server/os.php';
require_once '../../../common/Classes/funciones.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}

function selectRecordatorios()
{
    global $os;

    $columnaBusqueda = 'busqueda_todos';
    $where = '';

    if (isset($_POST['filterField'])) {
        $columnaBusqueda = $_POST['filterField'];
    }

    if (isset($_POST['filterText'])) {
        $campo = $_POST['filterText'];
        $campo = str_replace(" ", "%", $campo);
        if ($columnaBusqueda != 'busqueda_todos') {
            $where = " WHERE $columnaBusqueda LIKE '%$campo%'";
        } else {
            $listadoCampos = array(
                'nombres',
                'apellidos',
                'tema',
                'fecha_inicio',
                'fecha_entrega',
                'estado',
                'semaforo',
                'observaciones'
            );
            $cadena = '';
            foreach ($listadoCampos as &$valor) {
                $cadena = $cadena . " $valor LIKE '%$campo%' OR ";
            }

            $cadena = substr($cadena, 0, -3);
            $where = " WHERE $cadena ";
        }
    }


    if (isset ($_POST['start']))
        $start = $_POST['start'];
    else
        $start = 0;

    if (isset ($_POST['limit']))
        $limit = $_POST['limit'];
    else
        $limit = 100;
    $orderby = 'ORDER BY id ASC';
    if (isset($_POST['sort'])) {
        $orderby = 'ORDER BY ' . $_POST['sort'] . ' ' . $_POST['dir'];
    }
    // para los reportes
    if (isset($_POST['busqueda_persona_encargada']) and ($_POST['busqueda_persona_encargada'] != '')) {
        $tipo = $_POST['busqueda_persona_encargada'];
        if ($where == '') {
            $where = "WHERE id_responsable = '$tipo' ";
        } else {
            $where = $where . " AND id_responsable = '$tipo' ";
        }
    }

    if (isset($_POST['busqueda_activo']) and ($_POST['busqueda_activo'] != '')) {
        $tipo = $_POST['busqueda_activo'];
        if ($where == '') {
            $where = "WHERE activo = '$tipo' ";
        } else {
            $where = $where . " AND activo = '$tipo' ";
        }
    }

    if (isset($_POST['busqueda_tipo_contratacion']) and ($_POST['busqueda_tipo_contratacion'] != '')) {
        $tipo = $_POST['busqueda_tipo_contratacion'];
        if ($where == '') {
            $where = "WHERE tipocontratacion = '$tipo' ";
        } else {
            $where = $where . " AND tipocontratacion = '$tipo' ";
        }
    }

    if (isset($_POST['busqueda_semaforo']) and ($_POST['busqueda_semaforo'] != '')) {
        $tipo = $_POST['busqueda_semaforo'];
        if ($where == '') {
            $where = "WHERE semaforo = '$tipo' ";
        } else {
            $where = $where . " AND semaforo = '$tipo' ";
        }
    }

    if (isset($_POST['busqueda_fase']) and ($_POST['busqueda_fase'] != '')) {
        $tipo = $_POST['busqueda_fase'];
        if ($where == '') {
            $where = "WHERE fase = '$tipo' ";
        } else {
            $where = $where . " AND fase = '$tipo' ";
        }
    }

    if (isset($_POST['busqueda_observaciones']) and ($_POST['busqueda_observaciones'] != '')) {
        $tipo = $_POST['busqueda_observaciones'];
        if ($where == '') {
            $where = "WHERE observaciones = '$tipo' ";
        } else {
            $where = $where . " AND observaciones = '$tipo' ";
        }
    }



    if (isset($_POST['busqueda_fecha_inicio']) and ($_POST['busqueda_fecha_inicio'] != '')) {
        $fechainicio = $_POST['busqueda_fecha_inicio'];
        if (isset($_POST['busqueda_fecha_fin']) and ($_POST['busqueda_fecha_fin'] != '')) {
            $fechafin = $_POST['busqueda_fecha_fin'];
        } else {
            $fechafin = date('Y\m\d H:i:s');;
        }

        if ($where == '') {
            $where = "WHERE fecha_entrega between '$fechainicio' and '$fechafin'  ";
        } else {
            $where = $where . " AND fecha_entrega between '$fechainicio' and '$fechafin' ";
        }
    }


    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_planificacion_notificaciones $where $orderby LIMIT $start, $limit";
    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    };

    $sql = "SELECT count(*) AS total FROM amc_planificacion_notificaciones $where";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    $total = $row['total'];

    echo json_encode(array(
            "total" => $total,
            "success" => true,
            "data" => $data)
    );
}

function insertRecordatorios()
{
    global $os;

    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode(stripslashes($_POST["data"]));

    $data->idingreso = $os->get_member_id();

    $data->nombres = getName($data->id_responsable);
    $data->apellidos = getLastName($data->id_responsable);


    //genero el listado de nombre de campos

    $cadenaDatos = '';
    $cadenaCampos = '';
    foreach ($data as $clave => $valor) {
        $cadenaCampos = $cadenaCampos . $clave . ',';
        $cadenaDatos = $cadenaDatos . "'" . $valor . "',";
    }
    $cadenaCampos = substr($cadenaCampos, 0, -1);
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql = "INSERT INTO amc_planificacion_notificaciones($cadenaCampos)
	values($cadenaDatos);";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    $data->id = $os->db->conn->lastInsertId();
    // genero el nuevo codigo de proceso

    echo json_encode(array(
        "success" => true,
        "msg" => $sql->errorCode() == 0 ? "insertado exitosamente" : $sql->errorCode(),
        "data" => array($data)
    ));
}

function updateRecordatorios()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);

    $message = '';

    $data->nombres = getName($data->id_responsable);
    $data->apellidos = getLastName($data->id_responsable);

    $data->fecha_inicio =  substr($data->fecha_inicio, 0, 10);
    $data->fecha_entrega =  substr($data->fecha_entrega, 0, 10);


    $estadoAnterior = getEstadoOriginal($data->id);
    // genero el listado de valores a insertar
    $cadenaDatos = '';
    foreach ($data as $clave => $valor) {
        // verifico cambios anteriores
        if ($estadoAnterior[$clave] != $valor) {
            if (($clave == "fecha_inicio") || ($clave == "fecha_entrega") || ($clave == "idingreso") || ($clave == "porcentaje") || ($clave == "valor")) {
                if ($valor === '')
                    $cadenaDatos = $cadenaDatos . $clave . " = NULL,";
                else
                    $cadenaDatos = $cadenaDatos . $clave . " = '" . $valor . "',";
            } else {
                $cadenaDatos = $cadenaDatos . $clave . " = '" . $valor . "',";
            }
        }
    }
    $cadenaDatos = substr($cadenaDatos, 0, -1);
    if (strlen($cadenaDatos) > 0) {
        $sql = "UPDATE amc_planificacion_notificaciones SET  $cadenaDatos  WHERE amc_planificacion_notificaciones.id = '$data->id' ";

        $sql = $os->db->conn->prepare($sql);
        $sql->execute();

        echo json_encode(array(
            "success" => $sql->errorCode() == 0,
            "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_planificacion_notificaciones actualizado exitosamente" : $sql->errorCode(),
            "message" => $message
        ));

    } else {
        echo json_encode(array(
            "success" => true,
            "msg" => "Nothing to do"
        ));
    }
    // envio de notificacion a usuario asignado
    if (isset($data->activo)) {
        if ($estadoAnterior['activo'] != $data->activo) {
            if ($data->activo) {
                $fechaActual = date('d-m-Y H:i:s');
                $funcionario = $data->id_responsable;
                $detalle = "Un texto ";

                $mensaje = getmensajeRecordatorios(regresaNombre($data->id_responsable), $detalle, $fechaActual);

                $email = regresaEmail($funcionario);
                //   $email = "byron.herrera@quito.gob.ec";
                $asunto = "Nuevo operativo asignado, " . " - " . $email;
                $funcionarios = ["byron.herrera@quito.gob.ec", "byronherrera@hotmail.com"];
                $funcionariosSeguimiento = ["byron.herrera@quito.gob.ec", "byronherrera@hotmail.com"];
                $prueba = true;
                $resultado = enviarEmailAmc($email, $asunto, $mensaje, $funcionarios, $funcionariosSeguimiento, $prueba);
                if ($resultado) {
                    $sqlUpdate = "UPDATE `amc_operativos` SET `mail_enviado` = 1 WHERE `id` = " . $data->id;
                    $sql = $os->db->conn->prepare($sqlUpdate);
                    $grabaresultado = $sql->execute();
                    $data->mail_enviado = '1';
                }
            }
        }
    }
}


function getEstadoOriginal($id)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    if ($id != '') {
        $sql = "SELECT *
            FROM amc_planificacion_notificaciones WHERE id = " . $id;
        $nombre = $os->db->conn->query($sql);
        $rowData = $nombre->fetch(PDO::FETCH_ASSOC);
        return $rowData;
    } else
        return '* No asignado';
}

;

function getmensajeRecordatorios($nombre = '', $operativos = '', $fecha = '')
{
    $texto = '<div style="font-family: Arial, Helvetica, sans-serif;">
                <div style="float: right; clear: both; width: 100%;"><img style="float: right;" src="http://agenciadecontrol.quito.gob.ec/images/logoamc.png" alt="" width="30%" /></div>
                <div style="clear: both; margin: 50px 10%; float: left;">
                <p><br><br>
                 Estimado, ' . $nombre . ' ha sido asignado al  siguiente operativo como responsable:<br>
                 <br>
                 <br>
                 ' . $operativos . '
                 <br>
                 <br>
                 "Se le recuerda al responsable del operativo que es obligatorio llenar todo el detalle en 
                 ACCIONES OPERATIVO, ACTOS INICIO y RETIROS, dicho reporte debe estar en concordancia con lo reportado en el chat. 
                 En caso que no este correcto, se lo cambiarÃ¡ a estado INFORME y no se lo aceptarÃ¡ como finalizado.
                <br>

                <br>
                 Favor ingresar en Matis AMC, para verificar el operativo asignado <a href="http://amcmatis.quito.gob.ec/procesos-amc">aquí</a> .
                <br>    
                <br>    
                <p>De conformidad con el Memorando No. AMC-SM-JA-2018-003, del 4 de enero de 2018, mediante el cual la 
                MÃ¡xima Autoridad dispone</p>
                <p>"Todo el personal de la Agencia Metropolitana de Control, deberÃ¡ utilizar de manera obligatoria el mÃ³dulo de operativos que se encuentra dentro de la INTRANET de la InstituciÃ³n, a fin de generar los informes de los operativos realizados. En el sistema se deberÃ¡ llenar los datos solicitados dentro de las 24 horas siguientes de haber realizado el operativo, con el objetivo de que se genere el informe respectivo."</p>

                <br>

                <br>

                <p>Fecha : ' . $fecha . '</p>
                <p>Atentamente </p>
                
                <p>SUPERVISION METROPOLITANA</p>
                <p>GAD MDMQ AGENCIA METROPOLITANA DE CONTROL</p>
                <p></p>
                <p>INFORMACIÃ“N IMPORTANTE</p>
                <p>************************************************</p>
                <p>- No responder este correo es un Mensaje AutomÃ¡tico.</p>
                
                <p>- Para sugerencias, escribe a tu coordinador.</p>

                </div>
                <p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://agenciadecontrol.quito.gob.ec/images/piepagina.png" alt="" width="100%" /></p>
                </div>
                ';
    return $texto;
}


function deleteRecordatorios()
{
    global $os;
    $id = json_decode(stripslashes($_POST["data"]));
    $sql = "DELETE FROM amc_planificacion_notificaciones WHERE id = $id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_planificacion_notificaciones, eliminado exitosamente" : $sql->errorCode()
    ));
}

switch ($_GET['operation']) {
    case 'select' :
        selectRecordatorios();
        break;
    case 'insert' :
        insertRecordatorios();
        break;
    case 'update' :
        updateRecordatorios();
        break;
    case 'delete' :
        deleteRecordatorios();
        break;
}
