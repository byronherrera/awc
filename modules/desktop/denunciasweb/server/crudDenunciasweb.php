<?php

require_once '../../../../server/os.php';
require_once '../../../common/Classes/funciones.php';

$os = new os();
if (!$os->session_exists()) {
    die('No existe sesión!');
}

function aprobarDenuncia()
{
    global $os;

    $os->db->conn->query("SET NAMES 'utf8'");

    $data = json_decode('{}');
    $data->codigo_tramite = generaCodigoProcesoDenuncia();
    $data->id_persona = $os->get_member_id();
    $data->recepcion_documento = $_POST["fecha"];
    $data->id_tipo_documento = 1;
    $data->num_documento = "Denuncia web - " . $_POST["id"];
    $data->remitente = $_POST["nombre"] . ' ' . $_POST["apellido"];

    $data->asunto = $_POST["ampliaciondenuncia"];

    // se deja quemado que se envia a inspeccion
    $data->reasignacion = 3;

    $data->descripcion_anexos = 'Denuncia Web, ' . addslashes($_POST["urldenuncia"]);
    $data->id_caracter_tramite = 1;
    $data->cedula = $_POST["cedula"];
    $data->email = $_POST["email"];
    //indicamos que la denuncia fue reciida en la matriz EUGENIO ESPEJO por la unidad de secretaria

    $data->id_zonal_origen = 10;
    $data->id_unidad_origen = 2;

    $data->direccion_denuncia = $_POST["direcciondenunciado"];
    $data->georeferencia = $_POST["geoposicionamiento2"];

    //genero el listado de nombre de campos

    $cadenaDatos = '';
    $cadenaCampos = '';
    foreach ($data as $clave => $valor) {
        $cadenaCampos = $cadenaCampos . $clave . ',';
        $valor = str_replace("'", "", $valor);
        $cadenaDatos = $cadenaDatos . "'" . $valor . "',";
    }
    $cadenaCampos = substr($cadenaCampos, 0, -1);
    $cadenaDatos = substr($cadenaDatos, 0, -1);

    $sql = "INSERT INTO amc_denuncias($cadenaCampos)
	values($cadenaDatos);";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    $data->id = $os->db->conn->lastInsertId();
    // genero el nuevo codigo de proceso

    $mensajeEnvio = enviarMensajeAprobado();
    echo json_encode(array(
        "success" => true,
        "msg" => $mensajeEnvio . $sql->errorCode() == 0 ? "insertado exitosamente" : $sql->errorCode() ,
        "data" => $data->codigo_tramite
    ));
}

//enviarEmailAmc($email, $nombre, $mensaje, $funcionariosCC, $funcionariosBCC=[], $from = 'Agencia Metropolitana de Control', $prueba = false)

function enviarMensajeNegado()
{
    $motivoNegarDenuncia = $_POST ['motivoNegarDenuncia'];


    $email = regresaEmail($_POST ['email']);
    $mensaje = getmensaje('negar', '', '', '', $motivoNegarDenuncia);

    $asunto = "Actualización estado de denuncia" . " - " . $email;
    $funcionarios = ['juan.toscano@quito.gob.ec'];
    $funcionariosSeguimiento = ["nelly.carrera@quito.gob.ec", "byron.herrera@quito.gob.ec"];
    $prueba = true;
    $envioMail = enviarEmailAmc($email, $asunto, $mensaje, $funcionarios, $funcionariosSeguimiento, '', $prueba);

    return $envioMail;
}

function enviarMensajeAprobado()
{
    $id = (int)$_POST ['id'];
    $codigo_tramite = $_POST ['codigo_tramite'];

    $mensaje = getmensaje('aprobar', $_POST ['nombre'], $codigo_tramite, $id);
    $envioMail = enviarEmailAmc($_POST ['email'], $_POST ['nombre'] . ' ' . $_POST ['apellido'], $mensaje);

    return $envioMail;
}

function getmensaje($opcion, $nombre = '', $codigo_tramite = '', $id = '', $motivo = '')
{
    switch ($opcion) {
        case 'aprobar' :
            $texto = '<div style="font-family: Arial, Helvetica, sans-serif;">
                    <div style="float: right; clear: both; width: 100%;"><img style="float: right;" src="http://agenciadecontrol.quito.gob.ec/images/logoamc.png" alt="" width="30%" /></div>
                    <div style="clear: both; margin: 50px 10%; float: left;">
                    <p><br><br>
                     Estimado ciudadano gracias por escribirnos, su denuncia fue revisada y ha sido ingresada correctamente en nuestro sistema con el código ' . $codigo_tramite . '<br>
                     <br>
                     En el siguiente link, usted  podrá hacer el seguimiento del proceso.<br>
                     <a href="http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/' . $id . '-' . $nombre . '" target="_blank">Click aquí</a>
                    <br>    
                    <br>
                    </p>
                    <p>&nbsp;</p>
                    <p>&iexcl;Trabajamos por la convivencia pac&iacute;fica!</p>
                    </div>
                    <p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://agenciadecontrol.quito.gob.ec/images/piepagina.png" alt="" width="100%" /></p>
                    </div>
                    ';
            return $texto;
            break;
        case 'negar' :
            $texto = '<div style="font-family: Arial, Helvetica, sans-serif;">
                    <div style="float: right; clear: both; width: 100%;"><img style="float: right;" src="http://agenciadecontrol.quito.gob.ec/images/logoamc.png" alt="" width="30%" /></div>
                    <div style="clear: both; margin: 50px 10%; float: left;">
                    <p>Estimado usuario gracias por escribirnos, su denuncia no es aprobada por el siguiente motivo: <br><br> 
                    <span style="font-weight: bold"> ' . $motivo . '</span><br><br> 
                    Adicionalmente estas son las causas para no aprobar una denuncia: <br><br>
                    
                    1. Imagen de la cédula, no válida<br>
                    2. Fotografías anexas a la denunciada no son válidas.<br>
                    3. En caso de ser una persona jurídica, la  imagen de nombramiento no es válida.<br>
                    4. La denuncia realizada no se encuentra dentro de las competencias de la Agencia Metropolitana de Control.<br>
                    5. La informacíon proporcianada como dirección, croquis, mapa, no permite ubicar el sitio de la denuncia<br>
                    <br>
                    <br>
                    </p>
                    <p>&nbsp;</p>
                    <p>&iexcl;Trabajamos por la convivencia pac&iacute;fica!</p>
                    </div>
                    <p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://agenciadecontrol.quito.gob.ec/images/piepagina.png" alt="" width="100%" /></p>
                    </div>';
            return $texto;
            break;
    }
}


switch ($_GET['operation']) {
    case 'aprobarDenuncia' :
        aprobarDenuncia();
        break;
        case 'negarDenuncia' :
        negarDenuncia();
        break;
    case 'negarDenunciaAmc' :
        enviarMensajeNegado();
        break;
    case 'aprobarDenunciaAmc' :
        enviarMensajeAprobado();
        break;
}
