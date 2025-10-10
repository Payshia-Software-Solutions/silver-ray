-- =================================================================
-- Table for Rooms
--
-- This table stores details for each individual room in the hotel.
-- It references the `room_types` table to categorize each room.
-- =================================================================

CREATE TABLE `rooms` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `company_id` INT UNSIGNED NOT NULL,
  `room_number` VARCHAR(20) NOT NULL COMMENT 'e.g., 101, 205, Villa A',
  `room_type_id` INT UNSIGNED NOT NULL COMMENT 'Foreign key referencing the room_types table',
  `descriptive_title` VARCHAR(255) NOT NULL COMMENT 'e.g., Deluxe King Room with Ocean View',
  `short_description` VARCHAR(500) NULL,
  `status` ENUM('Available', 'Booked', 'Under Maintenance', 'Unavailable') NOT NULL DEFAULT 'Available',
  `price_per_night` DECIMAL(10, 2) NOT NULL,
  `capacity` TINYINT UNSIGNED NOT NULL DEFAULT 2 COMMENT 'Maximum number of guests',
  `beds` VARCHAR(100) NULL COMMENT 'e.g., 1 King Bed, 2 Queen Beds',
  `size` VARCHAR(50) NULL COMMENT 'e.g., 40 sqm, 430 sqft',
  `view_type` VARCHAR(100) NULL COMMENT 'e.g., Ocean View, City View, Garden View',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_rooms_company_roomnumber` (`company_id`, `room_number`),
  INDEX `idx_rooms_company_id` (`company_id`),
  INDEX `idx_rooms_room_type_id` (`room_type_id`),
  CONSTRAINT `fk_rooms_room_type_id` FOREIGN KEY (`room_type_id`) REFERENCES `room_types` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
