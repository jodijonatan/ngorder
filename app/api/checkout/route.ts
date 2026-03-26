import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CartItem } from "@/store/cart";
import { createPaylink } from "@/lib/mayar";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items }: { items: CartItem[] } = await request.json();
    if (!items || items.length === 0) {
      return Response.json({ error: "Cart is empty" }, { status: 400 });
    }

    let user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user && (session.user as any)?.id) {
      user = await prisma.user.findUnique({ where: { id: (session.user as any).id } });
    }

    if (!user) {
      return Response.json({ error: "User not found. Please re-login." }, { status: 404 });
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
              decrement: item.qty,
            },
          },
        });

        orderItemsData.push({
          productId: product.id,
          quantity: item.qty,
          price: product.price,
        });
      }

      // 2. Buat data order awal
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

    // 3. Buat Paylink Mayar (di luar transaksi Prisma agar tidak nge-lock DB kelamaan)
    try {
      const paylink = await createPaylink({
        name: user.name || "Customer",
        email: user.email,
        amount: result.total,
        mobile: session?.user?.email || "customer@ngorder.com", // TODO: Add phone field to user profile
        description: `Order #${result.id} for ${items.length} items`,
        payload: { orderId: result.id },
        redirectUrl: `${process.env.NEXTAUTH_URL}/shop`, // Redirect balik ke toko
      });

      // Update order dengan link pembayaran
      await prisma.order.update({
        where: { id: result.id },
        data: {
          paymentUrl: paylink.link,
          mayarId: paylink.id,
        },
      });

      return Response.json({
        message: "Order created successfully",
        orderId: result.id,
        paymentUrl: paylink.link,
      });
    } catch (mayarError: any) {
      console.error("Mayar paylink error:", mayarError);
      return Response.json({
        message: "Order created, but payment initialization failed",
        orderId: result.id,
        error: mayarError.message,
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Checkout error:", error);
    return Response.json({ error: "Failed to process order" }, { status: 500 });
  }
}
