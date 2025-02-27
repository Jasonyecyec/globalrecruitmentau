import React from "react";
import {Card,CardHeader} from '@/components/ui/card';
import Image from "next/image";


type TestimonialCardProps = {
    id: number,
    name: string,
    position: string,
    origin: string,
    company: string,
    location: string,
    image: string, 
    quote: string
}

const TestimonialCard = ({name, position, company, location, image, quote}: TestimonialCardProps)=>{
    return(
        <Card className="p-4 hover:bg-gray-50 hover:shadow-lg w-[20rem] flex flex-col items-center justify-center transition-all duration-300">
            <p className="mb-4 italic text-gray-600">"{quote}"</p>

            <div className="flex items-center gap-4">
                <Image
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover"
                    width={40}
                    height={40}
                />
                <div>
                    <h4 className="font-semibold">{name}</h4>
                    <p className="text-sm text-gray-500">{position} at {company}</p>
                </div>
            </div>
        </Card>
    )
}

export default TestimonialCard