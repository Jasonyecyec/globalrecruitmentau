import { Job } from "@/types/job";
import { createCrudHooks } from "./use-crud-hooks";

export const {
	useList: useJobList,
	useById: useJobById,
	useCreate: useJobCreate,
	useEdit: useJobEdit,
	useDelete: useJobDelete,
} = createCrudHooks<Job>("/job", "job");
