"use client";

import { useState, useCallback } from "react";
import Header from "@/components/operator/Header";
import BottomNav from "@/components/operator/BottomNav";
import Equipment from "@/components/operator/Equipment";
import AIAssistant from "@/components/operator/AIAssistant";
import ActivityLog from "@/components/operator/ActivityLog";
import ServiceRequest from "@/components/operator/ServiceRequest";
import Profile from "@/components/operator/Profile";
import NotificationsPanel from "@/components/operator/NotificationsPanel";

type Tab = "equipment" | "assistant" | "activity" | "service" | "profile";

export interface ServiceRequestPrefill {
  equipmentId: string;
  equipmentName: string;
  serialNumber: string;
  part?: string;
}

const tabTitles: Record<Tab, string> = {
  equipment: "My Equipment",
  assistant: "AI Assistant",
  activity: "Activity",
  service: "Service Request",
  profile: "Profile",
};

export default function OperatorPage() {
  const [activeTab, setActiveTab] = useState<Tab>("equipment");
  const [showNotifications, setShowNotifications] = useState(false);
  const [serviceRequestPrefill, setServiceRequestPrefill] = useState<ServiceRequestPrefill | null>(null);

  const handleReportIssue = useCallback((prefill: ServiceRequestPrefill) => {
    setServiceRequestPrefill(prefill);
    setActiveTab("service");
  }, []);

  const clearServicePrefill = useCallback(() => {
    setServiceRequestPrefill(null);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "equipment":
        return <Equipment onRequestService={handleReportIssue} />;
      case "assistant":
        return <AIAssistant />;
      case "activity":
        return <ActivityLog onReportIssue={handleReportIssue} />;
      case "service":
        return <ServiceRequest prefill={serviceRequestPrefill} onClearPrefill={clearServicePrefill} />;
      case "profile":
        return <Profile />;
      default:
        return <Equipment onRequestService={handleReportIssue} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        title={tabTitles[activeTab]}
        notificationCount={3}
        onNotificationClick={() => setShowNotifications(true)}
      />
      
      <main className="pb-20 overflow-y-auto">
        {renderContent()}
      </main>
      
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      
      <NotificationsPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </div>
  );
}
