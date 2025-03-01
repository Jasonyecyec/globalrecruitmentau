import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input} from "@/components/ui/input"
import {Label} from '@/components/ui/label'
import {Separator } from '@/components/ui/separator'
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import RPGLogo from '@/public/img/recruitmentglobal_logo.jpg'

export default function Login() {
  return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 md: p-24" id="login">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-2">
                    <CardTitle className="flex flex-col items-center text-center font-bold text-secondaryColor text-xl">
                        <Link href="/">
                            <Image
                                src={RPGLogo}
                                alt="Recruitment Placement Global"
                                width={280}
                                height={80}
                                className="object-contain h-32 w-32"
                            />
                        </Link>
                    
                        <span>Login</span>
                    </CardTitle>
                    <CardDescription className="text-center text-base text-gray-500">Enter your credentials to access your account</CardDescription>
                </CardHeader>

                    <CardContent className="w-full">
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                                    <Input id="email" placeholder="name@exampl.com" type="email" required className="pl-8"/>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href="/forgot-password" className="text-sm text-gray-400 hover:text-orange-600 transition-all duration-300">
                                        Forgot password?
                                    </Link>
                                </div>

                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                                    <Input id="password" type="password" required  className="pl-8 pr-8"/>
                                    <button type="button"className="absolute right-3 top-3 text-gray-400"><Eye className="h-4 w-4"/></button>
                                </div>
                            </div>

                            <Button type="submit" className="w-full bg-mainColor text-white font-semibold hover:bg-orange-400 transition-all duration-300"> Login</Button>
                        </form>

                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center ">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <Button variant="outline" className="text-gray-600 w-full border-gray-300">
                            Continue with Google
                        </Button>
                        
        
                    </CardContent>
            </Card>
        </div>
    )
}

