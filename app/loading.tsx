import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="w-10 h-10 text-secondary animate-spin mx-auto" />
        <p className="text-text-muted text-xs font-bold uppercase tracking-widest">
          Memuat...
        </p>
      </div>
    </div>
  );
}
