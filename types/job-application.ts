export interface JobApplication {
	id: number;
	user_id: number;
	job_id: number;
	cover_letter: string;
	cover_letter_pre_signed_url: string;
	status: string;
	date_created: string;
	date_updated: string;
}
