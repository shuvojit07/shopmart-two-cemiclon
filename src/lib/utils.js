export const getEscrowStatusDetails = (status) => {
  const map = {
    hold: { label: "In Escrow", color: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
    shipped: { label: "On the Way", color: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
    received: { label: "Received", color: "bg-indigo-100 text-indigo-700", dot: "bg-indigo-500" },
    released: { label: "Funds Released", color: "bg-green-100 text-green-700", dot: "bg-green-500" },
    disputed: { label: "Under Review", color: "bg-red-100 text-red-700", dot: "bg-red-500" },
    refunded: { label: "Refunded", color: "bg-slate-100 text-slate-700", dot: "bg-slate-500" },
  };
  return map[status?.toLowerCase()] || { label: status, color: "bg-gray-100", dot: "bg-gray-400" };
};