import React, { useState } from "react";

export default function ChatInput({ sendMessage }) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    sendMessage(question.trim());
    setQuestion(""); // Clear input after sending
  };

  // --- Inline Send Icon (No dependencies) ---
  const IconSend = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  );

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-center">
      <div className="flex-1 relative group">
        <input
          type="text"
          placeholder="Ask about IFRS compliance, risk, or judgments..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full bg-slate-900/50 border border-slate-700/50 text-slate-100 text-sm rounded-xl px-5 py-3.5 
                     placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 
                     focus:border-emerald-500/50 focus:bg-slate-900 transition-all shadow-inner"
        />
        {/* Subtle decorative glow on focus */}
        <div className="absolute inset-0 rounded-xl pointer-events-none group-focus-within:shadow-[0_0_20px_rgba(16,185,129,0.05)] transition-all"></div>
      </div>

      <button
        type="submit"
        className="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white px-6 py-3.5 rounded-xl 
                   font-bold text-sm flex items-center gap-2 transition-all shadow-[0_4px_20px_rgba(16,185,129,0.2)] 
                   hover:shadow-[0_4px_25px_rgba(16,185,129,0.4)] uppercase tracking-wider"
      >
        <span>Send</span>
        <IconSend />
      </button>
    </form>
  );
}