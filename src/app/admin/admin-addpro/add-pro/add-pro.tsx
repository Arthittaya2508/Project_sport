// pages/products.tsx

import { useState, useEffect } from "react";
import Link from "next/link";

type Product = {
  pro_name: string;
  pro_des: string;
  pro_image: string;
  sale_price: number;
  cost_price: number;
  type_id: number;
  band_id: number;
  color_id: number;
  size_id: number;
  gender_id: number;
  quantity: number;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Product List</h1>
        <Link href="/admin/admin-addproduct">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Product
          </button>
        </Link>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Product Code</th>
            <th className="py-2">Image</th>
            <th className="py-2">Name</th>
            <th className="py-2">Description</th>
            <th className="py-2">Type</th>
            <th className="py-2">Brand</th>
            <th className="py-2">Color</th>
            <th className="py-2">Size</th>
            <th className="py-2">Gender</th>
            <th className="py-2">Sale Price</th>
            <th className="py-2">Cost Price</th>
            <th className="py-2">Quantity</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">
                <img
                  src={product.pro_image}
                  alt={product.pro_name}
                  className="h-16 w-16 object-cover"
                />
              </td>
              <td className="py-2 px-4">{product.pro_name}</td>
              <td className="py-2 px-4">{product.pro_des}</td>
              <td className="py-2 px-4">{product.type_id}</td>
              <td className="py-2 px-4">{product.band_id}</td>
              <td className="py-2 px-4">{product.color_id}</td>
              <td className="py-2 px-4">{product.size_id}</td>
              <td className="py-2 px-4">{product.gender_id}</td>
              <td className="py-2 px-4">{product.sale_price}</td>
              <td className="py-2 px-4">{product.cost_price}</td>
              <td className="py-2 px-4">{product.quantity}</td>
              <td className="py-2 px-4 flex space-x-2">
                <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
