"use client";
import { FormEvent, useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
	Lock,
	Mail,
	ChevronRight,
	ChevronLeft,
	Phone,
	FileText,
	BadgeCheck,
	LoaderCircle,
	User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Path, SubmitHandler, useForm } from "react-hook-form";
import { SignupFormSchema, signupSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { authService } from "@/services/auth.service";

const Candidate = () => {
	const [step, setStep] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
		trigger,
		getValues,
		setError,
		clearErrors,
		setValue,
	} = useForm<SignupFormSchema>({
		resolver: zodResolver(signupSchema),
		mode: "onChange",
	});
	const router = useRouter();
	const totalSteps: number = 4;
	const progress: number = (step / totalSteps) * 100;

	const handleNextStep = async (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		let fieldsToValidate: Array<Path<SignupFormSchema>> = [];

		switch (step) {
			case 1:
				fieldsToValidate = [
					"first_name",
					"last_name",
					"contact_number",
					"email",
				];
				break;

			case 2:
				fieldsToValidate = ["password", "confirm_password"];
				break;

			case 3:
				fieldsToValidate = [];
				break;

			case 4:
				fieldsToValidate = [];
				break;
		}

		// Trigger field validation
		const isValid = await trigger(fieldsToValidate);

		// For step 2, manually check if passwords match (since .refine() doesn't run on trigger)
		if (step === 2 && isValid) {
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

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			// Validate file size (5MB max)
			if (file.size > 5 * 1024 * 1024) {
				toast.error("File size must be less than 5MB");
				return;
			}

			// Validate file type
			const allowedTypes = [
				"application/pdf",
				"application/msword",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
				"text/plain",
			];
			if (!allowedTypes.includes(file.type)) {
				toast.error("Please upload a PDF, DOC, DOCX, or TXT file");
				return;
			}

			setSelectedFile(file);
			setValue("resume_path", file.name);
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

			setSelectedImage(file);
			setValue("image_url", file.name);
		}
	};

	const progressBar = ["Basic info", "Security", "Profile", "Preference"];

	const handleForm: SubmitHandler<SignupFormSchema> = async (data) => {
		setIsLoading(true);

		try {
			const result = await authService.signup(
				data,
				selectedFile,
				selectedImage,
			);

			if (result.success || result.message) {
				toast.success(
					result.message ||
						"Account created successfully! Please check your email to verify your account.",
				);
				router.push("/signup/account_success");
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

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-5 md:p-0">
			<Card className="w-full max-w-lg shadow-lg">
				<CardHeader className="space-y-1">
					<CardTitle className="flex flex-col items-center text-center">
						<Link href="/">
							<Image
								src={RPGLogo}
								alt="Recruitment Placement Global"
								width={280}
								height={80}
								className="object-contain  h-28 w-28"
							/>
						</Link>
						<span className="text-xl text-secondaryColor font-bold text-center">
							Create an Account
						</span>
					</CardTitle>

					<CardDescription className="text-center">
						{step === 1 && "Let's start with your basic information."}
						{step === 2 && "Create a secure password."}
						{step === 3 && "Upload your resume and professional links"}
						{step === 4 && "Set your job preferences"}
					</CardDescription>

					<div className="pt-2">
						<Progress value={progress} className="text-mainColor h-[2.5px] " />
						<div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
							{progressBar.map((item, index) => (
								<span
									key={index}
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
						{step === 1 && (
							<>
								<div className="grid grid-cols-2 gap-4">
									<input
										type="hidden"
										value="jobseeker"
										{...register("user_type")}
									/>

									<div className="space-y-1">
										<Label htmlFor="first_name">First name</Label>
										<div className="relative">
											<Input
												id="first_name"
												className=""
												placeholder="First name"
												{...register("first_name", { required: true })}
											/>

											{errors.first_name && (
												<p className="text-red-500 text-xs mt-1 pl-1 font-semibold">
													{errors.first_name.message}
												</p>
											)}
										</div>
									</div>

									<div className="space-y-1">
										<Label htmlFor="last_name">Last name</Label>
										<div className="relative">
											<Input
												id="last_name"
												required
												className=""
												placeholder="Last name"
												{...register("last_name")}
											/>

											{errors.last_name && (
												<p className="text-red-500 text-xs mt-1 pl-1 font-semibold">
													{errors.last_name.message}
												</p>
											)}
										</div>
									</div>

									<div className="space-y-1 col-span-2">
										<Label htmlFor="contact_number">Contact Number</Label>
										<div className="relative">
											<Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
											<Input
												type="number"
												id="contact_number"
												required
												className="pl-8"
												placeholder="Contact Number"
												min={0}
												step={1}
												{...register("contact_number")}
											/>

											{errors.contact_number && (
												<p className="text-red-500 text-xs mt-1 pl-1 font-semibold">
													{errors.contact_number.message}
												</p>
											)}
										</div>
									</div>

									<div className="space-y-1 col-span-2">
										<Label htmlFor="last_name">Email</Label>
										<div className="relative">
											<Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
											<Input
												type="email"
												id="last_name"
												required
												className="pl-8"
												placeholder="Email"
												{...register("email")}
											/>

											{errors.email && (
												<p className="text-red-500 text-xs mt-1 pl-1 font-semibold">
													{errors.email.message}
												</p>
											)}
										</div>
									</div>
								</div>
							</>
						)}

						{step === 2 && (
							<>
								<div className="space-y-1">
									<Label htmlFor="password">Password</Label>
									<div className="relative">
										<Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
										<Input
											id="password"
											type="password"
											placeholder="Password"
											required
											className="pl-8"
											{...register("password")}
										/>

										{errors.password && (
											<p className="text-red-500 text-xs mt-1 pl-1 font-semibold">
												{errors.password.message}
											</p>
										)}
									</div>
								</div>

								<div className="space-y-1">
									<Label htmlFor="confirm_password">Password</Label>
									<div className="relative">
										<Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
										<Input
											id="confirm_password"
											placeholder="Confirm Password"
											type="password"
											required
											className="pl-8"
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

						{step === 3 && (
							<>
								<div className="space-y-1">
									<Label htmlFor="upload_resume">Upload Resume/CV</Label>
								</div>

								<div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-mainColor transition-colors">
									<FileText className="h-6 w-6 mx-auto text-gray-400 mb-2" />
									<div className="space-y-1">
										<p className="text-xs text-gray-500">
											PDF, DOCX or TXT (Max 5mb)
										</p>
										{selectedFile && (
											<p className="text-xs text-green-600 font-medium">
												Selected: {selectedFile.name}
											</p>
										)}
										<label
											htmlFor="resume_path"
											className="relative cursor-pointer text-xs bg-mainColor hover:bg-mainColor/90 text-white py-2 px-4 rounded-md font-medium inline-block"
										>
											<span>
												{selectedFile ? "Change file" : "Browse files"}
											</span>
											<input
												id="resume_path"
												type="file"
												className="sr-only"
												accept=".pdf,.docx,.doc,.txt"
												onChange={handleFileChange}
											/>
										</label>
										{/* Hidden input to store file name/path in form data */}
										<input type="hidden" {...register("resume_path")} />
									</div>
								</div>

								<div className="space-y-1">
									<Label htmlFor="upload_image">Upload Profile Picture</Label>
								</div>

								<div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-mainColor transition-colors">
									<User className="h-6 w-6 mx-auto text-gray-400 mb-2" />
									<div className="space-y-1">
										<p className="text-xs text-gray-500">
											JPG, PNG, or WEBP (Max 5mb)
										</p>
										{selectedImage && (
											<p className="text-xs text-green-600 font-medium">
												Selected: {selectedImage.name}
											</p>
										)}
										<label
											htmlFor="image_url"
											className="relative cursor-pointer text-xs bg-mainColor hover:bg-mainColor/90 text-white py-2 px-4 rounded-md font-medium inline-block"
										>
											<span>
												{selectedImage ? "Change image" : "Browse images"}
											</span>
											<input
												id="image_url"
												type="file"
												className="sr-only"
												accept="image/jpeg,image/png,image/jpg,image/webp"
												onChange={handleImageChange}
											/>
										</label>
										{/* Hidden input to store file name/path in form data */}
										<input type="hidden" {...register("image_url")} />
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-1">
										<Label htmlFor="linked_profile" className="text-sm ">
											Linked Profile
										</Label>
										<Input
											id="linked_profile"
											className="text-sm"
											placeholder="https://linkedin.com/in/yourprofile"
											type="url"
											{...register("linked_profile")}
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="portfolio_link" className="text-sm">
											Portfolio/Website URL
										</Label>
										<Input
											id="portfolio_link"
											placeholder="https://yourportfolio.com"
											type="url"
											{...register("portfolio_link")}
										/>
									</div>
								</div>
							</>
						)}

						{step === 4 && (
							<>
								<div className="space-y-3">
									<Label>Job Categories You're Interested In *</Label>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
										{[
											"Software Development",
											"Design",
											"Marketing",
											"Sales",
											"Customer Service",
											"Finance",
											"Human Resources",
											"Product Management",
										].map((category, index) => (
											<div
												key={category}
												className="flex items-center space-x-2"
											>
												<Checkbox
													id={`category-${category}`}
													//   onCheckedChange={(checked) => {
													//     const newPreferences = checked
													//       ? [...formData.jobPreferences, category]
													//       : formData.jobPreferences.filter(
													//           (p) => p !== category
													//         );
													//     setFormData((prev) => ({
													//       ...prev,
													//       jobPreferences: newPreferences,
													//     }));
													//   }}
												/>
												<label
													htmlFor={`category-${category}`}
													className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
												>
													{category}
												</label>
											</div>
										))}
									</div>
									<div className="flex items-center">
										<Checkbox
											id="others"
											className="mr-2"
											// onCheckedChange={(checked) => {
											//   const newPreferences = checked
											//     ? [...formData.jobPreferences, category]
											//     : formData.jobPreferences.filter((p) => p !== category)
											//   setFormData((prev) => ({ ...prev, jobPreferences: newPreferences }))
											// }}
										/>
										<label
											htmlFor="others"
											className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											Others
										</label>
										<input type="text" className="ml-1 border-b-[2px] w-36" />
									</div>
									{/* <Input type="text" className="h-6 text-sm" placeholder="Others.."/> */}
								</div>

								<div className="space-y-3">
									<Label>Work Type Preference *</Label>
									<RadioGroup
									//   defaultValue={formData.workType}
									//   onValueChange={(value) => handleSelectChange("workType", value)}
									>
										<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="remote" id="remote" />
												<Label htmlFor="remote">Remote</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="hybrid" id="hybrid" />
												<Label htmlFor="hybrid">Hybrid</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="onsite" id="onsite" />
												<Label htmlFor="onsite">On-site</Label>
											</div>
										</div>
									</RadioGroup>
								</div>

								<div className="flex items-center space-x-2 py-2">
									<Checkbox
										id="relocate"
										//   checked={formData.relocate}
										//   onCheckedChange={(checked) => handleCheckboxChange("relocate", checked as boolean)}
									/>
									<Label htmlFor="relocate">
										I am willing to relocate for the right opportunity
									</Label>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="salaryExpectation">
											Salary Expectation (Monthly)
										</Label>
										<Input
											id="salaryExpectation"
											name="salaryExpectation"
											// value={formData.salaryExpectation}
											// onChange={handleChange}
											placeholder="$60,000"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="availableFrom">Available From</Label>
										<Input
											id="availableFrom"
											name="availableFrom"
											// value={formData.availableFrom}
											// onChange={handleChange}
											type="date"
										/>
									</div>
								</div>
							</>
						)}

						<div className={`flex justify-between items-center pt-2`}>
							{step != 1 ? (
								<Button
									onClick={handlePrevStep}
									className="border items-center justify-center flex border-mainColor text-gray-500 hover:text-mainColor h-8"
									variant="outline"
								>
									<ChevronLeft className=" h-4 w-4" />
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

							{step !== 4 ? (
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
									className="bg-mainColor hover:bg-main/90 text-white w-40"
								>
									{isLoading ? (
										<LoaderCircle className="h-10 text-3xl animate-spin" />
									) : (
										<>
											Complete Profile
											<BadgeCheck className="h-4 w-4" />
										</>
									)}
								</Button>
							)}
						</div>
					</form>
				</CardContent>

				<CardFooter className="w-full flex justify-center">
					<p className="text-center text-sm text-gray-600">
						Already have an account?
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
};

export default Candidate;
