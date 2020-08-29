<?php header('Content-Type: text/html; charset=UTF-8'); ?>
<?php

include("mysql.class.php");
$databaseAMC = new MySQL();
cors();
function select()
{
    global $databaseAMC;
 
    $query = "SELECT * FROM amc_denuncias ";
    if ($databaseAMC->Query($query)
    ) {
        $data = $databaseAMC->RecordsArray();
    } else {
        echo "<p>Query Failed</p>";
        $data = [];
    }
    $query = "SELECT count(*) AS total FROM amc_denuncias $where";
    if ($databaseAMC->Query($query)
    ) {
        $row = $databaseAMC->RecordsArray(MYSQL_ASSOC);
        $total = $row[0]['total'];
    } else {
        echo "<p>Query Failed</p>";
        $total = 0 ;
    }
    echo json_encode(array(
            "total" => $total,
            "success" => true,
            "data" => $data)
    );
}
 

select();



function cors() {

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        exit(0);
    }

}

 