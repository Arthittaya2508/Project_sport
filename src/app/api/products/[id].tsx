// pages/api/products/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getProductById } from "../../lib/db";

// API route for fetching product details by ID
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    if (typeof id !== "string") {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    try {
      const product = await getProductById(id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
