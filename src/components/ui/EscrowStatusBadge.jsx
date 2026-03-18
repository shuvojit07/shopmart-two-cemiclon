// components/ui/EscrowStatusBadge.jsx
export default function EscrowStatusBadge({ status }) {
  const styles = {
    pending:        "bg-orange-100 text-orange-800 border-orange-200",
    payment_pending:"bg-orange-100 text-orange-800 border-orange-200",
    held:           "bg-blue-100 text-blue-800 border-blue-200",
    in_escrow:      "bg-blue-100 text-blue-800 border-blue-200",
    released:       "bg-green-100 text-green-800 border-green-200",
    disputed:       "bg-red-100 text-red-800 border-red-200 animate-pulse",
    refunded:       "bg-purple-100 text-purple-800 border-purple-200",
    cancelled:      "bg-gray-100 text-gray-700 border-gray-200",
  }[status?.toLowerCase() || "pending"] || "bg-gray-100 text-gray-700";

  const labels = {
    pending: "Awaiting Payment",
    payment_pending: "Awaiting Payment",
    held: "Funds Held",
    in_escrow: "Funds Held",
    released: "Released",
    disputed: "Disputed",
    refunded: "Refunded",
    cancelled: "Cancelled",
  };

  return (
    <span
      className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold border ${styles}`}
    >
      {labels[status?.toLowerCase()] || status || "Unknown"}
    </span>
  );
}