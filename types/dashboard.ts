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

export interface EmployerRecentApplication {
	id: number;
	candidate_name: string;
	position: string;
	applied_date: string;
	avatar: string | null;
	status: string;
}

export interface EmployerApplicationTrend {
	month: string;
	applications: number;
}

export interface EmployerDashboard {
	overview: {
		active_jobs: number;
		active_jobs_change_from_last_month: number;
		total_applicants: number;
		total_applicants_change_from_last_week: number;
		pending_applications: number;
		pending_applications_this_week: number;
		shortlisted: number;
		shortlisted_change_from_last_month: number;
	};
	application_trends: EmployerApplicationTrend[];
	recent_applications: EmployerRecentApplication[];
}
