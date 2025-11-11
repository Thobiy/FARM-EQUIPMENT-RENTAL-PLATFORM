import db from "../config/db.js";

// ✅ Create new user
export const createUser = async (username, email, password) => {
  const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  if (existing.length > 0) {
    throw new Error("User already exists");
  }

  const [result] = await db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password]
  );

  const [newUser] = await db.query("SELECT id, username, email FROM users WHERE id = ?", [result.insertId]);
  return newUser[0];
};

// ✅ Get all users
export const getUsers = async () => {
  const [rows] = await db.query("SELECT id, username, email FROM users");
  return rows;
};

// ✅ Authenticate (Login)
export const authenticateUser = async (email, password) => {
  const [rows] = await db.query("SELECT id, username, email, password FROM users WHERE email = ?", [email]);
  if (rows.length === 0) throw new Error("Invalid email or password");

  const user = rows[0];
  if (user.password !== password) throw new Error("Invalid email or password");

  return { id: user.id, username: user.username, email: user.email };
};
