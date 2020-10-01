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
require_once '../../modules/common/Classes/PHPExcel.php';
require_once '../../server/os.php';


$os = new os();
$today = date("Y-n-j-H-i-s");

// se guarda quien descarga
$idmember = $os->get_member_id();
$nombreMember = regresaNombre($idmember);
$sql = "INSERT INTO amc_sancion_emergencia_log (idusuario, usuario, text) VALUES ('$idmember', '$nombreMember', 'descarga');";
$sql = $os->db->conn->prepare($sql);
$sql->execute();


$filaTitulo1 = 1;
$filaTitulo2 = 2;
$filaTitulo3 = 3;
$filacabecera = $filaTitulo3;
$anchoColumna = 16.5;

$dias = array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
$meses = array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");

// recuepro el listado de operativos en base al filtro
//fecha_informe($operativoId);

$objPHPExcel = new PHPExcel();
$objPHPExcel->setActiveSheetIndex(0)->setTitle("Toda Información");;
orientacion('A1:Q600', 'center');
//tamaños de texto pòr defecto
$objPHPExcel->getActiveSheet()->getStyle('A1:AE3')->getFont()->setSize(12);
$objPHPExcel->getActiveSheet()->getStyle('A4:AE500')->getFont()->setSize(10);


//definicion de estilos
$styleArray = array(
    'borders' => array(
        'allborders' => array(
            'style' => PHPExcel_Style_Border::BORDER_THIN
        )
    )
);





//declaracion de los titulos de la linea 1 2 3
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo1 . ':J' . $filaTitulo1);
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo2 . ':J' . $filaTitulo2);
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo3 . ':J' . $filaTitulo3);

$objPHPExcel->getActiveSheet()->getStyle('A1:A3')->getFont()->setBold(true);
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo1, "MUNICIPIO DEL DISTRITO METROPOLITANO DE QUITO");
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo2, 'AGENCIA METROPOLITANA DE CONTROL');
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo3, "LISTADO SANCIONES EMERGENCIA COVID 19");

// id	cedula	nombres	apellidos	observaciones	lugarinfraccion	funcionario	zonal	fecha


textoSiguieteFila("No.", 'A', 'A', 'center', true, "B");
textoSiguieteFila("CEDULA DE IDENTIDAD", 'B', 'B', 'center', false, "B");
textoSiguieteFila("NOMBRES", 'C', 'C', 'center', false, "B");
textoSiguieteFila("APELLIDOS", 'D', 'D', 'center', false, "B");
textoSiguieteFila("OBSERVACIONES", 'E', 'E', 'center', false, "B");
textoSiguieteFila("LUGAR INFRACCION", 'F', 'F', 'center', false, "B");
textoSiguieteFila("FUNCIONARIO", 'G', 'G', 'center', false, "B");
textoSiguieteFila("ZONAL", 'H', 'H', 'center', false, "B");
textoSiguieteFila("FECHA INFRACCION", 'I', 'I', 'center', false, "B");
textoSiguieteFila("FECHA REGISTRO", 'J', 'J', 'center', false, "B");
textoSiguieteFila("FUNCIONARIO REALIZA REGISTRO", 'K', 'K', 'center', false, "B");
textoSiguieteFila("NUMERO DE ACTO", 'L', 'L', 'center', false, "B");


// recuperamos los nombres de los usuarios

// id	cedula	nombres	apellidos	observaciones	lugarinfraccion	funcionario	zonal	fecha


$numero = 1;
$sql = "

SELECT * FROM amc_sancion_emergencia ORDER BY id";
$nombres = $os->db->conn->query($sql);
while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
    textoSiguieteFila($numero, 'A', 'A', 'center');
    $numero++;
    textoSiguieteFila($nombreDetalle['cedula'], 'B', 'B', 'left', false);
    textoSiguieteFila($nombreDetalle['nombres'], 'C', 'C', 'center', false);
    textoSiguieteFila($nombreDetalle['apellidos'], 'D', 'D', 'left', false);
    textoSiguieteFila($nombreDetalle['observaciones'], 'E', 'E', 'left', false);
    textoSiguieteFila($nombreDetalle['lugarinfraccion'], 'F', 'F', 'center', false);
    textoSiguieteFila(regresaNombre ($nombreDetalle['funcionario']), 'G', 'G', 'left', false);
    textoSiguieteFila($nombreDetalle['zonal'], 'H', 'H', 'left', false);
    textoSiguieteFila($nombreDetalle['fecha'], 'I', 'I', 'center', false);
    textoSiguieteFila($nombreDetalle['fecha_creacion'], 'J', 'J', 'center', false);
    textoSiguieteFila(regresaNombre ($nombreDetalle['idingreso']), 'K', 'K', 'center', false);
    textoSiguieteFila($nombreDetalle['actainfraccion'], 'L', 'L', 'center', false);
}


//borde("A" . $primeraFilaImage . ':' . 'F' . $filacabecera);
// Elaborador por:
$textoElaboradoPor = "
Atentamente

__________________________
";

textoSiguieteFila($textoElaboradoPor, 'A', 'F', 'left');

$filacabecera++;
//UBICACION DEL LOGO
$objDrawing = new PHPExcel_Worksheet_Drawing();
$objDrawing->setPath('../imagenes/image2.png');
$objDrawing->setCoordinates("A" . ($filacabecera));
//setOffsetX works properly
$objDrawing->setOffsetX(0);
$objDrawing->setOffsetY(0);
$objDrawing->setWidth(686);
$objDrawing->setWorksheet($objPHPExcel->getActiveSheet());


$objDrawing = new PHPExcel_Worksheet_Drawing();
$objDrawing->setPath('../imagenes/image1.png');
$objDrawing->setCoordinates("P1");
//setOffsetX works properly
$objDrawing->setOffsetX(10);
$objDrawing->setOffsetY(0);
$objDrawing->setWidth(100);
$objDrawing->setWorksheet($objPHPExcel->getActiveSheet());
//FIN UBICACION DEL LOGO

// Ancho de las columnas
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('A')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(6);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('B')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(12);

$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('C')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(22);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('D')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(22);

$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('E')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(48);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('F')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(30);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('G')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth(36);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('H')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('H')->setWidth(16);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('I')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('I')->setWidth(26);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('J')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('J')->setWidth(26);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('K')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('K')->setWidth(36);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('L')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('L')->setWidth(16);


$styleThinBlackBorderOutline = array(
    'borders' => array(
        'outline' => array(
            'style' => PHPExcel_Style_Border::BORDER_THIN,
            'color' => array('argb' => '00000000'),
        ),
    ),
);


$objPHPExcel->getActiveSheet()->getStyle('A4:Q300')->getAlignment()->setWrapText(true);

// Set document properties
//echo date('H:i:s') , " Set document properties" , PHP_EOL;
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


/// segunda pagina
///
///

$filaTitulo1 = 1;
$filaTitulo2 = 2;
$filaTitulo3 = 3;
$filacabecera = $filaTitulo3;
$anchoColumna = 16.5;

$objWorkSheet = $objPHPExcel->createSheet(1); //Setting index when creating


$objPHPExcel->setActiveSheetIndex(1)->setTitle("Totales Fechas");
orientacion('A1:Q600', 'center');
//tamaños de texto pòr defecto
$objPHPExcel->getActiveSheet()->getStyle('A1:AE3')->getFont()->setSize(12);
$objPHPExcel->getActiveSheet()->getStyle('A4:AE500')->getFont()->setSize(10);


//definicion de estilos
$styleArray = array(
    'borders' => array(
        'allborders' => array(
            'style' => PHPExcel_Style_Border::BORDER_THIN
        )
    )
);


//declaracion de los titulos de la linea 1 2 3
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo1 . ':J' . $filaTitulo1);
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo2 . ':J' . $filaTitulo2);
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo3 . ':J' . $filaTitulo3);

$objPHPExcel->getActiveSheet()->getStyle('A1:A3')->getFont()->setBold(true);
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo1, "MUNICIPIO DEL DISTRITO METROPOLITANO DE QUITO");
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo2, 'AGENCIA METROPOLITANA DE CONTROL');
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo3, "LISTADO SANCIONES EMERGENCIA COVID 19 POR FECHA");

// id	cedula	nombres	apellidos	observaciones	lugarinfraccion	funcionario	zonal	fecha


textoSiguieteFila("No.", 'A', 'A', 'center', true, "B");
textoSiguieteFila("DIA", 'B', 'B', 'center', false, "B");
textoSiguieteFila("Total", 'C', 'C', 'center', false, "B");
textoSiguieteFila("", 'D', 'D', 'center', false, "B");


// recuperamos los nombres de los usuarios

// id	cedula	nombres	apellidos	observaciones	lugarinfraccion	funcionario	zonal	fecha


$numero = 1;
$sql = "SELECT COUNT( id ) valor, DATE_FORMAT( fecha, '%Y-%m-%d' ) texto FROM amc_sancion_emergencia GROUP BY DATE_FORMAT( fecha, '%Y%m%d')";
$nombres = $os->db->conn->query($sql);
$totales = 0;
while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
    textoSiguieteFila($numero, 'A', 'A', 'center');
    $numero++;
    textoSiguieteFila($nombreDetalle['texto'], 'B', 'B', 'left', false);
    textoSiguieteFila($nombreDetalle['valor'], 'C', 'C', 'center', false);
    textoSiguieteFila(' ', 'D', 'D', 'left', false);
    $totales = $totales + $nombreDetalle['valor'];
  }
textoSiguieteFila('TOTAL ', 'A', 'B', 'left');
textoSiguieteFila($totales,'C', 'D', 'center', false);

//borde("A" . $primeraFilaImage . ':' . 'F' . $filacabecera);
// Elaborador por:
$textoElaboradoPor = "
Atentamente

__________________________
";

textoSiguieteFila($textoElaboradoPor, 'A', 'F', 'left');

$filacabecera++;
//UBICACION DEL LOGO
$objDrawing = new PHPExcel_Worksheet_Drawing();
$objDrawing->setPath('../imagenes/image2.png');
$objDrawing->setCoordinates("A" . ($filacabecera));
//setOffsetX works properly
$objDrawing->setOffsetX(0);
$objDrawing->setOffsetY(0);
$objDrawing->setWidth(686);
$objDrawing->setWorksheet($objPHPExcel->getActiveSheet());


$objDrawing = new PHPExcel_Worksheet_Drawing();
$objDrawing->setPath('../imagenes/image1.png');
$objDrawing->setCoordinates("P1");
//setOffsetX works properly
$objDrawing->setOffsetX(10);
$objDrawing->setOffsetY(0);
$objDrawing->setWidth(100);
$objDrawing->setWorksheet($objPHPExcel->getActiveSheet());
//FIN UBICACION DEL LOGO

// Ancho de las columnas
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('A')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(6);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('B')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(12);

$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('C')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(22);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('D')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(22);



$styleThinBlackBorderOutline = array(
    'borders' => array(
        'outline' => array(
            'style' => PHPExcel_Style_Border::BORDER_THIN,
            'color' => array('argb' => '00000000'),
        ),
    ),
);


$objPHPExcel->getActiveSheet()->getStyle('A4:Q300')->getAlignment()->setWrapText(true);

// Set document properties
//echo date('H:i:s') , " Set document properties" , PHP_EOL;
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



//// tercera
///
///


$filaTitulo1 = 1;
$filaTitulo2 = 2;
$filaTitulo3 = 3;
$filacabecera = $filaTitulo3;
$anchoColumna = 16.5;

$objWorkSheet = $objPHPExcel->createSheet(2); //Setting index when creating


$objPHPExcel->setActiveSheetIndex(2)->setTitle("Totales Zonales");
orientacion('A1:Q600', 'center');
//tamaños de texto pòr defecto
$objPHPExcel->getActiveSheet()->getStyle('A1:AE3')->getFont()->setSize(12);
$objPHPExcel->getActiveSheet()->getStyle('A4:AE500')->getFont()->setSize(10);


//definicion de estilos
$styleArray = array(
    'borders' => array(
        'allborders' => array(
            'style' => PHPExcel_Style_Border::BORDER_THIN
        )
    )
);

//declaracion de los titulos de la linea 1 2 3
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo1 . ':J' . $filaTitulo1);
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo2 . ':J' . $filaTitulo2);
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo3 . ':J' . $filaTitulo3);

$objPHPExcel->getActiveSheet()->getStyle('A1:A3')->getFont()->setBold(true);
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo1, "MUNICIPIO DEL DISTRITO METROPOLITANO DE QUITO");
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo2, 'AGENCIA METROPOLITANA DE CONTROL');
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo3, "LISTADO SANCIONES EMERGENCIA COVID 19 POR ZONAL");

// id	cedula	nombres	apellidos	observaciones	lugarinfraccion	funcionario	zonal	fecha


textoSiguieteFila("No.", 'A', 'A', 'center', true, "B");
textoSiguieteFila("Zonal", 'B', 'B', 'center', false, "B");
textoSiguieteFila("Total", 'C', 'C', 'center', false, "B");
textoSiguieteFila("", 'D', 'D', 'center', false, "B");


// recuperamos los nombres de los usuarios

// id	cedula	nombres	apellidos	observaciones	lugarinfraccion	funcionario	zonal	fecha


$numero = 1;
$sql = "SELECT COUNT( id ) valor, zonal  texto FROM amc_sancion_emergencia GROUP BY zonal";
$nombres = $os->db->conn->query($sql);
$totales = 0;
while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
    textoSiguieteFila($numero, 'A', 'A', 'center');
    $numero++;
    textoSiguieteFila($nombreDetalle['texto'], 'B', 'B', 'left', false);
    textoSiguieteFila($nombreDetalle['valor'], 'C', 'C', 'center', false);
    textoSiguieteFila(' ', 'D', 'D', 'left', false);
    $totales = $totales + $nombreDetalle['valor'];
}
textoSiguieteFila('TOTAL ', 'A', 'B', 'left');
textoSiguieteFila($totales, 'C', 'D', 'center', false);

//borde("A" . $primeraFilaImage . ':' . 'F' . $filacabecera);
// Elaborador por:
$textoElaboradoPor = "
Atentamente

__________________________
";

textoSiguieteFila($textoElaboradoPor, 'A', 'F', 'left');

$filacabecera++;
//UBICACION DEL LOGO
$objDrawing = new PHPExcel_Worksheet_Drawing();
$objDrawing->setPath('../imagenes/image2.png');
$objDrawing->setCoordinates("A" . ($filacabecera));
//setOffsetX works properly
$objDrawing->setOffsetX(0);
$objDrawing->setOffsetY(0);
$objDrawing->setWidth(686);
$objDrawing->setWorksheet($objPHPExcel->getActiveSheet());


$objDrawing = new PHPExcel_Worksheet_Drawing();
$objDrawing->setPath('../imagenes/image1.png');
$objDrawing->setCoordinates("P1");
//setOffsetX works properly
$objDrawing->setOffsetX(10);
$objDrawing->setOffsetY(0);
$objDrawing->setWidth(100);
$objDrawing->setWorksheet($objPHPExcel->getActiveSheet());
//FIN UBICACION DEL LOGO

// Ancho de las columnas
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('A')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(6);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('B')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(40);

$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('C')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(22);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('D')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(22);



$styleThinBlackBorderOutline = array(
    'borders' => array(
        'outline' => array(
            'style' => PHPExcel_Style_Border::BORDER_THIN,
            'color' => array('argb' => '00000000'),
        ),
    ),
);


$objPHPExcel->getActiveSheet()->getStyle('A4:Q300')->getAlignment()->setWrapText(true);

// Set document properties
//echo date('H:i:s') , " Set document properties" , PHP_EOL;
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

/// cuarto
///
///
///


$filaTitulo1 = 1;
$filaTitulo2 = 2;
$filaTitulo3 = 3;
$filacabecera = $filaTitulo3;
$anchoColumna = 16.5;

$objWorkSheet = $objPHPExcel->createSheet(3); //Setting index when creating


$objPHPExcel->setActiveSheetIndex(3)->setTitle("Totales Dirección");
orientacion('A1:Q600', 'center');
//tamaños de texto pòr defecto
$objPHPExcel->getActiveSheet()->getStyle('A1:AE3')->getFont()->setSize(12);
$objPHPExcel->getActiveSheet()->getStyle('A4:AE500')->getFont()->setSize(10);


//definicion de estilos
$styleArray = array(
    'borders' => array(
        'allborders' => array(
            'style' => PHPExcel_Style_Border::BORDER_THIN
        )
    )
);





//declaracion de los titulos de la linea 1 2 3
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo1 . ':J' . $filaTitulo1);
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo2 . ':J' . $filaTitulo2);
$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo3 . ':J' . $filaTitulo3);

$objPHPExcel->getActiveSheet()->getStyle('A1:A3')->getFont()->setBold(true);
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo1, "MUNICIPIO DEL DISTRITO METROPOLITANO DE QUITO");
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo2, 'AGENCIA METROPOLITANA DE CONTROL');
$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo3, "LISTADO SANCIONES EMERGENCIA COVID 19 POR DIRECCION");

// id	cedula	nombres	apellidos	observaciones	lugarinfraccion	funcionario	zonal	fecha


textoSiguieteFila("No.", 'A', 'A', 'center', true, "B");
textoSiguieteFila("DIRECCION", 'B', 'B', 'center', false, "B");
textoSiguieteFila("Total", 'C', 'C', 'center', false, "B");
textoSiguieteFila("", 'D', 'D', 'center', false, "B");


// recuperamos los nombres de los usuarios

// id	cedula	nombres	apellidos	observaciones	lugarinfraccion	funcionario	zonal	fecha


$numero = 1;
$sql = "SELECT (SELECT direccion FROM amc_personal_distributivo WHERE apellidos = (SELECT last_name  FROM qo_members WHERE qo_members.id = funcionario) limit 1)  texto,
COUNT(*) AS valor FROM amc_sancion_emergencia GROUP BY texto";
$nombres = $os->db->conn->query($sql);
$totales = 0;
while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
    textoSiguieteFila($numero, 'A', 'A', 'center');
    $numero++;
    textoSiguieteFila($nombreDetalle['texto'], 'B', 'B', 'left', false);
    textoSiguieteFila($nombreDetalle['valor'], 'C', 'C', 'center', false);
    textoSiguieteFila(' ', 'D', 'D', 'left', false);
    $totales = $totales + $nombreDetalle['valor'];
}
textoSiguieteFila('TOTAL ', 'A', 'B', 'left');
textoSiguieteFila($totales, 'C', 'D', 'center', false);


//borde("A" . $primeraFilaImage . ':' . 'F' . $filacabecera);
// Elaborador por:
$textoElaboradoPor = "
Atentamente

__________________________
";

textoSiguieteFila($textoElaboradoPor, 'A', 'F', 'left');

$filacabecera++;
//UBICACION DEL LOGO
$objDrawing = new PHPExcel_Worksheet_Drawing();
$objDrawing->setPath('../imagenes/image2.png');
$objDrawing->setCoordinates("A" . ($filacabecera));
//setOffsetX works properly
$objDrawing->setOffsetX(0);
$objDrawing->setOffsetY(0);
$objDrawing->setWidth(686);
$objDrawing->setWorksheet($objPHPExcel->getActiveSheet());


$objDrawing = new PHPExcel_Worksheet_Drawing();
$objDrawing->setPath('../imagenes/image1.png');
$objDrawing->setCoordinates("P1");
//setOffsetX works properly
$objDrawing->setOffsetX(10);
$objDrawing->setOffsetY(0);
$objDrawing->setWidth(100);
$objDrawing->setWorksheet($objPHPExcel->getActiveSheet());
//FIN UBICACION DEL LOGO

// Ancho de las columnas
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('A')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(6);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('B')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(50);

$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('C')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(22);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('D')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(22);



$styleThinBlackBorderOutline = array(
    'borders' => array(
        'outline' => array(
            'style' => PHPExcel_Style_Border::BORDER_THIN,
            'color' => array('argb' => '00000000'),
        ),
    ),
);


$objPHPExcel->getActiveSheet()->getStyle('A4:Q300')->getAlignment()->setWrapText(true);

// Set document properties
//echo date('H:i:s') , " Set document properties" , PHP_EOL;
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




$objPHPExcel->getProperties()->setCreator("Byron Herrera")
    ->setLastModifiedBy("Byron Herrera")
    ->setTitle("AMC reporte")
    ->setSubject("")
    ->setDescription("AMC reporte, generated using PHP classes.")
    ->setKeywords("AMC reporte")
    ->setCategory("Archivo");

////////////////////////////////////////////////
// se crea la cabecera de archivo y se lo graba al archivo

//// se crea la cabecera de archivo y se lo graba al archivo
//header('Content-Type: application/xlsx');
//header('Content-Disposition: attachment;filename="Operativo-AMC-' . '-' . $today . '.xlsx"');
//header('Cache-Control: max-age=0');
//$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
//$objWriter->save('php://output');
//exit;

// se crea la cabecera de archivo y se lo graba al archivo
//  todo arrek
$t = 1 ;
if ($t== 1 ) {
    header('Content-Type: application/vnd.ms-excel');
    header('Content-Disposition: attachment;filename="Reporte-Sancion-Emergencia-AMC-' . '-' . $today . '.xls"');
    header('Cache-Control: max-age=0');
    $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
    $objWriter->save('php://output');
    exit;
}



function regresaTipoOperativo($id_dato)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_personal_distributivo_tipos WHERE id = '" . $id_dato . "'";
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

    if ($id_dato == '')
        return "";
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT CONCAT(qo_members.first_name, ' ', qo_members.last_name) AS nombre
            FROM qo_members WHERE id = " . $id_dato;

//    echo $sql;
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
function regresaGenero($id_dato)
{
    if ($id_dato == 1)
        return "M";
    if ($id_dato == 2)
        return "F";
    return '';

}

function regresaUnidad($id_dato)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT *
            FROM amc_unidades_personal WHERE id = " . $id_dato;
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
    $sql = "SELECT fecha_inicio_planificacion FROM amc_personal_distributivo as b  $where  ORDER BY b.fecha_inicio_planificacion  LIMIT 1 ";
    $nombre = $os->db->conn->query($sql);
    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['fecha_inicio_planificacion'];
}

function fechaFinSQL($where)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT fecha_fin_planificacion FROM amc_personal_distributivo as b  $where  ORDER BY b.fecha_fin_planificacion DESC LIMIT 1 ";
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

function textoSiguieteFila($texto = '', $inicio, $fin, $alineacion = 'center', $nuevaLinea = true, $negrilla = '')
{

    global $filacabecera, $objPHPExcel;
    if ($nuevaLinea) $filacabecera++;
    if ($inicio != $fin) unirycuadro($inicio . $filacabecera . ':' . $fin . $filacabecera);
    borde($inicio . $filacabecera . ':' . $fin . $filacabecera);
    orientacion($inicio . $filacabecera . ':' . $fin . $filacabecera, $alineacion);
    $objPHPExcel->getActiveSheet()->setCellValue($inicio . $filacabecera, utf8_encode($texto));
    $objPHPExcel->getActiveSheet()->getStyle($inicio . $filacabecera)->getAlignment()->setWrapText(true);
    if ($negrilla == 'B') $objPHPExcel->getActiveSheet()->getStyle($inicio . $filacabecera . ':' . $fin . $filacabecera)->getFont()->setBold(true);
}

function textoSiguieteFilaHtml($texto = '', $inicio, $fin, $alineacion = 'center', $nuevaLinea = true, $negrilla = '')
{

    global $filacabecera, $objPHPExcel;
    if ($nuevaLinea) $filacabecera++;
    if ($inicio != $fin) unirycuadro($inicio . $filacabecera . ':' . $fin . $filacabecera);
    borde($inicio . $filacabecera . ':' . $fin . $filacabecera);
    orientacion($inicio . $filacabecera . ':' . $fin . $filacabecera, $alineacion);
    $wizard = new PHPExcel_Helper_HTML;
    $richText = $wizard->toRichTextObject($texto);

    $objPHPExcel->getActiveSheet()->setCellValue($inicio . $filacabecera, $richText);


    $objPHPExcel->getActiveSheet()->getStyle($inicio . $filacabecera)->getAlignment()->setWrapText(true);
    if ($negrilla == 'B') $objPHPExcel->getActiveSheet()->getStyle($inicio . $filacabecera . ':' . $fin . $filacabecera)->getFont()->setBold(true);
}

function calculaAltoTexto($texto)
{
    global $anchoColumna;
    $exp = explode("\n", $texto);
    $lineas = count($exp);
    $countTexto = strlen($texto);
    // formula medio compleja

    $resultado = ($countTexto / ($anchoColumna * 6)) * 6 + 16 * $lineas;
    return $resultado;
}

function imagenSiguieteFila($imagen = '', $inicio, $fin, $nuevaLinea = true)
{
    global $filacabecera, $objPHPExcel;
    if ($nuevaLinea) $filacabecera++;

    unirycuadro($inicio . $filacabecera . ':' . $fin . $filacabecera);

    $objPHPExcel->getActiveSheet()->getRowDimension($filacabecera)->setRowHeight(220);
    $objDrawing = new PHPExcel_Worksheet_Drawing();
    $objDrawing->setName($imagen);
    $objDrawing->setDescription($imagen);
    $objDrawing->setPath('../../../../' . $imagen);
    $objDrawing->setCoordinates($inicio . ($filacabecera));
    //setOffsetX works properly
    $objDrawing->setOffsetX(1);
    $objDrawing->setOffsetY(1);
    //set width, height

    $objDrawing->setWidth(360);
    $objDrawing->setWorksheet($objPHPExcel->getActiveSheet());
}

function fecha_informe($personalId)
{
    global $os;
    $sql = "SELECT fecha_impresion_informe FROM amc_personal_distributivo WHERE id = $personalId ";
    $result = $os->db->conn->query($sql);
    $fechaInforme = $result->fetch(PDO::FETCH_ASSOC);
    if (!isset($fechaInforme['fecha_impresion_informe'])) {
        $sql = "UPDATE `amc_personal_distributivo` SET `fecha_impresion_informe`=now() WHERE (`id`='$personalId')";
        $os->db->conn->query($sql);
    }
    return null;
}
