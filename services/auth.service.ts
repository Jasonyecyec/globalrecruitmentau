import { LoginFormSchema } from "@/schemas/auth";
import http from "@/services/http";
import type { LoginResponse } from "@/types/auth.type";
export const authService = {
	login: async ({
		email,
		password,
	}: LoginFormSchema): Promise<LoginResponse> => {
		try {
			const response = await http.post("/auth/signin", { email, password });
			return response.data;
		} catch (error) {
			throw error;
		}
	},
};
