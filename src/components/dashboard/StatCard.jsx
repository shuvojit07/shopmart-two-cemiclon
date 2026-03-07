export default function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 border rounded-xl shadow-sm">

      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h3 className="text-3xl font-bold mt-2">
        {value}
      </h3>

    </div>
  );
}