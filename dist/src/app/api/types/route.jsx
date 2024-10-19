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
// Fetch all types
function GET() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield db_1.default.query("SELECT * FROM types");
            return server_1.NextResponse.json(rows);
        }
        catch (error) {
            console.error("Error fetching types:", error);
            return server_1.NextResponse.json({ error: "Failed to fetch types" }, { status: 500 });
        }
    });
}
// Add a new type
function POST(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield request.json();
            const { type_name } = data;
            const [result] = yield db_1.default.query(`INSERT INTO types (type_name) VALUES (?)`, [type_name]);
            return server_1.NextResponse.json({ success: true, result });
        }
        catch (error) {
            console.error("Error inserting type:", error);
            return server_1.NextResponse.json({ error: "Failed to add type" }, { status: 500 });
        }
    });
}
// Update an existing type
function PUT(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield request.json();
            const { type_id, type_name } = data;
            console.log({ type_id, type_name }); // ตรวจสอบข้อมูลที่ได้รับ
            const [result] = yield db_1.default.query(`UPDATE types SET type_name = ? WHERE type_id = ?`, [type_name, type_id]);
            console.log(result); // ตรวจสอบผลลัพธ์
            return server_1.NextResponse.json({ success: true, result });
        }
        catch (error) {
            console.error("Error updating type:", error);
            return server_1.NextResponse.json({ error: "Failed to update type" }, { status: 500 });
        }
    });
}
// Delete an existing type
function DELETE(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield request.json();
            const { type_id } = data;
            console.log({ type_id }); // ตรวจสอบข้อมูลที่ได้รับ
            const [result] = yield db_1.default.query(`DELETE FROM types WHERE type_id = ?`, [
                type_id,
            ]);
            console.log(result); // ตรวจสอบผลลัพธ์
            return server_1.NextResponse.json({ success: true, result });
        }
        catch (error) {
            console.error("Error deleting type:", error);
            return server_1.NextResponse.json({ error: "Failed to delete type" }, { status: 500 });
        }
    });
}
