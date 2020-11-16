<?php
require_once '../../server/os.php';
$os = new os();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="robots" content="noindex, nofollow">
    <title>PRUEBA LLAMADO</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <link href="../vendor/datetimepicker/bootstrap-datetimepicker.min.css" rel="stylesheet" media="screen">
    <link href="css/form-invede.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
</head>

<body>
<div class="container contact-form">
    <div class="contact-image">
        <img src="img/rocket_contact.png" alt="rocket_contact"/>
    </div>

    <h3>PRUEBA</h3>
    <h3><div class="mensaje"></div></h3>


</div>

<script src="../vendor/jquery/jquery-1.8.3.min.js"></script>
<script src="../vendor/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="../vendor/datetimepicker/bootstrap-datetimepicker.js" charset="UTF-8"></script>
<script type="text/javascript" src="../vendor/datetimepicker/locales/bootstrap-datetimepicker.es.js"
        charset="UTF-8"></script>
<script type="text/javascript">
    $(document).ready(function () {
        recuperaData();

        function recuperaData() {

            // https://amcmatis.quito.gob.ec/aplicaciones/secuencial/?email=argarcia@quito.gob.ec&password=123456&tipo_documento=1
            $.getJSON('index.php?email=argarcia@quito.gob.ec&password=123456&tipo_documento=1', function (data) {
                if (data.success) {
                    //data.data[0].forEach(NIOImpresion);
                    $('.mensaje').html("DATA ENCONTRADA: " + data.data);
                } else {
                    $('.mensaje').html("DATA NO ENCONTRADA");
                }
            });
        }
    });
</script>
</body>
</html>
