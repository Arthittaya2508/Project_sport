import { NextResponse } from "next/server";
import db from "../../lib/db";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, lastname, telephone, email, username, password, position } =
      data;

    const employeeQuery = `
      INSERT INTO employees (name, lastname, telephone, email, username, password, position) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    // Run the query and get the result
    const [employeeResult] = await db.query(employeeQuery, [
      name,
      lastname,
      telephone,
      email,
      username,
      password,
      position,
    ]);

    // Cast userResult to any to bypass TypeScript error
    const emp_id = (employeeResult as any).insertId;

    return NextResponse.json({ success: true, emp_id });
  } catch (error) {
    console.error("Error inserting user:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
