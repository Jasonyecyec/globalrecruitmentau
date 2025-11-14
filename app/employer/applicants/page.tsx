"use client";

import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useJobPostedList } from "@/lib/hooks/use-jobs";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Briefcase, MapPin, Users } from "lucide-react";

export default function ApplicantsLanding() {
	const { data, isLoading, isError } = useJobPostedList();
	const jobs = data?.data ?? [];

	return (
		<div className="p-4 sm:px-6 md:py-8">
			<div className="flex flex-col gap-2 mb-6">
				<h1 className="text-2xl font-bold tracking-tight">Applicants</h1>
				<p className="text-muted-foreground">
					Select a job below to review and manage the candidates who applied.
				</p>
			</div>

			{isLoading ? (
				<div className="grid gap-4 md:grid-cols-2">
					{Array.from({ length: 4 }).map((_, index) => (
						<Card key={index}>
							<CardHeader>
								<Skeleton className="h-5 w-32" />
								<Skeleton className="h-4 w-48" />
							</CardHeader>
							<CardContent className="space-y-3">
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-4 w-36" />
								<Skeleton className="h-4 w-20" />
							</CardContent>
							<CardFooter>
								<Skeleton className="h-9 w-full" />
							</CardFooter>
						</Card>
					))}
				</div>
			) : isError ? (
				<Card>
					<CardContent className="py-12 text-center">
						<p className="font-semibold">Unable to load jobs.</p>
						<p className="text-muted-foreground mt-2">
							Please try again in a moment.
						</p>
					</CardContent>
				</Card>
			) : jobs.length === 0 ? (
				<Card>
					<CardContent className="py-12 text-center">
						<p className="font-semibold">No jobs available.</p>
						<p className="text-muted-foreground mt-2">
							Create a job posting to start receiving applicants.
						</p>
						<Button className="mt-4" asChild>
							<Link href="/employer/post-job">Post a Job</Link>
						</Button>
					</CardContent>
				</Card>
			) : (
				<div className="grid gap-4 md:grid-cols-2">
					{jobs.map((job) => (
						<Card key={job.id} className="flex flex-col justify-between">
							<CardHeader>
								<div className="flex items-center justify-between gap-4">
									<div>
										<CardTitle className="text-xl">{job.title}</CardTitle>
										<CardDescription>
											{job.company?.name || job.company?.industry}
										</CardDescription>
									</div>
									<Badge variant="outline" className="capitalize">
										{job.status}
									</Badge>
								</div>
							</CardHeader>
							<CardContent className="space-y-2 text-sm text-muted-foreground">
								<div className="flex items-center gap-2">
									<MapPin className="h-4 w-4" />
									<span>{job.location}</span>
								</div>
								<div className="flex items-center gap-2">
									<Briefcase className="h-4 w-4" />
									<span>{job.type}</span>
								</div>
								<div className="flex items-center gap-2">
									<Users className="h-4 w-4" />
								<span>{job.total_applications ?? 0} applicants</span>
								</div>
							</CardContent>
							<CardFooter>
								<Button className="w-full" asChild>
									<Link href={`/employer/applicants/${job.id}`}>
										View Applicants
									</Link>
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
