"use client";

import { X, AlertTriangle, CheckCircle, Info, Bell } from "lucide-react";

interface Notification {
  id: string;
  type: "alert" | "success" | "info";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "alert",
    title: "Maintenance Due",
    message: "CAT 320D - Oil change required in 50 engine hours",
    time: "10 min ago",
    read: false,
  },
  {
    id: "2",
    type: "success",
    title: "Service Complete",
    message: "Komatsu PC200 - Filter replacement completed",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "Assignment Update",
    message: "You have been assigned to Hitachi ZX200 at Site B",
    time: "2 hours ago",
    read: true,
  },
  {
    id: "4",
    type: "alert",
    title: "Low Fuel Alert",
    message: "Volvo EC220D - Fuel level below 20%",
    time: "3 hours ago",
    read: true,
  },
];

const iconConfig = {
  alert: { icon: AlertTriangle, color: "text-accent", bg: "bg-accent-light" },
  success: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
  info: { icon: Info, color: "text-blue-600", bg: "bg-blue-50" },
};

export default function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-50"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-[380px] bg-white z-50 animate-fadeIn shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Bell size={20} className="text-gray-900" />
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.map((notification) => {
              const config = iconConfig[notification.type];
              const Icon = config.icon;
              return (
                <div
                  key={notification.id}
                  className={`p-4 rounded-xl border transition-all ${
                    notification.read
                      ? "bg-white border-gray-200"
                      : "bg-gray-50 border-accent border-opacity-30"
                  }`}
                >
                  <div className="flex gap-3">
                    <div className={`w-10 h-10 ${config.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon size={18} className={config.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-medium text-sm text-gray-900 truncate">
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-400">{notification.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <button className="w-full py-2.5 text-sm font-medium text-accent hover:bg-accent-light rounded-lg transition-colors">
              Mark all as read
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

