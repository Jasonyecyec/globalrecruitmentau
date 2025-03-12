"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  BarChart3,
  Briefcase,
  Calendar,
  CheckCircle2,
  FileText,
  LineChart,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { Pie, PieChart } from "recharts";
import { getUsers } from "@/lib/api";
import { User } from "@/app/_types/user";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function Home() {
  //   const users: User[] = await getUsers();

  return (
    <div className="container p-4 sm:px-6 md:py-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, John! Here's an overview of your job search activity
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Select defaultValue="thisWeek">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="thisWeek">This week</SelectItem>
                <SelectItem value="thisMonth">This month</SelectItem>
                <SelectItem value="thisYear">This year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* STATS CARD */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4  mt-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between relative pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <div className="rounded-full absolute p-3 top-3 right-5 bg-orange-100">
              <FileText className="h-4 w-4  text-mainColor" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <div className="rounded-full absolute p-3 top-3 right-5 bg-blue-100">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">+1 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
            <CardTitle className="text-sm font-medium">Saved Jobs</CardTitle>
            <div className="rounded-full absolute p-3 top-3 right-5 bg-green-100">
              <Star className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+5 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <div className="rounded-full absolute p-3 top-3 right-5 bg-violet-100">
              <TrendingUp className="h-4 w-4 text-violet-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">132</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* APPLICATION STATISTICS */}
      <div className="grid gap-6 md:grid-cols-2  mt-4">
        <Card className="flex flex-col">
          <CardHeader className="items-start pb-0">
            <CardTitle className="text-xl font-semibold">
              Application Status
            </CardTitle>
            <CardDescription>
              Current status of your job applications
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[200px]"
            >
              <PieChart width={730} height={100}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie data={chartData} dataKey="visitors" nameKey="browser" />
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm space-y-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="flex items-center justify-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-blue-500" />
                <span className="text-sm">Applied: 12</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500" />
                <span className="text-sm">In Review: 5</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-purple-500" />
                <span className="text-sm">Interview: 4</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-green-500" />
                <span className="text-sm">Offer: 2</span>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Application Metrics</CardTitle>
            <CardDescription>
              Key performance indicators for your job search
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Response Rate</div>
                  <div className="text-sm font-medium">38%</div>
                </div>
                <div className="h-2 w-full bg-blue-100 rounded-full">
                  <div
                    className="h-2 bg-blue-500 rounded-full"
                    style={{ width: "38%" }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  9 responses from 24 applications
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">
                    Interview Conversion
                  </div>
                  <div className="text-sm font-medium">44%</div>
                </div>
                <div className="h-2 w-full bg-purple-100 rounded-full">
                  <div
                    className="h-2 bg-purple-500 rounded-full"
                    style={{ width: "44%" }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  4 interviews from 9 responses
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Offer Rate</div>
                  <div className="text-sm font-medium">50%</div>
                </div>
                <div className="h-2 w-full bg-green-100 rounded-full">
                  <div
                    className="h-2 bg-green-500 rounded-full"
                    style={{ width: "50%" }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  2 offers from 4 interviews
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Job Market Insights */}
      <div className="grid gap-6 md:grid-cols-2 mt-4">
        <Card className="md:col-span-1  h-[400px] self-start">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent job search activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-blue-100 p-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">
                      Applied for Senior Frontend Developer
                    </div>
                    <div className="text-xs text-muted-foreground">2h ago</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    TechCorp Inc.
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-yellow-100 p-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Saved UX/UI Designer job</div>
                    <div className="text-xs text-muted-foreground">5h ago</div>
                  </div>
                  <div className="text-sm text-muted-foreground">DesignHub</div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-green-100 p-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">
                      Completed skills assessment
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Yesterday
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Frontend Development
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-purple-100 p-2">
                  <Calendar className="h-4 w-4 text-purple-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Scheduled interview</div>
                    <div className="text-xs text-muted-foreground">
                      Yesterday
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    DataSystems - Backend Engineer
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full text-sm">
              View All Activity
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Job Market Insights</CardTitle>
            <CardDescription>
              Trends in your industry and location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-sm font-medium">Top Skills in Demand</div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">UI/UX</Badge>
                  <Badge variant="secondary">AWS</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Salary Trends</div>
                <div className="flex items-center space-x-2">
                  <LineChart className="h-4 w-4 text-green-500" />
                  <span className="text-sm">
                    +5% for Frontend roles in your area
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="rounded-md border p-2 text-center">
                    <div className="text-xs text-muted-foreground">Low</div>
                    <div className="font-medium">$95k</div>
                  </div>
                  <div className="rounded-md border p-2 text-center bg-primary/5">
                    <div className="text-xs text-muted-foreground">Average</div>
                    <div className="font-medium">$120k</div>
                  </div>
                  <div className="rounded-md border p-2 text-center">
                    <div className="text-xs text-muted-foreground">High</div>
                    <div className="font-medium">$150k</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Job Posting Volume</div>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">
                    152 new jobs in your field this week
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1 mt-2">
                  <div className="flex flex-col items-center">
                    <div className="h-16 w-6 bg-blue-100 rounded-t-sm relative">
                      <div className="absolute bottom-0 w-full h-10 bg-blue-500 rounded-t-sm"></div>
                    </div>
                    <div className="text-xs mt-1">Mon</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-16 w-6 bg-blue-100 rounded-t-sm relative">
                      <div className="absolute bottom-0 w-full h-14 bg-blue-500 rounded-t-sm"></div>
                    </div>
                    <div className="text-xs mt-1">Tue</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-16 w-6 bg-blue-100 rounded-t-sm relative">
                      <div className="absolute bottom-0 w-full h-8 bg-blue-500 rounded-t-sm"></div>
                    </div>
                    <div className="text-xs mt-1">Wed</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-16 w-6 bg-blue-100 rounded-t-sm relative">
                      <div className="absolute bottom-0 w-full h-12 bg-blue-500 rounded-t-sm"></div>
                    </div>
                    <div className="text-xs mt-1">Thu</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full text-sm">
              View Detailed Insights
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
