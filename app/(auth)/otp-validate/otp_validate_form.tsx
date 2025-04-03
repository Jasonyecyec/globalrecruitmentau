"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { AlertCircle, Loader2 } from "lucide-react";
import { verifyOTPSchema, VerifyOTPFormSchema } from "@/schemas/auth";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  convertSecondsToMinutes,
  getOTPEXpirationTime,
  isOTPVerified,
  startCountdown,
  storeOTPSentStatus,
  storeOTPVerificationStatus,
} from "@/lib/helpers/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function OTPValidateForm() {
  const router = useRouter();
  const [validating, setValidating] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);

  const form = useForm<VerifyOTPFormSchema>({
    resolver: zodResolver(verifyOTPSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleVerifyOTP: SubmitHandler<{ otp: string }> = async (data) => {
    setValidating(true);
    try {
      // call api verify otp
      await new Promise((resolve) => setTimeout(resolve, 1000));

      storeOTPVerificationStatus(true);

      toast.success("Valid OTP!");

      // redirect to reset password page
      router.push("/reset-password");
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setValidating(false);
    }
  };

  const handleResendOTP = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSending(true);
    try {
      storeOTPSentStatus();
      setIsResendDisabled(true);
      fetchOTPExpirationTime();

      // call api send otp to email
      await new Promise((resolve) => setTimeout(resolve, 3000));

      toast.success("OTP was sent to your email!");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const cleanupTimer = startCountdown(setCountdown, setIsResendDisabled); // Start the countdown timer

    return cleanupTimer; // Cleanup the timer when component unmounts or countdown ends
  }, [countdown]);

  const fetchOTPExpirationTime = () => {
    const expirationTime = getOTPEXpirationTime(); // Get the expiration time in milliseconds
    if (expirationTime) {
      const remainingTime = Math.floor(expirationTime / 1000); // Convert ms to seconds

      setCountdown(remainingTime); // Set countdown in seconds
    }
  };
  useEffect(() => {
    fetchOTPExpirationTime();

    if (isOTPVerified()) {
      router.push("/reset-password");
    }
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleVerifyOTP)} className="space-y-4">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP maxLength={6} {...field} pattern={REGEXP_ONLY_DIGITS}>
                  <InputOTPGroup className="w-full">
                    <InputOTPSlot index={0} className="w-14 h-14 text-2xl" />
                    <InputOTPSlot index={1} className="w-14 h-14 text-2xl" />
                    <InputOTPSlot index={2} className="w-14 h-14 text-2xl" />
                    <InputOTPSlot index={3} className="w-14 h-14 text-2xl" />
                    <InputOTPSlot index={4} className="w-14 h-14 text-2xl" />
                    <InputOTPSlot index={5} className="w-14 h-14 text-2xl" />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-mainColor text-white font-semibold hover:bg-orange-400 transition-all duration-300"
          disabled={validating}>
          {validating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Validating OTP...
            </>
          ) : (
            "Validate OTP"
          )}
        </Button>

        <Button
          type="button"
          className="w-full bg-transparent text-black border hover:bg-gray-100 flex items-center justify-center gap-2"
          disabled={isResendDisabled || sending}
          onClick={handleResendOTP}>
          {sending ? ( // Checking "sending" first
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending OTP...
            </>
          ) : isResendDisabled ? (
            `Resend OTP in ${convertSecondsToMinutes(countdown)}` // Countdown display
          ) : (
            "Resend OTP"
          )}
        </Button>
      </form>
    </Form>
  );
}
