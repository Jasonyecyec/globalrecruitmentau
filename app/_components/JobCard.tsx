import React from "react";
import {Button} from '@/components/ui/button'
import {Card} from '@/components/ui/card'
import {Building, MapPin} from 'lucide-react';

type JobCardProps = {
    title:string,
    company:string,
    location:string,
    salary:string,
    jobType:string,
}


const JobCard = ({title,company,location, salary,jobType}:JobCardProps) =>{
       return(
            <Card className="p-4 space-y-4 cursor-pointer">
                <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold">{title}</p>
                    <p className="rounded-full bg-green-100 text-green-600 px-3 py-1 text-xs">{jobType}</p>
                </div>
    
                <div className="text-sm text-gray-500 space-y-1">
                     <p className="flex items-center"><Building className="h-4"/> {company}</p>
                     <p className="flex items-center"><MapPin className="h-4"/>{location}</p>
                </div>
    
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">{salary}</p>
                    <Button variant="outline"> Apply Now</Button>
                </div>
            </Card>
        )
    }

export default JobCard