import { NextResponse } from "next/server";
import db from "../../lib/db";

// Fetch all genders
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

// Add a new gender
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { gender_name } = data;

    const [result] = await db.query(
      `INSERT INTO genders (gender_name) VALUES (?)`,
      [gender_name]
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error inserting gender:", error);
    return NextResponse.json(
      { error: "Failed to add gender" },
      { status: 500 }
    );
  }
}

// Update an existing gender
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { gender_id, gender_name } = data;

    const [result] = await db.query(
      `UPDATE genders SET gender_name = ? WHERE gender_id = ?`,
      [gender_name, gender_id] // Ensure gender_id is used
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error updating gender:", error);
    return NextResponse.json(
      { error: "Failed to update gender" },
      { status: 500 }
    );
  }
}

// Delete an existing gender
export async function DELETE(request: Request) {
  try {
    const data = await request.json();
    const { gender_id } = data;

    const [result] = await db.query(
      `DELETE FROM genders WHERE gender_id = ?`,
      [gender_id] // Ensure gender_id is used
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error deleting gender:", error);
    return NextResponse.json(
      { error: "Failed to delete gender" },
      { status: 500 }
    );
  }
}
