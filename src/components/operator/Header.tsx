"use client";

import { Bell } from "lucide-react";

interface HeaderProps {
  title: string;
  showNotifications?: boolean;
  notificationCount?: number;
  onNotificationClick?: () => void;
}

export default function Header({
  title,
  showNotifications = true,
  notificationCount = 0,
  onNotificationClick,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="https://iba-consulting-prod.b-cdn.net/gj-logos/UELMS.png" 
            alt="UELMS Logo" 
            className="h-12 object-contain"
          />
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        </div>
        {showNotifications && (
          <button
            onClick={onNotificationClick}
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Bell size={22} className="text-gray-900" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </button>
        )}
      </div>
    </header>
  );
}

