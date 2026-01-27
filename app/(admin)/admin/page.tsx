"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  UserPlus,
  Clock,
  ArrowUpRight,
} from "lucide-react";

interface DashboardData {
  stats: {
    totalUsers: number;
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
  };
  recentOrders: Array<{
    id: string;
    total: number;
    status: string;
    user: {
      name: string | null;
      email: string;
    };
  }>;
  lowStockProducts: Array<{
    id: string;
    name: string;
    stock: number;
  }>;
  recentUsers: Array<{
    id: string;
    name: string | null;
    email: string;
    role: string;
  }>;
  orderStatusStats: Array<{
    status: string;
    _count: {
      status: number;
    };
  }>;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/admin/dashboard");
      if (response.ok) {
        const dashboardData = await response.json();
        setData(dashboardData);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-24 bg-surface rounded-[2.5rem] border border-white/5">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4 opacity-20" />
        <p className="text-text-muted font-bold uppercase tracking-widest text-xs">
          Gagal memuat data dashboard
        </p>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "pending":
        return "text-accent bg-accent/10 border-accent/20";
      case "cancelled":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      default:
        return "text-text-muted bg-white/5 border-white/10";
    }
  };

  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] font-black text-secondary uppercase tracking-widest">
              Live System Status
            </span>
          </div>
          <h1 className="text-4xl font-black text-text-main tracking-tighter uppercase">
            Admin{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
              Console
            </span>
          </h1>
          <p className="text-text-muted mt-2 text-sm max-w-md">
            Pantau performa bisnis dan kelola operasional NGORDER secara
            real-time.
          </p>
        </div>
        <div className="flex items-center space-x-3 text-[10px] font-bold text-text-muted uppercase tracking-widest">
          <Clock className="w-4 h-4" />
          <span>Terakhir diperbarui: Baru saja</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Users"
          value={data.stats.totalUsers.toString()}
          icon={<Users />}
          color="text-blue-400"
          bgColor="bg-blue-400/10"
        />
        <StatCard
          label="Total Products"
          value={data.stats.totalProducts.toString()}
          icon={<Package />}
          color="text-green-400"
          bgColor="bg-green-400/10"
        />
        <StatCard
          label="Total Orders"
          value={data.stats.totalOrders.toString()}
          icon={<ShoppingCart />}
          color="text-secondary"
          bgColor="bg-secondary/10"
        />
        <StatCard
          label="Total Revenue"
          value={formatCurrency(data.stats.totalRevenue)}
          icon={<DollarSign />}
          color="text-accent"
          bgColor="bg-accent/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-text-main uppercase tracking-tight flex items-center space-x-3">
              <TrendingUp className="w-5 h-5 text-secondary" />
              <span>Pesanan Terbaru</span>
            </h2>
            <button className="text-[10px] font-black text-text-muted hover:text-secondary uppercase tracking-widest transition-colors">
              Lihat Semua
            </button>
          </div>
          <div className="space-y-4">
            {data.recentOrders.length > 0 ? (
              data.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="group flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-secondary/30 transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ShoppingCart className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-text-main font-bold text-sm truncate max-w-[150px]">
                        {order.user.name || order.user.email}
                      </p>
                      <p className="text-accent font-black text-xs mt-0.5">
                        {formatCurrency(order.total)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>
              ))
            ) : (
              <EmptyState message="Belum ada pesanan masuk" />
            )}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-text-main uppercase tracking-tight flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span>Stok Menipis</span>
            </h2>
          </div>
          <div className="space-y-4">
            {data.lowStockProducts.length > 0 ? (
              data.lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 bg-red-500/5 border border-red-500/10 rounded-2xl"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                      <Package className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <p className="text-text-main font-bold text-sm">
                        {product.name}
                      </p>
                      <p className="text-red-400 font-black text-xs uppercase tracking-widest mt-0.5">
                        Sisa Stok: {product.stock}
                      </p>
                    </div>
                  </div>
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <ArrowUpRight className="w-4 h-4 text-red-500" />
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center bg-green-500/5 rounded-2xl border border-green-500/10">
                <p className="text-green-500 text-xs font-black uppercase tracking-widest">
                  Semua stok aman
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Users */}
      <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-black text-text-main uppercase tracking-tight flex items-center space-x-3">
            <UserPlus className="w-5 h-5 text-accent" />
            <span>Pengguna Baru</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.recentUsers.map((user) => (
            <div
              key={user.id}
              className="p-5 bg-white/[0.03] border border-white/5 rounded-[1.5rem] hover:bg-white/[0.06] transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center font-black text-white text-sm shadow-lg shadow-secondary/20">
                  {(user.name || user.email).charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-text-main font-bold truncate">
                    {user.name || "No Name"}
                  </p>
                  <p className="text-text-muted text-xs truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5">
                <span className="px-3 py-1 bg-white/5 text-text-muted text-[10px] font-black uppercase rounded-lg tracking-widest">
                  {user.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Status Grid */}
      <div className="bg-surface border border-white/5 rounded-[2rem] p-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 blur-3xl -z-10" />
        <h2 className="text-sm font-black text-text-muted uppercase tracking-[0.3em] mb-8 text-center">
          Ringkasan Status Pesanan
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {data.orderStatusStats.map((stat) => (
            <div key={stat.status} className="text-center group">
              <p className="text-4xl font-black text-text-main group-hover:text-secondary transition-colors duration-500">
                {stat._count.status}
              </p>
              <p className="text-text-muted text-[10px] font-black uppercase tracking-widest mt-2">
                {stat.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Komponen Pendukung ---

function StatCard({ label, value, icon, color, bgColor }: any) {
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-7 group hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 ${bgColor} ${color} rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform`}
        >
          {icon}
        </div>
        <ArrowUpRight className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <p className="text-text-muted text-xs font-black uppercase tracking-widest">
        {label}
      </p>
      <p className="text-3xl font-black text-text-main mt-1 tracking-tighter">
        {value}
      </p>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-2xl">
      <p className="text-text-muted text-xs font-bold uppercase tracking-widest">
        {message}
      </p>
    </div>
  );
}
