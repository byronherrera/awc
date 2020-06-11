<?php
require_once('../server/os.php');

if (!class_exists('os')) {
    die('Server os class is missing!');
} else {
    $os = new os();
    if (!$os->session_exists()) {
        header("Location: login.php");
    } else {
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="robots" content="noindex, nofollow">
    <title>ACTUALIZACION DE DATOS PERSONALES</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">

    <link href="css/form-invede.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
</head>

<body>
<div class="container contact-form">
    <div class="contact-image">
        <img src="img/rocket_contact.png" alt="rocket_contact"/>
    </div>
    <h3>ACTUALIZACION DE DATOS PERSONALES</h3>
    <div class="iframedinar">
        <iframe id="frame" src="" width="100%" height="80px" frameBorder="0"></iframe>
    </div>
    <form enctype="multipart/form-data" id="myForm" method="post">
        <div class="row">

            <div class="form-group">
                <label for="cedula">CEDULA</label>
                <input type="text" class="form-control" id="cedula" name="cedula" placeholder=""
                       required="required" readonly>
            </div>
            <div class="form-group">
                <label for="nombres">NOMBRES COMPLETOS*</label>
                <input type="text" class="form-control " id="nombres" name="nombres" required="required"
                       placeholder="Nombres" readonly>
            </div>
            <div class="form-group">
                <label for="apellidos">APELLIDOS COMPLETOS*</label>
                <input type="text" class="form-control " id="apellidos" name="apellidos" required="required"
                       placeholder="Apellidos" readonly>
            </div>
            <div class="form-group">
                <label for="telefono1">TELEFONO DOMICILIO</label>
                <input id="telefono1" type="text" name="telefono1" class="form-control" required="required"
                       placeholder="Ingrese telefono domicilio">
            </div>
            <div class="form-group">
                <label for="telefono2">TELEFONO MOVIL</label>
                <input id="telefono2" type="text" name="telefono2" class="form-control" required="required"
                       placeholder="Ingrese teléfono movil">
            </div>
            <div class="form-group">
                <label for="telefonoemergencia">TELEFONO EN CASO DE EMERGENCIA</label>
                <input id="telefonoemergencia" type="text" name="telefonoemergencia" class="form-control" required="required"
                       placeholder="Ingrese telefono emergencia">
            </div>

            <div class="form-group">
                <label for="direccionprincipal">CALLE PRINCIPAL</label>
                <input id="direccionprincipal" type="text" name="direccionprincipal" class="form-control" required="required"
                       placeholder="Ingrese direccion principal">
            </div>
            <div class="form-group">
                <label for="direccionnumero">NUMERO</label>
                <input id="direccionnumero" type="text" name="direccionnumero" class="form-control" required="required"
                       placeholder="Ingrese direccio nnumero">
            </div>
            <div class="form-group">
                <label for="direccionsecundaria">CALLE SECUNDARIA</label>
                <input id="direccionsecundaria" type="text" name="direccionsecundaria" class="form-control" required="required"
                       placeholder="Ingrese direccion secundaria">
            </div>
            <div class="form-group">
                <label for="referenciadireccion">REFERENCIA DOMICILIO</label>
                <input id="referenciadireccion" type="text" name="referenciadireccion" class="form-control" required="required"
                       placeholder="Ingrese referencia dirección">
            </div>
            <div class="form-group">
                <label for="parroquia">PARROQUIA</label>
                <input id="parroquia" type="text" name="parroquia" class="form-control" required="required"
                       placeholder="Ingrese parroquia">
            </div>
            <div class="form-group">
                <label for="barrio">BARRIO</label>
                <input id="barrio" type="text" name="barrio" class="form-control" required="required"
                       placeholder="Ingrese barrio">
            </div>
            <div class="form-group">
                <label for="fecha_nacimiento">FECHA DE NACIMIENTO</label>
                    <input class="form-control" size="16" type="date" name="fecha_nacimiento" id="fecha_nacimiento"
                           required="required"   style="background-color: #fff;">
            </div>
            <div class="form-group">
                <label for="tiposangre">TIPO DE SANGRE*</label>
                <select name="tiposangre" class="form-control" id="tiposangre" required="required"
                        data-error="requerido.">
                    <option value=""></option>
                    <option value="O Negativo">O Negativo</option>
                    <option value="O Positivo">O Positivo</option>
                    <option value="A Negativo">A Negativo</option>
                    <option value="A Positivo">A Positivo</option>
                    <option value="B Negativo">B Negativo</option>
                    <option value="B Positivo">B Positivo</option>
                    <option value="AB Negativo">AB Negativo</option>
                    <option value="AB Positivo">AB Positivo</option>
                </select>
            </div>

            <div class="form-group">

                <input id="geoposicionamiento" type="hidden" name="geoposicionamiento" class="form-control" readonly>


                <input id="id" type="hidden" name="id" class="form-control" readonly>
            </div>

            <div class="form-group">
                <div class="form-group col-md-6">
                    <input type="submit" class="btn btn-success btn-send btnContactSubmit" id="btn-success" value="ACTUALIZAR">
                    <div class="mensaje"></div>
                </div>
                <div class="form-group col-md-6">
                    <input type="button" class="btn btn-success btn-send btnContactSubmit" id="btn-salir" value="SALIR">
                </div>
            </div>
    </form>
</div>

<script src="vendor/jquery/jquery-1.8.3.min.js"></script>
<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript">
    $(document).ready(function () {


        // llenar los datos del combobox
        $.getJSON('formLoad.php?opcion=funcionario', function (data) {
            if (data.success) {
                $.each(data.data[0][0], function (i, el) {

                    document.getElementById(i).value = el;

                });
            }
        });

        $("#btn-salir").click(function(){
            $.post("../servicesalone.php", {service: "logout"}, function(){
                //alert( "success" );
            }).done(function() {
                window.location.replace("https://amcmatis.quito.gob.ec/");
            });
        });



        $("#myForm").on("submit", function (e) {
            $('.mensaje').html('<div class="blink_me"><b>Enviado formulario</b></div>');
            e.preventDefault();
            var f = $(this);
            var formData = new FormData(document.getElementById("myForm"));
            formData.append("dato", "valor");

            $.ajax({
                url: 'formLoad.php?opcion=actualizar',
                type: "post",
                dataType: "html",
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            }).done(function (res) {
                $('.mensaje').html('<b>DATOS ACTUALIZADOS</b>');
                $('#btn-success').hide();


              //  $('#myForm')[0].reset();



            });
        })

        if ("geolocation" in navigator) { //check geolocation available
            //try to get user current location using getCurrentPosition() method
            navigator.geolocation.getCurrentPosition(function (position) {
                $("#geoposicionamiento").val(position.coords.latitude + "," + position.coords.longitude);
            });
        }
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