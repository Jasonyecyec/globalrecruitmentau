import { z } from "zod";

// Job creation schema
export const jobSchema = z.object({
	title: z.string().min(1, "Job title is required"),
	company_id: z.number({
		required_error: "Please select a company",
		invalid_type_error: "Please select a valid company",
	}),
	location: z.string().min(1, "Location is required"),
	salary_min: z.coerce
		.number({
			required_error: "Minimum salary is required",
			invalid_type_error: "Please enter a valid number",
		})
		.min(0, "Minimum salary must be 0 or greater"),
	salary_max: z.coerce
		.number({
			required_error: "Maximum salary is required",
			invalid_type_error: "Please enter a valid number",
		})
		.min(0, "Maximum salary must be 0 or greater"),
	type: z.string().min(1, "Job type is required"),
	description: z.string().min(10, "Job description must be at least 10 characters"),
	skills: z.array(z.string()).min(1, "At least one skill is required"),
	responsibilities: z.array(z.string()).min(1, "At least one responsibility is required"),
	qualifications: z.array(z.string()).min(1, "At least one qualification is required"),
}).refine((data) => data.salary_max >= data.salary_min, {
	message: "Maximum salary must be greater than or equal to minimum salary",
	path: ["salary_max"],
});

export type JobFormSchema = z.infer<typeof jobSchema>;
