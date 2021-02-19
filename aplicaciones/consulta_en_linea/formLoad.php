<?php
header('Content-type: text/html; charset=utf-8');
require_once '../../server/os.php';
require_once '../../modules/common/Classes/funciones.php';
cors();
$os = new os();

$opcion = isset($_GET['opcion']) ? $_GET['opcion'] : '';
$usuario = isset($_GET['usuario']) ? $_GET['usuario'] : '';

switch ($opcion) {
    // pedidos dados
    case "actosbioseguridad":
        getactosbioseguridad($usuario);
        break;
    case "actosclausura":
        getactosclausura($usuario);
        break;
    case "dataInstruccion":
        getdataInstruccion($usuario);
        break;
    case "dataResolucion":
        getdataResolucion($usuario);
        break;
    case "dataEjecucion":
        getdataEjecucion($usuario);
        break;
    case "dataApp":
        getdataApp($usuario);
        break;
    // fin pedidos datos

    // funciones adicionales
    case "funcionario":
        getFuncionarios();
        break;
    case "ordenanza":
        getOrdenanza();
        break;
    case "idzonal":
        getIdzonal();
        break;
    case "totales":
        getTotales();
        break;
    case "totalesDetalle":
        getTotalesDetalle();
        break;

    case "ingresoConsulta":
        // graba en base de datos
        // todo funcion crear
        $data = ingresaPedidoInformacion();
        // se genera el texto para el envio del mail de notificación
        $fecha = date("Y-m-d, G:i");
        $nombre = $data->nombres;

        $contenidoMailRecepcion = getmensajeSolicitudInformacionReceptada($nombre, $fecha);
        // envio email al encargado del negocio

        $email = $data->correoelectronico;
        $asunto = "Nueva Solicitud de Informcación, " . " - " . $email;


        $funcionarios = ["tanya.ortega@quito.gob.ec", "francisco.collaguazo@quito.gob.ec"];
        //$funcionarios = ["byron.herrera@quito.gob.ec" ];

        $funcionariosSeguimiento = ["byron.herrera@quito.gob.ec"];
        $from = 'Solicitud de Información - Agencia Metropolitana de Control';
        // activar envio de correos de prueba
        $prueba = true;
        $resultado = enviarEmailAmc($email, $asunto, $contenidoMailRecepcion, $funcionarios, $funcionariosSeguimiento, $from, $prueba);
        break;
}


function ingresaPedidoInformacion()
{
    global $os;
    $data = '';
    if (!is_object($data)) {
        $data = new stdClass;
    }

    // se sube el archivo anexo

    // validamos que exista el archivo para cargar caso contrario ignorar
    // array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);

    $listado1 = array();
    if ($_FILES['archivo1']['name'] != null) {

        $nombreArchivo = eliminar_acentos($_FILES['archivo1']["name"]);

        $temp_file_name = $_FILES['archivo1']['tmp_name'];
        $uploaddir = __DIR__ . "/../../archivos/consulta_en_linea/";

        $vowels = array("[", "]");
        $nombreArchivo = str_replace($vowels, "", $nombreArchivo);
        $today = date("Y-n-j-H-i");

        $uploadfile = $uploaddir . basename($today . '-' . $nombreArchivo);

        if (move_uploaded_file($temp_file_name, $uploadfile)) {
            $listado1['archivo1'] = "archivos/consulta_en_linea/" . basename($today . '-' . $nombreArchivo);
        }
    }

    if (count($listado1) > 0) {
        $data->imagencedula = json_encode($listado1);
    }

    $data->cedula = $_POST["cedulaformulario"];
    $data->nombres = $_POST["nombresformulario"];
    $data->apellidos = $_POST["apellidosformulario"];

    $data->correoelectronico = $_POST["correoformulario"];

    $data->celular = $_POST["celularformulario"];
    $data->solicitud = $_POST["documentoformulario"];
    $data->observaciones = $_POST["observacionesformulario"];
    $data->idzonal = $_POST["idzonal"];
    $data->zonal = getNombreZonal($_POST["idzonal"]); //se recupera el nombre

    // $data->imagencedula = $_POST["imagencedula"];
    $data->fecha = date('Y-m-d h:i:s'); //todo
    $data->ip = recuperaIP(); //todo

    $cadenaDatos = '';
    $cadenaCampos = '';
    foreach ($data as $clave => $valor) {
        $cadenaCampos = $cadenaCampos . $clave . ',';
        $cadenaDatos = $cadenaDatos . "'" . $valor . "',";
    }
    $cadenaCampos = substr($cadenaCampos, 0, -1);
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "INSERT INTO amc_proc_solicitud_informacion ($cadenaCampos) VALUES ($cadenaDatos);";
    //echo $sql;
    $sql = $os->db->conn->prepare($sql);
    $result = $sql->execute();

// genero el nuevo codigo de proceso
    $ultimo = $os->db->conn->lastInsertId();
    $data->id = $ultimo;

    echo json_encode(array(
        "success" => true,
        "msg" => $sql->errorCode() == 0 ? "insertado exitosamente" : $sql->errorCode(),
        "data" => array($data)
    ));

    return $data;
}

function getmensajeSolicitudInformacionReceptada($nombre = '', $fecha = '')
{
    $texto = '<div style="font-family: Arial, Helvetica, sans-serif;">
                <div style="float: right; clear: both; width: 100%;"><img style="float: right;" src="http://agenciadecontrol.quito.gob.ec/images/logoamc.png" alt="" width="30%" /></div>
                <div style="clear: both; margin: 50px 10%; float: left;">
                <p><br><br>
                 Estimado, ' . $nombre . ' hemos recibido su solicitud, un funcionario se encargará de gestionar su pedido.<br>
                <br>
                <br>    
                <p>Fecha : ' . $fecha . '</p>
                <p>Atentamente </p>
                <p>GAD MDMQ AGENCIA METROPOLITANA DE CONTROL</p>
                <p></p>
                <p>IMPORTANTE</p>
                <p>************************************************</p>
                <p>- No responder este correo es un Mensaje Automático.</p>
                </div>
                <p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://agenciadecontrol.quito.gob.ec/images/piepagina.png" alt="" width="100%" /></p>
                </div>
                ';
    return $texto;
}


//recupera los datos
function getactosbioseguridad($id)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_sancion_emergencia  WHERE cedula = '$id';";
    $result = $os->db->conn->query($sql);
    $resultados = $result->fetchAll(PDO::FETCH_ASSOC);
    if (count($resultados) > 0) {
        $sql2 = "SELECT * FROM amc_libro_diario  WHERE cedula_ruc = '$id' AND es_ejecucion = '0' ;";

        $result2 = $os->db->conn->query($sql2);
        $resultados2 = $result2->fetchAll(PDO::FETCH_ASSOC);

        if (count($resultados2) > 0) {
            if (strlen($resultados2[0]['url_documento']) > 0)
            {
                $test = json_decode($resultados[0]['imagenacto'] );
                $test->resolucion = $resultados2[0]['url_documento'];
                $resultados[0]['imagenacto'] = json_encode($test);
            }
        }

        echo json_encode(array(
            "success" => true,
            "data" => $resultados
        ));
    } else {
        echo json_encode(array(
            "success" => false,
            "data" => array()
        ));
    }
}

function getactosclausura($id)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $sql = "SELECT * FROM amc_sancion_emergencia_locales  WHERE cedula = '$id';";

    $result = $os->db->conn->query($sql);
    $resultados = $result->fetchAll(PDO::FETCH_ASSOC);
    if (count($resultados) > 0) {
        echo json_encode(array(
            "success" => true,
            "data" => $resultados
        ));
    } else {
        echo json_encode(array(
            "success" => false,
            "data" => array()
        ));
    }
}

function getdataInstruccion($id)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
// TODO falta declarar
    $sql = "SELECT * FROM amc_expediente  WHERE cedula_ruc = '$id';";


    $result = $os->db->conn->query($sql);
    $resultados = $result->fetchAll(PDO::FETCH_ASSOC);
    if (count($resultados) > 0) {
        echo json_encode(array(
            "success" => true,
            "data" => $resultados
        ));
    } else {
        echo json_encode(array(
            "success" => false,
            "data" => array()
        ));
    }
}

function getdataResolucion($id)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_libro_diario  WHERE cedula_ruc = '$id' AND es_ejecucion = '0' ;";

    $result = $os->db->conn->query($sql);
    $resultados = $result->fetchAll(PDO::FETCH_ASSOC);
    if (count($resultados) > 0) {
        echo json_encode(array(
            "success" => true,
            "data" => $resultados
        ));
    } else {
        echo json_encode(array(
            "success" => false,
            "data" => array()
        ));
    }
}

function getdataEjecucion($id)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $sql = "SELECT * FROM amc_libro_diario  WHERE cedula_ruc = '$id' AND es_ejecucion = '1' ;";

    $result = $os->db->conn->query($sql);
    $resultados = $result->fetchAll(PDO::FETCH_ASSOC);
    if (count($resultados) > 0) {
        echo json_encode(array(
            "success" => true,
            "data" => $resultados
        ));
    } else {
        echo json_encode(array(
            "success" => false,
            "data" => array()
        ));
    }
}

function getdataApp($id)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $sql = "SELECT * FROM amc_actos_inicios  WHERE cedula = '$id' order by fechaInfraccion desc ;";

    $result = $os->db->conn->query($sql);
    $resultados = $result->fetchAll(PDO::FETCH_ASSOC);
    if (count($resultados) > 0) {
        echo json_encode(array(
            "success" => true,
            "data" => $resultados
        ));
    } else {
        echo json_encode(array(
            "success" => false,
            "data" => array()
        ));
    }

    /*$fs = new Firestore('formulario');
    $data= $fs->get($id);

    if (strlen($data['foto']) > 0) {
        //$link1 = json_decode($data['foto']);
        $data['foto'] = "<a href='" . $data['foto'] . "' target='_blank'>Ver foto</a>";;
    } else {
        $valor[$data] = '';
    }

    if (strlen($data['foto1']) > 0) {
        //$link2 = json_decode($data['foto1']);
        $data['foto1'] = "<a href='" . $data['foto1'] . "' target='_blank'>Ver foto1</a>";;
    } else {
        $data['foto1'] = '';
    }

    if (strlen($data['foto2']) > 0) {
        //$link2 = json_decode($data['foto1']);
        $data['foto2'] = "<a href='" . $data['foto2'] . "' target='_blank'>Ver foto2</a>";;
    } else {
        $data['foto2'] = '';
    }

    $data['aislamiento_obligatorio'] =  ($data['aislamiento_obligatorio'])  ? 'SI' :  'NO';
    $data['conductorSinMascarilla'] =  ($data['conductorSinMascarilla'])  ? 'SI' :  'NO';
    $data['infraccionSinMascarilla'] =  ($data['infraccionSinMascarilla'])  ? 'SI' :  'NO';
    $data['infraccionSinMascarilla2'] =  ($data['infraccionSinMascarilla2'])  ? 'SI' :  'NO';
    $data['infraccioncedula'] =  ($data['infraccioncedula'])  ? 'SI' :  'NO';
    $data['infracciondistancia'] =  ($data['infracciondistancia'])  ? 'SI' :  'NO';
    $data['sancion_25_SMU'] =  ($data['sancion_25_SMU'])  ? 'SI' :  'NO';
    $data['sancion_50_SMU'] =  ($data['sancion_50_SMU'])  ? 'SI' :  'NO';
    $data['sancion_tres_salarios'] =  ($data['sancion_tres_salarios'])  ? 'SI' :  'NO';
    $data['sancion_un_salario_medio'] =  ($data['sancion_un_salario_medio'])  ? 'SI' :  'NO';

    if (count($data) > 0) {
        echo json_encode(array(
            "success" => true,
            "data" => $data
        ));
    } else {
        echo json_encode(array(
            "success" => false,
            "data" => array()
        ));
    }*/

}

// fin de recuperacion de datos
function getFuncionarios()
{

    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT CONCAT(last_name,' ',first_name) AS text, id AS valor FROM `qo_members` WHERE active = 1 ORDER BY text;";

    $result = $os->db->conn->query($sql);
    $resultado = $result->fetchAll(PDO::FETCH_ASSOC);
    if (count($resultado) > 0) {
        echo json_encode(array(
            "success" => true,
            "data" => array($resultado)
        ));

    } else {
        echo json_encode(array(
            "success" => false,
            "data" => array()
        ));
    }
}

function getOrdenanza()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT nombre AS text, id AS valor FROM `amc_ordenanzas` WHERE activo = 1 ORDER BY orden;";

    $result = $os->db->conn->query($sql);
    $resultado = $result->fetchAll(PDO::FETCH_ASSOC);
    if (count($resultado) > 0) {
        echo json_encode(array(
            "success" => true,
            "data" => array($resultado)
        ));

    } else {
        echo json_encode(array(
            "success" => false,
            "data" => array()
        ));
    }
}

function getIdzonal()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $sql = "SELECT nombre AS text, id AS valor FROM `amc_zonas` WHERE activo = 1 and combos = 1 ORDER BY text;";

    $result = $os->db->conn->query($sql);
    $resultado = $result->fetchAll(PDO::FETCH_ASSOC);
    if (count($resultado) > 0) {
        echo json_encode(array(
            "success" => true,
            "data" => array($resultado)
        ));

    } else {
        echo json_encode(array(
            "success" => false,
            "data" => array()
        ));
    }
}

function getTotales()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    header("Access-Control-Allow-Origin: *");

    //  $resultado1 = $result->fetchAll(PDO::FETCH_ASSOC);

    $sql = "SELECT COUNT( id ) valor, DATE_FORMAT( fecha, '%Y-%m-%d' ) texto FROM amc_sancion_emergencia GROUP BY DATE_FORMAT( fecha, '%Y%m%d')";
    $result = $os->db->conn->query($sql);

    $resultado = [];
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $row[] = "1";
        $resultado[] = $row;
    }
    if (count($resultado) > 0) {
        echo json_encode(array(
            "success" => true,
            "data" => array($resultado)
        ));

    } else {
        echo json_encode(array(
            "success" => false,
            "data" => array()
        ));
    }
}


function getUsuario($id)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT id, CONCAT(first_name, \" \", last_name) AS nombre, email_address as email FROM qo_members  WHERE id = '$id';";

    $result = $os->db->conn->query($sql);
    $resultado = $result->fetchAll(PDO::FETCH_ASSOC);

    return $resultado[0];
}

function getNombreZonal($id)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT nombre FROM amc_zonas  WHERE id = '$id';";

    $result = $os->db->conn->query($sql);
    $resultado = $result->fetchAll(PDO::FETCH_ASSOC);

    return $resultado[0]['nombre'];
}


// fin funciones recupera informacion


function cors()
{

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin:*");
        //header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        exit(0);
    }

}