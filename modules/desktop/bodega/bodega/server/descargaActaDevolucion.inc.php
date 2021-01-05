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
$time = date("H:i:s");
$day = date("j");
$month = date("n");
$year = date("Y");



if (isset($_GET["param"])) {
    $retiroId = $_GET["param"];
    //echo $retiroId;
} else {
    exit;
}

// para los reportes
$where = '';

$usuarioLog = $os->get_member_id();

if (isset($retiroId) && $retiroId != "") {
    if ($where == '') {
        $where = " WHERE id = '$retiroId' ";
    } else {
        $where = $where . " AND id = '$retiroId' ";
    }
}

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
$sql = "SELECT * FROM amc_bodega a $where $orderby";

$result = $os->db->conn->query($sql);
$number_of_rows = $result->rowCount();

$objPHPExcel = new PHPExcel();
$objPHPExcel->setActiveSheetIndex(0);

$filaTitulo1 = 2;
$filacabecera = 8;
$filadesprendibles = 15;
$filaInicio = 11;


$styleArray = array(
    'borders' => array(
        'allborders' => array(
            'style' => PHPExcel_Style_Border::BORDER_THIN
        )
    )
);


$objPHPExcel->getActiveSheet()->mergeCells('A' . 2 . ':D' . 2);
$objPHPExcel->getActiveSheet()->mergeCells('A' . ($filaTitulo1 + 2) . ':D' . ($filaTitulo1 + 2));
$objPHPExcel->getActiveSheet()->mergeCells('A' . ($filaTitulo1 + 3) . ':D' . ($filaTitulo1 + 3));
$objPHPExcel->getActiveSheet()->mergeCells('A' . ($filaTitulo1 + 4) . ':D' . ($filaTitulo1 + 4));
$objPHPExcel->getActiveSheet()->mergeCells('C' . 10 . ':D' . 10);
$objPHPExcel->getActiveSheet()->mergeCells('C' . 11 . ':D' . 11);
$objPHPExcel->getActiveSheet()->mergeCells('C' . 12 . ':D' . 12);

$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo1, "ACTA DE DEVOLUCIÓN");

$os->db->conn->query("SET NAMES 'utf8'");
$sql = "SELECT CONCAT(qo_members.first_name, ' ', qo_members.last_name) AS nombre
            FROM qo_members WHERE id = " . $os->get_member_id();
$nombre = $os->db->conn->query($sql);
$rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
$nombreUsuario = $rownombre['nombre'];

$filascabecera = $number_of_rows + $filaInicio + 2;
$objPHPExcel->getActiveSheet()->mergeCells('C' . ($filacabecera) . ':D' . ($filacabecera));
$objPHPExcel->getActiveSheet()->mergeCells('C' . ($filacabecera + 1) . ':D' . ($filacabecera + 1));

$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('A')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(30);
$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(30);
$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(30);
$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(30);


$objPHPExcel->getActiveSheet()->setCellValue('A' . $filacabecera, 'BIENES');
$objPHPExcel->getActiveSheet()->setCellValue('B' . $filacabecera, 'ESTADO DEL BIEN');
$objPHPExcel->getActiveSheet()->setCellValue('C' . $filacabecera, 'DESCRIPCIÓN');
$objPHPExcel->getActiveSheet()->setCellValue('A' . ($filacabecera + 5), 'PRODUCTO');
$objPHPExcel->getActiveSheet()->setCellValue('B' . ($filacabecera + 5), 'ESTADO DEL PRODUCTO');
$objPHPExcel->getActiveSheet()->setCellValue('C' . ($filacabecera + 5), 'UNIDADES RECIBIDAS');
$objPHPExcel->getActiveSheet()->setCellValue('D' . ($filacabecera + 5), 'PESO');

$noExistenFilas = true;

while ($rowdetalle = $result->fetch(PDO::FETCH_ASSOC)) {
// actualizar detalle idGuia
    $fechaRetiro = strval($rowdetalle['fecha_retiro']);
    $anioRetiro = substr($fechaRetiro, 0, 4);
    $mesRetiro = substr($fechaRetiro, 5, 2);
    $diaRetiro = substr($fechaRetiro, 8, 2);
    $fechaFixRetiro = substr($fechaRetiro, 0, 10);

    $noExistenFilas = false;
    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filaTitulo1 + 2), "En la ciudad de Quito, el día ".$day. " del mes ".$month. " del año ".$year. ", siendo las ".$time. " se procede con ");
    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filaTitulo1 + 3), "la devolución a el/la señor(a) ". $rowdetalle['administrado']. " con cédula de identidad / pasaporte No." .$rowdetalle['cedula']);
    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filaTitulo1 + 4), "conforme el siguiente detalle:");
    //$objPHPExcel->getActiveSheet()->setCellValue('A' . ($filaTitulo1 + 3), "el/la señor(a) ");


//    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filaTitulo1 + 6), 'Inspector');
//    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filaTitulo1 + 7), '____________________________________');
//    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filaTitulo1 + 8), 'Fecha');
//    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filaTitulo1 + 10), '____________________________________');
//    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filaTitulo1 + 11), 'Firma');
//    $objPHPExcel->getActiveSheet()->setCellValue('B' . $filaInicio, $rowdetalle['bien']);

    $objPHPExcel->getActiveSheet()->mergeCells('A' . ($filacabecera + 10) . ':D' . ($filacabecera + 10));
    $objPHPExcel->getActiveSheet()->mergeCells('A' . ($filacabecera + 11) . ':D' . ($filacabecera + 11));
    $objPHPExcel->getActiveSheet()->mergeCells('A' . ($filacabecera + 12) . ':D' . ($filacabecera + 12));
    $objPHPExcel->getActiveSheet()->mergeCells('A' . ($filacabecera + 13) . ':D' . ($filacabecera + 13));
    $objPHPExcel->getActiveSheet()->mergeCells('A' . ($filacabecera + 14) . ':D' . ($filacabecera + 14));
    $objPHPExcel->getActiveSheet()->mergeCells('A' . ($filacabecera + 16) . ':D' . ($filacabecera + 16));
    $objPHPExcel->getActiveSheet()->mergeCells('A' . ($filacabecera + 17) . ':D' . ($filacabecera + 17));
    $objPHPExcel->getActiveSheet()->mergeCells('A' . ($filacabecera + 18) . ':D' . ($filacabecera + 18));
    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filacabecera + 10), "Bienes que fueron retirados en el operativo del día " . $diaRetiro . " del mes de " . $mesRetiro . " del año " . $anioRetiro . " por el inspector " . $rowdetalle['inspector']);
    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filacabecera + 11), "Con el presente documento, se compromete el/la administrado a cumplir la normativa nacional y");
    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filacabecera + 12), "metropolitana vigente, lo que implica no continuar ejerciendo el comercio en el espacio público prohibido");
    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filacabecera + 13), "o sin contar con el permiso/autorización municipal correspondiente, de acuerdo al Acta de Advertencia");
    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filacabecera + 14), "No. " . $rowdetalle['codigo'] . " de fecha " . $fechaFixRetiro . ". ");
    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filacabecera + 16), "Para constancia firman la presente acta el/la señor/a ".$rowdetalle['inspector']);
    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filacabecera + 17), "en calidad de funcionario de la Agencia Metropolitana de Control y el/la señor/a en calidad de ");
    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filacabecera + 18), "propietario/posesionario/tenedor de los productos antes indicados. ");
    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filacabecera + 22), "Entregue conforme:");
    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filacabecera + 23), "Nombre:");
    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filacabecera + 24), "CC/Pasaporte:");
    $objPHPExcel->getActiveSheet()->setCellValue('C' . ($filacabecera + 22), "Recibí conforme:");
    $objPHPExcel->getActiveSheet()->setCellValue('C' . ($filacabecera + 23), "Nombre:");
    $objPHPExcel->getActiveSheet()->setCellValue('C' . ($filacabecera + 24), "CC/Pasaporte:");



    $objPHPExcel->getActiveSheet()->getStyle('B15')->getAlignment()->setWrapText(true);

    //$objPHPExcel->getActiveSheet()->getStyle('B15')->getAlignment()->setWrapText(true);
    $objPHPExcel->getActiveSheet()->getStyle('A' . $filaInicio . ':D' . $filaInicio)->applyFromArray($styleArray);
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


$objPHPExcel->getActiveSheet()->getStyle('A1:A2')->applyFromArray(
    array(
        'alignment' => array(
            'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
        )
    )
);
$objPHPExcel->getActiveSheet()->getStyle('A4:A600')->applyFromArray(
    array(
        'alignment' => array(
            'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
        )
    )
);

$objPHPExcel->getActiveSheet()->getStyle('A4:A200')->applyFromArray(
    array(
        'alignment' => array(
            'vertical' => PHPExcel_Style_Alignment::VERTICAL_TOP,
        )
    )
);

$objPHPExcel->getActiveSheet()->getStyle('A4:W100')->getAlignment()->setWrapText(true);


$objPHPExcel->getActiveSheet()->getStyle('A' . $filacabecera . ':D' . ($filacabecera+3))->applyFromArray($styleArray);
$objPHPExcel->getActiveSheet()->getStyle('A' . ($filacabecera + 5) . ':D' . ($filacabecera + 8))->applyFromArray($styleArray);

$objPHPExcel->getActiveSheet()->getStyle('A10:D12')->getBorders()->getLeft()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);


// Set page orientation and size
//echo date('H:i:s') , " Set page orientation and size" , PHP_EOL;
$objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_PORTRAIT);
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);


//$objPHPExcel->getActiveSheet()->getStyle('A1:C10')->getFont()->setSize(14);
//$objPHPExcel->getActiveSheet()->getStyle('A15:C15')->getFont()->setSize(14);
$objPHPExcel->getActiveSheet()->getStyle('A1:D100')->getFont()->setSize(14);
//$objPHPExcel->getActiveSheet()->getStyle('C11:C14')->getFont()->setSize(11);


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
header('Content-Disposition: attachment;filename="Bodega-ActaDevolucion-MATIS-' . $today . '.xls"');
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
        $sql = "SELECT *
            FROM amc_unidades WHERE id = " . $id_dato;
        $nombre = $os->db->conn->query($sql);
        $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
        return $rownombre['nombre_completo'];
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
    if (($id_dato != '') and (isset($id_dato))) {
        $sql = "SELECT a.id, CONCAT(a.first_name,' ',a.last_name) AS nombre FROM qo_members a
            WHERE $id_dato = a.id";
        $nombre = $os->db->conn->query($sql);
        $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
        return $rownombre['nombre'];
    } else
        return '';

}


