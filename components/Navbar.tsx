"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useCart } from "@/store/cart";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Home,
  Store,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
  Heart,
} from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { data: session } = useSession();
  const { items } = useCart();
  const cartItemCount = items.reduce(
    (total: number, item: { qty: number }) => total + item.qty,
    0,
  );

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-purple-500/20 shadow-lg shadow-purple-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Store className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ngorder
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200 group"
            >
              <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Beranda</span>
            </Link>

            <Link
              href="/shop"
              className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200 group"
            >
              <Store className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Belanja</span>
            </Link>

            <Link
              href="/cart"
              className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200 group"
            >
              <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Keranjang</span>
            </Link>

            {session?.user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200 group"
              >
                <Settings className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Admin</span>
              </Link>
            )}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Cari produk..."
                className="w-full bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Toggle */}
            <button
              onClick={toggleSearch}
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-400 hover:text-white transition-colors duration-200 group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 p-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden lg:block text-sm">
                  {session?.user?.name || "Akun"}
                </span>
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-2 z-50">
                  {session ? (
                    <>
                      <div className="px-4 py-2 border-b border-slate-700">
                        <p className="text-sm text-gray-300">
                          {session.user?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {session.user?.email}
                        </p>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-white transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Profil</span>
                      </Link>
                      <Link
                        href="/favorites"
                        className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-white transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Heart className="w-4 h-4" />
                        <span>Favorit</span>
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-white transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Keluar</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          signIn();
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-white transition-colors duration-200"
                      >
                        <LogIn className="w-4 h-4" />
                        <span>Masuk</span>
                      </button>
                      <Link
                        href="/register"
                        className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-white transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>Daftar</span>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari produk..."
                className="w-full bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-700 pt-4 pb-2">
            <div className="space-y-2">
              <Link
                href="/"
                className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:bg-slate-700 hover:text-white rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="w-4 h-4" />
                <span>Beranda</span>
              </Link>

              <Link
                href="/shop"
                className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:bg-slate-700 hover:text-white rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Store className="w-4 h-4" />
                <span>Belanja</span>
              </Link>

              <Link
                href="/cart"
                className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:bg-slate-700 hover:text-white rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Keranjang</span>
                {cartItemCount > 0 && (
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {session?.user?.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:bg-slate-700 hover:text-white rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="w-4 h-4" />
                  <span>Admin</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
