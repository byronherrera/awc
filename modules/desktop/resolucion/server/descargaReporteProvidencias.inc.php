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
if (isset ($_POST['accesosResolutores'])) {
    $acceso = $_POST['accesosResolutores'];
    if ($acceso == 'true') {
        if ($where == '') {
            $where = " WHERE funcionario = $usuarioLog ";
        } else {
            $where = $where . " AND funcionario = $usuarioLog ";
        }
    }
}

if (isset($data->busqueda_fecha_inicio) && isset($data->busqueda_fecha_fin) && $data->busqueda_fecha_inicio != "" && $data->busqueda_fecha_fin != "") {
    $busqueda_fecha_inicio = $data->busqueda_fecha_inicio;
    $busqueda_fecha_fin = $data->busqueda_fecha_fin;
    if ($where == '') {
        $where = " WHERE cast(b.fecha_resolucion as date) >= '$busqueda_fecha_inicio' AND cast(b.fecha_resolucion as date) <= '$busqueda_fecha_fin' ";
    } else {
        $where = $where . " AND cast(b.fecha_resolucion as date) >= '$busqueda_fecha_inicio' AND cast(b.fecha_resolucion as date) <= '$busqueda_fecha_fin' ";
    }
}
if (isset($data->ordenanza) && $data->ordenanza != "") {
    $filtroOrdenanza = $data->ordenanza;
    if ($where == '') {
        $where = " WHERE ordenanza = '$filtroOrdenanza' ";
    } else {
        $where = $where . " AND ordenanza = '$filtroOrdenanza' ";
    }
}
if (isset($data->resolucion_de) && $data->resolucion_de != "") {
    $filtroResolucion_de = $data->resolucion_de;
    if ($where == '') {
        $where = " WHERE resolucion_de = '$filtroResolucion_de' ";
    } else {
        $where = $where . " AND resolucion_de = '$filtroResolucion_de' ";
    }
}
if (isset($data->funcionario) && $data->funcionario != "") {
    $filtroFuncionario = $data->funcionario;
    if ($where == '') {
        $where = " WHERE funcionario = '$filtroFuncionario' ";
    } else {
        $where = $where . " AND funcionario = '$filtroFuncionario' ";
    }
}
if (isset($data->numero_resolucion) && $data->numero_resolucion != "") {
    $filtronumero_resolucion = $data->numero_resolucion;
    if ($where == '') {
        $where = " WHERE numero_resolucion LIKE '%$filtronumero_resolucion%' ";
    } else {
        $where = $where . " AND numero_resolucion LIKE '%$filtronumero_resolucion%' ";
    }
}
if (isset($data->articulo_actual) && $data->articulo_actual != "") {
    $filtro_articulo_actual = $data->articulo_actual;
    if ($where == '') {
        $where = " WHERE articulo_actual LIKE '%$filtro_articulo_actual%' ";
    } else {
        $where = $where . " AND articulo_actual LIKE '%$filtro_articulo_actual%' ";
    }
}
$orderby = 'ORDER BY a.id ASC';
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
//    $orderby = 'ORDER BY a.id ASC';

$os->db->conn->query("SET NAMES 'utf8'");
$sql = "SELECT *
FROM amc_libro_diario a INNER JOIN amc_providencias b ON a.id = b.id_libro_diario $where $orderby LIMIT $start, $limit";
//echo $sql;
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


$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo1 . ':P' . $filaTitulo1);
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo2 . ':P' . $filaTitulo2);

$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo1, "REPORTE DE PROVIDENCIAS");
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo2, 'Dirección de Resolución');


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
$objPHPExcel->getActiveSheet()->setCellValue('C' . ($filascabecera + 2), "Dirección de Resolución");

$objPHPExcel->getActiveSheet()->mergeCells('F' . ($filascabecera + 1) . ':I' . ($filascabecera + 2));
//$objPHPExcel->getActiveSheet()->setCellValue('F' . ($filascabecera + 1), $nombreUnidad);
$objPHPExcel->getActiveSheet()->mergeCells('F' . $filascabecera . ':I' . $filascabecera);
$objPHPExcel->getActiveSheet()->setCellValue('F' . $filascabecera, '__________________');

$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('A')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(16.86);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('B')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(16);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('C')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(12);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('D')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(16);

$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('E')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(18);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('F')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(15);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('G')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth(15);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('H')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('H')->setWidth(12);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('H')->setAutoSize(false);

$objPHPExcel->getActiveSheet()->getColumnDimension('I')->setWidth(8.71);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('I')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('J')->setWidth(16);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('J')->setAutoSize(false);

$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('K')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('K')->setWidth(16.30);

$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('L')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('L')->setWidth(18);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('M')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('M')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('N')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('N')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('O')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('O')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('P')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('P')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('Q')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('Q')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('R')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('R')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('S')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('S')->setWidth(30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('T')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('T')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('U')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('U')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('V')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('V')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('W')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('W')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('X')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('X')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('Y')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('Y')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('Z')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('Z')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('AA')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('AA')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('AB')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('AB')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('AC')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('AC')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('AD')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('AD')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('AE')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('AE')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('AF')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('AF')->setWidth(16.30);


$objPHPExcel->getActiveSheet()->setCellValue('A' . $filacabecera, 'Memo Ingreso');
$objPHPExcel->getActiveSheet()->setCellValue('B' . $filacabecera, 'Número Interno');
$objPHPExcel->getActiveSheet()->setCellValue('C' . $filacabecera, 'Número de Providencia');
$objPHPExcel->getActiveSheet()->setCellValue('D' . $filacabecera, 'Fecha de Providencia');
$objPHPExcel->getActiveSheet()->setCellValue('E' . $filacabecera, 'Dia Providencia');
$objPHPExcel->getActiveSheet()->setCellValue('F' . $filacabecera, 'Mes Providencia');
$objPHPExcel->getActiveSheet()->setCellValue('G' . $filacabecera, 'Año Providencia');
$objPHPExcel->getActiveSheet()->setCellValue('H' . $filacabecera, 'Tipo');
$objPHPExcel->getActiveSheet()->setCellValue('I' . $filacabecera, 'Fecha de Ingreso');
$objPHPExcel->getActiveSheet()->setCellValue('J' . $filacabecera, 'Dia Ingreso');
$objPHPExcel->getActiveSheet()->setCellValue('K' . $filacabecera, 'Mes Ingreso');
$objPHPExcel->getActiveSheet()->setCellValue('L' . $filacabecera, 'Año Ingreso');
$objPHPExcel->getActiveSheet()->setCellValue('M' . $filacabecera, 'Unidad');
$objPHPExcel->getActiveSheet()->setCellValue('N' . $filacabecera, 'Tipo de Unidad');
$objPHPExcel->getActiveSheet()->setCellValue('O' . $filacabecera, 'Número de expediente');
$objPHPExcel->getActiveSheet()->setCellValue('P' . $filacabecera, 'Nombre de administrado');
$objPHPExcel->getActiveSheet()->setCellValue('Q' . $filacabecera, 'Nombre de establecimiento');
$objPHPExcel->getActiveSheet()->setCellValue('R' . $filacabecera, 'Dirección de notificación');
$objPHPExcel->getActiveSheet()->setCellValue('S' . $filacabecera, 'Dirección de domicilio');
$objPHPExcel->getActiveSheet()->setCellValue('T' . $filacabecera, 'Cédula RUC');
$objPHPExcel->getActiveSheet()->setCellValue('U' . $filacabecera, 'Reincidencia');
$objPHPExcel->getActiveSheet()->setCellValue('V' . $filacabecera, 'Ordenanza');
$objPHPExcel->getActiveSheet()->setCellValue('W' . $filacabecera, 'Fecha de sorteo');
$objPHPExcel->getActiveSheet()->setCellValue('X' . $filacabecera, 'Dia sorteo');
$objPHPExcel->getActiveSheet()->setCellValue('Y' . $filacabecera, 'Mes sorteo');
$objPHPExcel->getActiveSheet()->setCellValue('Z' . $filacabecera, 'Año sorteo');
$objPHPExcel->getActiveSheet()->setCellValue('AA' . $filacabecera, 'Envío expediente');
$objPHPExcel->getActiveSheet()->setCellValue('AB' . $filacabecera, 'Número de memorando');
$objPHPExcel->getActiveSheet()->setCellValue('AC' . $filacabecera, 'Fecha de envío');
$objPHPExcel->getActiveSheet()->setCellValue('AD' . $filacabecera, 'Dia envío');
$objPHPExcel->getActiveSheet()->setCellValue('AE' . $filacabecera, 'Mes envío');
$objPHPExcel->getActiveSheet()->setCellValue('AF' . $filacabecera, 'Año envío');

$noExistenFilas = true;

while ($rowdetalle = $result->fetch(PDO::FETCH_ASSOC)) {
// actualizar detalle idGuia


    $noExistenFilas = false;

    $objPHPExcel->getActiveSheet()->setCellValue('A' . $filaInicio, $rowdetalle['memo_ingreso']);
    $objPHPExcel->getActiveSheet()->setCellValue('B' . $filaInicio, $rowdetalle['numero_interno']);
    $objPHPExcel->getActiveSheet()->setCellValue('C' . $filaInicio, $rowdetalle['numero_providencia']);
    $objPHPExcel->getActiveSheet()->setCellValue('D' . $filaInicio, (isset($rowdetalle['fecha_providencia'])&&strlen($rowdetalle['fecha_providencia'])>9)  ? substr($rowdetalle['fecha_providencia'], 0, 10): "");
    $objPHPExcel->getActiveSheet()->setCellValue('E' . $filaInicio, (isset($rowdetalle['fecha_providencia'])&&strlen($rowdetalle['fecha_providencia'])>9)  ? substr($rowdetalle['fecha_providencia'], 8, 2): "");
    $objPHPExcel->getActiveSheet()->setCellValue('F' . $filaInicio, (isset($rowdetalle['fecha_providencia'])&&strlen($rowdetalle['fecha_providencia'])>9)  ? substr($rowdetalle['fecha_providencia'], 5, 2): "");
    $objPHPExcel->getActiveSheet()->setCellValue('G' . $filaInicio, (isset($rowdetalle['fecha_providencia'])&&strlen($rowdetalle['fecha_providencia'])>9)  ? substr($rowdetalle['fecha_providencia'], 0, 4): "");
    $objPHPExcel->getActiveSheet()->setCellValue('H' . $filaInicio, tipoProvidencia ($rowdetalle['tipo_providencia']));
    $objPHPExcel->getActiveSheet()->setCellValue('I' . $filaInicio, (isset($rowdetalle['fecha_ingreso'])&&strlen($rowdetalle['fecha_ingreso'])>9)  ? substr($rowdetalle['fecha_ingreso'], 0, 10): "");
    $objPHPExcel->getActiveSheet()->setCellValue('J' . $filaInicio, (isset($rowdetalle['fecha_ingreso'])&&strlen($rowdetalle['fecha_ingreso'])>9)  ? substr($rowdetalle['fecha_ingreso'], 8, 2): "");
    $objPHPExcel->getActiveSheet()->setCellValue('K' . $filaInicio, (isset($rowdetalle['fecha_ingreso'])&&strlen($rowdetalle['fecha_ingreso'])>9)  ? substr($rowdetalle['fecha_ingreso'], 5, 2): "");
    $objPHPExcel->getActiveSheet()->setCellValue('L' . $filaInicio, (isset($rowdetalle['fecha_ingreso'])&&strlen($rowdetalle['fecha_ingreso'])>9)  ? substr($rowdetalle['fecha_ingreso'], 0, 4): "");
    $objPHPExcel->getActiveSheet()->setCellValue('M' . $filaInicio,  regresaUnidad ($rowdetalle['unidad']));
    $objPHPExcel->getActiveSheet()->setCellValue('N' . $filaInicio, tipoUnidad ($rowdetalle['tipo_unidad']));
    $objPHPExcel->getActiveSheet()->setCellValue('O' . $filaInicio, $rowdetalle['numero_expediente']);
    $objPHPExcel->getActiveSheet()->setCellValue('P' . $filaInicio, $rowdetalle['nombre_administrado']);
    $objPHPExcel->getActiveSheet()->setCellValue('Q' . $filaInicio, $rowdetalle['nombre_establecimiento']);
    $objPHPExcel->getActiveSheet()->setCellValue('R' . $filaInicio, $rowdetalle['direccion_notificacion']);
    $objPHPExcel->getActiveSheet()->setCellValue('S' . $filaInicio, $rowdetalle['direccion_domicilio']);
    $objPHPExcel->getActiveSheet()->setCellValue('T' . $filaInicio, $rowdetalle['cedula_ruc']);
    $objPHPExcel->getActiveSheet()->setCellValue('U' . $filaInicio, ($rowdetalle['reincidencia']==1) ? "SI":" ");
    $objPHPExcel->getActiveSheet()->setCellValue('V' . $filaInicio, getOrdenanza ($rowdetalle['ordenanza']));
    $objPHPExcel->getActiveSheet()->setCellValue('W' . $filaInicio, (isset($rowdetalle['fecha_sorteo'])&&strlen($rowdetalle['fecha_sorteo'])>9)  ? substr($rowdetalle['fecha_sorteo'], 0, 10): "");
    $objPHPExcel->getActiveSheet()->setCellValue('X' . $filaInicio, (isset($rowdetalle['fecha_sorteo'])&&strlen($rowdetalle['fecha_sorteo'])>9)  ? substr($rowdetalle['fecha_sorteo'], 8, 2): "");
    $objPHPExcel->getActiveSheet()->setCellValue('Y' . $filaInicio, (isset($rowdetalle['fecha_sorteo'])&&strlen($rowdetalle['fecha_sorteo'])>9)  ? substr($rowdetalle['fecha_sorteo'], 5, 2): "");
    $objPHPExcel->getActiveSheet()->setCellValue('Z' . $filaInicio, (isset($rowdetalle['fecha_sorteo'])&&strlen($rowdetalle['fecha_sorteo'])>9)  ? substr($rowdetalle['fecha_sorteo'], 0, 4): "");
    $objPHPExcel->getActiveSheet()->setCellValue('AA' . $filaInicio, envioExpediente($rowdetalle['envio_expediente']));
    $objPHPExcel->getActiveSheet()->setCellValue('AB' . $filaInicio, $rowdetalle['numero_memorando']);
    $objPHPExcel->getActiveSheet()->setCellValue('AC' . $filaInicio, (isset($rowdetalle['fecha_envio'])&&strlen($rowdetalle['fecha_envio'])>9) ? substr($rowdetalle['fecha_envio'], 0, 10): "");
    $objPHPExcel->getActiveSheet()->setCellValue('AD' . $filaInicio, (isset($rowdetalle['fecha_envio'])&&strlen($rowdetalle['fecha_envio'])>9)  ? substr($rowdetalle['fecha_envio'], 8, 2): "");
    $objPHPExcel->getActiveSheet()->setCellValue('AE' . $filaInicio, (isset($rowdetalle['fecha_envio'])&&strlen($rowdetalle['fecha_envio'])>9)  ? substr($rowdetalle['fecha_envio'], 5, 2): "");
    $objPHPExcel->getActiveSheet()->setCellValue('AF' . $filaInicio, (isset($rowdetalle['fecha_envio'])&&strlen($rowdetalle['fecha_envio'])>9)  ? substr($rowdetalle['fecha_envio'], 0, 4): "");

    $objPHPExcel->getActiveSheet()->getStyle('A' . $filaInicio . ':AF' . $filaInicio)->applyFromArray($styleArray);
    $filaInicio++;
}


// Set document properties
//echo date('H:i:s') , " Set document properties" , PHP_EOL;
$objPHPExcel->getProperties()->setCreator("Carlos Cevallos")
    ->setLastModifiedBy("Carlos Cevallos")
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


$objPHPExcel->getActiveSheet()->getStyle('A1:AF1000')->applyFromArray(
    array(
        'alignment' => array(
            'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
        )
    )
);

$objPHPExcel->getActiveSheet()->getStyle('A4:AF1000')->applyFromArray(
    array(
        'alignment' => array(
            'vertical' => PHPExcel_Style_Alignment::VERTICAL_TOP,
        )
    )
);

$objPHPExcel->getActiveSheet()->getStyle('A4:AF1000')->getAlignment()->setWrapText(true);


$objPHPExcel->getActiveSheet()->getStyle('A' . $filacabecera . ':AF' . $filacabecera)->applyFromArray($styleArray);

//$objPHPExcel->getActiveSheet()->getStyle('A7:D7')->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);


// Set page orientation and size
//echo date('H:i:s') , " Set page orientation and size" , PHP_EOL;
$objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_PORTRAIT);
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);


$objPHPExcel->getActiveSheet()->getStyle('A1:AF3')->getFont()->setSize(14);
$objPHPExcel->getActiveSheet()->getStyle('A4:AF1000')->getFont()->setSize(10);


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
header('Content-Disposition: attachment;filename="reporte-providencias-MATIS-' . $today . '.xls"');
header('Cache-Control: max-age=0');
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

function resolucionDe($id)
{
    if (($id >= 1) and ($id <= 5)) {
        if ((isset($id)) and ($id != ' ')) {

            $opciones = array(1 => "Sanción", 2 => "Archivo", 3 => "Nulidad", 4 => "Caducidad", 5 => "Anulada");
            return $opciones [$id];
        } else {
            return '';
        }

    } else
        return '';

}

function regresaUnidad($id_dato)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    if (($id_dato != '') and (isset($id_dato))) {
        $sql = "SELECT * FROM amc_zonas WHERE activo = 1 AND id = " . $id_dato;
        $nombre = $os->db->conn->query($sql);
        $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
        return $rownombre['nombre'];
    } else
        return '';

}
function getOrdenanza($id_dato)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    if (($id_dato != '') and (isset($id_dato))) {
        $sql = "SELECT *
            FROM amc_ordenanzas WHERE id = " . $id_dato;
        $nombre = $os->db->conn->query($sql);
        $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
        return $rownombre['nombre'];
    } else
        return '';

}
function tipoUnidad($id)
{
    if ((isset($id)) and ($id!=" ")){
        $opciones = array(0 => "UDC", 1 => "ASEO");
        return $opciones [$id];
    } else {
        return '';
    }
}

function tipoProvidencia($id)
{
    if ((isset($id)) and ($id!=" ")){
        $opciones = array(0 => " ", 1 => "Nulidad", 2 => "Subsanación", 3 => "Atención a escrito", 4 => "Subsanación", 5 => "Previo a resolver", 6 => "Copias", 7 => "Insistencia a informe", 8 => "Archivo", 9 => "Derecho a recurso", 10 => "Extensión del plazo");
        return $opciones [$id];
    } else {
        return '';
    }
}

function envioExpediente($id)
{
    if (($id >= 1) and ($id <= 4)) {
        if ((isset($id)) and ($id != ' ')) {
            $opciones = array(1 => "Ejecución", 2 => "Instrucción", 3 => "Secretaría", 4 => "Apelación");
            return $opciones [$id];
        } else {
            return '';
        }

    } else
        return '';

}