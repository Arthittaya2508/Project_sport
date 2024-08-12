import { NextResponse } from "next/server";
import db from "../../lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      name,
      lastname,
      address,
      telephone,
      email,
      username,
      password,
      image,
    } = data;

    const [result] = await db.query(
      `INSERT INTO users (name, lastname, address, telephone, email, username, password, image)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, lastname, address, telephone, email, username, password, image]
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error inserting user:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
