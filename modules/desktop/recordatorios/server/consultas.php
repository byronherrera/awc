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
    $sql= "SELECT
            CONCAT(amc_planificacion_notificaciones.apellidos, ' ',amc_planificacion_notificaciones.nombres) AS nombre,
            CONCAT( amc_planificacion_notificaciones.tema, ' - ', amc_planificacion_detalle.actividad) AS tema,
            amc_planificacion_detalle.fecha_compromiso AS fecha
            FROM
            amc_planificacion_notificaciones
            INNER JOIN amc_planificacion_detalle ON amc_planificacion_notificaciones.id = amc_planificacion_detalle.id_proceso
            WHERE
            amc_planificacion_notificaciones.id_responsable = $idUsuario AND
            amc_planificacion_detalle.cumplimiento = 'false' AND
            amc_planificacion_detalle.fecha_compromiso BETWEEN NOW( ) AND NOW( ) + INTERVAL 7 DAY AND 
            amc_planificacion_notificaciones.estado = 'En ejecución' OR amc_planificacion_notificaciones.estado = 'Detenido'
            ORDER BY
            amc_planificacion_detalle.fecha_compromiso ASC;";

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
