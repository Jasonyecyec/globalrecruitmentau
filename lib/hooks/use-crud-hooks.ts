import { createBaseService } from "@/services/base.service";
import { ActionResponse } from "@/types/ActionResponse";
import { ApiResponse } from "@/types/ApiResponse";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const createCrudHooks = <T>(baseUrl: string, queryKeyPrefix: string) => {
	const service = createBaseService(baseUrl);

	const useList = (filterParams?: {
		currentPage?: number;
		pageSize?: number;
	}) =>
		useQuery<ApiResponse<T>, Error>({
			queryKey: [queryKeyPrefix, filterParams],
			queryFn: () => service.getAll<T>(filterParams),
		});

	const useById = (id: string) =>
		useQuery<T, Error>({
			queryKey: [queryKeyPrefix, id],
			queryFn: () => service.getById<T>(id),
			enabled: !!id,
		});

	const useByIdImperative = () => {
		const queryClient = useQueryClient();

		const getById = async (id: string): Promise<T> => {
			return queryClient.fetchQuery({
				queryKey: [queryKeyPrefix, id],
				queryFn: () => service.getById<T>(id),
			});
		};

		return { getById };
	};

	const useCreate = () => {
		const queryClient = useQueryClient();
		return useMutation<ActionResponse<T>, Error, Partial<T>>({
			mutationFn: (data) => service.create<T>(data),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [queryKeyPrefix] });
			},
		});
	};

	const useUpdate = () => {
		const queryClient = useQueryClient();
		return useMutation<
			ActionResponse<T>,
			Error,
			{ id: string; data: Partial<T> }
		>({
			mutationFn: ({ id, data }) => service.update<T>(id, data),
			onSuccess: (_, { id }) => {
				queryClient.invalidateQueries({ queryKey: [queryKeyPrefix] });
				queryClient.invalidateQueries({ queryKey: [queryKeyPrefix, id] });
			},
		});
	};

	const useEdit = () => {
		const queryClient = useQueryClient();
		return useMutation<
			ActionResponse<T>,
			Error,
			{ id: string; data: Partial<T> }
		>({
			mutationFn: ({ id, data }) => service.edit<T>(id, data),
			onSuccess: (_, { id }) => {
				queryClient.invalidateQueries({ queryKey: [queryKeyPrefix] });
				queryClient.invalidateQueries({ queryKey: [queryKeyPrefix, id] });
			},
		});
	};

	const useDelete = () => {
		const queryClient = useQueryClient();
		return useMutation<ActionResponse<boolean>, Error, string>({
			mutationFn: (id) => service.delete(id),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [queryKeyPrefix] });
			},
		});
	};

	return {
		useList,
		useById,
		useByIdImperative,
		useCreate,
		useUpdate,
		useEdit,
		useDelete,
	};
};
