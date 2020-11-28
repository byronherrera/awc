<?php
require_once '../../../../server/os.php';
require_once '../../../../modules/common/Classes/funciones.php';
$os = new os();

// activa acceso de data
header("Access-Control-Allow-Origin: *");

//$idUsuario = getIdUsuario($_GET["usuario"]);

//getrecordatoriosUsuario($idUsuario);

switch ($_GET['operation']) {
    case 'getUsuario' :
        getUsuario();
        break;
}


function getUsuario(){
    $id = $_GET['id'];
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    if ($id != '') {
        $sql = "SELECT concat_ws(' ', qo_members.last_name, qo_members.first_name) AS nombre
            FROM qo_members WHERE id = " . $id;
        $nombre = $os->db->conn->query($sql);
        $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
        //return $rownombre['nombre'];
        echo json_encode(array(
                "success" => true,
                "data" => $rownombre['nombre'])
        );
    }
}

function email ($email)
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
            CONCAT(amc_planificacion_notificaciones.apellidos, ' ',amc_planificacion_notificaciones.nombres) AS nombre,
            CONCAT( amc_planificacion_detalle.actividad,  ' - ',  amc_planificacion_notificaciones.tema) AS tema,
            amc_planificacion_detalle.fecha_compromiso AS fecha
            FROM
            amc_planificacion_notificaciones
            INNER JOIN amc_planificacion_detalle ON amc_planificacion_notificaciones.id = amc_planificacion_detalle.id_proceso
            WHERE
            amc_planificacion_notificaciones.id_responsable = $idUsuario AND
            amc_planificacion_detalle.cumplimiento = 'false' AND
          	amc_planificacion_detalle.fecha_compromiso <  NOW( ) + INTERVAL 15 DAY AND 
			amc_planificacion_detalle.fecha_compromiso  != 'null' AND
            amc_planificacion_notificaciones.estado in ('En ejecución', 'Detenido')
            ORDER BY
            amc_planificacion_detalle.fecha_compromiso DESC;";

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
