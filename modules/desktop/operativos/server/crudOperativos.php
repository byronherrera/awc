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

function selectOperativos()
{
    global $os;
    //TODO cambiar columna por defecto en busquedas
    $columnaBusqueda = 'id_zona';

    $where = '';

    if (isset($_POST['filterField'])) {
        $columnaBusqueda = $_POST['filterField'];
    }

    if (isset($_POST['filterText'])) {
        $campo = $_POST['filterText'];
        $campo = str_replace(" ", "%", $campo);

        if ($columnaBusqueda == 'id_zona') {
            $sql = "SELECT id FROM amc_zonas WHERE UPPER(nombre) like UPPER('%$campo%') LIMIT 1";
            $result = $os->db->conn->query($sql);
            $row = $result->fetch(PDO::FETCH_ASSOC);
            if (strlen($row['id']) > 0)
                $campo = $row['id'];
        }

        if ($columnaBusqueda == 'id_persona_encargada') {
            $sql = "SELECT id FROM qo_members WHERE UPPER(first_name) like UPPER('%$campo%') OR UPPER(last_name) like UPPER('%$campo%') OR UPPER(email_address) like UPPER('%$campo%') LIMIT 1";
            $result = $os->db->conn->query($sql);
            $row = $result->fetch(PDO::FETCH_ASSOC);
            if (strlen($row['id']) > 0)
            $campo = $row['id'];
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

    if (isset($_POST['finalizados'])) {
        if ($_POST['finalizados'] == 'true') {
            if ($where == '') {
                $where = " WHERE finalizado <> 'true'";
            } else {
                $where = $where . " AND finalizado <> 'true' ";
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

    $orderby = 'ORDER BY codigo_operativo DESC';
    if (isset($_POST['sort'])) {
        $orderby = 'ORDER BY ' . $_POST['sort'] . ' ' . $_POST['dir'];
    }

    // caso en reportes
    if (isset($_POST['busqueda_tipo_control']) and ($_POST['busqueda_tipo_control'] != '')) {
        $tipo = $_POST['busqueda_tipo_control'];
        if ($where == '') {
            $where = "WHERE id_tipo_control like '%$tipo%'  ";
        } else {
            $where = $where . " AND id_tipo_control like '%$tipo%' ";
        }
    }
    if (isset($_POST['busqueda_nivel_complejidad']) and ($_POST['busqueda_nivel_complejidad'] != '')) {
        $tipo = $_POST['busqueda_nivel_complejidad'];
        if ($where == '') {
            $where = "WHERE id_nivel_complejidad like '%$tipo%'  ";
        } else {
            $where = $where . " AND id_nivel_complejidad like '%$tipo%' ";
        }
    }
    if (isset($_POST['busqueda_zonal']) and ($_POST['busqueda_zonal'] != '')) {
        $tipo = $_POST['busqueda_zonal'];
        if ($where == '') {
            $where = "WHERE zonal = '$tipo' ";
        } else {
            $where = $where . " AND institucion = '$tipo' ";
        }
    }
    if (isset($_POST['busqueda_caracter_tramite']) and ($_POST['busqueda_caracter_tramite'] != '')) {
        $tipo = $_POST['busqueda_caracter_tramite'];
        if ($where == '') {
            $where = "WHERE id_caracter_tramite = '$tipo' ";
        } else {
            $where = $where . " AND id_caracter_tramite = '$tipo' ";
        }
    }

    if (isset($_POST['busqueda_guia']) and ($_POST['busqueda_guia'] != '')) {
        $tipo = $_POST['busqueda_guia'];
        if ($where == '') {
            $where = "WHERE guia = '$tipo' ";
        } else {
            $where = $where . " AND guia = '$tipo' ";
        }
    }

    if (isset($_POST['busqueda_reasignacion']) and ($_POST['busqueda_reasignacion'] != '')) {
        $tipo = $_POST['busqueda_reasignacion'];
        if ($where == '') {
            $where = "WHERE reasignacion in ($tipo) ";
        } else {
            $where = $where . " AND reasignacion in ($tipo) ";
        }
    }


    if (isset($_POST['busqueda_fecha_inicio']) and ($_POST['busqueda_fecha_inicio'] != '')) {
        $fechainicio = $_POST['busqueda_fecha_inicio'];
        if (isset($_POST['busqueda_fecha_fin']) and ($_POST['busqueda_fecha_fin'] != '')) {
            $fechafin = $_POST['busqueda_fecha_fin'];
        } else {
            $fechafin = date('Y\m\d H:i:s');;
        }

        if ($where == '') {
            $where = "WHERE fecha_inicio_planificacion between '$fechainicio' and '$fechafin'  ";
        } else {
            $where = $where . " AND fecha_inicio_planificacion between '$fechainicio' and '$fechafin' ";
        }
    }

    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_operativos $where $orderby LIMIT $start, $limit";
    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    };

    $sql = "SELECT count(*) AS total FROM amc_operativos $where";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    $total = $row['total'];

    echo json_encode(array(
            "total" => $total,
            "success" => true,
            "data" => $data)
    );
}

function insertOperativos()
{
    global $os;

    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode(stripslashes($_POST["data"]));


    $data->finalizado = 'false';
    $data->codigo_operativo = generaCodigoProcesoDenuncia();
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

    $sql = "INSERT INTO amc_operativos($cadenaCampos)
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
    $sql = "SELECT MAX(codigo_operativo) AS maximo FROM amc_operativos";
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

function updateOperativos()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);

    if (isset($data->finalizado)) {
        if (!$data->finalizado)
            $data->finalizado = 'false';
        else
            $data->finalizado = 'true';
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

    $sql = "UPDATE amc_operativos SET  $cadenaDatos  WHERE amc_operativos . id = '$data->id' ";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_operativos actualizado exitosamente" : $sql->errorCode(),
        "message" => $message
    ));
}

function selectOperativosForm()
{
    global $os;
    $id = (int)$_POST ['id'];
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT *, (SELECT numero FROM amc_guias WHERE amc_guias.id = a.guia ) as guianumero, (SELECT COUNT(*) FROM amc_operativos  b WHERE a.cedula = b.cedula and b.cedula <> '') as totaldocumentos FROM amc_operativos as a  WHERE a.id = $id";
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

function updateOperativosForm()
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
    if (isset($_POST["reasignacion"])) {
        $reasignacion = $_POST["reasignacion"];
    } else {
        //recuperamos la unidad en base a guia
        if (isset ($_POST["guia"])) {
            $valueGuia = $_POST["guia"];
            $os->db->conn->query("SET NAMES 'utf8'");
            $sql = "SELECT id_unidad FROM amc_guias WHERE id = $valueGuia ";
            $result = $os->db->conn->query($sql);
            $row = $result->fetch(PDO::FETCH_ASSOC);
            $reasignacion = $row ['id_unidad'];
        }
    }
    $guia = $_POST["guia"];
    $finalizado = $_POST["finalizado"];
    $descripcion_anexos = addslashes($_POST["descripcion_anexos"]);
    $id_caracter_tramite = $_POST["id_caracter_tramite"];
    $cantidad_fojas = $_POST["cantidad_fojas"];
    $cedula = $_POST["cedula"];
    $email = $_POST["email"];


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
    /*codigo_operativo='$codigo_operativo',*/
    $sql = "UPDATE amc_operativos SET 
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
            finalizado = '$finalizado'  
         
          WHERE id = '$id' ";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Contenido actualizado exitosamente" : $sql->errorCode()
    ));
}

function deleteOperativos()
{
    global $os;
    $id = json_decode(stripslashes($_POST["data"]));
    $sql = "DELETE FROM amc_operativos WHERE id = $id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_operativos, eliminado exitosamente" : $sql->errorCode()
    ));
}

switch ($_GET['operation']) {
    case 'select' :
        selectOperativos();
        break;
    case 'insert' :
        insertOperativos();
        break;
    case 'update' :
        updateOperativos();
        break;
    case 'selectForm' :
        selectOperativosForm();
        break;
    case 'updateForm' :
        updateOperativosForm();
        break;
    case 'delete' :
        deleteOperativos();
        break;
}
function validarCedulaCorreo($id)
{
    // true en caso que no exista ni correo ni cedula
    // false  en caso que exista correo y cedula
    //return false;

    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT cedula, email FROM amc_operativos WHERE id = $id";
    $result = $os->db->conn->query($sql);

    $row = $result->fetch(PDO::FETCH_ASSOC);
    if ((strlen($row['cedula']) == 0) or (strlen($row['email']) == 0)) {
        return true;
    } else {
        return false;
    }
}
