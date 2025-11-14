import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import JobCard from "@/app/_components/JobCard";
import { getPublicJobs } from "@/lib/hooks/use-jobs";
import { Job } from "@/types/job";
import { isAuthenticated } from "@/lib/helpers/utils";
import { ViewMoreJobsButton } from "../_components/ViewMoreJobsButton";

export default async function FindJobs() {
	const response = await getPublicJobs();

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

					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{response.data?.map((jobs: Job) => (
							<JobCard data={jobs} key={jobs.id} />
						))}
					</div>

					<div className="mt-10 text-center">
						<ViewMoreJobsButton />
					</div>
				</div>
			</div>
		</section>
	);
}
