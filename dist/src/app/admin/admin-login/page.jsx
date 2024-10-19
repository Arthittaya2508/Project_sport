"use strict";
"use client"; // ทำให้ component เป็น Client Component
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
const react_1 = require("react");
const navigation_1 = require("next/navigation"); // ใช้ next/navigation แทน next/router
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const ai_1 = require("react-icons/ai"); // นำเข้าไอคอน
const AdminLogin = () => {
    const [username, setUsername] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [showPassword, setShowPassword] = (0, react_1.useState)(false); // state สำหรับเปิด-ปิดรหัสผ่าน
    const router = (0, navigation_1.useRouter)();
    const handleLogin = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault(); // ป้องกันการรีเฟรชหน้าเมื่อส่งฟอร์ม
        try {
            const res = yield fetch("/api/admin-login", {
                method: "POST", // กำหนด method เป็น POST
                headers: {
                    "Content-Type": "application/json", // กำหนด header Content-Type ให้เป็น application/json
                },
                body: JSON.stringify({ username, password }), // ส่งข้อมูล username และ password ใน body
            });
            const data = yield res.json(); // แปลง response เป็น JSON
            if (res.ok && data.success) {
                // แสดงข้อความว่า login สำเร็จ
                sweetalert2_1.default.fire({
                    icon: "success",
                    title: "Login Successful!",
                    text: "Redirecting to admin dashboard...",
                    timer: 1500,
                }).then(() => {
                    // เปลี่ยนเส้นทางไปยังหน้า admin dashboard
                    router.push("/admin/admin-dash");
                });
            }
            else {
                // แสดง error ว่า login ไม่สำเร็จ
                sweetalert2_1.default.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: "Invalid username or password.",
                });
            }
        }
        catch (error) {
            // แสดงข้อความเมื่อเกิด error
            sweetalert2_1.default.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong. Please try again.",
            });
        }
    });
    return (<div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-300" required/>
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input id="password" type={showPassword ? "text" : "password"} // แสดงรหัสผ่านตามสถานะ
     value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-300" required/>
            {/* ปุ่มไอคอนสำหรับเปิด-ปิดการแสดงรหัสผ่าน */}
            <div className="absolute inset-y-0 right-3 top-5 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)} // เปลี่ยน state การแสดงรหัสผ่าน
    >
              {showPassword ? (<ai_1.AiFillEye size={24}/> // ไอคอนเปิดตา
        ) : (<ai_1.AiFillEyeInvisible size={24}/> // ไอคอนปิดตา
        )}
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Login
          </button>
        </form>
      </div>
    </div>);
};
exports.default = AdminLogin;
