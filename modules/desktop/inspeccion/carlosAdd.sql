ALTER TABLE `prueba`.`amc_inspeccion`
ADD COLUMN `acta_verificacion` int(11) NULL AFTER `fecha_asignacion`;
ADD COLUMN `num_fojas` int(11) NULL AFTER `acta_verificacion`;

ADD COLUMN `estado_obra` int(11) NULL AFTER `num_fojas`;


ALTER TABLE `prueba`.`amc_inspeccion`
ADD COLUMN `observaciones` varchar(255) NULL AFTER `predio`;
ADD COLUMN `fecha_memo_oficio` datetime NULL AFTER `observaciones`;
MODIFY COLUMN `infraccion` varchar(255) NULL DEFAULT NULL AFTER `id_ordenanza`;


ALTER TABLE `prueba`.`amc_inspeccion_nio`
ADD COLUMN `num_nio` int(11) NULL AFTER `id_inspeccion`,
ADD COLUMN `proyecto` varchar(255) NULL AFTER `num_nio`,
ADD COLUMN `predio` varchar(255) NULL AFTER `proyecto`,
ADD COLUMN `zona` varchar(255) NULL AFTER `predio`,
ADD COLUMN `guia` varchar(255) NULL AFTER `zona`,
ADD COLUMN `certificado` varchar(255) NULL AFTER `guia`;
ADD COLUMN `fecha_ingreso` datetime NULL AFTER `certificado`;

ALTER TABLE `prueba`.`amc_inspeccion_ccf`
ADD COLUMN `id_ccf` int(11) NULL AFTER `id_inspeccion`;

ALTER TABLE `prueba`.`amc_inspeccion_ccf`
MODIFY COLUMN `id_ccf` varchar(20) NULL DEFAULT NULL AFTER `id_inspeccion`;

ALTER TABLE `prueba`.`amc_inspeccion_nio`
MODIFY COLUMN `num_nio` varchar(20) NULL DEFAULT NULL AFTER `id_inspeccion`;

ALTER TABLE `prueba`.`amc_inspeccion_control_programado`
DROP COLUMN `id_inspeccion`;

ALTER TABLE `prueba`.`amc_inspeccion_ccf`
DROP COLUMN `id_inspeccion`;

ALTER TABLE `prueba`.`amc_inspeccion_nio`
DROP COLUMN `id_inspeccion`;

ALTER TABLE `prueba`.`amc_inspeccion_ccf`
MODIFY COLUMN `proyecto` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL AFTER `id_ccf`,
MODIFY COLUMN `predio` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL AFTER `proyecto`,
MODIFY COLUMN `zona` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL AFTER `predio`,
ADD COLUMN `guia` varchar(255) NULL AFTER `zona`;

ALTER TABLE `prueba`.`amc_inspeccion_nio`
ADD COLUMN `guia_generada` int(1) NULL AFTER `fecha_ingreso`;

ALTER TABLE `prueba`.`amc_guias_nio`
MODIFY COLUMN `numero` varchar(20) NULL DEFAULT NULL AFTER `id`;

ALTER TABLE `prueba`.`amc_guias_nio`
CHANGE COLUMN `creado` `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP AFTER `unidad`;

ALTER TABLE `amc_inspeccion_ccf`
ADD COLUMN `guia_generada` int(1) NULL AFTER `numero_informe_certificado`;