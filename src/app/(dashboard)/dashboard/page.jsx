import StatsCard from "@/components/dashboard/StatsCard";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DashboardHome() {
  const session = await getServerSession(authOptions);
  await connectDB();

  // Real Data Fetching (Example for Seller)
  const orders = await Order.find({ seller: session.user.id });
  const statsData = {
    activeSales: orders.length,
    heldAmount: orders.filter(o => o.escrowStatus === 'hold').reduce((a, b) => a + b.amount, 0),
    earnings: orders.filter(o => o.escrowStatus === 'released').reduce((a, b) => a + b.amount, 0),
  };

  return (
    <main className=" p-8 max-w-7xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900">
          Welcome back, <span className="text-amber-500">{session.user.name}</span>!
        </h1>
        <p className="text-slate-500 font-medium mt-2">Here is what's happening with your escrow account today.</p>
      </header>

      {/* Dynamic Stats Cards */}
      <StatsCard role={session.user.role} data={statsData} />

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-slate-900">Recent Activity</h2>
            <button className="text-amber-600 font-bold text-sm hover:underline">View All</button>
          </div>
          
          {/* Table Placeholder */}
          <div className="space-y-4">
             {orders.slice(0, 5).map(order => (
               <div key={order._id} className="flex justify-between items-center p-4 hover:bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-all">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl" />
                    <div>
                      <p className="font-bold text-slate-900">Order #{order.tran_id.slice(-6)}</p>
                      <p className="text-xs text-slate-400 uppercase font-bold">{order.escrowStatus}</p>
                    </div>
                  </div>
                  <p className="font-black text-slate-900">${order.amount}</p>
               </div>
             ))}
          </div>
        </div>

        {/* Right Side: Quick Actions/Profile */}
        <div className="bg-amber-500 rounded-[2.5rem] p-8 text-white shadow-xl shadow-amber-200">
          <h2 className="text-xl font-black mb-4">Quick Help</h2>
          <p className="text-amber-100 text-sm mb-6 leading-relaxed">
            Somossa hoyeche? Dispute center-e janan ba support-er sathe kotha bolun.
          </p>
          <button className="w-full bg-white text-amber-600 font-black py-4 rounded-2xl hover:bg-amber-50 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </main>
  );
}