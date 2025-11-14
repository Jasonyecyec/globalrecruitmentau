import http from "@/services/http";
import { ActionResponse } from "@/types/ActionResponse";
import { JobseekerDashboard, EmployerDashboard } from "@/types/dashboard";
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

export const useEmployerDashboard = () =>
	useQuery<EmployerDashboard>({
		queryKey: ["employer-dashboard"],
		queryFn: async () => {
			const response = await http.get<ActionResponse<EmployerDashboard>>(
				"/dashboard/employer",
			);
			const dashboard = response.data.data;
			if (!dashboard || typeof dashboard === "boolean") {
				throw new Error("Invalid dashboard response");
			}
			return dashboard;
		},
	});
