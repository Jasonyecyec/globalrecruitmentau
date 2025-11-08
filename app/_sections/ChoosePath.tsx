import { Button } from "@/components/ui/button";
import {
	ArrowRight,
	Briefcase,
	CheckCircle2,
	Globe,
	TrendingUp,
	Users,
	Zap,
} from "lucide-react";
import Link from "next/link";

const journeys = [
	{
		type: "For Jobseekers",
		icon: Users,
		description: "Explore global opportunities and advance your career",
		cta: "Find Jobs",
		link: "/signup/candidate",
		steps: [
			{
				number: 1,
				title: "Browse",
				description: "Search thousands of global opportunities",
			},
			{
				number: 2,
				title: "Apply",
				description: "Submit applications with one click",
			},
			{
				number: 3,
				title: "Connect",
				description: "Network with international employers",
			},
		],
		benefits: [
			"Access to 50,000+ job listings",
			"Visa sponsorship opportunities",
			"Career resources & insights",
		],
		color: "from-orange-500 to-mainColor/70",
		buttonColor: "bg-orange-600 hover:bg-orange-700",
	},
	{
		type: "For Employers",
		icon: Briefcase,
		description: "Build your global team with top talent from worldwide",
		cta: "Hire Talent",
		link: "/signup/employer",
		steps: [
			{
				number: 1,
				title: "Post",
				description: "Create and publish job postings globally",
			},
			{
				number: 2,
				title: "Screen",
				description: "Filter candidates using AI-powered tools",
			},
			{
				number: 3,
				title: "Hire",
				description: "Complete hiring with our platform",
			},
		],
		benefits: [
			"Reach 100,000+ qualified candidates",
			"Advanced filtering & analytics",
			"24/7 hiring support",
		],
		color: "from-secondaryColor to-indigo-500",
		buttonColor: "bg-secondaryColor hover:bg-secondaryColor/70",
	},
];

export default function ChoosePath() {
	return (
		<section className="w-full py-20 px-4 bg-gradient-to-b from-background via-white to-background">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
						Choose Your Path
					</h2>
					<p className="text-lg text-foreground/70 max-w-2xl mx-auto">
						Whether you're seeking your next opportunity or building your team,
						we've got you covered with tailored solutions designed for global
						success
					</p>
				</div>

				{/* Journey Cards Grid - Enhanced Layout */}
				<div className="grid md:grid-cols-2 gap-8 mb-20">
					{journeys.map((journey, idx) => {
						const Icon = journey.icon;
						return (
							<div
								key={idx}
								className="rounded-2xl border-2 border-border overflow-hidden hover:border-primary/50 transition-all group hover:shadow-xl duration-300"
							>
								{/* Header with gradient */}
								<div
									className={`bg-gradient-to-r ${journey.color} p-8 text-white relative overflow-hidden`}
								>
									<div className="absolute inset-0 opacity-10 bg-pattern"></div>
									<div className="relative z-10">
										<div className="flex items-center gap-4 mb-4">
											<div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
												<Icon className="w-8 h-8" />
											</div>
											<div>
												<h3 className="text-2xl font-bold">{journey.type}</h3>
											</div>
										</div>
										<p className="text-lg opacity-95 font-medium">
											{journey.description}
										</p>
									</div>
								</div>

								{/* Steps */}
								<div className="p-8 bg-white space-y-8">
									{/* How it works section */}
									<div>
										<h4 className="text-sm font-bold text-foreground/60 uppercase tracking-wider mb-6 flex items-center gap-2">
											<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
											How it works
										</h4>
										<div className="space-y-5">
											{journey.steps.map((step, i) => (
												<div
													key={i}
													className="flex gap-4 items-start group/step"
												>
													<div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondaryColor to-accent flex items-center justify-center text-white font-bold text-lg flex-shrink-0 group-hover/step:scale-110 transition-transform shadow-md">
														{step.number}
													</div>
													<div className="pt-1">
														<h5 className="font-semibold text-foreground text-lg">
															{step.title}
														</h5>
														<p className="text-sm text-foreground/70 mt-1">
															{step.description}
														</p>
													</div>
												</div>
											))}
										</div>
									</div>

									{/* Benefits */}
									<div className="pt-6 border-t-2 border-border/50">
										<h4 className="text-sm font-bold text-foreground/60 uppercase tracking-wider mb-5 flex items-center gap-2">
											<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
											Key benefits
										</h4>
										<ul className="space-y-3">
											{journey.benefits.map((benefit, i) => (
												<li
													key={i}
													className="flex gap-3 items-center text-sm text-foreground/85"
												>
													<CheckCircle2 className="w-5 h-5 text-mainColor flex-shrink-0" />
													<span className="font-medium">{benefit}</span>
												</li>
											))}
										</ul>
									</div>

									{/* CTA Button */}
									<Link href={journey.link} className="w-full block pt-4">
										<Button
											className={`w-full text-white font-semibold py-6 text-lg group/btn flex items-center justify-center gap-2 ${journey.buttonColor}`}
										>
											{journey.cta}
											<ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
										</Button>
									</Link>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
