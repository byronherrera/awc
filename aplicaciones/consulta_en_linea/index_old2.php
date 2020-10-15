<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="robots" content="noindex, nofollow">
    <title>CONSULTAS EN LINEA DEL CIUDADANO</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <link href="../vendor/datetimepicker/bootstrap-datetimepicker.min.css" rel="stylesheet" media="screen">
    <link href="css/form-ifram.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
</head>

<body>
<div class="container contact-form">
    <form enctype="multipart/form-data" id="myForm" method="post">
        <div class="row col-md-12">
            <div class="form-group">
                <label for="cedula">INGRESE CEDULA *</label>
                <!--                <label for="cedula">INGRESE CEDULA / NOMBRES COMPLETOS / NÚMERO DE ACTA / NUMERO DE EXPEDIENTE*</label>-->
                <input type="text" class="form-control" id="cedula" name="cedula" placeholder=""
                       required="required">
            </div>
            <div class="form-group">
                <div class="form-group col-md-6">
                    <input type="submit" class="btn btn-success btn-send btnContactSubmit" value="Buscar">
                </div>
                <div class="form-group col-md-6">
                    <div class="mensaje"></div>
                </div>
            </div>
        </div>
    </form>
</div>
<!--ACTOS DE INCIO DE BIOSEGURIDAD-->
<section>
    <div class="container">
        <div class="row">
            <div class="actosbioseguridad"></div>
        </div>
    </div>
</section>

<!--ACTOS DE INCIO DE CLAUSURA LOCALES-->
<section>
    <div class="container">
        <div class="row">
            <div class="actosclausura"></div>
        </div>
    </div>
</section>

<!--INFORMACION INSTRUCCION-->
<section>
    <div class="container">
        <div class="row">
            <div class="dataInstruccion"></div>
        </div>
    </div>
</section>

<!--INFORMACION RESOLUCION-->
<section>
    <div class="container">
        <div class="row">
            <div class="dataResolucion"></div>
        </div>
    </div>
</section>

<!--INFORMACION EJECUCION-->
<section>
    <div class="container">
        <div class="row">
            <div class="dataEjecucion"></div>
        </div>
    </div>
</section>
<script src="../vendor/jquery/jquery-1.8.3.min.js"></script>
<script src="../vendor/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="../vendor/datetimepicker/bootstrap-datetimepicker.js" charset="UTF-8"></script>
<script type="text/javascript" src="../vendor/datetimepicker/locales/bootstrap-datetimepicker.es.js"
        charset="UTF-8"></script>
<script type="text/javascript">
    $(document).ready(function () {
        var existeInformacion = 0;

        $("input[name^='cedula']").change(function () {
            console.log($("input[name^='cedula']").val().length)
            if ($("input[name^='cedula']").val().length == 0) return

            $('.mensaje').html('<div class="blink_me"><b>Buscando</b></div>');
            cedula = $("input[name^='cedula']").val();
            llamadaDatos(cedula);
        });

        $("#myForm").on("submit", function (e) {
            $('.mensaje').html('<div class="blink_me"><b>Buscando</b></div>');
            e.preventDefault();
            var formData = new FormData(document.getElementById("myForm"));
            formData.append("dato", "valor");
            var cedula = $("input[name^='cedula']").val();
            llamadaDatos(cedula);
        })

        function llamadaDatos(cedula) {
            getContent(cedula, 'actosbioseguridad', '.actosbioseguridad');
            getContent(cedula, 'actosclausura', '.actosclausura');
            //  getContent(cedula, 'dataInstruccion', '.dataInstruccion');
            getContent(cedula, 'dataResolucion', '.dataResolucion');
            getContent(cedula, 'dataEjecucion', '.dataEjecucion');
        }

        function getContent(cedula, opcion, destino) {
            // carga iframe con informacion de dinardat
            $(destino).html('');

            $.getJSON('formLoad.php?opcion=' + opcion + '&usuario=' + cedula, function (data) {

                if (data.success) {
                    switch (opcion) {
                        case 'actosbioseguridad' :
                            html = formatoactosbioseguridad(data)
                            break;
                        case 'actosclausura' :
                            html = formatoactosclausura(data)
                            break;
                        case 'dataInstruccion' :
                            html = formatodataInstruccion(data)
                            break;
                        case 'dataResolucion' :
                            html = formatodataResolucion(data)
                            break;
                        case 'dataEjecucion' :
                            html = formatodataEjecucion(data)
                            break;
                        default:
                        // code
                    }
                    $(destino).html(html)
                } else {
                    if (!existeInformacion)
                        $('.mensaje').html('<div><b>No se encuentra información</b></div>');
                    else
                        $('.mensaje').html('');
                }
            });
        }

        function formatoactosbioseguridad(data) {
            var html = '';
            $.each(data.data, function (key, val) {
                if (!existeInformacion)
                    existeInformacion = 1;
                nombres = val['nombres'];
                apellidos = val['apellidos'];
                if (JSON.parse(val['imagenacto']) != null)
                    imagenes = JSON.parse(val['imagenacto']);
                else
                    imagenes = JSON.parse('{"archivo1":null,"archivo2":null}');
                html += "<h3>ACTOS INICIO BIOSEGURIDAD  </h3>" +
                    "                   <table class=\"table\">\n" +
                    "                    <tbody>\n" +
                    "                    <tr><th scope=\"row\">Cédula</th><td>" + validaTexto(val['cedula']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Nombres y Apellidos</th><td>" + validaTexto(nombres) + " " + validaTexto(apellidos) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Lugar Infracción</th><td>" + validaTexto(val['lugarinfraccion']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Observaciones</th><td>" + validaTexto(val['observaciones']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Zonal</th><td>" + validaTexto(val['zonal']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Fecha Infracción</th><td>" + validaFecha(val['fecha']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Número Acto Inicio</th><td>" + validaTexto(val['actainfraccion']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Imagen Cédula</th><td>" + validaImagen(imagenes.archivo1, 'https://amcmatis.quito.gob.ec/emergencia/') + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Fotografía Infracción</th><td>" + validaImagen(imagenes.archivo2, 'https://amcmatis.quito.gob.ec/emergencia/') + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Acto Inicio</th><td>" + validaImagen(imagenes.archivo3, 'https://amcmatis.quito.gob.ec/emergencia/') + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Expediente</th><td>" + validaImagen(imagenes.archivo4, 'https://amcmatis.quito.gob.ec/emergencia/') + "</td></tr>\n" +
                    "                    </tbody>\n" +
                    "                </table>"
            });
            return html;
        }

        function formatoactosclausura(data) {
            var html = '';
            if (!existeInformacion)
                existeInformacion = 1;

            $.each(data.data, function (key, val) {
                nombres = val['nombres'];
                apellidos = val['apellidos'];
                if (JSON.parse(val['imagenacto']) != null)
                    imagenes = JSON.parse(val['imagenacto']);
                else
                    imagenes = JSON.parse('{"archivo1":null,"archivo2":null}');
                html += "<h3>ACTOS INICIO LOCALES </h3>" +
                    "                   <table class=\"table\">\n" +
                    "                    <tbody>\n" +
                    "                    <tr><th scope=\"row\">Cédula</th><td>" + validaTexto(val['cedula']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Nombres y Apellidos</th><td>" + validaTexto(nombres) + " " + validaTexto(apellidos) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Lugar Infracción</th><td>" + validaTexto(val['lugarinfraccion']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Observaciones</th><td>" + validaTexto(val['observaciones']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Zonal</th><td>" + validaTexto(val['zonal']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Fecha Infracción</th><td>" + validaFecha(val['fecha']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Número Acto</th><td>" + validaTexto(val['actainfraccion']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Imagen Cédula</th><td>" + validaImagen(imagenes.archivo1, 'https://amcmatis.quito.gob.ec/emergencia/') + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Acto Inicio</th><td>" + validaImagen(imagenes.archivo2, 'https://amcmatis.quito.gob.ec/emergencia/') + "</td></tr>\n" +
                    "                    </tbody>\n" +
                    "                </table>"
            });
            return html;
        }

        function formatodataInstruccion(data) {
            var html = '';
            if (!existeInformacion)
                existeInformacion = 1;
            $.each(data.data, function (key, val) {
                nombres = val['nombres'];
                apellidos = val['apellidos'];
                if (JSON.parse(val['imagenacto']) != null)
                    imagenes = JSON.parse(val['imagenacto']);
                else
                    imagenes = JSON.parse('{"archivo1":null,"archivo2":null}');
                html += "<h3>TRAMITES EN INSTRUCCIÓN</h3>" +
                    "                   <table class=\"table\">\n" +
                    "                    <tbody>\n" +
                    "                    <tr><th scope=\"row\">Cédula</th><td>" + validaTexto(val['cedula']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Nombres y Apellidos</th><td>" + validaTexto(nombres) + " " + validaTexto(apellidos) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Lugar Infracción</th><td>" + validaTexto(val['lugarinfraccion']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Observaciones</th><td>" + validaTexto(val['observaciones']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Zonal</th><td>" + validaTexto(val['zonal']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Fecha Infracción</th><td>" + validaFecha(val['fecha']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Número Acta</th><td>" + validaTexto(val['actainfraccion']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Imagen Cédula</th><td>" + validaImagen(imagenes.archivo2, 'https://amcmatis.quito.gob.ec/emergencia/') + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Acto Inicio</th><td>" + validaImagen(imagenes.archivo1, 'https://amcmatis.quito.gob.ec/emergencia/') + "</td></tr>\n" +
                    "                    </tbody>\n" +
                    "                </table>"
            });
            return html;
        }

        function formatodataResolucion(data) {
            var html = '';
            if (!existeInformacion)
                existeInformacion = 1;

            $.each(data.data, function (key, val) {
                /* if (JSON.parse(val['imagenacto']) != null)
                     imagenes = JSON.parse(val['imagenacto']);
                 else
                     imagenes = JSON.parse('{"archivo1":null,"archivo2":null}');*/
                html += "<h3>TRAMITES EN RESOLUCIÓN</h3>" +
                    "                   <table class=\"table\">\n" +
                    "                    <tbody>\n" +
                    "                    <tr><th scope=\"row\">Cédula/Ruc</th><td>" + validaTexto(val['cedula_ruc']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Nombres y Apellidos</th><td>" + validaTexto(val['nombre_administrado']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Nombre Establecimiento</th><td>" + validaTexto(val['nombre_establecimiento']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Fecha Ingreso</th><td>" + validaFecha(val['fecha_ingreso']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Número de Expediete </th><td>" + validaTexto(val['numero_expediente']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Ver expediente</th><td>" + validaURL(val['url_documento']) + "</td></tr>\n" +
                    //"                    <tr><th scope=\"row\">Imagen Acta</th><td>" + validaImagen(imagenes.archivo1, 'https://amcmatis.quito.gob.ec/emergencia/') + "</td></tr>\n" +
                    "                    </tbody>\n" +
                    "                </table>"
                nombres = val['nombre_administrado'];
            });
            return html;
        }

        function formatodataEjecucion(data) {
            var html = '';
            if (!existeInformacion)
                existeInformacion = 1;
            $.each(data.data, function (key, val) {
                nombres = val['nombres'];
                apellidos = val['apellidos'];
                if (JSON.parse(val['imagenacto']) != null)
                    imagenes = JSON.parse(val['imagenacto']);
                else
                    imagenes = JSON.parse('{"archivo1":null,"archivo2":null}');
                html += "<h3>TRAMITES EN EJECUCIÓN</h3>" +
                    "                   <table class=\"table\">\n" +
                    "                    <tbody>\n" +
                    "                    <tr><th scope=\"row\">Cédula/Ruc</th><td>" + validaTexto(val['cedula_ruc']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Nombres y Apellidos</th><td>" + validaTexto(val['nombre_administrado']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Nombre Establecimiento</th><td>" + validaTexto(val['nombre_establecimiento']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Fecha Ingreso</th><td>" + validaFecha(val['fecha_ingreso']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Número de Expediete </th><td>" + validaTexto(val['numero_expediente']) + "</td></tr>\n" +
                    "                    <tr><th scope=\"row\">Ver expediente</th><td>" + validaURL(val['url_documento']) + "</td></tr>\n" +
                    //"                    <tr><th scope=\"row\">Imagen Acta</th><td>" + validaImagen(imagenes.archivo1, 'https://amcmatis.quito.gob.ec/emergencia/') + "</td></tr>\n" +
                    "                    </tbody>\n" +
                    "                </table>"

            });
            return html;
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

        validaURL

        function validaTexto(texto) {
            if (texto != null)
                return texto;
            else
                return "";
        }

        function validaURL(url) {
            if (url != null)
                return '<a href="' + url + '" target="_blank">Archivo Expediente</a>';
            else
                return "n/a";
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