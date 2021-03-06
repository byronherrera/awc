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
            <title>REGISTRO CLAUSURA DE LOCALES - EMERGENCIA</title>
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
            <h3>REGISTRO CLAUSURA DE LOCALES - EMERGENCIA</h3>
            <div class="iframedinar">
                <iframe id="frame" src="" width="100%" height="80px" frameBorder="0"></iframe>
            </div>
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
                        <label for="expediente">EXPEDIENTE</label>
                        <input id="expediente" type="text" name="expediente" class="form-control"
                               placeholder="Ingrese número de expediente">
                    </div>
                    <div class="form-group">
                        <label for="sello">SELLO</label>
                        <input id="sello" type="text" name="sello" class="form-control"
                               placeholder="Ingrese número de sello">
                    </div>
                    <div class="form-group">
                        <label for="actividad">ACTIVIDAD.</label>
                        <textarea class="form-control" id="actividad" name="actividad" required="required"
                                  rows="3" placeholder="Ingrese descripción de actividad"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="establecimiento">NOMBRE ESTABLECIMIENTO.</label>
                        <input id="establecimiento" type="text" name="establecimiento" class="form-control"
                               placeholder="Ingrese nombre del establecimiento">
                    </div>

                    <div class="form-group">
                        <label for="direccion">DIRECCION INFRACCION</label>
                        <input id="direccion" type="text" name="direccion" class="form-control"
                               placeholder="Ingrese dirección infracción">
                    </div>
                    <div class="form-group">
                        <label for="infraccion">INFRACCION</label>
                        <input id="infraccion" type="text" name="infraccion" class="form-control"
                               placeholder="Ej III.6.61">
                    </div>
                    <div class="form-group">
                        <label for="categoria">CATEGORIA</label>
                        <input id="categoria" type="text" name="categoria" class="form-control"
                               placeholder="Ej A,B,C">
                    </div>
                    <div class="form-group">
                        <label for="sector">SECTOR</label>
                        <input id="sector" type="text" name="sector" class="form-control"
                               placeholder="Ej Iñaquito, Sur">
                    </div>
                    <div class="form-group">
                        <label for="funcionario">FUNCIONARIO*</label>
                        <select name="funcionario" class="form-control" id="funcionario" required="required"
                                data-error="requerido.">
                            <option value=""></option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="idzonal">Zonal*</label>
                        <select name="idzonal" class="form-control" id="idzonal" required="required"
                                data-error="requerido.">
                            <option value=""></option>
                        </select>
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
                            <label class="custom-file-label" for="archivo">Imagen Cedula/licencia </label>
                            <input type="file" class="custom-file-input" id="archivo1" lang="es" name="archivo1">
                            <label class="custom-file-label" for="archivo">Imagen Cedula.</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="custom-file">
                            <label class="custom-file-label" for="archivo">Imagen Infracción</label>
                            <input type="file" class="custom-file-input" id="archivo2" lang="es" name="archivo2">
                            <label class="custom-file-label" for="archivo">Imagen Infracción.</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <!--<label for="geoposicionamiento">Coordenadas</label>-->
                        <input id="geoposicionamiento" type="hidden" name="geoposicionamiento" class="form-control"
                               readonly>
                    </div>

                    <div class="form-group">

                        <div class="form-group col-md-4">
                            <input type="submit" class="btn btn-success btn-send btnContactSubmit" value="Grabar">
                            <div class="mensaje"></div>
                        </div>
                        <div class="form-group col-md-4">
                            <input type="button" class="btn btn-success btn-send btnContactSubmit" id="btn-salir"
                                   value="SALIR">
                        </div>
                        <div class="form-group col-md-4">
                            <input type="button" class="btn btn-success btn-send btnContactSubmit" id="btn-consultar"
                                   value="Consultar">
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
                    autoclose: true
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
                    // carga iframe con informacion de dinardat
                    $("#frame").attr("src", "https://sitra.quito.gob.ec/Administracion/usuarios/validar_datos_registro_civil.php?cedula=" + $("input[name^='cedula']").val() + "&tipo_identificacion=0");

                    // se carga la información si ya existe información anterior
                    $.getJSON('formLoad.php?opcion=usuario&usuario=' + $("input[name^='cedula']").val(), function (data) {
                        if (data.success) {
                            $('#nombres').val(data.data[0]['nombres'])
                            $('#apellidos').val(data.data[0]['apellidos'])
                            $('.mensajecedula').html("<h3>El ciudadano tiene ya sanción previa</h3>")
                        } else {
                            $('#nombres').val('')
                            $('#apellidos').val('')
                            $('.mensajecedula').html("")
                        }
                    });
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

                $("#btn-consultar").click(function () {
                    window.location.replace("consulta.php");
                });

                $("#btn-salir").click(function () {
                    $.post("../servicesalone.php", {service: "logout"}, function () {
                        //alert( "success" );
                    }).done(function () {
                        window.location.replace("https://amcmatis.quito.gob.ec/");
                    });
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
                        $('.mensaje').html('<b>Registro enviado exitosamente</b>');
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