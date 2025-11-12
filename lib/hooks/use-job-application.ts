import { createCrudHooks } from "./use-crud-hooks";
import { ActionResponse } from "@/types/ActionResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/services/http";
import { JobApplication } from "@/types/job-application";

const jobApplicationCrud = createCrudHooks<JobApplication>(
	"/job-application",
	"job-application",
);

export const { useList: useJobApplicationList } = jobApplicationCrud;

type CreateJobApplicationInput = {
	job_id: number;
	cover_letter?: File;
};

export const useJobApplicationCreate = () => {
	const queryClient = useQueryClient();

	return useMutation<
		ActionResponse<JobApplication>,
		Error,
		CreateJobApplicationInput
	>({
		mutationFn: async ({ job_id, cover_letter }) => {
			const formData = new FormData();
			formData.append("job_id", String(job_id));

			if (cover_letter) {
				formData.append("cover_letter", cover_letter);
			}

			const response = await http.post("/job-application", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["job-application"] });
		},
	});
};

// Custom edit hook with file upload support
export const useJobApplicationUpdate = () => {
	const queryClient = useQueryClient();

	return useMutation<
		ActionResponse<JobApplication>,
		Error,
		{ id: string; jobId: string; data: { status?: string; file?: File } }
	>({
		mutationFn: async ({ id, data }) => {
			const formData = new FormData();
			if (data.status) {
				formData.append("status", data.status);
			}
			if (data.file) {
				formData.append("file", data.file);
			}
			const response = await http.patch(`/job-application/${id}`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response.data;
		},
		onSuccess: (_, { id, jobId }) => {
			queryClient.invalidateQueries({ queryKey: ["job", jobId] });
			queryClient.invalidateQueries({ queryKey: ["job-application"] });
			queryClient.invalidateQueries({ queryKey: ["job-application", id] });
		},
	});
};
