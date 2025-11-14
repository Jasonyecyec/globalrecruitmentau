"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { isAuthenticated } from "@/lib/helpers/utils";

export function ViewMoreJobsButton() {
	const router = useRouter();
	const role = getCookie("role");

	const handleClick = () => {
		if (isAuthenticated() && role === "jobseeker") {
			router.push("/home/find-jobs");
		} else {
			router.push("/signin");
		}
	};

	return <Button onClick={handleClick}>View More Jobs</Button>;
}
