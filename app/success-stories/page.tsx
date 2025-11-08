"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "../_components/Header";
import Footer from "../_sections/Footer";

type FilterType = "all" | "jobseekers" | "employers";

const testimonials = [
	{
		id: 1,
		type: "jobseekers",
		name: "Sarah Chen",
		country: "Singapore",
		title: "Senior Product Manager at Tech Startup",
		image: "/img/avatar-sarah.jpg",
		quote:
			"Global Recruitment helped me land my dream role in Singapore. The platform made it seamless to connect with international employers.",
	},
	{
		id: 2,
		type: "employers",
		name: "Marcus Johnson",
		country: "Canada",
		title: "HR Director, Enterprise Solutions Inc.",
		image: "/img/avatar-marcus.jpg",
		quote:
			"We expanded our team across 5 continents using Global Recruitment. The talent pool is truly exceptional.",
	},
	{
		id: 3,
		type: "jobseekers",
		name: "Amara Okafor",
		country: "Nigeria",
		title: "Full Stack Developer at Global Tech",
		image: "/img/avatar-amara.jpg",
		quote:
			"Breaking into the international job market was challenging until I found Global Recruitment. Life-changing opportunity!",
	},
	{
		id: 4,
		type: "employers",
		name: "Elena Rodriguez",
		country: "Spain",
		title: "Founder & CEO, Creative Agency",
		image: "/img/avatar-elena.jpg",
		quote:
			"Hiring globally was never this easy. We found incredible designers and developers from around the world.",
	},
	{
		id: 5,
		type: "jobseekers",
		name: "Rahul Patel",
		country: "India",
		title: "Data Science Lead at AI Company",
		image: "/img/avatar-rahul.jpg",
		quote:
			"Got my visa sponsorship and relocated to Australia. Global Recruitment opened doors I never thought possible.",
	},
	{
		id: 6,
		type: "employers",
		name: "Sophie Müller",
		country: "Germany",
		title: "VP of Operations, Manufacturing",
		image: "/img/avatar-sophie.jpg",
		quote:
			"The quality of candidates is outstanding. We've built a truly multicultural team that drives innovation.",
	},
];

export default function SuccessStoriesPage() {
	const [activeFilter, setActiveFilter] = useState<FilterType>("all");

	const filteredTestimonials =
		activeFilter === "all"
			? testimonials
			: testimonials.filter((t) => t.type === activeFilter);

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main>
				{/* Hero Section */}
				<section className="relative h-[400px] flex items-center justify-center overflow-hidden">
					{/* Background Image with Overlay */}
					<div
						className="absolute inset-0 bg-cover bg-center"
						style={{
							backgroundImage:
								'url("/img/global-team-success-celebration.jpg")',
						}}
					>
						<div className="absolute inset-0 bg-gradient-to-r from-secondaryColor/90 to-secondaryColor100/40"></div>
					</div>

					{/* Content */}
					<div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
						<h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
							Global Success Stories
						</h1>
						<p className="text-xl md:text-2xl text-white/90">
							How we've helped jobseekers and employers connect worldwide
						</p>
					</div>
				</section>

				{/* Filter Tabs */}
				<section className="py-12 bg-background border-b border-border">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
							<button
								type="button"
								onClick={() => setActiveFilter("all")}
								className={`px-8 py-3 rounded-lg font-semibold transition-all ${
									activeFilter === "all"
										? "bg-mainColor text-white shadow-lg"
										: "bg-muted text-foreground hover:bg-muted/80"
								}`}
							>
								All Stories
							</button>
							<button
								type="button"
								onClick={() => setActiveFilter("jobseekers")}
								className={`px-8 py-3 rounded-lg font-semibold transition-all ${
									activeFilter === "jobseekers"
										? "bg-mainColor text-white shadow-lg"
										: "bg-muted text-foreground hover:bg-muted/80"
								}`}
							>
								For Jobseekers
							</button>
							<button
								type="button"
								onClick={() => setActiveFilter("employers")}
								className={`px-8 py-3 rounded-lg font-semibold transition-all ${
									activeFilter === "employers"
										? "bg-mainColor text-white shadow-lg"
										: "bg-muted text-foreground hover:bg-muted/80"
								}`}
							>
								For Employers
							</button>
						</div>
					</div>
				</section>

				{/* Testimonials Grid */}
				<section className="py-16 bg-background">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{filteredTestimonials.map((testimonial) => (
								<Card
									key={testimonial.id}
									className="flex flex-col p-6 hover:shadow-lg transition-shadow bg-white border border-border"
								>
									{/* Quote */}
									<p className="text-foreground text-lg leading-relaxed mb-6 flex-grow">
										"{testimonial.quote}"
									</p>

									{/* Divider */}
									<div className="h-px bg-border mb-6"></div>

									{/* Profile Section */}
									<div className="flex items-center gap-4">
										<div className="relative w-14 h-14 rounded-full overflow-hidden bg-muted flex-shrink-0">
											<Image
												src={testimonial.image || "/placeholder.svg"}
												alt={testimonial.name}
												fill
												className="object-cover"
											/>
										</div>
										<div className="flex-grow min-w-0">
											<h3 className="font-bold text-secondaryColor100 text-sm md:text-base truncate">
												{testimonial.name}
											</h3>
											<p className="text-xs md:text-sm text-muted-foreground truncate">
												{testimonial.country}
											</p>
											<p className="text-xs text-mainColor100 font-semibold truncate">
												{testimonial.title}
											</p>
										</div>
									</div>
								</Card>
							))}
						</div>
					</div>
				</section>

				{/* Video Testimonial Section */}
				<section className="py-16 bg-muted">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-4xl font-bold text-secondaryColor100 text-center mb-12 text-balance">
							Video Testimonials
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div className="bg-white rounded-lg overflow-hidden shadow-lg">
								<div
									className="relative w-full h-64 bg-cover bg-center flex items-center justify-center"
									style={{
										backgroundImage:
											'url("/img/professional-woman-testimonial.jpg")',
									}}
								>
									<button
										type="button"
										className="bg-primary text-white rounded-full p-4 hover:bg-primary/90 transition"
									>
										<svg
											className="w-8 h-8"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
										</svg>
									</button>
								</div>
								<div className="p-6">
									<h3 className="font-bold text-secondary mb-2">
										How I Changed My Career Globally
									</h3>
									<p className="text-sm text-muted-foreground">
										Watch how Sarah's life transformed with Global Recruitment
									</p>
								</div>
							</div>

							<div className="bg-white rounded-lg overflow-hidden shadow-lg">
								<div
									className="relative w-full h-64 bg-cover bg-center flex items-center justify-center"
									style={{
										backgroundImage:
											'url("/img/professional-man-testimonial.jpg")',
									}}
								>
									<button className="bg-primary text-white rounded-full p-4 hover:bg-primary/90 transition">
										<svg
											className="w-8 h-8"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
										</svg>
									</button>
								</div>
								<div className="p-6">
									<h3 className="font-bold text-secondary mb-2">
										Building a Global Team
									</h3>
									<p className="text-sm text-muted-foreground">
										Learn how Marcus scaled his company with international
										talent
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* CTA Banner */}
				<section className="py-16 bg-gradient-to-r from-mainColor100 to-secondaryColor/90">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
							Start Your Global Journey Today
						</h2>
						<p className="text-lg text-white/90 mb-8 text-balance">
							Join thousands of professionals and companies connecting worldwide
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3 text-lg">
								Find Jobs
							</Button>
							<Button
								variant="outline"
								className="border-white text-white hover:bg-white/10 font-semibold px-8 py-3 text-lg bg-transparent"
							>
								Hire Talent
							</Button>
						</div>
					</div>
				</section>

				<Footer />
			</main>
		</div>
	);
}
