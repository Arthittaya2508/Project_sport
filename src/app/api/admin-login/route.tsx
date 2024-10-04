import { NextRequest, NextResponse } from "next/server";
import db from "../../lib/db";
import bcrypt from "bcryptjs";
import { RowDataPacket } from "mysql2"; // นำเข้า RowDataPacket เพื่อใช้ในการทำ type assertion

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required." },
        { status: 400 }
      );
    }

    // ดึงข้อมูลผู้ใช้จากตาราง employees โดยใช้ username
    const [rows] = await db.execute<RowDataPacket[]>(
      "SELECT * FROM employees WHERE username = ?",
      [username]
    );

    // ตรวจสอบว่าพบผู้ใช้และรหัสผ่านตรงกันหรือไม่
    if (rows.length > 0) {
      const user = rows[0]; // ใช้ type assertion ในการเข้าถึงข้อมูลแถวแรก

      // เปรียบเทียบรหัสผ่านกับรหัสผ่านที่เข้ารหัสในฐานข้อมูล
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        return NextResponse.json({ success: true }, { status: 200 });
      } else {
        return NextResponse.json(
          { success: false, message: "Invalid username or password." },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid username or password." },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
