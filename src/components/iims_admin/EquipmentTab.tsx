"use client";

import { useState } from "react";
import { 
  ChevronRight, 
  ArrowLeft,
  Truck,
  Building,
  Box,
  Hash,
  PlayCircle,
  BookOpen,
  Users,
  TrendingUp,
  Gauge,
  Clock,
  MapPin,
  Zap,
  ThermometerSun,
  Activity,
  Phone,
  Mail,
  Globe,
  FileText,
  Video,
  Search,
  ExternalLink,
  Package,
  Wrench,
  AlertCircle,
  CheckCircle
} from "lucide-react";

// Data structures
interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

interface OEM {
  id: string;
  name: string;
  logo: string;
  modelsCount: number;
  machinesCount: number;
}

interface SKU {
  id: string;
  model: string;
  category: string;
  specs: string;
  machinesCount: number;
  trainingVideos: number;
  knowledgebaseArticles: number;
  partsCount: number;
}

interface Machine {
  id: string;
  serialNumber: string;
  status: "active" | "idle" | "maintenance";
  client: string;
  site: string;
  engineHours: number;
  lastService: string;
}

interface TrainingVideo {
  id: string;
  title: string;
  duration: string;
  category: string;
  thumbnail: string;
}

interface KnowledgebaseArticle {
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

interface Part {
  id: string;
  partNumber: string;
  name: string;
  category: string;
  price: number;
  stock: "in_stock" | "low_stock" | "out_of_stock";
  leadTime: string;
  compatibility: string[];
}

// Sample data
const categories: Category[] = [
  { id: "excavator", name: "Excavators", icon: "🏗️", count: 45 },
  { id: "loader", name: "Loaders", icon: "🚜", count: 32 },
  { id: "dozer", name: "Dozers", icon: "🚧", count: 28 },
  { id: "dumptruck", name: "Dump Trucks", icon: "🚛", count: 56 },
  { id: "crane", name: "Cranes", icon: "🏗️", count: 18 },
  { id: "compactor", name: "Compactors", icon: "🔨", count: 22 },
];

const oems: Record<string, OEM[]> = {
  excavator: [
    { id: "cat", name: "Caterpillar", logo: "CAT", modelsCount: 8, machinesCount: 18 },
    { id: "komatsu", name: "Komatsu", logo: "KOM", modelsCount: 6, machinesCount: 12 },
    { id: "jcb", name: "JCB", logo: "JCB", modelsCount: 5, machinesCount: 8 },
    { id: "hitachi", name: "Hitachi", logo: "HIT", modelsCount: 4, machinesCount: 7 },
  ],
  loader: [
    { id: "cat", name: "Caterpillar", logo: "CAT", modelsCount: 5, machinesCount: 14 },
    { id: "komatsu", name: "Komatsu", logo: "KOM", modelsCount: 4, machinesCount: 10 },
    { id: "jcb", name: "JCB", logo: "JCB", modelsCount: 3, machinesCount: 8 },
  ],
  dozer: [
    { id: "cat", name: "Caterpillar", logo: "CAT", modelsCount: 6, machinesCount: 16 },
    { id: "komatsu", name: "Komatsu", logo: "KOM", modelsCount: 4, machinesCount: 12 },
  ],
  dumptruck: [
    { id: "volvo", name: "Volvo", logo: "VOL", modelsCount: 5, machinesCount: 22 },
    { id: "cat", name: "Caterpillar", logo: "CAT", modelsCount: 4, machinesCount: 18 },
    { id: "komatsu", name: "Komatsu", logo: "KOM", modelsCount: 3, machinesCount: 16 },
  ],
  crane: [
    { id: "liebherr", name: "Liebherr", logo: "LIE", modelsCount: 4, machinesCount: 10 },
    { id: "terex", name: "Terex", logo: "TER", modelsCount: 3, machinesCount: 8 },
  ],
  compactor: [
    { id: "cat", name: "Caterpillar", logo: "CAT", modelsCount: 3, machinesCount: 12 },
    { id: "bomag", name: "BOMAG", logo: "BOM", modelsCount: 2, machinesCount: 10 },
  ],
};

const skus: Record<string, SKU[]> = {
  cat: [
    { id: "320d", model: "320D", category: "Medium Excavator", specs: "20 ton, 121 HP", machinesCount: 6, trainingVideos: 12, knowledgebaseArticles: 45, partsCount: 156 },
    { id: "330f", model: "330F", category: "Large Excavator", specs: "30 ton, 268 HP", machinesCount: 4, trainingVideos: 8, knowledgebaseArticles: 38, partsCount: 142 },
    { id: "336f", model: "336F", category: "Large Excavator", specs: "36 ton, 308 HP", machinesCount: 3, trainingVideos: 10, knowledgebaseArticles: 42, partsCount: 168 },
    { id: "349f", model: "349F", category: "Large Excavator", specs: "49 ton, 394 HP", machinesCount: 2, trainingVideos: 6, knowledgebaseArticles: 30, partsCount: 178 },
  ],
  komatsu: [
    { id: "pc200", model: "PC200", category: "Medium Excavator", specs: "20 ton, 148 HP", machinesCount: 5, trainingVideos: 10, knowledgebaseArticles: 35, partsCount: 134 },
    { id: "pc300", model: "PC300", category: "Large Excavator", specs: "30 ton, 246 HP", machinesCount: 4, trainingVideos: 8, knowledgebaseArticles: 32, partsCount: 145 },
    { id: "pc450", model: "PC450", category: "Large Excavator", specs: "45 ton, 347 HP", machinesCount: 3, trainingVideos: 7, knowledgebaseArticles: 28, partsCount: 162 },
  ],
  jcb: [
    { id: "js205", model: "JS205", category: "Medium Excavator", specs: "21 ton, 148 HP", machinesCount: 4, trainingVideos: 6, knowledgebaseArticles: 25, partsCount: 112 },
    { id: "js220", model: "JS220", category: "Medium Excavator", specs: "22 ton, 173 HP", machinesCount: 4, trainingVideos: 8, knowledgebaseArticles: 30, partsCount: 118 },
  ],
  hitachi: [
    { id: "zx200", model: "ZX200", category: "Medium Excavator", specs: "20 ton, 152 HP", machinesCount: 4, trainingVideos: 7, knowledgebaseArticles: 28, partsCount: 128 },
    { id: "zx350", model: "ZX350", category: "Large Excavator", specs: "35 ton, 270 HP", machinesCount: 3, trainingVideos: 5, knowledgebaseArticles: 22, partsCount: 152 },
  ],
};

const machines: Record<string, Machine[]> = {
  "320d": [
    { id: "1", serialNumber: "EX-001", status: "active", client: "Tata Projects", site: "Site A - Mumbai", engineHours: 4850, lastService: "Nov 15, 2024" },
    { id: "2", serialNumber: "EX-002", status: "active", client: "L&T Construction", site: "Site B - Pune", engineHours: 3200, lastService: "Nov 20, 2024" },
    { id: "3", serialNumber: "EX-003", status: "maintenance", client: "Tata Projects", site: "Workshop", engineHours: 5100, lastService: "Dec 1, 2024" },
    { id: "4", serialNumber: "EX-004", status: "idle", client: "Reliance Infra", site: "Site C - Delhi", engineHours: 2800, lastService: "Nov 10, 2024" },
    { id: "5", serialNumber: "EX-005", status: "active", client: "Shapoorji Pallonji", site: "Site D - Bangalore", engineHours: 4200, lastService: "Nov 25, 2024" },
    { id: "6", serialNumber: "EX-006", status: "active", client: "L&T Construction", site: "Site E - Chennai", engineHours: 3600, lastService: "Nov 18, 2024" },
  ],
  "pc200": [
    { id: "7", serialNumber: "EX-015", status: "active", client: "Tata Projects", site: "Site A - Mumbai", engineHours: 3800, lastService: "Nov 22, 2024" },
    { id: "8", serialNumber: "EX-016", status: "active", client: "L&T Construction", site: "Site F - Hyderabad", engineHours: 4100, lastService: "Nov 12, 2024" },
  ],
};

const parts: Record<string, Part[]> = {
  "320d": [
    { id: "1", partNumber: "CAT-320D-EF-001", name: "Engine Oil Filter", category: "Filters", price: 2450, stock: "in_stock", leadTime: "2-3 days", compatibility: ["320D", "320E", "323D"] },
    { id: "2", partNumber: "CAT-320D-AF-002", name: "Air Filter Primary", category: "Filters", price: 4850, stock: "in_stock", leadTime: "2-3 days", compatibility: ["320D", "320E"] },
    { id: "3", partNumber: "CAT-320D-HF-003", name: "Hydraulic Oil Filter", category: "Filters", price: 6200, stock: "low_stock", leadTime: "5-7 days", compatibility: ["320D", "323D", "325D"] },
    { id: "4", partNumber: "CAT-320D-FF-004", name: "Fuel Filter", category: "Filters", price: 3100, stock: "in_stock", leadTime: "2-3 days", compatibility: ["320D", "320E", "323D", "325D"] },
    { id: "5", partNumber: "CAT-320D-TP-005", name: "Track Pad (Single)", category: "Undercarriage", price: 8500, stock: "in_stock", leadTime: "3-5 days", compatibility: ["320D", "320E", "323D"] },
    { id: "6", partNumber: "CAT-320D-TR-006", name: "Track Roller", category: "Undercarriage", price: 18500, stock: "low_stock", leadTime: "7-10 days", compatibility: ["320D", "320E"] },
    { id: "7", partNumber: "CAT-320D-IR-007", name: "Idler Wheel", category: "Undercarriage", price: 45000, stock: "out_of_stock", leadTime: "15-20 days", compatibility: ["320D", "323D"] },
    { id: "8", partNumber: "CAT-320D-SP-008", name: "Sprocket", category: "Undercarriage", price: 38000, stock: "in_stock", leadTime: "5-7 days", compatibility: ["320D", "320E", "323D"] },
    { id: "9", partNumber: "CAT-320D-HC-009", name: "Hydraulic Cylinder Seal Kit", category: "Hydraulics", price: 12500, stock: "in_stock", leadTime: "3-5 days", compatibility: ["320D", "320E"] },
    { id: "10", partNumber: "CAT-320D-HP-010", name: "Hydraulic Pump", category: "Hydraulics", price: 185000, stock: "low_stock", leadTime: "20-25 days", compatibility: ["320D"] },
    { id: "11", partNumber: "CAT-320D-BT-011", name: "Bucket Teeth (Set of 5)", category: "Attachments", price: 15000, stock: "in_stock", leadTime: "2-3 days", compatibility: ["320D", "320E", "323D", "325D"] },
    { id: "12", partNumber: "CAT-320D-BP-012", name: "Bucket Pin", category: "Attachments", price: 4500, stock: "in_stock", leadTime: "2-3 days", compatibility: ["320D", "320E", "323D"] },
  ],
};

const trainingVideos: Record<string, TrainingVideo[]> = {
  "320d": [
    { id: "1", title: "CAT 320D Basic Operation", duration: "15:30", category: "Operation", thumbnail: "basic-op" },
    { id: "2", title: "Daily Inspection Checklist", duration: "8:45", category: "Maintenance", thumbnail: "inspection" },
    { id: "3", title: "Hydraulic System Overview", duration: "22:10", category: "Technical", thumbnail: "hydraulic" },
    { id: "4", title: "Safety Procedures & Protocols", duration: "18:00", category: "Safety", thumbnail: "safety" },
    { id: "5", title: "Digging Techniques for Efficiency", duration: "25:30", category: "Operation", thumbnail: "digging" },
    { id: "6", title: "Track Maintenance Guide", duration: "12:15", category: "Maintenance", thumbnail: "track" },
    { id: "7", title: "Engine Troubleshooting", duration: "20:00", category: "Technical", thumbnail: "engine" },
    { id: "8", title: "Operator Comfort & Ergonomics", duration: "10:30", category: "Operation", thumbnail: "comfort" },
    { id: "9", title: "Fuel Efficiency Tips", duration: "14:20", category: "Operation", thumbnail: "fuel" },
    { id: "10", title: "Cold Weather Starting", duration: "8:00", category: "Technical", thumbnail: "cold" },
    { id: "11", title: "Attachment Installation", duration: "16:45", category: "Technical", thumbnail: "attach" },
    { id: "12", title: "Emergency Procedures", duration: "11:30", category: "Safety", thumbnail: "emergency" },
  ],
};

const knowledgebaseArticles: Record<string, KnowledgebaseArticle[]> = {
  "320d": [
    { id: "1", title: "CAT 320D Specifications & Dimensions", category: "Specifications", lastUpdated: "Nov 2024", readTime: "5 min" },
    { id: "2", title: "Maintenance Schedule & Intervals", category: "Maintenance", lastUpdated: "Nov 2024", readTime: "8 min" },
    { id: "3", title: "Hydraulic Fluid Requirements", category: "Fluids", lastUpdated: "Oct 2024", readTime: "4 min" },
    { id: "4", title: "Engine Oil Specifications", category: "Fluids", lastUpdated: "Oct 2024", readTime: "3 min" },
    { id: "5", title: "Filter Replacement Guide", category: "Maintenance", lastUpdated: "Nov 2024", readTime: "6 min" },
    { id: "6", title: "Error Code Reference", category: "Troubleshooting", lastUpdated: "Dec 2024", readTime: "15 min" },
    { id: "7", title: "Track Tension Adjustment", category: "Maintenance", lastUpdated: "Sep 2024", readTime: "7 min" },
    { id: "8", title: "Bucket Selection Guide", category: "Attachments", lastUpdated: "Aug 2024", readTime: "10 min" },
    { id: "9", title: "Warranty Information", category: "Documentation", lastUpdated: "Jan 2024", readTime: "12 min" },
    { id: "10", title: "Parts Catalog Reference", category: "Parts", lastUpdated: "Nov 2024", readTime: "20 min" },
  ],
};

const oemContacts: Record<string, { info: { name: string; website: string; supportLine: string; email: string }; contacts: OEMContact[] }> = {
  cat: {
    info: {
      name: "Caterpillar Inc.",
      website: "www.cat.com",
      supportLine: "1800-CAT-HELP",
      email: "support@cat.com",
    },
    contacts: [
      { name: "Rajesh Sharma", role: "Regional Sales Manager", phone: "+91 98765 43210", email: "rajesh.sharma@cat.com", region: "North India" },
      { name: "Priya Mehta", role: "Technical Support Lead", phone: "+91 98765 43211", email: "priya.mehta@cat.com", region: "West India" },
      { name: "Amit Kumar", role: "Parts Manager", phone: "+91 98765 43212", email: "amit.kumar@cat.com", region: "All India" },
      { name: "Sneha Patel", role: "Service Coordinator", phone: "+91 98765 43213", email: "sneha.patel@cat.com", region: "South India" },
    ],
  },
  komatsu: {
    info: {
      name: "Komatsu Ltd.",
      website: "www.komatsu.com",
      supportLine: "1800-KOM-HELP",
      email: "support@komatsu.com",
    },
    contacts: [
      { name: "Vikram Singh", role: "Regional Sales Manager", phone: "+91 98765 44210", email: "vikram.singh@komatsu.com", region: "North India" },
      { name: "Neha Gupta", role: "Technical Support Lead", phone: "+91 98765 44211", email: "neha.gupta@komatsu.com", region: "West India" },
    ],
  },
};

type ViewLevel = "categories" | "oems" | "skus" | "machines" | "analytics" | "parts" | "training" | "knowledgebase" | "oem_contact";

interface BreadcrumbItem {
  level: ViewLevel;
  label: string;
  id?: string;
}

export default function EquipmentTab() {
  const [viewLevel, setViewLevel] = useState<ViewLevel>("categories");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedOEM, setSelectedOEM] = useState<OEM | null>(null);
  const [selectedSKU, setSelectedSKU] = useState<SKU | null>(null);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [{ level: "categories", label: "Categories" }];
    if (selectedCategory) {
      items.push({ level: "oems", label: selectedCategory.name, id: selectedCategory.id });
    }
    if (selectedOEM) {
      items.push({ level: "skus", label: selectedOEM.name, id: selectedOEM.id });
    }
    if (selectedSKU) {
      if (viewLevel === "parts") {
        items.push({ level: "parts", label: `${selectedSKU.model} - Parts`, id: selectedSKU.id });
      } else if (viewLevel === "training") {
        items.push({ level: "training", label: `${selectedSKU.model} - Training`, id: selectedSKU.id });
      } else if (viewLevel === "knowledgebase") {
        items.push({ level: "knowledgebase", label: `${selectedSKU.model} - Knowledgebase`, id: selectedSKU.id });
      } else if (viewLevel === "oem_contact") {
        items.push({ level: "oem_contact", label: `${selectedSKU.model} - OEM Contact`, id: selectedSKU.id });
      } else {
        items.push({ level: "machines", label: selectedSKU.model, id: selectedSKU.id });
      }
    }
    if (selectedMachine) {
      items.push({ level: "analytics", label: selectedMachine.serialNumber, id: selectedMachine.id });
    }
    return items;
  };

  const navigateTo = (item: BreadcrumbItem) => {
    setViewLevel(item.level);
    if (item.level === "categories") {
      setSelectedCategory(null);
      setSelectedOEM(null);
      setSelectedSKU(null);
      setSelectedMachine(null);
    } else if (item.level === "oems") {
      setSelectedOEM(null);
      setSelectedSKU(null);
      setSelectedMachine(null);
    } else if (item.level === "skus") {
      setSelectedSKU(null);
      setSelectedMachine(null);
    } else if (item.level === "machines" || item.level === "parts" || item.level === "training" || item.level === "knowledgebase" || item.level === "oem_contact") {
      setSelectedMachine(null);
    }
  };

  const goBack = () => {
    if (viewLevel === "analytics") {
      setSelectedMachine(null);
      setViewLevel("machines");
    } else if (viewLevel === "machines" || viewLevel === "parts" || viewLevel === "training" || viewLevel === "knowledgebase" || viewLevel === "oem_contact") {
      setViewLevel("skus");
    } else if (viewLevel === "skus") {
      setSelectedOEM(null);
      setViewLevel("oems");
    } else if (viewLevel === "oems") {
      setSelectedCategory(null);
      setViewLevel("categories");
    }
  };

  const selectCategory = (category: Category) => {
    setSelectedCategory(category);
    setViewLevel("oems");
  };

  const selectOEM = (oem: OEM) => {
    setSelectedOEM(oem);
    setViewLevel("skus");
  };

  const selectSKU = (sku: SKU) => {
    setSelectedSKU(sku);
    setViewLevel("machines");
  };

  const selectMachine = (machine: Machine) => {
    setSelectedMachine(machine);
    setViewLevel("analytics");
  };

  const openParts = (sku: SKU) => {
    setSelectedSKU(sku);
    setViewLevel("parts");
  };

  const openTraining = (sku: SKU) => {
    setSelectedSKU(sku);
    setViewLevel("training");
  };

  const openKnowledgebase = (sku: SKU) => {
    setSelectedSKU(sku);
    setViewLevel("knowledgebase");
  };

  const openOEMContact = (sku: SKU) => {
    setSelectedSKU(sku);
    setViewLevel("oem_contact");
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {viewLevel !== "categories" && (
            <button
              onClick={goBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
          )}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Equipment</h2>
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1 flex-wrap">
              {breadcrumbs.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {index > 0 && <ChevronRight size={14} />}
                  <button
                    onClick={() => navigateTo(item)}
                    className={`hover:text-accent ${index === breadcrumbs.length - 1 ? 'text-gray-900 font-medium' : ''}`}
                  >
                    {item.label}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {viewLevel === "categories" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => selectCategory(category)}
              className="bg-white rounded-xl border border-gray-200 p-6 text-left hover:border-accent hover:shadow-lg transition-all group"
            >
              <div className="w-14 h-14 bg-accent-light rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                <Truck size={28} className="text-accent group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-accent mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.count} machines</p>
            </button>
          ))}
        </div>
      )}

      {viewLevel === "oems" && selectedCategory && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(oems[selectedCategory.id] || []).map((oem) => (
            <button
              key={oem.id}
              onClick={() => selectOEM(oem)}
              className="bg-white rounded-xl border border-gray-200 p-6 text-left hover:border-accent hover:shadow-lg transition-all group"
            >
              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                <span className="font-bold text-gray-700 group-hover:text-white transition-colors">{oem.logo}</span>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-accent mb-1">{oem.name}</h3>
              <p className="text-sm text-gray-500">{oem.modelsCount} models • {oem.machinesCount} machines</p>
            </button>
          ))}
        </div>
      )}

      {viewLevel === "skus" && selectedOEM && (
        <div className="space-y-4">
          {(skus[selectedOEM.id] || []).map((sku) => (
            <div
              key={sku.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:border-accent hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-accent-light rounded-xl flex items-center justify-center">
                    <Box size={32} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedOEM.name} {sku.model}</h3>
                    <p className="text-sm text-gray-500">{sku.category} • {sku.specs}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="flex items-center gap-1 text-sm text-gray-600">
                        <Hash size={14} />
                        {sku.machinesCount} machines
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => selectSKU(sku)}
                  className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  View Machines
                </button>
              </div>

              {/* SKU Details - Clickable */}
              <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
                <button
                  onClick={() => openParts(sku)}
                  className="text-center p-4 bg-gray-50 rounded-lg hover:bg-accent-light hover:border-accent border border-transparent transition-all group"
                >
                  <Package size={24} className="mx-auto text-accent mb-2" />
                  <p className="text-sm font-medium text-gray-900 group-hover:text-accent">Parts</p>
                  <p className="text-xs text-gray-500">{sku.partsCount} items</p>
                </button>
                <button
                  onClick={() => openTraining(sku)}
                  className="text-center p-4 bg-gray-50 rounded-lg hover:bg-accent-light hover:border-accent border border-transparent transition-all group"
                >
                  <PlayCircle size={24} className="mx-auto text-accent mb-2" />
                  <p className="text-sm font-medium text-gray-900 group-hover:text-accent">Training Videos</p>
                  <p className="text-xs text-gray-500">{sku.trainingVideos} available</p>
                </button>
                <button
                  onClick={() => openKnowledgebase(sku)}
                  className="text-center p-4 bg-gray-50 rounded-lg hover:bg-accent-light hover:border-accent border border-transparent transition-all group"
                >
                  <BookOpen size={24} className="mx-auto text-accent mb-2" />
                  <p className="text-sm font-medium text-gray-900 group-hover:text-accent">Knowledgebase</p>
                  <p className="text-xs text-gray-500">{sku.knowledgebaseArticles} articles</p>
                </button>
                <button
                  onClick={() => openOEMContact(sku)}
                  className="text-center p-4 bg-gray-50 rounded-lg hover:bg-accent-light hover:border-accent border border-transparent transition-all group"
                >
                  <Users size={24} className="mx-auto text-accent mb-2" />
                  <p className="text-sm font-medium text-gray-900 group-hover:text-accent">OEM Contact</p>
                  <p className="text-xs text-gray-500">View POC details</p>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewLevel === "parts" && selectedSKU && selectedOEM && (
        <PartsView sku={selectedSKU} oem={selectedOEM} />
      )}

      {viewLevel === "training" && selectedSKU && selectedOEM && (
        <TrainingView sku={selectedSKU} oem={selectedOEM} />
      )}

      {viewLevel === "knowledgebase" && selectedSKU && selectedOEM && (
        <KnowledgebaseView sku={selectedSKU} oem={selectedOEM} />
      )}

      {viewLevel === "oem_contact" && selectedSKU && selectedOEM && (
        <OEMContactView sku={selectedSKU} oem={selectedOEM} />
      )}

      {viewLevel === "machines" && selectedSKU && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{selectedOEM?.name} {selectedSKU.model}</h3>
                <p className="text-sm text-gray-500">{selectedSKU.specs}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  {(machines[selectedSKU.id] || []).filter(m => m.status === 'active').length} Active
                </span>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                  {(machines[selectedSKU.id] || []).filter(m => m.status === 'idle').length} Idle
                </span>
                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                  {(machines[selectedSKU.id] || []).filter(m => m.status === 'maintenance').length} Maintenance
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(machines[selectedSKU.id] || []).map((machine) => {
              const statusColors = {
                active: "bg-green-100 text-green-700",
                idle: "bg-amber-100 text-amber-700",
                maintenance: "bg-red-100 text-red-700",
              };
              return (
                <button
                  key={machine.id}
                  onClick={() => selectMachine(machine)}
                  className="bg-white rounded-xl border border-gray-200 p-5 text-left hover:border-accent hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-900">{machine.serialNumber}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${statusColors[machine.status]}`}>
                      {machine.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Building size={14} />
                      <span>{machine.client}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      <span>{machine.site}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>{machine.engineHours.toLocaleString()} engine hours</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {viewLevel === "analytics" && selectedMachine && (
        <MachineAnalytics machine={selectedMachine} sku={selectedSKU} oem={selectedOEM} />
      )}
    </div>
  );
}

// Parts View
function PartsView({ sku, oem }: { sku: SKU; oem: OEM }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [stockFilter, setStockFilter] = useState<string>("all");
  
  const partsList = parts[sku.id] || [];
  const categories = ["all", ...Array.from(new Set(partsList.map(p => p.category)))];
  
  const filteredParts = partsList.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          part.partNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || part.category === selectedCategory;
    const matchesStock = stockFilter === "all" || part.stock === stockFilter;
    return matchesSearch && matchesCategory && matchesStock;
  });

  const stockColors = {
    in_stock: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
    low_stock: { bg: "bg-amber-100", text: "text-amber-700", icon: AlertCircle },
    out_of_stock: { bg: "bg-red-100", text: "text-red-700", icon: AlertCircle },
  };

  const stockLabels = {
    in_stock: "In Stock",
    low_stock: "Low Stock",
    out_of_stock: "Out of Stock",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-accent-light rounded-xl flex items-center justify-center">
            <Package size={28} className="text-accent" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Parts Catalog</h3>
            <p className="text-gray-500">{oem.name} {sku.model} • {partsList.length} parts available</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by part name or number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                selectedCategory === cat
                  ? "bg-accent text-white"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stock Filter */}
      <div className="flex gap-2">
        <span className="text-sm text-gray-500 py-2">Stock:</span>
        {["all", "in_stock", "low_stock", "out_of_stock"].map(stock => (
          <button
            key={stock}
            onClick={() => setStockFilter(stock)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              stockFilter === stock
                ? "bg-gray-900 text-white"
                : "bg-white border border-gray-200 text-gray-700 hover:border-gray-400"
            }`}
          >
            {stock === "all" ? "All" : stockLabels[stock as keyof typeof stockLabels]}
          </button>
        ))}
      </div>

      {/* Parts List */}
      <div className="space-y-3">
        {filteredParts.map((part) => {
          const stockStyle = stockColors[part.stock];
          const StockIcon = stockStyle.icon;
          return (
            <div
              key={part.id}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:border-accent hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Wrench size={24} className="text-gray-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-accent font-medium">{part.partNumber}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{part.category}</span>
                    </div>
                    <h4 className="font-medium text-gray-900 mt-1">{part.name}</h4>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>Lead time: {part.leadTime}</span>
                      <span>Compatible: {part.compatibility.join(", ")}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">₹{part.price.toLocaleString()}</p>
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mt-2 ${stockStyle.bg} ${stockStyle.text}`}>
                    <StockIcon size={12} />
                    {stockLabels[part.stock]}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredParts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Package size={48} className="mx-auto mb-4 text-gray-300" />
          <p>No parts found matching your criteria</p>
        </div>
      )}
    </div>
  );
}

// Training Videos View
function TrainingView({ sku, oem }: { sku: SKU; oem: OEM }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const videos = trainingVideos[sku.id] || [];
  const categories = ["all", ...Array.from(new Set(videos.map(v => v.category)))];
  
  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-accent-light rounded-xl flex items-center justify-center">
            <PlayCircle size={28} className="text-accent" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Training Videos</h3>
            <p className="text-gray-500">{oem.name} {sku.model} • {videos.length} videos available</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                selectedCategory === cat
                  ? "bg-accent text-white"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-accent hover:shadow-lg transition-all group cursor-pointer"
          >
            <div className="relative h-40 bg-gray-100 flex items-center justify-center">
              <Video size={48} className="text-gray-300" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle size={24} className="text-white" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                {video.duration}
              </span>
            </div>
            <div className="p-4">
              <span className="text-xs text-accent font-medium">{video.category}</span>
              <h4 className="font-medium text-gray-900 mt-1 group-hover:text-accent transition-colors">
                {video.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Knowledgebase View
function KnowledgebaseView({ sku, oem }: { sku: SKU; oem: OEM }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const articles = knowledgebaseArticles[sku.id] || [];
  const categories = ["all", ...Array.from(new Set(articles.map(a => a.category)))];
  
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-accent-light rounded-xl flex items-center justify-center">
            <BookOpen size={28} className="text-accent" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Knowledgebase</h3>
            <p className="text-gray-500">{oem.name} {sku.model} • {articles.length} articles available</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                selectedCategory === cat
                  ? "bg-accent text-white"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-3">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:border-accent hover:shadow-lg transition-all group cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-accent-light transition-colors">
                  <FileText size={20} className="text-gray-500 group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <span className="text-xs text-accent font-medium">{article.category}</span>
                  <h4 className="font-medium text-gray-900 mt-1 group-hover:text-accent transition-colors">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>Updated {article.lastUpdated}</span>
                    <span>{article.readTime} read</span>
                  </div>
                </div>
              </div>
              <ExternalLink size={18} className="text-gray-400 group-hover:text-accent transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// OEM Contact View
function OEMContactView({ sku, oem }: { sku: SKU; oem: OEM }) {
  const oemData = oemContacts[oem.id] || { info: { name: oem.name, website: "", supportLine: "", email: "" }, contacts: [] };

  return (
    <div className="space-y-6">
      {/* Company Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-700">{oem.logo}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">{oemData.info.name}</h3>
            <p className="text-gray-500">OEM Partner for {sku.model}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Globe size={18} className="text-accent" />
                <div>
                  <p className="text-xs text-gray-500">Website</p>
                  <p className="text-sm font-medium text-gray-900">{oemData.info.website}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone size={18} className="text-accent" />
                <div>
                  <p className="text-xs text-gray-500">Support Line</p>
                  <p className="text-sm font-medium text-gray-900">{oemData.info.supportLine}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail size={18} className="text-accent" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">{oemData.info.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Contacts</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {oemData.contacts.map((contact, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:border-accent hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent-light rounded-full flex items-center justify-center">
                  <span className="text-accent font-semibold">{contact.name.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900">{contact.name}</h5>
                  <p className="text-sm text-gray-500">{contact.role}</p>
                  <p className="text-xs text-accent mt-1">{contact.region}</p>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <a href={`tel:${contact.phone}`} className="flex items-center gap-1 text-sm text-gray-600 hover:text-accent">
                      <Phone size={14} />
                      {contact.phone}
                    </a>
                    <a href={`mailto:${contact.email}`} className="flex items-center gap-1 text-sm text-gray-600 hover:text-accent">
                      <Mail size={14} />
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Machine Analytics Component
function MachineAnalytics({ machine, sku, oem }: { machine: Machine; sku: SKU | null; oem: OEM | null }) {
  const statusColors = {
    active: "bg-green-100 text-green-700 border-green-200",
    idle: "bg-amber-100 text-amber-700 border-amber-200",
    maintenance: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div className="space-y-6">
      {/* Machine Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold text-gray-900">{machine.serialNumber}</h3>
              <span className={`px-3 py-1 text-sm font-medium rounded-full capitalize border ${statusColors[machine.status]}`}>
                {machine.status}
              </span>
            </div>
            <p className="text-gray-500">{oem?.name} {sku?.model} • {sku?.specs}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Client</p>
            <p className="font-semibold text-gray-900">{machine.client}</p>
            <p className="text-sm text-gray-500 mt-1">{machine.site}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Engine Hours", value: machine.engineHours.toLocaleString(), icon: Clock, unit: "hrs" },
          { label: "Fuel Level", value: "72", icon: Zap, unit: "%" },
          { label: "Engine Temp", value: "87", icon: ThermometerSun, unit: "°C" },
          { label: "Hydraulic PSI", value: "2,450", icon: Gauge, unit: "psi" },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <Icon size={16} />
                <span className="text-sm">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {stat.value}<span className="text-sm font-normal text-gray-500 ml-1">{stat.unit}</span>
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts / Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Engine Hours (Last 7 Days)</h4>
          <div className="flex items-end justify-between h-40 gap-2">
            {[8, 10, 7, 9, 11, 6, 8].map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-1">
                <div 
                  className="w-full bg-accent rounded-t transition-all"
                  style={{ height: `${(value / 12) * 100}%` }}
                />
                <span className="text-xs text-gray-500">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Recent Activity</h4>
          <div className="space-y-4">
            {[
              { action: "Maintenance completed", time: "2 hours ago", icon: Activity },
              { action: "Location updated", time: "5 hours ago", icon: MapPin },
              { action: "Fuel refilled", time: "1 day ago", icon: Zap },
              { action: "Service request created", time: "2 days ago", icon: Clock },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Icon size={16} className="text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{item.action}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Service History */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Service History</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Service Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Technician</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Engine Hours</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: "Nov 15, 2024", type: "Oil Change", technician: "Ramesh K.", hours: 4800, status: "Completed" },
                { date: "Oct 20, 2024", type: "Filter Replacement", technician: "Suresh M.", hours: 4500, status: "Completed" },
                { date: "Sep 10, 2024", type: "Major Service", technician: "Ramesh K.", hours: 4000, status: "Completed" },
              ].map((service, index) => (
                <tr key={index} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 px-4 text-sm text-gray-900">{service.date}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{service.type}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{service.technician}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{service.hours.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      {service.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
