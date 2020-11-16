<?php
require_once '../../server/os.php';
$os = new os();

getSecuencial();
function getSecuencial()
{
    global $os;

    $os->db->conn->query("SET NAMES 'utf8'");
    $id = 0;
    $sql = "SELECT * FROM amc_inspeccion_nio  WHERE predio = '$id';";
    $result = $os->db->conn->query($sql);
    $resultado = $result->fetchAll(PDO::FETCH_ASSOC);


    $resultado = "AMC-SERIAL-ZLM-APP-2020-001";

    // Tipo de errores
    // 1. Error base de datos
    // 2. Error usuario no encontrado
    // 3. Error usuario no asignado a zonal
    // 4. Clave erronea

    $error = "Error base de datos";

    if (count($resultado) > 0) {
        echo json_encode(array(
            "success" => true,
            "data" => $resultado

        ));
    } else {
        echo json_encode(array(
            "success" => false,
            "data" => array(),
            "msg" => $error
        ));
    }
}

?>