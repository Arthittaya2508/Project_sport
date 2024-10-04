"use client";
import { useState, useEffect } from "react";
import Filters from "../filters/filters";
import ProductCard from "../product-card/product-card";

interface Product {
  pro_id: number;
  pro_name: string;
  pro_des: string;
}

interface ProductDetails {
  pro_id: number;
  pro_image: string;
  sale_price: number;
  // Add other fields as needed
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productDetails, setProductDetails] = useState<
    Record<number, ProductDetails>
  >({});
  const [filters, setFilters] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError("Failed to fetch products");
        console.error(error);
      }
    };

    const fetchProductDetails = async () => {
      try {
        const response = await fetch("/api/product_details");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const detailsById = data.reduce(
          (acc: Record<number, ProductDetails>, detail: ProductDetails) => {
            acc[detail.pro_id] = detail;
            return acc;
          },
          {}
        );
        setProductDetails(detailsById);
      } catch (error) {
        setError("Failed to fetch product details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    fetchProductDetails();
  }, []);

  useEffect(() => {
    // Placeholder: Add code to handle filters if needed
  }, [filters]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-8">
      <Filters onFilterChange={setFilters} />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-9 p-10">
        {products.map((product) => (
          <ProductCard
            key={product.pro_id}
            product={product}
            productDetails={productDetails[product.pro_id] || {}}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
