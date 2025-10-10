
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    room_id INT NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    guests INT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    special_requests TEXT,
    total_price DECIMAL(10, 2),
    payment_status ENUM('Pending', 'Paid', 'Refunded') DEFAULT 'Pending',
    status ENUM('Pending', 'Confirmed', 'Cancelled', 'Checked-in', 'Checked-out', 'No-Show') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX (company_id),
    INDEX (room_id),
    INDEX (email)
);
