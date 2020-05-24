<!DOCTYPE html>
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
                $.each(data.data[0], function (i, el) {
                    cadena = cadena + '<tr><td>' + el.texto + '</th><td>' + el.valor + '</td></tr>';
                });
                cadena = cadena + '</table>';
                $('.mensajetotales').html(cadena)
            } else {
                $('.mensajetotales').html("<h3>error</h3>")
            }
        });
    });
</script>
</body>
</html>