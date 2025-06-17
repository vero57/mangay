import pool from "./db";

async function getAllManga() {
  try {
    const [rows] = await pool.query("SELECT * FROM manga");
    console.log("Data manga:", rows);
  } catch (err) {
    console.error("Gagal mengambil data manga:", err);
  }
}

getAllManga();
