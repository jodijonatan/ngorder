import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log("POST /api/admin/products called");

    // Temporarily disable auth check to test basic functionality
    // const session = await getServerSession(authOptions);
    // console.log("Session:", session);

    // if (!session) {
    //   console.log("No session found");
    //   return NextResponse.json({ error: "No session" }, { status: 401 });
    // }

    // if (session.user.role !== "ADMIN") {
    //   console.log("User role:", session.user.role);
    //   return NextResponse.json({ error: "Not admin" }, { status: 401 });
    // }

    const body = await req.json();
    console.log("Request body:", body);

    const { name, slug, price, stock, description, image } = body;

    if (!name || !slug || price === undefined || stock === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        price: parseFloat(price),
        stock: parseInt(stock),
        description: description || null,
        image: image || null,
      },
    });

    console.log("Product created:", product);
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, name, slug, price, stock, description, image } =
      await req.json();

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        price: parseFloat(price),
        stock: parseInt(stock),
        description,
        image: image || null,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: "Produk dihapus" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
