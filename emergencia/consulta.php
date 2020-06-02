<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="robots" content="noindex, nofollow">
    <title>REGISTRO INFRACCIONES EMERGENCIA</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <link href="vendor/datetimepicker/bootstrap-datetimepicker.min.css" rel="stylesheet" media="screen">
    <link href="css/form-ifram.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
</head>

<body>
<div class="container contact-form">
    <div class="contact-image">
        <img src="img/rocket_contact.png" alt="rocket_contact"/>
    </div>
    <h3>REGISTRO INFRACCIONES USO DE MASCARILLA DURANTE EMERGENCIA</h3>
     <form enctype="multipart/form-data" id="myForm" method="post">
        <div class="row">

            <div class="form-group">
                <label for="cedula">INGRESE CEDULA*</label>
                <input type="number" class="form-control" id="cedula" name="cedula" placeholder=""
                       required="required">
                <div class="mensajecedula"></div>
            </div>

            <div class="form-group">

                <div class="form-group col-md-6">
                    <input type="submit" class="btn btn-success btn-send btnContactSubmit" value="Buscar">
                </div>
                <div class="form-group col-md-6">
                    <div class="mensaje"></div>
                </div>

            </div>


    </form>
</div>

<script src="vendor/jquery/jquery-1.8.3.min.js"></script>
<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="vendor/datetimepicker/bootstrap-datetimepicker.js" charset="UTF-8"></script>
<script type="text/javascript" src="vendor/datetimepicker/locales/bootstrap-datetimepicker.es.js"
        charset="UTF-8"></script>
<script type="text/javascript">
    $(document).ready(function () {
        $("input[name^='cedula']").change(function () {
            // carga iframe con informacion de dinardat
            $.getJSON('formLoad.php?opcion=usuario&usuario=' + $("input[name^='cedula']").val(), function (data) {
                if (data.success) {
                    nombres = data.data[0]['nombres'];
                    apellidos = data.data[0]['apellidos'];
                    $('.mensajecedula').html("<h3>El ciudadano "
                        + nombres + " "
                        + apellidos + ","
                        + " tiene ya una sanción</h3>")
                } else {
                    $('#nombres').val('')
                    $('#apellidos').val('')
                    $('.mensajecedula').html("El cuidadano no tiene sancion")
                }
            });
        });


        $("#myForm").on("submit", function (e) {
            $('.mensaje').html('<div class="blink_me"><b>Enviado formulario</b></div>');
            e.preventDefault();
            var f = $(this);
            var formData = new FormData(document.getElementById("myForm"));
            formData.append("dato", "valor");
            var cedula =  $("input[name^='cedula']").val()
            $.ajax({
                url: 'formLoad.php?opcion=usuario&usuario=' + cedula,
                type: "post",
                dataType: "html",
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            }).done(function (res) {
                $('.mensaje').html('<b>Formulario enviado</b>');
                nombres = data.data[0]['nombres'];
                apellidos = data.data[0]['apellidos'];
                $('.mensajecedula').html("<h3>El ciudadano "
                    + nombres + " "
                    + apellidos + ","
                    + " tiene ya una sanción</h3>")
            });
        })
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