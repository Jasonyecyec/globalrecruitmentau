import React from "react";
import { ArrowUpRight, Users, Code, Building, User } from "lucide-react"

type StatsCounterProps = {  
    label: string,
    value: string
    icon: React.ReactNode
}   


const StatsCounter = ({label,value,icon}:StatsCounterProps) =>{
    return (
    <div className="flex flex-col items-center justify-center text-center space-y-3">
            <div className="text-4xl font-bold text-black text-secondaryColors flex items-start justify-center space-x-2">
                <div className="text-primary p-2 bg-primary/10 rounded-full text-primaryColor ">{icon}</div>

                <div className=""> 
                        <span>{value}  </span>
                </div>
            </div>

            <div className="text-sm text-gray-600 ">{label}</div>

    </div>
    )
}
const StatsMetrics = () =>{
    return(
        <section id="stats-metrics" className="py-16 px-20 bg-[#f9fafb]">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Our Global Impact</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                   <StatsCounter label="Placements Made" value="100,000+" icon={<ArrowUpRight className="text-gray-600 h-8 w-8 text-sm"/>} />
                   <StatsCounter label="Partner Companies" value="10,000" icon={<Users className="text-gray-600 h-8 w-8"/>} />
                   <StatsCounter label="Client Satisfaction %" value="98%" icon={<Code className="text-gray-600  h-8 w-8"/>}/>
                   <StatsCounter label="Years of Excellence" value="20"  icon={<Building className="text-gray-600  h-8 w-8 "/>}/>
                </div>
            </div>
        </section>
    )

}

export default StatsMetrics