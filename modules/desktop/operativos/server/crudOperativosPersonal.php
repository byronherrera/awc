<?php
require_once '../../../../server/os.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}


function selectPersonal()
{
    global $os;
    $id_operativo =  $_POST["id_operativo"] ;

    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_operativos_personal WHERE id_operativo = $id_operativo ";
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

function insertPersonal()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode(stripslashes($_POST["data"]));

    $sql = "INSERT INTO amc_operativos_personal (nombre, observacion )
	values('$data->nombre','$data->observacion');";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => true,
        "msg" => $sql->errorCode() == 0 ? "insertado exitosamente" : $sql->errorCode(),
        "data" => array(
            array(
                "id" => $os->db->conn->lastInsertId(),
                "nombre" => $data->nombre,
                "observacion" => $data->observacion
            )
        )
    ));
}

function updatePersonal()
{

    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);
     $message = '';

     // genero el listado de valores a insertar
    $cadenaDatos = '';
    foreach ($data as $clave => $valor) {
        $cadenaDatos = $cadenaDatos . $clave . " = '" . $valor . "',";
    }
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql = "UPDATE amc_operativos_personal SET  $cadenaDatos  WHERE id = '$data->id' ";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_operativos_personal actualizado exitosamente" : $sql->errorCode(),
        "message" => $message
    ));
}


function deletePersonal()
{
    global $os;
    $id = json_decode(stripslashes($_POST["data"]));
    $sql = "DELETE FROM amc_operativos_personal WHERE id=$id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Registro, eliminado exitosamente" : $sql->errorCode()
    ));
}

switch ($_GET['operation']) {
    case 'select' :
        selectPersonal();
        break;
    case 'insert' :
        insertPersonal();
        break;
    case 'update' :
        updatePersonal();
        break;
    case 'delete' :
        deletePersonal();
        break;
}