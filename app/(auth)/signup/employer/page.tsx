"use client";
import { type FormEvent, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import RPGLogo from "@/public/img/recruitmentglobal_logo.jpg";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
	Lock,
	Mail,
	ChevronRight,
	ChevronLeft,
	Building,
	BadgeCheck,
	LoaderCircle,
	Upload,
	MapPin,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { type Path, type SubmitHandler, useForm } from "react-hook-form";
import {
	type EmployerSignupFormSchema,
	employerSignupSchema,
} from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { authService } from "@/services/auth.service";

export default function Employer() {
	const router = useRouter();
	const [step, setStep] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [selectedLogo, setSelectedLogo] = useState<File | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		trigger,
		getValues,
		setError,
		clearErrors,
		setValue,
		watch,
	} = useForm<EmployerSignupFormSchema>({
		resolver: zodResolver(employerSignupSchema),
		mode: "onChange",
	});

	const totalSteps: number = 3;
	const progress: number = (step / totalSteps) * 100;

	// Watch industry value to show "Other" input
	const industryValue = watch("industry");

	const handleNextStep = async (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		let fieldsToValidate: Array<Path<EmployerSignupFormSchema>> = [];

		switch (step) {
			case 1:
				fieldsToValidate = [
					"company_name",
					"about_company",
					"industry",
					"location",
					"company_size",
				];
				break;
			case 2:
				fieldsToValidate = [
					"first_name",
					"last_name",
					"job_title",
					"contact_number",
				];
				break;
			case 3:
				fieldsToValidate = ["email", "password", "confirm_password"];
				break;
		}

		// Trigger field validation
		const isValid = await trigger(fieldsToValidate);

		// For step 3, manually check if passwords match
		if (step === 3 && isValid) {
			const { password, confirm_password } = getValues();

			if (password !== confirm_password) {
				setError("confirm_password", {
					type: "manual",
					message: "Passwords do not match",
				});
				return;
			} else {
				clearErrors("confirm_password");
			}
		}

		if (isValid) {
			setStep((prev) => prev + 1);
		}
	};

	const handlePrevStep = (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setStep((prev) => prev - 1);
	};

	const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			// Validate file size (5MB max)
			if (file.size > 5 * 1024 * 1024) {
				toast.error("Image size must be less than 5MB");
				return;
			}

			// Validate file type (images only)
			const allowedTypes = [
				"image/jpeg",
				"image/png",
				"image/jpg",
				"image/webp",
			];
			if (!allowedTypes.includes(file.type)) {
				toast.error("Please upload a JPG, PNG, or WEBP image");
				return;
			}

			setSelectedLogo(file);
			setValue("company_logo", file.name);
		}
	};

	const handleForm: SubmitHandler<EmployerSignupFormSchema> = async (data) => {
		setIsLoading(true);

		try {
			const result = await authService.employerSignup(data, selectedLogo);

			if (result.success || result.message) {
				toast.success(
					result.message ||
						"Account created successfully! Please check your email to verify your account.",
				);
				router.push("/signup/employer/account_success");
			}
		} catch (error: unknown) {
			const errorMessage =
				(error as { response?: { data?: { message?: string } } })?.response
					?.data?.message || "Error during sign up. Please try again.";
			toast.error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	const progressSteps = ["Company", "Your Profile", "Account"];

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-5 md:p-0">
			<Card className="w-full max-w-xl shadow-lg">
				<CardHeader className="space-y-1">
					<CardTitle className="flex flex-col items-center text-center">
						<Link href="/">
							<Image
								src={RPGLogo}
								alt="Recruitment Placement Global"
								width={280}
								height={80}
								className="object-contain h-28 w-28"
							/>
						</Link>
						<span className="text-xl text-secondaryColor font-bold text-center">
							Create Your Employer Account
						</span>
					</CardTitle>

					<CardDescription className="text-center">
						{step === 1 && "Let's start with your company information"}
						{step === 2 && "Tell us about yourself"}
						{step === 3 && "Set up your account details"}
					</CardDescription>

					<div className="pt-2">
						<Progress value={progress} className="text-mainColor h-[2.5px]" />
						<div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
							{progressSteps.map((item, index) => (
								<span
									key={item}
									className={
										step === index + 1 ? "font-medium text-secondaryColor" : ""
									}
								>
									{item}
								</span>
							))}
						</div>
					</div>
				</CardHeader>

				<CardContent>
					<form
						onKeyDown={(e) => {
							if (e.key === "Enter") e.preventDefault();
						}}
						onSubmit={handleSubmit(handleForm)}
						className="space-y-4"
					>
						<input type="hidden" value="employer" {...register("user_type")} />

						{step === 1 && (
							<>
								<div className="space-y-2">
									<Label htmlFor="company_name">
										Company Name <span className="text-destructive">*</span>
									</Label>
									<div className="relative">
										<Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
										<Input
											id="company_name"
											placeholder="Acme Inc."
											className="pl-10"
											{...register("company_name")}
										/>
										{errors.company_name && (
											<p className="text-red-500 text-xs mt-1 pl-1 font-semibold">
												{errors.company_name.message}
											</p>
										)}
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="about_company">
										About Company <span className="text-destructive">*</span>
									</Label>
									<Textarea
										id="about_company"
										placeholder="Briefly describe your company"
										className="h-32"
										{...register("about_company")}
									/>
									{errors.about_company && (
										<p className="text-red-500 text-xs mt-1 pl-1 font-semibold">
											{errors.about_company.message}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="company_name">
										Location <span className="text-destructive">*</span>
									</Label>
									<div className="relative">
										<MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
										<Input
											id="location"
											placeholder="123 Main St, City, Country"
											className="pl-10"
											required
											{...register("location")}
										/>
										{errors.location && (
											<p className="text-red-500 text-xs mt-1 pl-1 font-semibold">
												{errors.location.message}
											</p>
										)}
									</div>
								</div>

								<div className="grid grid-cols-2 gap-5">
									<div className="space-y-2">
										<Label htmlFor="industry">
											Industry <span className="text-destructive">*</span>
										</Label>
										<Select
											onValueChange={(value) => setValue("industry", value)}
											defaultValue={getValues("industry")}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select industry" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="Information Technology">
													Information Technology
												</SelectItem>
												<SelectItem value="Design Services">
													Design Services
												</SelectItem>
												<SelectItem value="Software Development">
													Software Development
												</SelectItem>
												<SelectItem value="Cloud Services">
													Cloud Services
												</SelectItem>
												<SelectItem value="Finance">Finance</SelectItem>
												<SelectItem value="Healthcare">Healthcare</SelectItem>
												<SelectItem value="Education">Education</SelectItem>
												<SelectItem value="Manufacturing">
													Manufacturing
												</SelectItem>
												<SelectItem value="Retail">Retail</SelectItem>
												<SelectItem value="Other">Other</SelectItem>
											</SelectContent>
										</Select>
										{errors.industry && (
											<p className="text-red-500 text-xs mt-1 pl-1 font-semibold">
												{errors.industry.message}
											</p>
										)}

										{industryValue === "other" && (
											<Input
												placeholder="Specify Industry"
												{...register("industry_other")}
											/>
										)}
									</div>

									<div className="space-y-2">
										<Label htmlFor="company_size">
											Company Size <span className="text-destructive">*</span>
										</Label>
										<Select
											onValueChange={(value) => setValue("company_size", value)}
											defaultValue={getValues("company_size")}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select company size" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="1-10">1-10 employees</SelectItem>
												<SelectItem value="11-50">11-50 employees</SelectItem>
												<SelectItem value="51-200">51-200 employees</SelectItem>
												<SelectItem value="201-500">
													201-500 employees
												</SelectItem>
												<SelectItem value="501+">501+ employees</SelectItem>
											</SelectContent>
										</Select>
										{errors.company_size && (
											<p className="text-red-500 text-xs mt-1 pl-1 font-semibold">
												{errors.company_size.message}
											</p>
										)}
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="company_logo">Company Logo (Optional)</Label>
									<div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-mainColor transition-colors">
										<Upload className="h-6 w-6 mx-auto text-gray-400 mb-2" />
										<div className="space-y-1">
											<p className="text-xs text-gray-500">
												JPG, PNG, or WEBP (Max 5mb)
											</p>
											{selectedLogo && (
												<p className="text-xs text-green-600 font-medium">
													Selected: {selectedLogo.name}
												</p>
											)}
											<label
												htmlFor="company_logo"
												className="relative cursor-pointer text-xs bg-mainColor hover:bg-mainColor/90 text-white py-2 px-4 rounded-md font-medium inline-block"
											>
												<span>
													{selectedLogo ? "Change logo" : "Browse files"}
												</span>
												<input
													id="company_logo"
													type="file"
													className="sr-only"
													accept="image/jpeg,image/png,image/jpg,image/webp"
													onChange={handleLogoChange}
												/>
											</label>
											<input type="hidden" {...register("company_logo")} />
										</div>
									</div>
								</div>
							</>
						)}

						{step === 2 && (
							<>
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="first_name">
											First Name <span className="text-destructive">*</span>
										</Label>
										<Input
											id="first_name"
											placeholder="John"
											{...register("first_name")}
										/>
										{errors.first_name && (
											<p className="text-red-500 text-xs mt-1 pl-1 font-semibold">
												{errors.first_name.message}
											</p>
										)}
									</div>

									<div className="space-y-2">
										<Label htmlFor="last_name">
											Last Name <span className="text-destructive">*</span>
										</Label>
										<Input
											id="last_name"
											placeholder="Doe"
											{...register("last_name")}
										/>
										{errors.last_name && (
											<p className="text-red-500 text-xs mt-1 pl-1 font-semibold">
												{errors.last_name.message}
											</p>
										)}
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="job_title">
										Job Title <span className="text-destructive">*</span>
									</Label>
									<Input
										id="job_title"
										placeholder="e.g., HR Manager, Recruiter, CEO"
										{...register("job_title")}
									/>
									{errors.job_title && (
										<p className="text-red-500 text-xs mt-1 pl-1 font-semibold">
											{errors.job_title.message}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Label htmlFor="contact_number">
										Contact Number <span className="text-destructive">*</span>
									</Label>
									<Input
										id="contact_number"
										type="tel"
										placeholder="+61 XXX XXX XXX"
										{...register("contact_number")}
									/>
									{errors.contact_number && (
										<p className="text-red-500 text-xs mt-1 pl-1 font-semibold">
											{errors.contact_number.message}
										</p>
									)}
								</div>
							</>
						)}

						{step === 3 && (
							<>
								<div className="space-y-2">
									<Label htmlFor="email">
										Work Email <span className="text-destructive">*</span>
									</Label>
									<div className="relative">
										<Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
										<Input
											id="email"
											placeholder="name@company.com"
											type="email"
											className="pl-10"
											{...register("email")}
										/>
										{errors.email && (
											<p className="text-red-500 text-xs mt-1 pl-1 font-semibold">
												{errors.email.message}
											</p>
										)}
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="password">
										Password <span className="text-destructive">*</span>
									</Label>
									<div className="relative">
										<Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
										<Input
											id="password"
											type="password"
											placeholder="••••••••"
											className="pl-10"
											{...register("password")}
										/>
										{errors.password && (
											<p className="text-red-500 text-xs mt-1 pl-1 font-semibold">
												{errors.password.message}
											</p>
										)}
									</div>
									<p className="text-xs text-gray-500">
										Password must be at least 8 characters long
									</p>
								</div>

								<div className="space-y-2">
									<Label htmlFor="confirm_password">
										Confirm Password <span className="text-destructive">*</span>
									</Label>
									<div className="relative">
										<Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
										<Input
											id="confirm_password"
											type="password"
											placeholder="••••••••"
											className="pl-10"
											{...register("confirm_password")}
										/>
										{errors.confirm_password && (
											<p className="text-red-500 text-xs mt-1 pl-1 font-semibold">
												{errors.confirm_password.message}
											</p>
										)}
									</div>
								</div>
							</>
						)}

						<div className="flex justify-between items-center pt-2">
							{step !== 1 ? (
								<Button
									onClick={handlePrevStep}
									className="border items-center justify-center flex border-mainColor text-gray-500 hover:text-mainColor h-8"
									variant="outline"
								>
									<ChevronLeft className="h-4 w-4" />
									Back
								</Button>
							) : (
								<Button
									onClick={(e) => {
										e.preventDefault();
										router.back();
									}}
									className="border border-mainColor text-gray-500 hover:text-secondaryColor h-8"
									variant="outline"
								>
									Cancel
								</Button>
							)}

							{step !== 3 ? (
								<Button
									onClick={handleNextStep}
									className="bg-mainColor text-white h-8 hover:bg-orange-400"
								>
									Next
									<ChevronRight className="h-4 w-4" />
								</Button>
							) : (
								<Button
									type="submit"
									className="bg-mainColor hover:bg-mainColor/90 text-white w-48"
									disabled={isLoading}
								>
									{isLoading ? (
										<LoaderCircle className="h-5 w-5 animate-spin" />
									) : (
										<>
											Complete Registration
											<BadgeCheck className="h-4 w-4 ml-1" />
										</>
									)}
								</Button>
							)}
						</div>
					</form>
				</CardContent>

				<CardFooter className="w-full flex justify-center">
					<p className="text-center text-sm text-gray-600">
						Already have an account?{" "}
						<Link href="/signin">
							<span className="font-medium hover:text-mainColor transition-all duration-250">
								Login
							</span>
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
