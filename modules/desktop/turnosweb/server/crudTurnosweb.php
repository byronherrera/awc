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

    $data->fechaasignada = $_POST["fechaasignada"];

    $data->comentarios = $_POST["comentarios"];

    $data->cedula = $_POST["cedula"];
    $data->email = $_POST["email"];

    $data->id_persona = $os->get_member_id();

    //estado inicial de la solicitudo
    $data->estado = 1;
    $data->nombre = $_POST["nombre"];
    $data->apellido = $_POST["apellido"];
    $data->email = $_POST["email"];
    $data->cedula = $_POST["cedula"];
    $data->telefono1 = $_POST["telefono1"];
    $data->expediente = $_POST["expediente"];
    $data->comentarios = $_POST["comentarios"];
    $data->fechaasignada = $_POST["fechaasignada2"] . " " . $_POST["horaasignada2"] . ":00";
    $data->id_inspector = $_POST["id_inspector2"];
    $data->fecha = $_POST["fecha"];
    $mensaje = '';

    if (validaLainsercion($data->id_inspector, $data->fechaasignada)) {
        $cadenaDatos = '';
        $cadenaCampos = '';
        foreach ($data as $clave => $valor) {
            $cadenaCampos = $cadenaCampos . $clave . ',';
            $valor = str_replace("'", "", $valor);
            $cadenaDatos = $cadenaDatos . "'" . $valor . "',";
        }
        $cadenaCampos = substr($cadenaCampos, 0, -1);
        $cadenaDatos = substr($cadenaDatos, 0, -1);

        // todo falta a  donde graba

        $sql = "INSERT INTO amc_agendar_cita ($cadenaCampos) values($cadenaDatos);";
        $sql = $os->db->conn->prepare($sql);
        $sql->execute();

        $data->id = $os->db->conn->lastInsertId();
        // genero el nuevo codigo de proceso
        $data->mail_inspector = get_email($data->id_inspector);

        echo json_encode(array(
            "success" => true,
            "msg" => $sql->errorCode() == 0 ? "insertado exitosamente" : $sql->errorCode(),
            "data" => $data
        ));
    } else {
        echo json_encode(array(
            "success" => false,
            "msg" => "Fecha y hora ya ocupado",
            "message" => $mensaje
        ));
    }
}

switch ($_GET['operation']) {
    case 'aprobarTurnos' :
        aprobarTurnos();
        break;
}

function get_email($id)
{
    //retorna el valor de email de la tabla qo members
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $sql = "SELECT email_address FROM qo_members WHERE id = " . $id;
    $nombre = $os->db->conn->query($sql);

    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['email_address'];

}

function validaLainsercion($id_inspector, $fechaasignada)
{
    //retorna el valor de email de la tabla qo members
    global $os;
    global $config;
    global $mensaje;

    $sql = "SELECT COUNT(*) as total  FROM amc_agendar_cita WHERE id_inspector = " . $id_inspector . " AND fechaasignada = '" . $fechaasignada . "'";
    $nombre = $os->db->conn->query($sql);

    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    if ($rownombre['total'] >= 1) {
        //existe más de una
        $mensaje = "Fecha y hora ya ocupado";
        return false;
    } else {
        //

        $maximoTurnosDia = $config->AMBIENTE;
        // contar los turnos asignados el dia para que no superen del maximo
        $sql = "SELECT COUNT(*) as total  FROM amc_agendar_cita WHERE CAST(fechaasignada AS DATE) =  CAST('" . $fechaasignada . "' AS DATE)";
        $nombre = $os->db->conn->query($sql);

        $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
        if ($rownombre['total'] >= $maximoTurnosDia) {
            //existe más de una
            $mensaje = "No hay turnos disponibles para esta fecha - máximo de turnos al dia ya entregados";
            return false;
        } else {
            return true;
        }
    }

}

