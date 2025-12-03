# UELMS - Unified Equipment Lifecycle Management Platform

# Overview
UELMS is a comprehensive digital command center for mining equipment lifecycle management — from procurement to disposal. Built to maximize uptime, reduce maintenance costs, and optimize fleet operations.

This platform is made of the company - IIMS by CKA-Birla-Group (website - https://www.iims.net/)

About IIMS company: At IIMS, they deliver high-performance solutions for mining and construction projects across India. From equipment rentals to used machines, our offerings are built for heavy-duty demands. Their on-site support and maintenance services ensure maximum uptime and efficiency.

# Development Roadmap
We will first make Prototype only 
All the panels make will be purely for viewing purpose only


# Design Principles
- Clean and minimal
- Professional/corporate aesthetic
- Industrial/mining visual language
- Use a  #dc2626 as accent color for buttons etc.
- Make it in white these with red color to show branding.



# User Groups:
## Client Side
1. Client Admin 
2. Supervisor (can be multiple and hierarchy)
3. Operator 

## Internal Team (IIMS)
1. Admin 
2. Maintenance Manager (can be multiple levels with hierarchy)
3. Technician
4. Fleet Manager 
5. Inventory Manager

## Partner/Vendor
1. OEM 
2. Parts Vendor 
3. Service Vendor

# Apps that we have to build 
/operator
/supervisor
/admin

/technition
/maintenence_manager
/iims_admin
/inventory manager

/vendor




# Features
##Client side
### Operator App Features
Mobile Focused — Will have various tabs:
Dashboard | AI Assistant | Activity | Service Request | Profile  
Notifications can be on the top
1. **Dashboard** — All equipment/machines assigned to the operator with details (Telemetry, Activity). Users can click on a card to view the dashboard for that equipment — analytics and telemetry if available. Users will be able to view all parts, training videos, etc.
2. **AI Assistant** — Ask questions regarding the equipment
3. **Activity** — Where user will log their activity
4. **Service Request** — If there is any issue, operator can log the problem via text, audio, or video. Can also request replacement for a certain part of equipment.
5. **Profile** — Operator's own profile
6. **Notifications** — Alerts for any issues



### Client Admin Features
Desktop Focused:
1. **User Management** — Create Supervisors and Operators (multiple levels: Supervisor L1, L2, etc.)
2. **Equipment Assignment** — Assign equipment to supervisors and operators
3. **Site & Project Management** — Admin can have multiple sites, each site can have multiple projects
4. **Hierarchy Management** — Create multiple supervisor levels; each supervisor level can be assigned machines and can delegate to lower supervisors or directly to operators

### Supervisor Features
Mobile Focused (also available on desktop):
1. **Location/Project Mapping** — Each supervisor is mapped to a location or project
2. **Equipment Assignment** — Assign machines to lower-rank supervisors or operators
3. **Dashboard & Approvals** — View dashboard, activity, part issues/replacements, and profiles for each equipment. Approve requests before they go to the internal team.
4. **User Management** — Create child supervisors or operators and assign equipment to them
5. **Equipment Monitoring** — View detailed dashboard for each piece of equipment


## Internal Team (IIMS)

### IIMS_Admin Features
Desktop Focused
Admin should have various Tabs
- Equipements will be one of the tab there
Journey:
Admin will choose any of the category -> e.g escavator -> then he should be able to click on that card and select OEMs e.g JCB -> then he should be able to see all the machines there(kind of like SKUs) -> then he should be able to see all the machines with serials there -> then he should be able to see the analytics and everything for that machine 

SKU - Training, Knowledgebase, who is OEM(their POC etc
Serial number (equiment number ) - Analyics etc for that machine

### Maintenance Manager Features
Desktop Focused:
1. **Equipment Overview** — View all equipment details, where each equipment is assigned (client, site, project)
2. **Analytics Dashboard** — View analytics, telemetry, health scores, and performance metrics for all equipment
3. **Equipment Management** — Add new equipment, update equipment details, manage equipment lifecycle
4. **Service Request Management** — View incoming repair/replacement requests from clients
5. **Technician Assignment** — Assign technicians to service requests and dispatch them to sites
6. **Work Order Management** — Create, assign, and track work orders
7. **User Management** — Create lower-level Maintenance Managers and Technicians (multiple levels: MM L1, L2, etc.)
8. **Approvals** — Approve part requests, work orders, and escalations from technicians

### Technician App Features
Mobile Focused — Similar to Operator app:
1. **Dashboard** — All assigned work orders and service requests with equipment details and location
2. **Work Order Execution** — View assigned tasks, update status, log labor hours, mark completion
3. **Equipment Details** — View equipment info, parts list, maintenance history, training videos
4. **Service Logging** — Log repairs
5. **Parts Request** — Request spare parts from inventory for repairs
6. **Profile** — Technician's own profile, certifications, work history
7. **Notifications** — Alerts for new assignments, urgent requests, approvals

### Inventory Manager Features
Desktop Focused:
1. **Parts Inventory Dashboard** — View all spare parts, stock levels, warehouse locations
2. **Stock Management** — Add new parts, update quantities, set min/max levels, manage SKUs
3. **Parts Request Management** — View and fulfill parts requests from technicians and work orders
4. **Issue Parts** — Issue parts against work orders, track consumption
5. **Reorder Management** — Auto-reorder alerts when stock falls below minimum, create purchase requests
6. **Vendor Management** — Manage parts vendors, view vendor catalogs, track vendor performance
7. **Purchase Orders** — Create RFQs, compare quotes, generate POs, track deliveries
8. **GRN (Goods Received Notes)** — Log received parts, quality check, update inventory
9. **Parts Analytics** — Track consumption patterns, fast-moving parts, cost analysis
10. **Multi-Warehouse Management** — Manage stock across multiple warehouse locations
