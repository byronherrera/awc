ALTER TABLE `prueba`.`amc_inspeccion`
ADD COLUMN `acta_verificacion` int(11) NULL AFTER `fecha_asignacion`;
ADD COLUMN `num_fojas` int(11) NULL AFTER `acta_verificacion`;

ADD COLUMN `estado_obra` int(11) NULL AFTER `num_fojas`;


ALTER TABLE `prueba`.`amc_inspeccion`
ADD COLUMN `observaciones` varchar(255) NULL AFTER `predio`;
ADD COLUMN `fecha_memo_oficio` datetime NULL AFTER `observaciones`;
MODIFY COLUMN `infraccion` varchar(255) NULL DEFAULT NULL AFTER `id_ordenanza`;