// src/app/(dashboard)/dashboard/page.jsx
"use client";
import React from 'react';
import { useStore } from '@/store';

// ড্যাশবোর্ড কম্পোনেন্টগুলো ইমপোর্ট করা হচ্ছে
import AdminView from '@/components/dashboard/AdminView';
import SellerView from '@/components/dashboard/SellerView';
import BuyerView from '@/components/dashboard/BuyerView';
import EscrowView from '@/components/dashboard/EscrowView';

export default function DashboardPage() {
  const { user } = useStore();

  // ইউজার লোড না হওয়া পর্যন্ত ওয়েট করা
  if (!user) {
    return (
      <div className="p-10 text-center font-black italic text-slate-400">
        Loading Session...
      </div>
    );
  }

  const renderDashboard = () => {
    // রোল অনুযায়ী ভিউ রিটার্ন করা
    switch (user?.role?.toLowerCase()) {
      case 'admin': return <AdminView />;
      case 'seller': return <SellerView />;
      case 'buyer': return <BuyerView />;
      case 'escrow': return <EscrowView />;
      default: return (
        <div className="p-10 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 text-center">
          <p className="text-slate-400 font-black italic uppercase tracking-widest">
            Access Denied: Invalid Role
          </p>
        </div>
      );
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {renderDashboard()}
    </div>
  );
}