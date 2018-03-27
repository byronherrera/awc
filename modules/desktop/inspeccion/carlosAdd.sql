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