<?php

    header("Access-Control-Allow-Origin: *");

    $nombre = getNombre ($_GET["usuario"]);

    function getNombre ($nombre) {
        return $nombre;
    }
 ?>   

[
{
"fecha": "2020-07-31",
"tema": "Tema : Aca va la descripción del tema a entregar.",
"nombre": "Nombre: <?php echo $nombre; ?>"
},
 {
"fecha": "2020-08-25",
"tema": "Ver tema 2",
"nombre": "Tema: <?php echo $tema; ?>"
},
 {
"fecha": "2020-08-11",
"tema": "Ver tema 3",
"nombre": "Ver tema 3 <?php echo $nombre; ?>"
}

]
