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
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>+
</head>

<body>
<div class="container contact-form">
    <form enctype="multipart/form-data" id="formularioCedula" method="post">
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

<div class="container contact-form" id="consulta" style="display: block">

    <h3>CONSULTE SU TRAMITE O SANCION </h3>
    <P>Actualmente nos encontramos trabajando duramente por poner a disposición de la ciudadanía toda la información que disponemos, en caso de
    no desplegarse lo solitado llene el siguiente formulario, uno de nuestros funcionarios realizará la búsqueda en nuestro registros, y se contactará con usted.</P>
    <form enctype="multipart/form-data" id="formularioConsulta" method="post">
        <div class="row">

            <div class="form-group">
                <label for="cedulaformulario">CEDULA *</label>
                <input type="text" class="form-control" id="cedulaformulario" name="cedulaformulario" placeholder=""
                       required="required">
            </div>
            <div class="form-group">
                <label for="nombresformulario">NOMBRES COMPLETOS*</label>
                <input type="text" class="form-control " id="nombresformulario" name="nombresformulario" required="required"
                       placeholder="Nombres">
            </div>
            <div class="form-group">
                <label for="apellidosformulario">APELLIDOS COMPLETOS*</label>
                <input type="text" class="form-control " id="apellidosformulario" name="apellidosformulario" required="required"
                       placeholder="Apellidos">
            </div>

            <div class="form-group">
                <label for="correo">CORREO ELECTRONICO*</label>
                <input id="correoformulario" type="text" name="correoformulario" class="form-control" required="required"
                       placeholder="Ingrese su correo">
            </div>
            <div class="form-group">
                <label for="celularformulario">CELULAR</label>
                <input id="celularformulario" type="text" name="celularformulario" class="form-control" required="required"
                       placeholder="Ingrese su número celular">
            </div>

            <div class="form-group">
                <label for="documentoformulario">DOCUMENTO SOLICITADO (OFICIO, MEMO, EXPEDIENTE, ETC).</label>
                <textarea class="form-control" id="documentoformulario" name="documentoformulario" required="required"
                          rows="3" placeholder="Ingrese el número de documento solicitado"></textarea>
            </div>
            <div class="form-group">
                <label for="observacionesformulario">OBSERVACIONES.</label>
                <textarea class="form-control" id="observacionesformulario" name="observacionesformulario" required="required"
                          rows="3"></textarea>
            </div>

            <div class="form-group">
                <label for="idzonal">Zonal*</label>
                <select name="idzonal" class="form-control" id="idzonal" required="required"
                        data-error="requerido.">
                    <option value=""></option>
                </select>
            </div>

            <div class="form-group">
                <div class="custom-file">
                    <label class="custom-file-label" for="archivo">Imagen Cédula.</label>
                    <input type="file" class="custom-file-input" id="archivo1" lang="es" name="archivo1"
                           required="required" onchange="validarFile(this);">
                </div>
            </div>

            <div class="form-group" style="padding: 20px 0">
                <div class="form-group col-md-4">
                    <input type="submit" class="btn btn-success btn-send btnContactSubmit" value="ENVIAR FORMULARIO">
                </div>

                <div class="form-group col-md-4">
                    <div class="mensaje2"></div>
                </div>
                <div class="form-group col-md-4">
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
        var existeInformacion = 0;

        $("input[name^='cedula']").change(function () {

            if ($("input[name^='cedula']").val().length == 0) return

            $('.mensaje').html('<div class="blink_me"><b>Buscando</b></div>');
            cedula = $("input[name^='cedula']").val();
            llamadaDatos(cedula);
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

        $("#formularioCedula").on("submit", function (e) {
            $('.mensaje').html('<div class="blink_me"><b>Buscando</b></div>');
            e.preventDefault();
            var formData = new FormData(document.getElementById("formularioCedula"));
            formData.append("dato", "valor");
            var cedula = $("input[name^='cedula']").val();
            llamadaDatos(cedula);
        })


        $("#formularioConsulta").on("submit", function (e) {

            $('.mensaje2').html('<div class="blink_me"><b>Enviando</b></div>');
            e.preventDefault();
            var formData = new FormData(document.getElementById("formularioConsulta"));
            //formData.append("dato", "valor");
            $.ajax({
                url: 'formLoad.php?opcion=ingresoConsulta',
                type: "post",
                dataType: "html",
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            }).done(function (res) {
                $('.mensaje2').html('<p><b>Formulario enviado exitosamente. </br> Recibirá un correo electónico para validar su solicitud.</b></p>');

                // TODO descomentar la siguiente linea en produccion
                //  $('#myForm')[0].reset();
            });
        })

        function llamadaDatos(cedula) {
            $("#consulta").show();
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
                    }
                    //$("#consulta").hide();
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

    function validarFile(all)
    {
        //EXTENSIONES Y TAMANO PERMITIDO.
        var extensiones_permitidas = [".png",".jpg", ".jpeg", ".pdf", ".doc", ".docx" ];
        var tamano = 8; // EXPRESADO EN MB.
        var rutayarchivo = all.value;
        var ultimo_punto = all.value.lastIndexOf(".");
        var extension = rutayarchivo.slice(ultimo_punto, rutayarchivo.length);
        if(extensiones_permitidas.indexOf(extension) == -1)
        {
            alert("Extensión de archivo no valida");
            document.getElementById(all.id).value = "";
            return; // Si la extension es no válida ya no chequeo lo de abajo.
        }
        if((all.files[0].size / 1048576) > tamano)
        {
            alert("El archivo no puede superar los "+tamano+"MB");
            document.getElementById(all.id).value = "";
            return;
        }
    }
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