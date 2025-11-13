"use client";
import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import {
	Briefcase,
	Users,
	Calendar,
	Eye,
	TrendingUp,
	FileText,
	Clock,
	CheckCircle2,
	XCircle,
	ArrowRight,
} from "lucide-react";
import { Line, LineChart, CartesianGrid, XAxis } from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const applicationsChartData = [
	{ month: "Jan", applications: 45 },
	{ month: "Feb", applications: 52 },
	{ month: "Mar", applications: 61 },
	{ month: "Apr", applications: 58 },
	{ month: "May", applications: 73 },
	{ month: "Jun", applications: 89 },
];

const chartConfig = {
	applications: {
		label: "Applications",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

const recentApplications = [
	{
		id: 1,
		candidateName: "Sarah Johnson",
		position: "Senior Frontend Developer",
		appliedDate: "2 hours ago",
		avatar: "https://github.com/shadcn.png",
		status: "new",
	},
	{
		id: 2,
		candidateName: "Michael Chen",
		position: "UX/UI Designer",
		appliedDate: "5 hours ago",
		avatar: "https://github.com/shadcn.png",
		status: "new",
	},
	{
		id: 3,
		candidateName: "Emily Rodriguez",
		position: "Backend Engineer",
		appliedDate: "1 day ago",
		avatar: "https://github.com/shadcn.png",
		status: "reviewed",
	},
	{
		id: 4,
		candidateName: "David Kim",
		position: "Product Manager",
		appliedDate: "2 days ago",
		avatar: "https://github.com/shadcn.png",
		status: "interview",
	},
];

const activeJobs = [
	{
		id: 1,
		title: "Senior Frontend Developer",
		applications: 23,
		views: 145,
		status: "active",
		daysLeft: 15,
	},
	{
		id: 2,
		title: "UX/UI Designer",
		applications: 18,
		views: 112,
		status: "active",
		daysLeft: 22,
	},
	{
		id: 3,
		title: "Backend Engineer",
		applications: 31,
		views: 198,
		status: "active",
		daysLeft: 8,
	},
];

export default function EmployerDashboard() {
	return (
		<div className="p-4 sm:px-6 md:py-8">
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
					<div>
						<h1 className="text-2xl font-bold tracking-tight">
							Employer Dashboard
						</h1>
						<p className="text-muted-foreground">
							Manage your job postings and track candidate applications
						</p>
					</div>

					<div className="flex items-center gap-2">
						<Select defaultValue="thisWeek">
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Select period" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="today">Today</SelectItem>
								<SelectItem value="thisWeek">This week</SelectItem>
								<SelectItem value="thisMonth">This month</SelectItem>
								<SelectItem value="thisYear">This year</SelectItem>
							</SelectContent>
						</Select>
						<Button className="bg-mainColor hover:bg-orange-400" asChild>
							<Link href="/employer/post-job">Post New Job</Link>
						</Button>
					</div>
				</div>
			</div>

			{/* STATS CARDS */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-5">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between relative pb-2">
						<CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
						<div className="rounded-full absolute p-3 top-3 right-5 bg-blue-100">
							<Briefcase className="h-4 w-4 text-blue-600" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">5</div>
						<p className="text-xs text-muted-foreground">
							+2 from last month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 relative">
						<CardTitle className="text-sm font-medium">
							Total Applicants
						</CardTitle>
						<div className="rounded-full absolute p-3 top-3 right-5 bg-orange-100">
							<Users className="h-4 w-4 text-mainColor" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">89</div>
						<p className="text-xs text-muted-foreground">
							+12 from last week
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 relative">
						<CardTitle className="text-sm font-medium">
							Interviews Scheduled
						</CardTitle>
						<div className="rounded-full absolute p-3 top-3 right-5 bg-purple-100">
							<Calendar className="h-4 w-4 text-purple-600" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">7</div>
						<p className="text-xs text-muted-foreground">3 this week</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 relative">
						<CardTitle className="text-sm font-medium">Profile Views</CardTitle>
						<div className="rounded-full absolute p-3 top-3 right-5 bg-green-100">
							<Eye className="h-4 w-4 text-green-600" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">1,234</div>
						<p className="text-xs text-muted-foreground">
							+18% from last month
						</p>
					</CardContent>
				</Card>
			</div>

			{/* CHARTS AND RECENT APPLICATIONS */}
			<div className="grid gap-6 md:grid-cols-2 mt-6">
				<Card>
					<CardHeader>
						<CardTitle>Application Trends</CardTitle>
						<CardDescription>
							Number of applications received over time
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ChartContainer config={chartConfig}>
							<LineChart
								accessibilityLayer
								data={applicationsChartData}
								margin={{
									left: 12,
									right: 12,
								}}
							>
								<CartesianGrid vertical={false} />
								<XAxis
									dataKey="month"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
								/>
								<ChartTooltip
									cursor={false}
									content={<ChartTooltipContent hideLabel />}
								/>
								<Line
									dataKey="applications"
									type="monotone"
									stroke="var(--color-applications)"
									strokeWidth={2}
									dot={false}
								/>
							</LineChart>
						</ChartContainer>
					</CardContent>
					<CardFooter className="flex-col items-start gap-2 text-sm">
						<div className="flex gap-2 font-medium leading-none">
							Trending up by 22% this month <TrendingUp className="h-4 w-4" />
						</div>
						<div className="leading-none text-muted-foreground">
							Showing application trends for the last 6 months
						</div>
					</CardFooter>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Recent Applications</CardTitle>
						<CardDescription>Latest candidate submissions</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{recentApplications.map((application) => (
								<div
									key={application.id}
									className="flex items-center justify-between"
								>
									<div className="flex items-center space-x-4">
										<Avatar>
											<AvatarImage src={application.avatar} />
											<AvatarFallback>
												{application.candidateName
													.split(" ")
													.map((n) => n[0])
													.join("")}
											</AvatarFallback>
										</Avatar>
										<div>
											<p className="text-sm font-medium leading-none">
												{application.candidateName}
											</p>
											<p className="text-sm text-muted-foreground mt-1">
												{application.position}
											</p>
											<p className="text-xs text-muted-foreground mt-1">
												{application.appliedDate}
											</p>
										</div>
									</div>
									<Badge
										variant={
											application.status === "new"
												? "default"
												: application.status === "reviewed"
													? "secondary"
													: "outline"
										}
									>
										{application.status}
									</Badge>
								</div>
							))}
						</div>
					</CardContent>
					<CardFooter>
						<Button variant="ghost" className="w-full" asChild>
							<Link href="/employer/applicants">
								View All Applicants
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>

			{/* ACTIVE JOBS TABLE */}
			<div className="mt-6">
				<Card>
					<CardHeader>
						<CardTitle>Active Job Listings</CardTitle>
						<CardDescription>
							Your currently active job postings and their performance
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{activeJobs.map((job) => (
								<div
									key={job.id}
									className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
								>
									<div className="flex-1">
										<h3 className="font-semibold text-sm">{job.title}</h3>
										<div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground">
											<div className="flex items-center gap-1">
												<FileText className="h-3 w-3" />
												<span>{job.applications} applications</span>
											</div>
											<div className="flex items-center gap-1">
												<Eye className="h-3 w-3" />
												<span>{job.views} views</span>
											</div>
											<div className="flex items-center gap-1">
												<Clock className="h-3 w-3" />
												<span>{job.daysLeft} days left</span>
											</div>
										</div>
									</div>
									<div className="flex items-center gap-2 mt-3 sm:mt-0">
										<Badge variant="outline" className="bg-green-50">
											{job.status}
										</Badge>
										<Button variant="outline" size="sm" asChild>
											<Link href={`/employer/jobs`}>View</Link>
										</Button>
									</div>
								</div>
							))}
						</div>
					</CardContent>
					<CardFooter>
						<Button variant="ghost" className="w-full" asChild>
							<Link href="/employer/jobs">
								View All Jobs
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
