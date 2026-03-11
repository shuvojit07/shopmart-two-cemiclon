import Withdrawal from "@/models/Withdrawal";
import { connectDB } from "@/lib/db";

export default async function WithdrawalHistory({ sellerId }) {
  await connectDB();
  const history = await Withdrawal.find({ seller: sellerId }).sort({ createdAt: -1 });

  return (
    <div className="mt-10 bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-slate-50 bg-slate-50/50">
        <h3 className="font-black text-slate-900">Withdrawal History</h3>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            <th className="p-6">Date</th>
            <th className="p-6">Method</th>
            <th className="p-6">Amount</th>
            <th className="p-6">Status</th>
          </tr>
        </thead>
        <tbody>
          {history.map((req) => (
            <tr key={req._id} className="border-t border-slate-50 text-sm">
              <td className="p-6 text-slate-500">{new Date(req.createdAt).toLocaleDateString()}</td>
              <td className="p-6 font-bold text-slate-900">{req.method}</td>
              <td className="p-6 font-black text-amber-600">${req.amount}</td>
              <td className="p-6">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                  req.status === "approved" ? "bg-green-100 text-green-600" : 
                  req.status === "pending" ? "bg-amber-100 text-amber-600" : "bg-red-100 text-red-600"
                }`}>
                  {req.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}