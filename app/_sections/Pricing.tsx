"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const plans = [
	{
		name: "Basic",
		price: "$99",
		period: "/month",
		description: "Perfect for small recruiting teams",
		features: [
			"Up to 5 active job postings",
			"30-day posting duration",
			"Email support",
			"Basic candidate search",
		],
		cta: "Get Started",
	},
	{
		name: "Professional",
		price: "$399",
		period: "/month",
		description: "Ideal for growing companies",
		features: [
			"Up to 25 active job postings",
			"90-day posting duration",
			"Priority email & phone support",
			"Advanced candidate filtering",
			"Custom hiring page",
		],
		cta: "Get Started",
		highlighted: true,
	},
	{
		name: "Enterprise",
		price: "Custom",
		period: "pricing",
		description: "For large-scale recruiting",
		features: [
			"Unlimited job postings",
			"Custom duration options",
			"24/7 dedicated support",
			"API access",
			"Custom integrations",
		],
		cta: "Contact Sales",
	},
];

const addOns = [
	{ name: "Resume Database Access", price: "$49/month" },
	{ name: "Featured Listing Boost", price: "$29/listing" },
];

export default function Pricing() {
	const [selectedAddOns, setSelectedAddOns] = useState<Record<string, boolean>>(
		{},
	);

	const toggleAddOn = (planIndex: number, addonIndex: number) => {
		const key = `${planIndex}-${addonIndex}`;
		setSelectedAddOns((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	};

	return (
		<section className="w-full py-20 px-4 bg-gradient-to-b from-white to-background">
			<div className="max-w-7xl mx-auto">
				{/* Pricing Hero */}
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-secondaryColor100 mb-4">
						Flexible Plans for Global Hiring
					</h2>
					<p className="text-lg text-foreground/70 max-w-2xl mx-auto">
						Choose the perfect plan for your recruiting needs. Upgrade,
						downgrade, or cancel anytime.
					</p>
				</div>

				{/* Pricing Cards Grid */}
				<div className="grid md:grid-cols-3 gap-8 mb-16">
					{plans.map((plan, index) => (
						<div
							key={index}
							className={`rounded-lg border-2 p-8 transition-all ${
								plan.highlighted
									? "border-mainColor bg-white shadow-xl scale-105"
									: "border-border bg-[#f8f8f8] hover:border-mainColor100/50"
							}`}
						>
							{plan.highlighted && (
								<div className="mb-4 inline-block px-3 py-1 bg-mainColor100/10 text-mainColor100 rounded-full text-sm font-semibold">
									Recommended
								</div>
							)}
							<h3 className="text-2xl font-bold text-secondaryColor100 mb-2">
								{plan.name}
							</h3>
							<p className="text-foreground/60 mb-6">{plan.description}</p>

							{/* Pricing */}
							<div className="mb-6">
								<div className="flex items-baseline gap-1">
									<span className="text-4xl font-bold text-mainColor100">
										{plan.price}
									</span>
									<span className="text-foreground/60 text-sm">
										{plan.period}
									</span>
								</div>
							</div>

							{/* Features */}
							<ul className="space-y-3 mb-8">
								{plan.features.map((feature, i) => (
									<li key={i} className="flex gap-3 items-start">
										<div className="w-5 h-5 rounded-full bg-mainColor100/20 flex items-center justify-center flex-shrink-0 mt-0.5">
											<svg
												className="w-3 h-3 text-mainColor100"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd"
												/>
											</svg>
										</div>
										<span className="text-foreground/80">{feature}</span>
									</li>
								))}
							</ul>

							{/* CTA Button */}
							<Button
								className={`w-full mb-6 py-2 ${
									plan.highlighted
										? "bg-mainColor100 hover:bg-mainColor100/90 text-white"
										: "bg-secondaryColor100 hover:bg-secondaryColor100/90 text-white"
								}`}
							>
								{plan.cta}
							</Button>

							{/* Add-ons for this plan */}
							<div className="border-t border-border pt-6">
								<p className="text-sm font-semibold text-foreground mb-3">
									Optional Add-ons:
								</p>
								{addOns.map((addon, i) => (
									<label
										key={i}
										className="flex items-center gap-3 mb-3 cursor-pointer hover:bg-foreground/5 p-2 rounded transition"
									>
										<input
											type="checkbox"
											checked={selectedAddOns[`${index}-${i}`] || false}
											onChange={() => toggleAddOn(index, i)}
											className="w-4 h-4 rounded border-foreground/20 accent-mainColor100"
										/>
										<div className="flex-1">
											<span className="text-sm text-foreground">
												{addon.name}
											</span>
										</div>
										<span className="text-sm font-semibold text-mainColor100">
											{addon.price}
										</span>
									</label>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
