<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="robots" content="noindex, nofollow">
    <title>REGISTRO INFRACCIONES EMERGENCIA</title>
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
    <h3>REGISTRO INFRACCIONES EMERGENCIA</h3>
    <h3>AGENTES METROPOLITANOS DE CONTROL</h3>
    <div class="iframedinar">
        <iframe id="frame" src="" width="100%" height="80px" frameBorder="0"></iframe>
    </div>
    <form enctype="multipart/form-data" id="myForm" method="post">
        <div class="row">

            <div class="form-group">
                <label for="cedula">CEDULA INFRACTOR*</label>
                <input type="number" class="form-control" id="cedula" name="cedula" placeholder=""
                       required="required">
                <div class="mensajecedula"></div>
            </div>
            <div class="form-group">
                <label for="nombres">NOMBRES APELLIDOS COMPLETOS*</label>
                <input type="text" class="form-control " id="nombres" name="nombres" readonly
                       placeholder="Nombres">
                <input type="text" class="form-control " id="apellidos" name="apellidos" readonly
                       placeholder="Apellidos">
            </div>

            <div class="form-group">
                <label for="lugarinfraccion">LUGAR INFRACCION</label>
                <input id="lugarinfraccion" type="text" name="lugarinfraccion" class="form-control" readonly
                       placeholder="Ingrese lugar infracción">
            </div>
            <div class="form-group">
                <label for="observaciones">Observaciones.</label>
                <textarea class="form-control" id="observaciones" name="observaciones" readonly
                          rows="3">SANCION POR NO USAR MASCARILLA </textarea>
            </div>

            <div class="form-group">
                <label for="fecha">Fecha de emisión del documento</label>
                <input class="form-control" size="16" type="text" readonly name="fecha" id="fecha"
                           readonly >


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

        var today = new Date();

        var todayMaximoHoras = new Date();


        $('.form_datetime').datetimepicker({
            language: 'es',
            format: 'yyyy-mm-dd hh:ii',
            autoclose: true,

        });



        /*Guardando los datos en el LocalStorage*/
        $("#nombrefuncionario").change(function () {
            var idnombrefuncionario = $('#nombrefuncionario').val();
            localStorage.setItem("idnombrefuncionario", idnombrefuncionario);
        });

        $("#idzonal").change(function () {
            var idzonal = $('#idzonal option:selected').val();
            localStorage.setItem("idzonal", idzonal);
        });

        $("input[name^='cedula']").change(function () {
            // carga iframe con informacion de dinardat
            $("#frame").attr("src", "https://sitra.quito.gob.ec/Administracion/usuarios/validar_datos_registro_civil.php?cedula=" + $("input[name^='cedula']").val() + "&tipo_identificacion=0");

            // se carga la información si ya existe información anterior
            $.getJSON('formLoad.php?opcion=usuario&usuario=' + $("input[name^='cedula']").val(), function (data) {
                if (data.success) {
                    $('#nombres').val(data.data[0]['nombres'])
                    $('#apellidos').val(data.data[0]['apellidos'])
                    $('.mensajecedula').html("<h3>El ciudadano tiene ya sanción</h3>")
                } else {
                    $('#nombres').val('')
                    $('#apellidos').val('')
                    $('.mensajecedula').html("")
                }
            });
        });

        $("#nombrefuncionario").val(localStorage.getItem("idnombrefuncionario")); 

        // llenar los datos zonal del combobox
        $.getJSON('formLoad.php?opcion=idzonal', function (data) {
            if (data.success) {
                $.each(data.data[0], function (i, el) {
                    $('#idzonal').append(new Option(el.text, el.valor));
                });
                $("#idzonal").val(localStorage.getItem("idzonal"));

            } else {

            }
        });

        $("#myForm").on("submit", function (e) {
            $('.mensaje').html('<div class="blink_me"><b>Enviado formulario</b></div>');
            e.preventDefault();
            var f = $(this);
            var formData = new FormData(document.getElementById("myForm"));
            formData.append("dato", "valor");



            $.ajax({
                url: 'formLoad.php?opcion=ingreso',
                type: "post",
                dataType: "html",
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            }).done(function (res) {
                $('.mensaje').html('<b>Formulario enviado</b>');
                $('#myForm')[0].reset();
                $('.mensajecedula').html("");
                $("#frame").attr("src", "");

            });
        })

    });
</script>
</body>
</html>