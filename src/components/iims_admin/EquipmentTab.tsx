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
  User,
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
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Eye,
  Settings,
  Calendar,
  History,
  Plus,
  Pencil,
  Trash2,
  Download,
  Upload
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
  youtubeId: string;
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
    { id: "1", title: "CAT 320D Basic Operation", duration: "15:30", category: "Operation", thumbnail: "basic-op", youtubeId: "4Y31MD36xF4" },
    { id: "2", title: "Daily Inspection Checklist", duration: "8:45", category: "Maintenance", thumbnail: "inspection", youtubeId: "4Y31MD36xF4" },
    { id: "3", title: "Hydraulic System Overview", duration: "22:10", category: "Technical", thumbnail: "hydraulic", youtubeId: "4Y31MD36xF4" },
    { id: "4", title: "Safety Procedures & Protocols", duration: "18:00", category: "Safety", thumbnail: "safety", youtubeId: "4Y31MD36xF4" },
    { id: "5", title: "Digging Techniques for Efficiency", duration: "25:30", category: "Operation", thumbnail: "digging", youtubeId: "4Y31MD36xF4" },
    { id: "6", title: "Track Maintenance Guide", duration: "12:15", category: "Maintenance", thumbnail: "track", youtubeId: "4Y31MD36xF4" },
    { id: "7", title: "Engine Troubleshooting", duration: "20:00", category: "Technical", thumbnail: "engine", youtubeId: "4Y31MD36xF4" },
    { id: "8", title: "Operator Comfort & Ergonomics", duration: "10:30", category: "Operation", thumbnail: "comfort", youtubeId: "4Y31MD36xF4" },
    { id: "9", title: "Fuel Efficiency Tips", duration: "14:20", category: "Operation", thumbnail: "fuel", youtubeId: "4Y31MD36xF4" },
    { id: "10", title: "Cold Weather Starting", duration: "8:00", category: "Technical", thumbnail: "cold", youtubeId: "4Y31MD36xF4" },
    { id: "11", title: "Attachment Installation", duration: "16:45", category: "Technical", thumbnail: "attach", youtubeId: "4Y31MD36xF4" },
    { id: "12", title: "Emergency Procedures", duration: "11:30", category: "Safety", thumbnail: "emergency", youtubeId: "4Y31MD36xF4" },
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
        
        {/* Admin Actions */}
        <div className="flex items-center gap-2">
          {viewLevel === "categories" && (
            <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-medium text-sm hover:bg-red-700 transition-colors">
              <Plus size={18} />
              Add Category
            </button>
          )}
          {viewLevel === "oems" && (
            <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-medium text-sm hover:bg-red-700 transition-colors">
              <Plus size={18} />
              Add OEM
            </button>
          )}
          {viewLevel === "skus" && (
            <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-medium text-sm hover:bg-red-700 transition-colors">
              <Plus size={18} />
              Add Model
            </button>
          )}
          {viewLevel === "machines" && (
            <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-medium text-sm hover:bg-red-700 transition-colors">
              <Plus size={18} />
              Add Machine
            </button>
          )}
          {viewLevel === "analytics" && (
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors">
                <Pencil size={16} />
                Edit
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors">
                <Download size={16} />
                Export
              </button>
            </div>
          )}
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
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  
  const videos = trainingVideos[sku.id] || [];
  const categories = ["all", ...Array.from(new Set(videos.map(v => v.category)))];
  
  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // If a video is playing, show the video player
  if (playingVideo) {
    const currentVideo = videos.find(v => v.id === playingVideo);
    if (currentVideo) {
      return (
        <div className="space-y-6">
          {/* Back Button */}
          <button
            onClick={() => setPlayingVideo(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-accent transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Videos</span>
          </button>

          {/* Video Player */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1&rel=0`}
                title={currentVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-6">
              <span className="text-sm text-accent font-medium">{currentVideo.category}</span>
              <h3 className="text-xl font-semibold text-gray-900 mt-1">{currentVideo.title}</h3>
              <p className="text-gray-500 mt-2">Duration: {currentVideo.duration}</p>
            </div>
          </div>

          {/* Related Videos */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">More Videos</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {videos.filter(v => v.id !== playingVideo).slice(0, 4).map((video) => (
                <div
                  key={video.id}
                  onClick={() => setPlayingVideo(video.id)}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-accent hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="relative h-24">
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <PlayCircle size={16} className="text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-accent transition-colors">
                      {video.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  }

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
            onClick={() => setPlayingVideo(video.id)}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-accent hover:shadow-lg transition-all group cursor-pointer"
          >
            <div className="relative h-40">
              <img
                src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                alt={video.title}
                className="w-full h-full object-cover"
              />
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

// Extended machine data for detail view
interface MachineDetail {
  serialNumber: string;
  health: {
    engineHours: number;
    fuelLevel: number;
    engineTemp: number;
    hydraulicPSI: number;
    isRunning: boolean;
    uptime: number; // percentage
    lastStarted: string;
  };
  location: {
    site: string;
    address: string;
    coordinates: { lat: number; lng: number };
  };
  client: {
    name: string;
    project: string;
  };
  supervisor: {
    name: string;
    phone: string;
    email: string;
  };
  currentOperator: {
    name: string;
    id: string;
    phone: string;
    shift: string;
  } | null;
  activities: Array<{
    id: string;
    date: string;
    operator: string;
    duration: string;
    hoursLogged: number;
    fuelUsed: number;
    site: string;
  }>;
  serviceHistory: Array<{
    id: string;
    date: string;
    type: string;
    description: string;
    technician: string;
    engineHours: number;
    partsReplaced: string[];
    cost: number;
    status: "completed" | "in_progress" | "scheduled";
  }>;
  serviceRequests: Array<{
    id: string;
    title: string;
    type: "repair" | "replacement" | "inspection";
    priority: "low" | "medium" | "high" | "critical";
    status: "pending" | "in_progress" | "resolved";
    createdAt: string;
    description: string;
  }>;
  installedParts: Array<{
    id: string;
    partSerialNumber: string;
    partNumber: string;
    name: string;
    category: string;
    installedDate: string;
    installedBy: string;
    installedAtHours: number;
    expectedLifeHours: number;
    currentHoursUsed: number;
    condition: "excellent" | "good" | "fair" | "worn" | "critical";
    lastInspection: string;
    nextInspectionDue: string;
    notes: string;
    history: Array<{
      date: string;
      action: "installed" | "inspected" | "repaired" | "replaced";
      technician: string;
      notes: string;
    }>;
  }>;
}

const machineDetails: Record<string, MachineDetail> = {
  "EX-001": {
    serialNumber: "EX-001",
    health: {
      engineHours: 4850,
      fuelLevel: 72,
      engineTemp: 87,
      hydraulicPSI: 2450,
      isRunning: true,
      uptime: 94,
      lastStarted: "Dec 3, 2024 06:00 AM",
    },
    location: {
      site: "Site A - Block 3",
      address: "Plot 45, Industrial Area Phase 2, Mumbai, Maharashtra 400001",
      coordinates: { lat: 19.076, lng: 72.8777 },
    },
    client: {
      name: "Tata Projects",
      project: "Metro Line 4 Construction",
    },
    supervisor: {
      name: "Vikram Mehta",
      phone: "+91 98765 12345",
      email: "vikram.mehta@tataprojects.com",
    },
    currentOperator: {
      name: "Rajesh Kumar",
      id: "OP-001",
      phone: "+91 98765 43210",
      shift: "Day Shift (6 AM - 2 PM)",
    },
    activities: [
      { id: "ACT-001", date: "Dec 3, 2024", operator: "Rajesh Kumar", duration: "8h 30m", hoursLogged: 8.5, fuelUsed: 23, site: "Block 3" },
      { id: "ACT-002", date: "Dec 2, 2024", operator: "Rajesh Kumar", duration: "7h 45m", hoursLogged: 7.75, fuelUsed: 20, site: "Block 3" },
      { id: "ACT-003", date: "Dec 1, 2024", operator: "Amit Singh", duration: "6h 15m", hoursLogged: 6.25, fuelUsed: 18, site: "Block 2" },
      { id: "ACT-004", date: "Nov 30, 2024", operator: "Rajesh Kumar", duration: "9h 00m", hoursLogged: 9, fuelUsed: 25, site: "Block 3" },
      { id: "ACT-005", date: "Nov 29, 2024", operator: "Rajesh Kumar", duration: "8h 00m", hoursLogged: 8, fuelUsed: 22, site: "Block 3" },
    ],
    serviceHistory: [
      { id: "SH-001", date: "Nov 15, 2024", type: "Scheduled Maintenance", description: "500-hour service completed", technician: "Ramesh Patel", engineHours: 4800, partsReplaced: ["Engine Oil Filter", "Hydraulic Filter", "Air Filter"], cost: 45000, status: "completed" },
      { id: "SH-002", date: "Oct 20, 2024", type: "Filter Replacement", description: "Fuel filter replaced due to clogging", technician: "Suresh Kumar", engineHours: 4500, partsReplaced: ["Fuel Filter"], cost: 8500, status: "completed" },
      { id: "SH-003", date: "Sep 10, 2024", type: "Major Service", description: "1000-hour major service", technician: "Ramesh Patel", engineHours: 4000, partsReplaced: ["Engine Oil", "All Filters", "Hydraulic Oil", "Track Pads (2)"], cost: 125000, status: "completed" },
      { id: "SH-004", date: "Aug 5, 2024", type: "Repair", description: "Hydraulic cylinder seal replacement", technician: "Mohan Das", engineHours: 3700, partsReplaced: ["Hydraulic Cylinder Seal Kit"], cost: 28000, status: "completed" },
    ],
    serviceRequests: [
      { id: "SR-001", title: "Hydraulic Leak Detected", type: "repair", priority: "high", status: "in_progress", createdAt: "Dec 3, 2024", description: "Oil leak observed from main hydraulic cylinder" },
      { id: "SR-004", title: "Engine Warning Light", type: "inspection", priority: "medium", status: "pending", createdAt: "Dec 3, 2024", description: "Check engine light appeared during startup" },
      { id: "SR-005", title: "Bucket Teeth Replacement", type: "replacement", priority: "low", status: "in_progress", createdAt: "Nov 30, 2024", description: "Multiple bucket teeth worn out" },
    ],
    installedParts: [
      { id: "IP-001", partSerialNumber: "EOF-2024-11-0142", partNumber: "CAT-320D-EF-001", name: "Engine Oil Filter", category: "Filters", installedDate: "Nov 15, 2024", installedBy: "Ramesh Patel", installedAtHours: 4800, expectedLifeHours: 500, currentHoursUsed: 50, condition: "excellent", lastInspection: "Dec 1, 2024", nextInspectionDue: "Jan 1, 2025", notes: "OEM certified filter", history: [{ date: "Nov 15, 2024", action: "installed", technician: "Ramesh Patel", notes: "500-hour service replacement" }, { date: "Dec 1, 2024", action: "inspected", technician: "Suresh Kumar", notes: "Condition good, no issues" }] },
      { id: "IP-002", partSerialNumber: "AFP-2024-11-0089", partNumber: "CAT-320D-AF-002", name: "Air Filter Primary", category: "Filters", installedDate: "Nov 15, 2024", installedBy: "Ramesh Patel", installedAtHours: 4800, expectedLifeHours: 500, currentHoursUsed: 50, condition: "good", lastInspection: "Dec 1, 2024", nextInspectionDue: "Jan 1, 2025", notes: "Heavy dust environment - check frequently", history: [{ date: "Nov 15, 2024", action: "installed", technician: "Ramesh Patel", notes: "500-hour service replacement" }, { date: "Dec 1, 2024", action: "inspected", technician: "Suresh Kumar", notes: "Slight dust accumulation, cleaned" }] },
      { id: "IP-003", partSerialNumber: "HF-2024-11-0067", partNumber: "CAT-320D-HF-003", name: "Hydraulic Oil Filter", category: "Filters", installedDate: "Nov 15, 2024", installedBy: "Ramesh Patel", installedAtHours: 4800, expectedLifeHours: 1000, currentHoursUsed: 50, condition: "excellent", lastInspection: "Dec 1, 2024", nextInspectionDue: "Feb 1, 2025", notes: "", history: [{ date: "Nov 15, 2024", action: "installed", technician: "Ramesh Patel", notes: "500-hour service replacement" }] },
      { id: "IP-004", partSerialNumber: "FF-2024-10-0234", partNumber: "CAT-320D-FF-004", name: "Fuel Filter", category: "Filters", installedDate: "Oct 20, 2024", installedBy: "Suresh Kumar", installedAtHours: 4500, expectedLifeHours: 500, currentHoursUsed: 350, condition: "fair", lastInspection: "Nov 30, 2024", nextInspectionDue: "Dec 15, 2024", notes: "Replaced due to clogging issue", history: [{ date: "Oct 20, 2024", action: "installed", technician: "Suresh Kumar", notes: "Emergency replacement - filter clogged" }, { date: "Nov 30, 2024", action: "inspected", technician: "Ramesh Patel", notes: "Some sediment observed, monitor closely" }] },
      { id: "IP-005", partSerialNumber: "TP-2024-09-0156", partNumber: "CAT-320D-TP-005", name: "Track Pad Left Front", category: "Undercarriage", installedDate: "Sep 10, 2024", installedBy: "Ramesh Patel", installedAtHours: 4000, expectedLifeHours: 2000, currentHoursUsed: 850, condition: "good", lastInspection: "Nov 25, 2024", nextInspectionDue: "Jan 25, 2025", notes: "", history: [{ date: "Sep 10, 2024", action: "installed", technician: "Ramesh Patel", notes: "1000-hour major service replacement" }, { date: "Nov 25, 2024", action: "inspected", technician: "Mohan Das", notes: "Wear within acceptable limits" }] },
      { id: "IP-006", partSerialNumber: "TP-2024-09-0157", partNumber: "CAT-320D-TP-005", name: "Track Pad Right Front", category: "Undercarriage", installedDate: "Sep 10, 2024", installedBy: "Ramesh Patel", installedAtHours: 4000, expectedLifeHours: 2000, currentHoursUsed: 850, condition: "good", lastInspection: "Nov 25, 2024", nextInspectionDue: "Jan 25, 2025", notes: "", history: [{ date: "Sep 10, 2024", action: "installed", technician: "Ramesh Patel", notes: "1000-hour major service replacement" }] },
      { id: "IP-007", partSerialNumber: "TR-2023-06-0089", partNumber: "CAT-320D-TR-006", name: "Track Roller #1", category: "Undercarriage", installedDate: "Jun 15, 2023", installedBy: "Mohan Das", installedAtHours: 2500, expectedLifeHours: 4000, currentHoursUsed: 2350, condition: "fair", lastInspection: "Nov 25, 2024", nextInspectionDue: "Dec 25, 2024", notes: "Monitor bearing noise", history: [{ date: "Jun 15, 2023", action: "installed", technician: "Mohan Das", notes: "Original equipment replacement" }, { date: "Nov 25, 2024", action: "inspected", technician: "Mohan Das", notes: "Slight bearing noise, needs attention soon" }] },
      { id: "IP-008", partSerialNumber: "TR-2023-06-0090", partNumber: "CAT-320D-TR-006", name: "Track Roller #2", category: "Undercarriage", installedDate: "Jun 15, 2023", installedBy: "Mohan Das", installedAtHours: 2500, expectedLifeHours: 4000, currentHoursUsed: 2350, condition: "worn", lastInspection: "Nov 25, 2024", nextInspectionDue: "Dec 10, 2024", notes: "REPLACEMENT RECOMMENDED", history: [{ date: "Jun 15, 2023", action: "installed", technician: "Mohan Das", notes: "Original equipment replacement" }, { date: "Oct 15, 2024", action: "inspected", technician: "Ramesh Patel", notes: "Wear increasing" }, { date: "Nov 25, 2024", action: "inspected", technician: "Mohan Das", notes: "Significant wear, replacement needed" }] },
      { id: "IP-009", partSerialNumber: "HCS-2024-08-0023", partNumber: "CAT-320D-HC-009", name: "Hydraulic Cylinder Seal Kit", category: "Hydraulics", installedDate: "Aug 5, 2024", installedBy: "Mohan Das", installedAtHours: 3700, expectedLifeHours: 2000, currentHoursUsed: 1150, condition: "critical", lastInspection: "Dec 2, 2024", nextInspectionDue: "IMMEDIATE", notes: "LEAK DETECTED - SERVICE REQUEST RAISED", history: [{ date: "Aug 5, 2024", action: "installed", technician: "Mohan Das", notes: "Seal replacement due to leak" }, { date: "Dec 2, 2024", action: "inspected", technician: "Suresh Kumar", notes: "Oil leak detected, immediate attention required" }] },
      { id: "IP-010", partSerialNumber: "BT-2024-11-0045", partNumber: "CAT-320D-BT-011", name: "Bucket Teeth Set", category: "Attachments", installedDate: "Nov 1, 2024", installedBy: "Ramesh Patel", installedAtHours: 4700, expectedLifeHours: 500, currentHoursUsed: 150, condition: "worn", lastInspection: "Dec 1, 2024", nextInspectionDue: "Dec 8, 2024", notes: "REPLACEMENT IN PROGRESS", history: [{ date: "Nov 1, 2024", action: "installed", technician: "Ramesh Patel", notes: "New set installed" }, { date: "Dec 1, 2024", action: "inspected", technician: "Rajesh Kumar", notes: "Multiple teeth worn, replacement ordered" }] },
      { id: "IP-011", partSerialNumber: "SP-2022-03-0012", partNumber: "CAT-320D-SP-008", name: "Sprocket Left", category: "Undercarriage", installedDate: "Mar 20, 2022", installedBy: "Mohan Das", installedAtHours: 1200, expectedLifeHours: 5000, currentHoursUsed: 3650, condition: "good", lastInspection: "Nov 25, 2024", nextInspectionDue: "Feb 25, 2025", notes: "", history: [{ date: "Mar 20, 2022", action: "installed", technician: "Mohan Das", notes: "Original equipment" }] },
      { id: "IP-012", partSerialNumber: "SP-2022-03-0013", partNumber: "CAT-320D-SP-008", name: "Sprocket Right", category: "Undercarriage", installedDate: "Mar 20, 2022", installedBy: "Mohan Das", installedAtHours: 1200, expectedLifeHours: 5000, currentHoursUsed: 3650, condition: "good", lastInspection: "Nov 25, 2024", nextInspectionDue: "Feb 25, 2025", notes: "", history: [{ date: "Mar 20, 2022", action: "installed", technician: "Mohan Das", notes: "Original equipment" }] },
    ],
  },
  "EX-015": {
    serialNumber: "EX-015",
    health: {
      engineHours: 3800,
      fuelLevel: 65,
      engineTemp: 82,
      hydraulicPSI: 2380,
      isRunning: false,
      uptime: 88,
      lastStarted: "Dec 3, 2024 07:00 AM",
    },
    location: {
      site: "Site A - Block 1",
      address: "Plot 12, Industrial Area Phase 1, Mumbai, Maharashtra 400001",
      coordinates: { lat: 19.082, lng: 72.882 },
    },
    client: {
      name: "Tata Projects",
      project: "Metro Line 4 Construction",
    },
    supervisor: {
      name: "Vikram Mehta",
      phone: "+91 98765 12345",
      email: "vikram.mehta@tataprojects.com",
    },
    currentOperator: null,
    activities: [
      { id: "ACT-006", date: "Dec 3, 2024", operator: "Vikram Patel", duration: "5h 00m", hoursLogged: 5, fuelUsed: 15, site: "Block 1" },
      { id: "ACT-007", date: "Dec 2, 2024", operator: "Rajesh Kumar", duration: "4h 30m", hoursLogged: 4.5, fuelUsed: 12, site: "Block 1" },
    ],
    serviceHistory: [
      { id: "SH-005", date: "Nov 22, 2024", type: "Scheduled Maintenance", description: "500-hour service completed", technician: "Ramesh Patel", engineHours: 3750, partsReplaced: ["Engine Oil Filter", "Air Filter"], cost: 32000, status: "completed" },
    ],
    serviceRequests: [
      { id: "SR-003", title: "AC Compressor Issue", type: "repair", priority: "medium", status: "resolved", createdAt: "Nov 28, 2024", description: "Cabin AC not cooling properly" },
    ],
    installedParts: [
      { id: "IP-101", partSerialNumber: "EOF-2024-11-0198", partNumber: "KOM-PC200-EF-001", name: "Engine Oil Filter", category: "Filters", installedDate: "Nov 22, 2024", installedBy: "Ramesh Patel", installedAtHours: 3750, expectedLifeHours: 500, currentHoursUsed: 50, condition: "excellent", lastInspection: "Nov 28, 2024", nextInspectionDue: "Dec 28, 2024", notes: "OEM Komatsu filter", history: [{ date: "Nov 22, 2024", action: "installed", technician: "Ramesh Patel", notes: "500-hour service replacement" }] },
      { id: "IP-102", partSerialNumber: "AFP-2024-11-0156", partNumber: "KOM-PC200-AF-002", name: "Air Filter Primary", category: "Filters", installedDate: "Nov 22, 2024", installedBy: "Ramesh Patel", installedAtHours: 3750, expectedLifeHours: 500, currentHoursUsed: 50, condition: "excellent", lastInspection: "Nov 28, 2024", nextInspectionDue: "Dec 28, 2024", notes: "", history: [{ date: "Nov 22, 2024", action: "installed", technician: "Ramesh Patel", notes: "500-hour service replacement" }] },
      { id: "IP-103", partSerialNumber: "TR-2023-08-0045", partNumber: "KOM-PC200-TR-006", name: "Track Roller #1", category: "Undercarriage", installedDate: "Aug 10, 2023", installedBy: "Suresh Kumar", installedAtHours: 2200, expectedLifeHours: 4000, currentHoursUsed: 1600, condition: "good", lastInspection: "Nov 20, 2024", nextInspectionDue: "Jan 20, 2025", notes: "", history: [{ date: "Aug 10, 2023", action: "installed", technician: "Suresh Kumar", notes: "Replacement after wear" }] },
      { id: "IP-104", partSerialNumber: "HF-2024-09-0078", partNumber: "KOM-PC200-HF-003", name: "Hydraulic Oil Filter", category: "Filters", installedDate: "Sep 15, 2024", installedBy: "Ramesh Patel", installedAtHours: 3500, expectedLifeHours: 1000, currentHoursUsed: 300, condition: "good", lastInspection: "Nov 20, 2024", nextInspectionDue: "Feb 20, 2025", notes: "", history: [{ date: "Sep 15, 2024", action: "installed", technician: "Ramesh Patel", notes: "Preventive replacement" }] },
    ],
  },
};

// Machine Analytics Component
function MachineAnalytics({ machine, sku, oem }: { machine: Machine; sku: SKU | null; oem: OEM | null }) {
  const [activeTab, setActiveTab] = useState<"overview" | "parts" | "activity" | "service">("overview");
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [partsFilter, setPartsFilter] = useState<string>("all");
  
  const detail = machineDetails[machine.serialNumber] || {
    serialNumber: machine.serialNumber,
    health: { engineHours: machine.engineHours, fuelLevel: 70, engineTemp: 85, hydraulicPSI: 2400, isRunning: machine.status === "active", uptime: 90, lastStarted: "Unknown" },
    location: { site: machine.site, address: "Address not available", coordinates: { lat: 19.076, lng: 72.8777 } },
    client: { name: machine.client, project: "Project Unknown" },
    supervisor: { name: "Not Assigned", phone: "-", email: "-" },
    currentOperator: null,
    activities: [],
    serviceHistory: [],
    serviceRequests: [],
    installedParts: [],
  };

  const statusColors = {
    active: "bg-green-500",
    idle: "bg-amber-500",
    maintenance: "bg-red-500",
  };

  const priorityColors = {
    low: "bg-gray-100 text-gray-700",
    medium: "bg-amber-100 text-amber-700",
    high: "bg-orange-100 text-orange-700",
    critical: "bg-red-100 text-red-700",
  };

  const requestStatusColors = {
    pending: "bg-amber-100 text-amber-700",
    in_progress: "bg-blue-100 text-blue-700",
    resolved: "bg-green-100 text-green-700",
  };

  return (
    <div className="space-y-6">
      {/* Machine Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-accent-light rounded-xl flex items-center justify-center">
                <Truck size={32} className="text-accent" />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${statusColors[machine.status]} rounded-full border-2 border-white flex items-center justify-center`}>
                {detail.health.isRunning && (
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-2xl font-bold text-gray-900">{machine.serialNumber}</h3>
                <span className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${
                  machine.status === "active" ? "bg-green-100 text-green-700" :
                  machine.status === "idle" ? "bg-amber-100 text-amber-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {detail.health.isRunning ? "Running" : machine.status}
                </span>
              </div>
              <p className="text-gray-500">{oem?.name} {sku?.model} • {sku?.specs}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {[
          { id: "overview", label: "Overview" },
          { id: "parts", label: "Installed Parts" },
          { id: "activity", label: "Activity Log" },
          { id: "service", label: "Service & Requests" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-accent text-accent"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            {tab.label}
            {tab.id === "parts" && detail.installedParts.filter(p => p.condition === "critical" || p.condition === "worn").length > 0 && (
              <span className="ml-2 px-1.5 py-0.5 text-xs bg-red-100 text-red-700 rounded-full">
                {detail.installedParts.filter(p => p.condition === "critical" || p.condition === "worn").length}
              </span>
            )}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Health Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Activity size={20} className="text-accent" />
                Equipment Health
              </h4>
              <span className="text-sm text-gray-500">Last updated: Just now</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <Clock size={14} />
                  <span className="text-xs">Engine Hours</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{detail.health.engineHours.toLocaleString()}</p>
                <p className="text-xs text-gray-500">hours</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <TrendingUp size={14} />
                  <span className="text-xs">Uptime</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{detail.health.uptime}%</p>
                <p className="text-xs text-green-600">This month</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <ThermometerSun size={14} />
                  <span className="text-xs">Engine Temp</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{detail.health.engineTemp}°C</p>
                <p className={`text-xs ${detail.health.engineTemp > 95 ? 'text-red-600' : 'text-green-600'}`}>
                  {detail.health.engineTemp > 95 ? 'High' : 'Normal'}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <Gauge size={14} />
                  <span className="text-xs">Hydraulic PSI</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{detail.health.hydraulicPSI.toLocaleString()}</p>
                <p className="text-xs text-green-600">Optimal</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <Zap size={14} />
                  <span className="text-xs">Fuel Level</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{detail.health.fuelLevel}%</p>
                <div className="mt-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${detail.health.fuelLevel > 30 ? 'bg-green-500' : 'bg-amber-500'}`}
                    style={{ width: `${detail.health.fuelLevel}%` }}
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <Activity size={14} />
                  <span className="text-xs">Status</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${detail.health.isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                  <p className="text-lg font-bold text-gray-900">{detail.health.isRunning ? 'Running' : 'Stopped'}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">Since {detail.health.lastStarted.split(' ').slice(3).join(' ')}</p>
              </div>
            </div>
          </div>

          {/* Location & Contacts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Location Card */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin size={18} className="text-accent" />
                  Location
                </h4>
              </div>
              <div className="h-48 bg-gray-100 relative">
                {/* Google Maps Embed */}
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${detail.location.coordinates.lat},${detail.location.coordinates.lng}&zoom=15`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Site</p>
                  <p className="font-medium text-gray-900">{detail.location.site}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-sm text-gray-700">{detail.location.address}</p>
                </div>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${detail.location.coordinates.lat},${detail.location.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
                >
                  <ExternalLink size={14} />
                  Get Directions
                </a>
              </div>
            </div>

            {/* Client & Contacts */}
            <div className="space-y-4">
              {/* Client Info */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
                  <Building size={18} className="text-accent" />
                  Client & Project
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Client</span>
                    <span className="font-medium text-gray-900">{detail.client.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Project</span>
                    <span className="font-medium text-gray-900">{detail.client.project}</span>
                  </div>
                </div>
              </div>

              {/* Supervisor */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
                  <Users size={18} className="text-accent" />
                  Site Supervisor
                </h4>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent-light rounded-full flex items-center justify-center">
                    <span className="text-accent font-semibold">{detail.supervisor.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{detail.supervisor.name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <a href={`tel:${detail.supervisor.phone}`} className="flex items-center gap-1 text-xs text-gray-600 hover:text-accent">
                        <Phone size={12} />
                        {detail.supervisor.phone}
                      </a>
                      <a href={`mailto:${detail.supervisor.email}`} className="flex items-center gap-1 text-xs text-gray-600 hover:text-accent">
                        <Mail size={12} />
                        Email
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Operator */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
                  <User size={18} className="text-accent" />
                  Current Operator
                </h4>
                {detail.currentOperator ? (
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-700 font-semibold">{detail.currentOperator.name.charAt(0)}</span>
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{detail.currentOperator.name}</p>
                      <p className="text-xs text-gray-500">{detail.currentOperator.shift}</p>
                      <a href={`tel:${detail.currentOperator.phone}`} className="flex items-center gap-1 text-xs text-gray-600 hover:text-accent mt-1">
                        <Phone size={12} />
                        {detail.currentOperator.phone}
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <User size={24} className="mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No operator currently assigned</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">Total Activities</p>
              <p className="text-2xl font-bold text-gray-900">{detail.activities.length}</p>
              <p className="text-xs text-gray-500">This month</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">Hours Logged</p>
              <p className="text-2xl font-bold text-gray-900">
                {detail.activities.reduce((acc, a) => acc + a.hoursLogged, 0).toFixed(1)}h
              </p>
              <p className="text-xs text-gray-500">This month</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">Service Records</p>
              <p className="text-2xl font-bold text-gray-900">{detail.serviceHistory.length}</p>
              <p className="text-xs text-gray-500">Total</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">Open Requests</p>
              <p className="text-2xl font-bold text-gray-900">
                {detail.serviceRequests.filter(r => r.status !== "resolved").length}
              </p>
              <p className="text-xs text-amber-600">Pending action</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "parts" && (
        <div className="space-y-6">
          {/* Parts Summary */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Package size={16} />
                <span className="text-sm">Total Parts</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{detail.installedParts.length}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-2 text-green-500 mb-1">
                <CheckCircle size={16} />
                <span className="text-sm">Excellent</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{detail.installedParts.filter(p => p.condition === "excellent").length}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-2 text-blue-500 mb-1">
                <CheckCircle size={16} />
                <span className="text-sm">Good</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{detail.installedParts.filter(p => p.condition === "good").length}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-2 text-amber-500 mb-1">
                <AlertTriangle size={16} />
                <span className="text-sm">Fair/Worn</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{detail.installedParts.filter(p => p.condition === "fair" || p.condition === "worn").length}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-2 text-red-500 mb-1">
                <AlertCircle size={16} />
                <span className="text-sm">Critical</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{detail.installedParts.filter(p => p.condition === "critical").length}</p>
            </div>
          </div>

          {/* Parts Filter */}
          <div className="flex gap-2 flex-wrap">
            {["all", "Filters", "Undercarriage", "Hydraulics", "Attachments"].map((filter) => (
              <button
                key={filter}
                onClick={() => setPartsFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  partsFilter === filter
                    ? "bg-accent text-white"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-accent"
                }`}
              >
                {filter === "all" ? "All Parts" : filter}
              </button>
            ))}
          </div>

          {/* Parts List */}
          <div className="space-y-4">
            {detail.installedParts
              .filter(part => partsFilter === "all" || part.category === partsFilter)
              .map((part) => {
                const conditionColors = {
                  excellent: "bg-green-100 text-green-700 border-green-200",
                  good: "bg-blue-100 text-blue-700 border-blue-200",
                  fair: "bg-amber-100 text-amber-700 border-amber-200",
                  worn: "bg-orange-100 text-orange-700 border-orange-200",
                  critical: "bg-red-100 text-red-700 border-red-200",
                };
                const lifePercentage = Math.round((part.currentHoursUsed / part.expectedLifeHours) * 100);
                const isExpanded = selectedPart === part.id;

                return (
                  <div
                    key={part.id}
                    className={`bg-white rounded-xl border transition-all ${
                      part.condition === "critical" ? "border-red-300" :
                      part.condition === "worn" ? "border-orange-300" :
                      "border-gray-200"
                    }`}
                  >
                    {/* Part Header */}
                    <div
                      className="p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedPart(isExpanded ? null : part.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            part.condition === "critical" ? "bg-red-100" :
                            part.condition === "worn" ? "bg-orange-100" :
                            "bg-gray-100"
                          }`}>
                            <Package size={24} className={
                              part.condition === "critical" ? "text-red-600" :
                              part.condition === "worn" ? "text-orange-600" :
                              "text-gray-600"
                            } />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900">{part.name}</h4>
                              <span className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${conditionColors[part.condition]}`}>
                                {part.condition}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="font-mono">{part.partSerialNumber}</span>
                              <span>•</span>
                              <span>{part.category}</span>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                Installed: {part.installedDate}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={12} />
                                At {part.installedAtHours.toLocaleString()} hrs
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {/* Life Progress */}
                          <div className="text-right">
                            <p className="text-xs text-gray-500 mb-1">Life Used</p>
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    lifePercentage > 80 ? "bg-red-500" :
                                    lifePercentage > 60 ? "bg-amber-500" :
                                    "bg-green-500"
                                  }`}
                                  style={{ width: `${Math.min(lifePercentage, 100)}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium text-gray-900">{lifePercentage}%</span>
                            </div>
                          </div>
                          <ChevronRight
                            size={20}
                            className={`text-gray-400 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="border-t border-gray-200 p-4 bg-gray-50">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Part Details */}
                          <div className="lg:col-span-2 space-y-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div>
                                <p className="text-xs text-gray-500">Part Number</p>
                                <p className="text-sm font-medium text-gray-900">{part.partNumber}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Installed By</p>
                                <p className="text-sm font-medium text-gray-900">{part.installedBy}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Hours Used</p>
                                <p className="text-sm font-medium text-gray-900">{part.currentHoursUsed.toLocaleString()} / {part.expectedLifeHours.toLocaleString()} hrs</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Last Inspection</p>
                                <p className="text-sm font-medium text-gray-900">{part.lastInspection}</p>
                              </div>
                            </div>

                            {/* Next Inspection */}
                            <div className={`p-3 rounded-lg ${
                              part.nextInspectionDue === "IMMEDIATE" ? "bg-red-50 border border-red-200" :
                              "bg-blue-50 border border-blue-200"
                            }`}>
                              <div className="flex items-center gap-2">
                                {part.nextInspectionDue === "IMMEDIATE" ? (
                                  <AlertCircle size={16} className="text-red-600" />
                                ) : (
                                  <Calendar size={16} className="text-blue-600" />
                                )}
                                <span className={`text-sm font-medium ${
                                  part.nextInspectionDue === "IMMEDIATE" ? "text-red-700" : "text-blue-700"
                                }`}>
                                  Next Inspection: {part.nextInspectionDue}
                                </span>
                              </div>
                            </div>

                            {/* Notes */}
                            {part.notes && (
                              <div className={`p-3 rounded-lg ${
                                part.notes.includes("REPLACEMENT") || part.notes.includes("LEAK") ? "bg-red-50 border border-red-200" :
                                "bg-gray-100"
                              }`}>
                                <p className={`text-sm ${
                                  part.notes.includes("REPLACEMENT") || part.notes.includes("LEAK") ? "text-red-700 font-medium" :
                                  "text-gray-600"
                                }`}>
                                  {part.notes}
                                </p>
                              </div>
                            )}

                            {/* History */}
                            <div>
                              <h5 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <History size={16} className="text-accent" />
                                Service History
                              </h5>
                              <div className="space-y-2">
                                {part.history.map((h, idx) => (
                                  <div key={idx} className="flex items-start gap-3 text-sm">
                                    <div className={`w-2 h-2 mt-1.5 rounded-full ${
                                      h.action === "installed" ? "bg-green-500" :
                                      h.action === "repaired" ? "bg-amber-500" :
                                      h.action === "replaced" ? "bg-red-500" :
                                      "bg-blue-500"
                                    }`} />
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-900 capitalize">{h.action}</span>
                                        <span className="text-gray-400">•</span>
                                        <span className="text-gray-500">{h.date}</span>
                                        <span className="text-gray-400">•</span>
                                        <span className="text-gray-500">{h.technician}</span>
                                      </div>
                                      {h.notes && <p className="text-gray-600 mt-0.5">{h.notes}</p>}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="space-y-3">
                            <h5 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h5>
                            <button className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                              <RefreshCw size={18} />
                              Request Replacement
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors">
                              <Wrench size={18} />
                              Request Repair
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                              <Eye size={18} />
                              Schedule Inspection
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                              <Settings size={18} />
                              Edit Part Details
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                              <History size={18} />
                              View Full History
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {activeTab === "activity" && (
        <div className="space-y-6">
          {/* Activity Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">Total Hours</p>
              <p className="text-2xl font-bold text-gray-900">
                {detail.activities.reduce((acc, a) => acc + a.hoursLogged, 0).toFixed(1)}h
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">Fuel Consumed</p>
              <p className="text-2xl font-bold text-gray-900">
                {detail.activities.reduce((acc, a) => acc + a.fuelUsed, 0)}%
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">Unique Operators</p>
              <p className="text-2xl font-bold text-gray-900">
                {Array.from(new Set(detail.activities.map(a => a.operator))).length}
              </p>
            </div>
          </div>

          {/* Activity Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h4 className="font-semibold text-gray-900">Activity Log</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Operator</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Site</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Duration</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Hours</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Fuel Used</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {detail.activities.map((activity) => (
                    <tr key={activity.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{activity.date}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-accent-light rounded-full flex items-center justify-center">
                            <span className="text-accent text-xs font-semibold">{activity.operator.charAt(0)}</span>
                          </div>
                          <span className="text-sm text-gray-900">{activity.operator}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{activity.site}</td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">{activity.duration}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{activity.hoursLogged}h</td>
                      <td className="py-3 px-4 text-sm text-amber-600">-{activity.fuelUsed}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {detail.activities.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <Activity size={32} className="mx-auto mb-2 text-gray-300" />
                <p>No activities recorded</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "service" && (
        <div className="space-y-6">
          {/* Service Requests */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h4 className="font-semibold text-gray-900">Open Service Requests</h4>
              <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                {detail.serviceRequests.filter(r => r.status !== "resolved").length} pending
              </span>
            </div>
            <div className="divide-y divide-gray-100">
              {detail.serviceRequests.filter(r => r.status !== "resolved").map((request) => (
                <div key={request.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-500 font-mono">{request.id}</span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${priorityColors[request.priority]}`}>
                          {request.priority}
                        </span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${requestStatusColors[request.status]}`}>
                          {request.status.replace("_", " ")}
                        </span>
                      </div>
                      <h5 className="font-medium text-gray-900">{request.title}</h5>
                      <p className="text-sm text-gray-500 mt-1">{request.description}</p>
                    </div>
                    <span className="text-xs text-gray-500">{request.createdAt}</span>
                  </div>
                </div>
              ))}
              {detail.serviceRequests.filter(r => r.status !== "resolved").length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <CheckCircle size={32} className="mx-auto mb-2 text-green-300" />
                  <p>No open service requests</p>
                </div>
              )}
            </div>
          </div>

          {/* Service History */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h4 className="font-semibold text-gray-900">Service History</h4>
            </div>
            <div className="divide-y divide-gray-100">
              {detail.serviceHistory.map((service) => (
                <div key={service.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">{service.type}</span>
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
                          Completed
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{service.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{service.date}</p>
                      <p className="text-xs text-gray-500">@ {service.engineHours.toLocaleString()} hrs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm mt-3">
                    <span className="text-gray-500">Technician: <span className="text-gray-900">{service.technician}</span></span>
                    <span className="text-gray-500">Cost: <span className="text-gray-900">₹{service.cost.toLocaleString()}</span></span>
                  </div>
                  {service.partsReplaced.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-1">Parts Replaced:</p>
                      <div className="flex flex-wrap gap-1">
                        {service.partsReplaced.map((part, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {part}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {detail.serviceHistory.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <Wrench size={32} className="mx-auto mb-2 text-gray-300" />
                  <p>No service history available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
