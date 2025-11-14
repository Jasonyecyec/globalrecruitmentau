export interface JobSeekerAplicationStatus {
	status: string;
	count: number;
}

export interface JobSeekerMetrics {
	under_review_rate: number;
	shortlisted_conversion: number;
	offer_rate: number;
	under_review_text: string;
	shortlisted_text: string;
	offer_text: string;
}

export interface JobseekerDashboard {
	overview: {
		total_applications: number;
		applications_from_last_week: number;
		shortlisted: number;
		shortlisted_from_last_week: number;
		accepted: number;
		accepted_from_last_week: number;
		rejected: number;
		rejected_from_last_week: number;
	};
	application_status: JobSeekerAplicationStatus[];
	metrics: JobSeekerMetrics;
}
