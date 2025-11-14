"use client";
import { type FormEvent, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	ChevronRight,
	ChevronLeft,
	Check,
	ChevronsUpDown,
	X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema, type JobFormSchema } from "@/schemas/job";
import { useCompanyList } from "@/lib/hooks/use-company";
import { useJobCreate } from "@/lib/hooks/use-jobs";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function PostJob() {
	const router = useRouter();
	const [step, setStep] = useState<number>(1);

	// Fetch companies
	const { data: companiesData } = useCompanyList();
	const companiesList = companiesData?.data || [];

	// Job creation mutation
	const createJobMutation = useJobCreate();

	// State for company popover
	const [openPopover, setOpenPopover] = useState(false);
	const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
		null,
	);

	// State for array fields (skills, responsibilities, qualifications)
	const [skillInput, setSkillInput] = useState("");
	const [responsibilityInput, setResponsibilityInput] = useState("");
	const [qualificationInput, setQualificationInput] = useState("");

	// React Hook Form
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		setValue,
		watch,
		trigger,
	} = useForm<JobFormSchema>({
		resolver: zodResolver(jobSchema),
		defaultValues: {
			title: "",
			company_id: undefined,
			location: "",
			salary_min: 0,
			salary_max: 0,
			type: "",
			description: "",
			skills: [],
			responsibilities: [],
			qualifications: [],
		},
	});

	// Watch array fields
	const skills = watch("skills");
	const responsibilities = watch("responsibilities");
	const qualifications = watch("qualifications");

	const handleNextStep = async (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();

		// Validate step 1 fields
		const step1Fields: (keyof JobFormSchema)[] = [
			"title",
			"company_id",
			"location",
			"salary_min",
			"salary_max",
			"type",
			"description",
		];

		const isValid = await trigger(step1Fields);

		if (isValid) {
			setStep((prev) => prev + 1);
		}
	};

	const handlePrevStep = (e: FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setStep((prev) => prev - 1);
	};

	// Add skill
	const handleAddSkill = () => {
		if (skillInput.trim()) {
			const currentSkills = skills || [];
			setValue("skills", [...currentSkills, skillInput.trim()]);
			setSkillInput("");
		}
	};

	// Remove skill
	const handleRemoveSkill = (index: number) => {
		const currentSkills = skills || [];
		setValue(
			"skills",
			currentSkills.filter((_, i) => i !== index),
		);
	};

	// Add responsibility
	const handleAddResponsibility = () => {
		if (responsibilityInput.trim()) {
			const currentResponsibilities = responsibilities || [];
			setValue("responsibilities", [
				...currentResponsibilities,
				responsibilityInput.trim(),
			]);
			setResponsibilityInput("");
		}
	};

	// Remove responsibility
	const handleRemoveResponsibility = (index: number) => {
		const currentResponsibilities = responsibilities || [];
		setValue(
			"responsibilities",
			currentResponsibilities.filter((_, i) => i !== index),
		);
	};

	// Add qualification
	const handleAddQualification = () => {
		if (qualificationInput.trim()) {
			const currentQualifications = qualifications || [];
			setValue("qualifications", [
				...currentQualifications,
				qualificationInput.trim(),
			]);
			setQualificationInput("");
		}
	};

	// Remove qualification
	const handleRemoveQualification = (index: number) => {
		const currentQualifications = qualifications || [];
		setValue(
			"qualifications",
			currentQualifications.filter((_, i) => i !== index),
		);
	};

	const handleFormSubmit: SubmitHandler<JobFormSchema> = async (data) => {
		try {
			await createJobMutation.mutateAsync(data);
			toast.success("Job posted successfully!");
			router.push("/employer/jobs");
		} catch (error: unknown) {
			const errorMessage =
				(error as { response?: { data?: { message?: string } } })?.response
					?.data?.message || "Failed to post job. Please try again.";
			toast.error(errorMessage);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
			<Card className="w-full max-w-4xl shadow-lg">
				<CardHeader className="space-y-1">
					<div className="flex items-center justify-between mb-2">
						<CardTitle className="text-2xl font-bold text-secondaryColor">
							Add New Job
						</CardTitle>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => router.back()}
							className="h-8 w-8"
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
					<CardDescription>
						Create a new job listing to be published on the platform
					</CardDescription>

					{/* Step indicators */}
					<div className="flex items-center justify-center gap-4 pt-4">
						<div className="flex flex-col items-center gap-2">
							<div
								className={cn(
									"flex h-10 w-10 items-center justify-center rounded-full",
									step >= 1
										? "bg-black text-white"
										: "bg-gray-200 text-gray-500",
								)}
							>
								1
							</div>
							<span
								className={cn(
									"text-sm",
									step === 1 ? "font-medium text-black" : "text-gray-500",
								)}
							>
								Basic Information
							</span>
						</div>

						<div className="h-px w-24 bg-gray-300" />

						<div className="flex flex-col items-center gap-2">
							<div
								className={cn(
									"flex h-10 w-10 items-center justify-center rounded-full",
									step >= 2
										? "bg-black text-white"
										: "bg-gray-200 text-gray-500",
								)}
							>
								2
							</div>
							<span
								className={cn(
									"text-sm",
									step === 2 ? "font-medium text-black" : "text-gray-500",
								)}
							>
								Additional Details
							</span>
						</div>
					</div>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
						{/* STEP 1: BASIC INFORMATION */}
						{step === 1 && (
							<div className="space-y-4">
								<div className="grid grid-cols-2 gap-4">
									{/* Job Title */}
									<div className="space-y-2">
										<Label htmlFor="title">
											Job Title <span className="text-red-500">*</span>
										</Label>
										<Input
											id="title"
											placeholder="e.g. Senior Frontend Developer"
											{...register("title")}
										/>
										{errors.title && (
											<p className="text-red-500 text-sm mt-1">
												{errors.title.message}
											</p>
										)}
									</div>

									{/* Company */}
									<div className="space-y-2">
										<Label htmlFor="company_id">
											Company <span className="text-red-500">*</span>
										</Label>
										<Controller
											name="company_id"
											control={control}
											render={({ field }) => (
												<Popover
													modal={true}
													open={openPopover}
													onOpenChange={setOpenPopover}
												>
													<PopoverTrigger asChild>
														<Button
															variant="outline"
															aria-expanded={openPopover}
															className="w-full justify-between"
														>
															{selectedCompanyId
																? companiesList?.find(
																		(company) =>
																			company.id === selectedCompanyId,
																	)?.name
																: "Select company..."}
															<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
														</Button>
													</PopoverTrigger>
													<PopoverContent
														className="w-[--radix-popover-trigger-width] p-0"
														align="start"
													>
														<Command>
															<CommandInput placeholder="Search companies..." />
															<CommandList>
																<CommandEmpty>No companies found.</CommandEmpty>
																<CommandGroup>
																	{companiesList?.map((company) => (
																		<CommandItem
																			key={company.id}
																			value={company.name}
																			onSelect={() => {
																				setSelectedCompanyId(company.id);
																				field.onChange(company.id);
																				setOpenPopover(false);
																			}}
																			className="flex items-center gap-2"
																		>
																			<Check
																				className={cn(
																					"h-4 w-4",
																					selectedCompanyId === company.id
																						? "opacity-100"
																						: "opacity-0",
																				)}
																			/>
																			<Image
																				src={
																					company.company_image_presigned_url ||
																					"/img/image-not-found.png"
																				}
																				className="w-10 h-10 rounded object-cover"
																				alt={company.name}
																				width={40}
																				height={40}
																			/>
																			<span>{company.name}</span>
																		</CommandItem>
																	))}
																</CommandGroup>
															</CommandList>
														</Command>
													</PopoverContent>
												</Popover>
											)}
										/>
										{errors.company_id && (
											<p className="text-red-500 text-sm mt-1">
												{errors.company_id.message}
											</p>
										)}
									</div>
								</div>

								{/* Location */}
								<div className="space-y-2">
									<Label htmlFor="location">
										Location <span className="text-red-500">*</span>
									</Label>
									<Input
										id="location"
										placeholder="e.g. San Francisco, CA or Remote"
										{...register("location")}
									/>
									{errors.location && (
										<p className="text-red-500 text-sm mt-1">
											{errors.location.message}
										</p>
									)}
								</div>

								<div className="grid grid-cols-2 gap-5">
									{/* Salary Range */}
									<div className="space-y-2">
										<Label>
											Salary Range <span className="text-red-500">*</span>
										</Label>
										<div className="flex items-center gap-4">
											<Input
												type="number"
												placeholder="0"
												{...register("salary_min")}
											/>
											<span className="text-gray-500">-</span>
											<Input
												type="number"
												placeholder="0"
												{...register("salary_max")}
											/>
										</div>
										{(errors.salary_min || errors.salary_max) && (
											<p className="text-red-500 text-sm mt-1">
												{errors.salary_min?.message ||
													errors.salary_max?.message}
											</p>
										)}
									</div>

									{/* Job Type */}
									<div className="space-y-2 w-full col-span-1">
										<Label htmlFor="type">
											Job Type <span className="text-red-500">*</span>
										</Label>
										<Controller
											name="type"
											control={control}
											render={({ field }) => (
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<SelectTrigger className="w-full">
														<SelectValue placeholder="Select job type" />
													</SelectTrigger>
													<SelectContent className="w-full">
														<SelectItem value="Full-time">Full-time</SelectItem>
														<SelectItem value="Part-time">Part-time</SelectItem>
														<SelectItem value="Contract">Contract</SelectItem>
														<SelectItem value="Freelance">Freelance</SelectItem>
														<SelectItem value="Internship">
															Internship
														</SelectItem>
													</SelectContent>
												</Select>
											)}
										/>
										{errors.type && (
											<p className="text-red-500 text-sm mt-1">
												{errors.type.message}
											</p>
										)}
									</div>
								</div>

								{/* Job Description */}
								<div className="space-y-2">
									<Label htmlFor="description">
										Job Description <span className="text-red-500">*</span>
									</Label>
									<Textarea
										id="description"
										placeholder="Describe the job role and requirements..."
										className="min-h-[120px]"
										{...register("description")}
									/>
									{errors.description && (
										<p className="text-red-500 text-sm mt-1">
											{errors.description.message}
										</p>
									)}
								</div>
							</div>
						)}

						{/* STEP 2: ADDITIONAL DETAILS */}
						{step === 2 && (
							<div className="space-y-6">
								{/* Skills */}
								<div className="space-y-3">
									<div>
										<Label className="text-base font-semibold">Skills</Label>
										<p className="text-sm text-muted-foreground">
											Add technical skills required for this position
										</p>
									</div>

									{/* Skills list */}
									{skills && skills.length > 0 ? (
										<div className="border border-dashed border-gray-300 rounded-md p-4 space-y-2">
											{skills.map((skill, index) => (
												<div
													key={`skill-${index}-${skill}`}
													className="flex items-center justify-between bg-gray-50 p-2 rounded"
												>
													<span className="text-sm">{skill}</span>
													<Button
														type="button"
														variant="ghost"
														size="sm"
														onClick={() => handleRemoveSkill(index)}
													>
														<X className="h-4 w-4" />
													</Button>
												</div>
											))}
										</div>
									) : (
										<div className="border border-dashed border-gray-300 rounded-md p-6 text-center text-sm text-muted-foreground">
											No skills added yet. Add your first skill below.
										</div>
									)}

									{/* Add skill input */}
									<div className="flex gap-2">
										<Input
											placeholder="e.g. React, TypeScript, Node.js"
											value={skillInput}
											onChange={(e) => setSkillInput(e.target.value)}
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													e.preventDefault();
													handleAddSkill();
												}
											}}
										/>
										<Button
											type="button"
											onClick={handleAddSkill}
											className="bg-black text-white hover:bg-gray-800"
										>
											Add
										</Button>
									</div>
									{errors.skills && (
										<p className="text-red-500 text-sm mt-1">
											{errors.skills.message}
										</p>
									)}
								</div>

								{/* Key Responsibilities */}
								<div className="space-y-3">
									<div>
										<Label className="text-base font-semibold">
											Key Responsibilities
										</Label>
										<p className="text-sm text-muted-foreground">
											Define the main duties and tasks for this role
										</p>
									</div>

									{/* Responsibilities list */}
									{responsibilities && responsibilities.length > 0 ? (
										<div className="border border-dashed border-gray-300 rounded-md p-4 space-y-2">
											{responsibilities.map((responsibility, index) => (
												<div
													key={`responsibility-${index}-${responsibility.substring(0, 20)}`}
													className="flex items-start justify-between bg-gray-50 p-2 rounded"
												>
													<span className="text-sm">{responsibility}</span>
													<Button
														type="button"
														variant="ghost"
														size="sm"
														onClick={() => handleRemoveResponsibility(index)}
													>
														<X className="h-4 w-4" />
													</Button>
												</div>
											))}
										</div>
									) : (
										<div className="border border-dashed border-gray-300 rounded-md p-6 text-center text-sm text-muted-foreground">
											No responsibilities added yet. Add the first
											responsibility below.
										</div>
									)}

									{/* Add responsibility input */}
									<div className="flex gap-2">
										<Textarea
											placeholder="e.g. Design and develop scalable web applications using modern frameworks"
											value={responsibilityInput}
											onChange={(e) => setResponsibilityInput(e.target.value)}
											className="min-h-[60px]"
										/>
										<Button
											type="button"
											onClick={handleAddResponsibility}
											className="bg-black text-white hover:bg-gray-800 self-end"
										>
											Add
										</Button>
									</div>
									{errors.responsibilities && (
										<p className="text-red-500 text-sm mt-1">
											{errors.responsibilities.message}
										</p>
									)}
								</div>

								{/* Qualifications */}
								<div className="space-y-3">
									<div>
										<Label className="text-base font-semibold">
											Qualifications
										</Label>
										<p className="text-sm text-muted-foreground">
											List education and experience requirements
										</p>
									</div>

									{/* Qualifications list */}
									{qualifications && qualifications.length > 0 ? (
										<div className="border border-dashed border-gray-300 rounded-md p-4 space-y-2">
											{qualifications.map((qualification, index) => (
												<div
													key={`qualification-${index}-${qualification.substring(0, 20)}`}
													className="flex items-start justify-between bg-gray-50 p-2 rounded"
												>
													<span className="text-sm">{qualification}</span>
													<Button
														type="button"
														variant="ghost"
														size="sm"
														onClick={() => handleRemoveQualification(index)}
													>
														<X className="h-4 w-4" />
													</Button>
												</div>
											))}
										</div>
									) : (
										<div className="border border-dashed border-gray-300 rounded-md p-6 text-center text-sm text-muted-foreground">
											No qualifications added yet. Add the first qualification
											below.
										</div>
									)}

									{/* Add qualification input */}
									<div className="flex gap-2">
										<Textarea
											placeholder="e.g. Bachelor's degree in Computer Science or equivalent experience"
											value={qualificationInput}
											onChange={(e) => setQualificationInput(e.target.value)}
											className="min-h-[60px]"
										/>
										<Button
											type="button"
											onClick={handleAddQualification}
											className="bg-black text-white hover:bg-gray-800 self-end"
										>
											Add
										</Button>
									</div>
									{errors.qualifications && (
										<p className="text-red-500 text-sm mt-1">
											{errors.qualifications.message}
										</p>
									)}
								</div>
							</div>
						)}

						{/* NAVIGATION BUTTONS */}
						<div className="flex justify-between items-center pt-4 border-t">
							<div>
								{step !== 1 && (
									<Button
										type="button"
										onClick={handlePrevStep}
										variant="outline"
										className="flex items-center gap-1"
									>
										<ChevronLeft className="h-4 w-4" />
										Back
									</Button>
								)}
							</div>

							<div className="flex gap-2">
								<Button
									type="button"
									onClick={() => router.back()}
									variant="outline"
									className="border-red-500 text-red-500 hover:bg-red-50"
								>
									<X className="h-4 w-4 mr-1" />
									Cancel
								</Button>

								{step !== 2 ? (
									<Button
										type="button"
										onClick={handleNextStep}
										className="bg-black text-white hover:bg-gray-800"
									>
										Next
										<ChevronRight className="h-4 w-4 ml-1" />
									</Button>
								) : (
									<Button
										type="submit"
										disabled={createJobMutation.isPending}
										className="bg-black text-white hover:bg-gray-800"
									>
										{createJobMutation.isPending
											? "Publishing..."
											: "Publish Job"}
										<ChevronRight className="h-4 w-4 ml-1" />
									</Button>
								)}
							</div>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
