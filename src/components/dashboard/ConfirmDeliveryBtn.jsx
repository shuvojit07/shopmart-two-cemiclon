// components/dashboard/ConfirmDeliveryBtn.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function ConfirmDeliveryBtn({ orderId }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleConfirm = async () => {
    if (!confirm("Have you received the product? Funds will be released to the seller.")) return;

    setLoading(true);
    try {
      const res = await fetch("/api/escrow/confirm-delivery", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      if (res.ok) {
        alert("Success! Funds released.");
        router.refresh(); // UI update korar jonno
      }
    } catch (err) {
      alert("Error confirming delivery");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleConfirm}
      disabled={loading}
      className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-green-600 transition-all flex items-center gap-2 disabled:opacity-50"
    >
      {loading ? "Releasing..." : <><CheckCircle size={18} /> Confirm Receipt</>}
    </button>
  );
}