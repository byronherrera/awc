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

// para los reportes
$where = '';
// caso en reportes
if (isset($_POST['busqueda_tipo_control']) and ($_POST['busqueda_tipo_control'] != '')) {
    $tipo = $_POST['busqueda_tipo_control'];
    if ($where == '') {
        $where = "WHERE id_tipo_control like '%$tipo%'  ";
    } else {
        $where = $where . " AND id_tipo_control like '%$tipo%' ";
    }
}
if (isset($_POST['busqueda_nivel_complejidad']) and ($_POST['busqueda_nivel_complejidad'] != '')) {
    $tipo = $_POST['busqueda_nivel_complejidad'];
    if ($where == '') {
        $where = "WHERE id_nivel_complejidad like '%$tipo%'  ";
    } else {
        $where = $where . " AND id_nivel_complejidad like '%$tipo%' ";
    }
}
if (isset($_POST['busqueda_zonal']) and ($_POST['busqueda_zonal'] != '')) {
    $tipo = $_POST['busqueda_zonal'];
    if ($where == '') {
        $where = "WHERE id_zona  = '$tipo' ";
    } else {
        $where = $where . " AND id_zona = '$tipo' ";
    }
}
if (isset($_POST['busqueda_persona_encargada']) and ($_POST['busqueda_persona_encargada'] != '')) {
    $tipo = $_POST['busqueda_persona_encargada'];
    if ($where == '') {
        $where = "WHERE id_persona_encargada  = '$tipo' ";
    } else {
        $where = $where . " AND id_persona_encargada = '$tipo' ";
    }
}
if (isset($_POST['busqueda_fallido']) and ($_POST['busqueda_fallido'] != '')) {
    $tipo = $_POST['busqueda_fallido'];
    if ($where == '') {
        $where = "WHERE fallido = '$tipo' ";
    } else {
        $where = $where . " AND fallido = '$tipo' ";
    }
}
if (isset($_POST['busqueda_finalizado']) and ($_POST['busqueda_finalizado'] != '')) {
    $tipo = $_POST['busqueda_finalizado'];
    if ($where == '') {
        $where = "WHERE finalizado = '$tipo' ";
    } else {
        $where = $where . " AND finalizado = '$tipo' ";
    }
}
if (isset($_POST['busqueda_punto_encuentro']) and ($_POST['busqueda_punto_encuentro'] != '')) {
    $tipo = $_POST['busqueda_punto_encuentro'];
    if ($where == '') {
        $where = "WHERE punto_encuentro_planificado like '%$tipo%' ";
    } else {
        $where = $where . " AND punto_encuentro_planificado like '%$tipo%' ";
    }
}
if (isset($_POST['busqueda_observaciones']) and ($_POST['busqueda_observaciones'] != '')) {
    $tipo = $_POST['busqueda_observaciones'];
    if ($where == '') {
        $where = "WHERE observaciones like '%$tipo%' ";
    } else {
        $where = $where . " AND observaciones like '%$tipo%' ";
    }
}
if (isset($_POST['busqueda_personal_asignado']) and ($_POST['busqueda_personal_asignado'] != '')) {
    $tipo = $_POST['busqueda_personal_asignado'];
    if ($where == '') {
        $where = "WHERE (select count(*) from amc_operativos_personal a where a.id_member = '$tipo' and a.id_operativo = amc_operativos.id ) > 0 ";
    } else {
        $where = $where . " AND (select count(*) from amc_operativos_personal a where a.id_member = '$tipo' and a.id_operativo = amc_operativos.id ) > 0  ";
    }
}
if (isset($_POST['busqueda_fecha_inicio']) and ($_POST['busqueda_fecha_inicio'] != '')) {
    $fechainicio = $_POST['busqueda_fecha_inicio'];
    if (isset($_POST['busqueda_fecha_fin']) and ($_POST['busqueda_fecha_fin'] != '')) {
        $fechafin = $_POST['busqueda_fecha_fin'];
    } else {
        $fechafin = date('Y\m\d H:i:s');;
    }

    if ($where == '') {
        $where = "WHERE fecha_inicio_planificacion between '$fechainicio' and '$fechafin'  ";
    } else {
        $where = $where . " AND fecha_inicio_planificacion between '$fechainicio' and '$fechafin' ";
    }
}


$os->db->conn->query("SET NAMES 'utf8'");
//$sql = "SELECT * FROM amc_denuncias $where ORDER BY codigo_tramite DESC ";
/*$sql = "SELECT *, (select nombre FROM amc_unidades as a WHERE a.id in (b.reasignacion) LIMIT 1) as nombre_unidad
        FROM amc_operativos as b $where ORDER BY b.codigo_tramite DESC";*/
$sql = "SELECT *  
        FROM amc_operativos as b  ORDER BY b.codigo_operativo DESC";

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

$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo1 . ':K' . $filaTitulo1);
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo2 . ':K' . $filaTitulo2);

$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo1, "LISTADO OPERATIVOS");
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo2, 'Unidad de Operativos');

$os->db->conn->query("SET NAMES 'utf8'");
$sql = "SELECT CONCAT(qo_members.first_name, ' ', qo_members.last_name) AS nombre
            FROM qo_members WHERE id = " . $os->get_member_id();
$nombre = $os->db->conn->query($sql);
$rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
$nombreUsuario = $rownombre['nombre'];

$filascabecera = $number_of_rows + $filaInicio + 2;
/*bjPHPExcel->getActiveSheet()->mergeCells('A' . ($filascabecera) . ':B' . ($filascabecera));
$objPHPExcel->getActiveSheet()->mergeCells('A' . ($filascabecera + 1) . ':B' . ($filascabecera + 1));
$objPHPExcel->getActiveSheet()->mergeCells('A' . ($filascabecera + 2) . ':B' . ($filascabecera + 2));
*/
// Elaborador por:
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filascabecera, '__________________');
$objPHPExcel->getActiveSheet()->setCellValue('A' . ($filascabecera + 1), $nombreUsuario);
$objPHPExcel->getActiveSheet()->setCellValue('A' . ($filascabecera + 2), "Elaborado por");

// Elaborador por:
$objPHPExcel->getActiveSheet()->setCellValue('D' . $filascabecera, '__________________');
$objPHPExcel->getActiveSheet()->setCellValue('D' . ($filascabecera + 1), $nombreUsuario);
$objPHPExcel->getActiveSheet()->setCellValue('D' . ($filascabecera + 2), "Revisado por");

// Elaborador por:
$objPHPExcel->getActiveSheet()->setCellValue('G' . $filascabecera, '__________________');
$objPHPExcel->getActiveSheet()->setCellValue('G' . ($filascabecera + 1), $nombreUsuario);
$objPHPExcel->getActiveSheet()->setCellValue('G' . ($filascabecera + 2), "Aprobado por");

// Ancho de las columnas
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
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('H')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('I')->setWidth(8.71);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('I')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('J')->setWidth(16);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('J')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('K')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('K')->setWidth(16.30);


$objPHPExcel->getActiveSheet()->setCellValue('A' . $filacabecera, 'Fecha');
$objPHPExcel->getActiveSheet()->setCellValue('B' . $filacabecera, 'Inicio');
$objPHPExcel->getActiveSheet()->setCellValue('C' . $filacabecera, 'Fin');
$objPHPExcel->getActiveSheet()->setCellValue('D' . $filacabecera, 'Personal');
$objPHPExcel->getActiveSheet()->setCellValue('E' . $filacabecera, 'Tipo control');
$objPHPExcel->getActiveSheet()->setCellValue('F' . $filacabecera, 'Complejidad');
$objPHPExcel->getActiveSheet()->setCellValue('G' . $filacabecera, 'Punto Encuentro');
$objPHPExcel->getActiveSheet()->setCellValue('H' . $filacabecera, 'Zonal');
$objPHPExcel->getActiveSheet()->setCellValue('I' . $filacabecera, 'Codigo');

$noExistenFilas = true;

while ($rowdetalle = $result->fetch(PDO::FETCH_ASSOC)) {
// actualizar detalle idGuia


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
    $objPHPExcel->getActiveSheet()->setCellValue('J' . $filaInicio, $rowdetalle['nombre_unidad']);
    $objPHPExcel->getActiveSheet()->setCellValue('K' . $filaInicio, $rowdetalle['observacion_secretaria']);

    $objPHPExcel->getActiveSheet()->getStyle('A' . $filaInicio . ':K' . $filaInicio)->applyFromArray($styleArray);
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


$objPHPExcel->getActiveSheet()->getStyle('A1:K600')->applyFromArray(
    array(
        'alignment' => array(
            'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
        )
    )
);

$objPHPExcel->getActiveSheet()->getStyle('A4:K200')->applyFromArray(
    array(
        'alignment' => array(
            'vertical' => PHPExcel_Style_Alignment::VERTICAL_TOP,
        )
    )
);

$objPHPExcel->getActiveSheet()->getStyle('A4:K30')->getAlignment()->setWrapText(true);


$objPHPExcel->getActiveSheet()->getStyle('A' . $filacabecera . ':K' . $filacabecera)->applyFromArray($styleArray);

//$objPHPExcel->getActiveSheet()->getStyle('A7:D7')->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);


// Set page orientation and size
//echo date('H:i:s') , " Set page orientation and size" , PHP_EOL;
$objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_PORTRAIT);
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

////////////////////////////////////////////////
// se crea la cabecera de archivo y se lo graba al archivo
header('Content-Type: application/xlsx');
header('Content-Disposition: attachment;filename="export-documents-SGE-' . $today . '.xlsx"');
header('Cache-Control: max-age=0');

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
