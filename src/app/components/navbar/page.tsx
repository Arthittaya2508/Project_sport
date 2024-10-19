"use client";
import { useState } from "react";
import Link from "next/link";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import Modal from "../login/page";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
            <li>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered" className="text-white">
                    ประเภทสินค้า
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Product Categories"
                  className="bg-white"
                >
                  <DropdownItem key="clothing">
                    <Link href="#">เสื้อผ้า</Link>
                  </DropdownItem>
                  <DropdownItem key="shoes">
                    <Link href="#">รองเท้า</Link>
                  </DropdownItem>
                  <DropdownItem key="bags">
                    <Link href="#">กระเป๋า</Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
            {/* Dropdown for Other Accessories */}
            <li>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered" className="text-white">
                    อุปกรณ์อื่นๆ
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Accessories" className="bg-white">
                  <DropdownItem key="watches">
                    <Link href="#">นาฬิกา</Link>
                  </DropdownItem>
                  <DropdownItem key="glasses">
                    <Link href="#">แว่นตา</Link>
                  </DropdownItem>
                  <DropdownItem key="jewelry">
                    <Link href="#">เครื่องประดับ</Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
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
          <button
            className="hover:text-blue-500"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <AiOutlineSearch size={24} />
          </button>
          {/* Search Input */}
          {isSearchOpen && (
            <input
              type="text"
              className="bg-white text-black px-3 py-1 rounded outline-none"
              placeholder="ค้นหา..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          )}
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
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
