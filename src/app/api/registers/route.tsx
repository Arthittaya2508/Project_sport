// pages/api/users.ts
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const [rows] = await db.query("SELECT * FROM users");
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch users" });
    }
  } else if (req.method === "POST") {
    const { name, lastname, address, telephone, email, username, password } =
      req.body;

    if (
      !name ||
      !lastname ||
      !address ||
      !telephone ||
      !email ||
      !username ||
      !password
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      await db.query(
        "INSERT INTO users (name, lastname, address, telephone, email, username, password) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [name, lastname, address, telephone, email, username, password]
      );
      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error inserting data:", error);
      return res.status(500).json({ error: "Failed to register user" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
