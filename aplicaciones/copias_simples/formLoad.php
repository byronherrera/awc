<?php
require_once '../../server/os.php';
$os = new os();


$opcion = isset($_GET['opcion']) ? $_GET['opcion'] : '';
switch ($opcion) {
    case "usuario":
        $usuario = isset($_GET['usuario']) ? $_GET['usuario'] : '';
        getUsuarioExterno($usuario);
        break;
    case "funcionario":
        getFuncionarios();
        break;
    case "idzonal":
        getIdzonal();
        break;
    case "totales":
        getTotales();
        break;

    case "ingreso":
        // graba en base de datos
        $data = ingresaNuevoProceso();
        //    generaPdf ($data);
        // codigo futuro funcionamiento
        /*        $id = $data->id;
        $data = getDataId($id);
        $etapa = $data['etapa'];
        $area = $data['departamento'];
        $flujo = getDataFlujo($area);
        $usuarioData = getUsuario($flujo['idusuarioetapa1']);
        $usuarioDataSeguimiento = getUsuario($flujo['usurioscopiaetapa1']);
        $usuarioDataSeguimiento2 = getUsuario($flujo['usurioscopiaetapa2']);
        $usuarioDataFin = getUsuario($flujo['idusuariofinal']);


        // etapa 0
        // 1 se envia email a la persona que realiza la solicitud
        $contenidoMailPersona = getmensajeSolicitud($data['nombres'], $data);
        // envio email al encargado del negocio
        $envioMail = enviarEmail($data['emailConcesionario'], $data['concesionario'], $contenidoMailPersona, "", $data);
        // envio email al encargado del negocio
        $envioMail = enviarEmail($data['emailSolicitante'], $data['nombres'], $contenidoMailPersona, "", $data);
        //TODO validar en caso que email no se envie

        // 2 se envia email a la persona que realiza la aprobación de la solicitud

        // se cambia los estados para la etapa 0
        $retorno = setDataIdEtapa0($id);
        $data['etapa'] = 1;
        $contenidoMailAutorizacion1 = getmensajeEtapa($usuarioData['nombre'] . " - encargado de aprobacion de etapa 1", $data);

        $envioMail = enviarEmail($usuarioData['email'], $data['negocio'], $contenidoMailAutorizacion1, $usuarioDataSeguimiento['email'], $data, " Aprobación Etapa 1");
        //TODO validar en caso que email no se envie
        */
        break;
    case "aprobar":
        // recuperamos variables
        $id = isset($_GET['id']) ? $_GET['id'] : '';
        $accion = isset($_GET['accion']) ? $_GET['accion'] : '';
        $motivo = isset($_POST['observacion']) ? $_POST['observacion'] : '';
        $etapaActual = isset($_GET['etapa']) ? $_GET['etapa'] : '';

        $data = getDataId($id);
        $etapa = $data['etapa'];
        $area = $data['departamento'];
        $flujo = getDataFlujo($area);
        $usuarioDataSeguimiento2 = getUsuario($flujo['usurioscopiaetapa2']);
        $usuarioDataFin = getUsuario($flujo['idusuariofinal']);

        if ($etapaActual != $etapa) {
            echo json_encode(array(
                "success" => false,
                "msg" => "Etapa ya aprobada"
            ));
            return;
        }

        if ($etapa == 1) {
            if ($flujo['etapas'] == 2) {
                // 2 se envia email a la persona que realiza la aprobación de la solicitud
                $usuarioData = getUsuario($flujo['idusuarioetapa2']);

                $retorno = setDataIdEtapa1($id, $accion, $motivo);
                $data['etapa'] = 2;
                $contenidoMailAutorizacion1 = getmensajeEtapa($usuarioData['nombre'] . " - encargado de aprobacion de etapa", $data);
                $envioMail = enviarEmail($usuarioData['email'], $data['negocio'], $contenidoMailAutorizacion1, $usuarioDataSeguimiento2['email'], $data, " Aprobación Etapa 2");


            } else {
                // dependiendo si se aprueba o niega se envia el correo al nombres
                if ($accion == 'aprobar') {
                    $contenidoMailAutorizacion2 = getmensajeSolicitudAprobada($data['negocio'], $data);
                    $estado = " APROBADO ";

                } else {
                    $contenidoMailAutorizacion2 = getmensajeSolicitudNegada($data['negocio'], $data);
                    $estado = " NEGADO ";

                }

                $retorno = setDataIdEtapa12($id, $accion, $motivo);

                $envioMail = enviarEmail($data['emailConcesionario'], $data['negocio'], $contenidoMailAutorizacion2, $usuarioDataFin['email'], $data, $estado);
                $envioMail = enviarEmail($data['emailSolicitante'], $data['nombres'], $contenidoMailAutorizacion2, "", $data, $estadoa);

            }
        }
        if ($etapa == 2) {
            // dependiendo si se aprueba o niega se envia el correo al nombres
            if ($accion == 'aprobar') {
                $contenidoMailAutorizacion2 = getmensajeSolicitudAprobada($data['negocio'], $data);
                $estado = " APROBADO ";
            } else {
                $contenidoMailAutorizacion2 = getmensajeSolicitudNegada($data['negocio'], $data);
                $estado = " NEGADO ";
            }

            $retorno = setDataIdEtapa2($id, $accion, $motivo);

            $envioMail = enviarEmail($data['emailConcesionario'], $data['negocio'], $contenidoMailAutorizacion2, $usuarioDataFin['email'], $data, $estado);
            $envioMail = enviarEmail($data['emailSolicitante'], $data['nombres'], $contenidoMailAutorizacion2, "", $data, $estado);

        }
        echo json_encode(array(
            "success" => true,
            "msg" => "Acción Enviada "
        ));
        break;
}


function getUsuarioExterno($id)
{
    global $os;


    $sql = "SELECT * FROM amc_sancion_emergencia_locales  WHERE cedula = '$id'  limit 1;";
    $result = $os->db->conn->query($sql);
    $resultado = $result->fetchAll(PDO::FETCH_ASSOC);
    if (count($resultado) > 0) {

        echo json_encode(array(
            "success" => true,
            "data" => array($resultado[0])
        ));
    } else {
        echo json_encode(array(
            "success" => false,
            "data" => array()
        ));
    }
}

function getFuncionarios()
{
    global $os;

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

function getIdzonal()
{
    global $os;


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


    $sql = "SELECT COUNT( id ) valor, DATE_FORMAT( fecha, '%Y-%m-%d' ) texto FROM amc_sancion_emergencia_locales GROUP BY DATE_FORMAT( fecha, '%Y%m%d')";

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

function ingresaNuevoProceso()
{
    global $os;
    $data = '';
    if (!is_object($data)) {
        $data = new stdClass;
    }

    // se sube el archivo anexo

    // validamos que exista el archivo para cargar caso contrario ignorar
    // array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);
    $listado = array();
    if ($_FILES['archivo1']['name'] != null) {

        $temp_file_name = $_FILES['archivo1']['tmp_name'];

        $original_file_name = $_FILES['archivo1']['name'];
        $uploaddir = __DIR__ . "/uploads/";

        $nombreArchivo = $_FILES['archivo1']['name'];

        $vowels = array("[", "]");
        $nombreArchivo = str_replace($vowels, "", $nombreArchivo);
        $today = date("Y-n-j-H-i");

        $uploadfile = $uploaddir . basename($today . '-' . $nombreArchivo);

        if (move_uploaded_file($temp_file_name, $uploadfile)) {
            //$data->anexo = "http://romsegroup.com/invede-dev/uploads/" . basename($today . '-' . $nombreArchivo);;
            $listado['archivo1'] = "uploads/" . basename($today . '-' . $nombreArchivo);
        }
    }

    if ($_FILES['archivo2']['name'] != null) {

        $temp_file_name = $_FILES['archivo2']['tmp_name'];

        $original_file_name = $_FILES['archivo2']['name'];
        $uploaddir = __DIR__ . "/uploads/";

        $nombreArchivo = $_FILES['archivo2']['name'];

        $vowels = array("[", "]");
        $nombreArchivo = str_replace($vowels, "", $nombreArchivo);
        $today = date("Y-n-j-H-i");

        $uploadfile = $uploaddir . basename($today . '-' . $nombreArchivo);

        if (move_uploaded_file($temp_file_name, $uploadfile)) {
            //$data->anexo = "http://romsegroup.com/invede-dev/uploads/" . basename($today . '-' . $nombreArchivo);;
            $listado['archivo2'] = "uploads/" . basename($today . '-' . $nombreArchivo);
        }
    }

    if (count($listado) > 0)
        $data->imagenacto = json_encode($listado);


    $data->cedula = $_POST["cedula"];
    $data->nombres = $_POST["nombres"];
    $data->apellidos = $_POST["apellidos"];

    $data->expediente = $_POST["expediente"];
    $data->sello = $_POST["sello"];
    $data->actividad = $_POST["actividad"];
    $data->establecimiento = $_POST["establecimiento"];
    $data->direccion = $_POST["direccion"];
    $data->infraccion = $_POST["infraccion"];
    $data->categoria = $_POST["categoria"];
    $data->sector = $_POST["sector"];



    $data->geoposicionamiento = $_POST["geoposicionamiento"];
    $data->funcionario = $_POST["funcionario"];
    $data->fecha = $_POST["fecha"];
    $data->idzonal = $_POST["idzonal"];
    $data->zonal = getNombreZonal($_POST["idzonal"]); //se recupera el nombre

    $data->idingreso = $os->get_member_id();

    $cadenaDatos = '';
    $cadenaCampos = '';
    foreach ($data as $clave => $valor) {
        $cadenaCampos = $cadenaCampos . $clave . ',';
        $cadenaDatos = $cadenaDatos . "'" . $valor . "',";
    }
    $cadenaCampos = substr($cadenaCampos, 0, -1);
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "INSERT INTO amc_sancion_emergencia_locales ($cadenaCampos) VALUES ($cadenaDatos);";
    $sql = $os->db->conn->prepare($sql);
    $result = $sql->execute();

// genero el nuevo codigo de proceso
    $ultimo = $os->db->conn->lastInsertId();
    $data->id = $ultimo;

    echo json_encode(array(
        "success" => true,
        "msg" => $sql->errorCode() == 0 ? "insertado exitosamente" : $sql->errorCode(),
        "data" => array($data)
    ));

    return $data;

}

/* todo para proxima implementacion
require_once "../modules/common/Classes/PhpSpreadsheet/autoload.php";

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Worksheet\PageSetup;
*/
//genera el archivo PDF
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

    $sql = "SELECT id, CONCAT(first_name, \" \", last_name) AS nombre, email_address as email FROM qo_members  WHERE id = '$id';";

    $result = $os->db->conn->query($sql);
    $resultado = $result->fetchAll(PDO::FETCH_ASSOC);

    return $resultado[0];
}

function getNombreZonal($id)
{
    global $os;

    $sql = "SELECT nombre FROM amc_zonas  WHERE id = '$id';";

    $result = $os->db->conn->query($sql);
    $resultado = $result->fetchAll(PDO::FETCH_ASSOC);

    return $resultado[0]['nombre'];
}

function getDataId($id)
{
    global $os;

    $sql = "SELECT * FROM invede_tramites WHERE id = '$id';";

    $result = $os->db->conn->query($sql);
    $resultado = $result->fetchAll(PDO::FETCH_ASSOC);

    return $resultado[0];
}

function setDataIdEtapa0($id)
{
    global $os;

    $sql = "UPDATE invede_tramites 
            SET etapa = 1,
            etapa0 = 1,
            etapa1 = 1,
            fecha1 = now() 
            WHERE
        	`id` = '$id';";

    $result = $os->db->conn->query($sql);
    // $resultado = $result->fetchAll(PDO::FETCH_ASSOC);

    return 1;
}

function setDataIdEtapa1($id, $aprobado, $motivo)
{
    global $os;

    $aprobadoId = ($aprobado == 'aprobar') ? '1' : '0';
    $sql = "UPDATE invede_tramites 
            SET etapa = 2,
            aprobado1 = $aprobadoId,
            fechaaprobado1 = now(),
            motivo1 = '$motivo' ,
            etapa2 = 1,
            fecha2 = now() 
            WHERE
        	`id` = '$id';";

    $result = $os->db->conn->query($sql);
    // $resultado = $result->fetchAll(PDO::FETCH_ASSOC);

    return 1;
}

function setDataIdEtapa2($id, $aprobado, $motivo)
{
    global $os;
    $aprobadoId = ($aprobado == 'aprobar') ? '1' : '0';

    $mailaproabdo = ($aprobado == 'aprobar') ? '1' : '0';
    $mailnegado = ($aprobado == 'aprobar') ? '0' : '1';

    // si el final del proceso es aprobado, el estado se cambia a 1 de aprobado, 2 como negado
    $estado = ($aprobado == 'aprobar') ? '1' : '2';

    $sql = "UPDATE invede_tramites 
            SET etapa = 3,
            aprobado2 = $aprobadoId,
            fechaaprobado2 = now(),
            motivo2 = '$motivo' ,
            mailaprobado = $mailaproabdo, 
            mailnegado = $mailnegado,
            finalizado = 1, 
            estado = $estado
            WHERE
        	`id` = '$id';";

    // esto no me sale
    $result = $os->db->conn->query($sql);

    return 1;
}

function setDataIdEtapa12($id, $aprobado, $motivo)
{
    global $os;

    $aprobadoId = ($aprobado == 'aprobar') ? '1' : '0';

    $mailaproabdo = ($aprobado == 'aprobar') ? '1' : '0';
    $mailnegado = ($aprobado == 'aprobar') ? '0' : '1';

    // si el final del proceso es aprobado, el estado se cambia a 1 de aprobado, 2 como negado
    $estado = ($aprobado == 'aprobar') ? '1' : '2';

    $sql = "UPDATE invede_tramites 
            SET etapa = 3,
            etapa2 = 1,
            fecha2 = now(), 
            aprobado2 = $aprobadoId,
            fechaaprobado2 = now(),
            motivo2 = '$motivo' ,
            mailaprobado = $mailaproabdo, 
            mailnegado = $mailnegado,
            finalizado = 1, 
            estado = $estado
            WHERE
        	`id` = '$id';";

    $result = $os->db->conn->query($sql);

    return 1;
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

function getmensajeEtapa($nombre = '', $data)
{

    $texto = '<div style="font-family: Arial, Helvetica, sans-serif;">
                <div style="text-align: center;"><img style="width: 200px;" src="http://www.romsegroup.com/invede-dev/img/logo-jardin-corto.png" alt="" width="30%" /></div>

                <div style="clear: both; margin: 20px 10%; float: left;">
                <h1><span style="font-family:Calibri Light;color:rgb(47,84,150) ">Formulario de solicitudes para arrendatarios</span></h1>
               <h2><span style="font-family:Calibri Light;color:rgb(47,84,150) ">Número ' . $data['id'] . '</span></h2>
                <p  style="font-family:Calibri Light; font-size: 1.3em ">Estimado <strong>' . $nombre . '<span style="font-style: italic;"></span></strong></p>
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
                
                <p style="font-family:Calibri Light;color:rgb(47,84,150);font-size: 1.2em;font-weight: bold" >Personas que ingresarían en caso de ser aceptada la solicitud</p>
                
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

                </div>
	                <div style="clear: both; margin: 50px 10%;  text-align: center;">
						  <div class="hijo" style="display: block; width: 230px; height: 50px; padding: 10px 0 0 0; margin: 0 auto; background: #4682B4;  
						  background: -moz-linear-gradient(top, #87CEEB 0%, #4682B4 100%); background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#87CEEB), 
						  color-stop(100%,#4682B4));box-shadow: inset 0px 0px 6px #fff;  -webkit-box-shadow: inset 0px 0px 6px #fff; border: 1px solid #62C2F9; border-radius: 10px;  display: inline-block; "> 
						  <a href="http://romsegroup.com/invede-dev/accion.php?id=' . $data['id'] . '&accion=aprobar&etapa=' . $data['etapa'] . '" style="font-size: 24px; text-decoration: none; color: white;" target="_blank">Aprobar</a></div>

						  <div class="hijo" style="display: block; width: 230px; height: 50px; padding: 10px 0 0 0; margin: 0 auto; background: #4682B4;  
						  background: -moz-linear-gradient(top, #87CEEB 0%, #4682B4 100%); background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#87CEEB), 
						  color-stop(100%,#4682B4));box-shadow: inset 0px 0px 6px #fff;  -webkit-box-shadow: inset 0px 0px 6px #fff; border: 1px solid #62C2F9; border-radius: 10px;  display: inline-block; "> 
						  <a href="http://romsegroup.com/invede-dev/accion.php?id=' . $data['id'] . '&accion=negar&etapa=' . $data['etapa'] . '" style="font-size: 24px; text-decoration: none; color: white;" target="_blank">Negar</a></div>
						  
	                </div>
                </div>
                ';
    return $texto;
}

function getmensajeSolicitudAprobada($nombre = '', $data)
{
    $texto = '<div style="font-family: Arial, Helvetica, sans-serif;">
                <div style="text-align: center;"><img style="width: 200px;" src="http://www.romsegroup.com/invede-dev/img/logo-jardin-corto.png" alt="" width="30%" /></div>

                <div style="clear: both; margin: 20px 10%; float: left;">
                <h2><span style="font-family:Calibri Light;color:rgb(47,84,150) ">Número ' . $data['id'] . '</span></h2>
                <p  style="font-family:Calibri Light; font-size: 1.3em ">Estimado <strong>' . $nombre . ' - <span style="font-style: italic;">gracias por escribirnos, su solicitud FUE APROBADA</span></strong></p>
                 <p style="font-family:Calibri Light;color:rgb(47,84,150);font-size: 1.3em;font-weight: bold">Observación:</p>
                 <p style="font-family:Calibri Light;color:rgb(47,84,150);font-size: 1.3em;font-weight: bold">' . $data['motivo1'] . '</p>
                 <p style="font-family:Calibri Light;color:rgb(47,84,150);font-size: 1.3em;font-weight: bold">' . $data['motivo2'] . '</p>
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
                
                <p style="font-family:Calibri Light;color:rgb(47,84,150);font-size: 1.3em;font-weight: bold" >Listado de personal</p>
                
                <table style="margin: 0 auto; border: 1px solid #1C6EA4; background-color: rgb(241,241,241);   text-align: left;border-collapse: collapse;">
                    <tr><td style="font-weight: bolder; font-family:Calibri Light; font-size: 1.2em; border: 1px solid #1C6EA4; background-color: rgb(231,230,230); width: 35% ">Persona autorizada 1:</td>
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

function getmensajeSolicitudNegada($nombre = '', $data)
{
    $texto = '<div style="font-family: Arial, Helvetica, sans-serif;">
                <div style="text-align: center;"><img style="width: 200px;" src="http://www.romsegroup.com/invede-dev/img/logo-jardin-corto.png" alt="" width="30%" /></div>

                <div style="clear: both; margin: 20px 10%; float: left;">
                <h2><span style="font-family:Calibri Light;color:rgb(47,84,150) ">Número ' . $data['id'] . '</span></h2>
                <p  style="font-family:Calibri Light; font-size: 1.3em ">Estimado <strong>' . $nombre . ' - <span style="font-style: italic;">gracias por escribirnos, su solicitud FUE NEGADA</span></strong></p>
                 <p style="font-family:Calibri Light;color:rgb(47,84,150);font-size: 1.3em;font-weight: bold">Observación:</p>
                 <p style="font-family:Calibri Light;color:rgb(47,84,150);font-size: 1.3em;font-weight: bold">' . $data['motivo1'] . '</p>
                 <p style="font-family:Calibri Light;color:rgb(47,84,150);font-size: 1.3em;font-weight: bold">' . $data['motivo2'] . '</p>
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
                
                <p style="font-family:Calibri Light;color:rgb(47,84,150);font-size: 1.3em;font-weight: bold" >Listado de personal</p>
                
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

    $mail->Username = "solicitudes@malleljardin.com.ec";
    $mail->Password = 'Mall@2020';

    $mail->setFrom('solicitudes@malleljardin.com.ec', 'Mall el Jardín - Registro de trabajos');

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