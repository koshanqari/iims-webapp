"use client";

import { Plus, Search, MoreVertical, MapPin, Truck, Users } from "lucide-react";

const clients = [
  { id: "1", name: "Tata Projects", contact: "Rajesh Shah", email: "rajesh@tataprojects.com", sites: 5, machines: 28, status: "active" },
  { id: "2", name: "L&T Construction", contact: "Amit Kumar", email: "amit@lnt.com", sites: 8, machines: 45, status: "active" },
  { id: "3", name: "Reliance Infra", contact: "Priya Menon", email: "priya@reliance.com", sites: 3, machines: 18, status: "active" },
  { id: "4", name: "Shapoorji Pallonji", contact: "Vikram Jain", email: "vikram@shapoorji.com", sites: 4, machines: 22, status: "active" },
  { id: "5", name: "Godrej Properties", contact: "Neha Sharma", email: "neha@godrej.com", sites: 2, machines: 12, status: "inactive" },
];

export default function ClientsTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Clients</h2>
          <p className="text-gray-500">Manage client organizations</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
          <Plus size={18} />
          Add Client
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search clients..."
          className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent"
        />
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:border-accent hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center">
                <span className="text-accent font-bold">{client.name.charAt(0)}</span>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreVertical size={16} className="text-gray-500" />
              </button>
            </div>

            <h3 className="font-semibold text-gray-900 mb-1">{client.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{client.contact} • {client.email}</p>

            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <MapPin size={14} />
                <span>{client.sites} sites</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Truck size={14} />
                <span>{client.machines} machines</span>
              </div>
            </div>

            <div className="mt-4">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                client.status === 'active' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {client.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

