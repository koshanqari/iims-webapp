import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "UELMS - Operator",
  description: "Equipment Lifecycle Management - Operator Portal",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function OperatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-white relative">
      {children}
    </div>
  );
}

