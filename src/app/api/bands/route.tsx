import { NextResponse } from "next/server";
import db from "../../lib/db";

// Fetch all products
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM bands");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching colors:", error);
    return NextResponse.json(
      { error: "Failed to fetch colors" },
      { status: 500 }
    );
  }
}

// Add a new product
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { band_name } = data;

    const [result] = await db.query(
      `INSERT INTO products (band_name) 
       VALUES (?)`,
      [band_name]
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error inserting product:", error);
    return NextResponse.json(
      { error: "Failed to add colors" },
      { status: 500 }
    );
  }
}

// Update an existing product
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { band_id, band_name } = data;

    const [result] = await db.query(
      `UPDATE products 
       SET band_id = ?, band_name 
       WHERE id = ?`,
      [band_id, band_name]
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update colors" },
      { status: 500 }
    );
  }
}
