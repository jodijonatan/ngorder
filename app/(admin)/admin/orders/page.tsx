import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import {
  ShoppingCart,
  Package,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Search,
  Filter,
  Calendar,
  User,
} from "lucide-react";

export default async function AdminOrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    redirect("/");
  }

  const orders = await prisma.order.findMany({
    include: {
      user: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  // Calculate statistics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "PENDING").length;
  const completedOrders = orders.filter((o) => o.status === "COMPLETED").length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case "COMPLETED":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "CANCELLED":
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "COMPLETED":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "CANCELLED":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 pb-20">
      {/* Decorative Glow */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-12">
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center space-x-2 text-purple-400 mb-3">
              <ShoppingCart className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-[0.3em]">
                Order Management
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              ORDER{" "}
              <span className="text-slate-600 font-light">MANAGEMENT</span>
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="group relative inline-flex items-center justify-center bg-white/5 border border-white/5 text-white font-semibold px-6 py-3 rounded-2xl transition-all hover:bg-white/10 hover:border-white/10">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Orders */}
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-4 right-4 text-slate-800 group-hover:text-purple-500/20 transition-colors">
              <ShoppingCart className="w-12 h-12 transition-transform group-hover:scale-110" />
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">
              Total Orders
            </p>
            <h3 className="text-3xl font-black text-white italic">
              {totalOrders}{" "}
              <span className="text-sm font-normal not-italic text-slate-600">
                Orders
              </span>
            </h3>
          </div>

          {/* Pending Orders */}
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-4 right-4 text-slate-800 group-hover:text-yellow-500/20 transition-colors">
              <Clock className="w-12 h-12 transition-transform group-hover:scale-110" />
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">
              Pending Orders
            </p>
            <h3 className="text-3xl font-black text-white italic">
              {pendingOrders}{" "}
              <span className="text-sm font-normal not-italic text-slate-600">
                Pending
              </span>
            </h3>
          </div>

          {/* Completed Orders */}
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-4 right-4 text-slate-800 group-hover:text-green-500/20 transition-colors">
              <CheckCircle className="w-12 h-12 transition-transform group-hover:scale-110" />
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">
              Completed Orders
            </p>
            <h3 className="text-3xl font-black text-white italic">
              {completedOrders}{" "}
              <span className="text-sm font-normal not-italic text-slate-600">
                Completed
              </span>
            </h3>
          </div>

          {/* Total Revenue */}
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-4 right-4 text-slate-800 group-hover:text-emerald-500/20 transition-colors">
              <DollarSign className="w-12 h-12 transition-transform group-hover:scale-110" />
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">
              Total Revenue
            </p>
            <h3 className="text-3xl font-black text-white italic">
              <span className="text-sm not-italic mr-1 text-emerald-500">
                Rp
              </span>
              {totalRevenue.toLocaleString("id-ID")}
            </h3>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex items-center bg-white/5 border border-white/5 px-4 py-3 rounded-xl group focus-within:border-purple-500/50 transition-all">
            <Search className="w-4 h-4 text-slate-500 group-focus-within:text-purple-400" />
            <input
              type="text"
              placeholder="Cari order berdasarkan ID, nama customer, atau status..."
              className="bg-transparent border-none outline-none text-sm ml-3 text-white placeholder-slate-600 w-full"
            />
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Daftar Pesanan
            </h2>
            <span className="bg-white/10 text-[10px] font-black px-2 py-1 rounded-md text-slate-400 uppercase tracking-tighter">
              Live Database
            </span>
          </div>
          <div className="h-[1px] flex-1 bg-white/5 mx-6 hidden md:block"></div>
        </div>

        {/* Orders Grid */}
        <div className="relative">
          {orders.length === 0 ? (
            <div className="bg-white/[0.01] border border-dashed border-white/10 rounded-[3rem] py-32 text-center">
              <div className="inline-flex p-6 bg-slate-900 rounded-full mb-6 border border-white/5">
                <ShoppingCart className="w-12 h-12 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Belum Ada Pesanan
              </h3>
              <p className="text-slate-500 max-w-xs mx-auto text-sm">
                Belum ada pesanan yang tercatat. Pesanan baru akan muncul di
                sini.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 backdrop-blur-md hover:bg-white/[0.04] transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center font-bold text-sm">
                        <Package className="w-6 h-6 text-slate-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          Order #{order.id.slice(-8)}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3 text-slate-500" />
                          <span className="text-sm text-slate-500">
                            Customer ID: {order.userId.slice(-8)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center space-x-1 ${getStatusColor(order.status)}`}
                    >
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Total</span>
                      <span className="text-white font-semibold">
                        Rp {order.total.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Tanggal</span>
                      <span className="text-white font-semibold">
                        {new Date().toLocaleDateString("id-ID")}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </Link>
                    <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center space-x-1">
                      <Edit className="w-4 h-4" />
                      <span>Update</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Tips/Footer */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 p-8 bg-gradient-to-r from-purple-900/10 to-transparent rounded-[2rem] border border-white/5">
          <div className="flex items-center space-x-4 text-center md:text-left">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Package className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Manajemen Pesanan Efisien
              </h4>
              <p className="text-xs text-slate-500 uppercase tracking-wider">
                Kelola semua pesanan dari satu tempat untuk efisiensi maksimal.
              </p>
            </div>
          </div>
          <button className="text-[10px] font-black text-slate-400 hover:text-white transition-colors tracking-widest uppercase">
            Export Orders Data
          </button>
        </div>
      </div>
    </div>
  );
}
