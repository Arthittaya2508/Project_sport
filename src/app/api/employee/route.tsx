import { NextResponse } from "next/server";
import db from "../../lib/db";

// Fetch all employees
export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM employees");
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch employees" },
      { status: 500 }
    );
  }
}

// Register a new employee
export async function POST(request: Request) {
  const connection = await db.getConnection(); // Get connection for transaction

  try {
    const data = await request.json();
    const {
      name,
      lastname,
      telephone,
      email,
      username,
      password,
      image,
      position, // field for position
    } = data;

    await connection.beginTransaction(); // Start transaction

    // Insert employee data
    const [employeeResult] = await connection.query(
      `INSERT INTO employees (name, lastname, telephone, email, username, password, image, position)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, lastname, telephone, email, username, password, image, position]
    );

    const emp_id = (employeeResult as any).insertId; // Type assertion for insertId

    await connection.commit(); // Commit transaction

    return NextResponse.json({ success: true, emp_id });
  } catch (error) {
    await connection.rollback(); // Rollback transaction in case of error
    console.error("Error inserting employee:", error);
    return NextResponse.json(
      { error: "Failed to register employee" },
      { status: 500 }
    );
  } finally {
    connection.release(); // Release connection
  }
}

// Update employee information
export async function PUT(request: Request) {
  const connection = await db.getConnection(); // Get connection for transaction

  try {
    const data = await request.json();
    const {
      emp_id,
      name,
      lastname,
      telephone,
      email,
      username,
      password,
      image,
      position,
    } = data;

    await connection.beginTransaction(); // Start transaction

    // Update employee data
    await connection.query(
      `UPDATE employees SET name = ?, lastname = ?, telephone = ?, email = ?, username = ?, password = ?, image = ?, position = ?
       WHERE id = ?`,
      [
        name,
        lastname,
        telephone,
        email,
        username,
        password,
        image,
        position,
        emp_id,
      ]
    );

    await connection.commit(); // Commit transaction

    return NextResponse.json({ success: true });
  } catch (error) {
    await connection.rollback(); // Rollback transaction in case of error
    console.error("Error updating employee:", error);
    return NextResponse.json(
      { error: "Failed to update employee" },
      { status: 500 }
    );
  } finally {
    connection.release(); // Release connection
  }
}

// Delete employee
export async function DELETE(request: Request) {
  const connection = await db.getConnection(); // Get connection for transaction

  try {
    const { emp_id } = await request.json();

    await connection.beginTransaction(); // Start transaction

    // Delete employee data
    await connection.query(`DELETE FROM employees WHERE id = ?`, [emp_id]);

    await connection.commit(); // Commit transaction

    return NextResponse.json({ success: true });
  } catch (error) {
    await connection.rollback(); // Rollback transaction in case of error
    console.error("Error deleting employee:", error);
    return NextResponse.json(
      { error: "Failed to delete employee" },
      { status: 500 }
    );
  } finally {
    connection.release(); // Release connection
  }
}
