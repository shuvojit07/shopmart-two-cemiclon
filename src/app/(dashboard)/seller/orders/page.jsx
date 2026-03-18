// app/(dashboard)/seller/orders/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

async function getOrders() {
  // Fetch your orders – example mock
  return [
    { id: "ORD-001", customer: "Rahim Khan", total: 4500, status: "Processing", delivery: "Pending" },
    { id: "ORD-002", customer: "Suma Akter", total: 3200, status: "Shipped", delivery: "In Transit" },
    // ...
  ];
}

export default async function SellerOrders() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "seller") redirect("/login");

  const orders = await getOrders();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Orders</h1>
        <input
          type="text"
          placeholder="Search orders..."
          className="border rounded-lg px-4 py-2 w-64"
        />
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-semibold">Order ID</th>
              <th className="p-4 font-semibold">Customer</th>
              <th className="p-4 font-semibold">Total</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Delivery</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4">৳{order.total.toLocaleString()}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    order.status === "Delivered" ? "bg-green-100 text-green-800" :
                    order.status === "Shipped" ? "bg-blue-100 text-blue-800" :
                    "bg-yellow-100 text-yellow-800"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4">{order.delivery}</td>
                <td className="p-4 text-right">
                  <button className="text-blue-600 hover:underline">View / Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}