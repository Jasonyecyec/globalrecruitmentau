"use client";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarFooter,
	SidebarRail,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	useSidebar,
} from "@/components/ui/sidebar";
import {
	LayoutDashboard,
	Briefcase,
	ClipboardList,
	ChevronRight,
	Building2,
	MessageSquare,
	Settings,
} from "lucide-react";
import Link from "next/link";
import RPGLogo from "@/public/img/recruitmentglobal_logo.jpg";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/stores/user.store";

export default function HomeSidebar() {
	const pathname = usePathname();
	const { user } = useUserStore();

	return (
		<Sidebar variant="sidebar" side="left" collapsible="icon">
			<SidebarHeader className="pb-0">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link href="/home">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
									<Image
										src={RPGLogo}
										alt="Recruitment Global Logo"
										className="size-8"
									/>
								</div>
								<div className="flex flex-col gap-0.5 leading-none">
									<span className="font-semibold">Recruitment Global</span>
									<span className="text-xs text-muted-foreground">
										{user?.user_type === "jobseeker"
											? "Job Seeker"
											: "Employer"}
									</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Main</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton
									isActive={pathname === "/home"}
									tooltip="Dashboard"
									asChild
								>
									<Link href="/home">
										<LayoutDashboard className="h-4 w-4" />
										<span>Dashboard</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton
									isActive={pathname === "/home/find-jobs"}
									tooltip="Jobs"
									asChild
								>
									<Link href="/home/find-jobs">
										<Briefcase className="h-4 w-4" />
										<span>Find Jobs</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton
									isActive={pathname === "/home/applications"}
									tooltip="Applications"
									asChild
								>
									<Link href="/home/applications">
										<ClipboardList className="h-4 w-4" />
										<span>Applications</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton
									isActive={pathname === "/home/messages"}
									tooltip="Applications"
									asChild
								>
									<Link href="/home/messages">
										<MessageSquare className="h-4 w-4" />
										<span>Messages</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarGroup>
					<SidebarGroupLabel>Recent Searches</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href="#">
										<span>Frontend Developer</span>
										<ChevronRight className="ml-auto h-4 w-4" />
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href="#">
										<span>UX Designer</span>
										<ChevronRight className="ml-auto h-4 w-4" />
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href="#">
										<span>Product Manager</span>
										<ChevronRight className="ml-auto h-4 w-4" />
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarGroup>
					<SidebarGroupLabel>Top Companies</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href="#">
										<Building2 className="h-4 w-4" />
										<span>TechCorp Inc.</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href="#">
										<Building2 className="h-4 w-4" />
										<span>DesignHub</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href="#">
										<Building2 className="h-4 w-4" />
										<span>DataSystems</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarRail />
		</Sidebar>
	);
}
