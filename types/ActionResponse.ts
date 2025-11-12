export interface ActionResponse<T = unknown> {
	data?: T | boolean;
	message: string;
	success: boolean;
	errors?: Record<string, string[]>;
}
