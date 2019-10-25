/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50727
 Source Host           : localhost:3306
 Source Schema         : procesos-amc

 Target Server Type    : MySQL
 Target Server Version : 50727
 File Encoding         : 65001

 Date: 25/10/2019 02:18:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for amc_agendar_cita
-- ----------------------------
DROP TABLE IF EXISTS `amc_agendar_cita`;
CREATE TABLE `amc_agendar_cita`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_persona` int(11) NULL DEFAULT NULL,
  `estado` int(11) NULL DEFAULT NULL,
  `nombre` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `apellido` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(29) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cedula` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `telefono1` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `expediente` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `inspector` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `comentarios` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `fechaasignada` datetime(0) NULL DEFAULT NULL COMMENT 'Fecha turno asignado',
  `fechaatendido` datetime(0) NULL DEFAULT NULL COMMENT 'Fecha que se atendio para dar el turno',
  `motivonegar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `id_atendido` int(5) NULL DEFAULT NULL COMMENT 'Persona que atendio',
  `id_inspector` int(5) NULL DEFAULT NULL COMMENT 'id_inspector que se le asigno',
  `atendido_inspector` int(1) NULL DEFAULT NULL COMMENT 'si el inspector atendio. 1 verdadero 0 falso',
  `resultados` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'que se hizo ',
  `fecha` datetime(0) NULL DEFAULT NULL COMMENT 'Fecha que se recibe el pedido de turno',
  `creado` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT 'Fecha que se crea la cita',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of amc_agendar_cita
-- ----------------------------
INSERT INTO `amc_agendar_cita` VALUES (1, 1, 1, 'David', 'Mera', 'byron.herrera@quito.gob.ec', '171108093', '0983332323', 'amc-insp-2019-001', NULL, '', '2019-10-25 08:45:00', NULL, NULL, NULL, 130, NULL, NULL, '2019-10-21 15:02:00', '2019-10-25 01:25:06');
INSERT INTO `amc_agendar_cita` VALUES (2, 1, 1, 'David', 'Mera', 'byron.herrera@quito.gob.ec', '171108093', '0983332323', 'amc-insp-2019-001', NULL, '', '2019-10-25 09:00:00', NULL, NULL, NULL, 130, NULL, NULL, '2019-10-21 15:02:00', '2019-10-25 01:25:24');
INSERT INTO `amc_agendar_cita` VALUES (3, 1, 1, 'David', 'Mera', 'byron.herrera@quito.gob.ec', '171108093', '0983332323', 'amc-insp-2019-001', NULL, '', '2019-10-25 09:30:00', NULL, NULL, NULL, 130, NULL, NULL, '2019-10-21 15:02:00', '2019-10-25 01:34:39');
INSERT INTO `amc_agendar_cita` VALUES (4, 1, 1, 'David', 'Mera', 'byron.herrera@quito.gob.ec', '171108093', '0983332323', 'amc-insp-2019-001', NULL, '', '2019-10-25 09:30:00', NULL, NULL, NULL, 6, NULL, NULL, '2019-10-21 15:02:00', '2019-10-25 01:48:16');
INSERT INTO `amc_agendar_cita` VALUES (5, 1, 1, 'Byron G.', 'Herrera A.', 'byron.herrera@quito.gob.ec', '1711080893', '0999999999', 'exp 001', NULL, 'expediene 001', '2019-10-25 08:45:00', NULL, NULL, NULL, 3, NULL, NULL, '2019-10-23 22:19:00', '2019-10-25 01:56:23');
INSERT INTO `amc_agendar_cita` VALUES (6, 1, 1, 'Byron G.', 'Herrera A.', 'byron.herrera@quito.gob.ec', '1711080893', '0999999999', 'exp 001', NULL, 'expediene 001', '2019-10-25 08:45:00', NULL, NULL, NULL, 3, NULL, NULL, '2019-10-23 22:19:00', '2019-10-25 01:57:28');
INSERT INTO `amc_agendar_cita` VALUES (7, 1, 1, 'Byron G.', 'Herrera A.', 'byron.herrera@quito.gob.ec', '1711080893', '0999999999', 'exp 001', NULL, 'expediene 001', '2019-10-25 08:45:00', NULL, NULL, NULL, 3, NULL, NULL, '2019-10-23 22:19:00', '2019-10-25 01:59:04');
INSERT INTO `amc_agendar_cita` VALUES (8, 1, 1, 'Byron G.', 'Herrera A.', 'byron.herrera@quito.gob.ec', '1711080893', '0999999999', 'exp 001', NULL, 'expediene 001', '2019-10-25 08:45:00', NULL, NULL, NULL, 3, NULL, NULL, '2019-10-23 22:19:00', '2019-10-25 02:02:08');
INSERT INTO `amc_agendar_cita` VALUES (9, 1, 1, 'Byron G.', 'Herrera A.', 'byron.herrera@quito.gob.ec', '1711080893', '0999999999', 'exp 001', NULL, 'expediene 001', '2019-10-25 09:30:00', NULL, NULL, NULL, 297, NULL, NULL, '2019-10-23 22:19:00', '2019-10-25 02:09:54');
INSERT INTO `amc_agendar_cita` VALUES (10, 1, 1, 'Byron G.', 'Herrera A.', 'byron.herrera@quito.gob.ec', '1711080893', '0999999999', 'exp 001', NULL, 'expediene 001', '2019-10-25 09:15:00', NULL, NULL, NULL, 354, NULL, NULL, '2019-10-23 22:19:00', '2019-10-25 02:16:47');

SET FOREIGN_KEY_CHECKS = 1;
