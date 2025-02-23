import React from "react";
import {Card} from '@/components/ui/card';

type JobCategoryCardProps = {
    icon: React.ComponentType<{className: string}>
    title: string,
    jobs: string
}

const JobCategoryCard = ({title,jobs,icon:Icon}:JobCategoryCardProps) =>{
    return (
        <Card role="listitem" className="flex flex-col items-center justify-center p-2 w-32 hover:bg-gray-100 hover:cursor-pointer duration-300 group">
            <p><Icon className="text-black"/> </p>
            <p className="text-center text-sm font-semibold mt-2 text-gray-500 group-hover:text-secondaryColor duration-300">{title}</p>
            <p className="text-center text-xs text-gray-500"><span className="">{jobs}</span> Jobs</p>
        </Card>
    )
}

export default JobCategoryCard;