import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(`
      SELECT 
        manga.*, 
        users.username AS uploader_name 
      FROM manga 
      LEFT JOIN users ON manga.uploader_id = users.id 
      ORDER BY manga.id DESC
    `);
    await connection.end();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
}
