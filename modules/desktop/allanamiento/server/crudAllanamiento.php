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
    $sql = "SELECT * FROM amc_reconocimineto_responsabilidad ORDER BY id";
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

    $sql = "INSERT INTO amc_reconocimineto_responsabilidad (nombre, activo )
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

    $sql = "UPDATE amc_reconocimineto_responsabilidad SET
            nombre='$data->nombre',
            activo='$data->activo'
	  WHERE amc_reconocimineto_responsabilidad.id = '$data->id' ";
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
    $sql = "DELETE FROM amc_reconocimineto_responsabilidad WHERE id=$id";
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
    $sql = "SELECT * FROM amc_reconocimineto_responsabilidad WHERE id = $id";
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
}

function totalpedidos($cedula)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $sql = "SELECT COUNT(*) AS total FROM amc_reconocimineto_responsabilidad WHERE cedula = '$cedula'";
    $nombre = $os->db->conn->query($sql);

    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['total'];
}
