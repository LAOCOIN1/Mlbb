import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Copy, Check, User, MapPin, Server, Globe, Sparkles } from "lucide-react";
import { MLBBCheckResult } from "../types";

interface ResultCardProps {
  result: MLBBCheckResult | null;
  lang: "id" | "en" | "th";
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, lang }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!result) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const texts = {
    id: {
      successTitle: "Detail Akun Mobile Legends",
      verifiedBadge: "Terverifikasi",
      nicknameLabel: "Nickname In-Game",
      countryLabel: "Akun Dibuat Negara",
      serverRegionLabel: "Wilayah Server",
      idLabel: "User ID",
      serverLabel: "Server Zone",
      copyAll: "Salin Semua Info",
      copied: "Tersalin!",
      errorTitle: "Gagal Mengambil Data",
      errorHint: "Pastikan User ID dan Server Zone sudah benar sesuai profil akun Mobile Legends Anda.",
    },
    th: {
      successTitle: "ข้อมูลบัญชี Mobile Legends",
      verifiedBadge: "ยืนยันแล้ว",
      nicknameLabel: "ชื่อในเกม (Nickname)",
      countryLabel: "ประเทศที่สร้างบัญชี",
      serverRegionLabel: "ภูมิภาคเซิร์ฟเวอร์",
      idLabel: "User ID",
      serverLabel: "Server Zone",
      copyAll: "คัดลอกข้อมูลทั้งหมด",
      copied: "คัดลอกแล้ว!",
      errorTitle: "ไม่พบข้อมูลบัญชี",
      errorHint: "กรุณาตรวจสอบความถูกต้องของ User ID และ Server Zone ในเกม Mobile Legends",
    },
    en: {
      successTitle: "Mobile Legends Account Details",
      verifiedBadge: "Verified",
      nicknameLabel: "In-Game Nickname",
      countryLabel: "Account Created Country",
      serverRegionLabel: "Server Region",
      idLabel: "User ID",
      serverLabel: "Server Zone",
      copyAll: "Copy All Details",
      copied: "Copied!",
      errorTitle: "Failed to Retrieve Data",
      errorHint: "Please make sure your User ID and Server Zone match your in-game profile.",
    },
  }[lang];

  if (!result.success) {
    return (
      <div
        id="responseContainer"
        className="mt-4 p-5 rounded-2xl bg-red-50/80 border border-red-200 text-red-900 animate-in fade-in duration-200"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 bg-red-100 rounded-xl text-red-600 shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-red-900">
              {texts.errorTitle}
            </h3>
            <p className="text-xs sm:text-sm text-red-700 mt-1">
              {result.error || "User ID or Server Zone is invalid / not found."}
            </p>
            <p className="text-xs text-red-600/80 mt-2 bg-red-100/50 p-2 rounded-lg">
              {texts.errorHint}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const allDetailsText = `Mobile Legends Account Details:
Nickname: ${result.nickname}
Country: ${result.country}
Server Region: ${result.serverRegion || "N/A"}
User ID: ${result.id}
Server: ${result.server}`;

  return (
    <div
      id="responseContainer"
      className="mt-5 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      {/* Header */}
      <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-xs sm:text-sm tracking-wide">
            {texts.successTitle}
          </span>
        </div>
        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5" />
          {texts.verifiedBadge}
        </span>
      </div>

      <div className="p-5 sm:p-6 space-y-4">
        {/* Main Nickname Display */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {texts.nicknameLabel}
              </span>
              <p className="text-base sm:text-lg font-bold text-slate-900 truncate">
                {result.nickname}
              </p>
            </div>
          </div>
          <button
            id="btn-copy-nickname"
            type="button"
            onClick={() => copyToClipboard(result.nickname, "nick")}
            className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors shrink-0 cursor-pointer"
            title="Copy Nickname"
          >
            {copiedKey === "nick" ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Detailed Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Country Info */}
          <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 flex items-start gap-2.5">
            <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-slate-500 font-medium">
                {texts.countryLabel}
              </p>
              <p className="text-sm font-semibold text-slate-800 mt-0.5 truncate">
                {result.country || "Unknown"}
              </p>
            </div>
          </div>

          {/* Server Region Info */}
          <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-100 flex items-start gap-2.5">
            <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg shrink-0 mt-0.5">
              <Globe className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-slate-500 font-medium">
                {texts.serverRegionLabel}
              </p>
              <p className="text-sm font-semibold text-slate-800 mt-0.5 truncate">
                {result.serverRegion || "Global Server"}
              </p>
            </div>
          </div>
        </div>

        {/* Account ID & Server Meta bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="font-mono bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
              ID: {result.id}
            </span>
            <span className="font-mono bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
              Server: ({result.server})
            </span>
          </div>

          <button
            id="btn-copy-all-details"
            type="button"
            onClick={() => copyToClipboard(allDetailsText, "all")}
            className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1.5 px-2.5 py-1 rounded-md hover:bg-blue-50 cursor-pointer transition-colors"
          >
            {copiedKey === "all" ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-semibold">{texts.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{texts.copyAll}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
