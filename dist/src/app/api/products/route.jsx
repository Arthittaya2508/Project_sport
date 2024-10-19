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
// Fetch all products
function GET() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield db_1.default.query("SELECT * FROM products");
            return server_1.NextResponse.json(rows);
        }
        catch (error) {
            console.error("Error fetching products:", error);
            return server_1.NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
        }
    });
}
// Add multiple products
function POST(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield request.json();
            // Ensure products is an array
            if (!Array.isArray(products)) {
                return server_1.NextResponse.json({ error: "Invalid input, expected an array of products" }, { status: 400 });
            }
            // Generate the SQL query with placeholders
            const sql = `
      INSERT INTO products (pro_name, pro_des, type_id, band_id)
      VALUES ${products.map(() => "(?, ?, ?, ?)").join(", ")}
    `;
            // Flatten the array of product values into a single array
            const values = products.flatMap((product) => [
                product.pro_name,
                product.pro_des,
                product.type_id,
                product.band_id,
            ]);
            yield db_1.default.query(sql, values);
            return server_1.NextResponse.json({ success: true });
        }
        catch (error) {
            console.error("Error inserting products:", error);
            return server_1.NextResponse.json({ error: "Failed to add products" }, { status: 500 });
        }
    });
}
// Update an existing product
function PUT(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield request.json();
            const { id, pro_name, type_id, band_id } = data;
            yield db_1.default.query(`UPDATE products 
       SET pro_name = ?, type_id = ?, band_id = ? 
       WHERE pro_id = ?`, [pro_name, type_id, band_id, id]);
            return server_1.NextResponse.json({ success: true });
        }
        catch (error) {
            console.error("Error updating product:", error);
            return server_1.NextResponse.json({ error: "Failed to update product" }, { status: 500 });
        }
    });
}
// Delete a product
function DELETE(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = yield request.json();
            yield db_1.default.query(`DELETE FROM products WHERE pro_id = ?`, [id]);
            return server_1.NextResponse.json({ success: true });
        }
        catch (error) {
            console.error("Error deleting product:", error);
            return server_1.NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
        }
    });
}
