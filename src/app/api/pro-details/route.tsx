// pages/api/products.ts
import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../../lib/db";

interface ProductDetail {
  detail_id: number;
  pro_id: number;
  color_name: string;
  size_name: string;
  gender_name: string;
  quantity: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // ตรวจสอบว่าเป็น HTTP GET request หรือไม่
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    // ดึงข้อมูลจากฐานข้อมูล
    const [rows] = await pool.query<ProductDetail[]>(
      "SELECT * FROM pro_details"
    );

    // ส่งข้อมูลกลับเป็น JSON
    res.status(200).json(rows);
  } catch (error) {
    // จัดการข้อผิดพลาดที่เกิดขึ้น
    console.error("Error fetching product details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
