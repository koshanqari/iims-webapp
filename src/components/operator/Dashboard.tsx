"use client";

import { useState } from "react";
import EquipmentCard from "./EquipmentCard";
import EquipmentDetail from "./EquipmentDetail";

interface Equipment {
  id: string;
  name: string;
  model: string;
  status: "active" | "idle" | "maintenance";
  location: string;
  hoursToday: number;
  fuelLevel: number;
  engineHours: number;
}

const equipmentData: Equipment[] = [
  {
    id: "1",
    name: "EX-001",
    model: "CAT 320D Excavator",
    status: "active",
    location: "Site A - Block 3",
    hoursToday: 6.5,
    fuelLevel: 72,
    engineHours: 4850,
  },
  {
    id: "2",
    name: "LD-002",
    model: "Komatsu WA380 Loader",
    status: "idle",
    location: "Site A - Block 1",
    hoursToday: 3.2,
    fuelLevel: 45,
    engineHours: 3200,
  },
  {
    id: "3",
    name: "DZ-003",
    model: "CAT D6T Dozer",
    status: "maintenance",
    location: "Workshop Bay 2",
    hoursToday: 0,
    fuelLevel: 88,
    engineHours: 6120,
  },
  {
    id: "4",
    name: "DT-004",
    model: "Volvo A40G Dump Truck",
    status: "active",
    location: "Site B - Quarry",
    hoursToday: 7.8,
    fuelLevel: 35,
    engineHours: 2890,
  },
];

export default function Dashboard() {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  if (selectedEquipment) {
    return (
      <EquipmentDetail
        equipment={selectedEquipment}
        onBack={() => setSelectedEquipment(null)}
      />
    );
  }

  const activeCount = equipmentData.filter((e) => e.status === "active").length;
  const idleCount = equipmentData.filter((e) => e.status === "idle").length;
  const maintenanceCount = equipmentData.filter((e) => e.status === "maintenance").length;

  return (
    <div className="p-4 pb-24 space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-green-600">{activeCount}</p>
          <p className="text-xs text-green-700">Active</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-amber-600">{idleCount}</p>
          <p className="text-xs text-amber-700">Idle</p>
        </div>
        <div className="bg-accent-light border border-red-200 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-accent">{maintenanceCount}</p>
          <p className="text-xs text-red-700">Maintenance</p>
        </div>
      </div>

      {/* Equipment List */}
      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3">
          Assigned Equipment ({equipmentData.length})
        </h2>
        <div className="space-y-3">
          {equipmentData.map((equipment, index) => (
            <div 
              key={equipment.id}
              className="animate-fadeIn"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <EquipmentCard
                {...equipment}
                onClick={() => setSelectedEquipment(equipment)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

