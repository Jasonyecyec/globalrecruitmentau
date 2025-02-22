import React from "react";
import JobCategoryCard from "@/app/_components/JobCategoryCard";

type JobCategoriesItems = {
    icon: React.ComponentType<{className: string}>
    title: string,
    jobs: string
}

type JobCategoriesProps = {
    jobCategories: JobCategoriesItems[]
}

const JobCategories = ({jobCategories}:JobCategoriesProps) =>{
    return (
        <section id="job-categories" className="py-16">
            <div className="mx-auto max-w-6xl px-4"> 
                <h2 className="mb-10 text-center text-3xl font-bold">Featured Job Categories</h2>

                <div className="overflow-x-auto pb-4">
                    <div className="flex space-x-8" style={{ minWidth: "max-content" }}>
                        {jobCategories.map((category, index)=>(
                            <JobCategoryCard key={index} {...category} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}


export default JobCategories;