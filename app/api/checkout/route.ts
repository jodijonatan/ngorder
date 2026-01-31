import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CartItem } from "@/store/cart";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const { items }: { items: CartItem[] } = await request.json();
    if (!items || items.length === 0) {
      return Response.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Ambil data produk terbaru untuk cek stok dan harga
    const productIds = items.map((item) => item.id);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    // Validasi stok sebelum memulai transaksi
    for (const item of items) {
      const product = dbProducts.find((p) => p.id === item.id);
      if (!product) {
        return Response.json(
          { error: `Product ${item.name} not found` },
          { status: 404 },
        );
      }
      if (product.stock < item.qty) {
        return Response.json(
          {
            error: `Stock insufficient for ${product.name}. Available: ${product.stock}`,
          },
          { status: 400 },
        );
      }
    }

    // Jalankan transaksi: Buat Order + Kurangi Stok
    const result = await prisma.$transaction(async (tx) => {
      let total = 0;
      const orderItemsData = [];

      for (const item of items) {
        const product = dbProducts.find((p) => p.id === item.id)!;
        total += product.price * item.qty;

        // 1. Kurangi stok produk
        await tx.product.update({
          where: { id: product.id },
          data: {
            stock: {
              decrement: item.qty, // Fungsi Prisma untuk kurangi nilai secara atomik
            },
          },
        });

        orderItemsData.push({
          productId: product.id,
          quantity: item.qty,
          price: product.price,
        });
      }

      // 2. Buat data order
      const newOrder = await tx.order.create({
        data: {
          total,
          status: "pending",
          userId: user.id,
          orderItems: {
            create: orderItemsData,
          },
        },
      });

      return newOrder;
    });

    return Response.json({
      message: "Order created successfully",
      orderId: result.id,
    });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return Response.json({ error: "Failed to process order" }, { status: 500 });
  }
}
