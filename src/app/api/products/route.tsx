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
    const insertPromises = products.map((product: any) => {
      return db.query(
        `INSERT INTO products (pro_name, pro_des, pro_image, sale_price, cost_price, type_id, band_id, color_id, size_id, gender_id, quantity) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          product.pro_name,
          product.pro_des,
          product.pro_image,
          product.sale_price,
          product.cost_price,
          product.type_id,
          product.band_id,
          product.color_id,
          product.size_id,
          product.gender_id,
          product.quantity,
        ]
      );
    });

    await Promise.all(insertPromises);

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
