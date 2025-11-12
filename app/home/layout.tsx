"use client";

import React from "react";
import {
	SidebarProvider,
	SidebarTrigger,
	SidebarInset,
} from "@/components/ui/sidebar";
import HomeSidebar from "./_components/HomeSidebar";
import UserNav from "./_components/UserNav";
import { Briefcase, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/user.store";

export default function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user } = useUserStore();

	const notification = 4;
	return (
		<SidebarProvider>
			<HomeSidebar />
			<SidebarInset>
				<header className="sticky top-0 z-50 w-full border-b bg-background">
					<div className=" flex h-14 items-center px-2 sm:px-6">
						<SidebarTrigger className="mr-4" />
						<div className="flex items-center space-x-4">
							<Briefcase className="h-6 w-6" />
							<span className="font-bold text-secondaryColor text-lg">
								Recruitment Placement Global
							</span>
						</div>
						<div className="ml-auto flex items-center space-x-4">
							<p>Hi!, {user?.first_name} 👋</p>
							<Button className="h-9 relative" variant="outline" size="icon">
								<Bell className="h-3 w-3" />

								<span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-mainColor text-xs text-primary-foreground">
									{notification}
								</span>
							</Button>
							<UserNav user={user} />
						</div>
					</div>
				</header>

				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
