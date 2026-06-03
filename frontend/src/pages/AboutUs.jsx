import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AboutUs() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="bg-white font-sans antialiased text-[#1a1a1a] selection:bg-emerald-500 selection:text-white">
      
      {/* --- 1. HERO: THE "WHY" --- */}
      <section className="relative pt-16 pb-20 px-6 lg:px-16 overflow-hidden border-b border-gray-50">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8">
              Est. 2026 • The Future of Audit
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-10">
              We Solve the <br />
              <span className="text-emerald-500 italic font-serif font-light lowercase">Trust Gap</span> in AI.
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              In a world where AI frequently "hallucinates," Substantia was built to provide the 
              mathematical certainty required by global financial institutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- 2. THE MISSION BENTO: OUR PILLARS --- */}
      <section className="py-24 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-6">
            
            {/* Main Mission Card */}
            <motion.div {...fadeIn} className="lg:col-span-7 bg-[#1a1a1a] text-white p-12 rounded-[40px] relative overflow-hidden group">
              <h2 className="text-3xl font-bold mb-6 relative z-10">Our DNA: Technical Skepticism.</h2>
              <p className="text-gray-400 leading-relaxed mb-8 relative z-10">
                Most AI is optimized for conversation. Substantia is optimized for <span className="text-white font-bold">verification</span>. 
                We combine Large Language Models with a proprietary IFRS Retrieval Engine that treats every standard as a hard constraint, not a suggestion.
              </p>
              <div className="flex gap-4 relative z-10">
                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-emerald-400">RAG-Verified</div>
                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-emerald-400">SOC2 Compliant</div>
              </div>
              <div className="absolute -right-10 -bottom-10 h-64 w-64 bg-emerald-500/10 rounded-full blur-[80px]"></div>
            </motion.div>

            {/* Statistic Card */}
            <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="lg:col-span-5 bg-emerald-50 p-12 rounded-[40px] flex flex-col justify-center border border-emerald-100">
               <span className="text-emerald-600 font-serif italic text-4xl mb-4">99.9%</span>
               <h3 className="text-xl font-bold text-emerald-900 mb-2">Accuracy is our baseline.</h3>
               <p className="text-sm text-emerald-700/70">Our core engine undergoes daily regression testing against 1,200+ edge cases in IFRS 9, 16, and 17.</p>
            </motion.div>

            {/* Philosophy Card */}
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="lg:col-span-4 bg-gray-50 p-10 rounded-[40px] border border-gray-100">
              <h4 className="text-lg font-bold mb-4">Logic Over Language</h4>
              <p className="text-sm text-gray-500 leading-relaxed">We don't prioritize sounding "human." We prioritize being correct. Every answer is a logical proof.</p>
            </motion.div>

            {/* Team Card (The Minds) */}
            <motion.div {...fadeIn} transition={{ delay: 0.3 }} className="lg:col-span-8 bg-white border-2 border-gray-100 p-10 rounded-[40px] flex flex-col md:flex-row gap-8 items-center">
               <div className="h-20 w-20 bg-emerald-500 rounded-full shrink-0 flex items-center justify-center font-black text-white italic text-3xl shadow-xl">S</div>
               <div>
                  <h4 className="text-lg font-bold mb-2">Built by Auditors, for Auditors.</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Our founding team consists of former Big Four technical partners and AI researchers from the world's leading labs.</p>
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- 3. CORE VALUES: HOW WE OPERATE --- */}
      <section className="py-24 px-6 bg-[#fcfcfc] border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16">
            <div>
              <span className="text-[10px] font-black text-emerald-500 tracking-widest uppercase block mb-4">01 / Foundation</span>
              <h3 className="text-xl font-bold mb-4">Radical Transparency</h3>
              <p className="text-sm text-gray-500 leading-relaxed">No "black boxes." Every citation link takes you directly to the IFRS paragraph that generated the insight.</p>
            </div>
            <div>
              <span className="text-[10px] font-black text-emerald-500 tracking-widest uppercase block mb-4">02 / Architecture</span>
              <p className="text-sm text-gray-500 leading-relaxed font-bold mb-4 italic">Institutional Privacy</p>
              <p className="text-sm text-gray-500 leading-relaxed">Your data is never used to train global models. We utilize localized instances for every enterprise client.</p>
            </div>
            <div>
              <span className="text-[10px] font-black text-emerald-500 tracking-widest uppercase block mb-4">03 / Goal</span>
              <h3 className="text-xl font-bold mb-4">The New Standard</h3>
              <p className="text-sm text-gray-500 leading-relaxed">We aim to become the default verification layer for every financial audit conducted globally by 2030.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. THE CALL TO ACTION: BOLD & SIMPLE --- */}
      <section className="py-40 px-6 text-center">
        <motion.div {...fadeIn} className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-black tracking-tighter mb-8 italic">Ready to see the difference?</h2>
          <p className="text-gray-500 mb-12">Join the waitlist for our v2.0 Audit Terminal or schedule a technical deep-dive.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/register" className="bg-[#1a1a1a] text-white px-10 py-5 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-xl">
              Access Terminal
            </Link>
            <Link to="/contact" className="border-2 border-gray-100 px-10 py-5 rounded-2xl font-bold hover:bg-gray-50 transition-all">
              Speak to a Specialist
            </Link>
          </div>
        </motion.div>
      </section>

     
    </div>
  );
}