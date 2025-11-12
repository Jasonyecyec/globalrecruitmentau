export interface Applicant {
	id: number;
	user_id: number;
	job_id: number;
	name: string;
	first_name: string;
	last_name: string;
	contact_number: string;
	email: string;
	date_created: string;
	resume_presigned_url: string;
	image_url: string;
	cover_letter_presigned_url: string;
	status: string;
	experience: string;
	education: string;
	skills: string[];
}

type Employer = {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	image_url: string;
	contact_number: string;
	user_type: string;
};

type Company = {
	id: number;
	name: string;
	industry: string;
	size: string;
	location: string;
	website: string;
	about: string;
	logo: string;
	company_image_presigned_url: string;
	user_id: number;
	date_created: string;
	date_updated: string;
};

export interface Job {
	id: number;
	title: string;
	company: Company;
	location: string;
	salary: string;
	salary_min: number;
	salary_max: number;
	type: string;
	posted: string;
	logo: string;
	description: string;
	skills: string[];
	saved: boolean;
	aboutCompany: string;
	companySize: string;
	companyIndustry: string;
	companyWebsite: string;
	responsibilities: string[];
	qualifications: string[];
	applications: Applicant[];
	employer: Employer;
	total_applications: number;
	date_created: string;
}
