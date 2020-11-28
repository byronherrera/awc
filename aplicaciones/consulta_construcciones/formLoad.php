<?php
require_once '../../server/os.php';
$os = new os();

$opcion = isset($_GET['opcion']) ? $_GET['opcion'] : '';
switch ($opcion) {
    case "predio":
        $predio = isset($_GET['predio']) ? $_GET['predio'] : '';
        getPredio($predio);
        break;
    case "predioCcf":
        $predio = isset($_GET['predio']) ? $_GET['predio'] : '';
        getPredioCcf($predio);
        break;
}

function getPredio($id)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_inspeccion_nio  WHERE predio = '$id';";
    $result = $os->db->conn->query($sql);
    $resultado = $result->fetchAll(PDO::FETCH_ASSOC);
    if (count($resultado) > 0) {
        echo json_encode(array(
            "success" => true,
            "data" =>array($resultado)
//            "data" => array($resultado[0])
        ));
    } else {
        echo json_encode(array(
            "success" => false,
            "data" => array()
        ));
    }
}

function getPredioCcf($id)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_inspeccion_ccf  WHERE predio = '$id';";
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
