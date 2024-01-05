"use client";
// Navbar.js

import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Logo from "./logo";

export function NavBar() {
  const { logout } = useContext(AuthContext);

  return (
    <nav className="bg-paleBlue p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="space-x-6 flex items-center">
        <Logo className="py-4 pr-4" />

          <Link
            className="font-medium text-primaryBlue text-lg hover:text-gray"
            href="/"
          >
            Home
          </Link>
          <Link
            className="font-medium text-primaryBlue text-lg hover:text-gray"
            href="/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className="font-medium text-primaryBlue text-lg hover:text-gray"
            href="/signin"
          >
            Sign In
          </Link>
          <Link
            className="font-medium text-primaryBlue text-lg hover:text-gray"
            href="/signup"
          >
            Sign Up
          </Link>
        </div>
        <button
          onClick={logout}
          className="font-medium text-white bg-primaryBlue py-2 px-8 rounded-[30px] text-lg hover:text-gray"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
