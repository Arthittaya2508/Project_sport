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
// pages/api/auth/[...nextauth].ts
const next_auth_1 = __importDefault(require("next-auth"));
const credentials_1 = __importDefault(require("next-auth/providers/credentials"));
const db_1 = __importDefault(require("../../lib/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.default = (0, next_auth_1.default)({
    providers: [
        (0, credentials_1.default)({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username" },
                password: { label: "Password", type: "password" },
            },
            authorize(credentials) {
                return __awaiter(this, void 0, void 0, function* () {
                    const { username, password } = credentials !== null && credentials !== void 0 ? credentials : {};
                    // Check if username and password are provided
                    if (!username || !password) {
                        throw new Error("Username and password are required.");
                    }
                    // Fetch the user from the database
                    const [rows] = yield db_1.default.execute("SELECT * FROM employees WHERE username = ?", [username]);
                    if (rows.length > 0) {
                        const user = rows[0]; // Access the first row
                        // Check if the password matches
                        const isPasswordMatch = yield bcryptjs_1.default.compare(password, user.password);
                        if (isPasswordMatch) {
                            // Return user object (excluding sensitive fields like password)
                            return { id: user.id, username: user.username };
                        }
                        else {
                            throw new Error("Invalid username or password.");
                        }
                    }
                    else {
                        throw new Error("Invalid username or password.");
                    }
                });
            },
        }),
    ],
    pages: {
        signIn: "/auth/login", // Optional: Custom login page
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        jwt(_a) {
            return __awaiter(this, arguments, void 0, function* ({ token, user }) {
                if (user) {
                    token.id = user.id;
                }
                return token;
            });
        },
        session(_a) {
            return __awaiter(this, arguments, void 0, function* ({ session, token }) {
                if (token) {
                    session.id = token.id;
                }
                return session;
            });
        },
    },
});
