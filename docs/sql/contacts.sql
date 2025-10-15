-- SQL query to create a `contacts` table for storing messages from the contact form.
-- This table is designed for a multi-tenant system with `company_id`.

CREATE TABLE `contacts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `company_id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `subject` VARCHAR(255) DEFAULT NULL,
  `message` TEXT NOT NULL,
  `status` ENUM('unread', 'read', 'archived', 'replied') DEFAULT 'unread',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `company_id_index` (`company_id`)
) COMMENT='Stores contact form submissions and messages from users.';

-- Sample INSERT statement
-- INSERT INTO `contacts` (company_id, name, email, subject, message)
-- VALUES (1, 'John Doe', 'john.doe@example.com', 'Inquiry about wedding packages', 'Hello, I would like to get more information about your wedding packages for a ceremony in December.');
