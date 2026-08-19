import { useState } from "react";
import {
  Activity,
  ChevronDown,
  Clock,
  Database,
  FileText,
  Target,
  LayoutDashboard,
  Users,
  Wallet,
  Search,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useNavigate } from "react-router-dom";

export default function AppSidebar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <Sidebar collapsible="icon">
      {/* ========================================
          HEADER
      ======================================== */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip="My Application">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                K
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  Analytics Dashboard
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Search */}
        <div className="px-2 py-2 group-data-[collapsible=icon]:hidden">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <SidebarInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="pl-8"
            />
          </div>
        </div>
      </SidebarHeader>

      {/* ========================================
          CONTENT
      ======================================== */}
      <SidebarContent>
        {SIDEBAR_MENU.map((group) => {
          const filteredItems = group.items.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase()),
          );

          if (filteredItems.length === 0) {
            return null;
          }

          return (
            <Collapsible
              key={group.label}
              defaultOpen
              className="group/collapsible"
            >
              <SidebarGroup>
                <SidebarGroupLabel render={<CollapsibleTrigger />}>
                  {group.label}

                  <ChevronDown className="ml-auto transition-transform group-data-open/collapsible:rotate-180" />
                </SidebarGroupLabel>

                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {filteredItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                              tooltip={item.title}
                              onClick={() => navigate(item.url)}
                            >
                              <Icon />

                              <span>{item.title}</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          );
        })}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

// ========================================
// MENU
// ========================================
const SIDEBAR_MENU = [
  {
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        url: "/",
      },
    ],
  },
  {
    label: "Analytics",
    items: [
      {
        title: "Traffic",
        icon: Activity,
        url: "/analytics/traffic",
      },
      {
        title: "Revenue",
        icon: Wallet,
        url: "/analytics/revenue",
      },
      {
        title: "Conversions",
        icon: Target,
        url: "/analytics/conversions",
      },
    ],
  },
  {
    label: "Reports",
    items: [
      {
        title: "Saved Reports",
        icon: FileText,
        url: "/reports",
      },
      {
        title: "Scheduled",
        icon: Clock,
        url: "/reports/scheduled",
      },
    ],
  },
  {
    label: "Data",
    items: [
      {
        title: "Sources",
        icon: Database,
        url: "/data/sources",
      },
      {
        title: "Segments",
        icon: Users,
        url: "/data/segments",
      },
    ],
  },
];
