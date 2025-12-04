"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  ArrowLeft,
  ChevronRight,
  Clock,
  Fuel,
  Gauge,
  ThermometerSun,
  MapPin,
  CheckCircle,
  Circle,
  PlayCircle,
  StopCircle,
  AlertTriangle,
  Truck,
  Activity,
  Timer,
  Plus,
  AlertOctagon,
  Zap,
  TrendingUp
} from "lucide-react";
import { ServiceRequestPrefill } from "@/app/operator/page";

// Types
interface Equipment {
  id: string;
  serialNumber: string;
  name: string;
  model: string;
  status: "available" | "in_use" | "maintenance";
  location: string;
  fuelLevel: number;
  engineHours: number;
  engineTemp: number;
  hydraulicPSI: number;
  odometerReading: number;
}

interface SafetyCheck {
  id: string;
  label: string;
  required: boolean;
  checked: boolean;
}

interface ActiveActivity {
  id: string;
  equipmentId: string;
  equipment: Equipment;
  startTime: string; // ISO string for localStorage
  preChecks: SafetyCheck[];
  startReadings: {
    fuelLevel: number;
    engineHours: number;
    odometerReading: number;
  };
}

interface CompletedActivity {
  id: string;
  equipment: Equipment;
  startTime: string;
  endTime: string;
  duration: string;
  startReadings: { fuelLevel: number; engineHours: number; odometerReading: number };
  endReadings: { fuelLevel: number; engineHours: number; odometerReading: number };
}

// Storage keys
const STORAGE_KEYS = {
  ACTIVE_ACTIVITIES: "uelms_active_activities",
  COMPLETED_ACTIVITIES: "uelms_completed_activities",
};

// Sample data
const assignedEquipment: Equipment[] = [
  {
    id: "1",
    serialNumber: "EX-001",
    name: "CAT 320D Excavator",
    model: "320D",
    status: "available",
    location: "Site A - Block 3",
    fuelLevel: 72,
    engineHours: 4850,
    engineTemp: 45,
    hydraulicPSI: 2450,
    odometerReading: 12580,
  },
  {
    id: "2",
    serialNumber: "EX-015",
    name: "Komatsu PC200 Excavator",
    model: "PC200",
    status: "available",
    location: "Site A - Block 1",
    fuelLevel: 65,
    engineHours: 3200,
    engineTemp: 42,
    hydraulicPSI: 2380,
    odometerReading: 8920,
  },
  {
    id: "3",
    serialNumber: "EX-003",
    name: "Volvo EC210 Excavator",
    model: "EC210",
    status: "maintenance",
    location: "Workshop Bay 2",
    fuelLevel: 45,
    engineHours: 2100,
    engineTemp: 38,
    hydraulicPSI: 2200,
    odometerReading: 5640,
  },
];

const preStartChecks: SafetyCheck[] = [
  { id: "1", label: "Walk-around inspection completed", required: true, checked: false },
  { id: "2", label: "Mirrors and visibility check", required: true, checked: false },
  { id: "3", label: "Seat belt functional", required: true, checked: false },
  { id: "4", label: "Warning lights check", required: true, checked: false },
  { id: "5", label: "Hydraulic hoses - no leaks", required: true, checked: false },
  { id: "6", label: "Track/tire condition verified", required: false, checked: false },
  { id: "7", label: "Fire extinguisher present", required: true, checked: false },
  { id: "8", label: "Emergency exits clear", required: false, checked: false },
];

const postStopChecks: SafetyCheck[] = [
  { id: "1", label: "Equipment parked in designated area", required: true, checked: false },
  { id: "2", label: "Parking brake engaged", required: true, checked: false },
  { id: "3", label: "Bucket/attachment lowered", required: true, checked: false },
  { id: "4", label: "Engine shut down properly", required: true, checked: false },
  { id: "5", label: "Keys removed and secured", required: true, checked: false },
  { id: "6", label: "No visible leaks or damage", required: false, checked: false },
  { id: "7", label: "Area around equipment cleared", required: false, checked: false },
];

const defaultCompletedActivities: CompletedActivity[] = [
  {
    id: "prev-1",
    equipment: assignedEquipment[0],
    startTime: "06:00 AM",
    endTime: "02:30 PM",
    duration: "08:30:00",
    startReadings: { fuelLevel: 95, engineHours: 4842, odometerReading: 12500 },
    endReadings: { fuelLevel: 72, engineHours: 4850, odometerReading: 12580 },
  },
  {
    id: "prev-2",
    equipment: assignedEquipment[1],
    startTime: "07:00 AM",
    endTime: "12:00 PM",
    duration: "05:00:00",
    startReadings: { fuelLevel: 80, engineHours: 3195, odometerReading: 8880 },
    endReadings: { fuelLevel: 65, engineHours: 3200, odometerReading: 8920 },
  },
];

type ViewState = "list" | "select" | "pre_start" | "active" | "pre_stop";

interface ActivityLogProps {
  onReportIssue?: (prefill: ServiceRequestPrefill) => void;
}

export default function ActivityLog({ onReportIssue }: ActivityLogProps) {
  const [viewState, setViewState] = useState<ViewState>("list");
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [safetyChecks, setSafetyChecks] = useState<SafetyCheck[]>([]);
  const [activeActivities, setActiveActivities] = useState<ActiveActivity[]>([]);
  const [selectedActiveActivity, setSelectedActiveActivity] = useState<ActiveActivity | null>(null);
  const [elapsedTimes, setElapsedTimes] = useState<Record<string, number>>({});
  const [manualReadings, setManualReadings] = useState({ odometerReading: "" });
  const [completedActivities, setCompletedActivities] = useState<CompletedActivity[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedActive = localStorage.getItem(STORAGE_KEYS.ACTIVE_ACTIVITIES);
      const savedCompleted = localStorage.getItem(STORAGE_KEYS.COMPLETED_ACTIVITIES);
      
      if (savedActive) {
        try {
          setActiveActivities(JSON.parse(savedActive));
        } catch (e) {
          console.error("Failed to parse active activities", e);
        }
      }
      
      if (savedCompleted) {
        try {
          setCompletedActivities(JSON.parse(savedCompleted));
        } catch (e) {
          console.error("Failed to parse completed activities", e);
          setCompletedActivities(defaultCompletedActivities);
        }
      } else {
        setCompletedActivities(defaultCompletedActivities);
      }
      
      setIsLoaded(true);
    }
  }, []);

  // Save active activities to localStorage
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_ACTIVITIES, JSON.stringify(activeActivities));
    }
  }, [activeActivities, isLoaded]);

  // Save completed activities to localStorage
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.COMPLETED_ACTIVITIES, JSON.stringify(completedActivities));
    }
  }, [completedActivities, isLoaded]);

  // Timer for all active activities
  useEffect(() => {
    const interval = setInterval(() => {
      const newElapsedTimes: Record<string, number> = {};
      activeActivities.forEach(activity => {
        const elapsed = Math.floor((Date.now() - new Date(activity.startTime).getTime()) / 1000);
        newElapsedTimes[activity.id] = elapsed;
      });
      setElapsedTimes(newElapsedTimes);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [activeActivities]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Get equipment IDs that already have active activities
  const activeEquipmentIds = activeActivities.map(a => a.equipmentId);

  const handleSelectEquipment = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setSafetyChecks(preStartChecks.map(c => ({ ...c, checked: false })));
    setManualReadings({ odometerReading: equipment.odometerReading.toString() });
    setViewState("pre_start");
  };

  const toggleCheck = (id: string) => {
    setSafetyChecks(prev => 
      prev.map(c => c.id === id ? { ...c, checked: !c.checked } : c)
    );
  };

  const allRequiredChecked = safetyChecks.filter(c => c.required).every(c => c.checked);

  const handleStartActivity = () => {
    if (!selectedEquipment || !allRequiredChecked) return;
    
    const activity: ActiveActivity = {
      id: Date.now().toString(),
      equipmentId: selectedEquipment.id,
      equipment: selectedEquipment,
      startTime: new Date().toISOString(),
      preChecks: safetyChecks,
      startReadings: {
        fuelLevel: selectedEquipment.fuelLevel,
        engineHours: selectedEquipment.engineHours,
        odometerReading: parseInt(manualReadings.odometerReading) || selectedEquipment.odometerReading,
      },
    };
    
    setActiveActivities(prev => [...prev, activity]);
    setSelectedEquipment(null);
    setViewState("list"); // Go back to list after starting
  };

  const handleViewActiveActivity = (activity: ActiveActivity) => {
    setSelectedActiveActivity(activity);
    setViewState("active");
  };

  const handleInitiateStop = () => {
    setSafetyChecks(postStopChecks.map(c => ({ ...c, checked: false })));
    setViewState("pre_stop");
  };

  const handleStopActivity = () => {
    if (!selectedActiveActivity || !allRequiredChecked) return;
    
    const elapsedTime = elapsedTimes[selectedActiveActivity.id] || 0;
    
    const completed: CompletedActivity = {
      id: Date.now().toString(),
      equipment: selectedActiveActivity.equipment,
      startTime: new Date(selectedActiveActivity.startTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      endTime: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      duration: formatTime(elapsedTime),
      startReadings: selectedActiveActivity.startReadings,
      endReadings: {
        fuelLevel: selectedActiveActivity.equipment.fuelLevel - Math.floor(elapsedTime / 600),
        engineHours: selectedActiveActivity.startReadings.engineHours + Math.floor(elapsedTime / 3600),
        odometerReading: selectedActiveActivity.startReadings.odometerReading + Math.floor(elapsedTime / 60),
      },
    };
    
    setCompletedActivities(prev => [completed, ...prev]);
    setActiveActivities(prev => prev.filter(a => a.id !== selectedActiveActivity.id));
    setSelectedActiveActivity(null);
    setViewState("list");
  };

  const handleBackToList = useCallback(() => {
    setViewState("list");
    setSelectedActiveActivity(null);
    setSelectedEquipment(null);
  }, []);

  // Show loading state
  if (!isLoaded) {
    return (
      <div className="p-4 flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  // Equipment Selection View
  if (viewState === "select") {
    const availableEquipment = assignedEquipment.filter(
      e => e.status !== "maintenance" && !activeEquipmentIds.includes(e.id)
    );
    
    return (
      <div className="p-4 pb-24">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={handleBackToList} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h2 className="font-semibold text-gray-900">Select Equipment</h2>
        </div>

        <p className="text-sm text-gray-500 mb-4">Choose the equipment you want to start operating</p>

        {availableEquipment.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
            <Truck size={32} className="mx-auto text-gray-300 mb-2" />
            <p className="text-sm text-gray-500">All available equipment is currently in use</p>
          </div>
        ) : (
          <div className="space-y-3">
            {availableEquipment.map((equipment) => (
              <button
                key={equipment.id}
                onClick={() => handleSelectEquipment(equipment)}
                className="w-full bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-accent transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center">
                      <Truck size={24} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{equipment.serialNumber}</h3>
                      <p className="text-sm text-gray-500">{equipment.name}</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Fuel</p>
                    <p className="text-sm font-medium text-gray-900">{equipment.fuelLevel}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Hours</p>
                    <p className="text-sm font-medium text-gray-900">{equipment.engineHours.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium text-gray-900 truncate">{equipment.location.split(" - ")[1]}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Pre-Start Checklist View
  if (viewState === "pre_start" && selectedEquipment) {
    return (
      <div className="p-4 pb-36 overflow-y-auto">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setViewState("select")} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h2 className="font-semibold text-gray-900">Pre-Start Checklist</h2>
            <p className="text-xs text-gray-500">{selectedEquipment.serialNumber} - {selectedEquipment.name}</p>
          </div>
        </div>

        {/* Current Readings */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Current Readings</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Fuel size={18} className="text-amber-600" />
              <div>
                <p className="text-xs text-gray-500">Fuel Level</p>
                <p className="font-medium text-gray-900">{selectedEquipment.fuelLevel}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Clock size={18} className="text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">Engine Hours</p>
                <p className="font-medium text-gray-900">{selectedEquipment.engineHours.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <ThermometerSun size={18} className="text-orange-600" />
              <div>
                <p className="text-xs text-gray-500">Engine Temp</p>
                <p className="font-medium text-gray-900">{selectedEquipment.engineTemp}°C</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Gauge size={18} className="text-green-600" />
              <div>
                <p className="text-xs text-gray-500">Hydraulic PSI</p>
                <p className="font-medium text-gray-900">{selectedEquipment.hydraulicPSI.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Manual Reading Entry */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Enter Readings</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Odometer Reading (km)</label>
              <input
                type="number"
                value={manualReadings.odometerReading}
                onChange={(e) => setManualReadings({ ...manualReadings, odometerReading: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
              />
            </div>
          </div>
        </div>

        {/* Safety Checklist */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={18} className="text-amber-600" />
            <h3 className="text-sm font-semibold text-gray-900">Safety Checklist</h3>
          </div>
          <div className="space-y-2">
            {safetyChecks.map((check) => (
              <button
                key={check.id}
                onClick={() => toggleCheck(check.id)}
                className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {check.checked ? (
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                ) : (
                  <Circle size={20} className="text-gray-300 flex-shrink-0" />
                )}
                <span className={`text-sm text-left ${check.checked ? "text-gray-900" : "text-gray-600"}`}>
                  {check.label}
                  {check.required && <span className="text-accent ml-1">*</span>}
                </span>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">* Required checks must be completed before starting</p>
        </div>

        {/* Start Button */}
        <div className="fixed bottom-20 left-4 right-4 max-w-[398px] mx-auto space-y-2">
          <button
            onClick={handleStartActivity}
            disabled={!allRequiredChecked}
            className={`w-full h-14 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
              allRequiredChecked 
                ? "bg-green-600 text-white hover:bg-green-700 active:scale-[0.98]" 
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            <PlayCircle size={24} />
            {allRequiredChecked ? "Start Activity" : "Complete all required checks"}
          </button>
        </div>
      </div>
    );
  }

  // Active Activity View
  if (viewState === "active" && selectedActiveActivity) {
    const elapsedTime = elapsedTimes[selectedActiveActivity.id] || 0;
    
    return (
      <div className="p-4 pb-32 min-h-[calc(100vh-120px)] overflow-y-auto">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={handleBackToList} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h2 className="font-semibold text-gray-900">Activity in Progress</h2>
            <p className="text-xs text-gray-500">{selectedActiveActivity.equipment.serialNumber}</p>
          </div>
        </div>

        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Activity size={40} className="text-green-600" />
          </div>
          <p className="text-sm text-gray-500">{selectedActiveActivity.equipment.name}</p>
        </div>

        {/* Timer */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-500 mb-2">
            <Timer size={18} />
            <span className="text-sm">Duration</span>
          </div>
          <p className="text-4xl font-bold text-gray-900 font-mono">{formatTime(elapsedTime)}</p>
          <p className="text-xs text-gray-500 mt-2">
            Started at {new Date(selectedActiveActivity.startTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>

        {/* Equipment Health Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Activity size={16} className="text-accent" />
              Equipment Health
            </h3>
            <span className="text-xs text-gray-500">Live Data</span>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {/* Engine Hours */}
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Clock size={12} />
                <span className="text-xs">Engine Hours</span>
              </div>
              <p className="text-xl font-bold text-gray-900">
                {(selectedActiveActivity.startReadings.engineHours + elapsedTime / 3600).toFixed(1)}
              </p>
              <p className="text-xs text-gray-500">hours</p>
            </div>
            
            {/* Uptime */}
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <TrendingUp size={12} />
                <span className="text-xs">Uptime</span>
              </div>
              <p className="text-xl font-bold text-gray-900">94%</p>
              <p className="text-xs text-green-600">This month</p>
            </div>
            
            {/* Engine Temp */}
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <ThermometerSun size={12} />
                <span className="text-xs">Engine Temp</span>
              </div>
              <p className="text-xl font-bold text-gray-900">
                {Math.min(95, selectedActiveActivity.equipment.engineTemp + Math.floor(elapsedTime / 120))}°C
              </p>
              <p className={`text-xs ${
                Math.min(95, selectedActiveActivity.equipment.engineTemp + Math.floor(elapsedTime / 120)) > 90 
                  ? 'text-amber-600' 
                  : 'text-green-600'
              }`}>
                {Math.min(95, selectedActiveActivity.equipment.engineTemp + Math.floor(elapsedTime / 120)) > 90 ? 'Warming up' : 'Normal'}
              </p>
            </div>
            
            {/* Hydraulic PSI */}
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Gauge size={12} />
                <span className="text-xs">Hydraulic PSI</span>
              </div>
              <p className="text-xl font-bold text-gray-900">
                {selectedActiveActivity.equipment.hydraulicPSI.toLocaleString()}
              </p>
              <p className="text-xs text-green-600">Optimal</p>
            </div>
            
            {/* Fuel Level */}
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Zap size={12} />
                <span className="text-xs">Fuel Level</span>
              </div>
              <p className="text-xl font-bold text-gray-900">
                {Math.max(0, selectedActiveActivity.equipment.fuelLevel - Math.floor(elapsedTime / 600))}%
              </p>
              <div className="mt-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    Math.max(0, selectedActiveActivity.equipment.fuelLevel - Math.floor(elapsedTime / 600)) > 30 
                      ? 'bg-green-500' 
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${Math.max(0, selectedActiveActivity.equipment.fuelLevel - Math.floor(elapsedTime / 600))}%` }}
                />
              </div>
            </div>
            
            {/* Status */}
            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Activity size={12} />
                <span className="text-xs">Status</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                <p className="text-lg font-bold text-gray-900">Running</p>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-accent" />
            <div>
              <p className="text-xs text-gray-500">Current Location</p>
              <p className="font-medium text-gray-900">{selectedActiveActivity.equipment.location}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Report Issue Button */}
          <button
            onClick={() => {
              if (onReportIssue) {
                onReportIssue({
                  equipmentId: selectedActiveActivity.equipment.id,
                  equipmentName: selectedActiveActivity.equipment.name,
                  serialNumber: selectedActiveActivity.equipment.serialNumber,
                });
              }
            }}
            className="w-full py-4 bg-amber-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-amber-600 transition-colors"
          >
            <AlertOctagon size={24} />
            Report Issue
          </button>

          {/* Stop Button */}
          <button
            onClick={handleInitiateStop}
            className="w-full py-4 bg-accent text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors"
          >
            <StopCircle size={24} />
            End Activity
          </button>
        </div>
      </div>
    );
  }

  // Pre-Stop Checklist View
  if (viewState === "pre_stop" && selectedActiveActivity) {
    const elapsedTime = elapsedTimes[selectedActiveActivity.id] || 0;
    
    return (
      <div className="p-4 pb-24">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setViewState("active")} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h2 className="font-semibold text-gray-900">Post-Operation Checklist</h2>
            <p className="text-xs text-gray-500">{selectedActiveActivity.equipment.serialNumber}</p>
          </div>
        </div>

        {/* Activity Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Activity Summary</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">Duration</p>
              <p className="font-bold text-gray-900">{formatTime(elapsedTime)}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">Fuel Used</p>
              <p className="font-bold text-gray-900">{Math.floor(elapsedTime / 600)}%</p>
            </div>
          </div>
        </div>

        {/* Safety Checklist */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={18} className="text-amber-600" />
            <h3 className="text-sm font-semibold text-gray-900">Shutdown Checklist</h3>
          </div>
          <div className="space-y-2">
            {safetyChecks.map((check) => (
              <button
                key={check.id}
                onClick={() => toggleCheck(check.id)}
                className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {check.checked ? (
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                ) : (
                  <Circle size={20} className="text-gray-300 flex-shrink-0" />
                )}
                <span className={`text-sm text-left ${check.checked ? "text-gray-900" : "text-gray-600"}`}>
                  {check.label}
                  {check.required && <span className="text-accent ml-1">*</span>}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Stop Button */}
        <div className="fixed bottom-20 left-4 right-4 max-w-[398px] mx-auto space-y-2">
          <button
            onClick={handleStopActivity}
            disabled={!allRequiredChecked}
            className={`w-full h-14 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
              allRequiredChecked 
                ? "bg-accent text-white hover:bg-red-700 active:scale-[0.98]" 
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            <StopCircle size={24} />
            {allRequiredChecked ? "Complete Activity" : "Complete all required checks"}
          </button>
        </div>
      </div>
    );
  }

  // Main List View
  return (
    <div className="p-4 pb-24">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Activity</h2>
          <p className="text-sm text-gray-500">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</p>
        </div>
      </div>

      {/* Start New Activity Button */}
      <button
        onClick={() => setViewState("select")}
        className="w-full bg-accent text-white rounded-xl p-4 mb-4 flex items-center justify-center gap-2 font-semibold hover:bg-red-700 transition-colors"
      >
        <Plus size={24} />
        Start New Activity
      </button>

      {/* Active Activities */}
      {activeActivities.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Ongoing Activities ({activeActivities.length})
          </h3>
          <div className="space-y-3">
            {activeActivities.map((activity) => {
              const elapsed = elapsedTimes[activity.id] || 0;
              return (
                <button
                  key={activity.id}
                  onClick={() => handleViewActiveActivity(activity)}
                  className="w-full bg-green-50 border border-green-200 rounded-xl p-4 text-left hover:bg-green-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                        <Activity size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-green-800">{activity.equipment.serialNumber}</p>
                        <p className="text-sm text-green-600">{activity.equipment.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-bold text-green-800">{formatTime(elapsed)}</p>
                      <p className="text-xs text-green-600">
                        Started {new Date(activity.startTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Today's Summary */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-gray-400" />
            <span className="text-xs text-gray-500">Hours Logged</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {completedActivities.reduce((acc, a) => {
              const parts = a.duration.split(":");
              return acc + parseInt(parts[0]) + parseInt(parts[1]) / 60;
            }, 0).toFixed(1)}h
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={16} className="text-gray-400" />
            <span className="text-xs text-gray-500">Completed</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{completedActivities.length}</p>
        </div>
      </div>

      {/* Completed Activities */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Completed Activities</h3>
        {completedActivities.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
            <Activity size={32} className="mx-auto text-gray-300 mb-2" />
            <p className="text-sm text-gray-500">No activities completed yet today</p>
          </div>
        ) : (
          <div className="space-y-3">
            {completedActivities.map((activity) => (
              <div key={activity.id} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{activity.equipment.serialNumber}</p>
                      <p className="text-xs text-gray-500">{activity.equipment.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{activity.duration}</p>
                    <p className="text-xs text-gray-500">{activity.startTime} - {activity.endTime}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100 text-center">
                  <div>
                    <p className="text-xs text-gray-500">Start Hours</p>
                    <p className="text-sm font-medium text-gray-900">{activity.startReadings.engineHours}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">End Hours</p>
                    <p className="text-sm font-medium text-gray-900">{activity.endReadings.engineHours}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Fuel Used</p>
                    <p className="text-sm font-medium text-gray-900">
                      {activity.startReadings.fuelLevel - activity.endReadings.fuelLevel}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
