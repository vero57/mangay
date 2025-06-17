import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : req.cookies?.session_token;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [sessions]: any = await connection.execute(
      "SELECT user_id FROM sessions WHERE session_token = ? AND expires_at > NOW()",
      [token]
    );
    if (!sessions.length) {
      await connection.end();
      res.status(401).json({ message: "Invalid session" });
      return;
    }
    const userId = sessions[0].user_id;
    const [users]: any = await connection.execute(
      "SELECT username, email, profile_picture, created_at FROM users WHERE id = ?",
      [userId]
    );
    await connection.end();
    if (!users.length) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(users[0]);
  } catch (error: any) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
}
