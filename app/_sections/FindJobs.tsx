"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import JobCard from "@/app/_components/JobCard";
import { getPublicJobs } from "@/lib/hooks/use-jobs";
import { Job } from "@/types/job";
import { ViewMoreJobsButton } from "../_components/ViewMoreJobsButton";

const extractJobs = (payload: unknown): Job[] => {
	if (Array.isArray(payload)) {
		return payload as Job[];
	}

	if (
		payload &&
		typeof payload === "object" &&
		Array.isArray((payload as { data?: Job[] }).data)
	) {
		return (payload as { data: Job[] }).data;
	}

	return [];
};

export default function FindJobs() {
	const [jobs, setJobs] = useState<Job[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		const fetchJobs = async () => {
			try {
				setIsLoading(true);
				const response = await getPublicJobs();
				if (!isMounted) return;

				setJobs(extractJobs(response?.data ?? response));
				setError(null);
			} catch (err) {
				if (!isMounted) return;
				console.error("Failed to load public jobs", err);
				setError("Unable to load jobs right now. Please try again soon.");
				setJobs([]);
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};

		void fetchJobs();

		return () => {
			isMounted = false;
		};
	}, []);

	const renderJobs = useMemo(() => {
		if (isLoading) {
			return (
				<p className="text-center text-sm text-muted-foreground">
					Loading available jobs...
				</p>
			);
		}

		if (error) {
			return (
				<p className="text-center text-sm text-red-500" role="alert">
					{error}
				</p>
			);
		}

		if (!jobs.length) {
			return (
				<p className="text-center text-sm text-muted-foreground">
					Jobs will appear here once they are available.
				</p>
			);
		}

		return (
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{jobs.map((job: Job) => (
					<JobCard data={job} key={job.id} />
				))}
			</div>
		);
	}, [isLoading, error, jobs]);

	return (
		<section className="bg-[#f9fafc] py-16" id="find-dream-jobs">
			<div className="mx-auto max-w-6xl px-4">
				<h2 className="text-3xl font-bold text-left mb-10">
					Find Your Dream Job
				</h2>

				<div className="bg-white p-6 rounded-lg shadow w-full ">
					<div className="flex w-full space-x-4 mb-10 items-center">
						<div className="flex-1 relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
							<Input
								className="pl-10"
								placeholder="Job title, keywords, or company"
							/>
						</div>

						<div className="flex-2 relative">
							<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
							<Input className="pl-10" placeholder="City, state, or country" />
						</div>

						<Button className="flex-2">
							<Search />
							Search Jobs
						</Button>
					</div>

					{renderJobs}

					<div className="mt-10 text-center">
						<ViewMoreJobsButton />
					</div>
				</div>
			</div>
		</section>
	);
}
