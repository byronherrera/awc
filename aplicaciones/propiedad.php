<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Jekyll v4.1.1">
    <title>Floating labels example · Bootstrap</title>

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
    <div class="row">
        <div class="col-6 themed-grid-col margen0"><img class="mb-4" src="propiedad/assets/logoagencia.png" alt="" width="100%"></div>
        <div class="col-6 themed-grid-col margen1">
            <h1 class="h1 mb-1 font-weight-normal"><p>CONTROL DE PRENDAS</p></h1>
            <p class="mb-1 font-weight-normal">AÑO DE ADQUISICIÓN <?php echo $_GET['a']; ?></p>
        </div>
    </div>

    <div class="row text-center margen2">
        <div class="col-8 themed-grid-col">
            <p class="mb-1 font-weight-normal">Fecha de entrega: <?php echo $_GET['f']; ?></p>
            <p class="mb-1 font-weight-normal">Prenda: <?php echo $_GET['p']; ?></p>
            <p class="mb-1 font-weight-normal">Código: <?php echo $_GET['c']; ?></p>
        </div>
        <div class="col-4 themed-grid-col">
            <h1 class="h3 mb-3 font-weight-normal"><?php
                $pieces = explode('-', $_GET['c']);
                echo array_pop($pieces); ?></h1>
        </div>
    </div>

    <div class="row  text-center margen3 ">
        <div class="col-12 themed-grid-col">
            <p class="mt-1 mb-1 text-muted ">EN CASO DE ENCONTRAR ESTA PRENDA</p>
            <p class="mt-1 mb-1 text-muted ">LLAMAR AL TELEFONO: 3952300 EXT. 28215</p>
            <p class="mt-1 mb-1 text-muted ">maria.idrovo@quito.gob.ec</p>
        </div>
    </div>
</div>
</body>
</html>