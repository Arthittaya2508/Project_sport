"use client";
import React, { Suspense, ReactNode } from "react";
import Sidebar from "./sidebar/sidebar";
import Navbar from "./nav/nav";
// import ProductDetailsPage from "./product-details/[id]";

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
