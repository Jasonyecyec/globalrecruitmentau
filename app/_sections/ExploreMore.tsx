import { Briefcase, Globe, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";

export default function ExploreMore() {
	return (
		<div className="max-w-6xl mx-auto mt-20">
			<div className="bg-gradient-to-r from-mainColor/40 via-accent/40 to-secondaryColor100/40 rounded-2xl p-12 mb-20 border border-border/50">
				<h3 className="text-2xl font-bold text-secondaryColor100 mb-12 text-center">
					Explore More
				</h3>
				<div className="grid md:grid-cols-4 gap-6">
					<Link
						href="/blog"
						className="p-6 bg-white rounded-xl border border-border hover:border-mainColor hover:shadow-lg transition group/link"
					>
						<TrendingUp className="w-8 h-8 text-mainColor mx-auto mb-4 group-hover/link:scale-110 transition" />
						<h4 className="font-semibold text-foreground mb-2 text-center">
							Insights & Tips
						</h4>
						<p className="text-sm text-foreground/70 text-center">
							Read latest hiring trends and career advice
						</p>
					</Link>

					<Link
						href="/success-stories"
						className="p-6 bg-white rounded-xl border border-border hover:border-mainColor hover:shadow-lg transition group/link"
					>
						<Globe className="w-8 h-8 text-secondaryColor100 mx-auto mb-4 group-hover/link:scale-110 transition" />
						<h4 className="font-semibold text-foreground mb-2 text-center">
							Success Stories
						</h4>
						<p className="text-sm text-foreground/70 text-center">
							See how others found their dream roles
						</p>
					</Link>

					<Link
						href="/pricing"
						className="p-6 bg-white rounded-xl border border-border hover:border-mainColor hover:shadow-lg transition group/link"
					>
						<Zap className="w-8 h-8 text-mainColor mx-auto mb-4 group-hover/link:scale-110 transition" />
						<h4 className="font-semibold text-foreground mb-2 text-center">
							Pricing
						</h4>
						<p className="text-sm text-foreground/70 text-center">
							Simple, transparent plans for all needs
						</p>
					</Link>

					<Link
						href="/contact"
						className="p-6 bg-white rounded-xl border border-border hover:border-mainColor hover:shadow-lg transition group/link"
					>
						<Briefcase className="w-8 h-8 text-secondaryColor100 mx-auto mb-4 group-hover/link:scale-110 transition" />
						<h4 className="font-semibold text-foreground mb-2 text-center">
							Get in Touch
						</h4>
						<p className="text-sm text-foreground/70 text-center">
							Have questions? Our team is here to help
						</p>
					</Link>
				</div>
			</div>
		</div>
	);
}
