import React from "react";
import HowItWorkCard  from "@/app/_components/HowItWorkCard";

type Step = {
    number: string,
    title: string,
    description: string
}

type HowItWorkList = {
    steps: Step[],
    employerSteps: Step[],
}

type HowItWorkProps = {
    howItWorklist : HowItWorkList
}

const HowItWork = ({howItWorklist}: HowItWorkProps) => {
    return(
        <section className="py-16 bg-[#f9fafb]" id="how-it-work">
            <div className="mx-auto max-w-6xl px-4">
                <h2 className="mb-10 text-center font-bold text-3xl">How It Works</h2>

                <div className="grid gap-10 md:grid-cols-2">
                    <div>
                        <h3 className="mb-6 text-2xl font-semibold text-gray-700">For Job Seekers</h3>

                        <ul className="space-y-6">
                            {howItWorklist?.steps?.map((step, index)=>(
                                <HowItWorkCard key={index} number={step.number} title={step.title} description={step.description}/>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-5 text-2xl font-semibold text-gray-700">For Employers</h3>

                        <ul className="space-y-6">
                             {howItWorklist?.employerSteps?.map((step, index)=>(
                                <HowItWorkCard key={index} number={step.number} title={step.title} description={step.description}/>
                             ))}   
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default HowItWork;