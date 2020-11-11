<?php

require_once '../../../../server/os.php';
require_once '../../../common/Classes/funciones.php';
require '../../../../includes/vendor/autoload.php';
use Kreait\Firebase\Factory;
require_once 'firestore.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}

switch ($_GET['operation']) {
    case 'select' :
        select();
        break;
    case 'selectForm' :
        selectForm();
        break;
}


function select()
{
    $data = [];
    $fs = new Firestore('formulario');
    $query= $fs->getAll();
    foreach ($query as $key => $valor) {
        $id = $key;
        $valor += [ "id" =>  $id ];
        $valor['aislamiento_obligatorio'] =  ($valor['aislamiento_obligatorio'])  ? 'SI' :  'NO';
        $valor['conductorSinMascarilla'] =  ($valor['conductorSinMascarilla'])  ? 'SI' :  'NO';
        $valor['infraccionSinMascarilla'] =  ($valor['infraccionSinMascarilla'])  ? 'SI' :  'NO';
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


function selectForm()
{
    $id = $_POST ['id'];
    $fs = new Firestore('formulario');
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
    $data['infraccioncedula'] =  ($data['infraccioncedula'])  ? 'SI' :  'NO';
    $data['infracciondistancia'] =  ($data['infracciondistancia'])  ? 'SI' :  'NO';
    $data['sancion_25_SMU'] =  ($data['sancion_25_SMU'])  ? 'SI' :  'NO';
    $data['sancion_50_SMU'] =  ($data['sancion_50_SMU'])  ? 'SI' :  'NO';
    $data['sancion_tres_salarios'] =  ($data['sancion_tres_salarios'])  ? 'SI' :  'NO';
    $data['sancion_un_salario_medio'] =  ($data['sancion_un_salario_medio'])  ? 'SI' :  'NO';

    echo json_encode(array(
            "success" => true,
            "data" => $data)
    );
}