-- =================================================================
-- bookings Table
-- =================================================================
-- This table stores all the booking information made by guests.

CREATE TABLE bookings (
    -- Unique identifier for each booking
    id INT AUTO_INCREMENT PRIMARY KEY,

    -- Foreign key to link to a company if this is a multi-tenant app
    company_id INT NOT NULL,
    
    -- Foreign key to the `rooms` table to identify the booked room
    room_id INT NOT NULL,

    -- Guest's personal information
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20), -- Optional phone number

    -- Booking details
    num_guests INT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    
    -- Additional information
    special_requests TEXT,

    -- Financials and status
    total_price DECIMAL(10, 2) NOT NULL,
    booking_status ENUM('Pending', 'Confirmed', 'Cancelled', 'Checked-In', 'Checked-Out', 'No-Show') NOT NULL DEFAULT 'Pending',

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Define foreign key constraints
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
    
    -- It's good practice to index foreign keys and commonly queried columns
    INDEX (company_id),
    INDEX (room_id),
    INDEX (email)
);
