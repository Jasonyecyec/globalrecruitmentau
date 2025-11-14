"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building, MapPin } from "lucide-react";
import { Job } from "@/types/job";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/helpers/utils";
import { getCookie } from "cookies-next";

type JobCardProps = {
	data: Job;
};

const JobCard = ({ data }: JobCardProps) => {
	const router = useRouter();
	const role = getCookie("role");

	const handleClick = () => {
		if (isAuthenticated() && role === "jobseeker") {
			router.push("/home/find-jobs");
		} else {
			router.push("/signin");
		}
	};

	return (
		<Card className="p-4 space-y-4 cursor-pointer">
			<div className="flex justify-between items-center">
				<p className="text-lg font-semibold">{data.title}</p>
				<p className="rounded-full bg-green-100 text-green-600 px-3 py-1 text-xs capitalize font-semibold">
					{data.status}
				</p>
			</div>

			<div className="text-sm text-gray-500 space-y-1">
				<p className="flex items-center">
					<Building className="h-4" /> {data.company.name}
				</p>
				<p className="flex items-center">
					<MapPin className="h-4" />
					{data.company.location}
				</p>
			</div>

			<div className="flex justify-between items-center">
				<p className="text-sm text-gray-600">
					${data.salary_min.toLocaleString()} - $
					{data.salary_max.toLocaleString()}
				</p>
				<Button onClick={handleClick} variant="outline">
					Apply Now
				</Button>
			</div>
		</Card>
	);
};

export default JobCard;
