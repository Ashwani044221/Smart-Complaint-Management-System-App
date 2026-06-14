import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-[#0d1936] shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="text-xl font-bold text-white tracking-wide">
           🔔SMART COMPLAINT MANAGMENT APP
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="/Home" className="text-gray-300 hover:text-white transition duration-300">
              Home
            </a>
            <a href="/Mycomplaints" className="text-gray-300 hover:text-white transition duration-300">
              Mycomplaint
            </a>
            <a href="/Dashboard" className="text-gray-300 hover:text-white transition duration-300">
               Dashboard
            </a>
            {/* <a href="#" className="text-gray-300 hover:text-white transition duration-300">
              Contact
            </a> */}

            <a href="/Login"  className="bg-blue-600 hover:bg-blue-700 text-white  px-5 py-2 rounded-xl transition duration-300 shadow-md">
              Login
            </a>
          </div>

          {/* Mobile Icon */}
          <div className="md:hidden text-white">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0f172a] px-6 pb-6 space-y-4">
          <a href="#" className="block text-gray-300 hover:text-white transition">
            Home
          </a>
          <a href="#" className="block text-gray-300 hover:text-white transition">
            About
          </a>
          <a href="#" className="block text-gray-300 hover:text-white transition">
            Services
          </a>
          <a href="#" className="block text-gray-300 hover:text-white transition">
            Contact
          </a>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
} 