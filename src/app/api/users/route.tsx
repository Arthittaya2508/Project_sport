import { NextResponse } from "next/server";
import db from "../../lib/db";

// Fetch all users
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

// Register a new user and their address
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
      address, // address from the form
      district,
      amphoe,
      province,
      zipcode,
    } = data;

    await connection.beginTransaction(); // Start transaction

    // Insert user data
    const [userResult] = await connection.query(
      `INSERT INTO users (name, lastname, telephone, email, username, password, image)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, lastname, telephone, email, username, password, image]
    );

    const userId = (userResult as any).insertId; // Type assertion for insertId

    // Insert address data with the user's ID as a foreign key
    await connection.query(
      `INSERT INTO addresses (address_name, user_id, district, amphoe, province, zipcode)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [address, userId, district, amphoe, province, zipcode]
    );

    await connection.commit(); // Commit transaction

    return NextResponse.json({ success: true, userId });
  } catch (error) {
    await connection.rollback(); // Rollback transaction in case of error
    console.error("Error inserting user or address:", error);
    return NextResponse.json(
      { error: "Failed to register user and address" },
      { status: 500 }
    );
  } finally {
    connection.release(); // Release connection
  }
}

// Update user and address information
export async function PUT(request: Request) {
  const connection = await db.getConnection(); // Get connection for transaction

  try {
    const data = await request.json();
    const {
      userId,
      name,
      lastname,
      telephone,
      email,
      username,
      password,
      image,
      address,
      district,
      amphoe,
      province,
      zipcode,
    } = data;

    await connection.beginTransaction(); // Start transaction

    // Update user data
    await connection.query(
      `UPDATE users SET name = ?, lastname = ?, telephone = ?, email = ?, username = ?, password = ?, image = ?
       WHERE id = ?`,
      [name, lastname, telephone, email, username, password, image, userId]
    );

    // Update address data
    await connection.query(
      `UPDATE addresses SET address_name = ?, district = ?, amphoe = ?, province = ?, zipcode = ?
       WHERE user_id = ?`,
      [address, district, amphoe, province, zipcode, userId]
    );

    await connection.commit(); // Commit transaction

    return NextResponse.json({ success: true });
  } catch (error) {
    await connection.rollback(); // Rollback transaction in case of error
    console.error("Error updating user or address:", error);
    return NextResponse.json(
      { error: "Failed to update user and address" },
      { status: 500 }
    );
  } finally {
    connection.release(); // Release connection
  }
}

// Delete user and associated address
export async function DELETE(request: Request) {
  const connection = await db.getConnection(); // Get connection for transaction

  try {
    const { userId } = await request.json();

    await connection.beginTransaction(); // Start transaction

    // Delete address data first (address table should have FK constraint)
    await connection.query(`DELETE FROM addresses WHERE user_id = ?`, [userId]);

    // Then delete user data
    await connection.query(`DELETE FROM users WHERE id = ?`, [userId]);

    await connection.commit(); // Commit transaction

    return NextResponse.json({ success: true });
  } catch (error) {
    await connection.rollback(); // Rollback transaction in case of error
    console.error("Error deleting user or address:", error);
    return NextResponse.json(
      { error: "Failed to delete user and address" },
      { status: 500 }
    );
  } finally {
    connection.release(); // Release connection
  }
}
