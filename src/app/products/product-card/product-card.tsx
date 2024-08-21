"use client";
import { FC } from "react";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

interface Product {
  pro_id: number;
  pro_name: string;
  sale_price: number;
  pro_des: string;
  pro_image: string;
}

const ProductCard: FC<{ product: Product }> = ({ product }) => {
  // Debugging output
  console.log("Product ID:", product.pro_id);

  const handleLike = () => {
    // Handle like functionality
  };

  const handleAddToCart = () => {
    // Handle add to cart functionality
  };

  return (
    <div className="bg-white p-4 border rounded-lg shadow-md w-[300px] mx-auto">
      <img
        src={`/uploads/${product.pro_image}`}
        alt={product.pro_name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{product.pro_name}</h3>
      <p className="text-gray-500 mb-2">฿{product.sale_price}</p>
      <p className="text-gray-700 mb-4">{product.pro_des}</p>
      <div className="flex space-x-4">
        <button
          onClick={handleLike}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          <FaHeart />
        </button>
        <Link href={"/product-detail"}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center">
            รายละเอียดสินค้า
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
