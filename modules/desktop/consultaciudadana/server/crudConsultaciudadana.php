<?php
require_once '../../../../server/os.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}


function selectConsultaciudadana()
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
                'cedula',
                'nombres',
                'apellidos',
                'correoelectronico',
                'celular',
                'solicitud',
                'observaciones',
                'fecha',
                'secretaria_sitra_respuesta',
                'secretaria_observacion'
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
        $limit = 50;

    $orderby = 'ORDER BY FIELD(secretaria_estado,  \'En proceso\', \'Emitido\', \'Finalizado\'), fecha';
    if (isset($_POST['sort'])) {
        $orderby = 'ORDER BY ' . $_POST['sort'] . ' ' . $_POST['dir'];
    }


    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_proc_solicitud_informacion $where $orderby LIMIT $start, $limit";

    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }

    $result = $os->db->conn->query("SELECT count(*) AS total FROM amc_proc_solicitud_informacion $where");
    $row = $result->fetch(PDO::FETCH_ASSOC);
    $total = $row['total'];


    echo json_encode(array(
            "total" => $total,
            "success" => true,
            "data" => $data)
    );
}

/*function insertConsultaciudadana()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode(stripslashes($_POST["data"]));

    $sql = "INSERT INTO amc_proc_solicitud_informacion (nombre, activo )
	values('$data->nombre','$data->activo');";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => true,
        "msg" => $sql->errorCode() == 0 ? "insertado exitosamente" : $sql->errorCode(),
        "data" => array(
            array(
                "id" => $os->db->conn->lastInsertId(),
                "nombre" => $data->nombre,
                "activo" => $data->activo
            )
        )
    ));
} */

function updateConsultaciudadana()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);
    if (is_null($data))
        $data = json_decode(stripslashes($_POST["data"]));

    $cadenaSql = '';

    $finalizado = false;

    if ($data->secretaria_estado == 'Emitido') {
        //recuperar valores grabados de secretaria_sitra_respuesta y secretaria_observacion
        $sql = "SELECT secretaria_estado FROM amc_proc_solicitud_informacion WHERE id = '$data->id'";
        $sql = $os->db->conn->query($sql);
        $rownombre = $sql->fetch(PDO::FETCH_ASSOC);
        $secretaria_estado = $rownombre['secretaria_estado'];

        $data->secretaria_estado = $secretaria_estado;

        echo json_encode(array(
            "success" => false,
            "message" => "No permitido",
            "data" => $data
        ));
        return;
    }

    if ($data->secretaria_estado == 'En proceso') {
        $data->secretaria_fecha_inicio = date('Y-m-d H:i:s');
        $cadenaSql .= ", secretaria_fecha_inicio = '" . $data->secretaria_fecha_inicio . "'";
        $data->secretaria_id_secretaria = $os->get_member_id();
        $cadenaSql .= ", secretaria_id_secretaria = '" . $data->secretaria_id_secretaria . "'";
    }

    if ($data->secretaria_estado == 'Finalizado') {
        //recuperar valores grabados de secretaria_sitra_respuesta y secretaria_observacion
        $sql = "SELECT secretaria_sitra_respuesta, secretaria_observacion, secretaria_estado FROM amc_proc_solicitud_informacion WHERE id = '$data->id'";
        $sql = $os->db->conn->query($sql);

        $rownombre = $sql->fetch(PDO::FETCH_ASSOC);
        $secretaria_observacion = $rownombre['secretaria_observacion'];
        $secretaria_sitra_respuesta = $rownombre['secretaria_sitra_respuesta'];
        $secretaria_estado = $rownombre['secretaria_estado'];

        // recuperamos cuando mensajes tienen enviados anteriormente

        $sql = "SELECT COUNT(*) totalenviado FROM `amc_proc_solicitud_detalle` WHERE id_solicitud = '$data->id' AND estado_envio = 'ENVIADO'";
        $sql = $os->db->conn->query($sql);

        $rowEnvios = $sql->fetch(PDO::FETCH_ASSOC);
        $totalEnvios = $rowEnvios['totalenviado'];

        $sql = "SELECT COUNT(*) total FROM `amc_proc_solicitud_detalle` WHERE id_solicitud = '$data->id' ";
        $sql = $os->db->conn->query($sql);

        $rowEnvios = $sql->fetch(PDO::FETCH_ASSOC);
        $total = $rowEnvios['total'];

        if (($total > 0) && ($total == $totalEnvios)) {
            $errorMensajes = false;
        } else {
            $errorMensajes = true;
        }

        if (($errorMensajes) || (strlen($secretaria_observacion) == 0) || (!isset($secretaria_observacion)) || (strlen($secretaria_sitra_respuesta) == 0) || (!isset($secretaria_sitra_respuesta))) {
            $data->secretaria_estado = $secretaria_estado;
            $respueta = '';
            $respueta .= (strlen($secretaria_observacion) == 0) ? 'Observación, ' : '';
            $respueta .= (strlen($secretaria_sitra_respuesta) == 0) ? 'SITRA, ' : '';
            $respueta .= ($errorMensajes) ? 'Mensajes enviados.' : '';

            echo json_encode(array(
                "success" => false,
                "message" => "Faltan: " . $respueta,
                "data" => $data
            ));
            return;
        }

        $data->secretaria_fecha_finalizado = date('Y-m-d H:i:s');
        $cadenaSql .= ", secretaria_fecha_finalizado = '" . $data->secretaria_fecha_finalizado . "' ";

        $finalizado = true;
    }

    $sql = "UPDATE amc_proc_solicitud_informacion SET secretaria_estado='$data->secretaria_estado' $cadenaSql WHERE id = '$data->id';";
    $log = $sql;
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Actualizado exitosamente" : $sql->errorCode(),
        "data" => $data,
        "finalizado" => $finalizado
    ));

    // genero archivo de log
    $fichero = 'consultas_ciudadanas.log';
    $actual = file_get_contents($fichero);
    $actual .= $os->get_member_id() . "\n" . $log . "\n\n";
    file_put_contents($fichero, $actual);

}


function selectConsultaciudadanaForm()
{
    global $os;
    $id = (int)$_POST ['id'];
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_proc_solicitud_informacion a WHERE id = $id";
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
    $data['totalconsultaciudadana'] = totalpedidos($data['cedula']);

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

switch ($_GET['operation']) {
    case 'select' :
        selectConsultaciudadana();
        break;
    case 'insert' :
        insertConsultaciudadana();
        break;
    case 'update' :
        updateConsultaciudadana();
        break;
    case 'delete' :
        deleteConsultaciudadana();
        break;
    case 'selectForm' :
        selectConsultaciudadanaForm();
        break;


    case 'grabarDetalle' :
        aprobar();
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

    $sql = "UPDATE amc_proc_solicitud_informacion SET secretaria_sitra_respuesta='$secretariaRespeusta', 
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

function getmensaje($opcion, $nombre = '', $codigo_tramite = '', $id = '', $motivo = '')
{
    switch ($opcion) {
        case 'negar' :
            $texto = '<div style="font-family: Arial, Helvetica, sans-serif;">
<div style="float: right; clear: both; width: 100%;"><img style="float: right;" src="http://agenciadecontrol.quito.gob.ec/images/logoamc.png" alt="" width="30%" /></div>
<div style="clear: both; margin: 50px 10%; float: left;">
<p>Estimado usuario gracias por escribirnos, su solicitud no es aprobada por el siguiente motivo: <br><br> 
<span style="font-weight: bold"> ' . $motivo . '</span><br><br> 
Adicionalmente estas son las causas para no aprobar una denuncia: <br><br>

1. Imagen de la cédula, no válida<br>
2. Fotografías anexas a la denunciada no son válidas.<br>
3. En caso de ser una persona jurídica, la  imagen de nombramiento no es válida.<br>
4. La denuncia realizada no se encuentra dentro de las competencias de la Agencia Metropolitana de Control.<br>
5. La informacíon proporcianada como dirección, croquis, mapa, no permite ubicar el sitio de la denuncia<br>
<br>
<br>
</p>
<p>&nbsp;</p>
<p>&iexcl;Trabajamos por la convivencia pac&iacute;fica!</p>
</div>
<p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://agenciadecontrol.quito.gob.ec/images/piepagina.png" alt="" width="100%" /></p>
</div>';
            return $texto;
            break;

        case 'aprobar' :
            $texto = '<div style="font-family: Arial, Helvetica, sans-serif;">
<div style="float: right; clear: both; width: 100%;"><img style="float: right;" src="http://agenciadecontrol.quito.gob.ec/images/logoamc.png" alt="" width="30%" /></div>
<div style="clear: both; margin: 50px 10%; float: left;">
<p><br><br>
 Estimado ciudadano gracias por escribirnos, su denuncia fue revisada y ha sido ingresada correctamente en nuestro sistema con el código ' . $codigo_tramite . '<br>
 <br>
 En el siguiente link, usted  podrá hacer el seguimiento del proceso.<br>
 <a href="http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/' . $id . '-' . $nombre . '" target="_blank">Click aquí</a>
<br>    
<br>
</p>
<p>&nbsp;</p>
<p>&iexcl;Trabajamos por la convivencia pac&iacute;fica!</p>
</div>
<p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://agenciadecontrol.quito.gob.ec/images/piepagina.png" alt="" width="100%" /></p>
</div>
';
            return $texto;
            break;

    }
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

    $sql = "SELECT COUNT(*) AS total FROM amc_proc_solicitud_informacion WHERE cedula = '$cedula'";
    $nombre = $os->db->conn->query($sql);

    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['total'];
}
