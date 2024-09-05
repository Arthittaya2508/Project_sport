import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import db from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Read and parse the JSON file
      const filePath = path.join(
        process.cwd(),
        "public",
        "json",
        "address.json"
      );
      const fileContent = fs.readFileSync(filePath, "utf8");
      const addresses = JSON.parse(fileContent);

      // Loop through each address and insert it into the database
      for (const address of addresses) {
        const { district, amphoe, province, zipcode } = address;

        // Assuming `customer_id` and `address_name` are provided in the request body or default values
        const address_name = req.body.address_name || "Default Address Name";
        const user_id = req.body.user_id || 1; // Example customer ID

        // Insert the address data into the database
        await db.query(
          "INSERT INTO addresses (address_name, customer_id, district, amphoe, province, zipcode) VALUES (?, ?, ?, ?, ?, ?)",
          [address_name, user_id, district, amphoe, province, zipcode]
        );
      }

      res.status(201).json({ message: "Addresses added successfully." });
    } catch (error) {
      console.error("Error reading or inserting data:", error);
      res.status(500).json({ message: "Failed to add addresses." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
