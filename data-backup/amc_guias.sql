-- phpMyAdmin SQL Dump
-- version 4.0.10.20
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 14, 2017 at 04:32 PM
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=165 ;

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
(154, 'SGE-2017-2276', 16, 'Instrucción - Unidad de Construcciones y Licenciamiento Laderas de Pichincha Norte', '2017-08-10 20:43:32', 7),
(155, 'SGE-2017-2277', 12, 'Supervisión Metropolitana de Control', '2017-08-14 15:03:20', 7),
(156, 'SGE-2017-2278', 12, 'Supervisión Metropolitana de Control', '2017-08-14 20:20:11', 7),
(157, 'SGE-2017-2279', 5, 'Dirección Metropolitana de Resolución y Ejecución', '2017-08-14 20:34:25', 7),
(158, 'SGE-2017-2280', 3, 'Dirección Metropolitana de Inspección', '2017-08-14 20:46:41', 7),
(159, 'SGE-2017-2281', 1, 'Instrucción - Unidad de Construcciones y Licenciamiento Eugenio Espejo', '2017-08-14 20:51:41', 7),
(160, 'SGE-2017-2282', 2, 'Secretaría General', '2017-08-14 21:16:17', 7),
(161, 'SGE-2017-2283', 17, 'Instrucción - Unidad de Publicidad', '2017-08-14 21:18:38', 7),
(162, 'SGE-2017-2284', 4, 'Dirección Metropolitana de  Instrucción', '2017-08-14 21:25:50', 7),
(163, 'SGE-2017-2285', 16, 'Instrucción - Unidad de Construcciones y Licenciamiento Laderas de Pichincha Norte', '2017-08-14 21:30:13', 7),
(164, 'SGE-2017-2286', 14, 'Inspeccion Control de Operativos', '2017-08-14 21:32:01', 7);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
