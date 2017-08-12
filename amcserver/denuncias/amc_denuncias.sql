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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
