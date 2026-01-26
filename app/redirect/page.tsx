"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (session?.user) {
      // Check user role and redirect accordingly
      if (session.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } else {
      // No session, redirect to login
      router.push("/login");
    }
  }, [session, status, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712]">
      <div className="text-white text-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p>Mengalihkan...</p>
      </div>
    </div>
  );
}
