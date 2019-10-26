<?php

require_once '../../../../server/os.php';
require_once '../../../common/Classes/funciones.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}

function aprobarTurnos()
{
    global $os;

    $os->db->conn->query("SET NAMES 'utf8'");

    $data = json_decode('{}');
    //$data->codigo_tramite = generaCodigoProcesoTurnos();
    $data->id_persona = $os->get_member_id();
    $data->fechaasignada = $_POST["fechaasignada"];

    $data->comentarios = $_POST["comentarios"];

    $data->cedula = $_POST["cedula"];
    $data->email = $_POST["email"];


    $data->id_persona= $os->get_member_id();


    $data->estado = 1;
    $data->nombre =$_POST["nombre"];
    $data->apellido =$_POST["apellido"];
    $data->email =$_POST["email"];
    $data->cedula =$_POST["cedula"];
    $data->telefono1 =$_POST["telefono1"];
    $data->expediente =$_POST["expediente"];
    $data->comentarios =$_POST["comentarios"];
    $data->fechaasignada =$_POST["fechaasignada2"] . " ". $_POST["horaasignada2"]. ":00" ;
    $data->id_inspector =$_POST["id_inspector2"];
    $data->fecha =$_POST["fecha"];

    $cadenaDatos = '';
    $cadenaCampos = '';
    foreach ($data as $clave => $valor) {
        $cadenaCampos = $cadenaCampos . $clave . ',';
        $valor = str_replace("'", "", $valor);
        $cadenaDatos = $cadenaDatos . "'" .  $valor . "',";
    }
    $cadenaCampos = substr($cadenaCampos, 0, -1);
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    // todo falta a  donde graba

    $sql = "INSERT INTO amc_agendar_cita ($cadenaCampos)
	values($cadenaDatos);";
    $sql = $os->db->conn->prepare($sql);
   $sql->execute();

    $data->id = $os->db->conn->lastInsertId();
    // genero el nuevo codigo de proceso
    $data->mail_inspector= get_email($data->id_inspector);

    echo json_encode(array(
        "success" => true,
        "msg" => $sql->errorCode() == 0 ? "insertado exitosamente" : $sql->errorCode(),
        "data" => $data
    ));
}

switch ($_GET['operation']) {
    case 'aprobarTurnos' :
        aprobarTurnos();
        break;
}

function get_email ($id)
{
    //retorna el valor de email de la tabla qo members
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $sql = "SELECT email_address FROM qo_members WHERE id = " . $id;
    $nombre = $os->db->conn->query($sql);

    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['email_address'];

}

