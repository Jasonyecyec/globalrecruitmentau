import React from "react";
import Image from "next/image";
import {Button} from '@/components/ui/button'

const Hero = () => {
  return (
    <section className="relative min-h-screen  bg-heroImg bg-no-repeat bg-cover text-white"  id="hero"
        // style={{ backgroundImage: `theme('heroImg')` }}
    >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E1147]/70 to-orange-300/50"></div>

         {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}
        <div className="px-20 md:px-0 relative mx-auto max-w-5xl ">
            <div className="grid md:grid-cols-2 items-center">

                <div className="pt-24">
                    <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                        Connecting Global Talent with Opportunity
                    </h1>
                    <p className="mb-8 text-lg md:text-xl">
                    Your trusted partner in finding the perfect match between exceptional candidates and leading Australian companies.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white w-32">Find Jobs</Button>
                        <Button
                        variant="outline"
                        className="bg-transparent text-white border-white hover:bg-white hover:text-[#1E1147] w-32"
                        >
                        For Employers
                        </Button>
                    </div>
                </div>
            </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent h-20"></div>
  </section>
  );
}


export default Hero;