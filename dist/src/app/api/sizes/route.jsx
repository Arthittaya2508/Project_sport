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
exports.GET = GET;
exports.POST = POST;
exports.PUT = PUT;
exports.DELETE = DELETE;
const server_1 = require("next/server");
const db_1 = __importDefault(require("../../lib/db"));
// Fetch all sizes
function GET() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield db_1.default.query("SELECT * FROM sizes");
            return server_1.NextResponse.json(rows);
        }
        catch (error) {
            console.error("Error fetching sizes:", error);
            return server_1.NextResponse.json({ error: "Failed to fetch sizes" }, { status: 500 });
        }
    });
}
// Add a new size
function POST(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield request.json();
            const { size_name } = data;
            const [result] = yield db_1.default.query(`INSERT INTO sizes (size_name) VALUES (?)`, [size_name]);
            return server_1.NextResponse.json({ success: true, result });
        }
        catch (error) {
            console.error("Error inserting size:", error);
            return server_1.NextResponse.json({ error: "Failed to add size" }, { status: 500 });
        }
    });
}
// Update an existing size
function PUT(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield request.json();
            const { size_id, size_name } = data;
            const [result] = yield db_1.default.query(`UPDATE sizes SET size_name = ? WHERE size_id = ?`, [size_name, size_id] // Ensure size_id is used
            );
            return server_1.NextResponse.json({ success: true, result });
        }
        catch (error) {
            console.error("Error updating size:", error);
            return server_1.NextResponse.json({ error: "Failed to update size" }, { status: 500 });
        }
    });
}
// Delete an existing size
function DELETE(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield request.json();
            const { size_id } = data;
            const [result] = yield db_1.default.query(`DELETE FROM sizes WHERE size_id = ?`, [size_id] // Ensure size_id is used
            );
            return server_1.NextResponse.json({ success: true, result });
        }
        catch (error) {
            console.error("Error deleting size:", error);
            return server_1.NextResponse.json({ error: "Failed to delete size" }, { status: 500 });
        }
    });
}
