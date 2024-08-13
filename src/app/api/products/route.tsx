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

// Add a new product
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      pro_name,
      pro_des,
      pro_image,
      sale_price,
      cost_price,
      type_id,
      band_id,
      color_id,
      size_id,
      gender_id,
      quantity,
    } = data;

    // Debug log
    console.log("Received data:", data);

    const [result] = await db.query(
      `INSERT INTO products (pro_name, pro_des, pro_image, sale_price, cost_price, type_id, band_id, color_id, size_id, gender_id, quantity) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        pro_name,
        pro_des,
        pro_image,
        sale_price,
        cost_price,
        type_id,
        band_id,
        color_id,
        size_id,
        gender_id,
        quantity,
      ]
    );

    // Debug log
    console.log("Query result:", result);

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
    const {
      id,
      pro_name,
      pro_des,
      pro_image,
      sale_price,
      cost_price,
      type_id,
      band_id,
      color_id,
      size_id,
      gender_id,
      quantity,
    } = data;

    const [result] = await db.query(
      `UPDATE products 
       SET pro_name = ?, pro_des = ?, pro_image = ?, sale_price = ?, cost_price = ?, type_id = ?, band_id = ?, color_id = ?, size_id = ?, gender_id = ?, quantity =? 
       WHERE id = ?`,
      [
        pro_name,
        pro_des,
        pro_image,
        sale_price,
        cost_price,
        type_id,
        band_id,
        color_id,
        size_id,
        gender_id,
        quantity,
        id,
      ]
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
