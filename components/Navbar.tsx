"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { useCart } from "@/store/cart";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Store,
  Settings,
  LogOut,
  Heart,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session } = useSession();
  const { items } = useCart();
  const router = useRouter();

  const cartItemCount = items.reduce(
    (total: number, item: { qty: number }) => total + item.qty,
    0,
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDropdownOpen &&
        !(event.target as Element).closest(".user-menu-container")
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-surface/80 backdrop-blur-xl border-b border-white/5 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group shrink-0">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-accent rounded-xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative w-10 h-10 bg-surface border border-white/10 rounded-xl flex items-center justify-center">
                <Store className="w-5 h-5 text-secondary" />
              </div>
            </div>
            <span className="text-2xl font-black tracking-tighter text-text-main uppercase">
              Ng<span className="text-accent">order</span>
            </span>
          </Link>

          {/* Desktop Navigation (Right Side) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Admin Badge if applicable */}
            {session?.user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="text-[10px] font-bold bg-secondary/10 text-secondary border border-secondary/20 px-3 py-1 rounded-full uppercase tracking-widest mr-2"
              >
                Admin Mode
              </Link>
            )}

            {/* Cart Icon */}
            {session?.user?.role !== "ADMIN" && (
              <Link
                href="/cart"
                className="relative p-3 text-text-muted hover:text-text-main hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/5"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute top-2 right-2 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-accent text-[9px] items-center justify-center text-white font-black">
                      {cartItemCount}
                    </span>
                  </span>
                )}
              </Link>
            )}

            <div className="h-8 w-[1px] bg-white/5 mx-2"></div>

            {/* User Profile Dropdown */}
            <div className="relative user-menu-container">
              {session ? (
                <>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-3 p-1.5 pr-4 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.08] transition-all"
                  >
                    <div className="w-8 h-8 bg-gradient-to-tr from-primary to-secondary rounded-xl flex items-center justify-center text-xs font-black text-white shadow-lg shadow-primary/20">
                      {session.user?.name?.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-sm font-bold text-text-main hidden lg:block">
                      {session.user?.name?.split(" ")[0]}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-text-muted transition-transform duration-500 ${isDropdownOpen ? "rotate-180 text-secondary" : ""}`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute right-0 top-full mt-4 w-64 transition-all duration-300 z-50 ${
                      isDropdownOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                  >
                    <div className="bg-surface border border-white/10 rounded-[2rem] shadow-2xl shadow-black/50 overflow-hidden p-3 backdrop-blur-2xl">
                      <div className="px-4 py-4 border-b border-white/5 mb-2">
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-1">
                          Authenticated as
                        </p>
                        <p className="text-sm font-bold text-text-main truncate">
                          {session.user?.email}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <DropdownItem
                          href="/profile"
                          icon={<User className="w-4 h-4" />}
                          label="My Account"
                          onClick={() => setIsDropdownOpen(false)}
                        />
                        <DropdownItem
                          href="/favorites"
                          icon={<Heart className="w-4 h-4" />}
                          label="Wishlist"
                          onClick={() => setIsDropdownOpen(false)}
                        />
                        {session.user?.role === "ADMIN" && (
                          <DropdownItem
                            href="/admin"
                            icon={<Settings className="w-4 h-4" />}
                            label="Dashboard Admin"
                            onClick={() => setIsDropdownOpen(false)}
                          />
                        )}

                        <div className="pt-2 mt-2 border-t border-white/5">
                          <button
                            onClick={() => {
                              setIsDropdownOpen(false);
                              signOut({ callbackUrl: "/" });
                            }}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-sm font-bold"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="bg-accent hover:bg-accent/90 text-white px-8 py-2.5 rounded-2xl text-sm font-black tracking-widest uppercase transition-all shadow-lg shadow-accent/20 active:scale-95"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 text-text-muted hover:bg-white/5 rounded-2xl border border-white/5"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-surface/95 backdrop-blur-2xl z-[-1] transition-all duration-700 md:hidden ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-10">
          {session ? (
            <>
              <MobileNavLink
                href="/profile"
                label="Profile"
                onClick={() => setIsMenuOpen(false)}
              />
              <MobileNavLink
                href="/favorites"
                label="Wishlist"
                onClick={() => setIsMenuOpen(false)}
              />
              <MobileNavLink
                href="/cart"
                label={`Cart (${cartItemCount})`}
                onClick={() => setIsMenuOpen(false)}
              />
              <button
                onClick={() => signOut()}
                className="text-red-500 font-black text-2xl uppercase tracking-tighter"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className="text-accent font-black text-4xl uppercase tracking-tighter"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

// Sub-components
function DropdownItem({ href, icon, label, onClick }: any) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center space-x-3 px-4 py-3 text-sm text-text-muted hover:bg-white/5 hover:text-text-main rounded-xl transition-all font-medium"
    >
      <span className="text-secondary">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

function MobileNavLink({ href, label, onClick }: any) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-text-main font-black text-4xl uppercase tracking-tighter hover:text-secondary transition-colors"
    >
      {label}
    </Link>
  );
}
