"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  // Base styles: fokus pada tipografi bold dan uppercase agar serasi dengan dashboard
  const baseStyles =
    "relative inline-flex items-center justify-center font-black uppercase tracking-[0.2em] text-[10px] rounded-xl transition-all duration-300 active:scale-95 overflow-hidden disabled:opacity-50 disabled:pointer-events-none";

  // Variasi warna sesuai Global CSS
  const variants = {
    primary:
      "bg-text-main text-surface hover:shadow-[0_0_20px_rgba(var(--secondary-rgb),0.3)] hover:scale-[1.02]",
    secondary:
      "bg-secondary text-surface shadow-lg shadow-secondary/20 hover:bg-secondary/90",
    accent:
      "bg-accent text-surface shadow-lg shadow-accent/20 hover:bg-accent/90",
    outline:
      "border-2 border-white/10 text-text-main hover:border-secondary/50 hover:bg-white/[0.02]",
    ghost: "text-text-muted hover:text-text-main hover:bg-white/[0.05]",
    danger:
      "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white",
  };

  // Ukuran padding
  const sizes = {
    sm: "px-4 py-2 text-[9px]",
    md: "px-8 py-4",
    lg: "px-10 py-5 text-[11px]",
  };

  return (
    <button
      {...props}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {/* Efek Gradient Overlay untuk varian primary */}
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 hover:opacity-100 transition-opacity duration-300 -z-0" />
      )}

      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
