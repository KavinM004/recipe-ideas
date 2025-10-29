import React from "react";
import { GiCook } from "react-icons/gi";
import Logo from "../assets/react.svg";

export default function Header() {
  return (
    <header
      className="bg-linear-to-r from-[#07193B] to-[#6648E1] text-white shadow-md sticky top-0 z-10 w-full"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 gap-3 sm:gap-0">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <img
            src={Logo}
            alt="Recipe Ideas Logo"
            className="w-10 h-10 rounded-md shadow-md animate-pulse"
          />
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-center sm:text-left">
            Recipe Ideas
          </h1>
        </div>
      </div>
    </header>
  );
}
