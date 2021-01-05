<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Jekyll v4.1.1">
    <title>ACTO DE INICIO</title>
    <meta name=viewport
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, shrink-to-fit=no, viewport-fit=cover"/>
</head>

<!-- Bootstrap core CSS -->
<link href="propiedad/assets/dist/css/bootstrap.min.css" rel="stylesheet">

<style>
    .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    @media (min-width: 768px) {
        .bd-placeholder-img-lg {
            font-size: 3.5rem;
        }
    }
</style>
<!-- Custom styles for this template -->
<link href="propiedad/floating-labels.css" rel="stylesheet">
</head>
<body>
<div class="form-signin">
    <div class="row margen1">
        <div class="col-6 themed-grid-col mt-1 "><img class="mb-1" src="propiedad/assets/logoagencia.png" alt=""
                                                      width="100%"></div>
    </div>

    <div class="row  margen2">
        <div class="col-12 themed-grid-col">
            <h1 class="h1 mb-2 mt-2 font-weight-normal text-center titulo"> PROPIEDAD: GAD DMQ AGENCIA METROPOLITANA DE
                CONTROL </h1>
            <p class="mb-1 font-weight-normal ">AÑO DE ELABORACION: <?php echo $_GET['a']; ?></p>
            <p class="mb-1 font-weight-normal ">ACTO DE INICIO: <?php echo $_GET['c']; ?></p>
            <p class="mb-1 mt-2 font-weight-normal">NUMERACION: DEL <?php echo $_GET['i']; ?>
                AL <?php echo $_GET['f']; ?></p>
        </div>

    </div>
    <div class="row  text-center margen3 ">
        <div class="col-12 themed-grid-col">
            <p class="mt-1 mb-1 text-muted ">EN CASO DE ENCONTRAR ESTE DOCUMENTO
                LLAMAR AL TELEFONO 3952300 EXT. 28205</p>

        </div>
    </div>
</div>
</body>
</html>