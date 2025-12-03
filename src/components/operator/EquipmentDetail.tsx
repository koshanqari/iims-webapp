"use client";

import { 
  ArrowLeft, 
  Gauge, 
  MapPin, 
  Clock, 
  Zap, 
  ThermometerSun,
  Activity,
  PlayCircle,
  FileText,
  TrendingUp,
  Settings
} from "lucide-react";

interface EquipmentDetailProps {
  equipment: {
    id: string;
    name: string;
    model: string;
    status: "active" | "idle" | "maintenance";
    location: string;
    hoursToday: number;
    fuelLevel: number;
    engineHours: number;
  };
  onBack: () => void;
}

const statusConfig = {
  active: { label: "Active", color: "bg-green-500", textColor: "text-green-600" },
  idle: { label: "Idle", color: "bg-amber-500", textColor: "text-amber-600" },
  maintenance: { label: "Maintenance", color: "bg-accent", textColor: "text-accent" },
};

export default function EquipmentDetail({ equipment, onBack }: EquipmentDetailProps) {
  const statusInfo = statusConfig[equipment.status];

  const telemetryData = [
    { icon: Gauge, label: "Engine RPM", value: "1,850", unit: "rpm" },
    { icon: ThermometerSun, label: "Temp", value: "87", unit: "°C" },
    { icon: Zap, label: "Fuel Level", value: `${equipment.fuelLevel}`, unit: "%" },
    { icon: Activity, label: "Hydraulic", value: "2,450", unit: "psi" },
  ];

  const quickActions = [
    { icon: PlayCircle, label: "Training Videos", color: "text-blue-600" },
    { icon: FileText, label: "Parts List", color: "text-emerald-600" },
    { icon: TrendingUp, label: "Analytics", color: "text-purple-600" },
    { icon: Settings, label: "Maintenance", color: "text-amber-600" },
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-900" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-900">{equipment.name}</h1>
            <p className="text-sm text-gray-500">{equipment.model}</p>
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${statusInfo.color} bg-opacity-10`}>
            <div className={`w-2 h-2 rounded-full ${statusInfo.color}`} />
            <span className={`text-xs font-medium ${statusInfo.textColor}`}>
              {statusInfo.label}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Location Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-light rounded-lg flex items-center justify-center">
              <MapPin size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Current Location</p>
              <p className="font-medium text-gray-900">{equipment.location}</p>
            </div>
          </div>
        </div>

        {/* Telemetry Grid */}
        <div>
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Live Telemetry</h2>
          <div className="grid grid-cols-2 gap-3">
            {telemetryData.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={16} className="text-gray-400" />
                    <span className="text-xs text-gray-500">{item.label}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-900">{item.value}</span>
                    <span className="text-sm text-gray-500">{item.unit}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Operation Stats */}
        <div>
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Operation Stats</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-400" />
                <span className="text-sm text-gray-500">Hours Today</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">{equipment.hoursToday}h</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent rounded-full transition-all duration-500"
                style={{ width: `${(equipment.hoursToday / 12) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>0h</span>
              <span>12h target</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-2">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className="flex flex-col items-center gap-2 p-3 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all"
                >
                  <Icon size={24} className={action.color} />
                  <span className="text-[10px] text-gray-500 text-center leading-tight">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Engine Hours History */}
        <div>
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Engine Hours History</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-end justify-between h-32 gap-2">
              {[65, 85, 72, 90, 78, 95, 82].map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-1">
                  <div 
                    className="w-full bg-accent rounded-t transition-all duration-500"
                    style={{ height: `${value}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-gray-500">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

