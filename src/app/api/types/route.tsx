import { NextResponse } from "next/server";
import db from "../../lib/db";

// Fetch all types
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM types");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching types:", error);
    return NextResponse.json(
      { error: "Failed to fetch types" },
      { status: 500 }
    );
  }
}

// Add a new type
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { type_name } = data;

    const [result] = await db.query(
      `INSERT INTO types (type_name) VALUES (?)`,
      [type_name]
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error inserting type:", error);
    return NextResponse.json({ error: "Failed to add type" }, { status: 500 });
  }
}

// Update an existing type
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { type_id, type_name } = data;
    console.log({ type_id, type_name }); // ตรวจสอบข้อมูลที่ได้รับ

    const [result] = await db.query(
      `UPDATE types SET type_name = ? WHERE type_id = ?`,
      [type_name, type_id]
    );
    console.log(result); // ตรวจสอบผลลัพธ์

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error updating type:", error);
    return NextResponse.json(
      { error: "Failed to update type" },
      { status: 500 }
    );
  }
}

// Delete an existing type
export async function DELETE(request: Request) {
  try {
    const data = await request.json();
    const { type_id } = data;
    console.log({ type_id }); // ตรวจสอบข้อมูลที่ได้รับ

    const [result] = await db.query(`DELETE FROM types WHERE type_id = ?`, [
      type_id,
    ]);
    console.log(result); // ตรวจสอบผลลัพธ์

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error deleting type:", error);
    return NextResponse.json(
      { error: "Failed to delete type" },
      { status: 500 }
    );
  }
}
