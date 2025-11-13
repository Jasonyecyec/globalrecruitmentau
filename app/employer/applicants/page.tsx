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
	Mail,
	Phone,
	MapPin,
	Briefcase,
	Calendar,
	Download,
	Eye,
	CheckCircle2,
	XCircle,
	Clock,
	Linkedin,
	Globe,
	Star,
} from "lucide-react";

const applicants = [
	{
		id: 1,
		name: "Sarah Johnson",
		email: "sarah.johnson@email.com",
		phone: "+61 400 123 456",
		position: "Senior Frontend Developer",
		appliedDate: "2024-11-10",
		status: "new",
		location: "Sydney, AU",
		experience: "7 years",
		avatar: "https://github.com/shadcn.png",
		resumeUrl: "#",
		linkedinUrl: "#",
		portfolioUrl: "#",
		skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
		education: "Bachelor in Computer Science",
		currentCompany: "TechCorp Inc.",
	},
	{
		id: 2,
		name: "Michael Chen",
		email: "michael.chen@email.com",
		phone: "+61 400 234 567",
		position: "UX/UI Designer",
		appliedDate: "2024-11-09",
		status: "reviewed",
		location: "Melbourne, AU",
		experience: "5 years",
		avatar: "https://github.com/shadcn.png",
		resumeUrl: "#",
		linkedinUrl: "#",
		portfolioUrl: "#",
		skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
		education: "Bachelor in Design",
		currentCompany: "DesignHub",
	},
	{
		id: 3,
		name: "Emily Rodriguez",
		email: "emily.rodriguez@email.com",
		phone: "+61 400 345 678",
		position: "Backend Engineer",
		appliedDate: "2024-11-08",
		status: "interview",
		location: "Brisbane, AU",
		experience: "6 years",
		avatar: "https://github.com/shadcn.png",
		resumeUrl: "#",
		linkedinUrl: "#",
		portfolioUrl: "#",
		skills: ["Node.js", "Python", "AWS", "PostgreSQL"],
		education: "Master in Computer Science",
		currentCompany: "DataSystems",
	},
	{
		id: 4,
		name: "David Kim",
		email: "david.kim@email.com",
		phone: "+61 400 456 789",
		position: "Product Manager",
		appliedDate: "2024-11-07",
		status: "shortlisted",
		location: "Perth, AU",
		experience: "8 years",
		avatar: "https://github.com/shadcn.png",
		resumeUrl: "#",
		linkedinUrl: "#",
		portfolioUrl: "#",
		skills: ["Product Strategy", "Agile", "User Stories", "Analytics"],
		education: "MBA",
		currentCompany: "StartupXYZ",
	},
	{
		id: 5,
		name: "Jessica Lee",
		email: "jessica.lee@email.com",
		phone: "+61 400 567 890",
		position: "Senior Frontend Developer",
		appliedDate: "2024-11-06",
		status: "rejected",
		location: "Adelaide, AU",
		experience: "4 years",
		avatar: "https://github.com/shadcn.png",
		resumeUrl: "#",
		linkedinUrl: "#",
		portfolioUrl: "#",
		skills: ["React", "JavaScript", "CSS", "Git"],
		education: "Bachelor in Information Technology",
		currentCompany: "WebAgency",
	},
];

export default function Applicants() {
	const [searchQuery, setSearchQuery] = useState("");
	const [activeTab, setActiveTab] = useState("all");
	const [selectedApplicant, setSelectedApplicant] = useState(applicants[0]);

	const filteredApplicants = applicants.filter((applicant) => {
		const matchesSearch = applicant.name
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesTab =
			activeTab === "all" ||
			(activeTab === "new" && applicant.status === "new") ||
			(activeTab === "reviewed" && applicant.status === "reviewed") ||
			(activeTab === "interview" && applicant.status === "interview") ||
			(activeTab === "shortlisted" && applicant.status === "shortlisted");
		return matchesSearch && matchesTab;
	});

	const getStatusBadge = (status: string) => {
		const variants = {
			new: { className: "bg-blue-50 text-blue-700", label: "New" },
			reviewed: {
				className: "bg-purple-50 text-purple-700",
				label: "Reviewed",
			},
			interview: {
				className: "bg-orange-50 text-orange-700",
				label: "Interview",
			},
			shortlisted: {
				className: "bg-green-50 text-green-700",
				label: "Shortlisted",
			},
			rejected: { className: "bg-red-50 text-red-700", label: "Rejected" },
		};
		const variant = variants[status as keyof typeof variants];
		return (
			<Badge variant="outline" className={variant.className}>
				{variant.label}
			</Badge>
		);
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const now = new Date();
		const diffTime = Math.abs(now.getTime() - date.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays === 0) return "Today";
		if (diffDays === 1) return "Yesterday";
		if (diffDays < 7) return `${diffDays} days ago`;
		return date.toLocaleDateString();
	};

	return (
		<div className="p-4 sm:px-6 md:py-8">
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
					<div>
						<h1 className="text-2xl font-bold tracking-tight">Applicants</h1>
						<p className="text-muted-foreground">
							Review and manage candidate applications
						</p>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="outline">
							<Download className="mr-2 h-4 w-4" />
							Export
						</Button>
					</div>
				</div>

				{/* SEARCH AND FILTERS */}
				<div className="flex flex-col sm:flex-row gap-4">
					<div className="relative flex-1">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search applicants..."
							className="pl-8"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
					<div className="flex gap-2">
						<Select defaultValue="all-jobs">
							<SelectTrigger className="w-[200px]">
								<SelectValue placeholder="Filter by job" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all-jobs">All Jobs</SelectItem>
								<SelectItem value="frontend">Frontend Developer</SelectItem>
								<SelectItem value="designer">UX/UI Designer</SelectItem>
								<SelectItem value="backend">Backend Engineer</SelectItem>
								<SelectItem value="pm">Product Manager</SelectItem>
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
						<TabsTrigger value="all">All ({applicants.length})</TabsTrigger>
						<TabsTrigger value="new">
							New ({applicants.filter((a) => a.status === "new").length})
						</TabsTrigger>
						<TabsTrigger value="reviewed">
							Reviewed (
							{applicants.filter((a) => a.status === "reviewed").length})
						</TabsTrigger>
						<TabsTrigger value="interview">
							Interview (
							{applicants.filter((a) => a.status === "interview").length})
						</TabsTrigger>
						<TabsTrigger value="shortlisted">
							Shortlisted (
							{applicants.filter((a) => a.status === "shortlisted").length})
						</TabsTrigger>
					</TabsList>

					<TabsContent value={activeTab} className="mt-6">
						<div className="grid gap-4">
							{filteredApplicants.length === 0 ? (
								<Card>
									<CardContent className="pt-6">
										<div className="text-center py-12">
											<Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
											<h3 className="mt-4 text-lg font-semibold">
												No applicants found
											</h3>
											<p className="text-muted-foreground mt-2">
												{searchQuery
													? "Try adjusting your search criteria"
													: "No applications yet for this filter"}
											</p>
										</div>
									</CardContent>
								</Card>
							) : (
								filteredApplicants.map((applicant) => (
									<Card
										key={applicant.id}
										className="hover:shadow-md transition-shadow"
									>
										<CardContent className="pt-6">
											<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
												<div className="flex gap-4 flex-1">
													<Avatar className="h-12 w-12">
														<AvatarImage src={applicant.avatar} />
														<AvatarFallback>
															{applicant.name
																.split(" ")
																.map((n) => n[0])
																.join("")}
														</AvatarFallback>
													</Avatar>

													<div className="flex-1 space-y-2">
														<div>
															<h3 className="font-semibold text-lg">
																{applicant.name}
															</h3>
															<p className="text-sm text-muted-foreground">
																Applied for {applicant.position}
															</p>
														</div>

														<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
															<div className="flex items-center gap-2 text-muted-foreground">
																<Mail className="h-4 w-4" />
																<span className="truncate">
																	{applicant.email}
																</span>
															</div>
															<div className="flex items-center gap-2 text-muted-foreground">
																<Phone className="h-4 w-4" />
																<span>{applicant.phone}</span>
															</div>
															<div className="flex items-center gap-2 text-muted-foreground">
																<MapPin className="h-4 w-4" />
																<span>{applicant.location}</span>
															</div>
															<div className="flex items-center gap-2 text-muted-foreground">
																<Briefcase className="h-4 w-4" />
																<span>{applicant.experience} experience</span>
															</div>
															<div className="flex items-center gap-2 text-muted-foreground">
																<Calendar className="h-4 w-4" />
																<span>
																	Applied {formatDate(applicant.appliedDate)}
																</span>
															</div>
														</div>

														<div className="flex flex-wrap gap-1 mt-2">
															{applicant.skills.slice(0, 4).map((skill) => (
																<Badge
																	key={skill}
																	variant="secondary"
																	className="text-xs"
																>
																	{skill}
																</Badge>
															))}
															{applicant.skills.length > 4 && (
																<Badge variant="secondary" className="text-xs">
																	+{applicant.skills.length - 4} more
																</Badge>
															)}
														</div>
													</div>
												</div>

												<div className="flex flex-row md:flex-col items-start gap-2">
													{getStatusBadge(applicant.status)}

													<Dialog>
														<DialogTrigger asChild>
															<Button
																variant="outline"
																size="sm"
																onClick={() => setSelectedApplicant(applicant)}
															>
																<Eye className="mr-2 h-4 w-4" />
																View Profile
															</Button>
														</DialogTrigger>
														<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
															<DialogHeader>
																<DialogTitle className="text-2xl">
																	{selectedApplicant.name}
																</DialogTitle>
																<DialogDescription>
																	Applied for {selectedApplicant.position}
																</DialogDescription>
															</DialogHeader>

															<div className="space-y-6">
																{/* Contact Info */}
																<div className="space-y-3">
																	<h3 className="font-semibold">
																		Contact Information
																	</h3>
																	<div className="grid grid-cols-1 gap-2 text-sm">
																		<div className="flex items-center gap-2">
																			<Mail className="h-4 w-4 text-muted-foreground" />
																			<span>{selectedApplicant.email}</span>
																		</div>
																		<div className="flex items-center gap-2">
																			<Phone className="h-4 w-4 text-muted-foreground" />
																			<span>{selectedApplicant.phone}</span>
																		</div>
																		<div className="flex items-center gap-2">
																			<MapPin className="h-4 w-4 text-muted-foreground" />
																			<span>{selectedApplicant.location}</span>
																		</div>
																	</div>
																</div>

																{/* Professional Links */}
																<div className="space-y-3">
																	<h3 className="font-semibold">
																		Professional Links
																	</h3>
																	<div className="flex gap-2">
																		<Button variant="outline" size="sm" asChild>
																			<a
																				href={selectedApplicant.linkedinUrl}
																				target="_blank"
																				rel="noopener noreferrer"
																			>
																				<Linkedin className="mr-2 h-4 w-4" />
																				LinkedIn
																			</a>
																		</Button>
																		<Button variant="outline" size="sm" asChild>
																			<a
																				href={selectedApplicant.portfolioUrl}
																				target="_blank"
																				rel="noopener noreferrer"
																			>
																				<Globe className="mr-2 h-4 w-4" />
																				Portfolio
																			</a>
																		</Button>
																		<Button variant="outline" size="sm" asChild>
																			<a
																				href={selectedApplicant.resumeUrl}
																				download
																			>
																				<Download className="mr-2 h-4 w-4" />
																				Resume
																			</a>
																		</Button>
																	</div>
																</div>

																{/* Experience & Education */}
																<div className="grid grid-cols-2 gap-4">
																	<div className="space-y-2">
																		<h3 className="font-semibold">Experience</h3>
																		<p className="text-sm text-muted-foreground">
																			{selectedApplicant.experience}
																		</p>
																		<p className="text-sm">
																			Current: {selectedApplicant.currentCompany}
																		</p>
																	</div>
																	<div className="space-y-2">
																		<h3 className="font-semibold">Education</h3>
																		<p className="text-sm">
																			{selectedApplicant.education}
																		</p>
																	</div>
																</div>

																{/* Skills */}
																<div className="space-y-3">
																	<h3 className="font-semibold">Skills</h3>
																	<div className="flex flex-wrap gap-2">
																		{selectedApplicant.skills.map((skill) => (
																			<Badge key={skill} variant="secondary">
																				{skill}
																			</Badge>
																		))}
																	</div>
																</div>

																{/* Actions */}
																<div className="flex gap-2 pt-4 border-t">
																	<Button className="flex-1 bg-green-600 hover:bg-green-700">
																		<CheckCircle2 className="mr-2 h-4 w-4" />
																		Accept
																	</Button>
																	<Button
																		className="flex-1"
																		variant="outline"
																	>
																		<Calendar className="mr-2 h-4 w-4" />
																		Schedule Interview
																	</Button>
																	<Button
																		className="flex-1"
																		variant="outline"
																	>
																		<Mail className="mr-2 h-4 w-4" />
																		Message
																	</Button>
																	<Button
																		className="flex-1 bg-red-600 hover:bg-red-700"
																		variant="destructive"
																	>
																		<XCircle className="mr-2 h-4 w-4" />
																		Reject
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
																<Mail className="mr-2 h-4 w-4" />
																Send Message
															</DropdownMenuItem>
															<DropdownMenuItem>
																<Calendar className="mr-2 h-4 w-4" />
																Schedule Interview
															</DropdownMenuItem>
															<DropdownMenuItem>
																<Download className="mr-2 h-4 w-4" />
																Download Resume
															</DropdownMenuItem>
															<DropdownMenuSeparator />
															<DropdownMenuItem className="text-green-600">
																<CheckCircle2 className="mr-2 h-4 w-4" />
																Shortlist
															</DropdownMenuItem>
															<DropdownMenuItem className="text-red-600">
																<XCircle className="mr-2 h-4 w-4" />
																Reject
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
