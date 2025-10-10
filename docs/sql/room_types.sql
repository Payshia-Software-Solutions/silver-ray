-- =================================================================
-- Table for Room Types
--
-- This table stores the different categories or types of rooms
-- available in the hotel, such as 'Standard', 'Deluxe', or 'Suite'.
-- It helps to normalize the room data.
-- =================================================================

CREATE TABLE `room_types` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `company_id` INT UNSIGNED NOT NULL,
  `type_name` VARCHAR(100) NOT NULL COMMENT 'e.g., Standard, Deluxe, Suite, Villa',
  `description` TEXT NULL COMMENT 'A brief description of the room type.',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_room_types_company_typename` (`company_id`, `type_name`),
  INDEX `idx_room_types_company_id` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
