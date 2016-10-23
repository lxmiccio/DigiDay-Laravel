INSERT INTO `digiday`.`classrooms` (`id`, `name`, `description`, `capacity`, `created_at`, `updated_at`) VALUES (NULL, 'B065', NULL, '65', NOW(), NOW()), (NULL, 'B180', NULL, '180', NOW(), NOW()), (NULL, 'C240', NULL, '240', NOW(), NOW());

INSERT INTO `digiday`.`items` (`id`, `name`, `description`, `amount`, `created_at`, `updated_at`) VALUES (NULL, 'Router', NULL, '10', NOW(), NOW()), (NULL, 'Switch', NULL, '25', NOW(), NOW()), (NULL, 'Macchina fotografica', NULL, '50', NOW(), NOW());

INSERT INTO `digiday`.`topics` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES (NULL, 'Informatica', NULL, NOW(), NOW()), (NULL, 'Sistemi e Reti', NULL, NOW(), NOW()), (NULL, 'Matematica', NULL, NOW(), NOW());

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES (NULL, 'Amministratore', CURRENT_TIME(), CURRENT_TIME()), (NULL, 'Docente', CURRENT_TIME(), CURRENT_TIME()), (NULL, 'Studente', CURRENT_TIME(), CURRENT_TIME());
