import React from "react";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="bg-[#1e1147] px-4 py-12 text-white">
			<div className="mx-auto max-w-6xl">
				<div className="grid gap-8 md:grid-cols-4">
					<div>
						<h4 className="font-bold mb-4">Global Recruitment</h4>
						<p className="text-white/70">
							Your trusted partner in connecting talent with opportunity
							worldwide.
						</p>
					</div>
					<div>
						<h3 className="mb-4 font-semibold">For Global Employers</h3>
						<ul className="space-y-2">
							<li>
								<Link href="#" className="text-gray-300 hover:text-white">
									Post International Jobs
								</Link>
							</li>
							<li>
								<Link href="#" className="text-gray-300 hover:text-white">
									Global Hiring Solutions
								</Link>
							</li>
							<li>
								<Link href="#" className="text-gray-300 hover:text-white">
									Worldwide Recruitment Resources
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="mb-4 font-semibold">About RPG</h3>
						<ul className="space-y-2">
							<li>
								<Link href="#" className="text-gray-300 hover:text-white">
									Our Global Presence
								</Link>
							</li>
							<li>
								<Link href="#" className="text-gray-300 hover:text-white">
									International Partnerships
								</Link>
							</li>
							<li>
								<Link href="#" className="text-gray-300 hover:text-white">
									Global Privacy Policy
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="mb-4 font-semibold">Connect Globally</h3>
						<ul className="space-y-2">
							<li className="pt-4 text-gray-300">
								<p className="">Email: admin@recruitmentglobal.com</p>
								<p className="">Phone: +61 415 902 882</p>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="mt-12 pt-8 border-t  border-white/10  text-center text-sm text-gray-300">
				<p>© 2025 Global Recruitment. Connecting talent worldwide. </p>
			</div>
		</footer>
	);
};

export default Footer;
