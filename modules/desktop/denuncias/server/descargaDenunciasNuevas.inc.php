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
if (isset($_GET['unidad'])) {
    $unidad = $_GET['unidad'];
} else {
    $newIdGuia = $_GET['guia'];
    $os->db->conn->query("SET NAMES 'utf8'");
    $nombre = $os->db->conn->query("SELECT id_unidad, SUBSTRING(numero,10) as num FROM amc_guias WHERE id = $newIdGuia");
    $rowguia = $nombre->fetch(PDO::FETCH_ASSOC);
    $unidad = $rowguia['id_unidad'];
    $numeroGuia = $rowguia['num'];
}

if (isset($_GET['reimpresion']))
    $reimpresion = settype($_GET['reimpresion'], 'boolean');
else
    $reimpresion = false;

//get nombre corto unidad
$os->db->conn->query("SET NAMES 'utf8'");
$sql = "SELECT nombre_completo FROM amc_unidades WHERE id = $unidad";
$resultguia = $os->db->conn->query($sql);

$nombreUnidad = '';
if ($resultguia) {
    $row = $resultguia->fetch(PDO::FETCH_ASSOC);
    if ($row) {
        $nombreUnidad = $row['nombre_completo'];
    }
}


$today = date("Y-n-j-H-i");
////////////////

$os->db->conn->query("SET NAMES 'utf8'");
if ($reimpresion)
    $sql = "SELECT id, codigo_tramite, 
        recepcion_documento,
        id_tipo_documento,
        num_documento,
        remitente,
        asunto,
        descripcion_anexos,
        gdoc,
        id_caracter_tramite,
        cantidad_fojas,
        observacion_secretaria 
        FROM amc_denuncias 
        WHERE guia = $newIdGuia 
        ORDER BY codigo_tramite";
else
    $sql = "SELECT id, codigo_tramite, 
        recepcion_documento,
        id_tipo_documento,
        num_documento,
        remitente,
        asunto,
        descripcion_anexos,
        gdoc,
        id_caracter_tramite,
        cantidad_fojas,
        observacion_secretaria 
        FROM amc_denuncias 
        WHERE $unidad like reasignacion AND  despacho_secretaria <> 'true'  AND id_zonal_origen = " . $os->get_zonal_id () ." AND id_unidad_origen = " . $os->get_unidad_id () ."
        ORDER BY codigo_tramite";

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

$nombreUnidad = getNombreUnidadLargo($unidad);


//get numero de guia
$numeroGuia = get_numero_guia($reimpresion, $os->get_unidad_id());


//$nombreUnidad
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo1 . ':K' . $filaTitulo1);
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo2 . ':K' . $filaTitulo2);

if ($number_of_rows > 0) {
    $newIdGuia = 'Vacio';
    //insert  numero de guia
    $os->db->conn->query("SET NAMES 'utf8'");

    $idUsuario = $os->get_member_id();
    $idzonalorigen = $os->get_zonal_id();
    $idUnidadOrigen = $os->get_unidad_id();

    if (!$reimpresion) {
        $sql = "INSERT INTO amc_guias (numero, unidad, id_member, id_unidad, id_zonal, id_unidad_origen) VALUES ('$numeroGuia', '$nombreUnidad', '$idUsuario', '$unidad', '$idzonalorigen', '$idUnidadOrigen')";
        $resultguia = $os->db->conn->query($sql);
        $newIdGuia = $os->db->conn->lastInsertId();
    }

    $objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo1, "GUIA DE DESPACHO N. $numeroGuia");
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
$objPHPExcel->getActiveSheet()->setCellValue('C' . ($filascabecera + 2), "SECRETARIA");

$objPHPExcel->getActiveSheet()->mergeCells('F' . ($filascabecera + 1) . ':I' . ($filascabecera + 2));
$objPHPExcel->getActiveSheet()->setCellValue('F' . ($filascabecera + 1), $nombreUnidad);
$objPHPExcel->getActiveSheet()->mergeCells('F' . $filascabecera . ':I' . $filascabecera);
$objPHPExcel->getActiveSheet()->setCellValue('F' . $filascabecera, '__________________');

$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('A')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(3);

$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('B')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(6.86);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('C')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(12);
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
$objPHPExcel->getActiveSheet()->getColumnDimension('J')->setWidth(15);

$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('K')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('K')->setWidth(15);


$objPHPExcel->getActiveSheet()->setCellValue('A' . $filacabecera, '#');
$objPHPExcel->getActiveSheet()->setCellValue('B' . $filacabecera, 'Trámite');
$objPHPExcel->getActiveSheet()->setCellValue('C' . $filacabecera, 'Fecha y hora recepcion');
$objPHPExcel->getActiveSheet()->setCellValue('D' . $filacabecera, 'N. de documento');
$objPHPExcel->getActiveSheet()->setCellValue('E' . $filacabecera, 'Remitente');
$objPHPExcel->getActiveSheet()->setCellValue('F' . $filacabecera, 'Asunto');
$objPHPExcel->getActiveSheet()->setCellValue('G' . $filacabecera, 'Descripción anexo/ GDOC ');
$objPHPExcel->getActiveSheet()->setCellValue('H' . $filacabecera, 'Carácter de trámite');
$objPHPExcel->getActiveSheet()->setCellValue('I' . $filacabecera, 'Cantidad fojas');
$objPHPExcel->getActiveSheet()->setCellValue('J' . $filacabecera, 'Observaciones');
$objPHPExcel->getActiveSheet()->setCellValue('K' . $filacabecera, 'Recibe');

$noExistenFilas = true;
$i = 0;
while ($rowdetalle = $result->fetch(PDO::FETCH_ASSOC)) {
// actualizar detalle idGuia
    $i++;
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

    $objPHPExcel->getActiveSheet()->setCellValue('A' . $filaInicio, $i);
    $objPHPExcel->getActiveSheet()->setCellValue('B' . $filaInicio, $rowdetalle['codigo_tramite']);
    $objPHPExcel->getActiveSheet()->setCellValue('C' . $filaInicio, $rowdetalle['recepcion_documento']);
    $objPHPExcel->getActiveSheet()->setCellValue('D' . $filaInicio, $rowdetalle['num_documento']);
    $objPHPExcel->getActiveSheet()->setCellValue('E' . $filaInicio, $rowdetalle['remitente']);
    $objPHPExcel->getActiveSheet()->setCellValue('F' . $filaInicio, substr($rowdetalle['asunto'], 0, 200));
    $objPHPExcel->getActiveSheet()->setCellValue('G' . $filaInicio, strip_tags($rowdetalle['descripcion_anexos']). ' - ' . strip_tags($rowdetalle['gdoc']));
    $objPHPExcel->getActiveSheet()->setCellValue('H' . $filaInicio, $rowdetalle['id_caracter_tramite']);
    $objPHPExcel->getActiveSheet()->setCellValue('I' . $filaInicio, $rowdetalle['cantidad_fojas']);
    $objPHPExcel->getActiveSheet()->setCellValue('J' . $filaInicio, $rowdetalle['observacion_secretaria']);

    $objPHPExcel->getActiveSheet()->setCellValue('K' . $filaInicio, ' ');
    //$objPHPExcel->getActiveSheet()->setCellValue('J' . $filaInicio, $rowdetalle['id_tipo_documento']);

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


$objPHPExcel->getActiveSheet()->getStyle('A1:K100')->applyFromArray(
    array(
        'alignment' => array(
            'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
        )
    )
);

$objPHPExcel->getActiveSheet()->getStyle('A4:K30')->applyFromArray(
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

////////////////
if ($number_of_rows == 0) {
    $nombreUnidad = '';
    $today = '';
    $year = '';
}

$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment;filename="guia-' . $numeroGuia . '-' . $today . '.xls"');
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


function get_numero_guia($reimpresion, $id_unidad_origen)
{
    global $os;

    $year = date("Y");


    $siglasUnidad = $os->get_unidad_siglas();

    // valor por defecto
    $numeroGuia = "$siglasUnidad-$year-1";
    if (!$reimpresion) {
        $sql = "SELECT numero AS numeroguia, SUBSTRING(numero,5,4) as a, SUBSTRING(numero,10) as num FROM amc_guias WHERE  YEAR(creado) = YEAR(CURDATE()) AND id_unidad_origen = $id_unidad_origen  ORDER BY a DESC, cast(num as unsigned) DESC  LIMIT 1";
        $resultguia = $os->db->conn->query($sql);
        $row = $resultguia->fetch(PDO::FETCH_ASSOC);

        $numeroGuia = $row['numeroguia'];
        $numeroGuia = str_replace("$siglasUnidad-$year-", "", $numeroGuia);
        $numeroGuia = $numeroGuia + 1;
        $numeroGuia = "$siglasUnidad-$year-" . $numeroGuia ;
    } else {
        if (isset($_GET['guia'])) {
            $codigoGuia = $_GET['guia'];
        } else
            $codigoGuia = '';
        $sql = "SELECT numero FROM amc_guias WHERE id = $codigoGuia";
        $resultado = $os->db->conn->query($sql);
        if ($resultado) {
            $row = $resultado->fetch(PDO::FETCH_ASSOC);
            if ($row) {
                $numeroGuia = $row['numero'];
            }
        }
    }
    return $numeroGuia;
}

function getNombreUnidadLargo($unidad)
{
    global $os;
//get nombre largo unidad
    $nombreUnidad = '';
    $year = date("Y");
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT nombre_completo FROM amc_unidades WHERE id = $unidad";
    $resultguia = $os->db->conn->query($sql);
    if ($resultguia) {
        $row = $resultguia->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            $nombreUnidad = $row['nombre_completo'];
        }
    }
    return $nombreUnidad;
}