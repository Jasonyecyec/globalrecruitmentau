"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { resetPasswordSchema } from "@/schemas/auth";
import { AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ResetPasswordForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ new_password: string; confirm_password: string }>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const handleResetPassword: SubmitHandler<{ new_password: string; confirm_password: string }> = async (data) => {
    console.log(data);
    setIsLoading(true);
    try {
      // Call API to reset password
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Password reset successfully!");

      localStorage.removeItem("otpVerified");

      router.push("/signin");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleResetPassword)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="new_password">New Password</Label>
        <Input id="new_password" type="password" required {...register("new_password")} />
        {errors.new_password && <p className="text-red-500 text-sm mt-1">{errors.new_password.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm_password">Confirm New Password</Label>
        <Input id="confirm_password" type="password" required {...register("confirm_password")} />
        {errors.confirm_password && <p className="text-red-500 text-sm mt-1">{errors.confirm_password.message}</p>}
      </div>

      <Button
        type="submit"
        className="w-full bg-mainColor text-white font-semibold hover:bg-orange-400 transition-all duration-300"
        disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Resetting...
          </>
        ) : (
          "Reset Password"
        )}
      </Button>
    </form>
  );
}
