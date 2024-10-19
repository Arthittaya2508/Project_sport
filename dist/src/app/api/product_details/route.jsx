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
const server_1 = require("next/server");
const db_1 = __importDefault(require("../../lib/db"));
// Fetch all products
function GET() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield db_1.default.query("SELECT * FROM product_details");
            return server_1.NextResponse.json(rows);
        }
        catch (error) {
            console.error("Error fetching products:", error);
            return server_1.NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
        }
    });
}
function POST(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { details } = yield request.json();
            // Ensure details is an array
            if (!Array.isArray(details)) {
                return server_1.NextResponse.json({ error: "Invalid input, expected an array of product_details" }, { status: 400 });
            }
            // Generate the SQL query with placeholders
            const sql = `
      INSERT INTO product_details (pro_id, color_id, size_id, gender_id, stock_quantity, sku, pro_image, sale_price, cost_price)
      VALUES ${details.map(() => "(?, ?, ?, ?, ?, ?, ?, ?, ?)").join(", ")}
    `;
            // Flatten the array of product values into a single array
            const values = details.flatMap((detail) => [
                detail.pro_id,
                detail.color_id,
                detail.size_id,
                detail.gender_id,
                detail.stock_quantity,
                detail.sku,
                detail.pro_image,
                detail.sale_price,
                detail.cost_price,
            ]);
            yield db_1.default.query(sql, values);
            return server_1.NextResponse.json({ success: true });
        }
        catch (error) {
            console.error("Error inserting product_details:", error);
            return server_1.NextResponse.json({ error: "Failed to add product_details" }, { status: 500 });
        }
    });
}
