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

    if (isset($_POST['id_proceso']) and ($_POST['id_proceso'] != '')) {
        $tipo = $_POST['id_proceso'];
        if ($where == '') {
            $where = "WHERE id_proceso = '$tipo' ";
        } else {
            $where = $where . " AND id_proceso = '$tipo' ";
        }
    }


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

    $orderby = 'ORDER BY orden ASC';
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
    $sql = "SELECT *,
             (SELECT orden FROM amc_planificacion_actividades WHERE amc_planificacion_detalle.id_actividad = amc_planificacion_actividades.id) as orden
             FROM amc_planificacion_detalle $where $orderby LIMIT $start, $limit";
    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    };

    $sql = "SELECT count(*) AS total FROM amc_planificacion_detalle $where";
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



    //genero el listado de nombre de campos

    $cadenaDatos = '';
    $cadenaCampos = '';
    foreach ($data as $clave => $valor) {
        $cadenaCampos = $cadenaCampos . $clave . ',';
        $cadenaDatos = $cadenaDatos . "'" . $valor . "',";
    }
    $cadenaCampos = substr($cadenaCampos, 0, -1);
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql = "INSERT INTO amc_planificacion_detalle($cadenaCampos)
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

function fillAuto()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $tipo = $_POST["tipo"];  //tipos(subasta,infima)
    $id_proceso = $_POST["id_proceso"];

    if ($tipo == 'infima')
        $sql = "SELECT id, actividad FROM amc_planificacion_actividades WHERE activo = 1 AND tipo = 1 ORDER BY orden";
    else
        $sql = "SELECT
                id,
                fase,
                actividad 
                FROM
                amc_planificacion_actividades
                WHERE
                activo = 1 AND 
                fase IN ('Fase preparatoria', 'Fase contractual', 'Pago') OR (fase = 'Fase precontractual' AND tipo = 2)
                ORDER BY orden ";

    $result = $os->db->conn->query($sql);
    $memberId = $os->get_member_id();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        // al listado
        $id_actividad = $row['id'];
        $actividad = $row['actividad'];
        $sql = "INSERT INTO `amc_planificacion_detalle` ( `id_proceso`, `id_actividad`, `actividad`, `cumplimiento`,    `idingreso` )
                VALUES
                    ( '$id_proceso', '$id_actividad', '$actividad', 'false',   '$memberId' )";
        $sql = $os->db->conn->prepare($sql);
        $sql->execute();

    };

    echo json_encode(array(
        "success" => true,
        "msg" => 'mensaje',
        "data" => $tipo .  $id_proceso
    ));
}

function updateRecordatorios()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);

    $message = '';

    $data->cumplimiento = $data->cumplimiento;

    $data->fecha_compromiso = substr($data->fecha_compromiso, 0, 10);
    $data->fecha_cumplimiento = substr($data->fecha_cumplimiento, 0, 10);

    $data->cumplimiento = ($data->cumplimiento) ? 'true' : 'false';

    $estadoAnterior = getEstadoOriginal($data->id);


    $actualizarPorcentaje = [];
    $cadenaDatos = '';
    foreach ($data as $clave => $valor) {
        // verifico cambios anteriores
        if ($estadoAnterior[$clave] != $valor) {
            //  if (($clave == "fecha_compromiso") || ($clave == "fecha_cumplimiento") || ($clave == "idingreso") || ($clave == "porcentaje") || ($clave == "valor")) {
            if (($clave == "fecha_compromiso") || ($clave == "fecha_cumplimiento")|| ($clave == "dias")) {
                if (strlen($valor) == 0)
                    $cadenaDatos = $cadenaDatos . $clave . " = NULL,";
                else
                    $cadenaDatos = $cadenaDatos . $clave . " = '" . $valor . "',";
            } else {
                $cadenaDatos = $cadenaDatos . $clave . " = '" . $valor . "',";
            }
            if (($clave == 'cumplimiento') && ($valor == 'true')) {
                // en caso que cumplimiento sea true actualizamos el avance fisico
                $actualizarPorcentaje = ["id_proceo" => $data->id_proceso, "id_actividad" => $data->id_actividad];
            }
        }
    }
    $cadenaDatos = substr($cadenaDatos, 0, -1);
    if (strlen($cadenaDatos) > 0) {
        $sqlOriginal = "UPDATE amc_planificacion_detalle SET  $cadenaDatos  WHERE amc_planificacion_detalle.id = '$data->id' ";

        $sql = $os->db->conn->prepare($sqlOriginal);
        $sql->execute();

        echo json_encode(array(
            "success" => $sql->errorCode() == 0
        , "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_planificacion_detalle actualizado exitosamente" : $sql->errorCode()
        , "message" => $message
        , "sql" => $sqlOriginal
        ));

        // luego de actualizar el detalle actualizamos el padre
        if ($actualizarPorcentaje)
            actualizarPorcentaje($actualizarPorcentaje['id_proceo'], $actualizarPorcentaje['id_actividad']);

    } else {
        echo json_encode(array(
            "success" => true,
            "msg" => "Nothing to do"
        ));
    }
    // envio de notificacion a usuario asignado
    /* if (isset($data->activo)) {
        if ($estadoAnterior['activo'] != $data->activo) {
            if ($data->activo) {
                $fechaActual = date('d-m-Y H:i:s');
                $funcionario = $data->id_responsable;
                $detalle = "<table border='1'>" .
                    "<tr><td>TEMA</td><td>ESTADO</td><td>SEMAFORO</td><td>VALOR</td><td>FECHA ENTREGA</td></tr>" .
                    "<tr>" .
                    "<td>" . $data->tema. "</td>" .
                    "<td>" . $data->estado. "</td>" .
                    "<td>" . $data->semaforo. "</td>" .
                    "<td>" . $data->valor. "</td>" .
                    "<td>" . $data->fecha_entrega. "</td>" .
                    "</tr></table>";
                $mensaje = getmensajeRecordatorios(regresaNombre($data->id_responsable), $detalle, $fechaActual);

                $email = regresaEmail($funcionario);
                $asunto = "Tarea asignada, " . " - " . $email;
                $funcionarios = ["katherine.montenegro@quito.gob.ec", "andrea.garcia@quito.gob.ec"];
                $funcionariosSeguimiento = ["byron.herrera@quito.gob.ec", "pamela.parreno@quito.gob.ec"];
                $from = 'Planificación - Agencia Metropolitana de Control';
                $prueba = true;
                $resultado = enviarEmailAmc($email, $asunto, $mensaje, $funcionarios, $funcionariosSeguimiento, $from , $prueba);
            }
        }
    }*/
}

function getEstadoOriginal($id)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    if ($id != '') {
        $sql = "SELECT *
            FROM amc_planificacion_detalle WHERE id = " . $id;
        $nombre = $os->db->conn->query($sql);
        $rowData = $nombre->fetch(PDO::FETCH_ASSOC);
        return $rowData;
    } else
        return '* No asignado';
}

function actualizarPorcentaje($id_proceso, $id_actividad)
{
    global $os;
    $semaforo = '';
    $os->db->conn->query("SET NAMES 'utf8'");
    $valorPorcentaje = getValActividad($id_actividad);
    $valorFse = getFaseActividad($id_actividad);
    if ($valorFse == "Pago") $valorSemaforo = "Verde"; else $valorSemaforo = "Amarillo";
    $semaforo = " , semaforo =  '$valorSemaforo' ";
    $sql = "UPDATE amc_planificacion_notificaciones SET porcentaje = $valorPorcentaje, fase = '$valorFse'  $semaforo WHERE id = $id_proceso";
    $nombre = $os->db->conn->query($sql);
}

function getValActividad($id_actividad)
{
    global $os;
    $sql = "SELECT porcentaje FROM amc_planificacion_actividades WHERE id = " . $id_actividad;
    $nombre = $os->db->conn->query($sql);
    $rowData = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rowData['porcentaje'];
}

function getFaseActividad($id_actividad)
{
    global $os;
    $sql = "SELECT fase FROM amc_planificacion_actividades WHERE id = " . $id_actividad;
    $nombre = $os->db->conn->query($sql);
    $rowData = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rowData['fase'];
}

function getmensajeRecordatorios($nombre = '', $detalle = '', $fecha = '')
{
    $texto = '<div style="font-family: Arial, Helvetica, sans-serif;">
                <div style="float: right; clear: both; width: 100%;"><img style="float: right;" src="http://agenciadecontrol.quito.gob.ec/images/logoamc.png" alt="" width="30%" /></div>
                <div style="clear: both; margin: 50px 10%; float: left;">
                <p><br><br>
                 Estimado, ' . $nombre . ' le ha sido asignada la siguiente tarea:<br>
                 <br>
                 ' . $detalle . '
                 <br>
                 
                <br>

                <br>
                 En el modulo de recordatorios se encuentran todas la tareas asignadas <a href="http://amcmatis.quito.gob.ec/procesos-amc">aquí</a> .
                <br>    
                <br>    

                <p>Fecha : ' . $fecha . '</p>
                <p>Atentamente </p>
                
                <p>AREA PLANIFICACION</p>
                <p>GAD MDMQ AGENCIA METROPOLITANA DE CONTROL</p>
                <p></p>
                <p>IMPORTANTE</p>
                <p>************************************************</p>
                <p>- No responder este correo es un Mensaje Automático.</p>
                

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
    $sql = "DELETE FROM amc_planificacion_detalle WHERE id = $id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_planificacion_detalle, eliminado exitosamente" : $sql->errorCode()
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
    case 'fillAuto' :
        fillAuto();
        break;
}
