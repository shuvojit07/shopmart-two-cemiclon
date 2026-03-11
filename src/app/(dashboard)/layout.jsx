import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  // If not logged in → redirect to login
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-amber-50">
      {/* Sidebar - Pass role to Sidebar for faster role-based menu rendering */}
      <Sidebar role={session.user.role} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar - Pass user info for profile dropdown */}
        <Topbar user={session.user} />

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {/* Subtle Page Transition Wrapper */}
          <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}