"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Hash,
  FileText,
  Save,
  Loader2,
  Sparkles,
  Image as ImageIcon,
  Link as LinkIcon,
} from "lucide-react";

export default function CreateProductPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user?.role !== "ADMIN") {
      router.push("/");
    }
  }, [session, status, router]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const slug = generateSlug(name);

      const response = await fetch("/api/admin/products", {
        method: "POST",
        body: JSON.stringify({
          name,
          slug,
          price: parseFloat(price),
          stock: parseInt(stock),
          description,
          image: imageUrl || null,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        router.push("/admin/products");
      } else {
        const data = await response.json();
        setError(data.error || "Gagal menyimpan produk.");
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface relative overflow-hidden pb-20">
      {/* Background Ambience - Synchronized with theme */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-4xl mx-auto px-6 pt-12 relative z-10">
        {/* Breadcrumb & Navigation */}
        <Link
          href="/admin/products"
          className="group inline-flex items-center text-text-muted hover:text-text-main transition-all mb-8"
        >
          <div className="p-2 bg-white/5 rounded-lg mr-3 group-hover:bg-secondary/20 group-hover:text-secondary transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            Back to Inventory
          </span>
        </Link>

        {/* Page Title */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-2">
            <Sparkles className="w-5 h-5 text-secondary" />
            <span className="text-[10px] font-black text-secondary uppercase tracking-[0.4em]">
              New Collection
            </span>
          </div>
          <h1 className="text-5xl font-black text-text-main tracking-tighter uppercase">
            Publish <span className="text-text-muted font-light">Product</span>
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Left Column: Media Upload */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[10px] font-black text-text-main uppercase tracking-[0.2em] flex items-center">
                  <ImageIcon className="w-4 h-4 mr-2 text-secondary" /> Media
                  Asset
                </h3>
              </div>

              {/* Image URL Preview */}
              {imageUrl && (
                <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl mb-4">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full aspect-square object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Image URL Input */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] ml-1">
                  Image URL
                </label>
                <div className="relative group">
                  <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-secondary transition-colors" />
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-black/20 border border-white/5 rounded-2xl pl-14 pr-6 py-5 text-text-main text-sm font-medium focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/50 transition-all placeholder:text-text-muted/30"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <p className="text-[9px] text-text-muted font-bold uppercase tracking-widest opacity-50 ml-1">
                  Masukkan URL gambar produk (PNG, JPG)
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-xl space-y-8">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-[10px] font-black animate-pulse uppercase tracking-widest">
                  ⚠️ Error: {error}
                </div>
              )}

              {/* Product Name */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] ml-1">
                  Information Title
                </label>
                <div className="relative group">
                  <Package className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-secondary transition-colors" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/20 border border-white/5 rounded-2xl pl-14 pr-6 py-5 text-text-main text-sm font-medium focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/50 transition-all placeholder:text-text-muted/30"
                    placeholder="Contoh: Premium Oversized Hoodie"
                  />
                </div>
              </div>

              {/* Price & Stock Row */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] ml-1">
                    Price (IDR)
                  </label>
                  <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-xs font-black text-text-muted group-focus-within:text-secondary">
                      Rp
                    </div>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full bg-black/20 border border-white/5 rounded-2xl pl-14 pr-6 py-5 text-text-main text-sm font-black focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/50 transition-all"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] ml-1">
                    Inventory
                  </label>
                  <div className="relative group">
                    <Hash className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-secondary transition-colors" />
                    <input
                      type="number"
                      required
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="w-full bg-black/20 border border-white/5 rounded-2xl pl-14 pr-6 py-5 text-text-main text-sm font-black focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/50 transition-all"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] ml-1">
                  Product Narration
                </label>
                <div className="relative group">
                  <FileText className="absolute left-5 top-6 w-5 h-5 text-text-muted group-focus-within:text-secondary transition-colors" />
                  <textarea
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-black/20 border border-white/5 rounded-[2rem] pl-14 pr-6 py-6 text-text-main text-sm font-medium focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/50 transition-all resize-none placeholder:text-text-muted/30"
                    placeholder="Jelaskan detail material, ukuran, dan keunggulan produk..."
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4 pt-6">
                <Link
                  href="/admin/products"
                  className="flex-1 px-6 py-5 rounded-2xl bg-white/5 text-text-muted font-black text-[10px] uppercase tracking-[0.2em] text-center hover:bg-white/10 hover:text-text-main transition-all border border-white/5"
                >
                  Discard
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-[2] relative group overflow-hidden bg-accent text-white font-black py-5 rounded-2xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 shadow-xl shadow-accent/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-center justify-center space-x-3">
                    {saving ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span className="text-[10px] uppercase tracking-[0.2em]">
                          Publish to Store
                        </span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
