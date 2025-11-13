"use client";
import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Building2,
	Globe,
	Linkedin,
	Twitter,
	Facebook,
	Instagram,
	Upload,
	Save,
	MapPin,
	Users,
	Calendar,
} from "lucide-react";
import { toast } from "sonner";

export default function CompanyProfile() {
	const [isEditing, setIsEditing] = useState(false);

	const handleSave = () => {
		toast.success("Company profile updated successfully!");
		setIsEditing(false);
	};

	return (
		<div className="p-4 sm:px-6 md:py-8">
			<div className="max-w-4xl mx-auto">
				<div className="flex flex-col gap-4 mb-6">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-2xl font-bold tracking-tight">
								Company Profile
							</h1>
							<p className="text-muted-foreground">
								Manage your company information and branding
							</p>
						</div>
						{!isEditing ? (
							<Button
								className="bg-mainColor hover:bg-orange-400"
								onClick={() => setIsEditing(true)}
							>
								Edit Profile
							</Button>
						) : (
							<div className="flex gap-2">
								<Button
									variant="outline"
									onClick={() => setIsEditing(false)}
								>
									Cancel
								</Button>
								<Button
									className="bg-mainColor hover:bg-orange-400"
									onClick={handleSave}
								>
									<Save className="mr-2 h-4 w-4" />
									Save Changes
								</Button>
							</div>
						)}
					</div>
				</div>

				<Tabs defaultValue="general" className="w-full">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="general">General</TabsTrigger>
						<TabsTrigger value="social">Social Media</TabsTrigger>
						<TabsTrigger value="branding">Branding</TabsTrigger>
					</TabsList>

					{/* GENERAL TAB */}
					<TabsContent value="general" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Company Information</CardTitle>
								<CardDescription>
									Basic information about your company
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="companyName">Company Name *</Label>
									<div className="relative">
										<Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
										<Input
											id="companyName"
											placeholder="Acme Corporation"
											className="pl-10"
											defaultValue="Acme Corporation"
											disabled={!isEditing}
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="industry">Industry *</Label>
									<Select defaultValue="technology" disabled={!isEditing}>
										<SelectTrigger>
											<SelectValue placeholder="Select industry" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="technology">Technology</SelectItem>
											<SelectItem value="finance">Finance</SelectItem>
											<SelectItem value="healthcare">Healthcare</SelectItem>
											<SelectItem value="education">Education</SelectItem>
											<SelectItem value="retail">Retail</SelectItem>
											<SelectItem value="manufacturing">
												Manufacturing
											</SelectItem>
											<SelectItem value="other">Other</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label htmlFor="companySize">Company Size *</Label>
									<Select defaultValue="51-200" disabled={!isEditing}>
										<SelectTrigger>
											<SelectValue placeholder="Select company size" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="1-10">1-10 employees</SelectItem>
											<SelectItem value="11-50">11-50 employees</SelectItem>
											<SelectItem value="51-200">51-200 employees</SelectItem>
											<SelectItem value="201-500">201-500 employees</SelectItem>
											<SelectItem value="501-1000">
												501-1000 employees
											</SelectItem>
											<SelectItem value="1001+">1001+ employees</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label htmlFor="founded">Year Founded</Label>
									<div className="relative">
										<Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
										<Input
											id="founded"
											type="number"
											placeholder="2010"
											className="pl-10"
											defaultValue="2010"
											disabled={!isEditing}
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="website">Company Website</Label>
									<div className="relative">
										<Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
										<Input
											id="website"
											type="url"
											placeholder="https://www.example.com"
											className="pl-10"
											defaultValue="https://www.acmecorp.com"
											disabled={!isEditing}
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="headquarters">Headquarters Location *</Label>
									<div className="relative">
										<MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
										<Input
											id="headquarters"
											placeholder="Sydney, Australia"
											className="pl-10"
											defaultValue="Sydney, Australia"
											disabled={!isEditing}
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="description">Company Description *</Label>
									<Textarea
										id="description"
										placeholder="Tell candidates about your company..."
										className="min-h-[150px]"
										defaultValue="Acme Corporation is a leading technology company focused on delivering innovative solutions to businesses worldwide. We pride ourselves on our collaborative culture and commitment to excellence."
										disabled={!isEditing}
									/>
									<p className="text-xs text-muted-foreground">
										This will be displayed on your company page and job listings
									</p>
								</div>

								<div className="space-y-2">
									<Label htmlFor="culture">Company Culture & Values</Label>
									<Textarea
										id="culture"
										placeholder="Describe your company culture, values, and what makes you unique..."
										className="min-h-[120px]"
										defaultValue="We value innovation, collaboration, and continuous learning. Our team is passionate about technology and dedicated to creating an inclusive workplace where everyone can thrive."
										disabled={!isEditing}
									/>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Contact Information</CardTitle>
								<CardDescription>
									How candidates can reach you
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="contactEmail">Contact Email *</Label>
									<Input
										id="contactEmail"
										type="email"
										placeholder="careers@example.com"
										defaultValue="careers@acmecorp.com"
										disabled={!isEditing}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="contactPhone">Contact Phone</Label>
									<Input
										id="contactPhone"
										type="tel"
										placeholder="+61 2 1234 5678"
										defaultValue="+61 2 9876 5432"
										disabled={!isEditing}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="address">Office Address</Label>
									<Textarea
										id="address"
										placeholder="Full office address..."
										className="min-h-[80px]"
										defaultValue="Level 5, 123 George Street, Sydney NSW 2000, Australia"
										disabled={!isEditing}
									/>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* SOCIAL MEDIA TAB */}
					<TabsContent value="social" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Social Media Links</CardTitle>
								<CardDescription>
									Connect your social media profiles
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="linkedin">LinkedIn Company Page</Label>
									<div className="relative">
										<Linkedin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
										<Input
											id="linkedin"
											type="url"
											placeholder="https://linkedin.com/company/your-company"
											className="pl-10"
											defaultValue="https://linkedin.com/company/acmecorp"
											disabled={!isEditing}
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="twitter">Twitter/X</Label>
									<div className="relative">
										<Twitter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
										<Input
											id="twitter"
											type="url"
											placeholder="https://twitter.com/yourcompany"
											className="pl-10"
											defaultValue="https://twitter.com/acmecorp"
											disabled={!isEditing}
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="facebook">Facebook</Label>
									<div className="relative">
										<Facebook className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
										<Input
											id="facebook"
											type="url"
											placeholder="https://facebook.com/yourcompany"
											className="pl-10"
											disabled={!isEditing}
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="instagram">Instagram</Label>
									<div className="relative">
										<Instagram className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
										<Input
											id="instagram"
											type="url"
											placeholder="https://instagram.com/yourcompany"
											className="pl-10"
											disabled={!isEditing}
										/>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* BRANDING TAB */}
					<TabsContent value="branding" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Company Logo</CardTitle>
								<CardDescription>
									Upload your company logo (recommended size: 400x400px)
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
									<Avatar className="h-24 w-24">
										<AvatarImage src="https://github.com/shadcn.png" />
										<AvatarFallback>AC</AvatarFallback>
									</Avatar>
									<div className="space-y-2">
										<p className="text-sm text-muted-foreground">
											JPG, PNG or SVG. Max size 2MB.
										</p>
										{isEditing && (
											<Button variant="outline" size="sm">
												<Upload className="mr-2 h-4 w-4" />
												Upload Logo
											</Button>
										)}
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Cover Image</CardTitle>
								<CardDescription>
									Upload a cover image for your company page (recommended size:
									1200x400px)
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<div className="w-full h-48 bg-accent rounded-lg flex items-center justify-center border-2 border-dashed">
										<div className="text-center">
											<Building2 className="mx-auto h-12 w-12 text-muted-foreground" />
											<p className="text-sm text-muted-foreground mt-2">
												No cover image uploaded
											</p>
										</div>
									</div>
									<p className="text-xs text-muted-foreground">
										JPG or PNG. Max size 5MB.
									</p>
									{isEditing && (
										<Button variant="outline" size="sm">
											<Upload className="mr-2 h-4 w-4" />
											Upload Cover Image
										</Button>
									)}
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Brand Colors</CardTitle>
								<CardDescription>
									Customize the appearance of your job listings
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="primaryColor">Primary Color</Label>
										<div className="flex gap-2">
											<Input
												id="primaryColor"
												type="color"
												defaultValue="#f97316"
												className="h-10 w-20"
												disabled={!isEditing}
											/>
											<Input
												type="text"
												defaultValue="#f97316"
												className="flex-1"
												disabled={!isEditing}
											/>
										</div>
									</div>
									<div className="space-y-2">
										<Label htmlFor="secondaryColor">Secondary Color</Label>
										<div className="flex gap-2">
											<Input
												id="secondaryColor"
												type="color"
												defaultValue="#1e40af"
												className="h-10 w-20"
												disabled={!isEditing}
											/>
											<Input
												type="text"
												defaultValue="#1e40af"
												className="flex-1"
												disabled={!isEditing}
											/>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
