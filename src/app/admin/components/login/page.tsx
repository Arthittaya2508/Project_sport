// pages/admin-login.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SignUpModal from "../register/page";

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        router.push("/admin/admin-dash");
      } else {
        setError(result.message || "Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An error occurred while logging in.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Image */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <Image
          src="/images/bghome.jpg" // Path should start from the root
          alt="Admin Login"
          width={600}
          height={800}
          className="object-cover"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 bg-white flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="w-full max-w-md">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            Sign Up
          </button>
        </p>
      </div>

      {isModalOpen && <SignUpModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default AdminLogin;
