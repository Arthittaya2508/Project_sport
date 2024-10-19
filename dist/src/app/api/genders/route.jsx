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
// Fetch all genders
function GET() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield db_1.default.query("SELECT * FROM genders");
            return server_1.NextResponse.json(rows);
        }
        catch (error) {
            console.error("Error fetching genders:", error);
            return server_1.NextResponse.json({ error: "Failed to fetch genders" }, { status: 500 });
        }
    });
}
// Add a new gender
function POST(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield request.json();
            const { gender_name } = data;
            const [result] = yield db_1.default.query(`INSERT INTO genders (gender_name) VALUES (?)`, [gender_name]);
            return server_1.NextResponse.json({ success: true, result });
        }
        catch (error) {
            console.error("Error inserting gender:", error);
            return server_1.NextResponse.json({ error: "Failed to add gender" }, { status: 500 });
        }
    });
}
// Update an existing gender
function PUT(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield request.json();
            const { gender_id, gender_name } = data;
            const [result] = yield db_1.default.query(`UPDATE genders SET gender_name = ? WHERE gender_id = ?`, [gender_name, gender_id] // Ensure gender_id is used
            );
            return server_1.NextResponse.json({ success: true, result });
        }
        catch (error) {
            console.error("Error updating gender:", error);
            return server_1.NextResponse.json({ error: "Failed to update gender" }, { status: 500 });
        }
    });
}
// Delete an existing gender
function DELETE(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield request.json();
            const { gender_id } = data;
            const [result] = yield db_1.default.query(`DELETE FROM genders WHERE gender_id = ?`, [gender_id] // Ensure gender_id is used
            );
            return server_1.NextResponse.json({ success: true, result });
        }
        catch (error) {
            console.error("Error deleting gender:", error);
            return server_1.NextResponse.json({ error: "Failed to delete gender" }, { status: 500 });
        }
    });
}
