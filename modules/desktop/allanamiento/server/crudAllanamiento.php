<?php
require_once '../../../../server/os.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}


function selectAllanamiento()
{
    global $os;

    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_proc_reconocimineto_responsabilidad where etapa = 'Secretaria' and estado = 'Asignado' ORDER BY id";
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

function insertAllanamiento()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode(stripslashes($_POST["data"]));

    $sql = "INSERT INTO amc_proc_reconocimineto_responsabilidad (nombre, activo )
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
}

function updateAllanamiento()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);
    if (is_null($data))
        $data = json_decode(stripslashes($_POST["data"]));

    $sql = "UPDATE amc_proc_reconocimineto_responsabilidad SET
            nombre='$data->nombre',
            activo='$data->activo'
	  WHERE amc_proc_reconocimineto_responsabilidad.id = '$data->id' ";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Actualizado exitosamente" : $sql->errorCode()
    ));
}


function deleteAllanamiento()
{
    global $os;
    $id = json_decode(stripslashes($_POST["data"]));
    $sql = "DELETE FROM amc_proc_reconocimineto_responsabilidad WHERE id=$id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Registro, eliminado exitosamente" : $sql->errorCode()
    ));
}

function selectAllanamientoForm()
{
    global $os;
    $id = (int)$_POST ['id'];
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_proc_reconocimineto_responsabilidad WHERE id = $id";
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

    if (strlen($data['imagenasolicitud']) > 0) {
        $link1 = json_decode($data['imagenasolicitud']);
        $data['imagenasolicitud'] = "<a href='aplicaciones/reconocimiento-responsabilidad/" . $link1->archivo1 . "' target='_blank'>Ver solicitud</a>";;
    } else {
        $data['imagenasolicitud'] = '';
    }

    if (strlen($data['imagenaluae']) > 0) {
        $link2 = json_decode($data['imagenaluae']);
        $data['imagenaluae'] = "<a href='aplicaciones/reconocimiento-responsabilidad/" . $link2->archivo2 . "' target='_blank'>Ver LUAE</a>";
    } else {
        $data['imagenaluae'] = '';
    }
    if (strlen($data['imagenactoinicio']) > 0) {
        $link3 = json_decode($data['imagenactoinicio']);
        $data['imagenactoinicio'] = "<a href='aplicaciones/reconocimiento-responsabilidad/" . $link3->archivo3 . "' target='_blank'>Ver Acto de Inicio</a>";
    } else {
        $data['imagenactoinicio'] = '';
    }

    echo json_encode(array(
            "success" => true,
            "data" => $data)
    );
}

switch ($_GET['operation']) {
    case 'select' :
        selectAllanamiento();
        break;
    case 'insert' :
        insertAllanamiento();
        break;
    case 'update' :
        updateAllanamiento();
        break;
    case 'delete' :
        deleteAllanamiento();
        break;
    case 'selectForm' :
        selectAllanamientoForm();
        break;
    case 'devolver' :
        devolver();
        break;
    case 'enviar' :
        enviar();
        break;
}

function devolver()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $usuario = $os->get_member_id();
    $data = json_decode($_POST["data"]);

    $id = (int) $data->id;
    $observacionSitra = (isset($data->observacion_sitra)) ? $data->observacion_sitra : '';

    $sql  = " UPDATE amc_proc_reconocimineto_responsabilidad 
             SET estado = 'Devuelto',
                 observacion_sitra = '$observacionSitra',
                 id_usuario = '$usuario',
                 fecha_procesado = CURDATE()
              WHERE id = '$id'; 
              
              INSERT INTO amc_proc_reconocimineto_responsabilidad_hist (id_proc_rec_resp, etapa, estado, codigo_sitra, obervacion_sitra, fecha_procesado, id_usuario)
              VALUES ('$data->id','$data->etapa', '$data->estado', '$data->codigo_sitra','$data->observacion_sitra',CURDATE(),'$usuario'); ";

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

function enviar()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $usuario = $os->get_member_id();
    $data = json_decode($_POST["data"]);

    $codigoSitra = (isset($data->codigo_sitra)) ? $data->codigo_sitra : '';
    $observacionSitra = (isset($data->observacion_sitra)) ? $data->observacion_sitra : '';

    $sql  = " UPDATE amc_proc_reconocimineto_responsabilidad
             SET etapa = 'Instruccion',
                 estado = 'Enviado',
                 codigo_sitra = '$codigoSitra',
                 observacion_sitra = '$observacionSitra',
                 id_usuario = '$usuario',
                 fecha_procesado = CURDATE()
              WHERE id = '$data->id'; 
              
              INSERT INTO amc_proc_reconocimineto_responsabilidad_hist (id_proc_rec_resp, etapa, estado, codigo_sitra, obervacion_sitra, fecha_procesado, id_usuario)
              VALUES ('$data->id','$data->etapa', '$data->estado', '$data->codigo_sitra','$data->observacion_sitra',CURDATE(),'$usuario'); ";

    $log = $sql;
    $sql = $os->db->conn->prepare($sql)->execute();

    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Actualizado exitosamente" : $sql->errorCode(),
        "data" => $data
    ));

    /*$sqlHist  = " INSERT INTO amc_proc_reconocimineto_responsabilidad_hist (id_proc_rec_resp, etapa, estado, codigo_sitra, obervacion_sitra, fecha_procesado, id_usuario)
              VALUES ('$data->id','$data->etapa', '$data->estado', '$data->codigo_sitra','$data->observacion_sitra',CURDATE(),'$usuario') ";
    $logHist = $sqlHist;
    $sqlHist = $os->db->conn->prepare($sqlHist)->execute();

    echo json_encode(array(
        "success" => $sqlHist->errorCode() == 0,
        "msg" => $sqlHist->errorCode() == 0 ? "Inserccion Historico exitoso" : $sqlHist->errorCode(),
        "data" => $data
    ));*/

    // genero archivo de log
    $fichero = 'allanamiento.log';
    $actual = file_get_contents($fichero);
    $actual .= $os->get_member_id() . "\n" . $log . $logHist . "\n\n";
    file_put_contents($fichero, $actual);

    //$mensaje = getmensaje('aprobar', $_POST ['nombre'], $codigo_tramite, $id);
    //$envioMail = enviarEmail($_POST ['email'], $_POST ['nombre'] . ' ' . $_POST ['apellido'], $mensaje);

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

    /*if ($databaseAMC->Query($query)
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
    }*/
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


function cors() {

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

    $sql = "SELECT COUNT(*) AS total FROM amc_proc_reconocimineto_responsabilidad WHERE cedula = '$cedula'";
    $nombre = $os->db->conn->query($sql);

    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['total'];
}
