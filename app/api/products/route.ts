import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get("ids");

    // M3: If specific IDs requested (for favorites), filter server-side
    if (ids) {
      const idArray = ids.split(",").filter(Boolean);
      const products = await prisma.product.findMany({
        where: { id: { in: idArray } },
      });
      return Response.json(products);
    }

    // M2: Pagination support
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const search = searchParams.get("search") || "";

    const where = search
      ? { name: { contains: search, mode: "insensitive" as const } }
      : {};

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { name: "asc" },
      }),
      prisma.product.count({ where }),
    ]);

    return Response.json(products, {
      headers: {
        "X-Total-Count": total.toString(),
        "X-Page": page.toString(),
        "X-Limit": limit.toString(),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return Response.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
