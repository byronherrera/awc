<?php



echo json_encode(array(
    "success" => true,
    "msg" =>  "insertado exitosamente"
));

/*echo json_encode(array(
    "success" => true,
    "msg" => $sql->errorCode() == 0 ? "insertado exitosamente" : $sql->errorCode(),
    "data" => array($data)
));
*/

//flujo(6);
//require_once '../../../common/Classes/funciones.php';



function flujo($id)
{
    $encargadoMonitoreo = 'byron.herrera@romsegroup.com';
    $data = getDataId($id);
    $etapa = $data['etapa'];
    $area = $data['departamento'];
    $flujo = getDataFlujo($area);
    $usuarioData = getUsuario($flujo['idusuarioetapa1']);
    //TODO crear validaciones

    switch ($etapa) {
        case "0":
            $contenidoMailPersona = getmensajeSolicitud($data['negocio'], $data);
            $envioMail = enviarEmail($data['emailConcesionario'], $data['negocio'], $contenidoMailPersona,$encargadoMonitoreo , '');
            //TODO validar en caso que email no se envie


            $contenidoMailAutorizacion1 = getmensajeEtapa($usuarioData['nombre'] . " - encargado de aprobacion de etapa", $data);
            $envioMail = enviarEmail($usuarioData['email'], $data['negocio'], $contenidoMailAutorizacion1, $encargadoMonitoreo, '');
            //TODO validar en caso que email no se envie

            echo $envioMail;

            echo $contenidoMailAutorizacion1;
            break;
        case "1":
            echo $etapa;
            break;
        case "2":
            echo $etapa;
            break;
    }

}

// funciones recupera informacion
function getDataFlujo($area)
{
    global $os;

    $sql = "SELECT * FROM invede_flujos WHERE nombre = '$area';";

    $result = $os->db->conn->query($sql);
    $resultado = $result->fetchAll(PDO::FETCH_ASSOC);

    return $resultado[0];
}
function getUsuario($id)
{
    global $os;

    $sql = "SELECT * FROM invede_usuarios WHERE id = '$id';";

    $result = $os->db->conn->query($sql);
    $resultado = $result->fetchAll(PDO::FETCH_ASSOC);

    return $resultado[0];
}
function getDataId($id)
{
    global $os;

//    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM invede_tramites WHERE id = '$id';";

    $result = $os->db->conn->query($sql);
    $resultado = $result->fetchAll(PDO::FETCH_ASSOC);

    return $resultado[0];
}
// fin funciones recupera informacion


//tipos de mensajes
function getmensajeSolicitud($nombre = '', $data)
{
    $texto = '<div style="font-family: Arial, Helvetica, sans-serif;">
                <div style="float: right; clear: both; width: 100%;"><img style="float: right;" src="http://www.romsegroup.com/invede-dev/img/logo-jardin.png" alt="" width="30%" /></div>
                <div style="clear: both; margin: 50px 10%; float: left;">
                <p><br><br>
                 Estimado <b>' . $nombre . '</b>  <br>
                <br>    
                </p>
                <p><b>LOS DATOS ENVIADOS SON:</b></p>
                <br>
                <p></p>
                <p>Concesionario: . ' . $data['negocio'] . ' .  </p>
                <p>Fecha solicitud: . ' . $data['fecha'] . ' .  </p>
                <p>Fecha trabajo: . ' . $data['fechaTrabajo'] . ' .  </p>
                <p>Duracion : . ' . $data['duracion']  . ' horas.  </p>
                <p>Representante : . ' . $data['concesionario'] . ' .  </p>
                <p>Email Concesionario : . ' . $data['emailConcesionario'] . ' .  </p>
                <p>Persona autorizada 1 : . ' . $data['nombre1'] . ', ' . $data['cedula1'] . ' .  </p>
                <p>Persona autorizada 2 : . ' . $data['nombre2'] . ', ' . $data['cedula2'] . ' .  </p>
                <p>Persona autorizada 3 : . ' . $data['nombre3'] . ', ' . $data['cedula3'] . ' .  </p>
                <p>Persona autorizada 4 : . ' . $data['nombre4'] . ', ' . $data['cedula4'] . ' .  </p>
                <p>Persona autorizada 5 : . ' . $data['nombre5'] . ', ' . $data['cedula5'] . ' .  </p>
                <p>Persona autorizada 6 : . ' . $data['nombre6'] . ', ' . $data['cedula6'] . ' .  </p>
                <p></p>
                ';
    return $texto;
}

function getmensajeEtapa($nombre = '', $data)
{

    $texto = '<div style="font-family: Arial, Helvetica, sans-serif;">
                <div style="float: right; clear: both; width: 100%;"><img style="float: right;" src="http://www.romsegroup.com/invede-dev/img/logo-jardin.png" alt="" width="30%" /></div>
                <div style="clear: both; margin: 50px 10%; float: left;">
                <p><br><br>
                 Estimado <b>' . $nombre . '</b>  <br>
                <br>    
                </p>
                <p><b>LOS DATOS ENVIADOS SON:</b></p>
                <br>
                <p></p>
                <p>Concesionario: . ' . $data['negocio'] . ' .  </p>
                <p>Fecha solicitud: . ' . $data['fecha'] . ' .  </p>
                <p>Fecha trabajo: . ' . $data['fechaTrabajo'] . ' .  </p>
                <p>Duracion : . ' . $data['duracion']  . ' horas.  </p>
                <p>Representante : . ' . $data['concesionario'] . ' .  </p>
                <p>Email Concesionario : . ' . $data['emailConcesionario'] . ' .  </p>
                <p>Persona autorizada 1 : . ' . $data['nombre1'] . ', ' . $data['cedula1'] . ' .  </p>
                <p>Persona autorizada 2 : . ' . $data['nombre2'] . ', ' . $data['cedula2'] . ' .  </p>
                <p>Persona autorizada 3 : . ' . $data['nombre3'] . ', ' . $data['cedula3'] . ' .  </p>
                <p>Persona autorizada 4 : . ' . $data['nombre4'] . ', ' . $data['cedula4'] . ' .  </p>
                <p>Persona autorizada 5 : . ' . $data['nombre5'] . ', ' . $data['cedula5'] . ' .  </p>
                <p>Persona autorizada 6 : . ' . $data['nombre6'] . ', ' . $data['cedula6'] . ' .  </p>
                <p></p>
                </div>
	                <div style="clear: both; margin: 50px 10%; float: left; text-align: center;">
						  <div class="hijo" style="display: block; width: 250px; height: 60px; padding: 25px 0 0 0; margin: 0 auto; background: #4682B4;  
						  background: -moz-linear-gradient(top, #87CEEB 0%, #4682B4 100%); background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#87CEEB), 
						  color-stop(100%,#4682B4));box-shadow: inset 0px 0px 6px #fff;  -webkit-box-shadow: inset 0px 0px 6px #fff; border: 1px solid #62C2F9; border-radius: 10px;  display: inline-block; "> 
						  <a href="http://romsegroup.com/invede-dev/accion.php?id='. $data['id']. '&accion=aprobar" style="font-size: 24px; text-decoration: none; color: white;" target="_blank">Aprobar</a></div>

						  <div class="hijo" style="display: block; width: 250px; height: 60px; padding: 25px 0 0 0; margin: 0 auto; background: #4682B4;  
						  background: -moz-linear-gradient(top, #87CEEB 0%, #4682B4 100%); background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#87CEEB), 
						  color-stop(100%,#4682B4));box-shadow: inset 0px 0px 6px #fff;  -webkit-box-shadow: inset 0px 0px 6px #fff; border: 1px solid #62C2F9; border-radius: 10px;  display: inline-block; "> 
						  <a href="http://romsegroup.com/invede-dev/accion.php?id='. $data['id']. '&accion=negar" style="font-size: 24px; text-decoration: none; color: white;" target="_blank">Negar</a></div>
						  
	                </div>
                </div>
                ';
    return $texto;
}

function getmensajeSolicitudAprobada($nombre = '', $data)
{
    $texto = '<div style="font-family: Arial, Helvetica, sans-serif;">
                <div style="float: right; clear: both; width: 100%;"><img style="float: right;" src="http://www.romsegroup.com/invede-dev/img/logo-jardin.png" alt="" width="30%" /></div>
                <div style="clear: both; margin: 50px 10%; float: left;">
                <p><br><br>
                 Estimado <b>' . $nombre . '</b> gracias por escribirnos, su solicitud fue aprobada  <br>
                <br>    
                </p>
                <p><b>SUS DATOS ENVIADOS SON:</b></p>
                <br>
                <p></p>
                <p>Concesionario: . ' . $data['negocio'] . ' .  </p>
                <p>Fecha solicitud: . ' . $data['fecha'] . ' .  </p>
                <p>Fecha trabajo: . ' . $data['fechaTrabajo'] . ' .  </p>
                <p>Duracion : . ' . $data['duracion'] . ' horas.  </p>
                <p>Representante : . ' . $data['concesionario'] . ' .  </p>
                <p>Email Concesionario : . ' . $data['emailConcesionario'] . ' .  </p>
                <p>Persona autorizada 1 : . ' . $data['nombre1'] . ', ' . $data['cedula1'] . ' .  </p>
                <p>Persona autorizada 2 : . ' . $data['nombre2'] . ', ' . $data['cedula2'] . ' .  </p>
                <p>Persona autorizada 3 : . ' . $data['nombre3'] . ', ' . $data['cedula3'] . ' .  </p>
                <p>Persona autorizada 4 : . ' . $data['nombre4'] . ', ' . $data['cedula4'] . ' .  </p>
                <p>Persona autorizada 5 : . ' . $data['nombre5'] . ', ' . $data['cedula5'] . ' .  </p>
                <p>Persona autorizada 6 : . ' . $data['nombre6'] . ', ' . $data['cedula6'] . ' .  </p>
                <p></p>
                </div>
                
                
                </div>
                ';
    return $texto;
}

function getmensajeSolicitudNegada($nombre = '', $data)
{
    $texto = '<div style="font-family: Arial, Helvetica, sans-serif;">
                <div style="float: right; clear: both; width: 100%;"><img style="float: right;" src="http://www.romsegroup.com/invede-dev/img/logo-jardin.png" alt="" width="30%" /></div>
                <div style="clear: both; margin: 50px 10%; float: left;">
                <p><br><br>
                 Estimado <b>' . $nombre . '</b> Su solicitud fue negada  <br>

                <br>
                Por el siguiente  motivo    
                </p>
                <p><b>SUS DATOS ENVIADOS SON:</b></p>
                <br>
                <p></p>
                <p>Concesionario: . ' . $data['negocio'] . ' .  </p>
                <p>Fecha solicitud: . ' . $data['fecha'] . ' .  </p>
                <p>Fecha trabajo: . ' . $data['fechaTrabajo'] . ' .  </p>
                <p>Duracion : . ' . $data['duracion']  . ' horas.  </p>
                <p>Representante : . ' . $data['concesionario'] . ' .  </p>
                <p>Email Concesionario : . ' . $data['emailConcesionario'] . ' .  </p>
                <p>Persona autorizada 1 : . ' . $data['nombre1'] . ', ' . $data['cedula1'] . ' .  </p>
                <p>Persona autorizada 2 : . ' . $data['nombre2'] . ', ' . $data['cedula2'] . ' .  </p>
                <p>Persona autorizada 3 : . ' . $data['nombre3'] . ', ' . $data['cedula3'] . ' .  </p>
                <p>Persona autorizada 4 : . ' . $data['nombre4'] . ', ' . $data['cedula4'] . ' .  </p>
                <p>Persona autorizada 5 : . ' . $data['nombre5'] . ', ' . $data['cedula5'] . ' .  </p>
                <p>Persona autorizada 6 : . ' . $data['nombre6'] . ', ' . $data['cedula6'] . ' .  </p>
                <p></p>
                </div>
                
                
                </div>
                ';
    return $texto;
}
// fin tipos de mensajes

// funcion envio email
function enviarEmail($email, $nombre, $mensaje, $mail_administrador, $nombreArchivo)
{

    require_once 'admin/modules/common/Classes/PHPMailer/PHPMailerAutoload.php';

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
    $mail->Host = 'mail.raulacostar.com';
    $mail->Port = 25;

//Set the encryption system to use - ssl (deprecated) or tls
    //  $mail->SMTPSecure = 'tls';

//Whether to use SMTP authentication
    $mail->SMTPAuth = true;

//Username to use for SMTP authentication - use full email address for gmail
//$mail->Username = "byron.herrera@solinfo.com.ec";
    $mail->Username = "invede@raulacostar.com";

//Password to use for SMTP authentication
    $mail->Password = '\LFZ"Cs}6}F^EzR';

//Set who the message is to be sent from
    $mail->setFrom($mail_administrador, 'Mall el Jardín - Registro de trabajos');

//Set an alternative reply-to address
//$mail->addReplyTo('replyto@example.com', 'First Last');

//Set who the message is to be sent to
    $mail->addAddress($email, $nombre);

    $mail->addAddress($mail_administrador, $nombre);
    // agregamos copias para seguimiento en etapa de pruebas

    $mail->AddBCC("byron.herrera@romsegroup.com");
    $mail->AddBCC("pabloromans@romsegroup.com");

//Set the subject line
    $mail->Subject = 'Solicitud de trabajos.';

//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
    $mail->msgHTML($mensaje);

//Replace the plain text body with one created manually
    $mail->AltBody = 'Mensaje enviado..';

//    $mail->addAttachment("formularios/" . $nombreArchivo);

//send the message, check for errors
    if (!$mail->send()) {
        return "Mailer Error: " . $mail->ErrorInfo;
    } else {
        return "Message sent!";
    }
}

