import Link from "next/link";
import { 
  HardHat, 
  Users, 
  Shield, 
  Wrench, 
  Settings, 
  Package, 
  Building2,
  Store
} from "lucide-react";

const apps = [
  { 
    href: "/operator", 
    name: "Operator", 
    description: "Equipment operation & activity logging",
    icon: HardHat,
  },
  { 
    href: "/supervisor", 
    name: "Supervisor", 
    description: "Team & equipment oversight",
    icon: Users,
  },
  { 
    href: "/admin", 
    name: "Client Admin", 
    description: "User & site management",
    icon: Shield,
  },
  { 
    href: "/technician", 
    name: "Technician", 
    description: "Service & repair execution",
    icon: Wrench,
  },
  { 
    href: "/maintenance_manager", 
    name: "Maintenance Manager", 
    description: "Service coordination & analytics",
    icon: Settings,
  },
  { 
    href: "/inventory_manager", 
    name: "Inventory Manager", 
    description: "Parts & stock management",
    icon: Package,
  },
  { 
    href: "/iims_admin", 
    name: "IIMS Admin", 
    description: "Platform administration",
    icon: Building2,
  },
  { 
    href: "/vendor", 
    name: "Vendor Portal", 
    description: "Parts & service provider access",
    icon: Store,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">U</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">UELMS</h1>
            <p className="text-sm text-gray-500">Equipment Lifecycle Management</p>
          </div>
        </div>
      </header>

      {/* App Selection */}
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Select Application</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <Link
                key={app.href}
                href={app.href}
                className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-accent hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 bg-accent-light rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                  <Icon size={28} className="text-accent group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-accent transition-colors mb-1">
                  {app.name}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{app.description}</p>
              </Link>
            );
          })}
        </div>

        <p className="text-center text-sm text-gray-400 mt-10">
          UELMS by IIMS - CK Birla Group
        </p>
      </div>
    </main>
  );
}
