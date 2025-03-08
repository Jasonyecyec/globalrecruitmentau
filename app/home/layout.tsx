import React from "react";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import DashboardSidebar from "./_components/DashboardSidebar";
import UserNav from "./_components/UserNav";
import {
  LayoutDashboard,
  Briefcase,
  ClipboardList,
  User,
  Settings,
} from "lucide-react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-50 w-full border-b bg-background">
          <div className="container flex h-12 items-center px-2 sm:px-6">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center space-x-4">
              {/* <Briefcase className="h-6 w-6" /> */}
              <span className="font-bold text-secondaryColor text-lg">
                Recruitment Placement Global
              </span>
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </header>

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
