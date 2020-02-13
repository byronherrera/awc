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
if (isset($_GET['param'])) {
    $data = json_decode(stripslashes($_GET["param"]));
}

$ordenDetalle = 0;

$columnaOrdenDetalle = array('M', 'N', "O", "P");

$generaAcciones = false;
$generaActas = false;
$generaRetiros = false;

$generaTotalesPersonal = false;


if (isset($_GET['acciones'])) {
    $generaAcciones = $_GET['acciones'];
    if ($generaAcciones == "true") {
        $generaAcciones = true;
        $ordenAcciones = $columnaOrdenDetalle[$ordenDetalle];
        $ordenDetalle++;
    } else
        $generaAcciones = false;
}

if (isset($_GET['actas'])) {
    $generaActas = $_GET['actas'];
    if ($generaActas == "true") {
        $generaActas = true;
        $ordenActas = $columnaOrdenDetalle[$ordenDetalle];
        $ordenDetalle++;
    } else
        $generaActas = false;
}

if (isset($_GET['retiros'])) {
    $generaRetiros = $_GET['retiros'];
    if ($generaRetiros == "true") {
        $generaRetiros = true;
        $ordenRetiros = $columnaOrdenDetalle[$ordenDetalle];
        $ordenDetalle++;
    } else
        $generaRetiros = false;
}
if (isset($_GET['totalespersonal'])) {
    $generaTotalesPersonal = $_GET['totalespersonal'];
    if ($generaTotalesPersonal == "true") {
        $generaTotalesPersonal = true;
        $ordenTotalesPersonal = $columnaOrdenDetalle[$ordenDetalle];
        $ordenDetalle++;
    } else
        $generaTotalesPersonal = false;
}

$today = date("Y-n-j-H-i-s");

// para los reportes
$where = '';
// caso en reportes
if (isset($data->busqueda_tipo_control) and ($data->busqueda_tipo_control != '')) {
    $tipo = $data->busqueda_tipo_control;
    if ($where == '') {
        $where = "WHERE id_tipo_control like '%$tipo%'  ";
    } else {
        $where = $where . " AND id_tipo_control like '%$tipo%' ";
    }
}
if (isset($data->busqueda_nivel_complejidad) and ($data->busqueda_nivel_complejidad != '')) {
    $tipo = $data->busqueda_nivel_complejidad;
    if ($where == '') {
        $where = "WHERE id_nivel_complejidad like '%$tipo%'  ";
    } else {
        $where = $where . " AND id_nivel_complejidad like '%$tipo%' ";
    }
}

$titulosegundo = 'Unidad de Operativos';
if (isset($data->busqueda_zonal) and ($data->busqueda_zonal != '')) {
    $tipo = $data->busqueda_zonal;
    $titulosegundo = nombreZonal($tipo);
    if ($where == '') {
        $where = "WHERE id_zonal  = '$tipo' ";
    } else {
        $where = $where . " AND id_zonal = '$tipo' ";
    }
}


if (isset($data->busqueda_unidad_asignado) and ($data->busqueda_unidad_asignado != '')) {
    $tipo = $data->busqueda_unidad_asignado;
    if ($where == '') {
        $where = "WHERE id_unidad = $tipo ";
    } else {
        $where = $where . " AND id_unidad = $tipo ";
    }
}

if (isset($data->busqueda_persona_encargada) and ($data->busqueda_persona_encargada != '')) {
    $tipo = $data->busqueda_persona_encargada;
    if ($where == '') {
        $where = "WHERE id_persona_encargada  = '$tipo' ";
    } else {
        $where = $where . " AND id_persona_encargada = '$tipo' ";
    }
}
if (isset($data->busqueda_fallido) and ($data->busqueda_fallido != '')) {
    $tipo = $data->busqueda_fallido;
    if ($where == '') {
        $where = "WHERE fallido = '$tipo' ";
    } else {
        $where = $where . " AND fallido = '$tipo' ";
    }
}
if (isset($data->busqueda_finalizado) and ($data->busqueda_finalizado != '')) {
    $tipo = $data->busqueda_finalizado;
    if ($where == '') {
        $where = "WHERE finalizado = '$tipo' ";
    } else {
        $where = $where . " AND finalizado = '$tipo' ";
    }
}
if (isset($data->busqueda_estado) and ($data->busqueda_estado != '')) {
    $tipo = $data->busqueda_estado;
    if ($where == '') {
        $where = "WHERE id_estado = '$tipo' ";
    } else {
        $where = $where . " AND id_estado = '$tipo' ";
    }
}
if (isset($data->busqueda_tipo_operativo) and ($data->busqueda_tipo_operativo != '')) {
    $tipo = $data->busqueda_tipo_operativo;
    if ($where == '') {
        $where = "WHERE tipo_operativo = '$tipo' ";
    } else {
        $where = $where . " AND tipo_operativo = '$tipo' ";
    }
}

if (isset($data->busqueda_informe) and ($data->busqueda_informe != '')) {
    $tipo = $data->busqueda_informe;
    if ($where == '') {
        $where = "WHERE (select count(*) from amc_operativos_informes a WHERE (UPPER(a.administrado) like UPPER('%$tipo%') OR
            UPPER(a.direccion) like UPPER('%$tipo%') OR
            UPPER(a.hecho) like UPPER('%$tipo%') OR
            UPPER(a.medida) like UPPER('%$tipo%') OR
            UPPER(a.observaciones) like UPPER('%$tipo%')) AND
            a.id_operativo = b.id ) > 0 ";
    } else {
        $where = $where . " AND (select count(*) from amc_operativos_informes a WHERE (UPPER(a.administrado) like UPPER('%$tipo%') OR
            UPPER(a.direccion) like UPPER('%$tipo%') OR
            UPPER(a.hecho) like UPPER('%$tipo%') OR
            UPPER(a.medida) like UPPER('%$tipo%') OR
            UPPER(a.observaciones) like UPPER('%$tipo%')) AND
            a.id_operativo = b.id ) > 0               ";
    }
}
if (isset($data->busqueda_observaciones) and ($data->busqueda_observaciones != '')) {
    $tipo = $data->busqueda_observaciones;
    if ($where == '') {
        $where = "WHERE ( upper( punto_encuentro_planificado ) like '%$tipo%' or
                        upper( zona ) like '%$tipo%' or
                        upper( observaciones ) like '%$tipo%'or
                        upper( parroquias ) like '%$tipo%' or
                        upper( barrios) like '%$tipo%') ";
    } else {
        $where = $where . " AND  ( upper( punto_encuentro_planificado ) like '%$tipo%' or
                        upper( zona ) like '%$tipo%' or
                        upper( observaciones ) like '%$tipo%'or
                        upper( parroquias ) like '%$tipo%' or
                        upper( barrios) like '%$tipo%')  ";
    }
}
if (isset($data->busqueda_personal_asignado) and ($data->busqueda_personal_asignado != '')) {
    $tipo = $data->busqueda_personal_asignado;
    if ($where == '') {
        $where = "WHERE (select count(*) from amc_operativos_personal a where a.id_member = '$tipo' and a.id_operativo = b.id ) > 0 ";
    } else {
        $where = $where . " AND (select count(*) from amc_operativos_personal a where a.id_member = '$tipo' and a.id_operativo = b.id ) > 0  ";
    }
}
if (isset($data->busqueda_fecha_inicio) and ($data->busqueda_fecha_inicio != '')) {
    $fechainicio = $data->busqueda_fecha_inicio;
    if (isset($data->busqueda_fecha_fin) and ($data->busqueda_fecha_fin != '')) {
        $fechafin = $data->busqueda_fecha_fin;
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

$sql = "SELECT *, (SELECT nombre FROM amc_operativos_estados c WHERE  C.id = b.id_estado ) estado FROM amc_operativos as b  $where  ORDER BY b.fecha_inicio_planificacion";

$result = $os->db->conn->query($sql);
$number_of_rows = $result->rowCount();

$objPHPExcel = new PHPExcel();
$objPHPExcel->setActiveSheetIndex(0);

$filaTitulo1 = 2;
$filaTitulo2 = 3;
$filacabecera = 6;
$filaInicio = 7;


$styleArray = array(
    'borders' => array(
        'allborders' => array(
            'style' => PHPExcel_Style_Border::BORDER_THIN
        )
    )
);

$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo1 . ':J' . $filaTitulo1);

$objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo2 . ':J' . $filaTitulo2);

$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo1, "LISTADO OPERATIVOS");

$objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo2, $titulosegundo);

$fechaActual = date('Y-m-d H:i:s');

$objPHPExcel->getActiveSheet()->setCellValue('A' . ($filaTitulo2 +2), "Fecha inicio: " .$fechainicio .", Fecha fin: " . $fechafin . ", Fecha Corte: " . $fechaActual );


$offsetTotalesTipo = totalesPorTipo($number_of_rows + $filaInicio, $where);


$filasPiePagina = $number_of_rows + $filaInicio + 4 + $offsetTotalesTipo;

$objPHPExcel->getActiveSheet()->setCellValue('A' . ($filasPiePagina ), "Nota: El valor junto al nombre del funcionario, corresponde al total de operativos del funcionario, en el rango seleccionado. ");




// Elaborador por:
if (isset($data->busqueda_elaborado_por) and ($data->busqueda_elaborado_por != '')) {
    $objPHPExcel->getActiveSheet()->mergeCells('A' . ($filasPiePagina) . ':B' . ($filasPiePagina));
    $objPHPExcel->getActiveSheet()->mergeCells('A' . ($filasPiePagina + 1) . ':B' . ($filasPiePagina + 1));
    $objPHPExcel->getActiveSheet()->mergeCells('A' . ($filasPiePagina + 2) . ':B' . ($filasPiePagina + 2));


    $objPHPExcel->getActiveSheet()->setCellValue('A' . $filasPiePagina, '__________________');
    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filasPiePagina + 1), regresaNombre($data->busqueda_elaborado_por));
    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filasPiePagina + 2), "Elaborado por");
}
// Revisado por:
if (isset($data->busqueda_revisado_por) and ($data->busqueda_revisado_por != '')) {
    $objPHPExcel->getActiveSheet()->mergeCells('D' . ($filasPiePagina) . ':E' . ($filasPiePagina));
    $objPHPExcel->getActiveSheet()->mergeCells('D' . ($filasPiePagina + 1) . ':E' . ($filasPiePagina + 1));
    $objPHPExcel->getActiveSheet()->mergeCells('D' . ($filasPiePagina + 2) . ':E' . ($filasPiePagina + 2));
    $objPHPExcel->getActiveSheet()->setCellValue('D' . $filasPiePagina, '__________________');
    $objPHPExcel->getActiveSheet()->setCellValue('D' . ($filasPiePagina + 1), regresaNombre($data->busqueda_revisado_por));
    $objPHPExcel->getActiveSheet()->setCellValue('D' . ($filasPiePagina + 2), "Revisado por");
}
// Aprobado por:
if (isset($data->busqueda_aprobado_por) and ($data->busqueda_aprobado_por != '')) {
    $objPHPExcel->getActiveSheet()->mergeCells('G' . ($filasPiePagina) . ':H' . ($filasPiePagina));
    $objPHPExcel->getActiveSheet()->mergeCells('G' . ($filasPiePagina + 1) . ':H' . ($filasPiePagina + 1));
    $objPHPExcel->getActiveSheet()->mergeCells('G' . ($filasPiePagina + 2) . ':H' . ($filasPiePagina + 2));
    $objPHPExcel->getActiveSheet()->setCellValue('G' . $filasPiePagina, '__________________');
    $objPHPExcel->getActiveSheet()->setCellValue('G' . ($filasPiePagina + 1), regresaNombre($data->busqueda_aprobado_por));
    $objPHPExcel->getActiveSheet()->setCellValue('G' . ($filasPiePagina + 2), "Aprobado por");
}

// impresion pie de pagina
$objDrawing = new PHPExcel_Worksheet_Drawing();
$objDrawing->setName('test_img');
$objDrawing->setDescription('test_img');
$objDrawing->setPath('image2.png');
$objDrawing->setCoordinates('A' . ($filasPiePagina + 5));
//setOffsetX works properly
$objDrawing->setOffsetX(5);
$objDrawing->setOffsetY(5);
//set width, height
$objDrawing->setWidth(200);
$objDrawing->setHeight(70);
$objDrawing->setWorksheet($objPHPExcel->getActiveSheet());
// fin impresion pie de pagina

// impresion pie de pagina
$objDrawing = new PHPExcel_Worksheet_Drawing();
$objDrawing->setName('test_img2');
$objDrawing->setDescription('test_img2');
$objDrawing->setPath('image1.png');
$objDrawing->setCoordinates('I1');
//setOffsetX works properly
$objDrawing->setOffsetX(0);
$objDrawing->setOffsetY(0);
//set width, height
$objDrawing->setWidth(100);
$objDrawing->setHeight(50);
$objDrawing->setWorksheet($objPHPExcel->getActiveSheet());
// fin impresion pie de pagina


// Ancho de las columnas
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('A')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('B')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('C')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('D')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('E')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('F')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('G')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('H')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('I')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('J')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('K')->setAutoSize(false);
$objPHPExcel->getActiveSheet()->getColumnDimensionByColumn('L')->setAutoSize(false);

$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(6);
$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(16);
$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(15);
$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(15);
$objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(6);
$objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(6);
$objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth(16);
$objPHPExcel->getActiveSheet()->getColumnDimension('H')->setWidth(32);
$objPHPExcel->getActiveSheet()->getColumnDimension('I')->setWidth(20);
$objPHPExcel->getActiveSheet()->getColumnDimension('J')->setWidth(16);
$objPHPExcel->getActiveSheet()->getColumnDimension('K')->setWidth(16);
$objPHPExcel->getActiveSheet()->getColumnDimension('L')->setWidth(16);

$objPHPExcel->getActiveSheet()->setCellValue('A' . $filacabecera, 'Cod');
$objPHPExcel->getActiveSheet()->setCellValue('B' . $filacabecera, 'Fecha');
$objPHPExcel->getActiveSheet()->setCellValue('C' . $filacabecera, 'Zona');
$objPHPExcel->getActiveSheet()->setCellValue('D' . $filacabecera, 'Lugar Intervención');
$objPHPExcel->getActiveSheet()->setCellValue('E' . $filacabecera, 'Inicio');
$objPHPExcel->getActiveSheet()->setCellValue('F' . $filacabecera, 'Fin');
$objPHPExcel->getActiveSheet()->setCellValue('G' . $filacabecera, 'Tipo Control');
$objPHPExcel->getActiveSheet()->setCellValue('H' . $filacabecera, 'Personal Apoyo');
$objPHPExcel->getActiveSheet()->setCellValue('I' . $filacabecera, 'Funcionario Responsable');
$objPHPExcel->getActiveSheet()->setCellValue('J' . $filacabecera, 'Teléfono funcionario responsable');
$objPHPExcel->getActiveSheet()->setCellValue('K' . $filacabecera, 'Horas Operativo');
$objPHPExcel->getActiveSheet()->setCellValue('L' . $filacabecera, 'Observaciones');


if ($generaAcciones) {
    $objPHPExcel->getActiveSheet()->setCellValue($ordenAcciones . $filacabecera, 'Detalle Acciones');
    $objPHPExcel->getActiveSheet()->getColumnDimensionByColumn($ordenAcciones)->setAutoSize(false);
    $objPHPExcel->getActiveSheet()->getColumnDimension($ordenAcciones)->setWidth(40);

}
if ($generaActas) {
    $objPHPExcel->getActiveSheet()->setCellValue($ordenActas . $filacabecera, 'Detalle Actas');
    $objPHPExcel->getActiveSheet()->getColumnDimensionByColumn($ordenActas)->setAutoSize(false);
    $objPHPExcel->getActiveSheet()->getColumnDimension($ordenActas)->setWidth(40);

}


if ($generaRetiros) {
    $objPHPExcel->getActiveSheet()->setCellValue($ordenRetiros . $filacabecera, 'Detalle retiros');
    $objPHPExcel->getActiveSheet()->getColumnDimensionByColumn($ordenRetiros)->setAutoSize(false);
    $objPHPExcel->getActiveSheet()->getColumnDimension($ordenRetiros)->setWidth(40);

}
if ($generaTotalesPersonal) {
    $objPHPExcel->getActiveSheet()->setCellValue($ordenTotalesPersonal . $filacabecera, 'Total Personal');
    $objPHPExcel->getActiveSheet()->getColumnDimensionByColumn($ordenTotalesPersonal)->setAutoSize(false);
    $objPHPExcel->getActiveSheet()->getColumnDimension($ordenTotalesPersonal)->setWidth(20);
}


$noExistenFilas = true;

while ($rowdetalle = $result->fetch(PDO::FETCH_ASSOC)) {
// actualizar detalle idGuia
    $noExistenFilas = false;
    //cambio para impresiono el nivel de complejidad
    $niveles_complejidad = array("Alto", "Medio", "Bajo", "");

    if (isset($rowdetalle['id_nivel_complejidad']) and ($rowdetalle['id_nivel_complejidad'] != ' ')) {
        $rowdetalle['id_nivel_complejidad'] = $niveles_complejidad[$rowdetalle['id_nivel_complejidad'] - 1];
    } else {
        $rowdetalle['id_nivel_complejidad'] = '';
    }

    //cambio para impresion el tipo de control
    $sql = "SELECT nombre_completo as nombre  FROM amc_ordenanzas WHERE id in (" . $rowdetalle['id_tipo_control'] . ")";
    $nombres = $os->db->conn->query($sql);
    $nombresUsuarios = array();
    while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
        $nombresUsuarios[] = $nombreDetalle['nombre'];
    }
    $cadena_personal = implode(", ", $nombresUsuarios);
    $rowdetalle['id_tipo_control'] = $cadena_personal;

// recuperamos los nombres de los usuarios
    $sql = "SELECT id_member, (SELECT CONCAT(qo_members.last_name, ' ', qo_members.first_name) FROM qo_members WHERE qo_members.id = b.id_member ) AS nombre  FROM amc_operativos_personal b WHERE id_operativo = '" . $rowdetalle['id'] . "'";
    $nombres = $os->db->conn->query($sql);
    $nombresUsuarios = array();
    while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
        $nombresUsuarios[] = $nombreDetalle['nombre']. ' (' .totalOperativos($nombreDetalle['id_member'], $fechainicio,$fechafin) . ") ";
    }
    $cadena_personal = implode(", ", $nombresUsuarios);
    $rowdetalle['personal2'] = $cadena_personal;

    $rowdetalle['personal'] = regresaNombre($rowdetalle['id_persona_encargada']) .' (' .totalOperativos($rowdetalle['id_persona_encargada'], $fechainicio,$fechafin) . ") ";



    $rowdetalle['telefono'] = regresaTelefono(regresaNombre($rowdetalle['id_persona_encargada']));


    $cadena_personal = array();
    $nombresUsuarios = array();
    // recuperamos el nombre de zona
    $sql = "SELECT  nombre  FROM amc_zonas WHERE id = '" . $rowdetalle['id_zonal'] . "'";
    $nombres = $os->db->conn->query($sql);
    $nombresUsuarios = array();
    while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
        $nombresUsuarios[] = $nombreDetalle['nombre'];
    }

    $cadena_personal = implode(", ", $nombresUsuarios);
    $rowdetalle['id_zonal'] = $cadena_personal;

    // formatos de impresion de fechas y horas
    $date = new DateTime($rowdetalle['fecha_inicio_planificacion']);
    $inicio = $date->format('H:i');

    $dias = array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
    $meses = array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    $rowdetalle['fecha_inicio_planificacion'] = $dias[$date->format('w')] . ", " . $date->format('d') . " de " . $meses[$date->format('m') - 1] . " del " . $date->format('Y');


    $dateFin = new DateTime($rowdetalle['fecha_fin_planificacion']);
    $date->diff($dateFin);
    $interval = $date->diff($dateFin);
    $rowdetalle ['horasOperativo'] = $interval->format('%H horas %I minutos');

    $date = new DateTime($rowdetalle['fecha_fin_planificacion']);
    $fin = $date->format('H:i');

    // envio de impresion de valores
    $objPHPExcel->getActiveSheet()->setCellValue('A' . $filaInicio, $rowdetalle['id']);
    $objPHPExcel->getActiveSheet()->setCellValue('B' . $filaInicio, $rowdetalle['fecha_inicio_planificacion']);
    $objPHPExcel->getActiveSheet()->setCellValue('C' . $filaInicio, $rowdetalle['id_zonal']);
    $objPHPExcel->getActiveSheet()->setCellValue('D' . $filaInicio, $rowdetalle['zona']);
    $objPHPExcel->getActiveSheet()->setCellValue('E' . $filaInicio, $inicio);
    $objPHPExcel->getActiveSheet()->setCellValue('F' . $filaInicio, $fin);
    $objPHPExcel->getActiveSheet()->setCellValue('G' . $filaInicio, $rowdetalle['id_tipo_control']);
    $objPHPExcel->getActiveSheet()->setCellValue('H' . $filaInicio, $rowdetalle['personal2']);
    $objPHPExcel->getActiveSheet()->setCellValue('I' . $filaInicio, $rowdetalle['personal']);
    $objPHPExcel->getActiveSheet()->setCellValue('J' . $filaInicio, $rowdetalle ['telefono']);
    $objPHPExcel->getActiveSheet()->setCellValue('K' . $filaInicio, $rowdetalle ['horasOperativo'] );
    $objPHPExcel->getActiveSheet()->setCellValue('L' . $filaInicio, $rowdetalle['observaciones']);

    if ($generaAcciones) {
        $objPHPExcel->getActiveSheet()->setCellValue($ordenAcciones . $filaInicio, detalleAccionesId($rowdetalle['id']));
        $objPHPExcel->getActiveSheet()->getStyle($ordenAcciones . $filaInicio . ':' . $ordenAcciones . $filaInicio)->applyFromArray($styleArray);
        $objPHPExcel->getActiveSheet()->getStyle($ordenAcciones . $filacabecera . ':' . $ordenAcciones . $filacabecera)->applyFromArray($styleArray);

    }

    if ($generaActas) {
        $objPHPExcel->getActiveSheet()->setCellValue($ordenActas . $filaInicio, detalleActasId($rowdetalle['id']));
        $objPHPExcel->getActiveSheet()->getStyle($ordenActas . $filaInicio . ':' . $ordenActas . $filaInicio)->applyFromArray($styleArray);
        $objPHPExcel->getActiveSheet()->getStyle($ordenActas . $filacabecera . ':' . $ordenActas . $filacabecera)->applyFromArray($styleArray);

    }


    if ($generaRetiros) {
        $objPHPExcel->getActiveSheet()->setCellValue($ordenRetiros . $filaInicio, detalleRetirosId($rowdetalle['id']));
        $objPHPExcel->getActiveSheet()->getStyle($ordenRetiros . $filaInicio . ':' . $ordenRetiros . $filaInicio)->applyFromArray($styleArray);
        $objPHPExcel->getActiveSheet()->getStyle($ordenRetiros . $filacabecera . ':' . $ordenRetiros . $filacabecera)->applyFromArray($styleArray);
        $objPHPExcel->getActiveSheet()->getStyle($ordenRetiros . $filacabecera . ':' . $ordenRetiros . $filacabecera)->applyFromArray($styleArray);
    }

    if ($generaTotalesPersonal) {
        $objPHPExcel->getActiveSheet()->setCellValue($ordenTotalesPersonal . $filaInicio, detalleTotalesPersonalId($rowdetalle['id']));
        $objPHPExcel->getActiveSheet()->getStyle($ordenTotalesPersonal . $filaInicio . ':' . $ordenTotalesPersonal . $filaInicio)->applyFromArray($styleArray);
        $objPHPExcel->getActiveSheet()->getStyle($ordenTotalesPersonal . $filacabecera . ':' . $ordenTotalesPersonal . $filacabecera)->applyFromArray($styleArray);
        $objPHPExcel->getActiveSheet()->getStyle($ordenTotalesPersonal . $filacabecera . ':' . $ordenTotalesPersonal . $filacabecera)->applyFromArray($styleArray);
    }


    $objPHPExcel->getActiveSheet()->getStyle('A' . $filaInicio . ':L' . $filaInicio)->applyFromArray($styleArray);
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


$objPHPExcel->getActiveSheet()->getStyle('A1:L600')->applyFromArray(
    array(
        'alignment' => array(
            'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
        )
    )
);



$objPHPExcel->getActiveSheet()->getStyle('A4:L200')->applyFromArray(
    array(
        'alignment' => array(
            'vertical' => PHPExcel_Style_Alignment::VERTICAL_TOP,
        )
    )
);

$objPHPExcel->getActiveSheet()->getStyle('A3:Z3000')->getAlignment()->setWrapText(true);


$objPHPExcel->getActiveSheet()->getStyle('A' . $filacabecera . ':L' . $filacabecera)->applyFromArray($styleArray);


$objPHPExcel->getActiveSheet()->getStyle('A5:L5')->applyFromArray(
    array(
        'alignment' => array(
            'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
        )
    )
);
$objPHPExcel->getActiveSheet()->getStyle('A5:l5')->getAlignment()->setWrapText(false);


$objPHPExcel->getActiveSheet()->getStyle('A'.$filasPiePagina.':B' . $filasPiePagina )->applyFromArray(
    array(
        'alignment' => array(
            'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
        )
    )
);
$objPHPExcel->getActiveSheet()->getStyle('A'.$filasPiePagina.':B' . $filasPiePagina )->getAlignment()->setWrapText(false);


// Set page orientation and size

$objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_PORTRAIT);
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);


$objPHPExcel->getActiveSheet()->getStyle('A1:L3')->getFont()->setSize(14);
$objPHPExcel->getActiveSheet()->getStyle('A4:F40')->getFont()->setSize(10);
$objPHPExcel->getActiveSheet()->getStyle('G4:L40')->getFont()->setSize(9);


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


function nombreZonal($tipo)
{
    global $os;
    $sql = "SELECT  nombre_largo as nombre FROM amc_zonas WHERE id = '" . $tipo . "'";
    $nombres = $os->db->conn->query($sql);
    $nombresUsuarios = array();
    while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
        $nombresUsuarios[] = $nombreDetalle['nombre'];
    }
    $cadena_personal = implode(", ", $nombresUsuarios);
    return $cadena_personal;

}

function nombreOrdenanza($tipo)
{
    global $os;
    $sql = "SELECT  nombre FROM amc_ordenanzas WHERE id = '" . $tipo . "'";
    $nombres = $os->db->conn->query($sql);
    $nombresUsuarios = array();
    while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
        $nombresUsuarios[] = $nombreDetalle['nombre'];
    }
    $cadena_personal = implode(", ", $nombresUsuarios);
    return $cadena_personal;

}


function nombreOperativosAccionesTipos($tipo)
{
    global $os;
    $sql = "SELECT  nombre FROM amc_operativos_acciones_tipos WHERE id = '" . $tipo . "'";
    $nombres = $os->db->conn->query($sql);
    $nombresUsuarios = array();
    while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
        $nombresUsuarios[] = $nombreDetalle['nombre'];
    }
    $cadena_personal = implode(", ", $nombresUsuarios);
    return $cadena_personal;

}

function nombreOperativosInformesTiposMedidas($tipo)
{
    global $os;
    $sql = "SELECT  nombre FROM amc_operativos_informes_tipos_medidas WHERE id = '" . $tipo . "'";
    $nombres = $os->db->conn->query($sql);
    $nombresUsuarios = array();
    while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
        $nombresUsuarios[] = $nombreDetalle['nombre'];
    }
    $cadena_personal = implode(", ", $nombresUsuarios);
    return $cadena_personal;

}

function regresaNombre($id_dato)
{
    global $os;

    if (trim($id_dato) != '') {
        $os->db->conn->query("SET NAMES 'utf8'");
        $sql = "SELECT CONCAT(TRIM(qo_members.first_name), ' ', TRIM(qo_members.last_name)) AS nombre
            FROM qo_members WHERE id = " . $id_dato;
        $nombre = $os->db->conn->query($sql);
        if ($nombre) {
            $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
            return $rownombre['nombre'];
        } else
            return '';

    } else
        return '';


}

function regresaTelefono($id_dato)
{
    global $os;
    if (trim($id_dato) != '') {
        $os->db->conn->query("SET NAMES 'utf8'");
        $sql = "SELECT telefono2 FROM amc_personal_distributivo WHERE CONCAT(TRIM(nombres),' ', TRIM(apellidos)) LIKE  '$id_dato'";
        $nombre = $os->db->conn->query($sql);
        if ($nombre) {
            $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
            //return $id_dato;
            return $rownombre['telefono2'];
        } else
            return '';

    } else
        return '';
}

function totalesPorTipo($filaTitulo1, $where)
{
    global $objPHPExcel;
    global $os;
    global $styleArray;
    $sql = "SELECT * FROM amc_ordenanzas";
    $nombres = $os->db->conn->query($sql);

    $j = 0;

    while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
        $totalOrdenanza = recuperarTotales($nombreDetalle['id'], $where);
        if ($totalOrdenanza != 0) {
            $objPHPExcel->getActiveSheet()->setCellValue('G' . ($filaTitulo1 + $j), $nombreDetalle['nombre_completo']);
            $objPHPExcel->getActiveSheet()->setCellValue('H' . ($filaTitulo1 + $j), $totalOrdenanza);
            $objPHPExcel->getActiveSheet()->getStyle('G' . ($filaTitulo1 + $j) . ':H' . ($filaTitulo1 + $j))->applyFromArray($styleArray);
            $j++;
        };
    }
    return $j;
}

function recuperarTotales($id, $where)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    if ($where == '') {
        $sql = "SELECT  COUNT(*) as total FROM amc_operativos as b WHERE id_tipo_control like '%$id%'";
    } else {
        $sql = "SELECT  COUNT(*) as total FROM amc_operativos as b $where AND id_tipo_control like '%$id%'";
    }
    $nombre = $os->db->conn->query($sql);
    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);

    return $rownombre['total'];
}

function detalleAccionesId($id)
{
    global $os;
    $sql = "SELECT id_accion, cantidad, observaciones FROM amc_operativos_acciones WHERE id_operativo ='" . $id . "'";
    $nombres = $os->db->conn->query($sql);
    $nombresUsuarios = array();
    while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
        $nombreDetalle['id_accion'] = nombreOperativosAccionesTipos($nombreDetalle['id_accion']);
        $nombresUsuarios[] = "(" . implode(" - ", $nombreDetalle) . ')';
    }
    $cadena_personal = implode(", ", $nombresUsuarios);
    return $cadena_personal;
}

function detalleActasId($id)
{
    global $os;
    $sql = "SELECT id_ordenanza, medida, observaciones FROM amc_operativos_informes WHERE id_operativo ='" . $id . "'";
    $nombres = $os->db->conn->query($sql);
    $nombresUsuarios = array();
    while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
        $nombreDetalle['id_ordenanza'] = nombreOrdenanza($nombreDetalle['id_ordenanza']);
        $nombreDetalle['medida'] = nombreOperativosInformesTiposMedidas($nombreDetalle['medida']);
        $nombresUsuarios[] = "(" . implode(" - ", $nombreDetalle) . ')';
    }
    $cadena_personal = implode(", ", $nombresUsuarios);
    return $cadena_personal;
}


function detalleRetirosId($id)
{
    global $os;
//    SELECT tipo, detalle FROM `procesos-amc`.`amc_operativos_retiros` WHERE id_operativo = 67;
    $sql = "SELECT CONCAT('(',tipo, ' - ', detalle,')') AS nombre  FROM `procesos-amc`.`amc_operativos_retiros` WHERE id_operativo ='" . $id . "'";
    $nombres = $os->db->conn->query($sql);
    $nombresUsuarios = array();
    while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
        $nombresUsuarios[] = $nombreDetalle['nombre'];
    }
    $cadena_personal = implode(", ", $nombresUsuarios);
    return $cadena_personal;
}

function detalleTotalesPersonalId($id)
{
    global $os;
    if (trim($id) != '') {
        $sql = "SELECT COUNT(*) AS nombre   FROM amc_operativos_personal WHERE id_operativo = '" . $id . "'";

        $nombres = $os->db->conn->query($sql);
        $nombresUsuarios = array();
        while ($nombreDetalle = $nombres->fetch(PDO::FETCH_ASSOC)) {
            $nombresUsuarios[] = $nombreDetalle['nombre'] + 1;
        }
        $cadena_personal = implode(", ", $nombresUsuarios);
        return $cadena_personal;
    } else {
        return "";
    }
}

function totalOperativos ( $id, $fechaInicio, $fechaFin) {
    global $os;
    if ((trim($id) != '') and (!is_null($id))){
        $sql = "SELECT COUNT( id ) total_operativos FROM amc_operativos where id_persona_encargada =  $id AND 
                fecha_inicio_planificacion between '$fechaInicio' and '$fechaFin'";
        $nombre = $os->db->conn->query($sql);
        $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);

        $totalEncargado = $rownombre['total_operativos'];

        $sql = "SELECT
            Count(amc_operativos.id) AS total_operativos 
            FROM
            amc_operativos
            INNER JOIN amc_operativos_personal ON amc_operativos.id = amc_operativos_personal.id_operativo
            WHERE amc_operativos_personal.id_member = $id
            AND fecha_inicio_planificacion between '$fechaInicio' and '$fechaFin'";
        $nombre = $os->db->conn->query($sql);
        $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);

        $totalApoyo = $rownombre['total_operativos'];

        return $totalEncargado + $totalApoyo ;
        return $id;
    } else
    {
        return '';
    }
};