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
if (isset($data->envio_expediente) && $data->envio_expediente != "") {
    $filtro_envio_expediente = $data->envio_expediente;
    if ($where == '') {
        $where = " WHERE envio_expediente LIKE '%$filtro_envio_expediente%' ";
    } else {
        $where = $where . " AND envio_expediente LIKE '%$filtro_envio_expediente%' ";
    }
}
if (isset($data->fecha_envio_inicio) && isset($data->fecha_envio_fin) && $data->fecha_envio_inicio != "" && $data->fecha_envio_fin != "") {
    $busqueda_fecha_inicio = $data->fecha_envio_inicio;
    $busqueda_fecha_fin = $data->fecha_envio_fin;
    if ($where == '') {
        $where = " WHERE cast(a.fecha_envio as date) >= '$busqueda_fecha_inicio' AND cast(a.fecha_envio as date) <= '$busqueda_fecha_fin' ";
    } else {
        $where = $where . " AND cast(a.fecha_envio as date) >= '$busqueda_fecha_inicio' AND cast(a.fecha_envio as date) <= '$busqueda_fecha_fin' ";
    }
}
if (isset($_POST['fecha_ingreso']) && $_POST['fecha_ingreso']!="") {
    $busqueda_fecha_ingreso= $_POST['fecha_ingreso'];
    if($where == ''){
        $where = " WHERE cast(a.fecha_ingreso - 1 as date) = '$busqueda_fecha_ingreso'";
    }else{
        $where = $where . " AND cast(a.fecha_ingreso - 1 as date) = '$busqueda_fecha_ingreso'";
    }
}
if (isset($_POST['memo_ingreso']) && $_POST['memo_ingreso']!="" ) {
    $filtro_memo_ingreso = $_POST['memo_ingreso'];
    if($where == ''){
        $where = " WHERE memo_ingreso LIKE '%$filtro_memo_ingreso%' ";
    }else{
        $where = $where . " AND memo_ingreso LIKE '%$filtro_memo_ingreso%' ";
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
$sql = "SELECT * FROM amc_libro_diario a INNER JOIN amc_resoluciones b ON a.id = b.id_libro_diario $where $orderby";

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


$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo1 . ':AN' . $filaTitulo1);
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo2 . ':AN' . $filaTitulo2);

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

$objPHPExcel->getActiveSheet()->getColumnDimension('I')->setWidth(16);
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
$objPHPExcel->getActiveSheet()->getColumnDimension('S')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('T')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('T')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('U')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('U')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('V')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('V')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('W')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('W')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('X')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('X')->setWidth(25);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('Y')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('Y')->setWidth(25);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('Z')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('Z')->setWidth(25);
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
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('AG')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('AG')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('AH')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('AH')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('AI')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('AI')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('AJ')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('AJ')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('AK')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('AK')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('AL')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('AL')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('AM')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('AM')->setWidth(16.30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('AN')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('AN')->setWidth(40);

$objPHPExcel->getActiveSheet()->setCellValue('A' . $filacabecera, 'Memo Ingreso');
$objPHPExcel->getActiveSheet()->setCellValue('B' . $filacabecera, 'Número Interno');
$objPHPExcel->getActiveSheet()->setCellValue('C' . $filacabecera, 'Número Resolución');
$objPHPExcel->getActiveSheet()->setCellValue('D' . $filacabecera, 'Fecha Resolución');
$objPHPExcel->getActiveSheet()->setCellValue('E' . $filacabecera, 'Dia Resolución');
$objPHPExcel->getActiveSheet()->setCellValue('F' . $filacabecera, 'Mes Resolución');
$objPHPExcel->getActiveSheet()->setCellValue('G' . $filacabecera, 'Año Resolución');
$objPHPExcel->getActiveSheet()->setCellValue('H' . $filacabecera, 'Artículo Actual');
$objPHPExcel->getActiveSheet()->setCellValue('I' . $filacabecera, 'Ordenanza');
$objPHPExcel->getActiveSheet()->setCellValue('J' . $filacabecera, 'Resolución de');
$objPHPExcel->getActiveSheet()->setCellValue('K' . $filacabecera, 'Multa impuesta');
$objPHPExcel->getActiveSheet()->setCellValue('L' . $filacabecera, 'Fecha de Ingreso');
$objPHPExcel->getActiveSheet()->setCellValue('M' . $filacabecera, 'Dia Ingreso');
$objPHPExcel->getActiveSheet()->setCellValue('N' . $filacabecera, 'Mes Ingreso');
$objPHPExcel->getActiveSheet()->setCellValue('O' . $filacabecera, 'Año Ingreso');
$objPHPExcel->getActiveSheet()->setCellValue('P' . $filacabecera, 'Unidad');
$objPHPExcel->getActiveSheet()->setCellValue('Q' . $filacabecera, 'Tipo de Unidad');
$objPHPExcel->getActiveSheet()->setCellValue('R' . $filacabecera, 'Número de expediente');
$objPHPExcel->getActiveSheet()->setCellValue('S' . $filacabecera, 'Nombre de administrado');
$objPHPExcel->getActiveSheet()->setCellValue('T' . $filacabecera, 'Nombre de establecimiento');
$objPHPExcel->getActiveSheet()->setCellValue('U' . $filacabecera, 'Dirección de notificación');
$objPHPExcel->getActiveSheet()->setCellValue('V' . $filacabecera, 'Dirección de domicilio');
$objPHPExcel->getActiveSheet()->setCellValue('W' . $filacabecera, 'Cédula RUC');
$objPHPExcel->getActiveSheet()->setCellValue('X' . $filacabecera, 'Reincidencia');
$objPHPExcel->getActiveSheet()->setCellValue('Y' . $filacabecera, 'Fecha de sorteo');
$objPHPExcel->getActiveSheet()->setCellValue('Z' . $filacabecera, 'Dia sorteo');
$objPHPExcel->getActiveSheet()->setCellValue('AA' . $filacabecera, 'Mes sorteo');
$objPHPExcel->getActiveSheet()->setCellValue('AB' . $filacabecera, 'Año sorteo');
$objPHPExcel->getActiveSheet()->setCellValue('AC' . $filacabecera, 'Envío expediente');
$objPHPExcel->getActiveSheet()->setCellValue('AD' . $filacabecera, 'Número de memorando');
$objPHPExcel->getActiveSheet()->setCellValue('AE' . $filacabecera, 'Fecha de envío');
$objPHPExcel->getActiveSheet()->setCellValue('AF' . $filacabecera, 'Dia envío');
$objPHPExcel->getActiveSheet()->setCellValue('AG' . $filacabecera, 'Mes envío');
$objPHPExcel->getActiveSheet()->setCellValue('AH' . $filacabecera, 'Año envío');
$objPHPExcel->getActiveSheet()->setCellValue('AI' . $filacabecera, 'Funcionario');
$objPHPExcel->getActiveSheet()->setCellValue('AJ' . $filacabecera, 'Numero Memo Apelacion');
$objPHPExcel->getActiveSheet()->setCellValue('AK' . $filacabecera, 'Fecha Envio Apelacion');
$objPHPExcel->getActiveSheet()->setCellValue('AL' . $filacabecera, 'Horas Trabajo Comunitario');
$objPHPExcel->getActiveSheet()->setCellValue('AM' . $filacabecera, 'Apelacion');
$objPHPExcel->getActiveSheet()->setCellValue('AN' . $filacabecera, 'Observaciones');


$noExistenFilas = true;

while ($rowdetalle = $result->fetch(PDO::FETCH_ASSOC)) {
// actualizar detalle idGuia


    $noExistenFilas = false;

    $objPHPExcel->getActiveSheet()->setCellValue('A' . $filaInicio, $rowdetalle['memo_ingreso']);
    $objPHPExcel->getActiveSheet()->setCellValue('B' . $filaInicio, $rowdetalle['numero_interno']);
    $objPHPExcel->getActiveSheet()->setCellValue('C' . $filaInicio, $rowdetalle['numero_resolucion']);
    $objPHPExcel->getActiveSheet()->setCellValue('D' . $filaInicio, (isset($rowdetalle['fecha_resolucion'])&&strlen($rowdetalle['fecha_resolucion'])>9)  ? substr($rowdetalle['fecha_resolucion'], 0, 10): "");
    $objPHPExcel->getActiveSheet()->setCellValue('E' . $filaInicio, (isset($rowdetalle['fecha_resolucion'])&&strlen($rowdetalle['fecha_resolucion'])>9)  ? substr($rowdetalle['fecha_resolucion'], 8, 2): "");
    $objPHPExcel->getActiveSheet()->setCellValue('F' . $filaInicio, (isset($rowdetalle['fecha_resolucion'])&&strlen($rowdetalle['fecha_resolucion'])>9)  ? substr($rowdetalle['fecha_resolucion'], 5, 2): "");
    $objPHPExcel->getActiveSheet()->setCellValue('G' . $filaInicio, (isset($rowdetalle['fecha_resolucion'])&&strlen($rowdetalle['fecha_resolucion'])>9)  ? substr($rowdetalle['fecha_resolucion'], 0, 4): "");
    $objPHPExcel->getActiveSheet()->setCellValue('H' . $filaInicio, $rowdetalle['articulo_actual']);
    $objPHPExcel->getActiveSheet()->setCellValue('I' . $filaInicio, getOrdenanza ($rowdetalle['ordenanza']));
    $objPHPExcel->getActiveSheet()->setCellValue('J' . $filaInicio, resolucionDe($rowdetalle['resolucion_de']));
    $objPHPExcel->getActiveSheet()->setCellValue('K' . $filaInicio, $rowdetalle['multa_impuesta']);
    $objPHPExcel->getActiveSheet()->setCellValue('L' . $filaInicio, (isset($rowdetalle['fecha_ingreso'])&&strlen($rowdetalle['fecha_ingreso'])>9)  ? substr($rowdetalle['fecha_ingreso'], 0, 10): "");
    $objPHPExcel->getActiveSheet()->setCellValue('M' . $filaInicio, (isset($rowdetalle['fecha_ingreso'])&&strlen($rowdetalle['fecha_ingreso'])>9)  ? substr($rowdetalle['fecha_ingreso'], 8, 2): "");
    $objPHPExcel->getActiveSheet()->setCellValue('N' . $filaInicio, (isset($rowdetalle['fecha_ingreso'])&&strlen($rowdetalle['fecha_ingreso'])>9)  ? substr($rowdetalle['fecha_ingreso'], 5, 2): "");
    $objPHPExcel->getActiveSheet()->setCellValue('O' . $filaInicio, (isset($rowdetalle['fecha_ingreso'])&&strlen($rowdetalle['fecha_ingreso'])>9)  ? substr($rowdetalle['fecha_ingreso'], 0, 4): "");
    $objPHPExcel->getActiveSheet()->setCellValue('P' . $filaInicio,  regresaUnidad ($rowdetalle['unidad']));
    $objPHPExcel->getActiveSheet()->setCellValue('Q' . $filaInicio, tipoUnidad ($rowdetalle['tipo_unidad']));
    $objPHPExcel->getActiveSheet()->setCellValue('R' . $filaInicio, $rowdetalle['numero_expediente']);
    $objPHPExcel->getActiveSheet()->setCellValue('S' . $filaInicio, $rowdetalle['nombre_administrado']);
    $objPHPExcel->getActiveSheet()->setCellValue('T' . $filaInicio, $rowdetalle['nombre_establecimiento']);
    $objPHPExcel->getActiveSheet()->setCellValue('U' . $filaInicio, $rowdetalle['direccion_notificacion']);
    $objPHPExcel->getActiveSheet()->setCellValue('V' . $filaInicio, $rowdetalle['direccion_domicilio']);
    $objPHPExcel->getActiveSheet()->setCellValue('W' . $filaInicio, $rowdetalle['cedula_ruc']);
    $objPHPExcel->getActiveSheet()->setCellValue('X' . $filaInicio, ($rowdetalle['reincidencia']==1) ? "SI":" ");
    $objPHPExcel->getActiveSheet()->setCellValue('Y' . $filaInicio, (isset($rowdetalle['fecha_sorteo'])&&strlen($rowdetalle['fecha_sorteo'])>9)  ? substr($rowdetalle['fecha_sorteo'], 0, 10): "");
    $objPHPExcel->getActiveSheet()->setCellValue('Z' . $filaInicio, (isset($rowdetalle['fecha_sorteo'])&&strlen($rowdetalle['fecha_sorteo'])>9)  ? substr($rowdetalle['fecha_sorteo'], 8, 2): "");
    $objPHPExcel->getActiveSheet()->setCellValue('AA' . $filaInicio, (isset($rowdetalle['fecha_sorteo'])&&strlen($rowdetalle['fecha_sorteo'])>9)  ? substr($rowdetalle['fecha_sorteo'], 5, 2): "");
    $objPHPExcel->getActiveSheet()->setCellValue('AB' . $filaInicio, (isset($rowdetalle['fecha_sorteo'])&&strlen($rowdetalle['fecha_sorteo'])>9)  ? substr($rowdetalle['fecha_sorteo'], 0, 4): "");
    $objPHPExcel->getActiveSheet()->setCellValue('AC' . $filaInicio, envioExpediente($rowdetalle['envio_expediente']));
    $objPHPExcel->getActiveSheet()->setCellValue('AD' . $filaInicio, $rowdetalle['numero_memorando']);
    $objPHPExcel->getActiveSheet()->setCellValue('AE' . $filaInicio, (isset($rowdetalle['fecha_envio'])&&strlen($rowdetalle['fecha_envio'])>9) ? substr($rowdetalle['fecha_envio'], 0, 10): "");
    $objPHPExcel->getActiveSheet()->setCellValue('AF' . $filaInicio, (isset($rowdetalle['fecha_envio'])&&strlen($rowdetalle['fecha_envio'])>9)  ? substr($rowdetalle['fecha_envio'], 8, 2): "");
    $objPHPExcel->getActiveSheet()->setCellValue('AG' . $filaInicio, (isset($rowdetalle['fecha_envio'])&&strlen($rowdetalle['fecha_envio'])>9)  ? substr($rowdetalle['fecha_envio'], 5, 2): "");
    $objPHPExcel->getActiveSheet()->setCellValue('AH' . $filaInicio, (isset($rowdetalle['fecha_envio'])&&strlen($rowdetalle['fecha_envio'])>9)  ? substr($rowdetalle['fecha_envio'], 0, 4): "");
    $objPHPExcel->getActiveSheet()->setCellValue('AI' . $filaInicio, nombreFuncionario($rowdetalle['funcionario']));
    $objPHPExcel->getActiveSheet()->setCellValue('AJ' . $filaInicio, $rowdetalle['numero_memo_apelacion']);
    $objPHPExcel->getActiveSheet()->setCellValue('AK' . $filaInicio, (isset($rowdetalle['fecha_envio_apelacion'])&&strlen($rowdetalle['fecha_envio_apelacion'])>9)  ? substr($rowdetalle['fecha_envio_apelacion'], 0, 10): "");
    $objPHPExcel->getActiveSheet()->setCellValue('AL' . $filaInicio, $rowdetalle['horas_trabajo_comunitario']);
    //$objPHPExcel->getActiveSheet()->setCellValue('AM' . $filaInicio, getApelacion($rowdetalle['apelacion']));
    $objPHPExcel->getActiveSheet()->setCellValue('AN' . $filaInicio, $rowdetalle['observaciones']);

    $objPHPExcel->getActiveSheet()->getStyle('A' . $filaInicio . ':AN' . $filaInicio)->applyFromArray($styleArray);
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


$objPHPExcel->getActiveSheet()->getStyle('A1:AN600')->applyFromArray(
    array(
        'alignment' => array(
            'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
        )
    )
);

$objPHPExcel->getActiveSheet()->getStyle('A4:AN200')->applyFromArray(
    array(
        'alignment' => array(
            'vertical' => PHPExcel_Style_Alignment::VERTICAL_TOP,
        )
    )
);

$objPHPExcel->getActiveSheet()->getStyle('A4:AN1000')->getAlignment()->setWrapText(true);


$objPHPExcel->getActiveSheet()->getStyle('A' . $filacabecera . ':AN' . $filacabecera)->applyFromArray($styleArray);

//$objPHPExcel->getActiveSheet()->getStyle('A7:D7')->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);


// Set page orientation and size
//echo date('H:i:s') , " Set page orientation and size" , PHP_EOL;
$objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_PORTRAIT);
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);


$objPHPExcel->getActiveSheet()->getStyle('A1:AN3')->getFont()->setSize(14);
$objPHPExcel->getActiveSheet()->getStyle('A4:AN1000')->getFont()->setSize(10);


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
header('Content-Disposition: attachment;filename="reporte-Resolucion-MATIS-' . $today . '.xls"');
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
    if (($id >= 1) and ($id <= 6)) {
        if ((isset($id)) and ($id != ' ')) {

            $opciones = array(1 => "Sanción", 2 => "Archivo", 3 => "Nulidad", 4 => "Caducidad", 5 => "Anulada", 6 => "Sanción-trabajo comunitario");
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

function getApelacion($id)
{
    if ((isset($id)) and ($id!=" ")){

        $opciones = array(0 => "SI", 1 => "NO");
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
function nombreFuncionario($id_dato)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    if (($id_dato != '') and ((int)$id_dato > 0) and (isset($id_dato))) {
        $sql = "SELECT a.id, CONCAT(a.first_name,' ',a.last_name) AS nombre FROM qo_members a
            WHERE $id_dato = a.id";
        $nombre = $os->db->conn->query($sql);
        $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
        return $rownombre['nombre'];
    } else
        return '';

}


