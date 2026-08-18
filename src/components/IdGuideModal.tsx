import React from "react";
import { X, HelpCircle, Check, Smartphone, Info } from "lucide-react";

interface IdGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "id" | "en" | "th";
}

export const IdGuideModal: React.FC<IdGuideModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  const content = {
    id: {
      title: "Cara Menemukan User ID & Server MLBB",
      subtitle: "Ikuti langkah mudah ini untuk melihat ID dan Server Anda di game Mobile Legends:",
      step1: "Buka game Mobile Legends: Bang Bang di ponsel Anda.",
      step2: "Ketuk foto profil / avatar akun Anda di pojok kiri atas layar utama.",
      step3: "Pilih tab 'Basic Info' (Info Dasar).",
      step4: "Di bawah nama akun Anda, Anda akan melihat angka seperti: 12345678 (2034)",
      explanationId: "Angka pertama (misal: 12345678) adalah User ID Anda.",
      explanationServer: "Angka di dalam kurung (misal: 2034) adalah Server / Zone ID Anda.",
      close: "Mengerti & Tutup",
    },
    th: {
      title: "วิธีดู User ID และ Server (Zone ID) ในเกม MLBB",
      subtitle: "ทำตามขั้นตอนง่ายๆ ดังนี้เพื่อดู ID และ เซิร์ฟเวอร์ ของคุณในเกม Mobile Legends:",
      step1: "เปิดเกม Mobile Legends: Bang Bang บนมือถือของคุณ",
      step2: "แตะที่รูปโปรไฟล์ / อวาตาร์ ที่มุมซ้ายบนของหน้าจอหลัก",
      step3: "เลือกแท็บ 'ข้อมูลพื้นฐาน' (Basic Info)",
      step4: "ใต้ชื่อตัวละคร จะแสดงตัวเลข เช่น: 12345678 (2034)",
      explanationId: "ตัวเลขชุดแรก (เช่น 12345678) คือ User ID ของคุณ",
      explanationServer: "ตัวเลขในวงเล็บ (เช่น 2034) คือ Server / Zone ID ของคุณ",
      close: "เข้าใจแล้ว & ปิดหน้าต่าง",
    },
    en: {
      title: "How to Find Your MLBB User ID & Server",
      subtitle: "Follow these simple steps to find your ID and Server in Mobile Legends:",
      step1: "Open the Mobile Legends: Bang Bang game on your mobile device.",
      step2: "Tap your profile avatar in the top-left corner of the main menu.",
      step3: "Go to the 'Basic Info' tab.",
      step4: "Under your avatar and nickname, you will see numbers formatted like: 12345678 (2034)",
      explanationId: "The first set of numbers (e.g. 12345678) is your User ID.",
      explanationServer: "The number in brackets (e.g. 2034) is your Server / Zone ID.",
      close: "Got It & Close",
    },
  }[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
              <Smartphone className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              {content.title}
            </h3>
          </div>
          <button
            id="btn-close-guide"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs sm:text-sm text-slate-600">
          <p className="text-slate-600">{content.subtitle}</p>

          <ol className="space-y-2.5 list-decimal list-inside bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-slate-700">
            <li className="pl-1">{content.step1}</li>
            <li className="pl-1">{content.step2}</li>
            <li className="pl-1">{content.step3}</li>
            <li className="pl-1 font-medium text-blue-700">{content.step4}</li>
          </ol>

          {/* Visual ID illustration */}
          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200/80">
            <div className="font-mono text-center text-sm sm:text-base font-bold text-blue-900 bg-white py-2 px-3 rounded-lg border border-blue-100 shadow-2xs">
              <span className="text-blue-600 underline decoration-blue-400">128416801</span>
              <span className="text-slate-400 mx-1.5"> </span>
              <span className="text-indigo-600 underline decoration-indigo-400">(2648)</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2 text-[11px] text-center font-medium">
              <div className="bg-blue-100/70 text-blue-800 p-1.5 rounded">
                ↑ {content.explanationId.split(" ")[0]} (User ID)
              </div>
              <div className="bg-indigo-100/70 text-indigo-800 p-1.5 rounded">
                ↑ {content.explanationServer.split(" ")[0]} (Zone ID)
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            id="btn-confirm-guide"
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            {content.close}
          </button>
        </div>
      </div>
    </div>
  );
};
