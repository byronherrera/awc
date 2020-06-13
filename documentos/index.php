<?php

$resultado = obtenerListadoDeArchivos("c:\Program Files (x86)\Zend\Apache24\htdocs\procesos-amc\documentos\archivos", true);

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