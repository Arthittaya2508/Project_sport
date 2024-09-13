// pages/api/admin-login.ts
import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../lib/db"; // Update the path according to your project structure

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      const rows = await query<any>(
        "SELECT * FROM employees WHERE username = ? AND password = ?",
        [username, password]
      );

      if (rows.length > 0) {
        res.status(200).json({ success: true });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Database query failed:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
