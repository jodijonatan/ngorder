import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        orders: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    // Add order count to each user
    const usersWithOrderCount = users.map((user) => ({
      ...user,
      orderCount: user.orders.length,
      orders: undefined, // Remove orders array from response
    }));

    return NextResponse.json(usersWithOrderCount);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // Note: In production, hash the password
        role: role || "USER",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
