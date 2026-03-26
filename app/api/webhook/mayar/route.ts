import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    // Extract token/signature from header
    const signature = request.headers.get("Authorization") || request.headers.get("X-Mayar-Signature");
    const webhookToken = process.env.MAYAR_WEBHOOK_TOKEN;

    // C7: Require webhook token — reject if not configured
    if (!webhookToken) {
      console.error("MAYAR_WEBHOOK_TOKEN is not set in .env. Rejecting webhook.");
      return Response.json({ error: "Webhook token not configured" }, { status: 500 });
    }

    // Verify the webhook token
    const isValid = signature === webhookToken || signature === `Bearer ${webhookToken}`;
    if (!isValid) {
      console.error("Invalid Mayar Webhook Signature/Token");
      return Response.json({ error: "Invalid signature" }, { status: 401 });
    }

    const body = await request.json();

    const { status, payload } = body;
    const orderId = payload?.orderId;

    if (!orderId) {
      return Response.json({ error: "Order ID not found in payload" }, { status: 400 });
    }

    // Verify order exists before updating
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      return Response.json({ error: "Order not found" }, { status: 404 });
    }

    if (status === "PAID") {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "paid" },
      });
    } else if (status === "FAILED" || status === "EXPIRED") {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "failed" },
      });
    }

    return Response.json({ message: "Webhook processed" });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return Response.json({ error: "Failed to process webhook" }, { status: 500 });
  }
}
