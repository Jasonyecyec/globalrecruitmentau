import React from "react";
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'

const Contact = ()=>{
    return(
        <section className="bg-gray-50 py-16" id="contact">
            <div className="mx-auto max-w-xl px-4">
                <h2 className="mb-10 text-center text-3xl font-bold">Contact Our Global Team</h2>

                <form className="space-y-6" action="">
                    <Input placeholder="Your Name" className="bg-white" />
                    <Input placeholder="Your Email" type="email" className="bg-white" />
                    <Input placeholder="Subject" className="bg-white"/>
                    <textarea className="w-full rounded-md border p-3 resize-none" rows={3} placeholder="Your Message"></textarea>
                    <Button className="w-full bg-[#1E1147] hover:bg-[#2a1a61]">Send Message</Button>
                </form>
            </div>
        </section>
    )
}

export default Contact