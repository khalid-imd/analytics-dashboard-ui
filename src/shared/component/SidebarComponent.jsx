import { useRef, useState } from "react";
import {
  Activity,
  ChevronDown,
  Clock,
  Database,
  FileText,
  LogOut,
  Settings,
  Target,
  LayoutDashboard,
  Users,
  Wallet,
  Search,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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

// ========================================
// MAIN
// ========================================

export default function SidebarComponent() {
  return (
    <SidebarProvider>
      <SidebarGesture />
      <AppSidebar />
      <SidebarTrigger />
    </SidebarProvider>
  );
}

// ========================================
// SIDEBAR GESTURE
// ========================================

function SidebarGesture() {
  const { isMobile, openMobile, setOpenMobile } = useSidebar();

  const startX = useRef(0);

  const handlePointerDown = (e) => {
    // Hanya aktif di mobile
    if (!isMobile) {
      return;
    }

    startX.current = e.clientX;
  };

  const handlePointerUp = (e) => {
    if (!isMobile) {
      return;
    }

    const endX = e.clientX;
    const distance = endX - startX.current;

    // Swipe kanan → buka
    if (distance > 80 && !openMobile) {
      setOpenMobile(true);
    }

    // Swipe kiri → tutup
    if (distance < -80 && openMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-0 touch-pan-y md:hidden"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    />
  );
}

// ========================================
// SIDEBAR
// ========================================

const AppSidebar = () => {
  const [search, setSearch] = useState("");

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
                <span className="truncate font-semibold">My Application</span>

                <span className="truncate text-xs">Analytics Dashboard</span>
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
                              onClick={() => {
                                console.log("Navigate:", item.url);
                              }}
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

      {/* ========================================
          FOOTER
      ======================================== */}

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings />

              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Logout">
              <LogOut />

              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      {/* ========================================
          RAIL
      ======================================== */}

      <SidebarRail />
    </Sidebar>
  );
};
