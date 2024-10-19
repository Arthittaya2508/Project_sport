"use strict";
// lib/product.ts
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
exports.getProductById = getProductById;
const db_1 = require("./db"); // ปรับ path ให้ตรงกับที่เก็บ db.ts
function getProductById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, db_1.query)("SELECT * FROM products WHERE id = ?", [id]);
            if (result.length > 0) {
                return result[0];
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error("Error fetching product by ID:", error);
            throw error;
        }
    });
}
