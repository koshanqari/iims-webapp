"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  MapPin,
  Truck,
  Users,
  ArrowLeft,
  Mail,
  Phone,
  Building,
  Calendar,
  Activity,
  Wrench,
  Clock,
  TrendingUp,
  DollarSign,
  FileText,
  Globe,
  User,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  FolderKanban,
  HardHat,
} from "lucide-react";

// Hierarchy: Client → Site → Project

interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  expectedEnd: string;
  status: "active" | "on_hold" | "completed";
  progress: number;
  supervisor: string;
  supervisorPhone: string;
  supervisorEmail: string;
  equipmentCount: number;
  operatorCount: number;
  budget: number;
  spent: number;
}

interface Site {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  siteManager: string;
  siteManagerPhone: string;
  siteManagerEmail: string;
  status: "active" | "inactive";
  projects: Project[];
}

interface Contact {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  isPrimary: boolean;
}

interface ClientData {
  id: string;
  name: string;
  industry: string;
  website: string;
  address: string;
  city: string;
  state: string;
  since: string;
  status: "active" | "inactive";
  contacts: Contact[];
  sites: Site[];
}

const clientsData: ClientData[] = [
  {
    id: "CL-001",
    name: "Tata Projects",
    industry: "Infrastructure & Construction",
    website: "www.tataprojects.com",
    address: "One Forbes, Dr. V.B. Gandhi Marg, Fort",
    city: "Mumbai",
    state: "Maharashtra",
    since: "Jan 2020",
    status: "active",
    contacts: [
      { id: "CT-001", name: "Rajesh Shah", role: "Project Director", email: "rajesh.shah@tataprojects.com", phone: "+91 98765 11111", isPrimary: true },
      { id: "CT-002", name: "Sunita Verma", role: "Operations Manager", email: "sunita.verma@tataprojects.com", phone: "+91 98765 11112", isPrimary: false },
    ],
    sites: [
      {
        id: "S-001", name: "Mumbai Port", address: "Mumbai Port Trust, Dock Area", city: "Mumbai", state: "Maharashtra",
        siteManager: "Vikram Mehta", siteManagerPhone: "+91 98765 12345", siteManagerEmail: "vikram.mehta@company.com", status: "active",
        projects: [
          { id: "P-001", name: "Dock Expansion Phase 1", description: "Expansion of container handling capacity", startDate: "Jan 2024", expectedEnd: "Dec 2024", status: "active", progress: 65, supervisor: "Rajesh Kumar", supervisorPhone: "+91 98765 43210", supervisorEmail: "rajesh.kumar@company.com", equipmentCount: 8, operatorCount: 4, budget: 15000000, spent: 9750000 },
          { id: "P-002", name: "Crane Installation", description: "Installation of 3 new gantry cranes", startDate: "Mar 2024", expectedEnd: "Aug 2024", status: "active", progress: 40, supervisor: "Amit Singh", supervisorPhone: "+91 98765 43220", supervisorEmail: "amit.singh@company.com", equipmentCount: 4, operatorCount: 2, budget: 8000000, spent: 3200000 },
        ]
      },
      {
        id: "S-002", name: "Navi Mumbai Metro", address: "Sector 15, CBD Belapur", city: "Navi Mumbai", state: "Maharashtra",
        siteManager: "Deepak Joshi", siteManagerPhone: "+91 98765 12346", siteManagerEmail: "deepak.joshi@company.com", status: "active",
        projects: [
          { id: "P-003", name: "Station Construction - Belapur", description: "Metro station construction at Belapur", startDate: "Feb 2024", expectedEnd: "Nov 2024", status: "active", progress: 55, supervisor: "Priya Sharma", supervisorPhone: "+91 98765 43240", supervisorEmail: "priya.sharma@company.com", equipmentCount: 6, operatorCount: 3, budget: 12000000, spent: 6600000 },
          { id: "P-004", name: "Tunnel Boring - Section A", description: "Underground tunnel construction", startDate: "Jan 2024", expectedEnd: "Jun 2025", status: "active", progress: 30, supervisor: "Sunil Verma", supervisorPhone: "+91 98765 43250", supervisorEmail: "sunil.verma@company.com", equipmentCount: 5, operatorCount: 3, budget: 25000000, spent: 7500000 },
        ]
      },
      {
        id: "S-003", name: "JNPT Extension", address: "Nhava Sheva", city: "Uran", state: "Maharashtra",
        siteManager: "Rakesh Singh", siteManagerPhone: "+91 98765 12350", siteManagerEmail: "rakesh.singh@company.com", status: "active",
        projects: [
          { id: "P-005", name: "Terminal 5 Foundation", description: "Foundation work for new terminal", startDate: "Apr 2024", expectedEnd: "Oct 2024", status: "active", progress: 45, supervisor: "Deepak Yadav", supervisorPhone: "+91 98765 43260", supervisorEmail: "deepak.yadav@company.com", equipmentCount: 4, operatorCount: 2, budget: 10000000, spent: 4500000 },
        ]
      },
    ],
  },
  {
    id: "CL-002",
    name: "L&T Construction",
    industry: "Heavy Engineering & Construction",
    website: "www.lntecc.com",
    address: "L&T House, Ballard Estate",
    city: "Mumbai",
    state: "Maharashtra",
    since: "Mar 2019",
    status: "active",
    contacts: [
      { id: "CT-004", name: "Amit Kumar", role: "VP Operations", email: "amit.kumar@lnt.com", phone: "+91 98765 22221", isPrimary: true },
    ],
    sites: [
      {
        id: "S-004", name: "Pune Ring Road", address: "Kharadi Bypass", city: "Pune", state: "Maharashtra",
        siteManager: "Mohan Krishnan", siteManagerPhone: "+91 98765 12360", siteManagerEmail: "mohan.k@company.com", status: "active",
        projects: [
          { id: "P-006", name: "Flyover Construction - Section 1", description: "4-lane flyover at Kharadi junction", startDate: "Jan 2024", expectedEnd: "Dec 2024", status: "active", progress: 70, supervisor: "Vikram Patel", supervisorPhone: "+91 98765 43230", supervisorEmail: "vikram.patel@company.com", equipmentCount: 10, operatorCount: 5, budget: 20000000, spent: 14000000 },
          { id: "P-007", name: "Road Widening - Phase 2", description: "Widening existing 2-lane to 4-lane", startDate: "Mar 2024", expectedEnd: "Sep 2024", status: "active", progress: 50, supervisor: "Manoj Tiwari", supervisorPhone: "+91 98765 43280", supervisorEmail: "manoj.t@company.com", equipmentCount: 8, operatorCount: 4, budget: 12000000, spent: 6000000 },
        ]
      },
      {
        id: "S-005", name: "Mumbai Coastal Road", address: "Marine Drive Extension", city: "Mumbai", state: "Maharashtra",
        siteManager: "Arjun Raman", siteManagerPhone: "+91 98765 12370", siteManagerEmail: "arjun.r@company.com", status: "active",
        projects: [
          { id: "P-008", name: "Sea Link Extension", description: "Extension of Bandra-Worli sea link", startDate: "Feb 2024", expectedEnd: "Mar 2025", status: "active", progress: 35, supervisor: "Sanjay Dubey", supervisorPhone: "+91 98765 43290", supervisorEmail: "sanjay.d@company.com", equipmentCount: 12, operatorCount: 6, budget: 50000000, spent: 17500000 },
          { id: "P-009", name: "Reclamation Work", description: "Land reclamation for coastal road", startDate: "Jan 2024", expectedEnd: "Aug 2024", status: "active", progress: 80, supervisor: "Rahul Saxena", supervisorPhone: "+91 98765 43300", supervisorEmail: "rahul.s@company.com", equipmentCount: 6, operatorCount: 3, budget: 18000000, spent: 14400000 },
        ]
      },
    ],
  },
  {
    id: "CL-003",
    name: "Reliance Infra",
    industry: "Infrastructure Development",
    website: "www.relianceinfra.com",
    address: "Reliance Centre, Santacruz East",
    city: "Mumbai",
    state: "Maharashtra",
    since: "Jul 2021",
    status: "active",
    contacts: [
      { id: "CT-006", name: "Priya Menon", role: "Head of Projects", email: "priya.menon@reliance.com", phone: "+91 98765 33331", isPrimary: true },
    ],
    sites: [
      {
        id: "S-006", name: "Delhi Metro Phase 4", address: "Dwarka Sector 21", city: "New Delhi", state: "Delhi",
        siteManager: "Kiran Patil", siteManagerPhone: "+91 98765 54340", siteManagerEmail: "kiran.p@company.com", status: "active",
        projects: [
          { id: "P-010", name: "Station - Dwarka Sector 21", description: "Underground station construction", startDate: "Mar 2024", expectedEnd: "Feb 2025", status: "active", progress: 25, supervisor: "Arun Kumar", supervisorPhone: "+91 98765 43320", supervisorEmail: "arun.k@company.com", equipmentCount: 8, operatorCount: 4, budget: 22000000, spent: 5500000 },
          { id: "P-011", name: "Depot Construction", description: "Metro depot and maintenance facility", startDate: "Apr 2024", expectedEnd: "Dec 2024", status: "active", progress: 40, supervisor: "Vikas Pandey", supervisorPhone: "+91 98765 43330", supervisorEmail: "vikas.p@company.com", equipmentCount: 6, operatorCount: 3, budget: 15000000, spent: 6000000 },
        ]
      },
      {
        id: "S-007", name: "Noida Expressway", address: "Sector 150", city: "Noida", state: "Uttar Pradesh",
        siteManager: "Anjali Singh", siteManagerPhone: "+91 98765 12352", siteManagerEmail: "anjali.s@company.com", status: "active",
        projects: [
          { id: "P-012", name: "Elevated Corridor", description: "6-lane elevated expressway", startDate: "Feb 2024", expectedEnd: "Jan 2025", status: "active", progress: 55, supervisor: "Rohit Chauhan", supervisorPhone: "+91 98765 43340", supervisorEmail: "rohit.c@company.com", equipmentCount: 10, operatorCount: 5, budget: 30000000, spent: 16500000 },
        ]
      },
    ],
  },
  {
    id: "CL-004",
    name: "Shapoorji Pallonji",
    industry: "Real Estate & Construction",
    website: "www.shapoorjipallonji.com",
    address: "SP Centre, Murzban Road",
    city: "Mumbai",
    state: "Maharashtra",
    since: "Sep 2020",
    status: "active",
    contacts: [
      { id: "CT-008", name: "Vikram Jain", role: "Chief Projects Officer", email: "vikram.jain@shapoorji.com", phone: "+91 98765 44441", isPrimary: true },
    ],
    sites: [
      {
        id: "S-008", name: "Bangalore Tech Park", address: "Whitefield", city: "Bangalore", state: "Karnataka",
        siteManager: "Ravi Kumar", siteManagerPhone: "+91 98765 12353", siteManagerEmail: "ravi.k@company.com", status: "active",
        projects: [
          { id: "P-013", name: "Tower A Construction", description: "12-story IT office building", startDate: "Jan 2024", expectedEnd: "Nov 2024", status: "active", progress: 75, supervisor: "Naveen Reddy", supervisorPhone: "+91 98765 43350", supervisorEmail: "naveen.r@company.com", equipmentCount: 8, operatorCount: 4, budget: 35000000, spent: 26250000 },
          { id: "P-014", name: "Basement Parking", description: "3-level underground parking", startDate: "Feb 2024", expectedEnd: "Aug 2024", status: "completed", progress: 100, supervisor: "Karthik Nair", supervisorPhone: "+91 98765 43355", supervisorEmail: "karthik.n@company.com", equipmentCount: 4, operatorCount: 2, budget: 8000000, spent: 7800000 },
        ]
      },
    ],
  },
  {
    id: "CL-005",
    name: "Adani Group",
    industry: "Ports & Infrastructure",
    website: "www.adani.com",
    address: "Adani House, Near Mithakhali Circle",
    city: "Ahmedabad",
    state: "Gujarat",
    since: "Feb 2023",
    status: "active",
    contacts: [
      { id: "CT-010", name: "Sanjay Patel", role: "Regional Director", email: "sanjay.patel@adani.com", phone: "+91 98765 55551", isPrimary: true },
    ],
    sites: [
      {
        id: "S-009", name: "Mundra Port Expansion", address: "Mundra SEZ", city: "Kutch", state: "Gujarat",
        siteManager: "Pooja Singh", siteManagerPhone: "+91 98765 12354", siteManagerEmail: "pooja.s@company.com", status: "active",
        projects: [
          { id: "P-015", name: "Container Terminal 3", description: "New container handling facility", startDate: "Mar 2024", expectedEnd: "Feb 2025", status: "active", progress: 30, supervisor: "Arjun Sharma", supervisorPhone: "+91 98765 43360", supervisorEmail: "arjun.s@company.com", equipmentCount: 12, operatorCount: 6, budget: 45000000, spent: 13500000 },
        ]
      },
    ],
  },
];

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-gray-100 text-gray-600",
  on_hold: "bg-amber-100 text-amber-700",
  completed: "bg-blue-100 text-blue-700",
};

type ViewLevel = "clients" | "sites" | "projects" | "project_detail";

interface ViewState {
  level: ViewLevel;
  client?: ClientData;
  site?: Site;
  project?: Project;
}

export default function ClientsTab() {
  const [viewState, setViewState] = useState<ViewState>({ level: "clients" });
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const goBack = () => {
    if (viewState.level === "project_detail") {
      setViewState({ level: "projects", client: viewState.client, site: viewState.site });
    } else if (viewState.level === "projects") {
      setViewState({ level: "sites", client: viewState.client });
    } else if (viewState.level === "sites") {
      setViewState({ level: "clients" });
    }
  };

  // Calculate stats
  const totalClients = clientsData.length;
  const totalSites = clientsData.reduce((sum, c) => sum + c.sites.length, 0);
  const totalProjects = clientsData.reduce((sum, c) => sum + c.sites.reduce((s, site) => s + site.projects.length, 0), 0);
  const activeProjects = clientsData.reduce((sum, c) => sum + c.sites.reduce((s, site) => s + site.projects.filter(p => p.status === "active").length, 0), 0);

  // Clients List View
  if (viewState.level === "clients") {
    const filteredClients = clientsData.filter((client) => {
      const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) || client.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || client.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Clients</h2>
            <p className="text-gray-500">{totalClients} clients • {totalSites} sites • {totalProjects} projects</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
            <Plus size={18} />
            Add Client
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent-light rounded-lg flex items-center justify-center"><Building size={20} className="text-accent" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{totalClients}</p><p className="text-sm text-gray-500">Clients</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><MapPin size={20} className="text-blue-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{totalSites}</p><p className="text-sm text-gray-500">Sites</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"><FolderKanban size={20} className="text-purple-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{totalProjects}</p><p className="text-sm text-gray-500">Projects</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"><Activity size={20} className="text-green-600" /></div>
              <div><p className="text-2xl font-bold text-gray-900">{activeProjects}</p><p className="text-sm text-gray-500">Active Projects</p></div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search clients..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Clients Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Client</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Industry</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Location</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Sites</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Projects</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Since</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredClients.map((client) => {
                const projectCount = client.sites.reduce((sum, s) => sum + s.projects.length, 0);
                return (
                  <tr key={client.id} onClick={() => setViewState({ level: "sites", client })} className="hover:bg-gray-50 transition-colors cursor-pointer">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent-light rounded-lg flex items-center justify-center flex-shrink-0"><span className="text-accent font-bold">{client.name.charAt(0)}</span></div>
                        <div><p className="font-medium text-gray-900">{client.name}</p><p className="text-xs text-gray-500">{client.id}</p></div>
                      </div>
                    </td>
                    <td className="py-3 px-4"><span className="text-sm text-gray-700">{client.industry}</span></td>
                    <td className="py-3 px-4"><span className="text-sm text-gray-600">{client.city}, {client.state}</span></td>
                    <td className="py-3 px-4"><span className="text-sm font-medium text-gray-900">{client.sites.length}</span></td>
                    <td className="py-3 px-4"><span className="text-sm font-medium text-gray-900">{projectCount}</span></td>
                    <td className="py-3 px-4"><span className="text-sm text-gray-600">{client.since}</span></td>
                    <td className="py-3 px-4"><span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${statusColors[client.status]}`}>{client.status}</span></td>
                    <td className="py-3 px-4"><ChevronRight size={18} className="text-gray-400" /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Sites List View (for selected client)
  if (viewState.level === "sites" && viewState.client) {
    const client = viewState.client;
    const totalProjectsForClient = client.sites.reduce((sum, s) => sum + s.projects.length, 0);
    const totalEquipment = client.sites.reduce((sum, s) => sum + s.projects.reduce((ps, p) => ps + p.equipmentCount, 0), 0);
    const totalOperators = client.sites.reduce((sum, s) => sum + s.projects.reduce((ps, p) => ps + p.operatorCount, 0), 0);

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={goBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><ArrowLeft size={20} className="text-gray-600" /></button>
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <span>Clients</span><ChevronRight size={14} /><span className="text-gray-900 font-medium">{client.name}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Sites</h2>
          </div>
        </div>

        {/* Client Summary Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-accent-light rounded-xl flex items-center justify-center"><span className="text-accent font-bold text-xl">{client.name.charAt(0)}</span></div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
              <p className="text-sm text-gray-500">{client.industry}</p>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className="flex items-center gap-1 text-gray-600"><MapPin size={14} />{client.city}, {client.state}</span>
                <span className="flex items-center gap-1 text-gray-600"><Globe size={14} /><a href={`https://${client.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent">{client.website}</a></span>
              </div>
            </div>
            <span className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${statusColors[client.status]}`}>{client.status}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-gray-500 mb-1"><MapPin size={16} /><span className="text-sm">Sites</span></div><p className="text-2xl font-bold text-gray-900">{client.sites.length}</p></div>
          <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-gray-500 mb-1"><FolderKanban size={16} /><span className="text-sm">Projects</span></div><p className="text-2xl font-bold text-gray-900">{totalProjectsForClient}</p></div>
          <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-gray-500 mb-1"><Truck size={16} /><span className="text-sm">Equipment</span></div><p className="text-2xl font-bold text-gray-900">{totalEquipment}</p></div>
          <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-gray-500 mb-1"><HardHat size={16} /><span className="text-sm">Operators</span></div><p className="text-2xl font-bold text-gray-900">{totalOperators}</p></div>
        </div>

        {/* Sites Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Site</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Location</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Site Manager</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Projects</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Equipment</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Operators</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {client.sites.map((site) => {
                const siteEquipment = site.projects.reduce((sum, p) => sum + p.equipmentCount, 0);
                const siteOperators = site.projects.reduce((sum, p) => sum + p.operatorCount, 0);
                return (
                  <tr key={site.id} onClick={() => setViewState({ level: "projects", client, site })} className="hover:bg-gray-50 transition-colors cursor-pointer">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0"><MapPin size={18} className="text-blue-600" /></div>
                        <div><p className="font-medium text-gray-900">{site.name}</p><p className="text-xs text-gray-500">{site.id}</p></div>
                      </div>
                    </td>
                    <td className="py-3 px-4"><span className="text-sm text-gray-600">{site.city}, {site.state}</span></td>
                    <td className="py-3 px-4"><p className="text-sm text-gray-900">{site.siteManager}</p><p className="text-xs text-gray-500">{site.siteManagerPhone}</p></td>
                    <td className="py-3 px-4"><span className="text-sm font-medium text-gray-900">{site.projects.length}</span></td>
                    <td className="py-3 px-4"><span className="text-sm font-medium text-gray-900">{siteEquipment}</span></td>
                    <td className="py-3 px-4"><span className="text-sm font-medium text-gray-900">{siteOperators}</span></td>
                    <td className="py-3 px-4"><span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${statusColors[site.status]}`}>{site.status}</span></td>
                    <td className="py-3 px-4"><ChevronRight size={18} className="text-gray-400" /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Contacts */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><Users size={18} className="text-accent" />Client Contacts</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {client.contacts.map((contact) => (
              <div key={contact.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-accent-light rounded-full flex items-center justify-center"><span className="text-accent font-medium">{contact.name.charAt(0)}</span></div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{contact.name}</p>
                  <p className="text-xs text-gray-500">{contact.role}</p>
                </div>
                {contact.isPrimary && <span className="px-2 py-0.5 bg-accent-light text-accent text-xs font-medium rounded">Primary</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Projects List View (for selected site)
  if (viewState.level === "projects" && viewState.client && viewState.site) {
    const client = viewState.client;
    const site = viewState.site;
    const activeProjectsCount = site.projects.filter(p => p.status === "active").length;
    const totalBudget = site.projects.reduce((sum, p) => sum + p.budget, 0);
    const totalSpent = site.projects.reduce((sum, p) => sum + p.spent, 0);

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={goBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><ArrowLeft size={20} className="text-gray-600" /></button>
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <span>Clients</span><ChevronRight size={14} /><span>{client.name}</span><ChevronRight size={14} /><span className="text-gray-900 font-medium">{site.name}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          </div>
        </div>

        {/* Site Summary Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center"><MapPin size={24} className="text-blue-600" /></div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{site.name}</h3>
              <p className="text-sm text-gray-500">{site.address}, {site.city}, {site.state}</p>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className="flex items-center gap-1 text-gray-600"><User size={14} />{site.siteManager}</span>
                <span className="flex items-center gap-1 text-gray-600"><Phone size={14} />{site.siteManagerPhone}</span>
              </div>
            </div>
            <span className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${statusColors[site.status]}`}>{site.status}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-gray-500 mb-1"><FolderKanban size={16} /><span className="text-sm">Total Projects</span></div><p className="text-2xl font-bold text-gray-900">{site.projects.length}</p></div>
          <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-green-500 mb-1"><Activity size={16} /><span className="text-sm">Active</span></div><p className="text-2xl font-bold text-gray-900">{activeProjectsCount}</p></div>
          <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-gray-500 mb-1"><DollarSign size={16} /><span className="text-sm">Total Budget</span></div><p className="text-2xl font-bold text-gray-900">{(totalBudget / 10000000).toFixed(1)}Cr</p></div>
          <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-amber-500 mb-1"><TrendingUp size={16} /><span className="text-sm">Spent</span></div><p className="text-2xl font-bold text-gray-900">{(totalSpent / 10000000).toFixed(1)}Cr</p></div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {site.projects.map((project) => (
            <div key={project.id} onClick={() => setViewState({ level: "project_detail", client, site, project })} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-accent hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"><FolderKanban size={18} className="text-purple-600" /></div>
                  <div>
                    <p className="font-medium text-gray-900">{project.name}</p>
                    <p className="text-xs text-gray-500">{project.id}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${statusColors[project.status]}`}>{project.status.replace("_", " ")}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{project.description}</p>
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1"><span className="text-gray-500">Progress</span><span className="font-medium text-gray-900">{project.progress}%</span></div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-accent rounded-full transition-all" style={{ width: `${project.progress}%` }} /></div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1 text-gray-600"><User size={14} />{project.supervisor}</div>
                <div className="flex items-center gap-1 text-gray-600"><Truck size={14} />{project.equipmentCount} equipment</div>
                <div className="flex items-center gap-1 text-gray-600"><Calendar size={14} />{project.expectedEnd}</div>
                <div className="flex items-center gap-1 text-gray-600"><HardHat size={14} />{project.operatorCount} operators</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Project Detail View
  if (viewState.level === "project_detail" && viewState.client && viewState.site && viewState.project) {
    const client = viewState.client;
    const site = viewState.site;
    const project = viewState.project;
    const budgetUtilization = Math.round((project.spent / project.budget) * 100);

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={goBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><ArrowLeft size={20} className="text-gray-600" /></button>
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <span>Clients</span><ChevronRight size={14} /><span>{client.name}</span><ChevronRight size={14} /><span>{site.name}</span><ChevronRight size={14} /><span className="text-gray-900 font-medium">{project.name}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{project.name}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Project Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center"><FolderKanban size={24} className="text-purple-600" /></div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${statusColors[project.status]}`}>{project.status.replace("_", " ")}</span>
                  </div>
                  <p className="text-sm text-gray-600">{project.description}</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2"><span className="text-gray-500">Overall Progress</span><span className="font-medium text-gray-900">{project.progress}%</span></div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-accent rounded-full transition-all" style={{ width: `${project.progress}%` }} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600"><Calendar size={14} className="text-gray-400" /><span>Start: {project.startDate}</span></div>
                <div className="flex items-center gap-2 text-gray-600"><Calendar size={14} className="text-gray-400" /><span>Expected End: {project.expectedEnd}</span></div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-gray-500 mb-1"><Truck size={16} /><span className="text-sm">Equipment</span></div><p className="text-2xl font-bold text-gray-900">{project.equipmentCount}</p></div>
              <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-gray-500 mb-1"><HardHat size={16} /><span className="text-sm">Operators</span></div><p className="text-2xl font-bold text-gray-900">{project.operatorCount}</p></div>
              <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-gray-500 mb-1"><DollarSign size={16} /><span className="text-sm">Budget</span></div><p className="text-2xl font-bold text-gray-900">{(project.budget / 1000000).toFixed(1)}M</p></div>
              <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-amber-500 mb-1"><TrendingUp size={16} /><span className="text-sm">Spent</span></div><p className="text-2xl font-bold text-gray-900">{(project.spent / 1000000).toFixed(1)}M</p></div>
            </div>

            {/* Budget Utilization */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><DollarSign size={18} className="text-accent" />Budget Utilization</h4>
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm mb-2"><span className="text-gray-500">Spent: ₹{(project.spent / 1000000).toFixed(1)}M</span><span className="text-gray-500">Budget: ₹{(project.budget / 1000000).toFixed(1)}M</span></div>
                  <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden"><div className={`h-full rounded-full transition-all ${budgetUtilization > 90 ? "bg-red-500" : budgetUtilization > 70 ? "bg-amber-500" : "bg-green-500"}`} style={{ width: `${budgetUtilization}%` }} /></div>
                  <p className="text-sm text-gray-500 mt-2">{budgetUtilization}% utilized • ₹{((project.budget - project.spent) / 1000000).toFixed(1)}M remaining</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-accent-light hover:text-accent transition-colors"><Truck size={16} />Equipment</button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-accent-light hover:text-accent transition-colors"><Activity size={16} />Activities</button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-accent-light hover:text-accent transition-colors"><Wrench size={16} />Service</button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-accent-light hover:text-accent transition-colors"><FileText size={16} />Reports</button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Supervisor */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h4 className="text-sm font-semibold text-gray-500 mb-3">Project Supervisor</h4>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-accent-light rounded-full flex items-center justify-center"><span className="text-accent font-bold">{project.supervisor.charAt(0)}</span></div>
                <div><p className="font-medium text-gray-900">{project.supervisor}</p><p className="text-xs text-gray-500">Supervisor</p></div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600"><Phone size={14} className="text-gray-400" /><a href={`tel:${project.supervisorPhone}`} className="hover:text-accent">{project.supervisorPhone}</a></div>
                <div className="flex items-center gap-2 text-gray-600"><Mail size={14} className="text-gray-400" /><a href={`mailto:${project.supervisorEmail}`} className="hover:text-accent">{project.supervisorEmail}</a></div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <a href={`tel:${project.supervisorPhone}`} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-accent-light hover:text-accent transition-colors"><Phone size={14} />Call</a>
                <a href={`mailto:${project.supervisorEmail}`} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-accent-light hover:text-accent transition-colors"><Mail size={14} />Email</a>
              </div>
            </div>

            {/* Site Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h4 className="text-sm font-semibold text-gray-500 mb-3">Site</h4>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><MapPin size={18} className="text-blue-600" /></div>
                <div><p className="font-medium text-gray-900">{site.name}</p><p className="text-xs text-gray-500">{site.city}, {site.state}</p></div>
              </div>
              <div className="text-sm text-gray-600"><p className="font-medium">Site Manager: {site.siteManager}</p><p className="text-xs text-gray-500">{site.siteManagerPhone}</p></div>
            </div>

            {/* Client Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h4 className="text-sm font-semibold text-gray-500 mb-3">Client</h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-light rounded-lg flex items-center justify-center"><span className="text-accent font-bold">{client.name.charAt(0)}</span></div>
                <div><p className="font-medium text-gray-900">{client.name}</p><p className="text-xs text-gray-500">{client.industry}</p></div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><Clock size={18} className="text-accent" />Timeline</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3"><div className="w-2 h-2 bg-green-500 rounded-full" /><div><p className="text-sm font-medium text-gray-900">Project Started</p><p className="text-xs text-gray-500">{project.startDate}</p></div></div>
                <div className="flex items-center gap-3"><div className="w-2 h-2 bg-accent rounded-full" /><div><p className="text-sm font-medium text-gray-900">Current Progress</p><p className="text-xs text-gray-500">{project.progress}% complete</p></div></div>
                <div className="flex items-center gap-3"><div className="w-2 h-2 bg-gray-300 rounded-full" /><div><p className="text-sm font-medium text-gray-900">Expected Completion</p><p className="text-xs text-gray-500">{project.expectedEnd}</p></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
