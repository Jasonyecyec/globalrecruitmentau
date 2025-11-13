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
	FileText,
	Clock,
	CheckCircle2,
	Star,
	TrendingUp,
	Calendar,
} from "lucide-react";
import Link from "next/link";
import RPGLogo from "@/public/img/recruitmentglobal_logo.jpg";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/stores/user.store";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function HomeSidebar() {
	const pathname = usePathname();
	const { user } = useUserStore();

	// Mock data - replace with actual data from your store/API
	const applicationStats = {
		total: 5,
		underReview: 1,
		interview: 1,
		offer: 1,
	};

	const savedJobs = [
		{
			id: 1,
			title: "Frontend Developer",
			company: "TechCorp",
			postedDays: 2,
		},
		{
			id: 2,
			title: "React Engineer",
			company: "StartupXYZ",
			postedDays: 5,
		},
		{
			id: 3,
			title: "Full Stack Developer",
			company: "DesignHub",
			postedDays: 7,
		},
	];

	const profileCompleteness = 75; // percentage

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
										Job Seeker Portal
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
										{applicationStats.total > 0 && (
											<Badge className="ml-auto bg-mainColor">
												{applicationStats.total}
											</Badge>
										)}
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton
									isActive={pathname === "/home/messages"}
									tooltip="Messages"
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
					<SidebarGroupLabel>Application Status</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href="/home/applications?tab=review">
										<Clock className="h-4 w-4 text-purple-500" />
										<span className="text-xs">Under Review</span>
										<Badge
											variant="outline"
											className="ml-auto bg-purple-50 text-purple-700 border-purple-200"
										>
											{applicationStats.underReview}
										</Badge>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href="/home/applications?tab=interview">
										<Calendar className="h-4 w-4 text-orange-500" />
										<span className="text-xs">Interviews</span>
										<Badge
											variant="outline"
											className="ml-auto bg-orange-50 text-orange-700 border-orange-200"
										>
											{applicationStats.interview}
										</Badge>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href="/home/applications?tab=offer">
										<CheckCircle2 className="h-4 w-4 text-green-500" />
										<span className="text-xs">Offers</span>
										<Badge
											variant="outline"
											className="ml-auto bg-green-50 text-green-700 border-green-200"
										>
											{applicationStats.offer}
										</Badge>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarGroup>
					<SidebarGroupLabel>Saved Jobs</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{savedJobs.map((job) => (
								<SidebarMenuItem key={job.id}>
									<SidebarMenuButton asChild>
										<Link href="/home/find-jobs">
											<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
											<div className="flex flex-col flex-1 min-w-0">
												<span className="text-xs font-medium truncate">
													{job.title}
												</span>
												<span className="text-xs text-muted-foreground truncate">
													{job.company}
												</span>
											</div>
											<ChevronRight className="ml-auto h-4 w-4 shrink-0" />
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{/* <SidebarGroup>
					<SidebarGroupLabel>Profile</SidebarGroupLabel>
					<SidebarGroupContent>
						<div className="px-3 py-2">
							<div className="space-y-2">
								<div className="flex items-center justify-between text-xs">
									<span className="text-muted-foreground">
										Profile Completeness
									</span>
									<span className="font-medium">{profileCompleteness}%</span>
								</div>
								<Progress value={profileCompleteness} className="h-2" />
								<Link
									href="/home/profile"
									className="text-xs text-mainColor hover:underline flex items-center gap-1"
								>
									<TrendingUp className="h-3 w-3" />
									Complete your profile
								</Link>
							</div>
						</div>
					</SidebarGroupContent>
				</SidebarGroup> */}
			</SidebarContent>

			<SidebarRail />
		</Sidebar>
	);
}
