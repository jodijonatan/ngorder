import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="bg-[#030712] text-slate-200 antialiased selection:bg-purple-500/30 selection:text-purple-200">
        <Providers>
          {/* Background Decor - Elemen ini membuat kesan kedalaman (Depth) */}
          <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* Cahaya Ungu di pojok kiri atas */}
            <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />
            {/* Cahaya Biru di pojok kanan bawah */}
            <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
            {/* Grid Pattern halus untuk kesan tech */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          </div>

          <div className="relative flex min-h-screen flex-col">
            {/* <Navbar /> */}

            {/* Main Content dengan Padding Top untuk Navbar Fixed */}
            <main className="flex-1">
              <div className="w-full">{children}</div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
