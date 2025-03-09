"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Job } from "@/app/_types/jobs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import JobCard from "../_components/JobCard";
import JobDetails from "../_components/JobDetails";

import {
  Filter,
  Search,
  MapPin,
  Briefcase,
  Building2,
  Clock,
  Star,
  StarIcon,
} from "lucide-react";
import { useState } from "react";

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120,000 - $150,000",
    type: "Full-time",
    posted: "2 days ago",
    logo: "/placeholder.svg?height=40&width=40",
    description:
      "We are looking for an experienced Frontend Developer to join our team...",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    saved: true,
    aboutCompany:
      "TechCorp Inc. is a leading technology company specializing in web and mobile application development. We create innovative solutions for businesses across various industries.",
    companySize: "201-500 employees",
    companyIndustry: "Information Technology",
    companyWebsite: "https://techcorp-example.com",
    responsibilities: [
      "Design, develop, and maintain web applications using React and TypeScript",
      "Collaborate with UX/UI designers to implement responsive and intuitive user interfaces",
      "Write clean, efficient, and maintainable code following best practices",
      "Participate in code reviews and contribute to technical discussions",
      "Troubleshoot and debug issues in existing applications",
    ],
    qualifications: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of experience with modern JavaScript frameworks (React preferred)",
      "Strong understanding of HTML, CSS, and responsive design principles",
      "Experience with RESTful APIs and asynchronous request handling",
      "Familiarity with version control systems (Git)",
    ],
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "DesignHub",
    location: "Remote",
    salary: "$90,000 - $110,000",
    type: "Full-time",
    posted: "1 day ago",
    logo: "/placeholder.svg?height=40&width=40",
    description:
      "Join our creative team to design beautiful and functional interfaces...",
    skills: ["Figma", "Adobe XD", "User Research"],
    saved: false,
    aboutCompany:
      "DesignHub is a creative agency focused on delivering exceptional user experiences through thoughtful design. We work with startups and established companies to create intuitive digital products.",
    companySize: "51-200 employees",
    companyIndustry: "Design Services",
    companyWebsite: "https://designhub-example.com",
    responsibilities: [
      "Create wireframes, prototypes, and high-fidelity designs for web and mobile applications",
      "Conduct user research and usability testing to inform design decisions",
      "Collaborate with product managers and developers to implement designs",
      "Develop and maintain design systems and style guides",
      "Stay current with UX/UI trends and best practices",
    ],
    qualifications: [
      "Bachelor's degree in Design, HCI, or related field",
      "2+ years of experience in UX/UI design for digital products",
      "Proficiency with design tools like Figma and Adobe Creative Suite",
      "Strong portfolio demonstrating user-centered design process",
      "Experience with responsive design and accessibility standards",
    ],
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "DataSystems",
    location: "New York, NY",
    salary: "$130,000 - $160,000",
    type: "Full-time",
    posted: "3 days ago",
    logo: "/placeholder.svg?height=40&width=40",
    description:
      "Looking for a skilled Backend Engineer to help scale our infrastructure...",
    skills: ["Node.js", "Python", "AWS"],
    saved: false,
    aboutCompany:
      "DataSystems specializes in building scalable backend solutions for data-intensive applications. We help businesses manage and analyze large datasets efficiently.",
    companySize: "101-500 employees",
    companyIndustry: "Software Development",
    companyWebsite: "https://datasystems-example.com",
    responsibilities: [
      "Design and implement scalable backend services and APIs",
      "Optimize database performance and query efficiency",
      "Implement security best practices and data protection measures",
      "Collaborate with frontend developers to integrate services",
      "Monitor and troubleshoot production systems",
    ],
    qualifications: [
      "Bachelor's degree in Computer Science or related field",
      "4+ years of experience in backend development",
      "Proficiency in Node.js, Python, or similar languages",
      "Experience with cloud platforms (AWS, Azure, or GCP)",
      "Knowledge of database systems and data modeling",
    ],
  },
  {
    id: 4,
    title: "Product Manager",
    company: "InnovateCo",
    location: "Chicago, IL",
    salary: "$110,000 - $140,000",
    type: "Full-time",
    posted: "5 days ago",
    logo: "/placeholder.svg?height=40&width=40",
    description:
      "Lead product development and strategy for our flagship application...",
    skills: ["Product Strategy", "Agile", "User Stories"],
    saved: false,
    aboutCompany:
      "InnovateCo develops cutting-edge software products that solve real-world problems. We focus on creating intuitive solutions that improve productivity and efficiency.",
    companySize: "51-200 employees",
    companyIndustry: "Software Products",
    companyWebsite: "https://innovateco-example.com",
    responsibilities: [
      "Define product vision, strategy, and roadmap based on market research",
      "Gather and prioritize product requirements from stakeholders",
      "Create detailed user stories and acceptance criteria",
      "Work closely with design and engineering teams throughout development",
      "Analyze product metrics and user feedback to guide improvements",
    ],
    qualifications: [
      "Bachelor's degree in Business, Computer Science, or related field",
      "3+ years of experience in product management",
      "Strong understanding of software development lifecycle",
      "Experience with agile methodologies and project management tools",
      "Excellent communication and presentation skills",
    ],
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Remote",
    salary: "$125,000 - $155,000",
    type: "Contract",
    posted: "1 week ago",
    logo: "/placeholder.svg?height=40&width=40",
    description:
      "Help us build and maintain our cloud infrastructure and CI/CD pipelines...",
    skills: ["Kubernetes", "Docker", "Terraform"],
    saved: true,
    aboutCompany:
      "CloudTech specializes in cloud infrastructure and DevOps solutions. We help companies automate their deployment processes and optimize their cloud resources.",
    companySize: "51-200 employees",
    companyIndustry: "Cloud Services",
    companyWebsite: "https://cloudtech-example.com",
    responsibilities: [
      "Design and implement CI/CD pipelines for software delivery",
      "Manage and optimize cloud infrastructure on AWS, Azure, or GCP",
      "Implement infrastructure as code using Terraform or similar tools",
      "Monitor system performance and troubleshoot issues",
      "Collaborate with development teams to improve deployment processes",
    ],
    qualifications: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of experience in DevOps or SRE roles",
      "Experience with containerization technologies (Docker, Kubernetes)",
      "Knowledge of infrastructure as code tools (Terraform, CloudFormation)",
      "Familiarity with monitoring and logging systems",
    ],
  },
];

export default function FindJobs() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [savedJobs, setSavedJobs] = useState(jobs.filter((job) => job.saved));

  const toggleSaveJob = (jobId: number) => {
    const updatedJobs = jobs.map((job) =>
      job.id === jobId ? { ...job, saved: !job.saved } : job
    );

    setSavedJobs(updatedJobs.filter((job) => job.saved));
  };

  return (
    <div className="container grid flex-1 gap-4 md:grid-cols-[1fr_400px] lg:grid-cols-[1fr_500px] p-4 sm:px-4 md:py-4">
      <main className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex-1 space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">
              Find Your Next Opportunity
            </h1>
            <p className="text-muted-foreground">
              Browse through thousands of job listings tailored to your skills
              and experience.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="salary">Highest salary</SelectItem>
                <SelectItem value="relevance">Most relevant</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="flex flex-col gap-2 sm:flex-row items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search jobs, skills, or companies"
                className="pl-8"
              />
            </div>

            <div className="relative flex-1 sm:max-w-[260px]">
              <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Location or Remote"
                className="pl-8"
              />
            </div>

            <Button type="submit" className="shrink-0 h-9">
              Search Jobs
            </Button>
          </div>
        </div>
        {/* JOB LIST COMPONENT */}
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSelected={selectedJob?.id === job.id}
            onSelect={() => setSelectedJob(job)}
            onToggleSave={() => toggleSaveJob(job.id)}
          />
        ))}
      </main>

      <aside className="hidden md:block relative">
        <JobDetails
          job={selectedJob}
          onToggleSave={() => selectedJob && toggleSaveJob(selectedJob.id)}
        />
      </aside>
    </div>
  );
}
