"use client";
import React, { Suspense, ReactNode } from "react";
import Sidebar from "./sidebar/sidebar";
import Navbar from "./nav/nav";
import BandForm from "./bands/band";

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
          <div className="bg-slate-50 h-screen">
            <BandForm />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
