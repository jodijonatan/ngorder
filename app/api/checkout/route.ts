import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CartItem } from "@/store/cart";
import { createTransaction } from "@/lib/midtrans";

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

    // 3. Buat Midtrans Snap Transaction
    try {
      const midtransItems = items.map((item) => {
        const product = dbProducts.find((p) => p.id === item.id)!;
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: item.qty,
        };
      });

      const transaction = await createTransaction({
        orderId: result.id,
        grossAmount: result.total,
        items: midtransItems,
        customer: {
          firstName: user.name || "Customer",
          email: user.email,
        },
      });

      // Simpan snap token ke order
      await prisma.order.update({
        where: { id: result.id },
        data: {
          snapToken: transaction.token,
          paymentUrl: transaction.redirect_url,
        },
      });

      return Response.json({
        message: "Order created successfully",
        orderId: result.id,
        token: transaction.token,
        redirect_url: transaction.redirect_url,
      });
    } catch (midtransError: any) {
      console.error("MIDTRANS ERROR DETAILS:", {
        message: midtransError.message,
        stack: midtransError.stack,
        response: midtransError.ApiResponse,
      });
      return Response.json({
        message: "Order created, but payment initialization failed",
        orderId: result.id,
        error: midtransError.message,
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error("CHECKOUT CRITICAL ERROR:", error);
    return Response.json({ 
      error: "Failed to process order", 
      details: error.message 
    }, { status: 500 });
  }
}
