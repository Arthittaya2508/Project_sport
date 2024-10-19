"use strict";
// pages/api/product_details/[pro_id].tsx
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const db_1 = require("../../lib/db"); // ตรวจสอบ path ให้ตรงกับที่เก็บไฟล์
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { pro_id } = req.query;
        if (req.method === "GET") {
            if (typeof pro_id !== "string") {
                return res.status(400).json({ message: "Invalid product ID" });
            }
            try {
                const result = yield (0, db_1.query)("SELECT * FROM products WHERE id = ?", [pro_id]);
                if (result.length > 0) {
                    res.status(200).json(result[0]);
                }
                else {
                    res.status(404).json({ message: "Product not found" });
                }
            }
            catch (error) {
                console.error("Failed to fetch product:", error);
                res.status(500).json({ message: "Failed to fetch product" });
            }
        }
        else {
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    });
}
