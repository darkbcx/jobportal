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
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import JobListItem from "./job-list-item";
import { useJobPostings } from "@/lib/hooks/use-queries";

type JobSearchProps = {
  viewDetails: (id: string) => void;
};

export default function JobSearch({ viewDetails }: JobSearchProps) {
  const [remoteOnly, setRemoteOnly] = useState(true);
  
  // Use TanStack Query to fetch jobs
  const { data: jobs = [], isLoading, error } = useJobPostings({
    remoteOnly,
    limit: 10
  });

  return (
    <div className="min-h-screen">
      <div className="mx-auto container space-y-6">
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
                  <SelectTrigger className="w-full" id="job-title">
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
                  <SelectTrigger className="w-full" id="location">
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
                  <SelectTrigger className="w-full" id="budget">
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
                  <SelectTrigger className="w-full" id="level">
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
                  <SelectTrigger className="w-full" id="project-type">
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
                  <SelectTrigger className="w-full" id="company-size">
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
                  <SelectTrigger className="w-full" id="availability">
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
          {isLoading ? (
            <div className="text-center py-8">
              <div className="text-muted-foreground">Loading jobs...</div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="text-destructive">Error loading jobs. Please try again.</div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-muted-foreground">No jobs found matching your criteria.</div>
            </div>
          ) : (
            jobs.map((job) => (
              <JobListItem key={job.id} job={job} viewDetails={viewDetails} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
