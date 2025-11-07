import { pool } from "../config/db.js";

export const createBookingTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        equipment_id INT NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        total_price DECIMAL(10,2) NOT NULL,
        status ENUM('pending','approved','cancelled') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (equipment_id) REFERENCES equipment(id)
      )
    `;

    await pool.query(query);
    console.log("Booking table ready");
  } catch (error) {
    console.error("Failed to create booking table:", error);
  }
};
