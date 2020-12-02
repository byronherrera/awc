<?php
require_once '../../server/os.php';
require_once '../../modules/common/Classes/funciones.php';
$os = new os();

genSecuencial();
function genSecuencial()
{
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
   $nombre = getNombre();
    $id = getId();
    $resultado = array(
        "nombre" => $nombre,
        "id" => $id
    );
    return $resultado;
}

function getId()
{
    global $os;
    // 1 determinar en que zonal esta el usuario
    // https://amcmatis.quito.gob.ec/aplicaciones/secuencial/?email=argarcia@quito.gob.ec&password=123456&tipo_documento=1

    $email = $_GET['email'];
    $pass = $_GET['password'];

    $os->load('member');
    // TODO valida con la contraseña
    //$member_id = $os->member->get_id($email);
    $member_id = $os->member->get_id_email($email);
    return $member_id;
}

function getNombre () {
    global $os;
    // 1 determinar en que zonal esta el usuario
    // https://amcmatis.quito.gob.ec/aplicaciones/secuencial/?email=argarcia@quito.gob.ec&password=123456&tipo_documento=1

    $email = $_GET['email'];
    $pass = $_GET['password'];
    $os->load('member');
    // TODO PARA VALIDAR CON LA CONTRAÑA
    //$member_id = $os->member->get_id_email($email, $pass, false);
    $member_id = $os->member->get_id_email($email);
    $member_id = $os->member->get_name($member_id);
    return $member_id;
}