<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="robots" content="noindex, nofollow">
    <title>Accion Flujo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <link href="vendor/datetimepicker/bootstrap-datetimepicker.min.css" rel="stylesheet" media="screen">
    <link href="css/form-invede.css" rel="stylesheet">
</head>

<body>
<div class="container contact-form">
    <div class="contact-image">
        <img src="img/rocket_contact.png" alt="rocket_contact"/>
    </div>
    <form action = "" id="myForm">
        <h3 id="titulo">ACCION REQUERIDA PARA APROBAR/NEGAR</h3>
        
        <div class="row">
            <div class="form-group">
                <label for="negocio">Escriba su motivo</label>
                <input type="text" class="form-control" id="observacion" name="observacion" placeholder="Observacion"
                       required="required">
            </div>
            <div class="form-group">
                <div class="form-group col-md-6">
                    <input type="submit" class="btn btn-success btn-send btnContactSubmit" value="Enviar">
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
  var today = new Date();
    
    function getSearchParams(k){
        var p={};
        location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){p[k]=v})
        return k?p[k]:p;
    }

    $(document).ready(function() {
        id = getSearchParams("id");
        accion = getSearchParams("accion");
        etapa =  getSearchParams("etapa");
        if (accion == 'aprobar') {
            $('h3#titulo').html('ACCION REQUERIDA PARA APROBAR');
            } else 
            {
                $('h3#titulo').html('ACCION REQUERIDA PARA NEGAR');                
            }

        $("form").submit(function() {
            event.preventDefault();// using this page stop being refreshing
            $('.mensaje').html('<div class="blink_me"><b>Enviado respuesta</b></div>');
            $.ajax({
                type: 'POST',
                url: 'formLoad.php?opcion=aprobar&id=' + id + '&accion=' + accion + '&etapa=' + etapa,
                data: $('form').serialize(),
                success: function (msg ) {
                    var obj = JSON.parse(msg)
                    $('.mensaje').html('<b>Respuesta recibida</b>, ' + obj.msg );
                    $('#myForm')[0].reset();
                }
            });
        });
    });
</script>
</body>
</html>
