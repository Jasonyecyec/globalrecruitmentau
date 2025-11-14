import { Job } from "@/types/job";
import { createCrudHooks } from "./use-crud-hooks";
import http from "@/services/http";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/types/ApiResponse";

export const {
	useList: useJobList,
	useById: useJobById,
	useCreate: useJobCreate,
	useEdit: useJobEdit,
	useDelete: useJobDelete,
} = createCrudHooks<Job>("/job", "job");

// Get Public Jobs
export const getPublicJobs = async () => {
	try {
		const response = await http.get("/job?limit=6");
		return response.data;
	} catch (error) {
		throw error;
	}
};

type JobPostedFilters = {
	status?: string;
	search?: string;
	type?: string;
};

export const getJobPosted = async (filters?: JobPostedFilters) => {
	try {
		const response = await http.get("/job/job-posted", {
			params: { ...filters },
		});
		return response.data as ApiResponse<Job>;
	} catch (error) {
		throw error;
	}
};

export const useJobPostedList = (filters?: JobPostedFilters) => {
	return useQuery<ApiResponse<Job>, Error>({
		queryKey: ["job-posted", filters],
		queryFn: () => getJobPosted(filters),
		placeholderData: keepPreviousData,
	});
};
