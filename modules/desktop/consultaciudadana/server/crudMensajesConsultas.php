<?php
header('Content-type: text/html; charset=utf-8');
require_once '../../../../server/os.php';
require_once '../../../common/Classes/funciones.php';
$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}


function selectMensajesConsultas()
{
    global $os;
    $id = (int)$_POST ['id'];

    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_proc_solicitud_detalle WHERE id_solicitud = $id ORDER BY id DESC ";

    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {

        $data[] = $row;
    }
    echo json_encode(array(
            "success" => true,
            "data" => $data)
    );
}

function insertMensajesConsultas()
{
    global $os;

    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode(stripslashes($_POST["data"]));

    $data->id_funcionario = $os->get_member_id();

    //genero el listado de nombre de campos

    $cadenaDatos = '';
    $cadenaCampos = '';
    foreach ($data as $clave => $valor) {
        if (($clave == 'fecha_envio') && ($valor == '')) {
            $valor = null;
        } else
        {
            $cadenaCampos = $cadenaCampos . $clave . ',';
            $cadenaDatos = $cadenaDatos . "'" . $valor . "',";
        }
    }
    $cadenaCampos = substr($cadenaCampos, 0, -1);
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql = "INSERT INTO amc_proc_solicitud_detalle($cadenaCampos)
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

function updateMensajesConsultas()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);
    if (is_null($data))
        $data = json_decode(stripslashes($_POST["data"]));

    $estadoAnterior = getEstadoOriginal($data->id);

    $cadenaDatos = '';
    foreach ($data as $clave => $valor) {
        // verifico cambios anteriores
        if ($estadoAnterior[$clave] != $valor) {
            if ($valor === '')
                $cadenaDatos = $cadenaDatos . $clave . " = NULL,";
            else
                $cadenaDatos = $cadenaDatos . $clave . " = '" . $valor . "',";
        }
    }

    $cadenaDatos = substr($cadenaDatos, 0, -1);
    $sql = "UPDATE amc_proc_solicitud_detalle SET  $cadenaDatos  WHERE id = '$data->id' ";
    $log = $sql;
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_operativos_personal actualizado exitosamente" : $sql->errorCode()
    ));

    // genero archivo de log
    $fichero = 'consultas_ciudadanas_mensajes.log';
    $actual = file_get_contents($fichero);
    $actual .= $os->get_member_id() . "\n" . $log . "\n\n";
    file_put_contents($fichero, $actual);
}


function selectMensajesConsultasForm()
{
    global $os;
    $id = (int)$_POST ['id'];
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_proc_solicitud_detalle a WHERE id = $id";
    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data = $row;
    }
    $data['fecha2'] = $data['fecha'];
    $data['nombres2'] = $data['nombres'];
    $data['apellidos2'] = $data['apellidos'];
    $data['correoelectronico2'] = $data['correoelectronico'];
    $data['cedula2'] = $data['cedula'];
    $data['totalMensajesConsultas'] = totalpedidos($data['cedula']);

    if (strlen($data['imagencedula']) > 0) {
        $link = json_decode($data['imagencedula']);
        $data['imagencedula'] = "<a href='" . $link->archivo1 . "' target='_blank'>Ver cédula</a>";;
    } else {
        $data['imagencedula'] = '';
    }


    echo json_encode(array(
            "success" => true,
            "data" => $data)
    );
}

function deleteMensajesConsultas()
{
    global $os;
    $id = json_decode(stripslashes($_POST["data"]));

    // se valida que no existan registros en la tabla hija

    $sql = "DELETE FROM amc_proc_solicitud_detalle WHERE id = $id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_planificacion_notificaciones, eliminado exitosamente" : $sql->errorCode()
    ));

}

function envioMensajesConsultas()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = $_POST;

    $id = (isset($data["id"])) ? $data["id"] : '';
    $id_solicitud = (isset($data["id_solicitud"])) ? $data["id_solicitud"] : '';
    $contenido = (isset($data["contenido"])) ? $data["contenido"] : '';
    $estado_envio = (isset($data["estado_envio"])) ? $data["estado_envio"] : '';


    // envio de mensaje
    $result = $os->db->conn->query("SELECT nombres, apellidos FROM  amc_proc_solicitud_informacion WHERE id = '" .$id_solicitud . "';");
    $row = $result->fetch(PDO::FETCH_ASSOC) ;
    $nombre  = $row['nombres'] . " " . $row['nombres'];

    $fecha = date("F j, Y, g:i a");

    $contenidoMailRecepcion = getmensajeSolicitudInformacionReceptada($nombre , $fecha, $contenido);

    // envio email al encargado del negocio

    $email = $data->correoelectronico;
    $asunto = "Nueva Solicitud de Informcación, " . " - " . $email;

    $funcionarios = ["tanya.ortega@quito.gob.ec", "francisco.collaguazo@quito.gob.ec"];

    $funcionariosSeguimiento = ["byron.herrera@quito.gob.ec" , "nelly.carrera@quito.gob.ec"];

    $from = 'Solicitud de Información - Agencia Metropolitana de Control';
    // activar envio de correos de prueba
    $prueba = false;
    $resultado = enviarEmailAmc($email, $asunto, $contenidoMailRecepcion, $funcionarios, $funcionariosSeguimiento, $from , $prueba);

    // luego de enviar el mensaje se actualiza $estado envi
    if ($estado_envio != 'Enviado')
        $sql = "UPDATE amc_proc_solicitud_detalle SET estado_envio = 'Enviado',  fecha_envio = NOW()
                WHERE id = '$id';";
    $log = $sql;
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Actualizado exitosamente" : $sql->errorCode(),
        "data" => $data
    ));

    // genero archivo de log
    $fichero = 'consultas_ciudadanas.log';
    $actual = file_get_contents($fichero);
    $actual .= $os->get_member_id() . "\n" . $log . "\n\n";
    file_put_contents($fichero, $actual);
}


switch ($_GET['operation']) {
    case 'select' :
        selectMensajesConsultas();
        break;
    case 'insert' :
        insertMensajesConsultas();
        break;
    case 'update' :
        updateMensajesConsultas();
        break;
    case 'delete' :
        deleteMensajesConsultas();
        break;
    case 'selectForm' :
        selectMensajesConsultasForm();
        break;
    case 'grabarDetalle' :
        aprobar();
        break;
    case 'envioMensajesConsultas' :
        envioMensajesConsultas();
        break;
}


function aprobar()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = $_POST;

    $secretariaRespeusta = (isset($data["secretaria_sitra_respuesta"])) ? $data["secretaria_sitra_respuesta"] : '';
    $secretariaObservacion = (isset($data["secretaria_observacion"])) ? $data["secretaria_observacion"] : '';
    $id = $data["id"];

    $sql = "UPDATE amc_proc_solicitud_detalle SET secretaria_sitra_respuesta='$secretariaRespeusta', 
            secretaria_observacion='$secretariaObservacion'
            WHERE id = '$id';";
    $log = $sql;
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Actualizado exitosamente" : $sql->errorCode(),
        "data" => $data
    ));

    // genero archivo de log
    $fichero = 'consultas_ciudadanas.log';
    $actual = file_get_contents($fichero);
    $actual .= $os->get_member_id() . "\n" . $log . "\n\n";
    file_put_contents($fichero, $actual);
}


function getmensajeSolicitudInformacionReceptada($nombre = '', $fecha = '', $contenido = "")
{
    $texto = '<div style="font-family: Arial, Helvetica, sans-serif;">
                <div style="float: right; clear: both; width: 100%;"><img style="float: right;" src="http://agenciadecontrol.quito.gob.ec/images/logoamc.png" alt="" width="30%" /></div>
                <div style="clear: both; margin: 50px 10%; float: left;">
                <p><br><br>
                 Estimado, ' . $nombre . ' .<br>
                <br>
                ' . $contenido . '
                <br>    
                <p>Fecha : ' . $fecha . '</p>
                <p>Atentamente </p>
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



function cors()
{

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin:*");
        //header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        exit(0);
    }

}

function totalpedidos($cedula)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $sql = "SELECT COUNT(*) AS total FROM amc_proc_solicitud_detalle WHERE cedula = '$cedula'";
    $nombre = $os->db->conn->query($sql);

    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['total'];
}


function getEstadoOriginal($id)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    if ($id != '') {
        $sql = "SELECT *
            FROM amc_proc_solicitud_detalle WHERE id = " . $id;
        $nombre = $os->db->conn->query($sql);
        $rowData = $nombre->fetch(PDO::FETCH_ASSOC);
        return $rowData;
    } else
        return '* No asignado';
}
