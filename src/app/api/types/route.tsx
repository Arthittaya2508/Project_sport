import { NextResponse } from "next/server";
import db from "../../lib/db";

// Fetch all bands
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM types");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching sizes:", error);
    return NextResponse.json(
      { error: "Failed to fetch sizes" },
      { status: 500 }
    );
  }
}

// Add a new band
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { type_name } = data;

    const [result] = await db.query(
      `INSERT INTO types (type_name) 
       VALUES (?)`,
      [type_name]
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error inserting band:", error);
    return NextResponse.json({ error: "Failed to add band" }, { status: 500 });
  }
}

// Update an existing band
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { type_id, type_name } = data;

    const [result] = await db.query(
      `UPDATE types
       SET type_name = ? 
       WHERE id = ?`,
      [type_name, type_id] // Ensure band_id is used
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error updating band:", error);
    return NextResponse.json(
      { error: "Failed to update band" },
      { status: 500 }
    );
  }
}

// Delete an existing band
export async function DELETE(request: Request) {
  try {
    const data = await request.json();
    const { type_id } = data;

    const [result] = await db.query(
      `DELETE FROM types 
       WHERE id = ?`,
      [type_id] // Ensure band_id is used
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error deleting band:", error);
    return NextResponse.json(
      { error: "Failed to delete band" },
      { status: 500 }
    );
  }
}
