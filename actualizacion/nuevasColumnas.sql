ALTER TABLE `procesos-amc`.`amc_personal_distributivo`
ADD COLUMN `telefonoemergencia` varchar(10) NULL AFTER `telefono2`,
ADD COLUMN `referenciadireccion` varchar(160) NULL AFTER `direccionnumero`,
ADD COLUMN `tiposangre` varchar(10) NULL AFTER `enfermedades`,
ADD COLUMN `fecha_actualizacion` datetime() NULL AFTER `id_persona_encargada`;

 ALTER TABLE `procesos-amc`.`amc_personal_distributivo`
MODIFY COLUMN `tiposangre` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' AFTER `enfermedades`,
MODIFY COLUMN `telefonoemergencia` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' AFTER `telefono2`,
MODIFY COLUMN `referenciadireccion` varchar(160) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' AFTER `direccionnumero`;