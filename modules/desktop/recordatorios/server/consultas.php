<?php
require_once '../../../../server/os.php';
$os = new os();

// activa acceso de data
header("Access-Control-Allow-Origin: *");

$idUsuario = getIdUsuario($_GET["usuario"]);
getrecordatoriosUsuario($idUsuario);

function getIdUsuario($email)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT CONCAT(first_name,' ',last_name) AS nombre, id  FROM `qo_members` WHERE active = 1 AND email_address = '$email' LIMIT 1;";
    $result = $os->db->conn->query($sql);
    $resultado = $result->fetchAll(PDO::FETCH_ASSOC);
    return $resultado[0]['id'];
}

function getrecordatoriosUsuario($idUsuario)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT
                nombres AS nombre,
                fecha_entrega AS fecha,
                tema 
            FROM
                `amc_general_recordatorios` 
            WHERE id_responsable = $idUsuario;";

    $result = $os->db->conn->query($sql);
    if ($result) {
        $resultado = $result->fetchAll(PDO::FETCH_ASSOC);
    }
    if (count($resultado) > 0) {
        echo json_encode($resultado);
    } else {
        echo '[{"nombre": "", "fecha": "", "tema": "" }]';
    }
}



