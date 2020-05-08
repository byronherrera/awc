<?php
require_once('../server/os.php');

if (!class_exists('os')) {
    die('Server os class is missing!');
} else {
$os = new os();
if (!$os->session_exists()) {
    header("Location: login2.php");
} else {
// se guarda quien descarga
$idmember = $os->get_member_id();
$nombreMember = regresaNombre($idmember);
$sql = "INSERT INTO amc_sancion_emergencia_log (idusuario, usuario, text) VALUES ('$idmember', '$nombreMember', 'totales');";
$sql = $os->db->conn->prepare($sql);
$sql->execute();

function regresaNombre($id_dato)
{
    global $os;

    if ($id_dato == '')
        return "";
    $os->db->conn->query("SET NAMES 'utf8'");
    $sql = "SELECT CONCAT(qo_members.first_name, ' ', qo_members.last_name) AS nombre
            FROM qo_members WHERE id = " . $id_dato;

//    echo $sql;
    $nombre = $os->db->conn->query($sql);
    $rownombre = $nombre->fetch(PDO::FETCH_ASSOC);
    return $rownombre['nombre'];

}


?><!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="robots" content="noindex, nofollow">
    <title>TOTALES INFRACCIONES EMERGENCIA</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <link href="vendor/datetimepicker/bootstrap-datetimepicker.min.css" rel="stylesheet" media="screen">
    <link href="css/form-invede.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
</head>

<body>
<div class="container contact-form">
    <div class="contact-image">
        <img src="img/rocket_contact.png" alt="rocket_contact"/>
    </div>
    <h3>TOTALES INFRACCIONES EMERGENCIA</h3>
    <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4 "></div>
        <div class="col-sm-4 lead"></div>
    </div>
    <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4 ">
            <div class="mensajetotales"></div>
        </div>
        <div class="col-sm-4 lead"></div>
    </div>
    <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4 "></div>
        <div class="col-sm-4"></div>
    </div>
    <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4 ">
            <a href="descargaTodoEmergencia.php">Descargar todo (xls)</a>
        </div>
        <div class="col-sm-4"></div>
    </div>
</div>

<script src="vendor/jquery/jquery-1.8.3.min.js"></script>
<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="vendor/datetimepicker/bootstrap-datetimepicker.js" charset="UTF-8"></script>
<script type="text/javascript" src="vendor/datetimepicker/locales/bootstrap-datetimepicker.es.js"
        charset="UTF-8"></script>
<script type="text/javascript">
    $(document).ready(function () {
        // llenar los datos del combobox
        $.getJSON('formLoad.php?opcion=totales', function (data) {
            if (data.success) {
                var cadena = '<table width="100%" ><tr><th><div class="lead">Fecha</div></th><th><div class="lead">Sanciones</div></th></tr>'
                total = 0;
                $.each(data.data[0], function (i, el) {
                    cadena = cadena + '<tr><td>' + el.texto + '</th><td>' + el.valor + '</td></tr>';
                    total = total + parseInt(el.valor);
                });
                cadena = cadena + '<tr><td>Total </th><td>' + total + '</td></tr>';
                cadena = cadena + '</table>';
                $('.mensajetotales').html(cadena)
            } else {
                $('.mensajetotales').html("<h3>error</h3>")
            }
        });
    });
</script>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-101563972-2"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-101563972-2');
</script>

</body>
</html>
<?php }
}
?>