"use client";
import { useState } from "react";
import { FaBagShopping } from "react-icons/fa6";
import { FaUserAlt, FaCog, FaTachometerAlt } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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
              isOpen ? "w-28 h-28" : "w-12 h-12"
            }`}
          />
          {isOpen && (
            <h2 className="mt-2 text-center">Arthittaya Thammasiri</h2>
          )}
          <nav className="mt-4 w-full">
            <ul className="space-y-2">
              <li className="flex items-center justify-center">
                <FaTachometerAlt />
                {isOpen && (
                  <span className="ml-2 transition-opacity duration-300">
                    Dashboard
                  </span>
                )}
              </li>
              <li className="flex items-center justify-center">
                <FaUserAlt />
                {isOpen && (
                  <span className="ml-2 transition-opacity duration-300">
                    Profile
                  </span>
                )}
              </li>
              <li className="flex items-center justify-center">
                <FaCog />
                {isOpen && (
                  <span className="ml-2 transition-opacity duration-300">
                    Settings
                  </span>
                )}
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
