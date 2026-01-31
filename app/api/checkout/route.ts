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
    if (!items || !Array.isArray(items) || items.length === 0) {
      return Response.json({ error: "No items in cart" }, { status: 400 });
    }

    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    // Create order
    const order = await prisma.order.create({
      data: {
        total,
        status: "pending",
        userId: user.id,
        orderItems: {
          create: items.map((item) => ({
            productId: item.id,
            quantity: item.qty,
            price: item.price,
          })),
        },
      },
    });

    return Response.json({
      message: "Order created successfully",
      orderId: order.id,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
