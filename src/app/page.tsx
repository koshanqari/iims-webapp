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
    soon: false,
  },
  { 
    href: "/supervisor", 
    name: "Supervisor", 
    description: "Team & equipment oversight",
    icon: Users,
    soon: true,
  },
  { 
    href: "/admin", 
    name: "Client Admin", 
    description: "User & site management",
    icon: Shield,
    soon: true,
  },
  { 
    href: "/technician", 
    name: "Technician", 
    description: "Service & repair execution",
    icon: Wrench,
    soon: true,
  },
  { 
    href: "/maintenance_manager", 
    name: "Maintenance Manager", 
    description: "Service coordination & analytics",
    icon: Settings,
    soon: true,
  },
  { 
    href: "/inventory_manager", 
    name: "Inventory Manager", 
    description: "Parts & stock management",
    icon: Package,
    soon: true,
  },
  { 
    href: "/vendor", 
    name: "Vendor Portal", 
    description: "Parts & service provider access",
    icon: Store,
    soon: true,
  },
  { 
    href: "/iims_admin", 
    name: "IIMS Admin", 
    description: "Platform administration",
    icon: Building2,
    soon: false,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
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
      <div className="max-w-5xl mx-auto p-6 flex-1">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Select Application</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {apps.map((app) => {
            const Icon = app.icon;
            
            if (app.soon) {
              return (
                <div
                  key={app.href}
                  className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-200 relative"
                >
                  <span className="absolute top-3 right-3 px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-semibold rounded-full">
                    Soon
                  </span>
                  <div className="w-14 h-14 bg-accent-light rounded-xl flex items-center justify-center mb-4">
                    <Icon size={28} className="text-accent" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {app.name}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{app.description}</p>
                </div>
              );
            }
            
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
          UELMS by IIMS - CKA Birla Group
        </p>
      </div>

      {/* Partner Footer */}
      <footer className="bg-black mt-auto">
        <div className="max-w-5xl mx-auto py-4 px-6">
          <div className="grid grid-cols-3 gap-4 items-end justify-items-center">
            <div className="w-[70px] sm:w-[120px] text-center">
              <div className="text-[10px] sm:text-xs font-medium text-gray-400 mb-1">Powered by</div>
              <a href="https://www.intellsys.ai/" target="_blank" rel="noopener noreferrer">
                <img 
                  alt="Intellsys" 
                  className="w-full h-[20px] sm:h-[28px] object-contain object-center" 
                  src="https://cdn-sleepyhug-prod.b-cdn.net/media/intellsys-logo.webp"
                />
              </a>
            </div>
            <div className="w-[70px] sm:w-[120px] text-center">
              <div className="text-[10px] sm:text-xs font-medium text-gray-400 mb-1">Build with</div>
              <a href="https://www.growthjockey.com/" target="_blank" rel="noopener noreferrer">
                <img 
                  alt="Ottopilot" 
                  className="w-full h-[20px] sm:h-[28px] object-contain object-center" 
                  src="https://iba-consulting-prod.b-cdn.net/Logos/411x110.png"
                />
              </a>
            </div>
            <div className="w-[70px] sm:w-[120px] text-center">
              <div className="text-[10px] sm:text-xs font-medium text-gray-400 mb-1">Ventured by</div>
              <a href="https://www.growthjockey.com/" target="_blank" rel="noopener noreferrer">
                <img 
                  alt="Growth Jockey" 
                  className="w-full h-[20px] sm:h-[28px] object-contain object-center" 
                  src="https://cdn-sleepyhug-prod.b-cdn.net/media/growth-jockey-logo.webp"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
