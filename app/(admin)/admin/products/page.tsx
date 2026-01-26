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
    <div className="min-h-screen bg-[#030712] text-slate-200 pb-20">
      {/* Decorative Glow */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-12">
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center space-x-2 text-purple-400 mb-3">
              <LayoutGrid className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-[0.3em]">
                Inventory System
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              PRODUCT <span className="text-slate-600 font-light">HUB</span>
            </h1>
          </div>

          <Link
            href="/admin/products/create"
            className="group relative inline-flex items-center justify-center bg-white text-black font-black px-8 py-4 rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-white/5"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Plus className="relative w-5 h-5 mr-2 group-hover:text-white transition-colors" />
            <span className="relative group-hover:text-white transition-colors">
              TAMBAH PRODUK
            </span>
          </Link>
        </div>

        {/* Stats Grid - Now at the Top for Quick Insight */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Total Products */}
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-4 right-4 text-slate-800 group-hover:text-purple-500/20 transition-colors">
              <Package className="w-12 h-12 transition-transform group-hover:scale-110" />
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">
              Total Catalog
            </p>
            <h3 className="text-3xl font-black text-white italic">
              {totalProducts}{" "}
              <span className="text-sm font-normal not-italic text-slate-600">
                Items
              </span>
            </h3>
          </div>

          {/* Card 2: Total Stock */}
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-4 right-4 text-slate-800 group-hover:text-blue-500/20 transition-colors">
              <Database className="w-12 h-12 transition-transform group-hover:scale-110" />
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">
              Available Units
            </p>
            <h3 className="text-3xl font-black text-white italic">
              {totalStock.toLocaleString()}{" "}
              <span className="text-sm font-normal not-italic text-slate-600">
                Pcs
              </span>
            </h3>
          </div>

          {/* Card 3: Inventory Value */}
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] backdrop-blur-md relative overflow-hidden group lg:col-span-1 sm:col-span-2">
            <div className="absolute top-4 right-4 text-slate-800 group-hover:text-emerald-500/20 transition-colors">
              <Banknote className="w-12 h-12 transition-transform group-hover:scale-110" />
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">
              Inventory Worth
            </p>
            <h3 className="text-3xl font-black text-white italic">
              <span className="text-sm not-italic mr-1 text-emerald-500">
                Rp
              </span>
              {inventoryValue.toLocaleString("id-ID")}
            </h3>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Daftar Produk
            </h2>
            <span className="bg-white/10 text-[10px] font-black px-2 py-1 rounded-md text-slate-400 uppercase tracking-tighter">
              Live Database
            </span>
          </div>
          <div className="h-[1px] flex-1 bg-white/5 mx-6 hidden md:block"></div>
        </div>

        {/* Main Grid Content */}
        <div className="relative">
          {products.length === 0 ? (
            <div className="bg-white/[0.01] border border-dashed border-white/10 rounded-[3rem] py-32 text-center">
              <div className="inline-flex p-6 bg-slate-900 rounded-full mb-6 border border-white/5">
                <Package className="w-12 h-12 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Gudang Kosong
              </h3>
              <p className="text-slate-500 max-w-xs mx-auto text-sm">
                Belum ada produk yang terdaftar. Klik tombol tambah untuk
                memulai inventaris Anda.
              </p>
            </div>
          ) : (
            <AdminProductGrid products={products} />
          )}
        </div>

        {/* Quick Tips/Footer */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 p-8 bg-gradient-to-r from-purple-900/10 to-transparent rounded-[2rem] border border-white/5">
          <div className="flex items-center space-x-4 text-center md:text-left">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <ArrowUpRight className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Butuh Laporan Cepat?
              </h4>
              <p className="text-xs text-slate-500 uppercase tracking-wider">
                Gunakan shortcut Ctrl+P untuk mencetak daftar ini.
              </p>
            </div>
          </div>
          <button className="text-[10px] font-black text-slate-400 hover:text-white transition-colors tracking-widest uppercase">
            Download CSV Report
          </button>
        </div>
      </div>
    </div>
  );
}
