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
    exit;
}

$filaTitulo1 = 1;
$filaTitulo2 = 2;
$filaTitulo3 = 3;
$filacabecera = $filaTitulo3;
$anchoColumna = 16.5;

$dias = array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
$meses = array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");

// recuepro el listado de operativos en base al filtro
$os->db->conn->query("SET NAMES 'utf8'");
$sql = "SELECT * FROM amc_operativos WHERE id = $operativoId ";
$result = $os->db->conn->query($sql);
$operativo = $result->fetch(PDO::FETCH_ASSOC);

$objPHPExcel = new PHPExcel();
$objPHPExcel->setActiveSheetIndex(0);
orientacion('A1:F600', 'center');
//tamaños de texto pòr defecto
$objPHPExcel->getActiveSheet()->getStyle('A1:F3')->getFont()->setSize(13);
$objPHPExcel->getActiveSheet()->getStyle('A4:F100')->getFont()->setSize(10);


//definicion de estilos
$styleArray = array(
    'borders' => array(
        'allborders' => array(
            'style' => PHPExcel_Style_Border::BORDER_THIN
        )
    )
);

//declaracion de los titulos de la linea 1 2 3
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo1 . ':F' . $filaTitulo1);
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo2 . ':F' . $filaTitulo2);
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo3 . ':F' . $filaTitulo3);

$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo1, "MUNICIPIO DEL DISTRITO METROPOLITANO DE QUITO");
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo2, 'AGENCIA METROPOLITANA DE CONTROL');
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo3, "INFORME DE OPERATIVO DE CONTROL No. $operativoId");

textoSiguieteFila( "1. DATOS GENERALES DEL OPERATIVO", 'A', 'F', 'left');
textoSiguieteFila( regresaZonal($operativo['id_zonal']) . " - " . regresaUnidad($operativo['id_unidad']), 'A', 'F', 'center');

textoSiguieteFila("Zona: " . $operativo['zona'], 'A', 'B', 'center');
textoSiguieteFila("FECHA OPERATIVO: " . fechaLarga($operativo['fecha_inicio_planificacion']), 'C', 'D', 'center', false);
textoSiguieteFila("FECHA INFORME: " . $operativo['fecha_inicio_planificacion'], 'E', 'F', 'center', false);

textoSiguieteFila("Hora Inicio: " . $operativo['fecha_inicio_planificacion'], 'A', 'B', 'center');
textoSiguieteFila("Hora Fin: " . $operativo['fecha_fin_planificacion'], 'C', 'D', 'center', false);
textoSiguieteFila("FECHA INFORME: " . $operativo['fecha_inicio_planificacion'], 'E', 'F', 'center', false);

textoSiguieteFila("TIPO:" . regresaTipoOperativo($operativo['tipo_operativo']), 'A', 'F', 'center');

textoSiguieteFila("2. TIPO DE OPERATIVO (EJES TEMATICOS DE CONTROL)", 'A', 'F', 'left');
textoSiguieteFila("CONTROL ESPACIO PUBLICO", 'A', 'F', 'center');
textoSiguieteFila(tiposDeControl($operativo['id_tipo_control']), 'A', 'F', 'center');

textoSiguieteFila('3. PERSONAL PARTICIPANTE EN LOS OPERATIVOS ', 'A', 'F', 'left');

textoSiguieteFila("ENTIDAD" , 'A', 'B', 'center');
textoSiguieteFila("JEFE DE GRUPO"  , 'C', 'D', 'center', false);
textoSiguieteFila("No. Participantes", 'E', 'F', 'center', false);

// recuperamos los nombres de los usuarios
$sql = "SELECT (SELECT amc_entidades.nombre
                FROM amc_entidades 
                WHERE amc_entidades.id = b.id_entidad ) AS nombre, jefe_grupo, personas, asistencia  
        FROM amc_operativos_participantes b 
        WHERE id_operativo = '" . $operativo['id'] . "'";
$nombres = $os->db->conn->query($sql);
$nombresUsuarios = array();
while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
    textoSiguieteFila($nombreDetalle['nombre'] , 'A', 'B', 'center');
    textoSiguieteFila($nombreDetalle['jefe_grupo']  , 'C', 'D', 'center', false);
    textoSiguieteFila($nombreDetalle['personas'], 'E', 'F', 'center', false);
}

textoSiguieteFila('4. ACCIONES EJECUTADAS', 'A', 'F', 'left');

textoSiguieteFila("Nombre Adminstrado" , 'A', 'A' );
textoSiguieteFila("Ordenanza Metropolitana"  , 'B', 'B', 'center', false);
textoSiguieteFila("Dirección Establecimiento", 'C', 'C', 'center', false);
textoSiguieteFila("Hecho Constatado" , 'D', 'D', 'center', false);
textoSiguieteFila("Medida Adoptada"  , 'E', 'E', 'center', false);
textoSiguieteFila("Auto Inicio ", 'F', 'F', 'center', false);
$objPHPExcel->getActiveSheet()->getStyle('A'. $filacabecera.':F' . $filacabecera)->getFont()->setSize(9);




// recuperamos los nombres de los usuarios
$sql = "SELECT *
        FROM amc_operativos_informes b 
        WHERE id_operativo = '" . $operativo['id'] . "'";
$nombres = $os->db->conn->query($sql);
$nombresUsuarios = array();
while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
    // declarar tamaños de letra
    textoSiguieteFila($nombreDetalle['administrado'] , 'A', 'A', 'center');
    textoSiguieteFila(regresaOrdenanza($nombreDetalle['id_ordenanza']), 'B', 'B', 'center', false);
    textoSiguieteFila($nombreDetalle['direccion'], 'C', 'C', 'center', false);
    textoSiguieteFila($nombreDetalle['hecho']  , 'D', 'D', 'center', false);
    textoSiguieteFila($nombreDetalle['medida'], 'E', 'E', 'center', false);
    textoSiguieteFila($nombreDetalle['numero_auto_inicio']  , 'F', 'F', 'center', false);
    $objPHPExcel->getActiveSheet()->getStyle('A'. $filacabecera.':F' . $filacabecera)->getFont()->setSize(9);

}

textoSiguieteFila("5. OBSERVACIONES" , 'A', 'F', 'left' );

$calcularAlto = calculaAltoTexto ($operativo['observaciones']);
$objPHPExcel->getActiveSheet()->getRowDimension($filacabecera + 1)->setRowHeight($calcularAlto);

textoSiguieteFila( $operativo['observaciones'] , 'A', 'F', 'left' );

textoSiguieteFila("6. RESULTADOS" , 'A', 'F', 'left' );
textoSiguieteFila("PARROQUIAS INTERVENIDAS" , 'A', 'C', 'left' );
textoSiguieteFila("BARRIOS/SECTORES INTERVENIDOS" , 'D', 'F', 'left', false );

//determina cual es el mas alto
$calcularAlto1 = calculaAltoTexto ($operativo['parroquias']);
$calcularAlto2 = calculaAltoTexto ($operativo['barrios']);
$calcularAltoNuevo = ($calcularAlto1>$calcularAlto2) ? $calcularAlto1 : $calcularAlto2;
$objPHPExcel->getActiveSheet()->getRowDimension($filacabecera + 1)->setRowHeight($calcularAltoNuevo);

textoSiguieteFila($calcularAltoNuevo .'..'. $operativo['parroquias'] , 'A', 'C', 'left' );
textoSiguieteFila($operativo['barrios'] , 'D', 'F', 'left', false );

textoSiguieteFila("ESTABLECIMIENTOS" , 'A', 'F', 'left' );
textoSiguieteFila("ESTABLECIMIENTOS" , 'A', 'F', 'left' );
textoSiguieteFila("ESTABLECIMIENTOS" , 'A', 'F', 'left' );

textoSiguieteFila("LUAE ACTAS/AUTOS LEVANTADOS" , 'A', 'F', 'center' );
textoSiguieteFila("ORDENANZA 1" , 'A', 'F', 'center' );
textoSiguieteFila("ORDENANZA 2" , 'A', 'F', 'center' );
textoSiguieteFila("ORDENANZA 3" , 'A', 'F', 'center' );

function imagenSiguieteFila($texto = '', $inicio, $fin, $alineacion = 'center', $nuevaLinea = true)
{

    global $filacabecera, $objPHPExcel;
    if ($nuevaLinea) $filacabecera++;
    borde($inicio . $filacabecera . ':' . $fin . $filacabecera);

}

$objPHPExcel->getActiveSheet()->getRowDimension($filacabecera + 1)->setRowHeight(200);
$objDrawing = new PHPExcel_Worksheet_Drawing();
$objDrawing->setName('capu.jpg');
$objDrawing->setDescription('capu.jpg');
$objDrawing->setPath('../../../../imagenes/operativos/88-IMG_E7197.JPG');
$objDrawing->setCoordinates('A' . ($filacabecera + 1));
//setOffsetX works properly
$objDrawing->setOffsetX(1);
$objDrawing->setOffsetY(1);
//set width, height
//$objDrawing->setHeight(360);
$objDrawing->setWidth(350);
$objDrawing->setWorksheet($objPHPExcel->getActiveSheet());


// Elaborador por:
$filacabecera++;
$objPHPExcel->getActiveSheet()->mergeCells('A' . ($filacabecera) . ':B' . ($filacabecera));
$objPHPExcel->getActiveSheet()->mergeCells('A' . ($filacabecera + 1) . ':B' . ($filacabecera + 1));
$objPHPExcel->getActiveSheet()->mergeCells('A' . ($filacabecera + 2) . ':B' . ($filacabecera + 2));
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filacabecera, '__________________');

$objPHPExcel->getActiveSheet()->setCellValue('A' . ($filacabecera + 2), "Elaborado por");



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


$objPHPExcel->getActiveSheet()->getStyle('A4:F200')->applyFromArray(
    array(
        'alignment' => array(
            'vertical' => PHPExcel_Style_Alignment::VERTICAL_TOP,
        )
    )
);

$objPHPExcel->getActiveSheet()->getStyle('A4:F30')->getAlignment()->setWrapText(true);

// genera los cuadros
//$objPHPExcel->getActiveSheet()->getStyle('A' . $filacabecera . ':F' . $filacabecera)->applyFromArray($styleArray);

// Set page orientation and size
$objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_DEFAULT);
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);



$pageMargins = $objPHPExcel->getActiveSheet()->getPageMargins();

// margin is set in inches (0.5cm)
$margin = 0.5 / 2.54;

$pageMargins->setTop($margin);
$pageMargins->setBottom($margin);
$pageMargins->setLeft($margin);
$pageMargins->setRight($margin);


$objPHPExcel->getActiveSheet()->setShowGridLines(false);


////////////////////////////////////////////////
// se crea la cabecera de archivo y se lo graba al archivo

// se crea la cabecera de archivo y se lo graba al archivo
header('Content-Type: application/xlsx');
header('Content-Disposition: attachment;filename="Operativo-AMC-' . $operativoId . '-' . $today . '.xlsx"');
header('Cache-Control: max-age=0');
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
$objWriter->save('php://output');
exit;


function regresaTipoOperativo($id_dato)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_operativos_tipos WHERE id = " . $id_dato;
    $nombre = $os->db->conn->query($sql);
    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['nombre'];

}


function tiposDeControl($id_dato)
{
    $porciones = explode(",", $id_dato);
    $cadena = array();
    foreach ($porciones as &$valor) {
        $cadena[] = regresaOrdenanza($valor);
    }
    return implode(", ", $cadena);
}

function regresaOrdenanza($id_dato)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT nombre FROM amc_ordenanzas WHERE id = " . $id_dato;
    $nombre = $os->db->conn->query($sql);
    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['nombre'];
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

function regresaUnidad($id_dato)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT *
            FROM amc_unidades WHERE id = " . $id_dato;
    $nombre = $os->db->conn->query($sql);
    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['nombre_completo'];
}

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

function fechaLarga($fecha)
{
    global $dias, $meses;
    $date = new DateTime($fecha);
    return $dias[$date->format('w')] . " " . $date->format('d') . " de " . $meses[$date->format('m') - 1] . " del " . $date->format('Y');

}

function unirycuadro($espacio)
{
    global $objPHPExcel, $styleArray;
    $objPHPExcel->getActiveSheet()->mergeCells($espacio);
}
function borde($espacio)
{
    global $objPHPExcel, $styleArray;
    $objPHPExcel->getActiveSheet()->getStyle($espacio)->applyFromArray($styleArray);
}

function orientacion($rango, $tipo = 'center')
{
    global $objPHPExcel;
    $objPHPExcel->getActiveSheet()->getStyle($rango)->applyFromArray(
        array(
            'alignment' => array(
                'horizontal' => $tipo,
            )
        )
    );
}

function textoSiguieteFila($texto = '', $inicio, $fin, $alineacion = 'center', $nuevaLinea = true)
{

    global $filacabecera, $objPHPExcel;
    if ($nuevaLinea) $filacabecera++;
    if ($inicio != $fin) unirycuadro($inicio . $filacabecera . ':' . $fin . $filacabecera);
    borde($inicio . $filacabecera . ':' . $fin . $filacabecera);
    orientacion($inicio . $filacabecera . ':' . $fin . $filacabecera, $alineacion);
    $objPHPExcel->getActiveSheet()->setCellValue($inicio . $filacabecera, $texto);
}
function calculaAltoTexto ($texto){
    global $anchoColumna;
    $exp = explode("\n", $texto);
    $lineas = count($exp);
    $countTexto =  strlen($texto);
    // formula medio compleja

    $resultado = ($countTexto/ ($anchoColumna * 6)) * 6  + 14 * $lineas  ;
    return $resultado;
}
