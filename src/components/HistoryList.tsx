import React from "react";
import { History, Trash2, ArrowUpRight, User } from "lucide-react";
import { CheckHistoryItem } from "../types";

interface HistoryListProps {
  history: CheckHistoryItem[];
  onSelect: (id: string, server: string) => void;
  onClear: () => void;
  lang: "id" | "en" | "th";
}

export const HistoryList: React.FC<HistoryListProps> = ({
  history,
  onSelect,
  onClear,
  lang,
}) => {
  if (history.length === 0) return null;

  const texts = {
    id: {
      title: "Riwayat Pengecekan Terakhir",
      clear: "Hapus",
      recheck: "Cek Lagi",
    },
    th: {
      title: "ประวัติการค้นหาล่าสุด",
      clear: "ล้างประวัติ",
      recheck: "ค้นหาอีกครั้ง",
    },
    en: {
      title: "Recent Search History",
      clear: "Clear",
      recheck: "Check Again",
    },
  }[lang];

  return (
    <div className="mt-6 pt-5 border-t border-slate-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
          <History className="w-3.5 h-3.5 text-slate-500" />
          <span>{texts.title}</span>
          <span className="text-[10px] px-1.5 py-0.2 bg-slate-100 text-slate-500 rounded-full font-mono">
            {history.length}
          </span>
        </div>
        <button
          id="btn-clear-history"
          onClick={onClear}
          className="text-[11px] text-slate-400 hover:text-red-600 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Trash2 className="w-3 h-3" />
          <span>{texts.clear}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {history.map((item, idx) => (
          <div
            key={`${item.id}-${item.server}-${idx}`}
            onClick={() => onSelect(item.id, item.server)}
            className="group p-2.5 bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-200 rounded-xl transition-all flex items-center justify-between cursor-pointer"
          >
            <div className="min-w-0 pr-2">
              <div className="flex items-center gap-1.5">
                <User className="w-3 h-3 text-slate-400 group-hover:text-blue-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800 group-hover:text-blue-700 truncate">
                  {item.nickname}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                {item.id} ({item.server}) • {item.country || "MLBB"}
              </p>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
};
