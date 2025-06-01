"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  Building2,
  DollarSign,
} from "lucide-react";
import { useState } from "react";

type JobSearchProps = {
  viewDetails: (id: number) => void;
};

export default function JobSearch({ viewDetails }: JobSearchProps) {
  const [remoteOnly, setRemoteOnly] = useState(true);

  const jobListings = [
    {
      id: 1,
      title: "Front-End Developer",
      company: "Oliv",
      location: "Remote",
      type: "Full-time",
      salary: "5 000 - 10 000",
      period: "/monthly",
      tags: ["Ethereum", "Web Design", "JavaScript", "Solidity"],
      
    },
    {
      id: 2,
      title: "Web3 Developer",
      company: "Axoni",
      location: "San Francisco",
      type: "Full-time",
      salary: "9 000 - 16 000",
      period: "/monthly",
      tags: ["Solidity", "JavaScript", "GraphQL", "Frontend Development"],
      
    },
    {
      id: 3,
      title: "ReactJS Developer",
      company: "The Nano Foundation",
      location: "New York",
      type: "Full-time",
      salary: "35 000 - 48 000",
      period: "/annually",
      tags: ["JavaScript", "ReactJS"],
      
    },
    {
      id: 4,
      title: "ReactJS Developer",
      company: "The Nano Foundation",
      location: "New York",
      type: "Full-time",
      salary: "35 000 - 48 000",
      period: "/annually",
      tags: ["JavaScript", "ReactJS"],
      
    },
    {
      id: 5,
      title: "Front-End Developer",
      company: "Q Labs",
      location: "Spain",
      type: "Part-time",
      salary: "35 000 - 48 000",
      period: "/annually",
      tags: ["Frontend Development"],
      
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Main Filter Section */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Job Search Filters</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* First Row of Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <div className="space-y-2">
                <Label htmlFor="job-title" className="text-sm font-medium">
                  JOB TITLE
                </Label>
                <p className="text-xs text-muted-foreground">
                  (e.g. Keywords, Position...)
                </p>
                <Select defaultValue="product-designer">
                  <SelectTrigger id="job-title">
                    <SelectValue placeholder="Select job title" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product-designer">
                      Product Designer
                    </SelectItem>
                    <SelectItem value="frontend-developer">
                      Frontend Developer
                    </SelectItem>
                    <SelectItem value="backend-developer">
                      Backend Developer
                    </SelectItem>
                    <SelectItem value="fullstack-developer">
                      Fullstack Developer
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium">
                  LOCATION
                </Label>
                <p className="text-xs text-muted-foreground">
                  (City, Country...)
                </p>
                <Select defaultValue="poland-warszawa">
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="poland-warszawa">
                      Poland, Warszawa
                    </SelectItem>
                    <SelectItem value="usa-newyork">USA, New York</SelectItem>
                    <SelectItem value="uk-london">UK, London</SelectItem>
                    <SelectItem value="germany-berlin">
                      Germany, Berlin
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget" className="text-sm font-medium">
                  OFFERED SALARY ($)
                </Label>
                <p className="text-xs text-muted-foreground">(min-max)</p>
                <Select defaultValue="8000-10000">
                  <SelectTrigger id="budget">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5000-8000">5 000 - 8 000</SelectItem>
                    <SelectItem value="8000-10000">8 000 - 10 000</SelectItem>
                    <SelectItem value="10000-15000">10 000 - 15 000</SelectItem>
                    <SelectItem value="15000-25000">15 000 - 25 000</SelectItem>
                    <SelectItem value="25000+">25 000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="level" className="text-sm font-medium">
                  LEVEL
                </Label>
                <p className="text-xs text-muted-foreground">
                  (Junior, Regular, Senior)
                </p>
                <Select defaultValue="senior">
                  <SelectTrigger id="level">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-type" className="text-sm font-medium">
                  EMPLOYMENT TYPE
                </Label>
                <p className="text-xs text-muted-foreground">
                  (Long/short term...)
                </p>
                <Select defaultValue="long-term">
                  <SelectTrigger id="project-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="long-term">Long term</SelectItem>
                    <SelectItem value="short-term">Short term</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            {/* Second Row of Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 items-end">
              <div className="space-y-2">
                <Label htmlFor="company-size" className="text-sm font-medium">
                  COMPANY SIZE
                </Label>
                <Select defaultValue="small-5-10">
                  <SelectTrigger id="company-size">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="startup-1-5">Startup (1-5)</SelectItem>
                    <SelectItem value="small-5-10">Small (5-10)</SelectItem>
                    <SelectItem value="medium-11-50">Medium (11-50)</SelectItem>
                    <SelectItem value="large-50-200">Large (50-200)</SelectItem>
                    <SelectItem value="enterprise-200+">
                      Enterprise (200+)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability" className="text-sm font-medium">
                  AVAILABILITY
                </Label>
                <Select defaultValue="full-time">
                  <SelectTrigger id="availability">
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full time</SelectItem>
                    <SelectItem value="part-time">Part time</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="remote-only"
                  checked={remoteOnly}
                  onCheckedChange={setRemoteOnly}
                />
                <Label htmlFor="remote-only" className="text-sm font-medium">
                  REMOTE ONLY
                </Label>
              </div>

              <Button className="w-full">Search Jobs</Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-muted-foreground">
            We found 25 jobs available for you:
          </p>
          <div className="flex items-center space-x-2">
            <Label htmlFor="sort-by" className="text-sm text-muted-foreground">
              Sort by:
            </Label>
            <Select defaultValue="date">
              <SelectTrigger id="sort-by" className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date of publication</SelectItem>
                <SelectItem value="salary-high">
                  Salary (High to Low)
                </SelectItem>
                <SelectItem value="salary-low">Salary (Low to High)</SelectItem>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="company">Company Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {jobListings.map((job) => (
            <Card
              key={job.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-end md:items-start gap-4">
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-semibold">{job.title}</h3>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{job.type}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="text-right space-y-3">
                    <div className="flex items-center justify-end space-x-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xl font-semibold">
                        {job.salary}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {job.period}
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button>Apply</Button>
                      <Button variant="outline" onClick={() => viewDetails(job.id)}>View Details</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-center items-center space-x-1">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button size="sm" className="h-8 w-8 p-0">
                1
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                2
              </Button>
              <span className="px-2 text-muted-foreground">...</span>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                20
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                21
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                Last
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
