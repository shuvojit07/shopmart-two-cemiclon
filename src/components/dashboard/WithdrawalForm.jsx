"use client";
import { useState } from "react";
import { Landmark, Smartphone, Send, Loader2 } from "lucide-react";

export default function WithdrawalForm({ availableBalance }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ amount: "", method: "bKash", accountDetails: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await fetch("/api/withdraw", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Withdrawal request sent successfully!");
      window.location.reload();
    } else {
      const err = await res.json();
      alert(err.error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm max-w-md">
      <h3 className="text-xl font-black text-slate-900 mb-2">Withdraw Funds</h3>
      <p className="text-sm text-slate-500 mb-6">Available: <span className="text-amber-600 font-bold">${availableBalance}</span></p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-bold uppercase text-slate-400">Amount ($)</label>
          <input 
            type="number" required
            className="w-full mt-1 p-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition"
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-slate-400">Method</label>
          <select 
            className="w-full mt-1 p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none"
            onChange={(e) => setFormData({...formData, method: e.target.value})}
          >
            <option value="bKash">bKash</option>
            <option value="Nagad">Nagad</option>
            <option value="Bank">Bank Transfer</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-slate-400">Account Details</label>
          <textarea 
            placeholder="Number or Bank Account Info" required
            className="w-full mt-1 p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none min-h-[80px]"
            onChange={(e) => setFormData({...formData, accountDetails: e.target.value})}
          />
        </div>

        <button 
          disabled={loading || availableBalance <= 0}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-amber-200 transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Request Withdrawal</>}
        </button>
      </form>
    </div>
  );
}