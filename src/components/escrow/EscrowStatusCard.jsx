export default function EscrowStatusCard({ escrow }) {
  return (
    <div className="border p-4 rounded bg-gray-50">
      <h3 className="font-semibold">Escrow Status</h3>

      <p>Status: {escrow.status}</p>
      <p>Amount: ${escrow.amount}</p>
      <p>Created: {new Date(escrow.createdAt).toLocaleDateString()}</p>
    </div>
  );
}