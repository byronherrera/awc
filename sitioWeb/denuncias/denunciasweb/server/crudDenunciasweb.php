<?php

//http://medoo.in/api/select

//http://localhost:10088/msv-dev/generareporte/modules/desktop/samsung/server/help.html#Error

require_once '../../../../server/os.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}

function generaCodigoProcesoDenuncia()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT MAX(codigo_tramite) AS maximo FROM amc_denuncias";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    $nuevoCodogo = $row['maximo'] + 1;
    return $nuevoCodogo;
}

function aprobarDenuncia()
{
    global $os;

    $os->db->conn->query("SET NAMES 'utf8'");

    $data = json_decode('{}');
    $data->codigo_tramite = generaCodigoProcesoDenuncia();
    $data->id_persona = $os->get_member_id();
    $data->recepcion_documento = $_POST["fecha"];
    $data->id_tipo_documento = 1;
    $data->num_documento = "Denuncia web - ". $_POST["id"];
    $data->remitente = $_POST["nombre"] . ' '.$_POST["apellido"];

    $data->asunto = $_POST["ampliaciondenuncia"];
    $data->reasignacion = 2;
    $data->descripcion_anexos = 'Denuncia Web, ' . addslashes($_POST["urldenuncia"]);
    $data->id_caracter_tramite = 1;
    $data->cedula = $_POST["cedula"];
    $data->email = $_POST["email"];

    //genero el listado de nombre de campos

    $cadenaDatos = '';
    $cadenaCampos = '';
    foreach ($data as $clave => $valor) {
        $cadenaCampos = $cadenaCampos . $clave . ',';
        $cadenaDatos = $cadenaDatos . "'" . $valor . "',";
    }
    $cadenaCampos = substr($cadenaCampos, 0, -1);
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql = "INSERT INTO amc_denuncias($cadenaCampos)
	values($cadenaDatos);";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    $data->id = $os->db->conn->lastInsertId();
    // genero el nuevo codigo de proceso


    echo json_encode(array(
        "success" => true,
        "msg" => $sql->errorCode() == 0 ? "insertado exitosamente" : $sql->errorCode(),
        "data" => $data->codigo_tramite
    ));
}


switch ($_GET['operation']) {
    case 'aprobarDenuncia' :
        aprobarDenuncia();
        break;

}