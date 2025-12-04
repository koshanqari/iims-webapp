"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Camera, 
  Mic, 
  Video, 
  X, 
  AlertTriangle,
  Clock,
  CheckCircle,
  ChevronRight,
  FileText,
  ArrowLeft,
  User,
  Wrench,
  Package,
  UserCheck,
  Truck,
  Settings,
  Phone,
  Mail,
  MessageSquare,
  Circle
} from "lucide-react";
import { ServiceRequestPrefill } from "@/app/operator/page";

interface WorkflowStep {
  id: string;
  title: string;
  status: "completed" | "current" | "pending";
  timestamp?: string;
  actor?: string;
  note?: string;
}

interface PartToReplace {
  id: string;
  partNumber: string;
  name: string;
  quantity: number;
  status: "ordered" | "in_stock" | "awaiting" | "installed";
  estimatedArrival?: string;
}

interface ServiceRequestType {
  id: string;
  status: "pending" | "in_progress" | "resolved";
  title: string;
  equipment: string;
  equipmentName: string;
  part: string;
  type: "repair" | "replacement" | "inspection";
  date: string;
  description: string;
  priority: "low" | "medium" | "high" | "critical";
  approvalStatus: "pending_supervisor" | "approved" | "rejected" | "completed";
  supervisor?: {
    name: string;
    phone: string;
    email: string;
    approvedAt?: string;
    comments?: string;
  };
  technician?: {
    name: string;
    phone: string;
    assignedAt?: string;
  };
  workflow: WorkflowStep[];
  partsToReplace: PartToReplace[];
  estimatedCompletion?: string;
}

// Equipment options
const equipmentOptions = [
  { id: "1", serial: "EX-001", name: "CAT 320D Excavator" },
  { id: "2", serial: "EX-015", name: "Komatsu PC200 Excavator" },
  { id: "3", serial: "EX-003", name: "Volvo EC210 Excavator" },
];

// Parts options
const partOptions = [
  { id: "engine", name: "Engine" },
  { id: "hydraulic", name: "Hydraulic System" },
  { id: "electrical", name: "Electrical System" },
  { id: "transmission", name: "Transmission" },
  { id: "cooling", name: "Cooling System" },
  { id: "tracks", name: "Tracks/Tires" },
  { id: "bucket", name: "Bucket/Attachment" },
  { id: "boom", name: "Boom/Arm" },
  { id: "cabin", name: "Cabin/Controls" },
  { id: "other", name: "Other" },
];

const STORAGE_KEY = "uelms_service_requests_v2"; // Updated version to reset old data

const defaultRequests: ServiceRequestType[] = [
  {
    id: "1",
    status: "in_progress",
    title: "Hydraulic Leak",
    equipment: "EX-001",
    equipmentName: "CAT 320D Excavator",
    part: "Hydraulic System",
    type: "repair",
    date: "Dec 2, 2024",
    description: "Oil leak observed from main hydraulic cylinder. Hydraulic fluid pooling under machine after 2 hours of operation.",
    priority: "high",
    approvalStatus: "approved",
    supervisor: {
      name: "Vikram Singh",
      phone: "+91 98765 12345",
      email: "vikram.singh@company.com",
      approvedAt: "Dec 2, 2024 - 10:30 AM",
      comments: "Approved. High priority - safety concern. Assign immediately."
    },
    technician: {
      name: "Ramesh Patel",
      phone: "+91 98765 67890",
      assignedAt: "Dec 2, 2024 - 11:00 AM"
    },
    workflow: [
      { id: "1", title: "Request Submitted", status: "completed", timestamp: "Dec 2, 2024 - 9:15 AM", actor: "Rajesh Kumar" },
      { id: "2", title: "Supervisor Review", status: "completed", timestamp: "Dec 2, 2024 - 10:30 AM", actor: "Vikram Singh", note: "Approved as high priority" },
      { id: "3", title: "Parts Ordered", status: "completed", timestamp: "Dec 2, 2024 - 11:15 AM", actor: "System" },
      { id: "4", title: "Technician Assigned", status: "completed", timestamp: "Dec 2, 2024 - 11:00 AM", actor: "Vikram Singh" },
      { id: "5", title: "Repair In Progress", status: "current", timestamp: "Dec 3, 2024 - 8:00 AM", actor: "Ramesh Patel" },
      { id: "6", title: "Quality Check", status: "pending" },
      { id: "7", title: "Completed", status: "pending" },
    ],
    partsToReplace: [
      { id: "1", partNumber: "CAT-HYD-SEAL-320D", name: "Hydraulic Cylinder Seal Kit", quantity: 1, status: "in_stock" },
      { id: "2", partNumber: "CAT-HYD-OIL-10L", name: "Hydraulic Oil (10L)", quantity: 2, status: "in_stock" },
      { id: "3", partNumber: "CAT-HYD-HOSE-001", name: "High Pressure Hydraulic Hose", quantity: 1, status: "ordered", estimatedArrival: "Dec 4, 2024" },
    ],
    estimatedCompletion: "Dec 5, 2024"
  },
  {
    id: "2",
    status: "pending",
    title: "Track Pad Replacement",
    equipment: "EX-003",
    equipmentName: "Volvo EC210 Excavator",
    part: "Tracks/Tires",
    type: "replacement",
    date: "Dec 1, 2024",
    description: "Left track pads worn beyond service limit. Measured at 15mm, minimum is 20mm.",
    priority: "medium",
    approvalStatus: "pending_supervisor",
    supervisor: {
      name: "Vikram Singh",
      phone: "+91 98765 12345",
      email: "vikram.singh@company.com",
    },
    workflow: [
      { id: "1", title: "Request Submitted", status: "completed", timestamp: "Dec 1, 2024 - 2:30 PM", actor: "Rajesh Kumar" },
      { id: "2", title: "Supervisor Review", status: "current", note: "Awaiting supervisor approval" },
      { id: "3", title: "Parts Ordered", status: "pending" },
      { id: "4", title: "Technician Assigned", status: "pending" },
      { id: "5", title: "Replacement", status: "pending" },
      { id: "6", title: "Quality Check", status: "pending" },
      { id: "7", title: "Completed", status: "pending" },
    ],
    partsToReplace: [
      { id: "1", partNumber: "VOL-TRK-PAD-210", name: "Track Pad (Set of 49)", quantity: 1, status: "awaiting" },
      { id: "2", partNumber: "VOL-TRK-BOLT-SET", name: "Track Bolt Kit", quantity: 1, status: "awaiting" },
    ],
  },
  {
    id: "3",
    status: "resolved",
    title: "AC Not Working",
    equipment: "EX-015",
    equipmentName: "Komatsu PC200 Excavator",
    part: "Cabin/Controls",
    type: "repair",
    date: "Nov 28, 2024",
    description: "Cabin AC compressor not functioning. No cold air coming from vents.",
    priority: "low",
    approvalStatus: "completed",
    supervisor: {
      name: "Vikram Singh",
      phone: "+91 98765 12345",
      email: "vikram.singh@company.com",
      approvedAt: "Nov 28, 2024 - 11:00 AM",
      comments: "Approved for repair."
    },
    technician: {
      name: "Suresh Kumar",
      phone: "+91 98765 11111",
      assignedAt: "Nov 28, 2024 - 11:30 AM"
    },
    workflow: [
      { id: "1", title: "Request Submitted", status: "completed", timestamp: "Nov 28, 2024 - 10:00 AM", actor: "Rajesh Kumar" },
      { id: "2", title: "Supervisor Review", status: "completed", timestamp: "Nov 28, 2024 - 11:00 AM", actor: "Vikram Singh" },
      { id: "3", title: "Parts Ordered", status: "completed", timestamp: "Nov 28, 2024 - 11:15 AM", actor: "System" },
      { id: "4", title: "Technician Assigned", status: "completed", timestamp: "Nov 28, 2024 - 11:30 AM", actor: "Vikram Singh" },
      { id: "5", title: "Repair In Progress", status: "completed", timestamp: "Nov 29, 2024 - 9:00 AM", actor: "Suresh Kumar" },
      { id: "6", title: "Quality Check", status: "completed", timestamp: "Nov 29, 2024 - 3:00 PM", actor: "Vikram Singh", note: "Tested and verified" },
      { id: "7", title: "Completed", status: "completed", timestamp: "Nov 29, 2024 - 3:30 PM" },
    ],
    partsToReplace: [
      { id: "1", partNumber: "KOM-AC-COMP-200", name: "AC Compressor", quantity: 1, status: "installed" },
      { id: "2", partNumber: "KOM-AC-REF-R134", name: "Refrigerant R134a (500g)", quantity: 2, status: "installed" },
    ],
    estimatedCompletion: "Nov 29, 2024"
  },
];

const statusConfig = {
  pending: { label: "Pending", color: "text-amber-600", bg: "bg-amber-50", icon: Clock },
  in_progress: { label: "In Progress", color: "text-blue-600", bg: "bg-blue-50", icon: AlertTriangle },
  resolved: { label: "Resolved", color: "text-green-600", bg: "bg-green-50", icon: CheckCircle },
};

interface ServiceRequestProps {
  prefill?: ServiceRequestPrefill | null;
  onClearPrefill?: () => void;
}

const priorityConfig = {
  low: { label: "Low", color: "text-gray-600", bg: "bg-gray-100" },
  medium: { label: "Medium", color: "text-amber-600", bg: "bg-amber-100" },
  high: { label: "High", color: "text-orange-600", bg: "bg-orange-100" },
  critical: { label: "Critical", color: "text-red-600", bg: "bg-red-100" },
};

const approvalConfig = {
  pending_supervisor: { label: "Pending Supervisor Approval", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
  approved: { label: "Approved", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
  rejected: { label: "Rejected", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
  completed: { label: "Completed", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
};

const partStatusConfig = {
  ordered: { label: "Ordered", color: "text-blue-600", bg: "bg-blue-100" },
  in_stock: { label: "In Stock", color: "text-green-600", bg: "bg-green-100" },
  awaiting: { label: "Awaiting", color: "text-amber-600", bg: "bg-amber-100" },
  installed: { label: "Installed", color: "text-emerald-600", bg: "bg-emerald-100" },
};

export default function ServiceRequest({ prefill, onClearPrefill }: ServiceRequestProps) {
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [requestsData, setRequestsData] = useState<ServiceRequestType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequestType | null>(null);
  
  const [newRequest, setNewRequest] = useState({
    title: "",
    equipment: "EX-001",
    part: "",
    type: "repair" as "repair" | "replacement" | "inspection",
    description: "",
  });

  // Load from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          setRequestsData(JSON.parse(saved));
        } catch {
          setRequestsData(defaultRequests);
        }
      } else {
        setRequestsData(defaultRequests);
      }
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(requestsData));
    }
  }, [requestsData, isLoaded]);

  // Handle prefill from Activity tab or Equipment tab
  useEffect(() => {
    if (prefill) {
      setNewRequest(prev => ({
        ...prev,
        equipment: prefill.serialNumber,
        part: prefill.part || "",
      }));
      setShowNewRequest(true);
    }
  }, [prefill]);

  const handleCloseForm = () => {
    setShowNewRequest(false);
    setNewRequest({
      title: "",
      equipment: "EX-001",
      part: "",
      type: "repair",
      description: "",
    });
    if (onClearPrefill) onClearPrefill();
  };

  const handleSubmit = () => {
    const equipmentInfo = equipmentOptions.find(e => e.serial === newRequest.equipment);
    const newServiceRequest: ServiceRequestType = {
      id: Date.now().toString(),
      status: "pending",
      title: newRequest.title,
      equipment: newRequest.equipment,
      equipmentName: equipmentInfo?.name || newRequest.equipment,
      part: newRequest.part,
      type: newRequest.type,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      description: newRequest.description,
      priority: "medium",
      approvalStatus: "pending_supervisor",
      supervisor: {
        name: "Vikram Singh",
        phone: "+91 98765 12345",
        email: "vikram.singh@company.com",
      },
      workflow: [
        { id: "1", title: "Request Submitted", status: "completed", timestamp: new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }), actor: "Rajesh Kumar" },
        { id: "2", title: "Supervisor Review", status: "current", note: "Awaiting supervisor approval" },
        { id: "3", title: "Parts Ordered", status: "pending" },
        { id: "4", title: "Technician Assigned", status: "pending" },
        { id: "5", title: newRequest.type === "inspection" ? "Inspection" : newRequest.type === "replacement" ? "Replacement" : "Repair", status: "pending" },
        { id: "6", title: "Quality Check", status: "pending" },
        { id: "7", title: "Completed", status: "pending" },
      ],
      partsToReplace: [],
    };
    
    setRequestsData(prev => [newServiceRequest, ...prev]);
    handleCloseForm();
  };

  if (!isLoaded) {
    return (
      <div className="p-4 flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  // Service Request Detail View
  if (selectedRequest) {
    const approval = approvalConfig[selectedRequest.approvalStatus];
    const priority = priorityConfig[selectedRequest.priority];
    
    return (
      <div className="p-4 pb-24">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setSelectedRequest(null)} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div className="flex-1">
            <h2 className="font-semibold text-gray-900">{selectedRequest.title}</h2>
            <p className="text-xs text-gray-500">Request #{selectedRequest.id} • {selectedRequest.date}</p>
          </div>
        </div>

        {/* Approval Status Banner */}
        <div className={`${approval.bg} ${approval.border} border rounded-xl p-4 mb-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {selectedRequest.approvalStatus === "pending_supervisor" ? (
                <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
                  <Clock size={20} className="text-amber-700" />
                </div>
              ) : selectedRequest.approvalStatus === "approved" ? (
                <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                  <UserCheck size={20} className="text-green-700" />
                </div>
              ) : selectedRequest.approvalStatus === "completed" ? (
                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                  <CheckCircle size={20} className="text-blue-700" />
                </div>
              ) : (
                <div className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center">
                  <X size={20} className="text-red-700" />
                </div>
              )}
              <div>
                <p className={`font-semibold ${approval.color}`}>{approval.label}</p>
                {selectedRequest.supervisor?.approvedAt && (
                  <p className="text-xs text-gray-600">Approved on {selectedRequest.supervisor.approvedAt}</p>
                )}
              </div>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${priority.bg} ${priority.color}`}>
              {priority.label} Priority
            </span>
          </div>
          {selectedRequest.supervisor?.comments && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Supervisor Notes:</span> {selectedRequest.supervisor.comments}
              </p>
            </div>
          )}
        </div>

        {/* Equipment & Issue Details */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Truck size={16} className="text-accent" />
            Equipment Details
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Serial Number</span>
              <span className="text-sm font-medium text-gray-900">{selectedRequest.equipment}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Equipment</span>
              <span className="text-sm font-medium text-gray-900">{selectedRequest.equipmentName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Part/System</span>
              <span className="text-sm font-medium text-gray-900">{selectedRequest.part}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Request Type</span>
              <span className="text-sm font-medium text-gray-900 capitalize">{selectedRequest.type}</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Description</p>
            <p className="text-sm text-gray-700">{selectedRequest.description}</p>
          </div>
        </div>

        {/* Supervisor Contact */}
        {selectedRequest.supervisor && (
          <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <User size={16} className="text-accent" />
              Supervisor
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <User size={18} className="text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{selectedRequest.supervisor.name}</p>
                  <p className="text-xs text-gray-500">Site Supervisor</p>
                </div>
              </div>
              <div className="flex gap-2">
                <a href={`tel:${selectedRequest.supervisor.phone}`} className="p-2 bg-green-50 rounded-lg hover:bg-green-100">
                  <Phone size={18} className="text-green-600" />
                </a>
                <a href={`mailto:${selectedRequest.supervisor.email}`} className="p-2 bg-blue-50 rounded-lg hover:bg-blue-100">
                  <Mail size={18} className="text-blue-600" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Assigned Technician */}
        {selectedRequest.technician && (
          <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Wrench size={16} className="text-accent" />
              Assigned Technician
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Settings size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{selectedRequest.technician.name}</p>
                  <p className="text-xs text-gray-500">Assigned on {selectedRequest.technician.assignedAt}</p>
                </div>
              </div>
              <a href={`tel:${selectedRequest.technician.phone}`} className="p-2 bg-green-50 rounded-lg hover:bg-green-100">
                <Phone size={18} className="text-green-600" />
              </a>
            </div>
          </div>
        )}

        {/* Parts to Replace */}
        {selectedRequest.partsToReplace.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Package size={16} className="text-accent" />
              Parts to Replace
            </h3>
            <div className="space-y-3">
              {selectedRequest.partsToReplace.map((part) => {
                const partStatus = partStatusConfig[part.status];
                return (
                  <div key={part.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{part.name}</p>
                      <p className="text-xs text-gray-500">{part.partNumber} • Qty: {part.quantity}</p>
                      {part.estimatedArrival && (
                        <p className="text-xs text-blue-600 mt-1">ETA: {part.estimatedArrival}</p>
                      )}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${partStatus.bg} ${partStatus.color}`}>
                      {partStatus.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Workflow Timeline */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock size={16} className="text-accent" />
            Request Timeline
          </h3>
          <div className="relative">
            {selectedRequest.workflow.map((step, index) => (
              <div key={step.id} className="flex gap-3 pb-4 last:pb-0">
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.status === "completed" ? "bg-green-100" :
                    step.status === "current" ? "bg-accent-light border-2 border-accent" :
                    "bg-gray-100"
                  }`}>
                    {step.status === "completed" ? (
                      <CheckCircle size={16} className="text-green-600" />
                    ) : step.status === "current" ? (
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    ) : (
                      <Circle size={16} className="text-gray-300" />
                    )}
                  </div>
                  {index < selectedRequest.workflow.length - 1 && (
                    <div className={`w-0.5 flex-1 mt-1 ${
                      step.status === "completed" ? "bg-green-300" : "bg-gray-200"
                    }`} />
                  )}
                </div>
                
                {/* Step Content */}
                <div className="flex-1 pb-2">
                  <p className={`font-medium text-sm ${
                    step.status === "completed" ? "text-gray-900" :
                    step.status === "current" ? "text-accent" :
                    "text-gray-400"
                  }`}>
                    {step.title}
                  </p>
                  {step.timestamp && (
                    <p className="text-xs text-gray-500">{step.timestamp}</p>
                  )}
                  {step.actor && (
                    <p className="text-xs text-gray-500">By: {step.actor}</p>
                  )}
                  {step.note && (
                    <p className="text-xs text-blue-600 mt-1">{step.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estimated Completion */}
        {selectedRequest.estimatedCompletion && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4 text-center">
            <p className="text-xs text-blue-600 mb-1">Estimated Completion</p>
            <p className="font-semibold text-blue-700">{selectedRequest.estimatedCompletion}</p>
          </div>
        )}

        {/* Contact Support Button */}
        <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
          <MessageSquare size={18} />
          Contact Support
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Service Requests</h2>
          <p className="text-sm text-gray-500">Report issues and request services</p>
        </div>
        <button
          onClick={() => setShowNewRequest(true)}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-medium text-sm hover:bg-red-700 transition-colors"
        >
          <Plus size={18} />
          <span>New</span>
        </button>
      </div>

      {/* New Request Form Modal */}
      {showNewRequest && (
        <>
          <div className="fixed inset-0 bg-black/30 z-50" onClick={handleCloseForm} />
          <div className="fixed inset-x-0 bottom-16 max-w-[430px] mx-auto bg-white z-50 rounded-2xl shadow-xl animate-slideUp" style={{ maxHeight: '75vh' }}>
            {/* Header */}
            <div className="sticky top-0 bg-white p-4 border-b border-gray-100 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">New Service Request</h3>
                <button
                  onClick={handleCloseForm}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Issue Title
                </label>
                <input
                  type="text"
                  value={newRequest.title}
                  onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                  placeholder="Brief description of the issue"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Equipment
                  </label>
                  <select
                    value={newRequest.equipment}
                    onChange={(e) => setNewRequest({ ...newRequest, equipment: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-accent"
                  >
                    {equipmentOptions.map((eq) => (
                      <option key={eq.id} value={eq.serial}>
                        {eq.serial}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Part
                  </label>
                  <select
                    value={newRequest.part}
                    onChange={(e) => setNewRequest({ ...newRequest, part: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-accent"
                  >
                    <option value="">Select...</option>
                    {partOptions.map((part) => (
                      <option key={part.id} value={part.name}>
                        {part.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Request Type
                </label>
                <div className="flex gap-2">
                  {["repair", "replacement", "inspection"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setNewRequest({ ...newRequest, type: type as typeof newRequest.type })}
                      className={`flex-1 py-2 px-2 rounded-lg text-xs font-medium border transition-colors ${
                        newRequest.type === type
                          ? "bg-accent text-white border-accent"
                          : "bg-white border-gray-200 text-gray-700 hover:border-accent"
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Description
                </label>
                <textarea
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                  placeholder="Describe the problem..."
                  rows={2}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-accent resize-none"
                />
              </div>

              {/* Attachments */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1 p-2 border border-dashed border-gray-300 rounded-lg hover:border-accent hover:bg-accent-light transition-colors">
                  <Camera size={16} className="text-gray-500" />
                  <span className="text-xs text-gray-500">Photo</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 p-2 border border-dashed border-gray-300 rounded-lg hover:border-accent hover:bg-accent-light transition-colors">
                  <Video size={16} className="text-gray-500" />
                  <span className="text-xs text-gray-500">Video</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 p-2 border border-dashed border-gray-300 rounded-lg hover:border-accent hover:bg-accent-light transition-colors">
                  <Mic size={16} className="text-gray-500" />
                  <span className="text-xs text-gray-500">Audio</span>
                </button>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-accent text-white rounded-xl font-semibold text-sm hover:bg-red-700 transition-colors"
              >
                Submit Request
              </button>
            </div>
          </div>
        </>
      )}

      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-amber-600">
            {requestsData.filter((r) => r.status === "pending").length}
          </p>
          <p className="text-xs text-amber-700">Pending</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-blue-600">
            {requestsData.filter((r) => r.status === "in_progress").length}
          </p>
          <p className="text-xs text-blue-700">In Progress</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-green-600">
            {requestsData.filter((r) => r.status === "resolved").length}
          </p>
          <p className="text-xs text-green-700">Resolved</p>
        </div>
      </div>

      {/* Requests List */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Requests</h3>
        {requestsData.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
            <FileText size={32} className="mx-auto text-gray-300 mb-2" />
            <p className="text-sm text-gray-500">No service requests yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {requestsData.map((request, index) => {
              const status = statusConfig[request.status];
              const StatusIcon = status.icon;
              const approval = approvalConfig[request.approvalStatus];
              
              return (
                <button
                  key={request.id}
                  onClick={() => setSelectedRequest(request)}
                  className="w-full bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm hover:border-accent transition-all cursor-pointer animate-fadeIn text-left"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{request.title}</h4>
                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${status.color} ${status.bg}`}>
                          <StatusIcon size={10} />
                          {status.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{request.equipment} • {request.equipmentName}</p>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 mb-2 line-clamp-2">{request.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      {request.part && (
                        <>
                          <span>{request.part}</span>
                          <span>•</span>
                        </>
                      )}
                      <span className="capitalize">{request.type}</span>
                      <span>•</span>
                      <span>{request.date}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${approval.bg} ${approval.color}`}>
                      {request.approvalStatus === "pending_supervisor" ? "Awaiting Approval" : 
                       request.approvalStatus === "approved" ? "Approved" :
                       request.approvalStatus === "completed" ? "Completed" : "Rejected"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
