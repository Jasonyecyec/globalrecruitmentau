// Services
import { authService } from "@/services/auth.service";
import { logout as clearAuthData } from "@/services/http";
// Externals
import { getCookie, setCookie } from "cookies-next";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/user.store";

export const useLogin = () => {
	return useMutation({
		mutationFn: ({ email, password }: { email: string; password: string }) =>
			authService.login({ email, password }),
		onSuccess: (response) => {
			const { token, user } = response;

			if (!token) {
				toast.error("Login failed: Invalid server response");
				return;
			}

			localStorage.setItem("userId", user.id.toString());
			setCookie("token", token);
			setCookie("role", user.user_type);
			setCookie("email", user.email.toString());
			toast.success("Login successful!");
		},
		onError: (error: unknown) => {
			const errorMessage =
				(error as { response?: { data?: { message?: string } } })?.response
					?.data?.message || "Login failed";
			toast.error(errorMessage);
		},
	});
};

export const useLogout = () => {
	const router = useRouter();
	const { clearUser } = useUserStore();

	const handleLogout = useCallback(() => {
		// Clear cookies and localStorage (from http.ts)
		clearAuthData();

		// Clear Zustand store
		clearUser();

		// Redirect to home page
		router.push("/");

		toast.success("Logged out successfully");
	}, [clearUser, router]);

	return handleLogout;
};
