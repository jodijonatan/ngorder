"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Users,
  User,
  Shield,
  Mail,
  Crown,
  Edit,
  Trash2,
  Plus,
  Search,
  ArrowRight,
  Loader2,
  Fingerprint,
} from "lucide-react";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
  orderCount: number;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== userId));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const totalUsers = users.length;
  const adminUsers = users.filter((u) => u.role === "ADMIN").length;
  const regularUsers = users.filter((u) => u.role === "USER").length;
  const totalOrders = users.reduce((sum, user) => sum + user.orderCount, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-secondary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-text-main pb-20 relative overflow-x-hidden">
      {/* Ambience Glow */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-secondary group">
              <div className="p-2 bg-secondary/10 rounded-lg group-hover:bg-secondary group-hover:text-surface transition-all">
                <Fingerprint className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                Identity Access Management
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              User <span className="text-text-muted font-light">Database</span>
            </h1>
          </div>

          <Link
            href="/admin/users/create"
            className="group relative inline-flex items-center justify-center bg-white text-black font-black px-10 py-5 rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-white/5"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Plus className="relative w-5 h-5 mr-3 group-hover:text-white transition-colors" />
            <span className="relative group-hover:text-white transition-colors text-[10px] tracking-widest uppercase">
              Register New Entity
            </span>
          </Link>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              label: "Total Population",
              val: totalUsers,
              sub: "Entities",
              icon: Users,
              color: "text-secondary",
            },
            {
              label: "Privileged",
              val: adminUsers,
              sub: "Admins",
              icon: Crown,
              color: "text-red-500",
            },
            {
              label: "Standard",
              val: regularUsers,
              sub: "Users",
              icon: User,
              color: "text-blue-500",
            },
            {
              label: "Total Activity",
              val: totalOrders,
              sub: "Transactions",
              icon: Shield,
              color: "text-accent",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-secondary/20 transition-all backdrop-blur-sm"
            >
              <stat.icon
                className={`absolute -right-4 -top-4 w-24 h-24 opacity-[0.03] group-hover:opacity-[0.08] transition-all group-hover:scale-110 ${stat.color}`}
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

        {/* Search Field */}
        <div className="relative mb-12">
          <div className="absolute left-6 top-1/2 -translate-y-1/2">
            <Search className="w-5 h-5 text-text-muted" />
          </div>
          <input
            type="text"
            placeholder="Scan directory by name, email, or identity hash..."
            className="w-full bg-white/[0.02] border border-white/5 pl-16 pr-8 py-6 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:bg-white/[0.05] transition-all placeholder:text-text-muted/30 font-medium"
          />
        </div>

        {/* Section Divider */}
        <div className="flex items-center mb-8 px-2 space-x-6">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] whitespace-nowrap">
            Registered Identities
          </h2>
          <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        {/* Users Cards Grid */}
        <div className="relative">
          {users.length === 0 ? (
            <div className="bg-white/[0.01] border-2 border-dashed border-white/5 rounded-[3rem] py-32 text-center">
              <Users className="w-16 h-16 text-text-muted/20 mx-auto mb-6" />
              <h3 className="text-xl font-bold opacity-50 uppercase tracking-tighter">
                Directory Empty
              </h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="group bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 hover:bg-secondary/[0.02] hover:border-secondary/20 transition-all duration-500 backdrop-blur-md"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center font-black text-xl text-secondary">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div className="max-w-[150px]">
                        <h3 className="text-sm font-black tracking-widest uppercase truncate">
                          {user.name || "Anonymous"}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1 opacity-50">
                          <Mail className="w-3 h-3" />
                          <span className="text-[10px] font-bold uppercase truncate">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border flex items-center space-x-2 ${
                        user.role === "ADMIN"
                          ? "bg-red-500/10 text-red-500 border-red-500/20"
                          : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      }`}
                    >
                      {user.role === "ADMIN" ? (
                        <Crown className="w-3 h-3" />
                      ) : (
                        <User className="w-3 h-3" />
                      )}
                      <span>{user.role}</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-end border-b border-white/5 pb-4">
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                        Transactions
                      </span>
                      <span className="text-xl font-black text-secondary italic">
                        {user.orderCount}{" "}
                        <span className="text-[9px] not-italic text-text-muted">
                          Total
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                      <span className="text-text-muted">Access Level</span>
                      <span className="text-text-main">
                        {user.role === "ADMIN"
                          ? "Full Protocol"
                          : "Limited Access"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href={`/admin/users/${user.id}/edit`}
                      className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                    >
                      <Edit className="w-3.5 h-3.5 text-secondary" />
                      <span>Configure</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="flex items-center justify-center space-x-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Purge</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* System Info Footer */}
        <div className="mt-20 p-10 bg-gradient-to-br from-white/[0.03] to-transparent rounded-[3rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-6">
            <div className="w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center shadow-lg shadow-secondary/10">
              <Shield className="w-7 h-7 text-secondary" />
            </div>
            <div>
              <h4 className="text-lg font-black uppercase tracking-tighter italic text-text-main">
                Access Enforcement
              </h4>
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.2em]">
                All administrative actions are logged and encrypted
              </p>
            </div>
          </div>
          <button className="px-8 py-4 bg-text-main text-surface text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-secondary transition-all flex items-center group cursor-pointer">
            Export Records
            <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
