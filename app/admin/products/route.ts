import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const { name, price, stock, description } = await req.json();
  const product = await prisma.product.create({
    data: { name, price, stock, description },
  });
  return NextResponse.json(product);
}

export async function PUT(req: NextRequest) {
  const { id, name, price, stock, description } = await req.json();
  const product = await prisma.product.update({
    where: { id },
    data: { name, price, stock, description },
  });
  return NextResponse.json(product);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ message: "Produk dihapus" });
}
