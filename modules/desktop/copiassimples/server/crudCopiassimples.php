<?php
require_once '../../../../server/os.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}


function selectCopiassimples()
{
    global $os;

    $columnaBusqueda = 'id';
    $where = '';
    if (isset($_POST['filterField'])) {
        $columnaBusqueda = $_POST['filterField'];
    }

    if (isset($_POST['filterText'])) {
        $campo = $_POST['filterText'];
        $campo = str_replace(" ", "%", $campo);
            if ($where == '')
                $where = " WHERE $columnaBusqueda LIKE '%$campo%'";
            else
                $where = $where . " AND $columnaBusqueda LIKE '%$campo%'";

    }
    // paginamiento
    if (isset ($_POST['start']))
        $start = $_POST['start'];
    else
        $start = 0;

    if (isset ($_POST['limit']))
        $limit = $_POST['limit'];
    else
        $limit = 100;

    // ordenamiento
    $orderby = 'ORDER BY CONVERT( amc_secretaria_copias_simples.id,UNSIGNED INTEGER) DESC';
    if (isset($_POST['sort'])) {
        if ($_POST['sort'] == 'id') {
            $orderby = 'ORDER BY CONVERT( id,UNSIGNED INTEGER) DESC';
        } else {
            $orderby = 'ORDER BY ' . $_POST['sort'] . ' ' . $_POST['dir'];
        }
    }

    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_secretaria_copias_simples $where $orderby LIMIT $start, $limit";
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
    $config = new config();
    $url = $config->URLBASE . 'aplicaciones/copias_simples/';

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

    if (strlen($data['archivoexpediente']) > 0) {
        $data['urlexpediente'] = "<a href='" . $url . $data['archivoexpediente'] . "' target='_blank'>Url Expediente</a>";;
    } else {
        $data['urlexpediente'] = '';
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
    $nombre = $_POST ['nombres'] . " " . $_POST ['apellidos'];

    $motivoNegarDenuncia = $_POST ['motivoNegarDenuncia'];
    $observaciones = $_POST ['observaciones'];
    $idingreso = $os->get_member_id();

    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "UPDATE amc_secretaria_copias_simples SET idingreso = $idingreso, observaciones = '$observaciones', procesado = 'true', fechaprocesado = NOW(), asignado = '-', motivo_negar = '$motivoNegarDenuncia' WHERE `id` = $id";
    $result = $os->db->conn->query($sql);

    //enviar mensaje a usuario
    $mensaje = getmensaje('negar', $nombre, '', $motivoNegarDenuncia);

    $envioMail = enviarEmail($_POST ['correoelectronico'], $nombre, $mensaje);

    // envio resultado
    if ($result == true) {
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
    global $os;

    $id = (int)$_POST ['id'];
    $nombre = $_POST ['nombres'] . " " . $_POST ['apellidos'];

    $motivoNegarDenuncia = $_POST ['motivoNegarDenuncia'];
    $observaciones = $_POST ['observaciones'];
    $idingreso = $os->get_member_id();
    $nombreArchivo = "";



    if ($_FILES['archivoexpediente']['name'] != null) {

        $temp_file_name = $_FILES['archivoexpediente']['tmp_name'];
        //$uploaddir = __DIR__ . "..//uploads/";
        $uploaddir = "../../../../aplicaciones/copias_simples/uploads/";

        //$nombreArchivo = $_FILES['archivoexpediente']['name'];
        $nombreArchivo = quitar_tildes($_FILES['archivoexpediente']['name']);

        $vowels = array("[", "]");
        $nombreArchivo = str_replace($vowels, "", $nombreArchivo);
        $today = date("Y-n-j-H-i");

        $uploadfile = $uploaddir . basename($today . '-' . $id . '-' . $nombreArchivo);

        if (move_uploaded_file($temp_file_name, $uploadfile)) {
            //nombre de archivo se usa para guardar en la base la ubicacion del archivo
            $nombreArchivo = "uploads/" . basename($today . '-' . $id . '-' . $nombreArchivo);
        }
    } else {
        //validar que sea declarado el archivo
        echo json_encode(array(
            "success" => false,
            "msg" => "Error falta archivo copia de expediente."
        ));

    }


    $os->db->conn->query("SET NAMES 'utf8'");

    $sql = "UPDATE amc_secretaria_copias_simples SET idingreso = $idingreso, confirmed = 'true',procesado = 'true', 
                    fechaprocesado = NOW(), observaciones = '$observaciones', archivoexpediente = '$nombreArchivo',
                    asignado = 'Secretaria', motivo_negar = '$motivoNegarDenuncia' WHERE `id` = $id";
    $result = $os->db->conn->query($sql);

    //enviar mensaje a usuario
    $mensaje = getmensaje('aprobar', $nombre, $nombreArchivo, $motivoNegarDenuncia);

    $envioMail = enviarEmail($_POST ['correoelectronico'], $nombre, $mensaje);

    // envio resultado
    if ($result == true) {
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

function getmensaje($opcion, $nombre = '', $nombreArchivo = '', $motivo = '')
{
    $config = new config();
    $url = $config->URLBASE . 'aplicaciones/copias_simples/';

    switch ($opcion) {
        case 'negar' :
            $texto = '<div style="font-family: Arial, Helvetica, sans-serif;">
<div style="float: right; clear: both; width: 100%;"><img style="float: right;" src="http://agenciadecontrol.quito.gob.ec/images/logoamc.png" alt="" width="25%" /></div>
<div style="clear: both; margin: 50px 10%; float: left;">
<p>Estimado/a  ' . $nombre . ', gracias por escribirnos, su solicitud no es receptada por el siguiente motivo: <br><br> 
<span style="font-weight: bold"> ' . $motivo . '</span><br><br> 
Una vez resuelto el motivo puede realizar nuevamente una nueva solicitud : <br><br>

<br>
</p>
</br>
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
             Estimado/a ' . $nombre . ', su solicitud fue revisado  y en el siguiente link puede descargar el documento solicitado <br>
             <br>  
             <strong><a href="' . $url . $nombreArchivo . '" target="_blank">Click aquí</a></strong>
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


function enviarEmail($email, $nombre, $mensaje, $funcionarios = '')

{
    $config = new config();

    require '../../../common/Classes/PHPMailer/PHPMailerAutoload.php';
    //Create a new PHPMailer instance
    $mail = new PHPMailer;
    $mail->CharSet = "UTF-8";
    $mail->isSMTP();
    $mail->SMTPDebug = 0;
    $mail->Debugoutput = 'html';

    $mail->Host = 'relay.quito.gob.ec';
    $mail->Port = 25;
    $mail->Username = "agencia.m.control@quito.gob.ec";
    $mail->Password = "12345678";
    $mail->setFrom('agencia.m.control@quito.gob.ec', 'Solicitud Copias Simples - Agencia Metropolitana de Control');

    $mail->AddBCC("byron.herrera@quito.gob.ec");

    $mail->Subject = $nombre;
    $mail->msgHTML($mensaje);
    $mail->AltBody = 'Mensaje enviado';

    // se envia de acuerdo a si es produccion o pruebas
    if ($config->AMBIENTE == "PRODUCCION") {
        $mail->addAddress($email);
        foreach ($funcionarios as $emailfuncionario) {
            $mail->AddCC($emailfuncionario);
        }
    } else {
        $mail->addAddress("byron.herrera@quito.gob.ec");
    }

    $resultado = $mail->send();

    //inicio log copias simples
    $fichero = 'copiasSimplesEnviados.log';
    $actual = file_get_contents($fichero);
    if ($resultado) {
        $actual .= "Enviado -" . date(" Y-m-d ") . "\n----\n";
    } else
        $actual .= "Error-" . date(" Y-m-d ") . "\n----\n";

    $actual .= $email . "\n----\n";
    $actual .= $nombre . "\n----\n";
    $actual .= $mensaje . "\n----\n";
    file_put_contents($fichero, $actual);
    // fin log copias simples
    return $resultado;
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

function totalcopiassimples($cedula)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $sql = "SELECT COUNT(*) AS total FROM amc_secretaria_copias_simples WHERE cedula = '$cedula'";
    $nombre = $os->db->conn->query($sql);

    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['total'];
}

function quitar_tildes($cadena) {
    $no_permitidas= array ("á","é","í","ó","ú","Á","É","Í","Ó","Ú","ñ","À","Ã","Ì","Ò","Ù","Ã™","Ã ","Ã¨","Ã¬","Ã²","Ã¹","ç","Ç","Ã¢","ê","Ã®","Ã´","Ã»","Ã‚","ÃŠ","ÃŽ","Ã”","Ã›","ü","Ã¶","Ã–","Ã¯","Ã¤","«","Ò","Ã","Ã„","Ã‹");
    $permitidas= array ("a","e","i","o","u","A","E","I","O","U","n","N","A","E","I","O","U","a","e","i","o","u","c","C","a","e","i","o","u","A","E","I","O","U","u","o","O","i","a","e","U","I","A","E");
    $texto = str_replace($no_permitidas, $permitidas ,$cadena);
    return $texto;
}