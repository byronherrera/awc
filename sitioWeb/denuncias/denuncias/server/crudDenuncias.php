<?php
require_once '../../../../server/os.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}

function selectProcedimientosCadena($procLista)
{
    global $os;
    if (isset($procLista)) {
        $os->db->conn->query("SET NAMES 'utf8'");
        $sql = "SELECT amc_procedimientos.nombre FROM amc_procedimientos WHERE id in ( $procLista ) ORDER BY id";
        $result = $os->db->conn->query($sql);
        $data = array();

        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            $data[] = $row ['nombre'];
        }
        return implode(",\n", $data);
    } else {
        return '';
    }
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT amc_procedimientos.nombre FROM amc_procedimientos WHERE id in ( $procLista ) ORDER BY id";
    $result = $os->db->conn->query($sql);
    $data = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row ['nombre'];
    }
    return implode(",\n", $data);
}

function selectDenuncias()
{
    global $os;

    $columnaBusqueda = 'codigo_tramite';
    $where = '';
    $noenviados = '';

    if (isset($_POST['filterField'])) {
        $columnaBusqueda = $_POST['filterField'];
    }


    if (isset($_POST['filterText'])) {
        $campo = $_POST['filterText'];
        $campo = str_replace(" ", "%", $campo);

        //para el caso de busqueda por guia, recuperamos el id de la guia
        if ($columnaBusqueda == 'guia') {
            $sql = "SELECT id FROM amc_guias WHERE numero = '$campo'";
            $numguia = $os->db->conn->query($sql);
            if ($numguia) {
                $row = $numguia->fetch(PDO::FETCH_ASSOC);
                if ($row) {
                    $campo = $row['id'];
                }
            }
        }
        $where = " WHERE $columnaBusqueda LIKE '%$campo%'";
    }

    if (isset($_POST['unidadfiltro'])) {
        $unidad = $_POST['unidadfiltro'];
        if ($where == '') {
            $where = "WHERE reasignacion = $unidad ";
        } else {
            $where = " AND reasignacion = $unidad ";
        }
    }

    if (isset($_POST['noenviados'])) {
        if ($_POST['noenviados'] == 'true') {
            if ($where == '') {
                $where = " WHERE envio_inspeccion <> 'true'";
            } else {
                $where = $where . " AND envio_inspeccion <> 'true' ";
            }
        }
    }

    if (isset ($_POST['start']))
        $start = $_POST['start'];
    else
        $start = 0;

    if (isset ($_POST['limit']))
        $limit = $_POST['limit'];
    else
        $limit = 100;

    $orderby = 'ORDER BY codigo_tramite DESC';
    if (isset($_POST['sort'])) {
        $orderby = 'ORDER BY ' . $_POST['sort'] . ' ' . $_POST['dir'];
    }

    $os->db->conn->query("SET NAMES 'utf8'");
    //$sql = "SELECT * FROM amc_denuncias $where ORDER BY envio_inspeccion, recepcion_documento DESC LIMIT $start, $limit";
    $sql = "SELECT * FROM amc_denuncias $where $orderby LIMIT $start, $limit";
    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {

        $data[] = $row;
    };

    $sql = "SELECT count(*) AS total FROM amc_denuncias $where";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    $total = $row['total'];

    echo json_encode(array(
            "total" => $total,
            "success" => true,
            "data" => $data)
    );
}

function insertDenuncias()
{
    global $os;

    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode(stripslashes($_POST["data"]));
    $data->envio_inspeccion = 'false';
    $data->codigo_tramite = generaCodigoProcesoDenuncia();
    $data->id_persona = $os->get_member_id();
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
        "data" => array($data)
    ));
}

function generaCodigoProcesoDenuncia()
{
    global $os;

    $usuario = $os->get_member_id();
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT MAX(codigo_tramite) AS maximo FROM amc_denuncias";
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

function updateDenuncias()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);

    if (isset($data->envio_inspeccion)) {
        if (!$data->envio_inspeccion)
            $data->envio_inspeccion = 'false';
        else
            $data->envio_inspeccion = 'true';
    }


// genero el listado de valores a insertar
    $cadenaDatos = '';
    foreach ($data as $clave => $valor) {
        $cadenaDatos = $cadenaDatos . $clave . " = '" . $valor . "',";
    }
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql = "UPDATE amc_denuncias SET  $cadenaDatos  WHERE amc_denuncias . id = '$data->id' ";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_denuncias actualizado exitosamente" : $sql->errorCode()
    ));
}

function selectDenunciasForm()
{
    global $os;
    $id = (int)$_POST ['id'];
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT *, (SELECT numero FROM amc_guias WHERE amc_guias.id = a.guia ) as guianumero, (SELECT COUNT(*) FROM amc_denuncias  b WHERE a.cedula = b.cedula and b.cedula <> '') as totaldocumentos FROM amc_denuncias as a  WHERE a.id = $id";
    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $row['procedimientosdetalle'] = selectProcedimientosCadena($row['procedimientos']);
        $data = $row;
    }
    echo json_encode(array(
            "success" => true,
            "data" => $data)
    );
}

function updateDenunciasForm()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $id = $_POST["id"];
    $id_persona = $_POST["id_persona"];
    $recepcion_documento = $_POST["recepcion_documento"];
    $id_tipo_documento = $_POST["id_tipo_documento"];
    $num_documento = $_POST["num_documento"];
    $remitente = $_POST["remitente"];
    $observacion_secretaria = $_POST["observacion_secretaria"];
    $asunto = addslashes($_POST["asunto"]);
    if (isset($_POST["reasignacion"])){
        $reasignacion = $_POST["reasignacion"];
    } else {
        //recuperamos la unidad en base a guia
        if (isset ($_POST["guia"]) ) {
            $valueGuia = $_POST["guia"];
            $os->db->conn->query("SET NAMES 'utf8'");
            $sql = "SELECT id_unidad FROM amc_guias WHERE id = $valueGuia ";
            $result = $os->db->conn->query($sql);
            $row = $result->fetch(PDO::FETCH_ASSOC);
            $reasignacion = $row ['id_unidad'];
        }
    }
    $guia = $_POST["guia"];
    $envio_inspeccion = $_POST["envio_inspeccion"];
    $descripcion_anexos = addslashes($_POST["descripcion_anexos"]);
    $id_caracter_tramite = $_POST["id_caracter_tramite"];
    $cantidad_fojas = $_POST["cantidad_fojas"];
    $cedula = $_POST["cedula"];
    $email = $_POST["email"];

    // se realiza la reasignación
    /*if ($reasignacion == 3)
        $envio_inspeccion = 'true';
    else
        $envio_inspeccion = 'false';*/
    // fin reasignacion

    //para el caso de denuncias se valida que exista cedula y correo
    if ($id_tipo_documento == 1) {
        // se valida que se envio cedula, email
        $error = false;
        $msjError = '';
        if (!isset ($cedula) or $cedula == '') {
            $error = true;
            $msjError = 'Falta cédula. ' . $msjError;
        }
        if (!isset ($email) or $email == '') {
            $error = true;
            $msjError = $msjError . 'Falta email';
        }

        if ($error) {
            echo json_encode(array(
                "success" => false,
                "msg" => $msjError
            ));
            return;
        }

    }
    /*codigo_tramite='$codigo_tramite',*/
    $sql = "UPDATE amc_denuncias SET 
            id_persona = '$id_persona',
            recepcion_documento = '$recepcion_documento',
            id_tipo_documento = '$id_tipo_documento',
            num_documento = '$num_documento',
            remitente = '$remitente',
            asunto = '$asunto',
            observacion_secretaria = '$observacion_secretaria',
            reasignacion = '$reasignacion',
            descripcion_anexos = '$descripcion_anexos',
            id_caracter_tramite = '$id_caracter_tramite',
            cantidad_fojas = '$cantidad_fojas' ,
            cedula = '$cedula' ,
            email = '$email'  ,
            guia = '$guia'  ,
            envio_inspeccion = '$envio_inspeccion'  
         
          WHERE id = '$id' ";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Contenido actualizado exitosamente" : $sql->errorCode()
    ));
}

function deleteDenuncias()
{
    global $os;
    $id = json_decode(stripslashes($_POST["data"]));
    $sql = "DELETE FROM amc_denuncias WHERE id = $id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_denuncias, eliminado exitosamente" : $sql->errorCode()
    ));
}

switch ($_GET['operation']) {
    case 'select' :
        selectDenuncias();
        break;
    case 'insert' :
        insertDenuncias();
        break;
    case 'update' :
        updateDenuncias();
        break;
    case 'selectForm' :
        selectDenunciasForm();
        break;
    case 'updateForm' :
        updateDenunciasForm();
        break;
    case 'delete' :
        deleteDenuncias();
        break;
}
