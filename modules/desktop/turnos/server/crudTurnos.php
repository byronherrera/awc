<?php
require_once '../../../../server/os.php';
require_once '../../../common/Classes/funciones.php';


$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}


function selectProcedimientosCadena($procLista)
{
    global $os;
    if (isset($procLista)) {
        $os->db->conn->query("SET NAMES 'utf8'");
        $sql = "SELECT amc_procedimientos.nombre FROM amc_procedimientos WHERE id in ( $procLista ) ORDER BY id";
        $result = $os->db->conn->query($sql);
        $data = array();

        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            $data[] = $row ['nombre'];
        }
        return implode(",\n", $data);
    } else {
        return '';
    }
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT amc_procedimientos.nombre FROM amc_procedimientos WHERE id in ( $procLista ) ORDER BY id";
    $result = $os->db->conn->query($sql);
    $data = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row ['nombre'];
    }
    return implode(",\n", $data);
}

function selectOperativos()
{
    global $os;
    //TODO cambiar columna por defecto en busquedas
    $columnaBusqueda = 'id';

    $where = '';
    $usuarioLog = $os->get_member_id();
    if (!isset($_POST['formularioBusqueda'])) {
        if (isset($_POST['accesosTurnos'])) {
            $accesosTurnos = $_POST['accesosTurnos'];
            if ($accesosTurnos == 'true')
                $where = " WHERE $usuarioLog = id_inspector ";
        }
    }


    /*    if (isset($_POST['accesosAdministradorIns'])) {
            $accesosTurnos = $_POST['accesosAdministradorIns'];
            if ($accesosTurnos == 'true')
                $where = " WHERE ($usuarioLog = id_persona or id_unidad = 3 ) ";
        }*/



    // se muestran todos los operativos
    if (isset($_POST['acceso'])) {
        $acceso = $_POST['acceso'];
        if ($acceso == 'false')
            $where = "";
        //$where = " WHERE $usuarioLog = id_persona ";
    }

    if (isset($_POST['filterField'])) {
        $columnaBusqueda = $_POST['filterField'];
    }

    if (isset($_POST['filterText'])) {
        $campo = $_POST['filterText'];
        $campo = str_replace(" ", "%", $campo);

        if ($columnaBusqueda == 'id_zonal') {
            $sql = "SELECT id FROM amc_zonas WHERE UPPER(nombre) like UPPER('%$campo%') LIMIT 1";
            $result = $os->db->conn->query($sql);
            $row = $result->fetch(PDO::FETCH_ASSOC);
            if (strlen($row['id']) > 0)
                $campo = $row['id'];
        }

        if ($columnaBusqueda == 'id_persona') {
            $sql = "SELECT id FROM qo_members WHERE UPPER(first_name) like UPPER('%$campo%') OR UPPER(last_name) like UPPER('%$campo%') OR UPPER(email_address) like UPPER('%$campo%') ";
            $result = $os->db->conn->query($sql);
            while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                if (strlen($row['id']) > 0) {
                    $campo = $row['id'];
                    if ($where == '')
                        $where = " WHERE $columnaBusqueda = '$campo'";
                    else
                        $where = $where . " OR $columnaBusqueda = '$campo'";
                }
            };
        } else {
            if ($where == '')
                $where = " WHERE $columnaBusqueda LIKE '%$campo%'";
            else
                $where = $where . " AND $columnaBusqueda LIKE '%$campo%'";
        }

    }

    if (isset($_POST['unidadfiltro'])) {
        $unidad = $_POST['unidadfiltro'];
        if ($where == '') {
            $where = "WHERE reasignacion = $unidad ";
        } else {
            $where = $where . " AND reasignacion = $unidad ";
        }
    }

    if (isset($_POST['finalizados'])) {
        if ($_POST['finalizados'] == 'true') {
            if ($where == '') {
                $where = " WHERE (estado = 1 OR estado = 4) ";
            } else {
                $where = $where . " AND (estado = 1 OR estado = 4) ";
            }
        }
    }

    if (isset ($_POST['start']))
        $start = $_POST['start'];
    else
        $start = 0;

    if (isset ($_POST['limit']))
        $limit = $_POST['limit'];
    else
        $limit = 100;

    $orderby = 'ORDER BY   fechaasignada  DESC';
    if (isset($_POST['sort'])) {
        if ($_POST['sort'] == 'id') {
            $orderby = 'ORDER BY CONVERT( id,UNSIGNED INTEGER) DESC';
        } else {
            $orderby = 'ORDER BY ' . $_POST['sort'] . ' ' . $_POST['dir'];
        }
    }

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
            $where = "WHERE id_zonal  = '$tipo' ";
        } else {
            $where = $where . " AND id_zonal = '$tipo' ";
        }
    }
    if (isset($_POST['busqueda_persona_encargada']) and ($_POST['busqueda_persona_encargada'] != '')) {
        $tipo = $_POST['busqueda_persona_encargada'];
        if ($where == '') {
            $where = "WHERE id_persona  like '%$tipo%' ";
        } else {
            $where = $where . " AND id_persona like '%$tipo%' ";
        }
    }
    if (isset($_POST['busqueda_estado']) and ($_POST['busqueda_estado'] != '')) {
        $tipo = $_POST['busqueda_estado'];
        if ($where == '') {
            $where = "WHERE estado = '$tipo' ";
        } else {
            $where = $where . " AND estado = '$tipo' ";
        }
    }
    if (isset($_POST['busqueda_tipo_operativo']) and ($_POST['busqueda_tipo_operativo'] != '')) {
        $tipo = $_POST['busqueda_tipo_operativo'];
        if ($where == '') {
            $where = "WHERE tipo_operativo = '$tipo' ";
        } else {
            $where = $where . " AND tipo_operativo = '$tipo' ";
        }
    }
    /*if (isset($_POST['busqueda_unidad_asignado']) and ($_POST['busqueda_unidad_asignado'] != '')) {
        $tipo = $_POST['busqueda_unidad_asignado'];
        if ($where == '') {
            $where = "WHERE id_unidad = $tipo ";
        } else {
            $where = $where . " AND id_unidad = $tipo ";
        }
    }*/
    /* if (isset($_POST['busqueda_finalizado']) and ($_POST['busqueda_finalizado'] != '')) {
         $tipo = $_POST['busqueda_finalizado'];
         if ($where == '') {
             $where = "WHERE finalizado = '$tipo' ";
         } else {
             $where = $where . " AND finalizado = '$tipo' ";
         }
     }*/
    if (isset($_POST['busqueda_informe']) and ($_POST['busqueda_informe'] != '')) {
        $tipo = $_POST['busqueda_informe'];
        if ($where == '') {
            $where = "WHERE (select count(*) from amc_agendar_cita_informes a WHERE (UPPER(a.administrado) like UPPER('%$tipo%') OR
            UPPER(a.direccion) like UPPER('%$tipo%') OR
            UPPER(a.hecho) like UPPER('%$tipo%') OR
            UPPER(a.medida) like UPPER('%$tipo%') OR
            UPPER(a.observaciones) like UPPER('%$tipo%')) AND
            a.id_operativo = amc_agendar_cita.id ) > 0 ";
        } else {
            $where = $where . " AND (select count(*) from amc_agendar_cita_informes a WHERE (UPPER(a.administrado) like UPPER('%$tipo%') OR
            UPPER(a.direccion) like UPPER('%$tipo%') OR
            UPPER(a.hecho) like UPPER('%$tipo%') OR
            UPPER(a.medida) like UPPER('%$tipo%') OR
            UPPER(a.observaciones) like UPPER('%$tipo%')) AND
            a.id_operativo = amc_agendar_cita.id ) > 0               ";
        }
    }


    if (isset($_POST['busqueda_observaciones']) and ($_POST['busqueda_observaciones'] != '')) {
        $tipo = $_POST['busqueda_observaciones'];
        if ($where == '') {
            $where = "WHERE ( upper( punto_encuentro_planificado ) like '%$tipo%'or
                        upper( zona ) like '%$tipo%'or
                        upper( observaciones ) like '%$tipo%'or
                        upper( parroquias ) like '%$tipo%'or
                        upper( barrios) like '%$tipo%') ";
        } else {
            $where = $where . "AND ( upper( punto_encuentro_planificado ) like '%$tipo%'or
                            upper( observaciones ) like '%$tipo%'or
                        upper( zona ) like '%$tipo%'or
                        upper( parroquias ) like '%$tipo%'or
                        upper( barrios) like '%$tipo%') ";
        }
    }

    if (isset($_POST['busqueda_personal_asignado']) and ($_POST['busqueda_personal_asignado'] != '')) {
        $tipo = $_POST['busqueda_personal_asignado'];
        if ($where == '') {
            $where = "WHERE (select count(*) from amc_agendar_cita_personal a where a.id_member = '$tipo' and a.id_operativo = amc_agendar_cita.id ) > 0 ";
        } else {
            $where = $where . " AND (select count(*) from amc_agendar_cita_personal a where a.id_member = '$tipo' and a.id_operativo = amc_agendar_cita.id ) > 0  ";
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
    $sql = "SELECT * FROM amc_agendar_cita $where $orderby LIMIT $start, $limit";
    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    };

    $sql = "SELECT count(*) AS total FROM amc_agendar_cita $where";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    $total = $row['total'];

    echo json_encode(array(
            "total" => $total,
            "success" => true,
            "data" => $data)
    );
}

function insertOperativos()
{
    global $os;

    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode(stripslashes($_POST["data"]));


    $data->finalizado = 'false';
    $data->codigo_operativo = generaCodigoProcesoOperativo();
    $data->id_persona = $os->get_member_id();
    //genero el listado de nombre de campos

    $cadenaDatos = '';
    $cadenaCampos = '';


    $datafecha_planificacion = date('Y-m-d\TH:i:s');

    // validar fechas de inicio .. si estan en null se le pone la fecha
    if (($data->fecha_planificacion == '') or !isset ($data->fecha_planificacion)) {
        // sin no esta deinida la fecha se pone fecha con la del dia
        $data->fecha_planificacion = date('Y-m-d\TH:i:s');
    }

    if (($data->fecha_inicio_planificacion == '') or !isset ($data->fecha_inicio_planificacion)) {
        // sin no esta deinida la fecha se pone fecha con la del dia
        $data->fecha_inicio_planificacion = date('Y-m-d\TH:i:s');
    }
    if (($data->fecha_fin_planificacion == '') or !isset ($data->fecha_fin_planificacion)) {
        // sin no esta deinida la fecha se pone fecha con la del dia
        $data->fecha_fin_planificacion = date('Y-m-d\TH:i:s');
    }

    foreach ($data as $clave => $valor) {
        if ($clave != 'id') {
            $cadenaCampos = $cadenaCampos . $clave . ',';
            $cadenaDatos = $cadenaDatos . "'" . $valor . "',";
        }
    }
    $cadenaCampos = substr($cadenaCampos, 0, -1);
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql = "INSERT INTO amc_agendar_cita($cadenaCampos) values($cadenaDatos);";
    $log = $sql;
    $sql = $os->db->conn->prepare($sql);
    $resultado = $sql->execute();

    $data->id = $os->db->conn->lastInsertId();
    // genero el nuevo codigo de proceso

    echo json_encode(array(
        "success" => $resultado,
        "msg" => $sql->errorCode() == 0 ? "insertado exitosamente" : $sql->errorCode(),
        "data" => array($data)
    ));

    $fichero = 'crudOperativos.log';
    $actual = file_get_contents($fichero);
    $actual .= $log . "\n";
    file_put_contents($fichero, $actual);
}

function generaCodigoProcesoOperativo()
{
    global $os;

    $usuario = $os->get_member_id();
    $os->db->conn->query("SET NAMES 'utf8'");
    $año = date('Y');
    $sql = "SELECT MAX(codigo_tramite) AS maximo FROM amc_denuncias WHERE  recepcion_documento > '" . $año . "-01-03 00:00:01'";

//    $sql = "SELECT MAX(codigo_operativo) AS maximo FROM amc_agendar_cita";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    if (isset($row['maximo'])) {
        $nuevoCodogo = $row['maximo'] + 1;
        return $nuevoCodogo;
    } else {
        // valor inicial proceso
        return 1;
    }
}

function updateOperativos()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $data = json_decode($_POST["data"]);


    // genero el listado de valores a insertar
    $cadenaDatos = '';
    foreach ($data as $clave => $valor) {
        if (isset($valor))
            $cadenaDatos = $cadenaDatos . $clave . " = '" . $valor . "',";
        else
            $cadenaDatos = $cadenaDatos . $clave . " = NULL, ";
    }
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql = "UPDATE amc_agendar_cita SET  $cadenaDatos  WHERE amc_agendar_cita.id = '$data->id' ";
    $sqlTest = $sql;
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Actualización en amc_agendar_cita actualizado exitosamente" : $sql->errorCode() . $sqlTest,
        "data" => array($data)
    ));

    // luego de grabar la información se envia el mail
    if (isset($data->estado)) {
        if (($data->estado === "2") || ($data->estado === "3") || ($data->estado === "5")) {
            // en caso que se enviado el email, previamente
            if (verificaEnvioEmail($data->id)) {
                $fechaActual = date('d-m-Y H:i:s');
                $funcionario = $data->id_persona;


                // pedimos listado de funcionarios que van al mismo operativo
                // cargar en un array el listado
                //$listado = getListdoFuncionariosOperativo($data->id);
                $listado = array();

                $personasEnvioEmail[] = regresaEmail($funcionario);
                $personasEnvioEmail[] = regresaEmail($funcionario);

                $mensaje = getmensaje(regresaNombre($funcionario), $data->resltados, $data->fechaasignada, regresaNombre($funcionario), $fechaActual);

                $email = regresaEmail($funcionario);
                $asunto = "Turno atendido, " . " - " . regresaEmail($funcionario);
                $resultado = enviarEmail($email, $asunto, $mensaje, $personasEnvioEmail);
                if ($resultado) {
                    $sqlUpdate = "UPDATE `amc_agendar_cita` SET `mail_enviado` = 1, WHERE `id` = " . $data->id;
                    $sql = $os->db->conn->prepare($sqlUpdate);
//                    $sql->execute();
//                    $data->mail_enviado = '1';
                }
            }
        }
    };
}

function selectOperativosForm()
{
    global $os;
    $id = (int)$_POST ['id'];
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM amc_agendar_cita WHERE id = $id";
    $result = $os->db->conn->query($sql);
    $data = array();
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $data = $row;
    }
    echo json_encode(array(
            "success" => true,
            "data" => $data)
    );
}

function updateOperativosForm()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $id = $_POST["id"];

    $detalle = $_POST["resultados"];
    $id_ordenanza = $_POST["id_ordenanza"];

    $sql = "UPDATE `amc_agendar_cita` SET `resultados`='$detalle'  , id_ordenanza = '$id_ordenanza'  WHERE (`id`='$id')";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Contenido actualizado exitosamente" : $sql->errorCode()
    ));
}

function deleteOperativos()
{
    global $os;
    $id = json_decode(stripslashes($_POST["data"]));
    $sql = "DELETE FROM amc_agendar_cita WHERE id = $id";
    $log = $sql;
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();
    echo json_encode(array(
        "success" => $sql->errorCode() == 0,
        "msg" => $sql->errorCode() == 0 ? "Ubicación en amc_agendar_cita, eliminado exitosamente" : $sql->errorCode()
    ));

    $log = $os->get_member_id() . "-" . $log;

    $fichero = 'crudOperativos.log';
    $actual = file_get_contents($fichero);
    $actual .= $log . "\n";
    file_put_contents($fichero, $actual);
}

switch ($_GET['operation']) {
    case 'select' :
        selectOperativos();
        break;
    case 'insert' :
        insertOperativos();
        break;
    case 'update' :
        updateOperativos();
        break;
    case 'selectForm' :
        selectOperativosForm();
        break;
    case 'updateForm' :
        updateOperativosForm();
        break;
    case 'delete' :
        deleteOperativos();
        break;
}
function validarCedulaCorreo($id)
{
    // true en caso que no exista ni correo ni cedula
    // false  en caso que exista correo y cedula
    //return false;

    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT cedula, email FROM amc_agendar_cita WHERE id = $id";
    $result = $os->db->conn->query($sql);

    $row = $result->fetch(PDO::FETCH_ASSOC);
    if ((strlen($row['cedula']) == 0) or (strlen($row['email']) == 0)) {
        return true;
    } else {
        return false;
    }
}


function getmensaje($nombre = '', $acuerdos = '', $fecha = '', $nombreInspector = '', $fechaInforme = '')
{
    $texto = '<div style="font-family: Arial, Helvetica, sans-serif;">
                <div style="float: right; clear: both; width: 100%;"><img style="float: right;" src="http://agenciadecontrol.quito.gob.ec/images/logoamc.png" alt="" width="30%" /></div>
                <div style="clear: both; margin: 50px 10%; float: left;">
                <p><br><br>
                 Estimado, ' . $nombre . ' <br>
                 <br>
                 En la reunión realizada el día ' . $fecha . ' , se llegó a los siguientes acuerdos:
                 <br>
                 ' . $acuerdos . '
                 <br>
                 <br>
                 Favor revisarlos y en caso que tenga alguna duda favor volver a comunicarse con el sr/sra Inspector
                <br>


                <br>

                <br>

                <p>Fecha : ' . $fechaInforme . '</p>
                <p>Atentamente </p>
                
                <p></p>
                <p>GAD MDMQ AGENCIA METROPOLITANA DE CONTROL</p>
                <p></p>
                

                </div>
                <p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://agenciadecontrol.quito.gob.ec/images/piepagina.png" alt="" width="100%" /></p>
                </div>
                ';
    return $texto;
}

function enviarEmail($email, $nombre, $mensaje, $personasEnvioEmail)
{
    $config = new config();

    require '../../../common/Classes/PHPMailer/PHPMailerAutoload.php';
    //Create a new PHPMailer instance
    $mail = new PHPMailer;
    $mail->CharSet = "UTF-8";
    $mail->isSMTP();
    $mail->SMTPDebug = 0;
    $mail->Debugoutput = 'html';
    $mail->Host = 'relay.quito.gob.ec';
    $mail->Port = 25;
    $mail->Username = "agencia.m.control@quito.gob.ec";
    $mail->Password = "12345678";

    /*    $mail->Host = 'smtp.gmail.com';
        $mail->Port = 587;
        $mail->SMTPSecure = 'tls';
        $mail->SMTPAuth = true;
        $mail->Username = "amcdenuncias@gmail.com";
        $mail->Password = "amccontrol2016";
    */
    $mail->setFrom('agencia.m.control@quito.gob.ec', 'Agencia Metropolitana de Control');

    $mail->AddBCC("byron.herrera@quito.gob.ec");
    $mail->AddBCC("carlos.mafla@quito.gob.ec");
    //$mail->AddBCC("galo.salazar@quito.gob.ec");
    //$mail->AddBCC("eduardo.chicaiza@quito.gob.ec");


    $mail->Subject = $nombre;
    $mail->msgHTML($mensaje);
    $mail->AltBody = 'Mensaje enviado';

    // se envia de acuerdo a si es produccion o pruebas
    if ($config->AMBIENTE == "PRODUCCION") {
        $mail->addAddress($email);
        foreach ($personasEnvioEmail as $emailfuncionario) {
            $mail->AddCC($emailfuncionario);
        }
    } else {
        $mail->addAddress("byron.herrera@quito.gob.ec");
    }

    $resultado = $mail->send();

    $fichero = 'OperativosEmailEnviados.log';
    $actual = file_get_contents($fichero);
    if ($resultado) {
        $actual .= "Enviado -" . date(" Y-m-d ") . "\n----\n";
    } else
        $actual .= "Error-" . date(" Y-m-d ") . "\n----\n";

    $actual .= $email . "\n----\n";
    $actual .= $nombre . "\n----\n";
    $actual .= $mensaje . "\n----\n";
    file_put_contents($fichero, $actual);

    return $resultado;

}


function verificaEnvioEmail($id)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT mail_enviado FROM amc_agendar_cita WHERE id= $id";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);

    if ($row['mail_enviado'] == "0") {
        return true;
    } else
        return false;
}

function nombreEstado($data)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    $sql = "SELECT nombre FROM amc_agendar_cita_estados WHERE id = " . $data;
    $nombre = $os->db->conn->query($sql);

    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['nombre'];

}

