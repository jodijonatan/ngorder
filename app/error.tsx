"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-black text-text-main uppercase tracking-tight">
            Terjadi Kesalahan
          </h2>
          <p className="text-text-muted text-sm">
            Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi.
          </p>
        </div>
        <button
          onClick={reset}
          className="inline-flex items-center space-x-2 bg-secondary text-white font-bold px-6 py-3 rounded-xl hover:bg-secondary/90 transition-all active:scale-95"
        >
          <RefreshCcw className="w-4 h-4" />
          <span>Coba Lagi</span>
        </button>
      </div>
    </div>
  );
}
