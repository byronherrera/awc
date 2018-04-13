<?php
/**
 * Created by PhpStorm.
 * User: Carlos Cevallos
 * Date: 02/02/2018
 * Time: 9:57
 */
//generaCodigoProcesoDenuncia

function generaNuevoCodigoTramiteUnico()
{
    global $os;

    $usuario = $os->get_member_id();
    $os->db->conn->query("SET NAMES 'utf8'");
    //$sql = "SELECT MAX(codigo_tramite) AS maximo FROM amc_denuncias";
    $sql = "SELECT MAX(codigo_tramite) AS maximo FROM amc_denuncias WHERE recepcion_documento > DATE('2018-01-09 17:20:01')";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    if (isset($row['maximo'])) {
        $nuevoCodogo = $row['maximo'] + 1;
        return $nuevoCodogo;
    } else {
        // valor inicial proceso

        return 11759;

    }
}

function generaNuevoCodigoInspeccion()
{
    global $os;

    $usuario = $os->get_member_id();
    $os->db->conn->query("SET NAMES 'utf8'");
    //$sql = "SELECT MAX(codigo_tramite) AS maximo FROM amc_denuncias";
    $sql = "SELECT MAX(id_inspeccion) AS maximo FROM amc_inspeccion WHERE fecha_recepcion_documento > DATE('2018-01-01 01:01:01')";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    if (isset($row['maximo'])) {
        $nuevoCodogo = $row['maximo'] + 1;
        return $nuevoCodogo;
    } else {
        // valor inicial proceso
        return 1648;
    }
}

function generaNuevoCodigoConstrucciones()
{
    global $os;

    $usuario = $os->get_member_id();
    $os->db->conn->query("SET NAMES 'utf8'");
    //$sql = "SELECT MAX(codigo_tramite) AS maximo FROM amc_denuncias";
    $sql = "SELECT COUNT(num_nio) AS cant_nio FROM amc_inspeccion_nio WHERE fecha_ingreso > '" .date("Y"). "-01-01 01:01:01';";
    $result = $os->db->conn->query($sql);
    $row1 = $result->fetch(PDO::FETCH_ASSOC);

    $sql = "SELECT COUNT(id_ccf) AS cant_ccf FROM amc_inspeccion_ccf WHERE fecha_recepcion_documento > '" .date("Y"). "-01-01 01:01:01';";
    $result = $os->db->conn->query($sql);
    $row2 = $result->fetch(PDO::FETCH_ASSOC);

    if (isset($row1['cant_nio'])||($row2['cant_ccf'])) {
        /*
        if(($row1['maximo_nio'])>($row2['maximo_ccf'])){
            $nuevoCodigo = $row1['maximo_nio'] + 1;
        }else{
            $nuevoCodigo = $row2['maximo_ccf']+ 1;
        }
        */
        $nuevoCodigo = $row1['cant_nio'] + $row2['cant_ccf'] + 1;
         return $nuevoCodigo;
    } else {
        // valor inicial proceso
        return 134;
    }
}

function generaNuevoCodigoControlProgramado ()
{
    global $os;

    $usuario = $os->get_member_id();
    $os->db->conn->query("SET NAMES 'utf8'");
    //$sql = "SELECT MAX(codigo_tramite) AS maximo FROM amc_denuncias";
    $sql = "SELECT COUNT(gdoc) AS cant_cp FROM amc_inspeccion_control_programado WHERE fecha_recepcion_documento > '" .date("Y"). "-01-01 01:01:01';";
    $result = $os->db->conn->query($sql);
    $row = $result->fetch(PDO::FETCH_ASSOC);
    if (isset($row['cant_cp'])) {
        $nuevoCodigo = $row['cant_cp'] + 1;
        return $nuevoCodigo;
    } else {
        // valor inicial proceso
        return 1;
    }

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
