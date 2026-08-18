import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { CheckerForm } from "./components/CheckerForm";
import { ResultCard } from "./components/ResultCard";
import { HistoryList } from "./components/HistoryList";
import { IdGuideModal } from "./components/IdGuideModal";
import { Footer } from "./components/Footer";
import { MLBBCheckResult, CheckHistoryItem } from "./types";
import { checkMLBBAccount } from "./services/mlbbChecker";

const HISTORY_STORAGE_KEY = "mlbb_checker_history_v1";

export default function App() {
  const [lang, setLang] = useState<"id" | "th" | "en">("th");
  const [result, setResult] = useState<MLBBCheckResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedServer, setSelectedServer] = useState("");
  const [history, setHistory] = useState<CheckHistoryItem[]>([]);

  // Load search history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const saveToHistory = (item: CheckHistoryItem) => {
    try {
      const filtered = history.filter((h) => !(h.id === item.id && h.server === item.server));
      const updated = [item, ...filtered].slice(0, 8);
      setHistory(updated);
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const handleCheck = async (id: string, server: string) => {
    setIsLoading(true);
    setResult(null);

    try {
      const checkRes = await checkMLBBAccount(id, server);
      setResult(checkRes);

      if (checkRes.success) {
        saveToHistory({
          id: checkRes.id,
          server: checkRes.server,
          nickname: checkRes.nickname,
          country: checkRes.country,
          serverRegion: checkRes.serverRegion,
          timestamp: Date.now(),
        });
      }
    } catch {
      setResult({
        success: false,
        id,
        server,
        nickname: "",
        country: "",
        error:
          lang === "id"
            ? "Gagal menghubungi server pengecekan. Silakan coba lagi."
            : lang === "th"
            ? "เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง"
            : "Failed to connect to verification server. Please try again.",
        timestamp: Date.now(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectFromHistory = (histId: string, histServer: string) => {
    setSelectedId(histId);
    setSelectedServer(histServer);
    handleCheck(histId, histServer);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 antialiased selection:bg-blue-500 selection:text-white">
      {/* Top Navigation */}
      <Header lang={lang} setLang={setLang} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-xl mx-auto">
          {/* Main Card */}
          <CheckerForm
            onCheck={handleCheck}
            isLoading={isLoading}
            onOpenGuide={() => setIsGuideOpen(true)}
            lang={lang}
            initialId={selectedId}
            initialServer={selectedServer}
          />

          {/* Response Container */}
          <ResultCard result={result} lang={lang} />

          {/* Search History */}
          <HistoryList
            history={history}
            onSelect={handleSelectFromHistory}
            onClear={clearHistory}
            lang={lang}
          />
        </div>
      </main>

      {/* ID Guide Modal */}
      <IdGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        lang={lang}
      />

      {/* Footer Attribution */}
      <Footer />
    </div>
  );
}
