import React from "react";
import {Card} from '@/components/ui/card';
import {Search, MapPin} from 'lucide-react';

type FeaturedIndustriesCardProps = {
    icon: React.ComponentType<{className: string}>
    title: string,
    description: string
}

const FeaturedIndustriesCard = ({icon:Icon,title, description}:FeaturedIndustriesCardProps)=>{
    return(
        <Card className="flex flex-col p-4 items-center justify-center">
            <span><Icon className=""/></span>
            <p className="font-semibold text-lg">{title}</p>
            <p>{description}</p>
        </Card>
    )
}


const FeaturedIndustries = ()=>{
    return(
        <section className="py-16 bg-white" id="featured-industries">
            <div className="mx-auto max-w-6xl border border-red-200">
                <h2 className="mb-10 text-center text-3xl font-bold">Featured Industries</h2>
                
           

                <div className="flex items-center space-x-5">
                    <FeaturedIndustriesCard icon={Search} title="test" description="test"/>
                </div>
            </div>
        </section>
    )
}

export default FeaturedIndustries;