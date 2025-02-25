import React from "react";
import Link from "next/link";
import Image from "next/image";
import {Button} from '@/components/ui/button';

type NavigationItems = {
    name: string;
    path: string;
}

type HeaderProps = {
    navigation: NavigationItems [];
}


const Header =  ({navigation}: HeaderProps)=>{
    return(
        <div className="sticky z-50 top-0 w-full bg-white border">
             <div className="container h-16 flex items-center justify-between px-5 sm:pl-48 sm:pr-20">
                 {/* Logo */}
                <Link href="/" className=" flex items-center space-x-2">
                    <div className="relative  bg-red-200">
                        <img src='/img/recruitmentglobal_logo.jpg' alt="Recruitment Global Logo" className="h-12 bg-red-200" />
                    </div>
                </Link>

                {/* Links */}
                <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
                    {navigation.map((item, index)=>(
                        <Link href={item.path} key={index}>    
                            {item.name} 
                        </Link>
                    ))}
                </nav>

                {/* Login & Signup */}
                <div className="flex space-x-4">
                    <Button variant="outline" className="border duration-300 text-sm "> Log In</Button>
                    <Button  className="bg-mainColor hover:bg-orange-500 duration-300 text-sm"> Sign Up</Button>
                </div>
            </div>
        </div>
    )
}

export default Header;