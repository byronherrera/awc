<?php
require_once '../../../../server/os.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}


function selectDenunciasReasignacion()
{
    if (isset($_POST['id'])) {
        $id = (int)$_POST ['id'];
        $chain = "id_libro_diario  = '$id'";
        $where = " WHERE $chain ";
    }

    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_providencias $where ORDER BY id";
    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }
    echo json_encode(array(
            "success" => true,
            "data" => $data)
    );
}

    function insertDenunciasReasignacion()
    {
        global $os;

        $os->db->conn->query("SET NAMES 'utf8'");
        $data = json_decode(stripslashes($_POST["data"]));
        //$data->despacho_secretaria = 'false';
        $data->id = generaCodigoProcesoUnidades();
        $data->orden = generaCodigoProcesoUnidades();
        //$data->id_persona = $os->get_member_id();
        //genero el listado de nombre de campos

        $cadenaDatos = '';
        $cadenaCampos = '';
        foreach ($data as $clave => $valor) {
            $cadenaCampos = $cadenaCampos . $clave . ',';
            $cadenaDatos = $cadenaDatos . "'" . $valor . "',";
        }
        $cadenaCampos = substr($cadenaCampos, 0, -1);
        $cadenaDatos = substr($cadenaDatos, 0, -1);

        $sql = "INSERT INTO amc_providencias($cadenaCampos)
	    values($cadenaDatos);";
        $sql = $os->db->conn->prepare($sql);
        $sql->execute();

        $data->id = $os->db->conn->lastInsertId();
        // genero el nuevo codigo de proceso


        echo json_encode(array(
            "success" => true,
            "msg" => $sql->errorCode() == 0 ? "insertado exitosamente" : $sql->errorCode(),
            "data" => array($data)
        ));
    }

function updateDenunciasReasignacion()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);

    if (isset($data->despacho_secretaria)) {
        if (!$data->despacho_secretaria)
            $data->despacho_secretaria = 'false';
        else
            $data->despacho_secretaria = 'true';
    }

    $message = '';
    if (isset($data->id_tipo_documento)) {
        if ($data->id_tipo_documento == '1')
            if (validarCedulaCorreo($data->id)) {
                $message = 'Ingresar número de cédula y correo electrónico';
            }
    }

    // genero el listado de valores a insertar
    $cadenaDatos = '';
    foreach ($data as $clave => $valor) {
        $cadenaDatos = $cadenaDatos . $clave . " = '" . $valor . "',";
    }
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql = "UPDATE amc_providencias SET  $cadenaDatos  WHERE amc_providencias.id = '$data->id' ";
    //echo ($sql);
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_resoluciones actualizado exitosamente" : $sql->errorCode(),
        "message" => $message
    ));
}


function deleteDenunciasReasignacion()
{
    global $os;
    $id = json_decode(stripslashes($_POST["data"]));
    $sql = "DELETE FROM amc_providencias WHERE id=$id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Registro, eliminado exitosamente" : $sql->errorCode()
    ));
}

function generaCodigoProcesoUnidades()
{
    global $os;

    $usuario = $os->get_member_id();
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT MAX(id) AS maximo FROM amc_providencias";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    if (isset($row['maximo'])) {
        $nuevoCodogo = $row['maximo'] + 1;
        return $nuevoCodogo;
    } else {
        // valor inicial proceso

        return 10759;

    }
}

switch ($_GET['operation']) {
    case 'select' :
        selectDenunciasReasignacion();
        break;
    case 'insert' :
        insertDenunciasReasignacion();
        break;
    case 'update' :
        updateDenunciasReasignacion();
        break;
    case 'delete' :
        deleteDenunciasReasignacion();
        break;
}