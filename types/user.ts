export interface User {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	user_type: "admin" | "jobseeker" | "employer";
	contact_number: string;
	resume_path: string;
	resume_presigned_url: string;
	linked_profile: string;
	portfolio_link: string;
	image_url: string;
	image_presigned_url: string;
	isVerified: boolean;
	date_created: string;
}
