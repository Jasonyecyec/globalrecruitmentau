"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ChevronRight,
  Search,
  ChevronLeft,
  MapPin,
  Building,
  Phone,
  FileText,
  CheckCircle,
  Briefcase,
  Check,
  BadgeCheck,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const AccountSuccess = () => {
  // const userType = useState<string>('applicant')
  const userType: "employer" | "applicant" = "applicant";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-mainColor" />
          </div>
          <CardTitle className="text-2xl font-bold text-secondaryColor">
            {userType === "applicant" ? "Profile Created!" : "Account Created!"}
          </CardTitle>
          <CardDescription>
            {userType === "applicant"
              ? "Your candidate profile has been successfully created"
              : "Your employer account has been successfully created"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            We've sent a confirmation email to your inbox. Please verify your
            email to unlock all features.
          </p>
          <div className="rounded-lg bg-gray-50 p-4 border border-gray-200">
            <h3 className="font-medium text-secondaryColor mb-2">
              What's Next?
            </h3>
            <ul className="text-sm text-gray-600 text-left space-y-2">
              {userType === "applicant" ? (
                <>
                  <li className="flex items-start">
                    <span className="bg-mainColor text-white rounded-full p-1 mr-2 mt-0.5">
                      <Check className="h-3 w-3" />
                    </span>
                    Complete your profile with additional work history
                  </li>
                  <li className="flex items-start">
                    <span className="bg-mainColor text-white rounded-full p-1 mr-2 mt-0.5">
                      <Check className="h-3 w-3" />
                    </span>
                    Set up job alerts for positions matching your skills
                  </li>
                  <li className="flex items-start">
                    <span className="bg-mainColor text-white rounded-full p-1 mr-2 mt-0.5">
                      <Check className="h-3 w-3" />
                    </span>
                    Browse open positions and start applying
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start">
                    <span className="bg-mainColor text-white rounded-full p-1 mr-2 mt-0.5">
                      <Check className="h-3 w-3" />
                    </span>
                    Complete your company profile
                  </li>
                  <li className="flex items-start">
                    <span className="bg-mainColor text-white rounded-full p-1 mr-2 mt-0.5">
                      <Check className="h-3 w-3" />
                    </span>
                    Post your first job listing
                  </li>
                  <li className="flex items-start">
                    <span className="bg-mainColor text-white rounded-full p-1 mr-2 mt-0.5">
                      <Check className="h-3 w-3" />
                    </span>
                    Start searching for candidates
                  </li>
                </>
              )}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button
            asChild
            className="w-full bg-mainColor hover:bg-main/90 text-white"
          >
            <Link href="/home">Go to Dashboard</Link>
          </Button>
          {userType === "applicant" ? (
            <Button
              asChild
              variant="outline"
              className="w-full border-main text-main hover:bg-main/10"
            >
              <Link href="/">
                <Search className="mr-2 h-4 w-4" />
                Browse Open Positions
              </Link>
            </Button>
          ) : (
            <Button
              asChild
              variant="outline"
              className="w-full border-main text-main hover:bg-main/10"
            >
              <Link href="/post-job">
                <Briefcase className="mr-2 h-4 w-4" />
                Post a Job
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AccountSuccess;
