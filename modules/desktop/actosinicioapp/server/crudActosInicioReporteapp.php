<?php

require_once '../../../../server/os.php';
require_once '../../../common/Classes/funciones.php';
require '../../../../includes/vendor/autoload.php';
require_once '../../../../actualizacion/migracionActoInicio.php';
use Kreait\Firebase\Factory;
require_once 'firestore.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}

switch ($_GET['operation']) {
    case 'selectRep' :
        select();
        break;
}

function select()
{
    $data = [];
    $fs = new Firestore('formulario');

    if (isset($_POST['busqueda_fecha_inicio']) and ($_POST['busqueda_fecha_inicio'] != '')) {
        $fechainicio = $_POST['busqueda_fecha_inicio'];
        if (isset($_POST['busqueda_fecha_fin']) and ($_POST['busqueda_fecha_fin'] != '')) {
            $fechafin = $_POST['busqueda_fecha_fin'];
        } else {
            $fechafin = date('Y\m\d H:i:s');;
        }
        $query= $fs->getFiltroFecha('fechaInfraccion',$fechainicio,$fechafin);
    }else{
        $query= $fs->getAll();
    }

    if(isset($_POST['busqueda_usuario']) and ($_POST['busqueda_usuario'] != '')){
        $query = array_filter($query,'filtroUsuario');
    }

    if (isset($_POST['busqueda_zonal']) and ($_POST['busqueda_zonal'] != '')){
        $query = array_filter($query,'filtroZonal');
    }

    if (isset($_POST['busqueda_hechos']) and ($_POST['busqueda_hechos'] != '')){
        $query = array_filter($query,'filtroHechos');
    }

    foreach ($query as $key => $valor) {
        $id = $key;
        $valor += [ "id" =>  $id ];
        $valor['aislamiento_obligatorio'] =  ($valor['aislamiento_obligatorio'])  ? 'SI' :  'NO';
        $valor['conductorSinMascarilla'] =  ($valor['conductorSinMascarilla'])  ? 'SI' :  'NO';
        $valor['infraccionSinMascarilla'] =  ($valor['infraccionSinMascarilla'])  ? 'SI' :  'NO';
        $valor['infraccionSinMascarilla2'] =  ($valor['infraccionSinMascarilla2'])  ? 'SI' :  'NO';
        $valor['infraccioncedula'] =  ($valor['infraccioncedula'])  ? 'SI' :  'NO';
        $valor['infracciondistancia'] =  ($valor['infracciondistancia'])  ? 'SI' :  'NO';
        $valor['sancion_25_SMU'] =  ($valor['sancion_25_SMU'])  ? 'SI' :  'NO';
        $valor['sancion_50_SMU'] =  ($valor['sancion_50_SMU'])  ? 'SI' :  'NO';
        $valor['sancion_tres_salarios'] =  ($valor['sancion_tres_salarios'])  ? 'SI' :  'NO';
        $valor['sancion_un_salario_medio'] =  ($valor['sancion_un_salario_medio'])  ? 'SI' :  'NO';
        array_push($data, $valor);
    }

    echo json_encode(array(
            "success" => true,
            "data" => $data)
    );
}

function filtroUsuario($data) {
    if(isset($data['usuarioApp'])){
        if ($data['usuarioApp'] == $_POST['busqueda_usuario']) {
            return true;
        }
    }
}

function filtroZonal($data) {
    global $os;
    $os->load('member');
    if(isset($data['usuarioApp'])){
        $member_id = $os->member->get_id_email($data['usuarioApp']);
        $zona = $os->get_zonal_id ($member_id);
        if ($zona == $_POST['busqueda_zonal']) {
            return true;
        }
    }
}

function filtroHechos($data) {
    if(isset($data['hechosInfraccion'])){
        if (strpos($data['hechosInfraccion'],$_POST['busqueda_hechos'])) {
            return true;
        }
    }
}


