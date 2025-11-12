"use client";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
	MapPin,
	Building2,
	Calendar,
	Share2,
	Star,
	Users,
	Globe,
	Clock,
	StarIcon,
	ExternalLink,
	Briefcase,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Job } from "@/types/job";
import { formatDate } from "@/lib/utils";
import { useJobApplicationCreate } from "@/lib/hooks/use-job-application";
import { toast } from "sonner";

type JobDetailsProps = {
	job: Job | null;
	onToggleSave: () => void;
};
export default function JobDetails({ job, onToggleSave }: JobDetailsProps) {
	const { mutateAsync: createJobApplication, isPending } =
		useJobApplicationCreate();

	const handleApplyJob = async () => {
		try {
			const response = await createJobApplication({
				job_id: job?.id as number,
			});

			if (response.success) {
				toast.success(response.message);
			}
		} catch (error: unknown) {
			const errorMessage =
				(error as { response?: { data?: { message?: string } } })?.response
					?.data?.message || "Login failed";
			toast.warning(errorMessage);
		}
	};

	if (!job) {
		return (
			<div className="sticky top-20">
				<Card className="h-[600px] flex flex-col items-center justify-center gap-4 p-8 text-center text-muted-foreground">
					<Briefcase className="h-10 w-10 text-muted-foreground" />
					<div>
						<h3 className="text-lg font-semibold text-foreground">
							No job selected
						</h3>
						<p className="text-sm">
							Choose a job from the list to see its full details here.
						</p>
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div className="sticky top-20 space-y-4">
			<Card>
				<CardHeader className="pb-3">
					<div className="flex justify-between items-start">
						<Avatar className="h-12 w-12 rounded-md bg-gray-100">
							<AvatarImage
								src={job?.company?.company_image_presigned_url}
								alt={job?.company?.name}
								className="w-12 h-12"
							/>
							<AvatarFallback className="rounded-md">
								{job?.company?.name}
							</AvatarFallback>
						</Avatar>

						<div className="flex space-x-2">
							<Button
								variant="outline"
								size="icon"
								className="h-8 w-8"
								onClick={onToggleSave}
							>
								{job?.saved ? (
									<StarIcon className="h-4 w-4 fill-primary text-primary" />
								) : (
									<Star className="h-4 w-4" />
								)}
								<span className="sr-only">Save job</span>
							</Button>
							<Button
								variant="outline"
								size="icon"
								disabled
								className="h-8 w-8"
							>
								<Share2 className="h-4 w-4" />
								<span className="sr-only">Share job</span>
							</Button>
						</div>
					</div>
					<CardTitle className="text-xl mt-4">{job?.title}</CardTitle>
					<CardDescription className="flex items-center">
						<Building2 className="mr-1 h-3 w-3" />
						{job?.company?.name}
					</CardDescription>
				</CardHeader>

				<CardContent className="pb-6">
					<Tabs defaultValue="overview" className="mb-4">
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger value="overview">Overview</TabsTrigger>
							<TabsTrigger value="company">Company</TabsTrigger>
							<TabsTrigger value="details">Details</TabsTrigger>
						</TabsList>
						<TabsContent value="overview" className="pt-4 space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col space-y-1">
									<span className="text-xs text-muted-foreground">
										Location
									</span>
									<span className="flex items-center text-sm">
										<MapPin className="mr-1 h-3 w-3" />
										{job?.location}
									</span>
								</div>
								<div className="flex flex-col space-y-1">
									<span className="text-xs text-muted-foreground">
										Job Type
									</span>
									<span className="flex items-center text-sm">
										<Clock className="mr-1 h-3 w-3" />
										{job?.type}
									</span>
								</div>
								<div className="flex flex-col space-y-1">
									<span className="text-xs text-muted-foreground">Salary</span>
									<span className="flex items-center text-sm">
										${job?.salary_min.toLocaleString()} - $
										{job?.salary_max.toLocaleString()}
									</span>
								</div>
								<div className="flex flex-col space-y-1">
									<span className="text-xs text-muted-foreground">Posted</span>
									<span className="flex items-center text-sm">
										<Calendar className="mr-1 h-3 w-3" />
										{formatDate(job?.date_created)}
									</span>
								</div>
							</div>
							<Separator />
							<div>
								<h3 className="font-medium mb-2">Job Description</h3>
								<p className="text-sm text-muted-foreground">
									{job?.description}
								</p>
							</div>
						</TabsContent>
						<TabsContent value="company" className="pt-4 space-y-4">
							<div>
								<h3 className="font-medium mb-2">
									About {job?.company?.about}
								</h3>
								<p className="text-sm text-muted-foreground">
									{job?.aboutCompany}
								</p>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="flex flex-col space-y-1">
									<span className="text-xs text-muted-foreground">
										Company Size
									</span>
									<span className="flex items-center text-sm">
										<Users className="mr-1 h-3 w-3" />
										{job?.company?.size}
									</span>
								</div>
								<div className="flex flex-col space-y-1">
									<span className="text-xs text-muted-foreground">
										Industry
									</span>
									<span className="flex items-center text-sm">
										<Building2 className="mr-1 h-3 w-3" />
										{job?.company?.industry}
									</span>
								</div>
								<div className="flex flex-col space-y-1 col-span-2">
									<span className="text-xs text-muted-foreground">Website</span>
									<a
										href={job?.companyWebsite}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center text-sm text-primary hover:underline"
									>
										<Globe className="mr-1 h-3 w-3" />
										{job?.companyWebsite}
										<ExternalLink className="ml-1 h-3 w-3" />
									</a>
								</div>
							</div>
						</TabsContent>
						<TabsContent value="details" className="pt-4 space-y-4">
							<div>
								<h3 className="font-medium mb-2">Key Responsibilities</h3>
								<ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
									{job?.responsibilities?.map((responsibility, index) => (
										<li key={index}>{responsibility}</li>
									))}
								</ul>
							</div>
							<Separator />
							<div>
								<h3 className="font-medium mb-2">Skills & Qualifications</h3>
								<ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
									{job?.qualifications?.map((qualification, index) => (
										<li key={index}>{qualification}</li>
									))}
								</ul>
							</div>
							<div>
								<h3 className="font-medium mb-2">Required Skills</h3>
								<div className="flex flex-wrap gap-2">
									{job?.skills.map((skill) => (
										<Badge key={skill} variant="secondary">
											{skill}
										</Badge>
									))}
								</div>
							</div>
						</TabsContent>
					</Tabs>
				</CardContent>

				<CardFooter className="flex flex-col space-y-2 pt-0">
					<Button
						onClick={handleApplyJob}
						disabled={isPending}
						className="w-full bg-mainColor hover:bg-orange-400 transition-all duration-250"
					>
						{isPending ? "Applying..." : "Apply Now"}
					</Button>
				</CardFooter>
			</Card>

			{/* <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Similar Jobs</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-start space-x-3">
            <Avatar className="h-8 w-8 rounded-md">
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="Company"
              />
              <AvatarFallback className="rounded-md">TC</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none">
                Frontend Developer
              </h4>
              <p className="text-xs text-muted-foreground">
                WebTech Inc. • Remote
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Avatar className="h-8 w-8 rounded-md">
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="Company"
              />
              <AvatarFallback className="rounded-md">DS</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none">
                UI/UX Designer
              </h4>
              <p className="text-xs text-muted-foreground">
                DesignStudio • New York, NY
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Avatar className="h-8 w-8 rounded-md">
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="Company"
              />
              <AvatarFallback className="rounded-md">IN</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none">
                Full Stack Developer
              </h4>
              <p className="text-xs text-muted-foreground">
                InnoTech • San Francisco, CA
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" className="w-full text-sm">
            View All Similar Jobs
          </Button>
        </CardFooter>
      </Card> */}
		</div>
	);
}
