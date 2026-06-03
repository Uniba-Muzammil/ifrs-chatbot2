import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Checkout() {
  const [selectedPlan, setSelectedPlan] = useState("institutional");

  const plans = [
    { id: "core", name: "Core", price: "49", tokens: "100" },
    { id: "institutional", name: "Institutional", price: "199", tokens: "Unlimited" },
  ];

  return (
    <div className="bg-white min-h-screen font-sans antialiased text-[#1a1a1a] selection:bg-emerald-500">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pt-32 pb-20">
        
        {/* HEADER */}
        <div className="mb-12">
          <Link to="/pricing" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-emerald-500 transition-colors">
            ← Back to Pricing
          </Link>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mt-4">
            Finalize <span className="text-emerald-500 italic font-serif font-light lowercase">your</span> Access.
          </h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: PLAN SELECTION BOX (The Interactive Part) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 space-y-4"
          >
            {plans.map((plan) => (
              <div 
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`cursor-pointer p-8 rounded-[32px] border-2 transition-all flex justify-between items-center ${
                  selectedPlan === plan.id 
                  ? "border-emerald-500 bg-emerald-50/30 shadow-lg shadow-emerald-500/5" 
                  : "border-gray-100 bg-white hover:border-gray-200"
                }`}
              >
                <div className="flex items-center gap-6">
                  <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                    selectedPlan === plan.id ? "border-emerald-500" : "border-gray-200"
                  }`}>
                    {selectedPlan === plan.id && <div className="h-3 w-3 bg-emerald-500 rounded-full" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">{plan.name} Protocol</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{plan.tokens} Reasoning Tokens</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black italic tracking-tighter">${plan.price}</span>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Per Month</p>
                </div>
              </div>
            ))}

            {/* UPCOMING FEATURE BLOCK */}
            <div className="p-8 rounded-[32px] bg-gray-50 border border-dashed border-gray-200 mt-12">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Notice</p>
               <p className="text-sm text-gray-500 leading-relaxed">
                 Direct credit card processing is currently in <span className="text-[#1a1a1a] font-bold">Beta</span>. 
                 By clicking below, you will be added to the prioritized onboarding queue for the 2026 Audit Cycle.
               </p>
            </div>
          </motion.div>

          {/* RIGHT: ORDER SUMMARY (The "Bento" Sidebar) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-[#1a1a1a] text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400 mb-10">Terminal_Summary</h3>
              
              <div className="space-y-6 mb-12">
                <div className="flex justify-between border-b border-white/10 pb-4">
                  <span className="text-gray-400 text-sm">Selected Protocol</span>
                  <span className="font-bold text-emerald-500 uppercase text-sm tracking-widest">
                    {selectedPlan === 'core' ? 'Core v1' : 'Institutional v2'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-4">
                  <span className="text-gray-400 text-sm">IFRS Library Access</span>
                  <span className="font-bold text-sm">Full Global Set</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-4">
                  <span className="text-gray-400 text-sm">Priority Support</span>
                  <span className="font-bold text-sm text-emerald-500 italic">Included</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-10">
                <span className="text-sm text-gray-400 uppercase tracking-widest font-bold">Total Due Now</span>
                <span className="text-5xl font-black tracking-tighter text-white">
                  ${plans.find(p => p.id === selectedPlan).price}
                </span>
              </div>

              <button className="w-full py-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black uppercase text-xs tracking-[0.4em] transition-all shadow-xl shadow-emerald-500/20">
                Confirm & Request Access
              </button>

              <p className="text-[9px] text-center text-gray-500 mt-6 uppercase tracking-widest font-bold">
                No charge will be processed today.
              </p>

              {/* Decorative Glow */}
              <div className="absolute -bottom-20 -left-20 h-64 w-64 bg-emerald-500/5 rounded-full blur-[80px]"></div>
            </div>

            {/* TRUST BAR BELOW SUMMARY */}
            <div className="mt-8 flex justify-center gap-6 opacity-30 grayscale">
               <div className="h-6 w-16 bg-gray-400 rounded"></div>
               <div className="h-6 w-16 bg-gray-400 rounded"></div>
               <div className="h-6 w-16 bg-gray-400 rounded"></div>
            </div>
          </motion.div>

        </div>
      </div>

    </div>
  );
}