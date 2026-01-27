import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        <div className="w-full pb-12">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
