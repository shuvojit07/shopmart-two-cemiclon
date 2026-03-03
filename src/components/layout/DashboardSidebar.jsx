"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar({ role }) {
  const pathname = usePathname();

  const linkClass = (path) =>
    `block px-4 py-2 rounded-xl transition ${
      pathname === path
        ? "bg-amber-600 text-white"
        : "text-gray-700 hover:bg-amber-50"
    }`;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-amber-700 mb-8">
        Dashboard
      </h2>

      {role === "buyer" && (
        <div className="space-y-3">
          <Link href="/buyer/orders" className={linkClass("/buyer/orders")}>
            Orders
          </Link>
          <Link href="/buyer/transactions" className={linkClass("/buyer/transactions")}>
            Transactions
          </Link>
          <Link href="/buyer/escrow" className={linkClass("/buyer/escrow")}>
            Escrow
          </Link>
        </div>
      )}

      {role === "seller" && (
        <div className="space-y-3">
          <Link href="/seller/products" className={linkClass("/seller/products")}>
            Products
          </Link>
          <Link href="/seller/sales" className={linkClass("/seller/sales")}>
            Sales
          </Link>
          <Link href="/seller/escrow" className={linkClass("/seller/escrow")}>
            Escrow
          </Link>
        </div>
      )}

      {role === "admin" && (
        <div className="space-y-3">
          <Link href="/admin/users" className={linkClass("/admin/users")}>
            Users
          </Link>
          <Link href="/admin/disputes" className={linkClass("/admin/disputes")}>
            Disputes
          </Link>
          <Link href="/admin/refunds" className={linkClass("/admin/refunds")}>
            Refunds
          </Link>
          <Link href="/admin/analytics" className={linkClass("/admin/analytics")}>
            Analytics
          </Link>
        </div>
      )}
    </aside>
  );
}