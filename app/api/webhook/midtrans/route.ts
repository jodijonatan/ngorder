import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySignature } from "@/lib/midtrans";

/**
 * Midtrans Webhook Notification Handler
 *
 * Midtrans akan mengirim POST notification ke endpoint ini
 * setiap ada perubahan status transaksi.
 *
 * Docs: https://docs.midtrans.com/docs/https-notification
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
    } = body;

    // Verifikasi signature untuk memastikan notifikasi valid
    const isValid = verifySignature(order_id, status_code, gross_amount, signature_key);
    if (!isValid) {
      console.error("Invalid Midtrans webhook signature for order:", order_id);
      return Response.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Cek apakah order ada di database
    const order = await prisma.order.findUnique({ where: { id: order_id } });
    if (!order) {
      console.error("Order not found for webhook:", order_id);
      return Response.json({ error: "Order not found" }, { status: 404 });
    }

    // Mapping status transaksi Midtrans ke status order
    let newStatus = order.status;

    if (transaction_status === "capture") {
      // Untuk kartu kredit: cek fraud_status
      newStatus = fraud_status === "accept" ? "paid" : "pending";
    } else if (transaction_status === "settlement") {
      newStatus = "paid";
    } else if (transaction_status === "pending") {
      newStatus = "pending";
    } else if (
      transaction_status === "deny" ||
      transaction_status === "cancel" ||
      transaction_status === "expire"
    ) {
      newStatus = "failed";
    } else if (transaction_status === "refund" || transaction_status === "partial_refund") {
      newStatus = "refunded";
    }

    // Update status order di database
    await prisma.order.update({
      where: { id: order_id },
      data: { status: newStatus },
    });

    console.log(`[Midtrans Webhook] Order ${order_id}: ${transaction_status} → ${newStatus}`);

    return Response.json({ message: "OK" });
  } catch (error) {
    console.error("Midtrans webhook error:", error);
    return Response.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
