"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { jobs } from "@/app/_constants/homeConstants";

import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import JobCard from "../_components/JobCard";
import JobDetails from "../_components/JobDetails";

import { Filter, Search, MapPin } from "lucide-react";
import { useState } from "react";
import { useJobList } from "@/lib/hooks/use-jobs";
import { Job } from "@/types/job";

export default function FindJobs() {
	const { data: jobsList } = useJobList();

	const [selectedJob, setSelectedJob] = useState<Job | null>(null);
	const [savedJobs, setSavedJobs] = useState(jobs.filter((job) => job.saved));

	const toggleSaveJob = (jobId: number) => {
		const updatedJobs = jobs.map((job) =>
			job.id === jobId ? { ...job, saved: !job.saved } : job,
		);

		setSavedJobs(updatedJobs.filter((job) => job.saved));
	};

	return (
		<div className="grid flex-1 gap-4 md:grid-cols-[1fr_400px] lg:grid-cols-[1fr_500px] p-4 sm:px-4 md:py-4">
			<main className="flex flex-col gap-4">
				<div className="flex flex-col gap-4 md:flex-row md:items-center">
					<div className="flex-1 space-y-1">
						<h1 className="text-2xl font-bold tracking-tight">
							Find Your Next Opportunity
						</h1>
						<p className="text-muted-foreground">
							Browse through thousands of job listings tailored to your skills
							and experience.
						</p>
					</div>

					<div className="flex items-center gap-2">
						<Button variant="outline" size="sm">
							<Filter className="mr-2 h-4 w-4" />
							Filters
						</Button>
						<Select defaultValue="newest">
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Sort by" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="newest">Newest first</SelectItem>
								<SelectItem value="salary">Highest salary</SelectItem>
								<SelectItem value="relevance">Most relevant</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="grid gap-4 mb-5">
					<div className="flex flex-col gap-2 sm:flex-row items-center">
						<div className="relative flex-1">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search jobs, skills, or companies"
								className="pl-8"
							/>
						</div>

						<div className="relative flex-1 sm:max-w-[260px]">
							<MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="text"
								placeholder="Location or Remote"
								className="pl-8"
							/>
						</div>

						<Button type="submit" className="shrink-0 h-9">
							Search Jobs
						</Button>
					</div>
				</div>

				{/* JOB LIST COMPONENT */}
				{jobsList?.data?.map((job) => (
					<JobCard
						key={job.id}
						job={job}
						isSelected={selectedJob?.id === job.id}
						onSelect={() => setSelectedJob(job)}
						onToggleSave={() => toggleSaveJob(job.id)}
					/>
				))}
			</main>

			<aside className="hidden md:block relative">
				<JobDetails
					job={selectedJob}
					onToggleSave={() => selectedJob && toggleSaveJob(selectedJob.id)}
				/>
			</aside>
		</div>
	);
}
