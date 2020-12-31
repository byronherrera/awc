<?php
require_once '../../../common/Classes/PhpSpreadsheet/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

require_once '../../../../server/os.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}

///////////////
///
///
// todo habilitar esta seccion
//if(isset($_POST['data'])){
//    if($_POST['data']!= '0'){


$nombreArchivo = '';

if (isset($_FILES)) {
    $temp_file_name = $_FILES['doc-path']['tmp_name'];

    $original_file_name = $_FILES['doc-path']['name'];
    $uploaddir = __DIR__ . "/../../../../migrar/instruccion/";

    $nombreArchivo = $_FILES['doc-path']['name'];

    $vowels = array("[", "]");
    $nombreArchivo = str_replace($vowels, "", $nombreArchivo);

    $uploadfile = $uploaddir . date('Y-m-d-h-i-s-') . basename($nombreArchivo);

    if (move_uploaded_file($temp_file_name, $uploadfile)) {
        $mensajeError = '';

        $inputFileName = $uploadfile;

        $spreadsheet = IOFactory::load($inputFileName);

        $spreadsheet->getSheet(0);
        $spreadsheet->setActiveSheetIndex(0);
        $spreadsheet->getActiveSheet();

        $sheet = $spreadsheet->getActiveSheet()->getTitle();
        $total = 0;

        $sql = "DELETE FROM amc_expediente_temporal;";
        $sql = $os->db->conn->prepare($sql);
        $sql->execute();

        $sql = "DELETE FROM amc_expedientes_detalle_temporal;";
        $sql = $os->db->conn->prepare($sql);
        $sql->execute();


        $resultado = migrarPestana(0, 'pma_migrate_contribuciones', $nombreArchivo[0]);
        if ($resultado) {
            $error = false;
            $mensajeError = '';
        } else {
            $error = true;
            $mensajeError = $mensajeError . "Error pestania";
        }
    } else {
        {
            $error = true;
            $mensajeError = "Error Archivo";
        }
    }

    // imprimimos los resultados
    if (!$error) {
        echo json_encode(array(
                "total" => $total,
                "Sheet" => $sheet,
                "success" => true,
                "hoja " => "real")
        );

    } else {
        echo json_encode(array(
                "total" => 0,
                "mensage" => $mensajeError,
                "success" => false,
                "data" => "")
        );
    }

}

function migrarPestana($hoja = 0, $tabla = 'amc_expediente_temporal')
{
    global $os;
    global $spreadsheet;

    $sql = "SELECT * FROM amc_expediente_migrate_tables WHERE active  = 1 ;";
    $result = $os->db->conn->query($sql);
    $columnas = $result->fetchAll(PDO::FETCH_ASSOC);


    $data = $spreadsheet->getSheet($hoja)->toArray(null, true, false, true);


    for ($i = 8; $i <= (count($data) - 1); $i++) {
        $cadenaDatos = '';
        $cadenaCampos = '';
        foreach ($data[$i] as $clave => $valor) {

            if ($valor != '') {
                // se busca el nombre de la columna
                foreach ($columnas as &$columna) {
                    if (in_array($data[1][$clave], $columna)) {
                        $columnaAsociada = $columna['table'];
                        $columType = $columna['type'];
                        break;
                    }
                };

                // para el caso de la columna fechas
              /*  if ($columType == 'date') {
                    $excel_date = $valor; //here is that value 41621 or 41631
                    $unix_date = ($excel_date - 25569) * 86400;
                    $excel_date = 25569 + ($unix_date / 86400);
                    $unix_date = ($excel_date - 25569) * 86400;
                    $valor = gmdate("Y/m/d", $unix_date);
                }
*/
                $valor = addslashes($valor);

                //$cadenaCampos = $cadenaCampos . "`" . $columnaAsociada . "`,";
                $cadenaCampos = $cadenaCampos . " ,";
                $cadenaDatos = $cadenaDatos . "'" . $valor . "',";

            }
        }
        // se incrementa el tipo de registro
        $cadenaCampos = $cadenaCampos . "`tipo`,";
        $cadenaDatos = $cadenaDatos . " ,";

        $cadenaCampos = substr($cadenaCampos, 0, -1);
        $cadenaDatos = substr($cadenaDatos, 0, -1);

        $sql = "INSERT INTO $tabla ($cadenaCampos) values($cadenaDatos);";

    /*    $sql = $os->db->conn->prepare($sql);

        $code = $sql->errorCode();*/

        echo $sql;

//        $sql->execute();
    }
    return true;
}
