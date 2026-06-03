import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const sectionVar = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

export default function Home() {
  return (
    <div className="bg-white font-sans antialiased text-[#1a1a1a] selection:bg-emerald-500 selection:text-white">
      
      {/* --- 1. HERO: WITH BACKGROUND CHECK EFFECT --- */}
      <section className="relative min-h-[90vh] flex items-center px-6 lg:px-20 overflow-hidden">
        
        {/* THE CHECK EFFECT BACKGROUND */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full mb-8">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">Audit-Ready IFRS v2.0</span>
            </div>
            
            <h1 className="text-6xl md:text-[90px] font-extrabold tracking-tight leading-[0.95] mb-8">
              Accounting <br />
              <span className="text-emerald-500">Simplified.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 max-w-md leading-relaxed mb-10 font-light">
              Stop digging through 1,000-page standards. Let Substantia map your financial data to IFRS disclosures in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/register" className="bg-[#1a1a1a] text-white px-10 py-5 rounded-xl font-bold text-sm text-center hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-100">
                Start Free Trial
              </Link>
              <Link to="/chatbot" className="border-2 border-gray-100 px-10 py-5 rounded-xl font-bold text-sm text-center hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                Watch Demo <span>→</span>
              </Link>
            </div>
          </motion.div>

          {/* Minimalist Graphic Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden lg:block bg-white/40 backdrop-blur-sm rounded-[40px] p-12 border border-gray-100 relative shadow-2xl shadow-gray-200/50"
          >
            <div className="space-y-6">
              <div className="h-12 w-48 bg-white rounded-lg shadow-sm border border-gray-100"></div>
              <div className="h-32 w-full bg-emerald-500 rounded-2xl shadow-lg flex items-center justify-center">
                <span className="text-white font-bold tracking-widest uppercase text-xs">IFRS Verified</span>
              </div>
              <div className="h-12 w-64 bg-white rounded-lg shadow-sm border border-gray-100 self-end ml-auto"></div>
            </div>
            <div className="absolute -top-5 -right-5 h-20 w-20 bg-white shadow-2xl rounded-full flex items-center justify-center font-bold text-emerald-500 italic border border-gray-50">99%</div>
          </motion.div>
        </div>
      </section>

      {/* --- 2. VALUE PROPS: WHY US? --- */}
      <section className="py-24 px-6 bg-[#1a1a1a] rounded-[50px] mx-4 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">
          <motion.div {...sectionVar}>
            <div className="text-emerald-400 text-4xl mb-6">✦</div>
            <h3 className="text-xl font-bold mb-4">Instant Citations</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Every AI answer comes with a direct link to the IFRS paragraph. No more guessing.</p>
          </motion.div>
          <motion.div {...sectionVar}>
            <div className="text-emerald-400 text-4xl mb-6">✦</div>
            <h3 className="text-xl font-bold mb-4">Zero Sampling</h3>
            <p className="text-gray-400 text-sm leading-relaxed">We audit 100% of your data, not just a small sample. Total compliance coverage.</p>
          </motion.div>
          <motion.div {...sectionVar}>
            <div className="text-emerald-400 text-4xl mb-6">✦</div>
            <h3 className="text-xl font-bold mb-4">Audit-Proof</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Built for auditors, by auditors. We follow Big Four logic and reasoning paths.</p>
          </motion.div>
        </div>
      </section>

      {/* --- 3. THE "BENTO" FEATURES --- */}
      <section className="py-32 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">How we help you win.</h2>
            <p className="text-gray-500">One platform. Every Standard. Total Clarity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            <div className="md:col-span-4 bg-gray-50 p-10 rounded-[32px] hover:bg-emerald-50 transition-colors border border-gray-100">
              <h4 className="text-2xl font-bold mb-4">The Smart Ledger</h4>
              <p className="text-gray-600 max-w-sm mb-10">Upload your trial balance and let our AI categorize every line item into IFRS compliant groups.</p>
              <div className="h-2 w-full bg-white rounded-full overflow-hidden">
                <motion.div initial={{width:0}} whileInView={{width:'85%'}} className="h-full bg-emerald-500"></motion.div>
              </div>
            </div>
            
            <div className="md:col-span-2 bg-[#f4f4f4] p-10 rounded-[32px] flex flex-col justify-between border border-gray-100">
              <h4 className="text-xl font-bold">Deep Mode</h4>
              <p className="text-gray-500 text-sm">For complex tax and consolidation logic.</p>
              <div className="mt-8 font-mono text-[10px] text-gray-400 uppercase tracking-widest">Processing...</div>
            </div>

            <div className="md:col-span-3 bg-white p-10 rounded-[32px] border-2 border-gray-100 hover:border-emerald-500 transition-all">
              <h4 className="text-xl font-bold mb-2">Scenario Analysis</h4>
              <p className="text-gray-500 text-sm">What happens if interest rates change? We model the IFRS impact instantly.</p>
            </div>

            <div className="md:col-span-3 bg-white p-10 rounded-[32px] border-2 border-gray-100 hover:border-emerald-500 transition-all">
              <h4 className="text-xl font-bold mb-2">Institutional Security</h4>
              <p className="text-gray-500 text-sm">Bank-level encryption. Your data is private, period.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. PRICING --- */}
      <section className="py-24 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16">Simple Pricing.</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-12 rounded-[32px] border border-gray-200 shadow-sm text-left">
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">Self-Service</p>
              <div className="text-5xl font-bold mb-4">15 <span className="text-sm font-normal text-gray-400">Tokens/mo</span></div>
              <ul className="space-y-4 mb-10 text-sm text-gray-500">
                <li>✓ Basic IFRS Chat</li>
                <li>✓ Paragraph Citations</li>
                <li>✓ Standard PDF Export</li>
              </ul>
              <Link to="/register" className="block w-full py-4 bg-[#1a1a1a] text-white text-center rounded-xl font-bold hover:scale-[1.02] transition-transform">Get Started</Link>
            </div>

            <div className="bg-[#1a1a1a] p-12 rounded-[32px] text-white text-left">
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4">Enterprise</p>
              <div className="text-5xl font-bold mb-4">Custom</div>
              <ul className="space-y-4 mb-10 text-sm text-gray-400">
                <li>✓ Unlimited Deep Mode</li>
                <li>✓ API Integration</li>
                <li>✓ Dedicated Manager</li>
              </ul>
              <Link to="/subscription" className="block w-full py-4 bg-emerald-500 text-white text-center rounded-xl font-bold hover:scale-[1.02] transition-transform">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
