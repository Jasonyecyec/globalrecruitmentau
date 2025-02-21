import React from "react";
import Image from "next/image";
import {CheckCircle} from 'lucide-react';
import AboutImg from '@/public/img/about_img.webp'


const FeatureHighlight = ({ title, description }: { title: string; description: string }) => {
    return (
      <div className="flex items-start space-x-3">
        <CheckCircle className="h-6 w-6 flex-shrink-0 text-orange-500" />
        <div>
          <h3 className="font-semibold text-[#1E1147]">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    )
  }

const AboutUs = () => {
    return (
        <section className="py-20 px-20 bg-white" id="about-us">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2  flex justify-center">
                        <Image
                            src={AboutImg}
                            alt="Why Choose Us"
                            width={550}
                            height={350}
                            className="rounded-lg shadow-xl"
                        />
                    </div>

                    <div className="md:w-1/2">
                    <h2 className="text-3xl font-bold text-[#1E1147] mb-6">Why Choose Recruitment Placement Global</h2>
                    <p className="text-lg text-gray-600 mb-6">
                        With over two decades of experience, we've revolutionized the way companies and talent connect across
                        the globe. Our commitment to excellence and innovation sets us apart in the recruitment industry.
                    </p>

                    <ul className="gap-2 grid grid-rows-3 grid-cols-2 text-sm">
                        <FeatureHighlight
                        title="Expert Recruiters"
                        description="Handpicked professionals for every job sector and region."
                        />
                        <FeatureHighlight
                        title="Extensive Candidate Database"
                        description="Over 250,000 vetted candidates from around the world."
                        />
                        <FeatureHighlight
                        title="Personalized Hiring Solutions"
                        description="Tailored strategies to meet your unique global hiring needs."
                        />
                        <FeatureHighlight
                        title="Advanced AI Matching"
                        description="Cutting-edge technology to ensure the perfect fit."
                        />
                        <FeatureHighlight
                        title="Global Reach"
                        description="Connections in over 100 countries across 6 continents."
                        />
                        <FeatureHighlight
                        title="Personalized Hiring Solutions"
                        description="Tailored strategies to meet your unique global hiring needs."
                        />
                    </ul>
                    </div>
                </div>
            </div>
      </section>

    )   

}


export default AboutUs;