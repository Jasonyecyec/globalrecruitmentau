'use client'
import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "@/app/_components/TestimonialCard";
import { StaticImageData } from "next/image";

type GlobalSuccessStoriesProps = {
    globalSuccessStoriesList : {
        id: number,
        name: string,
        position: string,
        origin: string,
        company: string,
        location: string,
        image: StaticImageData, 
        quote: string
    }[],
}

const GlobalSuccessStories = ({globalSuccessStoriesList}: GlobalSuccessStoriesProps) => {

    const scrollContainerRef = useRef<HTMLDivElement|null>(null)
    const [showLeftButton, setShowLeftButton] = useState(false)
    const [showRightButton, setShowRightButton] = useState(true);
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    const scrollAmount  = 300

    const scroll = (direction: string)=>{
        const container = scrollContainerRef.current
        if(!container) return;

        const newScrollPosition = direction === 'left' ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount

        container.scrollTo({left: newScrollPosition, behavior:'smooth'})
    }

    // Monitor Scroll postition (show|hide button)
    useEffect(()=>{
        const container = scrollContainerRef.current
        if (!container) return

        const handleScroll  = () =>{
            setShowLeftButton(container.scrollLeft > 10)
            setShowRightButton(container.scrollLeft + container.clientWidth < container.scrollWidth - 10)
        }   

        container.addEventListener('scroll', handleScroll)
        handleScroll()
        return ()=> container.removeEventListener('scroll',handleScroll)
    },[])

    // Mouse drag functionality
    useEffect(()=>{
        const container = scrollContainerRef.current
        if (!container) return

        const handleMouseMove = (e:MouseEvent)=>{
            if(!isDragging) return
            const walk = (e.pageX - startX) * 2
            container.scrollLeft  = scrollLeft - walk
        }

        const handleMouseUp = (e:MouseEvent)=>{
            setIsDragging(false)
            container.style.cursor = "grab";
            container.style.removeProperty("user-select");

            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }

        if(isDragging){
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleMouseUp)
        }

        //cleanup
        return ()=>{
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleMouseUp)
        }

    },[isDragging,startX,scrollLeft])

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>)=>{
        const container = scrollContainerRef.current
        if (!container) return

        setIsDragging(true)
        setStartX(e.pageX)
        setScrollLeft(container.scrollLeft)
        container.style.cursor = 'grabbing'
        container.style.userSelect = 'none'
    }


    return(
        <section className="bg-white py-16" id="global-success-stories">
            <div className="mx-auto max-w-6xl px-4">
                <h2 className="text-center text-3xl font-bold mb-10">Global Success Stories</h2>

                <div className="relative">
                    {/* Left scroll button */}
                    {showLeftButton && (
                         <button 
                            onClick={()=>scroll('left')}
                            aria-label="scroll-left" 
                            className="absolute border left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg p-2 z-10 hover:bg-gray-100 transition-all duration-300">
                            <ChevronLeft size={24} className="text-mainColor" />
                        </button>
                    )}
                   

                    <div ref={scrollContainerRef} 
                         onMouseDown={handleMouseDown}
                         style={{scrollbarWidth:'none'}}
                         className="overflow-x-auto flex space-x-5  cursor-grab scrollbar-hide scroll-smooth">
                        <div className="flex space-x-7  py-3 px-12">
                            {globalSuccessStoriesList?.map((item,index)=>(
                                <TestimonialCard key={index} 
                                                origin={item.origin}
                                                id={item.id}
                                                name={item.name} 
                                                position={item.position} 
                                                company={item.position}
                                                image={item.image} 
                                                location={item.location} 
                                                quote={item.quote}/>
                            ))}
                        </div>
                    </div>

                     {/* Right scroll button */}
                     {showRightButton && (
                         <button 
                            onClick={()=>scroll('right')}
                            aria-label="scroll-right"
                            className="absolute border right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg p-2 z-10 hover:bg-gray-100 transition-all duration-300">
                            <ChevronRight size={24} className="text-mainColor" />
                        </button>
                     )}
                    
                </div>
            </div>
        </section>
    )
}

export default GlobalSuccessStories;