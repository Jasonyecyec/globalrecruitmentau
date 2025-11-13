import { LoginFormSchema } from "@/schemas/auth";
import http from "@/services/http";
import type { LoginResponse } from "@/types/auth.type";

interface VerifyEmailResponse {
	success: boolean;
	message: string;
}

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

	verifyEmail: async (token: string): Promise<VerifyEmailResponse> => {
		try {
			const response = await http.get(`/auth/verify-email?token=${token}`);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
};
