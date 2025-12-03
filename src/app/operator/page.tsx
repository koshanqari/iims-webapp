"use client";

import { useState } from "react";
import Header from "@/components/operator/Header";
import BottomNav from "@/components/operator/BottomNav";
import Dashboard from "@/components/operator/Dashboard";
import AIAssistant from "@/components/operator/AIAssistant";
import ActivityLog from "@/components/operator/ActivityLog";
import ServiceRequest from "@/components/operator/ServiceRequest";
import Profile from "@/components/operator/Profile";
import NotificationsPanel from "@/components/operator/NotificationsPanel";

type Tab = "dashboard" | "assistant" | "activity" | "service" | "profile";

const tabTitles: Record<Tab, string> = {
  dashboard: "Dashboard",
  assistant: "AI Assistant",
  activity: "Activity",
  service: "Service Request",
  profile: "Profile",
};

export default function OperatorPage() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "assistant":
        return <AIAssistant />;
      case "activity":
        return <ActivityLog />;
      case "service":
        return <ServiceRequest />;
      case "profile":
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        title={tabTitles[activeTab]}
        notificationCount={3}
        onNotificationClick={() => setShowNotifications(true)}
      />
      
      <main className="pb-20">
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

