<?php
/**
 * PHPExcel
 *
 *
 * @category   PHPExcel
 * @package    PHPExcel
 * @copyright  Copyright (c) 2006 - 2012 PHPExcel (http://www.codeplex.com/PHPExcel)
 * @license    http://www.gnu.org/licenses/old-licenses/lgpl-2.1.txt	LGPL
 * @version    1.7.7, 2012-05-19
 */

/** Error reporting */
error_reporting(E_ALL);

/** Include PHPExcel */
//echo dirname(__FILE__);
require_once '../../../common/Classes/PHPExcel.php';
require_once '../../../../server/os.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}

// si no existe unidad es para reimpresion se envia como parametro guia, obtenemos id unidad
if (isset($_GET['param'])) {
    $data = json_decode(stripslashes($_GET["param"]));
}

$today = date("Y-n-j-H-i-s");
$today2 = date("Y-n-j H:i");

// para los reportes
$where = '';

$usuarioLog = $os->get_member_id();

if (isset($data->accesosResolutores) && $data->accesosResolutores != "") {
    $acceso = $data->accesosResolutores;
    if ($acceso == 'true') {
        if ($where == '') {
            $where = " WHERE funcionario = $usuarioLog ";
        } else {
            $where = $where . " AND funcionario = $usuarioLog ";
        }
    }
}

if (isset($data->busqueda_persona_encargada) and ($data->busqueda_persona_encargada != '')) {
    $tipo = $data->busqueda_persona_encargada;
    if ($where == '') {
        $where = "WHERE id_responsable = '$tipo' ";
    } else {
        $where = $where . " AND id_responsable = '$tipo' ";
    }
}

if (isset($data->busqueda_estado) and ($data->busqueda_estado != '')) {
    $tipo = $data->busqueda_estado;
    if ($where == '') {
        $where = "WHERE estado = '$tipo' ";
    } else {
        $where = $where . " AND estado = '$tipo' ";
    }
}

if (isset($data->busqueda_tipo_contratacion) and ($data->busqueda_tipo_contratacion != '')) {
    $tipo = $data->busqueda_tipo_contratacion;
    if ($where == '') {
        $where = "WHERE tipocontratacion = '$tipo' ";
    } else {
        $where = $where . " AND tipocontratacion = '$tipo' ";
    }
}

if (isset($data->busqueda_semaforo) and ($data->busqueda_semaforo != '')) {
    $tipo = $data->busqueda_semaforo;
    if ($where == '') {
        $where = "WHERE semaforo = '$tipo' ";
    } else {
        $where = $where . " AND semaforo = '$tipo' ";
    }
}

if (isset($data->busqueda_fase) and ($data->busqueda_fase != '')) {
    $tipo = $data->busqueda_fase;
    if ($where == '') {
        $where = "WHERE fase = '$tipo' ";
    } else {
        $where = $where . " AND fase = '$tipo' ";
    }
}

if (isset($data->busqueda_observaciones) and ($data->busqueda_observaciones != '')) {
    $tipo = $data->busqueda_observaciones;
    if ($where == '') {
        $where = "WHERE observaciones = '$tipo' ";
    } else {
        $where = $where . " AND observaciones = '$tipo' ";
    }
}

if (isset($data->busqueda_fecha_inicio) && isset($data->busqueda_fecha_fin) && $data->busqueda_fecha_inicio != "" && $data->busqueda_fecha_fin != "") {
    $busqueda_fecha_inicio = $data->busqueda_fecha_inicio;
    $busqueda_fecha_fin = $data->busqueda_fecha_fin;
    if ($where == '') {
        $where = " WHERE fecha_entrega between '$busqueda_fecha_inicio' and '$busqueda_fecha_fin'  ";
    } else {
        $where = $where . " AND fecha_entrega between '$busqueda_fecha_inicio' and '$busqueda_fecha_fin'  ";
    }
}


$orderby = 'ORDER BY id ASC';
if (isset($_POST['sort'])) {
    if ($_POST['sort'] == 'id') {
        $orderby = 'ORDER BY id ASC';
    } else {
        $orderby = 'ORDER BY ' . $_POST['sort'] . ' ' . $_POST['dir'];
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


$os->db->conn->query("SET NAMES 'utf8'");
$sql = "SELECT
        id,
        id_responsable,
        CONCAT(apellidos,' ', nombres) AS nombres,
        apellidos,
        tema,
        fecha_inicio,
        fecha_entrega,
        estado,
        tipocontratacion,
        detalle_avance,
        semaforo,
        fase,
        valor,
        CONCAT((porcentaje * 100), ' %') as porcentaje,
        observaciones 
        FROM
        amc_planificacion_notificaciones
         $where $orderby";

$result = $os->db->conn->query($sql);
$number_of_rows = $result->rowCount();

$objPHPExcel = new PHPExcel();
$objPHPExcel->setActiveSheetIndex(0);

$filaTitulo1 = 2;
$filaTitulo2 = 3;
$filacabecera = 5;
$filaInicio = 6;


$styleArray = array(
    'borders' => array(
        'allborders' => array(
            'style' => PHPExcel_Style_Border::BORDER_THIN
        )
    )
);


$datosColumnas = [
    ["columna" => "A", "ancho" => 16.86, "titulo" => 'Tipo de Contratación', "data" => 'tipocontratacion']
    , ["columna" => "B", "ancho" => 40, "titulo" => 'Producto / Servicio', "data" => 'tema']
    , ["columna" => "C", "ancho" => 30, "titulo" => 'Responsable', "data" => 'nombres']
    , ["columna" => "D", "ancho" => 40, "titulo" => 'Estado', "data" => 'detalle_avance']
    , ["columna" => "E", "ancho" => 15, "titulo" => 'Semaforo', "data" => 'semaforo']
    , ["columna" => "F", "ancho" => 12, "titulo" => 'Valor', "data" => 'valor']
    , ["columna" => "G", "ancho" => 10, "titulo" => 'Avance Físico', "data" => 'porcentaje']
    , ["columna" => "H", "ancho" => 10, "titulo" => 'Fecha Entrega', "data" => 'fecha_entrega']
];
$totalColumnas = count($datosColumnas) - 1;


$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo1 . ':' . $datosColumnas[$totalColumnas]['columna'] . $filaTitulo1);
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo2 . ':' . $datosColumnas[$totalColumnas]['columna'] . $filaTitulo2);

$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo1, "SEGUIMIENTO POA");
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo2, 'Unidad Planificiación');

$objPHPExcel->getActiveSheet()->mergeCells('A' . ($filaTitulo2 + 1) . ':B' . ($filaTitulo2 + 1));
$objPHPExcel->getActiveSheet()->setCellValue('A' . ($filaTitulo2 + 1), "Fecha: . $today2");

$os->db->conn->query("SET NAMES 'utf8'");
$sql = "SELECT CONCAT(qo_members.first_name, ' ', qo_members.last_name) AS nombre
            FROM qo_members WHERE id = " . $os->get_member_id();
$nombre = $os->db->conn->query($sql);
$rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
$nombreUsuario = $rownombre['nombre'];

$filascabecera = $number_of_rows + $filaInicio + 2;
$objPHPExcel->getActiveSheet()->mergeCells('B' . $filascabecera . ':C' . $filascabecera);
$objPHPExcel->getActiveSheet()->mergeCells('B' . ($filascabecera + 1) . ':C' . ($filascabecera + 1));
$objPHPExcel->getActiveSheet()->mergeCells('B' . ($filascabecera + 2) . ':C' . ($filascabecera + 2));

$objPHPExcel->getActiveSheet()->setCellValue('B' . $filascabecera, '__________________');
$objPHPExcel->getActiveSheet()->setCellValue('B' . ($filascabecera + 1), $nombreUsuario);
$objPHPExcel->getActiveSheet()->setCellValue('B' . ($filascabecera + 2), "Unidad de Planificación");

$objPHPExcel->getActiveSheet()->mergeCells('E' . ($filascabecera + 1) . ':I' . ($filascabecera + 2));
$objPHPExcel->getActiveSheet()->mergeCells('E' . $filascabecera . ':I' . $filascabecera);
$objPHPExcel->getActiveSheet()->setCellValue('E' . $filascabecera, '__________________');

// creacion de los titulos
foreach ($datosColumnas as &$valorColumna) {
    $objPHPExcel->getActiveSheet()->getColumnDimensionByColumn($valorColumna['columna'])->setAutoSize(false);
    $objPHPExcel->getActiveSheet()->getColumnDimension($valorColumna['columna'])->setWidth($valorColumna['ancho']);
    $objPHPExcel->getActiveSheet()->setCellValue($valorColumna['columna'] . $filacabecera, $valorColumna['titulo']);

}

$objPHPExcel->getActiveSheet()->getStyle('F')->getNumberFormat()->setFormatCode('#,##0.00');


$noExistenFilas = true;

while ($rowdetalle = $result->fetch(PDO::FETCH_ASSOC)) {

    $noExistenFilas = false;

    foreach ($datosColumnas as &$valorColumna) {
        $objPHPExcel->getActiveSheet()->setCellValue($valorColumna['columna'] . $filaInicio, $rowdetalle[$valorColumna['data']]);
        $colorCelda = getColorCelda($rowdetalle[$valorColumna['data']]);
        if ($valorColumna['data'] == "semaforo") {
            $objPHPExcel->getActiveSheet()->getStyle($valorColumna['columna'] . $filaInicio)->applyFromArray(
                array(
                    'fill' => array(
                        'type' => PHPExcel_Style_Fill::FILL_SOLID,
                        'color' => array('rgb' => $colorCelda)
                    )
                )
            );
        }
    }

    $objPHPExcel->getActiveSheet()->getStyle($datosColumnas[0]['columna'] . $filaInicio . ':' . $datosColumnas[$totalColumnas]['columna'] . $filaInicio)->applyFromArray($styleArray);
    $filaInicio++;
}


// Set document properties
$objPHPExcel->getProperties()->setCreator("Byron Herrera ")
    ->setLastModifiedBy("Byron Herrera ")
    ->setTitle("AMC reporte")
    ->setSubject("")
    ->setDescription("AMC reporte, generated using PHP classes.")
    ->setKeywords("AMC reporte")
    ->setCategory("Archivo");


$styleThinBlackBorderOutline = array(
    'borders' => array(
        'outline' => array(
            'style' => PHPExcel_Style_Border::BORDER_THIN,
            'color' => array('argb' => '00000000'),
        ),
    ),
);


$objPHPExcel->getActiveSheet()->getStyle('A1:W600')->applyFromArray(
    array(
        'alignment' => array(
            'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
        )
    )
);

$objPHPExcel->getActiveSheet()->getStyle('A4:W200')->applyFromArray(
    array(
        'alignment' => array(
            'vertical' => PHPExcel_Style_Alignment::VERTICAL_TOP,
        )
    )
);

// estilo colores
$objPHPExcel->getActiveSheet()->getStyle('A' . ($filaTitulo2 + 2) . ':' . $datosColumnas[$totalColumnas]['columna'] . ($filaTitulo2 + 2))->applyFromArray(
    array(
        'fill' => array(
            'type' => PHPExcel_Style_Fill::FILL_SOLID,
            'color' => array('rgb' => 'DADADA')
        )
    )
);

$objPHPExcel->getActiveSheet()->getStyle('A4:W1000')->getAlignment()->setWrapText(true);

$totalColumnas = count($datosColumnas) - 1;
$objPHPExcel->getActiveSheet()->getStyle($datosColumnas[0]['columna'] . $filacabecera . ':' . $datosColumnas[$totalColumnas]['columna'] . $filacabecera)->applyFromArray($styleArray);


// Set page orientation and size
$objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_PORTRAIT);
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);


$objPHPExcel->getActiveSheet()->getStyle('A1:W3')->getFont()->setSize(14);
$objPHPExcel->getActiveSheet()->getStyle('A4:W1000')->getFont()->setSize(10);

$pageMargins = $objPHPExcel->getActiveSheet()->getPageMargins();

// margin is set in inches (0.5cm)
$margin = 0.5 / 2.54;

$pageMargins->setTop($margin);
$pageMargins->setBottom($margin);
$pageMargins->setLeft($margin);
$pageMargins->setRight($margin);


$objPHPExcel->getActiveSheet()->setShowGridLines(false);

//echo date('H:i:s') , " Set orientation to landscape" , PHP_EOL;
$objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_LANDSCAPE);

////////////////////////////////////////////////
// se crea la cabecera de archivo y se lo graba al archivo
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment;filename="reporte-Planificacion-MATIS-' . $today . '.xls"');
header('Cache-Control: max-age=0');
$objWriter->save('php://output');

exit;

function quitar_tildes($cadena)
{
    $no_permitidas = array("á", "é", "í", "ó", "ú", "Á", "É", "Í", "Ó", "Ú", "ñ", "À", "Ã", "Ì", "Ò", "Ù", "Ã™", "Ã ", "Ã¨", "Ã¬", "Ã²", "Ã¹", "ç", "Ç", "Ã¢", "ê", "DIA DHEREDIA DONOSO ANDRES IGNACIOONOSO ANDRES IGNACIOÃ®", "Ã´", "Ã»", "Ã‚", "ÃŠ", "ÃŽ", "Ã”", "Ã›", "ü", "Ã¶", "Ã–", "Ã¯", "Ã¤", "«", "Ò", "Ã", "Ã„", "Ã‹");
    $permitidas = array("a", "e", "i", "o", "u", "A", "E", "I", "O", "U", "n", "N", "A", "E", "I", "O", "U", "a", "e", "i", "o", "u", "c", "C", "a", "e", "i", "o", "u", "A", "E", "I", "O", "U", "u", "o", "O", "i", "a", "e", "U", "I", "A", "E");
    $texto = str_replace($no_permitidas, $permitidas, $cadena);
    return $texto;
}

function quitar_espacio($cadena)
{
    $no_permitidas = array(" ");
    $permitidas = array("-");
    $texto = str_replace($no_permitidas, $permitidas, $cadena);
    return $texto;
}

function getColorCelda($color = "")
{
    switch ($color) {
        case 'Rojo':
            $retornaColor = "FF6B4B";
            break;
        case 'Amarillo':
            $retornaColor = "F7FF4B";
            break;
        case 'Gris':
            $retornaColor = "CCCCCC";
            break;
        case 'Verde':
            $retornaColor = "6EFF4B";
            break;
        default:
            $retornaColor = "FFFFFF";
    }
    return $retornaColor;
}