import { NextResponse } from "next/server";
import db from "../../lib/db";

// Fetch all colors
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM colors");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching colors:", error);
    return NextResponse.json(
      { error: "Failed to fetch colors" },
      { status: 500 }
    );
  }
}

// Add a new color
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { color_name } = data;

    const [result] = await db.query(
      `INSERT INTO colors (color_name) VALUES (?)`,
      [color_name]
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error inserting color:", error);
    return NextResponse.json({ error: "Failed to add color" }, { status: 500 });
  }
}

// Update an existing color
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { color_id, color_name } = data;

    if (!color_id || !color_name) {
      return NextResponse.json(
        { error: "Missing color_id or color_name" },
        { status: 400 }
      );
    }

    const [result] = await db.query(
      `UPDATE colors SET color_name = ? WHERE color_id = ?`,
      [color_name, color_id]
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error updating color:", error);
    return NextResponse.json(
      { error: "Failed to update color" },
      { status: 500 }
    );
  }
}

// Delete an existing color
export async function DELETE(request: Request) {
  try {
    const data = await request.json();
    const { color_id } = data;

    if (!color_id) {
      return NextResponse.json({ error: "Missing color_id" }, { status: 400 });
    }

    const [result] = await db.query(`DELETE FROM colors WHERE color_id = ?`, [
      color_id,
    ]);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error deleting color:", error);
    return NextResponse.json(
      { error: "Failed to delete color" },
      { status: 500 }
    );
  }
}
