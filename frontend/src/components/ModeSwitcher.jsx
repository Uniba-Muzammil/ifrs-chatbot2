export default function ModeSwitcher({ mode, setMode }) {
  return (
    <div className="flex justify-center">
      <div className="relative flex bg-slate-900/50 p-1 rounded-xl border border-slate-700/50 shadow-inner w-fit backdrop-blur-sm">
        
        {/* Sliding Indicator - Now Emerald */}
        <div
          className={`absolute top-1 bottom-1 w-[48%] rounded-lg bg-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-300 ease-in-out ${
            mode === "deep" ? "left-[51%]" : "left-1"
          }`}
        ></div>

        {/* Basic Button */}
        <button
          onClick={() => setMode("basic")}
          className={`relative z-10 px-5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors duration-300 ${
            mode === "basic"
              ? "text-white"
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          Basic
        </button>

        {/* Deep Button */}
        <button
          onClick={() => setMode("deep")}
          className={`relative z-10 px-5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors duration-300 ${
            mode === "deep"
              ? "text-white"
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          Deep
        </button>
      </div>
    </div>
  );
}