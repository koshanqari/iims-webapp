"use client";

import { Gauge, MapPin, Clock, ChevronRight, Zap } from "lucide-react";

interface EquipmentCardProps {
  id: string;
  name: string;
  model: string;
  status: "active" | "idle" | "maintenance";
  location: string;
  hoursToday: number;
  fuelLevel: number;
  engineHours: number;
  onClick?: () => void;
}

const statusConfig = {
  active: { label: "Active", color: "bg-green-500", textColor: "text-green-600", bgLight: "bg-green-50" },
  idle: { label: "Idle", color: "bg-amber-500", textColor: "text-amber-600", bgLight: "bg-amber-50" },
  maintenance: { label: "Maintenance", color: "bg-accent", textColor: "text-accent", bgLight: "bg-accent-light" },
};

export default function EquipmentCard({
  name,
  model,
  status,
  location,
  hoursToday,
  fuelLevel,
  engineHours,
  onClick,
}: EquipmentCardProps) {
  const statusInfo = statusConfig[status];

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${statusInfo.bgLight}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${statusInfo.color}`} />
              <span className={`text-[10px] font-medium ${statusInfo.textColor}`}>
                {statusInfo.label}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-500">{model}</p>
        </div>
        <ChevronRight
          size={20}
          className="text-gray-400 group-hover:text-accent transition-colors"
        />
      </div>

      <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
        <MapPin size={14} />
        <span>{location}</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-50 rounded-lg p-2.5">
          <div className="flex items-center gap-1.5 mb-1">
            <Clock size={12} className="text-gray-400" />
            <span className="text-[10px] text-gray-500">Today</span>
          </div>
          <p className="text-sm font-semibold text-gray-900">{hoursToday}h</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-2.5">
          <div className="flex items-center gap-1.5 mb-1">
            <Zap size={12} className="text-gray-400" />
            <span className="text-[10px] text-gray-500">Fuel</span>
          </div>
          <p className="text-sm font-semibold text-gray-900">{fuelLevel}%</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-2.5">
          <div className="flex items-center gap-1.5 mb-1">
            <Gauge size={12} className="text-gray-400" />
            <span className="text-[10px] text-gray-500">Engine</span>
          </div>
          <p className="text-sm font-semibold text-gray-900">{engineHours}h</p>
        </div>
      </div>
    </div>
  );
}

