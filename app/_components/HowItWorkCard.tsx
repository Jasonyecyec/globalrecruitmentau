import React from "react";

type HowItWorkCardProps = {
    number: string,
    title: string,
    description: string
}

const HowItWorkCard = ({number,title,description}:HowItWorkCardProps) => {
    return(
        <div className="flex gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                {number}
            </div>

            <div>
                <h4 className="font-semibold text-base">{title}</h4>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>
    )
}

export default HowItWorkCard; 