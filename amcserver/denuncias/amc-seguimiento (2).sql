-- phpMyAdmin SQL Dump
-- version 4.0.10.20
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 01, 2017 at 04:38 PM
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=73 ;

--
-- Dumping data for table `amc_denuncias`
--

INSERT INTO `amc_denuncias` (`id`, `id_persona`, `codigo_tramite`, `recepcion_documento`, `id_tipo_documento`, `num_documento`, `remitente`, `cedula`, `email`, `asunto`, `reasignacion`, `descripcion_anexos`, `id_caracter_tramite`, `cantidad_fojas`, `observacion_secretaria`, `envio_inspeccion`, `estado_recepcion_informacion`, `codigo_inspeccion`, `codigo_procedimiento`, `id_zona`, `predio`, `observacion`, `actividad`, `procedimientos`, `persona_asignada`, `fecha_creacion`, `guia`) VALUES
(1, 4, 1, '2017-07-22 13:23:00', 1, 'Denuncia web - 37', 'Diego Salazar Corrale', '0504230780', 'diegodzart75@gmail.com', 'Las excretas de los perros salen hasta la acera y el olor es insoportable en un día de sol pude llegar a oler hasta la otra esquina lo cual ha producido que haya cantidad de moscas la limpieza lo hace calculando una vez cada 25 días.', '2', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/37-Diego'' target=''_blank''>Link denuncia</a>', 1, 0, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-07-24 20:46:49', NULL),
(2, 4, 2, '2017-07-22 20:12:00', 1, 'Denuncia web - 38', 'Nesto Vasconez Noguer', '1400526347', 'danilo.vasconez@gmail.com', 'En reiteradas ocasiones la vivienda colindante realiza fiestas con altos niveles de ruido. Personalmente he solicitado que reduzcan el ruido pero no he tenido respuestas favorables. Este ruido se da a todas horas porque aparentemente es una banda que se reúne a tocar de manera seguida. No tengo datos del dueño del predio pero si me contactan les puedo proporcionar la dirección del lugar que ocasiona el ruido. Por favor en caso de que uds no me puedan ayudar, me podrían dirigir a la entidad competente. Saludos cordiales', '2', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/38-Nesto'' target=''_blank''>Link denuncia</a>', 1, 0, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-07-24 21:27:35', NULL),
(3, 4, 3, '2017-07-24 14:14:00', 1, 'Denuncia web - 44', 'Danie Orna Salvador', '1722378369', 'daniel.ornasalvador@hotmail.c', 'El día 23 de Julio del 2017 en la ciudad de Quito, en el Edificio San Siro ubicado en el pasaje Julio Moreno y Av 6 de Diciembre junto al Megamaxi, sufrí la mordedura de uno de los tres perros que viven en el dpto de mis vecinas, acudí al hospital y me revisaron la mordedura, han sido algunas veces que los animales me atacan sin razón alguna, y no solo a mí, a mi esposa, al conserje y un guardia del edificio. En vista de los ataques decidí abandonar el departamento, y para dar por terminado el contrato, la dueña del departamento que arriendo me pidió fotos de los perros, lo hice y se las envié, luego de esto una de las señoritas vecinas amenazó a mi esposa con demandarla por tomar la foto.<br />\r\nEl domingo 23 de julio por causa de la mordedura me vi obligado a llamar a la policía para poder ver las vacunas de los perros y estar seguro que no tenga rabia, las señoritas tomaron una actitud muy agresiva y desafiante, sin pedir disculpas y dar por terminado el problema. En conclusión me veo obligado a denunciar para que se tomen cartas al respecto, ya que tengo una hija de dos años que también corre peligro con los animales.<br />\r\n<br />\r\nGracias.', '2', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/44-Danie'' target=''_blank''>Link denuncia</a>', 1, 0, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-07-24 21:37:38', NULL),
(4, 4, 4, '2017-07-24 21:03:00', 1, 'Denuncia web - 48', 'Anton Escorza leon ', '0201618212', 'anto.escorza@gmail.com', 'En el interior del domicilio se encuentra una perra de raza husky aproximadamente 2 años de edad, la cual vive en un espacio limitado para su tamaño y está privada de comida y agua.<br />\r\nEl patio se encuentra lleno de heces del animal y nunca recibe ningún tipo de atención . El animal no tiene protección contra lluvia o sol, además de estar caquexico ', '2', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/48-Anton'' target=''_blank''>Link denuncia</a>', 1, 0, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-07-25 23:19:28', NULL),
(5, 4, 5, '2017-07-25 12:25:00', 1, 'Denuncia web - 55', 'Alex  Lowndes Arroba', '1714216403', 'lowndesalex@gmail.com', 'validar que el edificio que se esta construyendo a mi hogar cumpla con todos los requisitos y permisos de construcción necesarios.', '2', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/55-Alex '' target=''_blank''>Link denuncia</a>', 1, 0, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-07-25 23:27:05', NULL),
(6, 4, 6, '2017-07-28 13:44:00', 1, 'Denuncia web - 65', 'Helen Mosquera', '1713790804', 'nenam2006@hotmail.com', 'El perrito pasa siempre afuera, nunca le vemos con comida o agua, según los vecinos los dueños no lo hacen entrar a la casa porque el perrito no quiere, le dejan afuera en lluvia o sol, dejan que los perros callejeros lo peguen y parece que ya es adulto, hoy pase por ahí y tenía sangre en sus partes intimas y sinceramente no creo que lo lleven a un veterinario, por que no le hacen caso para nada, el suele moverles la colita pero parece que no existiera para sus dueños, se les ha preguntado el porque no lo hacen entrar pero solo responden que el perro no quiere como verán la casa tiene patio delantero y terraza, por favor una mano para rescatar a este perrito adulto, la casa está en la esquina sur de la nueva Plaza Michelena en plena Osorio y Tipantuña, una cuadra más abajo de la Avenida Mariscal Sucre al frente se encuentra la Hostal u Hotel Judy<br />\r\nel perrito a veces se da una vuelta por la cuadra de abajo de su casa pero siempre regresa.', '2', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/65-Helen'' target=''_blank''>Link denuncia</a>', 1, 0, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-07-31 14:43:21', NULL),
(7, 4, 7, '2017-07-28 11:14:00', 1, 'Denuncia web - 64', 'Camil Rodríguez e', '1721524401', 'camirodrigueze90@gmail.com', 'El perrito permanece encadenado todo el día, todos los días. Se encuentra en mal estado y sucio. Sus condiciones de vida son deplorables y no han cambiado a lo largo de casi un año. Suele tener agua más no se registra cuando le dan de comer. Los dueños del local presentan mala disposición al hablar del asunto y aseguran que el perro se encuentra en buen estado. ', '2', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/64-Camil'' target=''_blank''>Link denuncia</a>', 1, 0, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-07-31 14:49:25', NULL),
(8, 4, 8, '2017-07-28 09:11:00', 1, 'Denuncia web - 62', 'Franc Padilla Torres', '1721544144', 'neopaco666@gmail.com', 'Han hecho de la casa de alado un taller de carpintería, esto además de producir contaminación acústica produce contaminación en el aire, antes solían pintar con solventes perjudiciales para la salud (lacas, thinner, etc) ahora solo están lijando, pero el polvo que producen es irritante para las vías respiratorias. Llvan una actividad regular desde las 8:00 hasta las 17:00. <br />\r\nYa se ha realizado algunas denuncias en la secretaría del ambiente (caso2017-109260) ', '2', 'Denuncia Web, <a href=''http://agenciadecontrol.quito.gob.ec/index.php/denuncias/denuncias-amc/62-Franc'' target=''_blank''>Link denuncia</a>', 1, 0, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-07-31 14:51:44', NULL),
(10, 30, 11292, '2017-08-01 10:43:58', 2, 'S/N', 'GORETTE ALTAGRACIA CARRERA ESTEVEZ', '', '', 'CAMBIO DE DOMICILIO', '16', '-', 1, 0, '', 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 13:33:14', NULL),
(11, 30, 11293, '2017-08-01 09:54:53', 2, 'GDOC 2017-110742', 'ZONA CALDERON MIRIAN AGUIRRE', '', '', 'CONTROL PROGRAMADO', '3', '-', 1, 0, 'PREDIO N°643021', 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 14:58:29', NULL),
(12, 30, 11294, '2017-08-01 10:01:31', 2, 'GDOC-2017-110759', 'ZONA CALDERON - MIRIAN ENRIQUEA', '', '', 'CONTROL PROGRAMADO', '3', '-', 1, 0, 'PREDIO N°643021', 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 15:01:53', NULL),
(13, 30, 11295, '2017-08-01 10:04:36', 2, 'S/NGDOC 2017-110648', 'ZONA CALDRON - MIRIAN ENRIQUEZ', '', '', 'CONTROL PROGRAMADO', '3', '-', 1, 0, 'PREDIO N°643021 ETAPA N°2', 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 15:04:45', NULL),
(14, 5, 11296, '2017-08-01 10:06:05', 1, 'S/N', 'ANA GUACHAMIN', '1711713782', 'anitaigv@yahoo.com', 'CONSTRUCCIONES ILEGALES', '3', '-', 1, 0, '', 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 15:06:12', NULL),
(15, 5, 11297, '2017-08-01 10:09:28', 1, 'S/N', 'MARIO SALVADOR', '170072609-2', 'ssam4615@gmail.com', 'CONSTRUCCCIONES ILEGALES', '3', '-', 1, 0, '', 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 15:09:36', NULL),
(16, 30, 11298, '2017-08-01 10:24:56', 2, 'OFICIO S/N', 'ANTONIO RAMIREZ', '', '', 'JUSTIFICA CONSTRUCCION DE HACE 10 AÑOS INSPECCIONADA', '3', '-', 1, 0, '', 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 15:25:20', NULL),
(17, 30, 11299, '2017-08-01 10:35:23', 2, 'OFICIO S/N', 'PEDRO ARTURO', '', '', 'PRESENTACIO DE LUAE', '1', 'LUAE 2017', 1, 16, '', 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 15:35:21', NULL),
(18, 30, 11300, '2017-08-01 10:49:32', 2, 'OFICIO S/N', 'LIZARDO JIMENEZ', '', '', 'PRESENTA LUAE 2017', '1', '-', 1, 3, 'EXP- 376-2017-UDC-ZEE', 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 15:49:29', NULL),
(19, 30, 11301, '2017-08-01 10:53:15', 2, 'OFICIO N°2017-3785-PN-DPMS', 'NEYB FABRICIO JIMENEZ', '', '', 'SOLICITA OPERATIVOS PARA VERIFICACION DE PERMISOS DE LOCALES COMERCIALES EN EL CIRCUITO SAN JUAN', '3', '-', 1, 6, '', 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 15:54:31', NULL),
(20, 30, 11302, '2017-08-01 11:01:08', 2, 'OFICIO N° EPMGDT-2017-754/ GDOC 2017-110985', 'QUITO TURISMO - VERONICA SEVILLA', '', '', 'REUNION PARA FIESTA DE LA LUZ', '12', '-', 1, 2, 'REF EXP-677-2017 / RES. AMC-DRYE-RDG-2017-745', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 16:02:07', '53'),
(21, 30, 11303, '2017-08-01 11:03:55', 2, 'OFICIO N°EPMDGT-GFA-T-089-2017', 'QUITO TURISMO - CECIBEL TUALOMBO', '', '', 'REMITE COPIA DE LA FACTURA 1021000001574', '5', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 16:05:03', '55'),
(22, 30, 11304, '2017-08-01 11:11:18', 2, 'S/N', 'QUITO TURISMO', '', '', 'DEPOSITO CONSIGNACION 124-2017', '5', '-', 1, 1, 'REF-EXP-186-2017-UCTCL-ZLM / PROV-1380-2017', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 16:12:26', '55'),
(23, 30, 11305, '2017-08-01 11:20:21', 2, 'S/N', 'RODRIGO DURAN', '', '', '-', '5', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 16:20:10', '55'),
(24, 30, 11306, '2017-08-01 11:20:53', 2, 'S/N', 'UNI', '', '', '-', '5', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 16:20:28', '55'),
(25, 7, 11307, '2017-08-01 11:22:48', 2, 'S/N', 'EDWIN JARA', '1711089720', 'leojara4@hotmail.com', 'MALA TENENCIA DE MASCOTAS', '3', '-', 1, 0, '', 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 16:22:40', NULL),
(26, 30, 11308, '2017-08-01 11:36:56', 2, 'S/N', 'MARIA FERNANA CABASCAGO', '', '', 'CONVENIO DE PAGO ', '5', 'CONVENIO , FACTURA', 1, 4, 'REF-EXP-772-2016-UDTCL-ZLM', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 16:37:15', '55'),
(27, 30, 11309, '2017-08-01 11:39:14', 2, 'MEMORANDO UDC-LD-2017-348', 'ZONA LA DFELICIA / LUIS CHULCA', '', '', 'INFORME DE OPERATIVO MACRO', '14', '-', 1, 2, 'OPERATIVO CONTROL  28-JULIO-2017', 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 16:39:30', NULL),
(28, 30, 11310, '2017-08-01 11:40:27', 2, 'S/N', 'ZONA LA DELICIA / LUIS CHULCA', '', '', 'REPOSICION DE SELLOS', '4', '-', 1, 2, 'SELLLO 00009-AMC', 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 16:40:09', NULL),
(29, 30, 11311, '2017-08-01 11:41:09', 2, 'MEMORANDO UDC-LD-2017-341', 'ZONA LA DELICIA / LUIS CHULCA', '', '', 'INFORME OPERATIVO 27 JULIO 2017 ', '14', '-', 1, 2, '', 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 16:40:47', NULL),
(30, 30, 11312, '2017-08-01 11:41:52', 2, 'MEMORANDO N. AMC UDC-LD 2017-339', 'ZONA LA DELICIA / LUIS CHULCA', '', '', 'AUTO DE INICIO FLAGRANTE N.1682017', '1', 'AUTO INICIO', 1, 5, 'OPERATIVO DE CONTROL', 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 16:41:24', NULL),
(31, 30, 11313, '2017-08-01 12:01:29', 2, 'OFICIO S/N', 'JOSE ANDRADE', '', '', 'SOLICITA INFORMACION SOBRE ESP SAN- DE LOS PREDIO SN°99184-179718', '5', '-', 1, 5, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:01:33', '55'),
(32, 30, 11314, '2017-08-01 12:04:53', 2, 'MEMORANDO N°UDCMBI-2017-216', 'BIENES INV. / CARINA CHAVEZ', NULL, NULL, 'NO EXISTE EXP ADMINISTRATIVO SANCIONADOR ', '3', '-', 1, 0, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:06:22', NULL),
(33, 30, 11315, '2017-08-01 12:10:26', 2, 'MEMORANDO n|AMC-UDCMBI-2017-217', 'BIENES INV / CARINA CHAVEZ', '', '', 'RENOVACION DE POLIZA', '5', 'ANEXA POLIZA', 1, 7, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:12:58', '55'),
(34, 5, 11316, '2017-08-01 12:16:13', 2, 'OFC MSP-CZ9-2017-00171', 'ING. LUIS MARTINEZ', NULL, NULL, 'SOLICITUD DE INSPECCION ', '12', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:26:41', '53'),
(35, 5, 11317, '2017-08-01 12:32:52', 2, 'S/N', 'DANIELA COBO', '', '', 'PAGO DE MULTA Y RETIRO DE SELLOS', '5', '-', 1, 2, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:33:40', '55'),
(36, 5, 11318, '2017-08-01 12:35:51', 2, 'MEMO AMC-CMASA-ZQ-2017-168', 'AB.OSCAR CUSQUILLO', NULL, NULL, 'REMITO HOJA DE REGISTRO DIARIO', '7', '-', 1, 2, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:37:54', NULL),
(37, 5, 11319, '2017-08-01 12:39:17', 2, 'S/N', 'AB. SUSANA LOPEZ', '', '', 'SOLICITA SE ARCHIVE PROCEDIMIENTO ADMINISTRATVO', '1', '-', 1, 0, '', 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:41:20', NULL),
(38, 5, 11320, '2017-08-01 12:42:01', 2, 'MEMO 2017-167', 'AB. OSCAR CUSQUILLO', NULL, NULL, 'CONTESTACION AL MEMO', '4', '-', 1, 1, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:42:46', NULL),
(39, 5, 11321, '2017-08-01 12:43:58', 2, 'MEMO 2017-520', 'AB. FREDDY ESCOBAR', NULL, NULL, 'CERTIFICACION DE EXPEDIENTES ABIERTOS', '4', '-', 1, 3, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:44:05', NULL),
(40, 5, 11322, '2017-08-01 12:45:44', 2, 'MEMO 2017-521', 'AB. FREDDY ESCOBAR', NULL, NULL, 'SE REMITE 3 SOLICITUDES DE COPIAS CERTIFICADAS', '2', '-', 1, 7, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:46:41', NULL),
(41, 5, 11323, '2017-08-01 12:47:50', 2, 'S/N', 'EVELYN BRUNNER', '', '', 'SOLICITA ARCHIVO DE EXPEDIENTE', '17', '-', 1, 11, '', 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:49:01', NULL),
(42, 5, 11324, '2017-08-01 12:50:08', 2, 'S/N', 'MANUEL PUETATE', '', '', 'SOLICITA ORDEN DE PAGO', '5', '-', 1, 1, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:56:04', '55'),
(43, 5, 11325, '2017-08-01 12:58:13', 2, 'S/N', 'EFRAIN MIRANDA', NULL, NULL, 'REFERENTE A EXP. 2017-430', '1', '1 EXPEPEDIENTE', 1, 3, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:58:54', NULL),
(44, 30, 11326, '2017-08-01 12:59:02', 2, 'OFICIO S/N', 'LUIS FLORES', NULL, NULL, 'RENOVACIONDE POLIZA DE GARANTIA', '5', '-', 1, 0, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 17:59:06', '55'),
(45, 5, 11327, '2017-08-01 13:00:36', 2, 'OFC 2017-3007', 'ING. JUAN SOLORZANO', NULL, NULL, 'DESALOJO DE ESCOMBROS', '12', 'GDOC 2017-089984', 1, 12, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 18:02:25', '53'),
(46, 30, 11328, '2017-08-01 13:01:59', 2, 'S/N', 'LUIS FLORES', '', '', 'RENOVACION DE POLIZA', '12', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 18:04:09', '53'),
(47, 30, 11329, '2017-08-01 13:07:18', 2, 'OFICIO S/N', 'IVONNE TAPIA ', '', '', 'PAGO MULTA ', '13', '-', 1, 5, '', 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 18:07:27', NULL),
(48, 30, 11330, '2017-08-01 13:12:27', 2, 'OFICIO S/N', 'AURELIO SUAREZ CANO', '', '', 'PAGO DE MULTA', '5', '-', 1, 0, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 18:12:40', '55'),
(49, 5, 11331, '2017-08-01 13:25:53', 2, 'MEMO 2017-182', 'AB. EDWN TORRES LOPEZ', NULL, NULL, 'INFORME MENSUAL', '4', '-', 1, 5, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 18:26:59', NULL),
(50, 5, 11332, '2017-08-01 13:28:53', 2, 'MEMO 2017-179', 'AB. EDWIN TORRES LOPEZ', NULL, NULL, 'INSPECCION DE VERIFICACION', '3', '-', 1, 2, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 18:29:31', NULL),
(51, 5, 11333, '2017-08-01 13:30:20', 2, 'MEMO 2017-180', 'AB. EDWIN TORRES LOPEZ', NULL, NULL, 'INSPECCION DE VERIFICACION', '3', '-', 1, 3, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 18:30:22', NULL),
(52, 5, 11334, '2017-08-01 13:31:27', 2, 'MEMO 2017-439', 'AB. EDWIN TORRES LOPEZ', NULL, NULL, 'PEDIDO DE INSPECCION', '3', '-', 1, 2, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 18:31:38', NULL),
(53, 5, 11335, '2017-08-01 13:34:43', 2, 'MEMO 2017-442', 'ZONA LOS CHILLOS-AB. EDWIN TORRES', NULL, NULL, 'INFORME DE INSPECCION CONJUNTA', '3', '-', 1, 2, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 18:34:54', NULL),
(54, 5, 11336, '2017-08-01 13:35:50', 2, 'MEMO 2017-443', 'AB. EDWIN TORRES', NULL, NULL, 'INFORME MENSUAL', '4', '-', 1, 10, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 18:35:51', NULL),
(55, 30, 11337, '2017-08-01 15:17:20', 1, 'S/N', 'MAURICIO VILLAGOMEZ', NULL, NULL, 'VERIFICACION DE PERMISO CONSTRUICCION', '3', 'FOTOS, CEDULA, CROQUIS', 1, 10, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:17:23', NULL),
(56, 30, 11338, '2017-08-01 15:18:58', 2, 'OFICIO-S/N', 'ESPERANZA RAYO', '', '', 'PRESENTA LUA', '1', 'LUA', 1, 0, '', 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:19:16', NULL),
(57, 30, 11339, '2017-08-01 15:21:07', 1, 'S/N', 'RONY GRANJA ', '1708218142', 'arqgranj@hotmail.com', 'CONTRUCCION Y PERMISO', '3', 'FOTOS, CEDULA', 1, 7, '', 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:21:26', NULL),
(58, 30, 11340, '2017-08-01 15:23:08', 2, 'OFICIO-S/N', 'PABLO DIAZ', NULL, NULL, 'DOCUMENTO HABILITANTE ITDI 17-375-D', '3', 'OFICIOS', 1, 6, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:23:15', NULL),
(59, 30, 11341, '2017-08-01 15:24:07', 2, 'OFICIO N.SA-GSA-FC-2017-2858/2017092052', 'SANTIAGO ANDRADE', NULL, NULL, 'COMPLEJO GASTRONOMICO EL CAMINITO NO HA EJECUTADO ACCIONES PARA MITIGAR DAÑOS FUTUROS', '12', '-', 1, 1, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:25:25', '53'),
(60, 30, 11342, '2017-08-01 15:27:45', 2, 'OFICIO-20173734 / 2017-109619', 'XAVIER MOLINA', '', '', 'EXPDIENTE ADMINISTRATIVOS ABIERTOS / ICUS', '2', '-LUAE', 1, 0, '', 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:30:42', NULL),
(61, 30, 11343, '2017-08-01 15:31:51', 2, 'OFICIO-AZEA-UCC-2017-3735 / GDOC 2017-046344', 'ZONA ELOY ALFARO / EDWIN VOSMEDIANO ', NULL, NULL, 'SOLICITUD DE CONTROL DE CONSTRUCCION SECTOR JESUS DEL GRAN PODER ALTO', '3', '-', 1, 5, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:32:33', NULL),
(62, 30, 11344, '2017-08-01 15:33:31', 2, 'OFICIO-AZAE-UCC-2017-20173749', 'ZONA ELOY ALFARO / EDWIN VOSMEDIANO ', NULL, NULL, 'ENTREGA INFORME TECNICO', '3', '-', 1, 16, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:34:11', NULL),
(63, 30, 11345, '2017-08-01 15:35:46', 2, 'OFICIO-S/N', 'MARIA LICENIA MIELES', '', '', 'PAGA MULTA', '5', 'FACTURA', 1, 8, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:35:35', '55'),
(64, 30, 11346, '2017-08-01 15:36:39', 2, 'OFICIO-S/N', 'ANA SILVA', NULL, NULL, 'ENTREGA LUAE', '3', 'LUAE', 1, 3, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:36:22', NULL),
(65, 30, 11347, '2017-08-01 15:37:26', 2, 'OFICION -242-EP-2017 / GDOC 2017-110385', 'EDUARDO DEL POZO FIERRO', NULL, NULL, 'CONTROL DE VENTAS INFORMALES TREBOL', '12', 'FOTOS', 1, 7, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:37:50', '53'),
(66, 30, 11348, '2017-08-01 15:38:44', 2, 'CIRCULA N 64', 'ADMINISTRACION GENERAL - SANTIAGO BETANCUR', NULL, NULL, 'SEGUIMIENTO DE RECOMENDACIOENS AUDITORIA', '12', '-', 1, 2, NULL, 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:38:53', '53'),
(67, 30, 11349, '2017-08-01 15:39:45', 2, 'MEMORANDO AMC-CMASA-AZEA-2017-191', 'ZONA ELOY ALFARO - JUAN CARLOS TOSCANO', '', '', 'TRABAJO FUERA HORARIO NORMAL', '20', '-', 1, 1, '', 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:39:56', NULL),
(68, 30, 11350, '2017-08-01 15:41:17', 2, 'MEMORANDO AMC-UDC-LDPS-2017-176', 'LADERAS SUR /MARCO BARRAGAN', '', '', 'INFORME OPERATIVO CONTROL LUAE', '14', '-', 1, 2, '', 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:41:22', NULL),
(69, 30, 11351, '2017-08-01 15:42:37', 2, 'MEMORANDO AMC-UDC-LDPS-2017-177', 'LADERAS SUR/ MARCO BARRAGAN ', '', '', 'INFORME OPERATIVO LUAE', '14', '-', 1, 2, '', 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:42:44', NULL),
(70, 30, 11352, '2017-08-01 15:43:34', 2, 'MEMORANDO AMC-CMASA-ZEA-2017-1889', 'ELOY ALFARO / MARCO BARRAGAN', '', '', 'INSISTENCIA DE INFORME DE INSPECCION', '3', '-', 1, 4, 'EXPEDIENTE 0912017', 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:43:54', NULL),
(71, 30, 11353, '2017-08-01 15:45:08', 2, 'MEMORANDO AMC-CMASA-AZAEA-2017-190', 'ELOY ALFARO / MARCO BARRAGAN ', NULL, NULL, 'CONTROL DE ASISTENCIA', '7', '-', 1, 10, NULL, 'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:45:08', NULL),
(72, 30, 11354, '2017-08-01 15:46:02', 2, 'OFICIO S/N', 'BEATRIZ CASTRO', '', '', 'CONCER TIEMPO PRESENTAR LMU20 ', '5', '-', 1, 3, '', 'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-08-01 20:46:32', '55');

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
  `unidad` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `creado` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=56 ;

--
-- Dumping data for table `amc_guias`
--

INSERT INTO `amc_guias` (`id`, `numero`, `unidad`, `creado`) VALUES
(51, 'SGE-2017-2181', 'Unidad de Informática', '2017-07-31 19:23:37'),
(53, 'SGE-2017-2182', 'Supervisión Metropolitana de Control', '2017-08-01 20:52:46'),
(55, 'SGE-2017-2183', 'Dirección Metropolitana de Resolución y Ejecución', '2017-08-01 21:11:58');

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
(1, 'Instruc-Constru y Licen Eugenio Espejo', 'Instrucción - Unidad de Construcciones y Licenciamiento Eugenio Espejo', '1', '2017-06-09 19:25:16', 6),
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
(13, 'Instruc-Aseo Salud y Ambiente Eugenio Espejo', 'Instrucción - Aseo Salud y Ambiente Eugenio Espejo', '1', '2017-07-31 16:00:39', 5),
(14, 'Inspeccion - Control de Operativos', 'Inspeccion - Control de Operativos', '1', '2017-07-31 16:01:26', 2),
(15, 'DEVUELTO', 'DEVUELTO', '1', '2017-07-31 16:03:37', 18),
(16, 'Instruc-Constru y Licen Laderas de Pichincha Norte', 'Instrucción - Unidad de Construcciones y Licenciamiento Laderas de Pichincha Norte', '1', '2017-07-31 16:04:21', 7),
(17, 'Instruc-Unidad de Publicidad', 'Instrucción - Unidad de Publicidad', '1', '2017-07-31 16:04:42', 8),
(18, 'Instruc-Ambiente y Telecomunicaciones', 'Instrucción - Ambiente y Telecomunicaciones', '1', '2017-07-31 16:06:31', 4),
(20, 'Inspeccion- Fauna Urbana', 'Dirección Metropolitana de Inspección- Fauna Urbana', '1', '2017-08-01 20:09:57', NULL);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `qo_groups`
--

INSERT INTO `qo_groups` (`id`, `name`, `description`, `active`) VALUES
(1, 'Administrador', 'Administrador ', 1),
(2, 'Administrador Secretaria General', 'Administrador  Secretaria General', 1),
(3, 'Secretaria General', 'Usuarios Secretaria General', 1),
(4, 'Zonales', 'Usuarios  Zonales  Secretaria General', 1),
(5, 'Denuncias WEB', 'Denuncias WEB  Secretaria General', 1),
(6, 'Inspeccion', 'Denuncias Inspeccion', 1);

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
(3, 30, 1, 0);

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
(5, 5);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=61 ;

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
(60, 'ERROR', '{ "script": "privilege.php", "method": "get_by_id", "message": "In the qo_privileges table, row id: 6 has data that could not be decoded" }', '2017-07-17 14:54:15');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=31 ;

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
(30, 'KATHERINE', 'FERAUD', 'katherine.feraud@quito.gob.ec', 'efab24c8e0c66c63eb77241fb678b2a56d698587', 'en', 1);

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
('denuncias', 'desktop/denuncias', 'Denuncias', 'Administracion denuncias ', '{\r\n  "id": "denuncias",\r\n  "type": "desktop/denuncias",\r\n  "about": {\r\n    "author": "",\r\n    "description": "Mantenimiento de Denuncias.",\r\n    "name": "Ventana Denuncias",\r\n    "url": "",\r\n    "version": "1.0"\r\n  },\r\n  "server": {\r\n      "methods": [\r\n         { "name": "accesosAdministrador", "description": "Full acceso" },\r\n         { "name": "accesosZonales", "description": "Personal de zonales" }\r\n\r\n      ],\r\n      "class": "QoDenuncias",\r\n      "file": "desktop/denuncias/denuncias.php"\r\n  },\r\n  "client": {\r\n    "class": "QoDesk.DenunciasWindow",\r\n    "css": [\r\n      {\r\n        "directory": "desktop/denuncias/client/resources/",\r\n        "files": [ "styles.css" ]\r\n      },\r\n			{\r\n        "directory": "common/libraries/",\r\n        "files": [ "datetime/date-time-ux.css", "Spinner/Spinner.css", "MultiSelect.css"  ]\r\n      }\r\n    ],\r\n    "javascript": [\r\n      {\r\n        "directory": "desktop/denuncias/client/",\r\n        "files": [  "denuncias-win.js" ]\r\n      },\r\n			{\r\n        "directory": "common/libraries/",\r\n        "files": [ "datetime/date-time-ux.js","CheckColumn.js", "Spinner/SpinnerField.js", "Spinner/Spinner.js","MultiSelect.js"  ]\r\n      },\r\n			{\r\n        "directory": "qwiki/admin/client/",\r\n        "files": [ "QoAdmin.js" ]\r\n      },\r\n			{\r\n				"directory": "qwiki/admin/client/lib/",\r\n        "files": [ "ActiveColumn.js", "ColumnNodeUI.js", "Nav.js", "SearchField.js", "TooltipEditor.js" ]\r\n      }\r\n    ],\r\n    "launcher": {\r\n      "config": {\r\n        "iconCls": "denuncias-icon",\r\n        "shortcutIconCls": "denuncias-shortcut",\r\n        "text": "Denuncias",\r\n        "tooltip": "<b>Denuncias</b>"\r\n      },\r\n      "paths": {\r\n        "startmenu": "/"\r\n      }\r\n    }\r\n  }\r\n}\r\n', 1),
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
(2, 4, '{"launchers":{"shortcut":["demo-accordion","demo-grid","demo-layout","demo-bogus","demo-tab","denuncias-crecretaria","denuncias","denunciasweb"],"quickstart":["denuncias-crecretaria"]}}'),
(3, 4, '{"launchers":{"shortcut":["demo-accordion","demo-grid","demo-layout","demo-bogus","demo-tab","kiiconnect"],"quickstart":["kiiconnect"]}}'),
(3, 5, '{"launchers":{"shortcut":["demo-accordion","demo-grid","demo-layout","demo-bogus","demo-tab","kiiconnect","denuncias-inspeccion","denunciasinspeccion"],"quickstart":["kiiconnect","denuncias"],"autorun":["denunciasinspeccion","denuncias"]}}'),
(4, 6, '{"launchers":{"autorun":["denuncias"],"shortcut":["denuncias"],"quickstart":["denuncias"]}}'),
(3, 7, '{"launchers":{"autorun":["denuncias"],"shortcut":["demo-accordion","demo-grid","demo-layout","demo-bogus","demo-tab","denuncias"],"quickstart":["denuncias"]},"appearance":{"fontColor":"333333","themeId":2,"taskbarTransparency":100}}'),
(2, 28, '{"launchers":{"shortcut":["qo-preferences","demo-accordion","demo-grid","demo-layout","demo-bogus","demo-tab","denunciassecretaria"],"autorun":["denunciassecretaria"],"quickstart":["denunciassecretaria"]}}'),
(5, 29, '{"launchers":{"autorun":["denunciasweb"]}}'),
(3, 30, '{"launchers":{"shortcut":["demo-accordion","demo-grid","demo-layout","demo-bogus","demo-tab","denuncias"],"autorun":["denuncias"],"quickstart":["denuncias"]},"appearance":{"fontColor":"333333","themeId":2,"taskbarTransparency":100}}');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `qo_privileges`
--

INSERT INTO `qo_privileges` (`id`, `name`, `description`, `data`, `active`) VALUES
(1, 'System Administrator', 'System administrator privileges.  Full access.', '{"denuncias":["accesosAdministrador"],"denunciasinspeccion":[],"denunciassecretaria":[],"denunciasweb":[],"qo-admin":["addGroup","addMember","addPrivilege","approveSignupsToGroup","deleteGroup","deleteMember","deletePrivilege","denySignups","editGroup","editGroupPrivilege","editMember","editMembersGroups","editPrivilege","editPrivilegeModules","viewGroups","viewGroupPrivileges","viewMembers","viewMemberGroups","viewPrivileges","viewPrivilegeModules","viewSignups"],"qo-preferences":["saveAppearance","saveAutorun","saveBackground","saveQuickstart","saveShortcut","viewThemes","viewWallpapers"],"qo-profile":["loadProfile","saveProfile","savePwd"]}', 1),
(2, 'Administrador Secretaria General', 'Interfaces Administrador  Secretaria General', '{"denuncias":["accesosAdministrador"],"denunciasweb":[],"qo-preferences":["saveAppearance","saveAutorun","saveBackground","saveQuickstart","saveShortcut","viewThemes","viewWallpapers"],"qo-profile":["loadProfile","saveProfile","savePwd"]}', 1),
(3, 'Secretaria General', 'Interface usuario Secretaria General', '{"denuncias":[],"qo-preferences":["saveAppearance","saveAutorun","saveBackground","saveQuickstart","saveShortcut","viewThemes","viewWallpapers"],"qo-profile":["loadProfile","saveProfile","savePwd"]}', 1),
(4, 'Zonales', 'Usuarios  Zonales - Secretaria General', '{"denuncias":["accesosZonales"],"qo-preferences":["saveAppearance","saveAutorun","saveBackground","saveQuickstart","saveShortcut","viewThemes","viewWallpapers"],"qo-profile":["loadProfile","saveProfile","savePwd"]}', 1),
(5, 'Denuncias WEB', 'Usuarios Denuncias WEB - Secretaria General', '{"denunciasweb":[],"qo-preferences":["saveAppearance","saveAutorun","saveBackground","saveQuickstart","saveShortcut","viewThemes","viewWallpapers"],"qo-profile":["loadProfile","saveProfile","savePwd"]}', 1),
(6, 'Inspeccion', 'Inspeccion', '{"denunciasinspeccion":[]}', 1);

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
('0780eb33bff335e028e492de4d28f02b', 6, 4, '{"module":{}}', '172.20.136.70', '2017-07-26 15:20:51'),
('1f10d34cc623a8d1fe866de97c6cff60', 1, 1, '{"module":{}}', '172.20.136.71', '2017-07-25 08:24:37'),
('2f17699edfaa5528af3307c682484f57', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-24 15:34:13'),
('31f965afc4876e9099297ea2789d6dbe', 1, 1, '{"module":{}}', '172.20.136.71', '2017-07-24 11:25:28'),
('3bd4b44da53a89141190c6bcaa87ead8', 1, 1, '{"module":{}}', '172.20.138.60', '2017-07-25 15:44:28'),
('41a6b8ab2419effca20b01a4ca08c86c', 1, 1, '{"module":{}}', '172.20.138.33', '2017-08-01 12:14:04'),
('433b63c573e66df37db32270edfb163e', 1, 1, '{"module":{}}', '172.20.136.71', '2017-07-31 14:03:06'),
('47ecc9f323a39de70e8fbe0dfce8a870', 1, 1, '{"module":{}}', '172.20.136.71', '2017-08-01 14:08:14'),
('55b22f128e1b150d06099e24dc07b363', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-28 12:13:20'),
('5d5ba7efcbb1bdc9a8818523876f4ae0', 1, 1, '{"module":{}}', '172.20.136.71', '2017-07-31 11:10:30'),
('5eb0826908c885c2a88dc5c4d8a732c7', 1, 1, '{"module":{}}', '172.20.136.71', '2017-07-24 11:26:00'),
('618b7740dcfd8d2762e2eb55a0188630', 7, 3, '{"module":{}}', '172.20.136.108', '2017-08-01 10:16:36'),
('62a9ed74d6d1bd261f34247c407bd4ae', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-25 10:25:56'),
('639b14ecdd13a49d9767f7011b3c2127', 1, 1, '{"module":{}}', '172.20.136.71', '2017-07-25 15:10:53'),
('65ffe31f6b402641a09fb4b3bca88006', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-24 15:26:21'),
('68e1294b592cdc328c47cf0daa2d73d8', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-28 11:52:07'),
('6c9111671782066c15baf4353adcd1fb', 2, 1, '{"module":{}}', '172.20.138.40', '2017-07-24 12:53:26'),
('7b1de8cce68cc711dca0a9555365f5fc', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-24 16:21:04'),
('7b26ee4e3368df57fdac99aba3b638c1', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-24 15:56:20'),
('7b75e62eda16d2e35e9578554ccab1ee', 1, 1, '{"module":{}}', '172.20.136.126', '2017-08-01 15:08:31'),
('7ea53a241e831522d5099e3505f1bb7b', 2, 1, '{"module":{}}', '172.20.136.48', '2017-07-24 14:10:38'),
('86140a4d18ffcf695e74afdb9cb9b162', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-26 14:17:07'),
('88b4b18e40959970924d4d484f08f267', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-25 18:09:54'),
('913d06ad23be3fd7d9cc0931fe13645b', 1, 1, '{"module":{}}', '172.20.136.46', '2017-08-01 16:15:35'),
('93e8bfd643e7fa77d83b0aa3bbfe224d', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-31 08:55:34'),
('9cb4f1addeb666e4c3919da267f7e4af', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-26 08:05:49'),
('a8d3012f096b0e18fabc04e5b3f8e7de', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-28 11:56:12'),
('b6ade327bdb7c7e9a404c0428f95fd0f', 1, 1, '{"module":{}}', '172.20.138.25', '2017-08-01 10:34:26'),
('bb03cb01dfb0e1ab31efbd417711fe1b', 29, 5, '{"module":{}}', '172.20.138.62', '2017-07-25 15:57:16'),
('bc161b999636abbe2ed1f3c10276c389', 6, 4, '{"module":{}}', '172.20.136.70', '2017-07-26 08:38:19'),
('c37c88b8fb806fc22688e61d3952cf24', 7, 3, '{"module":{}}', '172.20.136.108', '2017-07-26 08:41:21'),
('c6ec9e2f21f1a0b1aff9d86d98dcaff0', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-28 07:55:34'),
('c79e1f7f0c9940fd7a43ed665021842e', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-31 09:31:28'),
('d513c7a4c6f74efe8cbda4bc20fb7f1e', 5, 3, '{"module":{}}', '172.20.136.126', '2017-08-01 09:02:12'),
('dd3ef7ee7f030e2835cef834422c9421', 1, 1, '{"module":{}}', '172.20.136.71', '2017-07-28 12:36:10'),
('eb8cf78fe60c29a9e12ec65df749bd94', 1, 1, '{"module":{}}', '172.20.136.71', '2017-07-31 08:45:23'),
('f3a21f36cf97b123beee00851c88e02d', 4, 2, '{"module":{}}', '172.20.136.124', '2017-07-26 17:50:56');

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
