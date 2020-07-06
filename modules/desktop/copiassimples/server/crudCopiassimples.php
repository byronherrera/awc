<?php
require_once '../../../../server/os.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}


function selectCopiassimples()
{
    global $os;

    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_secretaria_copias_simples ORDER BY id";
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

function insertCopiassimples()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode(stripslashes($_POST["data"]));

    $sql = "INSERT INTO amc_secretaria_copias_simples (nombre, activo )
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

function updateCopiassimples()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);
    if (is_null($data))
        $data = json_decode(stripslashes($_POST["data"]));

    $sql = "UPDATE amc_secretaria_copias_simples SET
            nombre='$data->nombre',
            activo='$data->activo'
	  WHERE amc_secretaria_copias_simples.id = '$data->id' ";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Actualizado exitosamente" : $sql->errorCode()
    ));
}


function deleteCopiassimples()
{
    global $os;
    $id = json_decode(stripslashes($_POST["data"]));
    $sql = "DELETE FROM amc_secretaria_copias_simples WHERE id=$id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Registro, eliminado exitosamente" : $sql->errorCode()
    ));
}

function selectCopiassimplesForm()
{
    global $os;
    $id = (int)$_POST ['id'];
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_secretaria_copias_simples WHERE id = $id";
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
    $data['totalcopiassimples'] = totalcopiassimples($data['cedula']);

    if (strlen($data['imagenasolicitud']) > 0) {
        $link1 = json_decode($data['imagenasolicitud']);
        $data['imagenasolicitud'] = "<a href='aplicaciones/copias_simples/" . $link1->archivo1 . "' target='_blank'>Ver solicitud</a>";;
    } else {
        $data['imagenasolicitud'] = '';
    }


    echo json_encode(array(
            "success" => true,
            "data" => $data)
    );
}

switch ($_GET['operation']) {
    case 'select' :
        selectCopiassimples();
        break;
    case 'insert' :
        insertCopiassimples();
        break;
    case 'update' :
        updateCopiassimples();
        break;
    case 'delete' :
        deleteCopiassimples();
        break;
    case 'selectForm' :
        selectCopiassimplesForm();
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

    $databaseAMC->Query("UPDATE amc_denuncias_web SET confirmed='false', motivonegar='$motivoNegarDenuncia' WHERE (`id`='$id')");
    $query = "UPDATE amc_denuncias_web SET prosesado='true' WHERE (`id`='$id')";

    $mensaje = getmensaje('negar', '', '', '', $motivoNegarDenuncia);
    $envioMail = enviarEmail($_POST ['email'], $_POST ['nombre'] . ' ' . $_POST ['apellido'], $mensaje);

    if ($databaseAMC->Query($query)) {
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

    //enviar mensaje a usuario


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

function enviarEmail($email, $nombre, $mensaje)
{

    require 'PHPMailer/PHPMailerAutoload.php';

//Create a new PHPMailer instance
    $mail = new PHPMailer;
    $mail->CharSet = "UTF-8";
//Tell PHPMailer to use SMTP
    $mail->isSMTP();

//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
    $mail->SMTPDebug = 0;

//Ask for HTML-friendly debug output
    $mail->Debugoutput = 'html';

//Set the hostname of the mail server
    $mail->Host = 'smtp.gmail.com';
// use
// $mail->Host = gethostbyname('smtp.gmail.com');
// if your network does not support SMTP over IPv6

//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
    $mail->Port = 587;

//Set the encryption system to use - ssl (deprecated) or tls
    $mail->SMTPSecure = 'tls';

//Whether to use SMTP authentication
    $mail->SMTPAuth = true;

//Username to use for SMTP authentication - use full email address for gmail
//$mail->Username = "byron.herrera@solinfo.com.ec";
    $mail->Username = "amcdenuncias@gmail.com";

//Password to use for SMTP authentication
    $mail->Password = "amccontrol2016";

//Set who the message is to be sent from
    $mail->setFrom('denunciasamc@quito.gob.ec', 'Agencia Metropolitana de Control');

//Set an alternative reply-to address
//$mail->addReplyTo('replyto@example.com', 'First Last');

//Set who the message is to be sent to
    $mail->addAddress($email, $nombre);

//Set the subject line
    $mail->Subject = 'Actualización estado de denuncia';

//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
    $mail->msgHTML($mensaje);

//Replace the plain text body with one created manually
    $mail->AltBody = 'Mensaje enviado';

//send the message, check for errors
    if (!$mail->send()) {
        return "Mailer Error: " . $mail->ErrorInfo;
    } else {
        return "Message sent!";
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

function totalcopiassimples($cedula)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $sql = "SELECT COUNT(*) AS total FROM amc_secretaria_copias_simples WHERE cedula = '$cedula'";
    $nombre = $os->db->conn->query($sql);

    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['total'];
}
