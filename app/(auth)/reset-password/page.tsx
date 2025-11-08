"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import RPGLogo from "@/public/img/recruitmentglobal_logo.jpg";
import ResetPasswordForm from "./reset_password_form";

export default function ResetPassword() {
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

            <span>Reset Password</span>
          </CardTitle>
          <CardDescription className="text-center text-base text-gray-500">
            Create a new password for your account
          </CardDescription>
        </CardHeader>

        <CardContent className="w-full">
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
