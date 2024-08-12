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
    const { name } = data;

    const [result] = await db.query(`INSERT INTO colors (name) VALUES (?)`, [
      name,
    ]);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error inserting color:", error);
    return NextResponse.json({ error: "Failed to add color" }, { status: 500 });
  }
}
