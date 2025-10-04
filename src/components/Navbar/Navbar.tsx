"use client";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 px-10 py-3 border-b border-[#e5e8eb]">
      <div className="flex justify-between items-center">
        <div>
          {" "}
          <a href="" className="font-bold text-[18px] leading-6 text-nowrap">
            Tech Haven
          </a>
        </div>

        <div
          className={`absolute w-1/2 top-full flex flex-col md:flex-row md:static md:w-full md:items-center gap-6 font-medium text-[14px] leading-3.5 md:text-[#0D141C] bg-[#0D141C] md:bg-transparent h-svh md:h-auto text-white transition-all p-4 md:p-0 ${
            isOpen ? "left-0" : "-left-1/2"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:mx-auto">
            <a href="">Home</a>
            <a href="">Products</a>
            <a href="">Brands</a>
            <a href="">Categories</a>
            <a href="">About</a>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <a href="" className="">
              Login
            </a>
            <a href="">Register</a>
          </div>
        </div>

        <button
          className="md:hidden cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
