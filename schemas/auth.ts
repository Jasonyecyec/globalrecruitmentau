import { z } from "zod";

export const forgotPasswordSchema = z.object({
	email: z.string().email("Provide a valid email."),
});

export const verifyOTPSchema = z.object({
	otp: z.string().min(6, {
		message: "Your one-time password must be 6 digits.",
	}),
});

export type VerifyOTPFormSchema = z.infer<typeof verifyOTPSchema>;

export const baseResetPasswordSchema = z.object({
	new_password: z.string().min(8, "Password must be atleast 8 characters"),
	confirm_password: z.string(),
});

export const resetPasswordSchema = baseResetPasswordSchema.refine(
	(data) => data.new_password === data.confirm_password,
	{
		message: "Password does not match.",
		path: ["confirm_password"],
	},
);
export const loginSchema = z.object({
	email: z.string().email("Provide a valid email."),
	password: z.string().min(8, "Password must be atleast 8 characters"),
});

export type LoginFormSchema = z.infer<typeof loginSchema>;

const baseSignupSchema = z.object({
	first_name: z.string().min(1, "First name is required."),
	last_name: z.string().min(1, "Last name is required"),
	email: z.string().email().min(1, "Email is required"),
	contact_number: z.string().min(1, "Contact number is required"),
	password: z.string().min(8, "Password must be atleast 8 characters"),
	confirm_password: z.string().min(1, "Please confirm your password"),
	user_type: z.string(),
	resume_path: z.string().nullable(),
	image_url: z.string().nullable(),
	linked_profile: z.string().nullable(),
	portfolio_link: z.string().nullable(),
});

export const signupSchema = baseSignupSchema.refine(
	(data) => data.password === data.confirm_password,
	{
		message: "Passwords do not match",
		path: ["confirm_password"],
	},
);

export type SignupFormSchema = z.infer<typeof signupSchema>;

// Employer Signup Schema
const baseEmployerSignupSchema = z.object({
	company_name: z.string().min(1, "Company name is required"),
	about_company: z.string().min(10, "Please provide at least 10 characters"),
	industry: z.string().min(1, "Industry is required"),
	location: z.string().min(1, "Location is required"),
	industry_other: z.string().optional(),
	company_size: z.string().min(1, "Company size is required"),
	first_name: z.string().min(1, "First name is required"),
	last_name: z.string().min(1, "Last name is required"),
	job_title: z.string().min(1, "Job title is required"),
	contact_number: z.string().min(1, "Contact number is required"),
	email: z.string().email("Provide a valid email").min(1, "Email is required"),
	password: z.string().min(8, "Password must be at least 8 characters"),
	confirm_password: z.string().min(1, "Please confirm your password"),
	user_type: z.string(),
	company_logo: z.string().nullable(),
});

export const employerSignupSchema = baseEmployerSignupSchema.refine(
	(data) => data.password === data.confirm_password,
	{
		message: "Passwords do not match",
		path: ["confirm_password"],
	},
);

export type EmployerSignupFormSchema = z.infer<typeof employerSignupSchema>;
