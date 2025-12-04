"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Clock,
  CheckCircle,
  Activity,
  User,
  Truck,
  Calendar,
  Fuel,
  Timer,
  MapPin,
  TrendingUp,
  PlayCircle,
  AlertTriangle
} from "lucide-react";

interface EquipmentActivity {
  id: string;
  equipment: {
    serialNumber: string;
    name: string;
    model: string;
  };
  operator: {
    name: string;
    id: string;
  };
  site: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  hoursLogged: number;
  fuelUsed: number;
  startOdometer: number;
  endOdometer: number;
  status: "completed" | "in_progress";
  preChecksPassed: boolean;
  postChecksPassed: boolean;
}

// Sample data - all activities across operators
const allActivities: EquipmentActivity[] = [
  {
    id: "ACT-001",
    equipment: { serialNumber: "EX-001", name: "CAT 320D Excavator", model: "320D" },
    operator: { name: "Rajesh Kumar", id: "OP-001" },
    site: "Site A - Block 3",
    date: "Dec 3, 2024",
    startTime: "06:00 AM",
    endTime: "02:30 PM",
    duration: "8h 30m",
    hoursLogged: 8.5,
    fuelUsed: 23,
    startOdometer: 12500,
    endOdometer: 12580,
    status: "completed",
    preChecksPassed: true,
    postChecksPassed: true,
  },
  {
    id: "ACT-002",
    equipment: { serialNumber: "EX-015", name: "Komatsu PC200 Excavator", model: "PC200" },
    operator: { name: "Vikram Patel", id: "OP-003" },
    site: "Site A - Block 1",
    date: "Dec 3, 2024",
    startTime: "07:00 AM",
    endTime: "12:00 PM",
    duration: "5h 00m",
    hoursLogged: 5,
    fuelUsed: 15,
    startOdometer: 8880,
    endOdometer: 8920,
    status: "completed",
    preChecksPassed: true,
    postChecksPassed: true,
  },
  {
    id: "ACT-003",
    equipment: { serialNumber: "EX-001", name: "CAT 320D Excavator", model: "320D" },
    operator: { name: "Rajesh Kumar", id: "OP-001" },
    site: "Site A - Block 3",
    date: "Dec 2, 2024",
    startTime: "06:15 AM",
    endTime: "02:00 PM",
    duration: "7h 45m",
    hoursLogged: 7.75,
    fuelUsed: 20,
    startOdometer: 12420,
    endOdometer: 12500,
    status: "completed",
    preChecksPassed: true,
    postChecksPassed: true,
  },
  {
    id: "ACT-004",
    equipment: { serialNumber: "EX-015", name: "Komatsu PC200 Excavator", model: "PC200" },
    operator: { name: "Rajesh Kumar", id: "OP-001" },
    site: "Site A - Block 1",
    date: "Dec 2, 2024",
    startTime: "02:30 PM",
    endTime: "07:00 PM",
    duration: "4h 30m",
    hoursLogged: 4.5,
    fuelUsed: 12,
    startOdometer: 8840,
    endOdometer: 8880,
    status: "completed",
    preChecksPassed: true,
    postChecksPassed: true,
  },
  {
    id: "ACT-005",
    equipment: { serialNumber: "EX-001", name: "CAT 320D Excavator", model: "320D" },
    operator: { name: "Amit Singh", id: "OP-002" },
    site: "Site A - Block 3",
    date: "Dec 1, 2024",
    startTime: "08:00 AM",
    endTime: "02:15 PM",
    duration: "6h 15m",
    hoursLogged: 6.25,
    fuelUsed: 18,
    startOdometer: 12340,
    endOdometer: 12420,
    status: "completed",
    preChecksPassed: true,
    postChecksPassed: true,
  },
  {
    id: "ACT-006",
    equipment: { serialNumber: "EX-001", name: "CAT 320D Excavator", model: "320D" },
    operator: { name: "Rajesh Kumar", id: "OP-001" },
    site: "Site A - Block 3",
    date: "Nov 30, 2024",
    startTime: "05:30 AM",
    endTime: "02:30 PM",
    duration: "9h 00m",
    hoursLogged: 9,
    fuelUsed: 25,
    startOdometer: 12250,
    endOdometer: 12340,
    status: "completed",
    preChecksPassed: true,
    postChecksPassed: true,
  },
  {
    id: "ACT-007",
    equipment: { serialNumber: "EX-003", name: "Volvo EC210 Excavator", model: "EC210" },
    operator: { name: "Suresh Reddy", id: "OP-004" },
    site: "Workshop Bay 2",
    date: "Nov 28, 2024",
    startTime: "10:00 AM",
    endTime: "01:20 PM",
    duration: "3h 20m",
    hoursLogged: 3.3,
    fuelUsed: 10,
    startOdometer: 5600,
    endOdometer: 5640,
    status: "completed",
    preChecksPassed: true,
    postChecksPassed: false,
  },
  {
    id: "ACT-008",
    equipment: { serialNumber: "EX-015", name: "Komatsu PC200 Excavator", model: "PC200" },
    operator: { name: "Amit Singh", id: "OP-002" },
    site: "Site A - Block 1",
    date: "Nov 27, 2024",
    startTime: "07:00 AM",
    endTime: "03:00 PM",
    duration: "8h 00m",
    hoursLogged: 8,
    fuelUsed: 22,
    startOdometer: 8760,
    endOdometer: 8840,
    status: "completed",
    preChecksPassed: true,
    postChecksPassed: true,
  },
];

// Active activities (in progress)
const activeActivities: EquipmentActivity[] = [
  {
    id: "ACT-LIVE-001",
    equipment: { serialNumber: "EX-001", name: "CAT 320D Excavator", model: "320D" },
    operator: { name: "Rajesh Kumar", id: "OP-001" },
    site: "Site A - Block 3",
    date: "Dec 3, 2024",
    startTime: "02:45 PM",
    endTime: "-",
    duration: "Ongoing",
    hoursLogged: 0,
    fuelUsed: 0,
    startOdometer: 12580,
    endOdometer: 0,
    status: "in_progress",
    preChecksPassed: true,
    postChecksPassed: false,
  },
];

export default function ActivitiesTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [equipmentFilter, setEquipmentFilter] = useState<string>("all");

  const filteredActivities = allActivities.filter((activity) => {
    const matchesSearch =
      activity.equipment.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.operator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEquipment = equipmentFilter === "all" || activity.equipment.serialNumber === equipmentFilter;
    return matchesSearch && matchesEquipment;
  });

  // Calculate stats
  const totalHours = allActivities.reduce((acc, a) => acc + a.hoursLogged, 0);
  const totalFuel = allActivities.reduce((acc, a) => acc + a.fuelUsed, 0);
  const uniqueEquipment = Array.from(new Set(allActivities.map((a) => a.equipment.serialNumber)));
  const uniqueOperators = Array.from(new Set(allActivities.map((a) => a.operator.name)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activities</h1>
          <p className="text-gray-500">Monitor equipment usage and operator activities</p>
        </div>
      </div>

      {/* Live Activities Banner */}
      {activeActivities.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <h3 className="font-semibold text-green-800">Live Activities ({activeActivities.length})</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeActivities.map((activity) => (
              <div key={activity.id} className="bg-white rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <PlayCircle size={18} className="text-green-600" />
                    <span className="font-medium text-gray-900">{activity.equipment.serialNumber}</span>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    In Progress
                  </span>
                </div>
                <p className="text-sm text-gray-600">{activity.equipment.name}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <User size={12} />
                    {activity.operator.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    Started {activity.startTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={18} className="text-accent" />
            <p className="text-sm text-gray-500">Total Activities</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{allActivities.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Timer size={18} className="text-blue-600" />
            <p className="text-sm text-gray-500">Total Hours</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalHours.toFixed(1)}h</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Fuel size={18} className="text-amber-600" />
            <p className="text-sm text-gray-500">Fuel Used</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalFuel}%</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Truck size={18} className="text-green-600" />
            <p className="text-sm text-gray-500">Equipment</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{uniqueEquipment.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <User size={18} className="text-purple-600" />
            <p className="text-sm text-gray-500">Operators</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{uniqueOperators.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ID, equipment, or operator..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-400" />
          <select
            value={equipmentFilter}
            onChange={(e) => setEquipmentFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent"
          >
            <option value="all">All Equipment</option>
            {uniqueEquipment.map((eq) => (
              <option key={eq} value={eq}>{eq}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Activities Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Activity</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Equipment</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Operator</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Site</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Time</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Duration</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Hours</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Fuel</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Checks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredActivities.map((activity) => (
              <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4">
                  <div>
                    <p className="text-xs text-gray-500 font-mono">{activity.id}</p>
                    <p className="text-sm text-gray-900">{activity.date}</p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{activity.equipment.serialNumber}</p>
                    <p className="text-xs text-gray-500">{activity.equipment.name}</p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-accent-light rounded-full flex items-center justify-center">
                      <span className="text-accent text-xs font-semibold">{activity.operator.name.charAt(0)}</span>
                    </div>
                    <span className="text-sm text-gray-900">{activity.operator.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin size={14} className="text-gray-400" />
                    {activity.site.split(" - ")[1] || activity.site}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm">
                    <p className="text-gray-900">{activity.startTime}</p>
                    <p className="text-gray-500">to {activity.endTime}</p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm font-medium text-gray-900">{activity.duration}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-gray-900">{activity.hoursLogged}h</span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-amber-600">-{activity.fuelUsed}%</span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1">
                    {activity.preChecksPassed ? (
                      <CheckCircle size={16} className="text-green-500" />
                    ) : (
                      <AlertTriangle size={16} className="text-amber-500" />
                    )}
                    {activity.postChecksPassed ? (
                      <CheckCircle size={16} className="text-green-500" />
                    ) : (
                      <AlertTriangle size={16} className="text-amber-500" />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredActivities.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <Activity size={32} className="mx-auto mb-2 text-gray-300" />
            <p>No activities found</p>
          </div>
        )}
      </div>

      {/* Activity Summary by Operator */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User size={18} />
            Hours by Operator
          </h3>
          <div className="space-y-3">
            {uniqueOperators.map((operator) => {
              const operatorHours = allActivities
                .filter((a) => a.operator.name === operator)
                .reduce((acc, a) => acc + a.hoursLogged, 0);
              const percentage = (operatorHours / totalHours) * 100;
              return (
                <div key={operator}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-700">{operator}</span>
                    <span className="font-medium text-gray-900">{operatorHours.toFixed(1)}h</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Truck size={18} />
            Hours by Equipment
          </h3>
          <div className="space-y-3">
            {uniqueEquipment.map((eq) => {
              const eqHours = allActivities
                .filter((a) => a.equipment.serialNumber === eq)
                .reduce((acc, a) => acc + a.hoursLogged, 0);
              const percentage = (eqHours / totalHours) * 100;
              const eqName = allActivities.find((a) => a.equipment.serialNumber === eq)?.equipment.name || "";
              return (
                <div key={eq}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-700">{eq} <span className="text-gray-400 text-xs">({eqName.split(" ")[0]})</span></span>
                    <span className="font-medium text-gray-900">{eqHours.toFixed(1)}h</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

