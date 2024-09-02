import { NextResponse } from "next/server";
import db from "../../lib/db";

// Fetch all products
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// Add multiple products
export async function POST(request: Request) {
  try {
    const products = await request.json();

    // Ensure products is an array
    if (!Array.isArray(products)) {
      return NextResponse.json(
        { error: "Invalid input, expected an array of products" },
        { status: 400 }
      );
    }

    // Generate the SQL query with placeholders
    const sql = `
      INSERT INTO products (pro_name, pro_des, type_id, band_id)
      VALUES ${products.map(() => "(?, ?, ?, ?)").join(", ")}
    `;

    // Flatten the array of product values into a single array
    const values = products.flatMap((product) => [
      product.pro_name,
      product.pro_des,
      product.type_id,
      product.band_id,
    ]);

    await db.query(sql, values);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error inserting products:", error);
    return NextResponse.json(
      { error: "Failed to add products" },
      { status: 500 }
    );
  }
}

// Update an existing product
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, pro_name, pro_des, type_id, band_id } = data;

    const [result] = await db.query(
      `UPDATE products 
       SET pro_name = ?, pro_des = ?, type_id = ?, band_id = ? 
       WHERE id = ?`,
      [pro_name, pro_des, type_id, band_id, id]
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
