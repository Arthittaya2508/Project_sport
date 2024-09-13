// lib/product.ts

import { query } from "./db"; // ปรับ path ให้ตรงกับที่เก็บ db.ts
import { Product } from "../products/types/types";

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const result = await query("SELECT * FROM products WHERE id = ?", [id]);

    if (result.length > 0) {
      return result[0] as Product;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
}
