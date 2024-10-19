"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
const db_1 = __importDefault(require("../../lib/db"));
function POST(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield request.json();
            const { name, lastname, telephone, email, username, password, image } = data;
            const userQuery = `
      INSERT INTO users (name, lastname, telephone, email, username, password, image) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
            // Run the query and get the result
            const [userResult] = yield db_1.default.query(userQuery, [
                name,
                lastname,
                telephone,
                email,
                username,
                password,
                image,
            ]);
            // Cast userResult to any to bypass TypeScript error
            const userId = userResult.insertId;
            return server_1.NextResponse.json({ success: true, userId });
        }
        catch (error) {
            console.error("Error inserting user:", error);
            return server_1.NextResponse.json({ error: "Failed to register user" }, { status: 500 });
        }
    });
}
