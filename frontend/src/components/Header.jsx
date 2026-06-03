import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import logo from "../assets/logo.png";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const brandNavy = "#222841";

  const linkStyle = (path) => 
    `relative text-[15px] font-medium transition-all duration-200 py-1 ${
      location.pathname === path 
        ? "text-black border-b-2 border-[#22c55e]" 
        : "text-slate-500 hover:text-black hover:border-b-2 hover:border-slate-200"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* 1. Left: Logo */}
        <div className="shrink-0">
          <Link to="/">
            <img 
              src={logo} 
              alt="Substantia Logo" 
              className="h-9 w-auto object-contain hover:opacity-80 transition-opacity" 
            />
          </Link>
        </div>

        {/* 2. Right: Navigation & Auth Actions (Combined) */}
        <div className="flex items-center gap-8">
          <Link to="/" className={linkStyle("/")}>Home</Link>
          <Link to="/about" className={linkStyle("/about")}>About Us</Link>

          {/* Moved App Specific Links here */}
          {user && (
            <>
              <Link to="/chatbot" className={linkStyle("/chatbot")}>Chatbot</Link>
              <Link to="/subscription" className={linkStyle("/subscription")}>Subscription</Link>
            </>
          )}

          {!user ? (
            <div className="flex items-center gap-4">
              <Link 
                to="/login" 
                className="px-6 py-2 text-[14px] font-semibold text-slate-700 border border-slate-200 rounded-sm hover:border-black hover:text-black transition-all"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                style={{ backgroundColor: brandNavy }}
                className="px-6 py-2 text-[14px] font-semibold text-white rounded-sm hover:brightness-125 transition-all shadow-md"
              >
                Signup
              </Link>
            </div>
          ) : (
            <button
              onClick={logout}
              className="px-6 py-2 text-[14px] font-semibold bg-[#222841] text-white rounded-sm hover:bg-red-700 transition-all shadow-md"
            >
              Logout
            </button>
          )}
        </div>

      </div>
    </header>
  );
}