import type {
	EmployerSignupFormSchema,
	LoginFormSchema,
	SignupFormSchema,
} from "@/schemas/auth";
import http from "@/services/http";
import type { LoginResponse, VerifyEmailResponse } from "@/types/auth.type";

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

	signup: async (
		data: SignupFormSchema,
		resumeFile?: File | null,
		imageFile?: File | null,
	): Promise<LoginResponse> => {
		try {
			const formData = new FormData();

			// Append text fields
			formData.append("first_name", data.first_name);
			formData.append("last_name", data.last_name);
			formData.append("email", data.email);
			formData.append("contact_number", data.contact_number);
			formData.append("password", data.password);
			formData.append("user_type", data.user_type);
			formData.append("linked_profile", data.linked_profile || "");
			formData.append("portfolio_link", data.portfolio_link || "");

			// Append files if provided
			if (resumeFile) {
				formData.append("resume", resumeFile);
			}
			if (imageFile) {
				formData.append("image", imageFile);
			}

			const response = await http.post("/auth/signup", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	employerSignup: async (
		data: EmployerSignupFormSchema,
		logoFile?: File | null,
	): Promise<LoginResponse> => {
		const formData = new FormData();

		//User
		formData.append("first_name", data.first_name);
		formData.append("last_name", data.last_name);
		formData.append("email", data.email);
		formData.append("contact_number", data.contact_number);
		formData.append("password", data.password);
		formData.append("user_type", data.user_type);

		//Company
		formData.append("industry", data.industry);
		formData.append("location", data.location);
		formData.append("company_size", data.company_size);
		formData.append("company_name", data.company_name);
		formData.append("about_company", data.about_company);

		// Append logo if provided
		if (logoFile) {
			formData.append("company_image_url", logoFile);
		}

		const response = await http.post("/auth/signup", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	},

	verifyEmail: async (token: string): Promise<VerifyEmailResponse> => {
		const response = await http.get(`/auth/verify-email?token=${token}`);
		return response.data;
	},
};
