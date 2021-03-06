<?php
require_once '../../../../server/os.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}

function selectOrdenanzas()
{
    global $os;

    $columnaBusqueda = 'busqueda_todos';
    $usuarioLog = $os->get_member_id();
    $where = '';


//    if (isset($_POST['filterText'])) {
//        $campo = $_POST['filterText'];
//        $campo = str_replace(" ", "%", $campo);
//        if ($columnaBusqueda != 'busqueda_todos') {
//            $where = " WHERE $columnaBusqueda LIKE '%$campo%'";
//        } else {
//            $listadoCampos = array(
//                'busqueda_fecha_inicio',
//                'busqueda_fecha_fin',
//                'memo_ingreso',
//                'fecha_ingreso',
//                'unidad',
//                'numero_expediente',
//                'nombre_administrado',
//                'nombre_establecimiento',
//                'cedula_ruc',
//                'reincidencia',
//                'ordenanza',
//                'articulo_numeral',
//                'iniciado_por',
//                'entidad',
//                'numero_informe',
//                'medida_cautelar',
//                'estado',
//                'funcionario',
//                'envio_expediente',
//                'fecha_envio',
//            );
//            $cadena = '';
//            foreach ($listadoCampos as &$valor) {
//                $cadena  = $cadena  .   " $valor LIKE '%$campo%' OR ";
//            }
//            $cadena = substr($cadena,0,-3);
//            $where = " WHERE $cadena ";
//        }
//    }
//print_r($_POST);
    if(isset ($_POST['accesosResolutores'])){
        $acceso = $_POST['accesosResolutores'];
        if($acceso=='true'){
            if($where == ''){
                $where = " WHERE funcionario = $usuarioLog ";
            }else{
                $where = $where . " AND funcionario = $usuarioLog ";
            }
        }
    }

    if (isset($_POST['busqueda_fecha_inicio_providencias']) && isset($_POST['busqueda_fecha_fin_providencias']) && $_POST['busqueda_fecha_inicio_providencias']!="" && $_POST['busqueda_fecha_fin_providencias']!="") {
        $busqueda_fecha_inicio = $_POST['busqueda_fecha_inicio_providencias'];
        $busqueda_fecha_fin = $_POST['busqueda_fecha_fin_providencias'];
        if($where == ''){
            $where = " WHERE cast(b.fecha_providencia as date) >= '$busqueda_fecha_inicio' AND cast(b.fecha_providencia as date) <= '$busqueda_fecha_fin' ";
        }else{
            $where = $where . " AND cast(b.fecha_providencia as date) >= '$busqueda_fecha_inicio' AND cast(b.fecha_providencia as date) <= '$busqueda_fecha_fin' ";
        }
    }
    if (isset($_POST['ordenanza']) && $_POST['ordenanza']!="" ) {
        $filtroOrdenanza = $_POST['ordenanza'];
        if($where == ''){
            $where = " WHERE ordenanza = '$filtroOrdenanza' ";
        }else{
            $where = $where . " AND ordenanza = '$filtroOrdenanza' ";
        }
    }
    if (isset($_POST['resolucion_de']) && $_POST['resolucion_de']!="" ) {
        $filtroResolucion_de = $_POST['resolucion_de'];
        if($where == ''){
            $where = " WHERE resolucion_de = '$filtroResolucion_de' ";
        }else{
            $where = $where . " AND resolucion_de = '$filtroResolucion_de' ";
        }
    }
    if (isset($_POST['funcionario']) && $_POST['funcionario']!="" ) {
        $filtroFuncionario = $_POST['funcionario'];
        if($where == ''){
            $where = " WHERE funcionario = '$filtroFuncionario' ";
        }else{
            $where = $where . " AND funcionario = '$filtroFuncionario' ";
        }
    }

    //$usuarioLog = $os->get_member_id();



    if (isset ($_POST['start']))
        $start = $_POST['start'];
    else
        $start = 0;

    if (isset ($_POST['limit']))
        $limit = $_POST['limit'];
    else
        $limit = 100;
    $orderby = 'ORDER BY a.id ASC';

    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT numero_providencia, fecha_providencia, tipo_providencia, memo_ingreso,fecha_ingreso, unidad, numero_interno, numero_expediente,nombre_administrado, nombre_establecimiento,
                cedula_ruc, reincidencia, ordenanza, iniciado_por, entidad, numero_informe, medida_cautelar,
                estado, funcionario, envio_expediente, fecha_envio
FROM amc_libro_diario a INNER JOIN amc_providencias b ON a.id = b.id_libro_diario $where $orderby LIMIT $start, $limit";
//    echo $sql;
    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    };
    $sql = "";

    $sql = "SELECT count(*) AS total FROM amc_libro_diario a INNER JOIN amc_providencias b ON a.id = b.id_libro_diario $where";
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
    //$data->despacho_secretaria = 'false';
    $data->id = generaCodigoProcesoOrdenanza();
    //$data->orden = generaCodigoProcesoOrdenanza();
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

    $sql = "INSERT INTO amc_libro_diario($cadenaCampos)
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
    $sql = "SELECT MAX(id) AS maximo FROM amc_libro_diario";
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

    $sql = "UPDATE amc_libro_diario SET  $cadenaDatos  WHERE amc_libro_diario.id = '$data->id' ";
    //echo ($sql);
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_libro_diario actualizado exitosamente" : $sql->errorCode(),
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
    $sql = "SELECT cedula, email FROM amc_libro_diario WHERE id = $id";
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
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT *, (SELECT numero FROM amc_guias WHERE amc_guias.id = a.guia ) as guianumero, (SELECT COUNT(*) FROM amc_libro_diario  b WHERE a.cedula = b.cedula and b.cedula <> '') as totaldocumentos FROM amc_libro_diario as a  WHERE a.id = $id";
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

function updateOrdenanzasForm()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $id = $_POST["id"];
    $nombre = $_POST["nombre"];
    $nombre_completo = $_POST["nombre_completo"];
    $activo = $_POST["activo"];
    //$orden = $_POST["orden"];

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
    $id = $_POST["id"];
    $nombre = $_POST["nombre"];
    $nombre_completo = $_POST["nombre_completo"];
    $activo = $_POST["activo"];
    //$orden = $_POST["orden"];


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
    $sql = "UPDATE amc_libro_diario SET 
            id = '$id',
            //nombre = $nombre,
            //nombre_completo = $nombre_completo,
            //activo = $activo,
            //orden = $orden
            
         
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
    $sql = "DELETE FROM amc_libro_diario WHERE id = $id";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_libro_diario, eliminado exitosamente" : $sql->errorCode()
    ));
}

switch ($_GET['operation']) {
    case 'select' :
        selectOrdenanzas();
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
