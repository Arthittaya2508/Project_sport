import mysql from "mysql2/promise";
import { Product } from "../products/types/types"; // ปรับ path ให้ตรงกับที่เก็บ type ของคุณ

const connection = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

export async function getProductById(id: string): Promise<Product | null> {
  const conn = await connection.getConnection();
  try {
    const [rows] = await conn.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    const product = rows as Product[]; // ใช้ type assertion ที่นี่
    return product.length > 0 ? product[0] : null;
  } finally {
    conn.release();
  }
}

export default connection;
