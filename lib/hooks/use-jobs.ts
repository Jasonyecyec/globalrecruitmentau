import { Job } from "@/types/job";
import { createCrudHooks } from "./use-crud-hooks";
import http from "@/services/http";

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
		const response = await http.get("/job");
		return response.data;
	} catch (error) {
		throw error;
	}
};
