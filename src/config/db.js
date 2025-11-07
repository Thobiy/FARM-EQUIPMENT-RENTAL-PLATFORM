import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const connectDB = async () => {
  try {
    const conn = await pool.getConnection();
    conn.release();
    console.log("MySQL connected successfully");
    return pool;
  } catch (err) {
    console.error("Database connection failed:", err.message || err);
    throw err;
  }
};

export { pool };
export default connectDB;
