"use client";
import { useEffect, useMemo, useState } from "react";
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
import {
	Search,
	Filter,
	MoreVertical,
	Eye,
	FileText,
	MapPin,
	Briefcase,
	DollarSign,
	Edit,
	Trash2,
	Copy,
	Archive,
	PlusCircle,
} from "lucide-react";
import Link from "next/link";
import { useJobPostedList } from "@/lib/hooks/use-jobs";
import { formatDate } from "@/lib/helpers/utils";

type TabValue = "all" | "active" | "closed";

export default function MyJobs() {
	const [searchQuery, setSearchQuery] = useState("");
	const [activeTab, setActiveTab] = useState<TabValue>("all");
	const [jobCounts, setJobCounts] = useState<Record<TabValue, number>>({
		all: 0,
		active: 0,
		closed: 0,
	});
	const jobPostedFilters = useMemo(
		() => (activeTab === "all" ? undefined : { status: activeTab }),
		[activeTab],
	);

	const {
		data: jobPostedData,
		isLoading,
		isError,
		isFetching,
	} = useJobPostedList(jobPostedFilters);
	const isInitialLoading = !jobPostedData && isLoading;
	const jobs = jobPostedData?.data ?? [];

	useEffect(() => {
		setJobCounts((prev) => ({
			...prev,
			[activeTab]: jobs.length,
		}));
	}, [jobs.length, activeTab]);

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "active":
				return (
					<Badge variant="outline" className="bg-green-50 text-green-700">
						Active
					</Badge>
				);
			case "closed":
				return (
					<Badge variant="outline" className="bg-gray-50 text-gray-700">
						Closed
					</Badge>
				);

			default:
				return <Badge variant="outline">{status}</Badge>;
		}
	};

	if (isInitialLoading) {
		return <div className="p-4">Loading...</div>;
	}

	if (isError) {
		return <div className="p-4">Error loading jobs.</div>;
	}

	return (
		<div className="p-4 sm:px-6 md:py-8">
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
					<div>
						<h1 className="text-2xl font-bold tracking-tight">My Jobs</h1>
						<p className="text-muted-foreground">
							Manage and track your job postings
						</p>
					</div>
					<Button className="bg-mainColor hover:bg-orange-400" asChild>
						<Link href="/employer/post-job">
							<PlusCircle className="mr-2 h-4 w-4" />
							Post New Job
						</Link>
					</Button>
				</div>

				{/* SEARCH AND FILTERS */}
				<div className="flex flex-col sm:flex-row gap-4">
					<div className="relative flex-1">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search jobs..."
							className="pl-8"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
					<div className="flex gap-2">
						<Select defaultValue="all">
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Department" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Departments</SelectItem>
								<SelectItem value="engineering">Engineering</SelectItem>
								<SelectItem value="design">Design</SelectItem>
								<SelectItem value="product">Product</SelectItem>
								<SelectItem value="marketing">Marketing</SelectItem>
							</SelectContent>
						</Select>
						<Button variant="outline" size="icon">
							<Filter className="h-4 w-4" />
						</Button>
					</div>
				</div>

				{/* TABS */}
				<Tabs
					value={activeTab}
					className="w-full"
					onValueChange={(value) => setActiveTab(value as TabValue)}
				>
					<TabsList>
						<TabsTrigger value="all">All ({jobCounts.all})</TabsTrigger>
						<TabsTrigger value="active">
							Active ({jobCounts.active})
						</TabsTrigger>
						<TabsTrigger value="closed">
							Closed ({jobCounts.closed})
						</TabsTrigger>
					</TabsList>

					<TabsContent value={activeTab} className="mt-6">
						{isFetching && (
							<p className="text-sm text-muted-foreground mb-4">
								Updating jobs…
							</p>
						)}
						<div className="grid gap-4">
							{jobs.length === 0 ? (
								<Card>
									<CardContent className="pt-6">
										<div className="text-center py-12">
											<Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
											<h3 className="mt-4 text-lg font-semibold">
												No jobs found
											</h3>
											<p className="text-muted-foreground mt-2">
												{searchQuery
													? "Try adjusting your search criteria"
													: "Get started by posting your first job"}
											</p>
											{!searchQuery && (
												<Button className="mt-4 bg-mainColor" asChild>
													<Link href="/employer/post-job">Post a Job</Link>
												</Button>
											)}
										</div>
									</CardContent>
								</Card>
							) : (
								jobs.map((job) => (
									<Card
										key={job.id}
										className="hover:shadow-md transition-shadow"
									>
										<CardHeader>
											<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
												<div className="flex-1">
													<div className="flex items-start justify-between">
														<div>
															<CardTitle className="text-xl">
																{job.title}
															</CardTitle>
															<CardDescription className="mt-1">
																{job.company?.industry} • Posted{" "}
																{formatDate(job.date_created)}
															</CardDescription>
														</div>
													</div>

													<div className="flex flex-wrap gap-4 mt-4 text-sm">
														<div className="flex items-center gap-1 text-muted-foreground">
															<MapPin className="h-4 w-4" />
															<span>{job.location}</span>
														</div>
														<div className="flex items-center gap-1 text-muted-foreground">
															<Briefcase className="h-4 w-4" />
															<span>{job.type}</span>
														</div>
														<div className="flex items-center gap-1 text-muted-foreground">
															<DollarSign className="h-4 w-4" />
															<span>
																${job.salary_min.toLocaleString()} - $
																{job.salary_max.toLocaleString()}
															</span>
														</div>
													</div>
												</div>

												<div className="flex items-center gap-2">
													{getStatusBadge(job.status)}
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
																View Job
															</DropdownMenuItem>
															<DropdownMenuItem>
																<Edit className="mr-2 h-4 w-4" />
																Edit
															</DropdownMenuItem>
															<DropdownMenuItem>
																<Copy className="mr-2 h-4 w-4" />
																Duplicate
															</DropdownMenuItem>
															<DropdownMenuItem>
																<Archive className="mr-2 h-4 w-4" />
																{job.status === "active" ? "Close" : "Reopen"}
															</DropdownMenuItem>
															<DropdownMenuSeparator />
															<DropdownMenuItem className="text-red-600">
																<Trash2 className="mr-2 h-4 w-4" />
																Delete
															</DropdownMenuItem>
														</DropdownMenuContent>
													</DropdownMenu>
												</div>
											</div>
										</CardHeader>
										<CardContent>
											<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
												<div className="space-y-1">
													<p className="text-xs text-muted-foreground">
														Applications
													</p>
													<div className="flex items-center gap-2">
														<FileText className="h-4 w-4 text-mainColor" />
														<p className="text-2xl font-bold">
															{job.total_applications}
														</p>
													</div>
												</div>
												<div className="space-y-1">
													<p className="text-xs text-muted-foreground">Views</p>
													<div className="flex items-center gap-2">
														<Eye className="h-4 w-4 text-blue-500" />
														<p className="text-2xl font-bold">
															{job?.views || 0}
														</p>
													</div>
												</div>

												<div className="flex items-end">
													<Button
														variant="outline"
														className="w-full"
														size="sm"
														asChild
													>
														<Link href={`/employer/applicants/${job.id}`}>
															View Applicants
														</Link>
													</Button>
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
