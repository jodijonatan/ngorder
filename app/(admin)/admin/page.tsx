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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Failed to load dashboard data</p>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-400 bg-green-400/10";
      case "pending":
        return "text-yellow-400 bg-yellow-400/10";
      case "cancelled":
        return "text-red-400 bg-red-400/10";
      default:
        return "text-slate-400 bg-slate-400/10";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tighter">
          Dashboard Admin
        </h1>
        <p className="text-slate-500 mt-2">
          Selamat datang di panel admin NGORDER
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#09090b] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">Total Users</p>
              <p className="text-3xl font-black text-white mt-1">
                {data.stats.totalUsers}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#09090b] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">
                Total Products
              </p>
              <p className="text-3xl font-black text-white mt-1">
                {data.stats.totalProducts}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#09090b] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">Total Orders</p>
              <p className="text-3xl font-black text-white mt-1">
                {data.stats.totalOrders}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#09090b] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">
                Total Revenue
              </p>
              <p className="text-3xl font-black text-white mt-1">
                {formatCurrency(data.stats.totalRevenue)}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-[#09090b] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Orders</h2>
            <TrendingUp className="w-5 h-5 text-slate-500" />
          </div>
          <div className="space-y-4">
            {data.recentOrders.length > 0 ? (
              data.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {order.user.name || order.user.email}
                      </p>
                      <p className="text-slate-500 text-sm">
                        {formatCurrency(order.total)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-center py-8">No orders yet</p>
            )}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-[#09090b] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Low Stock Alert</h2>
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div className="space-y-4">
            {data.lowStockProducts.length > 0 ? (
              data.lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 bg-red-500/5 border border-red-500/20 rounded-xl"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{product.name}</p>
                      <p className="text-red-400 text-sm">
                        Stock: {product.stock}
                      </p>
                    </div>
                  </div>
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-center py-8">
                All products are well stocked
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Users */}
      <div className="bg-[#09090b] border border-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Recent Users</h2>
          <UserPlus className="w-5 h-5 text-slate-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.recentUsers.length > 0 ? (
            data.recentUsers.map((user) => (
              <div
                key={user.id}
                className="p-4 bg-white/5 rounded-xl border border-white/5"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-white text-sm">
                    {user.name?.charAt(0)?.toUpperCase() ||
                      user.email.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {user.name || "No name"}
                    </p>
                    <p className="text-slate-500 text-sm">{user.email}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="px-2 py-1 bg-slate-500/10 text-slate-400 text-xs rounded-full">
                    {user.role}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-500 text-center py-8 col-span-full">
              No users yet
            </p>
          )}
        </div>
      </div>

      {/* Order Status Overview */}
      <div className="bg-[#09090b] border border-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            Order Status Overview
          </h2>
          <Clock className="w-5 h-5 text-slate-500" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.orderStatusStats.map((stat) => (
            <div
              key={stat.status}
              className="text-center p-4 bg-white/5 rounded-xl"
            >
              <p className="text-2xl font-black text-white">
                {stat._count.status}
              </p>
              <p className="text-slate-500 text-sm capitalize">{stat.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
