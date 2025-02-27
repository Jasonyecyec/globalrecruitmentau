import React from "react";
import {Card,CardHeader} from '@/components/ui/card';
import Image, { StaticImageData } from "next/image";


type TestimonialCardProps = {
    id: number,
    name: string,
    position: string,
    origin: string,
    company: string,
    location: string,
    image: StaticImageData, 
    quote: string
}

const TestimonialCard = ({name, position, company, location, image, quote}: TestimonialCardProps)=>{
    return(
        <Card className="p-4 hover:bg-gray-50 hover:shadow-lg w-[20rem] flex flex-col items-center justify-center transition-all duration-300">
            <p className="mb-4 italic text-sm text-gray-600">"{quote}"</p>

            <div className="flex items-center justify-start gap-4">
                <Image
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover shadow-md"
                    width={40}
                    height={40}
                />
                <div className="">
                    <h4 className="font-semibold text-sm">{name}</h4>
                    <p className="text-xs text-gray-500">{position} at {company}</p>
                </div>
            </div>
        </Card>
    )
}

export default TestimonialCard