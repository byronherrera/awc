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

    $query = "SELECT * FROM amc_denuncias $where ORDER BY id DESC LIMIT $start, $limit";
    if ($databaseAMC->Query($query)
    ) {
        $data = $databaseAMC->RecordsArray();
    } else {
        echo "<p>Query Failed</p>";
        $data = [];
    }
    $query = "SELECT count(*) AS total FROM amc_denuncias $where";
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

    $query = "SELECT *, (SELECT COUNT(*) FROM amc_denuncias b WHERE b.cedula= a.cedula) as totaldenuncias FROM amc_denuncias a WHERE a.id = $id";

    if ($databaseAMC->Query($query)
    ) {
        $data = $databaseAMC->RecordsArray(MYSQL_ASSOC);
    } else {
        echo "<p>Query Failed</p>";
        $data = [];
    }
    if (isset ($data[0]['croquis']) and $data[0]['croquis']!='')
        $data[0]['croquis'] = "<a href='". $data[0]['croquis']."' target='_blank'>Ver imagen croquis</a>";
    else
        $data[0]['croquis'] = "Sin imagen croquis";


    if (isset ($data[0]['imagencedula']) and $data[0]['imagencedula']!='')
        $data[0]['imagencedula'] = "<a href='". $data[0]['imagencedula']."' target='_blank'>Cédula</a>" ;
    else
        $data[0]['imagencedula'] = "Sin imagen cédula";

    if (isset ($data[0]['imagennombramiento']) and $data[0]['imagennombramiento']!= '')
         $data[0]['imagennombramiento'] = "<a href='". $data[0]['imagennombramiento']."' target='_blank'>Nombramiento</a>" ;

    if (isset ($data[0]['imagenvideo']) and $data[0]['imagenvideo']!='')
        $data[0]['imagenvideo'] = "<a href='". $data[0]['imagenvideo']."' target='_blank'>Fotos</a>" ;
    else
        $data[0]['imagenvideo'] = "Sin imagenes";

    $data[0]['urldenuncia'] = "<a href='http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/".$data[0]['id']."-".$data[0]['nombre']."' target='_blank'>Link denuncia</a>" ;

    if (isset ($data[0]['geoposicionamiento']) and $data[0]['geoposicionamiento']!='')
        $data[0]['geoposicionamiento'] ="<a href=\"http://maps.google.com/?q=".$data[0]['geoposicionamiento']."\" target='_system'=\"\">Abrir mapa</a>";
    else
        $data[0]['geoposicionamiento'] = "Sin coordenadas";

    $data[0]['urldenuncia2'] = $data[0]['urldenuncia'];
    $data[0]['fecha2'] = $data[0]['fecha'];
    $data[0]['nombre2'] = $data[0]['nombre'];
    $data[0]['apellido2'] = $data[0]['apellido'];
    $data[0]['cedula2'] = $data[0]['cedula'];
    $data[0]['email2'] = $data[0]['email'];
    $data[0]['ampliaciondenuncia2'] = $data[0]['ampliaciondenuncia'];
    echo json_encode(array(
            "success" => true,
            "data" => $data[0])
    );
}
function negar()
{
    global $databaseAMC;

    $id = (int)$_POST ['id'];
    $motivoNegarDenuncia =  $_POST ['motivoNegarDenuncia'];
    $databaseAMC->Query("UPDATE amc_denuncias SET confirmed='false', motivonegar='$motivoNegarDenuncia' WHERE (`id`='$id')");
    $query = "UPDATE amc_denuncias SET prosesado='true' WHERE (`id`='$id')";

    $mensaje = getmensaje ('negar','','','',$motivoNegarDenuncia );
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
    $codigo_tramite =  $_POST ['codigo_tramite'];
    $databaseAMC->Query("UPDATE amc_denuncias SET asignado='Secretaria' WHERE (`id`='$id')");
    $databaseAMC->Query("UPDATE amc_denuncias SET codigo_tramite= '$codigo_tramite' WHERE (`id`='$id')");
    $databaseAMC->Query("UPDATE amc_denuncias SET confirmed='true' WHERE (`id`='$id')");
    $query = "UPDATE amc_denuncias SET prosesado='true' WHERE (`id`='$id')";

    $mensaje = getmensaje ('aprobar',$_POST ['nombre'],  $codigo_tramite, $id);
    $envioMail = enviarEmail($_POST ['email'], $_POST ['nombre']. ' '. $_POST ['apellido'], $mensaje);

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

function getmensaje ($opcion , $nombre= '' ,  $codigo_tramite='', $id='', $motivo = '' ){
    switch ($opcion) {
        case 'aprobar' :
            $texto = '<div style="font-family: Arial, Helvetica, sans-serif;">
<div style="float: right; clear: both; width: 100%;"><img style="float: right;" src="http://agenciadecontrol.quito.gob.ec/images/logoamc.png" alt="" width="30%" /></div>
<div style="clear: both; margin: 50px 10%; float: left;">
<p><br><br>
 Estimado ciudadano gracias por escribirnos, su denuncia fue revisada y ha sido ingresada correctamente en nuestro sistema con el código '.$codigo_tramite.'<br>
 <br>
 En el siguiente link, usted  podrá hacer el seguimiento del proceso.<br>
 <a href="http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/'. $id .'-'. $nombre.'" target="_blank">Click aquí</a>
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
        case 'negar' :
            $texto = '<div style="font-family: Arial, Helvetica, sans-serif;">
<div style="float: right; clear: both; width: 100%;"><img style="float: right;" src="http://agenciadecontrol.quito.gob.ec/images/logoamc.png" alt="" width="30%" /></div>
<div style="clear: both; margin: 50px 10%; float: left;">
<p>Estimado usuario gracias por escribirnos, su denuncia no es aprobada por el siguiente motivo: <br><br> 
<span style="font-weight: bold"> '. $motivo.'</span><br><br> 
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
    }
}

correo() ;
function correo()
{
    global $databaseAMC;

    //$id = (int)$_POST ['id'];
//    $motivoNegarDenuncia =  $_POST ['motivoNegarDenuncia'];
//   $databaseAMC->Query("UPDATE amc_denuncias SET confirmed='false', motivonegar='$motivoNegarDenuncia' WHERE (`id`='$id')");
//    $query = "UPDATE amc_denuncias SET prosesado='true' WHERE (`id`='$id')";

    //$mensaje = getmensaje ('negar','','','',$motivoNegarDenuncia );
    $mensaje = getmensaje ('negar','','','','pruebas');
    //$envioMail = enviarEmail($_POST ['email'], $_POST ['nombre']. ' '. $_POST ['apellido'], $mensaje);
    
    $envioMail = enviarEmail('byronherrera@hotmail.com',  ' '. 'herrera', $mensaje);
    
   /* if ($databaseAMC->Query($query)) {*/
        echo json_encode(array(
            "success" => true,
            "msg" => "Contenido actualizado exitosamente ".$envioMail
        ));
    /*} else {
        echo json_encode(array(
            "success" => false,
            "msg" => "Error en la base de datos."
        ));
    }*/

    //enviar mensaje a usuario


}

/*switch ($_GET['operation']) {
    case 'select' :
        select();
        break;
    case 'selectForm' :
        selectForm();
        break;
    case 'negarDenuncia' :
        negar();
        break;
    case 'aprobarDenuncia' :
        aprobar();
        break;
}*/


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

function  enviarEmail ($email, $nombre, $mensaje)
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
    $mail->Username = "herrera.byron@gmail.com";
//Password to use for SMTP authentication
    $mail->Password = "9number1010HHHH";

//Set who the message is to be sent from
    $mail->setFrom('herrera.byron@gmail.com', 'Agencia Metropolitana de Control');

//Set an alternative reply-to address
//$mail->addReplyTo('replyto@example.com', 'First Last');

//Set who the message is to be sent to
    $mail->addAddress($email, $nombre);

//Set the subject line
    $mail->Subject = 'Actualización estado de denuncia';

//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
    $mail->msgHTML($mensaje );

//Replace the plain text body with one created manually
    $mail->AltBody = 'Mensaje enviado';

//send the message, check for errors
    if (!$mail->send()) {
        return "Mailer Error: " . $mail->ErrorInfo;
    } else {
        return "Message sent!";
    }

}