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

$objPHPExcel = new PHPExcel();
$objPHPExcel->setActiveSheetIndex(0);


$where = " WHERE reasignacion = 3 AND ( procesado_inspeccion = 1 and despacho_secretaria_insp = 0) AND amc_inspeccion.funcionario_entrega IS NOT NULL";
//$where = " WHERE reasignacion = 3   AND amc_inspeccion.funcionario_entrega IS NOT NULL ";
$sql = "SELECT DISTINCT amc_inspeccion . funcionario_entrega funcionario  
        FROM amc_denuncias as b 
        INNER JOIN amc_inspeccion ON b . id = amc_inspeccion . id_denuncia
        $where  ORDER BY b.recepcion_documento";


$resultFuncionarios = $os->db->conn->query($sql);
$siguienteFila = 1;
while ($rowFuncionario = $resultFuncionarios->fetch(PDO::FETCH_ASSOC)) {
    if (($rowFuncionario['funcionario'] != '') and (!is_null($rowFuncionario['funcionario']))) {
        envioEmail($rowFuncionario['funcionario']);
        $siguienteFila = imprimeActa($siguienteFila, $rowFuncionario['funcionario']);
    }
}

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
header('Content-Disposition: attachment;filename="acta-entrega-recepcion-inspeccion-' . $today . '.xlsx"');
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

function regresaNombre($id_dato)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");


    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    if ($id_dato != '') {
        $sql = "SELECT CONCAT(qo_members.first_name, ' ', qo_members.last_name) AS nombre
            FROM qo_members WHERE id = " . $id_dato;
        $nombre = $os->db->conn->query($sql);
        $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
        return $rownombre['nombre'];
    } else
        return '* No asignado';

}

function regresaEmail($id_dato)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");


    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    if ($id_dato != '') {
        $sql = "SELECT email_address
            FROM qo_members WHERE id = " . $id_dato;
        $nombre = $os->db->conn->query($sql);
        $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
        return $rownombre['email_address'];
    } else
        return '* No asignado';

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
        //$totalOrdenanza = recuperarTotales($nombreDetalle['id'], $where);
        $totalOrdenanza = 0;
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

function total_guias()
{
    global $os;
    $nombre = $os->db->conn->query("SELECT COUNT(*) AS total FROM amc_guias_inspeccion");
    $rowguia = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rowguia['total'];
}

function fecha_actual()
{
    $date = new DateTime();
    $inicio = $date->format('H:i');

    $dias = array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
    $meses = array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    return "Quito, " . $dias[$date->format('w')] . ", " . $date->format('d') . " de " . $meses[$date->format('m') - 1] . " del " . $date->format('Y');

}

function actualizar_estado_tramite($id, $codigo_tramite, $numeroGuia)
{
    global $os;
    // actualizo denuncia con el numero de acta de despacho y se cambia la bandera a tramite realizadoo

    $sql = "UPDATE `amc_denuncias` SET `despacho_secretaria_insp`='1', `guia_inspeccion`='$numeroGuia' WHERE (`id`='$id')";
    $os->db->conn->query($sql);

    $sql = "UPDATE `amc_inspeccion` SET `guia`='$numeroGuia', `fecha_despacho`=NOW() WHERE (`id_denuncia`='$id')";
    $os->db->conn->query($sql);

};

function actualizar_guia_inspeccion($numeroGuia)
{
    global $os;
    $idMember = $os->get_member_id();
    $sql = "INSERT INTO `amc_guias_inspeccion`
            (`numero`, `id_unidad`, `unidad`, `id_member`) 
            VALUES ('$numeroGuia', '3', 'Inspeccion', '$idMember')";
    $os->db->conn->query($sql);
};

function envioEmail($funcionario)
{
    global $os;

    $where = " WHERE reasignacion = 3 AND  procesado_inspeccion = 1 AND despacho_secretaria_insp = 0  AND amc_inspeccion.funcionario_entrega = $funcionario ";

    $sql = "SELECT *, amc_inspeccion.funcionario_entrega funcionario,
            DATE_FORMAT(amc_inspeccion.fecha_despacho, \"%d/%m/%Y\") fechasumilla, (SELECT numero FROM amc_guias AS a WHERE a.id = b.guia) guia 
            FROM amc_denuncias as b 
            INNER JOIN amc_inspeccion ON b.id = amc_inspeccion.id_denuncia
            $where  ORDER BY b.recepcion_documento";

    $result = $os->db->conn->query($sql);
//    $number_of_rows = $result->rowCount();
    $fila = 0;
    $detalle = '<table border="1">
    <tr>
        <td>No</td>
        <td valign="top">Trámite DMI</td>
        <td valign="top">Tipo documento</td>
        <td valign="top">Remitente</td>
        <td valign="top">Sumillado</td>
        <td valign="top">Para</td>
        <td valign="top">Guia</td>
    </tr>';
    while ($rowdetalle = $result->fetch(PDO::FETCH_ASSOC)) {
        $fila++;
        $detalle .= "<tr>" .
            '<td valign="top">'.$fila.'</td>' .
            '<td valign="top">' . $rowdetalle['codigo_tramite'] . "</td>" .
            '<td valign="top">' . $rowdetalle['num_documento'] . "</td>" .
            '<td valign="top">' . $rowdetalle['remitente'] . "</td>" .
            '<td valign="top">' . $rowdetalle['fechasumilla'] . "</td>" .
            '<td valign="top">' . regresaNombre($funcionario) . "</td>" .
            '<td valign="top">'. $rowdetalle['guia'] . "</td>" .
            "</tr>";
    }
    $detalle .= "</table>";
    $fechaActual = date('d-m-Y H:i:s');
    $fechaActual2 = date('d-m-Y');
    $mensaje = getmensaje(regresaNombre($funcionario), $detalle, $fechaActual);
    $email =regresaEmail($funcionario);
    $email = "byron.herrera@quito.gob.ec";
    $asunto = "Nueva inspección asignada, " . $fechaActual2 . " - " . regresaEmail($funcionario);
    $envio = enviarEmail($email, $asunto, $mensaje);
}


function getmensaje($nombre = '', $inspecciones = '', $fecha = '')
{
    $texto = '<div style="font-family: Arial, Helvetica, sans-serif;">
                <div style="float: right; clear: both; width: 100%;"><img style="float: right;" src="http://agenciadecontrol.quito.gob.ec/images/logoamc.png" alt="" width="30%" /></div>
                <div style="clear: both; margin: 50px 10%; float: left;">
                <p><br><br>
                 Estimado ' . $nombre . ' ha sido asignado los siguientes trámites para su inspección  <br>
                 <br>
                 <br>
                 ' . $inspecciones . '
                 <br>
                 <br>
                 Favor ingresar en Matis AMC, para verificar las inspecciones <a href="http://172.20.136.60/procesos-amc">aquí</a> .
                <br>	
                <br>	
                Se les recuerda acercarse a la Secretaría de Inspección para retirar sus trámites, además que el tiempo para realizar los mismos se contabilizarán a partir del envío de este correo
                <br>
                </p>
                <p>Fecha : ' . $fecha . '</p>
                <p>Atentamente </p>
                <p>COORDINACION INSPECCION</p>
                <p></p>
                <p>INFORMACIÓN IMPORTANTE</p>
                <p>************************************************</p>
                <p>- No responder este correo ya que es un Mensaje Automático.</p>
                
                <p>- Para sugerencias, escribe a tu coordinador.</p>

                </div>
                <p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://agenciadecontrol.quito.gob.ec/images/piepagina.png" alt="" width="100%" /></p>
                </div>
                ';
    return $texto;
}

function enviarEmail($email, $nombre, $mensaje)
{

    $headers = "From: Agencia Metropolitana de Control <byron.herrera@quito.gob.ec>\r\n";
    //$headers .= "Reply-To: ". strip_tags("herrera.byron@gmail.com") . "\r\n";
    //$headers .= "CC: susan@example.com\r\n";

    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    mail($email, $nombre, $mensaje, $headers);
}

function imprimeActa($filaTitulo1, $funcionario)
{
    $filaTitulo2 = $filaTitulo1 + 1;
    $filacabecera = $filaTitulo1 + 6;
    $filaInicio = $filaTitulo1 + 7;

    global $os;
    global $objPHPExcel;

    $objPHPExcel->getActiveSheet()->setBreak('a' . ($filaTitulo1 - 1), PHPExcel_Worksheet::BREAK_ROW);

    $year = date("Y");
    $tituloPrimero = '';
    $os->db->conn->query("SET NAMES 'utf8'");
    $unidad = 3;
    $sql = "SELECT nombre_completo FROM amc_unidades WHERE id = $unidad";
    $resultguia = $os->db->conn->query($sql);
    if ($resultguia) {
        $row = $resultguia->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            $tituloPrimero = $row['nombre_completo'];
        }
    }
    $titulosegundo = '';
    $numeroGuia = '';
    // si no existe unidad es para reimpresion se envia como parametro guia, obtenemos id unidad


    $os->db->conn->query("SET NAMES 'utf8'");
    // se determina un filtro  para determinar las denuncias / tramites pendientes

    $where = " WHERE reasignacion = 3 AND ( procesado_inspeccion = 1 and despacho_secretaria_insp = 0) AND amc_inspeccion.funcionario_entrega = $funcionario ";
//    $where = " WHERE reasignacion = 3   AND amc_inspeccion.funcionario_entrega = $funcionario ";


    $sql = "SELECT *, amc_inspeccion.funcionario_entrega funcionario,
            DATE_FORMAT(amc_inspeccion.fecha_despacho, \"%d/%m/%Y\") fechasumilla, (SELECT numero FROM amc_guias AS a WHERE a.id = b.guia) guia 
            FROM amc_denuncias as b 
            INNER JOIN amc_inspeccion ON b.id = amc_inspeccion.id_denuncia
            $where  ORDER BY b.recepcion_documento";

    $result = $os->db->conn->query($sql);
    $number_of_rows = $result->rowCount();


    if ($number_of_rows > 0) {
        if (total_guias() > 0) {
            //$nombre = $os->db->conn->query("SELECT id_unidad, SUBSTRING(numero,10) as num FROM amc_guias_inspeccion WHERE id = $newIdGuia");
            $nombre = $os->db->conn->query("SELECT MAX(numero) as num FROM amc_guias_inspeccion ");
            $rowguia = $nombre->fetch(PDO::FETCH_ASSOC);
            $numeroGuia = $rowguia['num'] + 1;
        } else {
            // se valida para la primera vez,
            $numeroGuia = 1;
        }
        $titulosegundo = "ACTA DE ENTREGA  $year-$numeroGuia";
        actualizar_guia_inspeccion($numeroGuia);
    } else {
        $titulosegundo = "ACTA SIN DATOS";
        $numeroGuia = 'SIN-DATOS';
    }

    $styleArray = array(
        'borders' => array(
            'allborders' => array(
                'style' => PHPExcel_Style_Border::BORDER_THIN
            )
        )
    );

    $objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo1 . ':H' . $filaTitulo1);
    $objPHPExcel->getActiveSheet()->mergeCells('A' . $filaTitulo2 . ':H' . $filaTitulo2);

    $objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo1, $tituloPrimero);


    $objPHPExcel->getActiveSheet()->setCellValue('A' . $filaTitulo2, $titulosegundo);
    $objPHPExcel->getActiveSheet()->mergeCells('A' . ($filaTitulo2 + 2) . ':H' . ($filaTitulo2 + 2));

    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filaTitulo2 + 2), "Fecha: " . fecha_actual());
    $objPHPExcel->getActiveSheet()->mergeCells('A' . ($filaTitulo2 + 3) . ':H' . ($filaTitulo2 + 3));
    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filaTitulo2 + 3), "Responsable: " . regresaNombre($os->get_member_id()));
    $objPHPExcel->getActiveSheet()->mergeCells('A' . ($filaTitulo2 + 4) . ':H' . ($filaTitulo2 + 4));
    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filaTitulo2 + 4), "Cargo: SECRETARIA DIRECCION DE INSPECCION.");

    $offsetTotalesTipo = totalesPorTipo($number_of_rows + $filaInicio, $where);
    $filasPiePagina = $number_of_rows + $filaInicio + 2 + $offsetTotalesTipo;


// Elaborador por:
    $objPHPExcel->getActiveSheet()->mergeCells('A' . ($filasPiePagina) . ':C' . ($filasPiePagina));
    $objPHPExcel->getActiveSheet()->mergeCells('A' . ($filasPiePagina + 1) . ':C' . ($filasPiePagina + 1));
    $objPHPExcel->getActiveSheet()->mergeCells('A' . ($filasPiePagina + 2) . ':C' . ($filasPiePagina + 2));


    $objPHPExcel->getActiveSheet()->setCellValue('A' . $filasPiePagina, '__________________');
    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filasPiePagina + 1), regresaNombre($os->get_member_id()));
    $objPHPExcel->getActiveSheet()->setCellValue('A' . ($filasPiePagina + 2), "Elaborado por");

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
    $objDrawing->setCoordinates('H' . $filaTitulo1);
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

    $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(4);
    $objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(8);
    $objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(28);
    $objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(28);
    $objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(12);
    $objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(32);
    $objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth(11);
    $objPHPExcel->getActiveSheet()->getColumnDimension('H')->setWidth(20);

    $objPHPExcel->getActiveSheet()->setCellValue('A' . $filacabecera, 'No');
    $objPHPExcel->getActiveSheet()->setCellValue('B' . $filacabecera, 'Trámite DMI');
    $objPHPExcel->getActiveSheet()->setCellValue('C' . $filacabecera, 'Tipo documento');
    $objPHPExcel->getActiveSheet()->setCellValue('D' . $filacabecera, 'Remitente');
    $objPHPExcel->getActiveSheet()->setCellValue('E' . $filacabecera, 'Sumillado');
    $objPHPExcel->getActiveSheet()->setCellValue('F' . $filacabecera, 'Para');
    $objPHPExcel->getActiveSheet()->setCellValue('G' . $filacabecera, 'Guia');
    $objPHPExcel->getActiveSheet()->setCellValue('H' . $filacabecera, 'Firma / fecha');

    $noExistenFilas = true;
    $fila = 0;

    while ($rowdetalle = $result->fetch(PDO::FETCH_ASSOC)) {
        $fila++;
// actualizar detalle idGuia
        $noExistenFilas = false;
        //cambio para impresiono el nivel de complejidad
        $niveles_complejidad = array("Alto", "Medio", "Bajo", "");

        if (isset($rowdetalle['id_nivel_complejidad']) and ($rowdetalle['id_nivel_complejidad'] != ' ')) {
            $rowdetalle['id_nivel_complejidad'] = $niveles_complejidad[$rowdetalle['id_nivel_complejidad'] - 1];
        } else {
            $rowdetalle['id_nivel_complejidad'] = '';
        }

        // envio de impresion de valores
        $objPHPExcel->getActiveSheet()->setCellValue('A' . $filaInicio, $fila);
        $objPHPExcel->getActiveSheet()->setCellValue('B' . $filaInicio, $rowdetalle['codigo_tramite']);
        $objPHPExcel->getActiveSheet()->setCellValue('C' . $filaInicio, $rowdetalle['num_documento']);
        $objPHPExcel->getActiveSheet()->setCellValue('D' . $filaInicio, $rowdetalle['remitente']);
        $objPHPExcel->getActiveSheet()->setCellValue('E' . $filaInicio, $rowdetalle['fechasumilla']);
        $objPHPExcel->getActiveSheet()->setCellValue('F' . $filaInicio, regresaNombre($rowdetalle['funcionario']));
        $objPHPExcel->getActiveSheet()->setCellValue('G' . $filaInicio, $rowdetalle['guia']);
        $objPHPExcel->getActiveSheet()->setCellValue('H' . $filaInicio, '  ');

        $objPHPExcel->getActiveSheet()->getStyle('A' . $filaInicio . ':H' . $filaInicio)->applyFromArray($styleArray);
        $filaInicio++;

        // ACTUALIZAR ESTADO DEL REGISTRO
        actualizar_estado_tramite($rowdetalle['id_denuncia'], $rowdetalle['codigo_tramite'], $numeroGuia);


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


    $objPHPExcel->getActiveSheet()->getStyle('A' . $filaTitulo1 . ':H' . ($filasPiePagina + 9))->applyFromArray(
        array(
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
            )
        )
    );

    $objPHPExcel->getActiveSheet()->getStyle('A' . $filaTitulo1 . ':H' . ($filasPiePagina + 9))->applyFromArray(
        array(
            'alignment' => array(
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
            )
        )
    );

    $objPHPExcel->getActiveSheet()->getStyle('A' . ($filaTitulo1 + 3) . ':H' . ($filaTitulo1 + 5))->applyFromArray(
        array(
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
            )
        )
    );


    $objPHPExcel->getActiveSheet()->getStyle('A4:H3000')->getAlignment()->setWrapText(true);

    $objPHPExcel->getActiveSheet()->getStyle('A' . $filacabecera . ':H' . $filacabecera)->applyFromArray($styleArray);

// Set page orientation and size

    $objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_PORTRAIT);
    $objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
    $objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);


    $objPHPExcel->getActiveSheet()->getStyle('A' . ($filaTitulo1 + 3) . ':F' . ($filasPiePagina))->getFont()->setSize(10);
    $objPHPExcel->getActiveSheet()->getStyle('G' . ($filaTitulo1 + 3) . ':H' . ($filasPiePagina))->getFont()->setSize(9);
    $objPHPExcel->getActiveSheet()->getStyle('A' . $filaTitulo1 . ':H' . ($filaTitulo1 + 2))->getFont()->setSize(14);
    // retorno ultima fila
    return $filasPiePagina + 9;
}
