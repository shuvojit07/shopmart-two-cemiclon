import Withdrawal from "@/models/Withdrawal";
import { connectDB } from "@/lib/db";

export default async function AdminWithdrawals() {

  await connectDB();

  const requests = await Withdrawal.find()
    .populate("seller", "name email")
    .sort({ createdAt: -1 });

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Withdrawal Requests
      </h1>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="p-4">Seller</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Method</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>

            {requests.map((req) => (

              <tr key={req._id} className="border-t">

                <td className="p-4">
                  {req.seller?.name}
                </td>

                <td className="p-4 font-semibold text-amber-600">
                  ${req.amount}
                </td>

                <td className="p-4">
                  {req.method}
                </td>

                <td className="p-4">
                  {req.status}
                </td>

                <td className="p-4 space-x-2">

                  <button className="px-3 py-1 bg-green-500 text-white rounded">
                    Approve
                  </button>

                  <button className="px-3 py-1 bg-red-500 text-white rounded">
                    Reject
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}