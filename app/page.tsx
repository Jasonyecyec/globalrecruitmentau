import Footer from "@/app/_sections/Footer";
import Header from "@/app/_components/Header";
import Hero from "@/app/_sections/Hero";
import AboutUs from "@/app/_sections/AboutUs";
import StatsMetrics from "@/app/_sections/StatsMetrics";
import JobCategories from "@/app/_sections/JobCategories";
import FindJobs from "@/app/_sections/FindJobs";
import FeaturedIndustries from "@/app/_sections/FeaturedIndustries";
import HowItWork from "@/app/_sections/HowItWork";
import GlobalSuccessStories from "@/app/_sections/GlobalSuccessStories";
import ReadyToGlobal from "@/app/_sections/ReadyToGlobal";
import Contact from "@/app/_sections/Contact";
import FAQ from "@/app/_sections/FAQ";
import ChoosePath from "@/app/_sections/ChoosePath";
import Pricing from "@/app/_sections/Pricing";
import {
	jobCategoriesList,
	findJobList,
	featuredIndustriesList,
	howItWorksList,
	testimonialList,
	faqList,
} from "@/app/_constants/homeConstants";
import ExploreMore from "@/app/_sections/ExploreMore";

export default function Home() {
	return (
		<div>
			<Header />

			<Hero />

			<AboutUs />

			<StatsMetrics />

			{/* <JobCategories jobCategories={jobCategoriesList} /> */}
			<ChoosePath />

			<FindJobs jobList={findJobList} />

			<FeaturedIndustries featuredIndustries={featuredIndustriesList} />

			<HowItWork howItWorklist={howItWorksList} />

			<GlobalSuccessStories globalSuccessStoriesList={testimonialList} />

			<ReadyToGlobal />

			<Pricing />

			<FAQ faqList={faqList} />

			{/* <Contact /> */}

			<ExploreMore />

			<Footer />
		</div>
	);
}
