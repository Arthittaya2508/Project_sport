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
// Fetch all bands
function GET() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield db_1.default.query("SELECT * FROM bands");
            return server_1.NextResponse.json(rows);
        }
        catch (error) {
            console.error("Error fetching bands:", error);
            return server_1.NextResponse.json({ error: "Failed to fetch bands" }, { status: 500 });
        }
    });
}
// Add a new band
function POST(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield request.json();
            const { band_name } = data;
            const [result] = yield db_1.default.query(`INSERT INTO bands (band_name) VALUES (?)`, [band_name]);
            return server_1.NextResponse.json({ success: true, result });
        }
        catch (error) {
            console.error("Error inserting band:", error);
            return server_1.NextResponse.json({ error: "Failed to add band" }, { status: 500 });
        }
    });
}
// Update an existing band
function PUT(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield request.json();
            const { band_id, band_name } = data;
            if (!band_id || !band_name) {
                return server_1.NextResponse.json({ error: "Missing band_id or band_name" }, { status: 400 });
            }
            const [result] = yield db_1.default.query(`UPDATE bands SET band_name = ? WHERE band_id = ?`, [band_name, band_id]);
            return server_1.NextResponse.json({ success: true, result });
        }
        catch (error) {
            console.error("Error updating band:", error);
            return server_1.NextResponse.json({ error: "Failed to update band" }, { status: 500 });
        }
    });
}
// Delete an existing band
function DELETE(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield request.json();
            const { band_id } = data;
            if (!band_id) {
                return server_1.NextResponse.json({ error: "Missing band_id" }, { status: 400 });
            }
            const [result] = yield db_1.default.query(`DELETE FROM bands WHERE band_id = ?`, [
                band_id,
            ]);
            return server_1.NextResponse.json({ success: true, result });
        }
        catch (error) {
            console.error("Error deleting band:", error);
            return server_1.NextResponse.json({ error: "Failed to delete band" }, { status: 500 });
        }
    });
}
