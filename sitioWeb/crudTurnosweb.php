<?php header('Content-Type: text/html; charset=UTF-8'); ?>
<?php
 
include("mysql.class.php");
$databaseAMC = new MySQL();
cors();
function select()
{
    global $databaseAMC;
    $columnaBusqueda = 'codigo_tramite';
    $where = '';

    if (isset($_POST['filterField'])) {
        $columnaBusqueda = $_POST['filterField'];
    }
    if (isset($_POST['filterText'])) {
        $campo = $_POST['filterText'];
        $campo = str_replace(" ", "%", $campo);
        $where = " WHERE $columnaBusqueda LIKE '%$campo%'";
    }

    if (isset ($_POST['start']))
        $start = $_POST['start'];
    else
        $start = 0;


    if (isset ($_POST['limit']))
        $limit = $_POST['limit'];
    else
        $limit = 50;

    $query = "SELECT * FROM amc_agendar_cita $where ORDER BY id DESC LIMIT $start, $limit";
    if ($databaseAMC->Query($query)
    ) {
        $data = $databaseAMC->RecordsArray();
    } else {
        echo "<p>Query Failed</p>";
        $data = [];
    }
    $query = "SELECT count(*) AS total FROM amc_agendar_cita $where";
    if ($databaseAMC->Query($query)
    ) {
        $row = $databaseAMC->RecordsArray(MYSQL_ASSOC);
        $total = $row[0]['total'];
    } else {
        echo "<p>Query Failed</p>";
        $total = 0 ;
    }
    echo json_encode(array(
            "total" => $total,
            "success" => true,
            "data" => $data)
    );
}

function selectForm()
{
    global $databaseAMC;
    $id = (int)$_POST ['id'];

    $query = "SELECT *, (SELECT COUNT(*) FROM amc_agendar_cita b WHERE b.cedula= a.cedula) as totaldenuncias FROM amc_agendar_cita a WHERE a.id = $id";

    if ($databaseAMC->Query($query)
    ) {
        $data = $databaseAMC->RecordsArray(MYSQL_ASSOC);
    } else {
        echo "<p>Query Failed</p>";
        $data = [];
    }
 
        
        // para el formulario en ext js toca crear una copia.
    $data[0]['urldenuncia2'] = $data[0]['urldenuncia'];
    $data[0]['fecha2'] = $data[0]['fecha'];
    $data[0]['nombre2'] = $data[0]['nombre'];
    $data[0]['apellido2'] = $data[0]['apellido'];
    $data[0]['cedula2'] = $data[0]['cedula'];
    $data[0]['email2'] = $data[0]['email'];
    $data[0]['comentarios2'] = $data[0]['comentarios'];
    $data[0]['id_inspector2'] = $data[0]['id_inspector'];
    $data[0]['id_zonal2'] = $data[0]['id_zonal'];   
    $data[0]['expediente2'] = $data[0]['expediente'];
    $data[0]['telefono2'] = $data[0]['telefono1'];

    $array = explode(" ", $data[0]['fechaasignada']);

    $data[0]['fechaasignada2'] = $array[0];
    if ($array[1])
         $data[0]['horaasignada2'] = substr($array[1],0,5);
     else 
        $data[0]['horaasignada2'] = '';
    echo json_encode(array(
            "success" => true,
            "data" => $data[0])
    );
}
function negar()
{
    global $databaseAMC;

    $id = (int)$_POST ['id'];
    $motivoNegarTurnos =  $_POST ['motivoNegarTurnos'];
    $databaseAMC->Query("UPDATE amc_agendar_cita SET confirmed='false', motivonegar='$motivoNegarTurnos' WHERE (`id`='$id')");
    $query = "UPDATE amc_agendar_cita SET prosesado='true' WHERE (`id`='$id')";

    $mensaje = getmensaje ('negar','', '',$motivoNegarTurnos );
    $envioMail = enviarEmail($_POST ['email'], $_POST ['nombre']. ' '. $_POST ['apellido'], $mensaje);

    if ($databaseAMC->Query($query)) {
        echo json_encode(array(
            "success" => true,
            "msg" => "Contenido actualizado exitosamente ".$envioMail
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

    $id_inspector = (int)$_POST ['id_inspector2'];
    $id_zonal = (int)$_POST ['id_zonal2'];
    $fechaasignada = $_POST ['fechaasignada2'];
    $horaasignada = $_POST ['horaasignada2'];
    $mail_inspector = $_GET ['mail_inspector'];
    $direccion = $_POST ['direccion'];

 
    // comentar  la linea para que no se grabe el estado de la solicitud
    
    $databaseAMC->Query("UPDATE amc_agendar_cita SET prosesado='true' WHERE (`id`='$id')");
    $databaseAMC->Query("UPDATE amc_agendar_cita SET id_inspector='$id_inspector' WHERE (`id`='$id')");
    $databaseAMC->Query("UPDATE amc_agendar_cita SET id_zonal='$id_zonal' WHERE (`id`='$id')");

    $databaseAMC->Query("UPDATE amc_agendar_cita SET fechaasignada='".$fechaasignada." ".$horaasignada.":00' WHERE (`id`='$id')");

    // para realizar pruebas no incluir 
    $query = "UPDATE amc_agendar_cita SET confirmed='true' WHERE (`id`='$id')";

    $inspector=  $_POST ['nombreInspector2'];
    //todo nombre del inspector

    $fecha = $_POST ['fechaasignada2'] . ' ' . $_POST ['horaasignada2'];
 
    $mensaje = getmensaje ('aprobar',$_POST ['nombre']. ' '. $_POST ['apellido'], '', $id, $inspector, $fecha, $direccion);

    // se envia el email al administrado
    $envioMail = enviarEmail($_POST ['email'], $_POST ['nombre']. ' '. $_POST ['apellido'], $mensaje, $mail_inspector);

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

function getmensaje ($opcion , $nombre= '' ,  $id='', $motivo = '' , $nombreInspector = '' , $fechaasignada2 = '', $direccion ){
    switch ($opcion) {
        case 'aprobar' :
            $texto = '<div style="font-family: Arial, Helvetica, sans-serif;">
<div style="float: right; clear: both; width: 100%;"><img style="float: right;" src="http://agenciadecontrol.quito.gob.ec/images/logoamc.png" alt="" width="30%" /></div>
<div style="clear: both; margin: 50px 10%; float: left;">
<p><br><br>
 Estimado <b>'.$nombre. '</b> gracias por escribirnos, su solicitud fue revisada y ha sido ingresada correctamente <br>
 <br>
 Su cita será con el Inspector <b>'. $nombreInspector . '</b>, para el día: <b>'. $fechaasignada2 . '</b>
<p>Dirección: <b>'. $direccion. '<b></p>
<br>    
</p>
<p><b>SUS DATOS ENVIADOS SON:</b></p>

<p>Teléfono: <b>'. $_POST ['telefono1'] . '</b></p>
<p>Cédula: <b>'. $_POST ['cedula'] . '</b></p>

<p>Código Inspección: <b>'. $_POST ['expediente'] . '</b></p>
<p>Comentarios: <b>'. $_POST ['comentarios'] . '</b></p>

<br>
<p></p>
<p>Fecha solicitud: '. $_POST ['fecha'] . ' </p>
<p></p>
<p>QUITO GRANDE OTRA VEZ</p>
</div>
<p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://agenciadecontrol.quito.gob.ec/images/piepagina.png" alt="" width="100%" /></p>
</div>
';
            return $texto;
            break;
        case 'negar' :
            $texto = '<div style="font-family: Arial, Helvetica, sans-serif;">
<div style="float: right; clear: both; width: 100%;"><img style="float: right;" src="http://agenciadecontrol.quito.gob.ec/images/logoamc.png" alt="" width="30%" /></div>
<div style="clear: both; margin: 50px 10%; float: left;">
<p>Estimado  <b>'.$nombre. '</b> gracias por escribirnos, su solicitud no fue aprobada por el siguiente motivo: <br><br> 
<span style="font-weight: bold"> '. $motivo.'</span><br><br> 
Puede volver a pedir turno, ingresando correctamente toda la información solicitada.<br><br>

<br>
</p>
<p>&nbsp;</p>
<p><b>Quito grande otra vez!</b></p>
</div>
<p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://agenciadecontrol.quito.gob.ec/images/piepagina.png" alt="" width="100%" /></p>
</div>';
            return $texto;
            break;
    }
}



switch ($_GET['operation']) {
    case 'select' :
        select();
        break;
    case 'selectForm' :
        selectForm();
        break;
    case 'negarTurnos' :
        negar();
        break;
    case 'aprobarTurnos' :
        aprobar();
        break;
}


function cors() {

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
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

function  enviarEmail ($email, $nombre, $mensaje, $copia = '')
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

    $mail->AddBCC("byron.herrera@quito.gob.ec");
    $mail->AddBCC("pamela.parreno@quito.gob.ec");
    $mail->AddBCC("nelly.carrera@quito.gob.ec");
    $mail->AddBCC("natalia.caicedo@quito.gob.ec");
    $mail->AddBCC("narcisa.andrade@quito.gob.ec");

//Set who the message is to be sent to
    $mail->addAddress($email, $nombre);

//Set the subject line
    $mail->Subject = 'Actualización solicitud de reunión con inspector';

//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
    $mail->msgHTML($mensaje );

//Replace the plain text body with one created manually
    $mail->AltBody = 'Mensaje enviado..';
if ($copia != '')
$mail->AddBCC($copia);

//send the message, check for errors
    if (!$mail->send()) {
        return "Mailer Error: " . $mail->ErrorInfo;
    } else {
        return " Message sent! ";
    }

}   