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
// Fetch all employees
function GET() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield db_1.default.query("SELECT * FROM employees");
            return server_1.NextResponse.json(rows);
        }
        catch (error) {
            return server_1.NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 });
        }
    });
}
// Register a new employee
function POST(request) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield db_1.default.getConnection(); // Get connection for transaction
        try {
            const data = yield request.json();
            const { name, lastname, telephone, email, username, password, image, position, // field for position
             } = data;
            yield connection.beginTransaction(); // Start transaction
            // Insert employee data
            const [employeeResult] = yield connection.query(`INSERT INTO employees (name, lastname, telephone, email, username, password, image, position)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [name, lastname, telephone, email, username, password, image, position]);
            const emp_id = employeeResult.insertId; // Type assertion for insertId
            yield connection.commit(); // Commit transaction
            return server_1.NextResponse.json({ success: true, emp_id });
        }
        catch (error) {
            yield connection.rollback(); // Rollback transaction in case of error
            console.error("Error inserting employee:", error);
            return server_1.NextResponse.json({ error: "Failed to register employee" }, { status: 500 });
        }
        finally {
            connection.release(); // Release connection
        }
    });
}
// Update employee information
function PUT(request) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield db_1.default.getConnection(); // Get connection for transaction
        try {
            const data = yield request.json();
            const { emp_id, name, lastname, telephone, email, username, password, image, position, } = data;
            yield connection.beginTransaction(); // Start transaction
            // Update employee data
            yield connection.query(`UPDATE employees SET name = ?, lastname = ?, telephone = ?, email = ?, username = ?, password = ?, image = ?, position = ?
       WHERE id = ?`, [
                name,
                lastname,
                telephone,
                email,
                username,
                password,
                image,
                position,
                emp_id,
            ]);
            yield connection.commit(); // Commit transaction
            return server_1.NextResponse.json({ success: true });
        }
        catch (error) {
            yield connection.rollback(); // Rollback transaction in case of error
            console.error("Error updating employee:", error);
            return server_1.NextResponse.json({ error: "Failed to update employee" }, { status: 500 });
        }
        finally {
            connection.release(); // Release connection
        }
    });
}
// Delete employee
function DELETE(request) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield db_1.default.getConnection(); // Get connection for transaction
        try {
            const { emp_id } = yield request.json();
            yield connection.beginTransaction(); // Start transaction
            // Delete employee data
            yield connection.query(`DELETE FROM employees WHERE id = ?`, [emp_id]);
            yield connection.commit(); // Commit transaction
            return server_1.NextResponse.json({ success: true });
        }
        catch (error) {
            yield connection.rollback(); // Rollback transaction in case of error
            console.error("Error deleting employee:", error);
            return server_1.NextResponse.json({ error: "Failed to delete employee" }, { status: 500 });
        }
        finally {
            connection.release(); // Release connection
        }
    });
}
