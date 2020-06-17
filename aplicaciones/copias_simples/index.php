<?php
require_once('../../server/os.php');
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="robots" content="noindex, nofollow">
    <title>SOLICITUD DE COPIAS SIMPLES EN LINEA</title>
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
    <h3>SOLICITUD DE COPIAS SIMPLES EN LINEA</h3>
    <form enctype="multipart/form-data" id="myForm" method="post">
        <div class="row">

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
                <label for="correoelectronico">CORREO ELECTRONICO* </label>
                <input id="correoelectronico" type="text" name="correoelectronico" class="form-control senddata"
                       placeholder="Ingrese su correo electrónico" required="required">
            </div>

            <div class="form-group">
                <label for="abogado">ABOGADO PATROCINADOR</label>
                <input id="abogado" type="text" name="abogado" class="form-control"
                       placeholder="Ingrese nombre de abogado patrocinador (opcional)">
            </div>
            <div class="form-group">
                <label for="abogadomatricula">NUM MATRICULA ABOGADO PATROCINADOR</label>
                <input id="abogadomatricula" type="text" name="abogadomatricula" class="form-control senddata"
                       placeholder="Ingrese número de matrícula abogado patrocinador (opcional)">
            </div>
            <div class="form-group">
                <label for="correoabogado">CORREO ELECTRONICO ABOGADO</label>
                <input id="correoabogado" type="text" name="correoabogado" class="form-control senddata"
                       placeholder="Ingrese correo electrónico de abogado patrocinador (opcional)">
            </div>
            <div class="form-group">
                <label for="idzonal">ZONAL*</label>
                <select name="idzonal" class="form-control senddata" id="idzonal" required="required"
                        data-error="requerido." placeholder="Ingrese zonal">
                    <option value=""></option>
                </select>
            </div>

            <div class="form-group">
                <label for="expediente">NÚMERO EXPEDIENTE ADMINISTRATIVO*</label>
                <input id="expediente" type="text" name="expediente" class="form-control senddata" required="required"
                       placeholder="Ingrese el número de expediente administrativo">
            </div>

            <div class="form-group">
                <label for="otrodocumento">OTRO DOCUMENTO, ESPECIFICAR</label>
                <input id="otrodocumento" type="text" name="otrodocumento" class="form-control senddata"
                       placeholder="Ingrese el número o descripción">
            </div>

            <div class="form-group">
                <label for="fecha">FECHA SOLICITUD</label>
                <div class="input-group date form_datetime  " data-date="1994-09-16T05:25:07Z"
                     data-date-format="dd MM yyyy - HH:ii p" data-link-field="dtp_input1">
                    <input class="form-control senddata" size="16" type="text" name="fecha" id="fecha"
                           required="required" style="background-color: #fff;">
                    <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
                    <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                </div>
            </div>

            <div class="form-group">
                <p><label for="fecha">Una vez completados todos los campos necesarios podra continuar</label></p>
                <input type="BUTTON" class="btn btn-success" id="btn-continuar" value="CONTINUAR">
                <div class="mensaje2"></div>
            </div>

            <div id="">
                <div class="form-group">
                    <div class="custom-file">
                        <p><label for="fecha">Imprima y firme la siguiente solicud. Escanéelo y lo anexa en el presente
                                formulario</label></p>

                        <label class="custom-file-label" for="archivo">ABRIR SOLICITUD</label>
                        <a href="pruebaimpresion.php" title="Print"
                           onclick="window.open(this.href,'win2','status=no,toolbar=no,scrollbars=yes,titlebar=no,menubar=no,resizable=yes,width=720,height=560,directories=no,location=no'); return false;"
                           rel="nofollow">
                            &nbsp;Imprimirt <span class="glyphicon glyphicon-print" aria-hidden="true"></span></a>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <div class="custom-file">
                    <label class="custom-file-label" for="archivo">Subir solicitud </label>
                    <input type="file" class="custom-file-input" id="archivo" lang="es" name="archivo" required="required">
                </div>
            </div>

            <div class="form-group">
                <p><label for="fecha">Enviar formulario</label></p>
                <input type="submit" class="btn btn-success" value="ENVIAR">
                <div class="mensaje"><p></p></div>
                <div style="height: 30px"></div>
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


        $("#btn-continuar").click(function () {
            console.log("dd")
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

    });
</script>

</body>
</html>
    