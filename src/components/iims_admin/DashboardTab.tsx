"use client";

import { Truck, Users, Building2, Wrench, TrendingUp, AlertTriangle } from "lucide-react";

const stats = [
  { label: "Total Equipment", value: "248", icon: Truck, change: "+12 this month" },
  { label: "Active Clients", value: "34", icon: Building2, change: "+3 this month" },
  { label: "Technicians", value: "56", icon: Users, change: "+5 this month" },
  { label: "Open Work Orders", value: "23", icon: Wrench, change: "8 urgent" },
];

export default function DashboardTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500">Overview of your equipment management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center">
                  <Icon size={24} className="text-accent" />
                </div>
                <TrendingUp size={16} className="text-green-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Equipment Activity</h3>
          <div className="space-y-4">
            {[
              { equipment: "CAT 320D - EX001", action: "Maintenance completed", time: "2 hours ago" },
              { equipment: "Komatsu PC200 - EX015", action: "Assigned to Site B", time: "4 hours ago" },
              { equipment: "JCB 3DX - LD008", action: "Service request created", time: "6 hours ago" },
              { equipment: "Volvo EC220D - EX022", action: "Telemetry alert", time: "8 hours ago" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.equipment}</p>
                  <p className="text-xs text-gray-500">{item.action}</p>
                </div>
                <span className="text-xs text-gray-400">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Alerts</h3>
          <div className="space-y-3">
            {[
              { title: "Low fuel alert", message: "3 machines below 20% fuel", type: "warning" },
              { title: "Maintenance due", message: "5 machines need service", type: "warning" },
              { title: "Telemetry offline", message: "2 machines not reporting", type: "error" },
            ].map((alert, index) => (
              <div key={index} className={`flex items-start gap-3 p-3 rounded-lg ${alert.type === 'error' ? 'bg-red-50' : 'bg-amber-50'}`}>
                <AlertTriangle size={18} className={alert.type === 'error' ? 'text-red-500' : 'text-amber-500'} />
                <div>
                  <p className={`text-sm font-medium ${alert.type === 'error' ? 'text-red-700' : 'text-amber-700'}`}>{alert.title}</p>
                  <p className={`text-xs ${alert.type === 'error' ? 'text-red-600' : 'text-amber-600'}`}>{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

