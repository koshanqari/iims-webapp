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
  FileText
} from "lucide-react";
import { ServiceRequestPrefill } from "@/app/operator/page";

interface ServiceRequestType {
  id: string;
  status: "pending" | "in_progress" | "resolved";
  title: string;
  equipment: string;
  part: string;
  type: "repair" | "replacement" | "inspection";
  date: string;
  description: string;
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

const STORAGE_KEY = "uelms_service_requests";

const defaultRequests: ServiceRequestType[] = [
  {
    id: "1",
    status: "in_progress",
    title: "Hydraulic Leak",
    equipment: "EX-001",
    part: "Hydraulic System",
    type: "repair",
    date: "Dec 2, 2024",
    description: "Oil leak observed from main hydraulic cylinder",
  },
  {
    id: "2",
    status: "pending",
    title: "Track Pad Replacement",
    equipment: "DZ-003",
    part: "Tracks/Tires",
    type: "replacement",
    date: "Dec 1, 2024",
    description: "Left track pads worn beyond service limit",
  },
  {
    id: "3",
    status: "resolved",
    title: "AC Not Working",
    equipment: "LD-002",
    part: "Cabin/Controls",
    type: "repair",
    date: "Nov 28, 2024",
    description: "Cabin AC compressor not functioning",
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

export default function ServiceRequest({ prefill, onClearPrefill }: ServiceRequestProps) {
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [requestsData, setRequestsData] = useState<ServiceRequestType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
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
    const newServiceRequest: ServiceRequestType = {
      id: Date.now().toString(),
      status: "pending",
      title: newRequest.title,
      equipment: newRequest.equipment,
      part: newRequest.part,
      type: newRequest.type,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      description: newRequest.description,
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
              
              return (
                <div
                  key={request.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow cursor-pointer animate-fadeIn"
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
                      <p className="text-sm text-gray-500">{request.equipment}</p>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{request.description}</p>
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
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
