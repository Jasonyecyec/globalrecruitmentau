"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPasswordSchema } from "@/schemas/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getOTPEXpirationTime, isOTPValid, isOTPVerified, storeOTPSentStatus } from "@/lib/helpers/utils";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const emailValue = watch("email");

  const handleResetPassword: SubmitHandler<{ email: string }> = async (data) => {
    try {
      setIsLoading(true);

      // call api send otp to email
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("OTP was sent to your email!");

      //store otp sent status in local storage
      storeOTPSentStatus();

      //redirect to otp validate page
      router.push("/otp-validate");
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (emailValue) {
      setError("");
    }
  }, [emailValue]);

  useEffect(() => {
    if (isOTPValid()) {
      router.push("/otp-validate");
    }

    if (isOTPVerified()) {
      router.push("/reset-password");
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(handleResetPassword)} className="space-y-4">
      {error && (
        <Alert variant="destructive" className="bg-red-50 flex items-center justify-between ">
          <AlertCircle className="h-4 w-4" />
          <div>
            <AlertDescription className="font-medium pt-1">{error}</AlertDescription>
          </div>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="admin@recruitmentglobal.com" required {...register("email")} />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <Button
        type="submit"
        className="w-full bg-mainColor text-white font-semibold hover:bg-orange-400 transition-all duration-300"
        disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send OTP"
        )}
      </Button>

      <div className="text-center mt-4">
        <Button
          variant="link"
          className="text-sm text-primary"
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}>
          Back to login
        </Button>
      </div>
    </form>
  );
}
