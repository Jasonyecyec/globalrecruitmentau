import Footer from "@/app/_sections/Footer";
import Header from "@/app/_components/Header";
import Hero from "@/app/_sections/Hero";
import AboutUs from "@/app/_sections/AboutUs";
import StatsMetrics from "@/app/_sections/StatsMetrics";
import FindJobs from "@/app/_sections/FindJobs";
import FeaturedIndustries from "@/app/_sections/FeaturedIndustries";
import HowItWork from "@/app/_sections/HowItWork";
import GlobalSuccessStories from "@/app/_sections/GlobalSuccessStories";
import ReadyToGlobal from "@/app/_sections/ReadyToGlobal";
import FAQ from "@/app/_sections/FAQ";
import ChoosePath from "@/app/_sections/ChoosePath";
import Pricing from "@/app/_sections/Pricing";
import {
	findJobList,
	featuredIndustriesList,
	howItWorksList,
	testimonialList,
	faqList,
} from "@/app/_constants/homeConstants";
import ExploreMore from "@/app/_sections/ExploreMore";
import QuickContact from "@/app/_sections/QuickContact";

export default function Home() {
	return (
		<div>
			<Header />

			<Hero />

			<AboutUs />

			<StatsMetrics />

			{/* <JobCategories jobCategories={jobCategoriesList} /> */}
			<ChoosePath />

			<FindJobs />

			<FeaturedIndustries featuredIndustries={featuredIndustriesList} />

			<HowItWork howItWorklist={howItWorksList} />

			<GlobalSuccessStories globalSuccessStoriesList={testimonialList} />

			<ReadyToGlobal />

			<Pricing />

			<FAQ faqList={faqList} />

			{/* <Contact /> */}

			<ExploreMore />

			<QuickContact />

			<Footer />
		</div>
	);
}
