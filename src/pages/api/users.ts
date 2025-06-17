import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

const dbConfig = {
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

function generateSessionToken() {
  return randomBytes(32).toString("hex");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { username, email, password, profile_picture, mode } = req.body;

    if (mode === "login") {
      // Login mode
      if (!email || !password) {
        res.status(400).json({ message: "Missing fields" });
        return;
      }
      try {
        const connection = await mysql.createConnection(dbConfig);
        const [users]: any = await connection.execute(
          "SELECT * FROM users WHERE email = ?",
          [email]
        );
        if (users.length === 0) {
          await connection.end();
          res.status(401).json({ message: "Email atau password salah" });
          return;
        }
        const user = users[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          await connection.end();
          res.status(401).json({ message: "Email atau password salah" });
          return;
        }

        const sessionToken = generateSessionToken();
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await connection.execute(
          "INSERT INTO sessions (user_id, session_token, expires_at) VALUES (?, ?, ?)",
          [user.id, sessionToken, expiresAt]
        );
        await connection.end();

        res.setHeader("Set-Cookie", `session_token=${sessionToken}; Path=/; Max-Age=604800; SameSite=Lax`);

        res.status(200).json({
          id: user.id,
          username: user.username,
          email: user.email,
          profile_picture: user.profile_picture,
        });
      } catch (error: any) {
        res.status(500).json({ message: "Database error", error: error.message });
      }
      return;
    }

    if (!username || !email || !password) {
      res.status(400).json({ message: "Missing fields" });
      return;
    }
    try {
      const connection = await mysql.createConnection(dbConfig);
      const [users]: any = await connection.execute(
        "SELECT id FROM users WHERE username = ? OR email = ?",
        [username, email]
      );
      if (users.length > 0) {
        await connection.end();
        res.status(409).json({ message: "Username or email already exists" });
        return;
      }
      const hashed = await bcrypt.hash(password, 10);
      await connection.execute(
        "INSERT INTO users (username, email, password, profile_picture) VALUES (?, ?, ?, ?)",
        [username, email, hashed, profile_picture || null]
      );
      await connection.end();
      res.status(201).json({ message: "User registered" });
    } catch (error: any) {
      console.error("DB Error:", error);
      res.status(500).json({ message: "Database error", error: error.message });
    }
    return;
  }

  if (req.method === "GET") {
    try {
      const connection = await mysql.createConnection(dbConfig);
      const [rows]: any = await connection.execute(
        "SELECT id, username, email, profile_picture, created_at FROM users"
      );
      await connection.end();
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ message: "Database error", error });
    }
    return;
  }
  res.status(405).json({ message: "Method not allowed" });
}
