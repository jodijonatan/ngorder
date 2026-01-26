import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const products = await prisma.product.findMany();

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Admin Dashboard</h1>
      {products.map((p) => (
        <div key={p.id} className="border-b border-neutral-800 py-2">
          {p.name}
        </div>
      ))}
    </div>
  );
}
