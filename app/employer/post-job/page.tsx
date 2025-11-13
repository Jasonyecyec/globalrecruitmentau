"use client";
import React, { FormEvent, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
	ChevronRight,
	ChevronLeft,
	Briefcase,
	MapPin,
	DollarSign,
	FileText,
	CheckCircle2,
	Save,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type FormDataType = {
	jobTitle: string;
	department: string;
	jobType: string;
	workMode: string;
};

export default function PostJob() {
	const router = useRouter();
	const [step, setStep] = useState<number>(1);
	const totalSteps: number = 4;
	const progress: number = (step / totalSteps) * 100;

	const [formData, setFormData] = useState<FormDataType>({
		jobTitle: "",
		department: "",
		jobType: "",
		workMode: "",
	});

	const handleNextStep = (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setStep((prev) => prev + 1);
	};

	const handlePrevStep = (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setStep((prev) => prev - 1);
	};

	const handleSaveDraft = () => {
		toast.success("Draft saved successfully!");
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		toast.success("Job posted successfully!");
		router.push("/employer/jobs");
	};

	const handleSelectChange = (name: string, value: string) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className="p-4 sm:px-6 md:py-8">
			<div className="max-w-3xl mx-auto">
				<div className="mb-6">
					<h1 className="text-2xl font-bold tracking-tight">Post a New Job</h1>
					<p className="text-muted-foreground">
						Fill in the details to create your job posting
					</p>
				</div>

				<Card className="shadow-lg">
					<CardHeader className="space-y-1">
						<CardTitle className="text-xl text-secondaryColor font-bold">
							{step === 1 && "Job Details"}
							{step === 2 && "Job Description"}
							{step === 3 && "Requirements & Qualifications"}
							{step === 4 && "Compensation & Benefits"}
						</CardTitle>
						<CardDescription>
							{step === 1 && "Basic information about the position"}
							{step === 2 && "Describe the role and responsibilities"}
							{step === 3 && "Skills and experience required"}
							{step === 4 && "Salary range and benefits offered"}
						</CardDescription>

						<div className="pt-2">
							<Progress value={progress} className="h-[2.5px]" />
							<div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
								<span
									className={step === 1 ? "font-medium text-secondaryColor" : ""}
								>
									Details
								</span>
								<span
									className={step === 2 ? "font-medium text-secondaryColor" : ""}
								>
									Description
								</span>
								<span
									className={step === 3 ? "font-medium text-secondaryColor" : ""}
								>
									Requirements
								</span>
								<span
									className={step === 4 ? "font-medium text-secondaryColor" : ""}
								>
									Compensation
								</span>
							</div>
						</div>
					</CardHeader>

					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-4">
							{/* STEP 1: JOB DETAILS */}
							{step === 1 && (
								<>
									<div className="space-y-2">
										<Label htmlFor="jobTitle">Job Title *</Label>
										<div className="relative">
											<Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
											<Input
												id="jobTitle"
												name="jobTitle"
												placeholder="e.g., Senior Frontend Developer"
												required
												className="pl-10"
												value={formData.jobTitle}
												onChange={(e) =>
													setFormData({ ...formData, jobTitle: e.target.value })
												}
											/>
										</div>
									</div>

									<div className="space-y-2">
										<Label htmlFor="department">Department *</Label>
										<Select
											onValueChange={(value) =>
												handleSelectChange("department", value)
											}
											name="department"
										>
											<SelectTrigger>
												<SelectValue placeholder="Select department" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="engineering">Engineering</SelectItem>
												<SelectItem value="design">Design</SelectItem>
												<SelectItem value="product">Product</SelectItem>
												<SelectItem value="marketing">Marketing</SelectItem>
												<SelectItem value="sales">Sales</SelectItem>
												<SelectItem value="hr">Human Resources</SelectItem>
												<SelectItem value="other">Other</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div className="space-y-2">
										<Label htmlFor="jobType">Employment Type *</Label>
										<RadioGroup
											defaultValue="full-time"
											onValueChange={(value) =>
												handleSelectChange("jobType", value)
											}
										>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="full-time" id="full-time" />
												<Label htmlFor="full-time">Full-time</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="part-time" id="part-time" />
												<Label htmlFor="part-time">Part-time</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="contract" id="contract" />
												<Label htmlFor="contract">Contract</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="internship" id="internship" />
												<Label htmlFor="internship">Internship</Label>
											</div>
										</RadioGroup>
									</div>

									<div className="space-y-2">
										<Label htmlFor="workMode">Work Mode *</Label>
										<Select
											onValueChange={(value) =>
												handleSelectChange("workMode", value)
											}
											name="workMode"
										>
											<SelectTrigger>
												<SelectValue placeholder="Select work mode" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="remote">Remote</SelectItem>
												<SelectItem value="onsite">On-site</SelectItem>
												<SelectItem value="hybrid">Hybrid</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div className="space-y-2">
										<Label htmlFor="location">Location *</Label>
										<div className="relative">
											<MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
											<Input
												id="location"
												name="location"
												placeholder="e.g., Sydney, AU or Remote"
												required
												className="pl-10"
											/>
										</div>
									</div>
								</>
							)}

							{/* STEP 2: JOB DESCRIPTION */}
							{step === 2 && (
								<>
									<div className="space-y-2">
										<Label htmlFor="jobSummary">Job Summary *</Label>
										<Textarea
											id="jobSummary"
											name="jobSummary"
											placeholder="Brief overview of the role..."
											required
											className="min-h-[100px]"
										/>
										<p className="text-xs text-muted-foreground">
											A concise summary that will appear in search results
										</p>
									</div>

									<div className="space-y-2">
										<Label htmlFor="responsibilities">
											Key Responsibilities *
										</Label>
										<Textarea
											id="responsibilities"
											name="responsibilities"
											placeholder="• Lead frontend development initiatives&#10;• Mentor junior developers&#10;• Collaborate with design team..."
											required
											className="min-h-[150px]"
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="teamInfo">About the Team</Label>
										<Textarea
											id="teamInfo"
											name="teamInfo"
											placeholder="Describe the team the candidate will be joining..."
											className="min-h-[100px]"
										/>
									</div>
								</>
							)}

							{/* STEP 3: REQUIREMENTS */}
							{step === 3 && (
								<>
									<div className="space-y-2">
										<Label htmlFor="requiredSkills">Required Skills *</Label>
										<Textarea
											id="requiredSkills"
											name="requiredSkills"
											placeholder="• 5+ years of React experience&#10;• Strong TypeScript knowledge&#10;• Experience with Next.js..."
											required
											className="min-h-[120px]"
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="preferredSkills">
											Preferred Skills (Optional)
										</Label>
										<Textarea
											id="preferredSkills"
											name="preferredSkills"
											placeholder="Additional skills that would be beneficial..."
											className="min-h-[100px]"
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="education">Education Requirements *</Label>
										<Select defaultValue="bachelors">
											<SelectTrigger>
												<SelectValue placeholder="Select education level" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="high-school">
													High School Diploma
												</SelectItem>
												<SelectItem value="bachelors">
													Bachelor's Degree
												</SelectItem>
												<SelectItem value="masters">Master's Degree</SelectItem>
												<SelectItem value="phd">PhD</SelectItem>
												<SelectItem value="none">
													No formal education required
												</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div className="space-y-2">
										<Label htmlFor="experience">
											Years of Experience Required *
										</Label>
										<Select defaultValue="3-5">
											<SelectTrigger>
												<SelectValue placeholder="Select experience level" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="0-1">Entry Level (0-1 years)</SelectItem>
												<SelectItem value="1-3">Junior (1-3 years)</SelectItem>
												<SelectItem value="3-5">Mid-Level (3-5 years)</SelectItem>
												<SelectItem value="5-8">Senior (5-8 years)</SelectItem>
												<SelectItem value="8+">Lead/Principal (8+ years)</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</>
							)}

							{/* STEP 4: COMPENSATION */}
							{step === 4 && (
								<>
									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor="salaryMin">Minimum Salary *</Label>
											<div className="relative">
												<DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
												<Input
													id="salaryMin"
													name="salaryMin"
													type="number"
													placeholder="80,000"
													required
													className="pl-10"
												/>
											</div>
										</div>
										<div className="space-y-2">
											<Label htmlFor="salaryMax">Maximum Salary *</Label>
											<div className="relative">
												<DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
												<Input
													id="salaryMax"
													name="salaryMax"
													type="number"
													placeholder="120,000"
													required
													className="pl-10"
												/>
											</div>
										</div>
									</div>

									<div className="space-y-2">
										<Label htmlFor="salaryCurrency">Currency *</Label>
										<Select defaultValue="aud">
											<SelectTrigger>
												<SelectValue placeholder="Select currency" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="aud">AUD - Australian Dollar</SelectItem>
												<SelectItem value="usd">USD - US Dollar</SelectItem>
												<SelectItem value="gbp">GBP - British Pound</SelectItem>
												<SelectItem value="eur">EUR - Euro</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div className="space-y-3">
										<Label>Benefits Offered</Label>
										<div className="space-y-2">
											<div className="flex items-center space-x-2">
												<Checkbox id="health-insurance" />
												<Label htmlFor="health-insurance" className="font-normal">
													Health Insurance
												</Label>
											</div>
											<div className="flex items-center space-x-2">
												<Checkbox id="dental" />
												<Label htmlFor="dental" className="font-normal">
													Dental Coverage
												</Label>
											</div>
											<div className="flex items-center space-x-2">
												<Checkbox id="retirement" />
												<Label htmlFor="retirement" className="font-normal">
													Retirement Plan (401k/Superannuation)
												</Label>
											</div>
											<div className="flex items-center space-x-2">
												<Checkbox id="pto" />
												<Label htmlFor="pto" className="font-normal">
													Paid Time Off
												</Label>
											</div>
											<div className="flex items-center space-x-2">
												<Checkbox id="remote-work" />
												<Label htmlFor="remote-work" className="font-normal">
													Remote Work Allowance
												</Label>
											</div>
											<div className="flex items-center space-x-2">
												<Checkbox id="professional-dev" />
												<Label htmlFor="professional-dev" className="font-normal">
													Professional Development Budget
												</Label>
											</div>
										</div>
									</div>

									<div className="space-y-2">
										<Label htmlFor="additionalBenefits">
											Additional Benefits (Optional)
										</Label>
										<Textarea
											id="additionalBenefits"
											name="additionalBenefits"
											placeholder="Describe any other benefits or perks..."
											className="min-h-[80px]"
										/>
									</div>
								</>
							)}

							{/* NAVIGATION BUTTONS */}
							<div className="flex justify-between items-center pt-4 border-t">
								<div className="flex gap-2">
									{step !== 1 && (
										<Button
											onClick={handlePrevStep}
											className="border items-center justify-center flex border-mainColor text-gray-500 hover:text-mainColor h-9"
											variant="outline"
										>
											<ChevronLeft className="h-4 w-4" />
											Back
										</Button>
									)}
								</div>

								<div className="flex gap-2">
									<Button
										type="button"
										onClick={handleSaveDraft}
										variant="outline"
										className="h-9"
									>
										<Save className="mr-2 h-4 w-4" />
										Save Draft
									</Button>

									{step !== 4 ? (
										<Button
											onClick={handleNextStep}
											className="bg-mainColor text-white h-9 hover:bg-orange-400"
										>
											Next
											<ChevronRight className="h-4 w-4 ml-1" />
										</Button>
									) : (
										<Button
											type="submit"
											className="bg-mainColor hover:bg-orange-400 text-white h-9"
										>
											Publish Job
											<CheckCircle2 className="h-4 w-4 ml-2" />
										</Button>
									)}
								</div>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
