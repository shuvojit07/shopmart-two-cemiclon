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
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold text-amber-700 mb-6">
        My Profile
      </h1>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-medium text-gray-800">{user.name}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium text-gray-800">{user.email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Role</p>
          <span className="inline-block px-3 py-1 text-sm bg-amber-100 text-amber-700 rounded-full">
            {user.role}
          </span>
        </div>
      </div>
    </div>
  );
}