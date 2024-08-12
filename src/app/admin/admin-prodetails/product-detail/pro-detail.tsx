"use client";
import { useEffect, useState } from "react";

interface ProductDetail {
  detail_id: number;
  pro_id: number;
  color_name: string;
  size_name: string;
  gender_name: string;
  quantity: number;
}

export default function Products() {
  const [products, setProducts] = useState<ProductDetail[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/pro-details");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Detail ID</th>
            <th className="py-2 px-4 border-b">Product ID</th>
            <th className="py-2 px-4 border-b">Color</th>
            <th className="py-2 px-4 border-b">Size</th>
            <th className="py-2 px-4 border-b">Gender</th>
            <th className="py-2 px-4 border-b">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.detail_id}>
              <td className="py-2 px-4 border-b">{product.detail_id}</td>
              <td className="py-2 px-4 border-b">{product.pro_id}</td>
              <td className="py-2 px-4 border-b">{product.color_name}</td>
              <td className="py-2 px-4 border-b">{product.size_name}</td>
              <td className="py-2 px-4 border-b">{product.gender_name}</td>
              <td className="py-2 px-4 border-b">{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
