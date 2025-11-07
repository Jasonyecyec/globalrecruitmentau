import {
	Briefcase,
	Building2,
	GraduationCap,
	HeartPulse,
	LineChart,
	CheckCircle,
	Search,
	MapPin,
	Users,
	Globe,
	Zap,
	HardHat,
	Utensils,
	Tractor,
	ShoppingBag,
	Pickaxe,
	Sprout,
	Wrench,
	BookCopy,
	Laptop,
	CircleDollarSign,
	Factory,
} from "lucide-react";

// Featured Industries
import MiningAndResources from "@/public/img/featured_industries/mining_and_resource.jpg";
import FarmAndAgriculture from "@/public/img/featured_industries/farm_and_agriculture.jpg";
import Healthcare from "@/public/img/featured_industries/healthcare.jpg";
import Construction from "@/public/img/featured_industries/construction.jpg";
import Education from "@/public/img/featured_industries/education.jpg";
import InforationTechnology from "@/public/img/featured_industries/information_technology.jpg";
import FinancialService from "@/public/img/featured_industries/financial_service.jpg";
import Manufacturing from "@/public/img/featured_industries/manufacturing.jpg";

// User Success
import UserSuccess1 from "@/public/img/user_success/user_success1.jpg";
import UserSuccess2 from "@/public/img/user_success/user_success2.jpg";
import UserSuccess3 from "@/public/img/user_success/user_success3.jpg";
import UserSuccess4 from "@/public/img/user_success/user_success4.jpg";
import UserSuccess5 from "@/public/img/user_success/user_success5.jpg";
import UserSuccess6 from "@/public/img/user_success/user_success6.jpg";
import UserSuccess7 from "@/public/img/user_success/user_success7.jpg";
import UserSuccess8 from "@/public/img/user_success/user_success8.jpg";
import UserSuccess9 from "@/public/img/user_success/user_success9.jpg";
import UserSuccess10 from "@/public/img/user_success/user_success10.jpg";

export const jobCategoriesList = [
	{ icon: Briefcase, title: "Technology", jobs: "10k" },
	{ icon: LineChart, title: "Finance", jobs: "8k" },
	{ icon: HeartPulse, title: "Healthcare", jobs: "12k" },
	{ icon: Building2, title: "Marketing", jobs: "6k" },
	{ icon: GraduationCap, title: "Education", jobs: "5k" },
	{ icon: Wrench, title: "Engineering", jobs: "9k" },
	{ icon: HardHat, title: "Construction", jobs: "7k" },
	{ icon: Utensils, title: "Hospitality", jobs: "8k" },
	{ icon: Tractor, title: "Agriculture", jobs: "4k" },
	{ icon: ShoppingBag, title: "Retail", jobs: "4k" },
	{ icon: Globe, title: "International", jobs: "15k" },
	{ icon: Users, title: "Human Resources", jobs: "6k" },
];

export const findJobList = [
	{
		title: "Mining Engineer",
		company: "AusMine Corp",
		location: "Perth, WA",
		salary: "$120,000 - $150,000",
		jobType: "Full-time",
	},
	{
		title: "Registered Nurse",
		company: "Sydney Central Hospital",
		location: "Sydney, NSW",
		salary: "$75,000 - $95,000",
		jobType: "Full-time",
	},
	{
		title: "Farm Manager",
		company: "Green Pastures Pty Ltd",
		location: "Toowoomba, QLD",
		salary: "$80,000 - $100,000",
		jobType: "Full-time",
	},
	{
		title: "Software Engineer",
		company: "TechInnovate Australia",
		location: "Melbourne, VIC",
		salary: "Not specified",
		jobType: "Full-time",
	},
	{
		title: "FIFO Chef",
		company: "Outback Catering Services",
		location: "Various Locations, WA",
		salary: "Not specified",
		jobType: "Remote",
	},
	{
		title: "Environmental Scientist",
		company: "Farm Hand",
		location: "Brisbane, QLD",
		salary: "Not specified",
		jobType: "Full-time",
	},
];

export const featuredIndustriesList = [
	{
		title: "Mining and Resources",
		icon: Pickaxe,
		description:
			"Australia's leading sector, including coal, iron ore, and minerals",
		image: MiningAndResources,
	},
	{
		title: "Farm & Agriculture",
		icon: Sprout,
		description:
			"Farm hands, seasonal workers, and agricultural specialists across Australia",
		image: FarmAndAgriculture,
	},
	{
		title: "Healthcare",
		icon: HeartPulse,
		description: "Growing industry with increasing demand for services",
		image: Healthcare,
	},
	{
		title: "Construction",
		icon: Wrench,
		description: "Booming sector with numerous infrastructure projects",
		image: Construction,
	},
	{
		title: "Education",
		icon: BookCopy,
		description: "Major export industry and employer in Australia",
		image: Education,
	},
	{
		title: "Information Technology",
		icon: Laptop,
		description:
			"Rapidly growing industry with high demand for skilled professionals",
		image: InforationTechnology,
	},
	{
		title: "Financial Services",
		icon: CircleDollarSign,
		description: "Strong sector including banking, insurance, and investment",
		image: FinancialService,
	},
	{
		title: "Manufacturing",
		icon: Factory,
		description:
			"Diverse industry producing goods for domestic and international markets",
		image: Manufacturing,
	},
	// {
	//   title: "Retail Trade",
	//   icon: Briefcase,
	//   description: "Large employer across various types of stores and online platforms",
	//   image: FarmAndAgriculture
	// },
	// {
	//   title: "Tourism & Hospitality",
	//   icon: Briefcase,
	//   description: "Significant contributor to the economy, attracting domestic and international visitors",
	//   image: FarmAndAgriculture
	// },
	// {
	//   title: "Energy & Utilities",
	//   icon: Briefcase,
	//   description: "Essential services including electricity, gas, and water supply",
	//   image: FarmAndAgriculture
	// },
	// {
	//   title: "Telecommunications",
	//   icon: Briefcase,
	//   description: "Evolving industry with ongoing infrastructure development",
	//   image: FarmAndAgriculture
	// },
	// {
	//   title: "Professional Services",
	//   icon: Briefcase,
	//   description: "Wide range of services including legal, accounting, and consulting",
	//   image: FarmAndAgriculture
	// },
	// {
	//   title: "Media & Entertainment",
	//   icon: Briefcase,
	//   description: "Dynamic sector covering film, television, music, and digital media",
	//   image: FarmAndAgriculture
	// },
	// {
	//   title: "Transport & Logistics",
	//   icon: Briefcase,
	//   description: "Critical industry supporting Australia's supply chains",
	//   image: FarmAndAgriculture
	// },
	// {
	//   title: "Renewable Energy",
	//   icon: Briefcase,
	//   description: "Growing sector focused on sustainable energy solutions",
	//   image: FarmAndAgriculture
	// }
];

export const howItWorksList = {
	steps: [
		{
			number: "1",
			title: "Create Your Profile",
			description:
				"Register and showcase your skills and experience to global employers",
		},
		{
			number: "2",
			title: "Browse Global Opportunities",
			description:
				"Search and filter jobs that match your criteria from around the world",
		},
		{
			number: "3",
			title: "Apply with Ease",
			description:
				"Submit your application to international companies with just a few clicks",
		},
	],

	employerSteps: [
		{
			number: "1",
			title: "Post a Global Job",
			description:
				"Create a detailed listing for your open position, visible to a worldwide talent pool",
		},
		{
			number: "2",
			title: "Review International Applications",
			description:
				"Evaluate candidates from diverse backgrounds based on your requirements",
		},
		{
			number: "3",
			title: "Hire the Best Globally",
			description:
				"Connect with and hire top talent from anywhere in the world",
		},
	],
};

export const testimonialList = [
	{
		id: 1,
		name: "Rahul Sharma",
		position: "Senior Software Engineer",
		company: "TechInnovate Australia",
		location: "Melbourne, Australia",
		origin: "India",
		quote:
			"RPG helped me land my dream job in Australia's thriving tech scene. The transition from India was smooth thanks to their guidance.",
		image: UserSuccess1,
	},
	{
		id: 2,
		name: "Emma Thompson",
		position: "Marketing Manager",
		company: "AusBrand Boost",
		location: "Sydney, Australia",
		origin: "United Kingdom",
		quote:
			"Moving from London to Sydney for a marketing role was a big step. RPG's support made the international transition seamless.",
		image: UserSuccess2,
	},
	{
		id: 3,
		name: "Carlos Mendez",
		position: "Data Scientist",
		company: "AussieAI Innovations",
		location: "Brisbane, Australia",
		origin: "Brazil",
		quote:
			"RPG understood my unique skills and helped me find a perfect fit in Australia's growing data science field.",
		image: UserSuccess3,
	},
	{
		id: 4,
		name: "Yuki Tanaka",
		position: "UX Designer",
		company: "DesignMasters Australia",
		location: "Perth, Australia",
		origin: "Japan",
		quote:
			"I never thought I could work for a top design firm in Australia. Thanks to RPG, I'm now living my dream in Perth!",
		image: UserSuccess4,
	},
	{
		id: 5,
		name: "Sarah Chen",
		position: "Financial Analyst",
		company: "AusFinance Corp",
		location: "Adelaide, Australia",
		origin: "Singapore",
		quote:
			"RPG's expertise in the Australian job market helped me secure a position in Adelaide's financial sector. Their guidance was invaluable.",
		image: UserSuccess5,
	},
	{
		id: 6,
		name: "Mohammed Al-Fayed",
		position: "Remote Customer Support Team Lead",
		company: "AusSupportHero",
		location: "Gold Coast, Australia",
		origin: "Egypt",
		quote:
			"Working remotely from the Gold Coast for an Australian company was a dream come true. RPG made it happen!",
		image: UserSuccess6,
	},
	{
		id: 7,
		name: "Isabella Rossi",
		position: "Hospitality Manager",
		company: "Aussie Resorts & Spas",
		location: "Cairns, Australia",
		origin: "Italy",
		quote:
			"Moving from Italy to manage a resort in Cairns was an exciting challenge. RPG's support throughout the process was exceptional.",
		image: UserSuccess7,
	},
	{
		id: 8,
		name: "Liam O'Connor",
		position: "Mining Engineer",
		company: "AusMine Corp",
		location: "Perth, Australia",
		origin: "Ireland",
		quote:
			"RPG's expertise in the Australian mining industry helped me land a fantastic role in Perth. I couldn't be happier with my new life Down Under!",
		image: UserSuccess8,
	},
	{
		id: 9,
		name: "Priya Patel",
		position: "Registered Nurse",
		company: "AusCare Health Services",
		location: "Darwin, Australia",
		origin: "India",
		quote:
			"Transitioning from India to Australia's healthcare system was daunting, but RPG's guidance made it achievable. I'm thrilled with my new role in Darwin!",
		image: UserSuccess9,
	},
	{
		id: 10,
		name: "Hans Schmidt",
		position: "Viticulture Manager",
		company: "Aussie Vineyards",
		location: "Barossa Valley, Australia",
		origin: "Germany",
		quote:
			"RPG helped me fulfill my dream of managing a vineyard in Australia. Their agricultural industry knowledge was impressive!",
		image: UserSuccess10,
	},
];

export const faqList = [
	{
		item: 1,
		question: "How do I create an international account?",
		answer:
			"Simply click on the 'Sign Up' button and follow the steps to create your global account. You can specify your location, job preferences, and upload your resume during the process.",
	},
	{
		item: 2,
		question: "What happens after I submit my job application?",
		answer:
			"After submitting your application, you'll receive a confirmation email. Our team will review your application and forward it to the employer if it meets the job requirements. The employer will then decide whether to proceed with your application.",
	},
	{
		item: 3,
		question: "What makes RPG different from other international job boards?",
		answer:
			"RPG specializes in cross-border recruitment, offering personalized matching, cultural insights, and a global network of employers. We provide comprehensive support throughout the entire job search and hiring process, from application to onboarding.",
	},
	{
		item: 4,
		question: "How will I be notified if an employer wants to interview me?",
		answer:
			"If an employer is interested in interviewing you, you'll receive an email notification and a message in your RPG account. The notification will include details on how to schedule or confirm your interview.",
	},
	{
		item: 5,
		question:
			"How long does it typically take to hear back about my application?",
		answer:
			"Response times can vary depending on the employer and position. On average, you can expect to hear back within 1-2 weeks. If you haven't received a response after 2 weeks, you can check your application status in your account dashboard.",
	},
	{
		item: 6,
		question: "How does RPG ensure the legitimacy of job postings?",
		answer:
			"We have a rigorous vetting process for employers and job postings. Our team verifies company information, reviews job descriptions, and monitors user feedback to maintain the quality and legitimacy of listings on our platform.",
	},
];

export const jobs = [
	{
		id: 1,
		title: "Software Developer",
		company: "Tech Solutions Canada",
		location: "Toronto, ON",
		salary: "$80,000 - $120,000",
		type: "Full-time",
		posted: "2 days ago",
		logo: "/placeholder.svg?height=40&width=40",
		description:
			"Seeking experienced software developers to build innovative applications...",
		skills: ["Java", "C#", "React"],
		saved: false,
		aboutCompany:
			"Tech Solutions Canada is a leading IT firm specializing in software development and digital transformation.",
		companySize: "201-500 employees",
		companyIndustry: "Information Technology",
		companyWebsite: "https://techsolutions-canada.com",
		responsibilities: [
			"Develop and maintain web and mobile applications",
			"Collaborate with cross-functional teams to define requirements",
			"Ensure code quality and best practices",
		],
		qualifications: [
			"Bachelor's degree in Computer Science or related field",
			"3+ years of experience in software development",
			"Proficiency in Java, C#, or JavaScript frameworks",
		],
	},
	{
		id: 2,
		title: "Registered Nurse",
		company: "HealthCare Canada",
		location: "Vancouver, BC",
		salary: "$75,000 - $100,000",
		type: "Full-time",
		posted: "3 days ago",
		logo: "/placeholder.svg?height=40&width=40",
		description:
			"Hiring compassionate and skilled registered nurses for hospitals and clinics...",
		skills: ["Patient Care", "Critical Thinking", "Medication Administration"],
		saved: false,
		aboutCompany:
			"HealthCare Canada provides high-quality healthcare services across the country.",
		companySize: "1000+ employees",
		companyIndustry: "Healthcare",
		companyWebsite: "https://healthcare-canada.com",
		responsibilities: [
			"Provide direct patient care and administer medications",
			"Collaborate with healthcare teams to develop treatment plans",
			"Ensure patient safety and comfort",
		],
		qualifications: [
			"Bachelor's degree in Nursing or equivalent",
			"Registered Nurse certification in Canada",
			"2+ years of clinical experience",
		],
	},
	{
		id: 3,
		title: "Construction Manager",
		company: "Build Canada Inc.",
		location: "Calgary, AB",
		salary: "$90,000 - $130,000",
		type: "Full-time",
		posted: "1 week ago",
		logo: "/placeholder.svg?height=40&width=40",
		description:
			"Managing large-scale construction projects and site operations...",
		skills: ["Project Management", "Budgeting", "Team Leadership"],
		saved: true,
		aboutCompany:
			"Build Canada Inc. is a leading construction company known for its high-quality projects.",
		companySize: "500+ employees",
		companyIndustry: "Construction",
		companyWebsite: "https://buildcanada.com",
		responsibilities: [
			"Oversee construction projects from start to finish",
			"Ensure compliance with safety regulations",
			"Manage project budgets and timelines",
		],
		qualifications: [
			"Degree in Civil Engineering or related field",
			"5+ years of experience in construction management",
			"Strong leadership and organizational skills",
		],
	},
	{
		id: 4,
		title: "Truck Driver",
		company: "Canada Freight Services",
		location: "Edmonton, AB",
		salary: "$60,000 - $90,000",
		type: "Full-time",
		posted: "4 days ago",
		logo: "/placeholder.svg?height=40&width=40",
		description:
			"Hiring long-haul truck drivers for cross-province and cross-border deliveries...",
		skills: ["Commercial Driving", "Route Planning", "Vehicle Maintenance"],
		saved: false,
		aboutCompany:
			"Canada Freight Services is a leading logistics company ensuring efficient goods transportation across North America.",
		companySize: "1000+ employees",
		companyIndustry: "Logistics & Transportation",
		companyWebsite: "https://canadafreight.com",
		responsibilities: [
			"Transport goods safely across long distances",
			"Ensure vehicle maintenance and compliance with regulations",
			"Coordinate with dispatchers for efficient delivery routes",
		],
		qualifications: [
			"Valid Class 1/AZ driver’s license",
			"2+ years of truck driving experience",
			"Clean driving record",
		],
	},
	{
		id: 5,
		title: "Electrician",
		company: "PowerTech Canada",
		location: "Montreal, QC",
		salary: "$70,000 - $100,000",
		type: "Full-time",
		posted: "5 days ago",
		logo: "/placeholder.svg?height=40&width=40",
		description:
			"Hiring certified electricians for residential and commercial projects...",
		skills: ["Electrical Wiring", "Blueprint Reading", "Troubleshooting"],
		saved: true,
		aboutCompany:
			"PowerTech Canada provides high-quality electrical services for homes and businesses.",
		companySize: "200+ employees",
		companyIndustry: "Electrical & Construction",
		companyWebsite: "https://powertech-canada.com",
		responsibilities: [
			"Install and repair electrical systems in residential and commercial buildings",
			"Follow electrical codes and safety regulations",
			"Diagnose and fix electrical issues efficiently",
		],
		qualifications: [
			"Certified electrician with valid license",
			"3+ years of experience in electrical work",
			"Strong understanding of electrical systems and safety procedures",
		],
	},
];
