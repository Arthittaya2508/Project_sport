"use client";
import Navbar from "../components/navbar/page";
import ProductDetail from "./product-detail/product-detail";

const ProductPage = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-10">
        {" "}
        <ProductDetail />
      </div>
    </div>
  );
};

export default ProductPage;
