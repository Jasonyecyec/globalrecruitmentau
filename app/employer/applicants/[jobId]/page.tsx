"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useJobById } from "@/lib/hooks/use-jobs";
import type { Applicant } from "@/types/job";
import { ApplicantProfileModal } from "@/app/employer/_components/ApplicantProfileModal";
import { useJobApplicationUpdate } from "@/lib/hooks/use-job-application";
import { toast } from "sonner";

const STATUS_VARIANTS: Record<string, { className: string; label: string }> = {
	pending: { className: "bg-blue-50 text-blue-700", label: "Pending" },
	reviewed: { className: "bg-purple-50 text-purple-700", label: "Reviewed" },
	interview: { className: "bg-orange-50 text-orange-700", label: "Interview" },
	shortlisted: {
		className: "bg-green-50 text-green-700",
		label: "Shortlisted",
	},
	accepted: { className: "bg-emerald-50 text-emerald-700", label: "Accepted" },
	rejected: { className: "bg-red-50 text-red-700", label: "Rejected" },
};

const STATUS_TABS = [
	{ value: "all", label: "All" },
	{ value: "pending", label: "Pending" },
	{ value: "under_review", label: "Under Review" },
	{ value: "shortlisted", label: "Shortlisted" },
	{ value: "accept", label: "Accepted" },
	{ value: "reject", label: "Rejected" },
];

type NormalizedApplicant = {
	id: number;
	name: string;
	email: string;
	phone: string;
	position: string;
	appliedDate: string;
	status: string;
	location: string;
	experience?: string;
	avatar?: string;
	resumeUrl?: string | null;
	coverLetterUrl?: string | null;
	education?: string;
	skills: string[];
};

const normalizeApplicant = (
	applicant: Applicant,
	jobTitle?: string,
	fallbackLocation?: string,
): NormalizedApplicant => {
	const name =
		`${applicant.first_name ?? ""} ${applicant.last_name ?? ""}`.trim() ||
		applicant.name;

	return {
		id: applicant.id,
		name,
		email: applicant.email,
		phone: applicant.contact_number,
		position: jobTitle ?? "Applied role",
		appliedDate: applicant.date_created,
		status: (applicant.status ?? "pending").toLowerCase(),
		location: fallbackLocation ?? "Not specified",
		experience: applicant.experience,
		avatar: applicant.image_url ?? undefined,
		resumeUrl: applicant.resume_presigned_url,
		coverLetterUrl: applicant.cover_letter_presigned_url,
		education: applicant.education,
		skills: applicant.skills ?? [],
	};
};

const formatRelativeDate = (dateString: string) => {
	if (!dateString) return "";
	const date = new Date(dateString);
	const now = new Date();
	const diffTime = Math.abs(now.getTime() - date.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays === 0) return "Today";
	if (diffDays === 1) return "Yesterday";
	if (diffDays < 7) return `${diffDays} days ago`;
	return date.toLocaleDateString();
};

export default function JobApplicants() {
	const params = useParams<{ jobId: string }>();
	const router = useRouter();
	const jobIdParam = Array.isArray(params?.jobId)
		? params?.jobId[0]
		: params?.jobId;

	const [searchQuery, setSearchQuery] = useState("");
	const [activeTab, setActiveTab] = useState("all");
	const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
		null,
	);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { data: job, isLoading, isError } = useJobById(jobIdParam ?? "");
	const { mutateAsync: updateApplicantStatus } = useJobApplicationUpdate();

	const handleViewProfile = async (applicantId: number) => {
		const originalApplicant = job?.applications?.find(
			(app) => app.id === applicantId,
		);
		if (!originalApplicant) return;

		setSelectedApplicant(originalApplicant);
		setIsModalOpen(true);

		// Dont change status if already under review or not pending
		if (
			originalApplicant.status === "under_review" ||
			originalApplicant.status !== "pending"
		)
			return;
		try {
			const response = await updateApplicantStatus({
				id: String(applicantId),
				jobId: jobIdParam ?? "",
				data: {
					status: "under_review",
				},
			});

			if (response.success) {
				toast.success(response.message || "Applicant marked as under review");
			}
		} catch {
			toast.error("Failed to update status. Please try again.");
		}
	};

	useEffect(() => {
		if (!jobIdParam) {
			router.replace("/employer/applicants");
		}
	}, [jobIdParam, router]);

	const applicants = useMemo(() => {
		if (!job) return [];
		return (job.applications ?? []).map((applicant) =>
			normalizeApplicant(
				applicant,
				job.title,
				job.company?.location ?? job.location,
			),
		);
	}, [job]);

	const statusCounts = useMemo(() => {
		const counts: Record<string, number> = { all: applicants.length };
		STATUS_TABS.slice(1).forEach(({ value }) => {
			counts[value] = 0;
		});

		applicants.forEach((applicant) => {
			const status = applicant.status?.toLowerCase();
			if (status && counts[status] !== undefined) {
				counts[status] += 1;
			}
		});

		return counts;
	}, [applicants]);

	const filteredApplicants = useMemo(() => {
		return applicants.filter((applicant) => {
			const matchesSearch = applicant.name
				.toLowerCase()
				.includes(searchQuery.toLowerCase());
			const matchesStatus =
				activeTab === "all" || applicant.status === activeTab.toLowerCase();
			return matchesSearch && matchesStatus;
		});
	}, [applicants, searchQuery, activeTab]);

	const getStatusBadge = (status: string) => {
		const variant = STATUS_VARIANTS[status] ?? {
			className: "bg-muted text-muted-foreground",
			label: status,
		};
		return (
			<Badge variant="outline" className={variant.className}>
				{variant.label}
			</Badge>
		);
	};

	if (isLoading) {
		return <div className="p-4">Loading applicants…</div>;
	}

	if (isError || !job) {
		return (
			<div className="p-4">
				<Card>
					<CardContent className="py-12 text-center">
						<p className="text-lg font-semibold">Unable to load job details.</p>
						<p className="text-muted-foreground mt-2">
							Please select a job from the applicants list and try again.
						</p>
						<Button
							className="mt-4"
							onClick={() => router.push("/employer/applicants")}
						>
							Back to Applicants
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="p-4 sm:px-6 md:py-8">
			<ApplicantProfileModal
				applicant={selectedApplicant}
				jobId={jobIdParam ?? ""}
				open={isModalOpen}
				onOpenChange={setIsModalOpen}
				jobTitle={job.title}
			/>

			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
					<div>
						<h1 className="text-2xl font-bold tracking-tight">
							Applicants for {job.title}
						</h1>
						<p className="text-muted-foreground">
							Review and manage candidate applications for this role.
						</p>
						<div className="text-sm text-muted-foreground mt-1">
							{job.location} • {job.type}
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="outline">
							<Download className="mr-2 h-4 w-4" />
							Export
						</Button>
						<Button
							variant="outline"
							onClick={() => router.push("/employer/applicants")}
						>
							Back to Jobs
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
					<Button variant="outline" size="icon">
						<Filter className="h-4 w-4" />
					</Button>
				</div>

				{/* TABS */}
				<Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
					<TabsList>
						{STATUS_TABS.map((tab) => (
							<TabsTrigger key={tab.value} value={tab.value}>
								{tab.label}
								{tab.value === "all"
									? ` (${statusCounts.all ?? 0})`
									: ` (${statusCounts[tab.value] ?? 0})`}
							</TabsTrigger>
						))}
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
								filteredApplicants.map((applicant) => {
									const subject = encodeURIComponent(
										"Regarding your job application",
									);
									const body = encodeURIComponent(
										`Hi ${applicant.name},\n\nI'm reaching out regarding your application...`,
									);

									return (
										<Card
											key={applicant.id}
											className="hover:shadow-md transition-shadow"
										>
											<CardContent className="pt-6">
												<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
													<div className="flex gap-4 flex-1">
														<Avatar className="h-12 w-12">
															<AvatarImage
																src={
																	applicant.avatar ??
																	"https://github.com/shadcn.png"
																}
															/>
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
																	<span>
																		{applicant.experience ||
																			"Experience not provided"}
																	</span>
																</div>
																<div className="flex items-center gap-2 text-muted-foreground">
																	<Calendar className="h-4 w-4" />
																	<span>
																		Applied{" "}
																		{formatRelativeDate(applicant.appliedDate)}
																	</span>
																</div>
															</div>

															{applicant.skills.length > 0 && (
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
																		<Badge
																			variant="secondary"
																			className="text-xs"
																		>
																			+{applicant.skills.length - 4} more
																		</Badge>
																	)}
																</div>
															)}
														</div>
													</div>

													<div className="flex flex-row md:flex-col items-start gap-2">
														{getStatusBadge(applicant.status)}
														<Button
															variant="outline"
															size="sm"
															onClick={() => handleViewProfile(applicant.id)}
														>
															<Eye className="mr-2 h-4 w-4" />
															View Profile
														</Button>

														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button variant="ghost" size="icon">
																	<MoreVertical className="h-4 w-4" />
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuLabel>Actions</DropdownMenuLabel>
																<DropdownMenuSeparator />
																<DropdownMenuItem asChild>
																	<a
																		href={`https://mail.google.com/mail/?view=cm&to=${applicant.email}&su=${subject}&body=${body}`}
																		target="_blank"
																		rel="noopener noreferrer"
																	>
																		<Mail className="mr-2 h-4 w-4" />
																		Send Message
																	</a>
																</DropdownMenuItem>
																<DropdownMenuItem
																	disabled={!applicant.resumeUrl}
																>
																	<Download className="mr-2 h-4 w-4" />
																	Download Resume
																</DropdownMenuItem>
																<DropdownMenuSeparator />
															</DropdownMenuContent>
														</DropdownMenu>
													</div>
												</div>
											</CardContent>
										</Card>
									);
								})
							)}
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
