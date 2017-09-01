<?php
require_once '../../../server/os.php';
$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}

function usuario()
{
    global $os;
    $usuario = $os->get_member_id();

    echo json_encode(array(
            "success" => true,
            "data" => $usuario)
    );
}
function comboProcedimiento()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_procedimientos ORDER BY id";
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
function comboZonas()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT id, nombre FROM amc_zonas WHERE activo = 1 ORDER BY id";
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

function comboReasignancion()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT id, nombre FROM amc_unidades WHERE activo = 1 ORDER BY id";
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

function comboPersonalSecretaria()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT
            qo_members.id, 
            CONCAT(qo_members.first_name, ' ', qo_members.last_name)     AS nombre
            FROM
            qo_members 
            WHERE
                active = 1
             
            ORDER BY
            qo_members.last_name ASC,
            qo_members.first_name ASC";
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
function comboUnidades()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    /*$sqlZonal = '';
    if (isset($_POST['zonales'])) {
        if ($_POST['zonales'] == 'true') {
            $sqlZonal = " AND id = 2";
        }
    }*/

    //$sql = "SELECT id, nombre FROM amc_unidades WHERE activo = 1 $sqlZonal ORDER BY id";
    $sql = "SELECT * FROM amc_unidades WHERE activo = 1 ORDER BY id";
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

function comboUnidadesTotal()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    /*$sqlZonal = '';
    if (isset($_POST['zonales'])) {
        if ($_POST['zonales'] == 'true') {
            $sqlZonal = " AND id = 2";
        }
    }*/


    //$sql = "SELECT amc_unidades.id, CONCAT(amc_unidades.nombre, 'SSSS') AS nombre FROM amc_unidades WHERE activo = 1 ORDER BY id";
    $sql = "SELECT 
                b.id, IF((SELECT COUNT(*) FROM amc_denuncias as  a WHERE a.reasignacion = b.id AND despacho_secretaria <> 'true' ) = 0,b.nombre,
                (CONCAT(b.nombre, ' ( ',(SELECT COUNT(*) FROM amc_denuncias as  a WHERE a.reasignacion = b.id AND despacho_secretaria <> 'true' ), ' ) '))) AS nombre
                FROM amc_unidades b
                WHERE b.activo = 1
                ORDER BY b.id ";

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

function comboDepInspeccion()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_departamentos WHERE activo = 1 AND unidad = 3   ORDER BY id";
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
function comboGuia()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT id, CONCAT(numero,' / ' ,unidad) as nombre FROM amc_guias ORDER BY id DESC LIMIT 60";
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

function comboPersonalInspeccion()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT id, CONCAT(first_name, ' ', last_name) AS nombre  FROM amc_personal WHERE active = 1  AND unidad = 3 ORDER BY id";
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

function comboSexo()
{
    $data[] = array("id" => "I", "nombre"=>"Indistino");
    $data[] = array("id" => "H", "nombre"=>"Hombre");
    $data[] = array("id" => "M", "nombre"=>"Mujer");

    echo json_encode(array(
            "success" => true,
            "data" => $data)
    );

}

function comboActivo()
{
    $data[] = array("id" => "1", "nombre"=>"Si");
    $data[] = array("id" => "0", "nombre"=>"No");

    echo json_encode(array(
            "success" => true,
            "data" => $data)
    );

}
function comboInstituciones()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT DISTINCT  institucion AS nombre FROM amc_denuncias WHERE length(institucion) > 0 ORDER BY institucion";
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

function comboCargo()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM cargo";
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

switch ($_GET['tipo']) {
    case 'usuario' :
        usuario();
        break;
    case 'procedimiento' :
        comboProcedimiento();
        break;
    case 'zonas' :
        comboZonas();
        break;
    case 'reasignancion' :
        comboReasignancion();
        break;
    case 'unidades' :
        comboUnidades();
        break;
    case 'unidadestotal' :
        comboUnidadesTotal();
        break;
    case 'depInspeccion' :
        comboDepInspeccion();
        break;
    case 'guia' :
        comboGuia();
        break;
    case 'personalsecretaria' :
        comboPersonalSecretaria();
        break;
    case 'personalinspeccion' :
        comboPersonalInspeccion();
        break;
    case 'cargo' :
        comboCargo();
        break;
    case 'sexo' :
        comboSexo();
        break;

    case 'activo' :
        comboActivo();
        break;

    case 'instituciones' :
        comboInstituciones();
        break;
}
?>




