<?php
require_once('../server/os.php');

if (!class_exists('os')) {
    die('Server os class is missing!');
} else {
    $os = new os();
    if (!$os->session_exists()) {
        header("Location: login.php");
    } else {
        ?>
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="utf-8">
            <meta name="robots" content="noindex, nofollow">
            <title>PROCESOS CONTRATACION AMC</title>
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
            <h2>PROCESOS CONTRATACION AMC</h2>

            <div class="container">
                <div class="row">
                    <?php
                    function obtenerListadoDeArchivos($directorio, $recursivo = false, $espacio = '', $url = '')
                    {
                        // Array en el que obtendremos los resultados
                        $res = array();

                        // Agregamos la barra invertida al final en caso de que no exista
                        if (substr($directorio, -1) != "/") $directorio .= "/";

                        // Creamos un puntero al directorio y obtenemos el listado de archivos
                        $dir = @dir($directorio) or die("getFileList: Error abriendo el directorio $directorio para leerlo");
                        while (($archivo = $dir->read()) !== false) {
                            // Obviamos los archivos ocultos
                            if ($archivo[0] == ".") continue;
                            if (is_dir($directorio . $archivo)) {
                                $res[] = array(
                                    "Nombre" => $directorio . $archivo . "/",
                                    "Carpeta" => 1
                                );
                                echo '<div class="col-sm-12">' .
                                    '<p style="font-weight: bold;">' . $espacio . $archivo . '<span class="glyphicon glyphicon-folder-open"></span></p>' .
                                    '</div>'; //caso carpeta
                                if ($recursivo && is_readable($directorio . $archivo . "/")) {
                                    $directorioInterior = $directorio . $archivo . "/";
                                    $res = array_merge($res, obtenerListadoDeArchivos($directorioInterior, true, $espacio . '- ', $url . '\\' . $archivo));
                                }
                            } else if (is_readable($directorio . $archivo)) {
                                $res[] = array(
                                    "Nombre" => $directorio . $archivo,
                                    "Carpeta" => 0
                                );
                                echo '<div class="col-sm-12" style="background-color: #DAE1EA;">' .
                                    '<p style="font-weight: bold;">' . $espacio . '<a href="' . $url . '/' . $archivo . '" target="_blank">' . $archivo . '</a> </p> ' .
                                    '</div>';

                            }
                        }
                        $dir->close();
                        return $res;
                    }

                    //  $resultado = obtenerListadoDeArchivos("/var/www/html/documentos/archivos", true,  '', "https://amcmatis.quito.gob.ec/documentos/archivos" );
                    $resultado = obtenerListadoDeArchivos("c:\Program Files (x86)\Zend\Apache24\htdocs\procesos-amc\documentos\archivos", true, '', "http://localhost/procesos-amc/documentos/archivos");

                    //                    print_r($resultado);
                    ?>
                </div>
            </div>

        </div>

        <script src="vendor/jquery/jquery-1.8.3.min.js"></script>
        <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="vendor/datetimepicker/bootstrap-datetimepicker.js"
                charset="UTF-8"></script>
        <script type="text/javascript" src="vendor/datetimepicker/locales/bootstrap-datetimepicker.es.js"
                charset="UTF-8"></script>
        <script type="text/javascript">
            $(document).ready(function () {


            });
        </script>
        </body>
        </html>
    <?php }
}
?>