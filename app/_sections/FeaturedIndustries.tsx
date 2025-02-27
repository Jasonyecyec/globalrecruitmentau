import React from "react";
import { StaticImageData } from "next/image";
import {Button} from '@/components/ui/button'
import FeaturedIndustriesCard from "@/app/_components/FeaturedIndustriesCard";

type FeaturedIndustriesList = {
    icon: React.ComponentType<{className: string}>
    title: string,
    description: string
    image: StaticImageData
}

type FeaturedIndustriesProps = {
    featuredIndustries: FeaturedIndustriesList[]
}

const FeaturedIndustries = ({featuredIndustries}: FeaturedIndustriesProps)=>{
    return(
        <section className="py-16 bg-white" id="featured-industries">
            <div className="mx-auto max-w-6xl px-4">
                <h2 className="mb-10 text-center text-3xl font-bold">Featured Industries</h2>
                
                <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center ">
                    {featuredIndustries?.map((industries, index)=>(
                        <FeaturedIndustriesCard 
                            key={index}
                            icon={industries.icon} 
                            title={industries.title}
                            description={industries.description}
                            image={industries.image}/>

                    ))}
                </div>

                <div className="mt-10 text-center">
                    <Button variant="outline" className="border-[#1E1147] text-[#1E1147] hover:bg-[#1E1147] hover:text-white">
                        Explore All Industries
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default FeaturedIndustries;