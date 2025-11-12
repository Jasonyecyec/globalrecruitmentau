export default function QuickContact() {
	return (
		<section className="w-full py-16 px-4 bg-gradient-to-r from-mainColor100/10 via-accent/10 to-secondaryColor100/10 border-y border-border/50">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-secondaryColor100 mb-2">
						Get in Touch Directly
					</h2>
					<p className="text-foreground/70">Reach out to our team anytime</p>
				</div>

				<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					{/* Email Card */}
					<div className="bg-white rounded-xl border border-border p-8 hover:shadow-lg hover:border-mainColor100 transition-all group">
						<div className="flex items-center gap-4 mb-4">
							<div className="w-12 h-12 rounded-lg bg-mainColor100/10 flex items-center justify-center group-hover:bg-mainColor100/20 transition">
								<svg
									className="w-6 h-6 text-mainColor100"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
							</div>
							<div>
								<p className="text-sm text-foreground/60 font-medium">Email</p>
								<a
									href="mailto:admin@recruitmentglobal.com"
									className="text-lg font-semibold text-foreground hover:text-primary transition"
								>
									admin@recruitmentglobal.com
								</a>
							</div>
						</div>
						<p className="text-sm text-foreground/70 ml-16">
							Send us an email and we'll respond within 24 hours
						</p>
					</div>

					{/* Phone Card */}
					<div className="bg-white rounded-xl border border-border p-8 hover:shadow-lg hover:border-secondaryColor100 transition-all group">
						<div className="flex items-center gap-4 mb-4">
							<div className="w-12 h-12 rounded-lg bg-secondaryColor100/10 flex items-center justify-center group-hover:bg-secondaryColor100/20 transition">
								<svg
									className="w-6 h-6 text-secondaryColor100"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
									/>
								</svg>
							</div>
							<div>
								<p className="text-sm text-foreground/60 font-medium">Phone</p>
								<a
									href="tel:+61415902882"
									className="text-lg font-semibold text-foreground hover:text-primary transition"
								>
									+61 415 902 882
								</a>
							</div>
						</div>
						<p className="text-sm text-foreground/70 ml-16">
							Call us Monday-Friday, 9AM-6PM AEST
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
