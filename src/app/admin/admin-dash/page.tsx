"use client";
import React, { Suspense, ReactNode } from "react";
import Sidebar from "./sidebar/sidebar";
import Navbar from "./nav/nav";
import Dashboard from "./dashboard/dashboard";

export default function AdminLayoutPage() {
  return (
    <div className="flex">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow">
        <Navbar />
        <Suspense fallback={<>loading</>}>
          {/* แสดงหน้า Dashboard */}
          <Dashboard />
        </Suspense>
      </div>
    </div>
  );
}
