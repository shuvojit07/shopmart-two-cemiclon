// components/escrow/EscrowTimeline.jsx
const steps = ["Paid", "Escrow Hold", "Shipped", "Delivered", "Funds Released"];

export default function EscrowTimeline({ currentStatus }) {
  return (
    <div className="flex items-center justify-between w-full py-8">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-col items-center flex-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
            index <= steps.indexOf(currentStatus) ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-400"
          }`}>
            {index + 1}
          </div>
          <p className="text-[10px] mt-2 font-bold uppercase text-slate-500">{step}</p>
        </div>
      ))}
    </div>
  );
}