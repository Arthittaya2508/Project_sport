// server.ts
import express from "express";
import next from "next";
import { createServer } from "http";
import { parse } from "url";
import bodyParser from "body-parser";
import cors from "cors";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const expressApp = express();
expressApp.use(bodyParser.json());
expressApp.use(cors());

// Add your custom Express routes here

// NextAuth route handling
expressApp.all("/api/auth/*", (req, res) => {
  const parsedUrl = parse(req.url!, true);
  // Handle NextAuth API requests
  return handle(req, res, parsedUrl);
});

// Catch-all for all other requests
expressApp.all("*", (req, res) => {
  return handle(req, res);
});

// Start the server
app.prepare().then(() => {
  const server = createServer(expressApp);
  const PORT = process.env.PORT || 3000;

  server.listen(PORT, (err?: any) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
