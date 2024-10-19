import { NextResponse } from "next/server";
import db from "../../lib/db";

// Fetch all transports
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM transports");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching transports:", error);
    return NextResponse.json(
      { error: "Failed to fetch transports" },
      { status: 500 }
    );
  }
}

// Add a new transport
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { tran_name, shipping_cost } = data; // Get shipping cost from request

    const [result] = await db.query(
      `INSERT INTO transports (tran_name, shipping_cost) VALUES (?, ?)`,
      [tran_name, shipping_cost] // Insert shipping cost
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error inserting transport:", error);
    return NextResponse.json(
      { error: "Failed to add transport" },
      { status: 500 }
    );
  }
}

// Update an existing transport
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { tran_id, tran_name, shipping_cost } = data; // Get shipping cost from request

    const [result] = await db.query(
      `UPDATE transports SET tran_name = ?, shipping_cost = ? WHERE tran_id = ?`,
      [tran_name, shipping_cost, tran_id] // Update shipping cost
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error updating transport:", error);
    return NextResponse.json(
      { error: "Failed to update transport" },
      { status: 500 }
    );
  }
}

// Delete an existing transport
export async function DELETE(request: Request) {
  try {
    const data = await request.json();
    const { tran_id } = data;

    const [result] = await db.query(
      `DELETE FROM transports WHERE tran_id = ?`,
      [tran_id]
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error deleting transport:", error);
    return NextResponse.json(
      { error: "Failed to delete transport" },
      { status: 500 }
    );
  }
}
