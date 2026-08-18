import { useEffect, useState } from "react";
import {
  Bell,
  CircleHelp,
  LogOut,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", isDark);

    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((current) => !current);
  };

  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center border-b bg-background/95 backdrop-blur">
      {/* Left */}
      <div className="flex h-full items-center gap-3 px-4">
        <SidebarTrigger />

        <div className="hidden h-5 w-px bg-border sm:block" />

        <div className="flex flex-col">
          <span className="text-sm font-semibold">Analytics Dashboard</span>

          <span className="hidden text-xs text-muted-foreground sm:block">
            Overview
          </span>
        </div>
      </div>

      <div className="flex-1" />

      {/* Right */}
      <div className="flex items-center gap-1 px-4">
        {/* Theme */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title="theme"
        >
          {isDark ? <Sun /> : <Moon />}
        </Button>

        {/* Notification */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell />
        </Button>

        {/* Help */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden sm:inline-flex"
          aria-label="Help"
          title="help"
        >
          <CircleHelp />
        </Button>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="ml-1 h-9 gap-2 px-2">
              <Avatar className="size-7">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>

              <div className="hidden text-left lg:block">
                <p className="text-sm font-medium">User</p>

                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <User />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Settings />
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
