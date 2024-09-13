// pages/api/product_details/[pro_id].tsx

import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../lib/db"; // ตรวจสอบ path ให้ตรงกับที่เก็บไฟล์

interface Product {
  id: string;
  name: string;
  // เพิ่มฟิลด์ที่จำเป็นของคุณที่นี่
}

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
      const result = await query<Product>(
        "SELECT * FROM products WHERE id = ?",
        [pro_id]
      );

      if (result.length > 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).json({ message: "Product not found" });
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
