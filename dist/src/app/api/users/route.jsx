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
// Fetch all users
function GET() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield db_1.default.query("SELECT * FROM users");
            return server_1.NextResponse.json(rows);
        }
        catch (error) {
            return server_1.NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
        }
    });
}
// Register a new user and their address
function POST(request) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield db_1.default.getConnection(); // Get connection for transaction
        try {
            const data = yield request.json();
            const { name, lastname, telephone, email, username, password, image, address, // address from the form
            district, amphoe, province, zipcode, } = data;
            yield connection.beginTransaction(); // Start transaction
            // Insert user data
            const [userResult] = yield connection.query(`INSERT INTO users (name, lastname, telephone, email, username, password, image)
       VALUES (?, ?, ?, ?, ?, ?, ?)`, [name, lastname, telephone, email, username, password, image]);
            const userId = userResult.insertId; // Type assertion for insertId
            // Insert address data with the user's ID as a foreign key
            yield connection.query(`INSERT INTO addresses (address_name, user_id, district, amphoe, province, zipcode)
       VALUES (?, ?, ?, ?, ?, ?)`, [address, userId, district, amphoe, province, zipcode]);
            yield connection.commit(); // Commit transaction
            return server_1.NextResponse.json({ success: true, userId });
        }
        catch (error) {
            yield connection.rollback(); // Rollback transaction in case of error
            console.error("Error inserting user or address:", error);
            return server_1.NextResponse.json({ error: "Failed to register user and address" }, { status: 500 });
        }
        finally {
            connection.release(); // Release connection
        }
    });
}
// Update user and address information
function PUT(request) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield db_1.default.getConnection(); // Get connection for transaction
        try {
            const data = yield request.json();
            const { userId, name, lastname, telephone, email, username, password, image, address, district, amphoe, province, zipcode, } = data;
            yield connection.beginTransaction(); // Start transaction
            // Update user data
            yield connection.query(`UPDATE users SET name = ?, lastname = ?, telephone = ?, email = ?, username = ?, password = ?, image = ?
       WHERE id = ?`, [name, lastname, telephone, email, username, password, image, userId]);
            // Update address data
            yield connection.query(`UPDATE addresses SET address_name = ?, district = ?, amphoe = ?, province = ?, zipcode = ?
       WHERE user_id = ?`, [address, district, amphoe, province, zipcode, userId]);
            yield connection.commit(); // Commit transaction
            return server_1.NextResponse.json({ success: true });
        }
        catch (error) {
            yield connection.rollback(); // Rollback transaction in case of error
            console.error("Error updating user or address:", error);
            return server_1.NextResponse.json({ error: "Failed to update user and address" }, { status: 500 });
        }
        finally {
            connection.release(); // Release connection
        }
    });
}
// Delete user and associated address
function DELETE(request) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield db_1.default.getConnection(); // Get connection for transaction
        try {
            const { userId } = yield request.json();
            yield connection.beginTransaction(); // Start transaction
            // Delete address data first (address table should have FK constraint)
            yield connection.query(`DELETE FROM addresses WHERE user_id = ?`, [userId]);
            // Then delete user data
            yield connection.query(`DELETE FROM users WHERE id = ?`, [userId]);
            yield connection.commit(); // Commit transaction
            return server_1.NextResponse.json({ success: true });
        }
        catch (error) {
            yield connection.rollback(); // Rollback transaction in case of error
            console.error("Error deleting user or address:", error);
            return server_1.NextResponse.json({ error: "Failed to delete user and address" }, { status: 500 });
        }
        finally {
            connection.release(); // Release connection
        }
    });
}
