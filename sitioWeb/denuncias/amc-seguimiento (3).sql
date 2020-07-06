-- phpMyAdmin SQL Dump
-- version 4.0.10.20
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 10, 2017 at 04:41 PM
-- Server version: 5.5.23
-- PHP Version: 5.6.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `amc-seguimiento`
--

-- --------------------------------------------------------

--
-- Table structure for table `amc_denuncias`
--

CREATE TABLE IF NOT EXISTS `amc_denuncias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_persona` int(11) DEFAULT NULL,
  `codigo_tramite` int(11) DEFAULT '0',
  `recepcion_documento` datetime DEFAULT NULL,
  `id_tipo_documento` int(11) DEFAULT '1',
  `num_documento` varchar(200) DEFAULT 'S/N',
  `remitente` varchar(255) DEFAULT '',
  `cedula` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `asunto` text,
  `reasignacion` varchar(20) DEFAULT '2',
  `descripcion_anexos` varchar(255) DEFAULT NULL,
  `id_caracter_tramite` int(11) DEFAULT NULL,
  `cantidad_fojas` int(11) DEFAULT '0',
  `observacion_secretaria` varchar(255) DEFAULT NULL,
  `envio_inspeccion` varchar(5) DEFAULT 'false',
  `estado_recepcion_informacion` varchar(255) DEFAULT NULL,
  `codigo_inspeccion` varchar(255) DEFAULT NULL,
  `codigo_procedimiento` varchar(255) DEFAULT NULL,
  `id_zona` int(11) DEFAULT NULL,
  `predio` varchar(20) DEFAULT NULL,
  `observacion` varchar(255) DEFAULT NULL,
  `actividad` varchar(255) DEFAULT NULL,
  `procedimientos` varchar(255) DEFAULT NULL,
  `persona_asignada` varchar(255) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `guia` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=866 ;

--
-- Dumping data for table `amc_denuncias`
--

INSERT INTO `amc_denuncias` (`id`, `id_persona`, `codigo_tramite`, `recepcion_documento`, `id_tipo_documento`, `num_documento`, `remitente`, `cedula`, `email`, `asunto`, `reasignacion`, `descripcion_anexos`, `id_caracter_tramite`, `cantidad_fojas`, `observacion_secretaria`, `envio_inspeccion`, `estado_recepcion_informacion`, `codigo_inspeccion`, `codigo_procedimiento`, `id_zona`, `predio`, `observacion`, `actividad`, `procedimientos`, `persona_asignada`, `fecha_creacion`, `guia`) VALUES
(1, 4, 1, '2017-07-22 13:23:00', 1, 'Denuncia web - 37', 'Diego Salazar Corrale', '0504230780', 'diegodzart75@gmail.com', 'Las excretas de los perros salen hasta la acera y el olor es insoportable en un día de sol pude llegar a oler hasta la otra esquina lo cual ha producido que haya cantidad de moscas la limpieza lo hace calculando una vez cada 25 días.', '2', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/37-Diego'' target=''_blank''>Link denuncia</a>', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-07-24 20:46:49', NULL),
(2, 4, 2, '2017-07-22 20:12:00', 1, 'Denuncia web - 38', 'Nesto Vasconez Noguer', '1400526347', 'danilo.vasconez@gmail.com', 'En reiteradas ocasiones la vivienda colindante realiza fiestas con altos niveles de ruido. Personalmente he solicitado que reduzcan el ruido pero no he tenido respuestas favorables. Este ruido se da a todas horas porque aparentemente es una banda que se reúne a tocar de manera seguida. No tengo datos del dueño del predio pero si me contactan les puedo proporcionar la dirección del lugar que ocasiona el ruido. Por favor en caso de que uds no me puedan ayudar, me podrían dirigir a la entidad competente. Saludos cordiales', '2', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/38-Nesto'' target=''_blank''>Link denuncia</a>', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-07-24 21:27:35', NULL),
(3, 4, 3, '2017-07-24 14:14:00', 1, 'Denuncia web - 44', 'Danie Orna Salvador', '1722378369', 'daniel.ornasalvador@hotmail.com', 'El día 23 de Julio del 2017 en la ciudad de Quito, en el Edificio San Siro ubicado en el pasaje Julio Moreno y Av 6 de Diciembre junto al Megamaxi, sufrí la mordedura de uno de los tres perros que viven en el dpto de mis vecinas, acudí al hospital y me revisaron la mordedura, han sido algunas veces que los animales me atacan sin razón alguna, y no solo a mí, a mi esposa, al conserje y un guardia del edificio. En vista de los ataques decidí abandonar el departamento, y para dar por terminado el contrato, la dueña del departamento que arriendo me pidió fotos de los perros, lo hice y se las envié, luego de esto una de las señoritas vecinas amenazó a mi esposa con demandarla por tomar la foto.<br />\nEl domingo 23 de julio por causa de la mordedura me vi obligado a llamar a la policía para poder ver las vacunas de los perros y estar seguro que no tenga rabia, las señoritas tomaron una actitud muy agresiva y desafiante, sin pedir disculpas y dar por terminado el problema. En conclusión me veo obligado a denunciar para que se tomen cartas al respecto, ya que tengo una hija de dos años que también corre peligro con los animales.<br />\n<br />\nGracias.', '2', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/44-Danie'' target=''_blank''>Link denuncia</a>', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-07-24 21:37:38', NULL),
(4, 4, 4, '2017-07-24 21:03:00', 1, 'Denuncia web - 48', 'Anton Escorza leon ', '0201618212', 'anto.escorza@gmail.com', 'En el interior del domicilio se encuentra una perra de raza husky aproximadamente 2 años de edad, la cual vive en un espacio limitado para su tamaño y está privada de comida y agua.<br />\nEl patio se encuentra lleno de heces del animal y nunca recibe ningún tipo de atención . El animal no tiene protección contra lluvia o sol, además de estar caquexico ', '2', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/48-Anton'' target=''_blank''>Link denuncia</a>', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-07-25 23:19:28', NULL),
(5, 4, 5, '2017-07-25 12:25:00', 1, 'Denuncia web - 55', 'Alex  Lowndes Arroba', '1714216403', 'lowndesalex@gmail.com', 'validar que el edificio que se esta construyendo a mi hogar cumpla con todos los requisitos y permisos de construcción necesarios.', '2', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/55-Alex '' target=''_blank''>Link denuncia</a>', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-07-25 23:27:05', NULL),
(6, 4, 6, '2017-07-28 13:44:00', 1, 'Denuncia web - 65', 'Helen Mosquera', '1713790804', 'nenam2006@hotmail.com', 'El perrito pasa siempre afuera, nunca le vemos con comida o agua, según los vecinos los dueños no lo hacen entrar a la casa porque el perrito no quiere, le dejan afuera en lluvia o sol, dejan que los perros callejeros lo peguen y parece que ya es adulto, hoy pase por ahí y tenía sangre en sus partes intimas y sinceramente no creo que lo lleven a un veterinario, por que no le hacen caso para nada, el suele moverles la colita pero parece que no existiera para sus dueños, se les ha preguntado el porque no lo hacen entrar pero solo responden que el perro no quiere como verán la casa tiene patio delantero y terraza, por favor una mano para rescatar a este perrito adulto, la casa está en la esquina sur de la nueva Plaza Michelena en plena Osorio y Tipantuña, una cuadra más abajo de la Avenida Mariscal Sucre al frente se encuentra la Hostal u Hotel Judy<br />\nel perrito a veces se da una vuelta por la cuadra de abajo de su casa pero siempre regresa.', '2', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/65-Helen'' target=''_blank''>Link denuncia</a>', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-07-31 14:43:21', NULL),
(7, 4, 7, '2017-07-28 11:14:00', 1, 'Denuncia web - 64', 'Camil Rodríguez e', '1721524401', 'camirodrigueze90@gmail.com', 'El perrito permanece encadenado todo el día, todos los días. Se encuentra en mal estado y sucio. Sus condiciones de vida son deplorables y no han cambiado a lo largo de casi un año. Suele tener agua más no se registra cuando le dan de comer. Los dueños del local presentan mala disposición al hablar del asunto y aseguran que el perro se encuentra en buen estado. ', '2', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/64-Camil'' target=''_blank''>Link denuncia</a>', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-07-31 14:49:25', NULL),
(8, 4, 8, '2017-07-28 09:11:00', 1, 'Denuncia web - 62', 'Franc Padilla Torres', '1721544144', 'neopaco666@gmail.com', 'Han hecho de la casa de alado un taller de carpintería, esto además de producir contaminación acústica produce contaminación en el aire, antes solían pintar con solventes perjudiciales para la salud (lacas, thinner, etc) ahora solo están lijando, pero el polvo que producen es irritante para las vías respiratorias. Llvan una actividad regular desde las 8:00 hasta las 17:00. <br />\nYa se ha realizado algunas denuncias en la secretaría del ambiente (caso2017-109260) ', '2', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/62-Franc'' target=''_blank''>Link denuncia</a>', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-07-31 14:51:44', NULL),
(10, 30, 11292, '2017-08-03 10:43:58', 2, 'S/N', 'GORETTE ALTAGRACIA CARRERA ESTEVEZ', '', '', 'CAMBIO DE DOMICILIO', '1', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 13:33:14', '79'),
(11, 30, 11293, '2017-08-01 09:54:53', 2, 'GDOC 2017-110742', 'ZONA CALDERON MIRIAN AGUIRRE', '', '', 'CONTROL PROGRAMADO', '3', '-', 1, 0, 'PREDIO N°643021', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 14:58:29', '57'),
(12, 30, 11294, '2017-08-01 10:01:31', 2, 'GDOC-2017-110759', 'ZONA CALDERON - MIRIAN ENRIQUEA', '', '', 'CONTROL PROGRAMADO', '3', '-', 1, 0, 'PREDIO N°643021', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 15:01:53', '57'),
(13, 30, 11295, '2017-08-01 10:04:36', 2, 'S/NGDOC 2017-110648', 'ZONA CALDRON - MIRIAN ENRIQUEZ', '', '', 'CONTROL PROGRAMADO', '3', '-', 1, 0, 'PREDIO N°643021 ETAPA N°2', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 15:04:45', '57'),
(14, 5, 11296, '2017-08-01 10:06:05', 1, 'S/N', 'ANA GUACHAMIN', '1711713782', 'anitaigv@yahoo.com', 'CONSTRUCCIONES ILEGALES', '3', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 15:06:12', '57'),
(15, 5, 11297, '2017-08-01 10:09:28', 1, 'S/N', 'MARIO SALVADOR', '170072609-2', 'ssam4615@gmail.com', 'CONSTRUCCCIONES ILEGALES', '3', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 15:09:36', '57'),
(16, 30, 11298, '2017-08-01 10:24:56', 2, 'OFICIO S/N', 'ANTONIO RAMIREZ', '', '', 'JUSTIFICA CONSTRUCCION DE HACE 10 AÑOS INSPECCIONADA', '1', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 15:25:20', '148'),
(17, 30, 11299, '2017-08-01 10:35:23', 2, 'OFICIO S/N', 'PEDRO ARTURO', '', '', 'PRESENTACIO DE LUAE', '1', 'LUAE 2017', 1, 16, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 15:35:21', '60'),
(18, 30, 11300, '2017-08-01 10:49:32', 2, 'OFICIO S/N', 'LIZARDO JIMENEZ', '', '', 'PRESENTA LUAE 2017', '1', '-', 1, 3, 'EXP- 376-2017-UDC-ZEE', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 15:49:29', '60'),
(19, 30, 11301, '2017-08-01 10:53:15', 2, 'OFICIO N°2017-3785-PN-DPMS', 'NEYB FABRICIO JIMENEZ', '', '', 'SOLICITA OPERATIVOS PARA VERIFICACION DE PERMISOS DE LOCALES COMERCIALES EN EL CIRCUITO SAN JUAN', '3', '-', 1, 6, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 15:54:31', '57'),
(20, 30, 11302, '2017-08-01 11:01:08', 2, 'OFICIO N° EPMGDT-2017-754/ GDOC 2017-110985', 'QUITO TURISMO - VERONICA SEVILLA', '', '', 'REUNION PARA FIESTA DE LA LUZ', '12', '-', 1, 2, 'REF EXP-677-2017 / RES. AMC-DRYE-RDG-2017-745', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 16:02:07', '53'),
(21, 30, 11303, '2017-08-01 11:03:55', 2, 'OFICIO N°EPMDGT-GFA-T-089-2017', 'QUITO TURISMO - CECIBEL TUALOMBO', '', '', 'REMITE COPIA DE LA FACTURA 1021000001574', '5', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 16:05:03', '55'),
(22, 30, 11304, '2017-08-01 11:11:18', 2, 'S/N', 'QUITO TURISMO', '', '', 'DEPOSITO CONSIGNACION 124-2017', '5', '-', 1, 1, 'REF-EXP-186-2017-UCTCL-ZLM / PROV-1380-2017', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 16:12:26', '55'),
(23, 30, 11305, '2017-08-01 11:20:21', 2, 'S/N', 'RODRIGO DURAN', '', '', '-', '5', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 16:20:10', '55'),
(24, 30, 11306, '2017-08-01 11:20:53', 2, 'S/N', 'UNI', '', '', '-', '5', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 16:20:28', '55'),
(25, 7, 11307, '2017-08-01 11:22:48', 2, 'S/N', 'EDWIN JARA', '1711089720', 'leojara4@hotmail.com', 'MALA TENENCIA DE MASCOTAS', '3', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 16:22:40', '57'),
(26, 30, 11308, '2017-08-01 11:36:56', 2, 'S/N', 'MARIA FERNANA CABASCAGO', '', '', 'CONVENIO DE PAGO ', '5', 'CONVENIO , FACTURA', 1, 4, 'REF-EXP-772-2016-UDTCL-ZLM', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 16:37:15', '55'),
(27, 30, 11309, '2017-08-01 11:39:14', 2, 'MEMORANDO UDC-LD-2017-348', 'ZONA LA DFELICIA / LUIS CHULCA', '', '', 'INFORME DE OPERATIVO MACRO', '14', '-', 1, 2, 'OPERATIVO CONTROL  28-JULIO-2017', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 16:39:30', '62'),
(28, 30, 11310, '2017-08-01 11:40:27', 2, 'S/N', 'ZONA LA DELICIA / LUIS CHULCA', '', '', 'REPOSICION DE SELLOS', '4', '-', 1, 2, 'SELLLO 00009-AMC', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 16:40:09', '58'),
(29, 30, 11311, '2017-08-01 11:41:09', 2, 'MEMORANDO UDC-LD-2017-341', 'ZONA LA DELICIA / LUIS CHULCA', '', '', 'INFORME OPERATIVO 27 JULIO 2017 ', '14', '-', 1, 2, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 16:40:47', '62'),
(30, 30, 11312, '2017-08-01 11:41:52', 2, 'MEMORANDO N. AMC UDC-LD 2017-339', 'ZONA LA DELICIA / LUIS CHULCA', '', '', 'AUTO DE INICIO FLAGRANTE N.1682017', '1', 'AUTO INICIO', 1, 5, 'OPERATIVO DE CONTROL', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 16:41:24', '60'),
(31, 30, 11313, '2017-08-01 12:01:29', 2, 'OFICIO S/N', 'JOSE ANDRADE', '', '', 'SOLICITA INFORMACION SOBRE ESP SAN- DE LOS PREDIO SN°99184-179718', '5', '-', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:01:33', '55'),
(32, 30, 11314, '2017-08-01 12:04:53', 2, 'MEMORANDO N°UDCMBI-2017-216', 'BIENES INV. / CARINA CHAVEZ', '', '', 'NO EXISTE EXP ADMINISTRATIVO SANCIONADOR ', '4', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:06:22', '124'),
(33, 30, 11315, '2017-08-01 12:10:26', 2, 'MEMORANDO n|AMC-UDCMBI-2017-217', 'BIENES INV / CARINA CHAVEZ', '', '', 'RENOVACION DE POLIZA', '5', 'ANEXA POLIZA', 1, 7, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:12:58', '55'),
(34, 5, 11316, '2017-08-01 12:16:13', 2, 'OFC MSP-CZ9-2017-00171', 'ING. LUIS MARTINEZ', NULL, NULL, 'SOLICITUD DE INSPECCION ', '12', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:26:41', '53'),
(35, 5, 11317, '2017-08-01 12:32:52', 2, 'S/N', 'DANIELA COBO', '', '', 'PAGO DE MULTA Y RETIRO DE SELLOS', '5', '-', 1, 2, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:33:40', '55'),
(36, 5, 11318, '2017-08-01 12:35:51', 2, 'MEMO AMC-CMASA-ZQ-2017-168', 'AB.OSCAR CUSQUILLO', NULL, NULL, 'REMITO HOJA DE REGISTRO DIARIO', '7', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:37:54', '61'),
(37, 5, 11319, '2017-08-01 12:39:17', 2, 'S/N', 'AB. SUSANA LOPEZ', '', '', 'SOLICITA SE ARCHIVE PROCEDIMIENTO ADMINISTRATVO', '1', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:41:20', '60'),
(38, 5, 11320, '2017-08-01 12:42:01', 2, 'MEMO 2017-167', 'AB. OSCAR CUSQUILLO', NULL, NULL, 'CONTESTACION AL MEMO', '4', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:42:46', '58'),
(39, 5, 11321, '2017-08-01 12:43:58', 2, 'MEMO 2017-520', 'AB. FREDDY ESCOBAR', NULL, NULL, 'CERTIFICACION DE EXPEDIENTES ABIERTOS', '4', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:44:05', '58'),
(40, 5, 11322, '2017-08-01 12:45:44', 2, 'MEMO 2017-521', 'AB. FREDDY ESCOBAR', NULL, NULL, 'SE REMITE 3 SOLICITUDES DE COPIAS CERTIFICADAS', '2', '-', 1, 7, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:46:41', '70'),
(41, 5, 11323, '2017-08-01 12:47:50', 2, 'S/N', 'EVELYN BRUNNER', '', '', 'SOLICITA ARCHIVO DE EXPEDIENTE', '17', '-', 1, 11, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:49:01', '96'),
(42, 5, 11324, '2017-08-01 12:50:08', 2, 'S/N', 'MANUEL PUETATE', '', '', 'SOLICITA ORDEN DE PAGO', '5', '-', 1, 1, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:56:04', '55'),
(43, 5, 11325, '2017-08-01 12:58:13', 2, 'S/N', 'EFRAIN MIRANDA', NULL, NULL, 'REFERENTE A EXP. 2017-430', '1', '1 EXPEPEDIENTE', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:58:54', '60'),
(44, 30, 11326, '2017-08-01 12:59:02', 2, 'OFICIO S/N', 'LUIS FLORES', NULL, NULL, 'RENOVACIONDE POLIZA DE GARANTIA', '5', '-', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:59:06', '55'),
(45, 5, 11327, '2017-08-01 13:00:36', 2, 'OFC 2017-3007', 'ING. JUAN SOLORZANO', NULL, NULL, 'DESALOJO DE ESCOMBROS', '12', 'GDOC 2017-089984', 1, 12, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 18:02:25', '53'),
(46, 30, 11328, '2017-08-01 13:01:59', 2, 'S/N', 'LUIS FLORES', '', '', 'RENOVACION DE POLIZA', '12', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 18:04:09', '53'),
(47, 30, 11329, '2017-08-01 13:07:18', 2, 'OFICIO S/N', 'IVONNE TAPIA ', '', '', 'PAGO MULTA ', '13', '-', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 18:07:27', '80'),
(48, 30, 11330, '2017-08-01 13:12:27', 2, 'OFICIO S/N', 'AURELIO SUAREZ CANO', '', '', 'PAGO DE MULTA', '5', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 18:12:40', '55'),
(49, 5, 11331, '2017-08-01 13:25:53', 2, 'MEMO 2017-182', 'AB. EDWN TORRES LOPEZ', NULL, NULL, 'INFORME MENSUAL', '4', '-', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 18:26:59', '58'),
(50, 5, 11332, '2017-08-01 13:28:53', 2, 'MEMO 2017-179', 'AB. EDWIN TORRES LOPEZ', NULL, NULL, 'INSPECCION DE VERIFICACION', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 18:29:31', '57'),
(51, 5, 11333, '2017-08-01 13:30:20', 2, 'MEMO 2017-180', 'AB. EDWIN TORRES LOPEZ', NULL, NULL, 'INSPECCION DE VERIFICACION', '3', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 18:30:22', '57'),
(52, 5, 11334, '2017-08-01 13:31:27', 2, 'MEMO 2017-439', 'AB. EDWIN TORRES LOPEZ', NULL, NULL, 'PEDIDO DE INSPECCION', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 18:31:38', '57'),
(53, 5, 11335, '2017-08-01 13:34:43', 2, 'MEMO 2017-442', 'ZONA LOS CHILLOS-AB. EDWIN TORRES', NULL, NULL, 'INFORME DE INSPECCION CONJUNTA', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 18:34:54', '57'),
(54, 5, 11336, '2017-08-01 13:35:50', 2, 'MEMO 2017-443', 'AB. EDWIN TORRES', NULL, NULL, 'INFORME MENSUAL', '4', '-', 1, 10, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 18:35:51', '58'),
(55, 30, 11337, '2017-08-01 15:17:20', 1, 'S/N', 'MAURICIO VILLAGOMEZ', NULL, NULL, 'VERIFICACION DE PERMISO CONSTRUICCION', '3', 'FOTOS, CEDULA, CROQUIS', 1, 10, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:17:23', '57'),
(56, 30, 11338, '2017-08-01 15:18:58', 2, 'OFICIO-S/N', 'ESPERANZA RAYO', '', '', 'PRESENTA LUA', '1', 'LUA', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:19:16', '60'),
(57, 30, 11339, '2017-08-01 15:21:07', 1, 'S/N', 'RONY GRANJA ', '1708218142', 'arqgranj@hotmail.com', 'CONTRUCCION Y PERMISO', '3', 'FOTOS, CEDULA', 1, 7, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:21:26', '57'),
(58, 30, 11340, '2017-08-01 15:23:08', 2, 'OFICIO-S/N', 'PABLO DIAZ', NULL, NULL, 'DOCUMENTO HABILITANTE ITDI 17-375-D', '3', 'OFICIOS', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:23:15', '57'),
(59, 30, 11341, '2017-08-01 15:24:07', 2, 'OFICIO N.SA-GSA-FC-2017-2858/2017092052', 'SANTIAGO ANDRADE', NULL, NULL, 'COMPLEJO GASTRONOMICO EL CAMINITO NO HA EJECUTADO ACCIONES PARA MITIGAR DAÑOS FUTUROS', '12', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:25:25', '53'),
(60, 30, 11342, '2017-08-01 15:27:45', 2, 'OFICIO-20173734 / 2017-109619', 'XAVIER MOLINA', '', '', 'EXPDIENTE ADMINISTRATIVOS ABIERTOS / ICUS', '2', '-LUAE', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:30:42', '70'),
(61, 30, 11343, '2017-08-01 15:31:51', 2, 'OFICIO-AZEA-UCC-2017-3735 / GDOC 2017-046344', 'ZONA ELOY ALFARO / EDWIN VOSMEDIANO ', NULL, NULL, 'SOLICITUD DE CONTROL DE CONSTRUCCION SECTOR JESUS DEL GRAN PODER ALTO', '3', '-', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:32:33', '57'),
(62, 30, 11344, '2017-08-01 15:33:31', 2, 'OFICIO-AZAE-UCC-2017-20173749', 'ZONA ELOY ALFARO / EDWIN VOSMEDIANO ', NULL, NULL, 'ENTREGA INFORME TECNICO', '3', '-', 1, 16, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:34:11', '57'),
(63, 30, 11345, '2017-08-01 15:35:46', 2, 'OFICIO-S/N', 'MARIA LICENIA MIELES', '', '', 'PAGA MULTA', '5', 'FACTURA', 1, 8, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:35:35', '55'),
(64, 30, 11346, '2017-08-01 15:36:39', 2, 'OFICIO-S/N', 'ANA SILVA', NULL, NULL, 'ENTREGA LUAE', '3', 'LUAE', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:36:22', '57'),
(65, 30, 11347, '2017-08-01 15:37:26', 2, 'OFICION -242-EP-2017 / GDOC 2017-110385', 'EDUARDO DEL POZO FIERRO', NULL, NULL, 'CONTROL DE VENTAS INFORMALES TREBOL', '12', 'FOTOS', 1, 7, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:37:50', '53'),
(66, 30, 11348, '2017-08-01 15:38:44', 2, 'CIRCULA N 64', 'ADMINISTRACION GENERAL - SANTIAGO BETANCUR', NULL, NULL, 'SEGUIMIENTO DE RECOMENDACIOENS AUDITORIA', '12', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:38:53', '53'),
(67, 30, 11349, '2017-08-01 15:39:45', 2, 'MEMORANDO AMC-CMASA-AZEA-2017-191', 'ZONA ELOY ALFARO - JUAN CARLOS TOSCANO', '', '', 'TRABAJO FUERA HORARIO NORMAL', '3', '-', 1, 1, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:39:56', '78'),
(68, 30, 11350, '2017-08-01 15:41:17', 2, 'MEMORANDO AMC-UDC-LDPS-2017-176', 'LADERAS SUR /MARCO BARRAGAN', '', '', 'INFORME OPERATIVO CONTROL LUAE', '14', '-', 1, 2, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:41:22', '62'),
(69, 30, 11351, '2017-08-01 15:42:37', 2, 'MEMORANDO AMC-UDC-LDPS-2017-177', 'LADERAS SUR/ MARCO BARRAGAN ', '', '', 'INFORME OPERATIVO LUAE', '14', '-', 1, 2, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:42:44', '62'),
(70, 30, 11352, '2017-08-01 15:43:34', 2, 'MEMORANDO AMC-CMASA-ZEA-2017-1889', 'ELOY ALFARO / MARCO BARRAGAN', '', '', 'INSISTENCIA DE INFORME DE INSPECCION', '3', '-', 1, 4, 'EXPEDIENTE 0912017', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:43:54', '57'),
(71, 30, 11353, '2017-08-01 15:45:08', 2, 'MEMORANDO AMC-CMASA-AZAEA-2017-190', 'ELOY ALFARO / MARCO BARRAGAN ', NULL, NULL, 'CONTROL DE ASISTENCIA', '7', '-', 1, 10, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:45:08', '61'),
(72, 30, 11354, '2017-08-01 15:46:02', 2, 'OFICIO S/N', 'BEATRIZ CASTRO', '', '', 'CONCER TIEMPO PRESENTAR LMU20 ', '5', '-', 1, 3, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:46:32', '55'),
(73, 5, 11355, '2017-08-01 15:00:15', 2, 'S/N', 'VERONICA ORDOÑEZ', NULL, NULL, 'SE DECLARA SILENCIO ADMINISTRATIVO', '5', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 13:39:02', '59'),
(74, 5, 11356, '2017-08-01 15:10:55', 2, 'S/N', 'DRA. MARTHA HERNANDEZ', NULL, NULL, 'SOLICITA SE FINALICE EL PROCESO', '1', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 13:45:28', '60'),
(75, 5, 11357, '2017-08-01 15:24:59', 2, 'MEMO 2017-196', 'DRA VERONICA ALVAREZ', NULL, NULL, 'INFORMES DE OPERATIVOS', '9', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 13:46:27', '75'),
(76, 5, 11358, '2017-08-01 15:24:59', 2, 'MEMO 2017-199', 'DRA VERONICA ALVAREZ', NULL, NULL, 'REMITO AUTOS DE INICIO', '4', '-', 1, 13, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 13:47:24', '58'),
(77, 5, 11359, '2017-08-01 15:24:59', 2, 'MEMO 2017-198', 'DRA VERONICA ALVAREZ', '', '', 'INFORME MENSUAL', '4', '-', 1, 2, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 13:48:42', '108'),
(78, 5, 11360, '2017-08-01 15:26:36', 2, 'MEMO 2017-15', 'DRA VERONICA ALVAREZ', NULL, NULL, 'INFORMES DE OPERATIVOS', '4', '-', 1, 8, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 13:49:09', '58'),
(79, 5, 11361, '2017-08-01 15:26:51', 2, 'MEMO 2017-195', 'DRA VERONICA ALVAREZ', NULL, NULL, 'INFORME DE OPERATIVOS', '3', '-', 1, 8, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 13:49:23', '57'),
(80, 5, 11362, '2017-08-01 15:24:59', 2, 'MEMO 2017-195', 'DRA VERONICA ALVAREZ', NULL, NULL, 'INFORME DE OPERATIVOS', '10', '-', 1, 8, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 13:49:53', '63'),
(81, 5, 11363, '2017-08-01 15:29:41', 2, 'OFC 2017-545', 'MARIA EUGENIA PEZANTEZ', NULL, NULL, 'ALC-2017-02099', '12', 'GDOC 2017-111188', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 13:52:10', '56'),
(82, 5, 11364, '2017-08-01 15:32:52', 2, 'S/N', 'GOYEZ MARY AMPARO', NULL, NULL, 'AMPLIACION DE PLAZO', '3', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 13:52:40', '57'),
(83, 5, 11365, '2017-08-01 15:46:27', 2, 'OFC 2017-1083', 'ZONAL LOS CHILLOS / SANTIAGO CACERES VACA', NULL, NULL, 'APOYO DE PERSONAL PARA EVENTO CULTURAL', '12', 'GDOC 2017-111329', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 13:54:08', '56'),
(84, 5, 11366, '2017-08-01 16:02:52', 2, 'S/N', 'ALICIA JUDITH DEL HIERRO MORCILLO', NULL, NULL, 'PODER DE RATIFICACION', '1', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 13:55:15', '60'),
(85, 5, 11367, '2017-08-02 08:40:27', 2, 'S/N', 'JOSE DEIVIS RESTREPO MATINEZ', NULL, NULL, 'REFERENTE A EXP. 2017-217-UDCMCL-ZEE', '1', '-', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 13:56:45', '60'),
(86, 5, 11368, '2017-08-02 09:06:11', 2, 'S/N', 'GENARO RUIZ', NULL, NULL, 'SOLICITA INSPECCION TECNICA', '5', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 14:06:04', '59'),
(87, 31, 11369, '2017-08-02 09:30:10', 2, 'S/N', 'NORMA MACKENZIE', NULL, NULL, 'LISTADO DE CARPETAS PARA UNIDAD DE CONTROL', '3', '-CARPETAS PARA COMTROL', 1, 9, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 14:30:50', '57'),
(88, 31, 11370, '2017-08-02 09:35:10', 2, 'S/N SDPC-2017-478', 'ALVARO MALDONADO ENDARA - SECRETARIA DE DESARROLLO', NULL, NULL, 'MANUAL DE PROCEDIMIENTO LUAE', '12', '-DC Y GDOC-2017-111080', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 14:36:37', '56'),
(89, 5, 11371, '2017-08-02 09:41:49', 2, 'MEMO 2017-223', 'DR. MILTON BORJA', NULL, NULL, 'INFORME DE OPERATIVO', '14', '-', 1, 52, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 14:41:40', '62'),
(90, 5, 11372, '2017-08-02 09:42:22', 2, 'MEMO AMC-UBI-2017-223', 'DR. MILTON BORJA', NULL, NULL, 'INFORME DE OPERATIVO', '4', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 14:41:54', '58'),
(91, 5, 11373, '2017-08-02 09:42:42', 2, 'MEMO AMC-UDCMCL-MS-2017-322', 'AB. DIEGO TITUAÑA', NULL, NULL, 'RESPUESTA MEMORANDO', '4', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 14:42:12', '58'),
(92, 5, 11374, '2017-08-02 09:42:54', 2, 'MEMO AMC-UDCMBI-2017-219', 'AB. CARINA CHAVEZ', NULL, NULL, 'INFORME OPERATIVO', '14', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 14:42:21', '62'),
(93, 5, 11375, '2017-08-02 09:43:00', 2, 'MEMO 2017-219', 'AB. CARINA CHAVEZ', NULL, NULL, 'INFORME OPERATIVOS', '4', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 14:42:31', '58'),
(94, 5, 11376, '2017-08-02 09:43:09', 2, 'MEMO 2017-219', ' AB. CARINA CHAVE', NULL, NULL, 'INFORME DE OPERATIVO', '10', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 14:42:39', '63'),
(95, 5, 11377, '2017-08-02 09:43:09', 2, 'MEMO 2017-220', ' DR. MILTON BORJA', NULL, NULL, 'HOJA DE ASISTENCIA MES JULIO', '4', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 14:42:39', '58'),
(96, 5, 11378, '2017-08-02 09:43:16', 2, 'MEMO 2017-220', 'DR. MILTON BORJA', NULL, NULL, 'HOJA DE ASISTENCIA MES DE JULIO', '7', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 14:42:44', '61'),
(97, 5, 11379, '2017-08-02 09:43:16', 2, 'MEMO AMC-CMASA-ZMS-2017-269', 'INSTRUCTOR ASEO ZMS-AB.LOURDES VELASQUEZ', NULL, NULL, 'ASISTENCIA DE PERSONAL', '7', '-', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 14:42:45', '61'),
(98, 31, 11380, '2017-08-02 09:42:34', 2, 'DENUNCIA', 'FRANCISCO ROALINO TORRES', NULL, NULL, 'DENUNCIA - MALA TENENCIA DE MASCOTAS', '3', '-FOTOGRAFIAS Y COPIA DE CEDULA', 1, 12, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 14:43:36', '57'),
(99, 31, 11381, '2017-08-02 09:57:29', 2, 'S/N', 'ANABEL VINTIMILLA - ZONA CENTRO', NULL, NULL, 'OPERATIVOS DE CONTROL', '3', '-GDOC-2017-107072', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 14:57:57', '57'),
(100, 5, 11382, '2017-08-02 09:57:52', 2, 'MEMO 2017-121', 'DR. MILTON BORJA', NULL, NULL, 'ESTADISTICA MES DE JULIO', '10', '-', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 14:58:11', '63'),
(101, 7, 11383, '2017-08-02 09:58:06', 2, 'S/N', 'NELSON GONZALEZ', NULL, NULL, 'EXP. 241-2017', '1', '-', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 14:58:17', '60'),
(102, 5, 11384, '2017-08-02 09:59:25', 2, 'MEMO 017-121', 'DR. MILTON BORJA', NULL, NULL, 'ESTADISTICAS MES DE JULIO', '4', '-', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 14:59:15', '58'),
(103, 7, 11385, '2017-08-02 10:00:39', 2, '2017-5665-DPEA-PN', 'CRNL.SONNY SALINAS SAMANIEGO', NULL, NULL, 'DISCOTECA BOBERIA', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 15:00:50', '57'),
(104, 7, 11386, '2017-08-02 10:02:36', 2, '2017-5662-DPEA-PN', 'CRNL.SONNY SALINAS SAMANIEGO', NULL, NULL, 'CIRCUITO LA MAGDALENA 2', '3', '-', 1, 12, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 15:03:02', '57'),
(105, 7, 11387, '2017-08-02 10:04:43', 2, '2017-5545-DPEA-PN', 'CRNL.SONNY SALINAS SAMANIEGO', NULL, NULL, 'CLUB EXCLUSIVE', '3', '-', 1, 10, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 15:04:40', '57'),
(106, 31, 11388, '2017-08-02 10:04:06', 2, 'S/N', 'ANTONIO RAMIREZ ', '', '', 'REFERENTE A EXP102-2017', '3', '-FOTOGRAFIAS COPIA DE IRM', 1, 11, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 15:04:54', '57'),
(107, 7, 11389, '2017-08-02 10:06:16', 2, 'S/2017-5556-DPEA-PN', 'CRNL.SONNY SALINAS SAMANIEGO', NULL, NULL, 'NOCHES DE ARABIA', '3', '-', 1, 9, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 15:06:08', '57'),
(108, 7, 11390, '2017-08-02 10:08:51', 2, '001419-AZCA-2017', 'AB.HENRY VALENCIA/ADMINISTRADOR ZONAL CALDERON', NULL, NULL, 'INSPECCION LLANO GRANDE', '3', 'GDOC 2017-102742', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 15:08:59', '66'),
(109, 31, 11391, '2017-08-02 10:09:18', 2, 'S/N', 'DARIO ANDRES MALDONADO', '', '', 'REF AL EXP-237-2016', '5', 'COPIA DE PAGO POR SANCION COPIA DE LUAE', 1, 17, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 15:09:17', '59'),
(110, 7, 11392, '2017-08-02 10:33:01', 2, 'S/N', 'ROLANDO JAVIER CHANO', NULL, NULL, 'EXP. 100-2016-ZLCH', '5', '-', 1, 13, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 15:32:54', '59'),
(111, 31, 11393, '2017-08-02 10:33:22', 2, 'OFC-1054-ECP-DG-FC-2017', 'FELIPE CORRAL-ENTIDADES COLABORADORAS', '', '', 'REF- OFC-SM-JA-2017-1067', '12', 'COPIA DE CONTRATO', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 15:34:35', '127'),
(112, 31, 11394, '2017-08-02 10:40:17', 2, 'OFC-1054-ECP-DG-FC-2017', 'FELIPE CORRAL - ENTIDADES C .', '', '', 'CONTRATO LOCKERS ECUADOR', '12', '-COPIA DE COMTRATO', 1, 18, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 15:40:45', '71'),
(113, 7, 11395, '2017-08-02 10:44:19', 1, 'S/N', 'GABRIELA NARANJO', NULL, NULL, 'MALTRATO DE MASCOTAS', '3', '1 CD', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 15:44:14', '66'),
(114, 31, 11396, '2017-08-02 10:51:10', 2, 'S/N', 'MARCO GARCIA', NULL, NULL, 'REFERENTE AA EXPEDIENTE 569-2013', '12', '-', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 15:51:24', '64'),
(115, 5, 11397, '2017-08-02 10:53:57', 2, 'S/N', 'INP. LUIS RECALDE', NULL, NULL, 'ACTIVIDADES', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 15:53:55', '66'),
(116, 31, 11398, '2017-08-02 10:54:10', 2, 'OFC-2017-1973', 'GABRIEL BAZURTO - BOMBEROS', NULL, NULL, 'INFORME DE INSPECCION ', '1', 'INFORME DE INSPECCION', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 15:54:24', '69'),
(117, 31, 11399, '2017-08-02 10:55:33', 2, 'OFC--2017-1957', 'GABRIEL BAZURTO - BOMBEROS', NULL, NULL, 'INFOREME DE INSPECCION', '1', 'INFORME DE INSPECCION', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 15:56:29', '69'),
(118, 31, 11400, '2017-08-02 10:59:09', 2, 'OFC-2017-1954', 'GABRIEL BAZURTO - BOMBEROS', NULL, NULL, 'INFORME DE INSPECCION', '1', 'INFORME DE INSPECCION', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 15:59:04', '69'),
(119, 31, 11401, '2017-08-02 11:00:48', 2, 'OFC-2017-1953', 'GABRIEL BAZURTO - BOMBEROS', NULL, NULL, 'INFORME DE INSPECCION', '1', '-INFORME DE INSPECCION', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 16:00:46', '69'),
(120, 31, 11402, '2017-08-02 11:02:28', 2, 'OFC-2017-1943', 'GABRIEL BAZURTO - BOMBEROS ', NULL, NULL, 'INFORME DE INSPECCION', '1', 'INFORME DE INSPECCION', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 16:02:20', '69'),
(121, 31, 11403, '2017-08-02 11:04:15', 2, 'OFC-2017-1932', 'GABRIEL BAZURTO - BOMBEROS', NULL, NULL, 'INFORME DE INSPECCION', '1', '-INFORME DE INSPECCION', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 16:04:10', '69'),
(122, 31, 11404, '2017-08-02 11:05:57', 2, 'OFC-2017-1987', 'GABRIEL BAZURTO - BOMBEROS', NULL, NULL, 'INFORME DE INSPECCION', '1', 'INFORME DE INSPECCION', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 16:09:00', '69'),
(123, 31, 11405, '2017-08-02 11:10:06', 2, 'OFC-2017-1988', 'GABRIEL BAZURTO - BOMBEROS', NULL, NULL, 'INFORME DE INSPECCION', '1', '-INFORME DE INSPECCION', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 16:10:12', '69'),
(124, 31, 11406, '2017-08-02 11:19:12', 2, 'OFC-2017-1989', 'GABRIEL BAZURTO - BOMBEROS', NULL, NULL, 'INFORME DE INSPECCION', '1', 'INFORME DE INSPECCION', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 16:19:24', '69'),
(125, 31, 11407, '2017-08-02 11:20:59', 2, 'OFC-2017-1991', 'GABRIEL BAZURTO - BOMBEROS', NULL, NULL, 'INFORME DE INSPECCION', '1', 'INFORME DE INSPECCIO', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 16:21:31', '69'),
(126, 5, 11408, '2017-08-02 11:22:03', 2, 'S/N', 'JORGE CALDERON', NULL, NULL, 'SOLICTA SE ARCHIVE EL EXPEDIENTE', '5', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 16:22:04', '65'),
(127, 31, 11409, '2017-08-02 11:22:42', 2, 'OFC-2017-2002', 'GABRIEL BAZURTO', NULL, NULL, 'INFORME DE INSPECCION', '1', 'INFORME DE INSPECCION', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 16:23:03', '69'),
(128, 5, 11410, '2017-08-02 11:25:11', 2, 'S/N', 'CARLOS FLORES', NULL, NULL, 'CONOCIMIENTO DE PAGO DE MULTA', '5', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 16:24:55', '65'),
(129, 31, 11411, '2017-08-02 11:34:02', 2, 'MEMO-2017-174', 'PABLO TOAPANTA - LA DELICIA', NULL, NULL, 'CONSOLIDADO CMASA-ZML', '4', 'INFRME CONSOLIDADO', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 16:34:18', '68'),
(130, 31, 11412, '2017-08-02 11:37:35', 2, 'MEMO-2017-346', 'LUIS CHULCA - LA DELICIA', NULL, NULL, 'REMITE DENUNCIA', '2', 'FORMULARIO PARA DENUNCIA FOTOS COPIA DE CEDULA', 1, 13, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 16:37:37', '70'),
(131, 5, 11413, '2017-08-02 11:39:08', 2, 'MEMO 2017-526', 'AB. FREDDY ESCOBAR', NULL, NULL, 'ESTADISTICA MENSUAL DEL MES DE JULIO-QUITUMBE', '4', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 16:39:22', '68'),
(132, 5, 11414, '2017-08-02 11:40:15', 2, 'MEMO 2017-526', 'AB. FREDDY ESCOBAR', NULL, NULL, 'ESTADISTICA MENSUAL DEL MES DE JULIO-QUITUMBE', '10', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 16:40:15', '63'),
(133, 31, 11415, '2017-08-02 11:40:05', 2, 'MEMO-2017-347', 'LUIS CHULCA - LA DELICIA', NULL, NULL, 'ESTADISTICAS', '4', 'ESTADISTICAS DE INSTRUCCION', 1, 7, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 16:40:42', '68'),
(134, 31, 11416, '2017-08-02 11:42:28', 2, 'MEMO-2017-173', 'PABLO TOAPANTA - LA DELICIA', '', '', 'INFORMES DE OPERATIVOS', '14', 'INFORMES DE OPERATIVOS', 1, 4, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 16:42:46', '103'),
(135, 5, 11417, '2017-08-02 11:42:56', 2, 'MEMO 2017-173', 'AB. OSCAR CUSQUILLO', NULL, NULL, 'REMITE ESTADISTICAS DEL MES', '10', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 16:43:18', '63'),
(136, 7, 11418, '2017-08-02 11:43:13', 2, 'S/N', 'GLADIS JIMENEZ ARELLANO', NULL, NULL, 'EXP.084-2017', '5', '-1 CARPETA', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 16:43:53', '65'),
(137, 5, 11419, '2017-08-02 11:44:14', 2, 'MEMO  2017-173', 'AB. OSCAR CUSQUILLO', NULL, NULL, 'RREMITE ESTADISTICAS DEL MES DE JULIO', '4', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 16:44:13', '68'),
(138, 7, 11420, '2017-08-02 11:45:43', 2, 'S/N', 'PABLO GARCES ESPINEL', NULL, NULL, 'EXP. 804-2016-UDCMCL-ZEE', '5', '-', 1, 9, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 16:45:34', '65'),
(139, 5, 11421, '2017-08-02 11:47:33', 2, 'MEMO 2017-172', 'DRA. SOFIA NAJERA', NULL, NULL, 'GISTRO PERSONAL CMASAQUITUMBE', '7', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 16:47:04', '83'),
(140, 5, 11422, '2017-08-02 11:49:28', 2, 'MEMO 2017-170', 'DRA. SOFIA NAJERA', NULL, NULL, 'CONSOLIDADO INSTRUCCION JULIO 2017', '4', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 16:49:50', '68'),
(141, 5, 11423, '2017-08-02 11:51:35', 2, 'MEMO 2017-171', 'DRA. SOFIA NAJERA', NULL, NULL, 'REMITE AUTOS DE INICIO ORDENANZAS', '4', '-', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 16:51:16', '68'),
(142, 7, 11424, '2017-08-02 11:50:58', 2, 'S/N', 'DR.ALFONSO VEINTIMILLA', NULL, NULL, 'EXP.313-2017 UDCMCL-ZEE', '1', '-', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 16:51:49', '69'),
(143, 7, 11425, '2017-08-02 11:55:00', 1, 'AMC-UDCMCL-ZAY-2017-255', 'AB.DARIO QUILLUPANGUI', '1701767285', 'jrm@andinanet.net', 'DENUNCIA PARROQUIA PUEMBO', '3', '-', 1, 9, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 16:55:27', '66'),
(144, 7, 11426, '2017-08-02 11:59:17', 1, 'S/N', 'MAISINCHO CONDOR NANCY VERONICA', '1716117609', 'nancy1981maisincho@hotmail.com', 'CONSTRUCCIONES ILEGALES', '3', '-', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 16:59:26', '66'),
(145, 31, 11427, '2017-08-02 12:00:39', 2, 'MEMO-2017-446', 'EDWIN TORRES - LOS CHILLOS', NULL, NULL, 'REMITE DENUNCIA', '2', 'FOTOGRAFIAS COPIAS CE CEDULA', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 17:00:39', '70'),
(146, 31, 11428, '2017-08-02 12:02:41', 2, 'MEMI-2017-444', 'EDWIN TORRES - LOS CHILLOS', NULL, NULL, 'PEDIDO DE INSPECCION', '3', 'PEDIDO DE INSPECCION', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 17:02:56', '66'),
(147, 7, 11429, '2017-08-02 12:05:01', 2, 'MEMO AMC-UDCMCL-ZAY-2017-252', 'AB.SARA GARCIA', NULL, NULL, 'REMISION DE ESCRITO', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 17:06:12', '66'),
(148, 31, 11430, '2017-08-02 12:07:20', 2, 'S/N', 'SEGUNDO CUEVA CAIZATOA', NULL, NULL, 'REF. EXP-2016-343 LOS CHILLOS', '5', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 17:07:43', '65'),
(149, 5, 11431, '2017-08-02 12:08:33', 2, 'S/N', 'ARQ.ALEJANDRA CORNEJO', NULL, NULL, 'INFORME DE INMUEBLE', '3', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 17:10:43', '66'),
(150, 31, 11432, '2017-08-02 12:11:13', 2, 'S/N', 'REINO GUIDO EDISON', NULL, NULL, 'CONTROL DE VENTAS AMBULANTES', '12', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 17:11:03', '64'),
(151, 5, 11433, '2017-08-02 12:14:19', 2, 'OFC 2017-2074', 'ARQ. ALEJANDRA CORNEJO', NULL, NULL, 'INFORME DE INMUEBLE', '3', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 17:14:18', '66'),
(152, 7, 11434, '2017-08-02 12:12:04', 2, 'MEMO AMC-UDCMCL-ZAY-2017-253', 'AB.SARA GARCIA', NULL, NULL, 'INSISTENCIA', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 17:14:27', '66'),
(153, 5, 11435, '2017-08-02 12:15:53', 2, 'OFC 2017-2075', 'ARQ. ALEJANDRA CORNEJO', NULL, NULL, 'INFORME DE INMUEBLE', '3', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 17:15:49', '66'),
(154, 7, 11436, '2017-08-02 12:17:02', 2, 'MEMO AMC-UDCMCL-ZAY-2017-257', 'AB.SARA GARCIA', NULL, NULL, 'INSISTENCIA INSPECCION', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 17:16:52', '66'),
(155, 5, 11437, '2017-08-02 12:17:21', 2, 'OFC 2017-2071', 'ARQ, ALEJANDRA CORNEJO', NULL, NULL, 'INFORME DE INMUEBLE', '3', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 17:17:12', '66'),
(156, 7, 11438, '2017-08-02 12:18:31', 2, 'MEMO AMC-UDCMCL-ZT-2017-447', 'AB.LUIS BENAVIDES', NULL, NULL, 'ANALISIS EXP.086-2017', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 17:18:29', '66'),
(157, 5, 11439, '2017-08-02 12:18:46', 2, 'OFC 2017-2073', 'AQ. ALEJANDRA CORNEJO', NULL, NULL, 'INFORME DE INMUEBLE', '3', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 17:18:38', '66'),
(158, 5, 11440, '2017-08-02 12:20:07', 2, 'OFC 2017-2072', 'ARQ. ALEJNDRA CORNEJO', NULL, NULL, 'INFORME DE INMUEBLE', '3', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 17:19:56', '66'),
(159, 7, 11441, '2017-08-02 12:20:36', 2, 'MEMO AMC-UDCMCL-ZT-2017-446', 'AB.LUIS BENAVIDES', NULL, NULL, 'INSPECCION CONJUNTA EXP.069-2017', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 17:22:04', '66'),
(160, 7, 11442, '2017-08-02 12:24:11', 2, 'MEMO AMC-UDCMCL-ZT-2017-451', 'AB.LUIS BENAVIDES', NULL, NULL, 'ACTUALIZACION INFORME EXP. 431-2015', '3', '-', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 17:26:22', '66'),
(161, 7, 11443, '2017-08-02 12:28:22', 2, 'MEMO AMC-UDCMCL-ZT-2017-448', 'AB.LUIS BENAVIDES', NULL, NULL, 'INSISTENCIA INFORME INSPECCION EXP. 065-2017', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 17:28:23', '66'),
(162, 7, 11444, '2017-08-02 12:31:08', 2, 'MEMO AMC-UDCMCL-ZT-2017-456', 'AB.SARA GARCIA', NULL, NULL, 'INSPECCION', '3', '-', 1, 7, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 17:30:55', '66'),
(163, 5, 11445, '2017-08-02 12:32:27', 2, 'S/S', 'CARLOS AGUIRRE', NULL, NULL, 'INFORME DE NOVEDAD SUSCITADA', '3', '-', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 17:32:28', '66'),
(164, 31, 11446, '2017-08-02 12:33:15', 2, 'S/N', 'JUAN ANDRES CALDERON', NULL, NULL, 'REF. A PROCESO 168-2017', '1', 'FOTOGRAFIAS, COPIA LUAE', 1, 9, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 17:33:16', '69'),
(165, 7, 11447, '2017-08-02 12:34:32', 2, 'MEMO AMC-UDCMCL-ZT-2017-442', 'AB.LUIS BENAVIDES', NULL, NULL, 'ANALISIS DOCUMENTACION EXP. 471-2016', '3', '-1 EXPEDIENTE ORIGINAL', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 17:34:31', '66'),
(166, 31, 11448, '2017-08-02 13:25:34', 2, 'OFC-2992', 'HUMBERTO ALMEIDA - ZONA LA DELICIA', NULL, NULL, 'VERIFICACION DE GDOC', '12', 'GDOC-2017-110813', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 18:27:03', '64'),
(167, 31, 11449, '2017-08-02 13:30:09', 2, 'OFC-2017-03564', 'MARIA EUGENIA PESANTEZ - ALCALDIA', NULL, NULL, 'TRAMITE ALC-2017-03343', '12', 'GDOC-2017-111639', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 18:30:18', '64'),
(168, 31, 11450, '2017-08-02 13:31:59', 2, 'OFC-2017-03566', 'MARIA EUGENIA PESANTEZ - ALCALDIA', NULL, NULL, 'TRAMITE ALC-2017-03345', '3', 'GDOC-2017-111644', 1, 10, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 18:32:23', '66'),
(169, 5, 11451, '2017-08-02 13:33:22', 2, 'S/N', 'BETTY MORALES', NULL, NULL, 'SOLICITE SE ARCHIVE EL EXPEDIENTE', '16', '-', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 18:33:15', '90'),
(170, 5, 11452, '2017-08-02 13:35:27', 2, 'S/N', 'GALO HIDALGO', NULL, NULL, 'REFERENTE A EXP.2017-429-UDCMCL-ZEE', '1', '-', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 18:37:07', '69'),
(171, 5, 11453, '2017-08-02 13:40:29', 2, 'S/N', 'EDMUNDO NAVAS', NULL, NULL, 'CONOCIMIENTO PAGO DE MULTA', '1', '-', 1, 9, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 18:40:53', '69'),
(172, 5, 11454, '2017-08-02 13:43:58', 2, 'S/N', 'JUAN UNAPANTA', NULL, NULL, 'CONOCIMIENTO DE LUAE', '4', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 18:45:13', '68'),
(173, 5, 11455, '2017-08-02 13:51:17', 2, 'OFC 2017-2546', 'JULIO AÑAZCO', NULL, NULL, 'SOLICITO OPERATIVO DE CONTROL DE ESTABLECIMIENTOS', '12', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 18:51:24', '64'),
(174, 5, 11456, '2017-08-02 13:53:27', 2, 'OFC 2017-2554', 'ING. DARIO VELEZ', NULL, NULL, 'CONTROL DE CONSTRUCCIONES', '3', 'GDOC 2017-111492', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 18:54:17', '66'),
(175, 5, 11457, '2017-08-02 13:56:07', 2, 'OFC 2017-2517', 'ING. DARIO VELEZ', NULL, NULL, 'CONTROL DE CONSTRUCCIONES', '3', 'GDOC 2017-110703', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 18:56:02', '66'),
(176, 31, 11458, '2017-08-02 14:07:15', 2, 'S/N', 'MARCO VINICIO BAEZ DE LA CARRERA', NULL, NULL, 'REF EXP-228-2017', '1', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 19:07:25', '69'),
(177, 7, 11459, '2017-08-02 14:07:41', 2, 'S/N', 'DANIELA VIZCAINO', NULL, NULL, 'EXP.1095-2016-UDCMCL-ZEE', '5', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 19:08:06', '65'),
(178, 7, 11460, '2017-08-02 14:11:18', 2, 'S/N', 'AB.LINA PILAPAÑA', NULL, NULL, 'EXP.083-2017-UDCMCL-ZEE', '1', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 19:11:06', '69'),
(179, 7, 11461, '2017-08-02 14:13:32', 2, 'S/N', 'AB.LINA PILAPAÑA', NULL, NULL, 'EXP.083-2017-UDCMCL-ZEE', '1', '-', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 19:13:18', '69'),
(180, 7, 11462, '2017-08-02 14:21:26', 2, 'S/N', 'HERMANO ISAIAS', NULL, NULL, 'TOCA DE ASIS', '12', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 19:21:17', '64'),
(181, 31, 11463, '2017-08-02 14:26:01', 2, 'S/N', 'MARIETA MONTALVO ELJURE', NULL, NULL, 'REF. EXP 392-2017', '1', 'COPIA DE LUAE', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 19:27:03', '69');
INSERT INTO `amc_denuncias` (`id`, `id_persona`, `codigo_tramite`, `recepcion_documento`, `id_tipo_documento`, `num_documento`, `remitente`, `cedula`, `email`, `asunto`, `reasignacion`, `descripcion_anexos`, `id_caracter_tramite`, `cantidad_fojas`, `observacion_secretaria`, `envio_inspeccion`, `estado_recepcion_informacion`, `codigo_inspeccion`, `codigo_procedimiento`, `id_zona`, `predio`, `observacion`, `actividad`, `procedimientos`, `persona_asignada`, `fecha_creacion`, `guia`) VALUES
(182, 31, 11464, '2017-08-02 14:38:47', 2, 'OFC-2017-3550', 'CESAR RUEDA - POLICIA NACIONAL', NULL, NULL, 'REMITE PARTE POLICIAL', '3', 'PARTE POLICIAL Y FOTOS', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 19:38:59', '66'),
(183, 31, 11465, '2017-08-02 14:41:08', 2, 'OFC-2017-100', 'EDGAR LOGROÑO - POLICIA NACIONAL ', NULL, NULL, 'SOLICITA COLABORACION DE INSPECTORES', '3', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 19:42:05', '66'),
(184, 31, 11466, '2017-08-02 14:44:19', 2, 'MEMO-2017-193', 'CARLOS CALAHORRANO - LA MARISCAL ', NULL, NULL, 'INFORME TECNICO HOMOLOGADO', '3', 'INFORME TECNICO', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 19:44:20', '66'),
(185, 31, 11467, '2017-08-02 14:55:09', 1, 'S/N', 'IVAN JOSE FREIRE PIEDRA', '0101112068', 'famfreire@hotmail.com', 'USO INDEBIDO Y DAÑOS AL ESPACIO PUBLICO', '3', 'COPIA CEDULA, CD, ESCRITO', 1, 4, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 19:55:42', '66'),
(186, 31, 11468, '2017-08-02 15:00:35', 2, 'OFC-2017-836', 'JACQUELINE ALDAZ', NULL, NULL, 'SOLICITUD DE ENTREGA DE BIENES PERECIBLES Y NO PERECIBLES', '12', 'DOCUMENTOS DE CREACION DE FUNDACION', 1, 10, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 20:01:33', '64'),
(187, 5, 11469, '2017-08-02 15:17:26', 2, 'S/N', 'JOSE ENRIQUEZ', NULL, NULL, 'CONOCIMIENTO DE PAGO DE MULTA', '5', '-', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 20:17:11', '65'),
(188, 31, 11470, '2017-08-02 15:34:12', 2, 'S/N', 'SONIA GAIBOR MONAR', NULL, NULL, 'REFERENTE NIGHT CLUB 151', '12', 'PERMISOS DE FUNCIONAMIENTO', 1, 79, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 20:34:18', '71'),
(189, 31, 11471, '2017-08-02 15:37:00', 2, 'S/N', 'JESSICA MONCAYP', NULL, NULL, 'REF. EXP-329-2014', '1', '-', 2, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 20:37:14', '69'),
(190, 31, 11472, '2017-08-02 15:38:30', 2, 'S/N', 'JESSICA MONCAYO', NULL, NULL, 'REF. EXP-429-2013', '1', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 20:38:13', '69'),
(191, 5, 11473, '2017-08-02 15:39:54', 2, 'OFC 2017-1496', 'ING. MARTHA', NULL, NULL, 'ATENCION A OFICIO 2017-0900', '12', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 20:40:53', '71'),
(192, 31, 11474, '2017-08-02 15:42:14', 2, 'MEMO-2017-321', 'DIEGO TITUAÑA - MANUIELA SAENZ', NULL, NULL, 'REF. EXP-050-2013', '4', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 20:42:33', '68'),
(193, 31, 11475, '2017-08-02 15:45:07', 2, 'MEMO-2017-322', 'DIEGO TITUAÑA - MANUELA SAENZ', NULL, NULL, 'RESPUESTA A MEMO-2017-0058', '12', '-COPIA DE MEMO E IRM', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 20:45:25', '71'),
(194, 5, 11476, '2017-08-02 15:46:18', 2, 'S/N', 'MONICA CHICAIZA', NULL, NULL, 'SOLICITA RECTIFICACION', '3', '-', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 20:46:20', '74'),
(195, 31, 11477, '2017-08-02 15:47:47', 2, 'MEMO-2017-326', 'DIEGO TITUAÑA - CENTRO', NULL, NULL, 'ESTADISTICAS', '10', 'ESTADISTICAS', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 20:47:38', '76'),
(196, 31, 11478, '2017-08-02 15:49:03', 2, 'memo-2017-326', 'DIEGO TITUAÑA - CENTRO', NULL, NULL, 'ESTADISTICAS', '4', 'ESTADISTICAS', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 20:49:01', '68'),
(197, 5, 11479, '2017-08-02 15:49:30', 1, 'S/N', 'ROCIO DEL CARMEN CHICAIZA', NULL, NULL, 'CONSTRUCCIONES ILEGALES', '3', '-', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 20:49:41', '74'),
(198, 31, 11480, '2017-08-02 15:50:54', 2, 'MEMO-2017-325', 'DIEGO TITUAÑA - CENTRO', NULL, NULL, 'ASISTENCIA DE PERSONAL', '7', 'ASISTENCIA', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 20:50:53', '83'),
(199, 5, 11481, '2017-08-02 15:52:17', 2, 'S/N', 'DIEGO PROAÑO', NULL, NULL, 'CONOCIMIENTO DE LUAE', '4', '-', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 20:51:57', '68'),
(200, 31, 11482, '2017-08-02 15:53:31', 2, 'OFC-2017-324', 'DIEGO TITUAÑW - CENTRO', NULL, NULL, 'HOJA DE RUTA', '7', 'HOJA DE RUTA', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 20:53:23', '83'),
(201, 31, 11483, '2017-08-02 15:55:24', 2, 'MEMO-2017-227', 'MILTON BORJA - BIENES INVENTARIADOS', NULL, NULL, 'INFORME ', '3', 'INFORME', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 20:55:16', '74'),
(202, 31, 11484, '2017-08-02 15:57:24', 2, 'memo-2017-226', 'CARINA CHAVEZ', NULL, NULL, 'INFORMACION SOLICITADA', '5', 'CERTIFICACION ', 1, 7, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 20:57:17', '72'),
(203, 31, 11485, '2017-08-02 15:59:38', 2, 'S/N', 'MARIA TITUAÑA MALES', '', '', 'REF. EXP-064-2017', '5', 'COPIA DE PAGO ', 1, 2, '5 FOJAS + 1 CARPETA', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 20:59:58', '88'),
(204, 31, 11486, '2017-08-02 16:07:02', 2, 'MEMO-2017-225', 'MILTON BORJA - BIENES INVENTARIADOS', NULL, NULL, 'REFERENTE AL EXP-32-2017', '3', '-FOTOGRAFIAS', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 21:07:01', '74'),
(205, 31, 11487, '2017-08-02 16:09:31', 2, 'OFC-2142-2017', 'JAIME MORAN PAREDES - CONCEJO', NULL, NULL, 'INFORME AMPLIATORIO', '12', 'GDOC-2017-104182', 2, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 21:09:50', '71'),
(206, 7, 11488, '2017-08-02 16:17:41', 2, 'S/N', 'DR.JULIO RODRIGUEZ', NULL, NULL, 'CLAUSURA CONSULTORIO MEDICO', '12', '-', 1, 12, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 21:18:21', '71'),
(207, 31, 11489, '2017-08-02 16:16:56', 2, 'S/N', 'PETRONIO MANRIQUE', NULL, NULL, 'REF. EXP-489-2017', '1', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 21:20:04', '73'),
(208, 31, 11490, '2017-08-02 16:22:24', 2, 'MEMO-2017-338', 'JAIME MURIEL - ELOY ALFARO', NULL, NULL, 'REMITE DENUNCIA', '2', 'FORMULARIO DENUNCIAS Y FOTOS', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 21:22:17', '84'),
(209, 31, 11491, '2017-08-02 16:31:40', 2, 'S/N', 'PALACIOS DURAN BOLIVAR', NULL, NULL, 'REFERENTE AL EXP-415-2017', '1', '-', 1, 12, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-02 21:31:32', '73'),
(210, 7, 11492, '2017-08-03 08:17:17', 2, 'S/N', 'ING.JENNY VINUEZA', NULL, NULL, 'PETS STORY', '1', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 13:17:29', '73'),
(211, 31, 11493, '2017-08-03 08:27:48', 2, 'S/N', 'SEGUNDO ANEOLA CHIPANTASI', NULL, NULL, 'REF. EXP-446-2009', '5', 'COPIA DE PROV 213-2011', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 13:28:04', '72'),
(212, 4, 11494, '2017-08-02 12:49:00', 1, 'Denuncia web - 79', 'GONZA VILLALBA RUBIO', '1701126946', 'patricio.villalba@hotmail.com', 'EN EL PREDIO 148743 SE PRETENDE CONSTRUIR UN EDIFICIO, PARA LO CUAL SE TRAMITÓ EN MDMQ EL CERTIFICADO DE CONFORMIDAD RQUITECTÓNICO Y DE INGENIERÍAS. PREVIO A LA CONTRUCCIÓN SE ESTÁ TRAMKITANDO LA LICENCIA DE CONSTRUCCION.<br />\r\nEN EL LINDERO NORTE DEL PREDIO ANTERIORMENTE MECIONADO SE HA CONSTRUIDO OCUPANDO EL RETIRO POSTERIOR UNA EDIFICACIÓN DE 6M DE ALTURA, SIN NUESTRA AUTORIZACIÓN DEL PROPIETARIO. CONSTRUCCION QUE DIFICULTA Y DELIMITA LA ILUMINACION Y VENTILACION DEL EDIFICIO A CONSTRUIR.', '2', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/79-GONZA'' target=''_blank''>Link denuncia</a>', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 13:57:55', '84'),
(213, 31, 11495, '2017-08-03 09:20:47', 2, 'S/N', 'NESTOR BUSTOS - PARROCO DE GUAPULO', NULL, NULL, 'CONTROL DE ESPACIO PUBLICO', '12', 'CRONOGRAMA DE FIESTAS GUAPULO', 1, 14, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 14:20:33', '71'),
(214, 31, 11496, '2017-08-03 09:38:58', 2, 'OFC-1802-2017', 'COPIA DE RESOL. C-689 Y C-202', '', '', 'COPIA DE RESOL. C-689 Y C-202', '12', '-', 1, 0, 'ING. ALBERTO OBANDO', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 14:39:36', '71'),
(215, 31, 11497, '2017-08-03 09:43:17', 2, 'GDOC', 'ADM ZONA CALDERON', NULL, NULL, 'FORMULARIO DE CONTROL DE CONSTRUCCIONES', '3', 'FORMULARIO 11', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 14:43:32', '74'),
(216, 31, 11498, '2017-08-03 09:54:54', 2, 'OFC-115-2017-0011', 'FERNANDA CHIRIBOGA - QUITO HONESTO', NULL, NULL, 'INFORMACIO SOBRE SEÑORA ROSA HERRERA CARDENAS', '12', 'GDOC-2017-112084', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 14:55:54', '77'),
(217, 31, 11499, '2017-08-03 10:10:45', 2, 'S/N', 'JAVIER FERNANDO TOBAR', NULL, NULL, 'RESOLUCION 065-2017-EA', '5', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 15:10:33', '82'),
(218, 31, 11500, '2017-08-03 10:20:18', 2, 'OFC-2017-0902', 'VIVIANA SEVILLA - LA MARISCAL ', NULL, NULL, 'INFORME TECNICO HOMOLOGADO', '12', 'INFORME TECNICO', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 15:20:29', '77'),
(219, 31, 11501, '2017-08-03 10:22:58', 2, 'OFC-2017-0903', 'VIVIANA SEVILLA - ZONA TURISTICA', NULL, NULL, 'INFORME TECNICO', '12', 'GDOC-2017-112072', 1, 7, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 15:22:58', '77'),
(220, 31, 11502, '2017-08-03 10:24:41', 2, 'OFC-2017-0905', 'VIVIANA SEVILLA - LA MARISCAL', NULL, NULL, 'INFORME TECNICO HOMOLOGADO', '12', 'GDOC-2017-112079', 1, 12, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 15:25:08', '77'),
(221, 31, 11503, '2017-08-03 10:27:40', 2, 'OFC-2017-0891', 'MONICA REQUETTI', NULL, NULL, 'INSPECCION FRITADAS IMBABURA', '5', 'INFORME DE INSPECCION', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 15:28:02', '82'),
(222, 31, 11504, '2017-08-03 10:31:03', 2, 'OFC-1145-2017', 'LUIS MONTALVO - ACDC', NULL, NULL, 'PETICION DE EMPRESARIOS DEL NORTE DE QUITO', '12', 'GDOC-2017-110391', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 15:31:13', '77'),
(223, 31, 11505, '2017-08-03 10:33:42', 2, 'OFC-1140-2017', 'LUIS MONTALVO - ACSC', NULL, NULL, 'SOLICITUD DE INICIO DE PROCESO SANCIONADOR', '12', 'GDOC-2017-112233', 1, 10, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 15:33:39', '77'),
(224, 31, 11506, '2017-08-03 10:36:17', 2, 'OFC-1141-2017', 'LUIS MONTALVO - ACDC', '', '', 'SOLICITUD DE PROCESO SANCIONADOR', '12', 'GDOC-2017-112239', 1, 5, '5 FOJAS + 1 CARPETA', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 15:36:21', '77'),
(225, 4, 11507, '2017-08-03 08:47:00', 1, 'Denuncia web - 81', 'Maria Allauca Simalui', '1705802104', 'matilde_a1@hotmail.com', 'En este lugar tienen muchos perros sin esterilizar, sin correa, con mala alimentación y en manada, siempre me han comentado que como están sueltos salen y matan a cualquier perrito o gatito que pase por ahí o se meten al colegio, yo vivo junto al Colegio Amazonas el cual este medio de este lugar que le comento y mi casa.<br />\r\nEl día de hoy dos de mis gatitas se salieron y fueron al colegio Amazonas ellas no hacen mal a nadie estaban esterilizadas y vacunadas algo que los dueños de estos animales no han hecho y cuatro de sus perros que no se exactamente cuantos son pero son muchos las mataron yo lo vi pero no pude hacer nada para salvarlas.<br />\r\nSolicito que se haga algo, ahora me doy cuenta que lo que comentaban de que matan animalitos es cierto porque me paso a mi y no quiero que le pase a nadie mas sobre todo por culpa de persona irresponsables y que no tienen conciencia y tienen así a los perros.', '2', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/81-Maria'' target=''_blank''>Link denuncia</a>', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 15:43:26', '84'),
(226, 7, 11508, '2017-08-03 10:50:13', 2, 'S/N', 'BOLIVAR TELLO ASTUDILLO', NULL, NULL, 'INVESTIGACION ACADEMICA', '12', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 15:50:26', '77'),
(227, 31, 11509, '2017-08-03 10:52:21', 2, 'OFC-2017-3837', 'XAVIER MOLINA - ADM. ELOY ALFARO', NULL, NULL, 'INFORME DE EXP-ADM- ICUS', '2', '-FORMULARIO LUAE', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 15:53:12', '84'),
(228, 31, 11510, '2017-08-03 10:55:09', 2, 'OFC-2017-3836', 'XAVIER MOLINA - ADM. ZONA ELOY ALFARO', NULL, NULL, 'INFORME DE EXP. ADM. LUAE', '2', 'GDOC-2017-110725', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 15:55:12', '84'),
(229, 5, 11511, '2017-08-03 10:57:28', 2, 'ofc 2017-0904', 'ZONA SPECIAL TURISTICA LA MARISCAL-ING. VIVIANA SEVILLA', NULL, NULL, 'INFORME TECNICO HOMOLOGADO', '12', 'GDOC 2017-112075', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 15:57:50', '77'),
(230, 31, 11512, '2017-08-03 11:03:00', 1, 'DENUNCIA', 'CECILIA PAEZ ZAMORA', NULL, NULL, 'ADOSAR SIN CONTAR CON PERMISOS', '3', 'FOTOGRAFIAS Y COPIA DE CEDULA', 1, 8, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 16:03:14', '78'),
(231, 31, 11513, '2017-08-03 11:11:55', 2, 'MEMO-2017-183', 'KAREN ACOSTA - LOS CHILLOS', NULL, NULL, 'CUADRO DE ESTADISTICAS', '4', 'ESTADISTICAS', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 16:11:53', '81'),
(232, 31, 11514, '2017-08-03 11:13:45', 2, 'MEMO-2017-166', 'EDWIN TORRES - LOS CHILLOS', NULL, NULL, 'INFORME DE INSPECCION', '3', 'COPIAS DE CERTIFICADO MEDICO', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 16:13:40', '78'),
(233, 31, 11515, '2017-08-03 11:16:11', 2, 'OFC-2017-1006', 'CESAR MANTILLA CISNERO - INCLUSION SOCIAL', '', '', 'CONVOCATORIA A REUNION', '12', 'GDOC-2017-112743', 1, 20, 'DOCUMENTO URGENTE SE ENTREGA SIN GUIA - RECIBE DR. RODRIGO DURAN', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 16:16:27', '77'),
(234, 31, 11516, '2017-08-03 11:27:19', 2, 'S/N', 'MACIAS CUENCA BERNARDITA', '', '', 'EXP-115-2017', '1', 'COPIA DE CREDENCIAL', 1, 2, 'DOCUMENTO URGENTE SE ENTREGA SIN GUIA - RECIBE DR. RODRIGO DURAN', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 16:27:08', '79'),
(235, 4, 11517, '2017-07-31 09:55:00', 1, 'Denuncia web - 70', 'GLORI TACO FIERRO', '0201136462', 'patriciatacof@hotmail.es', 'Por Segunda ocasion y sin tener ningun resultado mismo que fue enviado el 2 de septiembre 2016 donde hacia conocer el problema que me viene ocasionando el LABORATORIO LASA , que ironicamente es un laboratorio de " CONTROL AMBIENTAL " colinda con la parte posterior de mi domicilio donde estan ubicados en la parteposterior MOTORES  que emanan permanentemente unruido INSOPORTABLE  , que ya afectadodo la salud de mis familiares que habitamos ahi especialmente de mi señora madre quien permanece todo el dia en la casa y el sonido es ensordecedor , bibrador llegando a osacionar permanentemente dolor de cabeza y dolor de odio , como puede ser posible que siendo un laboratorio que controla el medio ambiente nos contamiente de esta manera con el ruiedo que eman los motores , mi pregunta con que calidad moral podran llamarse laboratorio del ambiente , este es un problema de mucho tiempo atras  que por versiones de vecinos no han dado solución  . Les solicito de la manera mas comedida no mostrarse indiferentes a este situación que afecta la salud  , sera qe el dueño tiene sus palancas y no han podido resolver este problema , les invito a que por favor sin previo aviso al laboratorio visiten mi domicilio y se den cuenta de la magnitud del problema, ya que su propietario en una persona que no entiende razones y no ha hecho caso omiso de mis pedidos , que incluso lo echo al personal de dicho laboratorio ,<br />\r\nEn espera de una pronta y definitiva respuesta a  esta situción anticipo mi agradecimiento ', '2', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/70-GLORI'' target=''_blank''>Link denuncia</a>', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 16:31:24', '84'),
(236, 31, 11518, '2017-08-03 11:34:04', 2, 'S/N', 'CRUZ ELENA DIAZ QUINTEROS', NULL, NULL, 'REF. EXP-2017-120', '13', 'PRUEBAS DE DESCARGO', 1, 13, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 16:34:04', '89'),
(237, 31, 11519, '2017-08-03 11:38:23', 2, 'MEMO-2017-340', 'JAIME MURIEL - ELOY ALFARO', NULL, NULL, 'REGISTRO DIARIO', '7', 'REGISTRO DE ASISTENCIA', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 16:38:15', '83'),
(238, 4, 11520, '2017-08-02 11:38:00', 1, 'Denuncia web - 78', 'FRANC ANDRADE NAVARRE', '1717768947', 'franciss.a92@gmail.com', 'En el patio trasero de una lavandería (dry cleanned- Lavandería Américana), ubicada en toda la Av. América frente a la parada del Seminario Mayor, entre Farmacias Medicity y Radio Católica, en un edificio de tres pisos, color blanco,se encuentra un perro de características Bull Dog (blanco con café) ENCADENADO en un tanque grande de vapor. (al parecer hacen lavado en seco). En el mismo lugar reposa una olla y un plato azul para la comida del perro que casi siempre esta vacía. El perro está sucio, flaco y maltratado,no se puede parar, está totalmente a la interperie y cerca de él se desprenden gases o vapores de las máquinas que utiliza la lavandería. Este patio al parecer es un almacenamiento de chatarras y maquinarias. Todo esto puedo verlo desde la ventana de mi lugar de trabajo', '2', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/78-FRANC'' target=''_blank''>Link denuncia</a>', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 16:39:05', '84'),
(239, 31, 11521, '2017-08-03 11:40:56', 2, 'MEMO-2017-343', 'JAIME MURIEL - ELOY ALFARO', NULL, NULL, 'ESTADISTICAS JULIO', '10', 'CUADRO ESTADISTICO', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 16:40:51', '76'),
(240, 31, 11522, '2017-08-03 11:43:24', 2, 'MEMO-2017-343', 'JAIME MURIEL - ELOY ALFARO', NULL, NULL, 'ESTADISTICAS JULIO', '4', 'CUADRO ESTADISTICO', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 16:43:56', '81'),
(241, 31, 11523, '2017-08-03 11:45:36', 2, 'MEMO-2017-341', 'JAIME MURIEL - ELOY ALFARO', NULL, NULL, 'REGISTRO DIARIO', '7', 'REGISTRO DE ASISTENCIA', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 16:45:34', '83'),
(242, 31, 11524, '2017-08-03 11:48:10', 2, 'MEMO-2017-344', 'JAIME MURIEL - ELOY ALFARO', NULL, NULL, 'ESTADISTICAS JULIO', '10', 'CUADRO ESTADISTICO', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 16:48:02', '76'),
(243, 31, 11525, '2017-08-03 11:49:39', 2, 'MEMO-2017-344', 'JAIME MURIEL - ELOY ALFARO', NULL, NULL, 'ESTADISTICAS JULIO', '4', 'CUADRO ESTADISTICO', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 16:49:32', '81'),
(244, 31, 11526, '2017-08-03 11:51:27', 2, 'MEMO-2017-346', 'IVAN GUERRERO - ELOY ALFARO', NULL, NULL, 'INSPECCION CONJUNTA', '3', 'COPIA DE EXP-139-2017', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 16:51:24', '78'),
(245, 31, 11527, '2017-08-03 11:53:43', 2, 'MEMO-2017-345', 'IVAN GUERRERO - ELOY ALFARO', NULL, NULL, 'INSPECCION CONJUNTA', '3', 'EXP-187-2017', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 16:53:42', '78'),
(246, 31, 11528, '2017-08-03 11:56:01', 2, 'MEMO-2017-175', 'JAIME MURIEL - ELOY ALFARO', NULL, NULL, 'EXPEDIENTES ABIERTOS', '4', 'COPIA DE CORREO ELECTRONICO', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 16:55:54', '81'),
(247, 31, 11529, '2017-08-03 11:58:08', 2, 'MEMO-2017-342', 'IVAN GUERRERO - ELOY ALFARO', NULL, NULL, 'INFORME DE INSTRUCCION', '4', 'INFORME DE INSTRUCCIN', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 16:58:01', '81'),
(248, 31, 11530, '2017-08-03 12:01:31', 2, 'S/N', 'MARIA BELEN VEGA MARTINEZ', NULL, NULL, 'REF. EXP-441-2016', '12', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 17:01:55', '77'),
(249, 5, 11531, '2017-08-03 12:02:24', 2, 'S/N', 'ZONA LOS CHILLOS-ROSA SILVA', NULL, NULL, 'CONTROL DE EDIFICACIONES', '3', 'GDDOC 2017-112139 Y 1 CARPETA', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 17:02:48', '78'),
(250, 31, 11532, '2017-08-03 12:13:59', 1, 'S/N', 'FANNY ALMEIDA PROAÑO AYALA', NULL, NULL, 'ADOSAR SIN CONTAR CON PERMISOS', '3', 'FOTOGRAFIAS, COPIA DE CEDULA Y OTROS', 1, 14, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 17:14:02', '78'),
(251, 7, 11533, '2017-08-03 12:23:18', 2, 'S/N', 'AB.ANITA LAMIÑA', NULL, NULL, 'EXP.2017-0137-AMC-CMASA-ZEE', '13', '-', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 17:24:09', '89'),
(252, 7, 11534, '2017-08-03 12:27:01', 2, 'S/N', 'DR.ESTEBAN GOMEZ JURADO', NULL, NULL, 'TRAMITE 3115', '3', '-1 CD', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 17:26:50', '78'),
(253, 4, 11535, '2017-07-31 09:58:00', 1, 'Denuncia web - 69', 'Patri Vera Nieto', '1710570589', 'patrivera.n@gmail.com', ' <br />\r\nEl día sábado 29 de julio de 2017 a las 5h00 pm fui a la tienda el Comisariato de las Mascotas a comprar comida para mis perros, me percaté de que en la jaula de pajaritos (donde había varios) estaba uno en particular muy mal, decaído sin abrir sus ojos y respirando agitadamente. Cuando trataba caminar se volteaba y se caía para un costado como se puede ver en el video que adjunto. Le pregunté al vendedor de la tienda y me dijo que era estrés porque recién había llegado el día anterior y que ya lo iba a retirar de la jaula. <br />\r\nVolví a la tienda más o menos una hora más tarde y me di cuenta de que el pajarito seguía en la misma jaula y su condición se veía peor sin que haya sido retirado de la jaula ni revisado por el personal del local.<br />\r\nAdemás dicho local mantiene hasta 3 perritos en las vitrinas, así como gatos, conejos, y tortugas en peseras', '2', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/69-Patri'' target=''_blank''>Link denuncia</a>', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 17:34:54', '84'),
(254, 4, 11536, '2017-07-31 18:13:00', 1, 'Denuncia web - 72', 'Paola Montes de Oca N', '1722690284', 'stefy24680@gmail.com', 'Buenas tardes, en esta dirección se encuentra una familia que desde hace varios años ha tenido diferentes perritos, los llevan a su casa cuando son cachorros, pero cuando comienzan a crecer empiezan a dejarlos afuera a la intemperie sin importarles nada, si el perrito se entra a la casa lo sacan a propósito y después de un tiempo los van a dejar botados en la calle (Hecho que ha sido confirmado por familiares cercanos a esta familia), el perrito que se encuentra en las fotografías adjuntadas al parecer es el quinto perrito que ellos llevan, ahora que esta más crecidito han empezado a dejarlo fuera, está flaquito sucio y solo pasa llorando; realmente es penoso ver como los abandonan al crecer y al ser un hecho que se ha venido repitiendo varios años espero que se los pueda sancionar, verificando con personas que vivan cerca a estas personas. En una de las fotografías se observa la entrada de la casa de estas personas.', '2', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/72-Paola'' target=''_blank''>Link denuncia</a>', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 17:47:49', '84'),
(255, 7, 11537, '2017-08-03 12:50:38', 2, 'S/N', 'ENRIQUE ANDRADE VILLAMARIN', NULL, NULL, 'QUEJA VIA TELEFONICA', '12', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 17:50:43', '77'),
(256, 7, 11538, '2017-08-03 12:54:03', 2, 'S/N', 'DR.JAIME MOYANO', NULL, NULL, 'EXP.388-2017-UDCMCL-ZEE', '1', '-', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 17:53:48', '79'),
(257, 5, 11539, '2017-08-03 13:02:13', 2, 'S/N', 'CONCEJAL METROPOLITANO-CARLOS PAEZ', '', '', 'SOLICITA INFORME', '12', '-', 1, 0, 'SIN GUIA', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 18:04:28', '78'),
(258, 31, 11540, '2017-08-03 13:08:07', 2, 'S/N', 'HECTOR RODRIGUEZ VILLAREAL', '', '', 'REFERENTE A DENUNCIA DMT-AT-2016-4342', '4', 'COPIAS VARIOS DOCUMENTOS', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 18:08:09', '142'),
(259, 4, 11541, '2017-07-31 22:05:00', 1, 'Denuncia web - 73', 'CARLO VELEZ INTRIAGO', '1306739473', 'carlangasvelezi@gmail.com', 'LAS PERSONAS YA FUERON DENUNCIADAS CON ANTERIORIDAD, PERO EL MOMENTO DE RECIBIR AL INSPECTOR LE CANCELARON UN DINERO Y PERMITIERON QUE SE CONTINÚE LA OBRA, AHORA TIENEN OBRAS A MEDIO ACABAR, OTRAS OBRAS QUE ESTÁN COMENZANDO Y PARA COLMO, DEBEN HACER LAS VEREDAS PUES NO PERMITIERON QUE SE LO HAGA, ESTA GENTE SE APROVECHÓ DE UNA QUEBRADA PARA CONSTRUIR Y NO LA RESPETARON Y NO ACATAN NINGUNA DISPOSICIÓN DE LAS AUTORIDADES, ASI ES COMO INCLUSO EN LAS NOCHES DEJAN UN VEHÍCULO EN LA CALLE PROTEGIDO POR DOS PIEDRAS ENORMES Y UN PALO, OBSTÁCULOS QUE HAN CAUSADO MAS DE UN ACCIDENTE Y NADIE HACE NADA PUES SON UN MONTON DE GENTE QUE SALE, INSULTA Y HACE PROBLEMA EN LA CALLE.<br />\r\nojala SE HAGA ALGO.', '2', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/73-CARLO'' target=''_blank''>Link denuncia</a>', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 18:11:45', '84'),
(260, 31, 11542, '2017-08-03 13:21:41', 2, 'S/N', 'ESTEFANIA RAMIREZ', NULL, NULL, 'REF. ACTA DE INSPECCION 514', '4', 'COPIA LUAE', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 18:21:37', '81'),
(261, 31, 11543, '2017-08-03 13:25:23', 2, 'S/N', 'ESTEFANIA RAMIREZ', '', '', 'REF. ACTA DE INSPECCION 516', '4', 'COPIA LUAE', 1, 3, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 18:25:15', '100'),
(262, 31, 11544, '2017-08-03 13:27:56', 2, 'S/N', 'LEONARDO ALVAREZ', '', '', 'REF. LUAE', '1', 'COPIAS DE VARIOS DOCUMENTOS', 1, 13, 'REFERENTE ACTA 003 DEL 29-07-2017', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 18:27:58', '79'),
(263, 4, 11545, '2017-08-01 11:05:00', 1, 'Denuncia web - 75', 'MAYRA MORENO MUÑOZ', '0502811664', 'mayrifer@hotmail.com', 'EL DIA MARTES 25 DE JULIO A LAS 8PM ESTABA HACIENDO EJERCICIO EN EL PARQUE DE LA CAROLINA, Y CUANDO PASABA JUSTO ATRAS DE LA TRIBUNA DE LOS SHYRIS SALIO DE ESOS CUARTOS QUE HA HABIDO AHI UN PERRO Y ME ATACÓ, ME MORDIÓ LAS DOS PIERNAS Y DE SUERTE NO ME MATÓ. ERA UN PERRO NEGRO CON BLANCO Y MEDIO PLOMO. <br />\r\nME TUVE QUE IR CORRIENDO Y ME FUI A EMERGENCIAS DEL IESS. PUSE LA DENUNCIA DESPUES EN EL CENTRO DE SALUD Y LUEGO ME LLAMARON INDICANDO QUE ESTE PERRO YA ES LA TERCERA VEZ QUE ATACA A LAS PERSONAS Y QUE NO TIENE DUEÑO, QUE EL PERRO VIVE AHI Y HAY UNA SEÑORA QUE LE DA DE COMER PERO NO ES LA DUEÑA Y NADIE SE HACE CARGO. ME INDICAN QUE EL MINISTERIO DE SALUD HA HABLADO VARIAS VECES CON EL MUNICIPIO PARA QUE SE LLEVEN A ESE PERRO Y OTROS MAS IGUAL DE PELIGROSOS QUE VIVEN AHI PERO NO SE LOS LLEVAN, Y MIENTRAS TANTO SIGUEN MORDIENDO A LA GENTE, IMAGINESE QUE AHI VAN NIÑOS Y UN MONTON DE GENTE, VAMOS A HACER DEPORTE Y NOS ENCONTRAMOS CON ESE PELIGRO, POR FAVOR URGENTE LLEVARSE A ESOS PERROS. ESPERO SU AYUDA URGENTE, GRACIAS!', '2', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/75-MAYRA'' target=''_blank''>Link denuncia</a>', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 18:31:24', '84'),
(264, 7, 11546, '2017-08-03 13:32:29', 2, 'S/N', 'PATRICIO PARRA', NULL, NULL, 'ALCANCE EXP. 535-2015', '5', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 18:32:27', '82'),
(265, 31, 11547, '2017-08-03 13:33:38', 2, 'S/N', 'ANA CECILIA BURGOS', NULL, NULL, 'DESESTIMACION DE DENUNCIA', '3', 'COPIA DE DENUNCIA Y CEDULA', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 18:33:33', '78'),
(266, 31, 11548, '2017-08-03 13:37:20', 2, 'OFC-2017-034', 'DENNIS SUAREZ - SECRETARIA DE SEGURIDAD', NULL, NULL, 'SOLICITA INFORMACION DE PERSONAL', '12', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 18:37:20', '77'),
(267, 5, 11549, '2017-08-03 14:04:03', 2, 'S/N', 'JUAN BASANTES', NULL, NULL, 'PIDEN AYUDA DE BIENES PERECIBLES', '12', '-', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 19:03:38', '77'),
(268, 31, 11550, '2017-08-03 14:16:52', 2, 'S/N', 'RUSSBY RODRIGUEZ REYES', '', '', 'REF. EXP-2017-057', '17', 'COPIA DE EXPED', 1, 3, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 19:17:12', '96'),
(269, 5, 11551, '2017-08-03 14:12:56', 1, 'S/N', 'MAYRA MORENO', NULL, NULL, 'MORDEDURA O ATAQUE DE PERROS AGRESIVOS', '3', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 19:17:34', '78'),
(270, 31, 11552, '2017-08-03 14:20:42', 1, 'S/N', 'VELEZ INTRIAGO CARLOS', NULL, NULL, 'CONSTRUCCION SIN PERMISOS', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 19:20:37', '78'),
(271, 5, 11553, '2017-08-03 14:25:50', 1, 'S/N', 'CARLOS VELEZ', NULL, NULL, 'CONSTRUCCIONES ILEGALES', '3', '-', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 19:26:07', '78'),
(272, 31, 11554, '2017-08-03 14:29:35', 1, 'S/N', 'MONTESDEOCA PAOLA', NULL, NULL, 'MALA TENENCIA DE MASCOTAS', '20', 'FOTOGRAFIAS', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 19:31:00', '94'),
(273, 31, 11555, '2017-08-03 14:33:22', 2, 'MEMO-2017-242', 'KARINA ALVAREZ - CALDERON', NULL, NULL, 'CONTESTACION', '5', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 19:33:40', '82'),
(274, 31, 11556, '2017-08-03 14:35:32', 2, 'MEMO-2017-201', 'WILMER CANO - CALDERON', NULL, NULL, 'REF. MEMO-2017-1065', '5', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 19:35:33', '82'),
(275, 31, 11557, '2017-08-03 14:42:51', 1, 'S/N', 'VERA NIETO PATRICIA', NULL, NULL, 'MALA TENENCIA DE MASCOTAS', '20', 'COPIA DE CEDULA', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 19:43:23', '94'),
(276, 31, 11558, '2017-08-03 14:45:58', 1, 'S/N', 'VILLALVA RUBIO GONZALO', NULL, NULL, 'CONSTRUCCION SIN PERMISOS', '3', 'FOTOS Y COPIA DE CEDULA', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 19:45:48', '78'),
(277, 31, 11559, '2017-08-03 14:52:02', 1, 'S/N', 'ALLAUCA SIMALU MARIA', NULL, NULL, 'MALTRATO DE MASCOTAS', '20', 'MAPA', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 19:52:10', '94'),
(278, 31, 11560, '2017-08-03 14:57:05', 2, 'S/N', 'JUAN ANDRES CALDERON', '', '', 'REF. EXP-168-2017', '16', 'COPIAS VARIAS', 1, 10, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 19:57:10', '90'),
(279, 5, 11561, '2017-08-03 14:59:18', 2, 'S/N', 'JORGE AMORES', NULL, NULL, 'SOLICITA REINSPECCION', '1', '-', 1, 7, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 19:59:24', '79'),
(280, 5, 11562, '2017-08-03 15:02:47', 2, 'S/N', 'DR. CARLOS TORRES', NULL, NULL, 'SOLICITA REINSPECCIO0N', '1', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 20:03:08', '79'),
(281, 31, 11563, '2017-08-03 15:04:32', 2, 'OFC-2017-1478', 'VIVIANA SEVILLA - ADM LA MARISCAL', NULL, NULL, 'PARTES POLICIALES', '12', 'GDOC-2017-106678', 1, 14, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 20:04:33', '77'),
(282, 5, 11564, '2017-08-03 15:07:33', 2, 'OFC 2017-901PMQ-DG-SEC', 'CARLOS AGUIRRE', NULL, NULL, 'DEVOLUCION DE BOLETAS', '12', '23 ACTAS', 1, 11, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 20:08:26', '77'),
(283, 7, 11565, '2017-08-03 15:11:23', 1, 'S/N', 'FABIAN ORTIZ GOMEZ', '1704361011', 'orviconstrucciones@hotmail.com', 'ESCOMBRO/BASURA EN QUEBRADAS', '3', '-', 1, 7, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 20:11:16', '78'),
(284, 7, 11566, '2017-08-03 15:20:50', 2, 'S/N', 'ING.DIEGO CRUZ CASA', NULL, NULL, 'INFORME TECNICO SISTEMA FLUJO SERVICIO AL CLIENTE', '12', 'GDOC 2017-105210', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 20:20:56', '86'),
(285, 30, 11567, '2017-08-03 15:20:30', 2, 'OFICIO N°2017-01839-dpt-pn', 'manuel samaniego', NULL, NULL, 'PERSONAL PARA OPERATIVO', '3', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 20:20:57', '91'),
(286, 7, 11568, '2017-08-03 15:23:16', 2, 'S/N', 'ARQ.HUGO CHACON-SECRETARIA DE TERRITORIO', NULL, NULL, 'SOLICITUD DE CONTROL', '3', '1 PLANO', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 20:23:07', '91'),
(287, 30, 11569, '2017-08-03 15:23:08', 2, 'MEMORANDO N°AC-UDCMCL-ZAY-2017-256', 'ZONA AEREOPUERTO - SARA GARCIA', NULL, NULL, 'INSISTENCIA DE INFORME DE INSPECCION ', '3', 'PROVIDENCIA', 1, 7, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 20:23:55', '91'),
(288, 7, 11570, '2017-08-03 15:26:47', 2, 'S/N', 'ARQ.JOSE LUIS BARROS', NULL, NULL, 'INFORMES EXPEDIENTES ABIERTOS', '2', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 20:27:02', '84'),
(289, 30, 11571, '2017-08-03 15:27:19', 2, 'MEMORANDO N°AMC-UDCMCL-ZT-2017-449', 'ZONO TUMBACO / LUIS BENAVIDEZ', NULL, NULL, 'INSISTENCIA DE INFORME TECNICO', '3', 'PROVIDENCIA', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 20:27:45', '91'),
(290, 30, 11572, '2017-08-03 15:31:11', 2, 'DENUNCIA', 'ZONA TUMBACO-JOHANA MORALES', NULL, NULL, 'LOTE BALDIO', '3', '-FOTOS, CEDULA', 1, 9, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 20:31:19', '91'),
(291, 7, 11573, '2017-08-03 15:31:47', 2, 'S/N', 'ROSA CHAVEZ LOPEZ', NULL, NULL, 'EMISION ORDEN DE PAGO', '5', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 20:31:26', '82'),
(292, 30, 11574, '2017-08-03 15:32:45', 2, 'DENUNCIA', 'ZONA TUMBACO / JOHANA MORALES', NULL, NULL, 'AVES DE CORRAL', '3', '-FOTOS, CEDULA', 1, 8, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 20:32:42', '91'),
(293, 7, 11575, '2017-08-03 15:34:17', 2, 'S/N', 'GUSTAVO LENIN STRUVE', NULL, NULL, 'QUE BUENO PAPA', '1', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 20:33:58', '93'),
(294, 30, 11576, '2017-08-03 15:34:33', 2, 'DENUNCIA', 'ZONA TUMBACO', NULL, NULL, 'AVES DE CORRAL', '3', '-FOTOS, CEDULA', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 20:34:12', '91'),
(295, 30, 11577, '2017-08-03 15:39:08', 2, 'DENUNCIA', 'MARCELO RUIZ', NULL, NULL, 'CONSTRUCCION DE MURO', '3', '-FOTOS CEDULA', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 20:39:09', '91'),
(296, 7, 11578, '2017-08-03 15:41:14', 2, 'S/N', 'AB.PEDRO CACERES', NULL, NULL, 'INFORME OPERATIVO LA MARISCAL', '4', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 20:41:08', '92'),
(297, 7, 11579, '2017-08-03 15:42:36', 2, 'S/N', 'AB.PEDRO CACERES', '', '', 'INFORME OPERATIVO LA MARISCAL', '14', '-', 1, 2, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 20:42:12', '103'),
(298, 7, 11580, '2017-08-03 15:43:56', 2, 'S/N', 'AB.PABLO SALINAS', '1704425071', 'julcorrea_3@hotmail.com', 'EXP.188-2017-UDCMCL-ZEE', '1', '-', 1, 3, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 20:43:35', '93'),
(299, 7, 11581, '2017-08-03 15:45:38', 1, 'S/N', 'JULIO CORREA SANTACRUZ', NULL, NULL, 'LOCALES COMERCIALES SIN LUAE', '3', '-', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 20:45:24', '91'),
(300, 7, 11582, '2017-08-03 16:05:12', 2, 'S/N', 'GLORIA JURADO LANDETA', NULL, NULL, 'EXP. 212-2015', '5', '-', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 21:05:42', '88'),
(301, 7, 11583, '2017-08-03 16:11:11', 2, 'S/N', 'PATRICIO MARTINEZ AYORA', '1708711286', 'edu_tobar@hotmail.com', 'MARGARITASINC S.A', '4', '-', 1, 11, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 21:11:41', '92'),
(302, 7, 11584, '2017-08-03 16:14:45', 1, 'S/N', 'JOSE EDUARDO TOBAR', NULL, NULL, 'PUBLICIDAD EXTERIOR SIN PERMISOS', '3', '-', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 21:14:58', '91'),
(303, 7, 11585, '2017-08-03 16:23:46', 2, 'S/N', 'MGT.CARLOS BARAHONA MENESES', NULL, NULL, 'EXP. 677-2016-UDCCL-ZEE', '1', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 21:24:02', '93'),
(304, 7, 11586, '2017-08-03 16:28:20', 2, 'S/N', 'GLORIA ELIZABETH MUÑIZ', NULL, NULL, 'NIGHT CLUB THE OFFICE', '12', '1 CARPETA', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 21:28:16', '85'),
(305, 5, 11587, '2017-08-03 16:31:13', 2, 'S/N', 'NELSON GUEVARA', NULL, NULL, 'SOLICITA REINSPECCION', '3', '-', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-03 21:30:51', '91'),
(306, 7, 11588, '2017-08-04 08:30:36', 2, 'S/N', 'ANDRES FERNANDEZ FRANCO', '', '', 'NIGHT CLUB THE OFFICE', '12', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 13:30:36', '87'),
(307, 7, 11589, '2017-08-04 08:51:33', 2, 'S/N', 'ANDRES FERNANDO FRANCO', NULL, NULL, 'NIGHT CLUB THE OFFICE', '12', '-', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 13:51:13', '85'),
(308, 31, 11590, '2017-08-04 09:01:44', 2, 'S/N', 'LUIS GABRIEL VIRACOCHA', NULL, NULL, 'REF. EXP-0292017', '5', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 14:01:45', '88'),
(309, 31, 11591, '2017-08-04 09:06:14', 2, 'MEMO-2017-350', 'JAIME MURIEL - ELOY ALFARO', NULL, NULL, 'REMITE DENUNCIA', '2', 'FORMULARIO Y FOTOS', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 14:06:05', '95'),
(310, 31, 11592, '2017-08-04 09:32:29', 2, 'S/N', 'DANNY CALDERON ÑACATO', NULL, NULL, 'REF. RESOL. 7932-2017', '5', 'PAGO DE MULTA', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 14:32:17', '88'),
(311, 31, 11593, '2017-08-04 09:48:31', 2, 'S/N', 'JORGR LUIS AUBELE', '', '', 'REF. EXP-278-2017', '1', 'VARIOS DOCUMENTOS', 1, 6, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 14:48:15', '98'),
(312, 31, 11594, '2017-08-04 09:58:12', 2, 'ofc-2017-3018', 'ESTEBAN ANDRADE - GERENTE DE PARQUES', '', '', 'OPERATIVOS PARQUE LA CAROLINA', '12', 'GDOC-2017-109961', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 14:59:23', '97'),
(313, 31, 11595, '2017-08-04 10:22:22', 2, 'S/N', 'EDGAR BENAVIDES - ASOCIACION DE VEND. DE LOTERIAS', '', '', 'REF A OFICIO AMC-SAM-JA-2017', '12', 'LISTADO DE VENDEDORES DE LOTERIA', 1, 5, 'URGENTE SE ENTREGA SIN GUIA DE DESPACHO', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 15:22:31', '97'),
(314, 31, 11596, '2017-08-04 10:27:31', 2, 'S/N', 'MARGARITA DUQUE', NULL, NULL, 'REF. RESOL. 394-CZC-2', '5', 'DOCUMENTOS VARIOS', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 15:27:31', '101'),
(315, 31, 11597, '2017-08-04 10:32:42', 2, 'S/N', 'JORGE PESANTEZ', NULL, NULL, 'REF. EXP-390-2017', '1', 'COPIA DE LUAE, CEDULAS, RUC', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 15:32:22', '93'),
(316, 31, 11598, '2017-08-04 10:35:21', 2, 'S/N', 'ADM ZONA NORTE', '', '', 'CONTROL DE OBRA', '3', 'ACTA DE CONTROL DE CONSTRUCCIONES ', 1, 20, 'PARA: ALBERTO OBANDO - 20 FOJAS + 4 PLANOS', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 15:35:18', '91'),
(317, 31, 11599, '2017-08-04 10:41:00', 2, 'OFC-268-2017', 'BORIS MATA - ADM ZONA NORTE', '', '', 'REF- TICKET 2016-515903', '12', '-', 1, 1, 'COPIA PARA CONOCIMIENTO', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 15:42:08', '97'),
(318, 31, 11600, '2017-08-04 10:45:40', 2, 'OFC-2017-353', 'VINICIO ROBALINO - GESTION DE TERRITORIO', '', '', 'ICUS PARA ACTIVIDAD COMERCIAL', '2', 'ICUS', 1, 2, 'GDOC-2017-104034', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 15:45:51', '95'),
(319, 31, 11601, '2017-08-04 10:48:08', 2, 'OFC-2017-352', 'VINICIO ROBALINO - GESTION DE TERRITORIO', NULL, NULL, 'ICUS PARA ACTIVIDAD COMERCIAL', '2', 'ICUS', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 15:48:19', '95'),
(320, 31, 11602, '2017-08-04 10:50:21', 2, 'OFC-2017-355', 'VINICIO ROBALINO - GESTION URBANA', NULL, NULL, 'ICUS PARA ACTIVIDAD COMERCIAL', '2', 'ICUS', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 15:50:13', '95'),
(321, 31, 11603, '2017-08-04 10:51:46', 2, 'OFC-2017-354', 'VINICIO ROBALINO - GESTION URBANA', NULL, NULL, 'ICUS PARA ACTIVIDAD COMERCIAL', '2', 'ICUS', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 15:51:34', '95'),
(322, 31, 11604, '2017-08-04 10:53:03', 2, 'OFC-2017-876', 'BORIS MATA - ADM. ZONA NORTE', '', '', 'CONTROL DE EDIFICACIONES', '3', 'ACTA DE CONTROL', 1, 3, 'GDOC-2017-111665', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 15:53:00', '91'),
(323, 31, 11605, '2017-08-04 10:57:20', 2, 'OFC-444-2017', 'RICHARD RIERA - POLICIA CANINA', NULL, NULL, 'PRUEBAS DE TEMPERAMENTO', '20', 'VARIOS', 1, 13, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 15:57:20', '94'),
(324, 31, 11606, '2017-08-04 10:58:56', 2, 'OFC-2017-4075', 'HUGO CHACON - TERRITORIO', NULL, NULL, 'GDOC-2017-112607', '12', 'VARIOS ', 1, 13, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 15:58:56', '91'),
(325, 31, 11607, '2017-08-04 11:01:23', 1, 'DENUNCIA', 'JOSE GERMAN ESPINOSA', NULL, NULL, 'CONSTRUCCION SIN PERMISOS', '3', 'FOTOS Y ESCRITO', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 16:02:59', '99'),
(326, 31, 11608, '2017-08-04 11:06:44', 2, 'S/N', 'JUAN ANDRES CALDERON', NULL, NULL, 'REF. EXP-505-2017', '1', 'VARIOS DOCUMENTOS', 1, 9, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 16:06:32', '98'),
(327, 31, 11609, '2017-08-04 11:13:32', 2, 'S/N', 'NELSON TANGUILA GREFA', NULL, NULL, 'REF. EXP-232-2017', '1', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 16:13:21', '98'),
(328, 31, 11610, '2017-08-04 11:22:00', 2, 'MEMO-2017-448', 'EDWIN TORRES - LOS CHILLOS', NULL, NULL, 'INFORME DE INSPECCION CONJUNTA', '3', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 16:21:58', '99'),
(329, 31, 11611, '2017-08-04 11:23:36', 2, 'MEMO-2017-447', 'EDWIN TORRES', '', '', 'PEDIDO DE INSPECCION', '3', '-', 1, 1, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 16:23:43', '114'),
(330, 31, 11612, '2017-08-04 11:25:49', 2, 'MEMO-2017-441', 'EDWIN TORRES - LOS CHILLOS', NULL, NULL, 'REMISION DE INFORME ', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 16:25:36', '99'),
(331, 31, 11613, '2017-08-04 11:27:25', 2, 'MEMO-2017-187', 'EDWIN TORRES - LOS CHILLOS', NULL, NULL, 'ACTA DE VERIFICACION 4046', '3', '-COPIA DE ACTA', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 16:27:34', '99'),
(332, 31, 11614, '2017-08-04 11:29:06', 2, 'MEMO-2017-186', 'EDWIN TORRES - LOS CHILLOS', NULL, NULL, 'ACTA DE VERIFICACION 4045', '3', 'COPIA DE ACTA', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 16:29:09', '99'),
(333, 31, 11615, '2017-08-04 11:30:49', 2, 'MEMO-2017-185', 'EDWIN TORRES - LOS CHILLOS', NULL, NULL, 'ACTA DE VERIFICACION', '3', 'COPIA DE ACTA', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 16:30:35', '99'),
(334, 31, 11616, '2017-08-04 11:35:48', 2, 'S/N', 'MARIA BELEN AGUAGUIÑA', NULL, NULL, 'REF-EXP-158-133-20187', '3', 'VARIAS DOCUMENTOS', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 16:36:11', '99'),
(335, 31, 11617, '2017-08-04 11:40:26', 2, 'MEMO-2017-174', 'SOFIA NAJERA - QUITUMBE', NULL, NULL, 'REMITE DENUNCIAS', '2', 'DOCUMENTOS VARIOS', 1, 53, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 16:40:15', '116'),
(336, 31, 11618, '2017-08-04 11:43:29', 2, 'MEMO-2017-175', 'SOFIA NAJERA - QUITUMBE', NULL, NULL, 'INFORME DE INSPECCION', '3', 'EXP-050-2017', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 16:43:12', '99'),
(337, 31, 11619, '2017-08-04 11:44:46', 2, 'MEMO-2017-176', 'OSCAR CUSQUILLO - QUITUMBE', NULL, NULL, 'REF MEMO-2017-1065', '5', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 16:44:43', '101'),
(338, 31, 11620, '2017-08-04 11:46:21', 2, 'S/N', 'CARLOS JACOME UTRERAS', NULL, NULL, 'REF-EXP-333-2017', '1', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 16:46:04', '98'),
(339, 31, 11621, '2017-08-04 11:47:44', 2, 'S/N', 'WASHINGTON BARRAGAN', NULL, NULL, 'SOLICITUD DE CERTIFICADO DE CONFORMIDAD', '3', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 16:47:38', '99'),
(340, 31, 11622, '2017-08-04 11:49:17', 2, 'S/N', 'JOSEPH CANO', NULL, NULL, 'REF. EXO-280-2017', '1', 'EXP-280-2017', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 16:49:27', '98'),
(341, 31, 11623, '2017-08-04 11:53:13', 2, 'OFC-2114-2017', 'ANABEL VINTIMILLA - ADM-ZONA CENTRO', '', '', 'USO DE ESPACIO PUBLICO LA MERCED', '3', '-', 1, 2, 'COPIA PARA CONOCIMIENTO', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 16:53:33', '99'),
(342, 31, 11624, '2017-08-04 11:55:45', 2, 'OFC-2105-2017', 'ANABEL VINTIMILLA - ADM ZONA CENTRO', '', '', 'COLOCACION DE OFRENDA FLORAL', '3', '-', 1, 2, 'COPIA PARA CONOCIMIENTO', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 16:56:10', '99'),
(343, 31, 11625, '2017-08-04 11:59:14', 2, 'OFC-2112-2017', 'ANABEL VINTIMILLA', NULL, NULL, 'COLOCACION DE OFRENDA FLORAL', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 16:59:11', '99'),
(344, 31, 11626, '2017-08-04 12:03:35', 2, 'OFC-211-2017', 'ANABEL VINTIMILLA - ADM. ZONA NORTE', NULL, NULL, 'AUTORIZACION PARA USO DE ESPACIO PUBLLICO', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 17:04:00', '99'),
(345, 7, 11627, '2017-08-04 12:05:07', 2, 'S/N', 'DR.EDISON AHTTY VALLEJO', NULL, NULL, 'EXP.370-2017-UDCMCL-ZEE', '1', '-', 1, 7, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 17:04:53', '98'),
(346, 31, 11628, '2017-08-04 12:07:29', 2, 'OFC-2108-2017', 'ANABEL VINTIMILLA - ADM. ZONA CENTRO', NULL, NULL, 'OCUPACION DE ESPACIO PUBLICO', '3', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 17:07:38', '99'),
(347, 31, 11629, '2017-08-04 12:09:31', 2, 'OFC-2107-2017', 'ANABEL VINTIMILLA', NULL, NULL, 'OCUPACION DE ESPACIO PUBLICO', '3', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 17:09:13', '99');
INSERT INTO `amc_denuncias` (`id`, `id_persona`, `codigo_tramite`, `recepcion_documento`, `id_tipo_documento`, `num_documento`, `remitente`, `cedula`, `email`, `asunto`, `reasignacion`, `descripcion_anexos`, `id_caracter_tramite`, `cantidad_fojas`, `observacion_secretaria`, `envio_inspeccion`, `estado_recepcion_informacion`, `codigo_inspeccion`, `codigo_procedimiento`, `id_zona`, `predio`, `observacion`, `actividad`, `procedimientos`, `persona_asignada`, `fecha_creacion`, `guia`) VALUES
(348, 31, 11630, '2017-08-04 12:10:59', 2, 'OFC-2106-2017', 'ANABEL VINTIMILLA', NULL, NULL, 'OCUPACION DE ESPACIO PUBLICO', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 17:10:41', '99'),
(349, 7, 11631, '2017-08-04 12:05:09', 2, 'S/N', 'SYLVIA SUSANA ENRIQUEZ REAL', NULL, NULL, 'TITULOS DE CREDITO', '3', '-', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 17:11:03', '99'),
(350, 31, 11632, '2017-08-04 12:12:41', 2, 'OFC-2115-2017', 'ANABEL VINTIMILLA', NULL, NULL, 'OCUPACION DE ESPACIO PUBLICO', '3', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 17:12:24', '99'),
(351, 31, 11633, '2017-08-04 12:15:41', 2, 'S/N', 'GABRIELA RIBADENEIRA ', NULL, NULL, 'REF- EXP-050-2017', '17', 'COPIA DE EXP', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 17:15:22', '102'),
(352, 7, 11634, '2017-08-04 12:05:10', 2, 'S/N', 'DORACUMANDA JACOME RUIZ', NULL, NULL, 'EXP.1154-2016', '1', '-', 1, 7, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 17:16:13', '98'),
(353, 31, 11635, '2017-08-04 12:18:48', 2, 'S/N', 'BELISARIO GUANOQUILIN ', NULL, NULL, 'REF. EXP - 450-2017', '1', 'COPIA DE EXPEDIENTE', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 17:18:36', '98'),
(354, 7, 11636, '2017-08-04 12:05:10', 2, 'S/N', 'DARIO CHAMBA POMA', '', '', 'CHARLE BROW', '1', '-', 1, 2, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 17:18:53', '98'),
(355, 31, 11637, '2017-08-04 12:38:14', 2, 'S/N', 'LUIS FERNANDO LOVATO', NULL, NULL, 'REF. RESOL. 2017-653', '5', 'COPIA CEDULA', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 17:37:59', '101'),
(356, 31, 11638, '2017-08-04 12:49:52', 2, 'S/N', 'PATRICIA YEPEZ', '', '', 'RER. EXP-350-2015', '1', 'COPIAS VARIAS', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 17:49:51', '110'),
(357, 7, 11639, '2017-08-04 12:46:30', 2, 'S/N', 'GENY BENAVIDES ZAMBRANO', NULL, NULL, 'EXP. 362-2017-UDCMCL-ZEE', '1', '-', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 17:50:16', '98'),
(358, 7, 11640, '2017-08-04 13:09:20', 2, 'OFC.2017-906', 'CARLOS AGUIRRE TERAN/POLICIA METROPOLITANA', NULL, NULL, 'SOLICITA APOYO OPERATIVOS', '12', '-', 1, 7, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 18:09:22', '97'),
(359, 31, 11641, '2017-08-04 13:23:59', 2, 'S/N', 'RENATA MORENO CAICEDO', NULL, NULL, 'CONVOCATORIA A MESA DE TRABAJO', '12', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 18:24:02', '97'),
(360, 31, 11642, '2017-08-04 13:27:34', 2, 'S/N', 'SOFIA URRESTA', NULL, NULL, 'REFERENTE AL EXP-425-2017', '1', 'COPIA DE LUAE', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 18:27:20', '98'),
(361, 31, 11643, '2017-08-04 13:39:46', 2, 'S/N', 'CONGO ROBLES HENRY', NULL, NULL, 'REFERENTE A RESOLUCION 2017-644', '5', 'PAGO DE MULTA', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 18:39:39', '101'),
(362, 31, 11644, '2017-08-04 13:45:09', 2, 'S/N', 'JUAN BASANTES ANDRADE', NULL, NULL, 'SOLICITA ENTREGA DE BIENES', '12', 'OFICIO MIES, COPIA DE RUC', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 18:45:20', '97'),
(363, 31, 11645, '2017-08-04 14:01:55', 2, 'S/N', 'JUAN ALMEIDA - EL AHORRO', NULL, NULL, 'REFERENTE AL EXPEDIENTE 01-2017', '1', 'VARIOS DOCUMENTOS', 1, 15, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 19:01:55', '98'),
(364, 7, 11646, '2017-08-04 14:02:58', 2, 'S/N', 'DR.MAURICIO REYES', NULL, NULL, 'EXP.468-2017', '1', '-1 CARPETA', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 19:02:53', '98'),
(365, 31, 11647, '2017-08-04 14:14:13', 2, 'S/N', 'NIXON CUENCA', NULL, NULL, 'REFERENTE AL EXPEDIENTE', '1', 'INGRESO LUAE', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 19:14:06', '98'),
(366, 31, 11648, '2017-08-04 14:17:12', 2, 'OFC-2017-370', 'CECILIA CHAVEZ - ZONA E-E', NULL, NULL, 'RFERENTE A OFC-2017-023', '17', 'COPIA DE EXPEDIENTES', 1, 72, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 19:17:59', '102'),
(367, 31, 11649, '2017-08-04 14:25:55', 2, 'S/N', 'JUAN SEMPERTEGUI', NULL, NULL, 'REF. INFORME TECNICO ITDI-17-1045', '3', 'DOCUMENTOS VARIOS', 1, 15, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 19:25:53', '99'),
(368, 31, 11650, '2017-08-04 14:31:18', 2, 'S/N', 'SANTIAGO GUAMAN GULCAZO', '', '', 'NIGTH CLUB NOCHES DE ARABIA', '12', 'DOCUMENTOS VARIOS', 1, 11, 'COPIA (DOCUMENTO ORIGINAL EN ALCALDIA)', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 19:31:10', '97'),
(369, 31, 11651, '2017-08-04 14:49:27', 2, 'MEMO-2017-271', 'DIEGO TITUAÑA', NULL, NULL, 'INFORME DE EXPEDIENTES RESUELTOS', '5', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 19:49:32', '101'),
(370, 31, 11652, '2017-08-04 14:59:11', 2, 'S/N', 'SEGUNDO CABRERA', NULL, NULL, 'REF EXPEDIENTE 008-2012', '5', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 19:59:01', '101'),
(371, 31, 11653, '2017-08-04 15:11:49', 2, 'OFC-2017-112727', 'HUMBERTO ALMEIDA - LA DELICIA', NULL, NULL, 'REMITE DENUNCIA POR CONSTRUCCION', '3', 'DENUNCIA CON VARIOS ANEXOS', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 20:12:04', '99'),
(372, 31, 11654, '2017-08-04 15:18:04', 2, 'MEMO-2017-272', 'YAJAIRA VELASQUEZ - CENTRO', NULL, NULL, 'INFORME DE OPERATIVO', '10', 'INFORME ', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 20:17:57', '117'),
(373, 31, 11655, '2017-08-04 15:20:19', 2, 'MEMO-270-2017', 'YAJAIRA VELASQUEZ - CENTRO', NULL, NULL, 'INSPECCION', '3', 'EXP-2017-139', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 20:20:07', '99'),
(374, 31, 11656, '2017-08-04 15:29:20', 2, 'S/N', 'DIEGO VELA GONZALEZ', NULL, NULL, 'REFERENTE AL EXPEDIENTE 358-2017', '1', 'COPIA DE VARIOS DOCUMENTOS', 1, 14, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 20:29:07', '110'),
(375, 31, 11657, '2017-08-04 15:32:30', 2, 'S/N', 'VICENTE HUMBERTO PINTO', NULL, NULL, 'REFERENTE A CONTROL DE CONSTRUCCIONES', '3', 'ACTA TECNICA DE CONTROL Y OTROS', 1, 7, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 20:32:27', '99'),
(376, 31, 11658, '2017-08-04 15:42:43', 2, 'S/N', 'GABRIELA NICOLALDE FLORES', NULL, NULL, 'REFERENTE AL EXPEDIENTE 365-2017', '1', 'VARIA DOCUMENTACION', 1, 17, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 20:42:38', '110'),
(377, 31, 11659, '2017-08-04 15:45:48', 2, 'S/N', 'CARLOS JULIO MONTERO PALACIOS', '', '', 'REFERENTE AL EXP-101-2017', '1', 'DOCUMENTOS VARIOS', 1, 41, '41 FOJAS + UN SOBRE CERRADO', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 20:47:36', '110'),
(378, 31, 11660, '2017-08-04 15:50:36', 2, 'S/N', 'OSWALDO CHANATASIG', NULL, NULL, 'REFERENTE A RESOLUCION 2017-747', '5', 'COPIAS DE PAGO', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 20:50:23', '101'),
(379, 31, 11661, '2017-08-04 16:11:48', 1, 'S/N', 'CONSUEGO GUADALUPE YAGUANA', NULL, NULL, 'CONSTRUCCION SIN PERMISOS', '3', 'COPIA DE CEDULA Y CD', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 21:11:59', '109'),
(380, 31, 11662, '2017-08-04 16:16:08', 2, 'S/N', 'LINDON ROJAS CEVALLOS', NULL, NULL, 'REF. CLUB NOCTURNO MI CASA', '12', 'COPIA LUAE, RUC, FOTOS', 1, 7, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 21:16:38', '106'),
(381, 31, 11663, '2017-08-04 16:18:43', 2, 'S/N', 'LINDON ROJAS CEVALLOS', NULL, NULL, 'REF. CLUB NOCTURNO MI CASA', '4', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 21:18:26', '108'),
(382, 31, 11664, '2017-08-04 16:21:38', 2, 'S/N', 'NERY JULIO CABEZAS', NULL, NULL, 'REF. EXPEDIENTE 038-2016', '5', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 21:21:39', '107'),
(383, 31, 11665, '2017-08-04 16:23:44', 1, 'S/N', 'MYRIAM FLORES', NULL, NULL, 'MALA TENENCIA DE MASCOTAS', '3', '-FOTOS Y COPIA DE CEDULA', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 21:23:26', '109'),
(384, 31, 11666, '2017-08-04 16:25:12', 2, 'S/N', 'LILYA PANCHO CRUZ', NULL, NULL, 'REF. EXPEDIENTE 2017-103', '13', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 21:24:54', '133'),
(385, 31, 11667, '2017-08-04 16:28:26', 2, 'S/N', 'MARCO SALZAR LANAS', '', '', 'REF. EXPEDIENTE 184-2017', '4', '-', 1, 2, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 21:28:27', '124'),
(386, 7, 11668, '2017-08-04 17:43:06', 1, 'S/N', 'VINICIO TAPIA', '0201504826', 'joefercho7@gmail.com', 'MORDEDURA DE PERROS AGRESIVOS', '3', '-', 1, 20, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 22:43:49', '109'),
(387, 7, 11669, '2017-08-04 17:45:55', 1, 'S/N', 'MANUEL VEGA ', '1712200474', 'tanny28@gmail.com', 'MORDEDURA DE PERROS AGRESIVOS', '3', '7 FOTOS', 1, 15, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 22:47:03', '109'),
(388, 7, 11670, '2017-08-04 17:52:32', 1, 'S/N', 'FAUSTO TALAVERA', '1713179131', 'liga23demayo2010@hotmail.com', 'USO INDEBIDO DE ESPACIO PUBLICO', '3', '-', 1, 7, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 22:52:23', '109'),
(389, 7, 11671, '2017-08-04 17:54:51', 1, 'S/N', 'RAFAEL QUINATOA', '0500768700', 'tanny28@hotmail.com', 'USO INDEBIDO DE ESPACIO PUBLICO', '3', '3 FOTOS', 1, 6, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 22:54:38', '109'),
(390, 7, 11672, '2017-08-04 17:57:05', 1, 'S/N', 'GLADYS QUISNANCELA', '0601278021', 'lrquisnancela@gmail.com', 'USO INDEBIDO DE ESPACIO PUBLICO', '3', '-', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 22:57:33', '109'),
(391, 7, 11673, '2017-08-04 18:13:04', 1, 'S/N', 'DARWIN CASTILLO', '1713143343', 'dgcb80@hotmail.com', 'CONSTRUCCIONES ILEGALES', '3', '-', 1, 6, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-04 23:12:53', '109'),
(392, 4, 11674, '2017-08-03 12:56:00', 1, 'Denuncia web - 83', 'Ameli De los Reyes Pa', '1722445754', 'amelia.deloreyes1@gmail.com', 'Es el caso que en la quebrada que tiene la Urbanización Fincas Vacacionales "La Floresta", uno de los propietarios del predio ha procedido a arrojar basura y escombros en la quebrada, con el objetivo de rellenar el cause natural de la quebrada, lo cual constituye un foco de infección para los colindantes a su vez que una actuación que podría causar daños irreparables por la pretensión de  rellenar antitecnicamente y seguramente sin ninguna licencia o permiso una quebrada, conforme lo pruebo con las fotografías adjuntas. Adjunta cédula catastral referencial del sitio de la infracción, la cédula catastral adjunta no corresponde al predio ni propietario que están realizando los trabajos antes señalados.', '3', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/83-Ameli'' target=''_blank''>Link denuncia</a>', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 13:23:04', '114'),
(393, 4, 11675, '2017-08-03 14:00:00', 1, 'Denuncia web - 82', 'Damiá Toro Calderón', '1704191889', 'damiantoro@gmail.com', 'En el sector de Miravalle 1 en el parterre central ubicado en los cruces de la Av Oswaldo Guayasamín y Eugenio Espejo se coloca una venta de comidas en los horarios de 18 a 20 horas. Colocan un generador de corriente que causa mucho ruido, además el humo de las comidas que preparan llegan a nuestros negocios y hogares, lo cual implica también una contaminación ambiental. El automovil en el que se moviliza esta venta ambulante es una camioneta de doble cabina color gris de placas TCR0995.', '3', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/82-Damiá'' target=''_blank''>Link denuncia</a>', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 13:24:07', '109'),
(394, 4, 11676, '2017-08-03 17:14:00', 1, 'Denuncia web - 84', 'Maria Muñoz Jaramillo', '1708748049', 'mauge.munoz@yahoo.com.com', 'El chifa Li Yuan se encuentra haciendo una construcción en la parte posterior del restaurante adosada a la clínica San Gabriel aumentando el el area de utilización del predio. Se presume por la estructura que quizás se haga también un segundo piso. Ademas las condiciones de higiene del restaurante afecta las condiciones de operación de la clínica por su insalubridad siendo un foco de infecciones y causas de roedores que ya se han pasado ala clínica.', '3', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/84-Maria'' target=''_blank''>Link denuncia</a>', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 13:26:37', '109'),
(395, 4, 11677, '2017-08-04 07:48:00', 1, 'Denuncia web - 86', 'KARIN GARCIA HERDOIZA', '1714284096', 'kari_garcia24@hotmail.com', '7:48<br />\nBUENOS DIAS FELICITÁNDOLOS POR SU LABOR TAN LOABLE A FAVOR DE LOS ANIMALITOS EN SITUACION DE RIESGO ACUDO A USTEDES PARA QUE ATIENDAN UN CASO EN SAN MIGUEL DE CONOCOTO HAY TES PERRITOS EN SITUACION DE RIESGO LOS MISMOS QUE VIVEN CON UNA FAMILIA DE ESCASOS RECURSOS  EL DIA DE AYER AL MAS ANCIANITO LE ATROPELLO EL CARRO Y ESTA AFECTADO SU OJO NO HEMOS PODIDO TOMAR FOTOS LAMENTABLEMENTE YA QUE LO TIENEN GUARDADO PERO SABEMOS QUE NO HAY INTERES DE SUS DUEÑOS EN LLEVARLE A QUE LO ATIENDAN CONTAMOS CON SU GRAN APOYO PARA QUE ESTOS ANIMALITOS TENGAN UNA MEJOR VIDA', '3', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/86-KARIN'' target=''_blank''>Link denuncia</a>', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 13:30:37', '109'),
(396, 4, 11678, '2017-08-06 15:35:00', 1, 'Denuncia web - 93', 'Andre Cevallos Arauz', '1711399889', 'azuliverde7@hotmail.com', 'Quisieramos denunciar el maltrato que recibe esta mascosta. En los últimos días hemos estado pendientes de su estado, descubriendo que el can se encuentra todo el día y la noche en esta área de la casa (patio interno), sin recreación alguna, además expuesto a la contaminación producto de su cercanía a sus propias heces y orina. Igualmente, nos hemos percatado de su constante llanto y una complicación que tiene en su ojo izquierdo que no le permite ver bien. Por las noches, cuando se encuentran sus amos en la casa, la situación es la misma: el can no deja de llorar y no se le permite el acceso a la edificación. Por ahora no hemos evidenciado algún tipo de maltrato físico, solo estas precarias condiciones a las que se les somete día tras día. De esta manera, hacemos esta denuncia pensado en la posibilidad de mejorar las condiciones de vida de esta mascota, las cuales muy posiblemente no encuentre con sus actuales dueños.', '3', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/93-Andre'' target=''_blank''>Link denuncia</a>', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 13:48:21', '109'),
(397, 31, 11679, '2017-08-07 09:25:14', 2, 'MEMO-2017-348', 'LUIS CHULCA  - LA DELICIA', NULL, NULL, 'INSISTENCIA DE INFORME TECNICO', '3', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 14:24:59', '109'),
(398, 31, 11680, '2017-08-07 09:27:16', 2, 'MEM0-2017-351', 'LUIS CHULCA - LA DELICIA', NULL, NULL, 'INSISTENCIA A INFORME TECNICO ', '3', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 14:27:07', '109'),
(399, 31, 11681, '2017-08-07 09:33:36', 2, 'MEMO-2017-351', 'LUIS TUFIÑO - LA DELICIA', NULL, NULL, 'INFORME DE EXPEDIENTE ', '5', 'MEMO-2017-1050-AMC-DRYE', 1, 7, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 14:33:19', '111'),
(400, 31, 11682, '2017-08-07 09:50:00', 1, 'MEMO-2017-352', 'LUIS TUFIÑO - LA DELICIA ', NULL, NULL, 'REMITE DENUNCIA POR ADOSAMIENTO', '2', 'FORMULARIO, COPIA DE CEDUA Y FOTOS', 1, 7, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 14:50:02', '116'),
(401, 5, 11683, '2017-08-07 09:51:24', 2, 'S/N', 'EMMA ONOFRE', NULL, NULL, 'SOLICITA INFORME URGENTE', '12', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 14:51:01', '112'),
(402, 31, 11684, '2017-08-07 09:52:25', 1, 'MEMO-2017-352', 'JORGE DELGADO', '1700214275', 'jdelgado2338@hotmail.com', 'REMITE DENUNCIA POR PREDIO EN MAL ESTADO', '3', 'FORMULARIO Y FOTOS', 1, 6, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 14:52:12', '109'),
(403, 7, 11685, '2017-08-07 09:54:07', 2, 'S/N', 'GEOVANNA VITERI', '1705877692', 'albertasantini@yahoo.com', 'ADOSAR SIN AUTORIZACION', '3', '-', 1, 12, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 14:54:11', '109'),
(404, 31, 11686, '2017-08-07 09:56:57', 2, 'OFC-2017-1834', 'ALFONSO MUÑOZ - ADM. ZONA TUMBACO', NULL, NULL, 'ICUS PARA ACTIVIDAD COMERCIAL ', '2', 'GDOC-2017-093459', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 14:56:44', '116'),
(405, 5, 11687, '2017-08-07 09:58:57', 2, 'S/N', 'MARIANA DEL CARMEN TOBAR', NULL, NULL, 'ADJUNTAR AL PROCESO COMPROBANTES DE PAGO', '1', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 14:58:55', '110'),
(406, 31, 11688, '2017-08-07 09:59:56', 2, 'OFC-2017-1835', 'ALFONSO MUÑOZ - ADM ZONA TUMBACO', NULL, NULL, 'ICUS PARA ACTIVIDAD COMERCIAL', '2', 'GDOC-2017-090754', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 14:59:41', '116'),
(407, 31, 11689, '2017-08-07 10:01:33', 2, 'OFC-2017-1832', 'ALFONSO MUÑOZ - ADM ZONA TUMBACO', NULL, NULL, 'ICUS PARA ACTIVIDAD COMERCIAL', '2', 'GDOC-2017-094250', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 15:01:22', '116'),
(408, 31, 11690, '2017-08-07 10:03:26', 2, 'OFC-2017-1833', 'ALFONSO MUÑOZ - ADM ZONA TUMBACO', '', '', 'ICUS PARA ACTIVIDAD COMERCIAL', '2', 'GDOC-2017-094769', 1, 1, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 15:03:14', '116'),
(409, 31, 11691, '2017-08-07 10:05:06', 2, 'OFC-2017-1831', 'ALFONSO MUÑOZ - ADM ZONA TUMBACO', '', '', 'ICUS PARA ACTIVIDAD COMERCIAL', '2', 'GDOC-2017-091649', 1, 1, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 15:04:47', '116'),
(410, 31, 11692, '2017-08-07 10:06:38', 2, 'OFC-2017-1830', 'ALFONSO MUÑOZ - ADM ZONA TUMBACO', '', '', 'ICUS PARA ACTIVIDAD COMERCIAL', '2', 'GDOC-2017-092579', 1, 1, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 15:06:24', '116'),
(411, 31, 11693, '2017-08-07 10:08:20', 2, 'OFC-2017-1829', 'ALFONSO MUÑOZ - ADM ZONA TUMBACO', '', '', 'ICUS PARA ACTIVIDAD COMERCIAL', '2', 'GDOC-2017-092279', 1, 1, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 15:08:05', '116'),
(412, 5, 11694, '2017-08-07 10:12:33', 2, 'MEMO 2017-533', 'AB. JUAN GUALLPA', NULL, NULL, 'INFORME DE CONTROL DE LUAE, ZONA TUMBACO, VIERNES 05-018-2017', '14', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 15:12:52', '138'),
(413, 5, 11695, '2017-08-07 10:14:45', 2, 'MEMO 2017-533', 'AB. JUAN GUALLPA', NULL, NULL, 'NFORME DE CONTROL DE LUAE, ZONA TUMBACO,05-05--2017', '10', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 15:14:44', '117'),
(414, 5, 11696, '2017-08-07 10:40:48', 2, 'OFC 2017-1317', 'JOSE LUIS GUEVARA', NULL, NULL, 'PETICION DE LOS RESIDENTES DEL SUBCIRCUITO', '12', '-', 1, 18, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 15:40:53', '112'),
(415, 31, 11697, '2017-08-07 10:41:02', 2, 'OFC-2017-2002', 'GABRIEL BAZURTO - BOMBEROS', NULL, NULL, 'INFORME DE INSPECCION', '1', 'INFORME DE INSPECCION', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 15:41:55', '110'),
(416, 31, 11698, '2017-08-07 10:43:51', 2, 'OFC-2017-2010', 'GABRIEL BAZURTO-BOMBEROS', NULL, NULL, 'INFORME DE INSPECCION', '1', 'INFORME DE INSPECCION', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 15:44:04', '110'),
(417, 5, 11699, '2017-08-07 10:43:56', 2, 'OFC 2017-0913', 'ING. VIVIANA SEVILLA', NULL, NULL, 'INFORME TECNICO HOMOLOGADO 2017-0315', '3', 'GDOC 2017-114071', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 15:44:39', '114'),
(418, 31, 11700, '2017-08-07 10:47:32', 2, 'OFC-2017-2032', 'GABRIEL BAZURTO - BOMBEROS', NULL, NULL, 'INFORME DE INSPECCION', '1', '-INFORME', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 15:47:11', '110'),
(419, 5, 11701, '2017-08-07 10:47:51', 2, 'OFC 2017-0916', 'ING. VIVIANA SEVILLA', NULL, NULL, 'INFORME TECNICO HOMOLOGADO 2017-0319', '3', 'GDOC 2017-114076', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 15:47:48', '114'),
(420, 5, 11702, '2017-08-07 10:49:58', 2, 'OFC 2017-0914', 'ING. VIVIANA SEVILLA', NULL, NULL, 'INFORME TECNICO HOMOLOGADO 2017-0316', '3', 'GDOC 2017-114066', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 15:49:49', '114'),
(421, 31, 11703, '2017-08-07 10:48:49', 2, 'OFC-2017-2034', 'GABRIEL BAZURTO - BOMBEROS', NULL, NULL, 'INFORME DE INSPECCION', '1', 'INFORME ', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 15:49:56', '110'),
(422, 31, 11704, '2017-08-07 10:52:19', 2, 'OFC-2017-2035', 'GABRIEL BAZURTO - BOMBEROS', NULL, NULL, 'INFORME DE INSPECION', '1', 'INFORME DE INSPECCION', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 15:51:54', '115'),
(423, 5, 11705, '2017-08-07 10:52:05', 2, 'OFC 2017-2036', 'ING, GABRIEL BAZURTO', NULL, NULL, 'CUMPLE CON REGLAS', '1', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 15:51:57', '115'),
(424, 31, 11706, '2017-08-07 10:53:45', 2, 'OFC-2017-2060', 'GABRIEL BAZURTO - BOMBEROS', NULL, NULL, 'INFORME DE INSPECCION', '1', 'INFORME DE INSPECCION', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 15:53:22', '115'),
(425, 31, 11707, '2017-08-07 10:55:07', 2, 'OFC-2017-2061', 'GABRIEL BAZURTO - BOMBEROS', NULL, NULL, 'INFORME DE INSPECCION', '1', 'INFORME DE INSPECCION', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 15:54:39', '115'),
(426, 5, 11708, '2017-08-07 10:55:02', 2, 'OFC 2017-2038', 'ING. GABRIEL BAZURTO', NULL, NULL, 'CUMPLE CON REGLAS', '1', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 15:54:41', '115'),
(427, 31, 11709, '2017-08-07 10:56:25', 2, 'OFC-2017-2078', 'GABRIEL BAZURTO - BOMBEROS', NULL, NULL, 'INFORME DE INSPECCION', '1', 'INFORME DE INSPECCIO', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 15:56:01', '115'),
(428, 31, 11710, '2017-08-07 10:57:49', 2, 'OFC-2017-2104', 'GABRIEL BAZURTO - BOMBEROS', NULL, NULL, 'INFORME DE INSPECCION', '1', 'INFORME DE INSPECCION', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 15:57:25', '115'),
(429, 5, 11711, '2017-08-07 10:56:42', 2, 'OFC 2017-2039', 'ING. GABRIEL BAZURTO', NULL, NULL, 'TRAMITE INTERRUMPIDO', '1', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 15:58:21', '115'),
(430, 5, 11712, '2017-08-07 11:00:14', 2, 'OFC 2017-2054', 'ING. GABRIEL BAZURTO', NULL, NULL, 'CUMPLE CON REGLAS', '1', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 15:59:55', '115'),
(431, 5, 11713, '2017-08-07 11:01:54', 2, 'OFC 2017-2056', 'ING. GABRIEL BAZURTO', NULL, NULL, 'CUMPLE CON REGLAS', '1', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:01:39', '115'),
(432, 5, 11714, '2017-08-07 11:03:30', 2, 'EXP. PROCURA. 2017-1502', 'AB. FREDDY BALSECA', NULL, NULL, 'PROVEDENCIA 0610', '5', 'GDOC 2017-111217 Y 1 EXPEDIENTE', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:05:16', '111'),
(433, 31, 11715, '2017-08-07 11:06:26', 2, 'S/N', 'MARHA PAREDES PEÑA', NULL, NULL, 'REFERENTE AL EXPEDIENTE 2017-089', '5', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:06:01', '111'),
(434, 31, 11716, '2017-08-07 11:07:56', 2, 'MEMO-2017-275', 'YAJAIRA VELASQUEZ - CENTRO', NULL, NULL, 'INSPECCION', '3', 'EXP-165-2017', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:07:37', '114'),
(435, 31, 11717, '2017-08-07 11:07:56', 2, 'EXP-2017-802', 'VERONICA CACERES - PROCURADURIA', NULL, NULL, 'PROVIDENCIA 0516', '5', 'GDOC-2017-047446', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:09:04', '111'),
(436, 5, 11718, '2017-08-07 11:11:01', 2, 'EXP. PROCURADORIA 2017-01621', 'DRA. VERONICA CASARES', NULL, NULL, 'PROVIDENCIA 0606', '5', 'GDOC- 2017-109718', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:10:51', '111'),
(437, 31, 11719, '2017-08-07 11:11:59', 2, 'EXP-2017-01449', 'VERONICA CACERES - PROCURADURIA', NULL, NULL, 'PROVIDENCIA 0608', '5', 'GDOC2017-109743', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:11:46', '111'),
(438, 5, 11720, '2017-08-07 11:13:11', 2, 'EXP. PROCURADORIA 2016-287', 'AB. JAIME VILLACRESES', NULL, NULL, 'EXPEDIENTE ADMINISTRATIVO', '5', 'GDOC 2017-113034', 2, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:14:05', '111'),
(439, 5, 11721, '2017-08-07 11:17:34', 2, 'EXP. PROCURADORIA', 'DRA. VERONICA CACERES', NULL, NULL, 'SOLICITA COPIAS CERTIFICADAS', '5', 'GDOC 2017-113009', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:17:18', '111'),
(440, 31, 11722, '2017-08-07 11:18:01', 2, 'OFC-1501-2017', 'MIGUEL DAVILA CASTILLO - ADM. GENERAL', NULL, NULL, 'REFERENTE A MANEJO DE RECURSOS PUBLICOS', '12', 'GCOC-2017-114468', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:18:07', '112'),
(441, 5, 11723, '2017-08-07 11:19:35', 2, 'EXP. PROCURADORIA 2017-01887', 'DRA. VERONICA CACERES', NULL, NULL, 'COPIAS CERTIFICADAS', '5', 'GDOC 2017-113848', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:19:17', '113'),
(442, 31, 11724, '2017-08-07 11:20:54', 2, 'S/N', 'SANTIAGO BARRAZUETA', NULL, NULL, 'REFERENTE AL EXPEDIENTE 445-2017', '1', 'VARIOS DOCUMENTOS', 1, 8, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:20:35', '115'),
(443, 5, 11725, '2017-08-07 11:21:04', 2, 'EXP. PROCURADORIA', 'DRA. VERONICA CACERES', NULL, NULL, 'COPIAS CERTIFICADS', '5', 'GDOC 2017-112065', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:20:40', '113'),
(444, 5, 11726, '2017-08-07 11:23:29', 2, 'EXP. PROCURADORIA 2017-01834', 'DRA. VERONICA CACERES', NULL, NULL, 'PROVIDENCIA 0604', '5', 'GDOC 2017-107184', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:23:23', '113'),
(445, 7, 11727, '2017-08-07 11:25:46', 1, 'S/N', 'GALO ESCOLA COLIMBA', '1709887101', 'gescola@gmail.com', 'CONSTRUCCIONES ILEGALES', '3', '-', 1, 6, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:25:30', '114'),
(446, 5, 11728, '2017-08-07 11:26:18', 2, 'EXPEDIENTE POCURADORIA 2017-01601', 'AB. FREDDY BALSECA', NULL, NULL, 'RESOLUCION 0185', '5', 'GDOC 2017-095220', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:27:31', '113'),
(447, 7, 11729, '2017-08-07 11:27:57', 1, 'S/N', 'DAYSI LLERENA', '1803156114', 'dayllerena@gmail.com', 'CONSTRUCCIONES ILEGALES', '3', '-', 1, 12, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:28:19', '114'),
(448, 31, 11730, '2017-08-07 11:29:11', 2, 'S/N', 'CUMANDA CACHA', NULL, NULL, 'REFERENTE AL EXPEDIENTE 075-2017', '5', 'COPIA DE PAGO ', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:29:32', '113'),
(449, 5, 11731, '2017-08-07 11:30:13', 2, 'EXPEDIENTE PROCURADORIA 2016-1965', 'AB. FREDDY BALSECA', NULL, NULL, 'RESOLUCION 0283', '1', 'GDOC 2017-109699', 1, 26, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:30:09', '115'),
(450, 31, 11732, '2017-08-07 11:31:20', 2, 'OFC-2017-228', 'MILTON BORJA - BIENES INVENTARIADOS', NULL, NULL, 'REFERENTE AL EXPEDIENTE 045-2017', '3', 'COPIA DE EXPEDIENTE ', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:31:23', '114'),
(451, 7, 11733, '2017-08-07 11:31:47', 2, 'MEMO AMC-CMASA-ZC-2017-203', 'DRA.VERONICA ALVAREZ', NULL, NULL, 'INSPECCION', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:31:38', '114'),
(452, 5, 11734, '2017-08-07 11:33:03', 2, 'EXP. PROCURADORIA 2017-1050', 'AB. FREDDY BALSECA', NULL, NULL, 'RESOLUCION 0181', '5', 'GDOC 2017-109692', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:32:58', '113'),
(453, 31, 11735, '2017-08-07 11:34:41', 2, 'S/N', 'ZOILA GUERRERO', NULL, NULL, 'REMITE DENUNCIA ', '3', 'FORMULARIO Y FOTOS', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:34:29', '114'),
(454, 5, 11736, '2017-08-07 11:35:45', 2, 'EXP. PROCURADORIA 2017-442', 'AB. FREDDY BALSECA', '', '', 'PROVIDENCIA 0605', '2', 'GDOC 2017-109731', 1, 47, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:35:30', '116'),
(455, 31, 11737, '2017-08-07 11:38:58', 2, 'S/N', 'FRANCISCO SEGOVIA', NULL, NULL, 'SOLICITUD DE CITA ', '12', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:38:32', '112'),
(456, 5, 11738, '2017-08-07 11:40:51', 2, 'EXP. PROCU 2017-00428', 'AB. FREDDY BALSECA', NULL, NULL, 'RESOLUCION 0186', '1', 'GDOC 2017-111418', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:40:43', '115'),
(457, 31, 11739, '2017-08-07 11:43:25', 2, 'S/N', 'CRISTIAN ROMERO', NULL, NULL, 'REFERENTE A RESOLUCION 065-2015', '5', 'LISTA DE FIRMAS Y COPIAS DE CEDULA', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:42:59', '113'),
(458, 5, 11740, '2017-08-07 11:43:15', 2, 'OFC 2017-1927', 'DR. PAUL VILLALBA', NULL, NULL, 'CUMPLE CON REGLAS', '1', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:43:00', '115'),
(459, 5, 11741, '2017-08-07 11:54:00', 2, 'S/N', 'SANTIAGO CALVOPIÑA', NULL, NULL, 'SOLICITA NOTIFICACIONES PERSONALES', '5', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:53:41', '113'),
(460, 5, 11742, '2017-08-07 11:56:38', 2, 'OFC 2017-2119', 'ING. ANABEL VEINTIMILLA', NULL, NULL, 'LISTADO DE VEHICULOS DE LA ADMINISTRACION', '12', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 16:56:35', '112'),
(461, 31, 11743, '2017-08-07 12:03:26', 2, 'S/N', 'ESTEBAN JAVIER YEPEZ', NULL, NULL, 'REFERENTE A RESOLUCION 2017-425', '5', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 17:03:22', '113'),
(462, 31, 11744, '2017-08-07 12:05:28', 2, 'S/N', 'MARIA BARBARITA PRADO', NULL, NULL, 'REFERENTE AL EXPEDIENTE 340-2015', '5', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 17:05:03', '113'),
(463, 5, 11745, '2017-08-07 12:16:10', 2, 'S/N', 'MONICA ORTEGA', '', '', 'REFERENTE A EXP. 2016-5252', '5', '1 PLANO', 1, 2, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 17:16:47', '121'),
(464, 5, 11746, '2017-08-07 12:19:19', 2, 'OFC 2017-2993', 'HUMBERTO ALMEIDA', NULL, NULL, 'SOLICITUD DE INSPECCION', '12', 'GDOC 2017-112461', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 17:22:41', '112'),
(465, 31, 11747, '2017-08-07 12:25:16', 2, 'S/N', 'FRANK EMILIO ABREU', NULL, NULL, 'REFERENTE AL EXPEDIENTE 354-2016', '5', 'COPIA DE LUAE', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 17:24:55', '113'),
(466, 7, 11748, '2017-08-07 12:27:54', 1, 'S/N', 'BELGICA TAMAYO', '1704838638', 'carlosanita1501@hotmail.com', 'REALIZAR ADECUACIONES SIN PERMISOS', '3', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 17:27:42', '114'),
(467, 31, 11749, '2017-08-07 12:27:58', 2, 'OFC-0968-2017', 'SANTIAGO PAEZ - CONSEJO DE LA JUDICATURA', NULL, NULL, 'SOLICITA CONTROL A VENTAS INFORMALES', '12', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 17:27:48', '112'),
(468, 7, 11750, '2017-08-07 12:30:20', 1, 'S/N', 'MARIANA ANDRADE', '1710287416', 'manina04@hotmail.com', 'CONSTRUCCIONES ILEGALES', '3', '-', 1, 4, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 17:30:41', '114'),
(469, 31, 11751, '2017-08-07 12:32:29', 1, 'S/N', 'EDWIN VILLAFUERTE', '1704923075', 'evillafuertev@hotmail.com', 'REMITE DENUNCIA POR LUAE Y CONTAMINACION AUDITIVA', '3', '1 CD Y COPIA DE CEDULA', 1, 2, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 17:32:12', '114'),
(470, 7, 11752, '2017-08-07 12:32:52', 2, 'S/N', 'AB.SANTIAGO AGUINAGA', NULL, NULL, 'EXP.481-2010', '2', '-', 1, 10, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 17:32:52', '116'),
(471, 31, 11753, '2017-08-07 12:39:09', 2, 'S/N', 'CECILIA CARATE UYANA', '', '', 'REFERENTE AL EXPEDIENTE 265-2014', '5', 'COPIA DE PROV 2017-1152', 1, 3, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 17:38:45', '121'),
(472, 31, 11754, '2017-08-07 12:41:30', 2, 'S/N', 'CASTRO GUILLEN YESENIA', NULL, NULL, 'REFERENTE AL EXPEDIENTE 426-2017', '1', 'COPIAS VARIAS', 1, 7, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 17:41:05', '115'),
(473, 5, 11755, '2017-08-07 12:42:49', 1, 'S/N', 'MAURICIO OROZCO', '170775598-7', 'rocattas@gmail.com', 'TERRENOS SIN CERRAMIENTO', '3', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 17:42:22', '114'),
(474, 5, 11756, '2017-08-07 13:01:17', 2, 'ofc 2017-0448-CRAC', 'DR. RICHARD RIERA', NULL, NULL, 'RESULTADO DE PRUEBA DE TEMPERAMENTO DE CAN', '3', '-', 1, 15, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 18:01:30', '114'),
(475, 5, 11757, '2017-08-07 13:03:45', 2, 'OFC 2017-0445-CRAC-DNA', 'DR. RICHARD RIERA', NULL, NULL, 'RESULTADO DE PRUEBA DE TEMPERAMENTO DE CAN', '3', '-', 1, 22, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 18:03:48', '114'),
(476, 5, 11758, '2017-08-07 13:08:02', 2, 'S/N', 'GEOVANNY YEPEZ', NULL, NULL, 'SOLOCITA NUEVA INSPECCION', '1', '-', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 18:08:19', '115'),
(477, 5, 11759, '2017-08-07 13:15:29', 2, 'OFC 2017-00273', 'MARCO PONCE-CONCEJAL', NULL, NULL, 'REMITIR INFORMACION', '12', 'GDOC 2017-113991', 1, 14, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 18:14:44', '112'),
(478, 5, 11760, '2017-08-07 13:24:37', 2, 'S/N', 'MARTHA ARMAS', NULL, NULL, 'SOLICITA AUTORIZACION DE DEVOLUCION DE BANCAS', '5', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 18:24:22', '113'),
(479, 5, 11761, '2017-08-07 13:27:49', 2, 'S/N', 'ING. LUIS FLORES', NULL, NULL, 'DESINTECSA', '12', '-', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 18:27:37', '112'),
(480, 31, 11762, '2017-08-07 13:33:58', 2, 'S/N', 'LEONARDO ALVAREZ GOMEZ', NULL, NULL, 'REFERENTE AL EXPEDIENTE 003-2017', '1', 'COPIAS VARIAS', 1, 19, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 18:34:08', '115'),
(481, 31, 11763, '2017-08-07 13:47:21', 2, 'S/N', 'RAFAEL ROSALES KURI', '', '', 'REFERENTE AL EXPEDIENTE 235-2017', '1', 'COPIAS VARIAS + 1 CD', 1, 9, '9 FOJAS + 10 PLANOS + 1 CD', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 18:47:02', '115'),
(482, 31, 11764, '2017-08-07 13:51:38', 2, 'S/N', 'MORA ORDOÑEZ MARIANA ', NULL, NULL, 'REFERENTE A RESOLUCION 2017-833', '5', 'COPIA DE PAGO', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 18:51:22', '113'),
(483, 31, 11765, '2017-08-07 13:57:12', 2, 'S/N', 'DANIELA PAOLA GONZALEZ', NULL, NULL, 'ALCANCE A TRAMITE 9754 DEL 05-07-2017', '3', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 18:57:13', '114'),
(484, 31, 11766, '2017-08-07 13:59:17', 2, 'OFC-2017-3675', 'CESAR RUEDA - POLICIA NACIONAL QUITUMBE', NULL, NULL, 'REMITE QUEJA POR ROTURA DE VIDRIO', '12', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 18:59:10', '112'),
(485, 31, 11767, '2017-08-07 14:02:19', 2, 'OFC-2017-2928', 'FAUSTO MEDINA - POLICIA LA MARISCAL', NULL, NULL, 'INCUMPLIMIENTO DE OPERATIVO', '12', 'COPIA DE DISPOSICION', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:02:00', '112'),
(486, 31, 11768, '2017-08-07 14:04:36', 2, 'S/N', 'SANTIAGO JAVIER VEGA', NULL, NULL, 'REFERENTE AL EXPEDIENTE 368-2017', '1', '-COPIAS VARIAS', 1, 12, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:04:06', '115'),
(487, 31, 11769, '2017-08-07 14:06:49', 1, 'S/N', 'WALTER HERNANDEZ', '1711987741', 'wrhm.13@hotmail.com', 'CONSTRUCCION SIN PERMISOS', '3', 'FORMULARIO Y FOTOS', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:06:26', '114'),
(488, 5, 11770, '2017-08-07 14:08:59', 2, 'OFC 2017-2976', 'SANTIAGO TOBAR', NULL, NULL, 'ATENCION A DENUNCIA; AUTOMOTRIZ DEL SUR', '12', 'GDOC 2017-037803', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:09:44', '112'),
(489, 31, 11771, '2017-08-07 14:09:50', 2, 'S/N', 'MARIA FERNANDA LARA', NULL, NULL, 'REFERENTE AL EXPEDIENTE 492-2017', '1', 'COPIA DE PAGO', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:09:55', '115'),
(490, 5, 11772, '2017-08-07 14:14:01', 2, 'S/N', 'AB. RICHARD BAQUEZEA', NULL, NULL, 'COPIA CERTIFICADA DEL EXP. 2008-212', '12', 'GDOC 2017-112191', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:14:11', '112'),
(491, 31, 11773, '2017-08-07 14:15:36', 2, 'S/N', 'ROBERTO GUAMBA CACOANGO', NULL, NULL, 'REFERENTE A RESOLUCION 2017-1150', '5', 'COPIA DE RESOLUCION', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:15:36', '113'),
(492, 5, 11774, '2017-08-07 14:17:04', 2, 'OFC 2017-2973', 'SANTIAGO ANDRADE', NULL, NULL, 'ATENCION A REQUERIMIENTO', '12', 'GDOC 2017-102880', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:16:47', '112'),
(498, 31, 11775, '2017-08-07 14:23:02', 2, 'OFC-2017-4103', 'HUGO CHACON - TERRITORIO', NULL, NULL, 'REFERENTE AL OFICIO AMC-SM-JA-2017-0001088', '12', 'GDOC-2017-072592', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:23:06', '112'),
(499, 5, 11776, '2017-08-07 14:25:53', 2, 'OFC 2017-2974', 'SANTIAGO ANDRADE', NULL, NULL, 'ATENCION A REQUERIMIENTO', '12', 'GDOC 2017-102877', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:25:39', '112'),
(500, 31, 11777, '2017-08-07 14:26:15', 2, 'OFC-017-412', 'EDDY SANCHEZ', NULL, NULL, 'MESA DE TRABAJO ', '12', 'GDOC-2017-113351', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:25:53', '112'),
(501, 31, 11778, '2017-08-07 14:28:16', 2, 'OFC-2017-372', 'FAUSTO CHAVEZ - TESORERO ZONA NORTE', NULL, NULL, 'REF. OFC. AMC-DRYE-SO-2017-131', '5', 'GDOC-2017-082316', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:28:25', '113'),
(502, 31, 11779, '2017-08-07 14:30:36', 2, 'S/N', 'FAUSTO CHAVEZ - TESORERO ZONA NORTE', NULL, NULL, 'REF. OFC. AMC-DRYE-DP-2017-214', '3', 'GDOC-2017-091555', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:30:42', '114'),
(503, 31, 11780, '2017-08-07 14:36:09', 1, 'S/N', 'ALBERTO SANGOQUILA', NULL, NULL, 'EDIFICAR SIN RESPETAR RETIROS', '3', 'FORMULARIO FOTOS', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:36:07', '114'),
(504, 31, 11781, '2017-08-07 14:38:02', 1, 'S/N', 'IVAN VALLEJO AGUIRRE', NULL, NULL, 'CONSTRUCCION SIN PERMISOS', '3', 'FORMULARIO FOTOS', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:37:48', '114'),
(505, 31, 11782, '2017-08-07 14:40:08', 2, 'MEMO-2017-454', 'EDWIN TORRES - LOS CHILLOS', NULL, NULL, 'REGISTRO DIARIO', '7', 'LISTADO DE FIRMAS', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:39:56', '118'),
(506, 31, 11783, '2017-08-07 14:41:47', 2, 'MEMO-2017-449', 'EDWIN TORRES - LOS CHILLOS', NULL, NULL, 'PEDIDO DE INSPECCION', '3', 'EXP-164-2017', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:41:37', '114'),
(507, 31, 11784, '2017-08-07 14:44:05', 2, 'MEMO-2017-458', 'EDWIN TORRES - LOS CHILLOS', '', '', 'ESTADISTICAS JULIO', '10', 'ESTADISTICAS', 1, 2, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:43:38', '144'),
(508, 31, 11785, '2017-08-07 14:45:25', 2, 'S/N', 'SERRANO LEON BELEN', NULL, NULL, 'REFERENTE A LUAE', '3', 'COPIA DE LUAE', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:45:06', '114'),
(509, 31, 11786, '2017-08-07 14:47:20', 2, 'MEMO-2017-188', 'KAREN ACOSTA - LOS CHILLOS', NULL, NULL, 'HOJAS DE RUTA', '7', 'FIRMAS ', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:46:55', '118'),
(510, 5, 11787, '2017-08-07 14:46:59', 2, 'OFC 2017-1307', 'ANDREA FLORES', NULL, NULL, 'REUBICACION PARADA DE BUSES LOCALIZADA EN AV. TNTE. UGO ORTIZ Y FRANCISCO SOTO', '12', 'GDOC 2017-100400', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:47:16', '112'),
(511, 31, 11788, '2017-08-07 14:49:07', 2, 'OFC-2017-457', 'IVAN BASTIDAS - LOS CHILLOS', NULL, NULL, 'PAGO DE HORAS EXTRAS', '3', 'INFORMES', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:48:36', '114'),
(512, 5, 11789, '2017-08-07 14:49:21', 2, 'OFC 2017-1316', 'ANDREA FLORES', NULL, NULL, 'CONTROL DE VENTAS AMBULANTES EN LA PARADA DE BUSES AV. TNTE. HUGO ORTIZ', '12', 'GDOC 2017-11131', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:49:18', '112'),
(513, 31, 11790, '2017-08-07 14:50:48', 2, 'OFC-2017-457', 'IVAN BASTIDAS - LOS CHILLOS', '', '', 'PAGO DE HORAS EXTRA', '7', 'INFORMES', 1, 5, 'COPIA PARA UTHH', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:51:05', '118'),
(514, 5, 11791, '2017-08-07 14:53:07', 2, 'S/N', 'PAOLA CHAVEZ', NULL, NULL, 'REFERENTE A EXPEDIENTE 2017-115', '12', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:53:01', '112'),
(515, 7, 11792, '2017-08-07 14:54:16', 2, 'MEMO AMC-UDCMCL-ZT-2017-461', 'AB.JOHANA MORALES TUMBACO', NULL, NULL, 'ICUS 633028', '2', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:54:09', '116'),
(516, 7, 11793, '2017-08-07 14:55:45', 2, 'MEMO AMC-UDCMCL-ZAY-2017-267', 'AB.DARIO QUILLUPANGUI AEROPUERTO', NULL, NULL, 'ICUS 5549173', '2', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:55:35', '116'),
(517, 7, 11794, '2017-08-07 14:57:23', 2, 'MEMO AMC-UDCMCL-ZAY-266', 'AB.DARIO QUILLUPANGUI AEROPUERTO', NULL, NULL, 'ICUS 110790', '2', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:57:03', '116'),
(518, 7, 11795, '2017-08-07 14:58:36', 2, 'MEMO AMC-UDCMCL-ZAY-2017-265', 'AB.SARA GARCIA AEROPUERTO', NULL, NULL, 'INSISTENCIA', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:58:24', '114'),
(519, 7, 11796, '2017-08-07 15:00:07', 2, 'MEMO AMC-UDCMCL-ZAY-2017-264', 'AB.SARA GARCIA', NULL, NULL, 'INSPECCION CONJUNTA', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 19:59:45', '114'),
(520, 7, 11797, '2017-08-07 15:01:29', 2, 'MEMO AMC-UDCMCL-ZAY-2017-262', 'AB.SARA GARCIA AEROPUERTO', NULL, NULL, 'DEVOLUCION INFORME TECNICO', '3', '-', 1, 8, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 20:01:05', '114'),
(521, 7, 11798, '2017-08-07 15:02:45', 2, 'MEMO AMC-UDCMCL-ZT-459', 'AB.SARA GARCIA', '', '', 'ACTUALIZACION INFORME', '5', '-', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 20:02:29', '121'),
(522, 7, 11799, '2017-08-07 15:04:25', 2, 'MEMO AMC-CMASA-ZT-2017-219', 'AB.SARA GARCIA TUMBACO', NULL, NULL, 'RESPUESTA AMC-DMI-2017-529', '4', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 20:04:14', '124'),
(523, 31, 11800, '2017-08-07 15:07:03', 2, 'S/N', 'ROBINSON GALARZA LARA', NULL, NULL, 'REFERENTE A CENTRO DE TOLERANCIA ', '12', '-', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 20:07:02', '112'),
(524, 31, 11801, '2017-08-07 15:09:45', 2, 'S/N', 'ORDOÑEZ SANTOS MAUEL OSORIO', NULL, NULL, 'RERENTE AL EXPEDIENTE 2017-064', '5', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 20:09:27', '113'),
(525, 31, 11802, '2017-08-07 15:12:41', 2, 'S/N', 'EDGAR GUALOTO', NULL, NULL, 'REFERENTE AL EXPEDIENTE 026-2017', '5', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 20:12:35', '113'),
(526, 31, 11803, '2017-08-07 15:19:19', 2, 'MEMO-2017-192', 'MARIO CEVALLOS - DIRECCION DE PLANIFICACION', NULL, NULL, 'SOLICITUD DE DOCUMENTOS', '2', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 20:20:13', '116'),
(527, 5, 11804, '2017-08-07 15:27:47', 2, 'MEMO 2017-198', 'AB. CARLOS CALAHORRANO', NULL, NULL, 'RESULTADO DE INSPECCION REALIZADA EL 30 DE MAYO DEL 2017', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 20:27:43', '114'),
(528, 5, 11805, '2017-08-07 15:29:58', 2, 'MEMO 2017-197', 'AB. CARLOS CALAHORRANO', NULL, NULL, 'INFORME TECNICO NºITDI 16-2797', '3', '-', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 20:29:55', '114'),
(529, 5, 11806, '2017-08-07 15:37:45', 2, 'S/N', 'JOSE ROGEL', NULL, NULL, 'LEVANTAMIENTO DE EXPEDIENTE', '16', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 20:38:00', '135'),
(530, 5, 11807, '2017-08-07 15:45:26', 2, 'S/N', 'DRA. PATRICIA DURAN', NULL, NULL, 'REFERENTE A EXP. 2017-424', '1', '-', 1, 14, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 20:45:19', '115'),
(531, 5, 11808, '2017-08-07 15:49:03', 2, 'OFC 2017-2164', 'AB. JAIME MORAN', NULL, NULL, 'CERTIFICACION RESOLUCION DE CONCEJO', '12', '-', 1, 15, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 20:48:51', '119'),
(532, 5, 11809, '2017-08-07 15:51:32', 2, 'S/N', 'HECTOR FREIRE', NULL, NULL, 'REFERENTE EXP. 2013-146', '5', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 20:51:21', '121'),
(533, 31, 11810, '2017-08-07 16:10:44', 2, 'S/N', 'MARIA INES CRESPO', '', '', 'REFERENTE AL EXPEDIENTE 130-2016', '5', '-', 1, 1, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-07 21:10:14', '141'),
(534, 31, 11811, '2017-08-08 08:02:48', 1, 'S/N', 'HUGO BOLIVAR GALINDO', NULL, NULL, 'CONSTRUCCION SIN RESPETAR RETIRAS', '3', 'FOTOGRAFIAS Y COPIA DE CEDULA', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 13:02:59', '122'),
(535, 31, 11812, '2017-08-08 08:32:19', 2, 'S/N', 'MARIA ELENA SARMIENTO', NULL, NULL, 'RESOLUCION 2017-908', '5', 'DOCUMENTOS VARIOS', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 13:32:21', '121');
INSERT INTO `amc_denuncias` (`id`, `id_persona`, `codigo_tramite`, `recepcion_documento`, `id_tipo_documento`, `num_documento`, `remitente`, `cedula`, `email`, `asunto`, `reasignacion`, `descripcion_anexos`, `id_caracter_tramite`, `cantidad_fojas`, `observacion_secretaria`, `envio_inspeccion`, `estado_recepcion_informacion`, `codigo_inspeccion`, `codigo_procedimiento`, `id_zona`, `predio`, `observacion`, `actividad`, `procedimientos`, `persona_asignada`, `fecha_creacion`, `guia`) VALUES
(536, 31, 11813, '2017-08-08 08:44:07', 2, 'S/N', 'RICHARD IMBAQUINGO BENAVIDES', NULL, NULL, 'REFERENTE A EXPEDIENTE 459-2017', '1', 'COPIA INGRESO LUAE', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 13:43:40', '123'),
(537, 31, 11814, '2017-08-08 08:45:45', 2, 'OFC-109-2017', 'JUAN ZAPATA - SECRETARIA DE SEGURIDAD', '', '', 'SUSPENSION ACTIVIDADES QUE GENERAN TRANSFERENCIA DE CALOR Y GASES', '12', 'VARIOS DOCUMENTOS', 1, 34, 'DOCUMENTO URGENTE SE ENTREGO SIN GUIA DE DESPACHO. ', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 13:46:16', '119'),
(538, 31, 11815, '2017-08-08 08:48:29', 2, 'OFC-2017-1200', 'JUAN ZAPATA - SECRETARIA DE SEGURIDAD', NULL, NULL, 'SOLICITUD DE INSPECCION', '12', 'GDOC-2017-107272', 1, 8, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 13:48:12', '119'),
(539, 31, 11816, '2017-08-08 08:50:20', 2, 'OFC-2017-813', 'DENNIS SUAREZ - GESTION DE RIESGOS', NULL, NULL, 'TALLER - CAPACITACION ', '12', 'GDOC-2017-114171', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 13:50:37', '119'),
(540, 31, 11817, '2017-08-08 09:23:21', 1, 'DENUNCIA', 'LOURDES MOLINA TAPIA', '171034038-9', 'vero_molina123@hotmail.com', 'MALA TENENCIA DE MASCOTAS', '3', 'FOTOS COPIA CEDULA 1 CD', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 14:22:57', '122'),
(541, 31, 11818, '2017-08-08 09:25:22', 1, 'DENUNCIA', 'CARLOS MOLINA MERA', '170068776-5', 'vero_molina123@hotmail.com', 'ADOSAR SIN PERMISOS', '3', 'FOTOS COPIA CEDULA', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 14:24:58', '122'),
(542, 31, 11819, '2017-08-08 09:30:42', 2, 'OFC-1082-2017', 'FELIPE CORRAL - ENTIDADES COLABORADORAS', NULL, NULL, 'EXPRESA AGRADESIMIENTO', '12', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 14:30:38', '119'),
(543, 31, 11820, '2017-08-08 09:50:31', 2, 'S/N', 'JOSE LEINES MUQUINCHE', NULL, NULL, 'REFERENTE A RESOLUCION 2017-0676', '5', 'COPIA DE PAGO', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 14:50:23', '121'),
(544, 31, 11821, '2017-08-08 09:53:01', 2, 'S/N', 'SUSANA CARRERA CADENA', NULL, NULL, 'REFERENTE AL EXPEDIENTE 2017-103', '13', 'VARIOS DOCUMENTOS', 1, 8, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 14:52:31', '133'),
(545, 5, 11822, '2017-08-08 10:06:50', 2, 'S/N', 'omar ramos', NULL, NULL, 'referente a exp 2014-538', '1', '-', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 15:06:19', '123'),
(546, 5, 11823, '2017-08-08 10:23:42', 2, 'OFC 2017-904-PMQ', 'CORONEL CARLOS AGUIRRE', NULL, NULL, 'INSPECCION DE SEGURIDAD Y RIESGO DE LA PERSONA PROTEGIDA', '12', 'GDOC 2017-115073', 1, 10, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 15:23:50', '120'),
(547, 5, 11824, '2017-08-08 10:26:50', 1, 'S/N', 'MIRIAN PINOS', '0200665446', 'jjoda.consorciojuridico@gmail.com', 'REALIZAR ADECUACIONES SIN PERMISOS', '3', '-', 1, 24, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 15:27:03', '122'),
(548, 31, 11825, '2017-08-08 10:26:59', 2, 'S/N', 'EDISON MENDOZA GARCIA', NULL, NULL, 'REFERENTE A RESOLUCION 2017-085', '5', 'VARIOS DOCUMENTOS', 1, 7, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 15:27:16', '121'),
(549, 31, 11826, '2017-08-08 10:31:01', 2, 'S/N', 'HAYDN BETANCOURT', NULL, NULL, 'REFERENTE A RESOLUCION 074-2017', '5', 'COPIA DE PAGO', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 15:30:42', '121'),
(550, 5, 11827, '2017-08-08 10:32:39', 2, 'S/N', 'DIONICIO GUAMAN', NULL, NULL, 'CONOCIMIENTO DE PAGO DE MULTA', '5', '-', 1, 8, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 15:32:38', '121'),
(551, 31, 11828, '2017-08-08 10:34:40', 2, 'S/N', 'JORGE AGUIRRE TRIVIÑO', NULL, NULL, 'REFERENTE AL EXPEDIENTE 055-2017', '17', 'VARIOS DOCUMENTOS', 1, 15, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 15:34:16', '136'),
(552, 31, 11829, '2017-08-08 10:43:02', 2, 'GDOC-2017-113815', 'MIGUEL VALDIVIEZO - ZONA NORTE', '', '', 'CONTROL EDIFICACIONES - RESIDENCIA PACHECO', '3', 'ACTA DE CONTROL Y REQUISITOS', 1, 0, 'CARPETA PARA ING. ALBERTO OBANDO', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 15:43:38', '122'),
(553, 5, 11830, '2017-08-08 10:45:57', 2, 'OFC 2017-2137', 'ARQ. ALEJANDRA CORNEJO', NULL, NULL, 'INFORME DE INMUEBLE', '3', 'GDOC 2017-114522', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 15:45:38', '122'),
(554, 31, 11831, '2017-08-08 10:46:19', 2, 'OFC-2017-040', 'DANIEL CARTAGENA - SERVICIOS CIUDADANOS', NULL, NULL, 'SOLICITUD DE INFORMACION', '1', 'GDOC-2017-025952', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 15:46:13', '123'),
(555, 31, 11832, '2017-08-08 10:48:14', 2, 'OFC-2017-041', 'DANIEL CARTAGENA - SERVICIOS CIUDADANOS', NULL, NULL, 'SOLICITUD DE INFORMACION ', '1', 'GDOC-2017-024843', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 15:47:52', '123'),
(556, 5, 11833, '2017-08-08 10:48:22', 2, 'OFC 2017-2138', 'ING. ANABEL VINTIMILLA', NULL, NULL, 'INSTALACION DE MICROONDA EL NOTICIERO', '12', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 15:48:23', '120'),
(557, 31, 11834, '2017-08-08 10:49:51', 2, 'OFC-309-2017', 'VINICIO ROBALINO - GESTION DE TERRITORIO', '', '', 'REFERENTE A COLOCACION DE TOTEM', '17', '-', 1, 1, 'COPIA PARA CONOCIMIENTO', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 15:49:51', '136'),
(558, 5, 11835, '2017-08-08 10:50:37', 2, 'OFC 2017-2135', 'ING. ANABEL VINTIMILLA', NULL, NULL, 'SOLICITA AUTORIZACION', '12', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 15:51:14', '120'),
(559, 31, 11836, '2017-08-08 10:52:42', 2, 'OFC-321-2017', 'VINICIO ROBALINO - GESTION URBANA', '', '', 'REFERENTE A LMU-41', '17', '-', 1, 1, 'COPIA PARA CONOCIMIENTO', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 15:52:46', '136'),
(560, 5, 11837, '2017-08-08 10:53:29', 2, 'OFC 2017-013 AZMS', 'ARQ. ALEJANDRA CORNEJO', NULL, NULL, 'CONTROL DE CONSTRUCCIONES', '3', 'GDOC 2017-111688 Y CARPETA 2CD', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 15:53:08', '122'),
(561, 31, 11838, '2017-08-08 10:55:46', 2, 'S/N', 'OFC-933-2017', '', '', 'VINICIO ROBALINO - GESTION URBANA', '3', 'CARPETA CON PLAANOS', 1, 9, '9 FOJAS + CON CARPETA DE PLANOS', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 15:55:17', '122'),
(562, 5, 11839, '2017-08-08 10:58:55', 2, 'MEMO 2017-190', 'JAIME BRONCAN', NULL, NULL, 'PAGOS HORAS EXTRAS', '3', '-', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 15:59:58', '122'),
(563, 5, 11840, '2017-08-08 11:02:17', 2, 'MEMO 2017-190', 'JAIME BARRAGAN', NULL, NULL, 'PAGOS HORAS EXTRAS', '7', '-', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 16:01:44', '137'),
(564, 5, 11841, '2017-08-08 11:03:34', 2, 'MEMO 2017-189', 'JAIME BARRAGAN', NULL, NULL, 'PAGO DE HORAS EXTRAS', '3', '-', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 16:03:20', '122'),
(565, 5, 11842, '2017-08-08 11:04:47', 2, 'MEMO 2017-189', 'JAIME BARRAGAN', NULL, NULL, 'PAGO HORAS EXTRAS', '7', '-', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 16:04:13', '137'),
(566, 5, 11843, '2017-08-08 11:06:22', 2, 'MEMO 2017-456', 'AB. EDWIN TORRES', NULL, NULL, 'PEDIDO DE INSPECCION', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 16:05:59', '122'),
(567, 5, 11844, '2017-08-08 11:08:19', 1, 'MEMO 2017-192', 'KAREN ACOSTA', '170922962-7', 'anrocioruizc@yahoo.es', 'CRIADERO DE AVES DE CORRAL , CHANCHERAS', '3', '-ANA DEL ROCIO RUIZ', 1, 7, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 16:08:22', '126'),
(568, 5, 11845, '2017-08-08 11:10:48', 2, 'MEMO 2017-455', 'AB. EDWIN TORRES', NULL, NULL, 'PEDIDO DE ENVIO DE INFORME', '3', '-', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 16:10:30', '122'),
(569, 5, 11846, '2017-08-08 11:21:16', 2, 'S/N', 'MARIA GUADALUPE', NULL, NULL, 'PAGO DE MULTA', '5', '-', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 16:20:52', '121'),
(570, 31, 11847, '2017-08-08 11:22:45', 1, 'S/N', 'ANA NOGALES - C.C. UNICORNIO', '1707558001', 'centrodenegociosunicornio@hotmail.com', 'USO INDEBIDO DE ESPACIO PUBLICO', '3', 'FOTOS', 1, 2, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 16:22:52', '122'),
(571, 31, 11848, '2017-08-08 11:48:00', 2, 'S/N', 'JORGE BOLIVAR VASQUEZ', NULL, NULL, 'REFERENTE A RESOLUCION 339-2016', '5', 'FOTOGRAFIAS', 1, 9, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 16:47:45', '121'),
(572, 5, 11849, '2017-08-08 11:55:00', 2, 'S/N', 'GUADALUPE CRIOLLO', NULL, NULL, 'REAPERTURA TEMPORAL', '5', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 16:55:06', '121'),
(573, 5, 11850, '2017-08-08 12:03:25', 2, 'S/N', 'ESTEFANIA ARCIEIEGAS', NULL, NULL, 'REFERENTE A EXP. 378-2017', '1', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 17:02:59', '123'),
(574, 31, 11851, '2017-08-08 12:05:52', 2, 'S/N', 'CLEMENTE CHAMORRO ARMAS', NULL, NULL, 'SOLICITA COPIA DE CERTIFICADO DE HABITABILIDAD', '3', 'COPIA CEDULA', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 17:05:28', '122'),
(575, 31, 11852, '2017-08-08 12:11:32', 2, 'S/N', 'LUIS OSWALDO RUIZ', NULL, NULL, 'SOLICITA COPIA DE EXP-3744-2015', '2', 'COPIA CEDULA', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 17:11:37', '140'),
(576, 5, 11853, '2017-08-08 12:13:37', 2, 'S/N', 'ALICIA GAVILANES', NULL, NULL, 'REFERENTE A EXP. 2016-012', '5', '-', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 17:13:07', '121'),
(577, 31, 11854, '2017-08-08 12:15:06', 2, 'S/N', 'JUAN CARLOS VALDEZ', NULL, NULL, 'REFERENTE AL EXPEDIENTE 2017-063', '16', 'DOCUMENTOS VARIOS', 1, 22, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 17:14:33', '135'),
(578, 5, 11855, '2017-08-08 12:18:15', 2, 'S/N', 'CECILIA GALARZA', NULL, NULL, 'BAJA DE CREDITO', '5', '-', 1, 10, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 17:17:56', '121'),
(579, 31, 11856, '2017-08-08 12:23:54', 2, 'S/N', 'JORGE VARGAS LEON', NULL, NULL, 'REFERENTE AL EXPEDIENTE 221-2017', '1', 'DOCUMENTOS VARIOS', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 17:23:22', '123'),
(580, 31, 11857, '2017-08-08 12:29:38', 2, 'S/N', 'MARCELO ZAMORA VEITIMILLA', NULL, NULL, 'REFERENTE AL EXPEDIENTE 2017-078 L.P', '16', 'COPIA DE VACUNAS', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 17:29:18', '135'),
(581, 5, 11858, '2017-08-08 12:29:10', 1, 'S/N', 'MARITN DARTAYET', '171426061-7', 'martindartayet@gmail.com', 'ADOSAR SIN AUTORIZACION DE TERCEROS', '3', '-', 1, 4, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 17:30:26', '122'),
(582, 5, 11859, '2017-08-08 13:00:11', 2, 'ofc 2017-2977', 'SANTIAGO ANDRADE ', '', '', 'ATENCION REQUERIMIENTO TEXTIL PADILLA', '4', 'GDOC 2017-015590', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:00:05', '124'),
(583, 5, 11860, '2017-08-08 13:02:11', 2, 'OFC 2017-2980', 'SANTIAGO ANDRADE', '', '', 'JUAN MORETA', '4', 'GDOC 2017-102858', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:02:08', '124'),
(584, 31, 11861, '2017-08-08 13:03:59', 2, 'OFC-2981-2017', 'SANTIAGO ANDRADE S.A.', '', '', 'ATENCION A REQUERIMIENTO', '4', 'GDOC-2017-102873', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:03:46', '124'),
(585, 5, 11862, '2017-08-08 13:04:04', 2, 'OFC 2017-2982', 'SANTIAGO ANDRADE', '', '', 'MECANICA A DIESE HINO TRUCKS', '4', 'GDOC 2017-102851', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:04:15', '124'),
(586, 5, 11863, '2017-08-08 13:06:17', 2, 'OFC 2017-2984', 'SANTIAGO ANDRADE', '', '', 'LUBRICANTES ARACELLY', '4', 'GDOC 2017-102785', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:06:03', '124'),
(587, 31, 11864, '2017-08-08 13:06:22', 2, 'OFC-2983-2017', 'SANTIAGO ANDRADE S.A.', '', '', 'ATENCION A DENUNCIA DE TRANS ECHEVERRIA', '4', 'GDOC-2017-102847', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:06:07', '124'),
(588, 5, 11865, '2017-08-08 13:08:13', 2, 'OFC 2017-2989', 'SANTIAGO ANDRADE', '', '', 'ATENCION A REQUERIMIENTO A MECANICA', '4', 'GDOC 2017-102831', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:07:50', '124'),
(589, 31, 11866, '2017-08-08 13:08:11', 2, 'OFC-2986-2017', 'SANTIAGO ANDRADE - S.A', '', '', 'ATENCION A REQUERIMIENTO AUTOMOTRIZ PROAÑO', '4', 'GDOC-2017-102826', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:07:55', '124'),
(590, 31, 11867, '2017-08-08 13:10:14', 2, 'OFC-2990-2017', 'SANTIAGO ANDRADE. S.A', NULL, NULL, 'ATENCION A DENUNCIA POR CONSTRUCCION', '12', 'GDOC-2017-082313', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:09:53', '120'),
(591, 5, 11868, '2017-08-08 13:10:07', 2, 'OFC 2017-2992', 'SANTIAGO ANDRADE', '', '', 'ATENCION LAVADORA Y LUBRICADORA', '4', 'GDOC 2017-102782', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:10:21', '124'),
(592, 31, 11869, '2017-08-08 13:11:41', 2, 'OFC-2017-3939', 'XAVIER MOLINA - TERRITORIO ELOY ALFARO', NULL, NULL, 'ICUS PARA DISCOTECA', '2', 'GDOC-2017-112853', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:12:11', '140'),
(593, 5, 11870, '2017-08-08 13:12:55', 2, 'OFC 2017-2993', 'SANTIAGO ANDRADE-SECRE-AMB', NULL, NULL, 'ATENCION A DENUNCIA RESTAURANTE SAMUANA', '12', 'GDOC 2017-095075', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:12:55', '120'),
(594, 31, 11871, '2017-08-08 13:15:06', 2, 'OFC-2017-3940', 'XAVIER MOLINA - TERRITORIO ELOY ALFARO', NULL, NULL, 'ICUS PARA ACTIVIDAD COMERCIAL', '2', 'GDOC-2017-114532', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:14:58', '140'),
(595, 5, 11872, '2017-08-08 13:15:05', 2, 'OFC 2017-2997', 'SANTIAGO ANDRADE-SECRETARIA AMB', NULL, NULL, 'ATENCION DENUNCIA RESTAURANTE ALEF COCINA', '12', 'GDOC 2017-10149', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:15:24', '120'),
(596, 31, 11873, '2017-08-08 13:16:57', 2, 'OFC-2017-3942', 'XAVIER MOLINA - TERRITORIO ELOY ALFARO', NULL, NULL, 'ICUS PARA ACTIVIDAD COMERCIAL', '2', 'GDOC-2017-114508', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:16:31', '140'),
(597, 5, 11874, '2017-08-08 13:17:08', 2, 'OFC 2017-3006', 'SANTIAGO ANDRADE-S-A', '', '', 'MECANICA AUTOMOTRIZ  DIESEL DOCTOR MICHE', '4', 'GDOC 2017-102816', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:17:32', '124'),
(598, 31, 11875, '2017-08-08 13:18:27', 2, 'OFC-2017-3941', 'XAVIER MOLINA - TERRITORIO ELOL ALFARO', NULL, NULL, 'ICUS PARA ACTIVIDAD COMERCIAL', '2', 'GDOC-2017-114512', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:18:07', '140'),
(599, 5, 11876, '2017-08-08 13:19:16', 2, 'OFC 2017-3017', 'RUTH RUIZ', NULL, NULL, 'PROPUESTA PROCEDIMIENTO DE RECAUDACION DE MULTAS', '12', 'GDOC 2017-107442 Y 1 CD', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:19:37', '120'),
(600, 31, 11877, '2017-08-08 13:20:03', 2, 'OFC-2017-3943', 'XAVIER MOLINA - TERRITORIO ELOY ALFARO', NULL, NULL, 'ICUS PARA ACTIVIDAD COMERCIAL', '2', 'GDOC-2017-114500', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:19:40', '140'),
(601, 31, 11878, '2017-08-08 13:21:29', 2, 'OFC-2017-3954', 'XAVIER MOLINA - TERRITORIO ELOY ALFARO', NULL, NULL, 'ICUS PARA ACTIVIDAD COMERCIAL', '2', 'GDOC-2017-113647', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:21:06', '140'),
(602, 5, 11879, '2017-08-08 13:22:03', 2, 'OFC 2017-3011', 'SANTIAGO ANDRADE S-A', NULL, NULL, 'METALICAS FENIX', '3', 'GDOC 2017-102865', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:21:44', '122'),
(603, 31, 11880, '2017-08-08 13:22:55', 2, 'OFC-2017-3958', 'XAVIER MOLINA - TERRITORIO ELOY ALFARO', NULL, NULL, 'ICUS PARA ACTIVIDAD COMERCIAL', '2', 'GDOC-2017-115123', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:22:33', '140'),
(604, 5, 11881, '2017-08-08 13:24:18', 2, 'OFC 2017-3010', 'SANTIAGO ANDRADE S-A', '', '', 'MECANICA AUTOMOTRIZ', '4', 'GDOC 2017-102843', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:23:52', '124'),
(605, 31, 11882, '2017-08-08 13:24:36', 2, 'OFC-2017-3956', 'XAVIER MOLINA - TERRITORIO ELOY ALFARO', NULL, NULL, 'ICUS PARA ACTIVIDAD COMERCIAL', '2', 'GDOC-2017-115140', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:24:15', '140'),
(606, 31, 11883, '2017-08-08 13:26:05', 2, 'OFC-2017-3957', 'XAVIER MOLINA - TERRITORIO ELOY ALFARO', NULL, NULL, 'ICUS PARA ACTIVIDAD COMERCIAL', '2', 'GDOC-2017-115145', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:25:38', '140'),
(607, 5, 11884, '2017-08-08 13:26:51', 2, 'OFC 2017-3009', 'SANTIAGO TOBAR', '', '', 'CONTROL TURBOMOTORS JAVY', '4', 'GDOC 2017-105069', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:26:30', '124'),
(608, 31, 11885, '2017-08-08 13:27:40', 2, 'OFC-2017-3955', 'XAVIER MOLINA - TERRITORIO ELOY ALFARO', NULL, NULL, 'ICUS PARA ACTIVIDAD COMERCIAL', '2', 'GDOC-2017-113633', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:27:14', '140'),
(609, 5, 11886, '2017-08-08 13:28:18', 2, 'OFC 2017-3008', 'SANTIAGO ANDRADE S-A', '', '', 'TALLER AUTOMOTRIZ VJ', '4', 'GDOC 2017-102836', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:27:58', '124'),
(610, 5, 11887, '2017-08-08 13:29:58', 2, 'C 2017-3007', 'SANTIAGO ANDRADE A-A', '', '', 'DENUNCIA ERRANO CALVOPIÑA', '4', 'GDOC 017-044119', 1, 3, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:29:40', '124'),
(611, 31, 11888, '2017-08-08 13:29:29', 2, 'S/N', 'DIANA MILENA PEÑA', NULL, NULL, 'REFERENTE AL EXPEDIENTE 118-2017', '5', 'COPIAS VARIAS', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:29:45', '121'),
(612, 5, 11889, '2017-08-08 13:35:03', 2, 'S/N', 'GERMAN BORBON', NULL, NULL, 'REFERENTE A ACTA 594', '3', '-', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:35:24', '122'),
(613, 31, 11890, '2017-08-08 13:42:21', 2, 'S/N', 'ZOILA ACOSTA JIMENEZ', NULL, NULL, 'REFERENTE A EXPEDIENTE 063-2010', '5', 'FOTOGRAFIAS', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:45:38', '121'),
(614, 31, 11891, '2017-08-08 13:48:18', 2, 'S/N', 'SUSANA PULUPA', NULL, NULL, 'REFERENTE AL EXPEDIENTE 124-2017', '5', 'COPIA DE PAGO', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:47:51', '121'),
(615, 31, 11892, '2017-08-08 13:52:07', 2, 'S/N', 'PAULINA QUIROS', NULL, NULL, 'SOLICITA COPIA DE RESOLUCION', '2', 'COPIA CEDULA', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 18:52:50', '140'),
(616, 31, 11893, '2017-08-08 14:36:17', 2, 'OFC-2175-2017', 'SERGIO GARNICA - CONCEJAL ', NULL, NULL, 'SOLICITA ACCIONES PARA DERROCAMIENTO', '12', 'GDOC-2017-115252', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 19:36:09', '120'),
(617, 31, 11894, '2017-08-08 14:37:49', 2, 'OFC-2176-2017', 'SERGIO GARNICA - CONCEJAL', NULL, NULL, 'SOLICITA INICIO DE PROCESO SANCIONADOR', '12', 'GDOC-2017115296', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 19:37:33', '120'),
(618, 5, 11895, '2017-08-08 14:50:41', 2, 'S/N', 'AB. PAOLA CHAVEZ', '', '', 'REFERENTE A EXP. 2017-115', '1', '1 PLANO', 1, 16, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 19:50:30', '131'),
(619, 31, 11896, '2017-08-08 15:03:02', 2, 'MEMO-2017-263', 'SARA GARCIA - AEROPUERTO', NULL, NULL, 'INSPECCION CONJUNTA', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:02:39', '122'),
(620, 5, 11897, '2017-08-08 15:03:52', 2, 'S/N', 'MARIA DOLORES VILLACIS', NULL, NULL, 'REFERENTE A AUTO DE INICIO', '1', '-', 1, 11, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:03:38', '123'),
(621, 31, 11898, '2017-08-08 15:04:37', 2, 'OFC-2017-269', 'SARA GARCIA - AEROPÚERTO', NULL, NULL, 'INSISTENCIA DE INFORME', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:04:19', '122'),
(622, 31, 11899, '2017-08-08 15:05:59', 2, 'MEMO-2017-268', 'SARA GARCIA - AEROPUERTO', NULL, NULL, 'INSISTENCIA DE INFORME', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:05:35', '122'),
(623, 31, 11900, '2017-08-08 15:07:18', 2, 'MEMO-2017-271', 'SARA GARCIA - AEROPUERTO', NULL, NULL, 'INSISTENCIA DE INFORME', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:06:47', '122'),
(624, 5, 11901, '2017-08-08 15:07:42', 2, 'S/N', 'MARIA DOLORES VILLACIS', NULL, NULL, 'REFERENTE AUTO DE INICIO 2017-355', '1', '1 PLANO', 1, 21, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:07:21', '123'),
(625, 31, 11902, '2017-08-08 15:08:26', 2, 'MEMO-2017-270', 'SARA GARCIA - AEROPUERTO', NULL, NULL, 'INSISTENCIA DE INFORME', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:07:54', '122'),
(626, 31, 11903, '2017-08-08 15:09:58', 1, 'DENUNCIA', 'JORGE MALDONADO', NULL, NULL, 'LOCAL SIN LUAE', '3', 'VARIOS DOCUMENTOS ', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:10:01', '122'),
(627, 31, 11904, '2017-08-08 15:12:11', 1, 'DENUNCIA', 'MARIA QUELAL SUNTAXI', NULL, NULL, 'CONSTRUCCION SIN PERMISOS', '3', 'FOTOS Y COPA DE CEDULA', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:11:52', '122'),
(628, 31, 11905, '2017-08-08 15:13:32', 1, 'DENUNCIA', 'ISABEL ACOSTA', NULL, NULL, 'EDIFICAR SIN RESPETAR RETIROS', '3', 'FOTOS Y VARIOA DOCUMENTOS', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:13:10', '122'),
(629, 5, 11906, '2017-08-08 15:13:48', 2, 'S/N', 'ARQ. PEDRO ESPINEL', NULL, NULL, 'REFRENTE AL MEMO 2017-460', '12', '-', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:13:31', '120'),
(630, 31, 11907, '2017-08-08 15:15:32', 1, 'DENUNCIA', 'SEGUNDO GUAÑA ', NULL, NULL, 'CONSTRUCCION SIN PERMISOS', '3', 'FOTOS Y COPIA DE CEDULA', 1, 7, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:15:06', '122'),
(631, 31, 11908, '2017-08-08 15:18:16', 1, 'DENUNCIA', 'CONJUNTO PORTAL EL SOL', NULL, NULL, 'VENTAS AMBULANTES', '3', 'FOTOS Y VARIOS DOC.', 1, 8, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:17:55', '122'),
(632, 5, 11909, '2017-08-08 15:18:02', 2, 'S/N', 'JORGE VILLACIS', NULL, NULL, 'COPIA CERTIFICADA', '5', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:18:14', '121'),
(633, 31, 11910, '2017-08-08 15:19:58', 1, 'DENUNCIA', 'MARCO JIMENEZ', NULL, NULL, 'CRIADERO DE CHANCHOS', '3', 'FOTOS Y OTROS DOC. ', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:19:46', '122'),
(634, 31, 11911, '2017-08-08 15:22:01', 2, 'S/N', 'ALICIA GAVILANEZ TERAN', NULL, NULL, 'REFERENTE A RESOLUCION 2017-1020', '5', 'COPIA DE RESOLUCION', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:21:37', '121'),
(635, 5, 11912, '2017-08-08 15:23:16', 2, 'S/N', 'MARIO REINO', NULL, NULL, 'ACTA 3194', '1', '-', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:23:03', '123'),
(636, 31, 11913, '2017-08-08 15:23:45', 2, 'OFC-378-2017', 'LORENA BASSANTE - TESORERA ZN', NULL, NULL, 'REFERENTE AL OFC-2017-236', '5', 'DOCUMENTOS VARIOS', 1, 7, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:23:33', '121'),
(637, 31, 11914, '2017-08-08 15:25:36', 2, 'OFC-379-2017', 'LORENA BASSANTE - TESORERA ZN', NULL, NULL, 'REFERENTE AL OFC-2017-237', '5', 'DOCUMENTOS VARIOS', 1, 8, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:25:14', '121'),
(638, 31, 11915, '2017-08-08 15:27:08', 2, 'OFC-380-2017', 'LORENA BASSANTE - TESORERA ZN', NULL, NULL, 'REFERENTE AL OFC-2017-0246', '5', 'DOCUMENTOS VARIOS', 1, 10, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:26:49', '121'),
(639, 31, 11916, '2017-08-08 15:29:05', 2, 'S/N', 'EDGAR RIOFRIO PAREDES', '', '', 'REFERENTE A EXPEDIENTE 411-2017', '1', 'DOCUMENTOS VARIOS', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:28:35', '131'),
(640, 5, 11917, '2017-08-08 15:30:22', 2, 'S/N', 'DR. LUIS ADOLFO', NULL, NULL, 'REFRENTE EXP. 458-2017', '3', '-', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:30:09', '122'),
(641, 31, 11918, '2017-08-08 15:30:25', 2, 'S/N', 'EDGAR RODRIGUEZ PAREDES', '', '', 'REFERENTE AL EXP-411-2017', '1', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:30:16', '131'),
(642, 5, 11919, '2017-08-08 15:32:33', 2, 'S/N', 'DR. LUIS MORENO', NULL, NULL, 'REFERENTE A EXP. 2017-458', '1', '-', 1, 36, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:32:13', '123'),
(643, 31, 11920, '2017-08-08 15:32:35', 2, 'OFC-090-2017', 'CECIBEL TUALOMBO - JEFA FINANCIERA GESTION DE DESTINO TURISTICO', '', '', 'REFERENTE A RESOLUCION 2017-0832', '5', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:32:49', '128'),
(644, 5, 11921, '2017-08-08 15:35:57', 2, 'MEMO 2017-536', 'AB. JUAN GUALLPA', NULL, NULL, 'REMITO ACTA DE VERIFICACION 2682', '4', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:35:58', '124'),
(645, 5, 11922, '2017-08-08 15:38:03', 2, 'MEMO 2017-536', 'AB. JUAN GUALLPA', NULL, NULL, 'REMITO ACTA DE VERIFICACION 2682', '3', '-', 1, 15, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:37:50', '122'),
(646, 5, 11923, '2017-08-08 15:40:10', 2, 'MEMO 2017-538', 'AB. JUAN GUALLPA', NULL, NULL, 'INSPECCION CONJUNTA  MARTES 15 DE AGOSTO', '3', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:40:24', '122'),
(647, 31, 11924, '2017-08-08 15:42:52', 2, 'S/N', 'KATHERINE PLUA CEDEÑO', NULL, NULL, 'QUEJA POR FALTA DE ATENCION A DENUNCIA', '12', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:42:50', '127'),
(648, 31, 11925, '2017-08-08 15:52:23', 2, 'S/N', 'VICTOR CARRERA NOBOA', NULL, NULL, 'REFERENTE AL EXPEDIENTE 259-2017', '1', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:51:56', '123'),
(649, 31, 11926, '2017-08-08 15:55:30', 1, 'DENUNCIA', 'DAVID ROBERTO GARCIA', NULL, NULL, 'CONSTRUCCION SIN PERMISOS', '3', 'COPIA DE CEDULA E IRM', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:55:16', '122'),
(650, 31, 11927, '2017-08-08 15:59:32', 1, 'DENUNCIA', 'NANCY GUERRON', NULL, NULL, 'CONSTRUCCION SIN PERMISOS', '3', 'FOTOS Y COPIA DE CEDULA', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 20:59:07', '122'),
(651, 31, 11928, '2017-08-08 16:00:55', 1, 'DENUNCIA', 'ANA MARIA SULCA', NULL, NULL, 'CONSTRUCCION SIN PERMISOS', '3', 'FOTOS Y COPIA DE CEDULA', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 21:00:26', '122'),
(652, 31, 11929, '2017-08-08 16:02:33', 2, 'MEMO-2017-354', 'JAIME MURIEL - ELOY ALFARO', NULL, NULL, 'BUSQUEDA DE EXPEDIENTE 411-2006', '5', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 21:02:20', '128'),
(653, 31, 11930, '2017-08-08 16:04:26', 2, 'MEMO-2017-201', 'GABRIELA ESCOBAR - ELOY ALFARO', '', '', 'BUSQUEDA DE EXPEDIENTE 411-2017', '5', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 21:04:29', '128'),
(654, 31, 11931, '2017-08-08 16:06:48', 2, 'S/N', 'CAROLINA COBO', '', '', 'REFERENTE AL EXPEDIENTE 119-2017', '5', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 21:06:27', '128'),
(655, 31, 11932, '2017-08-08 16:08:54', 2, 'S/N', 'GALO MARCELO CASTELLANO', '', '', 'REFERENTE AL EXPEDIENTE 484-2017', '1', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 21:08:24', '131'),
(656, 31, 11933, '2017-08-08 16:10:33', 2, 'S/N', 'PABLO CELI', '', '', 'REFERENTE AL EXPEDIENTE 330-2017', '1', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 21:10:03', '131'),
(657, 31, 11934, '2017-08-08 16:11:51', 1, 'DENUNCIA', 'JAIME RODRIGO BASTIDAS', NULL, NULL, 'CONSTRUCCION SIN PERMISOS', '3', '-', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 21:12:20', '126'),
(658, 31, 11935, '2017-08-08 16:24:48', 1, 'DENUNCIA', 'HECTOR SIVINTA ', NULL, NULL, 'MALTRATO DE MASCOTAS', '3', 'FOTOS Y OTROS', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 21:24:29', '126'),
(659, 31, 11936, '2017-08-08 16:26:13', 1, 'DENUNCIA', 'MARCELO GALLEGO', '175752298-0', 'bufalo_alefin@hotmail.com', 'USO INDEBIDO DE ESPACIO PUBLICO', '3', 'FOTOS ', 1, 6, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 21:25:51', '126'),
(660, 31, 11937, '2017-08-08 16:28:10', 2, 'OFC-2017-9605', 'WASHINGTON CHUGA - POLICIA EUGENIO ESPEJO', '', '', 'REMITE PARTE POLICIAL', '12', 'PARTE POLICIAL', 1, 3, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 21:27:51', '127'),
(661, 31, 11938, '2017-08-08 16:29:42', 2, 'OFC-2017-9362', 'FERNANDO TORRES - POLICIA EUGENIO ESPEJO', '', '', 'REMITE PARTE POLICIAL', '12', 'PARTE POLICIAL', 1, 4, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 21:29:21', '127'),
(662, 31, 11939, '2017-08-08 16:31:15', 2, 'OFC-2017-3158', 'DORIS ROBALINO - POLICIA LA DELICIA', '', '', 'REMITE PARTE POLICILA', '12', 'PARTE POLICIAL', 1, 6, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-08 21:30:46', '127'),
(663, 31, 11940, '2017-08-09 08:17:35', 1, 'DENUNCIA', 'PAMELA ORDOÑEZ HERRERA ', '1718470618', 'pame_alexa@hotmail.com', 'SOLICITA INSPECCION A EDIFICIO ARPENTA', '3', 'COPIAS DE CEDULA', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 13:21:17', '126'),
(664, 7, 11941, '2017-08-09 08:30:56', 2, 'MEMO AMC-UDCMCL-ZQ-2017-539', 'AB.JUAN GUALLPA-ZONA QUITUMBE', NULL, NULL, 'INSPECCION CONJUNTA MARTES 15-AGOSTO-2017', '3', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 13:31:20', '126'),
(665, 7, 11942, '2017-08-09 08:34:08', 1, 'S/N', 'KLEBER SORIA', NULL, NULL, 'CONSTRUCCIONES ILEGALES', '3', '-', 1, 7, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 13:38:12', '126'),
(666, 31, 11943, '2017-08-09 08:39:08', 1, 'DENUNCIA', 'JUAN MANUEL SIMBAÑA TOPON', '170349129-8', 'bederan28@hotmail.com', 'CONSTRUCCION SIN RESPETAR RETIROS', '3', 'COPIA DE CEDULA FOTOS Y OTRO DOCUMENTOS', 1, 14, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 13:39:03', '126'),
(667, 7, 11944, '2017-08-09 08:40:19', 1, 'S/N', 'KLEBER SORIA', NULL, NULL, 'CONSTRUCCIONES ILEGALES', '3', '-', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 13:40:14', '126'),
(668, 7, 11945, '2017-08-09 08:43:39', 2, 'MEMO AMC-UDCMCL-ZQ-2017-528', 'DRA.SOFIA NAJERA-ZONA QUITUMBE', NULL, NULL, 'ESCRITO PARA AGREGAR DENUNCIA 4350', '3', '-', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 13:43:31', '126'),
(669, 7, 11946, '2017-08-09 08:50:12', 2, 'MEMO AMC-CMASA-ZQ-2017-173', 'AB.OSCAR CUSQUILLO', NULL, NULL, 'INFORME OPERATIVO', '10', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 13:50:36', '144'),
(670, 7, 11947, '2017-08-09 08:52:48', 2, 'MEMO AMC-CMASA', 'AB.OSCAR CUSQUILLO-ZONA QUITUMBE', NULL, NULL, 'INFORME OPERATIVO', '14', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 13:52:17', '138'),
(671, 31, 11948, '2017-08-09 09:02:01', 2, 'S/N', 'PABLO SILVA T ', NULL, NULL, 'REFERENTE AL EXPEDIENTE 257-2017 LICENCIAMIENTO ZONA NORTE', '1', 'COPIA DE CEDULA', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 14:01:59', '131'),
(672, 31, 11949, '2017-08-09 09:26:50', 2, 'S/N', 'JEANNETTE ANDONCILLA', NULL, NULL, 'REFERENTE AL EXPEDIENTE 523-2017 LICENCIAMIENTO ZONA NORTE', '1', 'COPIA LUAE, CEDULA Y OTROS', 1, 8, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 14:26:26', '131'),
(673, 31, 11950, '2017-08-09 09:51:55', 2, 'S/N', 'BETTY FABIOLA QUINANCELA', NULL, NULL, 'REFERENTE AL EXPEDIENTE 2017-215 DE LADERAS DEL PICHINCHA', '16', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 14:51:49', '135'),
(674, 31, 11951, '2017-08-09 09:55:15', 2, 'OFC-2017-2520', 'ANGELICA ARIAS - PATRIMONIO', NULL, NULL, 'INSPECCION AL MURAL MILAGROSO ALTAR BLASFEMO', '12', 'GDOC-2017-115221', 1, 13, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 14:56:32', '127'),
(675, 31, 11952, '2017-08-09 10:03:50', 2, 'AMC-UDCMCL-ZMS-2017-335', 'PEDRO CACERES - ZONA CENTRO', NULL, NULL, 'SOLICITUD DE INSPECCION 22 AGOSTO DE 2017', '3', 'VARIA DOCUMENTACION ', 1, 23, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 15:04:10', '139'),
(676, 31, 11953, '2017-08-09 10:06:08', 2, 'AMC-UDCMCL-ZMS-2017-335', 'PEDRO CACERES - ZONA CENTRO', NULL, NULL, 'SOLICITUD DE INSPECCION ', '4', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 15:06:25', '142'),
(677, 31, 11954, '2017-08-09 10:12:04', 2, 'OFC-SAN-2017-0671', 'DIEGO TORRES - ASAMBLEA NACIONAL', NULL, NULL, 'REFERENTE AL OFICIO AMC-SM-JA-2017', '12', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 15:12:02', '134'),
(678, 31, 11955, '2017-08-09 10:18:47', 2, 'S/N', 'MARIA JOSEFINA UNDA ', NULL, NULL, 'REFERENTE AL EXPEDIENTE 322-2017 LICENCIAMIENTO ZONA NORTE', '1', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 15:18:36', '131'),
(679, 31, 11956, '2017-08-09 10:21:08', 2, 'S/N', 'GLORIA MUÑIZ MERO', '', '', 'REFERENTE A NIGHT CLUB OFFICE', '12', '-DOCUMENTOS VARIOS', 1, 20, 'ENTREGADO SIN GUIA (URGENTE)', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 15:20:51', '134'),
(680, 31, 11957, '2017-08-09 10:23:44', 2, 'S/N', 'EDMUNDO ORTIZ CORONADO', '', '', 'REFERENTE A NIGHT CLUB LAS CALEÑITAS', '12', 'DOCUMENTOS VARIOS', 1, 20, 'ENTREGADO SIN GUIA (URGENTE)', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 15:23:20', '134'),
(681, 31, 11958, '2017-08-09 10:26:22', 1, 'DENUNCIA', 'DORIS LIDIA MEDRANDA ANGULO', '0800623324', 'doris_medranda2@hotmail.com', 'CONSTRUCCION SIN PERMISOS', '3', 'FOTOS Y COPIA DE CEDULA', 1, 6, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 15:26:03', '139'),
(682, 5, 11959, '2017-08-09 10:30:23', 2, 'MEMO AMC-UDCMCL-ZMS-2017-331', 'AB. DIEGO TITUAÑA', NULL, NULL, 'BUSQUEDA EXPEDIENTE ADMINISTRATIVO', '5', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 15:32:05', '141'),
(683, 31, 11960, '2017-08-09 10:30:21', 2, 'S/N', 'CECILIA ZURITA ', NULL, NULL, 'REFERERNTE AL EXPEDIENTE 100-2015', '3', '-', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 15:32:31', '139'),
(684, 5, 11961, '2017-08-09 10:34:29', 2, 'S/N', 'ECO. OLGA NUÑEZ-DIRECTOR METROPOLITANA FINANCIERA', NULL, NULL, 'BAJA DE OBLIGACION TARIA', '5', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 15:36:18', '141'),
(685, 5, 11962, '2017-08-09 10:39:16', 2, 'MEMO AMC-UDCMCL-ZMS-2017-271', 'AB. DIEGO TITUAÑA', NULL, NULL, 'BUSQUEDA EXPEDIENTE ADMINISTRATIVO 411-2006', '5', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 15:39:34', '141'),
(686, 5, 11963, '2017-08-09 10:41:57', 2, 'MEMO AMC-UDCML-ZMS-2017-332', 'AB. PEDRO CACERES', NULL, NULL, 'INFORME OPERATIVO ESPECIAL DE CONTROL DE PROTIBULOS', '14', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 15:42:24', '138'),
(687, 31, 11964, '2017-08-09 10:43:46', 2, 'S/N', 'JUAN JOSE CRESPO CORREA', NULL, NULL, 'SOLICITUD DE INFORME FINAL PROYECTO SOL DEL SUR', '3', '-', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 15:43:31', '139'),
(688, 5, 11965, '2017-08-09 10:44:20', 2, 'MEMO AMC-UDCMCL-ZMS-2017-332', 'AB. PEDRO CACERES', NULL, NULL, 'INFORME ESPECIAL DE CONTROL DE PROSTIBULOS', '4', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 15:44:09', '142'),
(689, 5, 11966, '2017-08-09 10:45:50', 1, 'MEMO AMC UDCMCL-ZMS-2017-334', 'AB. PEDRO CACERES', '1720282165', 'rodrigguamba@gmail.com', 'DENUNCIA', '3', 'RODRIGO GUAMBA', 1, 6, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 15:45:24', '139'),
(690, 5, 11967, '2017-08-09 10:47:19', 2, 'MEMO AMC-UDCMCL-ZMS-2017-336', 'AB. PEDRO CACERES', NULL, NULL, 'REPORTE MENSUAL 2017', '4', '-', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 15:46:32', '142'),
(691, 31, 11968, '2017-08-09 10:47:00', 2, 'AMC-UDCMCL-ZLD-2017-349', 'LUIS CHULCA - LA DELICIA', NULL, NULL, 'INSISTENCIA DE INFORME TECNICO', '3', '-', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 15:47:01', '139'),
(692, 5, 11969, '2017-08-09 10:48:22', 2, 'S/N', 'S', '', '', 'GF', '15', '-', 1, 0, '', 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 15:47:33', '139'),
(693, 31, 11970, '2017-08-09 10:49:22', 2, 'AMC-UDCMCL-LD-2017-353', 'LUIS TUFIÑO - LA DELICIA', NULL, NULL, 'INFORME DE OPERATIVO', '3', '-', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 15:49:02', '139'),
(694, 5, 11971, '2017-08-09 10:49:55', 2, 'MEMO AMC-UDCMBI-2017-232', 'AB. CARINA CHAVEZ', NULL, NULL, 'REMITO CERTIFICADO AVALADO POR EL IESS', '7', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 15:49:10', '137'),
(695, 5, 11972, '2017-08-09 10:51:21', 2, 'MEMO AMC-UDCMBI-2017-232', 'AB. CARINA CHAVEZ', '', '', 'REMITO CERTIFICADO AVALADO POR EL IESS', '4', '-', 1, 2, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 15:50:29', '142'),
(696, 5, 11973, '2017-08-09 10:52:19', 2, 'MEMO AMC-UBI-2017-233', 'DR. MILTON BORJA', NULL, NULL, 'SOLICITUD DE INFORME', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 15:51:27', '139'),
(697, 31, 11974, '2017-08-09 10:51:49', 2, 'AMC-UDCMCCL-LD-2017-354', 'LUIS CHULCA - LA DELICIA', NULL, NULL, 'ANALISIS DE DOCUMENTACION', '3', '-', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 15:51:37', '139'),
(698, 5, 11975, '2017-08-09 10:53:08', 2, 'MEMO AMC-UBI-2017-232', 'DR. MILTON BORJA', NULL, NULL, 'INSPECCION CONJUNTA', '3', '-', 1, 8, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 15:52:16', '139'),
(699, 31, 11976, '2017-08-09 10:53:45', 2, 'AMC-UDCMCL-2017-356', 'LUIS TUFIÑO - LA DELICIA', '', '', 'EXPEDIENTES FIN DE INSTRUCCION', '5', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 15:53:42', '141'),
(700, 31, 11977, '2017-08-09 10:56:03', 1, 'DENUNCIA', 'CLAUDIA BERMEO VILLACREZ', NULL, NULL, 'MORDEDURA DE MASCOTA AGRESIVA', '3', '-', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 15:55:46', '139'),
(701, 31, 11978, '2017-08-09 11:00:35', 1, 'DENUNCIA', 'MERCEDES GRANIZO GRIJALBA', '170711650-3', 'colocnoroccidental@yahoo.com', 'CONSTRUCCION SIN PERMISOS', '3', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 16:00:10', '139'),
(702, 31, 11979, '2017-08-09 11:04:04', 2, 'S/N', 'JULIO CESAR RODRIGUEZ ESCOBAR', NULL, NULL, 'REFERENTE AL EXPEDIENTE 478-2017', '1', '-COPIA DE LUAE', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 16:03:45', '143'),
(703, 5, 11980, '2017-08-09 11:07:45', 2, 'OFC 284-2017-CPP', 'CARLOS PAEZ-CONCEJAL', NULL, NULL, 'MESA DE TRABAJO', '12', 'GDOC 2017-115364', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 16:07:24', '134'),
(704, 31, 11981, '2017-08-09 11:10:23', 2, 'S/N', 'DEANE ROSERO PORRAS', NULL, NULL, 'REFERENTE AL EXPEDIENTE 361-2017 NORMAS TECNICAS DE BOMBEROS', '1', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 16:10:35', '143'),
(705, 31, 11982, '2017-08-09 11:12:21', 2, 'S/N', 'ROSA MARIA SIGCHA', NULL, NULL, 'REFERENTE AL EXPEDIENTE 274-2017', '1', 'COPIAS DE LUAE', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 16:11:55', '143'),
(706, 31, 11983, '2017-08-09 11:14:47', 2, 'S/N', 'NORMA CHECA', NULL, NULL, 'SOLICITA COPIA DE RESOLUCION 178 EXPEDIENTE 012-2011', '5', 'COPIA DE OBLIGACIONES POR CANCELAR Y CEDULA', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 16:14:29', '141'),
(707, 5, 11984, '2017-08-09 11:16:02', 2, 'S/N', 'DR. RENE JARRIN-SECRETARIO PROCURADORIA', NULL, NULL, 'PRO-S-EXPEDIENTE 1917-2017', '12', 'GDOC 2017-112676', 1, 11, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 16:16:32', '134'),
(708, 5, 11985, '2017-08-09 11:19:22', 2, 'EXP. PROCURADORIA 2017-01383', 'AB. FREDDY BALSECA', NULL, NULL, 'REFERENTE A OFC 2017-138', '5', 'GDOC 2017-084237', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 16:19:28', '141'),
(709, 5, 11986, '2017-08-09 11:22:01', 2, 'EXP. PROCURADORIA 2017-01909', 'DRA. VERONICA CACERES', NULL, NULL, 'RECURSO DE APELACION', '5', 'GDOC 2017-114354', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 16:21:46', '141'),
(710, 5, 11987, '2017-08-09 11:24:15', 2, 'EXP. PROCURADORIA 2017-1375', 'DRA. VERONICA CACERES', NULL, NULL, 'RECURSO DE REVISION', '5', 'GDOC 2017-114355', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 16:24:02', '141'),
(711, 31, 11988, '2017-08-09 11:16:19', 2, 'DMGG-SGSG-2017-084', 'JUAN CARLOS FONSECA - SECRETARIA DE SEGURIDAD', NULL, NULL, 'CONTROL SOBRE LOTES BALDIOS EN ZONA TUMBACO', '12', 'GDOC-2017-115011', 1, 9, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 16:25:06', '134'),
(712, 5, 11989, '2017-08-09 11:26:15', 2, 'EXP. PROCURADORIA 017-1619', 'DRA. VERONICA CACERES', NULL, NULL, 'RECURSO DE REVISION', '5', 'GDOC 2017-098326', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 16:26:12', '141'),
(713, 5, 11990, '2017-08-09 11:28:58', 2, 'EXP. PROCURADORIA 2017-1685', 'DRA. VERONICA CACERES', NULL, NULL, 'PROVIDENCIA 0619', '5', 'GDOC 2017-113675', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 16:28:52', '141'),
(714, 5, 11991, '2017-08-09 11:31:22', 2, 'EXP. PROCURADORIA 2017-1433', 'DRA VERONICA CACERES', NULL, NULL, 'PROVIDENCIA 0624', '5', 'GDOC 017-115624', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 16:31:00', '141'),
(715, 31, 11992, '2017-08-09 11:33:54', 2, 'S/N', 'PAUL PARDO', NULL, NULL, 'REFERENTE AL OFICIO AMC-DMI-AG-2017-493', '3', 'COPIA DE VARIOS DOCUMENTOS', 1, 9, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 16:33:22', '139'),
(716, 31, 11993, '2017-08-09 11:42:49', 2, 'S/N', 'ALAIN JIMENEZ', NULL, NULL, 'REFERENTE AL EXPEDIENTE 1029-2016-UDCMCL-ZEE', '5', 'COPIA DE VARIOS DOCUMENTOS', 1, 8, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 16:42:38', '141'),
(717, 5, 11994, '2017-08-09 11:37:42', 2, 'S/N', 'SEGUNDO TORRES', NULL, NULL, 'SOLICITA SE REALICA INSPECCION', '12', '-', 1, 26, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 16:43:23', '134'),
(718, 31, 11995, '2017-08-09 11:46:50', 2, 'S/N', 'VILMA PUMISACHO', NULL, NULL, 'REFERENTE AL ACTA DE VERIFICACION 83-61', '14', 'COPIA DE ACTA 83-61', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 16:46:37', '138'),
(719, 31, 11996, '2017-08-09 11:50:10', 2, 'SGC-2017-2189', 'DIEGO CEVALLOS SALGADO - CONCEJO METROPOLITANO', '', '', 'SOLICITUD DE RECOPILAR INFORMACION', '12', 'GDOC-2017-053314', 1, 2, 'ENTREGADO SIN GUIA (URGENTE)', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 16:50:14', '134'),
(720, 5, 11997, '2017-08-09 11:54:16', 2, 'S/N', 'CARMEN LOPEZ', NULL, NULL, 'CONOCIMIENTO DE PAGO DE MULTA', '5', '-', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 16:54:10', '141'),
(721, 5, 11998, '2017-08-09 12:00:47', 2, 'OFC AZEA-UECD-2017-3912', 'EDWIN BOSMEDIANO-ADMINISTRADOR ZONAL  ELOY ALFARO', NULL, NULL, 'CONTROL DE EXPENDIO DE BEBIDAS ALCOHOLICAS', '12', 'GDOC 2017-113644', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 17:01:43', '134'),
(722, 31, 11999, '2017-08-09 12:04:32', 2, 'S/N', 'ROBERTO BENITES BALDASSARI', NULL, NULL, 'REFERENTE AL EXPEDIENTE 291-214', '5', '-COPIAS VARIAS', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 17:04:06', '141'),
(723, 5, 12000, '2017-08-09 12:04:19', 2, 'OFC SGCTYPC-DMPC-2017', 'ING. ESTEBAN LOAYZA', NULL, NULL, 'SOLICITUD DE CONTROL DE NO EXPENDIO DE PRODUCTOS', '12', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 17:04:18', '134'),
(724, 31, 12001, '2017-08-09 12:06:39', 2, 'AMC-UDCMCL-ZC-2017-254', 'VERONICA ALVAREZ - CALDERON', NULL, NULL, 'INSPECCION CONJUNTA ', '3', 'COPIA EXP-167-2017', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 17:06:24', '139'),
(725, 5, 12002, '2017-08-09 12:06:50', 2, 'OFC AZEA-UCD-2017-3989', 'EDWIN BOSMEDIANO-ADMINISTRADOR ZONAL ELOY ALFARO', NULL, NULL, 'REUNION DE TRABAJO PARA EL EVENTO SOLANDA CANTA A SOLANDA', '12', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 17:07:01', '134'),
(726, 31, 12003, '2017-08-09 12:09:34', 2, 'AMC-CMASA-2017-205', 'VERONICA ALVAREZ - CALDERON', NULL, NULL, 'DENUNCIA URGENTE', '3', 'FORMULARIO Y OTROS', 1, 11, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 17:09:18', '139'),
(727, 5, 12004, '2017-08-09 12:16:20', 2, 'S/N', 'EDUARDO FELIX', NULL, NULL, 'REFERENTE EXP. 253-2017-', '1', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 17:16:05', '143'),
(728, 5, 12005, '2017-08-09 12:27:03', 2, 'S/N', 'LAURA BOADA', NULL, NULL, 'AFECTACION A PREDIO', '3', '-', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 17:28:11', '139'),
(729, 31, 12006, '2017-08-09 12:33:00', 2, 'JSC-DGP-AMZCH-2017-1123', 'SANTIAGO CACERES - ADM ZONA LOS CHILLOS', '', '', 'COORDINACION DE EVENTOS FIESTA PARROQUIA PINTAG', '12', 'GDOC-2017-115408', 1, 1, 'ENVIADO SIN GUIA DE DESPACHO (URGENTE)', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 17:33:45', '134');
INSERT INTO `amc_denuncias` (`id`, `id_persona`, `codigo_tramite`, `recepcion_documento`, `id_tipo_documento`, `num_documento`, `remitente`, `cedula`, `email`, `asunto`, `reasignacion`, `descripcion_anexos`, `id_caracter_tramite`, `cantidad_fojas`, `observacion_secretaria`, `envio_inspeccion`, `estado_recepcion_informacion`, `codigo_inspeccion`, `codigo_procedimiento`, `id_zona`, `predio`, `observacion`, `actividad`, `procedimientos`, `persona_asignada`, `fecha_creacion`, `guia`) VALUES
(730, 5, 12007, '2017-08-09 12:35:31', 2, 'S/N', 'LUIS LUGUAÑA', NULL, NULL, 'EXP. 2017-371', '1', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 17:35:39', '143'),
(731, 5, 12008, '2017-08-09 12:39:23', 2, 'S/N', 'CARLOS OJEDA', NULL, NULL, 'FACILIDADES DE PAGO', '16', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 17:39:00', '135'),
(732, 5, 12009, '2017-08-09 12:41:07', 2, 'S/N', 'CARLOS OJEDA', NULL, NULL, 'LOCal ya no funciona', '16', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 17:40:31', '135'),
(733, 31, 12010, '2017-08-09 12:46:25', 2, 'S/N', 'VICTOR APOLO GAHONA', NULL, NULL, 'REFERENTE AL EXPEDIENTE 227-2017', '1', 'COPIA ACTAS DE BOMBEROS', 1, 8, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 17:46:11', '143'),
(734, 5, 12011, '2017-08-09 13:05:15', 2, 'S/N', 'MARTHA YEPEZ', NULL, NULL, 'SOLICITE SE ARCHIVE ', '16', '-', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 18:05:07', '135'),
(735, 5, 12012, '2017-08-09 13:08:35', 2, 'OFC SA-DPN-UAP-2017-293', 'RUTH RUIZ-SECRETARIA AMBIENTE', NULL, NULL, 'INTERVENCIO DE LA AGENCIA METROPOLITANA DE CONTROL Y LA AGENCIA DE REGULACION Y CONTROL', '12', 'GDOC 2017-071595', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 18:13:18', '134'),
(736, 5, 12013, '2017-08-09 13:16:49', 2, 'OFC SA-DPN-UAP-2017-2892', 'RUTH RUIZ-SECRETARIA DE AMBIENTE', NULL, NULL, 'RESPUESTA A SOLICITUD REALIZADA POR MEDIO DE OFC AMC-DRYE-RDG-2017-243', '5', 'GDOC 2017-101753', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 18:17:12', '141'),
(737, 5, 12014, '2017-08-09 13:19:41', 2, 'OFC SA-POL-PLA-2017-2952', 'RUTH RUIZ-SECRETARIA DE AMBIENTE', NULL, NULL, 'CONSULTA SOBRE SOLICITUD DE CONTROL A MECANICAS DENTRO DEL RADIO DE 500 METROS ', '12', 'GDOC 2017-033495', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 18:19:52', '134'),
(738, 5, 12015, '2017-08-09 13:22:43', 2, 'OFC SA-DPN-URCV-2017-2803', 'RUTH RUIZ-SECRETARIA DE AMBIENTE', NULL, NULL, 'CONFORMIDAD DE TALA DE ARBOLES DE RIESGO DE VUELCO Y PROCESO ADMINISTRATIVO', '12', 'GDOC 2017-115083', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 18:22:43', '134'),
(739, 5, 12016, '2017-08-09 13:25:17', 2, 'OFC SA-DPN-UAP-2017-2896', 'RUTH RUIZ-SECRETARIA DE AMBIENTE', NULL, NULL, 'INTERVENCION DE LA AGENCIA METROPOLITANA DE CONTROL EN PREDIO 5150887', '12', '-GDOC 2017-112927', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 18:25:21', '134'),
(740, 5, 12017, '2017-08-09 13:27:47', 2, 'FC SA-GCA-FC-2017', 'SANTIAGO ANDRADE-DIRECTOR DE GESTIAN DE LA CALIDAD AMBIENTAL', NULL, NULL, 'ATENCION A REQUERIMIENTO: COMPAÑIA DE TRANSPORTE URBANO DEL SUR', '4', 'GDOC 2017-102756', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 18:27:54', '142'),
(741, 31, 12018, '2017-08-09 12:55:50', 2, 'S/N', 'RAMIRO BONILLA', NULL, NULL, 'SOLICITA COPIA DE EXPEDIENTE 102-2017 DE FAUNA URBANA', '5', 'COPIA DE CEDULA', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 18:36:25', '141'),
(742, 31, 12019, '2017-08-09 13:41:41', 2, 'S/N', 'FERNANDO NINAHUALPA GUERRA', NULL, NULL, 'REFERENTE AL EXPEDIENTE 331-2017', '1', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 18:41:27', '143'),
(743, 31, 12020, '2017-08-09 13:49:10', 1, 'DENUNCIA', 'VICTOR MANUEL SOLA', '171269965-9', 'victorsb50@hotmail.com', 'PUBLICIDAD EXTERIOR SIN PERMISOS', '3', 'FOTOS Y COPIA DE CEDULA', 1, 4, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 18:49:04', '139'),
(744, 31, 12021, '2017-08-09 14:12:21', 1, 'DENUNCIA', 'MALDONADO PAREDES MONSERRAT', '170600072-4', 'kolomar@hotmail.com', 'CRIADERO DE CHANCHOS SIN PERMISO', '3', 'COPIA DE CEDULA', 1, 3, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 19:12:18', '139'),
(745, 31, 12022, '2017-08-09 14:14:55', 1, 'DENUNCIA', 'VOLTAIRE MALDONADO MONTENEGRO', '170121867-7', 'vassilymaldonado@hotmail.com', 'CRIADERO DE CHANCHOS SIN PERMISOS', '3', 'FOTOS Y COPIA DE CEDULA', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 19:15:45', '139'),
(746, 5, 12023, '2017-08-09 14:18:25', 2, 'S/N', 'ELSY CAMPUZANO', NULL, NULL, 'SOLICITA LAS NOTIFICACIONES ', '13', '-', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 19:18:27', '133'),
(747, 31, 12024, '2017-08-09 14:33:22', 2, 'amc-udcmcl-zay-2017-274', 'DARIO QUILLUPANGUI - AEROPUERTO', NULL, NULL, 'USO DE SUELO', '2', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 19:33:37', '140'),
(748, 31, 12025, '2017-08-09 14:35:22', 2, 'AMC-UDC-UDCMCL-ZT', 'LUIS BENAVIDES - TUMBACO', NULL, NULL, 'DEVOLUCION DE MEMO 2017-2845', '3', 'MEMO 2845-2017', 1, 7, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 19:35:42', '139'),
(749, 31, 12026, '2017-08-09 14:38:15', 2, '2017-046-STS2', 'BYRON PUETATE - POLICIA TUMBACO SUR', '', '', 'INVITACION A EVENTO', '12', '-', 1, 1, 'DOCUMENTO URGENTE SE ENTREGO SIN GUIA DE DESPACHO', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 19:38:10', '134'),
(750, 31, 12027, '2017-08-09 14:54:46', 2, '823-CMLCC-UTCP-2017', 'GASTON VELASQUEZ - QUITO HONESTO', NULL, NULL, 'REFERENTE A PROCESO EN PORTAL INSTITUCIONAL', '12', 'GDOC-2017-115971', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 19:55:52', '134'),
(751, 31, 12028, '2017-08-09 14:58:35', 2, 'AMC-UDCMCL-ZAY-2017-273', 'DARIO QUILLUPANGUI - AEROPUERTO', NULL, NULL, 'OPERATIVO SABADO 05-08-2017', '14', 'INFORME DE OPERATIVO', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 19:58:55', '138'),
(752, 31, 12029, '2017-08-09 15:00:34', 2, 'AMC-CMASA-AZT-2017-221', 'SARA GARCIA - ASEO TUMBACO', NULL, NULL, 'INFORME DE OPERTIVO', '14', 'INFORME DE OPERATIVO', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 20:00:31', '138'),
(753, 5, 12030, '2017-08-09 15:11:02', 2, 'S/N', 'DIEGO PROAÑO', NULL, NULL, 'CONOCIMIENTO DE LUAE', '4', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 20:10:29', '142'),
(754, 31, 12031, '2017-08-09 15:11:30', 2, '001-CASO-DPE-1701-170102-7-2017-006305-AVV', 'BISMARK MOREANO ZAMBRANO - DEFENSORIA DEL PUEBLO', NULL, NULL, 'REFERENTE A EXPEDIENTE 2017-069 - LADERAS DEL PICHINCHA', '16', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 20:12:14', '135'),
(755, 31, 12032, '2017-08-09 15:19:34', 2, 'AMC-PL-2017-197', 'MARIO CEVALLOS - PLANIFICACION ', NULL, NULL, 'CONVOCATORIA A EXPOSICION', '2', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 20:19:39', '140'),
(756, 31, 12033, '2017-08-09 15:36:12', 2, 'S/N', 'JAIME SANGUCHO CHICAIZA', NULL, NULL, 'REFERENTE A RESOLUCION 2017-722', '5', 'COPIA DE PAGO', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 20:36:28', '141'),
(757, 31, 12034, '2017-08-09 15:41:25', 2, 'S/N', 'MILES VELEZ MARIA LICENIA', NULL, NULL, 'REFERENTE A RESOLUCION 2017-804', '5', 'DOCUMENTOS VARIOS', 1, 9, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 20:53:22', '141'),
(758, 31, 12035, '2017-08-09 15:55:45', 2, 'S/N', 'IGNACIO CEVALLOS BARBA', NULL, NULL, 'REFERENTE A DENUNCIA CON TRAMITE 11182', '3', 'COPIA DE DENUNCIA', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 20:55:41', '139'),
(759, 31, 12036, '2017-08-09 16:01:45', 2, 'S/N', 'GLORIA MARLENE BAHAMONTES', NULL, NULL, 'SOLICITA COPIA DE EXPEDIENTE 193-2014', '2', 'COPIA DE CEDULA', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 21:02:09', '140'),
(760, 31, 12037, '2017-08-09 16:04:30', 2, 'S/N', 'GLORIS MARLENE BAHAMONTE', NULL, NULL, 'SOLICITA COPIA DE EXPEDIENTE 295-2013', '2', 'COPIA DE CEDULA', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 21:04:16', '140'),
(761, 31, 12038, '2017-08-09 16:17:59', 2, 'S/N', 'EDWIN NARANJO', NULL, NULL, 'REFERENTE A RESOLUCION AMC-DRYE-PJNH-2017-0314', '5', 'COPIA DE CEDULA', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 21:17:53', '141'),
(762, 31, 12039, '2017-08-09 16:24:05', 2, 'S/N', 'SEGUNDO ANGEL GUANANA', NULL, NULL, 'REFERENTE A PROVIDENCIA 2017-256', '5', 'VARIA DOCUMENTACION', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 21:24:06', '141'),
(763, 31, 12040, '2017-08-09 16:26:12', 2, 'AMC-CMASA-ZLM-2017-119', 'JOSE PILLAGUANGO - LA MARISCAL', NULL, NULL, 'INFORME HOMOLOGADO', '3', 'VARIA DOCUMENTACION', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 21:27:10', '146'),
(764, 31, 12041, '2017-08-09 16:28:55', 2, 'AMC-CMASA-ZLM-2017-118', 'JOSE PILLAGUANGO - LA MARISCAL', NULL, NULL, 'INFORME HOMOLOGADO', '3', 'VARIA DOCUMENTACION', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 21:28:57', '146'),
(765, 31, 12042, '2017-08-09 16:30:38', 2, 'AMC-2017-115', 'JOSE PILLAGUANGO - LA MARISCAL', NULL, NULL, 'INFORME DE EXPEDIENTE ', '4', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 21:30:30', '142'),
(766, 31, 12043, '2017-08-09 16:32:33', 2, 'S/N', 'MAURICIO REYES TOSCANO ', NULL, NULL, 'REFERENTE AL EXPEDIENTE 473-2017', '1', '-1 CARPETA CON VARIA DOCUMENTACION', 1, 50, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-09 21:33:07', '143'),
(767, 31, 12044, '2017-08-10 08:49:52', 2, 'S/N', 'CARLOS ANALUISA RUIZ', NULL, NULL, 'REFERENTE AL EXPEDIENTE 312-2017', '1', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 13:49:29', '148'),
(768, 31, 12045, '2017-08-10 09:43:13', 2, 'S/N', 'MARIA DOLORES CONDOR SIMBAÑA', NULL, NULL, 'REFERENTE AL EXPEDIENTE 2017-135 - COMISARIA DE ASEO NORTE ', '13', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 14:43:35', '152'),
(769, 31, 12046, '2017-08-10 09:53:24', 2, 'OFC-1383-SGCTYPC-SG-2017', 'ESTEBAN LOAIZA - SECRETARIA DE COORDINACION TERRITORIAL', NULL, NULL, 'CONVOCATORIA A REUNION 14-08-2017', '12', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 14:53:48', '145'),
(770, 31, 12047, '2017-08-10 09:59:26', 1, 'S/N', 'LUCIA SEGOVIA', NULL, NULL, 'CONSTRUCCION SIN PERMISOS', '3', 'COPIA DE CEDULA FOTOS', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 14:59:24', '146'),
(771, 31, 12048, '2017-08-10 10:04:07', 2, 'S/N', 'SILVIA CARMEN SHUGULI', NULL, NULL, 'SOLICITA COPIA DE RESOLUCION 166-2013', '2', 'COPIA CEDULA Y EXPEDIENTE ', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 15:04:12', '151'),
(772, 31, 12049, '2017-08-10 10:12:29', 2, 'S/N', 'ROSA ELENA LEMA', NULL, NULL, 'REFERENTE AL EXPEDIENTE 500-2017', '1', 'COPIA LUAE', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 15:12:29', '148'),
(773, 5, 12050, '2017-08-10 10:16:18', 1, 'MEMO AMC-CMASA-ZLCH-2017-194', 'KAREN ACOSTA-ZONA LOS CHILLOS', '1723037139', 'ednsu88@gmail.com', 'MALTRATO ANIMAL', '3', 'EDNA NARVAEZ', 1, 7, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 15:17:33', '146'),
(774, 5, 12051, '2017-08-10 10:36:06', 2, 'S/N', 'EDGAR ANDRANGO', NULL, NULL, 'PIDE PRORROGA', '5', '-', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 15:35:55', '150'),
(775, 7, 12052, '2017-08-10 10:42:08', 2, 'MEMO AMC-UDCMCL-ZLCH-2017-459', 'AB. EDWIN TORRES-ZONA LOS CHILLOS', NULL, NULL, 'PEDIDO DE INSPECCION', '3', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 15:42:34', '146'),
(776, 31, 12053, '2017-08-10 10:44:48', 2, 'S/N', 'MARTHA ALVARO LOACHAMIN', NULL, NULL, 'REFERENTE AL EXPEDIENTE 451-2017-UDCMCL-ZEE', '1', 'COPIAS: RUC Y CEDULA', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 15:45:00', '148'),
(777, 4, 12054, '2017-08-07 11:14:00', 1, 'Denuncia web - 94', 'ROD C VILLACRES ', '1705082608', 'dismatmv@hotmail.com', '*RUIDO EXCESIVO DE GENERADOR DE ENERGÍA DEL SUPERMERCADO SANTAMARIA<br />\n*GENERADOR DE ENERGÍA MAL ORIENTADO HACIA SECTOR RESIDENCIAL PROVOCA MOLESTIAS DURANTE TODA LA NOCHE Y MADRUGADA, EL RUIDO ES ENSORDECEDOR Y LA CONTAMINACIÓN POR LA QUEMA DE COMBUSTIBLE.<br />\n<br />\n- EL DIA DE AYER DOMINGO 6 DE AGOSTO DE 2017 A LAS 10PM SE SUSPENDIÓ EL SERVICIO DE ENERGÍA ELÉCTRICA EN EL SECTOR <br />\n, COMO ES HABITUAL SE ENCIENDE EL GENERADOR DEL SUPERMERCADO PROVOCANDO CONTINUAS MOLESTIAS A LAS FAMILIAS QUE VIVIMOS POR LO MENOS MAS CERCA DE AHÍ, LA NOCHE DE AYER FUE INSOPORTABLE YA QUE EL APAGÓN DURÓ MÁS DE DOS HORAS Y CUANDO REGRESÓ EL SUMINISTRO ELÉCTRICO EL GENERADOR DE ESTE SUPERMERCADO NUNCA SE APAGÓ, SON LAS 8AM Y CONTINUA ENCENDIDO, EN EL SECTOR HABITAN FAMILIAS CON PERSONAS MAYORES DE EDAD Y NIÑOS, EN MI CASO TODOS ESTAMOS DESVELADOS POR SEMEJANTE RUIDO.<br />\nRUEGO POR FAVOR SE TOME LAS MEDIDAS NECESARIAS DEL CASO PARA EVITAR QUE ESTO SIGA SUCEDIENDO, TOMANDO EN CUENTA QUE NO ES LA PRIMERA VEZ QUE NOS QUEJAMOS, EN REPETIDAS OCASIONES SE HA HABLADO CON LOS ADMINISTRADORES DEL SUPERMERCADO PERO NADA HACEN PARA SOLUCIONAR EL PROBLEMA; CLARO ESTÁ QUE SUCEDE CADA VEZ QUE NO HAY ENERGÍA ELÉCTRICA, PERO COINCIDE QUE ESTOS APAGONES SUCEDEN MAS FRECUENTEMENTE Y POR LAS NOCHES.<br />\n<br />\nEN ESPERA DE SU PRONTA Y GENTIL RESPUESTA.<br />\n<br />\nSALUDOS.', '3', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/94-ROD C'' target=''_blank''>Link denuncia</a>', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 15:52:50', '146'),
(778, 5, 12055, '2017-08-10 10:52:22', 2, 'OFC 2150', 'ING. ANABEL VINTIMILLA-ZONA MANUELA SAENZ', NULL, NULL, 'REFERENTE AL OFC-1407-AZMS', '12', 'GDOC 2017-116350 Y 1CD', 1, 7, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 15:53:12', '147'),
(779, 31, 12056, '2017-08-10 10:54:25', 2, 'S/N', 'MARTHA MANTILLA CADENA', '', '', 'SOLICITA COPIA DE RESOLUCION 083-2012-MA', '5', 'COPIA DE CARNET ABOGADO', 1, 2, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 15:54:51', '150'),
(780, 5, 12057, '2017-08-10 10:55:17', 2, 'OFC 2154-2017', 'ING. ANABEL VINTIMILLA-ZONA MANUELA SAENZ', NULL, NULL, 'RESPECTO A TRAMITE 2017-109453', '12', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 15:56:34', '147'),
(781, 5, 12058, '2017-08-10 10:59:31', 2, 'AUTORIZACION AZMS-UEPSFL-089-2017', 'ING. ANABEL VINTIMILLA-ZONA MANUELA SAENZ', NULL, NULL, 'REFERETE A TRAMITE 2017-114800', '12', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 16:00:12', '147'),
(782, 5, 12059, '2017-08-10 11:01:35', 2, 'AUT. AZMS-UEPSFL-088-2017', 'ING. ANABEL VINTIMILLA -ZONA MANUELA SAENZ', NULL, NULL, 'REFRENTE A TRAMITE 2017-114221', '12', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 16:01:43', '147'),
(783, 5, 12060, '2017-08-10 11:04:51', 2, 'S/N', 'BYRON ROMAN', NULL, NULL, 'CONOCIMIENTO DE PAGO DE MULTA ', '5', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 16:04:25', '150'),
(784, 5, 12061, '2017-08-10 11:10:23', 2, 'S/N', 'MARIA JEANNETTE COPARA', NULL, NULL, 'CONOCIMIENTO DE PAGO DE MULTA', '5', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 16:11:28', '150'),
(785, 4, 12062, '2017-08-07 11:46:00', 1, 'Denuncia web - 96', 'Hecto Vasquez', '0600223739', 'edificiobelona.n31227@gmail.com', 'El edificio Boheme en construcción no tiene las lonas de protección razón por la cual en el proceso constructivo a afectado nuestra fachada y vidrios con residuos de masilla y de soldadura, no ha limpiado la terraza contigua a pesar de haberle solicitado. Solicitamos que a través de la Agencia Metropolitana de Control la constructora se comprometa a realizar los trabajos de limpieza de vidrios y pintura de la fachada de nuestro edificio.<br />\nAtentamente.<br />\nIng. Hector Vasquez ', '2', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/96-Hecto'' target=''_blank''>Link denuncia</a>', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 16:23:10', '151'),
(786, 31, 12063, '2017-08-10 11:25:04', 2, 'S/N', 'JORGE HERNANDEZ YEPEZ', NULL, NULL, 'REFERENTE AL EXPEDIENTE 2017-086', '13', 'COPIA DE EXPEDIENTE ', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 16:24:43', '152'),
(787, 4, 12064, '2017-08-07 13:29:00', 1, 'Denuncia web - 97', 'MARLO GARZON CEVALLOS', '1707832794', 'gorki63@hotmail.com', 'REALIZO ESTA DENUNCIA POR CUANTO HAY 3 PERROS CUYOS DUEÑOS LOS HAN DEJADO ABANDONADOS EN LA CASA QUE ARRENDABAN Y DONDE HABITABAN. HE NOTADO ESTE ABANDONO POR CASI UN MES. AL PARECER HAY GENTE QUE DE VEZ EN CUANDO LES DA ALGO DE COMER, PERO ES ESPORADICO.  LOS ANIMALES PERMANECEN SOLOS AL FRENTE DE LA CASA EN LA QUE VIVIAN LOS DUEÑOS.  SUPUESTAMENTE, ELLOS VIVEN ACTUALMENTE CERCA, PERO SU SITUACION ECONOMICA ES DIFICIL Y NO TIENEN EMPLEO, CON LO CUAL, TAMPOCO TIENEN PARA LOS 3 ANIMALITOS. ', '3', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/97-MARLO'' target=''_blank''>Link denuncia</a>', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 16:28:44', '146'),
(788, 31, 12065, '2017-08-10 11:30:36', 2, 'S/N', 'GLADYS ORTEGA COLLAGUAZO', NULL, NULL, 'REFERENTE AL EXPEDIENTE 032-2017', '5', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 16:31:01', '150'),
(789, 7, 12066, '2017-08-10 11:32:19', 2, 'OFC. 064-DAF-AZCH', 'ING.AMPARO CORDOVA', NULL, NULL, 'CONTESTACION OFICIO AMC-DRYE-EC-2017-076', '5', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 16:33:06', '150'),
(790, 31, 12067, '2017-08-10 11:34:47', 2, 'OFC-624-GEF-DE', 'MARIA LORENA BELTRAN - EPMMOP', NULL, NULL, 'SOLICITUD DE CONTROL VIA A NAYON', '12', 'GDOC-2017-115312', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 16:34:55', '147'),
(791, 7, 12068, '2017-08-10 11:35:37', 2, 'OFC.0001141', 'MSC.SANTIAGO CACERES', NULL, NULL, 'CENTROS DE TOLERANCIA NIGHT CLUBS', '12', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 16:36:08', '147'),
(792, 4, 12069, '2017-08-07 17:52:00', 1, 'Denuncia web - 98', 'Maril Monteros Tamayo', '1726172701', 'marilynmon2007@hotmail.com', 'Es el caso de una perrita mestiza grande que habita en esa casa, la pobre esta súper desnutrida tanto así que ya se puede observar sus costillas y huesos, las personas que viven ahí no le dan la atención que requiere , no la alimentan, ni le dan agua; en ocasiones que me he acercado a darle un pan, pude escuchar que su respiración es ronca me supongo que está enferma y como no tienen defensas en su cuerpo es peor, hay días que ya no tiene ánimos ni para caminar, pude observar que en esa casa habitan otros dos perros que están en las mismas condiciones súper flaquitos, converse con unos vecinos y me pudieron informar que  habían visto en una ocasión que el dueño les había pegado con una vara.<br />\nPor favor es muy necesaria su ayuda esos pobres animalitos lloran por las noches ya no pueden seguir viviendo en esas condiciones, deben retirarles los perritos a esas personas, no los pueden cuidar con deben, y esa perrita un día puede hasta morir de la desnutrición que tiene les pido vengan a revisar el caso lo más pronto posible. <br />\n<br />\nObservaciones: En la casa pasa casi todo el día una señora, y algunas personas llegan por la tarde después de sus labores.<br />\nAdjunto se encuentran fotos de la perrita grande y también una de la pequeña que también vive ahí.<br />\n', '3', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/98-Maril'' target=''_blank''>Link denuncia</a>', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 16:41:28', '146'),
(793, 31, 12070, '2017-08-10 11:39:49', 1, 'DENUNCIA', 'JORGE VINUEZA MANTILLA', '171090526-4', 'jwvinueza@hotmail.com', 'CONTROL LUAE Y CONTAMINACION AUDIVA', '3', 'COPIA CEDULA + 1 CD', 1, 4, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 16:42:57', '146'),
(794, 4, 12071, '2017-08-08 11:11:00', 1, 'Denuncia web - 100', 'DIANA HERNÁNDEZ OLIVO', '1715052781', 'chabely_h@hotmail.com', 'Se ha generado un parqueadero con la instalación de puertas movibles que invaden el libre paso de peatones en el pasaje además que se usa frecuentemente el pasaje como parqueadero cuando estos pasajes son de uso peatonal . Obstaculizan el libre paso de peatones y torna peligroso el pasaje tanto en la mañana como en l noche porque impide la libre vista de todo el pasaje ', '3', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/100-DIANA'' target=''_blank''>Link denuncia</a>', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 16:48:45', '146'),
(795, 31, 12072, '2017-08-10 11:50:55', 2, 'S/N', 'NANCY SILVA CARVALAL', NULL, NULL, 'REFERENTE AL EXPEDIENTE 2017-125', '13', 'FOTOGRAFIAS', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 16:50:42', '152'),
(796, 31, 12073, '2017-08-10 11:53:02', 2, 'S/N', 'NELLY PEREZ DE ROMO - ICOM', NULL, NULL, 'REFERENTE AL EXPEDIENTE 223-2017', '1', 'FOTOGRAFIAS', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 16:52:53', '148'),
(797, 5, 12074, '2017-08-10 11:53:30', 2, 'S/N', 'MAGALI VALDIVIESO', NULL, NULL, 'CONOCIMIENTO DE PAGO DE MULTA', '16', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 16:53:35', '154'),
(798, 31, 12075, '2017-08-10 11:57:59', 2, 'OFC-2017-0458-CRAC-DNA', 'RICHARD RIERA - ADIESTRAMIENTO CANINO', NULL, NULL, 'REFERENTE A OFICIO 723-AMC-DMI-FU-2017', '3', 'PRUEBAS DE TEMPERAMENTO', 1, 16, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 16:58:34', '146'),
(799, 4, 12076, '2017-08-09 11:40:00', 1, 'Denuncia web - 104', 'Sandr Chiliquinga Bon', '1802541530', 'sandroch3@yahoo.com', 'Saludándoles cordialmente informo el mal comportamiento de la Señora Loenor arrendataria del inmueble de la manzana 21 casa 17 número de predio Oe12-276, la misma que sin motivo alguno abre el portón de la vivienda que arrienda obstaculizando el parqueo y circulación de los vehículos del pasaje 4,este pasaje es muy estrecho,<br />\nAdemás para hacer mayor daño saca desperdicios escombros a la calle mencionada, ocasionando raya duras a mi vehículo.<br />\nLos vecinos y la directiva del sector se acercaron a hablar con la señora, pero no entiende razones.<br />\nLa señora ha amenazado con poner clavos en los neumaticos y seguir rayando mi vehículo, que tiene asignado un lugar de parqueo en un costado de su portón, sin obstaculizar el ingreso a la vivienda.<br />\nAdemás tengo miedo que arremeta contra mi casa, rompa los vidrios o algo así, pues la Sra. es muy impulsiva y violenta.<br />\nComo la señora tiene una hija con discapacidad dice que no le pueden hacer nada, ya que tiene el carnet del CONADIS. <br />\nSolicitándoles comedidamente que por su intermedio se de solución a este inconveniente y que se le indique que no puede obstaculizar las calles por simple capricho.', '3', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/104-Sandr'' target=''_blank''>Link denuncia</a>', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 16:58:58', '146'),
(800, 4, 12077, '2017-08-09 20:05:00', 1, 'Denuncia web - 103', 'DAMIA TORO CALDERON', '1704191889', 'damiantoro@gmail.com', 'Por segunda vez me veo obligado a presentar esta denunci pues hice una anteriormente el día 3 de agosto con el código de trámite número 11675. <br />\nEn el sector de Miravalle 1/San Isidro en el parterre central ubicado en los cruces de la Av Oswaldo Guayasamín y Eugenio Espejo se coloca una venta de comidas en los horarios de 18 a 2:30 horas. Colocan un generador de corriente que causa mucho ruido, además el humo de las comidas que preparan llegan a nuestros negocios y hogares, lo cual implica también una contaminación ambiental. El automovil en el que se moviliza esta venta ambulante es una camioneta de doble cabina color gris de placas TCR0995.<br />\nEl día de hoy 9 de agosto pude ver la presencia de una camioneta del Municipio de Quito sin embargo la venta ambulante continúa en el sector.', '3', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/103-DAMIA'' target=''_blank''>Link denuncia</a>', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 17:03:10', '146'),
(801, 31, 12078, '2017-08-10 12:07:38', 2, 'S/N', 'SEGUNDO HERNAN GUAMAN', NULL, NULL, 'REFERENTE A RESOLUCION 2017-667', '5', 'COPIA DE PAGO Y CONVENIO DE PAGO', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 17:08:17', '150'),
(802, 4, 12079, '2017-08-09 23:54:00', 1, 'Denuncia web - 105', 'Carlo Viteri Mañdpmad', '1725903270', 'c4rlosviteri@gmail.com', 'Las personas que viven dentro del parque ("cuidan") tienen 3 perritos en malas condiciones, especialmente un viejito negro que tiene sarna, tumores y tanta secreción lagrimal que ha ido perdiendo la vista. Sobrevive de lo que le da la gente, no lo alimentan, ni lo bañan ni lo llevan al veteriario a pesar de los múltimples problemas de salud que tiene.', '3', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/105-Carlo'' target=''_blank''>Link denuncia</a>', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 17:09:13', '146'),
(803, 5, 12080, '2017-08-10 12:09:45', 2, 'OFC 11743-2017-DOAMT', 'AB. JORGE AMIREZ-AGENCIA METROPOLITANA DE TRANSITO', NULL, NULL, 'SOLICITUD DE OPERATIVOS DE CONTROL', '3', '-', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 17:09:55', '146'),
(804, 4, 12081, '2017-08-07 19:28:00', 1, 'Denuncia web - 99', 'MANUE NARVAEZ PEREZ', '1703869170', 'manuelnarvaezperez@hotmail.co', 'La Administración del Condominio Ladera Este a nombre de todos los copropietarios del edificio, tengo a bien dirigirme a vuestra autoridad para realizar la denuncia formal por cuanto la arrendataria del Departamento de PB de dicho edificio, Sra. Monica Bustamante, sin autorización alguna de los propietarios, peor aun de la administración Municipal, a cedido el espacio del garaje de dicho departamento el cual queda a nivel de la Av. Gonzlaez Suarez, para que en dicho sitio se instale un negocio de venta de verduras, como hago contar en las fotos que acompaño a la presente denuncia.<br />\n<br />\nA pesar de haberle solicitado de la manera mas comedida y educada que desistiera de tal actividad, ya qeu ese sitio no fue creado para tal efecto, contravinienod de manera flagrante la Ley de Propiedad Horizontal y haciendo caso omiso a nuestra solicitud.<br />\n<br />\nMi pedio concreto a nombre de los señores copropietarios del edificio, es una intervención directa del departamento respectivo del Ilustre Municipio de Quito, parque se proceda con la clausura de dicho local y la sanción respectiva, con el fin de que no se vuelva a reabrir dicho espacio, que atenta al ornato y buena presentación del edificio.<br />\n<br />\nEste negocio es ilegal desde todo punto de vista, generalmente esta abierto los días martes, en un horario comprendido desde las 09:00 hasta las 12:00<br />\n<br />\nPor la favor que se preste a la presente, anticipo mis mas sinceros agradecimientos.<br />\n<br />\nAtentamente.<br />\n<br />\nManuel Enrique Narvaez Perez<br />\nAdiministrador<br />\nmanuelnarvaezperez@hotmail.com<br />\n', '3', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/99-MANUE'' target=''_blank''>Link denuncia</a>', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 17:17:33', '146'),
(805, 31, 12082, '2017-08-10 12:19:22', 1, 'DENUNCIA', 'SONIA BERMEO HURTADO', '170452093-9', 'soniabermeo3@gmail.com', 'CONSTRUCCION ILEGAL SIN PERMISOS', '3', 'COPIA DE CEDULA Y FOTOS', 1, 7, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 17:19:42', '146'),
(806, 5, 12083, '2017-08-10 12:19:46', 2, 'OFC AZLD-DGT-2017-3067', 'HUMBERTO ALMEIDA-ZONA LA DELICIA', NULL, NULL, 'CONTROL DE EDIFICACIONES', '3', 'GDOC 2017-114614', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 17:20:34', '146'),
(807, 5, 12084, '2017-08-10 12:23:37', 2, 'OFC AZLD-T-SG-2017-3056', 'HUMBERTO ALMEIDA-ZONA LA DELICIA', NULL, NULL, 'TEMA EXPEDIENTES DE ICUS', '2', 'GDOC 2017-115040', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 17:23:53', '151'),
(808, 5, 12085, '2017-08-10 12:25:45', 2, 'OFC AZLD-DGT-SG-2017-3057', 'HUMBERTO ALMEIDA-ZONA LA DELICIA', NULL, NULL, 'TEMA EXPEDIENTES ICUS', '2', 'GDOC 2017-115036', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 17:26:03', '151'),
(809, 31, 12086, '2017-08-10 12:26:49', 2, 'S/N', 'SONIA GAIBOR MONAR', NULL, NULL, 'REFERENTE AL EXPEDIENTE 529-2017', '1', 'COPIA DE VARIA DOCUMENTACION ', 1, 85, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 17:27:58', '148'),
(810, 5, 12087, '2017-08-10 12:27:48', 2, 'OFC AZLD-DGT-SG-2017-3058', 'HUMBERTO ALMEIDA', NULL, NULL, 'TEMA EXPEDIENTE DE ICUS', '2', 'GDOC 2017-115124', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 17:28:10', '151'),
(811, 5, 12088, '2017-08-10 12:29:59', 2, 'OFC AZLD-DGT-SG-2017-3054', 'HUMBERTO ALMEIDA-ZONA LA DELICIA', NULL, NULL, 'TEMA EXPEDIENTE DE ICUS', '2', 'GDOC 2017-115116', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 17:30:08', '151'),
(812, 31, 12089, '2017-08-10 12:31:58', 2, 'S/N', 'MARIA COPARA SIMALUISA', NULL, NULL, 'REFERENTE A RESOLUCION 2017-077', '5', 'COPIA DE LUAE', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 17:32:11', '150'),
(813, 5, 12090, '2017-08-10 12:32:14', 2, 'OFC AZLD-DA-2017-3053', 'HUMBERTO ALMEIDA-ZONA LA DELICIA', NULL, NULL, 'SOLICITUD DE INSPECCION VENDEDORES AMBULANTES', '12', '-', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 17:32:26', '147'),
(814, 31, 12091, '2017-08-10 12:34:23', 2, 'S/N', 'FRANCIA RAZO MARIÑO', NULL, NULL, 'REFERENTE A RESOLUCION 2016-188', '5', 'COPIA DE CEDULA Y PAGO', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 17:34:19', '150'),
(815, 5, 12092, '2017-08-10 12:34:11', 2, 'OFC AZLD-DGT-JCC-2017-3050', 'HUMBERTO ALMEIDA-ZONA LA DELICIA', NULL, NULL, 'OCUPACION ESPACIO PUBLICO', '12', 'GDOC 2017-104774', 1, 8, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 17:34:51', '147'),
(816, 5, 12093, '2017-08-10 12:36:29', 2, 'OFC AZLD-DGT-UTYV-2017-3052', 'HUMBERTO ALMEIDA-ZONA LA DELICIA', NULL, NULL, 'TEMA DE EXPEDIENTE POR ICUS', '2', 'GDOC 2017-115015', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 17:36:51', '151'),
(817, 5, 12094, '2017-08-10 12:38:40', 2, 'OFC AZDL-DGT-UTYV-2017-3051', 'HUMBERTO ALMEIDA-ZONA LA DELICIA', NULL, NULL, 'TEMA DE ESPEDIENTE POR ICUS', '2', 'GDOC 2017-115010', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 17:38:48', '151'),
(818, 5, 12095, '2017-08-10 12:40:52', 2, 'OFC AZLD-DGT-JCC-2017-3049', 'HUMBERTO ALMEIDA-ZONA LA DELICIA', NULL, NULL, 'DENUNCIA DE CONTROL DE VENTAS INFORMALES', '12', 'GDOC 2017-115122', 1, 7, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 17:41:39', '147'),
(819, 5, 12096, '2017-08-10 12:44:13', 2, 'OFC AZLD-DA-2017-3021', 'HUMBERTO ALMEIDA-ZONA LA DELICIA', NULL, NULL, 'INFORME TECNICO', '12', 'GDOC 2017-114493', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 17:44:27', '147'),
(820, 5, 12097, '2017-08-10 12:46:07', 2, 'OFC AZLD-DA-2017-3000', 'HUMBERTO ALMEIDA-ZONA LA DELICIA', NULL, NULL, 'REVOCATORIA DE LA LMU 20 ', '12', '-', 1, 14, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 17:48:07', '147'),
(821, 5, 12098, '2017-08-10 12:50:12', 2, 'OFC AZLD-DA-2017-3022', 'HUMBERTO ALMEIDA-ZONA LA DELICIA', NULL, NULL, 'SOLICITUD DE INSPECCION', '12', '-', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 17:50:22', '147'),
(822, 5, 12099, '2017-08-10 12:52:13', 2, 'OFC AZLD-DGT-SG-2017-3019', 'HUMBERTO ALMEIDA-ZONA LA DELICIA', NULL, NULL, 'TEMA EXPEDIENTE ICUS', '2', 'GDOC 2017-111682', 1, 5, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 17:52:32', '151'),
(823, 5, 12100, '2017-08-10 12:54:33', 2, 'OFC AZLD-DA-2017-3015', 'HUMBERTO ALMEIDA-ZONA LA DELICIA', '', '', 'SOLICITUD DE INSPECCION', '3', 'GDOC 2017-114477', 1, 9, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 17:55:03', '146'),
(824, 31, 12101, '2017-08-10 12:55:40', 2, '3070-2017', 'SANTIAGO ANDRADE - SECRETARIA DE AMBIENTE', NULL, NULL, 'REQUERIMIENTO DE PRONUNCIAMIENTO ', '12', 'GDOC-2017-003329', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 17:55:58', '147'),
(825, 5, 12102, '2017-08-10 12:56:39', 2, 'OFC AZLD-DGT-JCC-2017-3016', 'HUMBERTO ALMEIDA-ZONA LA DELICIA', '', '', 'FRENTES DESCUIDADOS', '3', 'GDOC 2017-096577', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 17:57:01', '146'),
(826, 5, 12103, '2017-08-10 12:58:56', 2, 'OFC AZLD-GT-JCC-2017-3017', 'HUMBERTO ALMEIDA-ZONA LA DELICIA', '', '', 'LOTES BALDIOS Y FRENTES DESCUIDADOS', '3', 'GDOC 2017-096442', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 17:58:57', '146'),
(827, 31, 12104, '2017-08-10 12:59:18', 2, '3067-2017', 'SANTIAGO ANDRADE - SECRETARIA DE AMBIENTE', NULL, NULL, 'ATENCION A MOLESTIAS POR VENTA DE COMIDA Y LICOR', '12', 'GDOC-2017-024942', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 18:00:27', '147'),
(828, 5, 12105, '2017-08-10 13:00:43', 2, 'OFC AZLD-DGT-G-2017-3018', 'HUMBERTO ALMEIDA -ZONA LA DELICIA', NULL, NULL, 'TEMA EXPEDIENTES ICUS', '2', '-', 1, 4, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 18:00:58', '151'),
(829, 31, 12106, '2017-08-10 13:02:16', 2, 'OFC-3111-2017', 'SANTIAGO ANDRADE - SECRETARIA DE AMBIENTE', NULL, NULL, 'CONTROL A PLANTA SNOB', '12', 'GDOC-2017-057967', 1, 6, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 18:02:29', '147'),
(830, 31, 12107, '2017-08-10 13:04:24', 2, 'OFC-3112-2017', 'SANTIAGO ANDRADE - SECRETARIA DE AMBIENTE', NULL, NULL, 'ATENCION LAVADORA NOROCCIDENTE ', '12', 'GDOC-2017-065530', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 18:04:23', '147'),
(831, 31, 12108, '2017-08-10 13:06:11', 2, 'OFC-2017-3044', 'RUTH ELENA RUIZ - SECRETARIA DE AMBIENTE', NULL, NULL, 'ACTIVIDADES MINERAS EN RIBERAS RIO PISQUE', '12', 'GDOC-2017-547482', 1, 9, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 18:06:23', '147'),
(832, 5, 12109, '2017-08-10 13:07:04', 2, 'S/N', 'CRUZ DIAZ', NULL, NULL, 'CONOCIMIENTO DE PAGO DE MULTA', '5', '-', 1, 7, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 18:07:10', '150'),
(833, 31, 12110, '2017-08-10 13:16:52', 2, 'OFC-1536-2017', 'MIGUEL DAVILA CASTILLO - ADMINISTRADOR GENERAL', NULL, NULL, 'REFERENTE A OFICIO AMC-SM-JA-2017-001013', '12', 'GDOC-2017040159', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 18:17:24', '147'),
(834, 5, 12111, '2017-08-10 13:19:51', 2, 'S/N', 'GABRIELA LASCANO', NULL, NULL, 'CONTESTACION A PROVIDENCIA', '1', '-', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 18:19:49', '148'),
(835, 31, 12112, '2017-08-10 13:32:32', 2, 'S/N', 'CASTULA GARZON ', NULL, NULL, 'REFERENTE AL EXPEDIENTE AMC-CMASA-ZEE-2017-116', '13', 'COPIA CEDULA Y FOTOS', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 18:32:29', '152'),
(836, 31, 12113, '2017-08-10 13:41:23', 2, 'AMC-2017-199', 'CARLOS CAHORRANO - LA MARISCAL', NULL, NULL, 'CONTESTACION A MEMO-2017-199', '4', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 18:41:17', '149'),
(837, 31, 12114, '2017-08-10 13:43:14', 2, 'MEMO-AMC-2017-196', 'CARLOS CALAHORRANO - LA MARISCAL', NULL, NULL, 'INFORME MENSUAL', '4', 'VARIA DOCUMENTACION', 1, 7, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 18:43:40', '149'),
(838, 31, 12115, '2017-08-10 13:45:42', 1, 'DENUNCIA - MEMO 2017-195 LA MARISCAL', 'GLADYS RUIZ', '1782526549', 'q_ruiztorres@yahoo.com', 'CONTAMINACION AUDITIVA', '3', 'COPIA CEDULA', 1, 4, 'MEMO AMC-UDCTCL-ZLM-2017-195 PARA S.G.', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 18:46:03', '146'),
(839, 31, 12116, '2017-08-10 13:52:28', 2, 'S/N', 'MARIA GUAMAN ESPINOSA', NULL, NULL, 'REFERENTE AL EXPEDIENTE 2017-136', '13', 'COPIA CEDULA', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 18:52:17', '152'),
(840, 31, 12117, '2017-08-10 13:56:10', 2, 'S/N', 'MARCIA ESTUPIÑAN FLORES', NULL, NULL, 'REFERENTE AL EXPEDIENTE 229-2017', '1', 'DOCUMENTOS VARIOS', 1, 8, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 18:56:27', '148'),
(841, 31, 12118, '2017-08-10 14:07:18', 2, 'S/N', 'JESSICA RIOS', '', '', 'ENTREGA DE DOCUMENTACION', '8', 'DOCUMENTOS VARIOS Y 2 CD´S', 1, 35, 'ADJUNTA: 35 FOJAS, 2 CD´S Y FACTURA No. 0000140', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 19:08:32', '153'),
(842, 7, 12119, '2017-08-10 14:36:46', 2, 'S/N', 'EDWIN PATRICIO CABRERA VITERI', NULL, NULL, 'EXP. AMC-UDC-LPN-2017-023', '12', '-', 1, 7, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 19:37:39', '147'),
(843, 31, 12120, '2017-08-10 14:40:02', 1, 'DENUNCIA', 'PATRICIO ESPIN', '1706487756', 'espinpasquel@hotmai.com', 'RUIDO EXCESIVO POR BARES Y DISCOTECAS', '3', '-', 1, 3, '', 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 19:39:54', ''),
(844, 7, 12121, '2017-08-10 15:12:07', 2, 'S/N', 'ARQ.ANGELICA ARIAS', '', '', 'INSPECCION MURAL "MILAGROSO ALTAR BLASFEMO"', '12', '-', 1, 11, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 19:40:59', '147'),
(845, 31, 12122, '2017-08-10 14:45:29', 2, 'S/N', 'LUZ MARIA CUEVA LUZON', NULL, NULL, 'REFERENTE AL AUTO DE INICIO 126-2017', '5', 'COPIA LUAE Y CEDULA', 1, 3, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 19:45:44', '150'),
(846, 31, 12123, '2017-08-10 15:00:12', 2, 'OFC-DC-MP-2017-00281', 'MARCO PONCE - CONCEJAL', '', '', 'SOLICITUD DE INFORMACION ', '12', 'DOCUMENTACION VARIA', 1, 16, 'GDOC-2017-116708', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 20:00:11', '147'),
(847, 31, 12124, '2017-08-10 15:05:30', 2, 'S/N', 'LOURDES VELEPUCHA ORDOÑEZ', NULL, NULL, 'REFERENTE AL AUTO DE INICIO 151-2017', '1', 'DOCUMENTOS VARIOS', 1, 9, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 20:06:12', '148'),
(848, 31, 12125, '2017-08-10 15:25:07', 2, 'S/N', 'RACHEL LEVINSON', NULL, NULL, 'REFERENTE AL EXPEDIENTE 417-2017', '5', 'DOCUMENTOS VARIOS', 1, 9, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 20:25:14', '150'),
(849, 31, 12126, '2017-08-10 15:34:01', 2, 'S/N', 'JORGE JUAN TUPUYO', NULL, NULL, 'REFRENTE AL EXPEDIENTE 377-2017', '1', '-', 1, 2, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 20:34:09', NULL),
(850, 31, 12127, '2017-08-10 15:45:00', 2, 'S/N', 'VICTOR CHALCO VILLAÑA', NULL, NULL, 'REFRENTE A RESOLUCION 189-2012', '5', '-', 1, 1, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 20:44:56', NULL),
(851, 31, 12128, '2017-08-10 15:46:48', 2, 'S/N', 'MARIA ELENA GOMEZ', NULL, NULL, 'REFRENTE AL EXPEDIENTE 133-2017', '16', '-COPIAS VARIAS', 1, 3, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 20:46:26', NULL),
(852, 5, 12129, '2017-08-10 15:51:17', 2, 'S/N', 'INES HURTADO', NULL, NULL, 'REFERENTE A PROVIDENCIA AMC-DRYE-SO-2017-617', '5', '-', 1, 8, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 20:51:25', NULL),
(853, 7, 12130, '2017-08-10 16:01:26', 2, 'MEMO AMC-UDCMCL-ZEA-2017-323', 'AB.JAIME MURIEL', NULL, NULL, 'RESPUESTA MEMORANDO AMC-SG-2017-447', '2', '-', 1, 2, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 21:03:32', NULL),
(854, 7, 12131, '2017-08-10 16:05:49', 2, 'MEMO AMC-UDCMCL-ZEA-2017-324', 'AB.JAIME MURIEL', NULL, NULL, 'RESPUESTA MEMO AMC-SG-2017-447', '2', '-', 1, 2, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 21:05:32', NULL),
(855, 5, 12132, '2017-08-10 16:06:11', 2, 'OFICIO S/N', 'GABRIELA LASCANO', NULL, NULL, 'REF. EXP-503-2017UDCMCL-ZEE', '1', '-COPIA LUAE', 1, 2, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 21:07:59', NULL),
(856, 5, 12133, '2017-08-10 16:06:11', 2, 'OFICIO S/N', 'GABRIELA LASCANO', NULL, NULL, 'REF. EXP-503-2017UDCMCL-ZEE', '1', '-COPIA LUAE', 1, 2, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 21:07:59', NULL),
(857, 7, 12134, '2017-08-10 16:07:31', 2, 'MEMO AMC-UDCMCL-ZEA-2017-325', 'AB.JAIME MURIEL', NULL, NULL, 'RESPUESTA MEMO AMC-SG-2017-447', '2', '-', 1, 2, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 21:07:59', NULL),
(858, 7, 12135, '2017-08-10 16:09:14', 2, 'MEMO AMC-UDCMCL-ZEA--2017-326', 'AB.JAIME MURIEL', NULL, NULL, 'RESPUESTA MEMO AMC-SG-2017-452', '2', '-', 1, 2, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 21:09:40', NULL),
(859, 7, 12136, '2017-08-10 16:10:42', 2, 'MEMO AMC-UDCMCL-ZEA-2017-358', 'AB.JAIME MUERIEL', NULL, NULL, 'RESPUESTA MEMO AMC-SG-2017-452', '2', '-', 1, 2, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 21:11:06', NULL),
(860, 7, 12137, '2017-08-10 16:12:05', 2, 'MEMO AMC-UDCMCL-ZEA-2017-362', 'AB.JAIME MURIEL', NULL, NULL, 'RESPUESTA MEMO AMC-SG-2017-480', '2', '-', 1, 2, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 21:12:28', NULL),
(861, 7, 12138, '2017-08-10 16:13:28', 2, 'MEMO AMC-UDCMCL-2017-363', 'AB.JAIME MURIEL', NULL, NULL, 'RESPUESTA MEMO AMC-SG-2017-480', '2', '-', 1, 2, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 21:13:42', NULL),
(862, 7, 12139, '2017-08-10 16:14:53', 2, 'MEMO AMC-UDCMCL-2017-359', 'AB.JAIME MURIEL', NULL, NULL, 'RESPUESTA MEMO AMC-SG-2017-471', '2', '-', 1, 2, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 21:15:24', NULL),
(863, 5, 12140, '2017-08-10 16:15:10', 2, 'MEMORANDO NªUDCMCL-ZEA-2017-355', 'ZONA ELOY ALFARO JAIME MURIEL', NULL, NULL, 'INOFORME DE OPERATIVO', '14', '-INFORME Nª47', 1, 2, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 21:16:31', NULL),
(864, 7, 12141, '2017-08-10 16:16:23', 2, 'MEMO AMC-UDCMCL-ZEA-2017-364', 'AB.JAIME MURIEL', NULL, NULL, 'RESPUESTA MEMO AMC-SG-2017-480', '2', '-', 1, 2, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 21:16:40', NULL),
(865, 7, 12142, '2017-08-10 16:32:03', 2, 'memo amc-udcmcl-zea-2017-357', 'AB.IVAN GUERRERO', NULL, NULL, 'INSISTENCIA INFORME TECNICO', '3', '-', 1, 1, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-10 21:32:39', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `amc_departamentos`
--

CREATE TABLE IF NOT EXISTS `amc_departamentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `unidad` int(11) DEFAULT NULL,
  `activo` varchar(5) COLLATE utf8_bin DEFAULT '1',
  `creado` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=5 ;

--
-- Dumping data for table `amc_departamentos`
--

INSERT INTO `amc_departamentos` (`id`, `nombre`, `unidad`, `activo`, `creado`) VALUES
(1, 'No asignado', 3, '1', '2017-06-09 19:25:16'),
(2, 'a_Inspección_Técnica', 3, '1', '2017-06-09 19:25:16'),
(3, 'b_Inspección_General', 3, '1', '2017-06-09 19:25:16'),
(4, 'c_Inspección_Fauna_Urbana', 3, '1', '2017-06-13 20:31:23');

-- --------------------------------------------------------

--
-- Table structure for table `amc_guias`
--

CREATE TABLE IF NOT EXISTS `amc_guias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `id_unidad` int(11) DEFAULT NULL,
  `unidad` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `creado` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_member` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=155 ;

--
-- Dumping data for table `amc_guias`
--

INSERT INTO `amc_guias` (`id`, `numero`, `id_unidad`, `unidad`, `creado`, `id_member`) VALUES
(51, 'SGE-2017-2181', 11, 'Unidad de Informática', '2017-07-31 19:23:37', NULL),
(53, 'SGE-2017-2182', 12, 'Supervisión Metropolitana de Control', '2017-08-01 20:52:46', NULL),
(55, 'SGE-2017-2183', 5, 'Dirección Metropolitana de Resolución y Ejecución', '2017-08-01 21:11:58', NULL),
(56, 'SGE-2017-2184', 12, 'Supervisión Metropolitana de Control', '2017-08-02 15:00:47', NULL),
(57, 'SGE-2017-2185', 3, 'Dirección Metropolitana de Inspección', '2017-08-02 15:08:27', NULL),
(58, 'SGE-2017-2186', 4, 'Dirección Metropolitana de  Instrucción', '2017-08-02 15:36:31', NULL),
(59, 'SGE-2017-2187', 5, 'Dirección Metropolitana de Resolución y Ejecución', '2017-08-02 15:42:13', NULL),
(60, 'SGE-2017-2188', 1, 'Instrucción - Unidad de Construcciones y Licenciamiento Eugenio Espejo', '2017-08-02 15:47:29', NULL),
(61, 'SGE-2017-2189', 7, 'Unidad de Talento Humano', '2017-08-02 15:55:21', NULL),
(62, 'SGE-2017-2190', 14, 'Inspeccion - Control de Operativos', '2017-08-02 16:16:37', NULL),
(63, 'SGE-2017-2191', 10, 'Unidad de Planificación', '2017-08-02 20:07:15', NULL),
(64, 'SGE-2017-2192', 12, 'Supervisión Metropolitana de Control', '2017-08-02 20:18:30', NULL),
(65, 'SGE-2017-2193', 5, 'Dirección Metropolitana de Resolución y Ejecución', '2017-08-02 20:26:14', NULL),
(66, 'SGE-2017-2194', 3, 'Dirección Metropolitana de Inspección', '2017-08-02 20:33:01', NULL),
(67, 'SGE-2017-2195', 20, 'Dirección Metropolitana de Inspección- Fauna Urbana', '2017-08-02 21:06:15', NULL),
(68, 'SGE-2017-2196', 4, 'Dirección Metropolitana de  Instrucción', '2017-08-02 21:08:08', NULL),
(69, 'SGE-2017-2197', 1, 'Instrucción - Unidad de Construcciones y Licenciamiento Eugenio Espejo', '2017-08-02 21:10:26', NULL),
(70, 'SGE-2017-2198', 2, 'Secretaría General', '2017-08-02 21:21:37', NULL),
(71, 'SGE-2017-2199', 12, 'Supervisión Metropolitana de Control', '2017-08-03 14:36:25', NULL),
(72, 'SGE-2017-2200', 5, 'Dirección Metropolitana de Resolución y Ejecución', '2017-08-03 14:48:25', NULL),
(73, 'SGE-2017-2201', 1, 'Instrucción - Unidad de Construcciones y Licenciamiento Eugenio Espejo', '2017-08-03 14:52:27', NULL),
(74, 'SGE-2017-2202', 3, 'Dirección Metropolitana de Inspección', '2017-08-03 15:10:19', NULL),
(75, 'SGE-2017-2203', 9, 'Comunicación Social', '2017-08-03 16:45:06', NULL),
(76, 'SGE-2017-2204', 10, 'Unidad de Planificación', '2017-08-03 16:51:19', NULL),
(77, 'SGE-2017-2205', 12, 'Supervisión Metropolitana de Control', '2017-08-03 20:10:18', NULL),
(78, 'SGE-2017-2206', 3, 'Dirección Metropolitana de Inspección', '2017-08-03 20:16:52', NULL),
(79, 'SGE-2017-2207', 1, 'Instrucción - Unidad de Construcciones y Licenciamiento Eugenio Espejo', '2017-08-03 20:17:34', NULL),
(80, 'SGE-2017-2208', 13, 'Instrucción - Aseo Salud y Ambiente Eugenio Espejo', '2017-08-03 20:23:51', NULL),
(81, 'SGE-2017-2209', 4, 'Dirección Metropolitana de  Instrucción', '2017-08-03 20:35:56', NULL),
(82, 'SGE-2017-2210', 5, 'Dirección Metropolitana de Resolución y Ejecución', '2017-08-03 20:35:59', NULL),
(83, 'SGE-2017-2211', 7, 'Unidad de Talento Humano', '2017-08-03 20:45:47', NULL),
(84, 'SGE-2017-2212', 2, 'Secretaría General', '2017-08-03 21:16:42', NULL),
(85, 'SGE-2017-2213', 12, 'Supervisión Metropolitana de Control', '2017-08-04 13:56:59', NULL),
(88, 'SGE-2017-2214', 5, 'Dirección Metropolitana de Resolución y Ejecución', '2017-08-04 15:14:08', NULL),
(89, 'SGE-2017-2215', 13, 'Instrucción - Aseo Salud y Ambiente Eugenio Espejo', '2017-08-04 15:19:43', NULL),
(90, 'SGE-2017-2216', 16, 'Instrucción - Unidad de Construcciones y Licenciamiento Laderas de Pichincha Norte', '2017-08-04 15:36:57', NULL),
(91, 'SGE-2017-2217', 3, 'Dirección Metropolitana de Inspección', '2017-08-04 16:00:30', NULL),
(92, 'SGE-2017-2218', 4, 'Dirección Metropolitana de  Instrucción', '2017-08-04 16:03:09', NULL),
(93, 'SGE-2017-2219', 1, 'Instrucción - Unidad de Construcciones y Licenciamiento Eugenio Espejo', '2017-08-04 16:04:30', NULL),
(94, 'SGE-2017-2220', 20, 'Dirección Metropolitana de Inspección- Fauna Urbana', '2017-08-04 16:11:28', NULL),
(95, 'SGE-2017-2221', 2, 'Secretaría General', '2017-08-04 16:16:16', NULL),
(96, 'SGE-2017-2222', 17, 'Instrucción - Unidad de Publicidad', '2017-08-04 16:49:54', NULL),
(97, 'SGE-2017-2223', 12, 'Supervisión Metropolitana de Control', '2017-08-04 20:03:15', NULL),
(98, 'SGE-2017-2224', 1, 'Instrucción - Unidad de Construcciones y Licenciamiento Eugenio Espejo', '2017-08-04 20:27:42', NULL),
(99, 'SGE-2017-2225', 3, 'Dirección Metropolitana de Inspección', '2017-08-04 20:42:23', NULL),
(100, 'SGE-2017-2226', 4, 'Dirección Metropolitana de  Instrucción', '2017-08-04 20:47:10', NULL),
(101, 'SGE-2017-2227', 5, 'Dirección Metropolitana de Resolución y Ejecución', '2017-08-04 21:03:13', NULL),
(102, 'SGE-2017-2228', 17, 'Instrucción - Unidad de Publicidad', '2017-08-04 21:08:33', NULL),
(103, 'SGE-2017-2229', 14, 'Inspeccion Control de Operativos', '2017-08-04 21:13:01', NULL),
(104, 'SGE-2017-2230', 12, 'Supervisión Metropolitana de Control', '2017-08-07 14:04:02', NULL),
(105, 'SGE-2017-2231', 12, 'Supervisión Metropolitana de Control', '2017-08-07 14:04:25', NULL),
(106, 'SGE-2017-2232', 12, 'Supervisión Metropolitana de Control', '2017-08-07 14:05:47', NULL),
(107, 'SGE-2017-2233', 5, 'Dirección Metropolitana de Resolución y Ejecución', '2017-08-07 14:07:36', NULL),
(108, 'SGE-2017-2234', 4, 'Dirección Metropolitana de  Instrucción', '2017-08-07 14:09:10', NULL),
(109, 'SGE-2017-2235', 3, 'Dirección Metropolitana de Inspección', '2017-08-07 15:00:20', NULL),
(110, 'SGE-2017-2236', 1, 'Instrucción - Unidad de Construcciones y Licenciamiento Eugenio Espejo', '2017-08-07 15:52:25', NULL),
(111, 'SGE-2017-2237', 5, 'Dirección Metropolitana de Resolución y Ejecución', '2017-08-07 16:21:35', NULL),
(112, 'SGE-2017-2238', 12, 'Supervisión Metropolitana de Control', '2017-08-07 20:26:20', 7),
(113, 'SGE-2017-2239', 5, 'Dirección Metropolitana de Resolución y Ejecución', '2017-08-07 20:47:49', 7),
(114, 'SGE-2017-2240', 3, 'Dirección Metropolitana de Inspección', '2017-08-07 21:06:52', 7),
(115, 'SGE-2017-2241', 1, 'Instrucción - Unidad de Construcciones y Licenciamiento Eugenio Espejo', '2017-08-07 21:29:42', 7),
(116, 'SGE-2017-2242', 2, 'Secretaría General', '2017-08-07 21:31:27', 7),
(117, 'SGE-2017-2243', 10, 'Unidad de Planificación', '2017-08-08 13:22:27', 7),
(118, 'SGE-2017-2244', 7, 'Unidad de Talento Humano', '2017-08-08 13:30:05', 7),
(119, 'SGE-2017-2245', 12, 'Supervisión Metropolitana de Control', '2017-08-08 15:10:17', 7),
(120, 'SGE-2017-2246', 12, 'Supervisión Metropolitana de Control', '2017-08-08 20:21:41', 7),
(121, 'SGE-2017-2247', 5, 'Dirección Metropolitana de Resolución y Ejecución', '2017-08-08 20:37:22', 7),
(122, 'SGE-2017-2248', 3, 'Dirección Metropolitana de Inspección', '2017-08-08 21:04:28', 7),
(123, 'SGE-2017-2249', 1, 'Instrucción - Unidad de Construcciones y Licenciamiento Eugenio Espejo', '2017-08-08 21:29:27', 7),
(124, 'SGE-2017-2250', 4, 'Dirección Metropolitana de  Instrucción', '2017-08-09 14:23:04', 7),
(126, 'SGE-2017-2251', 3, 'Dirección Metropolitana de Inspección', '2017-08-09 14:45:48', 7),
(127, 'SGE-2017-2252', 12, 'Supervisión Metropolitana de Control', '2017-08-09 15:04:53', 7),
(128, 'SGE-2017-2253', 5, 'Dirección Metropolitana de Resolución y Ejecución', '2017-08-09 15:08:53', 7),
(131, 'SGE-2017-2254', 1, 'Instrucción - Unidad de Construcciones y Licenciamiento Eugenio Espejo', '2017-08-09 15:21:24', 7),
(133, 'SGE-2017-2255', NULL, 'Instruccion Aseo Salud y Ambiente Eugenio Espejo', '2017-08-09 20:09:49', 7),
(134, 'SGE-2017-2256', NULL, 'Supervisión Metropolitana de Control', '2017-08-09 20:18:38', 7),
(135, 'SGE-2017-2257', 16, 'Instrucción - Unidad de Construcciones y Licenciamiento Laderas de Pichincha Norte', '2017-08-09 20:35:06', 7),
(136, 'SGE-2017-2258', 17, 'Instrucción - Unidad de Publicidad', '2017-08-09 20:39:04', 7),
(137, 'SGE-2017-2259', 7, 'Unidad de Talento Humano', '2017-08-09 20:45:27', 7),
(138, 'SGE-2017-2260', 14, 'Inspeccion Control de Operativos', '2017-08-09 20:50:42', 7),
(139, 'SGE-2017-2261', 3, 'Dirección Metropolitana de Inspección', '2017-08-09 21:07:51', 7),
(140, 'SGE-2017-2262', 2, 'Secretaría General', '2017-08-09 21:24:27', 7),
(141, 'SGE-2017-2263', 5, 'Dirección Metropolitana de Resolución y Ejecución', '2017-08-09 21:30:05', 7),
(142, 'SGE-2017-2264', 4, 'Dirección Metropolitana de  Instrucción', '2017-08-09 21:32:00', 7),
(143, 'SGE-2017-2265', 1, 'Instrucción - Unidad de Construcciones y Licenciamiento Eugenio Espejo', '2017-08-09 21:36:47', 7),
(144, 'SGE-2017-2266', 10, 'Unidad de Planificación', '2017-08-09 21:39:39', 7),
(145, 'SGE-2017-2267', 12, 'Supervisión Metropolitana de Control', '2017-08-10 15:01:49', 7),
(146, 'SGE-2017-2268', 3, 'Dirección Metropolitana de Inspección', '2017-08-10 19:41:40', 7),
(147, 'SGE-2017-2269', 12, 'Supervisión Metropolitana de Control', '2017-08-10 19:59:45', 7),
(148, 'SGE-2017-2270', 1, 'Instrucción - Unidad de Construcciones y Licenciamiento Eugenio Espejo', '2017-08-10 20:22:49', 7),
(149, 'SGE-2017-2271', 4, 'Dirección Metropolitana de  Instrucción', '2017-08-10 20:25:39', 7),
(150, 'SGE-2017-2272', 5, 'Dirección Metropolitana de Resolución y Ejecución', '2017-08-10 20:29:00', 7),
(151, 'SGE-2017-2273', 2, 'Secretaría General', '2017-08-10 20:31:48', 7),
(152, 'SGE-2017-2274', 13, 'Instruccion Aseo Salud y Ambiente Eugenio Espejo', '2017-08-10 20:37:58', 7),
(153, 'SGE-2017-2275', 8, 'Coordinación de Entidades Colaboradoras', '2017-08-10 20:40:10', 7),
(154, 'SGE-2017-2276', 16, 'Instrucción - Unidad de Construcciones y Licenciamiento Laderas de Pichincha Norte', '2017-08-10 20:43:32', 7);

-- --------------------------------------------------------

--
-- Table structure for table `amc_personal`
--

CREATE TABLE IF NOT EXISTS `amc_personal` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_member` int(5) NOT NULL,
  `first_name` varchar(35) CHARACTER SET utf8 DEFAULT '',
  `last_name` varchar(25) CHARACTER SET utf8 DEFAULT '',
  `email_address` varchar(55) CHARACTER SET utf8 DEFAULT NULL,
  `unidad` int(11) DEFAULT NULL,
  `departamento` int(11) DEFAULT NULL,
  `active` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT 'Is the member currently active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=25 ;

--
-- Dumping data for table `amc_personal`
--

INSERT INTO `amc_personal` (`id`, `id_member`, `first_name`, `last_name`, `email_address`, `unidad`, `departamento`, `active`) VALUES
(1, 4, 'Rita', ' ', 'jorge@quito.gob.ec', 2, NULL, 1),
(2, 6, 'Jorge', '', 'jorge@quito.gob.ec', 2, NULL, 1),
(3, 7, 'Araceli', '', 'jorge@quito.gob.ec', 2, NULL, 1),
(4, 8, 'FEDERICO SANTIAGO ', 'AGUAS MORA ', 'jorge@quito.gob.ec', 3, 1, 1),
(5, 9, 'ALEX FABIAN', 'AGUIRRE SALAZAR ', 'jorge@quito.gob.ec', 3, 1, 1),
(6, 10, 'ANA BELEN', 'CABRERA BORJA ', 'jorge@quito.gob.ec', 3, 1, 1),
(7, 11, 'GLORIA CECIBEL', 'ESCALANTE VITERI  ', 'jorge@quito.gob.ec', 3, 1, 1),
(8, 12, ' ARNALDO ANDRES', 'ESPINOZA CALLE', 'jorge@quito.gob.ec', 3, 1, 1),
(9, 13, 'CESAR RICARDO', 'GALARZA MERO ', 'jorge@quito.gob.ec', 3, 1, 1),
(10, 14, 'DANNY EDMUNDO', 'GONGORA VILLAFUERTE ', 'jorge@quito.gob.ec', 3, 1, 1),
(11, 15, 'HUGO ARTURO', 'TERAN IMBAQUINGO ', 'jorge@quito.gob.ec', 3, 1, 1),
(12, 16, 'SARA ALEJANDRA', 'VALDOSPINOS NAVAS ', 'jorge@quito.gob.ec', 3, 1, 1),
(13, 17, 'VERONICA CRISTINA', 'ZAPATA JARAMILLO ', 'jorge@quito.gob.ec', 3, 2, 1),
(14, 18, 'DANIELA ALEXANDRA', 'BARZALLO RIVADENEIRA ', 'jorge@quito.gob.ec', 3, 2, 1),
(15, 19, 'PATRICIO VASCO', 'CERON MONTENEGRO ', 'jorge@quito.gob.ec', 3, 2, 1),
(16, 20, ' SANTIAGO', 'CHACON TALEYSSAT', 'jorge@quito.gob.ec', 3, 2, 1),
(17, 21, 'GIANINNA NOEMI', 'HOLGUIN SCACCO ', 'jorge@quito.gob.ec', 3, 2, 1),
(18, 22, 'PABLO ALBERTO', 'LEDESMA ALAVA ', 'jorge@quito.gob.ec', 3, 2, 1),
(19, 23, 'JORGE LUIS', 'LOMBEIDA ', 'jorge@quito.gob.ec', 3, 2, 1),
(20, 24, 'CATHERINE PAULINA', 'MARTINEZ BALDEON  ', 'jorge@quito.gob.ec', 3, 2, 1),
(21, 25, 'ALVARO SEBASTIAN', 'MORA CAPIO ', 'jorge@quito.gob.ec', 3, 3, 1),
(22, 26, 'LADY ELIZABETH', 'SALAZAR NARVAEZ ', 'jorge@quito.gob.ec', 3, 3, 1),
(23, 27, 'GEOVANY FRANCISCO', 'SILVA REINA ', 'jorge@quito.gob.ec', 3, 3, 1),
(24, 1, 'Administrador', '', NULL, 2, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `amc_procedimientos`
--

CREATE TABLE IF NOT EXISTS `amc_procedimientos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `observacion` varchar(512) COLLATE utf8_bin DEFAULT NULL,
  `creado` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=20 ;

--
-- Dumping data for table `amc_procedimientos`
--

INSERT INTO `amc_procedimientos` (`id`, `nombre`, `observacion`, `creado`) VALUES
(1, 'Sin procedimiento', NULL, '2017-06-09 19:25:16'),
(2, 'Construcciones ilegales, sin permiso y/o sin medida de seguridad', 'Ordenanza metropolitana N. 432', '2017-06-09 19:25:16'),
(3, 'Ocupación de espacio público equipos, materiales y/o escombros', NULL, '2017-06-09 19:25:16'),
(4, 'Excavar creando inestabilidad o riesgo a predios colindantes', NULL, '2017-06-09 19:25:16'),
(5, 'Edificar sin respetar retiros determinados en la ZONAficación respectiva', NULL, '2017-06-09 19:25:16'),
(6, 'Adosar sin contar con autorización de terceros', NULL, '2017-06-09 19:25:16'),
(7, 'Realizar adecuaciones y/o remodelaciones sin permisos (LMU 20Simplificada, máximo 42m2)', NULL, '2017-06-09 19:25:16'),
(8, 'Locales comerciales sin licenciamiento (LUAE, licencia única de actividad económica)', NULL, '2017-06-09 19:25:16'),
(9, 'Uso indebido y/o daños al espacio público', NULL, '2017-06-09 19:25:16'),
(10, 'Venta y consumo de bebidas alcohólicas en el espacio público', NULL, '2017-06-09 19:25:16'),
(11, 'Mal mantenimiento de fachadas/Terrenos baldíos sin cerramientos/ Terrenos baldíos sin sanear', NULL, '2017-06-09 19:25:16'),
(12, 'Sacar la basura fuera de horarios establecidos por el municipio', NULL, '2017-06-09 19:25:16'),
(13, 'Maltrato y/o mala tenencia de mascotas', NULL, '2017-06-09 19:25:16'),
(14, 'Mordedura y/o ataque de perros agresivos', NULL, '2017-06-09 19:25:16'),
(15, 'Criaderos de aves de corral, chancheras y/o animales de pastoreo', NULL, '2017-06-09 19:25:16'),
(16, 'Publicidad exterior silos debidos permisos', NULL, '2017-06-09 19:25:16'),
(17, 'Instalación de antenas y/o bases celulares sin permisos', NULL, '2017-06-09 19:25:16'),
(18, 'Escombros y/o basura en quebradas', NULL, '2017-06-09 19:25:16'),
(19, 'Contaminación excesiva auditiva producida por actividad comercial', NULL, '2017-06-09 19:25:16');

-- --------------------------------------------------------

--
-- Table structure for table `amc_unidades`
--

CREATE TABLE IF NOT EXISTS `amc_unidades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `nombre_completo` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `activo` varchar(5) COLLATE utf8_bin DEFAULT 'true',
  `creado` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `orden` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=21 ;

--
-- Dumping data for table `amc_unidades`
--

INSERT INTO `amc_unidades` (`id`, `nombre`, `nombre_completo`, `activo`, `creado`, `orden`) VALUES
(1, 'Constru y Licen Eugenio Espejo', 'Instrucción - Unidad de Construcciones y Licenciamiento Eugenio Espejo', '1', '2017-06-09 19:25:16', 6),
(2, 'Secretaria', 'Secretaría General', '1', '2017-06-09 19:25:16', 11),
(3, 'Inspeccion', 'Dirección Metropolitana de Inspección', '1', '2017-06-09 19:25:16', 1),
(4, 'Instruccion', 'Dirección Metropolitana de  Instrucción', '1', '2017-06-09 19:25:16', 3),
(5, 'Resolucion y Ejecucion', 'Dirección Metropolitana de Resolución y Ejecución', '1', '2017-06-09 19:25:16', 9),
(6, 'Financiera', 'Dirección Administrativa y Financiera', '1', '2017-06-09 19:25:16', 15),
(7, 'Talento Humano', 'Unidad de Talento Humano', '1', '2017-06-09 19:25:16', 13),
(8, 'Entidades Colaboradoras', 'Coordinación de Entidades Colaboradoras', '1', '2017-06-09 19:25:16', 16),
(9, 'Comunicación Social', 'Comunicación Social', '1', '2017-06-09 19:25:16', 17),
(10, 'Unidad de Planificación', 'Unidad de Planificación', '1', '2017-06-09 19:25:16', 12),
(11, 'Informatica', 'Unidad de Informática', '1', '2017-06-13 16:01:17', 14),
(12, 'Supervision', 'Supervisión Metropolitana de Control', '1', '2017-07-31 15:59:57', 10),
(13, 'Aseo Salud y Ambiente Eugenio Espejo', 'Instruccion Aseo Salud y Ambiente Eugenio Espejo', '1', '2017-07-31 16:00:39', 5),
(14, 'Control de Operativos', 'Inspeccion Control de Operativos', '1', '2017-07-31 16:01:26', 2),
(15, 'DEVUELTO', 'DEVUELTO', '1', '2017-07-31 16:03:37', 18),
(16, 'Laderas de Pichincha Norte', 'Instrucción - Unidad de Construcciones y Licenciamiento Laderas de Pichincha Norte', '1', '2017-07-31 16:04:21', 7),
(17, 'Unidad de Publicidad', 'Instrucción - Unidad de Publicidad', '1', '2017-07-31 16:04:42', 8),
(18, 'Telecomunicaciones', 'Instrucción - Ambiente y Telecomunicaciones', '1', '2017-07-31 16:06:31', 4),
(20, 'Inspeccion- Fauna Urbana', 'Dirección Metropolitana de Inspección- Fauna Urbana', '', '2017-08-01 20:09:57', 20);

-- --------------------------------------------------------

--
-- Table structure for table `amc_zonas`
--

CREATE TABLE IF NOT EXISTS `amc_zonas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `activo` varchar(5) COLLATE utf8_bin DEFAULT 'true',
  `creado` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=11 ;

--
-- Dumping data for table `amc_zonas`
--

INSERT INTO `amc_zonas` (`id`, `nombre`, `activo`, `creado`) VALUES
(1, 'NO ESPECIFICA', '1', '2017-06-09 19:25:16'),
(2, 'LOS CHILLOS', '1', '2017-06-09 19:25:16'),
(3, 'LA MARISCAL', '1', '2017-06-09 19:25:16'),
(4, 'LA DELICIA', '1', '2017-06-09 19:25:16'),
(5, 'QUITUMBE', '1', '2017-06-09 19:25:16'),
(6, 'TUMBACO', '1', '2017-06-09 19:25:16'),
(7, 'CALDERON', '1', '2017-06-09 19:25:16'),
(8, 'MANUELA SAENZ', '1', '2017-06-09 19:25:16'),
(9, 'ELOY ALFARO', '1', '2017-06-09 19:25:16'),
(10, 'EUGENIO ESPEJO', '1', '2017-06-09 19:25:16');

-- --------------------------------------------------------

--
-- Table structure for table `instagram`
--

CREATE TABLE IF NOT EXISTS `instagram` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `instagram` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `kiiconnect_registro`
--

CREATE TABLE IF NOT EXISTS `kiiconnect_registro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(75) DEFAULT NULL,
  `apellido` varchar(75) DEFAULT NULL,
  `ciudad` varchar(75) DEFAULT NULL,
  `edad` varchar(2) DEFAULT NULL,
  `sexo` varchar(1) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `tags` varchar(200) DEFAULT NULL,
  `token` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `neurobion_contactos`
--

CREATE TABLE IF NOT EXISTS `neurobion_contactos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(75) COLLATE utf8_bin DEFAULT NULL,
  `correo` varchar(150) COLLATE utf8_bin DEFAULT NULL,
  `mensaje` text COLLATE utf8_bin,
  `creado` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `noticia`
--

CREATE TABLE IF NOT EXISTS `noticia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(55) COLLATE utf8_bin DEFAULT NULL,
  `url` varchar(250) COLLATE utf8_bin DEFAULT NULL,
  `creado` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=4 ;

--
-- Dumping data for table `noticia`
--

INSERT INTO `noticia` (`id`, `nombre`, `url`, `creado`) VALUES
(1, 'Gaseosas y aceite lideran las compras en tiendas de 10 ', 'http://www.elcomercio.com/datos/gaseosas-aceite-lideran-compras-tiendas.html', '2016-09-29 14:57:48'),
(2, '¿Retiro en el Ídolo para el Capitán?', 'http://www.futbolecuador.com/site/noticia/matias-oyola-confeso-que-aun-no-ha-hablado-sobre-renovar-su-contrato-con-bsc/71314', '2016-09-29 14:57:48'),
(3, '“Héroes de verdad” (VIDEO)', 'http://www.futbolecuador.com/site/noticia/orgulloso-cristhian-noboa-posteo-un-emotivo-mensaje/71317', '2016-09-29 14:57:48');

-- --------------------------------------------------------

--
-- Table structure for table `qo_groups`
--

CREATE TABLE IF NOT EXISTS `qo_groups` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(35) DEFAULT NULL,
  `description` text,
  `active` tinyint(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `qo_groups`
--

INSERT INTO `qo_groups` (`id`, `name`, `description`, `active`) VALUES
(1, 'Administrador', 'Administrador ', 1),
(2, 'Administrador Secretaria General', 'Administrador  Secretaria General', 1),
(3, 'Secretaria General', 'Usuarios Secretaria General', 1),
(4, 'Zonales', 'Usuarios  Zonales  Secretaria General', 1),
(5, 'Denuncias WEB', 'Denuncias WEB  Secretaria General', 1),
(6, 'Inspeccion', 'Denuncias Inspeccion', 1),
(7, 'Supervision', 'Usuarios Supervision', 1);

-- --------------------------------------------------------

--
-- Table structure for table `qo_groups_has_members`
--

CREATE TABLE IF NOT EXISTS `qo_groups_has_members` (
  `qo_groups_id` int(11) unsigned NOT NULL DEFAULT '0',
  `qo_members_id` int(11) unsigned NOT NULL DEFAULT '0',
  `active` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT 'Is the member currently active in this group',
  `admin` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT 'Is the member the administrator of this group',
  PRIMARY KEY (`qo_members_id`,`qo_groups_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `qo_groups_has_members`
--

INSERT INTO `qo_groups_has_members` (`qo_groups_id`, `qo_members_id`, `active`, `admin`) VALUES
(1, 1, 1, 1),
(1, 2, 1, 0),
(2, 2, 1, 0),
(3, 2, 1, 0),
(4, 2, 1, 0),
(5, 2, 1, 0),
(6, 2, 1, 0),
(1, 3, 1, 0),
(2, 3, 1, 0),
(3, 3, 1, 0),
(4, 3, 1, 0),
(5, 3, 1, 0),
(6, 3, 1, 0),
(2, 4, 1, 0),
(3, 5, 1, 0),
(4, 6, 1, 0),
(3, 7, 1, 0),
(5, 28, 1, 0),
(5, 29, 1, 0),
(3, 30, 1, 0),
(3, 31, 1, 0),
(3, 32, 1, 0),
(7, 33, 1, 0),
(7, 34, 1, 0),
(7, 35, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `qo_groups_has_privileges`
--

CREATE TABLE IF NOT EXISTS `qo_groups_has_privileges` (
  `qo_groups_id` int(11) unsigned NOT NULL DEFAULT '0',
  `qo_privileges_id` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`qo_groups_id`,`qo_privileges_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `qo_groups_has_privileges`
--

INSERT INTO `qo_groups_has_privileges` (`qo_groups_id`, `qo_privileges_id`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(7, 7);

-- --------------------------------------------------------

--
-- Table structure for table `qo_libraries`
--

CREATE TABLE IF NOT EXISTS `qo_libraries` (
  `id` varchar(35) NOT NULL DEFAULT '',
  `data` text COMMENT 'The definition data ( JSON )',
  `active` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT 'A value of 1 or 0 is expected',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `qo_libraries`
--

INSERT INTO `qo_libraries` (`id`, `data`, `active`) VALUES
('checkbox-combo', '{\r\n   "client": {\r\n      "css": [\r\n         {\r\n            "directory": "checkbox-combo/",\r\n            "files": [ "Ext.ux.form.CheckboxCombo.min.css" ]\r\n         }\r\n      ],\r\n      "javascript": [\r\n         {\r\n            "directory": "checkbox-combo/",\r\n            "files": [ "Ext.ux.form.CheckboxCombo.min.js" ]\r\n         }\r\n      ]\r\n   }\r\n}', 1),
('colorpicker', '{\r\n   "dependencies": [\r\n      { "id": "hexfield", "type": "library" }\r\n   ],\r\n\r\n   "client": {\r\n      "css": [\r\n         {\r\n           "directory": "color-picker/resources/",\r\n           "files": [ "styles.css" ]\r\n         }\r\n      ],\r\n      "javascript": [\r\n         {\r\n            "directory": "color-picker/",\r\n            "files": [ "Ext.ux.ColorPicker.js" ]\r\n         }\r\n      ]\r\n   }\r\n}', 1),
('columntree', '{\r\n   "client": {\r\n      "css": [\r\n         {\r\n            "directory": "column-tree/resources/",\r\n            "files": [ "styles.css" ]\r\n         }\r\n      ]\r\n   }\r\n}', 1),
('explorerview', '{\r\n   "client": {\r\n      "css": [\r\n         {\r\n            "directory": "explorer-view/resources/",\r\n            "files": [ "styles.css" ]\r\n         }\r\n      ],\r\n      "javascript": [\r\n         {\r\n            "directory": "explorer-view/",\r\n            "files": [ "Ext.ux.grid.ExplorerView.js", "Ext.ux.grid.GroupingExplorerView.js" ]\r\n         }\r\n      ]\r\n   }\r\n}', 1),
('hexfield', '{\r\n   "client": {\r\n      "javascript": [\r\n         {\r\n            "directory": "hex-field/",\r\n            "files": [ "Ext.ux.form.HexField.js" ]\r\n         }\r\n      ]\r\n   }\r\n}', 1),
('iframecomponent', '{\r\n   "client": {\r\n      "javascript": [\r\n         {\r\n            "directory": "iframe-component/",\r\n            "files": [ "Ext.ux.IFrameComponent.js" ]\r\n         }\r\n      ]\r\n   }\r\n}', 1),
('modalnotice', '{\r\n   "client": {\r\n      "javascript": [\r\n         {\r\n            "directory": "modal-notice/",\r\n            "files": [ "Ext.plugin.ModalNotice.js" ]\r\n         }\r\n      ]\r\n   }\r\n}', 1),
('roweditor', '{\r\n   "client": {\r\n      "css": [\r\n         {\r\n            "directory": "row-editor/resources/",\r\n            "files": [ "styles.css" ]\r\n         }\r\n      ],\r\n      "javascript": [\r\n         {\r\n            "directory": "row-editor/",\r\n            "files": [ "Ext.ux.grid.RowEditor.js" ]\r\n         }\r\n      ]\r\n   }\r\n}', 1),
('statusbar', '{\r\n   "client": {\r\n      "javascript": [\r\n         {\r\n            "directory": "statusbar/",\r\n            "files": [ "Ext.ux.StatusBar.js" ]\r\n         }\r\n      ]\r\n   }\r\n}', 1);

-- --------------------------------------------------------

--
-- Table structure for table `qo_log`
--

CREATE TABLE IF NOT EXISTS `qo_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `level` varchar(15) DEFAULT NULL COMMENT 'ERROR, WARNING, MESSAGE or AUDIT',
  `text` text,
  `timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=62 ;

--
-- Dumping data for table `qo_log`
--

INSERT INTO `qo_log` (`id`, `level`, `text`, `timestamp`) VALUES
(1, 'ERROR', 'In validate_module() of os.php, Missing module file (C:/Program Files (x86)/Zend/Apache2/htdocs/amc-denuncias/modules/desktop/denuncias/client/calendar-all-debug.js) for module id denuncias', '2017-06-13 08:45:10'),
(2, 'ERROR', 'In validate_module() of os.php, Missing module file (C:/Program Files (x86)/Zend/Apache2/htdocs/amc-denuncias/modules/desktop/denuncias/client/calendar-all-debug.js) for module id denuncias', '2017-06-13 08:45:11'),
(3, 'ERROR', 'Script: QoAdmin.php, Method: add_to_group, Message: PDO error code - HY000', '2017-06-22 12:54:04'),
(4, 'ERROR', 'Script: QoAdmin.php, Method: add_to_group, Message: PDO error code - HY000', '2017-06-22 12:54:09'),
(5, 'ERROR', 'Script: QoAdmin.php, Method: add_to_group, Message: PDO error code - HY000', '2017-06-22 12:54:25'),
(6, 'ERROR', 'Script: QoAdmin.php, Method: add_to_group, Message: PDO error code - HY000', '2017-06-22 12:55:08'),
(7, 'ERROR', 'Script: QoAdmin.php, Method: add_to_group, Message: PDO error code - HY000', '2017-06-22 12:57:02'),
(8, 'ERROR', 'Script: QoAdmin.php, Method: add_to_group, Message: PDO error code - HY000', '2017-06-22 12:57:47'),
(9, 'ERROR', 'Script: QoAdmin.php, Method: add_to_group, Message: PDO error code - HY000', '2017-06-22 13:35:35'),
(10, 'ERROR', 'Script: QoAdmin.php, Method: add_to_group, Message: PDO error code - HY000', '2017-06-22 14:30:31'),
(11, 'ERROR', 'Script: QoAdmin.php, Method: add_to_group, Message: PDO error code - HY000', '2017-07-17 11:47:38'),
(12, 'ERROR', 'Script: QoAdmin.php, Method: add_to_group, Message: PDO error code - HY000', '2017-07-17 11:48:51'),
(13, 'ERROR', 'Script: QoAdmin.php, Method: add_to_group, Message: PDO error code - HY000', '2017-07-17 11:49:02'),
(14, 'ERROR', 'Script: QoAdmin.php, Method: add_to_group, Message: PDO error code - HY000', '2017-07-17 11:49:34'),
(15, 'ERROR', 'Script: QoAdmin.php, Method: add_to_group, Message: PDO error code - HY000', '2017-07-17 12:02:57'),
(16, 'ERROR', 'Script: QoAdminGroup.php, Method: add_group, Message: PDO error code - HY000', '2017-07-17 12:40:58'),
(17, 'ERROR', 'Script: QoAdminPrivilege.php, Method: add, Message: PDO error code - HY000', '2017-07-17 12:43:42'),
(18, 'ERROR', 'Script: QoAdminPrivilege.php, Method: add, Message: PDO error code - HY000', '2017-07-17 12:44:44'),
(19, 'ERROR', 'Script: QoAdminPrivilege.php, Method: add, Message: PDO error code - HY000', '2017-07-17 12:44:53'),
(20, 'ERROR', 'Script: QoAdminPrivilege.php, Method: add, Message: PDO error code - HY000', '2017-07-17 12:45:23'),
(21, 'ERROR', 'Script: QoAdminPrivilege.php, Method: add, Message: PDO error code - HY000', '2017-07-17 12:46:09'),
(22, 'ERROR', 'Script: QoAdminPrivilege.php, Method: add, Message: PDO error code - HY000', '2017-07-17 12:52:52'),
(23, 'ERROR', 'Script: QoAdminGroup.php, Method: add_group, Message: PDO error code - HY000', '2017-07-17 13:00:45'),
(24, 'ERROR', 'Script: QoAdminGroup.php, Method: edit_group, Message: PDO error code - HY000', '2017-07-17 13:51:18'),
(25, 'ERROR', 'Script: QoAdminGroup.php, Method: edit_group, Message: PDO error code - HY000', '2017-07-17 13:51:39'),
(26, 'ERROR', 'Script: QoAdminGroup.php, Method: edit_group, Message: PDO error code - HY000', '2017-07-17 14:04:05'),
(27, 'ERROR', 'Script: QoAdmin.php, Method: edit_member, Message: PDO error code - HY000', '2017-07-17 14:37:12'),
(28, 'ERROR', 'Script: QoAdmin.php, Method: edit_member, Message: PDO error code - HY000', '2017-07-17 14:37:38'),
(29, 'ERROR', 'Script: QoAdmin.php, Method: edit_member, Message: PDO error code - HY000', '2017-07-17 14:38:10'),
(30, 'ERROR', '{ "script": "privilege.php", "method": "get_by_id", "message": "In the qo_privileges table, row id: 5 has data that could not be decoded" }', '2017-07-17 14:49:50'),
(31, 'ERROR', '{ "script": "privilege.php", "method": "get_by_id", "message": "In the qo_privileges table, row id: 5 has data that could not be decoded" }', '2017-07-17 14:49:50'),
(32, 'ERROR', '{ "script": "privilege.php", "method": "get_by_id", "message": "In the qo_privileges table, row id: 5 has data that could not be decoded" }', '2017-07-17 14:49:50'),
(33, 'ERROR', '{ "script": "privilege.php", "method": "get_by_id", "message": "In the qo_privileges table, row id: 5 has data that could not be decoded" }', '2017-07-17 14:49:50'),
(34, 'ERROR', '{ "script": "privilege.php", "method": "get_by_id", "message": "In the qo_privileges table, row id: 5 has data that could not be decoded" }', '2017-07-17 14:49:50'),
(35, 'ERROR', '{ "script": "privilege.php", "method": "get_by_id", "message": "In the qo_privileges table, row id: 5 has data that could not be decoded" }', '2017-07-17 14:49:50'),
(36, 'ERROR', '{ "script": "privilege.php", "method": "get_by_id", "message": "In the qo_privileges table, row id: 5 has data that could not be decoded" }', '2017-07-17 14:49:50'),
(37, 'ERROR', '{ "script": "privilege.php", "method": "get_by_id", "message": "In the qo_privileges table, row id: 5 has data that could not be decoded" }', '2017-07-17 14:49:51'),
(38, 'ERROR', '{ "script": "privilege.php", "method": "get_by_id", "message": "In the qo_privileges table, row id: 5 has data that could not be decoded" }', '2017-07-17 14:49:51'),
(39, 'ERROR', '{ "script": "privilege.php", "method": "get_by_id", "message": "In the qo_privileges table, row id: 5 has data that could not be decoded" }', '2017-07-17 14:49:51'),
(40, 'ERROR', '{ "script": "privilege.php", "method": "get_by_id", "message": "In the qo_privileges table, row id: 5 has data that could not be decoded" }', '2017-07-17 14:49:52'),
(41, 'ERROR', '{ "script": "privilege.php", "method": "get_by_id", "message": "In the qo_privileges table, row id: 5 has data that could not be decoded" }', '2017-07-17 14:49:52'),
(42, 'ERROR', '{ "script": "privilege.php", "method": "get_by_id", "message": "In the qo_privileges table, row id: 5 has data that could not be decoded" }', '2017-07-17 14:49:52'),
(43, 'ERROR', '{ "script": "privilege.php", "method": "get_by_id", "message": "In the qo_privileges table, row id: 5 has data that could not be decoded" }', '2017-07-17 14:49:52'),
(44, 'ERROR', '{ "script": "privilege.php", "method": "get_by_id", "message": "In the qo_privileges table, row id: 5 has data that could not be decoded" }', '2017-07-17 14:49:52'),
(45, 'ERROR', 'Script: privilege.php, Method: get_all, Message: ''qo_privileges'' table, ''id'' 5 has ''data'' that could not be decoded', '2017-07-17 14:52:18'),
(46, 'ERROR', 'Script: privilege.php, Method: get_all, Message: ''qo_privileges'' table, ''id'' 6 has ''data'' that could not be decoded', '2017-07-17 14:52:18'),
(47, 'ERROR', 'Script: privilege.php, Method: get_all, Message: ''qo_privileges'' table, ''id'' 5 has ''data'' that could not be decoded', '2017-07-17 14:52:26'),
(48, 'ERROR', 'Script: privilege.php, Method: get_all, Message: ''qo_privileges'' table, ''id'' 6 has ''data'' that could not be decoded', '2017-07-17 14:52:26'),
(49, 'ERROR', 'Script: privilege.php, Method: get_all, Message: ''qo_privileges'' table, ''id'' 5 has ''data'' that could not be decoded', '2017-07-17 14:52:29'),
(50, 'ERROR', 'Script: privilege.php, Method: get_all, Message: ''qo_privileges'' table, ''id'' 6 has ''data'' that could not be decoded', '2017-07-17 14:52:29'),
(51, 'ERROR', '{ "script": "privilege.php", "method": "get_by_id", "message": "In the qo_privileges table, row id: 5 has data that could not be decoded" }', '2017-07-17 14:52:50'),
(52, 'ERROR', 'Script: privilege.php, Method: get_all, Message: ''qo_privileges'' table, ''id'' 6 has ''data'' that could not be decoded', '2017-07-17 14:53:15'),
(53, 'ERROR', 'Script: privilege.php, Method: get_all, Message: ''qo_privileges'' table, ''id'' 6 has ''data'' that could not be decoded', '2017-07-17 14:53:29'),
(54, 'ERROR', 'Script: privilege.php, Method: get_all, Message: ''qo_privileges'' table, ''id'' 6 has ''data'' that could not be decoded', '2017-07-17 14:53:40'),
(55, 'ERROR', 'Script: privilege.php, Method: get_all, Message: ''qo_privileges'' table, ''id'' 6 has ''data'' that could not be decoded', '2017-07-17 14:53:43'),
(56, 'ERROR', 'Script: privilege.php, Method: get_all, Message: ''qo_privileges'' table, ''id'' 6 has ''data'' that could not be decoded', '2017-07-17 14:53:45'),
(57, 'ERROR', 'Script: privilege.php, Method: get_all, Message: ''qo_privileges'' table, ''id'' 6 has ''data'' that could not be decoded', '2017-07-17 14:53:48'),
(58, 'ERROR', 'Script: privilege.php, Method: get_all, Message: ''qo_privileges'' table, ''id'' 6 has ''data'' that could not be decoded', '2017-07-17 14:53:52'),
(59, 'ERROR', 'Script: privilege.php, Method: get_all, Message: ''qo_privileges'' table, ''id'' 6 has ''data'' that could not be decoded', '2017-07-17 14:53:55'),
(60, 'ERROR', '{ "script": "privilege.php", "method": "get_by_id", "message": "In the qo_privileges table, row id: 6 has data that could not be decoded" }', '2017-07-17 14:54:15'),
(61, 'ERROR', '{ "script": "privilege.php", "method": "get_by_id", "message": "In the qo_privileges table, row id: 7 has data that could not be decoded" }', '2017-08-04 09:33:55');

-- --------------------------------------------------------

--
-- Table structure for table `qo_members`
--

CREATE TABLE IF NOT EXISTS `qo_members` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(25) DEFAULT NULL,
  `last_name` varchar(35) DEFAULT NULL,
  `email_address` varchar(55) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `locale` varchar(5) DEFAULT 'en',
  `active` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT 'Is the member currently active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=36 ;

--
-- Dumping data for table `qo_members`
--

INSERT INTO `qo_members` (`id`, `first_name`, `last_name`, `email_address`, `password`, `locale`, `active`) VALUES
(1, 'Byron', 'Herrera', 'byron.herrera@quito.gob.ec', '6b27fdf8b28e0d28cc0c98f5baa92a7199f8e046', 'en', 1),
(2, 'Cevallos', 'Paul ', 'paul.cevallos@quito.gob.ec', 'dd82b246785efbd15d162553e4c767ae60766f93', 'en', 1),
(3, 'general', 'administrador', 'administrador@quito.gob.ec', 'c4e1ffe2666cc5d643c14d10eb2ff04abf4819fa', 'en', 1),
(4, 'RITA', 'AGUILAR', 'rita.aguilar@quito.gob.ec', '5d13c3a5b8431697b582f1d32d40a73bb700057a', 'en', 1),
(5, 'NATALIA', 'MARMOL', 'natalia.marmol@quito.gob.ec', '2ed0086332f5cefc10998719cf9b948817e1a13a', 'en', 1),
(6, 'FERNANDO XAVIER', 'AGUILAR', 'fernando.aguilar@quito.gob.ec', 'e799651b46c9fe447b3f687f200ac26b1e3e615b', 'en', 1),
(7, 'TANYA', 'ORTEGA', 'tanya.ortega@quito.gob.ec', '1f3729b324be3d6f7b4e8d62f4b75f16313960e8', 'en', 1),
(8, 'FEDERICO SANTIAGO ', 'AGUAS MORA ', 'faguas@quito.gob.ec', '984bfd64990dacfcfeadd1d742d60ee9e508d31b', 'en', 1),
(9, 'ALEX FABIAN', 'AGUIRRE SALAZAR ', 'aaguirre@quito.gob.ec', '1958ea6c77ba6ee7c95e7bba57013ae7afa47074', 'en', 1),
(10, 'ANA BELEN', 'CABRERA BORJA ', 'anacabrera@quito.gob.ec', '6f09cbe54a9028aa90bc92bc767966bcb7e7b7cf', 'en', 1),
(11, 'GLORIA CECIBEL', 'ESCALANTE VITERI  ', 'gescalante@quito.gob.ec', '344918dbe0dab9be3fb08b4df563bcdaa9b3d93e', 'en', 1),
(12, ' ARNALDO ANDRES', 'ESPINOZA CALLE', 'aespinoza@quito.gob.ec', '682b9cd8512d73a8be7660cf659454e9155adb12', 'en', 1),
(13, 'CESAR RICARDO', 'GALARZA MERO ', 'cgalarza@quito.gob.ec', '64ad48ebbc58e35c220838472182b48b6549f25c', 'en', 1),
(14, 'DANNY EDMUNDO', 'GONGORA VILLAFUERTE ', 'dgongora@quito.gob.ec', 'd7f3c335c4bda77e9b79a9b43a51babe72eeeb20', 'en', 1),
(15, 'HUGO ARTURO', 'TERAN IMBAQUINGO ', 'hteran@quito.gob.ec', '8f2187a1d4aa4fa41b7bde432abee9c9f93f6728', 'en', 1),
(16, 'SARA ALEJANDRA', 'VALDOSPINOS NAVAS ', 'svaldospinos@quito.gob.ec', '9b33b19e6dafb3748ed537560bd4b553cc304ac6', 'en', 1),
(17, 'VERONICA CRISTINA', 'ZAPATA JARAMILLO ', 'vzapata@quito.gob.ec', '85e863eeb01a158cbcf115bc12430d4a84f53b27', 'en', 1),
(18, 'DANIELA ALEXANDRA', 'BARZALLO RIVADENEIRA ', 'dbarzallo@quito.gob.ec', '8e1175d9d3ac823578dcc8a1ad1ed10cf43edcb6', 'en', 1),
(19, 'PATRICIO VASCO', 'CERON MONTENEGRO ', 'pceron@quito.gob.ec', 'a849a939b0d1da506baed32ec84d63a6507471aa', 'en', 1),
(20, ' SANTIAGO', 'CHACON TALEYSSAT', 'schacon@quito.gob.ec', '7af8db61f0c1a4273d783a7bf9a9bebef247908d', 'en', 1),
(21, 'GIANINNA NOEMI', 'HOLGUIN SCACCO ', 'gholgin@quito.gob.ec', 'ad1a02f02a20c1248087f9eb1b55ae1d12acda90', 'en', 1),
(22, 'PABLO ALBERTO', 'LEDESMA ALAVA ', 'pledesma@quito.gob.ec', 'aaaa6e5cef8a381b1878bfd65ed3b0b26186f0f5', 'en', 1),
(23, 'JORGE LUIS', 'LOMBEIDA ', 'jlombeida@quito.gob.ec', '0f1c5589df7191376e0984758778330120b76f10', 'en', 1),
(24, 'CATHERINE PAULINA', 'MARTINEZ BALDEON  ', 'cmartinez@quito.gob.ec', '430f611372c5f246af80b1763afab65b48be24b0', 'en', 1),
(25, 'ALVARO SEBASTIAN', 'MORA CAPIO ', 'amora@quito.gob.ec', '945ae7793493a7fe32ce091f19120af146a27be2', 'en', 1),
(26, 'LADY ELIZABETH', 'SALAZAR NARVAEZ ', 'inspeccion@quito.gob.ec', 'ff7e253150d7380a4f879d6ebb0f0dec5a32433a', 'en', 1),
(27, 'GEOVANY FRANCISCO', 'SILVA REINA ', 'gsilva@quito.gob.ec', '6fbf849b29e567da6d1ef8d6519bb0968f5f896f', 'en', 1),
(28, '1', 'Comisaria', 'comisaria@quito.gob.ec', '138a2f1f342ffb5e67aeb81875d253e6f045eac8', 'en', 1),
(29, 'comunicacion', 'amc', 'amccom@quito.gob.ec', 'f3fe6b5c2236aa1e2fb25f93eb0adbe7a3d511a6', 'en', 1),
(30, 'KATHERINE', 'FERAUD', 'katherine.feraud@quito.gob.ec', 'efab24c8e0c66c63eb77241fb678b2a56d698587', 'en', 1),
(31, 'FERNANDEZ', 'RICHARD', 'richard.fernandez@quito.gob.ec', 'c9959467fec9e956dd41d2d0e3f7880c9ee999ea', 'en', 1),
(33, 'Andreina', 'Gomez', 'andreina.gomez@quito.gob.ec', 'a8f53c86e6e1fa85882544476bfdfd5c22c5ae19', 'en', 1),
(34, 'Paulina', 'Flores', 'paulina.flores@quito.gob.ec', '3a982f3e740aab729a73414e4f0ef53ed50c9976', 'en', 1),
(35, 'PaÃºl', 'Hidalgo', 'paul.hidalgo@quito.gob.ec', 'dedce45bb6d418c30ffd04f29fa2c37e7ad6e8e8', 'en', 1);

-- --------------------------------------------------------

--
-- Table structure for table `qo_modules`
--

CREATE TABLE IF NOT EXISTS `qo_modules` (
  `id` varchar(35) NOT NULL DEFAULT '',
  `type` varchar(35) NOT NULL,
  `name` varchar(35) DEFAULT NULL,
  `description` text,
  `data` text NOT NULL COMMENT 'The definition data ( JSON )',
  `active` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT 'A value of 1 or 0 is expected',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `qo_modules`
--

INSERT INTO `qo_modules` (`id`, `type`, `name`, `description`, `data`, `active`) VALUES
('canal', 'desktop/canal', 'Canal', 'Adminsitracion de canales', '{\n    "id": "canal",\n    "type": "desktop/canal",\n    "about": {\n        "author": "",\n        "description": "Mantenimiento de Canal.",\n        "name": "Ventana Canal",\n        "url": "",\n        "version": "1.0"\n    },\n\n    "client": {\n        "class": "QoDesk.CanalWindow",\n        "css": [\n            {\n                "directory": "desktop/canal/client/resources/",\n                "files": [ "styles.css" ]\n            }\n        ],\n        "javascript": [\n            {\n                "directory": "desktop/canal/client/",\n                "files": [ "canal-win.js" ]\n            }\n        ],\n        "launcher": {\n            "config": {\n                "iconCls": "canal-icon",\n                "shortcutIconCls": "canal-shortcut",\n                "text": "Canal",\n                "tooltip": "<b>Canal</b>"\n            },\n            "paths": {\n                "startmenu": "/"\n            }\n        }\n    }\n}', 0),
('denuncias', 'desktop/denuncias', 'Denuncias', 'Administracion denuncias ', '{\n  "id": "denuncias",\n  "type": "desktop/denuncias",\n  "about": {\n    "author": "",\n    "description": "Mantenimiento de Denuncias.",\n    "name": "Ventana Denuncias",\n    "url": "",\n    "version": "1.0"\n  },\n  "server": {\n      "methods": [\n         { "name": "accesosAdministrador", "description": "Full acceso" },\n         { "name": "accesosSecretaria", "description": "Full acceso" },\n         { "name": "accesosZonales", "description": "Personal de zonales" }\n\n      ],\n      "class": "QoDenuncias",\n      "file": "desktop/denuncias/denuncias.php"\n  },\n  "client": {\n    "class": "QoDesk.DenunciasWindow",\n    "css": [\n      {\n        "directory": "desktop/denuncias/client/resources/",\n        "files": [ "styles.css" ]\n      },\n			{\n        "directory": "common/libraries/",\n        "files": [ "datetime/date-time-ux.css", "Spinner/Spinner.css", "MultiSelect.css"  ]\n      }\n    ],\n    "javascript": [\n      {\n        "directory": "desktop/denuncias/client/",\n        "files": [  "denuncias-win.js" ]\n      },\n			{\n        "directory": "common/libraries/",\n        "files": [ "datetime/date-time-ux.js","CheckColumn.js", "Spinner/SpinnerField.js", "Spinner/Spinner.js","MultiSelect.js"  ]\n      },\n			{\n        "directory": "qwiki/admin/client/",\n        "files": [ "QoAdmin.js" ]\n      },\n			{\n				"directory": "qwiki/admin/client/lib/",\n        "files": [ "ActiveColumn.js", "ColumnNodeUI.js", "Nav.js", "SearchField.js", "TooltipEditor.js" ]\n      }\n    ],\n    "launcher": {\n      "config": {\n        "iconCls": "denuncias-icon",\n        "shortcutIconCls": "denuncias-shortcut",\n        "text": "Denuncias",\n        "tooltip": "<b>Denuncias</b>"\n      },\n      "paths": {\n        "startmenu": "/"\n      }\n    }\n  }\n}\n', 1),
('denunciasinspeccion', 'desktop/denunciasinspeccion', 'Denuncias- Dirección Inspección', 'Administrador - Denuncias  - Dirección Inspeccion', '{\r\n  "id": "denunciasinspeccion",\r\n  "type": "desktop/denunciasinspeccion",\r\n  "about": {\r\n    "author": "",\r\n    "description": "Mantenimiento de Denuncias inspeccion.",\r\n    "name": "Ventana Denuncias inspeccion",\r\n    "url": "",\r\n    "version": "1.0"\r\n  },\r\n\r\n  "client": {\r\n    "class": "QoDesk.DenunciasinspeccionWindow",\r\n    "css": [\r\n      {\r\n        "directory": "desktop/denunciasinspeccion/client/resources/",\r\n        "files": [ "styles.css", "css/MultiSelect.css" ]\r\n      },\r\n			{\r\n        "directory": "common/libraries/datetime/",\r\n        "files": [ "date-time-ux.css" ]\r\n      }\r\n    ],\r\n    "javascript": [\r\n      {\r\n        "directory": "desktop/denunciasinspeccion/client/",\r\n        "files": [ "denunciasinspeccion-win.js","MultiSelect.js" ]\r\n      },\r\n			{\r\n        "directory": "common/libraries/datetime/",\r\n        "files": [ "date-time-ux.js" ]\r\n      }\r\n    ],\r\n    "launcher": {\r\n      "config": {\r\n        "iconCls": "denunciasinspeccion-icon",\r\n        "shortcutIconCls": "denunciasinspeccion-shortcut",\r\n        "text": "Denuncias Inspeccion",\r\n        "tooltip": "<b>Denuncias - Direccion inspeccion</b>"\r\n      },\r\n      "paths": {\r\n        "startmenu": "/"\r\n      }\r\n    }\r\n  }\r\n}', 1),
('denunciassecretaria', 'desktop/denunciassecretaria', 'Denuncias - Secretaria', 'Administrador de denuncias - secretaria general', '{\r\n  "id": "denunciassecretaria",\r\n  "type": "desktop/denunciassecretaria",\r\n  "about": {\r\n    "author": "",\r\n    "description": "Mantenimiento de Denuncias secretaria.",\r\n    "name": "Ventana Denuncias secretaria",\r\n    "url": "",\r\n    "version": "1.0"\r\n  },\r\n\r\n  "client": {\r\n    "class": "QoDesk.DenunciassecretariaWindow",\r\n    "css": [\r\n      {\r\n        "directory": "desktop/denunciassecretaria/client/resources/",\r\n        "files": [ "styles.css"]\r\n      },\r\n			{\r\n        "directory": "common/libraries/datetime/",\r\n        "files": [ "date-time-ux.css" ]\r\n      }\r\n    ],\r\n    "javascript": [\r\n      {\r\n        "directory": "desktop/denunciassecretaria/client/",\r\n        "files": [  "denunciassecretaria-win.js" ]\r\n      },\r\n			{\r\n        "directory": "common/libraries/datetime/",\r\n        "files": [ "date-time-ux.js" ]\r\n      }\r\n    ],\r\n    "launcher": {\r\n      "config": {\r\n        "iconCls": "denunciassecretaria-icon",\r\n        "shortcutIconCls": "denunciassecretaria-shortcut",\r\n        "text": "Denuncias secretaria",\r\n        "tooltip": "<b>Denuncias secretaria</b>"\r\n      },\r\n      "paths": {\r\n        "startmenu": "/"\r\n      }\r\n    }\r\n  }\r\n}\r\n ', 0),
('denunciasweb', 'desktop/denunciasweb', 'DenunciasWeb', 'DenunciasWeb', '{\r\n  "id": "denunciasweb",\r\n  "type": "desktop/denunciasweb",\r\n  "about": {\r\n    "author": "",\r\n    "description": "Mantenimiento de Denunciasweb.",\r\n    "name": "Ventana Denunciasweb",\r\n    "url": "",\r\n    "version": "1.0"\r\n  },\r\n  "server": {\r\n      "methods": [\r\n         { "name": "grabarDenuncia", "description": "Grabar Denuncias" } \r\n      ],\r\n      "class": "QoDenunciasWeb",\r\n      "file": "desktop/denunciasweb/denunciasweb.php"\r\n  },\r\n  "client": {\r\n    "class": "QoDesk.DenunciaswebWindow",\r\n    "css": [\r\n      {\r\n        "directory": "desktop/denunciasweb/client/resources/",\r\n        "files": [ "styles.css" ]\r\n      },\r\n      {\r\n        "directory": "common/libraries/",\r\n        "files": [ "datetime/date-time-ux.css", "Spinner/Spinner.css", "MultiSelect.css"  ]\r\n      }\r\n    ],\r\n    "javascript": [\r\n      {\r\n        "directory": "desktop/denunciasweb/client/",\r\n        "files": [  "denunciasweb-win.js" ]\r\n      },\r\n      {\r\n        "directory": "common/libraries/",\r\n        "files": [ "datetime/date-time-ux.js","CheckColumn.js", "Spinner/SpinnerField.js", "Spinner/Spinner.js","MultiSelect.js"  ]\r\n      },\r\n      {\r\n        "directory": "qwiki/admin/client/",\r\n        "files": [ "QoAdmin.js" ]\r\n      },\r\n      {\r\n        "directory": "qwiki/admin/client/lib/",\r\n        "files": [ "ActiveColumn.js", "ColumnNodeUI.js", "Nav.js", "SearchField.js", "TooltipEditor.js" ]\r\n      }\r\n    ],\r\n    "launcher": {\r\n      "config": {\r\n        "iconCls": "denunciasweb-icon",\r\n        "shortcutIconCls": "denunciasweb-shortcut",\r\n        "text": "Denunciasweb",\r\n        "tooltip": "<b>Denuncias web</b>"\r\n      },\r\n      "paths": {\r\n        "startmenu": "/"\r\n      }\r\n    }\r\n  }\r\n}\r\n', 1),
('enfapromo', 'desktop/enfapromo', 'Enfapromo', 'Enfapromo', '{\n    "id": "enfagrow",\n    "type": "desktop/enfagrow",\n    "about": {\n        "author": "",\n        "description": "Mantenimiento de Enfagrow.",\n        "name": "Ventana Enfagrow",\n        "url": "",\n        "version": "1.0"\n    },\n\n    "client": {\n        "class": "QoDesk.EnfagrowWindow",\n        "css": [\n            {\n                "directory": "desktop/enfagrow/client/resources/",\n                "files": [ "styles.css" ]\n            }\n        ],\n        "javascript": [\n            {\n                "directory": "desktop/enfagrow/client/",\n                "files": [ "enfagrow-win.js" ]\n            }\n        ],\n        "launcher": {\n            "config": {\n                "iconCls": "enfagrow-icon",\n                "shortcutIconCls": "enfagrow-shortcut",\n                "text": "Enfagrow",\n                "tooltip": "<b>Enfagrow</b>"\n            },\n            "paths": {\n                "startmenu": "/"\n            }\n        }\n    }\n}', 0),
('ganaconroyal', 'desktop/ganaconroyal', 'Royal', 'Admin Royal', '{\n  "id": "royal",\n  "type": "desktop/royal",\n  "about": {\n    "author": "",\n    "description": "Mantenimiento de Royal.",\n    "name": "Ventana Royal",\n    "url": "",\n    "version": "1.0"\n  },\n\n  "client": {\n    "class": "QoDesk.RoyalWindow",\n    "css": [\n      {\n        "directory": "desktop/royal/client/resources/",\n        "files": [ "styles.css" ]\n      }\n    ],\n    "javascript": [\n      {\n        "directory": "desktop/royal/client/",\n        "files": [ "royal-win.js" ]\n      }\n    ],\n    "launcher": {\n      "config": {\n        "iconCls": "royal-icon",\n        "shortcutIconCls": "royal-shortcut",\n        "text": "Royal",\n        "tooltip": "<b>Royal</b>"\n      },\n      "paths": {\n        "startmenu": "/"\n      }\n    }\n  }\n}', 0),
('kiiconnect', 'desktop/kiiconnect', 'kiiconnect', 'Admin kiiconnect', '{\n    "id": "kiiconnect",\n    "type": "desktop/kiiconnect",\n    "about": {\n        "author": "",\n        "description": "Mantenimiento de Kiiconnect.",\n        "name": "Ventana Kiiconnect",\n        "url": "",\n        "version": "1.0"\n    },\n\n    "client": {\n        "class": "QoDesk.KiiconnectWindow",\n        "css": [\n            {\n                "directory": "desktop/kiiconnect/client/resources/",\n                "files": [ "styles.css" ]\n            }\n        ],\n        "javascript": [\n            {\n                "directory": "desktop/kiiconnect/client/",\n                "files": [ "kiiconnect-win.js" ]\n            }\n        ],\n        "launcher": {\n            "config": {\n                "iconCls": "kiiconnect-icon",\n                "shortcutIconCls": "kiiconnect-shortcut",\n                "text": "Kiiconnect",\n                "tooltip": "<b>Kiiconnect</b>"\n            },\n            "paths": {\n                "startmenu": "/"\n            }\n        }\n    }\n}', 0),
('programa', 'desktop/programa', 'Programa', 'Administrador de programas', '{\n    "id": "programa",\n    "type": "desktop/programa",\n    "about": {\n        "author": "",\n        "description": "Mantenimiento de Programa.",\n        "name": "Ventana Programa",\n        "url": "",\n        "version": "1.0"\n    },\n\n    "client": {\n        "class": "QoDesk.ProgramaWindow",\n        "css": [\n            {\n                "directory": "desktop/programa/client/resources/",\n                "files": [ "styles.css" ]\n            }\n        ],\n        "javascript": [\n            {\n                "directory": "desktop/programa/client/",\n                "files": [ "programa-win.js" ]\n            }\n        ],\n        "launcher": {\n            "config": {\n                "iconCls": "programa-icon",\n                "shortcutIconCls": "programa-shortcut",\n                "text": "Programa",\n                "tooltip": "<b>Programa</b>"\n            },\n            "paths": {\n                "startmenu": "/"\n            }\n        }\n    }\n}', 0),
('qo-admin', 'system/administration', 'Admin', 'Allows system administration', '{\r\n   "id": "qo-admin",\r\n\r\n   "type": "system/administration",\r\n\r\n   "about": {\r\n      "author": "",\r\n      "description": "",\r\n      "name": "Admin",\r\n      "url": "",\r\n      "version": "1.0"\r\n   },\r\n\r\n   "dependencies": [\r\n      { "id": "columntree", "type": "library" }\r\n   ],\r\n\r\n   "client": {\r\n      "class": "QoDesk.QoAdmin",\r\n      "css": [\r\n         {\r\n            "directory": "qwiki/admin/client/resources/",\r\n            "files": [ "styles.css" ]\r\n         }\r\n      ],\r\n      "javascript": [\r\n         {\r\n            "directory": "qwiki/admin/client/",\r\n            "files": [ "QoAdmin.js" ]\r\n         },\r\n         {\r\n            "directory": "qwiki/admin/client/lib/",\r\n            "files": [ "ActiveColumn.js", "ColumnNodeUI.js", "Nav.js", "SearchField.js", "TooltipEditor.js" ]\r\n         },\r\n         {\r\n            "directory": "qwiki/admin/client/lib/groups/",\r\n            "files": [ "Groups.js", "GroupsTooltipEditor.js" ]\r\n         },\r\n         {\r\n            "directory": "qwiki/admin/client/lib/members/",\r\n            "files": [ "Members.js", "MembersTooltipEditor.js" ]\r\n         },\r\n         {\r\n            "directory": "qwiki/admin/client/lib/privileges/",\r\n            "files": [ "Privileges.js", "PrivilegesTooltipEditor.js" ]\r\n         },\r\n         {\r\n            "directory": "qwiki/admin/client/lib/signups/",\r\n            "files": [ "Signups.js", "SignupsDetail.js", "SignupsGrid.js" ]\r\n         }\r\n      ],\r\n      "launcher": {\r\n         "config": {\r\n            "iconCls": "qo-admin-icon",\r\n            "shortcutIconCls": "qo-admin-shortcut-icon",\r\n            "text": "Admin",\r\n            "tooltip": "<b>Administrador</b><br />Permite configurar el sistema"\r\n         },\r\n         "paths": {\r\n            "startmenu": "/"\r\n         }\r\n      }\r\n   },\r\n\r\n   "server": {\r\n      "methods": [\r\n         { "name": "addGroup", "description": "Add a new group" },\r\n         { "name": "addMember", "description": "Add a new member" },\r\n         { "name": "addPrivilege", "description": "Add a new privilege" },\r\n         { "name": "approveSignupsToGroup", "description": "Approve a signup request" },\r\n         { "name": "deleteGroup", "description": "Delete a group" },\r\n         { "name": "deleteMember", "description": "Delete a member" },\r\n         { "name": "deletePrivilege", "description": "Delete a privilege" },\r\n         { "name": "denySignups", "description": "Deny a signup request" },\r\n         { "name": "editGroup", "description": "Edit a groups information" },\r\n         { "name": "editGroupPrivilege", "description": "Edit what privilege a group is associated with" },\r\n         { "name": "editMember", "description": "Edit a members information" },\r\n         { "name": "editMembersGroups", "description": "Edit what groups a member is associated with" },\r\n         { "name": "editPrivilege", "description": "Edit a privileges information" },\r\n         { "name": "editPrivilegeModules", "description": "Edit what modules and methods a privilege allows" },\r\n         { "name": "viewGroups", "description": "View groups" },\r\n         { "name": "viewGroupPrivileges", "description": "View the privileges available to the group" },\r\n         { "name": "viewMembers", "description": "View members information" },\r\n         { "name": "viewMemberGroups", "description": "View the groups available to the member" },\r\n         { "name": "viewPrivileges", "description": "View privilege information" },\r\n         { "name": "viewPrivilegeModules", "description": "View the modules available to the privilege" },\r\n         { "name": "viewSignups", "description": "View all sign ups" }\r\n      ],\r\n      "class": "QoAdmin",\r\n      "file": "qwiki/admin/server/QoAdmin.php"\r\n   }\r\n}', 1),
('qo-mail', 'email', 'Email', 'Allows users to send and receive email', '{\r\n   "id": "qo-mail",\r\n\r\n   "type": "system/email",\r\n\r\n   "about": {\r\n      "author": "Todd Murdock",\r\n      "description": "Allows users to send and receive email",\r\n      "name": "qWikiMail",\r\n      "url": "www.qwikioffice.com",\r\n      "version": "1.0"\r\n   },\r\n\r\n   "dependencies": [\r\n         { "id": "iframecomponent", "type": "library" }\r\n   ],\r\n\r\n   "client": {\r\n      "class": "QoDesk.QoMail",\r\n      "css": [\r\n         {\r\n            "directory": "qwiki/mail/client/resources/",\r\n            "files": [ "styles.css" ]\r\n         }\r\n      ],\r\n      "javascript": [\r\n         {\r\n            "directory": "qwiki/mail/client/",\r\n            "files": [ "QoMail.js" ]\r\n         }\r\n      ],\r\n      "launcher": {\r\n         "config": {\r\n            "iconCls": "qo-mail-icon",\r\n            "shortcutIconCls": "qo-mail-shortcut-icon",\r\n            "text": "Mail",\r\n            "tooltip": "<b>Mail</b><br />Allows you to send and receive email"\r\n         },\r\n         "paths": {\r\n            "startmenu": "/"\r\n         }\r\n      }\r\n   },\r\n\r\n   "server": {\r\n      "methods": [\r\n         { "name": "loadMemberFolders", "description": "Allow member to load (view) their folders" },\r\n         { "name": "addMemberFolder", "description": "Allow member to add a new folder" }\r\n      ],\r\n      "class": "QoMail",\r\n      "file": "qwiki/mail/server/QoMail.php"\r\n   }\r\n}', 0),
('qo-preferences', 'system/preferences', 'Preferences', 'Allows users to set and save their desktop preferences', '{\r\n   "id": "qo-preferences",\r\n\r\n   "type": "system/preferences",\r\n\r\n   "about": {\r\n      "author": "",\r\n      "description": "",\r\n      "name": "Preferences",\r\n      "url": "www.qwikioffice.com",\r\n      "version": "1.0"\r\n   },\r\n\r\n   "dependencies": [\r\n      { "id": "colorpicker", "type": "library" },\r\n      { "id": "explorerview", "type": "library" },\r\n      { "id": "modalnotice", "type": "library" }\r\n   ],\r\n\r\n   "locale": {\r\n      "class": "QoDesk.QoPreferences.Locale",\r\n      "directory": "qwiki/preferences/client/locale/",\r\n      "extension": ".json",\r\n      "languages": [ "en" ]\r\n   },\r\n\r\n   "client": {\r\n      "class": "QoDesk.QoPreferences",\r\n      "css": [\r\n         {\r\n            "directory": "qwiki/preferences/client/resources/",\r\n            "files": [ "styles.css" ]\r\n         }\r\n      ],\r\n      "javascript": [\r\n         {\r\n            "directory": "qwiki/preferences/client/",\r\n            "files": [ "QoPreferences.js" ]\r\n         },\r\n         {\r\n            "directory": "qwiki/preferences/client/lib/",\r\n            "files": [ "Appearance.js", "AutoRun.js", "Background.js", "CheckTree.js", "Grid.js", "Nav.js", "QuickStart.js", "Shortcuts.js" ]\r\n         }\r\n      ],\r\n      "launcher": {\r\n         "config": {\r\n            "iconCls": "qo-pref-icon",\r\n            "shortcutIconCls": "qo-pref-shortcut-icon",\r\n            "text": "Sistema",\r\n            "tooltip": "<b>Preferencias</b><br />Permite modificar su escritorio"\r\n         },\r\n         "paths": {\r\n            "contextmenu": "/",\r\n            "startmenutool": "/"\r\n         }\r\n      }\r\n   },\r\n\r\n   "server": {\r\n      "methods": [\r\n         { "name": "saveAppearance", "description": "Allow member to save appearance" },\r\n         { "name": "saveAutorun", "description": "Allow member to save which modules run at start up" },\r\n         { "name": "saveBackground", "description": "Allow member to save a wallpaper as the background" },\r\n         { "name": "saveQuickstart", "description": "Allow member to save which modules appear in the Quick Start panel" },\r\n         { "name": "saveShortcut", "description": "Allow member to save which modules appear as a Shortcut" },\r\n         { "name": "viewThemes", "description": "Allow member to view the available themes" },\r\n         { "name": "viewWallpapers", "description": "Allow member to view the available wallpapers" }\r\n      ],\r\n      "class": "QoPreferences",\r\n      "file": "qwiki/preferences/server/QoPreferences.php"\r\n   }\r\n}', 1),
('qo-profile', 'user/profile', 'Profile', 'Allows user profile administration', '{\r\n   "id": "qo-profile",\r\n\r\n   "type": "user/profile",\r\n\r\n   "about": {\r\n      "author": "Todd Murdock",\r\n      "description": "Allows user profile administration",\r\n      "name": "Profile",\r\n      "url": "www.qwikioffice.com",\r\n      "version": "1.0"\r\n   },\r\n\r\n    "dependencies": [\r\n      { "id": "statusbar", "type": "library" }\r\n   ],\r\n\r\n   "locale": {\r\n      "class": "QoDesk.QoProfile.Locale",\r\n      "directory": "qwiki/profile/client/locale/",\r\n      "extension": ".json",\r\n      "languages": [ "en" ]\r\n   },\r\n\r\n   "client": {\r\n      "class": "QoDesk.QoProfile",\r\n      "css": [\r\n         {\r\n            "directory": "qwiki/profile/client/resources/",\r\n            "files": [ "styles.css" ]\r\n         }\r\n      ],\r\n      "javascript": [\r\n         {\r\n            "directory": "qwiki/profile/client/",\r\n            "files": [ "QoProfile.js" ]\r\n         }\r\n      ],\r\n      "launcher": {\r\n         "config": {\r\n            "iconCls": "qo-profile-icon",\r\n            "shortcutIconCls": "qo-profile-shortcut-icon",\r\n            "text": "Perfil",\r\n            "tooltip": "<b>Profile</b><br />Allows user profile administration"\r\n         },\r\n         "paths": {\r\n            "contextmenu": "/",\r\n            "startmenutool": "/"\r\n         }\r\n      }\r\n   },\r\n\r\n   "server": {\r\n      "methods": [\r\n         { "name": "loadProfile", "description": "Load a users profile" },\r\n         { "name": "saveProfile", "description": "Save a members profile" },\r\n         { "name": "savePwd", "description": "Save a members password" }\r\n      ],\r\n      "class": "QoProfile",\r\n      "file": "qwiki/profile/server/QoProfile.php"\r\n   }\r\n}', 1),
('quitoconnect', 'desktop/quitoconnect', 'QuitoConnect', 'Administrador QUITOCONNECT', '{\r\n    "id": "quitoconnect",\r\n    "type": "desktop/quitoconnect",\r\n    "about": {\r\n        "author": "",\r\n        "description": "Mantenimiento de Quitoconnect.",\r\n        "name": "Ventana Quitoconnect",\r\n        "url": "",\r\n        "version": "1.0"\r\n    },\r\n\r\n    "client": {\r\n        "class": "QoDesk.QuitoconnectWindow",\r\n        "css": [\r\n            {\r\n                "directory": "desktop/quitoconnect/client/resources/",\r\n                "files": [ "styles.css" ]\r\n            }\r\n        ],\r\n        "javascript": [\r\n            {\r\n                "directory": "desktop/quitoconnect/client/",\r\n                "files": [ "quitoconnect-win.js" ]\r\n            }\r\n        ],\r\n        "launcher": {\r\n            "config": {\r\n                "iconCls": "quitoconnect-icon",\r\n                "shortcutIconCls": "quitoconnect-shortcut",\r\n                "text": "Quitoconnect",\r\n                "tooltip": "<b>Quitoconnect</b>"\r\n            },\r\n            "paths": {\r\n                "startmenu": "/"\r\n            }\r\n        }\r\n    }\r\n}', 0),
('samsung', 'desktop/samsung', 'Samsung', 'Admin promos samsung', '{\n    "id": "samsung",\n    "type": "desktop/samsung",\n    "about": {\n        "author": "",\n        "description": "Mantenimiento de Samsung.",\n        "name": "Ventana Samsung",\n        "url": "",\n        "version": "1.0"\n    },\n\n    "client": {\n        "class": "QoDesk.SamsungWindow",\n        "css": [\n            {\n                "directory": "desktop/samsung/client/resources/",\n                "files": [ "styles.css" ]\n            }\n        ],\n        "javascript": [\n            {\n                "directory": "desktop/samsung/client/",\n                "files": [ "samsung-win.js" ]\n            }\n        ],\n        "launcher": {\n            "config": {\n                "iconCls": "samsung-icon",\n                "shortcutIconCls": "samsung-shortcut",\n                "text": "Samsung",\n                "tooltip": "<b>Samsung</b>"\n            },\n            "paths": {\n                "startmenu": "/"\n            }\n        }\n    }\n}', 0),
('xmltv', 'desktop/xmltv', 'XMLTV', 'Administrador XMLTV', '{\n  "id": "xmltv",\n  "type": "desktop/xmltv",\n  "about": {\n    "author": "",\n    "description": "Mantenimiento de Xmltv.",\n    "name": "Ventana Xmltv",\n    "url": "",\n    "version": "1.0"\n  },\n\n  "client": {\n    "class": "QoDesk.XmltvWindow",\n    "css": [\n      {\n        "directory": "desktop/xmltv/client/resources/",\n        "files": [ "styles.css", "css/calendar.css" ]\n      }\n    ],\n    "javascript": [\n      {\n        "directory": "desktop/xmltv/client/",\n        "files": [ "calendar-all-debug.js",  "app/calendar-list.js", "app/event-list.js","xmltv-win.js" ]\n      }\n    ],\n    "launcher": {\n      "config": {\n        "iconCls": "xmltv-icon",\n        "shortcutIconCls": "xmltv-shortcut",\n        "text": "Xmltv",\n        "tooltip": "<b>Xmltv</b>"\n      },\n      "paths": {\n        "startmenu": "/"\n      }\n    }\n  }\n}\n', 0);

-- --------------------------------------------------------

--
-- Table structure for table `qo_preferences`
--

CREATE TABLE IF NOT EXISTS `qo_preferences` (
  `qo_groups_id` int(11) unsigned NOT NULL DEFAULT '0',
  `qo_members_id` int(11) unsigned NOT NULL DEFAULT '0',
  `data` text COMMENT 'JSON data',
  PRIMARY KEY (`qo_members_id`,`qo_groups_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `qo_preferences`
--

INSERT INTO `qo_preferences` (`qo_groups_id`, `qo_members_id`, `data`) VALUES
(0, 0, '{"appearance":{"fontColor": "333333","themeId":1,"taskbarTransparency":"100"},"background":{"color": "f9f9f9","wallpaperId":11,"wallpaperPosition":"center"},"launchers":{"autorun":["qo-preferences"],"quickstart": [],"shortcut":["qo-preferences","demo-accordion","demo-grid","demo-layout","demo-bogus","demo-tab"]}}'),
(1, 1, '{"appearance":{"fontColor":"F2DFDF","themeId":2,"taskbarTransparency":100},"background":{"color":"f9f9f9","wallpaperId":11,"wallpaperPosition":"center"},"launchers":{"shortcut":["demo-accordion","demo-tab","demo-bogus","veris","tienda","mapa","ofertalaboral","contenidos","historia","imageadmin","denuncias-secretaria","denuncias","denuncias-inspeccion","denuncias-crecretaria","denunciassecretaria","denunciasinspeccion","denunciasweb"],"quickstart":["demo-tab","mapa","contenidos","denuncias-secretaria","denunciassecretaria","denuncias","denunciasinspeccion","denunciasweb"],"autorun":["denuncias-inspeccion"]}}'),
(1, 2, '{"launchers":{"autorun":["qo-preferences","ofertalaboral"],"quickstart":["ofertalaboral","quitoconnect"],"shortcut":["kiiconnect","samsung","canal","programa","quitoconnect","denunciasweb","denuncias"]}}'),
(2, 3, '{"launchers":{"quickstart":["enfapromo","samsung"],"shortcut":["enfapromo","samsung"]}}'),
(2, 4, '{"launchers":{"shortcut":["demo-accordion","demo-grid","demo-layout","demo-bogus","demo-tab","denuncias-crecretaria","denuncias","denunciasweb"],"quickstart":["denuncias-crecretaria","denuncias","denunciasweb"],"autorun":["denunciasweb"]}}'),
(3, 4, '{"launchers":{"shortcut":["demo-accordion","demo-grid","demo-layout","demo-bogus","demo-tab","kiiconnect"],"quickstart":["kiiconnect"]}}'),
(3, 5, '{"launchers":{"shortcut":["demo-accordion","demo-grid","demo-layout","demo-bogus","demo-tab","kiiconnect","denuncias-inspeccion","denunciasinspeccion"],"quickstart":["kiiconnect","denuncias"],"autorun":["denunciasinspeccion","denuncias"]}}'),
(4, 6, '{"launchers":{"autorun":["denuncias"],"shortcut":["denuncias"],"quickstart":["denuncias"]}}'),
(3, 7, '{"launchers":{"autorun":["denuncias"],"shortcut":["demo-accordion","demo-grid","demo-layout","demo-bogus","demo-tab","denuncias"],"quickstart":["denuncias"]},"appearance":{"fontColor":"333333","themeId":2,"taskbarTransparency":100}}'),
(2, 28, '{"launchers":{"shortcut":["qo-preferences","demo-accordion","demo-grid","demo-layout","demo-bogus","demo-tab","denunciassecretaria"],"autorun":["denunciassecretaria"],"quickstart":["denunciassecretaria"]}}'),
(5, 29, '{"launchers":{"autorun":["denunciasweb"]}}'),
(3, 30, '{"launchers":{"shortcut":["demo-accordion","demo-grid","demo-layout","demo-bogus","demo-tab","denuncias"],"autorun":["denuncias"],"quickstart":["denuncias"]},"appearance":{"fontColor":"333333","themeId":2,"taskbarTransparency":100}}'),
(3, 31, '{"launchers":{"autorun":["denuncias"]}}'),
(7, 33, '{"launchers":{"quickstart":["denuncias","denunciasweb"],"shortcut":["demo-accordion","demo-grid","demo-layout","demo-bogus","demo-tab","denuncias","denunciasweb"],"autorun":["denuncias"]}}'),
(7, 34, '{"launchers":{"quickstart":["denuncias","denunciasweb"],"shortcut":["demo-accordion","demo-grid","demo-layout","demo-bogus","demo-tab","denuncias","denunciasweb"],"autorun":["denuncias"]}}'),
(7, 35, '{"launchers":{"autorun":["denuncias"],"shortcut":["demo-accordion","demo-grid","demo-layout","demo-bogus","demo-tab","denuncias","denunciasweb"],"quickstart":["denuncias","denunciasweb"]}}');

-- --------------------------------------------------------

--
-- Table structure for table `qo_privileges`
--

CREATE TABLE IF NOT EXISTS `qo_privileges` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(35) DEFAULT NULL,
  `description` text,
  `data` text COMMENT 'The definition data ( JSON )',
  `active` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT 'A value of 1 or 0 is expected',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `qo_privileges`
--

INSERT INTO `qo_privileges` (`id`, `name`, `description`, `data`, `active`) VALUES
(1, 'System Administrator', 'System administrator privileges.  Full access.', '{"denuncias":["accesosAdministrador"],"denunciasinspeccion":[],"denunciasweb":[],"qo-admin":["addGroup","addMember","addPrivilege","approveSignupsToGroup","deleteGroup","deleteMember","deletePrivilege","denySignups","editGroup","editGroupPrivilege","editMember","editMembersGroups","editPrivilege","editPrivilegeModules","viewGroups","viewGroupPrivileges","viewMembers","viewMemberGroups","viewPrivileges","viewPrivilegeModules","viewSignups"],"qo-preferences":["saveAppearance","saveAutorun","saveBackground","saveQuickstart","saveShortcut","viewThemes","viewWallpapers"],"qo-profile":["loadProfile","saveProfile","savePwd"]}', 1),
(2, 'Administrador Secretaria General', 'Interfaces Administrador  Secretaria General', '{"denuncias":["accesosAdministrador"],"denunciasweb":["grabarDenuncia"],"qo-preferences":["saveAppearance","saveAutorun","saveBackground","saveQuickstart","saveShortcut","viewThemes","viewWallpapers"],"qo-profile":["loadProfile","saveProfile","savePwd"]}', 1),
(3, 'Secretaria General', 'Interface usuario Secretaria General', '{"denuncias":["accesosSecretaria"],"denunciasweb":[],"qo-preferences":["saveAppearance","saveAutorun","saveBackground","saveQuickstart","saveShortcut","viewThemes","viewWallpapers"],"qo-profile":["loadProfile","saveProfile","savePwd"]}', 1),
(4, 'Zonales', 'Usuarios  Zonales - Secretaria General', '{"denuncias":["accesosZonales"],"qo-preferences":["saveAppearance","saveAutorun","saveBackground","saveQuickstart","saveShortcut","viewThemes","viewWallpapers"],"qo-profile":["loadProfile","saveProfile","savePwd"]}', 1),
(5, 'Denuncias WEB', 'Usuarios Denuncias WEB', '{"denuncias":[],"denunciasweb":[],"qo-preferences":["saveAppearance","saveAutorun","saveBackground","saveQuickstart","saveShortcut","viewThemes","viewWallpapers"],"qo-profile":["loadProfile","saveProfile","savePwd"]}', 1),
(6, 'Inspeccion', 'Inspeccion', '{"denunciasinspeccion":[]}', 1),
(7, 'Supervision', 'Supervision accesos', '{"denuncias":[],"denunciasweb":[],"qo-preferences":["saveAppearance","saveAutorun","saveBackground","saveQuickstart","saveShortcut","viewThemes","viewWallpapers"],"qo-profile":["loadProfile","saveProfile","savePwd"]}', 1);

-- --------------------------------------------------------

--
-- Table structure for table `qo_sessions`
--

CREATE TABLE IF NOT EXISTS `qo_sessions` (
  `id` varchar(128) NOT NULL DEFAULT '' COMMENT 'a randomly generated id',
  `qo_members_id` int(11) unsigned NOT NULL DEFAULT '0',
  `qo_groups_id` int(11) unsigned DEFAULT NULL COMMENT 'Group the member signed in under',
  `data` text,
  `ip` varchar(16) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`qo_members_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `qo_sessions`
--

INSERT INTO `qo_sessions` (`id`, `qo_members_id`, `qo_groups_id`, `data`, `ip`, `date`) VALUES
('01a3e26183d862f8e66fb21e634cb728', 31, 3, '{"module":{}}', '172.20.136.46', '2017-08-04 08:32:57'),
('01c4712149d6d61dd66ef90e90d5a77d', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-03 12:06:43'),
('04383474ebc8622759543c0cd5a854ad', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-03 13:08:58'),
('04f49ae16a7b12789a7a17cffb63d238', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-03 12:31:39'),
('055c86895a2d7b22c4872d159e1a1b9b', 35, 7, '{"module":{}}', '172.20.138.58', '2017-08-09 08:53:29'),
('05c7c7186c3e59d298cdedeadbc569f8', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-10 12:14:29'),
('05ce24a35954f17858e73c6aaa3ada43', 30, 3, '{"module":{}}', '172.20.136.46', '2017-08-03 15:19:34'),
('0780eb33bff335e028e492de4d28f02b', 6, 4, '{"module":{}}', '172.20.136.70', '2017-07-26 15:20:51'),
('07dacf5cee63be6682a8c200078a64da', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-04 08:41:41'),
('0a4419d4ffa01826d21ba9d81b45eb34', 33, 7, '{"module":{}}', '172.20.136.71', '2017-08-04 09:40:17'),
('0acf3e42f5b1b3ee8a426bb4c6a79bd5', 33, 7, '{"module":{}}', '172.20.136.71', '2017-08-08 14:50:03'),
('0cf657f8f8149728f9fd0abc7b0051e4', 31, 3, '{"module":{}}', '172.20.136.46', '2017-08-04 14:47:40'),
('0e8db2cda8f59cacea04635c21707cae', 31, 3, '{"module":{}}', '172.20.136.46', '2017-08-04 07:51:16'),
('0f82012c420b7d9137796f35da0ff0d1', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-04 17:29:12'),
('12b856db24853578bcc7d4bdb12e7545', 7, 3, '{"module":{}}', '172.20.136.108', '2017-08-03 12:21:57'),
('1326e8e651125776e3e39d396d747fda', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-10 11:26:29'),
('15e1c10fae34bdeb2af619f5f01421ca', 31, 3, '{"module":{}}', '172.20.136.46', '2017-08-02 14:23:05'),
('15f74a538a5556659ebc48f69af816a7', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-09 11:00:49'),
('1aa7b44c689876c6b1874629d267da23', 1, 1, '{"module":{}}', '172.20.138.39', '2017-08-03 10:58:04'),
('1d5c0df346fd9f69e42c78dc383dfab2', 7, 3, '{"module":{}}', '172.20.136.108', '2017-08-07 12:26:46'),
('1d760387f40452d17d9b43cf17db0b18', 31, 3, '{"module":{}}', '172.20.136.46', '2017-08-03 13:31:37'),
('1f10d34cc623a8d1fe866de97c6cff60', 1, 1, '{"module":{}}', '172.20.136.71', '2017-07-25 08:24:37'),
('1f119eb17414b6d60d940264660a4be3', 31, 3, '{"module":{}}', '172.20.136.46', '2017-08-02 10:39:07'),
('2110d6850f7fbd88ea7bc4a99a4995e9', 31, 3, '{"module":{}}', '172.20.136.46', '2017-08-07 07:48:55'),
('24e57be4f4472cc2fc3537d125ebd83d', 34, 7, '{"module":{}}', '172.20.136.101', '2017-08-08 15:05:23'),
('2525fe5c2fcb2b368ce7eebc300ceba3', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-07 08:15:38'),
('268374b653e8c13146087996d7dc42a4', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-10 11:11:15'),
('2f17699edfaa5528af3307c682484f57', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-24 15:34:13'),
('31f965afc4876e9099297ea2789d6dbe', 1, 1, '{"module":{}}', '172.20.136.71', '2017-07-24 11:25:28'),
('33e813e779cb72ed971f9fa5fbf18f3a', 1, 1, '{"module":{}}', '172.20.136.71', '2017-08-04 08:01:48'),
('35d0b60963c3fe8120474bb9f60be5c4', 1, 1, '{"module":{}}', '172.20.138.29', '2017-08-04 10:23:16'),
('37581e7fe6e1f683e42e65d00c475336', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-07 08:57:18'),
('378f30ff0b0e7bf4820b4f3de3232244', 1, 1, '{"module":{}}', '172.20.136.71', '2017-08-08 11:11:47'),
('391fa29b38399076b902eeed67b20702', 7, 3, '{"module":{}}', '172.20.136.108', '2017-08-02 14:06:55'),
('3a207d93e4378e7bbed143ed5bc00b5e', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-09 11:01:22'),
('3bd4b44da53a89141190c6bcaa87ead8', 1, 1, '{"module":{}}', '172.20.138.60', '2017-07-25 15:44:28'),
('3c3c6f1e9fefc0346fa12587d6a363f8', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-09 09:26:59'),
('3d316ec870765bacd3c9b148df3b21ae', 7, 3, '{"module":{}}', '172.20.136.108', '2017-08-02 12:38:27'),
('3f22ed078d317ae713af7d41af779ab2', 7, 3, '{"module":{}}', '172.20.136.108', '2017-08-09 08:55:17'),
('4166e8ce1cc563ec81bb6ea1527823bf', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-03 13:16:02'),
('41a6b8ab2419effca20b01a4ca08c86c', 1, 1, '{"module":{}}', '172.20.138.33', '2017-08-01 12:14:04'),
('4223c3c5669acdac7be884e0cf6869ca', 7, 3, '{"module":{}}', '172.20.136.108', '2017-08-03 09:36:09'),
('433b63c573e66df37db32270edfb163e', 1, 1, '{"module":{}}', '172.20.136.71', '2017-07-31 14:03:06'),
('462aa1fbb4e1253d9860c05d5e04d6cb', 1, 1, '{"module":{}}', '172.20.136.71', '2017-08-10 14:30:29'),
('469a5c3fd52cfde9c3c6248a58374f6b', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-04 08:36:41'),
('474c04d35f74e599e38b8a8381035660', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-03 13:25:23'),
('47ea65c683b873709a5699f82f993307', 7, 3, '{"module":{}}', '172.20.136.108', '2017-08-10 11:31:15'),
('47ecc9f323a39de70e8fbe0dfce8a870', 1, 1, '{"module":{}}', '172.20.136.71', '2017-08-01 14:08:14'),
('49044a05741d048c58de1b3e46189c60', 7, 3, '{"module":{}}', '172.20.136.108', '2017-08-08 08:22:06'),
('4b839835001cc18a2f07b0bfa5507896', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-03 09:11:27'),
('4bc059e9b4f294ebd155eea4413b8ef8', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-07 08:43:05'),
('4fa2b7a5174d710fcfac7b6e40fd90c8', 7, 3, '{"module":{}}', '172.20.136.108', '2017-08-07 10:52:04'),
('51302320e21d38298da3fa44c698a5fc', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-10 11:52:35'),
('535cccf10328f0ed7d0a67760762e021', 1, 1, '{"module":{}}', '172.20.138.39', '2017-08-03 13:57:54'),
('55b22f128e1b150d06099e24dc07b363', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-28 12:13:20'),
('5851d3d24dcdb391377b91c6c2c11b13', 1, 1, '{"module":{}}', '172.20.136.71', '2017-08-03 14:07:12'),
('58804930bc36b597cacee0e469c2f556', 5, 3, '{"module":{}}', '172.20.136.126', '2017-08-10 14:18:49'),
('589b8bc08fb34958181bdc43d189e505', 31, 3, '{"module":{}}', '172.20.136.46', '2017-08-08 10:23:22'),
('5d5ba7efcbb1bdc9a8818523876f4ae0', 1, 1, '{"module":{}}', '172.20.136.71', '2017-07-31 11:10:30'),
('5eb0826908c885c2a88dc5c4d8a732c7', 1, 1, '{"module":{}}', '172.20.136.71', '2017-07-24 11:26:00'),
('61424a52158ff4c32ae74fd1c8187ed8', 7, 3, '{"module":{}}', '172.20.136.108', '2017-08-02 15:23:23'),
('6166808e13fd0e9c5cd27903922269c8', 7, 3, '{"module":{}}', '172.20.136.108', '2017-08-10 16:31:42'),
('618b7740dcfd8d2762e2eb55a0188630', 7, 3, '{"module":{}}', '172.20.136.108', '2017-08-01 10:16:36'),
('62a9ed74d6d1bd261f34247c407bd4ae', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-25 10:25:56'),
('639b14ecdd13a49d9767f7011b3c2127', 1, 1, '{"module":{}}', '172.20.136.71', '2017-07-25 15:10:53'),
('6532fb133b3826b2568168a4070f2364', 1, 1, '{"module":{}}', '172.20.136.108', '2017-08-04 10:50:37'),
('658ea0d1c30f69ff3d4f0b19950a0e23', 5, 3, '{"module":{}}', '172.20.136.126', '2017-08-08 10:05:02'),
('65a133c6b1864ee90c49760c4f068ef1', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-03 09:57:39'),
('65c9f7ee4cc33bd979e8545f43545179', 31, 3, '{"module":{}}', '172.20.136.46', '2017-08-04 13:25:34'),
('65ffe31f6b402641a09fb4b3bca88006', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-24 15:26:21'),
('66c7065aa1582ab88c0570cefdc4ed77', 31, 3, '{"module":{}}', '172.20.136.46', '2017-08-04 13:22:58'),
('68e1294b592cdc328c47cf0daa2d73d8', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-28 11:52:07'),
('69dd7d6a28526a14400804f59331e0da', 7, 3, '{"module":{}}', '172.20.136.108', '2017-08-08 10:10:07'),
('6b16a07e4e0951072e589f15686eb71b', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-02 16:03:28'),
('6beaf006356b67a8fa257a80586a29bb', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-07 08:36:03'),
('6c9111671782066c15baf4353adcd1fb', 2, 1, '{"module":{}}', '172.20.138.40', '2017-07-24 12:53:26'),
('6dc74e4fafa2106c520fcbcd70c8d4da', 5, 3, '{"module":{}}', '172.20.136.126', '2017-08-10 13:21:31'),
('6f9f5e5d52ddddaf0fdf6fb2ab93a5eb', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-10 10:47:46'),
('6fcc6ea02e1df83f65094eb20202752a', 1, 1, '{"module":{}}', '172.20.136.71', '2017-08-08 12:41:35'),
('718b7e236c85f3501c28376b61e4c19d', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-03 13:50:47'),
('71e3b8902b8a0c4d9f82d0936f60742f', 1, 1, '{"module":{}}', '172.20.136.71', '2017-08-08 16:37:16'),
('73a7580cd34ac07b40327cbb768ace5e', 5, 3, '{"module":{}}', '172.20.136.126', '2017-08-03 10:42:22'),
('73af543f1dea13445800fb4e48ff37bb', 1, 1, '{"module":{}}', '172.20.136.71', '2017-08-08 08:30:49'),
('753068d70881db3e3e202088489a8a77', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-09 11:09:22'),
('762d477654703cec4437ef5e97512aa4', 31, 3, '{"module":{}}', '172.20.136.46', '2017-08-04 13:14:03'),
('781451fcd8c446aea4d20301f701525f', 5, 3, '{"module":{}}', '172.20.136.126', '2017-08-02 08:32:51'),
('78dac5d24ebd6200408cf962078f7eab', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-04 15:05:44'),
('7aaf20b76a29113c827326160858819f', 7, 3, NULL, '172.20.136.108', '2017-08-09 08:00:03'),
('7b1de8cce68cc711dca0a9555365f5fc', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-24 16:21:04'),
('7b26ee4e3368df57fdac99aba3b638c1', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-24 15:56:20'),
('7ea53a241e831522d5099e3505f1bb7b', 2, 1, '{"module":{}}', '172.20.136.48', '2017-07-24 14:10:38'),
('80f2adebe853236b23375346818c5e51', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-03 10:00:30'),
('86140a4d18ffcf695e74afdb9cb9b162', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-26 14:17:07'),
('865c413ec9c58b50473b30c9e743a9f7', 7, 3, '{"module":{}}', '172.20.136.108', '2017-08-07 14:53:14'),
('87e7722af09f9bd677cf140738958414', 5, 3, '{"module":{}}', '172.20.136.126', '2017-08-07 08:41:08'),
('88b4b18e40959970924d4d484f08f267', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-25 18:09:54'),
('8b2b9e0a5171380fd78cd386527c766a', 7, 3, '{"module":{}}', '172.20.136.108', '2017-08-04 09:42:35'),
('8b7a3a1d403318806dff45f7e68a00e7', 31, 3, '{"module":{}}', '172.20.136.46', '2017-08-02 15:18:12'),
('9067f7004ec27a0f971c315d2b195e49', 7, 3, '{"module":{}}', '172.20.136.108', '2017-08-04 08:29:46'),
('93e8bfd643e7fa77d83b0aa3bbfe224d', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-31 08:55:34'),
('972c903ec4bb93ac52e594ab77a8d06e', 31, 3, '{"module":{}}', '172.20.136.46', '2017-08-09 07:52:58'),
('9887559b0e25c2c2880888e3f89c5f60', 31, 3, '{"module":{}}', '172.20.136.46', '2017-08-02 09:24:01'),
('98fa38855b1d6d428eeb3f9901af2796', 1, 1, '{"module":{}}', '172.20.136.71', '2017-08-08 14:37:32'),
('9926a1d6230cf19c5936589e7dbb01fb', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-04 08:42:33'),
('9a6556996967957b4384a7b540793a56', 1, 1, '{"module":{}}', '172.20.136.71', '2017-08-09 07:57:06'),
('9cb4f1addeb666e4c3919da267f7e4af', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-26 08:05:49'),
('9fcc77bc21366363e36126006a4ff713', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-03 12:10:56'),
('a18416b945a9cacabcc607101b72d5e1', 31, 3, '{"module":{}}', '172.20.136.46', '2017-08-04 13:17:32'),
('a30540c627b1a62ed40e00ec2efb096a', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-10 12:01:41'),
('a8d3012f096b0e18fabc04e5b3f8e7de', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-28 11:56:12'),
('abc1752f593eca53229091ef0b93128d', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-10 10:46:19'),
('ae7e4fb7b18c09d63832106cdf3709c3', 1, 1, '{"module":{}}', '172.20.136.71', '2017-08-03 14:13:25'),
('b01b481941bb6a78810da2958e7f6948', 1, 1, '{"module":{}}', '172.20.136.71', '2017-08-08 15:56:07'),
('b1bc3fa08a61250f6f60ac62e816720e', 7, 3, '{"module":{}}', '172.20.136.108', '2017-08-04 14:02:00'),
('b43a4514ae02f1843f8fc71300328bbb', 5, 3, '{"module":{}}', '172.20.136.126', '2017-08-10 16:20:33'),
('b6ade327bdb7c7e9a404c0428f95fd0f', 1, 1, '{"module":{}}', '172.20.138.25', '2017-08-01 10:34:26'),
('bb03cb01dfb0e1ab31efbd417711fe1b', 29, 5, '{"module":{}}', '172.20.138.62', '2017-07-25 15:57:16'),
('bc161b999636abbe2ed1f3c10276c389', 6, 4, '{"module":{}}', '172.20.136.70', '2017-07-26 08:38:19'),
('bc9a5656c0051e0174c620660eab58f3', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-10 12:06:26'),
('bd1f54f718fb5a4537ff9f8bb2ada2d5', 33, 7, '{"module":{}}', '172.20.138.52', '2017-08-04 14:22:54'),
('c0b2b2d1c3558d239532272052901b58', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-04 08:44:06'),
('c37c88b8fb806fc22688e61d3952cf24', 7, 3, '{"module":{}}', '172.20.136.108', '2017-07-26 08:41:21'),
('c3e3b8e87d8b49bf6488c23a9f0c0cc2', 1, 1, '{"module":{}}', '172.20.136.71', '2017-08-07 16:35:35'),
('c40bad7ba111b93edd01c7346f99c335', 34, 7, '{"module":{}}', '172.20.136.71', '2017-08-08 14:52:35'),
('c4c255fb4f7bd1338e92b800c2b94773', 31, 3, '{"module":{}}', '172.20.136.46', '2017-08-04 13:15:07'),
('c6ec9e2f21f1a0b1aff9d86d98dcaff0', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-28 07:55:34'),
('c79e1f7f0c9940fd7a43ed665021842e', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-31 09:31:28'),
('c815808b3b4b1a915b2467e26ff70e49', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-10 11:31:48'),
('c84d863ce7c002b84c5babb221d178f9', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-03 10:00:04'),
('cb60abbaca81fbb99c6bc855b6c8405e', 31, 3, '{"module":{}}', '172.20.136.46', '2017-08-08 07:55:48'),
('cdfbe1cc030e719410b5d8197806dbf3', 31, 3, '{"module":{}}', '172.20.136.46', '2017-08-03 08:20:17'),
('d49d56a1a1f24035ee33450c8a569851', 1, 1, '{"module":{}}', '172.20.136.71', '2017-08-09 10:14:27'),
('d513c7a4c6f74efe8cbda4bc20fb7f1e', 5, 3, '{"module":{}}', '172.20.136.126', '2017-08-01 09:02:12'),
('d931055ea68ec632897ac5fdfd35b01f', 33, 7, '{"module":{}}', '172.20.138.37', '2017-08-08 13:46:37'),
('dcf38ca1f93d185012e18843616693f9', 7, 3, '{"module":{}}', '172.20.136.108', '2017-08-09 15:18:19'),
('dd19e8dac7208da2d85e56313a06faba', 31, 3, '{"module":{}}', '172.20.136.46', '2017-08-10 07:52:29'),
('dd3ef7ee7f030e2835cef834422c9421', 1, 1, '{"module":{}}', '172.20.136.71', '2017-07-28 12:36:10'),
('debf8e3f2f8ec44042cf6b24ab07694b', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-03 08:31:06'),
('e17b06e1a072c135e45094f3c2bef961', 1, 1, '{"module":{}}', '172.20.136.71', '2017-08-08 12:32:11'),
('e1c6a5e1d8468badac684e24657abcbd', 7, 3, '{"module":{}}', '172.20.136.108', '2017-08-10 09:59:17'),
('e1eed088076b38a75f55c1625cac0da6', 31, 3, '{"module":{}}', '172.20.136.46', '2017-08-08 10:22:34'),
('e61c192ee8cd4a95921d3044d54db0d6', 7, 3, '{"module":{}}', '172.20.136.108', '2017-08-09 07:59:56'),
('e7beda678bfc7f4bd6515564fdf43a61', 1, 1, '{"module":{}}', '172.20.136.71', '2017-08-03 14:00:48'),
('e97861eca65b57d12911b28bd41ebef9', 7, 3, '{"module":{}}', '172.20.136.108', '2017-08-07 11:21:17'),
('e9806b15a968d0307e233bf50b956f87', 7, 3, '{"module":{}}', '172.20.136.108', '2017-08-02 09:39:52'),
('ea323fdfd385d671ff9ad8df37f78b4b', 1, 1, '{"module":{}}', '172.20.136.71', '2017-08-10 08:17:55'),
('eb8cf78fe60c29a9e12ec65df749bd94', 1, 1, '{"module":{}}', '172.20.136.71', '2017-07-31 08:45:23'),
('f0a50d69a163b12afe9b6eab846f1ceb', 7, 3, '{"module":{}}', '172.20.136.108', '2017-08-03 08:14:43'),
('f3a21f36cf97b123beee00851c88e02d', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-26 17:50:56'),
('ff88809e081075a66d546fc16e99c574', 4, 2, '{"module":{}}', '172.20.136.124', '2017-08-03 08:43:31'),
('ffdc773689681896a147896b6dc3a61c', 5, 3, '{"module":{}}', '172.20.136.126', '2017-08-10 08:42:25');

-- --------------------------------------------------------

--
-- Table structure for table `qo_signup_requests`
--

CREATE TABLE IF NOT EXISTS `qo_signup_requests` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(25) DEFAULT NULL,
  `last_name` varchar(35) DEFAULT NULL,
  `email_address` varchar(55) DEFAULT NULL,
  `comments` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `qo_spam`
--

CREATE TABLE IF NOT EXISTS `qo_spam` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email_address` varchar(55) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `qo_themes`
--

CREATE TABLE IF NOT EXISTS `qo_themes` (
  `id` varchar(35) NOT NULL DEFAULT '',
  `data` text COMMENT 'The definition data ( JSON )',
  `active` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT 'A value of 1 or 0 is expected',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `qo_themes`
--

INSERT INTO `qo_themes` (`id`, `data`, `active`) VALUES
('1', '{\r\n   "about": {\r\n      "author": "Ext JS",\r\n      "version": "1.0",\r\n      "url": "www.extjs.com"\r\n   },\r\n   "group": "Ext JS",\r\n   "name": "Blue",\r\n   "thumbnail": "images/xtheme-blue.gif",\r\n   "file": "css/xtheme-blue.css",\r\n   "url": "http://extjs.cachefly.net/ext-3.2.1/resources/css/xtheme-blue.css"\r\n}', 1),
('2', '{\r\n   "about": {\r\n      "author": "Ext JS",\r\n      "version": "1.0",\r\n      "url": "www.extjs.com"\r\n   },\r\n   "group": "Ext JS",\r\n   "name": "Gray",\r\n   "thumbnail": "images/xtheme-gray.gif",\r\n   "file": "css/xtheme-gray.css",\r\n   "url": "http://extjs.cachefly.net/ext-3.2.1/resources/css/xtheme-gray.css"\r\n}', 1),
('3', '{\r\n   "about": {\r\n      "author": "Ext JS",\r\n      "version": "1.0",\r\n      "url": "www.extjs.com"\r\n   },\r\n   "group": "Ext JS",\r\n   "name": "Access",\r\n   "thumbnail": "images/xtheme-access.gif",\r\n   "file": "css/xtheme-access.css",\r\n   "url": "http://extjs.cachefly.net/ext-3.2.1/resources/css/xtheme-access.css"\r\n}', 1),
('4', '{\r\n   "about": {\r\n      "author": "Ext JS User",\r\n      "version": "1.0",\r\n      "url": "www.extjs.com"\r\n   },\r\n   "group": "Ext JS",\r\n   "name": "Slate",\r\n   "thumbnail": "images/xtheme-slate.gif",\r\n   "file": "css/xtheme-slate.css"\r\n}', 0);

-- --------------------------------------------------------

--
-- Table structure for table `qo_wallpapers`
--

CREATE TABLE IF NOT EXISTS `qo_wallpapers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `data` text COMMENT 'The definition data ( JSON )',
  `active` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT 'A value of 1 or 0 is expected',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

--
-- Dumping data for table `qo_wallpapers`
--

INSERT INTO `qo_wallpapers` (`id`, `data`, `active`) VALUES
(1, '{\r\n   "group": "Blank",\r\n   "name": "Blank",\r\n   "thumbnail": "thumbnails/blank.gif",\r\n   "file": "blank.gif"\r\n}', 1),
(2, '{\r\n   "group": "Pattern",\r\n   "name": "Blue Psychedelic",\r\n   "thumbnail": "thumbnails/blue-psychedelic.jpg",\r\n   "file": "blue-psychedelic.jpg"\r\n}', 1),
(3, '{\r\n   "group": "Pattern",\r\n   "name": "Blue Swirl",\r\n   "thumbnail": "thumbnails/blue-swirl.jpg",\r\n   "file": "blue-swirl.jpg"\r\n}', 1),
(4, '{\r\n   "group": "Nature",\r\n   "name": "Colorado Farm",\r\n   "thumbnail": "thumbnails/colorado-farm.jpg",\r\n   "file": "colorado-farm.jpg"\r\n}', 1),
(5, '{\r\n   "group": "Nature",\r\n   "name": "Curls On Green",\r\n   "thumbnail": "thumbnails/curls-on-green.jpg",\r\n   "file": "curls-on-green.jpg"\r\n}', 1),
(6, '{\r\n   "group": "Pattern",\r\n   "name": "Emotion",\r\n   "thumbnail": "thumbnails/emotion.jpg",\r\n   "file": "emotion.jpg"\r\n}', 1),
(7, '{\r\n   "group": "Pattern",\r\n   "name": "Eos",\r\n   "thumbnail": "thumbnails/eos.jpg",\r\n   "file": "eos.jpg"\r\n}', 1),
(8, '{\r\n   "group": "Nature",\r\n   "name": "Fields of Peace",\r\n   "thumbnail": "thumbnails/fields-of-peace.jpg",\r\n   "file": "fields-of-peace.jpg"\r\n}', 1),
(9, '{\r\n   "group": "Nature",\r\n   "name": "Fresh Morning",\r\n   "thumbnail": "thumbnails/fresh-morning.jpg",\r\n   "file": "fresh-morning.jpg"\r\n}', 1),
(10, '{\r\n   "group": "Nature",\r\n   "name": "Lady Buggin",\r\n   "thumbnail": "thumbnails/ladybuggin.jpg",\r\n   "file": "ladybuggin.jpg"\r\n}', 1),
(11, '{\r\n   "group": "qWikiOffice",\r\n   "name": "qWikiOffice",\r\n   "thumbnail": "thumbnails/qwikioffice.jpg",\r\n   "file": "qwikioffice.jpg"\r\n}', 1),
(12, '{\r\n   "group": "Nature",\r\n   "name": "Summer",\r\n   "thumbnail": "thumbnails/summer.jpg",\r\n   "file": "summer.jpg"\r\n}', 1),
(13, '{\r\n   "group": "Pattern",\r\n   "name": "Emotion Pattern",\r\n   "thumbnail": "thumbnails/emotion-pattern.jpg",\r\n   "file": "emotion-pattern.jpg"\r\n}', 1),
(14, '{\r\n   "group": "Pattern",\r\n   "name": "Pattern Red",\r\n   "thumbnail": "thumbnails/pattern-red.gif",\r\n   "file": "pattern-red.gif"\r\n}', 1);

-- --------------------------------------------------------

--
-- Table structure for table `registros_pantene`
--

CREATE TABLE IF NOT EXISTS `registros_pantene` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(100) DEFAULT NULL,
  `APELLIDO` varchar(100) DEFAULT NULL,
  `EMAIL` varchar(150) DEFAULT NULL,
  `EDAD` varchar(2) DEFAULT NULL,
  `TELEFONO` varchar(10) DEFAULT NULL,
  `CIUDAD` varchar(100) DEFAULT NULL,
  `IMAGEN1` varchar(250) DEFAULT NULL,
  `IMAGEN2` varchar(250) DEFAULT NULL,
  `IMAGEN3` varchar(250) DEFAULT NULL,
  `creado` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `CEDULA` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `registros_pantene`
--

INSERT INTO `registros_pantene` (`id`, `NOMBRE`, `APELLIDO`, `EMAIL`, `EDAD`, `TELEFONO`, `CIUDAD`, `IMAGEN1`, `IMAGEN2`, `IMAGEN3`, `creado`, `CEDULA`) VALUES
(1, 'Jairo', 'Ortiz', 'jortiz@misiva.com.ec', '29', '0990566211', 'Quito', 'http://apps2.misiva.com.ec/pantene/uploads/campos-obligatorios.png', '', '', '2014-10-02 22:45:59', '1720257748'),
(2, 'Byron G', 'Herrera A', 'byronherrera@hotmail.com', '33', '092222hdhd', 'Quito', 'http://apps2.misiva.com.ec/pantene/uploads/bart-and-lisa-simpson-playing-card.jpg', '', '', '2014-10-02 22:49:30', '1711080893'),
(3, 'Cristian', 'Galeano', 'cristiangp11@hotmail.com', '34', '0995654090', 'Quito', 'http://apps2.misiva.com.ec/pantene/uploads/lanzamiento.jpg', '', '', '2014-10-02 22:53:32', '1724311558'),
(4, 'Byron G', 'Herrera A', 'herrera.byron@gmail.com', '12', '209939999', 'quito', 'http://apps2.misiva.com.ec/pantene/uploads/43819ecc1cf003fc0255bc876bcb8b33.jpg', '', '', '2014-10-02 22:58:20', '1711088083'),
(5, 'Byron G', 'Herrera A', 'bherrera@misiva.com.ec', '44', '3333333333', 'Quito', 'http://apps2.misiva.com.ec/pantene/uploads/japan-stromtrooper.jpg', '', '', '2014-10-02 22:59:06', '1111111111');

-- --------------------------------------------------------

--
-- Table structure for table `registro_dragones_sustagen`
--

CREATE TABLE IF NOT EXISTS `registro_dragones_sustagen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `cedula` varchar(10) DEFAULT NULL,
  `mail` varchar(80) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `codigo` varchar(100) DEFAULT NULL,
  `creado` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ip` varchar(60) DEFAULT NULL,
  `fechaNac` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=56 ;

--
-- Dumping data for table `registro_dragones_sustagen`
--

INSERT INTO `registro_dragones_sustagen` (`id`, `nombre`, `cedula`, `mail`, `telefono`, `codigo`, `creado`, `ip`, `fechaNac`) VALUES
(10, 'María Alvarado', '1715217145', 'mjessenia.alvarado@hotmail.com', '023194376', '7506205801518', '2014-09-01 19:17:40', '186.42.32.123', '1977-11-01'),
(11, 'María Alvarado', '1715217145', 'mjessenia.alvarado@hotmail.com', '023194376', '7506205801518 otro 7506205801549', '2014-09-01 19:18:21', '186.42.32.123', '1977-11-01'),
(12, 'yuli solorzano', '0104221254', 'gatitalazafiro@hotmail.com', '045046296', 'guayaquil', '2014-09-01 20:33:13', '190.130.180.144', '1980-02-19'),
(13, 'horacio luzon', '1003550249', 'horacioluzon54@gmail.com', '062665082', '1', '2014-09-02 16:42:49', '186.46.9.86', '1989-02-24'),
(14, 'maria elena orres torres', '0924363781', 'elenita84_09@hotmail.com', '0959113111', 'DE4A2L 1D', '2014-09-03 17:57:10', '186.178.228.214', '1984-09-12'),
(15, 'MARIA ELENA TORRES TORRES', '0924363781', 'elenita84_09@hotmail.com', '0959113111', 'DE4A2L 1D', '2014-09-03 17:59:54', '186.178.228.214', '1984-09-12'),
(16, 'alexis eguez', '0923125678', 'alexis_eguez@hotmail.com', '0932124578', 'primabera', '2014-09-04 16:56:34', '190.63.136.15', '2014-09-11'),
(17, 'damaritz gomez', '1755694112', 'carmitarivas1@hotmail.com', '0994671429', 'sn', '2014-09-05 17:33:18', '186.3.12.106', '2007-11-06'),
(18, 'dalila sarmiento', '0603754144', 'rociosarmi_1983@hotmail.com', '0998853387', '88', '2014-09-06 01:12:21', '200.24.221.124', '1983-11-23'),
(19, 'Jessica Moreira', '1719786053', 'jessi7686@hotmail.com', '0992616415', 'Ecuador - Quevedo', '2014-09-06 16:54:34', '190.63.155.2', '1986-06-07'),
(20, 'Samir Jimenez', '1755383195', 'sami-mechas@hotmail.com', '0987534111', 'Quevedo', '2014-09-06 16:56:06', '190.63.155.2', '1988-07-26'),
(21, 'Mariana del Carmen Mecias', '1717100604', 'marirosseta@hotmail.com', '0992875138', 'Santo Domingo', '2014-09-06 16:57:19', '190.63.155.2', '2014-06-11'),
(22, 'nicolas cedeño', '0927723619', 'tamarachunga03@hotmail.com', '0981389594', 'guayaquil', '2014-09-07 16:54:35', '181.198.205.117', '2009-02-24'),
(23, 'NELLY GRANDA', '1714962824', 'nelly_85gg@hotmail.com', '0998195700', 'DE3L1Y5D', '2014-09-09 14:38:40', '190.90.189.50', '1985-09-19'),
(24, 'jose luis roya', '1118644556', 'jltroyajr@hotmail.com', '2837654', '2014-09-19', '2014-09-11 03:00:35', '190.155.112.223', '2004-05-28'),
(25, 'jon asevedo', '2325675', 'yamiletromero@gmai.com', '3224564', 'ddfgff', '2014-09-11 17:52:35', '190.131.134.138', '2014-09-09'),
(26, 'miguel  chamorro', '040261587', 'eliverto otmailt @ otmailt .com', '0985867433', 'casa', '2014-09-11 18:25:22', '186.46.66.134', '2004-09-04'),
(27, 'jorge', '2100211875', 'jorgeluoszambranomoreira@yahoo.com', '0967160779', '1', '2014-09-11 19:41:19', '190.152.202.253', '0000-00-00'),
(28, 'jose chancosa', '089472583', 'manuelchancosa11-@hotmail.com', '2514759835', 'macasto', '2014-09-12 17:43:56', '186.47.218.101', '2014-09-30'),
(29, 'junior poma', '0999335588', 'junior .quazada.16@homail.es', '0926595434', 'carigan', '2014-09-13 16:18:55', '190.90.102.179', '2014-09-26'),
(30, 'kenneth', '2578637', 'el papote kenneth122@hotmail.com', '0959779420', 'gflkfhyt{dcgrt', '2014-09-13 16:52:55', '181.211.193.16', '1989-04-02'),
(31, 'jermy jacome', '0803397181', 'mias.ale.2003@email.com', '3760710', 'juan', '2014-09-13 17:10:19', '190.63.6.195', '2000-10-02'),
(32, 'cesartejada', '0706996070', 'TEJADAVALIENTE.@HOTMAil.com', '0987456123', 'tejada', '2014-09-14 14:42:01', '186.70.126.178', '2014-09-08'),
(33, 'richard holguin', '0910987338', 'riholmo@gmail.com', '052330916', 'san sebastian', '2014-09-14 15:59:25', '181.113.210.174', '2014-01-25'),
(34, 'JESUS ANDRES LOOR', '1216928900', 'dionilapita1982@hotmail.com', '0988483002', '1', '2014-09-14 16:42:48', '181.113.215.250', '2010-04-24'),
(35, 'Daniel Salvador', '1714188107', 'danielsalvador@mantis.com.ec', '0999290701', 'EC170513', '2014-09-15 18:16:48', '186.4.136.194', '2014-06-10'),
(36, 'johanna perez', '0922371109', 'johanna-perez19841@hotmail.com', '0991051554', 'fortin guerro', '2014-09-16 18:42:01', '186.66.236.25', '1984-12-13'),
(37, 'carmen  suares', '1304059825', 'noelia_arauz@hotmail.com', '0958746217', '2548', '2014-09-17 17:14:53', '190.63.128.130', '2014-09-20'),
(38, 'jordan flores', '09697608', 'jordan_floresm@hotmail.com', '0993508795', 'hora de abentura', '2014-09-18 16:28:07', '186.5.36.210', '2014-09-19'),
(39, 'REYNA ZURITA RIVERA', '0918555897', 'reynaida1979@hotmail.com', '0969388904', '0099999878887788889', '2014-09-18 16:43:20', '190.57.134.12', '1979-06-23'),
(40, 'Diana Cuasapaz', '1720035714', 'dayanac23@hotmail.com', '0990427667', 'DE3KCQ4E', '2014-09-19 17:56:35', '186.46.164.252', '1987-12-23'),
(41, 'anthni mera', '1302874561', 'anthoni_mera@hotmail.com', '0968583184', 'javier', '2014-09-21 16:44:47', '186.178.176.104', '2014-09-01'),
(42, 'tomassigcho', '2014124569', 'tomassigcho@email.com', '2425972', 'fgrehtry', '2014-09-22 01:50:11', '200.25.142.63', '2006-02-13'),
(43, 'JORDAN', '0993508795', ' jordan_19_canelos@hotmail.com', '0993508795', ' GUAYAS', '2014-09-22 15:44:51', '186.5.36.210', '2014-09-30'),
(44, 'antonymacias', '9523653989', 'ballena.macias@hotmail.com', '0952354665', '5sdort', '2014-09-23 19:08:05', '181.175.34.67', '2014-09-15'),
(45, 'yolanda pullutasig', '1716666109', 'yessica_862014@hotmail.com', '0986478433', '05', '2014-09-26 17:48:38', '181.198.15.238', '1980-03-03'),
(46, 'María Jessenia Alvarado Tipán', '1715217145', 'mjessenia.alvarado@hotmail.com', '0994070357', '7506205801549', '2014-09-28 02:15:44', '186.47.33.117', '1977-11-01'),
(47, 'paul zhinin', '032165477', 'paul .zhinin @es .com', '0941316547', '1', '2014-09-28 17:27:04', '201.218.28.33', '1974-02-14'),
(48, 'jeremy molina', '1754482790', 'jeremyloco0888@hotmail.com', '2665632', '52', '2014-09-28 19:11:41', '200.24.214.61', '2014-09-02'),
(49, 'joel leonado castro  sanchez', '0977765745', 'castro-joel@outlook.com', '0988978655', 'aswe3453', '2014-09-29 16:28:13', '186.42.182.35', '2014-09-03'),
(50, 'fernando lema barrera ', '0505555213', 'cervero@hotmail.com', '032688553', 'ecuador la mana provincia cotopaxi', '2014-09-29 16:53:10', '186.47.253.149', '2014-09-25'),
(51, 'as', '0831243729', 'asdasd@rete.com', '2345678', '2133254664', '2015-02-04 14:47:14', '190.155.91.71', '1980-02-05'),
(52, '578339', 'CÃ©dula', 'darel233455@gmail.com', '7074407286', 'Lote', '2015-04-14 21:05:29', '176.10.104.234', '0000-00-00'),
(53, '', '', '', '', '', '2015-04-14 21:05:29', '176.10.104.234', '0000-00-00'),
(54, '21570', 'CÃ©dula', 'klark2d4@gmail.com', '1004841661', 'Lote', '2015-04-24 10:33:28', '176.10.104.234', '0000-00-00'),
(55, '', '', '', '', '', '2015-04-24 10:33:28', '176.10.104.234', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `ringtone_trident`
--

CREATE TABLE IF NOT EXISTS `ringtone_trident` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `op1` int(11) DEFAULT '0',
  `op2` int(11) DEFAULT '0',
  `op3` int(11) DEFAULT '0',
  `dispositivo` int(11) DEFAULT '0',
  `creado` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `ringtone_trident`
--

INSERT INTO `ringtone_trident` (`id`, `op1`, `op2`, `op3`, `dispositivo`, `creado`) VALUES
(1, 20, 22, 21, 0, '2015-03-10 01:38:57');

-- --------------------------------------------------------

--
-- Table structure for table `starcomfirma`
--

CREATE TABLE IF NOT EXISTS `starcomfirma` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `cargo` varchar(45) DEFAULT NULL,
  `trabajo` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `mail` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `starcomfirma`
--

INSERT INTO `starcomfirma` (`id`, `nombre`, `apellido`, `cargo`, `trabajo`, `telefono`, `mail`) VALUES
(1, 'Jairo', 'Ortiz', 'web developer', '321654987', '3216549879', 'jortiz@misiva.com.ec'),
(2, 'Byron', 'Herrera', 'developer', '32165464', '45654654646', 'jortiz@misiva.com.ec'),
(3, 'Juan', 'Chiriboga', 'Content Manager', '17862066174', '13059059221', 'jfchiriboga@misiva.com.ec'),
(4, 'jairo', 'Ottiz', 'web dev', '65465', '546', '465465'),
(5, 'jarro', 'Ortiz', 'web devolver', '990566211', '9066211', 'jairo_ramiro@yahoo.com'),
(6, 'ANSELMO', 'ARAUJO', 'Associate Content Marketing Director', '1-786-777-8106', '1-786-777-8106', 'anselmo.araujo@smvgroup.com'),
(7, 'Christian', 'Gomez', 'Director Content Marketing - Liquid Thread Co', '2573111 ext 113', '3176591799', 'christian.gomez@col-starcom.co'),
(8, 'Christian', 'Gomez', 'Director Content Marketing - Liquid Thread Co', '2573111 ext 113', '3176591799', 'christian.gomez@liquidthread.com'),
(9, 'Francisco', 'Galán', 'Creative Managing Director', '57 1 257311 Ext.190', '57 3167400172', 'francisco.galan@liquidthread.com'),
(10, 'Chesco', 'Victorino', 'Project Manager', 'LiquidThread Colombia', '+57 3043447774', 'juan.contento@liquidthread.com'),
(11, 'Chesco', 'Victorino', 'Project Manager', '+571 2573111 Ext.191', '+57 3043447774', 'juan.contento@liquidthread.com');

-- --------------------------------------------------------

--
-- Table structure for table `videos_coke`
--

CREATE TABLE IF NOT EXISTS `videos_coke` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `version` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `videos_coke`
--

INSERT INTO `videos_coke` (`id`, `version`) VALUES
(1, 'POWER OF PLAY 31.wmv'),
(2, 'POWER OF PLAY 45.wmv'),
(3, 'POWER OF PLAY 31-SENAS.wmv');

-- --------------------------------------------------------

--
-- Table structure for table `xmltv_canal`
--

CREATE TABLE IF NOT EXISTS `xmltv_canal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `icono` varchar(45) DEFAULT NULL,
  `activo` int(11) DEFAULT '1',
  `creado` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=35 ;

--
-- Dumping data for table `xmltv_canal`
--

INSERT INTO `xmltv_canal` (`id`, `nombre`, `descripcion`, `icono`, `activo`, `creado`) VALUES
(1, 'Teleamazonas', 'Canal Ecuador', 'ff', 1, NULL),
(2, 'Ecuavisa', 'Canal Ecuador', 's/i', 1, NULL),
(3, 'GamaTV', 'Canal Ecuador', '321', 1, NULL),
(4, 'TC mi canal', 'Canal Ecuador', '321', 1, NULL),
(5, 'Canal UNO', 'Canal Ecuador', '321', 1, NULL),
(6, 'RTS', 'Canal Ecuador', '654', 1, NULL),
(7, 'El Cuidadano TV', 'Canal Ecuador', '654', 1, NULL),
(10, '', '', '', 1, '2017-06-06 17:50:47'),
(11, '', '', '', 1, '2017-06-06 18:02:48'),
(12, '', '', '', 1, '2017-06-06 18:32:40'),
(13, '', '', '', 1, '2017-06-06 18:34:44'),
(14, '', '', '', 1, '2017-06-06 18:35:56'),
(15, '', '', '', 1, '2017-06-06 18:36:28'),
(16, '', '', '', 1, '2017-06-06 18:36:40'),
(17, '', '', '', 1, '2017-06-06 18:37:28'),
(18, '', '', '', 1, '2017-06-06 18:41:07'),
(19, '', '', '', 1, '2017-06-06 18:42:55'),
(20, '', '', '', 1, '2017-06-06 18:43:08'),
(21, '', '', '', 1, '2017-06-06 18:43:11'),
(22, '', '', '', 1, '2017-06-06 18:43:30'),
(23, '', '', '', 1, '2017-06-06 18:43:32'),
(24, '', '', '', 1, '2017-06-06 18:44:35'),
(25, '', '', '', 1, '2017-06-06 18:45:16'),
(26, '', '', '', 1, '2017-06-06 18:45:17'),
(27, '', '', '', 1, '2017-06-06 18:47:54'),
(28, '', '', '', 1, '2017-06-06 18:48:20'),
(29, '', '', '', 1, '2017-06-06 18:50:37'),
(30, '', '', '', 1, '2017-06-06 18:51:25'),
(31, '', '', '', 1, '2017-06-06 18:53:47'),
(32, '', '', '', 1, '2017-06-06 18:55:17'),
(33, '', '', '', 1, '2017-06-06 18:56:25'),
(34, '', '', '', 1, '2017-06-06 18:57:21');

-- --------------------------------------------------------

--
-- Table structure for table `xmltv_frecuencia`
--

CREATE TABLE IF NOT EXISTS `xmltv_frecuencia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `tiempo` int(11) DEFAULT '0',
  `activo` int(11) DEFAULT '1',
  `creado` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `xmltv_frecuencia`
--

INSERT INTO `xmltv_frecuencia` (`id`, `nombre`, `descripcion`, `tiempo`, `activo`, `creado`) VALUES
(1, 'Diaria (Lunes a Viernes)', 'Repeticion diaria', 1, 1, '2015-10-05 17:46:48'),
(2, 'Semanal', 'Repeticion una vez a la semana', 7, 1, '2015-10-05 17:46:58'),
(3, 'Semanal, fin de semana', 'repeticion sabado y domingo', 0, 1, '2015-10-05 17:47:01'),
(4, 'Diaria ', 'Repetición todos los dias L, M, M, J, V, S, D', 1, 1, '2015-10-05 17:47:04'),
(5, 'Especial ', 'Una sola vez', 0, 1, '2015-10-05 17:47:06');

-- --------------------------------------------------------

--
-- Table structure for table `xmltv_programa`
--

CREATE TABLE IF NOT EXISTS `xmltv_programa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(200) DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `duracion` int(11) DEFAULT '0',
  `descripcion` text,
  `activo` int(11) DEFAULT NULL,
  `imagen` varchar(200) DEFAULT NULL,
  `id_canal` int(11) DEFAULT NULL,
  `id_frecuencia` int(11) DEFAULT NULL,
  `creado` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `xmltv_programa`
--

INSERT INTO `xmltv_programa` (`id`, `titulo`, `fecha_fin`, `fecha_inicio`, `duracion`, `descripcion`, `activo`, `imagen`, `id_canal`, `id_frecuencia`, `creado`) VALUES
(1, 'Noticias', NULL, '2015-09-24', NULL, 'descipcion', 1, 'SIxx', 1, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `xmltv_programacion`
--

CREATE TABLE IF NOT EXISTS `xmltv_programacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(200) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `duracion` int(11) DEFAULT NULL,
  `id_programa` varchar(45) DEFAULT NULL,
  `activo` int(11) DEFAULT '1',
  `creado` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `xmltv_programacion`
--

INSERT INTO `xmltv_programacion` (`id`, `descripcion`, `fecha`, `duracion`, `id_programa`, `activo`, `creado`) VALUES
(1, 'Canal Ecuador', NULL, NULL, '1', 1, '2015-10-05 18:10:46'),
(2, 'Canal Ecuador', NULL, NULL, '1', 1, NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
