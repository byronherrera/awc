ALTER TABLE `procesos-amc`.`amc_sancion_emergencia` 
ADD COLUMN `actainfraccion` varchar(10) NULL AFTER `fecha_creacion`,
ADD COLUMN `idingreso` int(11) NULL AFTER `actainfraccion`;



DROP TABLE IF EXISTS `amc_sancion_emergencia_log`;
CREATE TABLE `amc_sancion_emergencia_log`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `idusuario` int(11) NULL DEFAULT NULL,
  `usuario` varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT 'ERROR, WARNING, MESSAGE or AUDIT',
  `text` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `timestamp` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

