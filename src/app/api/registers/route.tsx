import { NextResponse } from "next/server";
import db from "../../lib/db";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, lastname, telephone, email, username, password, image } =
      data;

    const userQuery = `
      INSERT INTO users (name, lastname, telephone, email, username, password, image) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    // Run the query and get the result
    const [userResult] = await db.query(userQuery, [
      name,
      lastname,
      telephone,
      email,
      username,
      password,
      image,
    ]);

    // Cast userResult to any to bypass TypeScript error
    const userId = (userResult as any).insertId;

    return NextResponse.json({ success: true, userId });
  } catch (error) {
    console.error("Error inserting user:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
