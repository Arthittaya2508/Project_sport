// lib/db.ts

import mysql from "mysql2/promise";

const connection = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

export async function query<T>(sql: string, values?: any[]): Promise<T[]> {
  const [rows] = await connection.execute(sql, values);
  return rows as T[];
}

export default connection;
