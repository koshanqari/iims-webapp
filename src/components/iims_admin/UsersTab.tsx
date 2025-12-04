"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Mail,
  Phone,
  MapPin,
  Truck,
  ArrowLeft,
  Calendar,
  Award,
  Activity,
  Users,
  Shield,
  Wrench,
  Building,
  Clock,
  Fuel,
  AlertCircle,
  CheckCircle,
  Pencil,
  Trash2,
  Download,
  Upload,
  MoreVertical,
} from "lucide-react";

interface AssignedEquipment {
  id: string;
  serialNumber: string;
  name: string;
  status: "active" | "idle" | "maintenance";
}

interface Certification {
  name: string;
  validUntil: string;
  status: "valid" | "expiring" | "expired";
}

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "operator" | "supervisor" | "technician" | "maintenance_manager" | "fleet_manager" | "inventory_manager";
  status: "active" | "inactive" | "on_leave";
  employeeId: string;
  joinDate: string;
  site: string;
  client: string;
  shift?: string;
  assignedEquipment: AssignedEquipment[];
  certifications: Certification[];
  stats: {
    totalHours?: number;
    equipmentOperated?: number;
    serviceRequests?: number;
    activitiesCompleted?: number;
  };
  reportsTo?: string;
  team?: string[];
}

const usersData: UserData[] = [
  { id: "OP-001", name: "Rajesh Kumar", email: "rajesh.kumar@company.com", phone: "+91 98765 43210", role: "operator", status: "active", employeeId: "EMP-2847", joinDate: "Jan 15, 2021", site: "Site A - Block 3", client: "Tata Projects", shift: "Day", assignedEquipment: [{ id: "eq1", serialNumber: "EX-001", name: "CAT 320D Excavator", status: "active" }, { id: "eq1b", serialNumber: "EX-015", name: "Komatsu PC200", status: "idle" }, { id: "eq1c", serialNumber: "LD-003", name: "CAT 950H Loader", status: "maintenance" }], certifications: [{ name: "Excavator Operation", validUntil: "Mar 2025", status: "valid" }, { name: "Loader Operation", validUntil: "Aug 2024", status: "expiring" }, { name: "Safety Training", validUntil: "Dec 2024", status: "valid" }], stats: { totalHours: 4280, equipmentOperated: 12, activitiesCompleted: 856, serviceRequests: 23 }, reportsTo: "SUP-001" },
  { id: "OP-002", name: "Amit Singh", email: "amit.singh@company.com", phone: "+91 98765 43220", role: "operator", status: "active", employeeId: "EMP-3012", joinDate: "Mar 22, 2022", site: "Site A - Block 2", client: "Tata Projects", shift: "Night", assignedEquipment: [{ id: "eq2", serialNumber: "EX-002", name: "CAT 330F Excavator", status: "active" }], certifications: [{ name: "Excavator Operation", validUntil: "Jun 2025", status: "valid" }], stats: { totalHours: 2150, equipmentOperated: 6, activitiesCompleted: 432 }, reportsTo: "SUP-001" },
  { id: "OP-003", name: "Priya Sharma", email: "priya.sharma@company.com", phone: "+91 98765 43240", role: "operator", status: "active", employeeId: "EMP-3245", joinDate: "Jun 5, 2023", site: "Site A - Block 1", client: "Tata Projects", shift: "Evening", assignedEquipment: [{ id: "eq3", serialNumber: "EX-005", name: "JCB JS220", status: "active" }], certifications: [{ name: "Excavator Operation", validUntil: "Aug 2025", status: "valid" }], stats: { totalHours: 890, equipmentOperated: 3, activitiesCompleted: 178 }, reportsTo: "SUP-001" },
  { id: "OP-004", name: "Sunil Verma", email: "sunil.verma@company.com", phone: "+91 98765 43250", role: "operator", status: "active", employeeId: "EMP-3301", joinDate: "Aug 12, 2022", site: "Site A - Block 3", client: "Tata Projects", shift: "Day", assignedEquipment: [{ id: "eq4", serialNumber: "LD-001", name: "CAT 950H Loader", status: "active" }], certifications: [{ name: "Loader Operation", validUntil: "Nov 2024", status: "valid" }], stats: { totalHours: 1850, equipmentOperated: 4, activitiesCompleted: 370 }, reportsTo: "SUP-001" },
  { id: "OP-005", name: "Deepak Yadav", email: "deepak.yadav@company.com", phone: "+91 98765 43260", role: "operator", status: "on_leave", employeeId: "EMP-3402", joinDate: "Oct 1, 2022", site: "Site A - Block 2", client: "Tata Projects", shift: "Night", assignedEquipment: [{ id: "eq5", serialNumber: "DT-001", name: "Volvo FMX Dump Truck", status: "idle" }], certifications: [{ name: "Dump Truck Operation", validUntil: "Dec 2024", status: "valid" }], stats: { totalHours: 1620, equipmentOperated: 3, activitiesCompleted: 324 }, reportsTo: "SUP-001" },
  { id: "OP-006", name: "Ramesh Gupta", email: "ramesh.gupta@company.com", phone: "+91 98765 43270", role: "operator", status: "active", employeeId: "EMP-3456", joinDate: "Nov 15, 2022", site: "Site A - Block 1", client: "Tata Projects", shift: "Day", assignedEquipment: [{ id: "eq6", serialNumber: "EX-006", name: "Hitachi ZX200", status: "active" }], certifications: [{ name: "Excavator Operation", validUntil: "Jan 2025", status: "valid" }], stats: { totalHours: 1450, equipmentOperated: 5, activitiesCompleted: 290 }, reportsTo: "SUP-001" },
  { id: "SUP-001", name: "Vikram Mehta", email: "vikram.mehta@company.com", phone: "+91 98765 12345", role: "supervisor", status: "active", employeeId: "EMP-1892", joinDate: "Apr 12, 2018", site: "Site A - Mumbai", client: "Tata Projects", assignedEquipment: [], certifications: [{ name: "Site Supervisor", validUntil: "Jan 2026", status: "valid" }], stats: { serviceRequests: 156, activitiesCompleted: 2340 }, team: ["OP-001", "OP-002", "OP-003", "OP-004", "OP-005", "OP-006"] },
  { id: "TECH-001", name: "Ramesh Patel", email: "ramesh.patel@company.com", phone: "+91 98765 54321", role: "technician", status: "active", employeeId: "EMP-2234", joinDate: "Nov 8, 2020", site: "Site A - Mumbai", client: "Tata Projects", assignedEquipment: [], certifications: [{ name: "CAT Certified", validUntil: "May 2025", status: "valid" }], stats: { serviceRequests: 234, activitiesCompleted: 456 }, reportsTo: "MM-001" },
  { id: "TECH-002", name: "Ajay Mishra", email: "ajay.mishra@company.com", phone: "+91 98765 54330", role: "technician", status: "active", employeeId: "EMP-2567", joinDate: "Feb 15, 2021", site: "Site A - Mumbai", client: "Tata Projects", assignedEquipment: [], certifications: [{ name: "Komatsu Certified", validUntil: "Jul 2025", status: "valid" }], stats: { serviceRequests: 189, activitiesCompleted: 378 }, reportsTo: "MM-001" },
  { id: "OP-007", name: "Vikram Patel", email: "vikram.patel@company.com", phone: "+91 98765 43230", role: "operator", status: "active", employeeId: "EMP-2901", joinDate: "Sep 10, 2021", site: "Site B - Zone 1", client: "L&T Construction", shift: "Day", assignedEquipment: [{ id: "eq7", serialNumber: "EX-015", name: "Komatsu PC200", status: "active" }], certifications: [{ name: "Excavator Operation", validUntil: "Dec 2025", status: "valid" }], stats: { totalHours: 3420, equipmentOperated: 8, activitiesCompleted: 684 }, reportsTo: "SUP-002" },
  { id: "OP-008", name: "Manoj Tiwari", email: "manoj.tiwari@company.com", phone: "+91 98765 43280", role: "operator", status: "active", employeeId: "EMP-3501", joinDate: "Jan 20, 2023", site: "Site B - Zone 2", client: "L&T Construction", shift: "Evening", assignedEquipment: [{ id: "eq8", serialNumber: "EX-016", name: "Komatsu PC300", status: "active" }], certifications: [{ name: "Excavator Operation", validUntil: "Feb 2025", status: "valid" }], stats: { totalHours: 1280, equipmentOperated: 4, activitiesCompleted: 256 }, reportsTo: "SUP-002" },
  { id: "OP-009", name: "Sanjay Dubey", email: "sanjay.dubey@company.com", phone: "+91 98765 43290", role: "operator", status: "active", employeeId: "EMP-3512", joinDate: "Feb 5, 2023", site: "Site B - Zone 1", client: "L&T Construction", shift: "Night", assignedEquipment: [{ id: "eq9", serialNumber: "LD-005", name: "Komatsu WA380", status: "active" }], certifications: [{ name: "Loader Operation", validUntil: "Mar 2025", status: "valid" }], stats: { totalHours: 1150, equipmentOperated: 3, activitiesCompleted: 230 }, reportsTo: "SUP-002" },
  { id: "OP-010", name: "Rahul Saxena", email: "rahul.saxena@company.com", phone: "+91 98765 43300", role: "operator", status: "inactive", employeeId: "EMP-3523", joinDate: "Mar 15, 2023", site: "Site B - Zone 2", client: "L&T Construction", shift: "Day", assignedEquipment: [], certifications: [{ name: "Crane Operation", validUntil: "Apr 2025", status: "valid" }], stats: { totalHours: 980, equipmentOperated: 2, activitiesCompleted: 196 }, reportsTo: "SUP-002" },
  { id: "OP-011", name: "Pankaj Sharma", email: "pankaj.sharma@company.com", phone: "+91 98765 43310", role: "operator", status: "active", employeeId: "EMP-3534", joinDate: "Apr 1, 2023", site: "Site B - Zone 3", client: "L&T Construction", shift: "Day", assignedEquipment: [{ id: "eq10", serialNumber: "CR-001", name: "Liebherr LTM 1100", status: "active" }], certifications: [{ name: "Crane Operation", validUntil: "May 2025", status: "valid" }], stats: { totalHours: 890, equipmentOperated: 2, activitiesCompleted: 178 }, reportsTo: "SUP-002" },
  { id: "OP-012", name: "Ravi Shankar", email: "ravi.shankar@company.com", phone: "+91 98765 43315", role: "operator", status: "active", employeeId: "EMP-3545", joinDate: "May 10, 2023", site: "Site B - Zone 1", client: "L&T Construction", shift: "Evening", assignedEquipment: [{ id: "eq11", serialNumber: "EX-017", name: "Komatsu PC210", status: "active" }], certifications: [{ name: "Excavator Operation", validUntil: "Jun 2025", status: "valid" }], stats: { totalHours: 780, equipmentOperated: 2, activitiesCompleted: 156 }, reportsTo: "SUP-002" },
  { id: "SUP-002", name: "Deepak Joshi", email: "deepak.joshi@company.com", phone: "+91 98765 12346", role: "supervisor", status: "active", employeeId: "EMP-2045", joinDate: "Aug 20, 2019", site: "Site B - Pune", client: "L&T Construction", assignedEquipment: [], certifications: [{ name: "Site Supervisor", validUntil: "Sep 2025", status: "valid" }], stats: { serviceRequests: 98, activitiesCompleted: 1870 }, team: ["OP-007", "OP-008", "OP-009", "OP-010", "OP-011", "OP-012"] },
  { id: "TECH-003", name: "Suresh Kumar", email: "suresh.kumar@company.com", phone: "+91 98765 54322", role: "technician", status: "active", employeeId: "EMP-2890", joinDate: "May 10, 2021", site: "Site B - Pune", client: "L&T Construction", assignedEquipment: [], certifications: [{ name: "Komatsu Certified", validUntil: "Aug 2025", status: "valid" }], stats: { serviceRequests: 167, activitiesCompleted: 334 }, reportsTo: "MM-001" },
  { id: "OP-013", name: "Arun Kumar", email: "arun.kumar@company.com", phone: "+91 98765 43320", role: "operator", status: "active", employeeId: "EMP-3601", joinDate: "May 15, 2023", site: "Site C - Sector 1", client: "Reliance Infra", shift: "Day", assignedEquipment: [{ id: "eq12", serialNumber: "EX-020", name: "CAT 336F", status: "active" }], certifications: [{ name: "Excavator Operation", validUntil: "Jun 2025", status: "valid" }], stats: { totalHours: 720, equipmentOperated: 3, activitiesCompleted: 144 }, reportsTo: "SUP-003" },
  { id: "OP-014", name: "Vikas Pandey", email: "vikas.pandey@company.com", phone: "+91 98765 43330", role: "operator", status: "active", employeeId: "EMP-3612", joinDate: "Jun 1, 2023", site: "Site C - Sector 2", client: "Reliance Infra", shift: "Evening", assignedEquipment: [{ id: "eq13", serialNumber: "EX-021", name: "CAT 349F", status: "active" }], certifications: [{ name: "Excavator Operation", validUntil: "Jul 2025", status: "valid" }], stats: { totalHours: 680, equipmentOperated: 2, activitiesCompleted: 136 }, reportsTo: "SUP-003" },
  { id: "OP-015", name: "Rohit Chauhan", email: "rohit.chauhan@company.com", phone: "+91 98765 43340", role: "operator", status: "active", employeeId: "EMP-3623", joinDate: "Jun 15, 2023", site: "Site C - Sector 1", client: "Reliance Infra", shift: "Night", assignedEquipment: [{ id: "eq14", serialNumber: "DT-010", name: "CAT 773G", status: "active" }], certifications: [{ name: "Dump Truck Operation", validUntil: "Aug 2025", status: "valid" }], stats: { totalHours: 640, equipmentOperated: 2, activitiesCompleted: 128 }, reportsTo: "SUP-003" },
  { id: "OP-016", name: "Naveen Reddy", email: "naveen.reddy@company.com", phone: "+91 98765 43350", role: "operator", status: "on_leave", employeeId: "EMP-3634", joinDate: "Jul 1, 2023", site: "Site C - Sector 2", client: "Reliance Infra", shift: "Day", assignedEquipment: [{ id: "eq15", serialNumber: "DZ-001", name: "CAT D8T Dozer", status: "idle" }], certifications: [{ name: "Dozer Operation", validUntil: "Sep 2025", status: "valid" }], stats: { totalHours: 560, equipmentOperated: 2, activitiesCompleted: 112 }, reportsTo: "SUP-003" },
  { id: "OP-017", name: "Karthik Nair", email: "karthik.nair@company.com", phone: "+91 98765 43355", role: "operator", status: "active", employeeId: "EMP-3645", joinDate: "Jul 15, 2023", site: "Site C - Sector 3", client: "Reliance Infra", shift: "Day", assignedEquipment: [{ id: "eq16", serialNumber: "EX-022", name: "CAT 352F", status: "active" }], certifications: [{ name: "Excavator Operation", validUntil: "Oct 2025", status: "valid" }], stats: { totalHours: 520, equipmentOperated: 2, activitiesCompleted: 104 }, reportsTo: "SUP-003" },
  { id: "SUP-003", name: "Rakesh Singh", email: "rakesh.singh@company.com", phone: "+91 98765 12350", role: "supervisor", status: "active", employeeId: "EMP-2156", joinDate: "Nov 15, 2019", site: "Site C - Delhi", client: "Reliance Infra", assignedEquipment: [], certifications: [{ name: "Site Supervisor", validUntil: "Dec 2025", status: "valid" }], stats: { serviceRequests: 78, activitiesCompleted: 1450 }, team: ["OP-013", "OP-014", "OP-015", "OP-016", "OP-017"] },
  { id: "TECH-004", name: "Kiran Patil", email: "kiran.patil@company.com", phone: "+91 98765 54340", role: "technician", status: "active", employeeId: "EMP-2912", joinDate: "Jun 20, 2021", site: "Site C - Delhi", client: "Reliance Infra", assignedEquipment: [], certifications: [{ name: "CAT Certified", validUntil: "Sep 2025", status: "valid" }], stats: { serviceRequests: 145, activitiesCompleted: 290 }, reportsTo: "MM-001" },
  { id: "OP-018", name: "Girish Nair", email: "girish.nair@company.com", phone: "+91 98765 43360", role: "operator", status: "active", employeeId: "EMP-3701", joinDate: "Aug 1, 2023", site: "Site D - Tower A", client: "Shapoorji Pallonji", shift: "Day", assignedEquipment: [{ id: "eq17", serialNumber: "EX-025", name: "Volvo EC210", status: "active" }], certifications: [{ name: "Excavator Operation", validUntil: "Oct 2025", status: "valid" }], stats: { totalHours: 480, equipmentOperated: 2, activitiesCompleted: 96 }, reportsTo: "SUP-004" },
  { id: "OP-019", name: "Prasad Menon", email: "prasad.menon@company.com", phone: "+91 98765 43370", role: "operator", status: "active", employeeId: "EMP-3712", joinDate: "Aug 15, 2023", site: "Site D - Tower B", client: "Shapoorji Pallonji", shift: "Evening", assignedEquipment: [{ id: "eq18", serialNumber: "EX-026", name: "Volvo EC220", status: "active" }], certifications: [{ name: "Excavator Operation", validUntil: "Nov 2025", status: "valid" }], stats: { totalHours: 440, equipmentOperated: 2, activitiesCompleted: 88 }, reportsTo: "SUP-004" },
  { id: "OP-020", name: "Anand Rao", email: "anand.rao@company.com", phone: "+91 98765 43380", role: "operator", status: "active", employeeId: "EMP-3723", joinDate: "Sep 1, 2023", site: "Site D - Tower A", client: "Shapoorji Pallonji", shift: "Night", assignedEquipment: [{ id: "eq19", serialNumber: "CR-005", name: "Terex AC 100", status: "active" }], certifications: [{ name: "Crane Operation", validUntil: "Dec 2025", status: "valid" }], stats: { totalHours: 380, equipmentOperated: 1, activitiesCompleted: 76 }, reportsTo: "SUP-004" },
  { id: "OP-021", name: "Suresh Iyer", email: "suresh.iyer@company.com", phone: "+91 98765 43390", role: "operator", status: "active", employeeId: "EMP-3734", joinDate: "Sep 15, 2023", site: "Site D - Tower B", client: "Shapoorji Pallonji", shift: "Day", assignedEquipment: [{ id: "eq20", serialNumber: "LD-010", name: "JCB 3DX Loader", status: "active" }], certifications: [{ name: "Loader Operation", validUntil: "Jan 2026", status: "valid" }], stats: { totalHours: 340, equipmentOperated: 2, activitiesCompleted: 68 }, reportsTo: "SUP-004" },
  { id: "OP-022", name: "Harish Kumar", email: "harish.kumar@company.com", phone: "+91 98765 43395", role: "operator", status: "active", employeeId: "EMP-3745", joinDate: "Oct 1, 2023", site: "Site D - Tower C", client: "Shapoorji Pallonji", shift: "Day", assignedEquipment: [{ id: "eq21", serialNumber: "EX-027", name: "Volvo EC250", status: "active" }], certifications: [{ name: "Excavator Operation", validUntil: "Feb 2026", status: "valid" }], stats: { totalHours: 300, equipmentOperated: 1, activitiesCompleted: 60 }, reportsTo: "SUP-004" },
  { id: "SUP-004", name: "Mohan Krishnan", email: "mohan.krishnan@company.com", phone: "+91 98765 12360", role: "supervisor", status: "active", employeeId: "EMP-2267", joinDate: "Feb 10, 2020", site: "Site D - Bangalore", client: "Shapoorji Pallonji", assignedEquipment: [], certifications: [{ name: "Site Supervisor", validUntil: "Mar 2026", status: "valid" }], stats: { serviceRequests: 56, activitiesCompleted: 1120 }, team: ["OP-018", "OP-019", "OP-020", "OP-021", "OP-022"] },
  { id: "TECH-005", name: "Vijay Kumar", email: "vijay.kumar@company.com", phone: "+91 98765 54350", role: "technician", status: "active", employeeId: "EMP-2945", joinDate: "Jul 15, 2021", site: "Site D - Bangalore", client: "Shapoorji Pallonji", assignedEquipment: [], certifications: [{ name: "Volvo Certified", validUntil: "Oct 2025", status: "valid" }], stats: { serviceRequests: 112, activitiesCompleted: 224 }, reportsTo: "MM-001" },
  { id: "OP-023", name: "Senthil Kumar", email: "senthil.kumar@company.com", phone: "+91 98765 43400", role: "operator", status: "active", employeeId: "EMP-3801", joinDate: "Oct 15, 2023", site: "Site E - Phase 1", client: "Adani Group", shift: "Day", assignedEquipment: [{ id: "eq22", serialNumber: "EX-030", name: "Hyundai HX220", status: "active" }], certifications: [{ name: "Excavator Operation", validUntil: "Nov 2025", status: "valid" }], stats: { totalHours: 260, equipmentOperated: 1, activitiesCompleted: 52 }, reportsTo: "SUP-005" },
  { id: "OP-024", name: "Murugan S", email: "murugan.s@company.com", phone: "+91 98765 43410", role: "operator", status: "active", employeeId: "EMP-3812", joinDate: "Nov 1, 2023", site: "Site E - Phase 2", client: "Adani Group", shift: "Evening", assignedEquipment: [{ id: "eq23", serialNumber: "EX-031", name: "Hyundai HX260", status: "active" }], certifications: [{ name: "Excavator Operation", validUntil: "Dec 2025", status: "valid" }], stats: { totalHours: 220, equipmentOperated: 1, activitiesCompleted: 44 }, reportsTo: "SUP-005" },
  { id: "OP-025", name: "Balaji R", email: "balaji.r@company.com", phone: "+91 98765 43420", role: "operator", status: "active", employeeId: "EMP-3823", joinDate: "Nov 15, 2023", site: "Site E - Phase 1", client: "Adani Group", shift: "Night", assignedEquipment: [{ id: "eq24", serialNumber: "LD-015", name: "Hyundai HL760", status: "active" }], certifications: [{ name: "Loader Operation", validUntil: "Jan 2026", status: "valid" }], stats: { totalHours: 180, equipmentOperated: 1, activitiesCompleted: 36 }, reportsTo: "SUP-005" },
  { id: "OP-026", name: "Venkat N", email: "venkat.n@company.com", phone: "+91 98765 43430", role: "operator", status: "active", employeeId: "EMP-3834", joinDate: "Dec 1, 2023", site: "Site E - Phase 2", client: "Adani Group", shift: "Day", assignedEquipment: [{ id: "eq25", serialNumber: "DT-020", name: "Tata Prima 2530", status: "active" }], certifications: [{ name: "Dump Truck Operation", validUntil: "Feb 2026", status: "valid" }], stats: { totalHours: 140, equipmentOperated: 1, activitiesCompleted: 28 }, reportsTo: "SUP-005" },
  { id: "SUP-005", name: "Arjun Raman", email: "arjun.raman@company.com", phone: "+91 98765 12370", role: "supervisor", status: "active", employeeId: "EMP-2378", joinDate: "May 10, 2020", site: "Site E - Chennai", client: "Adani Group", assignedEquipment: [], certifications: [{ name: "Site Supervisor", validUntil: "Jun 2026", status: "valid" }], stats: { serviceRequests: 34, activitiesCompleted: 680 }, team: ["OP-023", "OP-024", "OP-025", "OP-026"] },
  { id: "TECH-006", name: "Praveen Kumar", email: "praveen.kumar@company.com", phone: "+91 98765 54360", role: "technician", status: "active", employeeId: "EMP-2978", joinDate: "Aug 20, 2021", site: "Site E - Chennai", client: "Adani Group", assignedEquipment: [], certifications: [{ name: "Hyundai Certified", validUntil: "Nov 2025", status: "valid" }], stats: { serviceRequests: 89, activitiesCompleted: 178 }, reportsTo: "MM-001" },
  { id: "MM-001", name: "Anil Sharma", email: "anil.sharma@company.com", phone: "+91 98765 67890", role: "maintenance_manager", status: "active", employeeId: "EMP-1456", joinDate: "Jan 5, 2017", site: "All Sites", client: "Corporate", assignedEquipment: [], certifications: [{ name: "Maintenance Management", validUntil: "Dec 2025", status: "valid" }], stats: { serviceRequests: 567, activitiesCompleted: 1234 }, team: ["TECH-001", "TECH-002", "TECH-003", "TECH-004", "TECH-005", "TECH-006"] },
  { id: "FM-001", name: "Neha Gupta", email: "neha.gupta@company.com", phone: "+91 98765 78901", role: "fleet_manager", status: "active", employeeId: "EMP-1678", joinDate: "May 18, 2018", site: "All Sites", client: "Corporate", assignedEquipment: [], certifications: [{ name: "Fleet Management", validUntil: "Nov 2025", status: "valid" }], stats: { serviceRequests: 89, activitiesCompleted: 456 } },
  { id: "IM-001", name: "Pooja Reddy", email: "pooja.reddy@company.com", phone: "+91 98765 89012", role: "inventory_manager", status: "active", employeeId: "EMP-2012", joinDate: "Oct 3, 2019", site: "Central Warehouse", client: "Corporate", assignedEquipment: [], certifications: [{ name: "Inventory Management", validUntil: "Aug 2025", status: "valid" }], stats: { serviceRequests: 312, activitiesCompleted: 678 } },
];

const clients = ["All", "Tata Projects", "L&T Construction", "Reliance Infra", "Shapoorji Pallonji", "Adani Group", "Corporate"];

const roleLabels: Record<string, string> = { operator: "Operator", supervisor: "Supervisor", technician: "Technician", maintenance_manager: "Maintenance Mgr", fleet_manager: "Fleet Manager", inventory_manager: "Inventory Mgr" };
const roleColors: Record<string, string> = { operator: "bg-blue-100 text-blue-700", supervisor: "bg-purple-100 text-purple-700", technician: "bg-amber-100 text-amber-700", maintenance_manager: "bg-green-100 text-green-700", fleet_manager: "bg-teal-100 text-teal-700", inventory_manager: "bg-indigo-100 text-indigo-700" };
const statusColors: Record<string, string> = { active: "bg-green-100 text-green-700", inactive: "bg-gray-100 text-gray-600", on_leave: "bg-amber-100 text-amber-700" };
const statusLabels: Record<string, string> = { active: "Active", inactive: "Inactive", on_leave: "On Leave" };

export default function UsersTab() {
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [clientFilter, setClientFilter] = useState<string>("All");

  const filteredUsers = usersData.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase()) || user.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesClient = clientFilter === "All" || user.client === clientFilter;
    return matchesSearch && matchesRole && matchesStatus && matchesClient;
  });

  const totalOperators = usersData.filter((u) => u.role === "operator").length;
  const totalSupervisors = usersData.filter((u) => u.role === "supervisor").length;
  const totalTechnicians = usersData.filter((u) => u.role === "technician").length;
  const totalActive = usersData.filter((u) => u.status === "active").length;

  if (selectedUser) {
    return <UserDetail user={selectedUser} onBack={() => setSelectedUser(null)} allUsers={usersData} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Users</h2>
          <p className="text-gray-500">{usersData.length} team members across {clients.length - 1} clients</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <Upload size={16} /> Import
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <Download size={16} /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
            <Plus size={18} /> Add User
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center"><Users size={20} className="text-gray-600" /></div><div><p className="text-2xl font-bold text-gray-900">{usersData.length}</p><p className="text-sm text-gray-500">Total Users</p></div></div></div>
        <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><Truck size={20} className="text-blue-600" /></div><div><p className="text-2xl font-bold text-gray-900">{totalOperators}</p><p className="text-sm text-gray-500">Operators</p></div></div></div>
        <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"><Shield size={20} className="text-purple-600" /></div><div><p className="text-2xl font-bold text-gray-900">{totalSupervisors}</p><p className="text-sm text-gray-500">Supervisors</p></div></div></div>
        <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center"><Wrench size={20} className="text-amber-600" /></div><div><p className="text-2xl font-bold text-gray-900">{totalTechnicians}</p><p className="text-sm text-gray-500">Technicians</p></div></div></div>
        <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"><Activity size={20} className="text-green-600" /></div><div><p className="text-2xl font-bold text-gray-900">{totalActive}</p><p className="text-sm text-gray-500">Active Now</p></div></div></div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search by name, email, or employee ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent" />
        </div>
        <div className="flex gap-2 flex-wrap">
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent">
            <option value="all">All Roles</option>
            <option value="operator">Operators</option>
            <option value="supervisor">Supervisors</option>
            <option value="technician">Technicians</option>
            <option value="maintenance_manager">Managers</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="on_leave">On Leave</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Employee</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Role</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">
                  <select value={clientFilter} onChange={(e) => setClientFilter(e.target.value)} className="bg-transparent text-xs font-semibold text-gray-500 uppercase focus:outline-none cursor-pointer hover:text-accent">
                    {clients.map(c => <option key={c} value={c}>{c === "All" ? "Client ▼" : c}</option>)}
                  </select>
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Site</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Shift</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Equipment</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Contact</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} onClick={() => setSelectedUser(user)} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="py-3 px-4"><div className="flex items-center gap-3"><div className="w-8 h-8 bg-accent-light rounded-full flex items-center justify-center flex-shrink-0"><span className="text-accent font-medium text-sm">{user.name.charAt(0)}</span></div><div className="min-w-0"><p className="font-medium text-gray-900 text-sm truncate">{user.name}</p><p className="text-xs text-gray-500">{user.employeeId}</p></div></div></td>
                  <td className="py-3 px-4"><span className={`px-2 py-1 text-xs font-medium rounded ${roleColors[user.role]}`}>{roleLabels[user.role]}</span></td>
                  <td className="py-3 px-4"><span className="text-sm text-gray-700">{user.client}</span></td>
                  <td className="py-3 px-4"><span className="text-sm text-gray-600">{user.site}</span></td>
                  <td className="py-3 px-4"><span className="text-sm text-gray-600">{user.shift || "-"}</span></td>
                  <td className="py-3 px-4">{user.assignedEquipment.length > 0 ? (<div className="flex flex-wrap gap-1">{user.assignedEquipment.slice(0, 2).map((eq) => (<span key={eq.id} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">{eq.serialNumber}</span>))}{user.assignedEquipment.length > 2 && (<span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded">+{user.assignedEquipment.length - 2}</span>)}</div>) : (<span className="text-xs text-gray-400">-</span>)}</td>
                  <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}><div className="flex items-center gap-2"><a href={`tel:${user.phone}`} className="p-1.5 bg-gray-100 rounded hover:bg-accent-light hover:text-accent transition-colors"><Phone size={12} /></a><a href={`mailto:${user.email}`} className="p-1.5 bg-gray-100 rounded hover:bg-accent-light hover:text-accent transition-colors"><Mail size={12} /></a></div></td>
                  <td className="py-3 px-4"><span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[user.status]}`}>{statusLabels[user.status]}</span></td>
                  <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 text-gray-400 hover:text-accent hover:bg-accent-light rounded transition-colors" title="Edit">
                        <Pencil size={14} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 && (<div className="text-center py-12 text-gray-500"><Users size={48} className="mx-auto mb-4 text-gray-300" /><p>No users found matching your criteria</p></div>)}
      </div>
      <div className="text-sm text-gray-500 text-right">Showing {filteredUsers.length} of {usersData.length} users</div>
    </div>
  );
}

// Activity Log Data
const activityLogData: Record<string, { id: string; date: string; equipment: string; site: string; startTime: string; endTime: string; duration: string; hoursLogged: number; fuelUsed: number }[]> = {
  "OP-001": [
    { id: "ACT-001", date: "2024-12-03", equipment: "EX-001 (CAT 320D)", site: "Site A - Block 3", startTime: "06:00 AM", endTime: "02:30 PM", duration: "8h 30m", hoursLogged: 8.5, fuelUsed: 45 },
    { id: "ACT-002", date: "2024-12-02", equipment: "EX-001 (CAT 320D)", site: "Site A - Block 3", startTime: "06:15 AM", endTime: "02:00 PM", duration: "7h 45m", hoursLogged: 7.75, fuelUsed: 42 },
    { id: "ACT-003", date: "2024-12-01", equipment: "EX-015 (Komatsu PC200)", site: "Site A - Block 2", startTime: "07:00 AM", endTime: "03:30 PM", duration: "8h 30m", hoursLogged: 8.5, fuelUsed: 48 },
    { id: "ACT-004", date: "2024-11-30", equipment: "EX-001 (CAT 320D)", site: "Site A - Block 3", startTime: "06:00 AM", endTime: "02:15 PM", duration: "8h 15m", hoursLogged: 8.25, fuelUsed: 44 },
    { id: "ACT-005", date: "2024-11-29", equipment: "LD-003 (CAT 950H Loader)", site: "Site A - Block 1", startTime: "06:30 AM", endTime: "01:30 PM", duration: "7h", hoursLogged: 7, fuelUsed: 38 },
    { id: "ACT-006", date: "2024-11-28", equipment: "EX-001 (CAT 320D)", site: "Site A - Block 3", startTime: "06:00 AM", endTime: "02:45 PM", duration: "8h 45m", hoursLogged: 8.75, fuelUsed: 46 },
    { id: "ACT-007", date: "2024-11-27", equipment: "EX-015 (Komatsu PC200)", site: "Site A - Block 2", startTime: "07:15 AM", endTime: "03:00 PM", duration: "7h 45m", hoursLogged: 7.75, fuelUsed: 41 },
    { id: "ACT-008", date: "2024-11-26", equipment: "EX-001 (CAT 320D)", site: "Site A - Block 3", startTime: "06:00 AM", endTime: "02:30 PM", duration: "8h 30m", hoursLogged: 8.5, fuelUsed: 45 },
  ],
};

// Service Request Data
const serviceRequestData: Record<string, { id: string; date: string; equipment: string; type: string; priority: "low" | "medium" | "high" | "critical"; status: "pending" | "in_progress" | "resolved"; title: string; description: string }[]> = {
  "OP-001": [
    { id: "SR-001", date: "2024-12-01", equipment: "EX-001", type: "Breakdown", priority: "critical", status: "in_progress", title: "Engine overheating issue", description: "Engine temperature rising rapidly during operation" },
    { id: "SR-002", date: "2024-11-28", equipment: "EX-015", type: "Repair", priority: "high", status: "pending", title: "Hydraulic leak on boom cylinder", description: "Visible hydraulic fluid leak from the boom cylinder seal" },
    { id: "SR-003", date: "2024-11-20", equipment: "EX-001", type: "Preventive Maintenance", priority: "medium", status: "resolved", title: "500-hour service completed", description: "Scheduled 500-hour service including oil change and filter replacements" },
    { id: "SR-004", date: "2024-11-15", equipment: "LD-003", type: "Parts Replacement", priority: "medium", status: "resolved", title: "Bucket teeth replacement", description: "Worn bucket teeth replaced with new ones" },
    { id: "SR-005", date: "2024-11-10", equipment: "EX-001", type: "Inspection", priority: "low", status: "resolved", title: "Annual safety inspection", description: "Comprehensive annual safety inspection completed" },
    { id: "SR-006", date: "2024-11-05", equipment: "EX-015", type: "Repair", priority: "high", status: "resolved", title: "Track tension adjustment", description: "Track tension was too loose, adjusted to proper specs" },
  ],
};

function UserDetail({ user, onBack, allUsers }: { user: UserData; onBack: () => void; allUsers: UserData[] }) {
  const [activeTab, setActiveTab] = useState<"overview" | "activity" | "service">("overview");
  const supervisor = user.reportsTo ? allUsers.find((u) => u.id === user.reportsTo) : null;
  const teamMembers = user.team ? allUsers.filter((u) => user.team?.includes(u.id)) : [];
  const userActivities = activityLogData[user.id] || [];
  const userServiceRequests = serviceRequestData[user.id] || [];

  const priorityColors: Record<string, string> = { low: "bg-gray-100 text-gray-700", medium: "bg-blue-100 text-blue-700", high: "bg-amber-100 text-amber-700", critical: "bg-red-100 text-red-700" };
  const srStatusColors: Record<string, string> = { pending: "bg-gray-100 text-gray-600", in_progress: "bg-blue-100 text-blue-700", resolved: "bg-green-100 text-green-700" };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4"><button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><ArrowLeft size={20} className="text-gray-600" /></button><div><h2 className="text-2xl font-bold text-gray-900">{user.name}</h2><p className="text-gray-500">{roleLabels[user.role]} • {user.employeeId} • {user.client}</p></div></div>
      
      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-1 flex gap-1">
        <button onClick={() => setActiveTab("overview")} className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${activeTab === "overview" ? "bg-accent text-white" : "text-gray-600 hover:bg-gray-100"}`}>Overview</button>
        <button onClick={() => setActiveTab("activity")} className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${activeTab === "activity" ? "bg-accent text-white" : "text-gray-600 hover:bg-gray-100"}`}>Activity Log ({userActivities.length})</button>
        <button onClick={() => setActiveTab("service")} className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${activeTab === "service" ? "bg-accent text-white" : "text-gray-600 hover:bg-gray-100"}`}>Service Requests ({userServiceRequests.length})</button>
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6"><div className="flex items-start gap-4"><div className="w-20 h-20 bg-accent-light rounded-xl flex items-center justify-center"><span className="text-accent font-bold text-3xl">{user.name.charAt(0)}</span></div><div className="flex-1"><div className="flex items-center gap-3 mb-2"><h3 className="text-xl font-semibold text-gray-900">{user.name}</h3><span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[user.status]}`}>{statusLabels[user.status]}</span></div><div className="flex items-center gap-2 mb-3"><span className={`px-2 py-1 text-xs font-medium rounded ${roleColors[user.role]}`}>{roleLabels[user.role]}</span>{user.shift && (<span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-600">{user.shift}</span>)}</div><div className="grid grid-cols-2 gap-4 text-sm"><div className="flex items-center gap-2 text-gray-600"><Mail size={14} className="text-gray-400" /><a href={`mailto:${user.email}`} className="hover:text-accent">{user.email}</a></div><div className="flex items-center gap-2 text-gray-600"><Phone size={14} className="text-gray-400" /><a href={`tel:${user.phone}`} className="hover:text-accent">{user.phone}</a></div><div className="flex items-center gap-2 text-gray-600"><MapPin size={14} className="text-gray-400" /><span>{user.site}</span></div><div className="flex items-center gap-2 text-gray-600"><Calendar size={14} className="text-gray-400" /><span>Joined {user.joinDate}</span></div></div></div></div></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{user.stats.totalHours !== undefined && (<div className="bg-white rounded-xl border border-gray-200 p-4"><p className="text-sm text-gray-500">Total Hours</p><p className="text-2xl font-bold text-gray-900">{user.stats.totalHours.toLocaleString()}</p></div>)}{user.stats.equipmentOperated !== undefined && (<div className="bg-white rounded-xl border border-gray-200 p-4"><p className="text-sm text-gray-500">Equipment</p><p className="text-2xl font-bold text-gray-900">{user.stats.equipmentOperated}</p></div>)}{user.stats.activitiesCompleted !== undefined && (<div className="bg-white rounded-xl border border-gray-200 p-4"><p className="text-sm text-gray-500">Activities</p><p className="text-2xl font-bold text-gray-900">{user.stats.activitiesCompleted.toLocaleString()}</p></div>)}{user.stats.serviceRequests !== undefined && (<div className="bg-white rounded-xl border border-gray-200 p-4"><p className="text-sm text-gray-500">Service Requests</p><p className="text-2xl font-bold text-gray-900">{user.stats.serviceRequests}</p></div>)}</div>
            {user.assignedEquipment.length > 0 && (<div className="bg-white rounded-xl border border-gray-200 p-6"><h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><Truck size={18} className="text-accent" />Assigned Equipment ({user.assignedEquipment.length})</h4><div className="space-y-3">{user.assignedEquipment.map((eq) => (<div key={eq.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-accent-light rounded-lg flex items-center justify-center"><Truck size={18} className="text-accent" /></div><div><p className="font-medium text-gray-900">{eq.serialNumber}</p><p className="text-sm text-gray-500">{eq.name}</p></div></div><span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${eq.status === "active" ? "bg-green-100 text-green-700" : eq.status === "idle" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>{eq.status}</span></div>))}</div></div>)}
            {teamMembers.length > 0 && (<div className="bg-white rounded-xl border border-gray-200 p-6"><h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><Users size={18} className="text-accent" />Team Members ({teamMembers.length})</h4><div className="space-y-3">{teamMembers.map((member) => (<div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-accent-light rounded-full flex items-center justify-center"><span className="text-accent font-medium">{member.name.charAt(0)}</span></div><div><p className="font-medium text-gray-900">{member.name}</p><p className="text-sm text-gray-500">{roleLabels[member.role]}</p></div></div><span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[member.status]}`}>{statusLabels[member.status]}</span></div>))}</div></div>)}
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-4"><h4 className="text-sm font-semibold text-gray-500 mb-3">Client</h4><div className="flex items-center gap-3"><div className="w-10 h-10 bg-accent-light rounded-lg flex items-center justify-center"><Building size={18} className="text-accent" /></div><div><p className="font-medium text-gray-900">{user.client}</p><p className="text-xs text-gray-500">{user.site}</p></div></div></div>
            {supervisor && (<div className="bg-white rounded-xl border border-gray-200 p-4"><h4 className="text-sm font-semibold text-gray-500 mb-3">Reports To</h4><div className="flex items-center gap-3"><div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center"><span className="text-purple-700 font-medium">{supervisor.name.charAt(0)}</span></div><div><p className="font-medium text-gray-900">{supervisor.name}</p><p className="text-xs text-gray-500">{roleLabels[supervisor.role]}</p></div></div><div className="flex items-center gap-2 mt-3"><a href={`tel:${supervisor.phone}`} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-accent-light hover:text-accent transition-colors"><Phone size={14} />Call</a><a href={`mailto:${supervisor.email}`} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-accent-light hover:text-accent transition-colors"><Mail size={14} />Email</a></div></div>)}
            <div className="bg-white rounded-xl border border-gray-200 p-4"><h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><Award size={18} className="text-accent" />Certifications</h4><div className="space-y-3">{user.certifications.map((cert, idx) => (<div key={idx} className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-900">{cert.name}</p><p className="text-xs text-gray-500">Valid until {cert.validUntil}</p></div><span className={`px-2 py-1 text-xs font-medium rounded-full ${cert.status === "valid" ? "bg-green-100 text-green-700" : cert.status === "expiring" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>{cert.status === "valid" ? "Valid" : cert.status === "expiring" ? "Expiring" : "Expired"}</span></div>))}</div></div>
            <div className="bg-white rounded-xl border border-gray-200 p-4"><h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4><div className="space-y-2"><button onClick={() => setActiveTab("activity")} className="w-full flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-accent-light hover:text-accent transition-colors"><Activity size={16} />View Activity Log</button><button onClick={() => setActiveTab("service")} className="w-full flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-accent-light hover:text-accent transition-colors"><Wrench size={16} />View Service Requests</button></div></div>
          </div>
        </div>
      )}

      {activeTab === "activity" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-gray-500 mb-1"><Activity size={16} /><span className="text-sm">Total Activities</span></div><p className="text-2xl font-bold text-gray-900">{userActivities.length}</p></div>
            <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-gray-500 mb-1"><Clock size={16} /><span className="text-sm">Hours This Week</span></div><p className="text-2xl font-bold text-gray-900">{userActivities.slice(0, 5).reduce((sum, a) => sum + a.hoursLogged, 0).toFixed(1)}</p></div>
            <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-gray-500 mb-1"><Fuel size={16} /><span className="text-sm">Fuel This Week</span></div><p className="text-2xl font-bold text-gray-900">{userActivities.slice(0, 5).reduce((sum, a) => sum + a.fuelUsed, 0)} L</p></div>
            <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-gray-500 mb-1"><Truck size={16} /><span className="text-sm">Equipment Used</span></div><p className="text-2xl font-bold text-gray-900">{new Set(userActivities.map(a => a.equipment.split(" ")[0])).size}</p></div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200"><h4 className="font-semibold text-gray-900 flex items-center gap-2"><Activity size={18} className="text-accent" />Activity Log</h4></div>
            <table className="w-full">
              <thead className="bg-gray-50"><tr><th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Date</th><th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Equipment</th><th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Site</th><th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Time</th><th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Duration</th><th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Fuel</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {userActivities.length === 0 ? (<tr><td colSpan={6} className="py-8 text-center text-gray-500">No activity logs found</td></tr>) : userActivities.map((act) => (
                  <tr key={act.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{act.date}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{act.equipment}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{act.site}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{act.startTime} - {act.endTime}</td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{act.duration}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{act.fuelUsed} L</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "service" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-gray-500 mb-1"><Wrench size={16} /><span className="text-sm">Total Requests</span></div><p className="text-2xl font-bold text-gray-900">{userServiceRequests.length}</p></div>
            <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-amber-500 mb-1"><AlertCircle size={16} /><span className="text-sm">Pending</span></div><p className="text-2xl font-bold text-gray-900">{userServiceRequests.filter(sr => sr.status === "pending").length}</p></div>
            <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-blue-500 mb-1"><Clock size={16} /><span className="text-sm">In Progress</span></div><p className="text-2xl font-bold text-gray-900">{userServiceRequests.filter(sr => sr.status === "in_progress").length}</p></div>
            <div className="bg-white rounded-xl border border-gray-200 p-4"><div className="flex items-center gap-2 text-green-500 mb-1"><CheckCircle size={16} /><span className="text-sm">Resolved</span></div><p className="text-2xl font-bold text-gray-900">{userServiceRequests.filter(sr => sr.status === "resolved").length}</p></div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200"><h4 className="font-semibold text-gray-900 flex items-center gap-2"><Wrench size={18} className="text-accent" />Service Requests</h4></div>
            <div className="divide-y divide-gray-100">
              {userServiceRequests.length === 0 ? (<div className="py-8 text-center text-gray-500">No service requests found</div>) : userServiceRequests.map((sr) => (
                <div key={sr.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div><p className="font-medium text-gray-900">{sr.title}</p><p className="text-sm text-gray-500">{sr.id} • {sr.equipment} • {sr.date}</p></div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${priorityColors[sr.priority]}`}>{sr.priority}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${srStatusColors[sr.status]}`}>{sr.status.replace("_", " ")}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{sr.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500"><span className="px-2 py-0.5 bg-gray-100 rounded">{sr.type}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
