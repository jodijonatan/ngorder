import Link from "next/link";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  image: string;
  description: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="border border-neutral-800 p-4 hover:bg-neutral-900">
        <h2>{product.name}</h2>
        <p className="text-sm">Rp {product.price}</p>
      </div>
    </Link>
  );
}
