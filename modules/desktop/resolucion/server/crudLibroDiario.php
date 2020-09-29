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
    if (isset($_POST['filterField'])) {
        $columnaBusqueda = $_POST['filterField'];
    }


    if (isset($_POST['filterText'])) {
        $campo = $_POST['filterText'];
        $campo = str_replace(" ", "%", $campo);
        if ($columnaBusqueda == 'fecha_ingreso') {
            $where = " WHERE ($columnaBusqueda LIKE '%$campo%'";
        }
        elseif ($columnaBusqueda == 'memo_ingreso') {
            $where = " WHERE ($columnaBusqueda LIKE '%$campo%'";
        }
        elseif ($columnaBusqueda == 'nombre_funcionario') {
                $sql = "SELECT id FROM qo_members WHERE first_name like UPPER('%$campo%') OR last_name like UPPER('%$campo%') ";
                $result = $os->db->conn->query($sql);
                while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                    if (strlen($row['id']) > 0) {
                        $campo = $row['id'];
                        if ($where == '')
                            $where = " WHERE (funcionario = '$campo'";
                        else
                            $where = $where . " OR funcionario = '$campo'";
                    }
                }
        }
        else{
            $listadoCampos = array(
                'fecha_ingreso',
                'numero_expediente',
                'nombre_administrado',
                'nombre_establecimiento',
                'direccion_notificacion',
                'direccion_domicilio',
                'cedula_ruc',
                'entidad',
                'numero_informe',
                'fecha_envio',
                'numero_memorando',
                'memo_ingreso'
            );
            $cadena = '';
            foreach ($listadoCampos as &$valor) {
                $cadena  = $cadena  .   " $valor LIKE '%$campo%' OR ";
            }

            $cadena = substr($cadena,0,-3);
            $where = " WHERE (".$cadena;
        }

    }

    if(isset ($_POST['accesosResolutores'])){
        $acceso = $_POST['accesosResolutores'];
        if($acceso=='true'){
            if($where == ''){
                $where = " WHERE funcionario = $usuarioLog ";
            }else{
                $where = $where . " ) AND funcionario = $usuarioLog ";
            }
        }
        else{
            if($where != ''){
                $where = $where . " ) ";
            }
            }
        }

    if ($where == '') {
        $where = " WHERE es_ejecucion = 0";
    }
    else {
        $where = $where . " AND es_ejecucion = 0";
    }

//    $orderby = 'ORDER BY a.id ASC';
    if (isset($_POST['sort'])) {
        $orderby = 'ORDER BY ' . $_POST['sort'] . ' ' . $_POST['dir'];
    }else{
        $orderby = 'ORDER BY id ASC';
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
//    $orderby = 'ORDER BY id ASC';




    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_libro_diario $where $orderby LIMIT $start, $limit";
    //echo $sql;
    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    };

    $sql = "SELECT count(*) AS total FROM amc_libro_diario $where";
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
//    echo ($sql);
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
