"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const ai_1 = require("react-icons/ai");
const page_1 = __importDefault(require("../register/page")); // นำเข้า RegisterModal
const LoginModal = ({ isOpen, onClose }) => {
    const [isRegisterOpen, setRegisterOpen] = (0, react_1.useState)(false);
    if (!isOpen)
        return null;
    const handleSignUpClick = () => {
        setRegisterOpen(true);
    };
    return (<>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
            <ai_1.AiOutlineClose size={24}/>
          </button>
          <h2 className="text-xl font-semibold mb-4 text-black">ล็อกอิน</h2>
          {/* เพิ่มฟอร์มล็อกอิน */}
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">อีเมล</label>
              <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="กรุณาใส่อีเมล"/>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">รหัสผ่าน</label>
              <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="กรุณาใส่รหัสผ่าน"/>
            </div>
            <p className="mb-4 text-black cursor-pointer" onClick={handleSignUpClick}>
              สมัครสมาชิก
            </p>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              ล็อกอิน
            </button>
          </form>
        </div>
      </div>
      <page_1.default isOpen={isRegisterOpen} onClose={() => setRegisterOpen(false)}/>
    </>);
};
exports.default = LoginModal;
