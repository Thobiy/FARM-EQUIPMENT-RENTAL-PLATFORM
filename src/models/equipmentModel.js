import { pool } from "../config/db.js";

export const createEquipmentTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS equipment (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      price_per_day DECIMAL(10,2) NOT NULL,
      image_url VARCHAR(255),
      availability BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  try {
    await pool.query(query);
    console.log("Equipment table ready");
  } catch (err) {
    console.error("Error creating equipment table:", err);
    throw err;
  }
};
