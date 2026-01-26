"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Users,
  User,
  Shield,
  Mail,
  Calendar,
  Crown,
  UserCheck,
  UserX,
  Edit,
  Trash2,
  Plus,
  Search,
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
      } else {
        alert("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Error fetching users");
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
        alert("User deleted successfully");
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user");
    }
  };

  // Calculate statistics
  const totalUsers = users.length;
  const adminUsers = users.filter((u) => u.role === "ADMIN").length;
  const regularUsers = users.filter((u) => u.role === "USER").length;
  const totalOrders = users.reduce((sum, user) => sum + user.orderCount, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] text-slate-200 pb-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 pb-20">
      {/* Decorative Glow */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-12">
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center space-x-2 text-purple-400 mb-3">
              <Users className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-[0.3em]">
                User Management
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              USER <span className="text-slate-600 font-light">MANAGEMENT</span>
            </h1>
          </div>

          <Link
            href="/admin/users/create"
            className="group relative inline-flex items-center justify-center bg-white text-black font-black px-8 py-4 rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-white/5"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Plus className="relative w-5 h-5 mr-2 group-hover:text-white transition-colors" />
            <span className="relative group-hover:text-white transition-colors">
              TAMBAH USER
            </span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Users */}
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-4 right-4 text-slate-800 group-hover:text-purple-500/20 transition-colors">
              <Users className="w-12 h-12 transition-transform group-hover:scale-110" />
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">
              Total Users
            </p>
            <h3 className="text-3xl font-black text-white italic">
              {totalUsers}{" "}
              <span className="text-sm font-normal not-italic text-slate-600">
                Accounts
              </span>
            </h3>
          </div>

          {/* Admin Users */}
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-4 right-4 text-slate-800 group-hover:text-red-500/20 transition-colors">
              <Crown className="w-12 h-12 transition-transform group-hover:scale-110" />
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">
              Admin Users
            </p>
            <h3 className="text-3xl font-black text-white italic">
              {adminUsers}{" "}
              <span className="text-sm font-normal not-italic text-slate-600">
                Admins
              </span>
            </h3>
          </div>

          {/* Regular Users */}
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-4 right-4 text-slate-800 group-hover:text-blue-500/20 transition-colors">
              <User className="w-12 h-12 transition-transform group-hover:scale-110" />
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">
              Regular Users
            </p>
            <h3 className="text-3xl font-black text-white italic">
              {regularUsers}{" "}
              <span className="text-sm font-normal not-italic text-slate-600">
                Users
              </span>
            </h3>
          </div>

          {/* Total Orders */}
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-4 right-4 text-slate-800 group-hover:text-emerald-500/20 transition-colors">
              <Shield className="w-12 h-12 transition-transform group-hover:scale-110" />
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
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="flex items-center bg-white/5 border border-white/5 px-4 py-3 rounded-xl group focus-within:border-purple-500/50 transition-all">
            <Search className="w-4 h-4 text-slate-500 group-focus-within:text-purple-400" />
            <input
              type="text"
              placeholder="Cari user berdasarkan nama atau email..."
              className="bg-transparent border-none outline-none text-sm ml-3 text-white placeholder-slate-600 w-full"
            />
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Daftar User
            </h2>
            <span className="bg-white/10 text-[10px] font-black px-2 py-1 rounded-md text-slate-400 uppercase tracking-tighter">
              Live Database
            </span>
          </div>
          <div className="h-[1px] flex-1 bg-white/5 mx-6 hidden md:block"></div>
        </div>

        {/* Users Grid */}
        <div className="relative">
          {users.length === 0 ? (
            <div className="bg-white/[0.01] border border-dashed border-white/10 rounded-[3rem] py-32 text-center">
              <div className="inline-flex p-6 bg-slate-900 rounded-full mb-6 border border-white/5">
                <Users className="w-12 h-12 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Belum Ada User
              </h3>
              <p className="text-slate-500 max-w-xs mx-auto text-sm">
                Belum ada user yang terdaftar. Klik tombol tambah untuk membuat
                akun baru.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 backdrop-blur-md hover:bg-white/[0.04] transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center font-bold text-sm">
                        {user.name?.charAt(0).toUpperCase() ||
                          user.email.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {user.name || "Unnamed User"}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <Mail className="w-3 h-3 text-slate-500" />
                          <span className="text-sm text-slate-500">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        user.role === "ADMIN"
                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                          : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      }`}
                    >
                      {user.role === "ADMIN" ? (
                        <div className="flex items-center space-x-1">
                          <Crown className="w-3 h-3" />
                          <span>Admin</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>User</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Role</span>
                      <span className="text-white font-semibold">
                        {user.role}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Status</span>
                      <span className="text-white font-semibold">Active</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Link
                      href={`/admin/users/${user.id}/edit`}
                      className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center space-x-1"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </Link>
                    <button className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center space-x-1">
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
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
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Manajemen User Aman
              </h4>
              <p className="text-xs text-slate-500 uppercase tracking-wider">
                Pastikan hanya admin yang dapat mengakses halaman ini.
              </p>
            </div>
          </div>
          <button className="text-[10px] font-black text-slate-400 hover:text-white transition-colors tracking-widest uppercase">
            Export User Data
          </button>
        </div>
      </div>
    </div>
  );
}
