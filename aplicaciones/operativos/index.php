<?php
require_once('../../server/os.php');

if (!class_exists('os')) {
    die('Server os class is missing!');
} else {
$os = new os();
if (!$os->session_exists()) {
    header("Location: login.php");
} else {
?>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
    <title>Operativos </title>
    <link rel="stylesheet" type="text/css" href="../../ext-7.1.0/examples/classic/shared/examples.css" />
    <link rel="stylesheet" type="text/css" href="operativos.css" />

    <!-- GC -->

    <script type="text/javascript" src="../../ext-7.1.0/examples/classic/shared/include-ext.js"></script>
    <script type="text/javascript" src="../../ext-7.1.0/examples/classic/shared/options-toolbar.js"></script>
    <script type="text/javascript" src="../../ext-7.1.0/examples/classic/shared/examples.js"></script>

    <script type="text/javascript" src="operativos.js"></script>
</head>
<body>

</body>
</html>
<?php }
}
?>