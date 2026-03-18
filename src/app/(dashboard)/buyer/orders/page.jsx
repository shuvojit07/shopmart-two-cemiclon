import Order from "@/models/Order";
import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Package, Clock, ShieldCheck, Truck, CheckCircle } from "lucide-react";

export default async function BuyerOrders() {
  const session = await getServerSession(authOptions);
  await connectDB();

  // 1. Fetch orders for this specific buyer
  const orders = await Order.find({ buyer: session?.user?.id })
    .populate("product")
    .sort({ createdAt: -1 });

  const getStatusIcon = (status) => {
    switch (status) {
      case "hold": return <Clock className="text-amber-500" size={20} />;
      case "shipped": return <Truck className="text-blue-500" size={20} />;
      case "released": return <CheckCircle className="text-green-500" size={20} />;
      default: return <Package className="text-slate-400" size={20} />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          My <span className="text-amber-500">Orders</span>
        </h1>
        <p className="text-slate-500 font-medium mt-1">Track your escrow transactions and deliveries.</p>
      </div>

      <div className="grid gap-6">
        {orders.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] p-20 text-center">
            <Package size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-bold">No orders found yet.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row justify-between gap-8">
                
                {/* Product & Order Info */}
                <div className="flex gap-6 items-center flex-1">
                  <div className="w-24 h-24 bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 flex-shrink-0">
                    <img src={order.product?.img} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Order ID: #{order.tran_id.slice(-8)}</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 leading-tight">{order.product?.name}</h3>
                    <p className="text-2xl font-black text-amber-500 mt-2">${order.amount}</p>
                  </div>
                </div>

                {/* Escrow Timeline Indicator */}
                <div className="flex-1 flex flex-col justify-center border-l border-slate-50 pl-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-xl bg-slate-50 ${order.escrowStatus === 'hold' ? 'animate-pulse' : ''}`}>
                      {getStatusIcon(order.escrowStatus)}
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Escrow Status</p>
                      <p className="text-sm font-bold text-slate-800 capitalize">{order.escrowStatus === 'hold' ? 'Funds Held Securely' : order.escrowStatus}</p>
                    </div>
                  </div>
                  
                  {/* Progress Bar UI */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-amber-500 transition-all duration-1000`} 
                      style={{ width: order.escrowStatus === 'hold' ? '33%' : order.escrowStatus === 'shipped' ? '66%' : '100%' }}
                    />
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex items-center">
                   {order.escrowStatus === "shipped" ? (
                     <button className="w-full lg:w-auto bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-amber-500 transition-colors shadow-lg shadow-slate-200">
                        Confirm Delivery
                     </button>
                   ) : (
                     <button className="w-full lg:w-auto border-2 border-slate-100 text-slate-400 px-8 py-4 rounded-2xl font-black cursor-not-allowed">
                        Order Processing
                     </button>
                   )}
                </div>

              </div>
              
              <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-green-600 bg-green-50 w-fit px-3 py-1 rounded-full uppercase tracking-tighter">
                <ShieldCheck size={12} /> SSLCommerz Verified Transaction
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}