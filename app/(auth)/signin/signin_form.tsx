"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail, LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RPGLogo from "@/public/img/recruitmentglobal_logo.jpg";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginFormSchema, loginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useLogin } from "@/lib/hooks/use-auth";
import { useUserStore } from "@/stores/user.store";
import { User } from "@/types/user";

const SignInForm = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormSchema>({
		resolver: zodResolver(loginSchema),
	});

	const [showPassword, setShowPassword] = useState<boolean>(false);
	const { mutateAsync: login, isPending } = useLogin();
	const { setUser } = useUserStore();

	const handleLogin: SubmitHandler<LoginFormSchema> = async (formData) => {
		try {
			const response = await login(formData);

			if (response?.success) {
				router.push("/home");
				setUser(response.user as User);
			}
		} catch (error: unknown) {
			console.error("Login error:", error);
		}
	};

	return (
		<div
			className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4"
			id="login"
		>
			<Card className="w-full max-w-md shadow-lg">
				<CardHeader className="space-y-2">
					<CardTitle className="flex flex-col items-center text-center font-bold text-secondaryColor text-xl">
						<Link href="/">
							<Image
								src={RPGLogo}
								alt="Recruitment Placement Global"
								width={280}
								height={80}
								className="object-contain h-28 w-28"
							/>
						</Link>

						<span>Login</span>
					</CardTitle>
					<CardDescription className="text-center text-base text-gray-500">
						Enter your credentials to access your account
					</CardDescription>
				</CardHeader>

				<CardContent className="w-full">
					<form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<div className="relative">
								<Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
								<Input
									id="email"
									placeholder="name@exampl.com"
									type="email"
									required
									className="pl-8"
									{...register("email")}
								/>
							</div>
							{errors.email && (
								<p className="text-red-500 text-sm mt-1">
									{errors.email.message}
								</p>
							)}
						</div>
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<Label htmlFor="password">Password</Label>
								<Link
									href="/forgot-password"
									className="text-sm text-gray-400 hover:text-orange-600 transition-all duration-300"
								>
									Forgot password?
								</Link>
							</div>

							<div className="relative">
								<Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									required
									className="pl-8 pr-8"
									{...register("password")}
								/>
								<button
									onClick={() => setShowPassword(!showPassword)}
									type="button"
									className="absolute right-3 top-3 text-gray-400"
								>
									{showPassword ? (
										<EyeOff className="h-4 w-4" />
									) : (
										<Eye className="h-4 w-4" />
									)}
								</button>
							</div>

							{errors.password && (
								<p className="text-red-500 text-sm mt-1">
									{errors.password.message}
								</p>
							)}
						</div>
						<Button
							disabled={isPending}
							type="submit"
							className="w-full bg-mainColor text-white font-semibold hover:bg-orange-400 transition-all duration-300"
						>
							{isPending ? (
								<LoaderCircle className="h-10 text-3xl animate-spin" />
							) : (
								"Login"
							)}
						</Button>
					</form>

					<div className="relative py-2">
						<div className="absolute inset-0 flex items-center ">
							<div className="w-full border-t border-gray-300" />
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-white text-gray-500">
								Or continue with
							</span>
						</div>
					</div>

					<Button
						variant="outline"
						className="text-gray-600 w-full border-gray-300"
					>
						Continue with Google
					</Button>
				</CardContent>

				<CardFooter className="flex justify-center">
					<p className="text-sm">
						Don't have an account?
						<Link
							href="/signup"
							className="ml-1 font-medium text-gray-600 transition-all duration-250 hover:text-mainColor "
						>
							Sign Up
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
};

export default SignInForm;
