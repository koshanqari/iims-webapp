import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UELMS - IIMS Admin",
  description: "Equipment Lifecycle Management - IIMS Administration",
};

export default function IIMSAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}

