"use client";

import { Plus, Search, MoreVertical, Mail, Phone } from "lucide-react";

const users = [
  { id: "1", name: "Ramesh Kumar", email: "ramesh.k@iims.net", role: "Maintenance Manager", status: "active", phone: "+91 98765 43210" },
  { id: "2", name: "Suresh Mehta", email: "suresh.m@iims.net", role: "Technician", status: "active", phone: "+91 98765 43211" },
  { id: "3", name: "Priya Sharma", email: "priya.s@iims.net", role: "Inventory Manager", status: "active", phone: "+91 98765 43212" },
  { id: "4", name: "Amit Patel", email: "amit.p@iims.net", role: "Technician", status: "inactive", phone: "+91 98765 43213" },
  { id: "5", name: "Neha Gupta", email: "neha.g@iims.net", role: "Fleet Manager", status: "active", phone: "+91 98765 43214" },
];

export default function UsersTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Users</h2>
          <p className="text-gray-500">Manage internal team members</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
          <Plus size={18} />
          Add User
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search users..."
          className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">User</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Role</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Contact</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent-light rounded-full flex items-center justify-center">
                      <span className="text-accent font-medium">{user.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm text-gray-700">{user.role}</span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <Mail size={14} />
                      {user.email}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <MoreVertical size={16} className="text-gray-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

