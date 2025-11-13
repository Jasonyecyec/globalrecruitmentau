"use client";
import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Search,
	Filter,
	MoreVertical,
	MapPin,
	Briefcase,
	Calendar,
	Eye,
	Trash2,
	Clock,
	DollarSign,
	Building2,
	FileText,
	ExternalLink,
	CheckCircle2,
	XCircle,
	AlertCircle,
	Star,
} from "lucide-react";
import Link from "next/link";

const applications = [
	{
		id: 1,
		jobTitle: "Senior Frontend Developer",
		company: "TechCorp Inc.",
		companyLogo: "https://github.com/shadcn.png",
		location: "Sydney, AU",
		employmentType: "Full-time",
		salary: "$120k - $150k",
		appliedDate: "2024-11-08",
		status: "interview",
		lastUpdate: "2 days ago",
		description:
			"We're looking for an experienced frontend developer to join our growing team...",
		matchScore: 95,
	},
	{
		id: 2,
		jobTitle: "React Developer",
		company: "StartupXYZ",
		companyLogo: "https://github.com/shadcn.png",
		location: "Remote",
		employmentType: "Full-time",
		salary: "$100k - $130k",
		appliedDate: "2024-11-05",
		status: "under_review",
		lastUpdate: "5 days ago",
		description:
			"Join our team to build innovative web applications using React and modern tools...",
		matchScore: 88,
	},
	{
		id: 3,
		jobTitle: "Full Stack Engineer",
		company: "DesignHub",
		companyLogo: "https://github.com/shadcn.png",
		location: "Melbourne, AU",
		employmentType: "Full-time",
		salary: "$110k - $140k",
		appliedDate: "2024-11-01",
		status: "rejected",
		lastUpdate: "1 week ago",
		description:
			"We need a versatile engineer comfortable with both frontend and backend development...",
		matchScore: 78,
	},
	{
		id: 4,
		jobTitle: "UI/UX Developer",
		company: "Creative Studios",
		companyLogo: "https://github.com/shadcn.png",
		location: "Brisbane, AU",
		employmentType: "Contract",
		salary: "$90k - $110k",
		appliedDate: "2024-10-28",
		status: "applied",
		lastUpdate: "2 weeks ago",
		description:
			"Looking for a creative developer who can bridge design and development...",
		matchScore: 82,
	},
	{
		id: 5,
		jobTitle: "JavaScript Engineer",
		company: "DataSystems",
		companyLogo: "https://github.com/shadcn.png",
		location: "Perth, AU",
		employmentType: "Full-time",
		salary: "$105k - $135k",
		appliedDate: "2024-10-25",
		status: "offer",
		lastUpdate: "3 weeks ago",
		description:
			"Join our data visualization team to build powerful interactive dashboards...",
		matchScore: 91,
	},
];

export default function Applications() {
	const [searchQuery, setSearchQuery] = useState("");
	const [activeTab, setActiveTab] = useState("all");
	const [selectedApplication, setSelectedApplication] = useState(
		applications[0],
	);

	const filteredApplications = applications.filter((app) => {
		const matchesSearch =
			app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
			app.company.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesTab =
			activeTab === "all" ||
			(activeTab === "applied" && app.status === "applied") ||
			(activeTab === "review" && app.status === "under_review") ||
			(activeTab === "interview" && app.status === "interview") ||
			(activeTab === "offer" && app.status === "offer");
		return matchesSearch && matchesTab;
	});

	const getStatusBadge = (status: string) => {
		const variants = {
			applied: {
				className: "bg-blue-50 text-blue-700 border-blue-200",
				label: "Applied",
				icon: <FileText className="h-3 w-3" />,
			},
			under_review: {
				className: "bg-purple-50 text-purple-700 border-purple-200",
				label: "Under Review",
				icon: <Clock className="h-3 w-3" />,
			},
			interview: {
				className: "bg-orange-50 text-orange-700 border-orange-200",
				label: "Interview",
				icon: <Calendar className="h-3 w-3" />,
			},
			offer: {
				className: "bg-green-50 text-green-700 border-green-200",
				label: "Offer Received",
				icon: <CheckCircle2 className="h-3 w-3" />,
			},
			rejected: {
				className: "bg-red-50 text-red-700 border-red-200",
				label: "Not Selected",
				icon: <XCircle className="h-3 w-3" />,
			},
		};
		const variant = variants[status as keyof typeof variants];
		return (
			<Badge
				variant="outline"
				className={`${variant.className} flex items-center gap-1`}
			>
				{variant.icon}
				{variant.label}
			</Badge>
		);
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-AU", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	const getStatsForTab = () => {
		return {
			all: applications.length,
			applied: applications.filter((a) => a.status === "applied").length,
			review: applications.filter((a) => a.status === "under_review").length,
			interview: applications.filter((a) => a.status === "interview").length,
			offer: applications.filter((a) => a.status === "offer").length,
		};
	};

	const stats = getStatsForTab();

	return (
		<div className="p-4 sm:px-6 md:py-8">
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
					<div>
						<h1 className="text-2xl font-bold tracking-tight">
							My Applications
						</h1>
						<p className="text-muted-foreground">
							Track and manage your job applications
						</p>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="outline" asChild>
							<Link href="/home/find-jobs">
								<Briefcase className="mr-2 h-4 w-4" />
								Browse Jobs
							</Link>
						</Button>
					</div>
				</div>

				{/* STATS OVERVIEW */}
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground">
								Total Applications
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stats.all}</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground">
								Under Review
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-purple-600">
								{stats.review}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground">
								Interviews
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-orange-600">
								{stats.interview}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground">
								Offers
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-green-600">
								{stats.offer}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground">
								Response Rate
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{applications.length > 0
									? Math.round(
											((stats.review + stats.interview + stats.offer) /
												stats.all) *
												100,
										)
									: 0}
								%
							</div>
						</CardContent>
					</Card>
				</div>

				{/* SEARCH AND FILTERS */}
				<div className="flex flex-col sm:flex-row gap-4">
					<div className="relative flex-1">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search applications..."
							className="pl-8"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
					<div className="flex gap-2">
						<Select defaultValue="newest">
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Sort by" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="newest">Newest first</SelectItem>
								<SelectItem value="oldest">Oldest first</SelectItem>
								<SelectItem value="status">By status</SelectItem>
								<SelectItem value="match">Best match</SelectItem>
							</SelectContent>
						</Select>
						<Button variant="outline" size="icon">
							<Filter className="h-4 w-4" />
						</Button>
					</div>
				</div>

				{/* TABS */}
				<Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
					<TabsList>
						<TabsTrigger value="all">All ({stats.all})</TabsTrigger>
						<TabsTrigger value="applied">Applied ({stats.applied})</TabsTrigger>
						<TabsTrigger value="review">
							Review ({stats.review})
						</TabsTrigger>
						<TabsTrigger value="interview">
							Interview ({stats.interview})
						</TabsTrigger>
						<TabsTrigger value="offer">Offers ({stats.offer})</TabsTrigger>
					</TabsList>

					<TabsContent value={activeTab} className="mt-6">
						<div className="grid gap-4">
							{filteredApplications.length === 0 ? (
								<Card>
									<CardContent className="pt-6">
										<div className="text-center py-12">
											<Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
											<h3 className="mt-4 text-lg font-semibold">
												No applications found
											</h3>
											<p className="text-muted-foreground mt-2">
												{searchQuery
													? "Try adjusting your search criteria"
													: "Start applying to jobs to see them here"}
											</p>
											{!searchQuery && (
												<Button className="mt-4 bg-mainColor" asChild>
													<Link href="/home/find-jobs">Browse Jobs</Link>
												</Button>
											)}
										</div>
									</CardContent>
								</Card>
							) : (
								filteredApplications.map((application) => (
									<Card
										key={application.id}
										className="hover:shadow-md transition-shadow"
									>
										<CardContent className="pt-6">
											<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
												<div className="flex gap-4 flex-1">
													<Avatar className="h-12 w-12 rounded-md">
														<AvatarImage src={application.companyLogo} />
														<AvatarFallback className="rounded-md">
															{application.company
																.split(" ")
																.map((n) => n[0])
																.join("")}
														</AvatarFallback>
													</Avatar>

													<div className="flex-1 space-y-2">
														<div>
															<h3 className="font-semibold text-lg">
																{application.jobTitle}
															</h3>
															<p className="text-sm text-muted-foreground flex items-center gap-1">
																<Building2 className="h-3 w-3" />
																{application.company}
															</p>
														</div>

														<div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
															<div className="flex items-center gap-1">
																<MapPin className="h-4 w-4" />
																<span>{application.location}</span>
															</div>
															<div className="flex items-center gap-1">
																<Briefcase className="h-4 w-4" />
																<span>{application.employmentType}</span>
															</div>
															<div className="flex items-center gap-1">
																<DollarSign className="h-4 w-4" />
																<span>{application.salary}</span>
															</div>
															<div className="flex items-center gap-1">
																<Calendar className="h-4 w-4" />
																<span>
																	Applied {formatDate(application.appliedDate)}
																</span>
															</div>
														</div>

														<div className="flex items-center gap-2">
															{getStatusBadge(application.status)}
															<Badge variant="outline" className="text-xs">
																<Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
																{application.matchScore}% match
															</Badge>
															<span className="text-xs text-muted-foreground">
																Last updated: {application.lastUpdate}
															</span>
														</div>
													</div>
												</div>

												<div className="flex items-center gap-2">
													<Dialog>
														<DialogTrigger asChild>
															<Button
																variant="outline"
																size="sm"
																onClick={() =>
																	setSelectedApplication(application)
																}
															>
																<Eye className="mr-2 h-4 w-4" />
																View Details
															</Button>
														</DialogTrigger>
														<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
															<DialogHeader>
																<DialogTitle className="text-2xl">
																	{selectedApplication.jobTitle}
																</DialogTitle>
																<DialogDescription>
																	{selectedApplication.company} •{" "}
																	{selectedApplication.location}
																</DialogDescription>
															</DialogHeader>

															<div className="space-y-6">
																{/* Application Status */}
																<div className="space-y-3">
																	<h3 className="font-semibold">
																		Application Status
																	</h3>
																	<div className="flex items-center justify-between p-4 bg-accent rounded-lg">
																		<div className="space-y-1">
																			{getStatusBadge(
																				selectedApplication.status,
																			)}
																			<p className="text-sm text-muted-foreground">
																				Applied on{" "}
																				{formatDate(
																					selectedApplication.appliedDate,
																				)}
																			</p>
																			<p className="text-xs text-muted-foreground">
																				Last updated:{" "}
																				{selectedApplication.lastUpdate}
																			</p>
																		</div>
																	</div>
																</div>

																{/* Job Details */}
																<div className="space-y-3">
																	<h3 className="font-semibold">Job Details</h3>
																	<div className="grid grid-cols-2 gap-4">
																		<div className="space-y-1">
																			<p className="text-sm text-muted-foreground">
																				Employment Type
																			</p>
																			<p className="text-sm font-medium">
																				{selectedApplication.employmentType}
																			</p>
																		</div>
																		<div className="space-y-1">
																			<p className="text-sm text-muted-foreground">
																				Salary Range
																			</p>
																			<p className="text-sm font-medium">
																				{selectedApplication.salary}
																			</p>
																		</div>
																		<div className="space-y-1">
																			<p className="text-sm text-muted-foreground">
																				Location
																			</p>
																			<p className="text-sm font-medium">
																				{selectedApplication.location}
																			</p>
																		</div>
																		<div className="space-y-1">
																			<p className="text-sm text-muted-foreground">
																				Match Score
																			</p>
																			<p className="text-sm font-medium flex items-center gap-1">
																				<Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
																				{selectedApplication.matchScore}%
																			</p>
																		</div>
																	</div>
																</div>

																{/* Description */}
																<div className="space-y-3">
																	<h3 className="font-semibold">Description</h3>
																	<p className="text-sm text-muted-foreground">
																		{selectedApplication.description}
																	</p>
																</div>

																{/* Actions */}
																<div className="flex gap-2 pt-4 border-t">
																	<Button className="flex-1" variant="outline" asChild>
																		<Link href="/home/find-jobs">
																			<ExternalLink className="mr-2 h-4 w-4" />
																			View Job Posting
																		</Link>
																	</Button>
																	<Button className="flex-1" variant="outline" asChild>
																		<Link href="/home/messages">
																			<FileText className="mr-2 h-4 w-4" />
																			Contact Employer
																		</Link>
																	</Button>
																</div>
															</div>
														</DialogContent>
													</Dialog>

													<DropdownMenu>
														<DropdownMenuTrigger asChild>
															<Button variant="ghost" size="icon">
																<MoreVertical className="h-4 w-4" />
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent align="end">
															<DropdownMenuLabel>Actions</DropdownMenuLabel>
															<DropdownMenuSeparator />
															<DropdownMenuItem>
																<Eye className="mr-2 h-4 w-4" />
																View Job Posting
															</DropdownMenuItem>
															<DropdownMenuItem>
																<FileText className="mr-2 h-4 w-4" />
																View Application
															</DropdownMenuItem>
															<DropdownMenuSeparator />
															<DropdownMenuItem className="text-red-600">
																<Trash2 className="mr-2 h-4 w-4" />
																Withdraw Application
															</DropdownMenuItem>
														</DropdownMenuContent>
													</DropdownMenu>
												</div>
											</div>
										</CardContent>
									</Card>
								))
							)}
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
