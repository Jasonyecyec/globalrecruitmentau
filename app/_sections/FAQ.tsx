import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

type FAQProps = {
    faqList : {
        item: number,
        question: string,
        answer: string
    } [],
}


const FAQ = ({faqList}:FAQProps)=>{
    return (
        <section className="bg-white py-16" id="faq">
            <div className="mx-auto max-w-6xl px-4">
                <h2 className="text-center text-3xl font-bold mb-10">Frequently Asked Questions</h2>

                <div className="grid md:gap-6 md:grid-cols-2">
                    <Accordion type="single" collapsible className="w-full">
                        {faqList?.map((item,index)=>(
                            item.item <= 3 && (
                            <AccordionItem value={`item-${item.item}`} key={item.item} className="hover:bg-gray-50 px-2 transition-all duration-300">
                                <AccordionTrigger className="font-semibold">{item.question}</AccordionTrigger>
                                <AccordionContent className="text-sm text-gray-500">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                            )
                        ))}
                    </Accordion>

                    <Accordion type="single" collapsible className="w-full">
                        {faqList?.map((item,index)=>(
                            item.item > 3 && (
                            <AccordionItem value={`item-${index  + 1}`} key={item.item} className="hover:bg-gray-50 px-2 transition-all duration-300">
                                <AccordionTrigger className="font-semibold">{item.question}</AccordionTrigger>
                                <AccordionContent className="text-sm text-gray-500">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                            )
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}

export default FAQ