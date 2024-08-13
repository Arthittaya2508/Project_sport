import { NextResponse } from "next/server";
import db from "../../lib/db";

// Fetch all bands
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

// Add a new band
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { size_name } = data;

    const [result] = await db.query(
      `INSERT INTO sizes (size_name) 
       VALUES (?)`,
      [size_name]
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
    const { size_id, size_name } = data;

    const [result] = await db.query(
      `UPDATE sizes
       SET size_name = ? 
       WHERE id = ?`,
      [size_name, size_id] // Ensure band_id is used
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
    const { size_id } = data;

    const [result] = await db.query(
      `DELETE FROM sizes 
       WHERE id = ?`,
      [size_id] // Ensure band_id is used
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
