"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Mail,
	Phone,
	Download,
	CheckCircle2,
	XCircle,
	Calendar,
	CirclePause,
} from "lucide-react";
import { useJobApplicationUpdate } from "@/lib/hooks/use-job-application";
import { toast } from "sonner";
import { Applicant } from "@/types/job";

interface ApplicantProfileModalProps {
	applicant: Applicant | null;
	jobId: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	jobTitle?: string;
}

export function ApplicantProfileModal({
	applicant,
	jobId,
	open,
	onOpenChange,
	jobTitle,
}: ApplicantProfileModalProps) {
	const { mutateAsync: updateApplicantStatus, isPending } =
		useJobApplicationUpdate();

	if (!applicant) return null;

	const handleStatusUpdate = async (status: string) => {
		try {
			const response = await updateApplicantStatus({
				id: String(applicant.id),
				jobId: jobId,
				data: {
					status: status,
				},
			});

			if (response.success) {
				toast.success(response.message || `Applicant marked as ${status}`);
			}
		} catch {
			toast.error("Failed to update status. Please try again.");
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-2xl">{applicant.name}</DialogTitle>
					<DialogDescription>Applied for {jobTitle}</DialogDescription>
				</DialogHeader>

				<div className="space-y-6">
					{/* Contact Information */}
					<div className="space-y-3">
						<h3 className="font-semibold">Contact Information</h3>
						<div className="grid grid-cols-1 gap-2 text-sm">
							<div className="flex items-center gap-2">
								<Mail className="h-4 w-4 text-muted-foreground" />
								<span>{applicant.email}</span>
							</div>
							<div className="flex items-center gap-2">
								<Phone className="h-4 w-4 text-muted-foreground" />
								<span>{applicant.contact_number}</span>
							</div>
						</div>
					</div>

					{/* Attachments */}
					{(applicant.resume_presigned_url ||
						applicant.cover_letter_presigned_url) && (
						<div className="space-y-3">
							<h3 className="font-semibold">Attachments</h3>
							<div className="flex gap-2 flex-wrap">
								{applicant.resume_presigned_url && (
									<Button variant="outline" size="sm" asChild>
										<a
											href={applicant.resume_presigned_url}
											target="_blank"
											rel="noopener noreferrer"
										>
											<Download className="mr-2 h-4 w-4" /> Resume
										</a>
									</Button>
								)}
								{applicant.cover_letter_presigned_url && (
									<Button variant="outline" size="sm" asChild>
										<a
											href={applicant.cover_letter_presigned_url}
											target="_blank"
											rel="noopener noreferrer"
										>
											<Download className="mr-2 h-4 w-4" /> Cover Letter
										</a>
									</Button>
								)}
							</div>
						</div>
					)}

					{/* Experience and Education */}
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<h3 className="font-semibold">Experience</h3>
							<p className="text-sm text-muted-foreground">
								{applicant.experience || "Not provided"}
							</p>
						</div>
						<div className="space-y-2">
							<h3 className="font-semibold">Education</h3>
							<p className="text-sm">{applicant.education || "Not provided"}</p>
						</div>
					</div>

					{/* Skills */}
					{applicant.skills?.length > 0 && (
						<div className="space-y-3">
							<h3 className="font-semibold">Skills</h3>
							<div className="flex flex-wrap gap-2">
								{applicant.skills.map((skill) => (
									<Badge key={skill} variant="secondary">
										{skill}
									</Badge>
								))}
							</div>
						</div>
					)}

					{/* Action Buttons */}
					<div className="flex gap-2 pt-4 border-t">
						<Button
							disabled={isPending}
							onClick={() => handleStatusUpdate("accept")}
							className="flex-1 bg-green-600 hover:bg-green-700"
						>
							<CheckCircle2 className="mr-2 h-4 w-4" />
							Accept
						</Button>
						<Button
							onClick={() => handleStatusUpdate("shortlisted")}
							disabled={isPending}
							variant="outline"
							className="flex-1"
						>
							<Calendar className="mr-2 h-4 w-4" />
							Short list
						</Button>
						<Button
							onClick={() => handleStatusUpdate("on_hold")}
							disabled={isPending}
							variant="outline"
							className="flex-1"
						>
							<CirclePause className="mr-2 h-4 w-4" />
							On Hold
						</Button>
						<Button
							onClick={() => handleStatusUpdate("reject")}
							disabled={isPending}
							variant="destructive"
							className="flex-1"
						>
							<XCircle className="mr-2 h-4 w-4" />
							Reject
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
