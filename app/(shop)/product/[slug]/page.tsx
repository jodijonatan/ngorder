import { prisma } from "@/lib/prisma";

export default async function ProductDetail({
  params,
}: {
  params: { slug: string };
}) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  if (!product) return <div>Produk tidak ditemukan</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl">{product.name}</h1>
      <p className="text-neutral-400">{product.description}</p>
      <p className="mt-2 font-bold">Rp {product.price}</p>
    </div>
  );
}
