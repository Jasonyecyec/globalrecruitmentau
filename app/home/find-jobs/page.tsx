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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  },
];

type JobCardProps = {
  job: (typeof jobs)[0];
  isSelected: boolean;
  onSelect: () => void;
  onToggleSave: () => void;
};

function JobCard({ job, isSelected, onSelect, onToggleSave }: JobCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all hover:border-primary ${
        isSelected ? "border-primary" : ""
      }`}
      onClick={onSelect}
    >
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10 rounded-md">
            <AvatarImage src={job.logo} alt={job.company} />
            <AvatarFallback className="rounded-md">
              {job.company.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{job.title}</CardTitle>
            <CardDescription className="flex items-center">
              <Building2 className="mr-1 h-3 w-3" />
              {job.company}
            </CardDescription>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-primary"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave();
          }}
        >
          {job.saved ? (
            <StarIcon className="h-4 w-4 fill-primary text-primary" />
          ) : (
            <Star className="h-4 w-4" />
          )}
          <span className="sr-only">Save job</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge variant="outline" className="flex items-center">
            <MapPin className="mr-1 h-3 w-3" />
            {job.location}
          </Badge>
          <Badge variant="outline" className="flex items-center">
            <Briefcase className="mr-1 h-3 w-3" />
            {job.type}
          </Badge>
          <Badge variant="outline" className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            {job.posted}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
          {job.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-3">
          {job.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="text-sm font-medium">{job.salary}</div>
        <Button size="sm">Apply Now</Button>
      </CardFooter>
    </Card>
  );
}

export default function FindJobs() {
  const [selectedJob, setSelectedJob] = useState(jobs[0]);
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
            isSelected={selectedJob.id === job.id}
            onSelect={() => setSelectedJob(job)}
            onToggleSave={() => toggleSaveJob(job.id)}
          />
        ))}
      </main>

      <aside className="hidden md:block border-2 ">
        {/*MAKE COMPONENT */}
        <div className="sticky top-10 border-2">
          <p>Developer</p>
        </div>
      </aside>
    </div>
  );
}
