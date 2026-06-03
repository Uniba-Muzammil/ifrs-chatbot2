import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { registerUser } from "../api/api.js";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    country: "PKR",
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await registerUser(form);
      setMessage({ type: "success", text: res.data.message || "Registration successful!" });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Registration failed",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden font-sans selection:bg-[#222841] selection:text-white p-6">
      
      {/* Subtle Audit Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      {/* Increased width from max-w-md to max-w-2xl */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="mb-10 text-center lg:text-left lg:pl-2">
          <Link to="/" className="text-[#222841] font-black tracking-tighter text-3xl italic">Substantia.</Link>
          <div className="h-1 w-12 bg-[#222841] mt-2 hidden lg:block"></div>
        </div>

        <div className="bg-white border border-slate-200 shadow-[40px_40px_80px_-15px_rgba(0,0,0,0.08)] p-8 md:p-16">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#222841] tracking-tight">Create Institutional Account</h2>
            <p className="text-slate-400 text-sm mt-2 font-light">Set up your workspace for automated IFRS compliance.</p>
          </div>

          {message && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 mb-8 text-[11px] font-bold uppercase tracking-[0.15em] border-l-4 ${
                message.type === "success" 
                ? "bg-emerald-50 border-emerald-500 text-emerald-800" 
                : "bg-red-50 border-red-500 text-red-800"
              }`}
            >
              {message.text}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            {/* Username */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Username</label>
              <input
                placeholder="j.doe_audit"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
                className="w-full border-b border-slate-200 py-3 bg-transparent focus:border-[#222841] outline-none transition-all text-sm placeholder:text-slate-300"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Email Address</label>
              <input
                placeholder="name@firm.com"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full border-b border-slate-200 py-3 bg-transparent focus:border-[#222841] outline-none transition-all text-sm placeholder:text-slate-300"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Secure Password</label>
              <input
                placeholder="••••••••"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="w-full border-b border-slate-200 py-3 bg-transparent focus:border-[#222841] outline-none transition-all text-sm placeholder:text-slate-300"
              />
            </div>

            {/* Country */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Reporting Currency</label>
              <select
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="w-full border-b border-slate-200 py-3 bg-transparent focus:border-[#222841] outline-none transition-all text-sm appearance-none cursor-pointer"
              >
                <option value="PKR">PKR (Pakistani Rupee)</option>
                <option value="USD">USD (US Dollar)</option>
                <option value="AED">AED (Dirham)</option>
              </select>
            </div>

            {/* Submit Button spans both columns on desktop */}
            <div className="md:col-span-2 mt-6">
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-5 font-bold text-xs uppercase tracking-[0.3em] transition-all shadow-2xl active:scale-[0.99]"
              >
                Initialize Secure Access
              </button>
              
              <div className="mt-8 text-center lg:text-left">
                <p className="text-slate-400 text-[11px] uppercase tracking-widest font-medium">
                  Already have an account?{" "}
                  <Link to="/login" className="text-[#222841] font-black hover:border-b border-[#222841] ml-2 pb-1">
                    Log In →
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
        
        <p className="text-center mt-12 text-[10px] text-slate-300 font-bold tracking-[0.2em] uppercase">
          Certified Information Security Protocol © 2026
        </p>
      </motion.div>
    </div>
  );
}