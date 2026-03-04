import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    // Extract token/signature from header
    const signature = request.headers.get("Authorization") || request.headers.get("X-Mayar-Signature");
    const webhookToken = process.env.MAYAR_WEBHOOK_TOKEN;

    if (webhookToken) {
      // If environment variable is set, verify the webhook token
      // "mencocokkan Webhook Token (Signature)"
      let isValid = false;
      if (signature === webhookToken || signature === `Bearer ${webhookToken}`) {
        isValid = true;
      }
      
      if (!isValid) {
        console.error("Invalid Mayar Webhook Signature/Token");
        return Response.json({ error: "Invalid signature" }, { status: 401 });
      }
    } else {
      console.warn("MAYAR_WEBHOOK_TOKEN is not set in .env. Webhook signature is not verified.");
    }

    const body = await request.json();
    console.log("Mayar Webhook Received:", body);

    const { status, payload } = body;
    const orderId = payload?.orderId;

    if (!orderId) {
      return Response.json({ error: "Order ID not found in payload" }, { status: 400 });
    }

    if (status === "PAID") {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "paid" },
      });
      console.log(`Order ${orderId} marked as PAID`);
    } else if (status === "FAILED" || status === "EXPIRED") {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "failed" },
      });
      console.log(`Order ${orderId} marked as ${status}`);
    }

    return Response.json({ message: "Webhook processed" });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return Response.json({ error: "Failed to process webhook" }, { status: 500 });
  }
}
