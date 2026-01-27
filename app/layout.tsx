import "./globals.css";
import Providers from "./providers";
// import Navbar from "@/components/Navbar";
import { Metadata } from "next";

// Konfigurasi Metadata Global
export const metadata: Metadata = {
  title: {
    default: "NGORDER — Digital Commerce Protocol",
    template: "%s | NGORDER",
  },
  description:
    "Next-generation e-commerce platform for modern business infrastructure.",
  icons: {
    icon: "/favicon.ico", // Pastikan file ini ada di folder public
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="bg-surface text-text-main antialiased selection:bg-secondary/30 selection:text-secondary">
        <Providers>
          {/* Global Background Infrastructure */}
          <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* Primary Ambience - Secondary Color (pojok kiri atas) */}
            <div
              className="absolute -top-[15%] -left-[10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[150px] animate-pulse"
              style={{ animationDuration: "8s" }}
            />

            {/* Secondary Ambience - Accent Color (pojok kanan bawah) */}
            <div
              className="absolute -bottom-[15%] -right-[10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-[150px] animate-pulse"
              style={{ animationDuration: "12s" }}
            />

            {/* Overlay Grid Pattern - Tech Aesthetic */}
            <div className="absolute inset-0 bg-white bg-center opacity-[0.15] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />

            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </div>

          <div className="relative flex min-h-screen flex-col">
            {/* Main Application Interface */}
            <main className="flex-1 relative">
              <div className="w-full h-full">{children}</div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
