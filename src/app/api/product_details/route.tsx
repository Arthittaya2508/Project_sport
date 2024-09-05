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
export async function POST(request: Request) {
  try {
    const { details } = await request.json();

    // Ensure details is an array
    if (!Array.isArray(details)) {
      return NextResponse.json(
        { error: "Invalid input, expected an array of product_details" },
        { status: 400 }
      );
    }

    // Generate the SQL query with placeholders
    const sql = `
      INSERT INTO product_details (pro_id, color_id, size_id, gender_id, stock_quantity, sku, pro_image, sale_price, cost_price)
      VALUES ${details.map(() => "(?, ?, ?, ?, ?, ?, ?, ?, ?)").join(", ")}
    `;

    // Flatten the array of product values into a single array
    const values = details.flatMap((detail) => [
      detail.pro_id,
      detail.color_id,
      detail.size_id,
      detail.gender_id,
      detail.stock_quantity,
      detail.sku,
      detail.pro_image,
      detail.sale_price,
      detail.cost_price,
    ]);

    await db.query(sql, values);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error inserting product_details:", error);
    return NextResponse.json(
      { error: "Failed to add product_details" },
      { status: 500 }
    );
  }
}
