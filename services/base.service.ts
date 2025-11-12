import { ActionResponse } from "@/types/ActionResponse";
import { ApiResponse } from "@/types/ApiResponse";
import http from "@/services/http";

export const createBaseService = (baseUrl: string) => ({
	getAll: async <T>(
		filterParams?: Record<string, unknown>,
	): Promise<ApiResponse<T>> => {
		const { currentPage, pageSize, ...rest } = filterParams ?? {};
		const response = await http.get(baseUrl, {
			params: {
				page: currentPage,
				limit: pageSize,
				...rest,
			},
		});
		return response.data;
	},

	getById: async <T>(id: string | number): Promise<T> => {
		const response = await http.get(`${baseUrl}/${id}`);
		return response.data.data;
	},

	create: async <T>(data: Partial<T>): Promise<ActionResponse<T>> => {
		const response = await http.post(baseUrl, data);
		return response.data;
	},

	update: async <T>(
		id: string | number,
		data: Partial<T>,
	): Promise<ActionResponse<T>> => {
		const response = await http.patch(`${baseUrl}/${id}`, data);
		return response.data;
	},

	edit: async <T>(
		id: string | number,
		data: Partial<T>,
	): Promise<ActionResponse<T>> => {
		const response = await http.put(`${baseUrl}/${id}`, {
			...data,
			_method: "PUT",
		});
		return response.data;
	},

	delete: async (id: string | number): Promise<ActionResponse<boolean>> => {
		const response = await http.delete(`${baseUrl}/${id}`);
		return response.data;
	},
});
