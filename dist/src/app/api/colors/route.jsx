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
// Fetch all colors
function GET() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield db_1.default.query("SELECT * FROM colors");
            return server_1.NextResponse.json(rows);
        }
        catch (error) {
            console.error("Error fetching colors:", error);
            return server_1.NextResponse.json({ error: "Failed to fetch colors" }, { status: 500 });
        }
    });
}
// Add a new color
function POST(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield request.json();
            const { color_name } = data;
            const [result] = yield db_1.default.query(`INSERT INTO colors (color_name) VALUES (?)`, [color_name]);
            return server_1.NextResponse.json({ success: true, result });
        }
        catch (error) {
            console.error("Error inserting color:", error);
            return server_1.NextResponse.json({ error: "Failed to add color" }, { status: 500 });
        }
    });
}
// Update an existing color
function PUT(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield request.json();
            const { color_id, color_name } = data;
            if (!color_id || !color_name) {
                return server_1.NextResponse.json({ error: "Missing color_id or color_name" }, { status: 400 });
            }
            const [result] = yield db_1.default.query(`UPDATE colors SET color_name = ? WHERE color_id = ?`, [color_name, color_id]);
            return server_1.NextResponse.json({ success: true, result });
        }
        catch (error) {
            console.error("Error updating color:", error);
            return server_1.NextResponse.json({ error: "Failed to update color" }, { status: 500 });
        }
    });
}
// Delete an existing color
function DELETE(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield request.json();
            const { color_id } = data;
            if (!color_id) {
                return server_1.NextResponse.json({ error: "Missing color_id" }, { status: 400 });
            }
            const [result] = yield db_1.default.query(`DELETE FROM colors WHERE color_id = ?`, [
                color_id,
            ]);
            return server_1.NextResponse.json({ success: true, result });
        }
        catch (error) {
            console.error("Error deleting color:", error);
            return server_1.NextResponse.json({ error: "Failed to delete color" }, { status: 500 });
        }
    });
}
