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
            <div class="iframedinar">
                <iframe id="frame" src="" width="100%" height="80px" frameBorder="0"></iframe>
            </div>
            <form enctype="multipart/form-data" id="myForm" method="post">
                <div class="row">

                    <div class="form-group">
                        <label for="cedula">CEDULA INFRACTOR*</label>
                        <input type="text" class="form-control" id="cedula" name="cedula" placeholder=""
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
                        <label for="lugarinfraccion">LUGAR INFRACCION</label>
                        <input id="lugarinfraccion" type="text" name="lugarinfraccion" class="form-control"
                               placeholder="Ingrese lugar infracción">
                    </div>
                    <div class="form-group">
                        <label for="Materia">Motivo Sancion*</label>
                        <select name="ordenanza" class="form-control" id="ordenanza" required="required"
                                data-error="requerido.">
                            <option value=""></option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="observaciones">Observaciones.</label>
                        <textarea class="form-control" id="observaciones" name="observaciones" required="required"
                                  rows="3">SANCION POR NO USAR MASCARILLA </textarea>
                    </div>
                    <div class="form-group">
                        <label for="funcionario">Funcionario*</label>
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
                        <label for="actainfraccion">Número de acto</label>
                        <input id="actainfraccion" type="text" name="actainfraccion" class="form-control"
                               placeholder="Ingrese el numero de acta de infración">
                    </div>
                    <div class="form-group" style="padding: 20px 0;">
                        <div class="custom-file">
                            <label class="custom-file-label" for="archivo">Imagen Cedula </label>
                            <input type="file" class="custom-file-input" id="archivo1" lang="es" name="archivo1">
                        </div>
                    </div>
                    <div class="form-group" style="padding: 20px 0;">
                        <div class="custom-file">
                            <label class="custom-file-label" for="archivo">Fotografía Infracción</label>
                            <input type="file" class="custom-file-input" id="archivo2" lang="es" name="archivo2">
                        </div>
                    </div>
                    <div class="form-group" style="padding: 20px 0;">
                        <div class="custom-file">
                            <label class="custom-file-label" for="archivo">Acto de Inicio</label>
                            <input type="file" class="custom-file-input" id="archivo3" lang="es" name="archivo3">
                        </div>
                    </div>
                    <div class="form-group" style="padding: 20px 0;">
                        <div class="custom-file">
                            <label class="custom-file-label" for="archivo">Expediente</label>
                            <input type="file" class="custom-file-input" id="archivo4" lang="es" name="archivo4">
                        </div>
                    </div>
                    <div class="form-group" style="padding: 20px 0;">
                        <div class="custom-file">
                            <label class="custom-file-label" for="archivo">Cierre de Instrución</label>
                            <input type="file" class="custom-file-input" id="archivo5" lang="es" name="archivo5">
                        </div>
                    </div>
                    <div class="form-group" style="padding: 20px 0;">
                        <div class="custom-file">
                            <label class="custom-file-label" for="archivo">Certificación</label>
                            <input type="file" class="custom-file-input" id="archivo6" lang="es" name="archivo6">
                        </div>
                    </div>
                    <div class="form-group" style="padding: 20px 0;">
                        <div class="custom-file">
                            <label class="custom-file-label" for="archivo">Listado de expedientes publicados</label>
                            <input type="file" class="custom-file-input" id="archivo7" lang="es" name="archivo7">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="geoposicionamiento" style="display:none">Coordenadas</label>
                        <input id="geoposicionamiento" type="hidden" name="geoposicionamiento" class="form-control"
                               readonly>
                    </div>

                    <div class="form-group" style="padding: 20px 0">
                        <div class="form-group col-md-4">
                            <input type="submit" class="btn btn-success btn-send btnContactSubmit" id="grabarnuevo" value="Grabar Nuevo">
                        </div>
                      
                        <div class="form-group col-md-4">
                            <div class="mensaje"></div>
                        </div>
                        <div class="form-group col-md-4">
                            <input type="button" class="btn btn-success btn-send " value="Modificar"
                                   onclick="window.location='actualizar.php';">
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

                var date = new Date();
                var dateStr =
                    date.getFullYear() + "-" + ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
                    ("00" + date.getDate()).slice(-2) + "T" +
                    ("00" + date.getHours()).slice(-2) + ":" +
                    ("00" + date.getMinutes()).slice(-2) + ':00';

                document.getElementById('fecha').value = dateStr;

                $("#idzonal").change(function () {
                    var idzonal = $('#idzonal option:selected').val();
                    localStorage.setItem("idzonal", idzonal);
                });

                $("input[name^='cedula']").change(function () {
                    // carga iframe con informacion de dinardat
                    $("#frame").attr("src", "https://sitra.quito.gob.ec/Administracion/usuarios/validar_datos_registro_civil.php?cedula=" + $("input[name^='cedula']").val() + "&tipo_identificacion=0");

                    debugger
                    // se carga la información si ya existe información anterior
                    $.getJSON('formLoad.php?opcion=todosByUsuario&usuario=' + $("input[name^='cedula']").val(), function (data) {
                        if (data.success) {
                            var html = '';
                            $('#nombres').val(data.data[0]['nombres'])
                            $('#apellidos').val(data.data[0]['apellidos'])
//                            $('.mensajecedula').html("<h3>El ciudadano tiene ya sanción</h3>")
//                            $('.mensajecedula').html("<h3>El ciudadano tiene ya sanción,fecha: " + data.data[0]['fecha_creacion'] + "</h3>")
                            html = "<h3>LISTADO DE EXPEDIENTES</h3>" +
                                "                   <table class=\"table\">\n" +
                                "                    <tr><th scope=\"row\">Id</th>" +
                                "                        <th scope=\"row\">Cédula</th>" +
                                "                        <th scope=\"row\">Nombre</th>" +
                                "                        <th scope=\"row\">Apellido</th>" +
                                "                        <th scope=\"row\">Fecha </th>" +
                                "                        <th scope=\"row\">Numero de acto</th>" +
                                "                        <th scope=\"row\">Zonal</th>" +
                                "                    </tr>";
                            $.each(data.data, function (key, val) {
                                html += "<tr>" +
                                    "                         <td> "+val['id']+ " </td> "+
                                    "                         <td> "+val['cedula']+ " </td> "+
                                    "                         <td> "+val['nombres']+ " </td> "+
                                    "                         <td> "+val['apellidos']+ " </td> "+
                                    "                         <td> "+val['fecha']+ " </td> "+
                                    "                         <td> "+val['actainfraccion']+ " </td> "+
                                    "                         <td> "+val['zonal']+ " </td> "+
                                    "    </tr>"
                                    "                </table>"
                                //$('.mensajecedula').html("<table <tr> <th> Id </th> <th> Cédula </th> <th> Nombre </th> <th> Apellido </th> </tr> <tr> <td> "+ val['id']+ "</td> <td> "+ val['cedula']+ "</td> <td>"+ val['nombres']+ "</td> <td>"+ val['apellidos'] +"</td> </tr> </table>");
                            });
                            $('.mensajecedula').html(html);
                        } else {
                            $('#nombres').val('')
                            $('#apellidos').val('')
                            $('.mensajecedula').html("")
                        }
                    });
                });

                /*Guardando los datos en el LocalStorage*/
                $("#funcionario").change(function () {
                    var idFuncionario = $('#funcionario option:selected').val();
                    localStorage.setItem("idFuncionario", idFuncionario);
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

                /*Guardando los datos en ordenanza*/
                $("#ordenanza").change(function () {
                    var idOrdenanza = $('#ordenanza option:selected').val();
                    localStorage.setItem("idOrdenanza", idOrdenanza);
                });

                // llenar los datos del combobox
                $.getJSON('formLoad.php?opcion=ordenanza', function (data) {

                    if (data.success) {
                        $.each(data.data[0], function (i, el) {
                            $('#ordenanza').append(new Option(el.text, el.text));
                        });
                        $("#ordenanza").val(localStorage.getItem("idOrdenanza"));

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
                    $('#grabarnuevo').hide();
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


                        // luego de resetear la hora volvemos a cargar la hora
                        var dateStr =
                            date.getFullYear() + "-" + ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
                            ("00" + date.getDate()).slice(-2) + " " +
                            ("00" + date.getHours()).slice(-2) + ":" +
                            ("00" + date.getMinutes()).slice(-2);

                        document.getElementById('fecha').value = dateStr;
                        // fin actualizar la hora
                        $('#grabarnuevo').show();
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