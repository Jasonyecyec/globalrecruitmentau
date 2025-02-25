import Image from "next/image";
import Footer from "@/app/_components/Footer";
import Navbar from "@/app/_components/Navbar";
import Header from '@/app/_components/Header';
import Hero from '@/app/_sections/Hero';
import AboutUs from "@/app/_sections/AboutUs";
import StatsMetrics from "@/app/_sections/StatsMetrics";
import JobCategories from "@/app/_sections/JobCategories";
import FindJobs from "@/app/_sections/FindJobs";
import FeaturedIndustries from "@/app/_sections/FeaturedIndustries";
import {navigationLinks, jobCategoriesList,findJobList,featuredIndustriesList } from '@/app/_constants/homeConstants'

export default function Home() {
  return (
    // <div className=" grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] ">
    <div className="">

      <Header navigation={navigationLinks} />

      <Hero />

      <AboutUs />

      <StatsMetrics />

      <JobCategories jobCategories={jobCategoriesList} />
      
      <FindJobs jobList={findJobList}/>

      <FeaturedIndustries featuredIndustries={featuredIndustriesList}/>

      <p className="mt-[40rem]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, quos maxime optio ut ipsum repudiandae doloremque ad laborum eos reprehenderit?</p>
      <Footer />
    </div>
  );
}
