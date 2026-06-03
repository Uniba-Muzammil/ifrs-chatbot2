import React, { useState, useRef, useEffect } from "react";
import { askChat, getChatHistory } from "../api/api";
import ModeSwitcher from "../components/ModeSwitcher";
import ChatInput from "../components/ChatInput";
import { useNavigate } from "react-router-dom";

// --- Inline SVG Icon Components (No dependencies needed) ---
const IconMenu = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const IconX = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const IconHistory = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline><path d="M3.3 7a9 9 0 1 1 0 10"></path></svg>;
const IconShield = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
const IconCrown = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path></svg>;

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]); 
  const [activeChat, setActiveChat] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [mode, setMode] = useState("basic");
  const [standard, setStandard] = useState("IFRS16");

  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ✅ FETCH HISTORY (Logic Unchanged)
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getChatHistory();
        const cleaned = res.data.map((item) => {
          let auditorFocusObj = null;
          if (item.auditor_focus) {
            try {
              auditorFocusObj = JSON.parse(item.auditor_focus.replace(/'/g, '"'));
            } catch (err) {
              console.error("Failed to parse auditor_focus", err);
              auditorFocusObj = null;
            }
          }
          return {
            ...item,
            question: typeof item.question === "object" ? item.question.text : item.question,
            answer: typeof item.answer === "object" ? item.answer.text : item.answer,
            auditor_focus: auditorFocusObj,
          };
        });
        setHistory(cleaned);
      } catch (err) {
        console.error("History error", err);
      }
    };
    fetchHistory();
  }, []);

  const sendMessage = async (question) => {
    if (!question) return;
    setActiveChat(null);
    try {
      const res = await askChat({ standard, question, mode }, token);
      let msgObj = { mode, question };
      if (res.data.mode === "restricted" || res.data.error || res.data.message) {
        msgObj.message = res.data.message || res.data.error;
        if (mode === "basic") msgObj.remaining_basic = res.data.remaining_basic;
        if (mode === "deep") msgObj.remaining_deep = res.data.remaining_deep;
      } else {
        if (mode === "basic") {
          msgObj.answer = res.data.answer;
          msgObj.reference = res.data.reference;
          msgObj.auditor_focus = res.data.auditor_focus || null;
          msgObj.remaining_basic = res.data.remaining_basic;
          msgObj.disclaimer = res.data.disclaimer;
        } else if (mode === "deep") {
          msgObj.answer = res.data.deep_analysis || res.data.answer;
          msgObj.remaining_deep = res.data.remaining_deep;
          msgObj.disclaimer = res.data.disclaimer;
        }
      }
      setMessages((prev) => [...prev, msgObj]);
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Chat failed";
      const msgObj = {
        mode,
        question,
        message: errorMsg,
        remaining_basic: mode === "basic" ? 0 : null,
        remaining_deep: mode === "deep" ? 0 : null,
      };
      setMessages((prev) => [...prev, msgObj]);
    }
  };

  return (
    <div className="flex h-screen bg-gray-800 font-sans text-gray-100">
      {/* ✅ COLLAPSIBLE SIDEBAR */}
      <aside 
        className={`${
          isSidebarOpen ? "w-80" : "w-0"
        } transition-all duration-300 ease-in-out bg-gray-800 border-r border-emerald-900/30 overflow-hidden flex flex-col`}
      >
        <div className="p-5 border-b border-emerald-900/20 flex justify-between items-center bg-[#0d0d0d]">
          <span className="font-bold tracking-tight flex items-center gap-2 text-emerald-500">
            <IconHistory /> Chat History
          </span>
          <button onClick={() => setIsSidebarOpen(false)} className="hover:text-emerald-400 text-gray-500 transition-colors">
            <IconX />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.map((msg, i) => (
            <div
              key={i}
              onClick={() => setActiveChat(msg)}
              className="p-3 text-sm rounded-xl border border-gray-800 bg-gray-800 hover:border-emerald-600/50 hover:bg-emerald-900/10 cursor-pointer transition-all group"
            >
              <p className="line-clamp-2 text-gray-400 group-hover:text-emerald-300 font-medium">
                {msg.question}
              </p>
            </div>
          ))}
        </div>
      </aside>

      {/* ✅ MAIN CONTENT */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-br from-gray-800 to-[#0f1715]">
        
        {/* TOP NAVBAR */}
        <header className="flex items-center justify-between px-6 py-4 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-emerald-900/30 shadow-2xl z-10">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-emerald-900/20 rounded-lg text-emerald-500 transition-colors"
              >
                <IconMenu />
              </button>
            )}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                <IconCrown />
              </div>
              <h1 className="text-xl font-black tracking-tighter text-white uppercase">
                IFRS<span className="text-emerald-500">CHAT</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ModeSwitcher mode={mode} setMode={setMode} />
            <select
              onChange={(e) => setStandard(e.target.value)}
              className="bg-[#161616] border border-emerald-900/50 text-emerald-50 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 font-medium outline-none transition-all"
              value={standard}
            >
              <option value="IFRS16">IFRS 16 - Leases</option>
              <option value="IFRS9">IFRS 9 - Financial Instruments</option>
              <option value="IFRS17">IFRS 17 - Insurance</option>
              <option value="IFRS18">IFRS 18 - Presentation</option>
            </select>
          </div>
        </header>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="max-w-4xl mx-auto">
            {activeChat ? (
              /* HISTORY VIEW */
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <div className="bg-[#111111] rounded-2xl shadow-2xl border border-emerald-900/30 overflow-hidden">
                  <div className="p-6 border-b border-emerald-900/10 bg-emerald-900/5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-emerald-500/60 mb-2">Audit Archive</p>
                    <p className="text-lg font-semibold text-white leading-snug">{activeChat.question}</p>
                  </div>
                  <div className="p-6 space-y-6">
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">{activeChat.answer}</p>
                    
                    {activeChat.auditor_focus && (
                      <div className="p-5 rounded-xl bg-emerald-900/10 border border-emerald-500/20 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex gap-3">
                          <div className="text-emerald-500 shrink-0"><IconShield /></div>
                          <div>
                            <p className="text-[10px] font-bold text-emerald-500/50 uppercase">Risk Level</p>
                            <p className="text-sm text-emerald-100">{activeChat.auditor_focus.risk_level}</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="text-emerald-500 shrink-0"><IconShield /></div>
                          <div>
                            <p className="text-[10px] font-bold text-emerald-500/50 uppercase">Judgment Area</p>
                            <p className="text-sm text-emerald-100">{activeChat.auditor_focus.key_judgment_area}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => setActiveChat(null)}
                    className="w-full py-4 bg-emerald-900/20 text-emerald-400 text-xs font-bold hover:bg-emerald-900/40 transition-colors uppercase tracking-widest border-t border-emerald-900/20"
                  >
                    Back to Live Conversation
                  </button>
                </div>
              </div>
            ) : (
              /* LIVE MESSAGES */
              messages.filter((msg) => msg.mode === mode).map((msg, i) => (
                <div key={i} className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
                  {/* User Question */}
                  <div className="flex justify-end">
                    <div className="max-w-[85%] bg-emerald-700 text-white p-4 rounded-2xl rounded-tr-none shadow-lg">
                      <p className="text-sm font-medium">{msg.question}</p>
                    </div>
                  </div>

                  {/* Bot Response */}
                  <div className="flex justify-start">
                    <div className="max-w-[95%] bg-[#161616] border border-emerald-900/30 p-6 rounded-2xl rounded-tl-none shadow-xl">
                      {msg.message ? (
                        <div className="bg-red-950/30 border border-red-900/50 p-4 rounded-lg">
                          <p className="text-red-400 text-sm font-medium">{msg.message}</p>
                          {(msg.remaining_basic === 0 || msg.remaining_deep === 0) && (
                            <button
                              onClick={() => navigate("/subscription")}
                              className="mt-3 w-full bg-emerald-600 text-black py-2 rounded-lg font-black hover:bg-emerald-500 transition-transform active:scale-95 text-xs tracking-widest"
                            >
                              UPGRADE ACCOUNT
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-5">
                          <div className="text-gray-200 leading-relaxed text-sm md:text-base">{msg.answer}</div>
                          
                          {msg.auditor_focus && (
                            <div className="p-4 bg-[#0d0d0d] rounded-xl border border-emerald-900/50 text-sm">
                               <p className="font-bold text-emerald-500 flex items-center gap-2 mb-3 text-[10px] uppercase tracking-wider">
                                 <IconShield /> Auditor Insight
                               </p>
                               <div className="space-y-2 text-gray-300">
                                 <p><b className="text-emerald-500/70">Focus:</b> {msg.auditor_focus.auditor_focus}</p>
                                 <div className="flex items-center gap-2">
                                   <b className="text-emerald-500/70">Risk Status:</b> 
                                   <span className="px-2 py-0.5 bg-emerald-900/40 text-emerald-300 border border-emerald-700/50 rounded text-[10px] font-bold uppercase italic">
                                     {msg.auditor_focus.risk_level}
                                   </span>
                                 </div>
                               </div>
                            </div>
                          )}

                          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-emerald-900/20 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                            <span>{msg.reference ? `Ref: ${msg.reference}` : "Global Standard"}</span>
                            <span className="bg-emerald-900/20 text-emerald-500 px-2 py-1 rounded">
                              {mode === "basic" ? `Credits: ${msg.remaining_basic}` : `Credits: ${msg.remaining_deep}`}
                            </span>
                          </div>
                          {msg.disclaimer && <p className="text-[9px] italic text-gray-600 mt-2 leading-tight uppercase tracking-tighter opacity-70">{msg.disclaimer}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* INPUT SECTION */}
        <div className="p-6 bg-[#0a0a0a] border-t border-emerald-900/30">
          <div className="max-w-4xl mx-auto">
            <ChatInput sendMessage={sendMessage} />
          </div>
        </div>
      </main>
    </div>
  );
}