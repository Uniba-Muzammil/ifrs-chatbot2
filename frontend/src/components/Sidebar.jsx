import React, { useEffect, useState } from "react";
import { getChatHistory } from "../api/api";

export default function Sidebar({ mode, onSelectChat }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getChatHistory();
        setHistory(res.data);
      } catch (err) {
        console.error("History error", err);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="w-1/4 max-h-125 overflow-y-auto p-2 bg-gray-100 rounded-lg border">
      <h3 className="font-bold mb-2 text-center">Chat History</h3>

      {history
        .filter((chat) => chat.mode === mode)
        .map((chat, i) => (
          <div
            key={i}
            className="p-2 mb-2 bg-white rounded shadow hover:bg-gray-50 cursor-pointer"
            onClick={() => onSelectChat(chat)}
          >
            <p className="text-sm font-semibold">{chat.question}</p>
            <p className="text-xs text-gray-600">{chat.mode}</p>
          </div>
        ))}
    </div>
  );
}