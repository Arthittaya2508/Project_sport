import { NextResponse } from "next/server";
import db from "../../lib/db";

// Fetch all sizes
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

// Add a new size
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name } = data;

    const [result] = await db.query(`INSERT INTO sizes (name) VALUES (?)`, [
      name,
    ]);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error inserting size:", error);
    return NextResponse.json({ error: "Failed to add size" }, { status: 500 });
  }
}
