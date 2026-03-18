import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">

        {/* Header */}
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-amber-100 text-amber-700 text-3xl font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {user.name}
            </h1>
            <p className="text-gray-500">{user.email}</p>

            <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
              {user.role}
            </span>
          </div>
        </div>

        {/* Profile Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-semibold text-gray-800 mt-1">
              {user.name}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="font-semibold text-gray-800 mt-1">
              {user.email}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">User ID</p>
            <p className="font-semibold text-gray-800 mt-1 break-all">
              {user.id}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Account Role</p>
            <span className="inline-block mt-1 px-3 py-1 text-sm bg-amber-100 text-amber-700 rounded-full">
              {user.role}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}