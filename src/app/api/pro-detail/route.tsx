import { NextResponse } from "next/server";
import db from "../../lib/db";

// Fetch all products
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM pro_details");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products details" },
      { status: 500 }
    );
  }
}

// Add a new product
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { pro_id, color_id, gender_id, size_id, quantity } = data;

    const [result] = await db.query(
      `INSERT INTO products (pro_id,color,gender,size,quantity) 
       VALUES (?, ?, ?, ?, ?)`,
      [pro_id, color_id, gender_id, size_id, quantity]
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error inserting product:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}

// Update an existing product
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { detail_id, pro_id, color_id, gender_id, size_id, quantity } = data;

    const [result] = await db.query(
      `UPDATE products 
       SET detail_id = ?, pro_id = ?, color_id = ?, gender_id = ?, size_id = ?, quantity = ?
       WHERE id = ?`,

      [detail_id, pro_id, color_id, gender_id, size_id, quantity]
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
