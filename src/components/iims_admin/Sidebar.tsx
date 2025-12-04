"use client";

import { 
  LayoutDashboard, 
  Truck, 
  Users, 
  Building2, 
  FileText, 
  Settings,
  LogOut,
  Wrench,
  Activity
} from "lucide-react";

type Tab = "dashboard" | "equipment" | "users" | "clients" | "service_requests" | "activities" | "reports" | "settings";

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const menuItems: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "equipment", label: "Equipment", icon: Truck },
  { id: "users", label: "Users", icon: Users },
  { id: "clients", label: "Clients", icon: Building2 },
  { id: "service_requests", label: "Service Requests", icon: Wrench },
  { id: "activities", label: "Activities", icon: Activity },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">U</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-900">UELMS</h1>
            <p className="text-xs text-gray-500">IIMS Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent-light text-accent"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User / Logout */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <Users size={16} className="text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
            <p className="text-xs text-gray-500 truncate">admin@iims.net</p>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <LogOut size={18} className="text-gray-500" />
          </button>
        </div>
      </div>
    </aside>
  );
}

