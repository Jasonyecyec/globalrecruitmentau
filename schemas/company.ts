import { z } from "zod";

// Schema for form validation (accepts File or string URL)
export const companySchema = z.object({
	id: z.number().optional(),
	name: z.string().min(1, "Company name is required"),
	industry: z.string().min(1, "Industry is required"),
	size: z.string().min(1, "Size is required"),
	location: z.string().min(1, "Location is required"),
	website: z
		.union([z.string().url("Invalid website URL"), z.literal("")])
		.transform((val) => (val === "" ? undefined : val))
		.optional(),
	about: z.string().min(1, "Description is required"),
	company_image: z
		.union([
			z
				.instanceof(File)
				.refine(
					(file) => {
						// Max file size: 5MB
						const maxSize = 5 * 1024 * 1024;
						return file.size <= maxSize;
					},
					{ message: "Image must be less than 5MB" },
				)
				.refine(
					(file) => {
						// Allowed image types
						const allowedTypes = [
							"image/jpeg",
							"image/jpg",
							"image/png",
							"image/webp",
						];
						return allowedTypes.includes(file.type);
					},
					{ message: "Only JPEG, PNG, and WebP images are allowed" },
				),
			z.string().url(),
			z.undefined(),
		])
		.optional(),
	delete_image: z.boolean().optional(),
});

export type CompanyFormSchema = z.infer<typeof companySchema>;
