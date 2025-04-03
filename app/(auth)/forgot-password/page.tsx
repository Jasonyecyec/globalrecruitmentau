import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import RPGLogo from "@/public/img/recruitmentglobal_logo.jpg";
import ForgotPasswordForm from "./forgot_password_form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4" id="forgot-password">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="flex flex-col items-center text-center font-bold text-secondaryColor text-xl">
            <Link href="/">
              <Image
                src={RPGLogo}
                alt="Recruitment Placement Global"
                width={280}
                height={80}
                className="object-contain h-28 w-28"
              />
            </Link>

            <span>Forgot Password</span>
          </CardTitle>
          <CardDescription className="text-center text-base text-gray-500">
            Enter your email address and we'll send you a link to reset your password
          </CardDescription>
        </CardHeader>

        <CardContent className="w-full">
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
