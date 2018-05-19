<?php
$para      = 'byron.herrera@quito.gob.ec';
$titulo    = 'El título';
$mensaje   = 'Hola';
$cabeceras = 'From: byron.herrera@quito.gob.ec' . "\r\n" .
    'Reply-To: webmaster@example.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($para, $titulo, $mensaje, $cabeceras);
