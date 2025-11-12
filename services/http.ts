import axios, {
	type AxiosError,
	type AxiosInstance,
	type InternalAxiosRequestConfig,
} from "axios";
import { deleteCookie, getCookie } from "cookies-next";

// Create axios instance with default config
const http: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 30000, // 30 second timeout
});

export const logout = () => {
	localStorage.removeItem("userId");

	deleteCookie("role");
	deleteCookie("refresh-token");
	deleteCookie("token");
	deleteCookie("email");
};

// Request interceptor - Add auth token to requests
http.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// Get token from cookies
		const token = getCookie("token");

		// Add token to headers if it exists
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Response interceptor - Handle errors and token refresh
http.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error: AxiosError) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & {
			_retry?: boolean;
		};

		// Handle 401 Unauthorized - Token expired or invalid
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// TODO: Implement token refresh logic when backend supports it
				// const refreshToken = getCookie("refresh-token");
				// if (refreshToken) {
				//   const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
				//     refresh_token: refreshToken
				//   });
				//   const { token } = response.data;
				//   setCookie("token", token);
				//   originalRequest.headers.Authorization = `Bearer ${token}`;
				//   return http(originalRequest);
				// }

				// For now, just clear auth and redirect to login
				logout();
			} catch (refreshError) {
				// Refresh failed, clear auth
				logout();
				return Promise.reject(refreshError);
			}
		}

		// Handle 403 Forbidden - User doesn't have permission
		if (error.response?.status === 403) {
			logout();
		}

		// Handle 500 Server Error
		if (error.response?.status === 500) {
			console.error("Server error occurred", error.response.data);
		}

		return Promise.reject(error);
	},
);

export default http;
