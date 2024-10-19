"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = __importDefault(require("next/link"));
const fa_1 = require("react-icons/fa");
const ProductCard = ({ product, productDetails, }) => {
    // Debugging output
    console.log("Product ID:", product.pro_id);
    console.log("Product Details:", productDetails);
    const handleLike = () => {
        // Handle like functionality
    };
    const handleAddToCart = () => {
        // Handle add to cart functionality
    };
    return (<div className="bg-white p-4 border rounded-lg shadow-md w-[300px] mx-auto">
      <img src={`/uploads/${productDetails.pro_image}`} alt={product.pro_name} className="w-full h-48 object-cover rounded-md mb-4"/>
      <h3 className="text-lg font-semibold mb-2">{product.pro_name}</h3>
      <p className="text-gray-500 mb-2">฿{productDetails.sale_price}</p>
      <p className="text-gray-700 mb-4">{product.pro_des}</p>
      <div className="flex space-x-4">
        <button onClick={handleLike} className="bg-red-500 text-white px-4 py-2 rounded flex items-center justify-center">
          <fa_1.FaHeart />
        </button>
        <link_1.default href={`/product-detail/${product.pro_id}`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center">
            รายละเอียดสินค้า
          </button>
        </link_1.default>
      </div>
    </div>);
};
exports.default = ProductCard;
