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
    foreach ($query as $i) {
        $id = key($i);
        foreach($i as $j){
            $data = $j;
            $data += [ "id" => $id ];
        }
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
    echo json_encode(array(
            "success" => true,
            "data" => $data)
    );
}