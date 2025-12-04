"use client";

import { useState } from "react";
import { 
  ArrowLeft,
  ChevronRight,
  MapPin,
  Clock,
  Fuel,
  Activity,
  Gauge,
  ThermometerSun,
  Zap,
  Package,
  PlayCircle,
  BookOpen,
  Users,
  Search,
  Wrench,
  AlertCircle,
  CheckCircle,
  Phone,
  Mail,
  Globe,
  FileText,
  Video,
  ExternalLink,
  AlertOctagon,
  X
} from "lucide-react";
import { ServiceRequestPrefill } from "@/app/operator/page";

// Types
interface Equipment {
  id: string;
  serialNumber: string;
  name: string;
  model: string;
  oem: string;
  oemId: string;
  skuId: string;
  status: "active" | "idle" | "maintenance";
  location: string;
  hoursToday: number;
  fuelLevel: number;
  engineHours: number;
  lastService: string;
  healthScore: number;
}

interface Part {
  id: string;
  partNumber: string;
  name: string;
  category: string;
  price: number;
  stock: "in_stock" | "low_stock" | "out_of_stock";
  leadTime: string;
}

interface TrainingVideo {
  id: string;
  title: string;
  duration: string;
  category: string;
  youtubeId: string;
}

interface KnowledgeArticle {
  id: string;
  title: string;
  category: string;
  lastUpdated: string;
  readTime: string;
}

interface OEMContact {
  name: string;
  role: string;
  phone: string;
  email: string;
  region: string;
}

// Sample data - Equipment assigned to operator
const assignedEquipment: Equipment[] = [
  {
    id: "1",
    serialNumber: "EX-001",
    name: "CAT 320D Excavator",
    model: "320D",
    oem: "Caterpillar",
    oemId: "cat",
    skuId: "320d",
    status: "active",
    location: "Site A - Block 3",
    hoursToday: 6.5,
    fuelLevel: 72,
    engineHours: 4850,
    lastService: "Nov 15, 2024",
    healthScore: 92,
  },
  {
    id: "2",
    serialNumber: "EX-015",
    name: "Komatsu PC200 Excavator",
    model: "PC200",
    oem: "Komatsu",
    oemId: "komatsu",
    skuId: "pc200",
    status: "active",
    location: "Site A - Block 1",
    hoursToday: 5.2,
    fuelLevel: 65,
    engineHours: 3200,
    lastService: "Nov 20, 2024",
    healthScore: 88,
  },
  {
    id: "3",
    serialNumber: "EX-003",
    name: "Volvo EC210 Excavator",
    model: "EC210",
    oem: "Volvo",
    oemId: "volvo",
    skuId: "ec210",
    status: "maintenance",
    location: "Workshop Bay 2",
    hoursToday: 0,
    fuelLevel: 45,
    engineHours: 2100,
    lastService: "Dec 1, 2024",
    healthScore: 75,
  },
];

// Parts data
const partsData: Record<string, Part[]> = {
  "320d": [
    { id: "1", partNumber: "CAT-320D-EF-001", name: "Engine Oil Filter", category: "Filters", price: 2450, stock: "in_stock", leadTime: "2-3 days" },
    { id: "2", partNumber: "CAT-320D-AF-002", name: "Air Filter Primary", category: "Filters", price: 4850, stock: "in_stock", leadTime: "2-3 days" },
    { id: "3", partNumber: "CAT-320D-HF-003", name: "Hydraulic Oil Filter", category: "Filters", price: 6200, stock: "low_stock", leadTime: "5-7 days" },
    { id: "4", partNumber: "CAT-320D-FF-004", name: "Fuel Filter", category: "Filters", price: 3100, stock: "in_stock", leadTime: "2-3 days" },
    { id: "5", partNumber: "CAT-320D-TP-005", name: "Track Pad (Single)", category: "Undercarriage", price: 8500, stock: "in_stock", leadTime: "3-5 days" },
    { id: "6", partNumber: "CAT-320D-BT-011", name: "Bucket Teeth (Set of 5)", category: "Attachments", price: 15000, stock: "in_stock", leadTime: "2-3 days" },
  ],
  "pc200": [
    { id: "1", partNumber: "KOM-PC200-EF-001", name: "Engine Oil Filter", category: "Filters", price: 2200, stock: "in_stock", leadTime: "2-3 days" },
    { id: "2", partNumber: "KOM-PC200-AF-002", name: "Air Filter", category: "Filters", price: 4500, stock: "in_stock", leadTime: "2-3 days" },
    { id: "3", partNumber: "KOM-PC200-HF-003", name: "Hydraulic Filter", category: "Filters", price: 5800, stock: "low_stock", leadTime: "5-7 days" },
  ],
  "ec210": [
    { id: "1", partNumber: "VOL-EC210-EF-001", name: "Engine Oil Filter", category: "Filters", price: 2600, stock: "in_stock", leadTime: "2-3 days" },
    { id: "2", partNumber: "VOL-EC210-AF-002", name: "Air Filter", category: "Filters", price: 4200, stock: "out_of_stock", leadTime: "7-10 days" },
  ],
};

// Training videos data - using mining equipment video
const TRAINING_VIDEO_ID = "4Y31MD36xF4";

const trainingData: Record<string, TrainingVideo[]> = {
  "320d": [
    { id: "1", title: "CAT 320D Excavator Operation", duration: "15:30", category: "Operation", youtubeId: TRAINING_VIDEO_ID },
    { id: "2", title: "Daily Inspection Checklist", duration: "8:45", category: "Maintenance", youtubeId: TRAINING_VIDEO_ID },
    { id: "3", title: "Hydraulic System Overview", duration: "22:10", category: "Technical", youtubeId: TRAINING_VIDEO_ID },
    { id: "4", title: "Safety Procedures & Protocols", duration: "18:00", category: "Safety", youtubeId: TRAINING_VIDEO_ID },
    { id: "5", title: "Excavator Digging Techniques", duration: "25:30", category: "Operation", youtubeId: TRAINING_VIDEO_ID },
    { id: "6", title: "Engine Maintenance Tips", duration: "20:00", category: "Technical", youtubeId: TRAINING_VIDEO_ID },
  ],
  "pc200": [
    { id: "1", title: "Komatsu Excavator Operation", duration: "18:00", category: "Operation", youtubeId: TRAINING_VIDEO_ID },
    { id: "2", title: "Daily Maintenance Guide", duration: "10:30", category: "Maintenance", youtubeId: TRAINING_VIDEO_ID },
    { id: "3", title: "Safety Best Practices", duration: "15:00", category: "Safety", youtubeId: TRAINING_VIDEO_ID },
  ],
  "ec210": [
    { id: "1", title: "Volvo Excavator Overview", duration: "12:00", category: "Operation", youtubeId: TRAINING_VIDEO_ID },
    { id: "2", title: "Pre-Operation Inspection", duration: "8:00", category: "Maintenance", youtubeId: TRAINING_VIDEO_ID },
  ],
};

// Knowledgebase data
const knowledgebaseData: Record<string, KnowledgeArticle[]> = {
  "320d": [
    { id: "1", title: "CAT 320D Specifications & Dimensions", category: "Specifications", lastUpdated: "Nov 2024", readTime: "5 min" },
    { id: "2", title: "Maintenance Schedule & Intervals", category: "Maintenance", lastUpdated: "Nov 2024", readTime: "8 min" },
    { id: "3", title: "Hydraulic Fluid Requirements", category: "Fluids", lastUpdated: "Oct 2024", readTime: "4 min" },
    { id: "4", title: "Error Code Reference", category: "Troubleshooting", lastUpdated: "Dec 2024", readTime: "15 min" },
    { id: "5", title: "Filter Replacement Guide", category: "Maintenance", lastUpdated: "Nov 2024", readTime: "6 min" },
  ],
  "pc200": [
    { id: "1", title: "Komatsu PC200 Specifications", category: "Specifications", lastUpdated: "Nov 2024", readTime: "5 min" },
    { id: "2", title: "Service Intervals Guide", category: "Maintenance", lastUpdated: "Oct 2024", readTime: "6 min" },
    { id: "3", title: "Troubleshooting Common Issues", category: "Troubleshooting", lastUpdated: "Nov 2024", readTime: "10 min" },
  ],
  "ec210": [
    { id: "1", title: "Volvo EC210 Technical Specs", category: "Specifications", lastUpdated: "Oct 2024", readTime: "5 min" },
    { id: "2", title: "Maintenance Checklist", category: "Maintenance", lastUpdated: "Nov 2024", readTime: "7 min" },
  ],
};

// OEM contact data
const oemContactData: Record<string, { info: { name: string; website: string; supportLine: string; email: string }; contacts: OEMContact[] }> = {
  cat: {
    info: { name: "Caterpillar Inc.", website: "www.cat.com", supportLine: "1800-CAT-HELP", email: "support@cat.com" },
    contacts: [
      { name: "Rajesh Sharma", role: "Regional Sales Manager", phone: "+91 98765 43210", email: "rajesh.sharma@cat.com", region: "North India" },
      { name: "Priya Mehta", role: "Technical Support Lead", phone: "+91 98765 43211", email: "priya.mehta@cat.com", region: "West India" },
    ],
  },
  komatsu: {
    info: { name: "Komatsu Ltd.", website: "www.komatsu.com", supportLine: "1800-KOM-HELP", email: "support@komatsu.com" },
    contacts: [
      { name: "Vikram Singh", role: "Regional Manager", phone: "+91 98765 44210", email: "vikram.singh@komatsu.com", region: "North India" },
    ],
  },
  volvo: {
    info: { name: "Volvo CE", website: "www.volvoce.com", supportLine: "1800-VOL-HELP", email: "support@volvoce.com" },
    contacts: [
      { name: "Arun Kumar", role: "Service Manager", phone: "+91 98765 45210", email: "arun.kumar@volvoce.com", region: "All India" },
    ],
  },
};

// Activity data per equipment serial number
interface EquipmentActivity {
  date: string;
  operator: string;
  duration: string;
  hoursLogged: number;
  fuelUsed: number;
  status: "completed" | "in_progress";
}

const equipmentActivityData: Record<string, EquipmentActivity[]> = {
  "EX-001": [
    { date: "Dec 3, 2024", operator: "Rajesh Kumar", duration: "8h 30m", hoursLogged: 8.5, fuelUsed: 23, status: "completed" },
    { date: "Dec 2, 2024", operator: "Rajesh Kumar", duration: "7h 45m", hoursLogged: 7.75, fuelUsed: 20, status: "completed" },
    { date: "Dec 1, 2024", operator: "Amit Singh", duration: "6h 15m", hoursLogged: 6.25, fuelUsed: 18, status: "completed" },
    { date: "Nov 30, 2024", operator: "Rajesh Kumar", duration: "9h 00m", hoursLogged: 9, fuelUsed: 25, status: "completed" },
  ],
  "EX-015": [
    { date: "Dec 3, 2024", operator: "Vikram Patel", duration: "5h 00m", hoursLogged: 5, fuelUsed: 15, status: "completed" },
    { date: "Dec 2, 2024", operator: "Rajesh Kumar", duration: "4h 30m", hoursLogged: 4.5, fuelUsed: 12, status: "completed" },
  ],
  "EX-003": [
    { date: "Nov 28, 2024", operator: "Suresh Reddy", duration: "3h 20m", hoursLogged: 3.3, fuelUsed: 10, status: "completed" },
  ],
};

type ViewLevel = "list" | "detail" | "parts" | "training" | "knowledgebase";

interface EquipmentProps {
  onRequestService?: (prefill: ServiceRequestPrefill) => void;
}

export default function Equipment({ onRequestService }: EquipmentProps) {
  const [viewLevel, setViewLevel] = useState<ViewLevel>("list");
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [playingVideo, setPlayingVideo] = useState<TrainingVideo | null>(null);

  const goBack = () => {
    if (viewLevel === "detail") {
      setSelectedEquipment(null);
      setViewLevel("list");
    } else {
      setViewLevel("detail");
      setPlayingVideo(null);
    }
  };

  const selectEquipment = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setViewLevel("detail");
  };

  const activeCount = assignedEquipment.filter((e) => e.status === "active").length;
  const idleCount = assignedEquipment.filter((e) => e.status === "idle").length;
  const maintenanceCount = assignedEquipment.filter((e) => e.status === "maintenance").length;

  const statusColors = {
    active: "bg-green-100 text-green-700 border-green-200",
    idle: "bg-amber-100 text-amber-700 border-amber-200",
    maintenance: "bg-red-100 text-red-700 border-red-200",
  };

  // Equipment List View
  if (viewLevel === "list") {
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
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-accent">{maintenanceCount}</p>
            <p className="text-xs text-red-700">Maintenance</p>
          </div>
        </div>

        {/* Equipment List */}
        <div>
          <h2 className="text-sm font-semibold text-gray-900 mb-3">
            My Equipment ({assignedEquipment.length})
          </h2>
          <div className="space-y-3">
            {assignedEquipment.map((equipment, index) => (
              <button
                key={equipment.id}
                onClick={() => selectEquipment(equipment)}
                className="w-full bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-accent transition-all animate-fadeIn"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{equipment.serialNumber}</span>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${statusColors[equipment.status]}`}>
                        {equipment.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">{equipment.name}</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <MapPin size={12} />
                    <span className="truncate">{equipment.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Clock size={12} />
                    <span>{equipment.engineHours.toLocaleString()} hrs</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Fuel size={12} />
                    <span>{equipment.fuelLevel}%</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Equipment Detail View
  if (viewLevel === "detail" && selectedEquipment) {
    return (
      <div className="p-4 pb-24 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h2 className="font-semibold text-gray-900">{selectedEquipment.serialNumber}</h2>
            <p className="text-xs text-gray-500">{selectedEquipment.name}</p>
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <span className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${statusColors[selectedEquipment.status]}`}>
              {selectedEquipment.status}
            </span>
            <div className="flex items-center gap-1 text-sm">
              <Activity size={14} className="text-accent" />
              <span className="font-medium text-gray-900">{selectedEquipment.healthScore}%</span>
              <span className="text-gray-500">Health</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={14} className="text-gray-400" />
              <span className="text-gray-600">{selectedEquipment.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock size={14} className="text-gray-400" />
              <span className="text-gray-600">{selectedEquipment.engineHours.toLocaleString()} hrs</span>
            </div>
          </div>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Fuel Level", value: selectedEquipment.fuelLevel, unit: "%", icon: Zap, color: "text-amber-600" },
            { label: "Engine Temp", value: "87", unit: "°C", icon: ThermometerSun, color: "text-orange-600" },
            { label: "Hydraulic PSI", value: "2,450", unit: "psi", icon: Gauge, color: "text-blue-600" },
            { label: "Hours Today", value: selectedEquipment.hoursToday, unit: "hrs", icon: Clock, color: "text-green-600" },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Icon size={14} className={stat.color} />
                  <span className="text-xs text-gray-500">{stat.label}</span>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  {stat.value}<span className="text-xs font-normal text-gray-500 ml-1">{stat.unit}</span>
                </p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Resources</h3>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setViewLevel("parts")}
              className="bg-white border border-gray-200 rounded-xl p-3 text-left hover:border-accent transition-all group"
            >
              <Package size={20} className="text-accent mb-2" />
              <p className="font-medium text-gray-900 group-hover:text-accent text-xs">Parts</p>
              <p className="text-[10px] text-gray-500">{(partsData[selectedEquipment.skuId] || []).length} items</p>
            </button>
            <button
              onClick={() => setViewLevel("training")}
              className="bg-white border border-gray-200 rounded-xl p-3 text-left hover:border-accent transition-all group"
            >
              <PlayCircle size={20} className="text-accent mb-2" />
              <p className="font-medium text-gray-900 group-hover:text-accent text-xs">Training</p>
              <p className="text-[10px] text-gray-500">{(trainingData[selectedEquipment.skuId] || []).length} videos</p>
            </button>
            <button
              onClick={() => setViewLevel("knowledgebase")}
              className="bg-white border border-gray-200 rounded-xl p-3 text-left hover:border-accent transition-all group"
            >
              <BookOpen size={20} className="text-accent mb-2" />
              <p className="font-medium text-gray-900 group-hover:text-accent text-xs">Knowledge</p>
              <p className="text-[10px] text-gray-500">{(knowledgebaseData[selectedEquipment.skuId] || []).length} articles</p>
            </button>
          </div>
        </div>

        {/* Activity History */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {(equipmentActivityData[selectedEquipment.serialNumber] || []).length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No activity recorded yet</p>
            ) : (
              (equipmentActivityData[selectedEquipment.serialNumber] || []).map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.status === "completed" ? "bg-green-100" : "bg-blue-100"
                    }`}>
                      {activity.status === "completed" ? (
                        <CheckCircle size={16} className="text-green-600" />
                      ) : (
                        <Activity size={16} className="text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.operator}</p>
                      <p className="text-xs text-gray-500">{activity.date} • {activity.duration}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Hours: {activity.hoursLogged}</p>
                    <p className="text-xs text-gray-500">Fuel: -{activity.fuelUsed}%</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Service History */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Service History</h3>
          <div className="space-y-3">
            {[
              { date: selectedEquipment.lastService, type: "Oil Change", status: "Completed" },
              { date: "Oct 20, 2024", type: "Filter Replacement", status: "Completed" },
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{service.type}</p>
                  <p className="text-xs text-gray-500">{service.date}</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  {service.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Parts View
  if (viewLevel === "parts" && selectedEquipment) {
    const parts = partsData[selectedEquipment.skuId] || [];
    const stockColors = {
      in_stock: { bg: "bg-green-100", text: "text-green-700" },
      low_stock: { bg: "bg-amber-100", text: "text-amber-700" },
      out_of_stock: { bg: "bg-red-100", text: "text-red-700" },
    };
    const stockLabels = { in_stock: "In Stock", low_stock: "Low Stock", out_of_stock: "Out of Stock" };

    return (
      <div className="p-4 pb-24 space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h2 className="font-semibold text-gray-900">Parts Catalog</h2>
            <p className="text-xs text-gray-500">{selectedEquipment.name}</p>
          </div>
        </div>

        <div className="space-y-3">
          {parts.map((part) => (
            <div key={part.id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <span className="text-xs text-accent font-medium">{part.partNumber}</span>
                  <h4 className="font-medium text-gray-900 mt-0.5">{part.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{part.category} • Lead time: {part.leadTime}</p>
                </div>
                <button
                  onClick={() => {
                    if (onRequestService && selectedEquipment) {
                      onRequestService({
                        equipmentId: selectedEquipment.id,
                        equipmentName: selectedEquipment.name,
                        serialNumber: selectedEquipment.serialNumber,
                        part: part.name,
                      });
                    }
                  }}
                  className="flex items-center gap-1 px-3 py-2 bg-accent text-white rounded-lg text-xs font-medium hover:bg-red-700 transition-colors"
                >
                  <AlertOctagon size={14} />
                  Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Training Videos View
  if (viewLevel === "training" && selectedEquipment) {
    const videos = trainingData[selectedEquipment.skuId] || [];

    return (
      <div className="p-4 pb-24 space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h2 className="font-semibold text-gray-900">Training Videos</h2>
            <p className="text-xs text-gray-500">{selectedEquipment.name}</p>
          </div>
        </div>

        {/* Video Player - shows selected video */}
        {playingVideo && (
          <div className="bg-black rounded-xl overflow-hidden">
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${playingVideo.youtubeId}?autoplay=1&rel=0`}
                title={playingVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-3 bg-gray-900">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-accent font-medium">{playingVideo.category}</span>
                  <h4 className="font-medium text-white text-sm mt-0.5">{playingVideo.title}</h4>
                </div>
                <button
                  onClick={() => setPlayingVideo(null)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {videos.map((video) => (
            <button
              key={video.id}
              onClick={() => setPlayingVideo(video)}
              className={`w-full bg-white border rounded-xl overflow-hidden transition-all text-left ${
                playingVideo?.id === video.id ? 'border-accent ring-2 ring-accent/20' : 'border-gray-200 hover:border-accent'
              }`}
            >
              <div className="h-40 relative">
                {/* YouTube Thumbnail */}
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors">
                  <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-lg">
                    <PlayCircle size={28} className="text-white ml-0.5" />
                  </div>
                </div>
                {/* Duration Badge */}
                <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs font-medium rounded">
                  {video.duration}
                </span>
                {/* Now Playing Indicator */}
                {playingVideo?.id === video.id && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-accent text-white text-xs font-medium rounded flex items-center gap-1">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    Now Playing
                  </div>
                )}
              </div>
              <div className="p-3">
                <span className="text-xs text-accent font-medium">{video.category}</span>
                <h4 className="font-medium text-gray-900 text-sm mt-0.5">{video.title}</h4>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Knowledgebase View
  if (viewLevel === "knowledgebase" && selectedEquipment) {
    const articles = knowledgebaseData[selectedEquipment.skuId] || [];

    return (
      <div className="p-4 pb-24 space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h2 className="font-semibold text-gray-900">Knowledgebase</h2>
            <p className="text-xs text-gray-500">{selectedEquipment.name}</p>
          </div>
        </div>

        <div className="space-y-3">
          {articles.map((article) => (
            <div key={article.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:border-accent transition-all">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <FileText size={18} className="text-gray-500" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-accent font-medium">{article.category}</span>
                  <h4 className="font-medium text-gray-900 text-sm mt-0.5">{article.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">Updated {article.lastUpdated} • {article.readTime} read</p>
                </div>
                <ExternalLink size={16} className="text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

