export interface LoginResponse {
	success: boolean;
	message: string;
	token: string;
	user: {
		id: number;
		first_name: string;
		last_name: string;
		email: string;
		user_type: string;
	};
}
