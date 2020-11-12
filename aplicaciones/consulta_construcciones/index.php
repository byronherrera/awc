<?php
require_once('../../server/os.php');

if (!class_exists('os')) {
    die('Server os class is missing!');
} else {
$os = new os();
if (!$os->session_exists()) {
    header("Location: login.php");
} else {
?><!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="robots" content="noindex, nofollow">
    <title>CONSULTAS DE CONSTRUCCIONES</title>
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

    <h3>CONSULTAS DE NIOs Y CCFs</h3>
    <form enctype="multipart/form-data" id="myForm" method="post">
        <div class="row">

            <div class="form-group">
                <label for="predio">INGRESE PREDIO*</label>
                <input type="text" class="form-control" id="predio" name="predio" placeholder=""
                       required="required">
                <div class="mensajepredio"></div>
                <div class="mensajepredioCcf"></div>
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

<script src="../vendor/jquery/jquery-1.8.3.min.js"></script>
<script src="../vendor/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="../vendor/datetimepicker/bootstrap-datetimepicker.js" charset="UTF-8"></script>
<script type="text/javascript" src="../vendor/datetimepicker/locales/bootstrap-datetimepicker.es.js"
        charset="UTF-8"></script>
<script type="text/javascript">
    $(document).ready(function () {

        $("input[name^='predio']").change(function () {
            recuperaDataNio()
            recuperaDataCcf()

        });

        $("#myForm").on("submit", function (e) {
            e.preventDefault();
            recuperaDataNio()
            recuperaDataCcf()
        })

        function recuperaDataNio() {
            // carga iframe con informacion de dinardat
            $.getJSON('formLoad.php?opcion=predio&predio=' + $("input[name^='predio']").val(), function (data) {
                if (data.success) {
                    num_nio = data.data[0]['num_nio'];
                    proyecto = data.data[0]['proyecto'];
                    predio = data.data[0]['predio'];
                    zona = data.data[0]['zona'];
                    fecha_ingreso = data.data[0]['fecha_ingreso'];

                    $('.mensajepredio').html("<table class=\"table\">\n" +
                        "                    <tbody>\n" +
                        "                    <tr><th scope=\"row\"><h3>NIOS</h3></td></tr>\n" +
                        "                    <tr><th scope=\"row\">NUMERO NIO</th><td>" + validaTexto(num_nio) + "</td></tr>\n" +
                        "                    <tr><th scope=\"row\">NOMBRE PROYECTO</th><td>" + validaTexto(proyecto) + "</td></tr>\n" +
                        "                    <tr><th scope=\"row\">NUMERO DE PREDIO</th><td>" + validaTexto(predio) + "</td></tr>\n" +
                        "                    <tr><th scope=\"row\">ZONAL</th><td>" + validaTexto(zona) + "</td></tr>\n" +
                        "                    <tr><th scope=\"row\">FECHA INGRESO</th><td>" + validaTexto(fecha_ingreso) + "</td></tr>\n" +
                        "                    </tbody>\n" +
                        "                </table>")
                } else {
                    $('.mensajepredio').html("<table class=\"table\">\n" +
                        "                    <tbody>\n" +
                        "                    <tr>\n" +
                    "                        <th scope=\"row\">No existe información de NIO de ese predio</th>\n" +
                        "                    <tr><th scope=\"row\"></td></tr>\n" +
                        "                    </tr>\n" +
                        "                    </tbody>\n" +
                        "                </table>")
                }
            });
        }

        function recuperaDataCcf() {
            // carga iframe con informacion de dinardat
            $.getJSON('formLoad.php?opcion=predioCcf&predio=' + $("input[name^='predio']").val(), function (data) {
                if (data.success) {
                    num_ccf = data.data[0]['id_ccf'];
                    proyecto = data.data[0]['proyecto'];
                    predio = data.data[0]['predio'];
                    zona = data.data[0]['zona'];
                    fecha_ingreso = data.data[0]['fecha_recepcion_documento'];

                    $('.mensajepredioCcf').html("<table class=\"table\">\n" +
                        "                    <tbody>\n" +
                        "                    <tr><th scope=\"row\"><h3>CCF</h3></td></tr>\n" +
                        "                    <tr><th scope=\"row\">NUMERO CCF</th><td>" + validaTexto(num_ccf) + "</td></tr>\n" +
                        "                    <tr><th scope=\"row\">NOMBRE PROYECTO</th><td>" + validaTexto(proyecto) + "</td></tr>\n" +
                        "                    <tr><th scope=\"row\">NUMERO DE PREDIO</th><td>" + validaTexto(predio) + "</td></tr>\n" +
                        "                    <tr><th scope=\"row\">ZONAL</th><td>" + validaTexto(zona) + "</td></tr>\n" +
                        "                    <tr><th scope=\"row\">FECHA INGRESO</th><td>" + validaTexto(fecha_ingreso) + "</td></tr>\n" +
                        "                    </tbody>\n" +
                        "                </table>")
                } else {
                    $('.mensajepredioCcf').html("<table class=\"table\">\n" +
                        "                    <tbody>\n" +
                        "                    <tr>\n" +
                        "                        <th scope=\"row\">No existe información de CCF ese predio</th>\n" +
                        "                    <tr><th scope=\"row\"></td></tr>\n" +
                        "                    </tr>\n" +
                        "                    </tbody>\n" +
                        "                </table>")
                }
            });
        }


        function validaImagen(archivo) {
            if (archivo != null)
                return "<img src=\"" + archivo + "\" height=\"300\">";
            else
                return "";
        }

        function validaTexto(texto) {
            if (texto != null)
                return texto;
            else
                return "";
        }

        function validaFecha(fecha) {
            if (fecha != null)
                return fecha.substr(0, 10);
            else
                return "";
        }
    });
</script>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-101563972-2"></script>
<script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }

    gtag('js', new Date());
    gtag('config', 'UA-101563972-2');
</script>

</body>
</html>
<?php }
}
?>