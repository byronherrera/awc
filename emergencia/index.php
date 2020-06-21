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
            <title>SOLICITUD DE COPIAS SIMPLES ON LINE</title>
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
            <h3>SOLICITUD DE COPIAS SIMPLES ON LINE</h3>
            <form enctype="multipart/form-data" id="myForm" method="post">
                <div class="row">

                    <div class="form-group">
                        <label for="cedula">CEDULA*</label>
                        <input type="number" class="form-control" id="cedula" name="cedula" placeholder=""
                               required="required">
                        <div class="mensajecedula"></div>
                    </div>
                    <div class="form-group">
                        <label for="nombres">NOMBRES COMPLETOS*</label>
                        <input type="text" class="form-control " id="nombres" name="nombres" required="required"
                               placeholder="Nombres">
                    </div>
                    <div class="form-group">
                        <label for="apellidos">APELLIDOS COMPLETOS*</label>
                        <input type="text" class="form-control " id="apellidos" name="apellidos" required="required"
                               placeholder="Apellidos">
                    </div>

                    <div class="form-group">
                        <label for="lugarinfraccion">ABOGADO PATROCINADOR</label>
                        <input id="lugarinfraccion" type="text" name="lugarinfraccion" class="form-control"
                               placeholder="Ingrese lugar infracción">
                    </div>
                    <div class="form-group">
                        <label for="lugarinfraccion">MATRICULA ABOGADO PATROCINADOR</label>
                        <input id="lugarinfraccion" type="text" name="lugarinfraccion" class="form-control"
                               placeholder="Ingrese lugar infracción">
                    </div>
                    <div class="form-group">
                        <label for="funcionario">CORREO ELECTRONICO*</label>
                        <select name="funcionario" class="form-control" id="funcionario" required="required"
                                data-error="requerido.">
                            <option value=""></option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="idzonal">Dirección*</label>
                        <select name="idzonal" class="form-control" id="idzonal" required="required"
                                data-error="requerido.">
                            <option value=""></option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="idzonal">Número Expediente Administrativo*</label>
                        <select name="idzonal" class="form-control" id="idzonal" required="required"
                                data-error="requerido.">
                            <option value=""></option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="actainfraccion">OTRO DOCUMENTO, ESPECIFICAR</label>
                        <input id="actainfraccion" type="text" name="actainfraccion" class="form-control"
                               placeholder="Ingrese el numero de acta de infración">
                    </div>

                    <div class="form-group">
                        <label for="fecha">Fecha de emisión del documento</label>
                        <div class="input-group date form_datetime  " data-date="1994-09-16T05:25:07Z"
                             data-date-format="dd MM yyyy - HH:ii p" data-link-field="dtp_input1">
                            <input class="form-control" size="16" type="text" name="fecha" id="fecha"
                                   required="required" style="background-color: #fff;">
                            <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                            <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="custom-file">
                            <label class="custom-file-label" for="archivo">Imagen Cedula </label>
                            <input type="file" class="custom-file-input" id="archivo1" lang="es" name="archivo1">
                            <label class="custom-file-label" for="archivo">Imagen Cedula.</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="form-group col-md-6">
                            <input type="submit" class="btn btn-success btn-send btnContactSubmit" value="ENVIAR">
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
                //    todayMaximoHoras.setHours(15, 0, 0, 0);
                //    todayMaximoHoras.setHours(0, 30, 0, 0);

                //  si el ingreso de la solicitud es mas de las 13 horas cambiamos el
                /*if (today > todayMaximoHoras) {
                    // si es mas tarde de la hora maxima la reserva se pasa para pasado mañana
                   // dia = today.getDate() + 1;
                    today.setDate(dia);
                    today.setHours(21, 0, 0, 0);
                    $('label#fechaTrabajoTitulo').html('Fecha de trabajo a realizarse*, (reservas a partir del dia de mañana)');
                } else {
                    dia = today.getDate();
                    today.setDate(dia);
                    today.setHours(21, 0, 0, 0);
                    //  $('label#fechaTrabajoTitulo').html('Fecha de trabajo a realizarse*');
                }*/

                $('.form_datetime').datetimepicker({
                    language: 'es',
                    format: 'yyyy-mm-dd hh:ii',
                    autoclose: true,
                    //  todayBtn: true,
                    // startDate: today
                });

                var date = new Date();
                var dateStr =
                    date.getFullYear() + "-" + ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
                    ("00" + date.getDate()).slice(-2) + "T" +
                    ("00" + date.getHours()).slice(-2) + ":" +
                    ("00" + date.getMinutes()).slice(-2) + ':00';

                document.getElementById('fecha').value = dateStr;

                /*Guardando los datos en el LocalStorage*/
                $("#funcionario").change(function () {
                    var idFuncionario = $('#funcionario option:selected').val();
                    localStorage.setItem("idFuncionario", idFuncionario);
                });

                $("#idzonal").change(function () {
                    var idzonal = $('#idzonal option:selected').val();
                    localStorage.setItem("idzonal", idzonal);
                });

                $("input[name^='cedula']").change(function () {

                    // se carga la información si ya existe información anterior
/*                    $.getJSON('formLoad.php?opcion=usuario&usuario=' + $("input[name^='cedula']").val(), function (data) {
                        if (data.success) {
                            $('#nombres').val(data.data[0]['nombres'])
                            $('#apellidos').val(data.data[0]['apellidos'])
                            $('.mensajecedula').html("<h3>El ciudadano tiene ya sanción</h3>")
                        } else {
                            $('#nombres').val('')
                            $('#apellidos').val('')
                            $('.mensajecedula').html("")
                        }
                    });*/
                });

                // llenar los datos del combobox
                $.getJSON('formLoad.php?opcion=funcionario', function (data) {
                    if (data.success) {
                        $.each(data.data[0], function (i, el) {
                            $('#funcionario').append(new Option(el.text, el.valor));
                        });
                        $("#funcionario").val(localStorage.getItem("idFuncionario"));

                    } else {

                    }
                });

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

                    // actualizamos la hora, a la hora de envio del formulario
                    /*var dateStr =
                        date.getFullYear() + "-" + ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
                        ("00" + date.getDate()).slice(-2) + " " +
                        ("00" + date.getHours()).slice(-2) + ":" +
                        ("00" + date.getMinutes()).slice(-2);

                    document.getElementById('fecha').value = dateStr;*/
                    // fin actualizar hora

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

                        // luego de resetear la hora volvemos a cargar la hora
                        var dateStr =
                            date.getFullYear() + "-" + ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
                            ("00" + date.getDate()).slice(-2) + " " +
                            ("00" + date.getHours()).slice(-2) + ":" +
                            ("00" + date.getMinutes()).slice(-2);

                        document.getElementById('fecha').value = dateStr;
                        // fin actualizar la hora
                    });
                })

                if ("geolocation" in navigator) { //check geolocation available
                    //try to get user current location using getCurrentPosition() method
                    navigator.geolocation.getCurrentPosition(function (position) {
                        $("#geoposicionamiento").val(position.coords.latitude + "," + position.coords.longitude);

                        // llenar la direccion
                        $.getJSON('https://open.mapquestapi.com/geocoding/v1/reverse?key=JAlrvA8ymVjfxpr46TKwrH9zM3VNMXEE&location=' + position.coords.latitude + "," + position.coords.longitude + '&includeRoadMetadata=true&incl', function (data) {
                            if (data) {
                                var direccion = data.results[0].locations[0].street;
                                $("#lugarinfraccion").val(direccion);
                            }
                        });
                    });
                }
            });
        </script>
        </body>
        </html>
    <?php }
}
?>