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
    const { name } = data;

    const [result] = await db.query(`INSERT INTO genders (name) VALUES (?)`, [
      name,
    ]);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error inserting gender:", error);
    return NextResponse.json(
      { error: "Failed to add gender" },
      { status: 500 }
    );
  }
}
