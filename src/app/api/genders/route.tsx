import { NextResponse } from "next/server";
import db from "../../lib/db";

// Fetch all products
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM genders");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching genders:", error);
    return NextResponse.json(
      { error: "Failed to fetch genders" },
      { status: 500 }
    );
  }
}

// Add a new product
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { genders_name } = data;

    const [result] = await db.query(
      `INSERT INTO products (genders_name) 
       VALUES (?)`,
      [genders_name]
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error inserting genders:", error);
    return NextResponse.json(
      { error: "Failed to add genders" },
      { status: 500 }
    );
  }
}

// Update an existing product
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { genders_id, genders_name } = data;

    const [result] = await db.query(
      `UPDATE products 
       SET genders_id = ?, genders_name 
       WHERE id = ?`,
      [genders_id, genders_name]
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update genders" },
      { status: 500 }
    );
  }
}
