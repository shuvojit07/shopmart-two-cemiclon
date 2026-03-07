"use client";
import { Bell } from "lucide-react";
import { useState, useEffect } from "react";

export default function NotificationBell({ userId }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await fetch(`/api/notifications/count?userId=${userId}`);
      const data = await res.json();
      setCount(data.count);
    };
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, [userId]);

  return (
    <div className="relative cursor-pointer hover:bg-amber-50 p-2 rounded-full transition">
      <Bell className="text-slate-700" size={24} />
      {count > 0 && (
        <span className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
          {count}
        </span>
      )}
    </div>
  );
}