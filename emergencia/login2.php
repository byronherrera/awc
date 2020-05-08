<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="robots" content="noindex, nofollow">
    <title>LOGIN</title>
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
    <h3>LOGIN INFRACCIONES EMERGENCIA</h3>
    <div class="iframedinar">
        <iframe id="frame" src="" width="100%" height="80px" frameBorder="0"></iframe>
    </div>
    <form id="myForm" method="post">
        <div class="row">

            <div class="form-group">
                <label for="user">Correo Electrónico*</label>
                <input type="text" class="form-control" id="user" name="user" placeholder=""
                       required="required">
                <div class="mensajeuser"></div>
            </div>
            <div class="form-group">
                <label for="pass">Contraseña*</label>
                <input type="password" class="form-control " id="pass" name="pass" required="required"
                       placeholder="pass">
            </div>

            <div class="form-group">
                <label for="pass1">El usuario y contraseña son las mismas del sistema MATIS-AMC</label>
            </div>


            <div class="form-group">
                <div class="form-group col-md-6">
                    <input type="submit" class="btn btn-success btn-send btnContactSubmit" value="Ingresar">
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
<script type="text/javascript" src="../client/misc/ext-core.js"></script>
<script type="text/javascript" src="../client/misc/cookies.js"></script>


<script type="text/javascript">
    $(document).ready(function () {

        /*Guardando los datos en el LocalStorage*/
        $("#user").change(function () {
            var idFuncionario = $('#user').val();
            localStorage.setItem("idFuncionario", idFuncionario);
        });
        $("#user").val(localStorage.getItem("idFuncionario"));
        
        // envio del formulario
        $("#myForm").on("submit", function (e) {
            $('.mensaje').html('<div class="blink_me"><b>Enviado formulario</b></div>');
            e.preventDefault();
            var f = $(this);
            var formData = new FormData(document.getElementById("myForm"));
            formData.append("service", "login");
            formData.append("group", "");

            $.ajax({
                url: '../servicesalone.php',
                type: "post",
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            }).done(function (o) {
                $('.mensaje').html('<b>Formulario enviado</b>');
                $('#myForm')[0].reset();
                $('.mensajecedula').html("");
                $("#frame").attr("src", "");

                var d = Ext.decode(o);

                if (typeof d == 'object') {
                    if (d.success == true) {
                        if (d.sessionId !== '') {
                            // get the path
                            var path = window.location.pathname;
                            path = path.substring(0, path.lastIndexOf('/') + 1);

                            // set the cookie
                            set_cookie('sessionId', d.sessionId, '', path, '', '');
                            console.log (path+"totales.php")
                            // redirect the window
                            window.location = path+"totales.php";
                        }
                    }
                }
            });
        })
    });
</script>

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-101563972-2"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-101563972-2');
</script>

</body>
</html>