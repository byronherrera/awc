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
$today = date("Y-n-j-H-i-s");
if (isset($_GET["operativo"])) {
    $operativoId = $_GET["operativo"];
} else {
    exit ;
}

// recuepro el listado de operativos en base al filtro
$os->db->conn->query("SET NAMES 'utf8'");
$sql = "SELECT * FROM amc_operativos WHERE id = $operativoId ";
$result = $os->db->conn->query($sql);
$operativo = $result->fetch(PDO::FETCH_ASSOC);

$number_of_rows = $result->rowCount();

$objPHPExcel = new PHPExcel();
$objPHPExcel->setActiveSheetIndex(0);

$filaTitulo1 = 1;
$filaTitulo2 = 2;
$filaTitulo3 = 3;
$filacabecera = 4;
$filaInicio = 5;

$dias = array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
$meses = array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");

$columnas = array("A", "B", "C", "D", "E", "F");

//definicion de estilos
$styleArray = array(
    'borders' => array(
        'allborders' => array(
            'style' => PHPExcel_Style_Border::BORDER_THIN
        )
    )
);

//declaracion de los titulos de la linea 1 2 3
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo1 . ':G' . $filaTitulo1);
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo2 . ':G' . $filaTitulo2);
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo3 . ':G' . $filaTitulo3);

$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo1, "MUNICIPIO DEL DISTRITO METROPOLITANO DE QUITO");
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo2, 'AGENCIA METROPOLITANA DE CONTROL');
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo3, "INFORME DE OPERATIVO DE CONTROL No. $operativoId");

$filascabecera = $number_of_rows + $filaInicio + 2;


// Elaborador por:
    $objPHPExcel->getActiveSheet()->mergeCells('A' . ($filascabecera) . ':B' . ($filascabecera));
    $objPHPExcel->getActiveSheet()->mergeCells('A' . ($filascabecera + 1) . ':B' . ($filascabecera + 1));
    $objPHPExcel->getActiveSheet()->mergeCells('A' . ($filascabecera + 2) . ':B' . ($filascabecera + 2));
    $objPHPExcel->getActiveSheet()->setCellValue('A' . $filascabecera, '__________________');
    //$objPHPExcel->getActiveSheet()->setCellValue('A' . ($filascabecera + 1), regresaNombre($data->busqueda_elaborado_por));
    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filascabecera + 2), "Elaborado por");

$anchoColumna = 20;
// Ancho de las columnas
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('A')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth($anchoColumna);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('B')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth($anchoColumna);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('C')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth($anchoColumna);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('D')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth($anchoColumna);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('E')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth($anchoColumna);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('F')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth($anchoColumna);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('G')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth($anchoColumna);

// todo quitar
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filacabecera . ':G' . $filacabecera);
$objPHPExcel->getActiveSheet()->setCellValue('A' .$filacabecera,  "1. DATOS GENERALES DEL OPERATIVO");
$filacabecera++;
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filacabecera . ':G' . $filacabecera);
$objPHPExcel->getActiveSheet()->setCellValue('A' .$filacabecera,  regresaZonal($operativo['id_zonal'] ) . " - " .  regresaUnidad ($operativo['id_unidad']));


/*$objPHPExcel->getActiveSheet()->setCellValue('B' . $filacabecera, $dias[1]);
$objPHPExcel->getActiveSheet()->setCellValue('C' . $filacabecera, $dias[2]);
$objPHPExcel->getActiveSheet()->setCellValue('D' . $filacabecera, $dias[3]);
$objPHPExcel->getActiveSheet()->setCellValue('E' . $filacabecera, $dias[4]);
$objPHPExcel->getActiveSheet()->setCellValue('F' . $filacabecera, $dias[5]);
$objPHPExcel->getActiveSheet()->setCellValue('G' . $filacabecera, $dias[6]);
*/
$noExistenFilas = true;

$diasUsados = array (0,0,0,0,0,0,0);
/*
while ($rowdetalle = $result->fetch(PDO::FETCH_ASSOC)) {
// actualizar detalle idGuia
    $noExistenFilas = false;
    //cambio para impresiono el nivel de complejidad
    $niveles_complejidad = array("Alto", "Medio", "Bajo");
    $rowdetalle['id_nivel_complejidad'] = $niveles_complejidad[$rowdetalle['id_nivel_complejidad'] - 1];

    //cambio para impresion el tipo de control
    $tipo_control = array("Licenciamiento", "Espacio Público");

    $cadena = $rowdetalle['id_tipo_control'];
    $array = explode(",", $cadena);
    foreach ($array as &$valor) {
        $valor = $tipo_control[$valor - 1];
    }
    $cadena_equipo = implode(",", $array);
    $rowdetalle['id_tipo_control'] = $cadena_equipo;


// recuperamos los nombres de los usuarios
    $sql = "SELECT (SELECT CONCAT(qo_members.first_name, ' ', qo_members.last_name) FROM qo_members WHERE qo_members.id = b.id_member ) AS nombre  FROM amc_operativos_personal b WHERE id_operativo = '" . $rowdetalle['id'] . "'";
    $nombres = $os->db->conn->query($sql);
    $nombresUsuarios = array();
    while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
        $nombresUsuarios[] = $nombreDetalle['nombre'];
    }
    $cadena_personal = implode(",\n ", $nombresUsuarios);
    $rowdetalle['personal'] = $cadena_personal;

// recuperamos el nombre de zona
    $sql = "SELECT  nombre  FROM amc_zonas WHERE id = '" . $rowdetalle['id_zonal'] . "'";
    $nombres = $os->db->conn->query($sql);
    $nombresUsuarios = array();
    while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
        $nombresUsuarios[] = $nombreDetalle['nombre'];
    }
    $cadena_personal = implode(",\n ", $nombresUsuarios);
    $rowdetalle['id_zonal'] = $cadena_personal;

    // formatos de impresion de fechas y horas
    $date = new DateTime($rowdetalle['fecha_inicio_planificacion']);
    $inicio = $date->format('H\Hi');
    $diaNumeral = $date->format('w');

    //$filaInicio++;
    if ($diasUsados[$diaNumeral] == 1){
        $filaInicio++;

        $diasUsados = array (0,0,0,0,0,0,0);
    }

    $diasUsados[$diaNumeral] = 1;


    //$rowdetalle['fecha_inicio_planificacion'] = $dias[$date->format('w')] . ",\n   " . $date->format('d') . " de " . $meses[$date->format('m') - 1] . " del " . $date->format('Y');
    $fechacorta = $dias[$date->format('w')] . " " . $date->format('d');

    $date = new DateTime($rowdetalle['fecha_fin_planificacion']);
    $fin = $date->format('H\Hi');

    // envio de impresion de valores
    //$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaInicio, $rowdetalle['fecha_inicio_planificacion']);
    $objPHPExcel->getActiveSheet()->setCellValue($columnas[$diaNumeral] . $filaInicio, $fechacorta . "\n" . $inicio . ' - ' . $fin . "\n" . $rowdetalle['personal']);
    $objPHPExcel->getActiveSheet()->getStyle('A' . $filaInicio . ':G' . $filaInicio)->applyFromArray($styleArray);

}
*/

// Set document properties
//echo date('H:i:s') , " Set document properties" , PHP_EOL;
$objPHPExcel->getProperties()->setCreator("Byron Herrera")
    ->setLastModifiedBy("Byron Herrera")
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


$objPHPExcel->getActiveSheet()->getStyle('A1:G600')->applyFromArray(
    array(
        'alignment' => array(
            'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
        )
    )
);

$objPHPExcel->getActiveSheet()->getStyle('A4:G200')->applyFromArray(
    array(
        'alignment' => array(
            'vertical' => PHPExcel_Style_Alignment::VERTICAL_TOP,
        )
    )
);

$objPHPExcel->getActiveSheet()->getStyle('A4:G30')->getAlignment()->setWrapText(true);


$objPHPExcel->getActiveSheet()->getStyle('A' . $filacabecera . ':G' . $filacabecera)->applyFromArray($styleArray);


// Set page orientation and size

$objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_PORTRAIT);
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);

//tamaños de texto
$objPHPExcel->getActiveSheet()->getStyle('A1:G3')->getFont()->setSize(13);
$objPHPExcel->getActiveSheet()->getStyle('A4:G40')->getFont()->setSize(10);


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

// se crea la cabecera de archivo y se lo graba al archivo
header('Content-Type: application/xlsx');
header('Content-Disposition: attachment;filename="export-documents-SGE-' . $today . '.xlsx"');
header('Cache-Control: max-age=0');

$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
$objWriter->save('php://output');
exit;

header('Content-Type: application/pdf');
header('Content-Disposition: attachment;filename="Operativo-AMC-'. $operativoId . '-' . $today . '.pdf"');
header('Cache-Control: max-age=0');
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'PDF');
$objWriter->save('php://output');

exit;

function quitar_tildes($cadena)
{
    $no_permitidas = array("á", "é", "í", "ó", "ú", "Á", "É", "Í", "Ó", "Ú", "ñ", "À", "Ã", "Ì", "Ò", "Ù", "Ã™", "Ã ", "Ã¨", "Ã¬", "Ã²", "Ã¹", "ç", "Ç", "Ã¢", "ê", "Ã®", "Ã´", "Ã»", "Ã‚", "ÃŠ", "ÃŽ", "Ã”", "Ã›", "ü", "Ã¶", "Ã–", "Ã¯", "Ã¤", "«", "Ò", "Ã", "Ã„", "Ã‹");
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

function regresaNombre($id_dato)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT CONCAT(qo_members.first_name, ' ', qo_members.last_name) AS nombre
            FROM qo_members WHERE id = " . $id_dato;
    $nombre = $os->db->conn->query($sql);
    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['nombre'];

}

function regresaZonal($id_dato)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_zonas WHERE id = " . $id_dato;
    $nombre = $os->db->conn->query($sql);
    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['nombre'];

}
function regresaUnidad ($id_dato)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT *
            FROM amc_unidades WHERE id = " . $id_dato;
    $nombre = $os->db->conn->query($sql);
    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['nombre_completo'];
}


function fechaInicioSQL($where)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT fecha_inicio_planificacion FROM amc_operativos as b  $where  ORDER BY b.fecha_inicio_planificacion  LIMIT 1 ";
    $nombre = $os->db->conn->query($sql);
    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['fecha_inicio_planificacion'];
}

function fechaFinSQL($where)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT fecha_fin_planificacion FROM amc_operativos as b  $where  ORDER BY b.fecha_fin_planificacion DESC LIMIT 1 ";
    $nombre = $os->db->conn->query($sql);
    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['fecha_fin_planificacion'];
}

function fechaLarga ($fecha, $dias, $meses) {
    $date = new DateTime($fecha);
    return  $dias[$date->format('w')] . " " . $date->format('d') . " de " . $meses[$date->format('m') - 1] . " del " . $date->format('Y');

}