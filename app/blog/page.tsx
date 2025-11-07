"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/app/_sections/Footer";
import Header from "@/app/_components/Header";

const blogPosts = [
	{
		id: 1,
		title: "The Future of Remote Work in Global Recruitment",
		excerpt:
			"Discover how remote work is reshaping the recruitment landscape and what it means for global hiring strategies.",
		category: "Hiring Trends",
		author: "Sarah Johnson",
		date: "Nov 3, 2025",
		image: "/img/remote-work-office.jpg",
	},
	{
		id: 2,
		title: "Career Growth Strategies for International Professionals",
		excerpt:
			"Learn how to develop your career while working across multiple countries and time zones.",
		category: "Career Growth",
		author: "Michael Chen",
		date: "Oct 28, 2025",
		image: "/img/professional-development.jpg",
	},
	{
		id: 3,
		title: "Top Skills Employers Are Looking for in 2025",
		excerpt:
			"Explore the most in-demand skills and how to develop them to stay competitive in the global job market.",
		category: "Hiring Trends",
		author: "Emma Roberts",
		date: "Oct 22, 2025",
		image: "/img/skills-development.jpg",
	},
	{
		id: 4,
		title: "Working Abroad: A Complete Guide to Getting Started",
		excerpt:
			"Your comprehensive guide to relocating for work, visa processes, and adapting to new professional environments.",
		category: "Work Abroad",
		author: "David Martinez",
		date: "Oct 15, 2025",
		image: "/img/international-work.jpg",
	},
	{
		id: 5,
		title: "Inside Global Recruitment: Our Company Culture",
		excerpt:
			"Get an inside look at how Global Recruitment operates and what makes our team special.",
		category: "Company Insights",
		author: "Lisa Zhang",
		date: "Oct 8, 2025",
		image: "/img/company-culture.jpg",
	},
	{
		id: 6,
		title: "Navigating Salary Negotiations Across Different Markets",
		excerpt:
			"Master the art of salary negotiation with insights specific to different global markets.",
		category: "Career Growth",
		author: "James Wilson",
		date: "Sep 30, 2025",
		image: "/img/negotiation-skills.jpg",
	},
];

const categories = [
	"All",
	"Career Growth",
	"Hiring Trends",
	"Work Abroad",
	"Company Insights",
];

export default function BlogPage() {
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [showMore, setShowMore] = useState(false);

	const filteredPosts =
		selectedCategory === "All"
			? blogPosts
			: blogPosts.filter((post) => post.category === selectedCategory);

	const displayedPosts = showMore ? filteredPosts : filteredPosts.slice(0, 6);

	return (
		<div className="min-h-screen bg-background">
			<Header />

			{/* Hero Section */}
			<section className="relative h-96 bg-gradient-to-r from-[#6366f1]/90 to-[#ff6b35]/80 overflow-hidden">
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{
						backgroundImage: "url('/img/global-team-success-celebration.jpg')",
						opacity: 0.3,
						backgroundSize: "cover",
					}}
				/>
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
					<h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-balance">
						Global Recruitment Insights
					</h1>
					<p className="text-xl text-white/90 max-w-2xl text-balance">
						Expert advice, hiring trends, and global career tips to help you
						succeed in your professional journey.
					</p>
				</div>
			</section>

			{/* Category Filters */}
			<section className="bg-white border-b border-border sticky top-16 z-40">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex flex-wrap gap-3">
						{categories.map((category) => (
							<button
								type="button"
								key={category}
								onClick={() => {
									setSelectedCategory(category);
									setShowMore(false);
								}}
								className={`px-6 py-2 rounded-full font-medium transition ${
									selectedCategory === category
										? "bg-[#ff6b35] text-white shadow-md"
										: "bg-gray-100 text-[#6366f1] hover:bg-gray-200"
								}`}
							>
								{category}
							</button>
						))}
					</div>
				</div>
			</section>

			{/* Blog Grid */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{displayedPosts.map((post) => (
						<Card
							key={post.id}
							className="overflow-hidden hover:shadow-lg transition"
						>
							<div className="h-48 relative overflow-hidden bg-gray-200">
								<Image
									fill={true}
									src={post.image || "/placeholder.svg"}
									alt={post.title}
									className="w-full relative h-full object-cover hover:scale-105 transition"
								/>
							</div>
							<CardContent className="p-6">
								<div className="mb-3">
									<span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
										{post.category}
									</span>
								</div>
								<h3 className="text-xl font-bold text-[#6366f1] mb-3 line-clamp-2">
									{post.title}
								</h3>
								<p className="text-foreground/70 mb-4 line-clamp-2">
									{post.excerpt}
								</p>
								<div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-4">
									<div className="flex items-center gap-2">
										<User className="w-4 h-4" />
										<span>{post.author}</span>
									</div>
									<div className="flex items-center gap-2">
										<Calendar className="w-4 h-4" />
										<span>{post.date}</span>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Load More Button */}
				{filteredPosts.length > 6 && (
					<div className="flex justify-center mt-12">
						<Button
							onClick={() => setShowMore(!showMore)}
							className="bg-primary hover:bg-primary/90 text-white px-8 py-2"
						>
							{showMore ? "Show Less" : "Load More"}
						</Button>
					</div>
				)}
			</section>

			{/* Newsletter Signup */}
			<section className="bg-gradient-to-r from-[#1E1147] to-orange-500/80 text-white py-16">
				<div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-4xl font-bold mb-4 text-balance">
						Stay Updated on Global Hiring Trends
					</h2>
					<p className="text-white/90 mb-8 text-lg">
						Subscribe to our newsletter for expert insights, industry trends,
						and career opportunities delivered weekly.
					</p>
					<form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
						<input
							type="email"
							placeholder="Enter your email"
							className="flex-1 px-4  rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-primary"
							required
						/>
						<Button
							type="submit"
							className="bg-primary hover:bg-primary/90 text-white px-8"
						>
							Subscribe
						</Button>
					</form>
				</div>
			</section>

			<Footer />
		</div>
	);
}
