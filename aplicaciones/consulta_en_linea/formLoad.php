<?php
require_once '../../server/os.php';
$os = new os();

$opcion = isset($_GET['opcion']) ? $_GET['opcion'] : '';
$usuario = isset($_GET['usuario']) ? $_GET['usuario'] : '';

switch ($opcion) {
    // pedidos dados
    case "actosbioseguridad":
        getactosbioseguridad($usuario);
        break;
    case "actosclausura":
        getactosclausura($usuario);
        break;
    case "dataInstruccion":
        getdataInstruccion($usuario);
        break;
    case "dataResolucion":
        getdataResolucion($usuario);
        break;
    case "dataEjecucion":
        getdataEjecucion($usuario);
        break;
    // fin pedidos datos

    // funciones adicionales
    case "funcionario":
        getFuncionarios();
        break;
    case "ordenanza":
        getOrdenanza();
        break;
    case "idzonal":
        getIdzonal();
        break;
    case "totales":
        getTotales();
        break;
    case "totalesDetalle":
        getTotalesDetalle();
        break;
}
//recupera los datos
function getactosbioseguridad($id)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_sancion_emergencia  WHERE cedula = '$id';";
    $result = $os->db->conn->query($sql);
    $resultados = $result->fetchAll(PDO::FETCH_ASSOC);
    if (count($resultados) > 0) {
        echo json_encode(array(
            "success" => true,
            "data" => $resultados
        ));
    } else {
        echo json_encode(array(
            "success" => false,
            "data" => array()
        ));
    }
}

function getactosclausura($id)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $sql = "SELECT * FROM amc_sancion_emergencia_locales  WHERE cedula = '$id';";

    $result = $os->db->conn->query($sql);
    $resultados = $result->fetchAll(PDO::FETCH_ASSOC);
    if (count($resultados) > 0) {
        echo json_encode(array(
            "success" => true,
            "data" => $resultados
        ));
    } else {
        echo json_encode(array(
            "success" => false,
            "data" => array()
        ));
    }
}

function getdataInstruccion($id)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
// TODO falta declarar
    $sql = "SELECT * FROM amc_expediente  WHERE cedula_ruc = '$id';";



    $result = $os->db->conn->query($sql);
    $resultados = $result->fetchAll(PDO::FETCH_ASSOC);
    if (count($resultados) > 0) {
        echo json_encode(array(
            "success" => true,
            "data" => $resultados
        ));
    } else {
        echo json_encode(array(
            "success" => false,
            "data" => array()
        ));
    }
}

function getdataResolucion($id)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_libro_diario  WHERE cedula_ruc = '$id' AND es_ejecucion = 0 ;";

    $result = $os->db->conn->query($sql);
    $resultados = $result->fetchAll(PDO::FETCH_ASSOC);
    if (count($resultados) > 0) {
        echo json_encode(array(
            "success" => true,
            "data" => $resultados
        ));
    } else {
        echo json_encode(array(
            "success" => false,
            "data" => array()
        ));
    }
}

function getdataEjecucion($id)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $sql = "SELECT * FROM amc_sancion_emergencia  WHERE cedula = '$id';";

    $result = $os->db->conn->query($sql);
    $resultados = $result->fetchAll(PDO::FETCH_ASSOC);
    if (count($resultados) > 0) {
        echo json_encode(array(
            "success" => true,
            "data" => $resultados
        ));
    } else {
        echo json_encode(array(
            "success" => false,
            "data" => array()
        ));
    }
}

// fin de recuperacion de datos
function getFuncionarios()
{

    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT CONCAT(last_name,' ',first_name) AS text, id AS valor FROM `qo_members` WHERE active = 1 ORDER BY text;";

    $result = $os->db->conn->query($sql);
    $resultado = $result->fetchAll(PDO::FETCH_ASSOC);
    if (count($resultado) > 0) {
        echo json_encode(array(
            "success" => true,
            "data" => array($resultado)
        ));

    } else {
        echo json_encode(array(
            "success" => false,
            "data" => array()
        ));
    }
}

function getOrdenanza()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT nombre AS text, id AS valor FROM `amc_ordenanzas` WHERE activo = 1 ORDER BY orden;";

    $result = $os->db->conn->query($sql);
    $resultado = $result->fetchAll(PDO::FETCH_ASSOC);
    if (count($resultado) > 0) {
        echo json_encode(array(
            "success" => true,
            "data" => array($resultado)
        ));

    } else {
        echo json_encode(array(
            "success" => false,
            "data" => array()
        ));
    }
}

function getIdzonal()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $sql = "SELECT nombre AS text, id AS valor FROM `amc_zonas` WHERE activo = 1 and combos = 1 ORDER BY text;";

    $result = $os->db->conn->query($sql);
    $resultado = $result->fetchAll(PDO::FETCH_ASSOC);
    if (count($resultado) > 0) {
        echo json_encode(array(
            "success" => true,
            "data" => array($resultado)
        ));

    } else {
        echo json_encode(array(
            "success" => false,
            "data" => array()
        ));
    }
}

function getTotales()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    header("Access-Control-Allow-Origin: *");

    //  $resultado1 = $result->fetchAll(PDO::FETCH_ASSOC);

    $sql = "SELECT COUNT( id ) valor, DATE_FORMAT( fecha, '%Y-%m-%d' ) texto FROM amc_sancion_emergencia GROUP BY DATE_FORMAT( fecha, '%Y%m%d')";
    $result = $os->db->conn->query($sql);

    $resultado = [];
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $row[] = "1";
        $resultado[] = $row;
    }
    if (count($resultado) > 0) {
        echo json_encode(array(
            "success" => true,
            "data" => array($resultado)
        ));

    } else {
        echo json_encode(array(
            "success" => false,
            "data" => array()
        ));
    }
}

function getTotalesDetalle()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    //  $resultado1 = $result->fetchAll(PDO::FETCH_ASSOC);

    $sql = "SELECT COUNT( id ) valor, DATE_FORMAT( fecha, '%Y-%m-%d' ) texto FROM amc_sancion_emergencia GROUP BY DATE_FORMAT( fecha, '%Y%m%d')";
    $result = $os->db->conn->query($sql);

    $resultado = [];
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {

        //para cada fila calculamos el total por zonal
        $fecha = $row ['texto'];
        $sqlzonal = "SELECT id, nombre, (SELECT COUNT( id ) valor FROM amc_sancion_emergencia  WHERE DATE(fecha) = '$fecha' AND idzonal= amc_zonas.id) total  FROM amc_zonas WHERE combos = 1";
        $resultzonal = $os->db->conn->query($sqlzonal);
        while ($rowzonal = $resultzonal->fetch(PDO::FETCH_ASSOC)) {
            $nombre = str_replace(' ', '', $rowzonal ['nombre']);
            $row[$nombre] = $rowzonal['total'];
        }
        $resultado[] = $row;

    }
    if (count($resultado) > 0) {
        echo json_encode(array(
            "success" => true,
            "data" => array($resultado)
        ));

    } else {
        echo json_encode(array(
            "success" => false,
            "data" => array()
        ));
    }
}

function generaPdf($data)
{


    $objPHPExcel = new Spreadsheet();
    $objPHPExcel
        ->getProperties()
        ->setCreator("Byron Herrera, Mall El Jardin")
        ->setLastModifiedBy('Ecobite')// última vez modificado por
        ->setTitle('Formulario')
        ->setSubject('Ingreso de informacion')
        ->setDescription('Este documento fue generado para Mall El Jardin')
        ->setKeywords('pedido, ingreso, flujo')
        ->setCategory('Ingreso');

    $objPHPExcel->getActiveSheet()->setCellValue('A1', "FORMULARIO LLENADO");
    $objPHPExcel->getActiveSheet()->setCellValue('A2', "Concesionario: " . $data->negocio);
    $objPHPExcel->getActiveSheet()->setCellValue('A3', "Fecha: " . $data->fecha);
    $objPHPExcel->getActiveSheet()->setCellValue('A4', "Fecha Trabajo: " . $data->fechaTrabajo);
    $objPHPExcel->getActiveSheet()->setCellValue('A5', "Duración: " . $data->duracion);
    $objPHPExcel->getActiveSheet()->setCellValue('A6', "Departamento: " . $data->departamento);


    $writer = new Xlsx($objPHPExcel);

# Le pasamos la ruta de guardado
    $nombreArchivo = 'formulario-' . date('Y-m-d-h-i-s') . '.xlsx';
    $writer->save("formularios/" . $nombreArchivo);
}


function getUsuario($id)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT id, CONCAT(first_name, \" \", last_name) AS nombre, email_address as email FROM qo_members  WHERE id = '$id';";

    $result = $os->db->conn->query($sql);
    $resultado = $result->fetchAll(PDO::FETCH_ASSOC);

    return $resultado[0];
}

function getNombreZonal($id)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT nombre FROM amc_zonas  WHERE id = '$id';";

    $result = $os->db->conn->query($sql);
    $resultado = $result->fetchAll(PDO::FETCH_ASSOC);

    return $resultado[0]['nombre'];
}


// fin funciones recupera informacion


//tipos de mensajes
function getmensajeSolicitud($nombre = '', $data)
{
    if ($nombre == '') $nombre = $data['nombres'];
    $texto = '<div style="font-family: Arial, Helvetica, sans-serif;">
                <div style="text-align: center;"><img style="width: 200px;" src="http://www.romsegroup.com/invede-dev/img/logo-jardin-corto.png" alt="" width="30%" /></div>
                <div style="clear: both; margin: 20px 10%; float: left;">
                <h1><span style="font-family:Calibri Light;color:rgb(47,84,150) ">Formulario de solicitudes para arrendatarios</span></h1>
                <h2><span style="font-family:Calibri Light;color:rgb(47,84,150) ">Número ' . $data['id'] . '</span></h2>
                <p  style="font-family:Calibri Light; font-size: 1.3em ">Estimado <strong>' . $nombre . '</strong></p>
                <p style="font-family:Calibri Light;color:rgb(47,84,150);font-size: 1.3em;font-weight: bold">Los datos enviados son:</p>
                <table style="margin: 0 auto;border: 1px solid #1C6EA4; background-color: rgb(241,241,241);   text-align: left;border-collapse: collapse;">
                    <tbody>
                    <tr><td style="font-weight: bolder; font-family:Calibri Light; font-size: 1.2em; border: 1px solid #1C6EA4; background-color: rgb(231,230,230);width: 30% ">Arrendatario:</td>
                        <td style="font-family:Calibri Light; font-size: 1.2em;border: 1px solid #1C6EA4;">' . $data['negocio'] . '</td></tr>
                    <tr><td style="font-weight: bolder; font-family:Calibri Light; font-size: 1.2em; border: 1px solid #1C6EA4; background-color: rgb(231,230,230); ">Administrador:</td>
                        <td style="font-family:Calibri Light; font-size: 1.2em;border: 1px solid #1C6EA4;">' . $data['concesionario'] . '</td></tr>
                    <tr><td style="font-weight: bolder; font-family:Calibri Light; font-size: 1.2em; border: 1px solid #1C6EA4; background-color: rgb(231,230,230); ">Email Administrador:</td>
                        <td style="font-family:Calibri Light; font-size: 1.2em;border: 1px solid #1C6EA4;">' . $data['emailConcesionario'] . '</td></tr>
                    <tr><td style="font-weight: bolder; font-family:Calibri Light; font-size: 1.2em; border: 1px solid #1C6EA4; background-color: rgb(231,230,230); ">Fecha solicitud:</td>
                        <td style="font-family:Calibri Light; font-size: 1.2em;border: 1px solid #1C6EA4;">' . $data['fecha'] . '</td></tr>
                    <tr><td style="font-weight: bolder; font-family:Calibri Light; font-size: 1.2em; border: 1px solid #1C6EA4; background-color: rgb(231,230,230); ">Fecha trabajo:</td>
                        <td style="font-family:Calibri Light; font-size: 1.2em;border: 1px solid #1C6EA4;">' . $data['fechaTrabajo'] . '</td></tr>
                
                    <tr><td style="font-weight: bolder; font-family:Calibri Light; font-size: 1.2em; border: 1px solid #1C6EA4; background-color: rgb(231,230,230); ">Solicitante:</td>
                        <td style="font-family:Calibri Light; font-size: 1.2em;border: 1px solid #1C6EA4;">' . $data['nombres'] . '</td></tr>
                    <tr><td style="font-weight: bolder; font-family:Calibri Light; font-size: 1.2em; border: 1px solid #1C6EA4; background-color: rgb(231,230,230); ">Email Solicitante:</td>
                        <td style="font-family:Calibri Light; font-size: 1.2em;border: 1px solid #1C6EA4;">' . $data['emailSolicitante'] . '</td></tr>
                
                    <tr><td style="font-weight: bolder; font-family:Calibri Light; font-size: 1.2em; border: 1px solid #1C6EA4; background-color: rgb(231,230,230); ">Duración:</td>
                        <td style="font-family:Calibri Light; font-size: 1.2em;border: 1px solid #1C6EA4;">' . $data['duracion'] . ' horas.</td></tr>
                    <tr><td style="font-weight: bolder; font-family:Calibri Light; font-size: 1.2em; border: 1px solid #1C6EA4; background-color: rgb(231,230,230); ">Solicitud:</td>
                        <td style="font-family:Calibri Light; font-size: 1.2em;border: 1px solid #1C6EA4;">' . $data['pedido'] . '</td></tr>
                    <tr><td style="font-weight: bolder; font-family:Calibri Light; font-size: 1.2em; border: 1px solid #1C6EA4; background-color: rgb(231,230,230); ">Archivos Adjuntos:</td>
                        <td style="font-family:Calibri Light; font-size: 1.2em;border: 1px solid #1C6EA4;"><a href="' . $data['anexo'] . '"  target="_blank">' . $data['anexo'] . '</a></td></tr>
                    </tbody>
                </table>
                
                <p style="font-family:Calibri Light;color:rgb(47,84,150);font-size: 1.3em;font-weight: bold" >Personas que ingresarían en caso de ser aceptada la solicitud</p>
                
                <table style="margin: 0 auto; border: 1px solid #1C6EA4; background-color: rgb(241,241,241);   text-align: left;border-collapse: collapse;">
                    <tr><td style="font-weight: bolder; font-family:Calibri Light; font-size: 1.2em; border: 1px solid #1C6EA4; background-color:  rgb(231,230,230); width: 35% ">Persona autorizada 1:</td>
                        <td style="font-family:Calibri Light; font-size: 1.2em;border: 1px solid #1C6EA4;">' . $data['nombre1'] . ', ' . $data['cedula1'] . '</td></tr>
                    <tr><td style="font-weight: bolder; font-family:Calibri Light; font-size: 1.2em; border: 1px solid #1C6EA4; background-color: rgb(231,230,230); ">Persona autorizada 2:</td>
                        <td style="font-family:Calibri Light; font-size: 1.2em;border: 1px solid #1C6EA4;">' . $data['nombre2'] . ', ' . $data['cedula2'] . '</td></tr>
                    <tr><td style="font-weight: bolder; font-family:Calibri Light; font-size: 1.2em; border: 1px solid #1C6EA4; background-color: rgb(231,230,230); ">Persona autorizada 3:</td>
                        <td style="font-family:Calibri Light; font-size: 1.2em;border: 1px solid #1C6EA4;">' . $data['nombre3'] . ', ' . $data['cedula3'] . '</td></tr>
                    <tr><td style="font-weight: bolder; font-family:Calibri Light; font-size: 1.2em; border: 1px solid #1C6EA4; background-color: rgb(231,230,230); ">Persona autorizada 4:</td>
                        <td style="font-family:Calibri Light; font-size: 1.2em;border: 1px solid #1C6EA4;">' . $data['nombre4'] . ', ' . $data['cedula4'] . '</td></tr>
                    <tr><td style="font-weight: bolder; font-family:Calibri Light; font-size: 1.2em; border: 1px solid #1C6EA4; background-color: rgb(231,230,230); ">Persona autorizada 5:</td>
                        <td style="font-family:Calibri Light; font-size: 1.2em;border: 1px solid #1C6EA4;">' . $data['nombre5'] . ', ' . $data['cedula5'] . '</td></tr>
                    <tr><td style="font-weight: bolder; font-family:Calibri Light; font-size: 1.2em; border: 1px solid #1C6EA4; background-color: rgb(231,230,230); ">Persona autorizada 6:</td>
                        <td style="font-family:Calibri Light; font-size: 1.2em;border: 1px solid #1C6EA4;">' . $data['nombre6'] . ', ' . $data['cedula6'] . '</td></tr>
                    </tbody>
                </table>
                </div>
                ';
    return $texto;
}


// fin tipos de mensajes

// funcion envio email
function enviarEmail($email, $nombre, $mensaje, $mailSeguimiento, $data, $textoAdicional = "")
{
    require_once 'admin/modules/common/Classes/PHPMailer/PHPMailerAutoload.php';

    $mail = new PHPMailer(true);
    $mail->Host = "smtp.office365.com";
    $mail->Port = 587;
    $mail->SMTPSecure = '';
    $mail->SMTPAuth = true;
    $mail->SMTPDebug = 2;
    $mail->SMTPDebug = 2;
    $mail->IsHTML(true);
    $mail->CharSet = "UTF-8";

    $mail->Username = " ";
    $mail->Password = ' @ ';

    $mail->setFrom('solicitudes@cccc', 'Mall el Jardín - Registro de trabajos');

    $mail->addAddress($email, $nombre);

    if ($mailSeguimiento != "")
        $mail->addAddress($mailSeguimiento, $nombre);

    $mail->Subject = 'Solicitud de trabajos # ' . $data['id'] . ". $textoAdicional";
    $mail->msgHTML($mensaje);

    $mail->AltBody = 'Mensaje enviado..';

    //send the message, check for errors
    if (!$mail->send()) {
        return "Mailer Error: " . $mail->ErrorInfo;
    } else {
        return "Message sent!";
    }
}

