import { NextResponse } from "next/server";
import db from "../../lib/db";

// Fetch all products
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM sizes");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching sizes:", error);
    return NextResponse.json(
      { error: "Failed to fetch sizes" },
      { status: 500 }
    );
  }
}

// Add a new product
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { sizes_name } = data;

    const [result] = await db.query(
      `INSERT INTO products (sizes_name) 
       VALUES (?)`,
      [sizes_name]
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error inserting sizes:", error);
    return NextResponse.json({ error: "Failed to add sizes" }, { status: 500 });
  }
}

// Update an existing product
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { sizes_id, sizes_name } = data;

    const [result] = await db.query(
      `UPDATE products 
       SET sizes_id = ?, sizes_name 
       WHERE id = ?`,
      [sizes_id, sizes_name]
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error updating sizes:", error);
    return NextResponse.json(
      { error: "Failed to update sizes" },
      { status: 500 }
    );
  }
}
