"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const link_1 = __importDefault(require("next/link"));
const ai_1 = require("react-icons/ai");
const page_1 = __importDefault(require("../login/page"));
const Navbar = () => {
    const [isProductOpen, setIsProductOpen] = (0, react_1.useState)(false);
    const [isAccessoriesOpen, setIsAccessoriesOpen] = (0, react_1.useState)(false);
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    // Handle opening a dropdown and closing the other one
    const toggleDropdown = (dropdown) => {
        if (dropdown === "product") {
            setIsProductOpen(!isProductOpen);
            if (isAccessoriesOpen)
                setIsAccessoriesOpen(false);
        }
        else if (dropdown === "accessories") {
            setIsAccessoriesOpen(!isAccessoriesOpen);
            if (isProductOpen)
                setIsProductOpen(false);
        }
    };
    return (<nav className="bg-cyprus-950 shadow-md w-full text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left side */}
        <div className="flex items-center space-x-8">
          {/* Store Name */}
          <h1 className="text-lg font-semibold mr-10">เฟื่องฟู สปอร์ต</h1>
          {/* Links */}
          <ul className="flex items-center space-x-6">
            <li>
              <link_1.default href="/" className="hover:text-blue-500">
                หน้าแรก
              </link_1.default>
            </li>
            {/* Dropdown for Product Categories */}
            <li className="relative">
              <button onClick={() => toggleDropdown("product")} className="flex items-center space-x-1 hover:text-blue-500">
                <span>ประเภทสินค้า</span>
                {isProductOpen ? (<ai_1.AiOutlineUp size={16}/>) : (<ai_1.AiOutlineDown size={16}/>)}
              </button>
              {isProductOpen && (<ul className="absolute left-0 mt-2 w-40 bg-white shadow-lg border rounded-lg">
                  <li className="hover:bg-gray-100 px-4 py-2">
                    <link_1.default href="#">เสื้อผ้า</link_1.default>
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2">
                    <link_1.default href="#">รองเท้า</link_1.default>
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2">
                    <link_1.default href="#">กระเป๋า</link_1.default>
                  </li>
                </ul>)}
            </li>
            {/* Dropdown for Other Accessories */}
            <li className="relative">
              <button onClick={() => toggleDropdown("accessories")} className="flex items-center space-x-1 hover:text-blue-500">
                <span>อุปกรณ์อื่นๆ</span>
                {isAccessoriesOpen ? (<ai_1.AiOutlineUp size={16}/>) : (<ai_1.AiOutlineDown size={16}/>)}
              </button>
              {isAccessoriesOpen && (<ul className="absolute left-0 mt-2 w-40 bg-white shadow-lg border rounded-lg">
                  <li className="hover:bg-gray-100 px-4 py-2">
                    <link_1.default href="#">นาฬิกา</link_1.default>
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2">
                    <link_1.default href="#">แว่นตา</link_1.default>
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2">
                    <link_1.default href="#">เครื่องประดับ</link_1.default>
                  </li>
                </ul>)}
            </li>
            {/* Screen Printing Service */}
            <li>
              <link_1.default href="/screen-printing" className="hover:text-blue-500">
                สั่งสกีนเสื้อ
              </link_1.default>
            </li>
          </ul>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-6">
          {/* Search */}
          <button className="hover:text-blue-500">
            <ai_1.AiOutlineSearch size={24}/>
          </button>
          {/* Wishlist */}
          <button className="hover:text-blue-500">
            <ai_1.AiOutlineHeart size={24}/>
          </button>
          {/* Shopping Cart */}
          <button className="hover:text-blue-500">
            <ai_1.AiOutlineShoppingCart size={24}/>
          </button>
          {/* Login Button */}
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            ล็อกอิน
          </button>
        </div>
      </div>

      {/* Modal */}
      <page_1.default isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
    </nav>);
};
exports.default = Navbar;
