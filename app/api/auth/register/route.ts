import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return Response.json(
        { error: "Email dan password wajib diisi" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return Response.json(
        { error: "Password minimal 6 karakter" },
        { status: 400 },
      );
    }

    // Check for duplicate email
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return Response.json(
        { error: "Email sudah terdaftar" },
        { status: 409 },
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { name: name || null, email, password: hashed },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Registration error:", error);
    return Response.json(
      { error: "Terjadi kesalahan saat mendaftar" },
      { status: 500 },
    );
  }
}
