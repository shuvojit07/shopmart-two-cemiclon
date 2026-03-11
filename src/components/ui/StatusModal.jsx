// src/components/ui/StatusModal.jsx
export default function StatusModal({ status, message }) {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[100]">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl text-center max-w-sm mx-4">
        <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${
          status === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
        }`}>
          {status === "success" ? <CheckCircle2 size={40} /> : <XCircle size={40} />}
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">
          {status === "success" ? "Payment Successful!" : "Payment Failed"}
        </h2>
        <p className="text-slate-500 font-medium mb-8">{message}</p>
        <button 
          onClick={() => window.location.href = "/buyer/orders"}
          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}