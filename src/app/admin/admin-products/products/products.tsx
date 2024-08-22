"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Color {
  color_id: number;
  color_name: string;
}
interface Type {
  type_id: number;
  type_name: string;
}
interface Band {
  band_id: number;
  band_name: string;
}
interface Gender {
  gender_id: number;
  gender_name: string;
}
interface Size {
  size_id: number;
  size_name: string;
}
type Product = {
  pro_id: number;
  pro_name: string;
  type_id: number;
  band_id: number;
};
type ProductDetails = {
  pro_id: number;
  color_id: number;
  size_id: number;
  gender_id: number;
  stock_quantity: number;
  sku: string;
  pro_image: string;
  sale_price: number;
  cost_price: number;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productDetails, setProductDetails] = useState<ProductDetails[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [bands, setBands] = useState<Band[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, productDetailsRes, typesRes, bandsRes] =
          await Promise.all([
            fetch("/api/products"),
            fetch("/api/product_details"),
            fetch("/api/types"),
            fetch("/api/bands"),
          ]);

        const productsData = await productRes.json();
        const productDetailsData = await productDetailsRes.json();
        const typesData = await typesRes.json();
        const bandsData = await bandsRes.json();

        // Log the fetched data for debugging
        console.log("Products Data:", productsData);
        console.log("Product Details Data:", productDetailsData);
        console.log("Types Data:", typesData);
        console.log("Bands Data:", bandsData);

        // Check and set data, ensuring it's in the expected format
        setProducts(Array.isArray(productsData) ? productsData : []);
        setProductDetails(
          Array.isArray(productDetailsData) ? productDetailsData : []
        );
        setTypes(Array.isArray(typesData) ? typesData : []);
        setBands(Array.isArray(bandsData) ? bandsData : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getTypeName = (type_id: number) =>
    types.find((type) => type.type_id === type_id)?.type_name || "Unknown";
  const getBandName = (band_id: number) =>
    bands.find((band) => band.band_id === band_id)?.band_name || "Unknown";

  const getProductDetailForDisplay = (pro_id: number) =>
    productDetails.find((detail) => detail.pro_id === pro_id);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Product List</h1>
        <Link href="/admin/admin-add" passHref>
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
            <th className="py-2">Brand</th>
            <th className="py-2">Type</th>
            <th className="py-2">Sale Price</th>
            <th className="py-2">Cost Price</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const detail = getProductDetailForDisplay(product.pro_id);
            return (
              <tr key={product.pro_id} className="border-t">
                <td className="py-2 px-4">{detail?.sku || "N/A"}</td>
                <td className="py-2 px-4">
                  <img
                    src={`/images/${detail?.pro_image || "default.jpg"}`}
                    alt={product.pro_name}
                    className="h-16 w-16 object-cover"
                  />
                </td>
                <td className="py-2 px-4">{product.pro_name}</td>
                <td className="py-2 px-4">{getBandName(product.band_id)}</td>
                <td className="py-2 px-4">{getTypeName(product.type_id)}</td>
                <td className="py-2 px-4">{detail?.sale_price}</td>
                <td className="py-2 px-4">{detail?.cost_price}</td>
                <td className="py-2 px-4">
                  <Link href={`/product-details/${product.pro_id}`} passHref>
                    <button className="bg-green-500 text-white px-2 py-1 rounded">
                      View Details
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
