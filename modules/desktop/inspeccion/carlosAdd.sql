ALTER TABLE `prueba`.`amc_inspeccion`
ADD COLUMN `acta_verificacion` int(11) NULL AFTER `fecha_asignacion`;
ADD COLUMN `num_fojas` int(11) NULL AFTER `acta_verificacion`;

ADD COLUMN `estado_obra` int(11) NULL AFTER `num_fojas`;