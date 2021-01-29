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


        $resultado = migrarPestana(0, 'amc_expediente_temporal', $nombreArchivo[0]);
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

    // consulta a tabla con la descripcion de campos

    // carga en el maestro
    $sql = "SELECT * FROM amc_expediente_migrate_tables WHERE active  = 1 AND `table` = 'amc_expediente_temporal';";
    $result = $os->db->conn->query($sql);
    $columnas = $result->fetchAll(PDO::FETCH_ASSOC);


    $data = $spreadsheet->getSheet($hoja)->toArray(null, true, false, true);

    // i = 8 fila que comienzan los datos
    for ($i = 8; $i <= (count($data) - 1); $i++) {
        $cadenaDatos = [];
        $cadenaCampos = [];

        foreach ($columnas as &$columna) {
            $table_columna = $columna['table_columna'];
            $columType = $columna['type'];

            // dato
            if ($columna['combo'] == 'NO') {
                $excel_columna = $columna['excel_columna'];

                $tableMaster = $columna['table'];

                switch ($columType) {
                    case 'varchar':
                        $cadenaDatos[] = '"' . $data[$i][$excel_columna] . '"';
                        $cadenaCampos[] = $table_columna;
                        break;
                    case 'int':
                        if (strlen($data[$i][$excel_columna]) > 0) {
                            // para validar datos
                            $data[$i][$excel_columna] = validaIntInput ($data[$i][$excel_columna]);
                            $cadenaDatos[] = $data[$i][$excel_columna];
                            $cadenaCampos[] = $table_columna;
                        }
                        break;
                    case 'datetime':
                        if (strlen($data[$i][$excel_columna]) > 0) {
                            $linux_time = fromExcelToLinux($data[$i][$excel_columna]);
                            $cadenaDatos[] = '"' . $linux_time . '"';
                            $cadenaCampos[] = $table_columna;
                        }
                        break;
                    case 'date':
                        if (strlen($data[$i][$excel_columna]) > 0) {
                            $linux_time = fromExcelToLinux($data[$i][$excel_columna]);
                            $cadenaDatos[] = '"' . $linux_time . '"';
                            $cadenaCampos[] = $table_columna;
                        }
                        break;
                }
            } else {
                // caso cuando los datos salen de una tabla
                $table_ombo = $columna['$table_ombo'];
                $search_field = $columna['search_field'];

                $excel_columna = $columna['excel_columna'];
                $cadenaCampos[] = $table_columna;
                $cadenaDatos[] = $data[$i][$excel_columna];

                recupeDataTablaDetalle($data[$i][$excel_columna], $search_field, $table_ombo);
                $tableMaster = $columna['table'];

            }
        };

        $cadenaCampos = implode(",", $cadenaCampos);
        $cadenaDatos = implode(",", $cadenaDatos);
        $os->db->conn->query("SET NAMES 'utf8'");
        $sql = "INSERT INTO $tableMaster ($cadenaCampos) values ($cadenaDatos);";
      //  echo $sql;

        $sql = $os->db->conn->prepare($sql);
        $code = $sql->errorCode();
        $sql->execute();
    }
    return true;
}

function recupeDataTablaDetalle($textoBusqueda = 'herrera avalos', $campo = "last_name", $tabla = 'qo_members')
{
    global $os;

    $sql = "SELECT
                id 
            FROM
                $tabla 
            WHERE
                $campo like '%$textoBusqueda%'";

    $sql = $os->db->conn->prepare($sql);
    $code = $sql->errorCode();
    $sql->execute();


    return 123;

}

function fromExcelToLinux($excel_time)
{
    $fechalinux = ($excel_time - 25569) * 86400;
    return date("Y-m-d 00:00:00", $fechalinux);
}


function validaIntInput ($dato ) {

    switch ($dato) {
        case 'o':
            $dato = '0';
            break;
        case 'O':
            $dato = '0';
            break;
        case 'X':
            $dato = '1';
            break;
        case 'NO':
            $dato  = "0";
            break;
        case 'SI':
            $dato  = "0";
            break;
    }
    return $dato;
};