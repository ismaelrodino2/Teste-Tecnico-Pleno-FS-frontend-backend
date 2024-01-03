"use client";
import { AuthContext } from "@/contexts/AuthContext";
// Navbar.js

import Link from "next/link";
import { useContext } from "react";

export function NavBar() {
  const { logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="space-x-4">
          <Link
            href="/"
            className="text-highgGray font-medium hover:text-gray-300"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-highgGray font-medium hover:text-gray-300"
          >
            Dashboard
          </Link>
          <Link
            href="/signin"
            className="text-highgGray font-medium hover:text-gray-300"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="text-highgGray font-medium hover:text-gray-300"
          >
            Sign Up
          </Link>
        </div>
        <button
          onClick={logout}
          className="text-highgGray font-medium hover:text-gray-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
