"use client";
import Link from "next/link";
import { Check, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function EmployerAccountSuccess() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
			<Card className="w-full max-w-md text-center shadow-lg">
				<CardHeader className="space-y-1">
					<div className="flex justify-center">
						<CheckCircle className="h-16 w-16 text-mainColor" />
					</div>
					<CardTitle className="text-2xl font-bold text-secondaryColor">
						Account Created!
					</CardTitle>
					<CardDescription>
						Your employer account has been successfully created
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-gray-600">
						We&apos;ve sent a confirmation email to your inbox. Please verify
						your email to unlock all features.
					</p>
					<div className="rounded-lg bg-gray-50 p-4 border border-gray-200">
						<h3 className="font-medium text-secondaryColor mb-2">
							What&apos;s Next?
						</h3>
						<ul className="text-sm text-gray-600 text-left space-y-2">
							<li className="flex items-start">
								<span className="bg-mainColor text-white rounded-full p-1 mr-2 mt-0.5">
									<Check className="h-3 w-3" />
								</span>
								Verify your email to activate your account
							</li>
							<li className="flex items-start">
								<span className="bg-mainColor text-white rounded-full p-1 mr-2 mt-0.5">
									<Check className="h-3 w-3" />
								</span>
								Complete your company profile with additional details
							</li>
							<li className="flex items-start">
								<span className="bg-mainColor text-white rounded-full p-1 mr-2 mt-0.5">
									<Check className="h-3 w-3" />
								</span>
								Post your first job listing to attract candidates
							</li>
							<li className="flex items-start">
								<span className="bg-mainColor text-white rounded-full p-1 mr-2 mt-0.5">
									<Check className="h-3 w-3" />
								</span>
								Start searching and connecting with top talent
							</li>
						</ul>
					</div>
				</CardContent>
				<CardFooter className="flex flex-col space-y-2">
					<Button
						asChild
						className="w-full bg-mainColor hover:bg-mainColor/90 text-white"
					>
						<Link href="/signin">Sign In to Your Account</Link>
					</Button>
					<Button
						asChild
						variant="outline"
						className="w-full border-mainColor text-mainColor hover:bg-mainColor/10"
					>
						<Link href="/">Go to Home</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
