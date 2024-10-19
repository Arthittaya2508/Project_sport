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
exports.default = handler;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("../../lib/db"));
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.method === "POST") {
            try {
                // Read and parse the JSON file
                const filePath = path_1.default.join(process.cwd(), "public", "json", "address.json");
                const fileContent = fs_1.default.readFileSync(filePath, "utf8");
                const addresses = JSON.parse(fileContent);
                // Loop through each address and insert it into the database
                for (const address of addresses) {
                    const { district, amphoe, province, zipcode } = address;
                    // Assuming `address_name` and `user_id` are provided in the request body or default values
                    const address_name = req.body.address_name || "Default Address Name";
                    const user_id = req.body.user_id || 1; // Example customer ID
                    // Insert the address data into the database
                    yield db_1.default.query("INSERT INTO addresses (address_name, customer_id, district, amphoe, province, zipcode) VALUES (?, ?, ?, ?, ?, ?)", [address_name, user_id, district, amphoe, province, zipcode]);
                }
                res.status(201).json({ message: "Addresses added successfully." });
            }
            catch (error) {
                console.error("Error reading or inserting data:", error);
                res.status(500).json({ message: "Failed to add addresses." });
            }
        }
        else if (req.method === "GET") {
            try {
                // Retrieve addresses from the database
                const [rows] = yield db_1.default.query("SELECT * FROM addresses");
                // Log the retrieved rows for debugging
                console.log("Retrieved addresses:", rows);
                res.status(200).json(rows);
            }
            catch (error) {
                console.error("Error retrieving addresses:", error);
                res.status(500).json({ message: "Failed to retrieve addresses." });
            }
        }
        else {
            res.status(405).json({ message: "Method not allowed" });
        }
    });
}
