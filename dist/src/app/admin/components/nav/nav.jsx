"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const noti_modal_1 = __importDefault(require("../noti-modal/noti-modal"));
const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    const notifications = [
        "Order #1234 has been shipped",
        "New message from customer",
        "Payment for Order #5678 is confirmed",
    ];
    return (<nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* ชื่อหน้า */}
        <div className="text-white text-xl ml-10 font-bold">
          เฟื่องฟู สปอร์ต
        </div>

        {/* ไอคอนแจ้งเตือน */}
        <div className="relative">
          <svg onClick={() => setIsModalOpen(true)} className="w-6 h-6 mr-8 text-white cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a7.002 7.002 0 00-5-6.709V4a2 2 0 10-4 0v.291C7.67 5.099 6 7.388 6 10v4.159c0 .538-.214 1.055-.595 1.436L4 17h11z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 21h-2v-2h2v2z"/>
          </svg>
          {/* จุดแจ้งเตือน */}
          <span className="absolute top-0 right-8 block h-2 w-2 transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full"></span>
        </div>
      </div>

      {/* Notification Modal */}
      <noti_modal_1.default isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} notifications={notifications}/>
    </nav>);
};
exports.default = Navbar;
