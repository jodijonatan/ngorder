import Link from "next/link";

export default function ProductCard({ product }: any) {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="border border-neutral-800 p-4 hover:bg-neutral-900">
        <h2>{product.name}</h2>
        <p className="text-sm">Rp {product.price}</p>
      </div>
    </Link>
  );
}
