"use client";

import { useSession, signOut } from "next-auth/react";

export default function useAuth() {
  const { data: session, status } = useSession();

  return {
    user: session?.user,
    role: session?.user?.role,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    logout: signOut,
  };
}