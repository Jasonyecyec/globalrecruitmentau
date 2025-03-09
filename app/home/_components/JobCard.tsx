import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Job } from "@/app/_types/jobs";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Briefcase,
  Building2,
  Clock,
  Star,
  StarIcon,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

type JobCardProps = {
  job: Job;
  isSelected: boolean;
  onSelect: () => void;
  onToggleSave: () => void;
};

export default function JobCard({
  job,
  isSelected,
  onSelect,
  onToggleSave,
}: JobCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all hover:border-gray-500 hover:shadow-md ${
        isSelected ? "border-gray-500 shadow-md" : ""
      }`}
      onClick={onSelect}
    >
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex items-center space-x-4 ">
          <Avatar className="h-10 w-10 bg-gray-100 rounded-md">
            <AvatarImage src={job.logo} alt={job.company} className="" />
            <AvatarFallback className="rounded-md">
              {job.company.substring(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div>
            <CardTitle className="text-lg"> {job.title}</CardTitle>
            <CardDescription className="flex items-center">
              <Building2 className="mr-1 h-3 w-3" />
              <span> {job.company}</span>
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
        <Button size="sm" variant={isSelected ? "default" : "outline"}>
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
}
