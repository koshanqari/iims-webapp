"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Package,
  Truck,
  MapPin,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowLeft,
  ChevronRight,
  Filter,
  Download,
  BarChart3,
  Box,
  Wrench,
  Clock,
  TrendingDown,
  TrendingUp,
  RefreshCw,
  Settings,
  History,
  ShoppingCart,
  Building,
  Calendar,
  Pencil,
  Trash2,
  Upload,
} from "lucide-react";

// Types
interface Part {
  id: string;
  name: string;
  partNumber: string;
  category: string;
  subcategory: string;
  oem: string;
  description: string;
  unit: string;
  unitPrice: number;
  totalStock: number;
  minStock: number;
  maxStock: number;
  reorderPoint: number;
  locations: {
    locationId: string;
    locationName: string;
    quantity: number;
  }[];
  status: "in_stock" | "low_stock" | "out_of_stock" | "on_order";
  lastRestocked: string;
  leadTime: number; // days
  compatibleEquipment: string[];
}

interface EquipmentInventory {
  id: string;
  serialNumber: string;
  name: string;
  category: string;
  oem: string;
  model: string;
  purchaseDate: string;
  purchasePrice: number;
  currentValue: number;
  location: string;
  assignedTo: string;
  status: "operational" | "under_maintenance" | "needs_repair" | "decommissioned";
  condition: "excellent" | "good" | "fair" | "poor";
  lastService: string;
  nextService: string;
  hoursUsed: number;
}

interface InventoryTransaction {
  id: string;
  date: string;
  type: "received" | "issued" | "returned" | "adjusted" | "transferred";
  partId: string;
  partName: string;
  quantity: number;
  from?: string;
  to?: string;
  reference: string;
  user: string;
}

// Sample Parts Data
const partsData: Part[] = [
  { id: "PT-001", name: "Hydraulic Filter", partNumber: "HF-3020-CAT", category: "Filters", subcategory: "Hydraulic", oem: "Caterpillar", description: "High-pressure hydraulic filter for CAT excavators", unit: "piece", unitPrice: 2500, totalStock: 45, minStock: 10, maxStock: 100, reorderPoint: 15, locations: [{ locationId: "WH-001", locationName: "Central Warehouse", quantity: 30 }, { locationId: "S-001", locationName: "Mumbai Port Site", quantity: 10 }, { locationId: "S-002", locationName: "Pune Ring Road Site", quantity: 5 }], status: "in_stock", lastRestocked: "2024-11-15", leadTime: 7, compatibleEquipment: ["CAT 320D", "CAT 330F", "CAT 336F"] },
  { id: "PT-002", name: "Engine Oil Filter", partNumber: "EOF-5540-CAT", category: "Filters", subcategory: "Engine", oem: "Caterpillar", description: "Engine oil filter for CAT equipment", unit: "piece", unitPrice: 1800, totalStock: 8, minStock: 15, maxStock: 80, reorderPoint: 20, locations: [{ locationId: "WH-001", locationName: "Central Warehouse", quantity: 5 }, { locationId: "S-001", locationName: "Mumbai Port Site", quantity: 3 }], status: "low_stock", lastRestocked: "2024-10-20", leadTime: 5, compatibleEquipment: ["CAT 320D", "CAT 950H", "CAT D8T"] },
  { id: "PT-003", name: "Track Roller", partNumber: "TR-8890-KOM", category: "Undercarriage", subcategory: "Rollers", oem: "Komatsu", description: "Bottom track roller for Komatsu excavators", unit: "piece", unitPrice: 15000, totalStock: 12, minStock: 5, maxStock: 30, reorderPoint: 8, locations: [{ locationId: "WH-001", locationName: "Central Warehouse", quantity: 8 }, { locationId: "S-003", locationName: "Delhi Metro Site", quantity: 4 }], status: "in_stock", lastRestocked: "2024-11-01", leadTime: 14, compatibleEquipment: ["Komatsu PC200", "Komatsu PC300"] },
  { id: "PT-004", name: "Bucket Teeth", partNumber: "BT-1200-GEN", category: "Attachments", subcategory: "Bucket Parts", oem: "Generic", description: "Heavy-duty bucket teeth for excavators", unit: "set", unitPrice: 8500, totalStock: 25, minStock: 10, maxStock: 50, reorderPoint: 12, locations: [{ locationId: "WH-001", locationName: "Central Warehouse", quantity: 15 }, { locationId: "S-001", locationName: "Mumbai Port Site", quantity: 5 }, { locationId: "S-002", locationName: "Pune Ring Road Site", quantity: 5 }], status: "in_stock", lastRestocked: "2024-11-10", leadTime: 10, compatibleEquipment: ["CAT 320D", "Komatsu PC200", "Hitachi ZX200"] },
  { id: "PT-005", name: "Hydraulic Pump", partNumber: "HP-7700-CAT", category: "Hydraulics", subcategory: "Pumps", oem: "Caterpillar", description: "Main hydraulic pump assembly", unit: "piece", unitPrice: 125000, totalStock: 3, minStock: 2, maxStock: 8, reorderPoint: 3, locations: [{ locationId: "WH-001", locationName: "Central Warehouse", quantity: 3 }], status: "in_stock", lastRestocked: "2024-09-15", leadTime: 21, compatibleEquipment: ["CAT 320D", "CAT 330F"] },
  { id: "PT-006", name: "Air Filter", partNumber: "AF-2200-UNI", category: "Filters", subcategory: "Air", oem: "Universal", description: "Primary air filter element", unit: "piece", unitPrice: 1200, totalStock: 0, minStock: 20, maxStock: 100, reorderPoint: 25, locations: [], status: "out_of_stock", lastRestocked: "2024-10-01", leadTime: 3, compatibleEquipment: ["CAT 320D", "Komatsu PC200", "Volvo EC210"] },
  { id: "PT-007", name: "Starter Motor", partNumber: "SM-4400-CAT", category: "Electrical", subcategory: "Starting System", oem: "Caterpillar", description: "24V starter motor for heavy equipment", unit: "piece", unitPrice: 35000, totalStock: 5, minStock: 3, maxStock: 15, reorderPoint: 4, locations: [{ locationId: "WH-001", locationName: "Central Warehouse", quantity: 4 }, { locationId: "S-001", locationName: "Mumbai Port Site", quantity: 1 }], status: "in_stock", lastRestocked: "2024-10-25", leadTime: 14, compatibleEquipment: ["CAT 320D", "CAT 336F", "CAT 950H"] },
  { id: "PT-008", name: "Fuel Injector", partNumber: "FI-6600-KOM", category: "Engine", subcategory: "Fuel System", oem: "Komatsu", description: "Common rail fuel injector", unit: "piece", unitPrice: 28000, totalStock: 6, minStock: 4, maxStock: 20, reorderPoint: 5, locations: [{ locationId: "WH-001", locationName: "Central Warehouse", quantity: 6 }], status: "in_stock", lastRestocked: "2024-11-05", leadTime: 18, compatibleEquipment: ["Komatsu PC200", "Komatsu PC300", "Komatsu WA380"] },
  { id: "PT-009", name: "Alternator", partNumber: "ALT-2800-UNI", category: "Electrical", subcategory: "Charging System", oem: "Universal", description: "Heavy-duty alternator 24V 90A", unit: "piece", unitPrice: 22000, totalStock: 4, minStock: 3, maxStock: 12, reorderPoint: 4, locations: [{ locationId: "WH-001", locationName: "Central Warehouse", quantity: 4 }], status: "in_stock", lastRestocked: "2024-10-15", leadTime: 10, compatibleEquipment: ["CAT 320D", "Komatsu PC200", "Hitachi ZX200"] },
  { id: "PT-010", name: "Idler Wheel", partNumber: "IW-5500-CAT", category: "Undercarriage", subcategory: "Idlers", oem: "Caterpillar", description: "Front idler wheel assembly", unit: "piece", unitPrice: 45000, totalStock: 2, minStock: 2, maxStock: 10, reorderPoint: 3, locations: [{ locationId: "WH-001", locationName: "Central Warehouse", quantity: 2 }], status: "low_stock", lastRestocked: "2024-09-20", leadTime: 21, compatibleEquipment: ["CAT 320D", "CAT 330F", "CAT 336F"] },
  { id: "PT-011", name: "Engine Oil 15W40", partNumber: "OIL-1540-DEL", category: "Lubricants", subcategory: "Engine Oil", oem: "Shell", description: "Heavy-duty diesel engine oil", unit: "liter", unitPrice: 450, totalStock: 500, minStock: 200, maxStock: 1000, reorderPoint: 250, locations: [{ locationId: "WH-001", locationName: "Central Warehouse", quantity: 350 }, { locationId: "S-001", locationName: "Mumbai Port Site", quantity: 100 }, { locationId: "S-002", locationName: "Pune Ring Road Site", quantity: 50 }], status: "in_stock", lastRestocked: "2024-11-20", leadTime: 2, compatibleEquipment: ["All Equipment"] },
  { id: "PT-012", name: "Hydraulic Oil ISO 46", partNumber: "HO-ISO46-MOB", category: "Lubricants", subcategory: "Hydraulic Oil", oem: "Mobil", description: "Premium hydraulic oil ISO VG 46", unit: "liter", unitPrice: 380, totalStock: 180, minStock: 150, maxStock: 800, reorderPoint: 200, locations: [{ locationId: "WH-001", locationName: "Central Warehouse", quantity: 120 }, { locationId: "S-001", locationName: "Mumbai Port Site", quantity: 40 }, { locationId: "S-003", locationName: "Delhi Metro Site", quantity: 20 }], status: "low_stock", lastRestocked: "2024-11-10", leadTime: 3, compatibleEquipment: ["All Equipment"] },
];

// Sample Equipment Inventory Data
const equipmentInventory: EquipmentInventory[] = [
  { id: "EQ-001", serialNumber: "EX-001", name: "CAT 320D Excavator", category: "Excavator", oem: "Caterpillar", model: "320D", purchaseDate: "2021-03-15", purchasePrice: 8500000, currentValue: 6800000, location: "Mumbai Port Site", assignedTo: "Rajesh Kumar", status: "operational", condition: "good", lastService: "2024-11-01", nextService: "2024-12-15", hoursUsed: 4280 },
  { id: "EQ-002", serialNumber: "EX-002", name: "CAT 330F Excavator", category: "Excavator", oem: "Caterpillar", model: "330F", purchaseDate: "2022-06-20", purchasePrice: 12000000, currentValue: 10500000, location: "Mumbai Port Site", assignedTo: "Amit Singh", status: "operational", condition: "excellent", lastService: "2024-11-15", nextService: "2025-01-15", hoursUsed: 2150 },
  { id: "EQ-003", serialNumber: "EX-015", name: "Komatsu PC200", category: "Excavator", oem: "Komatsu", model: "PC200-8", purchaseDate: "2020-09-10", purchasePrice: 7200000, currentValue: 5200000, location: "Pune Ring Road Site", assignedTo: "Vikram Patel", status: "under_maintenance", condition: "fair", lastService: "2024-10-20", nextService: "2024-12-01", hoursUsed: 5420 },
  { id: "EQ-004", serialNumber: "LD-001", name: "CAT 950H Loader", category: "Loader", oem: "Caterpillar", model: "950H", purchaseDate: "2021-01-25", purchasePrice: 9500000, currentValue: 7600000, location: "Central Warehouse", assignedTo: "Unassigned", status: "operational", condition: "good", lastService: "2024-11-10", nextService: "2025-01-10", hoursUsed: 3850 },
  { id: "EQ-005", serialNumber: "DT-001", name: "Volvo FMX Dump Truck", category: "Dump Truck", oem: "Volvo", model: "FMX 460", purchaseDate: "2022-02-14", purchasePrice: 6800000, currentValue: 5800000, location: "Mumbai Port Site", assignedTo: "Deepak Yadav", status: "operational", condition: "good", lastService: "2024-10-25", nextService: "2024-12-25", hoursUsed: 2620 },
  { id: "EQ-006", serialNumber: "CR-001", name: "Liebherr LTM 1100 Crane", category: "Crane", oem: "Liebherr", model: "LTM 1100-4.2", purchaseDate: "2023-04-10", purchasePrice: 25000000, currentValue: 23500000, location: "Delhi Metro Site", assignedTo: "Pankaj Sharma", status: "operational", condition: "excellent", lastService: "2024-11-05", nextService: "2025-02-05", hoursUsed: 890 },
  { id: "EQ-007", serialNumber: "GR-001", name: "CAT 120M Grader", category: "Grader", oem: "Caterpillar", model: "120M2", purchaseDate: "2021-08-30", purchasePrice: 11000000, currentValue: 8800000, location: "Noida Expressway Site", assignedTo: "Neha Singh", status: "needs_repair", condition: "fair", lastService: "2024-09-15", nextService: "2024-11-15", hoursUsed: 3200 },
  { id: "EQ-008", serialNumber: "DZ-001", name: "CAT D8T Dozer", category: "Dozer", oem: "Caterpillar", model: "D8T", purchaseDate: "2020-05-20", purchasePrice: 18000000, currentValue: 13500000, location: "Mundra Port Site", assignedTo: "Naveen Reddy", status: "operational", condition: "good", lastService: "2024-11-08", nextService: "2025-01-08", hoursUsed: 4560 },
];

// Recent Transactions
const recentTransactions: InventoryTransaction[] = [
  { id: "TXN-001", date: "2024-12-03", type: "issued", partId: "PT-001", partName: "Hydraulic Filter", quantity: 2, to: "Mumbai Port Site", reference: "SR-1234", user: "Admin" },
  { id: "TXN-002", date: "2024-12-02", type: "received", partId: "PT-011", partName: "Engine Oil 15W40", quantity: 200, from: "Shell Distributor", reference: "PO-5678", user: "Admin" },
  { id: "TXN-003", date: "2024-12-01", type: "transferred", partId: "PT-004", partName: "Bucket Teeth", quantity: 3, from: "Central Warehouse", to: "Pune Ring Road Site", reference: "TF-9012", user: "Admin" },
  { id: "TXN-004", date: "2024-11-30", type: "returned", partId: "PT-007", partName: "Starter Motor", quantity: 1, from: "Mumbai Port Site", to: "Central Warehouse", reference: "RET-3456", user: "Admin" },
  { id: "TXN-005", date: "2024-11-29", type: "adjusted", partId: "PT-003", partName: "Track Roller", quantity: -1, reference: "ADJ-7890", user: "Admin" },
];

const statusColors: Record<string, string> = {
  in_stock: "bg-green-100 text-green-700",
  low_stock: "bg-amber-100 text-amber-700",
  out_of_stock: "bg-red-100 text-red-700",
  on_order: "bg-blue-100 text-blue-700",
  operational: "bg-green-100 text-green-700",
  under_maintenance: "bg-amber-100 text-amber-700",
  needs_repair: "bg-red-100 text-red-700",
  decommissioned: "bg-gray-100 text-gray-600",
  excellent: "bg-green-100 text-green-700",
  good: "bg-blue-100 text-blue-700",
  fair: "bg-amber-100 text-amber-700",
  poor: "bg-red-100 text-red-700",
};

const txnTypeColors: Record<string, string> = {
  received: "bg-green-100 text-green-700",
  issued: "bg-blue-100 text-blue-700",
  returned: "bg-purple-100 text-purple-700",
  adjusted: "bg-amber-100 text-amber-700",
  transferred: "bg-cyan-100 text-cyan-700",
};

type ViewLevel = "overview" | "parts" | "equipment" | "part_detail" | "equipment_detail";

export default function InventoryTab() {
  const [viewLevel, setViewLevel] = useState<ViewLevel>("overview");
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentInventory | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Calculate stats
  const totalPartsValue = partsData.reduce((sum, p) => sum + (p.totalStock * p.unitPrice), 0);
  const lowStockParts = partsData.filter(p => p.status === "low_stock").length;
  const outOfStockParts = partsData.filter(p => p.status === "out_of_stock").length;
  const totalEquipmentValue = equipmentInventory.reduce((sum, e) => sum + e.currentValue, 0);
  const operationalEquipment = equipmentInventory.filter(e => e.status === "operational").length;
  const needsAttention = equipmentInventory.filter(e => e.status === "needs_repair" || e.status === "under_maintenance").length;

  const categories = ["all", ...Array.from(new Set(partsData.map(p => p.category)))];
  const equipmentCategories = ["all", ...Array.from(new Set(equipmentInventory.map(e => e.category)))];

  // Overview View
  if (viewLevel === "overview") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
            <p className="text-gray-500">Manage parts, equipment, and stock levels</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              <Download size={18} />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
              <Plus size={18} />
              Add Item
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent-light rounded-lg flex items-center justify-center"><Package size={20} className="text-accent" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{partsData.length}</p><p className="text-sm text-gray-500">Part Types</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center"><AlertTriangle size={20} className="text-amber-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{lowStockParts + outOfStockParts}</p><p className="text-sm text-gray-500">Need Restock</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><Truck size={20} className="text-blue-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{equipmentInventory.length}</p><p className="text-sm text-gray-500">Equipment</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"><CheckCircle size={20} className="text-green-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{operationalEquipment}</p><p className="text-sm text-gray-500">Operational</p></div>
            </div>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Parts Inventory Card */}
          <div onClick={() => setViewLevel("parts")} className="bg-white rounded-xl border border-gray-200 p-6 hover:border-accent hover:shadow-lg transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center"><Package size={24} className="text-accent" /></div>
                <div>
                  <h3 className="font-semibold text-gray-900">Parts Inventory</h3>
                  <p className="text-sm text-gray-500">{partsData.length} items • ₹{(totalPartsValue / 100000).toFixed(1)}L value</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-green-50 rounded-lg p-3 text-center"><p className="text-lg font-bold text-green-700">{partsData.filter(p => p.status === "in_stock").length}</p><p className="text-xs text-green-600">In Stock</p></div>
              <div className="bg-amber-50 rounded-lg p-3 text-center"><p className="text-lg font-bold text-amber-700">{lowStockParts}</p><p className="text-xs text-amber-600">Low Stock</p></div>
              <div className="bg-red-50 rounded-lg p-3 text-center"><p className="text-lg font-bold text-red-700">{outOfStockParts}</p><p className="text-xs text-red-600">Out of Stock</p></div>
            </div>
            <p className="text-sm text-gray-500">Manage spare parts, consumables, and materials</p>
          </div>

          {/* Equipment Inventory Card */}
          <div onClick={() => setViewLevel("equipment")} className="bg-white rounded-xl border border-gray-200 p-6 hover:border-accent hover:shadow-lg transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"><Truck size={24} className="text-blue-600" /></div>
                <div>
                  <h3 className="font-semibold text-gray-900">Equipment Inventory</h3>
                  <p className="text-sm text-gray-500">{equipmentInventory.length} units • ₹{(totalEquipmentValue / 10000000).toFixed(1)}Cr value</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-green-50 rounded-lg p-3 text-center"><p className="text-lg font-bold text-green-700">{operationalEquipment}</p><p className="text-xs text-green-600">Operational</p></div>
              <div className="bg-amber-50 rounded-lg p-3 text-center"><p className="text-lg font-bold text-amber-700">{equipmentInventory.filter(e => e.status === "under_maintenance").length}</p><p className="text-xs text-amber-600">Maintenance</p></div>
              <div className="bg-red-50 rounded-lg p-3 text-center"><p className="text-lg font-bold text-red-700">{equipmentInventory.filter(e => e.status === "needs_repair").length}</p><p className="text-xs text-red-600">Needs Repair</p></div>
            </div>
            <p className="text-sm text-gray-500">Track machinery, vehicles, and heavy equipment</p>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><AlertTriangle size={18} className="text-amber-500" />Inventory Alerts</h3>
          <div className="space-y-3">
            {partsData.filter(p => p.status === "out_of_stock" || p.status === "low_stock").slice(0, 5).map((part) => (
              <div key={part.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${part.status === "out_of_stock" ? "bg-red-500" : "bg-amber-500"}`} />
                  <div>
                    <p className="font-medium text-gray-900">{part.name}</p>
                    <p className="text-xs text-gray-500">{part.partNumber} • Current: {part.totalStock} {part.unit}(s) • Min: {part.minStock}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[part.status]}`}>{part.status.replace("_", " ")}</span>
              </div>
            ))}
            {equipmentInventory.filter(e => e.status === "needs_repair").map((eq) => (
              <div key={eq.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div>
                    <p className="font-medium text-gray-900">{eq.name}</p>
                    <p className="text-xs text-gray-500">{eq.serialNumber} • {eq.location} • Needs Repair</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[eq.status]}`}>{eq.status.replace("_", " ")}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><History size={18} className="text-accent" />Recent Transactions</h3>
          <div className="space-y-3">
            {recentTransactions.map((txn) => (
              <div key={txn.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded capitalize ${txnTypeColors[txn.type]}`}>{txn.type}</span>
                  <div>
                    <p className="font-medium text-gray-900">{txn.partName}</p>
                    <p className="text-xs text-gray-500">{txn.date} • Qty: {txn.quantity > 0 ? "+" : ""}{txn.quantity} • {txn.reference}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{txn.from && txn.to ? `${txn.from} → ${txn.to}` : txn.to || txn.from || "-"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Parts Inventory View
  if (viewLevel === "parts") {
    const filteredParts = partsData.filter((part) => {
      const matchesSearch = part.name.toLowerCase().includes(searchQuery.toLowerCase()) || part.partNumber.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "all" || part.category === categoryFilter;
      const matchesStatus = statusFilter === "all" || part.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setViewLevel("overview")} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><ArrowLeft size={20} className="text-gray-600" /></button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Parts Inventory</h2>
            <p className="text-gray-500">{partsData.length} items • ₹{(totalPartsValue / 100000).toFixed(1)}L total value</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-gray-500 mb-1"><Package size={16} /><span className="text-sm">Total Items</span></div><p className="text-2xl font-bold text-gray-900">{partsData.length}</p></div>
          <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-green-500 mb-1"><CheckCircle size={16} /><span className="text-sm">In Stock</span></div><p className="text-2xl font-bold text-gray-900">{partsData.filter(p => p.status === "in_stock").length}</p></div>
          <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-amber-500 mb-1"><AlertTriangle size={16} /><span className="text-sm">Low Stock</span></div><p className="text-2xl font-bold text-gray-900">{lowStockParts}</p></div>
          <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-red-500 mb-1"><XCircle size={16} /><span className="text-sm">Out of Stock</span></div><p className="text-2xl font-bold text-gray-900">{outOfStockParts}</p></div>
          <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-gray-500 mb-1"><BarChart3 size={16} /><span className="text-sm">Total Value</span></div><p className="text-2xl font-bold text-gray-900">₹{(totalPartsValue / 100000).toFixed(1)}L</p></div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search by name or part number..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent" />
          </div>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent">
            {categories.map(c => <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent">
            <option value="all">All Status</option>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>

        {/* Parts Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Part</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Category</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">OEM</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Stock</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Locations</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Unit Price</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredParts.map((part) => (
                  <tr key={part.id} onClick={() => { setSelectedPart(part); setViewLevel("part_detail"); }} className="hover:bg-gray-50 transition-colors cursor-pointer">
                    <td className="py-3 px-4">
                      <div><p className="font-medium text-gray-900">{part.name}</p><p className="text-xs text-gray-500">{part.partNumber}</p></div>
                    </td>
                    <td className="py-3 px-4"><span className="text-sm text-gray-700">{part.category}</span></td>
                    <td className="py-3 px-4"><span className="text-sm text-gray-600">{part.oem}</span></td>
                    <td className="py-3 px-4">
                      <div><p className="text-sm font-medium text-gray-900">{part.totalStock} {part.unit}(s)</p><p className="text-xs text-gray-500">Min: {part.minStock}</p></div>
                    </td>
                    <td className="py-3 px-4"><span className="text-sm text-gray-600">{part.locations.length} locations</span></td>
                    <td className="py-3 px-4"><span className="text-sm font-medium text-gray-900">₹{part.unitPrice.toLocaleString()}</span></td>
                    <td className="py-3 px-4"><span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${statusColors[part.status]}`}>{part.status.replace("_", " ")}</span></td>
                    <td className="py-3 px-4"><ChevronRight size={18} className="text-gray-400" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Equipment Inventory View
  if (viewLevel === "equipment") {
    const filteredEquipment = equipmentInventory.filter((eq) => {
      const matchesSearch = eq.name.toLowerCase().includes(searchQuery.toLowerCase()) || eq.serialNumber.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "all" || eq.category === categoryFilter;
      const matchesStatus = statusFilter === "all" || eq.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setViewLevel("overview")} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><ArrowLeft size={20} className="text-gray-600" /></button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Equipment Inventory</h2>
            <p className="text-gray-500">{equipmentInventory.length} units • ₹{(totalEquipmentValue / 10000000).toFixed(1)}Cr total value</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-gray-500 mb-1"><Truck size={16} /><span className="text-sm">Total Units</span></div><p className="text-2xl font-bold text-gray-900">{equipmentInventory.length}</p></div>
          <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-green-500 mb-1"><CheckCircle size={16} /><span className="text-sm">Operational</span></div><p className="text-2xl font-bold text-gray-900">{operationalEquipment}</p></div>
          <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-amber-500 mb-1"><Wrench size={16} /><span className="text-sm">Maintenance</span></div><p className="text-2xl font-bold text-gray-900">{equipmentInventory.filter(e => e.status === "under_maintenance").length}</p></div>
          <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-red-500 mb-1"><AlertTriangle size={16} /><span className="text-sm">Needs Repair</span></div><p className="text-2xl font-bold text-gray-900">{equipmentInventory.filter(e => e.status === "needs_repair").length}</p></div>
          <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-gray-500 mb-1"><BarChart3 size={16} /><span className="text-sm">Total Value</span></div><p className="text-2xl font-bold text-gray-900">₹{(totalEquipmentValue / 10000000).toFixed(1)}Cr</p></div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search by name or serial number..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent" />
          </div>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent">
            {equipmentCategories.map(c => <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent">
            <option value="all">All Status</option>
            <option value="operational">Operational</option>
            <option value="under_maintenance">Under Maintenance</option>
            <option value="needs_repair">Needs Repair</option>
          </select>
        </div>

        {/* Equipment Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Equipment</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Category</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Location</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Assigned To</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Hours</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Condition</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEquipment.map((eq) => (
                  <tr key={eq.id} onClick={() => { setSelectedEquipment(eq); setViewLevel("equipment_detail"); }} className="hover:bg-gray-50 transition-colors cursor-pointer">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><Truck size={18} className="text-blue-600" /></div>
                        <div><p className="font-medium text-gray-900">{eq.name}</p><p className="text-xs text-gray-500">{eq.serialNumber}</p></div>
                      </div>
                    </td>
                    <td className="py-3 px-4"><span className="text-sm text-gray-700">{eq.category}</span></td>
                    <td className="py-3 px-4"><span className="text-sm text-gray-600">{eq.location}</span></td>
                    <td className="py-3 px-4"><span className="text-sm text-gray-600">{eq.assignedTo}</span></td>
                    <td className="py-3 px-4"><span className="text-sm font-medium text-gray-900">{eq.hoursUsed.toLocaleString()}</span></td>
                    <td className="py-3 px-4"><span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${statusColors[eq.condition]}`}>{eq.condition}</span></td>
                    <td className="py-3 px-4"><span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${statusColors[eq.status]}`}>{eq.status.replace("_", " ")}</span></td>
                    <td className="py-3 px-4"><ChevronRight size={18} className="text-gray-400" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Part Detail View
  if (viewLevel === "part_detail" && selectedPart) {
    const part = selectedPart;
    const stockPercentage = Math.round((part.totalStock / part.maxStock) * 100);

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => { setViewLevel("parts"); setSelectedPart(null); }} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><ArrowLeft size={20} className="text-gray-600" /></button>
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1"><span>Parts</span><ChevronRight size={14} /><span className="text-gray-900 font-medium">{part.name}</span></div>
            <h2 className="text-2xl font-bold text-gray-900">{part.name}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Part Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-accent-light rounded-xl flex items-center justify-center"><Package size={24} className="text-accent" /></div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">{part.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${statusColors[part.status]}`}>{part.status.replace("_", " ")}</span>
                  </div>
                  <p className="text-sm text-gray-500">{part.partNumber} • {part.oem}</p>
                  <p className="text-sm text-gray-600 mt-2">{part.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div><p className="text-gray-500">Category</p><p className="font-medium text-gray-900">{part.category}</p></div>
                <div><p className="text-gray-500">Subcategory</p><p className="font-medium text-gray-900">{part.subcategory}</p></div>
                <div><p className="text-gray-500">Unit</p><p className="font-medium text-gray-900">{part.unit}</p></div>
                <div><p className="text-gray-500">Lead Time</p><p className="font-medium text-gray-900">{part.leadTime} days</p></div>
              </div>
            </div>

            {/* Stock Levels */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><BarChart3 size={18} className="text-accent" />Stock Levels</h4>
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2"><span className="text-gray-500">Current: {part.totalStock} / {part.maxStock} {part.unit}(s)</span><span className="font-medium">{stockPercentage}%</span></div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden"><div className={`h-full rounded-full ${stockPercentage <= 20 ? "bg-red-500" : stockPercentage <= 40 ? "bg-amber-500" : "bg-green-500"}`} style={{ width: `${stockPercentage}%` }} /></div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-lg font-bold text-gray-900">{part.totalStock}</p><p className="text-xs text-gray-500">Current</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-lg font-bold text-gray-900">{part.minStock}</p><p className="text-xs text-gray-500">Minimum</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-lg font-bold text-gray-900">{part.reorderPoint}</p><p className="text-xs text-gray-500">Reorder At</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-lg font-bold text-gray-900">{part.maxStock}</p><p className="text-xs text-gray-500">Maximum</p></div>
              </div>
            </div>

            {/* Location Breakdown */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><MapPin size={18} className="text-accent" />Stock by Location</h4>
              {part.locations.length > 0 ? (
                <div className="space-y-3">
                  {part.locations.map((loc) => (
                    <div key={loc.locationId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><MapPin size={18} className="text-blue-600" /></div>
                        <div><p className="font-medium text-gray-900">{loc.locationName}</p><p className="text-xs text-gray-500">{loc.locationId}</p></div>
                      </div>
                      <span className="text-lg font-bold text-gray-900">{loc.quantity} {part.unit}(s)</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No stock at any location</p>
              )}
            </div>

            {/* Compatible Equipment */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><Truck size={18} className="text-accent" />Compatible Equipment</h4>
              <div className="flex flex-wrap gap-2">
                {part.compatibleEquipment.map((eq, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg">{eq}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h4 className="font-semibold text-gray-900 mb-4">Pricing</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between"><span className="text-sm text-gray-500">Unit Price</span><span className="font-medium text-gray-900">₹{part.unitPrice.toLocaleString()}</span></div>
                <div className="flex items-center justify-between"><span className="text-sm text-gray-500">Total Value</span><span className="font-bold text-gray-900">₹{(part.totalStock * part.unitPrice).toLocaleString()}</span></div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h4 className="font-semibold text-gray-900 mb-4">Details</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between"><span className="text-gray-500">Last Restocked</span><span className="text-gray-900">{part.lastRestocked}</span></div>
                <div className="flex items-center justify-between"><span className="text-gray-500">Lead Time</span><span className="text-gray-900">{part.leadTime} days</span></div>
                <div className="flex items-center justify-between"><span className="text-gray-500">OEM</span><span className="text-gray-900">{part.oem}</span></div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2 px-3 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"><ShoppingCart size={16} />Create Purchase Order</button>
                <button className="w-full flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"><RefreshCw size={16} />Transfer Stock</button>
                <button className="w-full flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"><Settings size={16} />Adjust Stock</button>
                <button className="w-full flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"><History size={16} />View History</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Equipment Detail View
  if (viewLevel === "equipment_detail" && selectedEquipment) {
    const eq = selectedEquipment;
    const depreciationPercentage = Math.round(((eq.purchasePrice - eq.currentValue) / eq.purchasePrice) * 100);

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => { setViewLevel("equipment"); setSelectedEquipment(null); }} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><ArrowLeft size={20} className="text-gray-600" /></button>
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1"><span>Equipment</span><ChevronRight size={14} /><span className="text-gray-900 font-medium">{eq.name}</span></div>
            <h2 className="text-2xl font-bold text-gray-900">{eq.name}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Equipment Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center"><Truck size={24} className="text-blue-600" /></div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">{eq.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${statusColors[eq.status]}`}>{eq.status.replace("_", " ")}</span>
                  </div>
                  <p className="text-sm text-gray-500">{eq.serialNumber} • {eq.oem} {eq.model}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div><p className="text-gray-500">Category</p><p className="font-medium text-gray-900">{eq.category}</p></div>
                <div><p className="text-gray-500">Condition</p><span className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${statusColors[eq.condition]}`}>{eq.condition}</span></div>
                <div><p className="text-gray-500">Hours Used</p><p className="font-medium text-gray-900">{eq.hoursUsed.toLocaleString()} hrs</p></div>
                <div><p className="text-gray-500">Purchase Date</p><p className="font-medium text-gray-900">{eq.purchaseDate}</p></div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-gray-500 mb-1"><Clock size={16} /><span className="text-sm">Hours</span></div><p className="text-2xl font-bold text-gray-900">{eq.hoursUsed.toLocaleString()}</p></div>
              <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-gray-500 mb-1"><BarChart3 size={16} /><span className="text-sm">Purchase</span></div><p className="text-2xl font-bold text-gray-900">₹{(eq.purchasePrice / 100000).toFixed(1)}L</p></div>
              <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-gray-500 mb-1"><TrendingDown size={16} /><span className="text-sm">Current</span></div><p className="text-2xl font-bold text-gray-900">₹{(eq.currentValue / 100000).toFixed(1)}L</p></div>
              <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-amber-500 mb-1"><TrendingUp size={16} /><span className="text-sm">Depreciation</span></div><p className="text-2xl font-bold text-gray-900">{depreciationPercentage}%</p></div>
            </div>

            {/* Location & Assignment */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><MapPin size={18} className="text-accent" />Location & Assignment</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><MapPin size={18} className="text-blue-600" /></div>
                  <div><p className="text-xs text-gray-500">Current Location</p><p className="font-medium text-gray-900">{eq.location}</p></div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-accent-light rounded-lg flex items-center justify-center"><Box size={18} className="text-accent" /></div>
                  <div><p className="text-xs text-gray-500">Assigned To</p><p className="font-medium text-gray-900">{eq.assignedTo}</p></div>
                </div>
              </div>
            </div>

            {/* Service Schedule */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><Wrench size={18} className="text-accent" />Service Schedule</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-center gap-2 text-green-600 mb-1"><CheckCircle size={16} /><span className="text-sm">Last Service</span></div>
                  <p className="text-lg font-bold text-green-700">{eq.lastService}</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-2 text-blue-600 mb-1"><Calendar size={16} /><span className="text-sm">Next Service</span></div>
                  <p className="text-lg font-bold text-blue-700">{eq.nextService}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h4 className="font-semibold text-gray-900 mb-4">Asset Value</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between"><span className="text-sm text-gray-500">Purchase Price</span><span className="font-medium text-gray-900">₹{eq.purchasePrice.toLocaleString()}</span></div>
                <div className="flex items-center justify-between"><span className="text-sm text-gray-500">Current Value</span><span className="font-bold text-gray-900">₹{eq.currentValue.toLocaleString()}</span></div>
                <div className="flex items-center justify-between"><span className="text-sm text-gray-500">Depreciation</span><span className="text-amber-600">-₹{(eq.purchasePrice - eq.currentValue).toLocaleString()}</span></div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2 px-3 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"><Wrench size={16} />Schedule Service</button>
                <button className="w-full flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"><RefreshCw size={16} />Transfer Equipment</button>
                <button className="w-full flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"><History size={16} />View History</button>
                <button className="w-full flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"><Building size={16} />Change Assignment</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

