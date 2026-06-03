import React, { useState, useEffect } from "react";
import { getPlans, checkout } from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Subscription() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await getPlans(token);
        setPlans(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, [token]);

  const handleSubscribe = async (planId) => {
    setSubscribing(true);
    try {
      const res = await checkout({ plan_id: planId }, token);
      navigate("/chatbot");
      
    } catch (err) {
      console.error(err.response?.data?.error || "Subscription failed");
    } finally {
      setSubscribing(false);
    }
  };

  // Modern Loading State
  if (loading) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="h-12 w-12 border-4 border-slate-100 border-t-emerald-500 animate-spin mb-4"></div>
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Syncing Plans...</p>
    </div>
  );

  if (plans.length === 0) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <p className="text-[#222841] font-bold text-lg mb-4 tracking-tight">No active licensing tiers found.</p>
      <Link to="/" className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-1">Return to Terminal</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-[#1E293B] font-sans selection:bg-[#222841] selection:text-white relative overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '60px 60px' }}>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 md:pt-16 pb-24 ">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#222841] tracking-tighter mb-4 ">Select Licensing Tier</h1>
          <p className="text-slate-400 text-[10px] uppercase tracking-[0.4em] font-black italic">Institutional IFRS Intelligence Access</p>
        </motion.div>

        {/* Plans Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-px bg-slate-100 border border-slate-100 shadow-2xl">
          {plans.map((plan, index) => (
            <motion.div 
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-10 flex flex-col justify-between hover:bg-slate-50 transition-colors group"
            >
              <div>
                <div className="flex justify-between items-start mb-8">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Plan 0{index + 1}</span>
                  {index === 1 && (
                    <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-1 uppercase tracking-tighter">Recommended</span>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold mb-1 text-[#222841] tracking-tight">{plan.name}</h3>
                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-6 italic">Monthly Subscription</p>
                
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-[#222841] tracking-tighter">{plan.price}</span>
                    <span className="text-slate-400 font-bold uppercase text-xs">{plan.currency}</span>
                  </div>
                  <p className="text-slate-400 text-[10px] mt-1 uppercase font-medium">Billed monthly per seat</p>
                </div>

                <div className="space-y-4 mb-10 border-t border-slate-50 pt-8">
                  <p className="text-sm text-slate-500 leading-relaxed font-light italic">
                    {plan.description}
                  </p>
                  <ul className="space-y-3">
                    {['Audit-ready Citations', 'Full Scenario Analysis', 'Priority Engine Access'].map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-tight text-slate-600">
                        <span className="h-1 w-1 bg-emerald-500"></span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                disabled={subscribing}
                onClick={() => handleSubscribe(plan.id)}
                className={`w-full py-5 font-black text-[10px] uppercase tracking-[0.3em] transition-all border shadow-lg ${
                  index === 1 
                  ? "bg-emerald-500 border-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-200" 
                  : "bg-[#222841] border-[#222841] text-white hover:bg-black"
                } disabled:opacity-50 active:scale-95`}
              >
                {subscribing ? "Authorizing..." : "Initialize Tier"}
              </button>
            </motion.div>
          ))}
        </div>

        
      </div>
    </div>
  );
}