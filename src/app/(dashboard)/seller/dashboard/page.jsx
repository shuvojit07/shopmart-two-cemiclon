// app/(dashboard)/seller/dashboard/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

async function getSellerStats() {
  // Fetch from your API
  // Example: totalProducts, totalOrders, totalEarnings, pendingPayout
  return {
    totalProducts: 48,
    activeOrders: 12,
    totalEarnings: 12480,
    pendingPayout: 2350,
  };
}

export default async function SellerDashboard() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "seller") redirect("/login");

  const stats = await getSellerStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Seller Dashboard</h1>
        <p className="mt-2 text-gray-600">Overview of your store performance</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-3xl font-bold mt-1">{stats.totalProducts}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm text-gray-500">Active Orders</p>
          <p className="text-3xl font-bold mt-1">{stats.activeOrders}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm text-gray-500">Total Earnings</p>
          <p className="text-3xl font-bold mt-1">${stats.totalEarnings.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm text-gray-500">Pending Payout</p>
          <p className="text-3xl font-bold mt-1 text-amber-600">
            ${stats.pendingPayout.toLocaleString()}
          </p>
        </div>
      </div>

      {/* You can add charts, recent orders, low stock alerts here later */}
    </div>
  );
}