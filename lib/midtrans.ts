import midtransClient from "midtrans-client";

// Midtrans Snap client — Sandbox mode
const serverKey = process.env.MIDTRANS_SERVER_KEY || "";
const clientKey = process.env.MIDTRANS_CLIENT_KEY || "";

console.log("DEBUG Midtrans Init:", {
  hasServerKey: !!serverKey,
  hasClientKey: !!clientKey,
  serverKeyPrefix: serverKey.substring(0, 7),
  isProduction: false, // Force sandbox for demo
});

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: serverKey || "SB-Mid-server-YOUR_SERVER_KEY",
  clientKey: clientKey || "SB-Mid-client-YOUR_CLIENT_KEY",
});

export interface TransactionParams {
  orderId: string;
  grossAmount: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  customer: {
    firstName: string;
    email: string;
  };
}

/**
 * Buat transaksi Midtrans Snap —
 * Mengembalikan `token` untuk popup frontend dan `redirect_url` sebagai fallback.
 */
export async function createTransaction(params: TransactionParams) {
  const parameter = {
    transaction_details: {
      order_id: params.orderId,
      gross_amount: params.grossAmount,
    },
    item_details: params.items.map((item) => ({
      id: item.id,
      name: item.name.substring(0, 50), // Midtrans max 50 chars
      price: item.price,
      quantity: item.quantity,
    })),
    customer_details: {
      first_name: params.customer.firstName,
      email: params.customer.email,
    },
  };

  const transaction = await snap.createTransaction(parameter);

  return {
    token: transaction.token as string,
    redirect_url: transaction.redirect_url as string,
  };
}

/**
 * Verifikasi signature notifikasi Midtrans
 */
export function verifySignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  signatureKey: string,
): boolean {
  const crypto = require("crypto");
  const serverKey = process.env.MIDTRANS_SERVER_KEY || "";
  const hash = crypto
    .createHash("sha512")
    .update(orderId + statusCode + grossAmount + serverKey)
    .digest("hex");

  return hash === signatureKey;
}
