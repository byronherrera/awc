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
            <title>ACTUALIZAR INFRACCIONES EMERGENCIA</title>
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
            <h3>ACTUALIZAR INFRACCIONES EMERGENCIA</h3>
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
                                  rows="3"></textarea>
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

                    <div class="row" style="clear: both; padding-top: 20px">
                        <div class="col-md-6">
                            <div class="custom-file">
                                <label class="custom-file-label" for="archivo">Imagen Cédula </label>
                                <input type="file" class="custom-file-input" id="archivo1" lang="es" name="archivo1">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div id="mostrarimagen1"></div>
                        </div>
                    </div>

                    <div class="row" style="clear: both; padding-top: 20px">
                        <div class="col-md-6">
                            <div class="custom-file">
                                <label class="custom-file-label" for="archivo">Fotografía Infracción</label>
                                <input type="file" class="custom-file-input" id="archivo2" lang="es"
                                       name="archivo2">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div id="mostrarimagen2"></div>
                        </div>
                    </div>

                    <div class="row" style="clear: both; padding-top: 20px">
                        <div class="col-md-6">
                            <div class="custom-file">
                                <label class="custom-file-label" for="archivo">Acto de Inicio</label>
                                <input type="file" class="custom-file-input" id="archivo3" lang="es"
                                       name="archivo3">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div id="mostrarimagen3"></div>
                        </div>
                    </div>

                    <div class="row" style="clear: both; padding-top: 20px">
                        <div class="col-md-6">
                            <div class="custom-file">
                                <label class="custom-file-label" for="archivo">Expediente</label>
                                <input type="file" class="custom-file-input" id="archivo4" lang="es"
                                       name="archivo4">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div id="mostrarimagen4"></div>
                        </div>
                    </div>



                    <div class="form-group">
                        <input id="geoposicionamiento" type="hidden" name="geoposicionamiento" class="form-control">
                    </div>

                    <div class="row" style="clear: both; padding-top: 20px">
                        <div class="form-group col-md-4">
                            <input type="submit" class="btn btn-success btn-send btnContactSubmit" id="actualizar" value="GRABAR">
                            <div class="mensaje"></div>
                        </div>
                        <div class="form-group col-md-4">

                            <input type="button" class="btn btn-success btn-send " id="botonnuevo" value="Buscar Nuevo">
                        </div>
                        <div class="form-group col-md-4">
                            <input type="button" class="btn btn-success btn-send " value="Nuevo registro"
                                   onclick="window.location='index.php';">
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
                $('.form_datetime').datetimepicker({
                    language: 'es',
                    format: 'yyyy-mm-dd hh:ii',
                    autoclose: true
                });

                $("input[name^='cedula']").change(function () {
                    cargaData()
                });

                // llenar los datos del combobox
                $.getJSON('formLoad.php?opcion=funcionario', function (data) {
                    if (data.success) {
                        $.each(data.data[0], function (i, el) {
                            $('#funcionario').append(new Option(el.text, el.valor));
                        });
                    }
                });

                // llenar los datos del combobox
                $.getJSON('formLoad.php?opcion=ordenanza', function (data) {
                    if (data.success) {
                        $.each(data.data[0], function (i, el) {
                            $('#ordenanza').append(new Option(el.text, el.text));
                        });
                    }
                });

                // llenar los datos zonal del combobox
                $.getJSON('formLoad.php?opcion=idzonal', function (data) {
                    if (data.success) {
                        $.each(data.data[0], function (i, el) {
                            $('#idzonal').append(new Option(el.text, el.valor));
                        });
                    }
                });

                $("#myForm").on("submit", function (e) {
                    $('#actualizar').hide();
                    $('.mensaje').html('<div class="blink_me"><b>Enviado formulario</b></div>');
                    e.preventDefault();
                    var f = $(this);
                    var formData = new FormData(document.getElementById("myForm"));
                    formData.append("dato", "valor");
                    $.ajax({
                        url: 'formLoad.php?opcion=actualizacion',
                        type: "post",
                        dataType: "html",
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false
                    }).done(function (res) {
                        $('.mensaje').html('<b>Formulario enviado</b>');
                        cargaData();
                        $('#actualizar').show();
                    });
                })

                $( "#botonnuevo" ).click(function() {
                    $('#myForm')[0].reset();
                    $("input[name^='cedula']").focus();
                    $('.mensajecedula').html('');
                    $("#frame").attr("src", "");
                });

                function cargaData() {
                    // carga iframe con informacion de dinardat
                    $("#frame").attr("src", "https://sitra.quito.gob.ec/Administracion/usuarios/validar_datos_registro_civil.php?cedula=" + $("input[name^='cedula']").val() + "&tipo_identificacion=0");
                    // se carga la información si ya existe información anterior
                    $.getJSON('formLoad.php?opcion=usuario&usuario=' + $("input[name^='cedula']").val(), function (data) {
                        $('#myForm')[0].reset();
                        if (data.success) {
                            $('#cedula').val(data.data[0]['cedula'])
                            $('#nombres').val(data.data[0]['nombres'])
                            $('#apellidos').val(data.data[0]['apellidos'])
                            $('#lugarinfraccion').val(data.data[0]['lugarinfraccion'])
                            $('#ordenanza').val(data.data[0]['materia'])
                            $('#observaciones').val(data.data[0]['observaciones'])
                            $('#funcionario').val(data.data[0]['funcionario'])
                            $('#idzonal').val(data.data[0]['idzonal'])
                            $('#fecha').val(data.data[0]['fecha'])
                            $('#actainfraccion').val(data.data[0]['actainfraccion'])
                            if (JSON.parse(data.data[0]['imagenacto']) != null)
                                imagenes = JSON.parse(data.data[0]['imagenacto']);
                            else
                                imagenes = JSON.parse('{"archivo1":null,"archivo2":null,"archivo3":null,"archivo4":null}');

                            $urlArchivos = 'https://amcmatis.quito.gob.ec/emergencia/';

                            //  $urlArchivos = 'http://localhost/procesos/emergencia/';
                            $('#mostrarimagen1').html(validaImagen(imagenes.archivo1, $urlArchivos))
                            $('#mostrarimagen2').html(validaImagen(imagenes.archivo2, $urlArchivos))
                            $('#mostrarimagen3').html(validaImagen(imagenes.archivo3, $urlArchivos))
                            $('#mostrarimagen4').html(validaImagen(imagenes.archivo4, $urlArchivos))


                            $('#geoposicionamiento').val(data.data[0]['geoposicionamiento'])

                            $('.mensajecedula').html("<h3>El ciudadano tiene ya sanción,fecha: " + data.data[0]['fecha_creacion'] + "</h3>")
                        } else {
                            $('#nombres').val('')
                            $('#apellidos').val('')
                            $('#lugarinfraccion').val('')
                            $('#ordenanza').val('')
                            $('#observaciones').val('')
                            $('#funcionario').val('')
                            $('#idzonal').val('')
                            $('#fecha').val('')
                            $('#actainfraccion').val('')
                            $('#archivo1').html('')
                            $('#archivo2').html('')
                            $('#geoposicionamiento').val('')

                            $('#mostrarimagen1').html('');
                            $('#mostrarimagen2').html('');
                            $('#mostrarimagen3').html('');
                            $('#mostrarimagen4').html('');


                            $('.mensajecedula').html("")
                        }
                    });
                }

                function validaImagen(archivo = '', path = '') {
                    if ((archivo != null) && (archivo.length > 0)) {
                        var archivo = archivo.replace(/ /g, "%20");
                        // verificar si es imagen o pdf
                        if (get_extension(archivo) == 'pdf')
                            return "<a href='" + path + archivo + "' target='_blank'>Ver Archivo</a>";
                        else
                            return "<a href='" + path + archivo + "' target='_blank'><img src=" + path + archivo + " height=\"120\"></a>";
                    }
                    else
                        return "n/a";
                }

                function get_extension(filename) {
                    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
                }
            });
        </script>
        </body>
        </html>
    <?php }
}
?>