<?php
require_once '../../server/os.php';
require_once '../../modules/common/Classes/funciones.php';
$os = new os();

genSecuencial();
function genSecuencial()
{
    // Tipo de errores
    // 1. Error base de datos
    // 2. Error usuario no encontrado
    // 3. Error usuario no asignado a zonal
    // 4. Error usuario no asignado a unidad
    // 5. Error al obtener la secuencia
    // 6. Clave erronea

    $resp = getResultado();

    //$error = "Error base de datos";

    if ($resp["codError"] == 0) {
        echo json_encode(array(
            "success" => true,
            "data" => $resp["valorResultado"]
        ));
    } else {
        echo json_encode(array(
            "success" => false,
            "data" => $resp,
            "msg" => $resp["mensaje"]
        ));
    }
}

function getResultado()
{
    $respFormato = getFormato();
    if($respFormato["codError"] != 0){
        return $respFormato;
    }
    $year = getYear();
    $respSecuencia = getSecuencia($year,$respFormato["idZonal"],$respFormato["idFuncionario"]);
    if($respSecuencia["codError"] == 0){
        $respSecuencia = array("codError" => 0, "mensaje" => "OK", "valorResultado" => $respFormato["valorFormato"]."-".$year."-".$respSecuencia["valorSecuencia"]);
    }
    return $respSecuencia;
}

function getFormato()
{
    global $os;
    $os->load('member');
    // TODO valida con la contraseña
    $resp = getIdZonal();
    if($resp["codError"] != 0){
        return $resp;
    }
    $resp = array("codError" => 0, "mensaje" => "OK","idFuncionario"=>$resp["idFuncionario"],"idZonal" => $resp["valorZonal"], "valorFormato" => "GADDMQ-AMC-".$resp["valorZonal"]."-APP");
    return $resp;
}

function getIdUnidad () {
    global $os;
    $os->load('member');
    // TODO valida con la contraseña
    $resp = getIdFuncionario();
    $unidad = $os->get_unidad_id ($resp["valorFuncionario"]);
    if(!isset($unidad)){
        $resp = array("codError" => 4, "mensaje" => "No existe la unidad...");
        return $resp;
    }
    $resp = array("codError" => 0, "mensaje" => "OK", "valorUnidad" => $unidad);
    return $resp;
}

function getIdZonal () {
    global $os;
    $os->load('member');
    // TODO PARA VALIDAR CON LA CONTRAÑA
    $resp = getIdFuncionario();
    if($resp["codError"] != 0){
        return $resp;
    }
    $zonal= $os->get_zonal_id($resp["valorFuncionario"]);
    if(!isset($zonal)){
        $resp = array("codError" => 3, "mensaje" => "No existe la zonal...");
        return $resp;
    }
    $resp = array("codError" => 0, "mensaje" => "OK","idFuncionario"=>$resp["valorFuncionario"], "valorZonal" => $zonal);
    return $resp;
}

function getIdFuncionario () {
    global $os;
    $email = $_GET['email'];
    $pass = $_GET['password'];
    $os->load('member');
    $member_id = $os->member->get_id_email($email);
    if(!isset($member_id) ){
        $resp = array("codError" => 2, "mensaje" => "No existe el usuario...");
        return $resp;
    }
    $resp = array("codError" => 0, "mensaje" => "OK", "valorFuncionario" => $member_id);
    return $resp;
}

function getYear()
{
    return date("Y");
}

function getUsuario()
{
    global  $os;
    $os->load('session');
    $idUsuario = $os->get_member_id();
    return $idUsuario;
}

function getSecuencia($year,$idZonal,$idFuncionario)
{
    global  $os;
    $os->load('amc');

    $tipoDocumento = $_GET['tipo_documento'];

    $idUnidad = getIdUnidad()["valorUnidad"];
    $unidad = $os->amc->get_unidad_by_id($idUnidad);

    $zonal = $os->amc->get_zona_by_id($idZonal);;

    $nombreFuncionario = regresaNombre($idFuncionario);

    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT secuencial FROM amc_secuenciales WHERE id_unidad = $idUnidad AND tipo_documento = $tipoDocumento AND anio=$year;";

    $result = $os->db->conn->query($sql);
    // TODO VALIDAR CUANDO ES AÑO NUEVO
    $resultado = $result->fetchAll(PDO::FETCH_ASSOC);

    if( $resultado[0]['secuencial'] == 0){
        $sql = "INSERT INTO  amc_secuenciales (id_unidad
                                             ,unidad
                                             ,id_zonal
                                             ,zonal
                                             ,tipo_documento
                                             ,id_usuario
                                             ,usuario
                                             ,anio
                                             ,secuencial
                                             ,fecha_secuencia
                                             ,creado ) VALUES ($idUnidad
                                             ,'$unidad'
                                             ,$idZonal
                                             ,'$zonal'
                                             ,$tipoDocumento
                                             ,$idFuncionario
                                             ,'$nombreFuncionario'
                                             ,$year
                                             ,1
                                             ,NOW()
                                             ,NOW()
                                             );";

        $sql = $os->db->conn->prepare($sql);
        $sql->execute();

        if ($sql->errorCode() != 0 ){
            //$resp = array("codError" => 1, "mensaje" => "Error al crear el secuencial..."." ".$sql->errorInfo()[2]);
            $resp = array("codError" => 1, "mensaje" => "Error al crear el secuencial..."." ".$sql->errorCode());
            return $resp;
        }
    }

    $nuevoNumeroSecuencial = $resultado[0]['secuencial']+1;
    $formatted_secuencial = sprintf("%05d", $nuevoNumeroSecuencial);

    $resp = actualizarSecuencial ($idUnidad, $tipoDocumento, $year, $nuevoNumeroSecuencial, $idFuncionario, $nombreFuncionario );
    if($resp["codError"] == 0){
        $resp = array("codError" => 0, "mensaje" => "OK", "valorSecuencia" => $formatted_secuencial);
    }
    return $resp;
}

function actualizarSecuencial ($idUnidad, $tipoDocumento, $year ,$nuevoNumeroSecuencial, $idFuncionario, $nombreFuncionario ) {
    global $os;

    $sql = "UPDATE `procesos-amc`.`amc_secuenciales` SET `secuencial` = $nuevoNumeroSecuencial,  id_usuario = $idFuncionario, usuario = '$nombreFuncionario', fecha_secuencia= NOW()".
           " WHERE id_unidad = $idUnidad AND tipo_documento = $tipoDocumento AND anio=$year;";
    $sql = $os->db->conn->prepare($sql);
    $sql->execute();

    if ($sql->errorCode() != 0 ){
        $resp = array("codError" => 1, "mensaje" => "Error al actualizar el secuencial..."." ".$sql->errorCode());
    }else {
        $resp = array("codError" => 0, "mensaje" => "OK");
    }

    return $resp;
}
