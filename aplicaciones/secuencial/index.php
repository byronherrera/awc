<?php
require_once '../../server/os.php';
require_once '../../modules/common/Classes/funciones.php';
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
    $secuencia = getSecuencia($year, $formato);
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
    $zonal = $os->get_unidad_siglas ($member_id);
    return "GADDMQ-AMC-$zonal-APP";
}

function getIdUnidad () {
    global $os;
    // 1 determinar en que zonal esta el usuario
    // https://amcmatis.quito.gob.ec/aplicaciones/secuencial/?email=argarcia@quito.gob.ec&password=123456&tipo_documento=1

    $user = $_GET['email'];
    $pass = $_GET['password'];
    $os->load('member');
    $member_id = $os->member->get_id($user, $pass, false);
    $unidad = $os->get_unidad_id ($member_id);
    return $unidad;

}

function getIdZonal () {
    global $os;
    // 1 determinar en que zonal esta el usuario
    // https://amcmatis.quito.gob.ec/aplicaciones/secuencial/?email=argarcia@quito.gob.ec&password=123456&tipo_documento=1

    $user = $_GET['email'];
    $pass = $_GET['password'];
    $os->load('member');
    $member_id = $os->member->get_id($user, $pass, false);
    $unidad = $os->get_zonal_id ($member_id);
    return $unidad;
}

function getIdFuncionario () {
    global $os;
    // 1 determinar en que zonal esta el usuario
    // https://amcmatis.quito.gob.ec/aplicaciones/secuencial/?email=argarcia@quito.gob.ec&password=123456&tipo_documento=1

    $user = $_GET['email'];
    $pass = $_GET['password'];
    $os->load('member');
    $member_id = $os->member->get_id($user, $pass, false);
    return $member_id;
}


function getYear()
{
    return date("Y");
}

function getSecuencia($year, $formato)
{
    // get last number
    $tipoDocumento =$_GET ['tipo_documento'];
    $idUnidad = getIdUnidad () ;

    global  $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT secuencial FROM amc_secuenciales WHERE id_unidad = $idUnidad AND tipo_documento = $tipoDocumento AND anio=$year;";
    $result = $os->db->conn->query($sql);
    $resultado = $result->fetchAll(PDO::FETCH_ASSOC);
    $nuevoNumeroSecuencial = $resultado[0]['secuencial']+1;
    $formatted_secuencial = sprintf("%05d", $nuevoNumeroSecuencial);

    actualizarSecuencial ($idUnidad, $tipoDocumento, $year, $nuevoNumeroSecuencial );
    return  $formatted_secuencial;
}

function actualizarSecuencial ($idUnidad, $tipoDocumento, $year ,$nuevoNumeroSecuencial ) {
    global $os;
    $idZonal = getIdZonal () ;
    $idFuncionario = getIdFuncionario();
    $nombreFuncionario = regresaNombre($idFuncionario);

    $sql = "UPDATE `procesos-amc`.`amc_secuenciales` SET `secuencial` = $nuevoNumeroSecuencial,  id_usuario = $idFuncionario, usuario = '$nombreFuncionario'".
           " WHERE id_unidad = $idUnidad AND tipo_documento = $tipoDocumento AND anio=$year;";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();

}
?>