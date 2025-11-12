import { useMutation } from "@tanstack/react-query";
import http from "@/services/http";
import { ActionResponse } from "@/types/ActionResponse";
import { ContactRequest } from "@/types/contact";

export const useContactSubmit = () => {
	return useMutation<ActionResponse<null>, Error, ContactRequest>({
		mutationFn: async (payload) => {
			const response = await http.post("/contact", payload);
			return response.data;
		},
	});
};
