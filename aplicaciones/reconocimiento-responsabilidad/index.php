<?php
require_once('../../server/os.php');
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="robots" content="noindex, nofollow">
    <title>SOLICITUD DE RECEPCION DE ALLANAMIENTO</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <link href="../vendor/datetimepicker/bootstrap-datetimepicker.min.css" rel="stylesheet" media="screen">
    <link href="css/form-invede.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
</head>

<body>
<div class="container contact-form">
    <h1 style="text-align: center">SOLICITUD DE RECONOCIMIENTO DE RESPONSABILIDAD Y PAGO VOLUNTARIO
    </h1>
    <div style="height: 30px"></div>
    <form enctype="multipart/form-data" id="myForm" method="post">
        <div class="row">
            <label for="cedula">Acorde a lo dispuesto en el Código Orgánico Aministrativo (COA), Artículo 253, el ciudadano reconoce su responsabilidad a la infracción con la aceptación voluntaria de la sanción.<strong>CONTINUAR</strong></label>
            <div style="height: 30px"></div>

            <label for="cedula">MOTIVO*</label>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="direccion" id="radio1" value="INSPECCIÓN">
                <label class="form-check-label" for="direccion1">
                    1. LUAE CON MEDIDAD CAUTELAR (CON CLAUSURA)
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="direccion" id="radio2" value="INSTRUCCIÓN">
                <label class="form-check-label" for="direccion2">
                    2. LUAE SIN MEDIDA CAUTELAR (SIN CLAUSURA)
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="direccion" id="radio3" value="RESOLUCIÓN">
                <label class="form-check-label" for="direccion3">
                    3. MASCARILLA CON PETICIÓN DE TRABAJO COMUNITARIO
                </label>
            </div>
            <div class="form-check disabled">
                <input class="form-check-input" type="radio" name="direccion" id="radio4" value="EJECUCIÓN">
                <label class="form-check-label" for="direccion4">
                    4. MASCARILLA CON PAGO DE MULTA
                </label>
            </div>
            <div class="form-check disabled">
                <input class="form-check-input" type="radio" name="direccion" id="radio5" value="SECRETARIA GENERAL"
                       required="required">
                <label class="form-check-label" for="direccion5">
                    5. LIBADORES CON PETICIÓN DE TRABAJO COMUNITARIO
                </label>
            </div>
            <div class="form-check disabled">
                <input class="form-check-input" type="radio" name="direccion" id="radio5" value="SECRETARIA GENERAL"
                       required="required">
                <label class="form-check-label" for="direccion5">
                    6. LIBADORES CON PAGO DE MULTA
                </label>
            </div>
            <div class="form-check disabled">
                <input class="form-check-input" type="radio" name="direccion" id="radio5" value="SECRETARIA GENERAL"
                       required="required">
                <label class="form-check-label" for="direccion5">
                    7. PUBLICIDAD
                </label>
            </div>
            <div class="form-check disabled">
                <input class="form-check-input" type="radio" name="direccion" id="radio5" value="SECRETARIA GENERAL"
                       required="required">
                <label class="form-check-label" for="direccion5">
                    8. ACTIVIDAD ECONOMICA EN ESPACIO PÚBLICO
                </label>
            </div>
            <div style="height: 30px"></div>

            <div style="height: 30px"></div>

            <div class="form-group">
                <label for="cedula">CEDULA*</label>
                <input type="number" class="form-control senddata" id="cedula" name="cedula" placeholder=""
                       required="required">
                <div class="mensajecedula"></div>
            </div>
            <div class="form-group">
                <div class="form-group col-md-6">
                    <label for="nombres">NOMBRES COMPLETOS*</label>
                    <input type="text" class="form-control senddata" id="nombres" name="nombres" required="required"
                           placeholder="Nombres">
                </div>
                <div class="form-group col-md-6">
                    <label for="apellidos">APELLIDOS COMPLETOS*</label>
                    <input type="text" class="form-control senddata" id="apellidos" name="apellidos" required="required"
                           placeholder="Apellidos">
                </div>
            </div>
            <div class="form-group">
                <label for="idzonal">ZONAL*</label>
                <select name="idzonal" class="form-control senddata" id="idzonal" required="required"
                        data-error="requerido." placeholder="Ingrese zonal">
                    <option value=""></option>
                </select>
            </div>
            <div class="form-group">
                <label for="tipoadministrador">TIPO ADMINISTRADOR</label>
                <input id="tipoadministrador" type="text" name="tipoadministrador" class="form-control senddata"
                       placeholder="Tipo administrador" required="required">
            </div>

            <div class="form-group">
                <label for="establecimiento">NOMBRE ESTABLECIMIENTO*</label>
                <input id="establecimiento" type="text" name="establecimiento" class="form-control senddata" required="required"
                       placeholder="Ingrese el nombre del estrablecimiento">
            </div>

            <div class="form-group">
                <label for="ubicacion">UBICACION</label>
                <input id="ubicacion" type="text" name="ubicacion" class="form-control senddata"
                       placeholder="Ingrese la ubicación del establecimiento">
            </div>

            <div class="form-group">
                <label for="actividad">ACTIVIDAD COMERCIAL</label>
                <input id="actividad" type="text" name="actividad" class="form-control senddata"
                       placeholder="Ingrese la actividad a la que se dedica">
            </div>

            <div class="form-group">
                <label for="fechaacto">FECHA CLUASURA/SANCION</label>
                <input class="form-control senddata" size="16" type="text" name="fechaacto" id="fechaacto"
                       required="required" style="background-color: #fff;" readonly>
            </div>
            <div class="form-group">
                <label for="horaacto">HORA CLAUSURA/SANCION</label>
                <input class="form-control senddata" size="16" type="text" name="horaacto" id="horaacto"
                       required="required" style="background-color: #fff;" readonly>
            </div>

            <div class="form-group">
                <label for="descripcion">DESCRIPICON</label>
                <input id="descripcion" type="text" name="descripcion" class="form-control senddata"
                       placeholder="Ingrese la descripción de la sanción / clausura">
            </div>
            <div class="form-group">
                <label for="domicilio">DOMICILIO</label>
                <input id="domicilio" type="text" name="domicilio" class="form-control senddata"
                       placeholder="Ingrese su domicilio">
            </div>
            <div class="form-group">
                <label for="domicilio">CORREO ELECTRONICO NOTIFICACION</label>
                <input id="domicilio" type="text" name="domicilio" class="form-control senddata"
                       placeholder="Ingrese su correo electrónico">
            </div>
            <div class="form-group">
                <label for="celular">CELULAR</label>
                <input id="celular" type="text" name="celular" class="form-control senddata"
                       placeholder="Ingrese su número celular">
            </div>

            <div class="form-group">
                <label for="fecha">FECHA SOLICITUD</label>
                <input class="form-control senddata" size="16" type="text" name="fecha" id="fecha"
                       required="required" style="background-color: #fff;" readonly>
            </div>
            <div class="form-group">
                <label for="obervaciones">OBSERVACIONES</label>
                <input id="obervaciones" type="text" name="obervaciones" class="form-control senddata"
                       placeholder="Ingrese sus observaciones">
            </div>
            <div style="height: 30px"></div>
            <div class="form-group">
                <p><label for="fecha">Una vez completados todos los campos necesarios podra continuar</label></p>
                <input type="BUTTON" class="btn btn-success" id="btn-continuar" value="CONTINUAR">
                <div class="mensaje2"></div>
            </div>
            <div style="height: 30px"></div>
            <div id="solicitud">
                <div class="form-group">
                    <div class="custom-file">
                        <p><label for="fecha">Imprima y firme la siguiente solicud. Escanéelo y lo anexa en el presente
                                formulario</label></p>

                        <label class="custom-file-label" for="archivo">ABRIR SOLICITUD</label>
                        <a href="impresion.php" title="Print" id="linksolicitud"
                           onclick="window.open(this.href,'win2','status=no,toolbar=no,scrollbars=yes,titlebar=no,menubar=no,resizable=yes,width=720,height=560,directories=no,location=no'); return false;"
                           rel="nofollow">
                            &nbsp;Imprimirt <span class="glyphicon glyphicon-print" aria-hidden="true"></span></a>
                    </div>
                </div>
            </div>
            <div style="height: 30px"></div>

            <div id="botonsolicitud">
                <div class="form-group">
                    <div class="custom-file">
                        <label class="custom-file-label" for="archivo">Subir solicitud </label>
                        <input type="file" class="custom-file-input" id="archivo1" lang="es" name="archivo1"
                               required="required">
                    </div>
                </div>
            </div>

            <div style="height: 30px"></div>
            <div id="botonenviar">
                <div class="form-group">
                    <input type="submit" class="btn btn-success" value="ENVIAR FORMULARIO">
                    <div class="mensaje"><p></p></div>
                    <div style="height: 30px"></div>
                </div>
            </div>
    </form>
</div>


<script src="../vendor/jquery/jquery-1.8.3.min.js"></script>
<script src="../vendor/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="../vendor/datetimepicker/bootstrap-datetimepicker.js" charset="UTF-8"></script>
<script type="text/javascript" src="../vendor/datetimepicker/locales/bootstrap-datetimepicker.es.js"
        charset="UTF-8"></script>
<script type="text/javascript">
    $(document).ready(function () {

        $('#botonenviar').hide();
        $('#botonsolicitud').hide();
        $('#solicitud').hide();

        var today = new Date();
        var todayMaximoHoras = new Date();
        var date = new Date();
        var dateStr =
            date.getFullYear() + "-" + ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
            ("00" + date.getDate()).slice(-2) + "T" +
            ("00" + date.getHours()).slice(-2) + ":" +
            ("00" + date.getMinutes()).slice(-2) + ':00';

        document.getElementById('fecha').value = dateStr;
        /*
                $("#btn-continuar").click(function () {
                    validarDatos();
                    prepararNuevoLink();
                    $('#solicitud').show();
                });
        */
        $("#btn-continuar").click(function () {
            if (validarDatos()) {
                prepararNuevoLink();
                $('#solicitud').show();
            } else {
                $('.mensaje2').html('<div class="blink_me"><b>Faltan campos obligatorios</b></div>');

            }
            ;
        });

        $("#linksolicitud").click(function () {
            $('#botonenviar').show();
            $('#botonsolicitud').show();
        });

        function validarDatos() {
            return $('#cedula')[0].checkValidity() &&
                $('#nombres')[0].checkValidity() &&
                $('#apellidos')[0].checkValidity() &&
                $('#correoelectronico')[0].checkValidity() &&
                $('#expediente')[0].checkValidity() &&
                $('#fecha')[0].checkValidity() &&
                $('#radio1')[0].checkValidity();
        }

        function prepararNuevoLink() {
            var cedula = $('#cedula').val();
            var nombres = $('#nombres').val();
            var apellidos = $('#apellidos').val();
            var correoelectronico = $('#correoelectronico').val();
            var abogado = $('#abogado').val();
            var abogadomatricula = $('#abogadomatricula').val();

            var idzonal = $('#idzonal').val();
            var expediente = $('#expediente').val();
            var otrodocumento = $('#otrodocumento').val();
            var fecha = $('#fecha').val();
            var direccion = $('input:radio[name=direccion]:checked').val();

            $("#linksolicitud").attr("href", "impresion.php?cedula=" + cedula
                + "&nombres=" + nombres
                + "&apellidos=" + apellidos
                + "&correoelectronico=" + correoelectronico
                + "&abogado=" + abogado
                + "&abogadomatricula=" + abogadomatricula
                + "&idzonal=" + idzonal
                + "&expediente=" + expediente
                + "&otrodocumento=" + otrodocumento
                + "&fecha=" + fecha
                + "&direccion=" + direccion)
        };

        $("input").change(function () {
            console.log("cambio de elemento")
        });

        /*Guardando los datos en el LocalStorage*/


        $("#idzonal").change(function () {
            var idzonal = $('#idzonal option:selected').val();
            localStorage.setItem("idzonal", idzonal);
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
                $('.mensaje').html('<p><b>Formulario enviado exitosamente</b></p>');
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

    });
</script>

</body>
</html>
    