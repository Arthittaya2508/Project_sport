"use client";
import React, { Suspense, ReactNode } from "react";
import Sidebar from "./sidebar/sidebar";

interface AdminLayoutPageProps {
  children: ReactNode;
}

export default function AdminLayoutPage({ children }: AdminLayoutPageProps) {
  return (
    <div className="flex">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow">
        <Suspense fallback={<>loading</>}>{children}</Suspense>
      </div>
    </div>
  );
}
