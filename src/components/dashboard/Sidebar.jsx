"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  DollarSign,
  ShieldCheck,
  Users,
  AlertTriangle,
  RotateCcw,
  BarChart3,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // Database-e "Admin" ba "admin" thakle-o jeno kaj kore tai toLowerCase() bebohar kora bhalo
  const role = session?.user?.role?.toLowerCase();

  const isActive = (path, exact = false) => {
    if (exact) return pathname === path;
    return pathname.startsWith(path);
  };

  const linkClass = (active) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
      active
        ? "bg-amber-100 text-amber-700 shadow-sm border border-amber-200"
        : "text-gray-600 hover:bg-gray-50 hover:text-amber-600"
    }`;

  if (status === "loading") return null;

  // components/dashboard/Sidebar.jsx → update nav arrays

  const buyerNav = [
    { label: "Dashboard", href: "/buyer", icon: LayoutDashboard, exact: true },
    { label: "My Orders", href: "/buyer/orders", icon: ShoppingBag },
    { label: "Transactions", href: "/buyer/transactions", icon: DollarSign },
    { label: "Escrow Protection", href: "/buyer/escrow", icon: ShieldCheck },
    // { label: "Disputes", href: "/buyer/disputes", icon: AlertTriangle }, // if you want
  ];

  const sellerNav = [
    { label: "Dashboard", href: "/seller", icon: LayoutDashboard, exact: true },
    { label: "My Products", href: "/seller/products", icon: Package },
    { label: "Sales & Orders", href: "/seller/sales", icon: ShoppingBag },
    { label: "Escrow & Payouts", href: "/seller/escrow", icon: ShieldCheck },
  ];

  const adminNav = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard, exact: true },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { label: "Escrow Center", href: "/admin/escrow", icon: ShieldCheck },
    { label: "Disputes", href: "/admin/disputes", icon: AlertTriangle },
    { label: "Refunds", href: "/admin/refunds", icon: RotateCcw },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  ];
  const escrowNav = [
  { label: "Dashboard", href: "/escrow", icon: LayoutDashboard, exact: true },
  { label: "Pending Releases", href: "/escrow/pending", icon: ShieldCheck },
  { label: "Resolved Disputes", href: "/escrow/history", icon: RotateCcw },
];

  // Role onujayi navigation select kora
const nav = 
  role === "buyer" ? buyerNav :
  role === "seller" ? sellerNav :
  role === "admin" ? adminNav :
  role === "escrow" ? escrowNav : [];
  return (
    <aside className="hidden md:flex md:flex-col md:w-72 bg-white border-r h-screen sticky top-0">
      {/* Brand Logo */}
      <div className="p-8">
        <Link
          href="/"
          className="text-3xl font-black text-slate-900 tracking-tighter italic"
        >
          Shop<span className="text-amber-500 font-black">Mart</span>
        </Link>
        <div className="mt-1 h-1 w-12 bg-amber-500 rounded-full"></div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-6 space-y-1">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-2">
          Main Menu
        </p>

        {nav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass(active)}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User Session Info & Sign Out */}
      <div className="p-6 border-t mt-auto">
        <div className="mb-4 px-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase">
            Logged in as
          </p>
          <p className="text-sm font-black text-slate-900 capitalize italic">
            {session?.user?.name || role}
          </p>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-4 py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl w-full transition-colors group"
        >
          <LogOut
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
