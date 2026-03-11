"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SellerLayout({ children }) {

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {

    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    if (session.user.role !== "seller") {
      router.push("/");
    }

  }, [session, status, router]);

  if (status === "loading") {
    return <div className="p-10">Loading dashboard...</div>;
  }

  return <>{children}</>;
}