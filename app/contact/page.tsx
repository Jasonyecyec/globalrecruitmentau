"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin } from "lucide-react";
import Header from "@/app/_components/Header";
import Footer from "@/app/_sections/Footer";
import { useContactSubmit } from "@/lib/hooks/use-contact";
import { toast } from "sonner";

const offices = [
	{
		city: "Manila",
		region: "Asia-Pacific",
		address: "123 Makati Avenue, Makati City, Philippines",
		email: "asia@globalrecruitment.com",
		phone: "+63 2 123-4567",
	},
	{
		city: "Tokyo",
		region: "Asia-Pacific",
		address: "456 Shibuya-ku, Tokyo, Japan",
		email: "asia@globalrecruitment.com",
		phone: "+81 3 1234-5678",
	},
	{
		city: "Sydney",
		region: "Australia & Pacific",
		address: "789 Martin Place, Sydney NSW 2000, Australia",
		email: "apac@globalrecruitment.com",
		phone: "+61 2 9876-5432",
	},
	{
		city: "New York",
		region: "Americas",
		address: "321 5th Avenue, New York, NY 10016, USA",
		email: "americas@globalrecruitment.com",
		phone: "+1 212 555-0100",
	},
	{
		city: "London",
		region: "Europe",
		address: "654 Fleet Street, London EC4A 2DY, UK",
		email: "europe@globalrecruitment.com",
		phone: "+44 20 7123-4567",
	},
	{
		city: "Dubai",
		region: "Middle East & Africa",
		address: "987 Sheikh Zayed Road, Dubai, UAE",
		email: "mea@globalrecruitment.com",
		phone: "+971 4 123-4567",
	},
];

export default function Contact() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		inquiryType: "employer-support",
		subject: "",
		message: "",
	});

	const [feedback, setFeedback] = useState<{
		type: "success" | "error";
		message: string;
	} | null>(null);
	const { mutateAsync: submitContact, isPending } = useContactSubmit();

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleInquiryTypeChange = (value: string) => {
		setFormData((prev) => ({
			...prev,
			inquiryType: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setFeedback(null);

		try {
			const response = await submitContact({
				name: formData.name,
				email: formData.email,
				inquiry_type: formData.inquiryType,
				subject: formData.subject,
				message: formData.message,
			});

			if (response.success) {
				setFeedback({
					type: "success",
					message:
						"Thanks for reaching out—our team will get back to you within 24 hours.",
				});

				setFormData({
					name: "",
					email: "",
					inquiryType: "employer-support",
					subject: "",
					message: "",
				});

				toast.success(response.message || "Message sent successfully!");
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Something went wrong while sending your message. Please try again.";

			setFeedback({ type: "error", message: errorMessage });
		}
	};

	return (
		<div className="min-h-screen bg-background">
			<Header />

			<main>
				{/* Hero Section */}
				<section className="relative bg-gradient-to-r from-secondaryColor to-secondaryColor100/80 text-white py-20 px-4">
					<div className="absolute inset-0 opacity-10">
						<div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
					</div>
					<div className="max-w-7xl mx-auto relative z-10 text-center">
						<h1 className="text-5xl md:text-6xl font-bold mb-4">
							Get in Touch with Our Global Team
						</h1>
						<p className="text-lg text-white/90 max-w-2xl mx-auto">
							We're here to help — whether you're an employer, jobseeker, or
							partner. Reach out and let's connect.
						</p>
					</div>
				</section>

				{/* Contact Form Section */}
				<section className="py-20 px-4">
					<div className="max-w-4xl mx-auto">
						<div className="grid md:grid-cols-3 gap-12 mb-20">
							{/* Quick Contact Info */}
							<div className="md:col-span-1 space-y-8">
								<div>
									<h3 className="text-lg font-bold text-secondaryColor mb-6">
										Quick Contact
									</h3>
									<div className="space-y-4">
										<div className="flex gap-3">
											<Mail className="w-6 h-6 text-mainColor100 flex-shrink-0 mt-1" />
											<div>
												<p className="text-sm text-foreground/60">
													General Inquiries
												</p>
												<p className="font-semibold text-foreground">
													admin@recruitmentglobal.com
												</p>
											</div>
										</div>
										<div className="flex gap-3">
											<Phone className="w-6 h-6 text-mainColor100 flex-shrink-0 mt-1" />
											<div>
												<p className="text-sm text-foreground/60">
													Support Line
												</p>
												<p className="font-semibold text-foreground">
													+61 415 902 882
												</p>
											</div>
										</div>
									</div>
								</div>

								<div>
									<h4 className="font-semibold text-secondaryColor100 mb-3">
										Response Time
									</h4>
									<p className="text-sm text-foreground/70">
										We typically respond within 24 business hours.
									</p>
								</div>
							</div>

							{/* Contact Form */}
							<div className="md:col-span-2">
								<form onSubmit={handleSubmit} className="space-y-6">
									{/* Name */}
									<div>
										<label
											htmlFor="name"
											className="block text-sm font-semibold text-foreground mb-2"
										>
											Full Name
										</label>
										<input
											type="text"
											id="name"
											name="name"
											value={formData.name}
											onChange={handleChange}
											required
											className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
											placeholder="John Doe"
										/>
									</div>

									{/* Email */}
									<div>
										<label
											htmlFor="email"
											className="block text-sm font-semibold text-foreground mb-2"
										>
											Email Address
										</label>
										<input
											type="email"
											id="email"
											name="email"
											value={formData.email}
											onChange={handleChange}
											required
											className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
											placeholder="john@example.com"
										/>
									</div>

									{/* Inquiry Type */}
									<div>
										<label
											htmlFor="inquiryType"
											className="block text-sm font-semibold text-foreground mb-2"
										>
											Inquiry Type
										</label>
										<Select
											value={formData.inquiryType}
											onValueChange={handleInquiryTypeChange}
										>
											<SelectTrigger className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background">
												<SelectValue placeholder="Select inquiry type" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="employer-support">
													Employer Support
												</SelectItem>
												<SelectItem value="jobseeker-support">
													Jobseeker Support
												</SelectItem>
												<SelectItem value="partnership">
													Partnership Inquiry
												</SelectItem>
												<SelectItem value="other">Other</SelectItem>
											</SelectContent>
										</Select>
									</div>

									{/* Subject */}
									<div>
										<label
											htmlFor="subject"
											className="block text-sm font-semibold text-foreground mb-2"
										>
											Subject
										</label>
										<input
											type="text"
											id="subject"
											name="subject"
											value={formData.subject}
											onChange={handleChange}
											required
											className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
											placeholder="How can we help?"
										/>
									</div>

									{/* Message */}
									<div>
										<label
											htmlFor="message"
											className="block text-sm font-semibold text-foreground mb-2"
										>
											Message
										</label>
										<textarea
											id="message"
											name="message"
											value={formData.message}
											onChange={handleChange}
											required
											rows={5}
											className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background resize-none"
											placeholder="Tell us more about your inquiry..."
										/>
									</div>

									{/* Submit Button & Confirmation */}
									<div className="flex items-center gap-4">
										<Button
											type="submit"
											className="bg-secondaryColor hover:bg-secondaryColor/90 text-white font-semibold px-8 py-3"
											disabled={isPending}
										>
											{isPending ? "Sending..." : "Send Message"}
										</Button>
										{feedback && (
											<div
												className={`flex items-center gap-2 text-sm font-semibold ${
													feedback.type === "success"
														? "text-green-600"
														: "text-red-600"
												}`}
											>
												{feedback.type === "success" ? (
													<svg
														className="w-5 h-5"
														fill="currentColor"
														viewBox="0 0 20 20"
													>
														<path
															fillRule="evenodd"
															d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
															clipRule="evenodd"
														/>
													</svg>
												) : (
													<svg
														className="w-5 h-5"
														fill="currentColor"
														viewBox="0 0 20 20"
													>
														<path d="M10 .75a9.25 9.25 0 1 0 0 18.5 9.25 9.25 0 0 0 0-18.5Zm0 13.375a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25Zm1-1.875H9V5.375h2Z" />
													</svg>
												)}
												<span>{feedback.message}</span>
											</div>
										)}
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>

				{/* Global Offices Section */}
				<section className="py-20 px-4 bg-gradient-to-b from-background to-white">
					<div className="max-w-7xl mx-auto">
						<div className="text-center mb-16">
							<h2 className="text-4xl md:text-5xl font-bold text-secondaryColor100 mb-4">
								Our Global Offices
							</h2>
							<p className="text-lg text-foreground/70 max-w-2xl mx-auto">
								Connect with our local teams around the world
							</p>
						</div>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{offices.map((office, index) => (
								<div
									key={index}
									className="border border-border rounded-lg p-8 hover:shadow-lg transition-shadow bg-white"
								>
									<div className="flex items-start gap-3 mb-4">
										<MapPin className="w-6 h-6 text-mainColor100 flex-shrink-0 mt-1" />
										<div>
											<h3 className="text-xl font-bold text-secondaryColor100">
												{office.city}
											</h3>
											<p className="text-sm text-foreground/60">
												{office.region}
											</p>
										</div>
									</div>

									<div className="space-y-3 text-sm">
										<div>
											<p className="text-foreground/60 mb-1">Address</p>
											<p className="font-medium text-foreground">
												{office.address}
											</p>
										</div>
										<div>
											<p className="text-foreground/60 mb-1">Email</p>
											<a
												href={`mailto:${office.email}`}
												className="font-medium text-primary hover:underline"
											>
												{office.email}
											</a>
										</div>
										<div>
											<p className="text-foreground/60 mb-1">Phone</p>
											<a
												href={`tel:${office.phone}`}
												className="font-medium text-primary hover:underline"
											>
												{office.phone}
											</a>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Final CTA Section */}
				<section className="bg-gradient-to-r from-mainColor100 to-secondaryColor/80 text-white py-20 px-4">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-4xl md:text-5xl font-bold mb-4">
							Ready to Hire or Find Your Dream Job?
						</h2>
						<p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
							Explore opportunities with Global Recruitment. Whether you're an
							employer seeking top talent or a jobseeker looking for your next
							role, we're here to help.
						</p>
						<div className="flex gap-4 justify-center flex-wrap">
							<Button className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3">
								Find Jobs
							</Button>
							<Button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3">
								Hire Talent
							</Button>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
