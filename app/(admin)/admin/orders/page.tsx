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
  User,
  ArrowRight,
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

  // Statistik tetap sama
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "PENDING").length;
  const completedOrders = orders.filter((o) => o.status === "COMPLETED").length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Clock className="w-3.5 h-3.5" />;
      case "COMPLETED":
        return <CheckCircle className="w-3.5 h-3.5" />;
      case "CANCELLED":
        return <XCircle className="w-3.5 h-3.5" />;
      default:
        return <AlertCircle className="w-3.5 h-3.5" />;
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "COMPLETED":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "CANCELLED":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-text-muted/10 text-text-muted border-text-muted/20";
    }
  };

  return (
    <div className="min-h-screen bg-surface text-text-main pb-20 overflow-x-hidden">
      {/* Dynamic Ambience Glow */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-secondary/10 blur-[150px] -z-10 pointer-events-none opacity-50" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 blur-[120px] -z-10 pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-6 pt-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-secondary group">
              <div className="p-2 bg-secondary/10 rounded-lg group-hover:bg-secondary group-hover:text-surface transition-all">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                System Logistics
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              Order <span className="text-text-muted font-light">History</span>
            </h1>
          </div>

          <button className="inline-flex items-center bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest px-6 py-4 rounded-2xl hover:bg-white/10 transition-all active:scale-95">
            <Filter className="w-4 h-4 mr-3 text-secondary" />
            Filter Database
          </button>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              label: "Total Volume",
              val: totalOrders,
              sub: "Packages",
              icon: ShoppingCart,
              color: "secondary",
            },
            {
              label: "On Queue",
              val: pendingOrders,
              sub: "Pending",
              icon: Clock,
              color: "yellow-500",
            },
            {
              label: "Dispatched",
              val: completedOrders,
              sub: "Done",
              icon: CheckCircle,
              color: "emerald-500",
            },
            {
              label: "Revenue",
              val: `Rp ${totalRevenue.toLocaleString("id-ID")}`,
              sub: "Gross",
              icon: DollarSign,
              color: "accent",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-secondary/20 transition-all"
            >
              <stat.icon
                className={`absolute -right-4 -top-4 w-24 h-24 opacity-[0.03] group-hover:opacity-[0.07] transition-all group-hover:scale-110 text-${stat.color}`}
              />
              <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-60">
                {stat.label}
              </p>
              <h3 className="text-3xl font-black italic tracking-tighter">
                {stat.val}{" "}
                <span className="text-[10px] not-italic font-bold text-text-muted uppercase tracking-widest">
                  {stat.sub}
                </span>
              </h3>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-12">
          <div className="absolute left-6 top-1/2 -translate-y-1/2">
            <Search className="w-5 h-5 text-text-muted" />
          </div>
          <input
            type="text"
            placeholder="Query by ID, customer name, or status identifier..."
            className="w-full bg-white/[0.02] border border-white/5 pl-16 pr-8 py-6 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:bg-white/[0.05] transition-all placeholder:text-text-muted/30 font-medium"
          />
        </div>

        {/* Live List Header */}
        <div className="flex items-center mb-8 px-2 space-x-6">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] whitespace-nowrap">
            Recent Transactions
          </h2>
          <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        {/* Orders Grid */}
        {orders.length === 0 ? (
          <div className="bg-white/[0.01] border-2 border-dashed border-white/5 rounded-[3rem] py-32 text-center">
            <Package className="w-16 h-16 text-text-muted/20 mx-auto mb-6" />
            <h3 className="text-xl font-bold opacity-50 uppercase tracking-tighter">
              No Active Protocols
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="group bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 hover:bg-secondary/[0.02] hover:border-secondary/20 transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
                      <Package className="w-6 h-6 text-text-muted group-hover:text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black tracking-widest uppercase">
                        #{order.id.slice(-8)}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <User className="w-3 h-3 text-text-muted" />
                        <span className="text-[10px] font-bold text-text-muted uppercase">
                          User: {order.userId.slice(-6)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border flex items-center space-x-2 ${getStatusStyles(order.status)}`}
                  >
                    {getStatusIcon(order.status)}
                    <span>{order.status}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-end border-b border-white/5 pb-4">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                      Amount
                    </span>
                    <span className="text-xl font-black text-secondary italic">
                      Rp {order.total.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-text-muted">Timestamp</span>
                    <span>
                      {new Date(order.id).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Details</span>
                  </Link>
                  <button className="flex items-center justify-center space-x-2 bg-secondary/10 text-secondary hover:bg-secondary hover:text-surface py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                    <Edit className="w-3.5 h-3.5" />
                    <span>Update</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Action */}
        <div className="mt-20 p-10 bg-gradient-to-br from-white/[0.03] to-transparent rounded-[3rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-6">
            <div className="w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center shadow-lg shadow-secondary/10">
              <Package className="w-7 h-7 text-secondary" />
            </div>
            <div>
              <h4 className="text-lg font-black uppercase tracking-tighter italic">
                Batch Export Utility
              </h4>
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.2em]">
                Generate financial reports for current cycle
              </p>
            </div>
          </div>
          <button className="px-8 py-4 bg-text-main text-surface text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-secondary transition-all flex items-center group cursor-pointer">
            Download CSV
            <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
