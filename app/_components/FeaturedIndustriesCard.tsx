import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import {Button} from '@/components/ui/button'
import {Card,CardHeader} from '@/components/ui/card';
import {ArrowRight} from 'lucide-react';

type FeaturedIndustriesCardProps = {
    icon: React.ComponentType<{className: string}>
    title: string,
    description: string
    image: StaticImageData
}   

const FeaturedIndustriesCard = ({icon:Icon,title, description,image}:FeaturedIndustriesCardProps)=>{
    return(
        
            <Card className="relative border-t-4 border-t-mainColor overflow-hidden group">
                <CardHeader className="p-0">
                    <Image
                    src={image}
                    alt="professional-service"
                    width={400}
                    height={200}
                    className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105 "
                    />
              </CardHeader>
                 <p className="text-center font-semibold text-lg  my-3 font-semibold">{title}</p>

                <div className="absolute bottom-0 p-2 px-4 left-0 w-full h-[90%] bg-white group-hover:shadow-2xl
                    translate-y-full transition-transform duration-300 group-hover:translate-y-[10%]">
                    <div className="flex flex-col items-center  h-full space-y-2">
                        <div className="rounded-full bg-orange-100 p-3 transition-all duration-300 ">
                            <Icon className="h-6 w-6 text-mainColor"/>
                        </div>

                        <h3 className="text-base font-semibold text-[#1E1147] transition-all duration-300 ">
                            {title}
                        </h3>

                        <p className="text-xs text-center text-gray-600 transition-all duration-300">
                            {description}
                        </p>

                        <Link href="#" className="w-full">
                            <Button className="w-full text-xs p-0" variant="outline"> Explore Jobs <ArrowRight className=" h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </Card>
   
     
    )
}

export default FeaturedIndustriesCard;