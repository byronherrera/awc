<?php
require_once '../../../../server/os.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}


function selectConsultaciudadana()
{
    global $os;

    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_proc_solicitud_informacion ORDER BY FIELD(secretaria_estado,  'En proceso', 'Emitido', 'Finalizado'), fecha";

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
    if ($data->secretaria_estado == 'En proceso') {
        $data->secretaria_fecha_inicio = date('Y-m-d H:i:s');
        $cadenaSql .= ", secretaria_fecha_inicio = '". $data->secretaria_fecha_inicio ."'";
        $data->secretaria_id_secretaria = $os->get_member_id();
        $cadenaSql .= ", secretaria_id_secretaria = '". $data->secretaria_id_secretaria ."'";
    }

    if ($data->secretaria_estado == 'Finalizado') {
        $data->secretaria_fecha_finalizado = date('Y-m-d H:i:s');
        $cadenaSql .= ", secretaria_fecha_finalizado = '". $data->secretaria_fecha_finalizado ."' ";
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


/*function deleteConsultaciudadana()
{
    global $os;
    $id = json_decode(stripslashes($_POST["data"]));
    $sql = "DELETE FROM amc_proc_solicitud_informacion WHERE id=$id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Registro, eliminado exitosamente" : $sql->errorCode()
    ));
}*/

function selectConsultaciudadanaForm()
{
    global $os;
    $id = (int)$_POST ['id'];
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_proc_solicitud_informacion WHERE id = $id";
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
    $data['totalallanamiento'] = totalpedidos($data['cedula']);

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

    case 'negarDenuncia' :
        negar();
        break;
    case 'aprobarDenuncia' :
        aprobar();
        break;
}

function negar()
{
    global $os;

    $id = (int)$_POST ['id'];
    $motivoNegarDenuncia = $_POST ['motivoNegarDenuncia'];

    $sql = "UPDATE amc_proc_solicitud_informacion 
            SET secretaria_procesado='true', secretaria_confirmed='false',secretaria_motivonegar='$motivoNegarDenuncia', secretaria_fecha_procesado =  CURDATE() WHERE (`id`='$id')";
    echo $sql;
    $sql = $os->db->conn->prepare($sql);
    $resultado = $sql->execute();

    //enviar mensaje a usuari
    $mensaje = getmensaje('negar', '', '', '', $motivoNegarDenuncia);
    //   $envioMail = enviarEmail($_POST ['email'], $_POST ['nombre'] . ' ' . $_POST ['apellido'], $mensaje);
    $envioMail = '';
    ////////////////////////
    ///
    if ($resultado) {
        echo json_encode(array(
            "success" => true,
            "msg" => "Contenido actualizado exitosamente " . $envioMail
        ));
    } else {
        echo json_encode(array(
            "success" => false,
            "msg" => "Error en la base de datos."
        ));
    }

}

function aprobar()
{
    global $databaseAMC;
    $id = (int)$_POST ['id'];
    $codigo_tramite = $_POST ['codigo_tramite'];
    $databaseAMC->Query("UPDATE amc_denuncias_web SET asignado='Secretaria' WHERE (`id`='$id')");
    $databaseAMC->Query("UPDATE amc_denuncias_web SET codigo_tramite= '$codigo_tramite' WHERE (`id`='$id')");
    $databaseAMC->Query("UPDATE amc_denuncias_web SET confirmed='true' WHERE (`id`='$id')");
    $query = "UPDATE amc_denuncias_web SET prosesado='true' WHERE (`id`='$id')";

    $mensaje = getmensaje('aprobar', $_POST ['nombre'], $codigo_tramite, $id);
    $envioMail = enviarEmail($_POST ['email'], $_POST ['nombre'] . ' ' . $_POST ['apellido'], $mensaje);

    /*
     *                 $email = regresaEmail($funcionario);
                $asunto = "Tarea asignada, " . " - " . $email;
                $funcionarios = ["katherine.montenegro@quito.gob.ec", "andrea.garcia@quito.gob.ec"];
                $funcionariosSeguimiento = ["byron.herrera@quito.gob.ec", "pamela.parreno@quito.gob.ec"];
                $from = 'Planificación - Agencia Metropolitana de Control';
                $prueba = false;
                 enviarEmailAmc($email, $asunto, $mensaje, $funcionarios, $funcionariosSeguimiento, $from, $prueba);

     *
     */

    if ($databaseAMC->Query($query)
    ) {
        echo json_encode(array(
            "success" => true,
            "msg" => "Contenido actualizado exitosamente" . $envioMail
        ));
    } else {
        echo json_encode(array(
            "success" => false,
            "msg" => "Error en la base de datos."
        ));
    }
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
