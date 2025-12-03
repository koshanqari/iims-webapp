"use client";

import { useState } from "react";
import { 
  Plus, 
  Clock, 
  PlayCircle, 
  PauseCircle, 
  CheckCircle,
  Fuel,
  Navigation,
  Wrench,
  ChevronRight
} from "lucide-react";

interface ActivityEntry {
  id: string;
  type: "start" | "stop" | "refuel" | "travel" | "task" | "break";
  title: string;
  description: string;
  time: string;
  equipment?: string;
}

const activityData: ActivityEntry[] = [
  {
    id: "1",
    type: "start",
    title: "Shift Started",
    description: "Started operating EX-001",
    time: "06:00 AM",
    equipment: "EX-001",
  },
  {
    id: "2",
    type: "task",
    title: "Excavation Work",
    description: "Block 3 - Trench digging",
    time: "06:30 AM",
    equipment: "EX-001",
  },
  {
    id: "3",
    type: "refuel",
    title: "Refueling",
    description: "Added 200L diesel",
    time: "10:15 AM",
    equipment: "EX-001",
  },
  {
    id: "4",
    type: "break",
    title: "Lunch Break",
    description: "30 minutes",
    time: "12:00 PM",
  },
  {
    id: "5",
    type: "travel",
    title: "Site Transfer",
    description: "Moved to Block 4",
    time: "12:45 PM",
    equipment: "EX-001",
  },
];

const iconConfig = {
  start: { icon: PlayCircle, color: "text-green-600", bg: "bg-green-50" },
  stop: { icon: PauseCircle, color: "text-red-600", bg: "bg-red-50" },
  refuel: { icon: Fuel, color: "text-blue-600", bg: "bg-blue-50" },
  travel: { icon: Navigation, color: "text-purple-600", bg: "bg-purple-50" },
  task: { icon: Wrench, color: "text-amber-600", bg: "bg-amber-50" },
  break: { icon: Clock, color: "text-gray-600", bg: "bg-gray-100" },
};

const quickLogOptions = [
  { type: "start", label: "Start Shift", icon: PlayCircle, color: "text-green-600" },
  { type: "stop", label: "End Shift", icon: PauseCircle, color: "text-red-600" },
  { type: "refuel", label: "Refuel", icon: Fuel, color: "text-blue-600" },
  { type: "task", label: "Log Task", icon: Wrench, color: "text-amber-600" },
  { type: "travel", label: "Site Transfer", icon: Navigation, color: "text-purple-600" },
  { type: "break", label: "Break", icon: Clock, color: "text-gray-600" },
];

export default function ActivityLog() {
  const [showQuickLog, setShowQuickLog] = useState(false);
  const [activities, setActivities] = useState(activityData);

  const handleQuickLog = (type: string) => {
    const newActivity: ActivityEntry = {
      id: Date.now().toString(),
      type: type as ActivityEntry["type"],
      title: quickLogOptions.find(o => o.type === type)?.label || "Activity",
      description: "Logged via quick action",
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      equipment: "EX-001",
    };
    setActivities([newActivity, ...activities]);
    setShowQuickLog(false);
  };

  return (
    <div className="p-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Today&apos;s Activity</h2>
          <p className="text-sm text-gray-500">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</p>
        </div>
        <button
          onClick={() => setShowQuickLog(!showQuickLog)}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-medium text-sm hover:bg-red-700 transition-colors"
        >
          <Plus size={18} />
          <span>Log</span>
        </button>
      </div>

      {/* Quick Log Options */}
      {showQuickLog && (
        <div className="mb-4 bg-white border border-gray-200 rounded-xl p-4 animate-fadeIn">
          <p className="text-xs text-gray-500 mb-3">Quick Log Activity</p>
          <div className="grid grid-cols-3 gap-2">
            {quickLogOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.type}
                  onClick={() => handleQuickLog(option.type)}
                  className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Icon size={24} className={option.color} />
                  <span className="text-xs text-gray-700">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-gray-400" />
            <span className="text-xs text-gray-500">Hours Logged</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">6.5h</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={16} className="text-gray-400" />
            <span className="text-xs text-gray-500">Activities</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{activities.length}</p>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-200" />
        
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const config = iconConfig[activity.type];
            const Icon = config.icon;
            return (
              <div 
                key={activity.id} 
                className="relative flex gap-4 animate-fadeIn"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`w-10 h-10 ${config.bg} rounded-full flex items-center justify-center z-10`}>
                  <Icon size={18} className={config.color} />
                </div>
                <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{activity.title}</h3>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                      {activity.equipment && (
                        <span className="inline-block mt-2 text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                          {activity.equipment}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span>{activity.time}</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

