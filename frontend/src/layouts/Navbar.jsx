import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    // { name: "Home", path: "/" },
    // { name: "Admin", path: "/admin" },
    // { name: "Profile", path: "/profile" },
    { name: "Admin Login", path: "/admin-login" },
    { name: "User Login", path: "/login" },
  ];

  return (
    <nav className="w-full bg-neutral-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-15 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold tracking-wide text-cyan-400">
          Analytics
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition duration-300 hover:text-cyan-400 ${
                location.pathname === link.path
                  ? "text-cyan-400 font-semibold"
                  : "text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-zinc-900 px-6 pb-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`transition duration-300 hover:text-cyan-400 ${
                location.pathname === link.path
                  ? "text-cyan-400 font-semibold"
                  : "text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
