<?php
require_once '../../../../server/os.php';
require_once '../../../common/Classes/funciones.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}

function selectEstadoActividades()
{
    global $os;

    $columnaBusqueda = 'busqueda_todos';
    $where = '';

    if (isset ($_POST['start']))
        $start = $_POST['start'];
    else
        $start = 0;

    if (isset ($_POST['limit']))
        $limit = $_POST['limit'];
    else
        $limit = 100;

    $orderby = 'ORDER BY tipo, orden ASC';

    if (isset($_POST['sort'])) {
        $orderby = 'ORDER BY ' . $_POST['sort'] . ' ' . $_POST['dir'];
    }
    // para los reportes

    $os->db->conn->query("SET NAMES 'utf8'");
    $sql1 = "SELECT * FROM amc_planificacion_actividades $where $orderby LIMIT $start, $limit";
    $result = $os->db->conn->query($sql1);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    };

    $sql = "SELECT count(*) AS total FROM amc_planificacion_actividades $where";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    $total = $row['total'];

    echo json_encode(array(
            "total" => $total,
            "success" => true,
            "data" => $data,
            "sql" => $sql1,
            )
    );
}

function insertEstadoActividades()
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

    $sql = "INSERT INTO amc_planificacion_actividades($cadenaCampos)
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

function updateEstadoActividades()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);

    $message = '';


    $data->activo = ($data->activo) ? '1' : '0';

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
        $sqlOriginal = "UPDATE amc_planificacion_actividades SET  $cadenaDatos  WHERE amc_planificacion_actividades.id = '$data->id' ";

        $sql = $os->db->conn->prepare($sqlOriginal);
        $sql->execute();

        echo json_encode(array(
            "success" => $sql->errorCode() == 0
        , "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_planificacion_actividades actualizado exitosamente" : $sql->errorCode()
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
                $mensaje = getmensajeEstadoActividades(regresaNombre($data->id_responsable), $detalle, $fechaActual);

                $email = regresaEmail($funcionario);
                $asunto = "Tarea asignada, " . " - " . $email;
                $$funcionarios = ["katherine.montenegro@quito.gob.ec", "andrea.garcia@quito.gob.ec"];
                $funcionariosSeguimiento = ["byron.herrera@quito.gob.ec"];
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
            FROM amc_planificacion_actividades WHERE id = " . $id;
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

function getmensajeEstadoActividades($nombre = '', $detalle = '', $fecha = '')
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
                 En el modulo de estadoActividades se encuentran todas la tareas asignadas <a href="http://amcmatis.quito.gob.ec/procesos-amc">aquí</a> .
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

function deleteEstadoActividades()
{
    global $os;
    $id = json_decode(stripslashes($_POST["data"]));
    $sql = "DELETE FROM amc_planificacion_actividades WHERE id = $id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_planificacion_actividades, eliminado exitosamente" : $sql->errorCode()
    ));
}

switch ($_GET['operation']) {
    case 'select' :
        selectEstadoActividades();
        break;
    case 'insert' :
        insertEstadoActividades();
        break;
    case 'update' :
        updateEstadoActividades();
        break;
    case 'delete' :
        deleteEstadoActividades();
        break;
}
