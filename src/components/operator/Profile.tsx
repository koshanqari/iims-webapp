"use client";

import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  Clock, 
  ChevronRight,
  Shield,
  FileText,
  HelpCircle,
  LogOut,
  Settings,
  Bell
} from "lucide-react";

const operatorData = {
  name: "Rajesh Kumar",
  role: "Senior Equipment Operator",
  email: "rajesh.kumar@company.com",
  phone: "+91 98765 43210",
  site: "Site A - Mining Operations",
  employeeId: "EMP-2847",
  joinDate: "Jan 15, 2021",
  certifications: [
    { name: "Excavator Operation", validUntil: "Mar 2025" },
    { name: "Safety Training", validUntil: "Aug 2024" },
    { name: "Heavy Machinery", validUntil: "Dec 2024" },
  ],
  stats: {
    totalHours: 4280,
    equipmentOperated: 12,
    yearsExperience: 8,
  },
};

const menuItems = [
  { icon: Bell, label: "Notification Settings", action: "notifications" },
  { icon: Shield, label: "Safety Documents", action: "safety" },
  { icon: FileText, label: "My Certifications", action: "certifications" },
  { icon: Settings, label: "App Settings", action: "settings" },
  { icon: HelpCircle, label: "Help & Support", action: "help" },
];

export default function Profile() {
  return (
    <div className="p-4 pb-24">
      {/* Profile Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
            <User size={32} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">{operatorData.name}</h2>
            <p className="text-sm text-gray-500">{operatorData.role}</p>
            <p className="text-xs text-gray-400 mt-1">ID: {operatorData.employeeId}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Mail size={16} className="text-gray-400" />
            <span className="text-gray-700">{operatorData.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone size={16} className="text-gray-400" />
            <span className="text-gray-700">{operatorData.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MapPin size={16} className="text-gray-400" />
            <span className="text-gray-700">{operatorData.site}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <Clock size={20} className="mx-auto text-accent mb-2" />
          <p className="text-lg font-bold text-gray-900">{operatorData.stats.totalHours.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Total Hours</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <Settings size={20} className="mx-auto text-accent mb-2" />
          <p className="text-lg font-bold text-gray-900">{operatorData.stats.equipmentOperated}</p>
          <p className="text-xs text-gray-500">Equipment</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <Award size={20} className="mx-auto text-accent mb-2" />
          <p className="text-lg font-bold text-gray-900">{operatorData.stats.yearsExperience}</p>
          <p className="text-xs text-gray-500">Years Exp.</p>
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Award size={16} className="text-accent" />
          Active Certifications
        </h3>
        <div className="space-y-2">
          {operatorData.certifications.map((cert, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{cert.name}</p>
                <p className="text-xs text-gray-500">Valid until {cert.validUntil}</p>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-4">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className="text-gray-500" />
                <span className="text-sm text-gray-700">{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
          );
        })}
      </div>

      {/* Logout */}
      <button className="w-full flex items-center justify-center gap-2 p-4 bg-accent-light text-accent rounded-xl font-medium text-sm hover:bg-red-100 transition-colors">
        <LogOut size={18} />
        <span>Sign Out</span>
      </button>

      {/* App Version */}
      <p className="text-center text-xs text-gray-400 mt-4">
        UELMS Operator App v1.0.0
      </p>
    </div>
  );
}

