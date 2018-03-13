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

        return 10759;

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

        return 1548;

    }
}