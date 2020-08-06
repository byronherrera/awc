<?php
require_once '../../../../server/os.php';
require_once '../../../common/Classes/funciones.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}

function selectDenuncias()
{
    global $os;

    $columnaBusqueda = 'busqueda_todos';
    $where = '';

    if (isset($_POST['filterField'])) {
        $columnaBusqueda = $_POST['filterField'];
    }

    if (isset($_POST['filterText'])) {
        $campo = $_POST['filterText'];
        $campo = str_replace(" ", "%", $campo);
        if ($columnaBusqueda != 'busqueda_todos') {
            $where = " WHERE $columnaBusqueda LIKE '%$campo%'";
        } else {
            $listadoCampos = array(
                'numero_tramite',
                'ruc_licencia',
                'razon_social',
                'codigo',
                'descripcion_actividad_economica',
                'patente',
                'predio',
                'categoria',
                'secretaria_otorgante',
                'parroquia',
                'calle',
                'calle2',
                'numero',
                'telefono1',
                'telefono2',
                'mail',
                'estado',
                'zonal'
            );
            $cadena = '';
            foreach ($listadoCampos as &$valor) {
                $cadena = $cadena . " $valor LIKE '%$campo%' OR ";
            }

            $cadena = substr($cadena, 0, -3);
            $where = " WHERE $cadena ";
        }
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
                $where = " WHERE despacho_secretaria <> 'true'";
            } else {
                $where = $where . " AND despacho_secretaria <> 'true' ";
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
    $orderby = 'ORDER BY id ASC';
    if (isset($_POST['sort'])) {
        $orderby = 'ORDER BY ' . $_POST['sort'] . ' ' . $_POST['dir'];
    }
    // para los reportes
    if (isset($_POST['busqueda_tipo_documento']) and ($_POST['busqueda_tipo_documento'] != '')) {
        $tipo = $_POST['busqueda_tipo_documento'];
        if ($where == '') {
            $where = "WHERE id_tipo_documento = $tipo ";
        } else {
            $where = $where . " AND id_tipo_documento = $tipo ";
        }
    }
    if (isset($_POST['busqueda_institucion']) and ($_POST['busqueda_institucion'] != '')) {
        $tipo = $_POST['busqueda_institucion'];
        if ($where == '') {
            $where = "WHERE institucion = '$tipo' ";
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
            $where = "WHERE recepcion_documento between '$fechainicio' and '$fechafin'  ";
        } else {
            $where = $where . " AND recepcion_documento between '$fechainicio' and '$fechafin' ";
        }
    }


    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_planificacion_notificaciones $where $orderby LIMIT $start, $limit";
    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    };

    $sql = "SELECT count(*) AS total FROM amc_planificacion_notificaciones $where";
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

    $data->idingreso = $os->get_member_id();

    $data->nombres = getName($data->id_responsable);
    $data->apellidos = getLastName($data->id_responsable);


    //genero el listado de nombre de campos

    $cadenaDatos = '';
    $cadenaCampos = '';
    foreach ($data as $clave => $valor) {
        $cadenaCampos = $cadenaCampos . $clave . ',';
        $cadenaDatos = $cadenaDatos . "'" . $valor . "',";
    }
    $cadenaCampos = substr($cadenaCampos, 0, -1);
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql = "INSERT INTO amc_planificacion_notificaciones($cadenaCampos)
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

function updateDenuncias()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);

    $message = '';

    //$data->activo = $data->activo == 1 ? true : false;

    $data->nombres = getName($data->id_responsable);
    $data->apellidos = getLastName($data->id_responsable);


    // genero el listado de valores a insertar
    $cadenaDatos = '';
    foreach ($data as $clave => $valor) {
        if (($clave == "fecha_inicio") || ($clave == "fecha_entrega") || ($clave == "idingreso")|| ($clave == "porcentaje") || ($clave == "valor")) {
            if ($valor == '')
            $cadenaDatos = $cadenaDatos . $clave . " = NULL,";
        } else {
            $cadenaDatos = $cadenaDatos . $clave . " = '" . $valor . "',";
        }
    }
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql = "UPDATE amc_planificacion_notificaciones SET  $cadenaDatos  WHERE amc_planificacion_notificaciones.id = '$data->id' ";

    $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_planificacion_notificaciones actualizado exitosamente" : $sql->errorCode(),
        "message" => $message
    ));
}


function deleteDenuncias()
{
    global $os;
    $id = json_decode(stripslashes($_POST["data"]));
    $sql = "DELETE FROM amc_planificacion_notificaciones WHERE id = $id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_planificacion_notificaciones, eliminado exitosamente" : $sql->errorCode()
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
    case 'delete' :
        deleteDenuncias();
        break;
}
