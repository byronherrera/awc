<?php
/**
 * Created by PhpStorm.
 * User: cdbastidas
 * Date: 16/11/2020
 * Time: 15:16
 */
require_once '../../../../server/os.php';
require_once '../../../common/Classes/funciones.php';
require '../../../../includes/vendor/autoload.php';
use Kreait\Firebase\Factory;
require_once 'firestore.php';

function migrar(){
    $data = [];
    $fs = new Firestore('formulario');
    $query= $fs->getAll();

    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");

    foreach ($query as $key => $valor) {
        $id = $key;

        if (validaRegistro($id)){
            $valor['aislamiento_obligatorio'] =  ($valor['aislamiento_obligatorio'])  ? 'SI' :  'NO';
            $valor['conductorSinMascarilla'] =  ($valor['conductorSinMascarilla'])  ? 'SI' :  'NO';
            $valor['infraccionSinMascarilla'] =  ($valor['infraccionSinMascarilla'])  ? 'SI' :  'NO';
            $valor['infraccionSinMascarilla2'] =  ($valor['infraccionSinMascarilla2'])  ? 'SI' :  'NO';
            $valor['infraccioncedula'] =  ($valor['infraccioncedula'])  ? 'SI' :  'NO';
            $valor['infracciondistancia'] =  ($valor['infracciondistancia'])  ? 'SI' :  'NO';
            $valor['sancion_25_SMU'] =  ($valor['sancion_25_SMU'])  ? 'SI' :  'NO';
            $valor['sancion_50_SMU'] =  ($valor['sancion_50_SMU'])  ? 'SI' :  'NO';
            $valor['sancion_tres_salarios'] =  ($valor['sancion_tres_salarios'])  ? 'SI' :  'NO';
            $valor['sancion_un_salario_medio'] =  ($valor['sancion_un_salario_medio'])  ? 'SI' :  'NO';

            $sql = "INSERT INTO amc_actos_inicios (id_hash
                                              ,aislamiento_obligatorio
                                              ,cedula
                                              ,conductorSinMascarilla
                                              ,direccionDomicilio
                                              ,direccionInfraccion
                                              ,direccionTrabajo
                                              ,email
                                              ,fechaInfraccion
                                              ,foto
                                              ,foto1
                                              ,foto2
                                              ,hechosInfraccion
                                              ,horaInfraccion
                                              ,infraccionSinMascarilla
                                              ,infraccionSinMascarilla2
                                              ,infraccioncedula
                                              ,infracciondistancia
                                              ,nombres
                                              ,sancion_25_SMU
                                              ,sancion_50_SMU
                                              ,sancion_tres_salarios
                                              ,sancion_un_salario_medio
                                              ,telefonoCelular
                                              ,telefonoFijo)
	            VALUES( "."'".$id."'".","
                ."'".$valor['aislamiento_obligatorio']."'".","
                ."'".$valor['cedula']."'".","
                ."'".$valor['conductorSinMascarilla']."'".","
                ."'".$valor['direccionDomicilio']."'".","
                ."'".$valor['direccionInfraccion']."'".","
                ."'".$valor['direccionTrabajo']."'".","
                ."'".$valor['email']."'".","
                ."'".$valor['fechaInfraccion']."'".","
                ."'".$valor['foto']."'".","
                ."'".$valor['foto1']."'".","
                ."'".$valor['foto2']."'".","
                ."'".$valor['hechosInfraccion']."'".","
                ."'".$valor['horaInfraccion']."'".","
                ."'".$valor['infraccionSinMascarilla']."'".","
                ."'".$valor['infraccionSinMascarilla2']."'".","
                ."'".$valor['infraccioncedula']."'".","
                ."'".$valor['infracciondistancia']."'".","
                ."'".$valor['nombres']."'".","
                ."'".$valor['sancion_25_SMU']."'".","
                ."'".$valor['sancion_50_SMU']."'".","
                ."'".$valor['sancion_tres_salarios']."'".","
                ."'".$valor['sancion_un_salario_medio']."'".","
                ."'".$valor['telefonoCelular']."'".","
                ."'".$valor['telefonoFijo']."'".");";
            $sql = $os->db->conn->prepare($sql);
            $sql->execute();

            echo json_encode(array(
                "success" => true,
                "msg" => $sql->errorCode() == 0 ? "insertado exitosamente: ".$id : $sql->errorCode(),
            ));
        } else {
            echo json_encode(array(
                "success" => true,
                "msg" => "Ya esta insertado: ".$id,
            ));
        }
    }
}


function validaRegistro ($id_hash){
    $pasaValidacion = true;
    global $os;
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT COUNT(*) AS valor FROM amc_actos_inicios WHERE id_hash = '$id_hash' ";
    $result = $os->db->conn->query($sql);
    $rowValor = $result->fetch(PDO::FETCH_ASSOC);
    $valor = $rowValor['valor'];
    if($valor > 0){
        $pasaValidacion = false;
    }
    return $pasaValidacion;
}