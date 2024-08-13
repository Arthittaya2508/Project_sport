import { NextResponse } from "next/server";
import db from "../../lib/db";

// Fetch all bands
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM genders");
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
    const { gender_name } = data;

    const [result] = await db.query(
      `INSERT INTO genders (gender_name) 
       VALUES (?)`,
      [gender_name]
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
    const { gender_id, gender_name } = data;

    const [result] = await db.query(
      `UPDATE genders
       SET gender_name = ? 
       WHERE id = ?`,
      [gender_name, gender_id] // Ensure band_id is used
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
    const { gender_id } = data;

    const [result] = await db.query(
      `DELETE FROM genders 
       WHERE id = ?`,
      [gender_id] // Ensure band_id is used
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
