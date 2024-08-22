import { NextResponse } from "next/server";
import db from "../../lib/db";

// Fetch all products
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM product_details");
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
        `INSERT INTO product_details (pro_id, color_id, size_id, gender_id, stock_quantity, sku ,pro_image sale_price,cost_price,) 
         VALUES (?, ?, ?, ?, ?, ?,?,?,?)`,
        [
          product.pro_id, // Assuming this is a foreign key referencing the 'products' table
          product.color_id,
          product.size_id,
          product.gender_id,
          product.stock_quantity,
          product.sku,
          product.pro_image,
          product.sale_price,
          product.cost_price,
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

// Update an existing product detail
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const {
      detail_id, // Assuming 'detail_id' is the primary key for this table
      pro_id,
      color_id,
      size_id,
      gender_id,
      stock_quantity,
      sku,
      pro_image,
      sale_price,
      cost_price,
    } = data;

    const [result] = await db.query(
      `UPDATE product_details 
       SET pro_id = ?, color_id = ?, size_id = ?, gernder_id = ?, stock_quantity = ?, sku = ? ,sale_price = ? , cost_price = ?,
       WHERE detail_id = ?`,
      [
        pro_id,
        color_id,
        size_id,
        gender_id,
        stock_quantity,
        sku,
        pro_image,
        sale_price,
        cost_price,
        detail_id,
      ]
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error updating product details:", error);
    return NextResponse.json(
      { error: "Failed to update product details" },
      { status: 500 }
    );
  }
}
