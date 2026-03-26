import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get total stats
    const [totalUsers, totalProducts, totalOrders, totalRevenue] =
      await Promise.all([
        prisma.user.count(),
        prisma.product.count(),
        prisma.order.count(),
        prisma.order.aggregate({
          _sum: {
            total: true,
          },
        }),
      ]);

    // Get recent orders with user info — sorted by createdAt
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Get low stock products (stock <= 5)
    const lowStockProducts = await prisma.product.findMany({
      where: {
        stock: {
          lte: 5,
        },
      },
      select: {
        id: true,
        name: true,
        stock: true,
      },
      orderBy: {
        stock: "asc",
      },
      take: 5,
    });

    // Get recent users
    const recentUsers = await prisma.user.findMany({
      take: 6,
      orderBy: {
        id: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    // Get order status statistics
    const orderStatusStats = await prisma.order.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
    });

    const dashboardData = {
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue: totalRevenue._sum.total || 0,
      },
      recentOrders,
      lowStockProducts,
      recentUsers,
      orderStatusStats,
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
