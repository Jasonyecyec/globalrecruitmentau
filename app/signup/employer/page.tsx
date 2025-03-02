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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select'
  

import { 
         Lock, 
         Mail, 
         ChevronRight, 
         ChevronLeft, 
         Phone,
         MapPin,
         FileText,
         User,
         Building,
         BadgeCheck} from "lucide-react"
import { useRouter } from "next/navigation";

type FormDatatype = {
    industry: string
}

export default function Employer (){
    const router = useRouter()
    const [step, setStep] = useState<number>(1)
    const totalSteps: number = 4 
    const progress: number  = (step / totalSteps) * 100

    const [formData, setFormData] = useState<FormDatatype> ({
        industry: ''
    })

    const handleNextStep = (e:FormEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        setStep((prev)=> prev + 1)
    }

        const handlePrevStep = (e:FormEvent<HTMLButtonElement>)=>{
            e.preventDefault()
            setStep((prev)=>prev - 1)
        }
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        
        console.log("submit")
        router.push('/signup/account_success')
    }

    const handleSelectChange = (name:string, value:string = 'test')=>{
      setFormData((prev)=> ({...prev, [name]:value}))
    }

    

    return(
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-5 md:p-0">
            <Card className="w-full max-w-xl shadow-lg">
            <CardHeader className="space-y-1">
                    <CardTitle className="flex flex-col items-center text-center">
                        <Link href="/">
                            <Image
                                src={RPGLogo}
                                alt="Recruitment Placement Global"
                                width={280}
                                height={80}
                                className="object-contain  h-28 w-28"
                            />
                        </Link>
                        <span className="text-xl text-secondaryColor font-bold text-center">Create Your Employer Account</span>
                    </CardTitle>

                    <CardDescription className="text-center">
                         {step === 1 && "Let's start with your company information"}
                        {step === 2 && "Tell us more about your hiring needs"}
                        {step === 3 && "Set up your account details"}
                    </CardDescription>

                    <div className="pt-2">
                        <Progress value={progress} className="text-mainColor h-[2.5px] "/>
                        <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
                            <span className={step === 1 ? "font-medium text-secondaryColor": ""} >
                                Company
                            </span>

                            <span className={step === 2 ? "font-medium text-secondaryColor": ""} >
                                Hiring Needs
                            </span>

                            <span className={step === 3 ? "font-medium text-secondaryColor": ""} >
                                Account
                            </span>

                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <form action="" className="space-y-4" onSubmit={handleSubmit}>
                        {step === 1 && (
                            <>
                            <div className="space-y-2">
                              <Label htmlFor="companyName">Company Name *</Label>
                              <div className="relative">
                                <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                  id="companyName"
                                  name="companyName"
                                //   value={formData.companyName}
                                //   onChange={handleChange}
                                  placeholder="Acme Inc."
                                  required
                                  className="pl-10"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="industry">Industry *</Label>
                              <Select
                                onValueChange={(value)=> handleSelectChange("industry",value)}
                                // defaultValue={formData.industry}
                                name="industry"
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select industry" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="tech">Technology</SelectItem>
                                  <SelectItem value="finance">Finance</SelectItem>
                                  <SelectItem value="healthcare">Healthcare</SelectItem>
                                  <SelectItem value="education">Education</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>

                              {formData.industry === "other" && (<Input placeholder="Specify Industtry"/>)}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="companySize">Company Size *</Label>
                              <Select
                                // onValueChange={(value) => handleSelectChange("companySize", value)}
                                // defaultValue={formData.companySize}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select company size" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1-10">1-10 employees</SelectItem>
                                  <SelectItem value="11-50">11-50 employees</SelectItem>
                                  <SelectItem value="51-200">51-200 employees</SelectItem>
                                  <SelectItem value="201-500">201-500 employees</SelectItem>
                                  <SelectItem value="501+">501+ employees</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            {/* Add more company-related fields as needed */}
                          </>
                        )}

                        {step === 2 && (
                             <>
                             <div className="space-y-2">
                               <Label htmlFor="hiringNeeds">What positions are you hiring for? *</Label>
                               <Textarea
                                 id="hiringNeeds"
                                 name="hiringNeeds"
                                //  value={formData.hiringNeeds}
                                //  onChange={handleChange}
                                 placeholder="e.g., Software Engineer, Marketing Manager, Sales Representative"
                                 required
                                 className="min-h-[100px]"
                               />
                             </div>
                             {/* Add more hiring-related fields as needed */}
                           </>
                        )}

                        {step === 3 && (
                                      <>
                                        <div className="space-y-2">
                                          <Label htmlFor="email">Work Email *</Label>
                                          <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                              id="email"
                                              name="email"
                                              // value={formData.email}
                                              // onChange={handleChange}
                                              placeholder="name@company.com"
                                              type="email"
                                              required
                                              className="pl-10"
                                            />
                                          </div>
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor="password">Password *</Label>
                                          <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                              id="password"
                                              name="password"
                                              // value={formData.password}
                                              // onChange={handleChange}
                                              type="password"
                                              required
                                              className="pl-10"
                                            />
                                          </div>
                                          <div className="text-xs text-gray-500">Password must be at least 8 characters long</div>
                                        </div>

                                        <div className="space-y-2">
                                          <Label htmlFor="confirm_password">Confirm Password *</Label>
                                          <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                              id="confirm_password"
                                              name="confirm_password"
                                              // value={formData.password}
                                              // onChange={handleChange}
                                              type="password"
                                              required
                                              className="pl-10"
                                            />
                                          </div>
                                        </div>
                                        {/* Add more account-related fields as needed */}
                                      </>
                                    )}

                        

                          <div className={`flex justify-between items-center pt-2`}>
                              {step != 1 ? (
                                  <Button onClick={handlePrevStep} className="border items-center justify-center flex border-mainColor text-gray-500 hover:text-mainColor h-8" variant='outline'>
                                      <ChevronLeft className=" h-4 w-4" /> 
                                          Back
                                  </Button>
                                ): (
                                      <Button onClick={()=> router.back()} className="border border-mainColor text-gray-500 hover:text-secondaryColor h-8" variant='outline'>
                                          Cancel
                                      </Button>                                
                                )} 
                              
                              {step !== 3 ? (
                                  <Button onClick={handleNextStep} className="bg-mainColor text-white h-8 hover:bg-orange-400">
                                          Next                                     
                                      <ChevronRight className="h-4 w-4" />
                                  </Button>
                              ): (
                                  <Button className="bg-mainColor hover:bg-main/90 text-white">
                                      Complete Registration
                                      <BadgeCheck className="h-4 w-4" />
                                </Button>
                              )}
                          </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}