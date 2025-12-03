"use client";

import { useState } from "react";
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

interface ServiceRequestType {
  id: string;
  status: "pending" | "in_progress" | "resolved";
  title: string;
  equipment: string;
  type: "repair" | "replacement" | "inspection";
  date: string;
  description: string;
}

const requestsData: ServiceRequestType[] = [
  {
    id: "1",
    status: "in_progress",
    title: "Hydraulic Leak",
    equipment: "EX-001 - CAT 320D",
    type: "repair",
    date: "Dec 2, 2024",
    description: "Oil leak observed from main hydraulic cylinder",
  },
  {
    id: "2",
    status: "pending",
    title: "Track Pad Replacement",
    equipment: "DZ-003 - CAT D6T",
    type: "replacement",
    date: "Dec 1, 2024",
    description: "Left track pads worn beyond service limit",
  },
  {
    id: "3",
    status: "resolved",
    title: "AC Not Working",
    equipment: "LD-002 - Komatsu WA380",
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

export default function ServiceRequest() {
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: "",
    equipment: "EX-001",
    type: "repair" as "repair" | "replacement" | "inspection",
    description: "",
  });

  const handleSubmit = () => {
    // In a real app, this would submit to an API
    setShowNewRequest(false);
    setNewRequest({ title: "", equipment: "EX-001", type: "repair", description: "" });
  };

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
          <div className="fixed inset-0 bg-black/30 z-50" onClick={() => setShowNewRequest(false)} />
          <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white z-50 rounded-t-2xl animate-slideUp">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">New Service Request</h3>
                <button
                  onClick={() => setShowNewRequest(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Issue Title
                  </label>
                  <input
                    type="text"
                    value={newRequest.title}
                    onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                    placeholder="Brief description of the issue"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Equipment
                  </label>
                  <select
                    value={newRequest.equipment}
                    onChange={(e) => setNewRequest({ ...newRequest, equipment: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-accent"
                  >
                    <option value="EX-001">EX-001 - CAT 320D Excavator</option>
                    <option value="LD-002">LD-002 - Komatsu WA380 Loader</option>
                    <option value="DZ-003">DZ-003 - CAT D6T Dozer</option>
                    <option value="DT-004">DT-004 - Volvo A40G Dump Truck</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Request Type
                  </label>
                  <div className="flex gap-2">
                    {["repair", "replacement", "inspection"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setNewRequest({ ...newRequest, type: type as typeof newRequest.type })}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${
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
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newRequest.description}
                    onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                    placeholder="Detailed description of the problem..."
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-accent resize-none"
                  />
                </div>

                {/* Media Attachments */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Add Attachments
                  </label>
                  <div className="flex gap-3">
                    <button className="flex-1 flex flex-col items-center gap-2 p-4 border border-dashed border-gray-300 rounded-xl hover:border-accent hover:bg-accent-light transition-colors">
                      <Camera size={24} className="text-gray-500" />
                      <span className="text-xs text-gray-500">Photo</span>
                    </button>
                    <button className="flex-1 flex flex-col items-center gap-2 p-4 border border-dashed border-gray-300 rounded-xl hover:border-accent hover:bg-accent-light transition-colors">
                      <Video size={24} className="text-gray-500" />
                      <span className="text-xs text-gray-500">Video</span>
                    </button>
                    <button className="flex-1 flex flex-col items-center gap-2 p-4 border border-dashed border-gray-300 rounded-xl hover:border-accent hover:bg-accent-light transition-colors">
                      <Mic size={24} className="text-gray-500" />
                      <span className="text-xs text-gray-500">Audio</span>
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full py-3 bg-accent text-white rounded-xl font-medium text-sm hover:bg-red-700 transition-colors"
                >
                  Submit Request
                </button>
              </div>
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
                  <FileText size={12} />
                  <span className="capitalize">{request.type}</span>
                  <span>•</span>
                  <span>{request.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

