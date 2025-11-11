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
import { Sequelize } from "sequelize";
import config from "./index.js";

const sequelize = new Sequelize(
    config.Database_NAME,
    config.DATABASE_USERNAME,
    config.DATABASE_PASSWORD,
    {
        dialect: config.DATABASE_DIALECT,
        port: config.DATABASE_PORT,
        host: config.DATABASE_HOST,
        logging: (msg) => console.log(msg),
    }
);

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log("Database connected");  
    }   catch (error) {
        console.log("Database error:", error);
    }
};

export default sequelize;
