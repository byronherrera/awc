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
if(isset ($_POST['accesosResolutores'])){
    $acceso = $_POST['accesosResolutores'];
    if($acceso=='true'){
        if($where == ''){
            $where = " WHERE funcionario = $usuarioLog ";
        }else{
            $where = $where . " AND funcionario = $usuarioLog ";
        }
    }
}

if (isset($_POST['busqueda_fecha_inicio']) && isset($_POST['busqueda_fecha_fin']) && $_POST['busqueda_fecha_inicio']!="" && $_POST['busqueda_fecha_fin']!="") {
    $busqueda_fecha_inicio = $_POST['busqueda_fecha_inicio'];
    $busqueda_fecha_fin = $_POST['busqueda_fecha_fin'];
    if($where == ''){
        $where = " WHERE cast(b.fecha_resolucion as date) >= '$busqueda_fecha_inicio' AND cast(b.fecha_resolucion as date) <= '$busqueda_fecha_fin' ";
    }else{
        $where = $where . " AND cast(b.fecha_resolucion as date) >= '$busqueda_fecha_inicio' AND cast(b.fecha_resolucion as date) <= '$busqueda_fecha_fin' ";
    }
}
if (isset($_POST['ordenanza']) && $_POST['ordenanza']!="" ) {
    $filtroOrdenanza = $_POST['ordenanza'];
    if($where == ''){
        $where = " WHERE ordenanza = '$filtroOrdenanza' ";
    }else{
        $where = $where . " AND ordenanza = '$filtroOrdenanza' ";
    }
}
if (isset($_POST['resolucion_de']) && $_POST['resolucion_de']!="" ) {
    $filtroResolucion_de = $_POST['resolucion_de'];
    if($where == ''){
        $where = " WHERE resolucion_de = '$filtroResolucion_de' ";
    }else{
        $where = $where . " AND resolucion_de = '$filtroResolucion_de' ";
    }
}
if (isset($_POST['funcionario']) && $_POST['funcionario']!="" ) {
    $filtroFuncionario = $_POST['funcionario'];
    if($where == ''){
        $where = " WHERE funcionario = '$filtroFuncionario' ";
    }else{
        $where = $where . " AND funcionario = '$filtroFuncionario' ";
    }
}
if (isset($_POST['numero_resolucion']) && $_POST['numero_resolucion']!="" ) {
    $filtronumero_resolucion = $_POST['numero_resolucion'];
    if($where == ''){
        $where = " WHERE numero_resolucion LIKE '%$filtronumero_resolucion%' ";
    }else{
        $where = $where . " AND numero_resolucion LIKE '%$filtronumero_resolucion%' ";
    }
}
if (isset($_POST['articulo_actual']) && $_POST['articulo_actual']!="" ) {
    $filtro_articulo_actual = $_POST['articulo_actual'];
    if($where == ''){
        $where = " WHERE articulo_actual LIKE '%$filtro_articulo_actual%' ";
    }else{
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
$sql = "SELECT memo_ingreso,fecha_ingreso,numero_resolucion, fecha_resolucion, articulo_actual, resolucion_de,
                multa_impuesta, unidad, numero_interno, numero_expediente,nombre_administrado, nombre_establecimiento,
                cedula_ruc, reincidencia, ordenanza, iniciado_por, entidad, numero_informe, medida_cautelar,
                estado, funcionario, envio_expediente, fecha_envio
FROM amc_libro_diario a INNER JOIN amc_resoluciones b ON a.id = b.id_libro_diario $where $orderby LIMIT $start, $limit";

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

$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo1, "REPORTE DE LIBRO DIARIO");
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


$objPHPExcel->getActiveSheet()->setCellValue('A' . $filacabecera, 'Codigo');
$objPHPExcel->getActiveSheet()->setCellValue('B' . $filacabecera, 'Fecha y hora de recepcion');
$objPHPExcel->getActiveSheet()->setCellValue('C' . $filacabecera, 'Tipo de documento');
$objPHPExcel->getActiveSheet()->setCellValue('D' . $filacabecera, 'N. de documento');
$objPHPExcel->getActiveSheet()->setCellValue('E' . $filacabecera, 'Remitente');
$objPHPExcel->getActiveSheet()->setCellValue('F' . $filacabecera, 'Asunto');
$objPHPExcel->getActiveSheet()->setCellValue('G' . $filacabecera, 'Descripción del anexo');
$objPHPExcel->getActiveSheet()->setCellValue('H' . $filacabecera, 'Carácter de trámite');
$objPHPExcel->getActiveSheet()->setCellValue('I' . $filacabecera, 'Cantidad de fojas');
$objPHPExcel->getActiveSheet()->setCellValue('J' . $filacabecera, 'Unidad');
$objPHPExcel->getActiveSheet()->setCellValue('K' . $filacabecera, 'Observaciones');

$noExistenFilas = true;

while ($rowdetalle = $result->fetch(PDO::FETCH_ASSOC)) {
// actualizar detalle idGuia


    $noExistenFilas = false;
//    switch ($rowdetalle['id_tipo_documento']) {
//        case 1:
//            $rowdetalle['id_tipo_documento'] = 'Denuncias';
//            break;
//        case 2:
//            $rowdetalle['id_tipo_documento'] = 'Comunicados';
//            break;
//    }
//
//    switch ($rowdetalle['id_caracter_tramite']) {
//        case 1:
//            $rowdetalle['id_caracter_tramite'] = 'Ordinario';
//            break;
//        case 2:
//            $rowdetalle['id_caracter_tramite'] = 'Urgente';
//            break;
//    }
//
//    {name: 'memo_ingreso', allowBlank: false},
//    {name: 'numero_interno', allowBlank: false},
//    {name: 'numero_resolucion', allowBlank: false},
//    {name: 'fecha_resolucion', allowBlank: false},
//    {name: 'articulo_actual', allowBlank: false},
//    {name: 'resolucion_de', allowBlank: false},
//    {name: 'multa_impuesta', allowBlank: false},
//    {name: 'fecha_ingreso', allowBlank: false},
//    {name: 'unidad', allowBlank: false},

//    {name: 'tipo_unidad', allowBlank: false},
//    {name: 'numero_expediente', allowBlank: false},
//    {name: 'nombre_administrado', allowBlank: false},
//    {name: 'nombre_establecimiento', allowBlank: false},
//    {name: 'direccion_notificacion', allowBlank: false},
//    {name: 'direccion_domicilio', allowBlank: false},
//    {name: 'cedula_ruc', allowBlank: false},
//    {name: 'reincidencia', allowBlank: false},
//    {name: 'ordenanza', allowBlank: false},

    $objPHPExcel->getActiveSheet()->setCellValue('A' . $filaInicio, $rowdetalle['memo_ingreso']);
    $objPHPExcel->getActiveSheet()->setCellValue('B' . $filaInicio, $rowdetalle['numero_interno']);
    $objPHPExcel->getActiveSheet()->setCellValue('C' . $filaInicio, $rowdetalle['numero_resolucion']);
    $objPHPExcel->getActiveSheet()->setCellValue('D' . $filaInicio, $rowdetalle['fecha_resolucion']);
    $objPHPExcel->getActiveSheet()->setCellValue('E' . $filaInicio, $rowdetalle['articulo_actual']);
//    $objPHPExcel->getActiveSheet()->setCellValue('F' . $filaInicio, substr($rowdetalle['asunto'], 0, 200));
//    $objPHPExcel->getActiveSheet()->setCellValue('G' . $filaInicio, strip_tags($rowdetalle['descripcion_anexos']));
    $objPHPExcel->getActiveSheet()->setCellValue('H' . $filaInicio, $rowdetalle['resolucion_de']);
    $objPHPExcel->getActiveSheet()->setCellValue('I' . $filaInicio, $rowdetalle['multa_impuesta']);
    $objPHPExcel->getActiveSheet()->setCellValue('J' . $filaInicio, $rowdetalle['fecha_ingreso']);
    $objPHPExcel->getActiveSheet()->setCellValue('K' . $filaInicio, $rowdetalle['unidad']);
    $objPHPExcel->getActiveSheet()->setCellValue('K' . $filaInicio, $rowdetalle['tipo_unidad']);
    $objPHPExcel->getActiveSheet()->setCellValue('K' . $filaInicio, $rowdetalle['numero_expediente']);
    $objPHPExcel->getActiveSheet()->setCellValue('K' . $filaInicio, $rowdetalle['nombre_administrado']);
    $objPHPExcel->getActiveSheet()->setCellValue('K' . $filaInicio, $rowdetalle['nombre_establecimiento']);
    $objPHPExcel->getActiveSheet()->setCellValue('K' . $filaInicio, $rowdetalle['direccion_notificacion']);
    $objPHPExcel->getActiveSheet()->setCellValue('K' . $filaInicio, $rowdetalle['direccion_domicilio']);
    $objPHPExcel->getActiveSheet()->setCellValue('K' . $filaInicio, $rowdetalle['cedula_ruc']);
    $objPHPExcel->getActiveSheet()->setCellValue('K' . $filaInicio, $rowdetalle['reincidencia']);
    $objPHPExcel->getActiveSheet()->setCellValue('K' . $filaInicio, $rowdetalle['ordenanza']);

    $objPHPExcel->getActiveSheet()->getStyle('A' . $filaInicio . ':K' . $filaInicio)->applyFromArray($styleArray);
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
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment;filename="export-documents-SGE-' . $today . '.xls"');
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
