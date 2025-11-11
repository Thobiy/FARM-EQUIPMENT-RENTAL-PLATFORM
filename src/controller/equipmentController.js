import { pool } from "../config/db.js";

export const getAllEquipment = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM equipment ORDER BY id DESC");
    return res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching equipment:", err);
    return res.status(500).json({ error: "Failed to fetch equipment" });
  }
};

export const addEquipment = async (req, res) => {
  try {
    const { name, description = null, price_per_day, image_url = null, availability = true } = req.body;

    if (!name || price_per_day === undefined || price_per_day === null) {
      return res.status(400).json({ error: "Missing required fields: name and price_per_day" });
    }

    const [result] = await pool.query(
      "INSERT INTO equipment (name, description, price_per_day, image_url, availability) VALUES (?, ?, ?, ?, ?)",
      [name, description, price_per_day, image_url, availability ? 1 : 0]
    );

    return res.status(201).json({ message: "Equipment added successfully", id: result.insertId });
  } catch (err) {
    console.error("Error adding equipment:", err);
    return res.status(500).json({ error: "Failed to add equipment" });
  }
};
