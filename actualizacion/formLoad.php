<?php
require_once '../server/os.php';
$os = new os();


$opcion = isset($_GET['opcion']) ? $_GET['opcion'] : '';
 switch ($opcion) {
 
    case "funcionario":
        getFuncionarios();
        break;
  

    case "actualizar":
        // graba en base de datos
        $data = actualizacionDatos();
 
    
        break;
}


function getFuncionarios()
{
    global $os;

    $usuario = $os->get_member_id();

    $sql = "SELECT last_name, first_name FROM `qo_members` WHERE active = 1 AND id= $usuario;";
    $result = $os->db->conn->query($sql);
    $resultado = $result->fetchAll(PDO::FETCH_ASSOC);
    $apeliidos =  $resultado[0]['last_name'];
    $nombres =  $resultado[0]['first_name'];

    $sql = "SELECT id, 
                cedula, 
                apellidos,
                nombres,
                telefono1,
                telefono2,
                telefonoemergencia,
                direccionprincipal,
                direccionsecundaria,
                direccionnumero,
                referenciadireccion,
                parroquia,
                barrio,
                geoposicionamiento,
                fecha_nacimiento,
                tiposangre
            FROM `amc_personal_distributivo` WHERE id_estado = 1 AND apellidos = '$apeliidos' AND nombres = '$nombres' ;";

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
  
function actualizacionDatos()
{
    global $os;
    $data = '';
    if (!is_object($data)) {
        $data = new stdClass;
    }

    $id = $_POST["id"];

    setlog($id);
    $data->telefono1 = $_POST["telefono1"];
    $data->telefono2 = $_POST["telefono2"];
    $data->telefonoemergencia = $_POST["telefonoemergencia"];
    $data->direccionprincipal = $_POST["direccionprincipal"];
    $data->direccionsecundaria = $_POST["direccionsecundaria"];
    $data->direccionnumero = $_POST["direccionnumero"];
    $data->referenciadireccion = $_POST["referenciadireccion"];
    $data->parroquia = $_POST["parroquia"];
    $data->barrio = $_POST["barrio"];
    $data->geoposicionamiento = $_POST["geoposicionamiento"];
    $data->fecha_nacimiento = $_POST["fecha_nacimiento"];
    $data->tiposangre = $_POST["tiposangre"];
    //  $data->apellidos = $_POST["fecha_actualizacion"];


    $cadenaDatos = '';
    foreach ($data as $clave => $valor) {

        $cadenaDatos = $cadenaDatos . " $clave = '$valor' ,";
    }



    $cadenaDatos = $cadenaDatos . " fecha_actualizacion = now() ,";
    $cadenaDatos = substr($cadenaDatos, 0, -1);
    $os->db->conn->query("SET NAMES 'utf8'");
    $sqlText = "UPDATE amc_personal_distributivo SET $cadenaDatos WHERE `id` = $id;";
    $sql = $os->db->conn->prepare($sqlText);
    $result = $sql->execute();

    echo json_encode(array(
        "success" => true,
        "msg" => $sql->errorCode() == 0 ? "actualizado exitosamente"   : $sql->errorCode() ,
        "data" => array($data)
    ));

}



function setlog($id)
{
    global $os;


    $sql = "SELECT * FROM amc_personal_distributivo  WHERE `id` = $id;";

    $result = $os->db->conn->query($sql);
    $resultado = $result->fetchAll(PDO::FETCH_ASSOC);
    $log =  implode( ", ", $resultado[0] );
    //grabamos
    $fichero = 'crudTalento.log';
    $actual = file_get_contents($fichero);
    $actual .= $os->get_member_id() . "**" .$log . "\n";
    file_put_contents($fichero, $actual);
}

function getUsuario($id)
{
    global $os;

    $sql = "SELECT id, CONCAT(first_name, \" \", last_name) AS nombre, email_address as email FROM qo_members  WHERE id = '$id';";

    $result = $os->db->conn->query($sql);
    $resultado = $result->fetchAll(PDO::FETCH_ASSOC);

    return $resultado[0];
}
