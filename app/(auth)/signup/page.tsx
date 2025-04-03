'use client'
import React, { FormEvent, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import Link from "next/link";
import Image from "next/image";
import RPGLogo from '@/public/img/recruitmentglobal_logo.jpg'
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Eye, 
         EyeOff, 
         Lock, 
         Mail, 
         ChevronRight, 
         ChevronLeft, 
         MapPin, 
         Building, 
         Phone, 
         FileText, 
         Check,
         UserCircle,
         BadgeCheck} from "lucide-react"
import { useRouter } from "next/navigation";


export default function SignUp (){
    const [userType, setUserType] = useState<"applicant" | "employer" | null>(null)
    // const [step, setStep] = useState<number>(1)
    const router = useRouter()
    // const totalSteps: number = 4 
    // const progress: number  = (step / totalSteps) * 100

    // const handleNextStep = (e:FormEvent<HTMLButtonElement>)=>{
    //     e.preventDefault()
    //     setStep((prev)=> prev + 1)
    // }

    // const handlePrevStep = (e:FormEvent<HTMLButtonElement>)=>{

    //     setStep((prev)=>prev - 1)
    // }

    // const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
    //     e.preventDefault()
        
    //     console.log("submit")
    //     router.push('/signup/account_success')
    // }

    const handleSignUpButton = (user: string)=>{
        console.log("user type", user)

        // save user type to global state/persis in session

        user === "applicant" ? router.push('/signup/candidate') : router.push('/signup/employer') 
    }

    const jobSeeker = [" Create a professional profile","Apply to thousands of jobs", "Get discovered by employers"]

   return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-10 bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full max-w-3xl space-y-8 text-center">
            <div className="flex flex-col items-center w-full">
                <Link href="/">
                    <Image
                        src={RPGLogo}
                        alt="Recruitment Placement Global"
                        width={280}
                        height={80}
                        className="object-contain  h-28 w-28"
                    />
                </Link>

                <h1 className="text-3xl font-bold tracking-tight text-secondaryColor md:text-4xl">
                    Welcome to Recruitment Placement Global
                </h1>  
            </div>
            
            <p>Your gateway to career opportunities and top talent. Choose your path to get started.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                <Card className="flex flex-col justify-between bg-white hover:shadow-lg transition-all duration-250">
                    <CardHeader>
                        <UserCircle className="w-12 h-12 mx-auto text-mainColor" />
                        <CardTitle className="text-xl font-bold mt-4">I'm a Job Seeker</CardTitle>
                        <CardDescription>Find your dream job and connect with top employers</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <ul className="space-y-2 text-sm text-left">
                            {jobSeeker.map((text,index)=>(
                                 <li key={index} className="flex items-center">
                                    <span className="bg-[#ffeedd] flex items-center justify-center text-mainColor rounded-full p-1 w-7 h-7 mr-3">✓</span>
                                    {text}
                                 </li>
                            ))}
                           
                        </ul>
                    </CardContent>

                    <CardFooter>
                        <Button onClick={()=> handleSignUpButton("applicant")} className="w-full bg-mainColor hover:bg-main/90">
                            Sign Up as Job Seeker
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="flex flex-col justify-between bg-white hover:shadow-lg transition-all duration-250">
                    <CardHeader>
                        <UserCircle className="w-12 h-12 mx-auto text-secondaryColor" />
                        <CardTitle className="text-xl font-bold mt-4">I'm an Employer</CardTitle>
                        <CardDescription>Post jobs and find the perfect candidates for your company</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <ul className="space-y-2 text-sm text-left">
                            {jobSeeker.map((text,index)=>(
                                 <li key={index} className="flex items-center">
                                    <span className="bg-[#d1d0e0] flex items-center justify-center text-secondaryColor rounded-full p-1 w-7 h-7 mr-3">✓</span>
                                    {text}
                                 </li>
                            ))}
                           
                        </ul>
                    </CardContent>

                    <CardFooter>
                        <Button onClick={()=> handleSignUpButton("employer")} className="w-full bg-secondaryColor hover:bg-main/90">
                            Sign Up as Employer
                        </Button>
                    </CardFooter>

                </Card>
            </div>
        </div>
    </div>
   )
}