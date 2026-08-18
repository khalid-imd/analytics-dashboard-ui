import { SidebarProvider } from "./components/ui/sidebar";
import Navbar from "./shared/component/Navbar";
import AppSidebar from "./shared/component/SidebarComponent";
import SidebarGesture from "./shared/component/SidebarGesture";

function App() {
  return (
    <div>
      <SidebarProvider>
        <SidebarGesture />
        <AppSidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <Navbar />
          <main className="flex-1 p-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}

export default App;
