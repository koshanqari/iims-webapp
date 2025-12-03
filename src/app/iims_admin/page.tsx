"use client";

import { useState } from "react";
import Sidebar from "@/components/iims_admin/Sidebar";
import Header from "@/components/iims_admin/Header";
import EquipmentTab from "@/components/iims_admin/EquipmentTab";
import DashboardTab from "@/components/iims_admin/DashboardTab";
import UsersTab from "@/components/iims_admin/UsersTab";
import ClientsTab from "@/components/iims_admin/ClientsTab";

type Tab = "dashboard" | "equipment" | "users" | "clients" | "reports" | "settings";

export default function IIMSAdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("equipment");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />;
      case "equipment":
        return <EquipmentTab />;
      case "users":
        return <UsersTab />;
      case "clients":
        return <ClientsTab />;
      default:
        return <EquipmentTab />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

