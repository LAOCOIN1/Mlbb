import React, { useState } from "react";
import { Search, RotateCcw, HelpCircle, ArrowRight, Sparkles, ClipboardPaste } from "lucide-react";

interface CheckerFormProps {
  onCheck: (id: string, server: string) => void;
  isLoading: boolean;
  onOpenGuide: () => void;
  lang: "id" | "en" | "th";
  initialId?: string;
  initialServer?: string;
}

export const CheckerForm: React.FC<CheckerFormProps> = ({
  onCheck,
  isLoading,
  onOpenGuide,
  lang,
  initialId = "",
  initialServer = "",
}) => {
  const [id, setId] = useState(initialId);
  const [server, setServer] = useState(initialServer);

  // Sync props if changed from history click
  React.useEffect(() => {
    if (initialId) setId(initialId);
    if (initialServer) setServer(initialServer);
  }, [initialId, initialServer]);

  // Intelligent paste handler: handles formats like "12345678(2648)", "12345678 (2648)", "12345678-2648"
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const combinedMatch = val.match(/^(\d{5,12})\s*[\(\[-]?\s*(\d{3,6})\s*[\)\]]?$/);
    if (combinedMatch) {
      setId(combinedMatch[1]);
      setServer(combinedMatch[2]);
      return;
    }
    setId(val.replace(/[^\d]/g, ""));
  };

  const handleServerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServer(e.target.value.replace(/[^\d]/g, ""));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id.trim() || !server.trim()) return;
    onCheck(id.trim(), server.trim());
  };

  const handleReset = () => {
    setId("");
    setServer("");
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (!text) return;
      const combinedMatch = text.match(/(\d{5,12})\s*[\(\[-]?\s*(\d{3,6})/);
      if (combinedMatch) {
        setId(combinedMatch[1]);
        setServer(combinedMatch[2]);
      } else {
        const digits = text.replace(/[^\d]/g, "");
        if (digits.length >= 7) {
          setId(digits);
        }
      }
    } catch {
      // Clipboard access not granted, normal behavior
    }
  };

  const texts = {
    id: {
      title: "Cek Username & Region Mobile Legends",
      subtitle: "Masukkan ID dan Server untuk mendapatkan informasi username dan region.",
      idLabel: "User ID",
      idPlaceholder: "Contoh: 128416801",
      serverLabel: "Server (Zone ID)",
      serverPlaceholder: "Contoh: 2648",
      submitBtn: "Cek Akun MLBB",
      submitting: "Memeriksa Akun...",
      resetBtn: "Reset",
      pasteBtn: "Tempel",
      guideBtn: "Cara lihat ID & Server",
      smartHint: "Tip: Anda bisa menempelkan format 128416801 (2648) langsung ke kolom ID.",
    },
    th: {
      title: "ตรวจสอบชื่อ & เซิร์ฟเวอร์ Mobile Legends",
      subtitle: "กรอก User ID และ Server (Zone ID) เพื่อค้นหาข้อมูลชื่อและภูมิภาคของบัญชี MLBB",
      idLabel: "User ID (ไอดีผู้ใช้)",
      idPlaceholder: "ตัวอย่าง: 128416801",
      serverLabel: "Server (Zone ID / รหัสเซิร์ฟเวอร์)",
      serverPlaceholder: "ตัวอย่าง: 2648",
      submitBtn: "ตรวจสอบข้อมูล MLBB",
      submitting: "กำลังตรวจสอบ...",
      resetBtn: "ล้างค่า",
      pasteBtn: "วางข้อความ",
      guideBtn: "วิธีดู ID และ Server",
      smartHint: "เคล็ดลับ: สามารถวางในรูปแบบ 128416801 (2648) ได้โดยตรง",
    },
    en: {
      title: "Mobile Legends Username & Region Checker",
      subtitle: "Enter User ID and Server to get Mobile Legends account username and region details.",
      idLabel: "User ID",
      idPlaceholder: "e.g. 128416801",
      serverLabel: "Server (Zone ID)",
      serverPlaceholder: "e.g. 2648",
      submitBtn: "Fetch Data",
      submitting: "Checking Account...",
      resetBtn: "Reset",
      pasteBtn: "Paste",
      guideBtn: "How to find ID & Server",
      smartHint: "Tip: You can paste formats like 128416801 (2648) directly into the ID box.",
    },
  }[lang];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-7">
      <div className="text-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {texts.title}
        </h1>
        <p className="text-sm text-slate-600 mt-1.5 max-w-lg mx-auto leading-relaxed">
          {texts.subtitle}
        </p>
      </div>

      <form id="fetchForm" onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
          {/* User ID Field */}
          <div className="sm:col-span-7">
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="ID" className="text-xs font-semibold text-slate-700">
                {texts.idLabel} <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                id="btn-paste-clipboard"
                onClick={handlePasteClipboard}
                className="text-[11px] font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors"
                title="Paste from clipboard"
              >
                <ClipboardPaste className="w-3 h-3" />
                <span>{texts.pasteBtn}</span>
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                id="ID"
                value={id}
                onChange={handleIdChange}
                placeholder={texts.idPlaceholder}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono text-sm placeholder:text-slate-400 placeholder:font-sans focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              />
            </div>
          </div>

          {/* Server / Zone Field */}
          <div className="sm:col-span-5">
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="server" className="text-xs font-semibold text-slate-700">
                {texts.serverLabel} <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                id="btn-open-guide-link"
                onClick={onOpenGuide}
                className="text-[11px] font-medium text-slate-500 hover:text-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <HelpCircle className="w-3 h-3" />
                <span>{texts.guideBtn}</span>
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                id="server"
                value={server}
                onChange={handleServerChange}
                placeholder={texts.serverPlaceholder}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono text-sm placeholder:text-slate-400 placeholder:font-sans focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              />
            </div>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-500 shrink-0" />
          <span>{texts.smartHint}</span>
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-2.5 pt-2">
          <button
            type="submit"
            id="btn-submit-check"
            disabled={isLoading || !id.trim() || !server.trim()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium text-sm py-2.5 px-4 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{texts.submitting}</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>{texts.submitBtn}</span>
              </>
            )}
          </button>

          {(id || server) && (
            <button
              type="button"
              id="btn-reset-form"
              onClick={handleReset}
              disabled={isLoading}
              className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
              title={texts.resetBtn}
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">{texts.resetBtn}</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
