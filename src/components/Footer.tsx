import React from "react";
import { Github, ExternalLink, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-10 py-6 border-t border-slate-200/80 text-center text-xs text-slate-500">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <span>Demo by</span>
          <span className="font-semibold text-slate-700">andrepradika</span>
          <span>•</span>
          <span>web-mlbb-checker</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/andrepradika/web-mlbb-checker"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors font-medium"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Repository</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>
    </footer>
  );
};
