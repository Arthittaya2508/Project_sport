// import { query } from "./db"; // ปรับ path ให้ตรงกับที่เก็บ query function
// import { Product } from "../products/types/types"; // ปรับ path ให้ตรงกับที่เก็บ type ของคุณ

// export async function getProductById(id: number): Promise<Product | null> {
//   const sql = "SELECT * FROM products WHERE pro_id = ?"; // แก้ไขชื่อคอลัมน์ให้ตรงกับฐานข้อมูล
//   const results = await query<Product>(sql, [id]);
//   return results.length > 0 ? results[0] : null;
// }
