import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const navigationLinks = [
	{ name: "Home", path: "/" },
	{ name: "About Us", path: "#about-us" },
	{ name: "Find Jobs", path: "#find-dream-jobs" },
	{ name: "Blogs", path: "/blog" },
	{ name: "Contact Us", path: "/contact" },
];

const Header = () => {
	return (
		<div className="sticky z-50 top-0 w-full bg-white ">
			<div className=" h-16 flex bg-transparent shadow-lg items-center justify-between px-5 sm:pl-48 sm:pr-20">
				{/* Logo */}
				<Link href="/" className=" flex items-center space-x-2">
					<div className="relative  bg-red-200">
						<Image
							src="/img/recruitmentglobal_logo.jpg"
							alt="Global Recruitment Logo"
							className="h-12 bg-red-200"
							width={80}
							height={48}
						/>
					</div>
				</Link>

				{/* Links */}
				<nav className="hidden md:flex space-x-10 text-sm font-medium text-gray-600">
					{navigationLinks.map((item, index) => (
						<Link href={item.path} key={index}>
							{item.name}
						</Link>
					))}
				</nav>

				{/* Login & Signup */}
				<div className="spacy-y-2">
					<div className="flex space-x-4">
						<Link href="/signin">
							<Button
								variant="outline"
								className="border duration-300 text-sm "
							>
								{" "}
								Log In
							</Button>
						</Link>

						<Link href="signup">
							<Button className="bg-mainColor hover:bg-orange-500 duration-300 text-sm">
								{" "}
								Sign Up
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
