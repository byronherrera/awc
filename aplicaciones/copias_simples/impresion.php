<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es-es" lang="es-es" dir="ltr">

<!--[if lt IE 7]>
<html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>
<html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>
<html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" lang="en"> <!--<![endif]-->

<head>

    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <meta name="rights" content="Agencia Metropolitana de Control"/>
    <meta name="description" content="Agencia Metropolitana de Control"/>
    <meta name="generator" content=""/>
    <title>PETICION DE COPIAS SIMPLES</title>
    <link href="../vendor/favicon.ico" rel="shortcut icon" type="image/vnd.microsoft.icon"/>

    <link href="../vendor/joomla/joodb.css" rel="stylesheet" type="text/css"/>
    <link href="../vendor/joomla/featherlight.min.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="../vendor/joomla/bootstrap.min.css" type="text/css"/>
    <link rel="stylesheet" href="../vendor/joomla//bootstrap-responsive.css" type="text/css"/>
    <link rel="stylesheet" href="../vendor/joomla/joomla.css" type="text/css"/>
    <link rel="stylesheet" href="../vendor/joomla/template.css" type="text/css"/>
    <link rel="stylesheet" href="../vendor/joomla/k2style.css" type="text/css"/>
    <script src="../vendor/jquery/jquery-1.8.3.min.js" type="text/javascript"></script>

    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

    <!--[if IE 7]>
    <![endif]-->
</head>

<body class="contentpane">
<div class="container-fluid" id="fav-mainwrap">
    <div class="row-fluid">
        <div id="fav-main" class="clearfix">
            <div class="span12">
                <div id="system-message-container">
                </div>

                <div class="joodb database-article">
                    <!-- see components/com_joodb/assets/joodb.css for style definitions -->
                    <div style="float: right; text-align: right; width: 100%;" class="separador"><img
                                src="../vendor/logoamc.png" alt="*" class="clear"
                                style="width: 30%; margin: 0; pading 0"/></div>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <div class="title center clear">AGENCIA METROPOLITANA DE CONTROL</div>

                                <div class="title center">PETICION DE COPIAS SIMPLES</div>

                                <div class="big separador">
                                    <?php
                                    $date = new DateTime($_GET ['fecha']);
                                    date_default_timezone_set("America/Mexico_City");
                                  $meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
					$mesacual=  date('n') - 1;
					$mes = $meses[$mesacual];


                                    echo 'DMQ ' . $date->format('d') . ' de ' . $mes . ' de ' . $date->format('Y'); // 31-07-2012
                                    ?>

                                </div>
                                <div class="big separador">
                                </div>

                                <div class="title">Señor (a):</div>
                                <div class="title">DIRECTOR y/o FUNCIONARIO DE:<br/>
                                </div>
                                <div class="title"><?php echo $_GET ['direccion']; ?><br/>
                                </div>

                                <div>Yo, <span class="big"><?php
                                        echo $_GET ['nombres'] . " " . $_GET['apellidos'];
                                        ?></span> con cédula de ciudadanía No.
                                    <span class="big"><?php
                                        echo $_GET ['cedula'];
                                        ?></span>
                                    <?php
                                    if ($_GET ['abogado'] != '') {
                                    ?>
                                    y/o, Doctor / Abogado <span class="big"><?php
                                        echo $_GET ['abogado'];
                                        ?></span>
                                    en calidad de abogado patrocinador de <span class="big"><?php
                                        echo $_GET ['nombres'] . " " . $_GET['apellidos'];
                                        ?></span>
                                        <?php
                                    };
                                    ?>


                                    dentro del expediente administrativo No. <span class="big"><?php
                                        echo $_GET ['expediente'];
                                        ?></span> y, de
                                    acuerdo a la Constitución de la República del Ecuador en el artículo
                                    75 y 76, numeral 1 y 7, literal a) y d), solicito copias simples del expediente No.
                                    <span class="big"><?php
                                        echo $_GET ['expediente'];
                                        ?></span>
                                    <?php
                                    if ($_GET ['otrodocumento'] != '') {
                                        ?>
                                        y/o del documento <span class="big"><?php
                                            echo $_GET ['otrodocumento'];
                                            ?></span>
                                        <?php
                                    }
                                    ?>.
                                    <br/><br/></div>


                                <div>Señalo el correo electrónico, para posteriores notificaciones <span class="big"><?php
                                        echo $_GET ['correoelectronico'];
                                        ?></span><br/><br/>
                                </div>

                                <div>Atentamente</br></br></br>____________________</br>
                                    <span class="big"><?php
                                        echo $_GET ['nombres'] . " " . $_GET['apellidos'];
                                        ?></span></br>
                                    <span class="big">C.C <?php
                                        echo $_GET ['cedula'];
                                        ?></span>
                                </div>
                                <?php
                                if ($_GET ['abogado'] != '') {
                                    ?>
                                    <div>y/o</br></br></br>____________________</br>
                                        <span class="big"><?php
                                            echo $_GET ['abogado'];
                                            ?></span></br>
                                        <span class="big">Matrícula No. <?php
                                            echo $_GET ['abogadomatricula'];
                                            ?></span>
                                    </div>
                                    <?php
                                };
                                ?>

                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <script type="text/javascript">
                    <!--
                    // Jquery encapsulation
                    (function ($) {
                        $(document).ready(function () {
                            printnow = confirm('Print Page');
                            if (printnow) window.print();
                        });
                    })(jQuery);
                    //-->
                </script>
            </div>
        </div>
    </div>
</div>
</body>
</html>