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


    <base href="http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/2965"/>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <meta name="rights" content="Agencia Metropolitana de Control"/>
    <meta name="description" content="Agencia Metropolitana de Control"/>
    <meta name="generator" content=""/>
    <title>SOLICITUD DE RECONOCIMIENTO DE RESPONSABILIDAD Y PAGO VOLUNTARIO</title>
    <link href="/templates/bestcomputer/favicon.ico" rel="shortcut icon" type="image/vnd.microsoft.icon"/>
    <link href="/media/joodb/css/joodb.css" rel="stylesheet" type="text/css"/>
    <link href="/media/joodb/css/featherlight.min.css" rel="stylesheet" type="text/css"/>
    <link href="/components/com_tlpteam/assets/css/tlpteam.css" rel="stylesheet" type="text/css"/>
    <script src="/media/jui/js/jquery.min.js?3af170d0feddc655b7e0f41cb8925e51" type="text/javascript"></script>
    <script src="/media/jui/js/jquery-noconflict.js?3af170d0feddc655b7e0f41cb8925e51" type="text/javascript"></script>
    <script src="/media/jui/js/jquery-migrate.min.js?3af170d0feddc655b7e0f41cb8925e51" type="text/javascript"></script>
    <script src="/media/joodb/js/featherlight.min.js" type="text/javascript"></script>


    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

    <link rel="stylesheet" href="/media/jui/css/bootstrap.min.css" type="text/css"/>
    <link rel="stylesheet" href="/media/jui/css/bootstrap-responsive.css" type="text/css"/>
    <link rel="stylesheet" href="/templates/bestcomputer/icons/css/font-awesome.css" type="text/css"/>
    <link rel="stylesheet" href="/templates/bestcomputer/css/joomla.css" type="text/css"/>
    <link rel="stylesheet" href="/templates/bestcomputer/css/template.css" type="text/css"/>
    <link rel="stylesheet" href="/templates/bestcomputer/css/k2style.css" type="text/css"/>

    <!--[if IE 7]>
    <link rel="stylesheet" href="/templates/bestcomputer/icons/css/font-awesome-ie7.min.css">
    <![endif]-->
</head>

<body class="contentpane" style="font-size: 12px !important;">
<div class="container-fluid" id="fav-mainwrap">
    <div class="row-fluid">
        <div id="fav-main" class="clearfix">
            <div class="span12">
                <div id="system-message-container">
                </div>

                <div class="joodb database-article">
                    <!-- see components/com_joodb/assets/joodb.css for style definitions -->
                    <div style="float: right; text-align: right; width: 100%;" class="separador"><img
                                src="/images/logoamc.png" alt="*" class="clear"
                                style="width: 30%; margin: 0; pading 0"/></div>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <div class="title center clear">AGENCIA METROPOLITANA DE CONTROL</div>
                                <div class="big separador">
                                    <?php
                                    $date = new DateTime($_GET ['fecha']);
                                    date_default_timezone_set("America/Mexico_City");
                                    $mes = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"][date("n") - 1];

                                    echo 'Quito ' . $date->format('d') . ' de ' . $mes . ' de ' . $date->format('Y'); // ejempo 31-07-2012
                                    ?>
                                </div>
                                <div class="">Señores:</div>
                                <div class="">AGENCIA METROPOLITANA DE CONTROL</div>
                                <div class="">ZONA <strong>"<?php echo $_GET ['zonal']; ?>"</strong></div>
                                <div class="big separador"></div>
                                <div class="">Presente.-</div>
                                <div class="">De mi consideración:</div>
                                <div class="big separador"></div>

                                <div>
                                    Yo, <strong><?php echo $_GET ['nombres'] . " " . $_GET['apellidos']; ?></strong>, en
                                    calidad de
                                    <strong><?php echo $_GET['tipoadministrador']; ?></strong>,
                                    del establecimiento denominado
                                    <strong><?php echo $_GET['establecimiento']; ?></strong>, con número de cédula/RUC
                                    <strong><?php echo $_GET['cedula']; ?></strong>, ubicado en las calles
                                    <strong><?php echo $_GET['ubicacion']; ?></strong>,
                                    cuya actividad comercial es <strong><?php echo $_GET['actividad']; ?></strong>,
                                    tengo a bien acudir a su autoridad con el fin de exponer y
                                    solicitar lo siguiente:
                                </div>
                                <div>
                                    <?php
                                    $fechaacto = new DateTime($_GET ['fechaacto']);
                                    date_default_timezone_set("America/Mexico_City");
                                    $mesacto = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"][date("n") - 1];
                                    ?>

                                    El día <strong><?php echo $fechaacto->format('d'); ?></strong>. de
                                    <strong><?php echo $mesacto; ?></strong> del
                                    <strong><?php echo $fechaacto->format('Y'); ?></strong> a las
                                    <strong><?php echo $fechaacto->format('H:i'); ?></strong>, se me notificó el Acto
                                    Administrativo de Inicio del
                                    Procedimiento Administrativo Sancionador en Flagrancia, mediante el cual, me da a
                                    conocer que he
                                    cometido la presunta infracción contemplada en la normativa metropolitana, en razón
                                    de que:
                                </div>
                                <div>
                                    <strong><?php echo $_GET['descripcion']; ?></strong>
                                    por lo que se procedió a clausurar el establecimiento de mi propiedad con la
                                    colocación del respectivo sello.
                                </div>
                                <div>
                                    <?php if ($_GET['observaciones'] != '') {
                                        ?>
                                        Observaciones:
                                        <strong><?php echo $_GET['observaciones']; ?></strong>
                                        <?php
                                    } ?>
                                </div>
                                <div class="big separador"></div>
                                <div>
                                    En consecuencia, tengo a bien reconocer mi responsabilidad en el incumplimiento de
                                    la normativa considerada como infracción y me allano a las sanciones que
                                    correspondan conforme el procedimiento señalado en el Código Orgánico
                                    Administrativo, por lo tanto solicito muy comedidamente que en el
                                    menor tiempo posible se levante la clausura impuesta a mi establecimiento, a fin de
                                    retomar las actividades comerciales, comprometiéndome a no volver a incumplir con lo
                                    dispuesto en la normativa vigente.
                                </div>
                                <div class="big separador"></div>
                                <div>
                                    Para futuras notificaciones dentro del procedimiento administrativo sancionador
                                    señalo mi domicilio en <strong><?php echo $_GET['domicilio']; ?></strong>, mi correo
                                    electrónico <strong><?php echo $_GET['correoelectronico']; ?></strong> y número de
                                    celular <strong><?php echo $_GET['celular']; ?></strong>

                                </div>
                                <div class="big separador"></div>
                                <div>
                                    Firma:
                                </div>
                                <div class="big separador"></div>
                                <div>Atentamente</br></br></br>____________________</br>
                                    <span class="big"><?php
                                        echo $_GET ['nombres'] . " " . $_GET['apellidos'];
                                        ?></span></br>
                                    <span class="big">C.C. <?php echo $_GET ['cedula']; ?></span>
                                </div>
                                <div></div>
                                <div class="separador">
                                    <?php if ($_GET['anexaluae'] == '1') {
                                        ?></br>
                                        ADJUNTA ARCHIVO DE LUAE
                                        <?php
                                    } ?>
                                </div>

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