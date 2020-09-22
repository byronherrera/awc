<?php
require_once '../../../../server/os.php';
$os = new os();

// activa acceso de data
header("Access-Control-Allow-Origin: *");
$listaFuncionarios = getrecordatoriosUsuario();
//echo $listaFuncionarios;
foreach ($listaFuncionarios as $funcionario) {
    foreach ($funcionario as $key => $value) {
        if($key=='funcionario'){
            //echo $value;
            $nombresUsuarios=getIdUsuario($value);
            foreach ($nombresUsuarios as $usuario) {
                array_push($funcionario, $usuario);
                foreach ($usuario as $clave => $valor) {
                    //$datosMail[$clave] = $valor;
                    //$datosMail[$key] = $value;
                    if($clave=='nombre')
                        $nombreFuncionario= $valor;
                    if($clave=='email_address')
                        $emailFuncionario= $valor;
                }
            }
        }
        if($key=='numero_expediente')
            $detalleMail= $value;
    }
//    echo $nombreFuncionario;
//    echo $emailFuncionario;
//    echo $detalleMail;
    envioEmailResolucion($nombreFuncionario,$detalleMail,$emailFuncionario);
//    $output = implode(', ', array_map(
//        function ($v, $k) { return sprintf("%s='%s'", $k, $v); },
//        $datosMail,
//        array_keys($datosMail)
//    ));
//    echo $output;
}

function getrecordatoriosUsuario()
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT funcionario, numero_expediente 
            FROM amc_libro_diario 
            WHERE DATEDIFF(CURDATE(),fecha_ultima_notificacion) IN (24,23,22)";

    $result = $os->db->conn->query($sql);
    if ($result) {
        $resultado = $result->fetchAll(PDO::FETCH_ASSOC);
    }
    if (count($resultado) > 0) {
        return ($resultado);
    } else {
        return '["funcionario": "", "numero_expediente": ""]';
    }
}

function getIdUsuario($idFuncionario)
{
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT CONCAT(first_name,' ',last_name) AS nombre, email_address  FROM `qo_members` WHERE active = 1 AND id = '$idFuncionario' LIMIT 1;";
    $result = $os->db->conn->query($sql);
    $resultado = $result->fetchAll(PDO::FETCH_ASSOC);
    return $resultado;
    //echo json_encode($resultado);
}

function envioEmailResolucion($funcionario,$detalle,$email)
{
    // envio de notificacion a usuario asignado
        $fechaActual = date('d-m-Y H:i:s');
//        $detalle = "<table border='1'>" .
//            "<tr><td>TEMA</td><td>ESTADO</td><td>DETALLE AVANCE</td><td>SEMAFORO</td><td>VALOR</td><td>FECHA ENTREGA</td></tr>" .
//            "<tr>" .
//            "<td>" . $data->tema . "</td>" .
//            "<td>" . $data->estado . "</td>" .
//            "<td>" . $data->detalle_avance . "</td>" .
//            "<td>" . $data->semaforo . "</td>" .
//            "<td>" . $data->valor . "</td>" .
//            "<td>" . $data->fecha_entrega . "</td>" .
//            "</tr></table>";
        $mensaje = getmensajeRecordatoriosResolucion($funcionario, $detalle, $fechaActual);

        $asunto = "Alerta Resolución, " . " - " . $detalle;
        //$funcionarios = ["byron.herrera@quito.gob.ec", "byronherrera@hotmail.com"];
        //$funcionariosSeguimiento = ["carlos.cevallos@quito.gob.ec"];
        $funcionariosSeguimiento = [""];
        $from = 'Resolución - Agencia Metropolitana de Control';
        $prueba = true;
        $resultado = enviarEmailAmc($email, $asunto, $mensaje, $funcionario, $funcionariosSeguimiento, $from, $prueba);
}

function getmensajeRecordatoriosResolucion($nombre = '', $detalle = '', $fecha = '')
{
    $texto = '<div style="font-family: Arial, Helvetica, sans-serif;">
                <div style="float: right; clear: both; width: 100%;"><img style="float: right;" src="http://agenciadecontrol.quito.gob.ec/images/logoamc.png" alt="" width="30%" /></div>
                <div style="clear: both; margin: 50px 10%; float: left;">
                <p><br><br>
                 Estimado, ' . $nombre . ' el siguiente expediente está a punto de cumplir más de 24 días después de haber sido enviada la notificación:<br>
                 <br>
                 ' . $detalle . '
                 <br>
                 
                <br>

                <br>
                 Por favor gestionar los expedientes en el modulo de Resolución: <a href="http://amcmatis.quito.gob.ec/procesos-amc">aquí</a> .
                <br>    
                <br>    

                <p>Fecha : ' . $fecha . '</p>
                <p>Atentamente </p>
                
                <p>DIRECCIÓN DE RESOLUCIÓN</p>
                <p>GAD MDMQ AGENCIA METROPOLITANA DE CONTROL</p>
                <p></p>
                <p>IMPORTANTE</p>
                <p>************************************************</p>
                <p>- No responder este correo es un Mensaje Automático.</p>
                

                </div>
                <p><img style="display: block; margin-left: auto; margin-right: auto;" src="http://agenciadecontrol.quito.gob.ec/images/piepagina.png" alt="" width="100%" /></p>
                </div>
                ';
    return $texto;
}

