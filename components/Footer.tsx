"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
  Heart,
  ShoppingBag,
  Truck,
  Shield,
  CreditCard,
} from "lucide-react";

export default function Footer() {
  return (
    // Menggunakan gradient dari primary (Navy) ke surface
    <footer className="relative bg-gradient-to-br from-primary via-primary/95 to-surface border-t border-white/10 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-secondary/3 to-accent/3 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              {/* Icon Container menggunakan gradient secondary-accent */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-secondary to-accent mb-6 shadow-xl shadow-accent/20">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 tracking-tight">
                Stay in the Loop
              </h3>
              <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
                Get exclusive deals, new product alerts, and fashion tips
                delivered straight to your inbox.
              </p>
              <div className="max-w-md mx-auto">
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-all"
                  />
                  <button className="bg-accent hover:opacity-90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-accent/25">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center space-x-2 group mb-6">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-accent rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                  <div className="relative w-10 h-10 bg-primary border border-white/10 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-secondary group-hover:text-accent transition-colors" />
                  </div>
                </div>
                <span className="text-2xl font-black tracking-tighter text-white">
                  NG<span className="text-accent">ORDER</span>
                </span>
              </Link>
              <p className="text-white/60 mb-6 leading-relaxed">
                Your ultimate destination for fashion-forward clothing and
                accessories. Discover the latest trends with unbeatable quality
                and style.
              </p>
              <div className="flex space-x-4">
                {/* Social Media Links dengan warna Brand */}
                <SocialLink
                  href="#"
                  icon={<Facebook className="w-5 h-5" />}
                  hoverClass="hover:bg-secondary/20 hover:border-secondary/50"
                />
                <SocialLink
                  href="#"
                  icon={<Instagram className="w-5 h-5" />}
                  hoverClass="hover:bg-accent/20 hover:border-accent/50"
                />
                <SocialLink
                  href="#"
                  icon={<Twitter className="w-5 h-5" />}
                  hoverClass="hover:bg-secondary/20 hover:border-secondary/50"
                />
                <SocialLink
                  href="#"
                  icon={<Youtube className="w-5 h-5" />}
                  hoverClass="hover:bg-red-500/20 hover:border-red-500/50"
                />
              </div>
            </div>

            {/* Quick Links */}
            <FooterColumn title="Quick Links">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/shop">Shop</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </FooterColumn>

            {/* Customer Service */}
            <FooterColumn title="Customer Service">
              <FooterLink href="/help">Help Center</FooterLink>
              <FooterLink href="/shipping">Shipping Info</FooterLink>
              <FooterLink href="/returns">Returns & Exchanges</FooterLink>
              <FooterLink href="/size-guide">Size Guide</FooterLink>
            </FooterColumn>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6 relative">
                Get in Touch
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-accent rounded-full"></div>
              </h4>
              <div className="space-y-4">
                <ContactItem
                  icon={<MapPin className="w-5 h-5 text-accent" />}
                  text="Style City, SC 12345"
                />
                <ContactItem
                  icon={<Phone className="w-5 h-5 text-accent" />}
                  text="+1 (555) 123-4567"
                />
                <ContactItem
                  icon={<Mail className="w-5 h-5 text-accent" />}
                  text="hello@ngorder.com"
                />
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <TrustBadge
                    icon={<Shield className="w-4 h-4" />}
                    text="Secure"
                  />
                  <TrustBadge
                    icon={<Truck className="w-4 h-4" />}
                    text="Fast"
                  />
                  <TrustBadge
                    icon={<CreditCard className="w-4 h-4" />}
                    text="SSL"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 bg-black/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-white/40">
                © 2026{" "}
                <span className="text-accent font-semibold">NGORDER</span>. All
                rights reserved.
              </p>
              <div className="flex items-center space-x-6 text-sm">
                <Link
                  href="/privacy"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  Terms
                </Link>
                <Link
                  href="/cookies"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Made with Love */}
        <div className="text-center py-4 border-t border-white/5">
          <p className="text-white/20 text-xs flex items-center justify-center">
            Made with{" "}
            <Heart className="w-4 h-4 text-accent mx-1 animate-pulse" /> for
            fashion lovers
          </p>
        </div>
      </div>
    </footer>
  );
}

// Helper Components untuk menjaga konsistensi warna
function SocialLink({
  href,
  icon,
  hoverClass,
}: {
  href: string;
  icon: React.ReactNode;
  hoverClass: string;
}) {
  return (
    <a
      href={href}
      className={`w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 ${hoverClass}`}
    >
      {icon}
    </a>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="text-white font-bold text-lg mb-6 relative">
        {title}
        <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-secondary rounded-full"></div>
      </h4>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-white/60 hover:text-accent transition-colors duration-300 flex items-center group"
      >
        <span className="w-1.5 h-1.5 bg-accent rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        {children}
      </Link>
    </li>
  );
}

function ContactItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center space-x-3">
      {icon}
      <p className="text-white/60 text-sm">{text}</p>
    </div>
  );
}

function TrustBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center space-x-2 text-white/30">
      {icon}
      <span className="text-[10px] uppercase tracking-wider">{text}</span>
    </div>
  );
}
