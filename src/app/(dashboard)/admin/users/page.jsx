"use client";

import { useEffect, useState } from "react";
import { User, ShieldCheck, Loader2, Mail, Search, UserX, Trash2, AlertCircle } from "lucide-react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  async function fetchUsers() {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function updateRole(userId, newRole) {
    setUpdatingId(userId);
    try {
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
      }
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDelete() {
    if (!userToDelete) return;
    try {
      const res = await fetch(`/api/users?id=${userToDelete._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u._id !== userToDelete._id));
        setIsModalOpen(false);
      }
    } catch (error) {
      alert("Could not delete user.");
    }
  }

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="animate-spin text-amber-500" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 min-h-screen">
      
      {/* Header & Search Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            User <span className="text-amber-600">Directory</span>
          </h1>
          <p className="text-slate-600 font-medium mt-1">Manage permissions and accounts.</p>
        </div>

        {/* Enhanced Search Bar */}
        <div className="relative w-full lg:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-600 group-focus-within:text-amber-700 transition-colors" size={20} />
          <input
            type="text"
            placeholder="Find user by email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-amber-100 rounded-2xl shadow-sm focus:ring-4 focus:ring-amber-100 focus:border-amber-500 text-slate-900 font-medium outline-none transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* User Cards List */}
      <div className="grid gap-5">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div 
              key={user._id} 
              className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-xl hover:border-amber-200 transition-all duration-300 shadow-sm"
            >
              
              <div className="flex items-center gap-5">
                <div className="h-16 w-16 bg-amber-50 border border-amber-100 rounded-2xl flex items-center justify-center text-amber-700 font-black text-2xl">
                  {user.name[0].toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-xl tracking-tight">{user.name}</h3>
                  <div className="flex items-center gap-2 text-slate-600 font-medium mt-0.5">
                    <Mail size={16} className="text-amber-600" /> 
                    {user.email}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end md:self-center">
                {/* Custom Styled Select */}
                <div className="relative">
                   <select
                    disabled={updatingId === user._id}
                    value={user.role}
                    onChange={(e) => updateRole(user._id, e.target.value)}
                    className="appearance-none cursor-pointer pl-5 pr-12 py-3 rounded-2xl border-2 border-amber-50 bg-amber-50/50 font-bold text-sm text-amber-900 hover:bg-amber-100 hover:border-amber-200 transition-all focus:outline-none disabled:opacity-50"
                  >
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-amber-700 text-xs">▼</div>
                </div>

                <button
                  onClick={() => {
                    setUserToDelete(user);
                    setIsModalOpen(true);
                  }}
                  className="p-3.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all border border-transparent hover:border-red-100"
                >
                  <Trash2 size={22} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-24 bg-amber-50/30 border-2 border-dashed border-amber-200 rounded-[2rem]">
             <UserX size={60} className="mx-auto text-amber-200 mb-4" />
             <h3 className="text-xl font-bold text-slate-800">No users found</h3>
             <p className="text-slate-500">We couldn't find any user with that email.</p>
          </div>
        )}
      </div>

      {/* Amber Styled Delete Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300 border border-amber-50">
            <div className="h-20 w-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={40} />
            </div>
            <h2 className="text-3xl font-black text-center text-slate-900 mb-3">Confirm Delete</h2>
            <p className="text-slate-600 text-center text-lg mb-10 leading-relaxed">
              Are you sure you want to remove <span className="font-bold text-amber-700 italic">"{userToDelete?.email}"</span>?
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-4 font-bold text-slate-600 bg-slate-100 rounded-2xl hover:bg-slate-200 transition-colors"
              >
                Go Back
              </button>
              <button 
                onClick={handleDelete}
                className="flex-1 py-4 font-bold text-white bg-amber-600 rounded-2xl hover:bg-amber-700 shadow-xl shadow-amber-200 transition-all"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}