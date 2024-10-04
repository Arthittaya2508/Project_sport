"use client";
import { useState } from "react";
import Link from "next/link";
import {
  FaUserAlt,
  FaCog,
  FaTachometerAlt,
  FaChevronDown,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isCustomerOpen, setIsCustomerOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleCustomerDropdown = () => {
    setIsCustomerOpen(!isCustomerOpen);
  };

  const toggleReportDropdown = () => {
    setIsReportOpen(!isReportOpen);
  };

  return (
    <div className="flex relative">
      <div
        className={`transition-width duration-300 ${
          isOpen ? "w-64" : "w-26"
        } bg-gray-800 text-white h-screen`}
      >
        <div className="p-4 flex flex-col items-center">
          <img
            src="../images/cat.jpg"
            alt="Sidebar Image"
            className={`transition-all duration-300 rounded-full ${
              isOpen ? "w-32 h-32" : "w-16 h-16"
            }`}
          />
          {isOpen && (
            <h2 className="mt-2 text-center">Arthittaya Thammasiri</h2>
          )}

          <nav className="mt-8 w-full">
            <ul
              className={`space-y-2 ${
                isOpen ? "pl-4" : "flex flex-col items-center space-y-4"
              }`}
            >
              <li
                className={`flex items-center ${
                  isOpen ? "" : "justify-center"
                }`}
              >
                <Link href="/admin/admin-dash">
                  <div className="flex items-center cursor-pointer">
                    <FaTachometerAlt />
                    {isOpen && (
                      <span className="ml-2 transition-opacity duration-300">
                        Dashboard
                      </span>
                    )}
                  </div>
                </Link>
              </li>
              <li>
                <div
                  className={`flex items-center cursor-pointer ${
                    isOpen ? "" : "justify-center"
                  }`}
                  onClick={toggleCustomerDropdown}
                >
                  <FaCog />
                  {isOpen && (
                    <span className="ml-2 flex items-center transition-opacity duration-300">
                      ข้อมูลสินค้า
                      <FaChevronDown
                        className={`ml-1 transition-transform duration-300 ${
                          isCustomerOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  )}
                </div>
                {isCustomerOpen && isOpen && (
                  <ul className="pl-8 mt-4 space-y-2">
                    <li className="flex items-center">
                      <Link href="/admin/admin-products">
                        <div className="flex items-center cursor-pointer">
                          <FaUserAlt />
                          <span className="ml-2">ข้อมูลสินค้า</span>
                        </div>
                      </Link>
                    </li>
                    <li className="flex items-center">
                      <Link href="/admin/admin-types">
                        <div className="flex items-center cursor-pointer">
                          <FaUserAlt />
                          <span className="ml-2">ข้อมูลประเภท</span>
                        </div>
                      </Link>
                    </li>
                    <li className="flex items-center">
                      <Link href="/admin/admin-bands">
                        <div className="flex items-center cursor-pointer">
                          <FaUserAlt />
                          <span className="ml-2">ข้อมูลแบนด์</span>
                        </div>
                      </Link>
                    </li>
                    <li className="flex items-center">
                      <Link href="/admin/admin-colors">
                        <div className="flex items-center cursor-pointer">
                          <FaUserAlt />
                          <span className="ml-2">ข้อมูลสี</span>
                        </div>
                      </Link>
                    </li>
                    <li className="flex items-center">
                      <Link href="/admin/admin-sizes">
                        <div className="flex items-center cursor-pointer">
                          <FaUserAlt />
                          <span className="ml-2">ข้อมูลขนาด</span>
                        </div>
                      </Link>
                    </li>
                    <li className="flex items-center">
                      <Link href="/admin/admin-genders">
                        <div className="flex items-center cursor-pointer">
                          <FaUserAlt />
                          <span className="ml-2">ข้อมูลเพศ</span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li
                className={`flex items-center ${
                  isOpen ? "" : "justify-center"
                }`}
              >
                <Link href="/admin/admin-transport">
                  <div className="flex items-center cursor-pointer">
                    <FaTachometerAlt />
                    {isOpen && (
                      <span className="ml-2 transition-opacity duration-300">
                        ข้อมูลขนส่ง
                      </span>
                    )}
                  </div>
                </Link>
              </li>

              <li
                className={`flex items-center ${
                  isOpen ? "" : "justify-center"
                }`}
              >
                <Link href="/admin/admin-customer">
                  <div className="flex items-center cursor-pointer">
                    <FaTachometerAlt />
                    {isOpen && (
                      <span className="ml-2 transition-opacity duration-300">
                        ข้อมูลลูกค้า
                      </span>
                    )}
                  </div>
                </Link>
              </li>
              <li
                className={`flex items-center ${
                  isOpen ? "" : "justify-center"
                }`}
              >
                <Link href="/employee-info">
                  <div className="flex items-center cursor-pointer">
                    <FaTachometerAlt />
                    {isOpen && (
                      <span className="ml-2 transition-opacity duration-300">
                        ข้อมูลพนักงาน
                      </span>
                    )}
                  </div>
                </Link>
              </li>
              <li>
                <div
                  className={`flex items-center cursor-pointer ${
                    isOpen ? "" : "justify-center"
                  }`}
                  onClick={toggleReportDropdown}
                >
                  <FaCog />
                  {isOpen && (
                    <span className="ml-2 flex items-center transition-opacity duration-300">
                      รายงานการขาย
                      <FaChevronDown
                        className={`ml-1 transition-transform duration-300 ${
                          isReportOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  )}
                </div>
                {isReportOpen && isOpen && (
                  <ul className="pl-8 mt-2 space-y-2">
                    <li className="flex items-center">
                      <Link href="/daily-report">
                        <div className="flex items-center cursor-pointer">
                          <FaUserAlt />
                          <span className="ml-2">รายงานรายวัน</span>
                        </div>
                      </Link>
                    </li>
                    <li className="flex items-center">
                      <Link href="/monthly-report">
                        <div className="flex items-center cursor-pointer">
                          <FaUserAlt />
                          <span className="ml-2">รายงานรายเดือน</span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li
                className={`flex items-center  ${
                  isOpen ? "" : "justify-center"
                }`}
              >
                <Link href="/admin/admin-transport">
                  <div className="flex items-center cursor-pointer">
                    <FaTachometerAlt />
                    {isOpen && (
                      <span className="ml-2 transition-opacity duration-300">
                        ออกจากระบบ
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-[-15px] bg-blue-500 text-white w-8 h-8 text-center rounded-full focus:outline-none transform hover:scale-110 transition-transform duration-300"
      >
        {isOpen ? "<" : ">"}
      </button>
    </div>
  );
};

export default Sidebar;
