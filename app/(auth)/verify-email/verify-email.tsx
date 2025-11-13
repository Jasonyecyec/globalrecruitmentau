"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import RPGLogo from "@/public/img/recruitmentglobal_logo.jpg";
import { authService } from "@/services/auth.service";

type VerificationState = "verifying" | "success" | "error" | "expired";

export default function VerifyEmail() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const [state, setState] = useState<VerificationState>("verifying");
	const [message, setMessage] = useState("");
	const [countdown, setCountdown] = useState(5);

	useEffect(() => {
		const verifyEmail = async () => {
			if (!token) {
				setState("error");
				setMessage("Invalid verification link. No token provided.");
				return;
			}

			try {
				const response = await authService.verifyEmail(token);

				if (response.success) {
					setState("success");
					setMessage(
						response.message ||
							"Your email has been verified successfully! You can now sign in to your account.",
					);

					// Start countdown for redirect
					let count = 5;
					setCountdown(count);

					const countdownInterval = setInterval(() => {
						count--;
						setCountdown(count);

						if (count === 0) {
							clearInterval(countdownInterval);
							router.push("/signin");
						}
					}, 1000);

					return () => clearInterval(countdownInterval);
				} else {
					setState("error");
					setMessage(
						response.message || "Verification failed. Please try again.",
					);
				}
			} catch (error: unknown) {
				const errorMessage =
					(error as { response?: { data?: { message?: string } } })?.response
						?.data?.message || "An error occurred during verification.";

				if (
					errorMessage.toLowerCase().includes("expired") ||
					errorMessage.toLowerCase().includes("invalid")
				) {
					setState("expired");
					setMessage(errorMessage);
				} else {
					setState("error");
					setMessage(errorMessage);
				}
			}
		};

		verifyEmail();
	}, [token, router]);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-5">
			<Card className="w-full max-w-md shadow-lg">
				<CardHeader className="space-y-1 text-center">
					<div className="flex justify-center mb-4">
						<Link href="/">
							<Image
								src={RPGLogo}
								alt="Recruitment Placement Global"
								width={120}
								height={120}
								className="object-contain"
							/>
						</Link>
					</div>
					<CardTitle className="text-2xl font-bold text-secondaryColor">
						Email Verification
					</CardTitle>
					<CardDescription>
						{state === "verifying" &&
							"Please wait while we verify your email..."}
						{state === "success" && "Verification Successful!"}
						{state === "error" && "Verification Failed"}
						{state === "expired" && "Link Expired"}
					</CardDescription>
				</CardHeader>

				<CardContent>
					<div className="flex flex-col items-center space-y-6 py-6">
						{/* Loading State */}
						{state === "verifying" && (
							<>
								<div className="rounded-full bg-blue-100 p-6">
									<Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
								</div>
								<div className="text-center space-y-2">
									<p className="text-lg font-medium">Verifying your email...</p>
									<p className="text-sm text-muted-foreground">
										This will only take a moment
									</p>
								</div>
							</>
						)}

						{/* Success State */}
						{state === "success" && (
							<>
								<div className="rounded-full bg-green-100 p-6">
									<CheckCircle2 className="h-16 w-16 text-green-600" />
								</div>
								<div className="text-center space-y-2">
									<p className="text-lg font-medium">Email Verified!</p>
									<p className="text-sm text-muted-foreground">{message}</p>
									<p className="text-xs text-muted-foreground mt-4">
										Redirecting to sign in page in{" "}
										<span className="font-bold text-mainColor">
											{countdown}
										</span>{" "}
										seconds...
									</p>
								</div>
								<Button
									className="w-full bg-mainColor hover:bg-orange-400"
									asChild
								>
									<Link href="/signin">Sign In Now</Link>
								</Button>
							</>
						)}

						{/* Error State */}
						{state === "error" && (
							<>
								<div className="rounded-full bg-red-100 p-6">
									<XCircle className="h-16 w-16 text-red-600" />
								</div>
								<div className="text-center space-y-2">
									<p className="text-lg font-medium">Verification Failed</p>
									<p className="text-sm text-muted-foreground">{message}</p>
								</div>
								<div className="w-full space-y-2">
									<Button
										className="w-full bg-mainColor hover:bg-orange-400"
										asChild
									>
										<Link href="/signin">Go to Sign In</Link>
									</Button>
									<Button className="w-full" variant="outline" asChild>
										<Link href="/signup">Create New Account</Link>
									</Button>
								</div>
							</>
						)}

						{/* Expired State */}
						{state === "expired" && (
							<>
								<div className="rounded-full bg-orange-100 p-6">
									<Mail className="h-16 w-16 text-orange-600" />
								</div>
								<div className="text-center space-y-2">
									<p className="text-lg font-medium">Link Expired</p>
									<p className="text-sm text-muted-foreground">{message}</p>
									<p className="text-xs text-muted-foreground mt-4">
										Please request a new verification email
									</p>
								</div>
								<div className="w-full space-y-2">
									<Button
										className="w-full bg-mainColor hover:bg-orange-400"
										asChild
									>
										<Link href="/signin">Go to Sign In</Link>
									</Button>
									<Button className="w-full" variant="outline" asChild>
										<Link href="/signup">Create New Account</Link>
									</Button>
								</div>
							</>
						)}
					</div>
				</CardContent>
			</Card>

			{/* Help Text */}
			<div className="mt-6 text-center text-sm text-muted-foreground max-w-md">
				<p>
					Having trouble?{" "}
					<Link href="/contact" className="text-mainColor hover:underline">
						Contact Support
					</Link>
				</p>
			</div>
		</div>
	);
}
