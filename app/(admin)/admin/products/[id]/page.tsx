"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  DollarSign,
  Hash,
  FileText,
  Save,
  Loader2,
  Sparkles,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
        setFormData({
          name: data.name,
          price: data.price.toString(),
          stock: data.stock.toString(),
          description: data.description || "",
        });
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/admin/products`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: productId,
          name: formData.name,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          description: formData.description,
        }),
      });

      if (response.ok) {
        router.push("/admin/products");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-secondary animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center space-y-4">
        <div className="p-4 bg-white/5 rounded-full text-text-muted">
          <Package size={40} />
        </div>
        <h1 className="text-xl font-black text-text-main uppercase tracking-widest">
          Product Not Found
        </h1>
        <Link
          href="/admin/products"
          className="text-secondary text-xs font-bold uppercase underline"
        >
          Return to Inventory
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface relative overflow-hidden pb-20 px-6 pt-12">
      {/* Ambience Background */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Navigation */}
        <Link
          href="/admin/products"
          className="group inline-flex items-center text-text-muted hover:text-text-main transition-all mb-8"
        >
          <div className="p-2 bg-white/5 rounded-lg mr-3 group-hover:bg-secondary/20 group-hover:text-secondary transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            Discard Changes
          </span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-2">
            <Sparkles className="w-5 h-5 text-secondary" />
            <span className="text-[10px] font-black text-secondary uppercase tracking-[0.4em]">
              Product Modification
            </span>
          </div>
          <h1 className="text-5xl font-black text-text-main tracking-tighter uppercase leading-none">
            Update <span className="text-text-muted font-light">Asset</span>
          </h1>
          <p className="text-text-muted text-[10px] font-bold uppercase tracking-widest mt-4 opacity-50">
            ID: {productId}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-xl space-y-8 shadow-2xl">
            {/* Name Input */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] ml-1">
                Product Title
              </label>
              <div className="relative group">
                <Package className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-secondary transition-colors" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/20 border border-white/5 rounded-2xl pl-14 pr-6 py-5 text-text-main text-sm font-medium focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/50 transition-all"
                  placeholder="Enter product title..."
                />
              </div>
            </div>

            {/* Price & Stock Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full bg-black/20 border border-white/5 rounded-2xl pl-14 pr-6 py-5 text-text-main text-sm font-black focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/50 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] ml-1">
                  Available Stock
                </label>
                <div className="relative group">
                  <Hash className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-secondary transition-colors" />
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full bg-black/20 border border-white/5 rounded-2xl pl-14 pr-6 py-5 text-text-main text-sm font-black focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/50 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Description Input */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] ml-1">
                Description Narration
              </label>
              <div className="relative group">
                <FileText className="absolute left-5 top-6 w-5 h-5 text-text-muted group-focus-within:text-secondary transition-colors" />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-black/20 border border-white/5 rounded-[2rem] pl-14 pr-6 py-6 text-text-main text-sm font-medium focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/50 transition-all resize-none"
                  placeholder="Tell the story about this product..."
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={saving}
                className="flex-[2] relative group overflow-hidden bg-accent text-white font-black py-5 rounded-2xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 shadow-xl shadow-accent/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center justify-center space-x-3">
                  {saving ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span className="text-[10px] uppercase tracking-[0.2em]">
                        Commit Changes
                      </span>
                    </>
                  )}
                </div>
              </button>

              <button
                type="button"
                onClick={() => router.push("/admin/products")}
                className="flex-1 px-6 py-5 rounded-2xl bg-white/5 text-text-muted font-black text-[10px] uppercase tracking-[0.2em] border border-white/5 hover:bg-white/10 hover:text-text-main transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
