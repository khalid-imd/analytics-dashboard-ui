import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/shared/component/Navbar";
import AppSidebar from "@/shared/component/SidebarComponent";
import SidebarGesture from "@/shared/component/SidebarGesture";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div>
      <SidebarProvider>
        <SidebarGesture />
        <AppSidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <Navbar />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
