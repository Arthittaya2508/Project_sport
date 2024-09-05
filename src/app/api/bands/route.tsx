import { NextResponse } from "next/server";
import db from "../../lib/db";

// Fetch all bands
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM bands");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching bands:", error);
    return NextResponse.json(
      { error: "Failed to fetch bands" },
      { status: 500 }
    );
  }
}

// Add a new band
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { band_name } = data;

    const [result] = await db.query(
      `INSERT INTO bands (band_name) VALUES (?)`,
      [band_name]
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
    const { band_id, band_name } = data;

    if (!band_id || !band_name) {
      return NextResponse.json(
        { error: "Missing band_id or band_name" },
        { status: 400 }
      );
    }

    const [result] = await db.query(
      `UPDATE bands SET band_name = ? WHERE band_id = ?`,
      [band_name, band_id]
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
    const { band_id } = data;

    if (!band_id) {
      return NextResponse.json({ error: "Missing band_id" }, { status: 400 });
    }

    const [result] = await db.query(`DELETE FROM bands WHERE band_id = ?`, [
      band_id,
    ]);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error deleting band:", error);
    return NextResponse.json(
      { error: "Failed to delete band" },
      { status: 500 }
    );
  }
}
