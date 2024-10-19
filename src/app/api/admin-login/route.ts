// // pages/api/auth/[...nextauth].ts
// import NextAuth, { NextAuthOptions, Session, JWT } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import db from "../../lib/db"; // Adjust path if necessary
// import bcrypt from "bcryptjs";
// import { RowDataPacket } from "mysql2";
// import { NextApiRequest, NextApiResponse } from "next";

// // Define custom session type
// interface CustomSession extends Session {
//   id: string; // or number depending on your user id type
// }

// // Define custom JWT type
// interface CustomJWT extends JWT {
//   id: string; // or number depending on your user id type
// }

// const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text", placeholder: "Username" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const { username, password } = credentials ?? {};

//         if (!username || !password) {
//           throw new Error("Username and password are required.");
//         }

//         try {
//           const [rows] = await db.execute<RowDataPacket[]>(
//             "SELECT * FROM employees WHERE username = ?",
//             [username]
//           );

//           if (rows.length > 0) {
//             const user = rows[0];

//             const isPasswordMatch = await bcrypt.compare(
//               password,
//               user.password
//             );

//             if (isPasswordMatch) {
//               return { id: user.id, username: user.username };
//             } else {
//               throw new Error("Invalid username or password.");
//             }
//           } else {
//             throw new Error("Invalid username or password.");
//           }
//         } catch (error) {
//           console.error("Error during authentication:", error);
//           throw new Error("Authentication failed. Please try again.");
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/auth/login",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({
//       token,
//       user,
//     }: {
//       token: CustomJWT;
//       user?: { id: string; username: string };
//     }) {
//       if (user) {
//         token.id = user.id; // Store user id in token
//       }
//       return token;
//     },
//     async session({
//       session,
//       token,
//     }: {
//       session: CustomSession;
//       token: CustomJWT;
//     }) {
//       if (token) {
//         session.id = token.id; // Extend session with id
//       }
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET, // Set your environment variable
// };

// // Export the NextAuth handler
// export default (req: NextApiRequest, res: NextApiResponse) =>
//   NextAuth(req, res, authOptions);
