import { Company } from "@/types/companies";
import { createCrudHooks } from "./use-crud-hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/services/http";
import { ActionResponse } from "@/types/ActionResponse";
import { CompanyFormSchema } from "@/schemas/company";

const baseCrudHooks = createCrudHooks<Company>("/company", "companies");

const convertToFormData = (data: CompanyFormSchema): FormData => {
	const formData = new FormData();

	const allowedFields = [
		"name",
		"about",
		"location",
		"size",
		"industry",
		"company_image",
		"delete_image",
	];

	Object.entries(data).forEach(([key, value]) => {
		// Only include fields that backend expects
		if (!allowedFields.includes(key)) return;

		if (value !== undefined && value !== null) {
			if (value instanceof File) {
				// Handle file upload
				formData.append(key, value);
			} else if (typeof value === "boolean") {
				// Convert boolean to string for FormData
				formData.append(key, value ? "true" : "false");
			} else if (typeof value === "string" || typeof value === "number") {
				// Handle string and number values
				formData.append(key, value.toString());
			}
		}
	});

	return formData;
};

// Custom create hook with file upload support
export const useCompanyCreate = () => {
	const queryClient = useQueryClient();

	return useMutation<ActionResponse<Company>, Error, CompanyFormSchema>({
		mutationFn: async (data) => {
			const formData = convertToFormData(data);
			const response = await http.post("/company", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["companies"] });
		},
	});
};

// Custom edit hook with file upload support
export const useCompanyEdit = () => {
	const queryClient = useQueryClient();

	return useMutation<
		ActionResponse<Company>,
		Error,
		{ id: string; data: CompanyFormSchema }
	>({
		mutationFn: async ({ id, data }) => {
			const formData = convertToFormData(data);
			formData.append("_method", "PUT");

			const response = await http.put(`/company/${id}`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response.data;
		},
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: ["companies"] });
			queryClient.invalidateQueries({ queryKey: ["companies", id] });
		},
	});
};

export const {
	useList: useCompanyList,
	useById: useCompanyById,
	useUpdate: useCompanyUpdate,
	useDelete: useCompanyDelete,
} = baseCrudHooks;
