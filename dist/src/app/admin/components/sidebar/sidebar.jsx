"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const link_1 = __importDefault(require("next/link"));
const fa_1 = require("react-icons/fa");
const Sidebar = () => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(true);
    const [isCustomerOpen, setIsCustomerOpen] = (0, react_1.useState)(false);
    const [isReportOpen, setIsReportOpen] = (0, react_1.useState)(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const toggleCustomerDropdown = () => {
        setIsCustomerOpen(!isCustomerOpen);
    };
    const toggleReportDropdown = () => {
        setIsReportOpen(!isReportOpen);
    };
    return (<div className="flex relative">
      <div className={`transition-width duration-300 ${isOpen ? "w-64" : "w-26"} bg-gray-800 text-white h-screen`}>
        <div className="p-4 flex flex-col items-center">
          <img src="../images/cat.jpg" alt="Sidebar Image" className={`transition-all duration-300 rounded-full ${isOpen ? "w-32 h-32" : "w-16 h-16"}`}/>
          {isOpen && (<h2 className="mt-2 text-center">Arthittaya Thammasiri</h2>)}

          <nav className="mt-8 w-full">
            <ul className={`space-y-2 ${isOpen ? "pl-4" : "flex flex-col items-center space-y-4"}`}>
              <li className={`flex items-center ${isOpen ? "" : "justify-center"}`}>
                <link_1.default href="/admin/admin-dash">
                  <div className="flex items-center cursor-pointer">
                    <fa_1.FaTachometerAlt />
                    {isOpen && (<span className="ml-2 transition-opacity duration-300">
                        Dashboard
                      </span>)}
                  </div>
                </link_1.default>
              </li>
              <li>
                <div className={`flex items-center cursor-pointer ${isOpen ? "" : "justify-center"}`} onClick={toggleCustomerDropdown}>
                  <fa_1.FaCog />
                  {isOpen && (<span className="ml-2 flex items-center transition-opacity duration-300">
                      ข้อมูลสินค้า
                      <fa_1.FaChevronDown className={`ml-1 transition-transform duration-300 ${isCustomerOpen ? "rotate-180" : ""}`}/>
                    </span>)}
                </div>
                {isCustomerOpen && isOpen && (<ul className="pl-8 mt-4 space-y-2">
                    <li className="flex items-center">
                      <link_1.default href="/admin/admin-products">
                        <div className="flex items-center cursor-pointer">
                          <fa_1.FaUserAlt />
                          <span className="ml-2">ข้อมูลสินค้า</span>
                        </div>
                      </link_1.default>
                    </li>
                    <li className="flex items-center">
                      <link_1.default href="/admin/admin-types">
                        <div className="flex items-center cursor-pointer">
                          <fa_1.FaUserAlt />
                          <span className="ml-2">ข้อมูลประเภท</span>
                        </div>
                      </link_1.default>
                    </li>
                    <li className="flex items-center">
                      <link_1.default href="/admin/admin-bands">
                        <div className="flex items-center cursor-pointer">
                          <fa_1.FaUserAlt />
                          <span className="ml-2">ข้อมูลแบนด์</span>
                        </div>
                      </link_1.default>
                    </li>
                    <li className="flex items-center">
                      <link_1.default href="/admin/admin-colors">
                        <div className="flex items-center cursor-pointer">
                          <fa_1.FaUserAlt />
                          <span className="ml-2">ข้อมูลสี</span>
                        </div>
                      </link_1.default>
                    </li>
                    <li className="flex items-center">
                      <link_1.default href="/admin/admin-sizes">
                        <div className="flex items-center cursor-pointer">
                          <fa_1.FaUserAlt />
                          <span className="ml-2">ข้อมูลขนาด</span>
                        </div>
                      </link_1.default>
                    </li>
                    <li className="flex items-center">
                      <link_1.default href="/admin/admin-genders">
                        <div className="flex items-center cursor-pointer">
                          <fa_1.FaUserAlt />
                          <span className="ml-2">ข้อมูลเพศ</span>
                        </div>
                      </link_1.default>
                    </li>
                  </ul>)}
              </li>
              <li className={`flex items-center ${isOpen ? "" : "justify-center"}`}>
                <link_1.default href="/admin/admin-transport">
                  <div className="flex items-center cursor-pointer">
                    <fa_1.FaTachometerAlt />
                    {isOpen && (<span className="ml-2 transition-opacity duration-300">
                        ข้อมูลขนส่ง
                      </span>)}
                  </div>
                </link_1.default>
              </li>

              <li className={`flex items-center ${isOpen ? "" : "justify-center"}`}>
                <link_1.default href="/admin/admin-customer">
                  <div className="flex items-center cursor-pointer">
                    <fa_1.FaTachometerAlt />
                    {isOpen && (<span className="ml-2 transition-opacity duration-300">
                        ข้อมูลลูกค้า
                      </span>)}
                  </div>
                </link_1.default>
              </li>
              <li className={`flex items-center ${isOpen ? "" : "justify-center"}`}>
                <link_1.default href="/employee-info">
                  <div className="flex items-center cursor-pointer">
                    <fa_1.FaTachometerAlt />
                    {isOpen && (<span className="ml-2 transition-opacity duration-300">
                        ข้อมูลพนักงาน
                      </span>)}
                  </div>
                </link_1.default>
              </li>
              <li>
                <div className={`flex items-center cursor-pointer ${isOpen ? "" : "justify-center"}`} onClick={toggleReportDropdown}>
                  <fa_1.FaCog />
                  {isOpen && (<span className="ml-2 flex items-center transition-opacity duration-300">
                      รายงานการขาย
                      <fa_1.FaChevronDown className={`ml-1 transition-transform duration-300 ${isReportOpen ? "rotate-180" : ""}`}/>
                    </span>)}
                </div>
                {isReportOpen && isOpen && (<ul className="pl-8 mt-2 space-y-2">
                    <li className="flex items-center">
                      <link_1.default href="/daily-report">
                        <div className="flex items-center cursor-pointer">
                          <fa_1.FaUserAlt />
                          <span className="ml-2">รายงานรายวัน</span>
                        </div>
                      </link_1.default>
                    </li>
                    <li className="flex items-center">
                      <link_1.default href="/monthly-report">
                        <div className="flex items-center cursor-pointer">
                          <fa_1.FaUserAlt />
                          <span className="ml-2">รายงานรายเดือน</span>
                        </div>
                      </link_1.default>
                    </li>
                  </ul>)}
              </li>
              <li className={`flex items-center  ${isOpen ? "" : "justify-center"}`}>
                <link_1.default href="/admin/admin-transport">
                  <div className="flex items-center cursor-pointer">
                    <fa_1.FaTachometerAlt />
                    {isOpen && (<span className="ml-2 transition-opacity duration-300">
                        ออกจากระบบ
                      </span>)}
                  </div>
                </link_1.default>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <button onClick={toggleSidebar} className="absolute top-4 right-[-15px] bg-blue-500 text-white w-8 h-8 text-center rounded-full focus:outline-none transform hover:scale-110 transition-transform duration-300">
        {isOpen ? "<" : ">"}
      </button>
    </div>);
};
exports.default = Sidebar;
