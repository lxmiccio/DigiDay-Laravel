INSERT INTO `digiday`.`classrooms` (`id`, `name`, `description`, `maximum_partecipants`, `created_at`, `updated_at`) VALUES (NULL, 'B065', NULL, '65', NOW(), NOW()), (NULL, 'B180', NULL, '180', NOW(), NOW()), (NULL, 'C240', NULL, '240', NOW(), NOW());

INSERT INTO `digiday`.`items` (`id`, `name`, `description`, `amount`, `created_at`, `updated_at`) VALUES (NULL, 'Router', NULL, '10', NOW(), NOW()), (NULL, 'Switch', NULL, '25', NOW(), NOW()), (NULL, 'Macchina fotografica', NULL, '50', NOW(), NOW());

INSERT INTO `digiday`.`topics` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES (NULL, 'Informatica', NULL, NOW(), NOW()), (NULL, 'Sistemi e Reti', NULL, NOW(), NOW()), (NULL, 'Matematica', NULL, NOW(), NOW());

INSERT INTO `digiday`.`users` (`id`, `first_name`, `last_name`, `email`, `password`, `image`, `confirmation_token`, `confirmed`, `created_at`, `updated_at`) VALUES (NULL, 'Fake', 'Fake', 'fake@google.com', 'fake', 'default/male.png', 'kcvkcjdskjgdskxvx.c,mvzmvkdsjgdkjgcx.,mbz.cxmlkdfg.z,mv.cmxb.dcbdhdfhdgdhdghg', '0', NOW(), NOW());

INSERT INTO `digiday`.`events` (`id`, `name`, `description`, `starting_date`, `ending_date`, `maximum_partecipants`, `user_id`, `classroom_id`, `topic_id`, `created_at`, `updated_at`) VALUES (NULL, 'Linguaggio C', NULL, NOW(), NOW(), '10', '1', '1', '1', NOW(), NOW());

INSERT INTO `digiday`.`event_item` (`id`, `event_id`, `item_id`, `required_amount`, `created_at`, `updated_at`) VALUES (NULL, '1', '1', '5', NOW(), NOW()), (NULL, '1', '2', '10', NOW(), NOW()), (NULL, '1', '3', '15', NOW(), NOW());

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES (NULL, 'Amministratore', CURRENT_TIME(), CURRENT_TIME()), (NULL, 'Docente', CURRENT_TIME(), CURRENT_TIME()), (NULL, 'Studente', CURRENT_TIME(), CURRENT_TIME());
