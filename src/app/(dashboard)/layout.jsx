"use client";
import React from 'react';
import { useSession } from "next-auth/react";
import Sidebar from '@/components/dashboard/Sidebar'; 
import Topbar from '@/components/dashboard/Topbar'; 

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();

  
  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-500 border-slate-100"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50/50">
     
      <Sidebar />


      <div className="flex-1 flex flex-col min-w-0">
        
    
        <Topbar user={session?.user} />

      
        <main className="p-4 md:p-10 overflow-y-auto h-[calc(100vh-80px)]">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}