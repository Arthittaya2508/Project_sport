"use client";

import { FC } from "react";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

interface Product {
  pro_id: number;
  pro_name: string;
  type_id: number;
  band_id: number;
  pro_des: string;
}

interface ProductDetails {
  pro_id: number;
  color_id: number;
  size_id: number;
  gender_id: number;
  stock_quantity: number;
  sku: string;
  pro_image: string;
  sale_price: number;
  cost_price: number;
}

const ProductCard: FC<{ product: Product; productDetails: ProductDetails }> = ({
  product,
  productDetails,
}) => {
  // Debugging output
  console.log("Product ID:", product.pro_id);
  console.log("Product Details:", productDetails);

  const handleLike = () => {
    // Handle like functionality
  };

  const handleAddToCart = () => {
    // Handle add to cart functionality
  };

  return (
    <div className="bg-white p-4 border rounded-lg shadow-md w-[300px] mx-auto">
      <img
        src={`/uploads/${productDetails.pro_image}`}
        alt={product.pro_name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{product.pro_name}</h3>
      <p className="text-gray-500 mb-2">฿{productDetails.sale_price}</p>
      <p className="text-gray-700 mb-4">{product.pro_des}</p>
      <div className="flex space-x-4">
        <button
          onClick={handleLike}
          className="bg-red-500 text-white px-4 py-2 rounded flex items-center justify-center"
        >
          <FaHeart />
        </button>
        <Link href={`/product-detail/${product.pro_id}`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center">
            รายละเอียดสินค้า
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
