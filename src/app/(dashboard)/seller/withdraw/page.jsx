"use client";
import { useState, useEffect } from "react";
import { Wallet, Send, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function SellerWithdraw() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("bKash");
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [fetching, setFetching] = useState(true);

  // ১. আগের উইথড্রয়াল হিস্ট্রি ফেচ করা
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/seller/withdraw/history");
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error("History fetch failed");
      } finally {
        setFetching(false);
      }
    };
    fetchHistory();
  }, []);

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (amount < 500) return toast.error("Minimum withdrawal is ৳500");
    
    setLoading(true);
    try {
      const res = await fetch("/api/seller/withdraw", {
        method: "POST",
        body: JSON.stringify({ amount, method, accountNumber }),
      });
      const data = await res.json();
      
      if (res.ok) {
        toast.success("Withdrawal request sent!");
        setAmount("");
        // হিস্ট্রি রিফ্রেশ করা
        setHistory([data.newRequest, ...history]);
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-10 space-y-12">
      <h2 className="text-4xl font-black text-slate-900 italic tracking-tighter">
        Withdraw <span className="text-amber-500 font-black">Earnings</span>
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <form onSubmit={handleWithdraw} className="bg-white p-8 rounded-[2.5rem] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-2 tracking-widest">Amount (৳)</label>
                <input 
                  type="number" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold focus:border-amber-500 outline-none transition-all"
                  placeholder="e.g. 5000"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-2 tracking-widest">Payment Method</label>
                <select 
                  value={method} 
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none border-2 border-slate-100 focus:border-amber-500 cursor-pointer"
                >
                  <option value="bKash">bKash</option>
                  <option value="Nagad">Nagad</option>
                  <option value="Rocket">Rocket</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-2 tracking-widest">Account Number</label>
              <input 
                type="text" 
                value={accountNumber} 
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-amber-500"
                placeholder="017XXXXXXXX"
                required
              />
            </div>

            <button 
              disabled={loading}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-amber-500 hover:text-slate-900 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <><Send size={20}/> Submit Withdrawal Request</>}
            </button>
          </form>
        </div>

        {/* Sidebar Info */}
        <div className="bg-amber-500 text-slate-900 p-8 rounded-[2.5rem] border-2 border-black flex flex-col justify-between shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] lg:shadow-none">
          <div>
            <Wallet className="mb-4" size={48} />
            <h4 className="text-2xl font-black mb-4 tracking-tight">Withdrawal Policy</h4>
            <ul className="text-slate-900/70 text-sm space-y-4 font-bold italic">
              <li className="flex items-start gap-2"><CheckCircle size={16} className="shrink-0 mt-1"/> Minimum payout is ৳৫০০.</li>
              <li className="flex items-start gap-2"><CheckCircle size={16} className="shrink-0 mt-1"/> Verification takes 24-48 hours.</li>
              <li className="flex items-start gap-2"><CheckCircle size={16} className="shrink-0 mt-1"/> Double-check account details.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* --- History Table Section --- */}
      <div className="space-y-6">
        <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2 tracking-tight">
          <Clock className="text-amber-500" /> Recent <span className="text-amber-500">Payouts</span>
        </h3>
        
        <div className="bg-white border-2 border-black rounded-[2.5rem] overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b-2 border-black">
              <tr>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Method</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Amount</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fetching ? (
                <tr><td colSpan="4" className="p-10 text-center font-bold text-slate-400 animate-pulse">Loading history...</td></tr>
              ) : history.length > 0 ? history.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-6 font-bold text-slate-500 text-xs">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-6">
                    <p className="font-black text-slate-900 text-sm">{item.method}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{item.accountNumber}</p>
                  </td>
                  <td className="p-6 font-black text-slate-900">৳{item.amount}</td>
                  <td className="p-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border shadow-sm ${
                      item.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      item.status === 'rejected' ? 'bg-red-50 text-red-600 border-red-100' :
                      'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="4" className="p-10 text-center text-slate-400 italic font-medium">No withdrawal requests found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}