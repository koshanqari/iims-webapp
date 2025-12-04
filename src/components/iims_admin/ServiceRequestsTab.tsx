"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Clock,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  User,
  Truck,
  Calendar,
  MessageSquare,
  Image,
  Wrench,
  ArrowUpRight,
  X,
  Plus,
  Download,
  Pencil,
  UserCheck,
} from "lucide-react";

interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  equipment: {
    serialNumber: string;
    name: string;
    model: string;
  };
  part: string;
  type: "repair" | "replacement" | "inspection";
  status: "pending" | "in_progress" | "resolved" | "rejected";
  priority: "low" | "medium" | "high" | "critical";
  operator: {
    name: string;
    id: string;
  };
  site: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  attachments: number;
  comments: number;
}

// Sample data - all service requests across operators
const allServiceRequests: ServiceRequest[] = [
  {
    id: "SR-001",
    title: "Hydraulic Leak Detected",
    description: "Oil leak observed from main hydraulic cylinder during operation. Immediate attention required.",
    equipment: { serialNumber: "EX-001", name: "CAT 320D Excavator", model: "320D" },
    part: "Hydraulic System",
    type: "repair",
    status: "in_progress",
    priority: "high",
    operator: { name: "Rajesh Kumar", id: "OP-001" },
    site: "Site A - Block 3",
    createdAt: "Dec 3, 2024 09:30 AM",
    updatedAt: "Dec 3, 2024 11:45 AM",
    assignedTo: "Suresh Patel",
    attachments: 3,
    comments: 5,
  },
  {
    id: "SR-002",
    title: "Track Pad Replacement Needed",
    description: "Left track pads worn beyond service limit. Equipment should not be operated until replaced.",
    equipment: { serialNumber: "EX-003", name: "Volvo EC210 Excavator", model: "EC210" },
    part: "Track / Tire",
    type: "replacement",
    status: "pending",
    priority: "critical",
    operator: { name: "Amit Singh", id: "OP-002" },
    site: "Workshop Bay 2",
    createdAt: "Dec 2, 2024 02:15 PM",
    updatedAt: "Dec 2, 2024 02:15 PM",
    attachments: 2,
    comments: 1,
  },
  {
    id: "SR-003",
    title: "AC Compressor Not Working",
    description: "Cabin AC compressor not functioning. Operator comfort affected in hot weather.",
    equipment: { serialNumber: "EX-015", name: "Komatsu PC200 Excavator", model: "PC200" },
    part: "Cabin / Control",
    type: "repair",
    status: "resolved",
    priority: "medium",
    operator: { name: "Vikram Patel", id: "OP-003" },
    site: "Site A - Block 1",
    createdAt: "Nov 28, 2024 10:00 AM",
    updatedAt: "Dec 1, 2024 04:30 PM",
    assignedTo: "Mohan Das",
    attachments: 1,
    comments: 8,
  },
  {
    id: "SR-004",
    title: "Engine Warning Light",
    description: "Check engine light appeared during startup. No visible issues but requires diagnostic check.",
    equipment: { serialNumber: "EX-001", name: "CAT 320D Excavator", model: "320D" },
    part: "Engine",
    type: "inspection",
    status: "pending",
    priority: "medium",
    operator: { name: "Rajesh Kumar", id: "OP-001" },
    site: "Site A - Block 3",
    createdAt: "Dec 3, 2024 07:00 AM",
    updatedAt: "Dec 3, 2024 07:00 AM",
    attachments: 1,
    comments: 0,
  },
  {
    id: "SR-005",
    title: "Bucket Teeth Replacement",
    description: "Multiple bucket teeth worn out and need replacement for efficient digging.",
    equipment: { serialNumber: "EX-001", name: "CAT 320D Excavator", model: "320D" },
    part: "Bucket/Attachment",
    type: "replacement",
    status: "in_progress",
    priority: "low",
    operator: { name: "Rajesh Kumar", id: "OP-001" },
    site: "Site A - Block 3",
    createdAt: "Nov 30, 2024 11:30 AM",
    updatedAt: "Dec 2, 2024 09:00 AM",
    assignedTo: "Parts Team",
    attachments: 4,
    comments: 3,
  },
  {
    id: "SR-006",
    title: "Windshield Crack",
    description: "Small crack on windshield lower left corner. May spread if not addressed.",
    equipment: { serialNumber: "EX-015", name: "Komatsu PC200 Excavator", model: "PC200" },
    part: "Cabin / Control",
    type: "replacement",
    status: "rejected",
    priority: "low",
    operator: { name: "Vikram Patel", id: "OP-003" },
    site: "Site A - Block 1",
    createdAt: "Nov 25, 2024 03:00 PM",
    updatedAt: "Nov 26, 2024 10:00 AM",
    attachments: 2,
    comments: 2,
  },
];

const statusConfig = {
  pending: { label: "Pending", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
  in_progress: { label: "In Progress", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
  resolved: { label: "Resolved", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
  rejected: { label: "Rejected", color: "text-gray-600", bg: "bg-gray-50", border: "border-gray-200" },
};

const priorityConfig = {
  low: { label: "Low", color: "text-gray-600", bg: "bg-gray-100" },
  medium: { label: "Medium", color: "text-amber-600", bg: "bg-amber-100" },
  high: { label: "High", color: "text-orange-600", bg: "bg-orange-100" },
  critical: { label: "Critical", color: "text-red-600", bg: "bg-red-100" },
};

const typeConfig = {
  repair: { label: "Repair", color: "text-blue-600" },
  replacement: { label: "Replacement", color: "text-purple-600" },
  inspection: { label: "Inspection", color: "text-teal-600" },
};

export default function ServiceRequestsTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);

  const filteredRequests = allServiceRequests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.equipment.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.operator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: allServiceRequests.length,
    pending: allServiceRequests.filter((r) => r.status === "pending").length,
    inProgress: allServiceRequests.filter((r) => r.status === "in_progress").length,
    resolved: allServiceRequests.filter((r) => r.status === "resolved").length,
    critical: allServiceRequests.filter((r) => r.priority === "critical").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Requests</h1>
          <p className="text-gray-500">Manage and track all service requests from operators</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <Download size={16} />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
            <Plus size={18} />
            New Request
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Requests</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm text-amber-600">Pending</p>
          <p className="text-2xl font-bold text-amber-700 mt-1">{stats.pending}</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-600">In Progress</p>
          <p className="text-2xl font-bold text-blue-700 mt-1">{stats.inProgress}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-sm text-green-600">Resolved</p>
          <p className="text-2xl font-bold text-green-700 mt-1">{stats.resolved}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-sm text-red-600">Critical</p>
          <p className="text-2xl font-bold text-red-700 mt-1">{stats.critical}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ID, title, equipment, or operator..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Request</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Equipment</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Operator</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Priority</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Created</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredRequests.map((request) => {
              const status = statusConfig[request.status];
              const priority = priorityConfig[request.priority];
              const type = typeConfig[request.type];
              return (
                <tr
                  key={request.id}
                  onClick={() => setSelectedRequest(request)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-xs text-gray-500 font-mono">{request.id}</p>
                      <p className="font-medium text-gray-900 text-sm">{request.title}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{request.equipment.serialNumber}</p>
                      <p className="text-xs text-gray-500">{request.equipment.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-accent-light rounded-full flex items-center justify-center">
                        <span className="text-accent text-xs font-semibold">{request.operator.name.charAt(0)}</span>
                      </div>
                      <span className="text-sm text-gray-900">{request.operator.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs font-medium ${type.color}`}>{type.label}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${priority.color} ${priority.bg}`}>
                      {priority.label}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color} ${status.bg}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-gray-500">{request.createdAt.split(" ")[0]}</p>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <ChevronRight size={18} className="text-gray-400" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredRequests.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <Wrench size={32} className="mx-auto mb-2 text-gray-300" />
            <p>No service requests found</p>
          </div>
        )}
      </div>

      {/* Request Detail Modal */}
      {selectedRequest && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setSelectedRequest(null)} />
          <div className="fixed right-0 top-0 bottom-0 w-[500px] bg-white z-50 shadow-xl overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <div>
                <p className="text-xs text-gray-500 font-mono">{selectedRequest.id}</p>
                <h2 className="text-lg font-semibold text-gray-900">{selectedRequest.title}</h2>
              </div>
              <button onClick={() => setSelectedRequest(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status & Priority */}
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${statusConfig[selectedRequest.status].color} ${statusConfig[selectedRequest.status].bg}`}>
                  {statusConfig[selectedRequest.status].label}
                </span>
                <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${priorityConfig[selectedRequest.priority].color} ${priorityConfig[selectedRequest.priority].bg}`}>
                  {priorityConfig[selectedRequest.priority].label} Priority
                </span>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-sm text-gray-600">{selectedRequest.description}</p>
              </div>

              {/* Equipment Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Truck size={16} />
                  Equipment
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Serial Number</span>
                    <span className="font-medium text-gray-900">{selectedRequest.equipment.serialNumber}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Name</span>
                    <span className="font-medium text-gray-900">{selectedRequest.equipment.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Part</span>
                    <span className="font-medium text-gray-900">{selectedRequest.part}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Site</span>
                    <span className="font-medium text-gray-900">{selectedRequest.site}</span>
                  </div>
                </div>
              </div>

              {/* Operator Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <User size={16} />
                  Reported By
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent-light rounded-full flex items-center justify-center">
                    <span className="text-accent font-semibold">{selectedRequest.operator.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{selectedRequest.operator.name}</p>
                    <p className="text-xs text-gray-500">{selectedRequest.operator.id}</p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar size={16} />
                  Timeline
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Created</span>
                    <span className="text-gray-900">{selectedRequest.createdAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Last Updated</span>
                    <span className="text-gray-900">{selectedRequest.updatedAt}</span>
                  </div>
                  {selectedRequest.assignedTo && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Assigned To</span>
                      <span className="text-gray-900">{selectedRequest.assignedTo}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Attachments & Comments */}
              <div className="flex gap-4">
                <div className="flex-1 bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                  <Image size={20} className="text-gray-400" />
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{selectedRequest.attachments}</p>
                    <p className="text-xs text-gray-500">Attachments</p>
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                  <MessageSquare size={20} className="text-gray-400" />
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{selectedRequest.comments}</p>
                    <p className="text-xs text-gray-500">Comments</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {selectedRequest.status === "pending" && (
                  <>
                    <button className="flex-1 py-2.5 bg-accent text-white rounded-lg font-medium text-sm hover:bg-red-700 transition-colors">
                      Assign Technician
                    </button>
                    <button className="px-4 py-2.5 border border-gray-200 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors">
                      Reject
                    </button>
                  </>
                )}
                {selectedRequest.status === "in_progress" && (
                  <button className="flex-1 py-2.5 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-700 transition-colors">
                    Mark as Resolved
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

