<?php
/*
 * qWikiOffice Desktop 1.0
 * Copyright(c) 2007-2010, Murdock Technologies, Inc.
 * licensing@qwikioffice.com
 *
 * http://www.qwikioffice.com/license
 */

class amc
{

    private $os;

    /**
     * __construct()
     *
     * @access public
     * @param {class} $os The os.
     */
    public function __construct($os)
    {
        $this->os = $os;
    } // end __construct()


    /**
     * exists() Returns true/false depending on if the session is found.
     *
     * @access public
     * @param $session_id string
     * @return {boolean}
     */
    public function exists()
    {
        $session_id = $this->get_id();

        if ($session_id != '') {
            // query the db for the session id
            $sql = "select
            qo_members_id
            from
            qo_sessions
            where
            id = '" . $session_id . "'";

            $result = $this->os->db->conn->query($sql);
            if ($result) {
                $row = $result->fetch(PDO::FETCH_ASSOC);
                if ($row) {
                    if ($row['qo_members_id'] != '') {
                        return true;
                    }
                }
            }
        }

        return false;
    } // end exists()

    /**
     * get_zonal_id() Returns the member's group id for this session.
     *
     * @access public
     * @return {integer}
     */
    public function get_zonal_id($member_id = '')
    {
        $session_id = $this->get_id();
        // recupero el grupo de la sesion activa

        if ($member_id == '') {
            $sql = "SELECT
                     amc_unidades.id_zonal
                     FROM
                     qo_groups
                     INNER JOIN amc_unidades ON qo_groups.id_unidad = amc_unidades.id
                     WHERE
                     qo_groups.id = (select
                                     qo_groups_id as id
                                     from
                                     qo_sessions
                                     where
                                     id ='" . $session_id . "' )";

        } else {
            $sql = "SELECT
                     amc_unidades.id_zonal
                     FROM
                     qo_groups
                     INNER JOIN amc_unidades ON qo_groups.id_unidad = amc_unidades.id
                     WHERE
                     qo_groups.id = (select
                                     qo_groups_id as id
                                     from
                                     qo_sessions
                                     where
                                     qo_members_id ='" . $member_id . "'
                                      ORDER BY date DESC 
                                      LIMIT 1
                                      )";
        }

        $result = $this->os->db->conn->query($sql);
        if ($result) {
            $row = $result->fetch(PDO::FETCH_ASSOC);
            if ($row) {
                return $row['id_zonal'];
            }
        }
        return null;
    } // end get_zonal_id()

    /**
     * get_unidad_id() Returns the unidad  group id for this session.
     *
     * @access public
     * @return {integer}
     */

    public function get_unidad_id($member_id = '')
    {

        $session_id = $this->get_id();
        if ($member_id == '') {
            // recupero el grupo de la sesion activa
            if (isset($session_id) && $session_id != '') {
                $sql = "SELECT id_unidad FROM qo_groups WHERE 
                    qo_groups.id = ( SELECT qo_groups_id as id 
                    FROM qo_sessions WHERE id ='" . $session_id . "'  LIMIT 1 )";
            }
        } else {
            $sql = "SELECT
                        id_unidad,
                        ( SELECT amc_unidades.prefijo FROM amc_unidades WHERE amc_unidades.id = id_unidad ) AS nombre_unidad 
                    FROM
                        qo_groups 
                    WHERE
                        qo_groups.id = ( SELECT qo_groups_id FROM qo_groups_has_members WHERE qo_members_id = '" . $member_id . "' LIMIT 1 )";
        }
        $result = $this->os->db->conn->query($sql);
        if ($result) {
            $row = $result->fetch(PDO::FETCH_ASSOC);
            if ($row) {
                return $row['id_unidad'];
            }
        }


        return null;
    } // end get_unidad_id()

    /**
     * get_unidad_siglas($member_id) Returns the unidad  group id for this session.
     *
     * @access public
     * @return {integer}
     */

    public function get_unidad_siglas($member_id = '')
    {
        if ($member_id == '') {
            $session_id = $this->get_id();
            // recupero el grupo de la sesion activa
            if (isset($session_id) && $session_id != '') {
                $sql = "SELECT id_unidad, (SELECT amc_unidades.prefijo FROM amc_unidades WHERE amc_unidades.id = id_unidad) as nombre_unidad  FROM qo_groups WHERE 
                    qo_groups.id = ( SELECT qo_groups_id as id 
                    FROM qo_sessions WHERE id ='" . $session_id . "'  LIMIT 1 )";
                $result = $this->os->db->conn->query($sql);
                if ($result) {
                    $row = $result->fetch(PDO::FETCH_ASSOC);
                    if ($row) {
                        return $row['nombre_unidad'];
                    }
                }
            }
        } else {
            $sql = "SELECT
                        id_unidad,
                        ( SELECT amc_unidades.prefijo FROM amc_unidades WHERE amc_unidades.id = id_unidad ) AS nombre_unidad 
                    FROM
                        qo_groups 
                    WHERE
                        qo_groups.id = ( SELECT qo_groups_id FROM qo_groups_has_members WHERE qo_members_id = '" . $member_id . "' LIMIT 1 ) ";
            $result = $this->os->db->conn->query($sql);
            if ($result) {
                $row = $result->fetch(PDO::FETCH_ASSOC);
                if ($row) {
                    return $row['nombre_unidad'];
                }
            }
        }
        return null;
    } // end get_unidad_siglas()

    /**
     * get_id() Returns the session id.
     *
     * @access private
     * @return {string}
     */
    public function get_id()
    {
        if (isset($_COOKIE['sessionId'])) {
            return $_COOKIE['sessionId'];
        }

        if (isset($_GET['sessionId'])) {
            if (!isset($_COOKIE['sessionId'])) {
                setCookie('sessionId', $_GET['sessionId'], 0, '/');
            }
            return $_GET['sessionId'];
        }

        return null;
    } // end get_id()

    public function get_unidad_by_id($id)
    {
        $sql = "SELECT *
                FROM amc_unidades
                WHERE id = '" . $id . "'";
        $result = $this->os->db->conn->query($sql);
        if ($result) {
            $row = $result->fetch(PDO::FETCH_ASSOC);
            if ($row) {
                return $row['nombre'];
            }
        }
    }

    public function get_zona_by_id($id)
    {
        $sql = "SELECT *
                FROM amc_zonas
                WHERE id = '" . $id . "'";
        $result = $this->os->db->conn->query($sql);
        if ($result) {
            $row = $result->fetch(PDO::FETCH_ASSOC);
            if ($row) {
                return $row['nombre'];
            }
        }
    }

}

?>