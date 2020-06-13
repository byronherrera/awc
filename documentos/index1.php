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
            <title>ARCHIVOS CONTRATOS</title>
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
            <h3>ARCHIVOS CONTRATOS</h3>
                <div class="row">

                    <div class="form-group">
                        <label for="cedula">CEDULA*</label>
                         <?php
$resultado = obtenerListadoDeArchivos("/var/www/html/documentos/archivos", false);

print_r($resultado);

function obtenerListadoDeArchivos($directorio, $recursivo=false){

  // Array en el que obtendremos los resultados
  $res = array();

  // Agregamos la barra invertida al final en caso de que no exista
  if(substr($directorio, -1) != "/") $directorio .= "/";

  // Creamos un puntero al directorio y obtenemos el listado de archivos
  $dir = @dir($directorio) or die("getFileList: Error abriendo el directorio $directorio para leerlo");
  while(($archivo = $dir->read()) !== false) {
    // Obviamos los archivos ocultos
    if($archivo[0] == ".") continue;
    if(is_dir($directorio . $archivo)) {
      $res[] = array(
        "Nombre" => $directorio . $archivo . "/",
        "Tamaño" => 0,
        "Modificado" => filemtime($directorio . $archivo)
      );
      if($recursivo && is_readable($directorio . $archivo . "/")) {
        $directorioInterior= $directorio . $archivo . "/";
        $res = array_merge($res, obtenerListadoDeArchivos($directorioInterior, true));
      }
    } else if (is_readable($directorio . $archivo)) {
        $res[] = array(
          "Nombre" => $directorio . $archivo,
          "Tamaño" => filesize($directorio . $archivo),
          "Modificado" => filemtime($directorio . $archivo)
        );
    }
  }
  $dir->close();
  return $res;
}
                         ?>
                        <div class="mensajecedula"></div>
                    </div>
                    
        </div>

        <script src="vendor/jquery/jquery-1.8.3.min.js"></script>
        <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="vendor/datetimepicker/bootstrap-datetimepicker.js" charset="UTF-8"></script>
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