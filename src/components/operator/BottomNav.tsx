"use client";

import {
  Truck,
  Sparkles,
  Activity,
  Wrench,
  User,
} from "lucide-react";

type Tab = "equipment" | "assistant" | "activity" | "service" | "profile";

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const navItems: { id: Tab; label: string; icon: typeof Truck }[] = [
  { id: "equipment", label: "Equipment", icon: Truck },
  { id: "assistant", label: "AI", icon: Sparkles },
  { id: "activity", label: "Activity", icon: Activity },
  { id: "service", label: "Service", icon: Wrench },
  { id: "profile", label: "Profile", icon: User },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-gray-200 safe-bottom z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "text-accent"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 2}
                className="transition-all"
              />
              <span className={`text-[10px] font-medium ${isActive ? "font-semibold" : ""}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
