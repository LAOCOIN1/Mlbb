import React from "react";
import { Shield, Sparkles, Globe2 } from "lucide-react";

interface HeaderProps {
  lang: "id" | "en" | "th";
  setLang: (lang: "id" | "en" | "th") => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, setLang }) => {
  return (
    <header className="w-full border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-30 shadow-xs">
      <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">
                MLBB Checker
              </span>
              <span className="px-2 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                v2.0
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Mobile Legends: Bang Bang Username & Region Tool
            </p>
          </div>
        </div>

        {/* Language selector */}
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-medium">
          <Globe2 className="w-3.5 h-3.5 text-slate-500 ml-1 mr-0.5" />
          <button
            id="lang-id"
            type="button"
            onClick={() => setLang("id")}
            className={`px-2 py-1 rounded-md transition-colors ${
              lang === "id"
                ? "bg-white text-blue-600 font-semibold shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🇮🇩 ID
          </button>
          <button
            id="lang-th"
            type="button"
            onClick={() => setLang("th")}
            className={`px-2 py-1 rounded-md transition-colors ${
              lang === "th"
                ? "bg-white text-blue-600 font-semibold shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🇹🇭 TH
          </button>
          <button
            id="lang-en"
            type="button"
            onClick={() => setLang("en")}
            className={`px-2 py-1 rounded-md transition-colors ${
              lang === "en"
                ? "bg-white text-blue-600 font-semibold shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🇬🇧 EN
          </button>
        </div>
      </div>
    </header>
  );
};
