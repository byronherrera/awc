<?php

//http://medoo.in/api/select
//http://localhost:10088/msv-dev/generareporte/modules/desktop/samsung/server/help.html#Error

require_once '../../../../server/os.php';
require_once '../../../common/Classes/funciones.php';
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
    $fs = new Firestore();
    $fs->get('-MLEPfFuHlrojS8QNJUH');
    $data = array();
    while ($row = $fs->fetch(PDO::FETCH_ASSOC)) {

        $data[] = $row;
    }
    echo json_encode(array(
            "success" => true,
            "data" => $data)
    );
}

function selectForm()
{
    $fs = new Firestore();
    $fs->get('-MLEPfFuHlrojS8QNJUH');
    $data = array();
    while ($row = $fs->fetch(PDO::FETCH_ASSOC)) {

        $data[] = $row;
    }
    echo json_encode(array(
            "success" => true,
            "data" => $data)
    );
}




