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
	PlusCircle,
	Users,
	MessageSquare,
	Building2,
	TrendingUp,
	Clock,
} from "lucide-react";
import Link from "next/link";
import RPGLogo from "@/public/img/recruitmentglobal_logo.jpg";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/stores/user.store";

export default function EmployerSidebar() {
	const pathname = usePathname();
	const { user } = useUserStore();

	return (
		<Sidebar variant="sidebar" side="left" collapsible="icon">
			<SidebarHeader className="pb-0">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link href="/employer">
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
										Employer Portal
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
									isActive={pathname === "/employer"}
									tooltip="Dashboard"
									asChild
								>
									<Link href="/employer">
										<LayoutDashboard className="h-4 w-4" />
										<span>Dashboard</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton
									isActive={pathname === "/employer/jobs"}
									tooltip="My Jobs"
									asChild
								>
									<Link href="/employer/jobs">
										<Briefcase className="h-4 w-4" />
										<span>My Jobs</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton
									isActive={pathname === "/employer/post-job"}
									tooltip="Post Job"
									asChild
								>
									<Link href="/employer/post-job">
										<PlusCircle className="h-4 w-4" />
										<span>Post Job</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton
									isActive={pathname?.startsWith("/employer/applicants") ?? false}
									tooltip="Applicants"
									asChild
								>
									<Link href="/employer/applicants">
										<Users className="h-4 w-4" />
										<span>Applicants</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton
									isActive={pathname === "/employer/messages"}
									tooltip="Messages"
									asChild
								>
									<Link href="/employer/messages">
										<MessageSquare className="h-4 w-4" />
										<span>Messages</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton
									isActive={pathname === "/employer/company-profile"}
									tooltip="Company Profile"
									asChild
								>
									<Link href="/employer/company-profile">
										<Building2 className="h-4 w-4" />
										<span>Company Profile</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarGroup>
					<SidebarGroupLabel>Quick Stats</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<div className="cursor-default">
										<TrendingUp className="h-4 w-4 text-green-500" />
										<span className="text-xs">Active Jobs: 5</span>
									</div>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<div className="cursor-default">
										<Users className="h-4 w-4 text-blue-500" />
										<span className="text-xs">New Applicants: 23</span>
									</div>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<div className="cursor-default">
										<Clock className="h-4 w-4 text-orange-500" />
										<span className="text-xs">Pending Review: 12</span>
									</div>
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
