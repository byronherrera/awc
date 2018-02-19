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
$numeroGuia = '';

// si no existe unidad es para reimpresion se envia como parametro guia, obtenemos id unidad
$os->db->conn->query("SET NAMES 'utf8'");

//  validacion para la primera vez
if (total_guias() > 0) {
    $nombre = $os->db->conn->query("SELECT id_unidad, SUBSTRING(numero,10) as num FROM amc_guias_inspeccion WHERE id = $newIdGuia");
    $rowguia = $nombre->fetch(PDO::FETCH_ASSOC);
    $numeroGuia = $rowguia['num'];
} else {
    $unidad = 0;
}

if (isset($_GET['reimpresion']))
    $reimpresion = settype($_GET['reimpresion'], 'boolean');
else
    $reimpresion = false;

$today = date("Y-n-j");

///////////////////

$os->db->conn->query("SET NAMES 'utf8'");
if ($reimpresion)
    $sql = "SELECT *
        FROM amc_denuncias 
        WHERE guia = $newIdGuia 
        ORDER BY codigo_tramite";
else
    $sql = "SELECT *
        FROM amc_denuncias 
        WHERE reasignacion = 3 and ( procesado_inspeccion = 0 and despacho_secretaria_insp = 0)
        ORDER BY codigo_tramite";

//se carga el listado de
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

//get nombre largo unidad

    $os->db->conn->query("SET NAMES 'utf8'");
    $unidad = 3;
    $sql = "SELECT nombre_completo FROM amc_unidades WHERE id = $unidad";
    $resultguia = $os->db->conn->query($sql);
    if ($resultguia) {
        $row = $resultguia->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            $nombreUnidad = $row['nombre_completo'];
        }
    }

//get numero de guia

$os->db->conn->query("SET NAMES 'utf8'");
$sql = "SELECT SUBSTRING(numero,5,4) as a, SUBSTRING(numero,10) as num FROM amc_guias ORDER BY a DESC, num DESC LIMIT 1";
$resultguia = $os->db->conn->query($sql);
if ($resultguia) {
    $row = $resultguia->fetch(PDO::FETCH_ASSOC);
    if ($row) {
        if (!$reimpresion)
            $numeroGuia = $row['num'] + 1;


    }
}
$year = date("Y");



//$nombreUnidad
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo1 . ':J' . $filaTitulo1);
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo2 . ':J' . $filaTitulo2);

if ($number_of_rows > 0) {
    $newIdGuia = 'Vacio';
    //insert  numero de guia
    $os->db->conn->query("SET NAMES 'utf8'");

    $idUsuario = $os->get_member_id();
    if (!$reimpresion) {
        $sql = "INSERT INTO amc_guias (numero, unidad, id_member, id_unidad) VALUES ('SGE-$year-$numeroGuia', '$nombreUnidad', '$idUsuario', '$unidad')";
        $resultguia = $os->db->conn->query($sql);
        $newIdGuia = $os->db->conn->lastInsertId();
    }

    $objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo1, "GUIA DE DESPACHO N. SGE-$year-$numeroGuia");
    $objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo2, $nombreUnidad);

//insert  numero de guia
}

$os->db->conn->query("SET NAMES 'utf8'");
$sql = "SELECT CONCAT(qo_members.first_name, ' ', qo_members.last_name) AS nombre
            FROM qo_members WHERE id = " . $os->get_member_id();
$nombre = $os->db->conn->query($sql);
$rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
$nombreUsuario = $rownombre['nombre'];

$filascabecera = $number_of_rows + $filaInicio + 2;
$objPHPExcel->getActiveSheet()->mergeCells('C' . ($filascabecera) . ':D' . ($filascabecera));
$objPHPExcel->getActiveSheet()->mergeCells('C' . ($filascabecera + 1) . ':D' . ($filascabecera + 1));
$objPHPExcel->getActiveSheet()->mergeCells('C' . ($filascabecera + 2) . ':D' . ($filascabecera + 2));

$objPHPExcel->getActiveSheet()->setCellValue('C' . $filascabecera, '__________________');
$objPHPExcel->getActiveSheet()->setCellValue('C' . ($filascabecera + 1), $nombreUsuario);
$objPHPExcel->getActiveSheet()->setCellValue('C' . ($filascabecera + 2), "SECRETARIA INSPECCION");

$objPHPExcel->getActiveSheet()->mergeCells('F' . ($filascabecera + 1) . ':I' . ($filascabecera + 2));
$objPHPExcel->getActiveSheet()->setCellValue('F' . ($filascabecera + 1), $nombreUnidad);
$objPHPExcel->getActiveSheet()->mergeCells('F' . $filascabecera . ':I' . $filascabecera);
$objPHPExcel->getActiveSheet()->setCellValue('F' . $filascabecera, '__________________');

$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('A')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(6.86);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('B')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(16);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('C')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(11.50);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('D')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(16.71);

$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('E')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(23);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('F')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(18);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('G')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth(16);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('H')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('H')->setWidth(8.71);

$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('I')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('I')->setWidth(8);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('J')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('J')->setWidth(16.30);


$objPHPExcel->getActiveSheet()->setCellValue('A' . $filacabecera, 'Codigo');
$objPHPExcel->getActiveSheet()->setCellValue('B' . $filacabecera, 'Fecha y hora de recepcion');
$objPHPExcel->getActiveSheet()->setCellValue('C' . $filacabecera, 'Tipo de documento');
$objPHPExcel->getActiveSheet()->setCellValue('D' . $filacabecera, 'N. de documento');
$objPHPExcel->getActiveSheet()->setCellValue('E' . $filacabecera, 'Remitente');
$objPHPExcel->getActiveSheet()->setCellValue('F' . $filacabecera, 'Asunto');
$objPHPExcel->getActiveSheet()->setCellValue('G' . $filacabecera, 'Descripción del anexo');
$objPHPExcel->getActiveSheet()->setCellValue('H' . $filacabecera, 'Carácter de trámite');
$objPHPExcel->getActiveSheet()->setCellValue('I' . $filacabecera, 'Cantidad de fojas');
$objPHPExcel->getActiveSheet()->setCellValue('J' . $filacabecera, 'Observaciones');

$noExistenFilas = true;

while ($rowdetalle = $result->fetch(PDO::FETCH_ASSOC)) {
// actualizar detalle idGuia
    if (strlen($newIdGuia) > 0) {
        if (!$reimpresion) {
            $os->db->conn->query("SET NAMES 'utf8'");
            $sql = "UPDATE amc_denuncias SET guia='$newIdGuia', despacho_secretaria = 'true' WHERE (id='" . $rowdetalle['id'] . "')";
            $os->db->conn->query($sql);
        }
    }

    $noExistenFilas = false;
    switch ($rowdetalle['id_tipo_documento']) {
        case 1:
            $rowdetalle['id_tipo_documento'] = 'Denuncias';
            break;
        case 2:
            $rowdetalle['id_tipo_documento'] = 'Comunicados';
            break;
    }

    switch ($rowdetalle['id_caracter_tramite']) {
        case 1:
            $rowdetalle['id_caracter_tramite'] = 'Ordinario';
            break;
        case 2:
            $rowdetalle['id_caracter_tramite'] = 'Urgente';
            break;
    }

    $objPHPExcel->getActiveSheet()->setCellValue('A' . $filaInicio, $rowdetalle['codigo_tramite']);
    $objPHPExcel->getActiveSheet()->setCellValue('B' . $filaInicio, $rowdetalle['recepcion_documento']);
    $objPHPExcel->getActiveSheet()->setCellValue('C' . $filaInicio, $rowdetalle['id_tipo_documento']);
    $objPHPExcel->getActiveSheet()->setCellValue('D' . $filaInicio, $rowdetalle['num_documento']);
    $objPHPExcel->getActiveSheet()->setCellValue('E' . $filaInicio, $rowdetalle['remitente']);
    $objPHPExcel->getActiveSheet()->setCellValue('F' . $filaInicio, substr($rowdetalle['asunto'], 0, 200));
    $objPHPExcel->getActiveSheet()->setCellValue('G' . $filaInicio, strip_tags($rowdetalle['descripcion_anexos']));
    $objPHPExcel->getActiveSheet()->setCellValue('H' . $filaInicio, $rowdetalle['id_caracter_tramite']);
    $objPHPExcel->getActiveSheet()->setCellValue('I' . $filaInicio, $rowdetalle['cantidad_fojas']);
    $objPHPExcel->getActiveSheet()->setCellValue('J' . $filaInicio, $rowdetalle['observacion_secretaria']);

    $objPHPExcel->getActiveSheet()->getStyle('A' . $filaInicio . ':J' . $filaInicio)->applyFromArray($styleArray);
    $filaInicio++;
}


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


$objPHPExcel->getActiveSheet()->getStyle('A1:J100')->applyFromArray(
    array(
        'alignment' => array(
            'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
        )
    )
);

$objPHPExcel->getActiveSheet()->getStyle('A4:J30')->applyFromArray(
    array(
        'alignment' => array(
            'vertical' => PHPExcel_Style_Alignment::VERTICAL_TOP,
        )
    )
);

$objPHPExcel->getActiveSheet()->getStyle('A4:J30')->getAlignment()->setWrapText(true);


$objPHPExcel->getActiveSheet()->getStyle('A' . $filacabecera . ':J' . $filacabecera)->applyFromArray($styleArray);

//$objPHPExcel->getActiveSheet()->getStyle('A7:D7')->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);


// Set page orientation and size
//echo date('H:i:s') , " Set page orientation and size" , PHP_EOL;
$objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_LANDSCAPE);
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);


$objPHPExcel->getActiveSheet()->getStyle('A1:K3')->getFont()->setSize(14);
$objPHPExcel->getActiveSheet()->getStyle('A4:K40')->getFont()->setSize(10);


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
// luego de enviar la impresion se actualiza como enviado a inspeccion


/////////////////////////


if ($number_of_rows == 0) {
    $nombreUnidad = '';
    $today = '';
    $year = '';
}

header('Content-Type: application/xlsx');
header('Content-Disposition: attachment;filename="guia-secretaria-inspeccion-' . strtolower(quitar_espacio(quitar_tildes($nombreUnidad))) . '-SGE-' . $year . '-' . $numeroGuia . '-' . $today . '.xlsx"');
header('Cache-Control: max-age=0');

//$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'PDF');
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
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

function total_guias()
{
    global $os;
    $nombre = $os->db->conn->query("SELECT COUNT(*) AS total FROM amc_guias_inspeccion");
    $rowguia = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rowguia['total'];
}
