"use client";
import { useState } from "react";
import Link from "next/link";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineDown,
  AiOutlineUp,
} from "react-icons/ai";
import Modal from "../login/page";

const Navbar = () => {
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isAccessoriesOpen, setIsAccessoriesOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle opening a dropdown and closing the other one
  const toggleDropdown = (dropdown: string) => {
    if (dropdown === "product") {
      setIsProductOpen(!isProductOpen);
      if (isAccessoriesOpen) setIsAccessoriesOpen(false);
    } else if (dropdown === "accessories") {
      setIsAccessoriesOpen(!isAccessoriesOpen);
      if (isProductOpen) setIsProductOpen(false);
    }
  };

  return (
    <nav className="bg-cyprus-950 shadow-md w-full text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left side */}
        <div className="flex items-center space-x-8">
          {/* Store Name */}
          <h1 className="text-lg font-semibold mr-10">เฟื่องฟู สปอร์ต</h1>
          {/* Links */}
          <ul className="flex items-center space-x-6">
            <li>
              <Link href="/" className="hover:text-blue-500">
                หน้าแรก
              </Link>
            </li>
            {/* Dropdown for Product Categories */}
            <li className="relative">
              <button
                onClick={() => toggleDropdown("product")}
                className="flex items-center space-x-1 hover:text-blue-500"
              >
                <span>ประเภทสินค้า</span>
                {isProductOpen ? (
                  <AiOutlineUp size={16} />
                ) : (
                  <AiOutlineDown size={16} />
                )}
              </button>
              {isProductOpen && (
                <ul className="absolute left-0 mt-2 w-40 bg-white shadow-lg border rounded-lg">
                  <li className="hover:bg-gray-100 px-4 py-2">
                    <Link href="#">เสื้อผ้า</Link>
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2">
                    <Link href="#">รองเท้า</Link>
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2">
                    <Link href="#">กระเป๋า</Link>
                  </li>
                </ul>
              )}
            </li>
            {/* Dropdown for Other Accessories */}
            <li className="relative">
              <button
                onClick={() => toggleDropdown("accessories")}
                className="flex items-center space-x-1 hover:text-blue-500"
              >
                <span>อุปกรณ์อื่นๆ</span>
                {isAccessoriesOpen ? (
                  <AiOutlineUp size={16} />
                ) : (
                  <AiOutlineDown size={16} />
                )}
              </button>
              {isAccessoriesOpen && (
                <ul className="absolute left-0 mt-2 w-40 bg-white shadow-lg border rounded-lg">
                  <li className="hover:bg-gray-100 px-4 py-2">
                    <Link href="#">นาฬิกา</Link>
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2">
                    <Link href="#">แว่นตา</Link>
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2">
                    <Link href="#">เครื่องประดับ</Link>
                  </li>
                </ul>
              )}
            </li>
            {/* Screen Printing Service */}
            <li>
              <Link href="/screen-printing" className="hover:text-blue-500">
                สั่งสกีนเสื้อ
              </Link>
            </li>
          </ul>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-6">
          {/* Search */}
          <button className="hover:text-blue-500">
            <AiOutlineSearch size={24} />
          </button>
          {/* Wishlist */}
          <button className="hover:text-blue-500">
            <AiOutlineHeart size={24} />
          </button>
          {/* Shopping Cart */}
          <button className="hover:text-blue-500">
            <AiOutlineShoppingCart size={24} />
          </button>
          {/* Login Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-cyprus-700 text-white px-4 py-2 rounded hover:bg-cyprus-500"
          >
            ล็อกอิน
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
};

export default Navbar;
