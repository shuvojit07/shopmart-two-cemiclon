export default function OrderCard({ order }) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-black text-slate-900">Order #{order.tran_id.slice(-6)}</h4>
          <p className="text-sm text-slate-500">{order.product?.name}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-black text-amber-600">${order.amount}</p>
          <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
            order.paymentStatus === "paid" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          }`}>
            {order.paymentStatus}
          </span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
         <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${order.escrowStatus === 'hold' ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`} />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Escrow: {order.escrowStatus === 'hold' ? 'Funds Secured' : 'Released'}
            </p>
         </div>
         
         {order.escrowStatus === "hold" && (
           <button className="bg-slate-900 text-white text-xs px-4 py-2 rounded-xl font-bold hover:bg-amber-600 transition">
             Confirm Receipt
           </button>
         )}
      </div>
    </div>
  );
}