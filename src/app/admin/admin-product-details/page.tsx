"use client";
import React, { Suspense, ReactNode } from "react";
import Sidebar from "../components/sidebar/sidebar";
import Navbar from "../components/nav/nav";
import ProductDetailsPage from "./product-details/[pro_id]";

export default function AdminLayoutPage() {
  return (
    <div className="flex">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow">
        <Navbar />
        <Suspense fallback={<>loading</>}>
          {/* <ProductDetailsPage /> */}
        </Suspense>
      </div>
    </div>
  );
}
