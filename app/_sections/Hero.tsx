import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
	return (
		<section
			className="relative min-h-screen flex pt-20 justify-center bg-heroImg bg-no-repeat bg-cover text-white"
			id="hero"
			// style={{ backgroundImage: `theme('heroImg')` }}
		>
			<div className="absolute inset-0 bg-gradient-to-r from-[#1E1147]/70 to-orange-300/50"></div>

			{/* <div className="absolute inset-0 bg-black opacity-50"></div> */}
			<div className="relative mx-auto w-full lg:max-w-5xl ">
				<div className="items-center">
					<div className="pt-24 space-y-10 flex flex-col items-center justify-center text-center">
						<h1 className="mb-6  font-bold text-2xl md:text-5xl lg:text-6xl ">
							{/* Connecting Global Talent with Opportunity */}
							Global Recruitment Made Simple
						</h1>
						<p className="mb-8 text-lg md:text-xl text-shadow-xl max-w-2xl font-medium">
							{/* Your trusted partner in finding the perfect match between
              exceptional candidates and leading Australian companies. */}
							Your trusted partner for global recruitment, connecting
							exceptional talent with top employers worldwide.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 text-3xl">
							<Button
								asChild
								className="bg-orange-500 hover:bg-orange-600 text-white w-40 text-lg font-bold h-12"
							>
								<Link href="/signin">Find Jobs</Link>
							</Button>
							<Button
								variant="outline"
								className="bg-transparent text-white border-white hover:bg-white hover:text-[#1E1147] w-40 text-lg font-bold h-12"
							>
								For Employers
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent h-16"></div>
		</section>
	);
};

export default Hero;
