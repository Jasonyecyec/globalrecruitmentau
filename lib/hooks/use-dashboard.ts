import http from "@/services/http";
import { ActionResponse } from "@/types/ActionResponse";
import { JobseekerDashboard } from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";

export const useJobSeekerDashboard = () =>
	useQuery<JobseekerDashboard>({
		queryKey: ["jobseeker-dashboard"],
		queryFn: async () => {
			const response = await http.get<ActionResponse<JobseekerDashboard>>(
				"/dashboard/jobseeker",
			);
			const overview = response.data.data;
			if (!overview || typeof overview === "boolean") {
				throw new Error("Invalid dashboard overview response");
			}
			return overview;
		},
	});
