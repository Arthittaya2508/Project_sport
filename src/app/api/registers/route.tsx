import { NextResponse } from "next/server";
import db from "../../lib/db";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Received data:", data); // เพิ่มบรรทัดนี้เพื่อตรวจสอบข้อมูล

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

    const query = `
      INSERT INTO users 
      (name, lastname, address, telephone, email, username, password, image) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // ตรวจสอบว่า query มีค่าถูกต้องหรือไม่
    console.log("Executing query:", query);

    const [result] = await db.query(query, [
      name,
      lastname,
      address,
      telephone,
      email,
      username,
      password,
      image,
    ]);

    console.log("Query result:", result); // ตรวจสอบผลลัพธ์

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error inserting user:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
