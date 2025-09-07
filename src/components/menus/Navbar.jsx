import React from "react";
import { FaUser, FaShoppingBag, FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="shadow-sm bg-white sticky top-0 z-50">
      {/* Top banner */}
      <div className="bg-green-700 text-white text-center py-1 text-sm">
        🚛 Enjoy Free Shipping on Orders Over ₹999! ✨
      </div>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-3">
        {/* Left: Logo */}
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-red-700">
            EARTHY <span className="text-orange-500">ORIGINS</span>
          </a>
          <span className="text-xs block -mt-1 ml-1 text-gray-500">
            ORGANIC FARM
          </span>
        </div>

        {/* Center: Menu */}
        <ul className="hidden md:flex space-x-6 font-medium text-gray-800">
          <li>
            <a href="/" className="hover:text-green-600">
              HOME
            </a>
          </li>
          <li className="relative group">
            <button className="hover:text-green-600 flex items-center">
              SHOP
              <span className="ml-1">▾</span>
            </button>
            {/* Dropdown */}
            <ul className="absolute hidden group-hover:block bg-white shadow-lg mt-2 rounded">
              <li>
                <a
                  href="/pages/our-meat"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Our Meat
                </a>
              </li>
              <li>
                <a
                  href="/pages/broth"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Broth
                </a>
              </li>
              <li>
                <a
                  href="/pages/farm-produce"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Farm Produce
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="/pages/broth" className="hover:text-green-600">
              BROTH
            </a>
          </li>
          <li>
            <a href="/pages/coffee" className="hover:text-green-600">
              ORGANIC ARABICA COFFEE
            </a>
          </li>
          <li>
            <a href="/pages/farm-produce" className="hover:text-green-600">
              FARM PRODUCE
            </a>
          </li>
          <li>
            <a href="/pages/build-bar" className="hover:text-green-600">
              BUILD YOUR BAR{" "}
              <span className="ml-1 text-xs bg-orange-500 text-white px-1 rounded">
                INDIA'S FIRST
              </span>
            </a>
          </li>
          <li>
            <a href="/pages/our-farm" className="hover:text-green-600">
              OUR FARM
            </a>
          </li>
          <li>
            <a href="/pages/about" className="hover:text-green-600">
              ABOUT
            </a>
          </li>
        </ul>

        {/* Right: Icons */}
        <div className="flex items-center space-x-4 text-gray-700 text-lg">
          <FaSearch className="cursor-pointer hover:text-green-600" />
          <FaUser className="cursor-pointer hover:text-green-600" />
          <div className="relative">
            <FaShoppingBag className="cursor-pointer hover:text-green-600" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              1
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
