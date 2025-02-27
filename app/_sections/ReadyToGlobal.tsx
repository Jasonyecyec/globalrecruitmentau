import React from "react";
import { Button } from "@/components/ui/button";

const ReadyToGlobal = ()=>{
    return(
        <section className="bg-gradient-to-r from-[#1E1147] to-orange-500 py-16 text-white" id="ready-to-global">
            <div className="mx-auto max-w-6xl px-4 text-center">
                <h2 className="mb-6 text-3xl font-bold">Ready To Go Global?</h2>
                <p className="mb-8 text-xl"> Whether you're looking for your dream job worldwide or searching for top international talent, we're here to
                help.</p>
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <Button className="bg-white text-secondaryColor hover:bg-gray-100">Find Global Jobs</Button>
                    <Button variant="outline" className="border-white text-secondaryColor hover:bg-gray-100 hover:text-[#1E1147]">
                    Hire Global Talent
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default ReadyToGlobal