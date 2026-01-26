"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/products", {
      method: "POST",
      body: JSON.stringify({ name, price, stock, description }),
      headers: { "Content-Type": "application/json" },
    });
    router.push("/admin/products");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tambah Produk</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          type="text"
          placeholder="Nama Produk"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded bg-neutral-800"
          required
        />
        <input
          type="number"
          placeholder="Harga"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="p-2 rounded bg-neutral-800"
          required
        />
        <input
          type="number"
          placeholder="Stok"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          className="p-2 rounded bg-neutral-800"
          required
        />
        <textarea
          placeholder="Deskripsi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 rounded bg-neutral-800"
        />
        <button type="submit" className="bg-green-600 px-4 py-2 rounded">
          Simpan
        </button>
      </form>
    </div>
  );
}
