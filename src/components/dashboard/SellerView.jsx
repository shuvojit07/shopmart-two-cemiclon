"use client";
import { useState, useEffect } from "react";
import { Wallet, ArrowUpRight, Clock, CheckCircle, Send, History, CheckCircle2, XCircle } from "lucide-react";

export default function SellerView() {
  const [balanceData, setBalanceData] = useState({ balance: 0, pendingWithdrawal: 0 });
  const [payouts, setPayouts] = useState([]);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [method, setMethod] = useState("bKash");
  const [accountDetails, setAccountDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);

  // ১. ডাটা লোড করা (Balance & History)
  const fetchData = async () => {
    try {
      const [balRes, payRes] = await Promise.all([
        fetch("/api/seller/balance"),
        fetch("/api/seller/payouts")
      ]);
      const balData = await balRes.json();
      const payData = await payRes.json();
      
      setBalanceData(balData);
      setPayouts(payData);
      setHistoryLoading(false);
    } catch (err) {
      console.error("Failed to fetch seller data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ২. উইথড্র রিকোয়েস্ট সাবমিট করা
  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (withdrawAmount > balanceData.balance) return alert("Insufficient balance!");
    if (withdrawAmount < 500) return alert("Minimum withdrawal is ৳500");
    
    setLoading(true);
    const res = await fetch("/api/withdraw/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        amount: Number(withdrawAmount), 
        method, 
        accountDetails 
      }),
    });

    if (res.ok) {
      alert("Withdrawal request sent!");
      setWithdrawAmount("");
      setAccountDetails("");
      fetchData(); // ব্যালেন্স এবং হিস্ট্রি রিফ্রেশ করা
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* ব্যালেন্স কার্ডস */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Available Balance</p>
            <h3 className="text-5xl font-black mt-2 italic">৳{balanceData.balance}</h3>
            <div className="mt-6 flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle size={16} /> Funds ready to withdraw
            </div>
          </div>
          <Wallet className="absolute -right-4 -bottom-4 text-white/5" size={180} />
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-50 shadow-sm flex flex-col justify-center">
          <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Pending Payouts</p>
          <h3 className="text-4xl font-black mt-2 text-slate-900 italic">৳{balanceData.pendingWithdrawal}</h3>
          <p className="mt-4 text-slate-500 font-bold text-sm flex items-center gap-2">
            <Clock size={16} className="text-amber-500" /> Awaiting admin approval
          </p>
        </div>
      </div>

      {/* উইথড্র ফর্ম */}
      <div className="bg-white p-8 rounded-[3rem] border-2 border-slate-50 shadow-sm">
        <h4 className="font-black text-xl italic text-slate-900 mb-6 flex items-center gap-2">
          <ArrowUpRight className="text-amber-500" size={24} /> Request <span className="text-amber-500">Withdrawal</span>
        </h4>
        
        <form onSubmit={handleWithdraw} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Amount</label>
            <input 
              type="number" 
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-2xl p-4 font-black outline-none focus:ring-2 focus:ring-amber-500 transition-all" 
              placeholder="Min. ৳500"
              required 
            />
          </div>
          
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Method</label>
            <select 
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-2xl p-4 font-black outline-none cursor-pointer"
            >
              <option value="bKash">bKash</option>
              <option value="Nagad">Nagad</option>
              <option value="Bank">Bank Transfer</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Account Details</label>
            <div className="relative">
              <input 
                type="text" 
                value={accountDetails}
                onChange={(e) => setAccountDetails(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-2xl p-4 font-black outline-none pr-12" 
                placeholder="Number / AC Details"
                required 
              />
              <button 
                type="submit" 
                disabled={loading}
                className="absolute right-2 top-2 bottom-2 bg-slate-900 text-amber-500 px-4 rounded-xl hover:bg-amber-500 hover:text-slate-900 transition-all flex items-center justify-center disabled:opacity-50"
              >
                {loading ? <Clock size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* পেমেন্ট হিস্ট্রি টেবিল */}
      <div className="bg-white p-8 rounded-[3rem] border-2 border-slate-50 shadow-sm">
        <h4 className="font-black text-xl italic text-slate-900 mb-6 flex items-center gap-2">
          <History className="text-slate-400" size={24} /> Payout <span className="text-slate-400">History</span>
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase text-slate-400 border-b border-slate-50">
                <th className="pb-4 px-2">Date</th>
                <th className="pb-4 px-2">Method</th>
                <th className="pb-4 px-2">Amount</th>
                <th className="pb-4 px-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-bold text-sm text-slate-700">
              {historyLoading ? (
                <tr><td colSpan="4" className="py-10 text-center animate-pulse text-slate-300 italic">Updating records...</td></tr>
              ) : payouts.length === 0 ? (
                <tr><td colSpan="4" className="py-10 text-center text-slate-400 italic">No payout history found.</td></tr>
              ) : (
                payouts.map((payout) => (
                  <tr key={payout._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-2 text-xs text-slate-400">{new Date(payout.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 px-2">
                      <span className="block">{payout.method}</span>
                      <span className="text-[10px] text-slate-400 font-mono leading-none">{payout.accountDetails}</span>
                    </td>
                    <td className="py-4 px-2 font-black italic">৳{payout.amount}</td>
                    <td className="py-4 px-2">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                        payout.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                        payout.status === 'rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                        'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {payout.status === 'approved' ? <CheckCircle2 size={12}/> : payout.status === 'rejected' ? <XCircle size={12}/> : <Clock size={12}/>}
                        {payout.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}