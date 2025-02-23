
'use client'
import React from "react";
import {ArrowUpRight, Users, Code, Building, User } from "lucide-react"
import CountUp from 'react-countup';
import { useInView } from "react-intersection-observer";
  

type StatsCounterProps = {  
    label: string,
    value: number
    icon: React.ComponentType<{className: string}>
}   

const StatsCounter = ({label,value, icon:Icon}:StatsCounterProps) =>{
    const {ref, inView, entry} = useInView({
        threshold: 0.5,
        triggerOnce: true
    })
    return (
    <div className="flex flex-col items-center justify-center text-center space-y-3" ref={ref}>
            <div className="text-4xl font-bold text-black text-secondaryColors flex items-start justify-center space-x-2">
                <div className="text-primary p-2 bg-primary/10 rounded-full text-primaryColor "><Icon className="text-gray-600 h-8 w-8"/> </div>

                <div className=""> 
                    {inView ? (
                          <CountUp start={0} end={value} delay={0}>
                          {({ countUpRef }) => (
                              <div>
                                <span ref={countUpRef} />{label != 'Client Satisfaction %'? '+':'%'}

                              </div>
                          )}
                      </CountUp>
                    ) : (<span> 0</span>) }
                </div>
            </div>

            <div className="text-sm text-gray-600 ">{label}</div>
    </div>
    )
}


const StatsMetrics = () =>{
    return(
        <section id="stats-metrics" className="py-16 px-20 bg-[#f9fafb]">
            <div className="container mx-auto max-w-6xl px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Our Global Impact</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                   <StatsCounter label="Successful Placements" value={100000} icon={ArrowUpRight} />
                   <StatsCounter label="Partner Companies" value={10000}icon={Users} />
                   <StatsCounter label="Client Satisfaction %" value={98} icon={Code}/>
                   <StatsCounter label="Years of Excellence" value={20}  icon={Building}/>
                </div>
            </div>
        </section>
    )

}

export default StatsMetrics