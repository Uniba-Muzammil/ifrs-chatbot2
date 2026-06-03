import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import AuthContext from "../context/AuthContext.jsx";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.username, form.password);
      navigate("/chat"); 
    } catch (err) {
      setMessage({ type: "error", text: "Invalid Audit Credentials." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden font-sans p-6">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl relative z-10">
        
        <div className="bg-white border border-slate-200 shadow-[40px_40px_80px_-15px_rgba(0,0,0,0.08)] p-8 md:p-16">
          <h2 className="text-3xl font-bold text-[#222841] tracking-tight mb-2">Portal Login</h2>
          <p className="text-slate-400 text-[10px] uppercase tracking-[0.3em] font-bold mb-12">Authorized Personnel Only</p>

          {message && (
            <div className="p-4 mb-8 text-[11px] font-bold uppercase tracking-widest border-l-4 bg-red-50 border-red-500 text-red-700">
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Username</label>
                <input
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  required
                  className="w-full border-b border-slate-200 py-3 bg-transparent focus:border-emerald-500 outline-none transition-all text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  className="w-full border-b border-slate-200 py-3 bg-transparent focus:border-emerald-500 outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-5 font-bold text-xs uppercase tracking-[0.3em] transition-all shadow-xl active:scale-[0.99]">
                Verify Credentials
              </button>
              <div className="mt-10 flex justify-between items-center">
                <Link to="/register" className="text-[#222841] text-[10px] font-black uppercase tracking-widest border-b border-[#222841] pb-1">Register Firm →</Link>
                <span className="text-slate-300 text-[10px] uppercase tracking-widest">Forgot Password?</span>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}