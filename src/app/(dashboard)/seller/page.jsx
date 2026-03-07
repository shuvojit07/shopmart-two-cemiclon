// app/(dashboard)/seller/sales/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SalesPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "seller") {
    redirect("/login");
  }

  // Mock or real data
  const sales = [
    { id: "SALE001", amount: 4500, date: "2026-03-01", status: "Completed" },
    // ...
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Sales & Orders</h1>

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{sale.id}</td>
                <td className="p-4">৳{sale.amount.toLocaleString()}</td>
                <td className="p-4">{sale.date}</td>
                <td className="p-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {sale.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}