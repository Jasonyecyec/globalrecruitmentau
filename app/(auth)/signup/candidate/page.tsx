"use client";
import React, { FormEvent, useState } from "react";
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
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Path, SubmitHandler, useForm } from "react-hook-form";
import { SignupFormSchema, signupSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Item } from "@radix-ui/react-accordion";

const Candidate = () => {
	const [step, setStep] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		trigger,
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
		const isValid = await trigger(fieldsToValidate);
		console.log("Validation result:", isValid, errors);

		if (isValid) {
			setStep((prev) => prev + 1);
		}
	};

	const handlePrevStep = (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setStep((prev) => prev - 1);
	};

	const progressBar = ["Basic info", "Security", "Profile", "Preference"];

	const handleForm: SubmitHandler<SignupFormSchema> = async (data) => {
		setIsLoading(true);
		const formData = new FormData();
		formData.append("first_name", data.first_name);
		formData.append("last_name", data.last_name);
		formData.append("email", data.email);
		formData.append("contact_number", data.contact_number);
		formData.append("password", data.password);
		formData.append("user_type", data.user_type);
		if (data.resume_path) {
			formData.append("resume_path", data.resume_path);
		} else {
			formData.append("resume_path", "");
		}

		if (data.linked_profile) {
			formData.append("linked_profile", data.linked_profile);
		}

		if (data.portfolio_link) {
			formData.append("portfolio_link", data.portfolio_link);
		}

		try {
			// const result = await signupUser(formData);
			// if (result.message) {
			//   router.push("/signup/account_success");
			// }
			await new Promise((resolve) => setTimeout(resolve, 2000));
		} catch (error: any) {
			toast.error(error.response?.data?.message || "Error sign up.");
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
										<label
											htmlFor="resume_path"
											className="relative cursor-pointer text-xs bg-mainColor hover:bg-mainColor/90 text-white py-2 px-4 rounded-md font-medium inline-block"
										>
											<span>Browse files</span>
											<input
												id="resume_path"
												type="text"
												// type="file"
												// className="sr-only"
												// accept=".pdf,.docx,.doc"
												required
												{...register("resume_path")}
											/>
										</label>
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
