-- phpMyAdmin SQL Dump
-- version 4.0.10.20
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 24, 2019 at 04:50 PM
-- Server version: 5.5.37-MariaDB-wsrep
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `portal`
--

-- --------------------------------------------------------

--
-- Table structure for table `amc_agendar_cita`
--

CREATE TABLE IF NOT EXISTS `amc_agendar_cita` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo_tramite` varchar(30) DEFAULT NULL,
  `DateSubmitted` datetime DEFAULT NULL,
  `UserIp` varchar(14) DEFAULT NULL,
  `Username` varchar(10) DEFAULT NULL,
  `UserId` int(1) DEFAULT NULL,
  `Lang` varchar(5) DEFAULT NULL,
  `asignado` varchar(30) DEFAULT NULL,
  `confirmed` varchar(5) DEFAULT NULL,
  `prosesado` varchar(5) DEFAULT 'false',
  `nombre` varchar(20) DEFAULT NULL,
  `apellido` varchar(20) DEFAULT NULL,
  `email` varchar(29) DEFAULT NULL,
  `cedula` varchar(10) DEFAULT NULL,
  `telefono1` varchar(10) DEFAULT NULL,
  `expediente` varchar(255) DEFAULT NULL,
  `inspector` varchar(255) DEFAULT NULL,
  `comentarios` varchar(500) NOT NULL,
  `fechaasignada` datetime DEFAULT NULL COMMENT 'Fecha turno asignado',
  `fechaatendido` datetime DEFAULT NULL COMMENT 'Fecha que se atendio para dar el turno',
  `motivonegar` varchar(255) DEFAULT NULL,
  `id_atendido` int(5) DEFAULT NULL COMMENT 'Persona que atendio',
  `id_inspector` int(5) DEFAULT NULL COMMENT 'id_inspector que se le asigno',
  `atendido_inspector` int(1) DEFAULT NULL COMMENT 'si el inspector atendio. 1 verdadero 0 falso',
  `resultados` varchar(255) DEFAULT NULL COMMENT 'que se hizo ',
  `fecha` datetime DEFAULT NULL COMMENT 'Fecha que se recibe el pedido de turno',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT AUTO_INCREMENT=1333 ;

--
-- Dumping data for table `amc_agendar_cita`
--

INSERT INTO `amc_agendar_cita` (`id`, `codigo_tramite`, `DateSubmitted`, `UserIp`, `Username`, `UserId`, `Lang`, `asignado`, `confirmed`, `prosesado`, `nombre`, `apellido`, `email`, `cedula`, `telefono1`, `expediente`, `inspector`, `comentarios`, `fechaasignada`, `fechaatendido`, `motivonegar`, `id_atendido`, `id_inspector`, `atendido_inspector`, `resultados`, `fecha`) VALUES
(1321, NULL, '2019-06-20 18:55:52', '190.152.144.12', '', 0, NULL, NULL, 'false', 'true', 'Byron Gustavo', 'Herrera Avalos', 'byron.herrera@quito.gob.ec', '1716783301', '023442482', 'amc 33220', 'juan pinto', '', '2019-10-16 05:00:00', NULL, 'test111', NULL, 1, NULL, NULL, '2019-06-20 13:47:00'),
(1322, NULL, '2019-06-20 21:12:08', '190.152.144.12', '', 0, NULL, NULL, 'false', 'false', 'Juan Perez', 'Perez', 'byron.herrera@quito.gob.ec', '1716783301', '0235546666', 'amc 33220', 'juan perez', '', NULL, NULL, '', NULL, 1, NULL, NULL, '2019-06-20 16:11:00'),
(1323, NULL, '2019-10-18 20:25:50', '190.152.144.12', '', 0, NULL, NULL, 'false', 'false', 'David', 'Mera', 'byron.herrera@quito.gob.ec', '2123123131', '0983332323', 'amc-insp-2019-001', '{nombreinspector:value}', '', NULL, NULL, '', NULL, 1, NULL, NULL, '2019-10-18 13:51:00'),
(1324, NULL, '2019-10-22 14:13:22', '190.152.144.12', '', 0, NULL, NULL, 'false', 'false', 'David', 'Mera', 'byron.herrera@quito.gob.ec', '171108093', '0983332323', 'amc-insp-2019-001', '{nombreinspector:value}', '', NULL, NULL, '', NULL, NULL, NULL, NULL, '2019-10-21 15:02:00'),
(1332, NULL, '2019-10-24 03:22:23', '186.46.204.161', '', 0, NULL, NULL, NULL, 'false', 'Byron G.', 'Herrera A.', 'byron.herrera@quito.gob.ec', '1711080893', '0999999999', 'exp 001', NULL, 'expediene 001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-10-23 22:19:00');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
