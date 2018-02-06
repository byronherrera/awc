
<?php
require_once '../../../../server/os.php';
require_once '../../../common/Classes/funciones.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}

function selectOrdenanzas()
{
    global $os;

    $columnaBusqueda = 'codigo_tramite';
    //$where = '';

    //forzamos que solo sea los asignados a inspeccion
    $where = 'WHERE reasignacion = 3 and recepcion_inspeccion = 1 and procesado_inspeccion = 0 ';

    if (isset($_POST['filterField'])) {
        $columnaBusqueda = $_POST['filterField'];

    }

    if (isset($_POST['filterText'])) {
        $campo = $_POST['filterText'];
        $campo = str_replace(" ", "%", $campo);

        //para el caso de busqueda por guia, recuperamos el id de la guia
        if ($columnaBusqueda == 'guia') {

            $sql = "SELECT id FROM amc_inspeccion WHERE numero = '$campo'";
            $numguia = $os->db->conn->query($sql);
            if ($numguia) {
                $row = $numguia->fetch(PDO::FETCH_ASSOC);
                if ($row) {
                    $campo = $row['id'];
                }
            }
            $where = " WHERE $columnaBusqueda LIKE '%$campo%' AND despacho_secretaria = 'true'";
        } else
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

    $orderby = 'ORDER BY codigo_tramite DESC';
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
/*
    if (isset($_POST['busqueda_reasignacion']) and ($_POST['busqueda_reasignacion'] != '')) {
        $tipo = $_POST['busqueda_reasignacion'];
        if ($where == '') {
            $where = "WHERE reasignacion in ($tipo) ";
        } else {
            $where = $where . " AND reasignacion in ($tipo) ";
        }
    }
*/

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


    $sql = "SELECT * FROM amc_inspeccion $where $orderby LIMIT $start, $limit";
     $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {

        $data[] = $row;
    };

    $sql = "SELECT count(*) AS total FROM amc_inspeccion $where";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    $total = $row['total'];

    echo json_encode(array(
            "total" => $total,
            "success" => true,
            "data" => $data)
    );
}

function insertOrdenanzas()
{
    global $os;

    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode(stripslashes($_POST["data"]));
    $data->id = generaCodigoProcesoOrdenanza();
    $data->id_inspeccion = generaNuevoCodigoInspeccion();
    $data->fecha_recepcion_documento = date('Y-m-d H:i:s');
    //genero el listado de nombre de campos

    $cadenaDatos = '';
    $cadenaCampos = '';
    foreach ($data as $clave => $valor) {
        $cadenaCampos = $cadenaCampos . $clave . ',';
        $cadenaDatos = $cadenaDatos . "'" . $valor . "',";
    }
    $cadenaCampos = substr($cadenaCampos, 0, -1);
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql = "INSERT INTO amc_inspeccion($cadenaCampos)
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

function generaCodigoProcesoOrdenanza()
{
    global $os;

    $usuario = $os->get_member_id();
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT MAX(id) AS maximo FROM amc_inspeccion";
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

function updateOrdenanzas()
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

    $sql = "UPDATE amc_inspeccion SET  $cadenaDatos  WHERE amc_inspeccion.id = '$data->id' ";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_denuncias actualizado exitosamente" : $sql->errorCode(),
        "message" => $message
    ));
}

function validarCedulaCorreo($id)
{
    // true en caso que no exista ni correo ni cedula
    // false  en caso que exista correo y cedula
    //return false;

    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT cedula, email FROM amc_denuncias WHERE id = $id";
    $result = $os->db->conn->query($sql);

    $row = $result->fetch(PDO::FETCH_ASSOC);
    if ((strlen($row['cedula']) == 0) or (strlen($row['email']) == 0)) {
        return true;
    } else {
        return false;
    }
}


function selectOrdenanzasForm()
{
    global $os;
    $id = (int)$_POST ['id'];
    if($id!=0){
        $os->db->conn->query("SET NAMES 'utf8'");
        $sql = "SELECT * FROM amc_inspeccion WHERE amc_inspeccion.id_denuncia = $id";
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

}

function updateOrdenanzasForm()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $id = $_POST["id"];
    $nombre = $_POST["nombre"];
    $nombre_completo = $_POST["nombre_completo"];
    $activo = $_POST["activo"];
    $orden = $_POST["orden"];

    $guia = $_POST["guia"];
    $id = $_POST["id"];
    $nombre = $_POST["nombre"];
    $nombre_completo = $_POST["nombre_completo"];
    $activo = $_POST["activo"];
    $orden = $_POST["orden"];

    /*codigo_tramite='$codigo_tramite',*/
    $sql = "UPDATE amc_denuncias SET 
            id = '$id',
            nombre = $nombre,
            nombre_completo = $nombre_completo,
            activo = $activo,
            orden = $orden
            
         
          WHERE id = '$id' ";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Contenido actualizado exitosamente" : $sql->errorCode()
    ));
}

function deleteOrdenanzas()
{
    global $os;
    $id = json_decode(stripslashes($_POST["data"]));
    $sql = "DELETE FROM amc_inspeccion WHERE id = $id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_denuncias, eliminado exitosamente" : $sql->errorCode()
    ));
}

switch ($_GET['operation']) {
    case 'select' :
        selectOrdenanzasForm();
        break;
    case 'insert' :
        insertOrdenanzas();
        break;
    case 'update' :
        updateOrdenanzas();
        break;
    case 'selectForm' :
        selectOrdenanzasForm();
        break;
    case 'updateForm' :
        updateOrdenanzasForm();
        break;
    case 'delete' :
        deleteOrdenanzas();
        break;
}
