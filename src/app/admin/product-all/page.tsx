"use client";
import React, { Suspense, ReactNode } from "react";
import Sidebar from "./sidebar/sidebar";
import Navbar from "./nav/nav";
import AddProduct from "../import-products/add-pro/add-pro";

export default function AdminLayoutPage() {
  return (
    <div className="flex">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow">
        <Navbar />
        <Suspense fallback={<>loading</>}>
          {/* แสดงหน้าหลัก */}
          <AddProduct />
        </Suspense>
      </div>
    </div>
  );
}
