import type { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../lib/db"; // ตรวจสอบ path ให้ตรงกับที่เก็บไฟล์

// API route for fetching product details by ID
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pro_id } = req.query;

  if (req.method === "GET") {
    if (typeof pro_id !== "string") {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    try {
      // เปลี่ยนจาก 'id' เป็น 'pro_id'
      const result = await query("SELECT * FROM products WHERE pro_id = ?", [
        pro_id,
      ]);

      if (result.length > 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).json({ message: "หาบ่เจอจ้าวว" });
      }
    } catch (error) {
      console.error("Failed to fetch product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
