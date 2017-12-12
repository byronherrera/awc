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
    $sql = "SELECT * FROM amc_operativos_personal WHERE id_operativo = $id_operativo  ORDER BY id DESC ";
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

function validarPersonal($id_member, $id_operativo) {
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT COUNT(*) AS total FROM amc_operativos_personal WHERE id_member = $id_member AND id_operativo = $id_operativo  " ;
    $result = $os->db->conn->query($sql);

    $row = $result->fetch(PDO::FETCH_ASSOC);
    if ($row['total'] == 0 ) {
        return '';
    } else {
        return 'El usuario ya existe';
    }


}

function insertPersonal()
{
    global $os;

    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode(stripslashes($_POST["data"]));

    $cadenaDatos = '';
    $cadenaCampos = '';

    // validamos que la persona ya exista, si existe agregamos un mensjae de error
    $message = validarPersonal($data->id_member,$data->id_operativo );
    foreach ($data as $clave => $valor) {
        $cadenaCampos = $cadenaCampos . $clave . ',';
        $cadenaDatos = $cadenaDatos . "'" . $valor . "',";
    }
    $cadenaCampos = substr($cadenaCampos, 0, -1);
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql = "INSERT INTO amc_operativos_personal ($cadenaCampos) values($cadenaDatos);";
    $log = $sql;
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    $data->id = $os->db->conn->lastInsertId();
    // genero el nuevo codigo de proceso

    echo json_encode(array(
        "success" => true,
        "msg" => $sql->errorCode() == 0 ? "insertado exitosamente" : $sql->errorCode(),
        "data" => array($data),
        "message" => $message
    ));

    $fichero = 'crudOperativosPersonal.log';
    $actual = file_get_contents($fichero);
    $actual .= $log . "\n";
    file_put_contents($fichero, $actual);
}

function updatePersonal()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);
    $message = validarPersonal($data->id_member,$data->id_operativo );
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