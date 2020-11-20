<?php
require_once '../../server/os.php';
$os = new os();

genSecuencial();
function genSecuencial()
{
    global $os;

    $os->db->conn->query("SET NAMES 'utf8'");
    $id = 0;
    $sql = "SELECT * FROM amc_inspeccion_nio  WHERE predio = '$id';";
    $result = $os->db->conn->query($sql);
    $resultado = $result->fetchAll(PDO::FETCH_ASSOC);


    $resultado = getResultado();


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

function getResultado()
{
    $formato = getFormato();
    $year = getYear();
    $secuencia = getSecuencia();
    $resultado = "$formato-$year-$secuencia";
    return $resultado;
}

function getFormato()
{
    global $os;
    // 1 determinar en que zonal esta el usuario
    // https://amcmatis.quito.gob.ec/aplicaciones/secuencial/?email=argarcia@quito.gob.ec&password=123456&tipo_documento=1

    $user = $_GET['email'];
    $pass = $_GET['password'];

    $os->load('member');
    $member_id = $os->member->get_id($user, $pass, false);
    $zonal = $os->get_zonal_id ($member_id);

    echo $zonal . " mmm " . $member_id;


    return "AMC-SERIAL-ZLM-APP";

}

function getYear()
{
    return date("Y");
}

function getSecuencia()
{
    return "001";
}


?>