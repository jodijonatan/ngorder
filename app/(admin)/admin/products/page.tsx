import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Plus,
  Package,
  Database,
  Banknote,
  LayoutGrid,
  ArrowUpRight,
} from "lucide-react";
import AdminProductGrid from "@/components/AdminProductGrid";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany();

  // Kalkulasi Statistik
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const inventoryValue = products.reduce(
    (sum, p) => sum + p.price * p.stock,
    0,
  );

  return (
    <div className="min-h-screen bg-surface text-text-muted pb-20">
      {/* Decorative Glow - Sinkron dengan global theme */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-12">
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center space-x-2 text-secondary mb-3">
              <LayoutGrid className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                Inventory System
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-text-main tracking-tighter uppercase">
              Product <span className="text-text-muted font-light">Hub</span>
            </h1>
          </div>

          <Link
            href="/admin/products/create"
            className="group relative inline-flex items-center justify-center bg-accent text-white font-black px-8 py-4 rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-accent/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Plus className="relative w-5 h-5 mr-2" />
            <span className="relative uppercase tracking-widest text-sm">
              Tambah Produk
            </span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Total Products */}
          <StatCard
            label="Total Catalog"
            value={totalProducts}
            unit="Items"
            icon={<Package className="w-10 h-10" />}
            accentColor="text-secondary"
          />

          {/* Card 2: Total Stock */}
          <StatCard
            label="Available Units"
            value={totalStock.toLocaleString()}
            unit="Pcs"
            icon={<Database className="w-10 h-10" />}
            accentColor="text-accent"
          />

          {/* Card 3: Inventory Value */}
          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] backdrop-blur-md relative overflow-hidden group lg:col-span-1 sm:col-span-2">
            <div className="absolute -top-2 -right-2 text-white/5 transition-colors group-hover:text-secondary/10">
              <Banknote className="w-24 h-24 transition-transform group-hover:scale-110" />
            </div>
            <p className="text-text-muted text-[10px] font-black uppercase tracking-widest mb-2">
              Inventory Worth
            </p>
            <h3 className="text-3xl font-black text-text-main italic">
              <span className="text-sm not-italic mr-1 text-secondary">Rp</span>
              {inventoryValue.toLocaleString("id-ID")}
            </h3>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-black text-text-main uppercase tracking-tight">
              Daftar Produk
            </h2>
            <div className="flex items-center space-x-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-tighter">
                Live Database
              </span>
            </div>
          </div>
          <div className="h-[1px] flex-1 bg-white/5 mx-6 hidden md:block"></div>
        </div>

        {/* Main Grid Content */}
        <div className="relative">
          {products.length === 0 ? (
            <div className="bg-white/[0.01] border border-dashed border-white/10 rounded-[3rem] py-32 text-center">
              <div className="inline-flex p-8 bg-surface rounded-3xl mb-6 border border-white/5 shadow-2xl">
                <Package className="w-12 h-12 text-text-muted opacity-20" />
              </div>
              <h3 className="text-xl font-black text-text-main uppercase mb-2">
                Gudang Kosong
              </h3>
              <p className="text-text-muted max-w-xs mx-auto text-sm font-medium">
                Belum ada produk yang terdaftar. Mulai inventaris Anda sekarang.
              </p>
            </div>
          ) : (
            <AdminProductGrid products={products} />
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-gradient-to-r from-secondary/5 to-transparent rounded-[2.5rem] border border-white/5">
          <div className="flex items-center space-x-5 text-center md:text-left">
            <div className="p-4 bg-secondary/10 rounded-2xl border border-secondary/20">
              <ArrowUpRight className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h4 className="text-sm font-black text-text-main uppercase tracking-tight">
                Laporan Inventaris
              </h4>
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1">
                Data sinkron otomatis dengan sistem pusat NGORDER.
              </p>
            </div>
          </div>
          <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black text-text-main transition-all tracking-[0.2em] uppercase">
            Download CSV Report
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper Component for Stats
function StatCard({ label, value, unit, icon, accentColor }: any) {
  return (
    <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] backdrop-blur-md relative overflow-hidden group">
      <div
        className={`absolute -top-2 -right-2 opacity-5 transition-all group-hover:opacity-10 group-hover:scale-110 ${accentColor}`}
      >
        {icon}
      </div>
      <p className="text-text-muted text-[10px] font-black uppercase tracking-widest mb-2">
        {label}
      </p>
      <h3 className="text-3xl font-black text-text-main italic">
        {value}{" "}
        <span className="text-sm font-bold not-italic text-text-muted opacity-40 uppercase tracking-tighter">
          {unit}
        </span>
      </h3>
    </div>
  );
}
