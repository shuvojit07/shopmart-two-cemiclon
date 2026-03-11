// app/(dashboard)/seller/earnings/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

async function getEarningsData() {
  return {
    totalSales: 45800,
    commissionDeducted: 4120,
    netEarnings: 41680,
    withdrawn: 28000,
    availableBalance: 13680,
  };
}

export default async function SellerEarnings() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "seller") redirect("/login");

  const data = await getEarningsData();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Earnings & Payouts</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm text-gray-500">Total Sales</p>
          <p className="text-3xl font-bold mt-1">৳{data.totalSales.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm text-gray-500">Net Earnings</p>
          <p className="text-3xl font-bold mt-1 text-green-600">৳{data.netEarnings.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm text-gray-500">Available Balance</p>
          <p className="text-3xl font-bold mt-1 text-amber-600">৳{data.availableBalance.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center justify-center">
          <button className="bg-amber-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-amber-700">
            Request Payout
          </button>
        </div>
      </div>

      {/* Earnings history table or chart can be added here */}
    </div>
  );
}