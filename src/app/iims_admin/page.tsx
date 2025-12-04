"use client";

import { useState } from "react";
import Sidebar from "@/components/iims_admin/Sidebar";
import Header from "@/components/iims_admin/Header";
import EquipmentTab from "@/components/iims_admin/EquipmentTab";
import DashboardTab from "@/components/iims_admin/DashboardTab";
import UsersTab from "@/components/iims_admin/UsersTab";
import ClientsTab from "@/components/iims_admin/ClientsTab";
import ServiceRequestsTab from "@/components/iims_admin/ServiceRequestsTab";
import ActivitiesTab from "@/components/iims_admin/ActivitiesTab";
import InventoryTab from "@/components/iims_admin/InventoryTab";
import PartnerFooter from "@/components/PartnerFooter";

type Tab = "dashboard" | "equipment" | "users" | "clients" | "service_requests" | "activities" | "inventory" | "reports" | "settings";

export default function IIMSAdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

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
      case "service_requests":
        return <ServiceRequestsTab />;
      case "activities":
        return <ActivitiesTab />;
      case "inventory":
        return <InventoryTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="min-h-full flex flex-col">
            <div className="flex-1">
              {renderContent()}
            </div>
            <PartnerFooter />
          </div>
        </main>
      </div>
    </div>
  );
}

