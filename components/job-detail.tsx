"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  Calendar,
  Heart,
  Building,
  Globe,
  CheckCircle,
  Star,
} from "lucide-react";
import JobApplyForm from "./forms/job-apply-form";

export interface JobDetails {
  id: string;
  title: string;
  company: {
    name: string;
    logo: string;
    size: string;
    industry: string;
    website: string;
    description: string;
    founded: string;
    location: string;
  };
  location: string;
  workType: string;
  salary: {
    min: number;
    max: number;
    currency: string;
    period: string;
  };
  postedDate: string;
  deadline: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  benefits: string[];
  level: string;
  remote: boolean;
  applicants: number;
}

// interface ApplicationForm {
//   fullName: string;
//   email: string;
//   phone: string;
//   preferredSalary: string;
//   salaryPeriod: string;
//   coverLetter: string;
//   resume: File | null;
// }

interface JobDetailsProps {
  mockJobDetails: JobDetails;
}

export default function JobDetails({ mockJobDetails }: JobDetailsProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const formatSalary = (salary: JobDetails["salary"]) => {
    return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()} ${
      salary.currency
    } ${salary.period}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const applySubmit = () => {
    console.log("applySubmit");
    // Mark as applied and close the dialog
    setHasApplied(true);
    setShowApplicationForm(false);
  };

  const handleApplyClick = () => {
    if (hasApplied) return;
    console.log("handleApplyClick");
    setShowApplicationForm(true);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <Card className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-start space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage
                  src={mockJobDetails.company.logo || "/placeholder.svg"}
                  alt={mockJobDetails.company.name}
                />
                <AvatarFallback>
                  {mockJobDetails.company.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {mockJobDetails.title}
                </h1>
                <p className="text-xl text-muted-foreground mb-4">
                  {mockJobDetails.company.name}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{mockJobDetails.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{mockJobDetails.workType}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{formatSalary(mockJobDetails.salary)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{mockJobDetails.applicants} applicants</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Posted {formatDate(mockJobDetails.postedDate)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSaved(!isSaved)}
                className={isSaved ? "text-red-600 border-red-600" : ""}
              >
                <Heart
                  className={`w-4 h-4 mr-2 ${isSaved ? "fill-current" : ""}`}
                />
                {isSaved ? "Saved" : "Save"}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary">{mockJobDetails.level}</Badge>
            {mockJobDetails.remote && <Badge variant="secondary">Remote</Badge>}
            <Badge variant="outline">
              Deadline: {formatDate(mockJobDetails.deadline)}
            </Badge>
          </div>

          {!showApplicationForm && (
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="px-8"
                onClick={handleApplyClick}
                disabled={hasApplied}
              >
                {hasApplied ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Application Submitted
                  </>
                ) : (
                  "Apply Now"
                )}
              </Button>
              <Button variant="outline" size="lg">
                <Building className="w-4 h-4 mr-2" />
                View Company Details
              </Button>
            </div>
          )}
        </Card>

        {showApplicationForm && (
          <Card>
            <CardHeader>
              <CardTitle>Application Form</CardTitle>
            </CardHeader>
            <CardContent>
              <JobApplyForm
                mockJobDetails={mockJobDetails}
                handleSubmitApplication={applySubmit}
                cancelSubmitApplication={() => setShowApplicationForm(false)}
              />
            </CardContent>
          </Card>
        )}

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Required Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {mockJobDetails.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card>
          <CardContent className="p-6">
            <Accordion
              type="multiple"
              defaultValue={["description"]}
              className="w-full"
            >
              <AccordionItem value="description">
                <AccordionTrigger className="text-lg font-semibold">
                  Job Description
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {mockJobDetails.description}
                  </p>

                  <h4 className="font-semibold mb-3">Key Responsibilities:</h4>
                  <ul className="space-y-2">
                    {mockJobDetails.responsibilities.map(
                      (responsibility, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            {responsibility}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="requirements">
                <AccordionTrigger className="text-lg font-semibold">
                  Requirements & Qualifications
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <ul className="space-y-3">
                    {mockJobDetails.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          {requirement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="company">
                <AccordionTrigger className="text-lg font-semibold">
                  About {mockJobDetails.company.name}
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {mockJobDetails.company.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <span>Industry: {mockJobDetails.company.industry}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>Size: {mockJobDetails.company.size}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Founded: {mockJobDetails.company.founded}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <span>Website: {mockJobDetails.company.website}</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="benefits">
                <AccordionTrigger className="text-lg font-semibold">
                  Benefits & Perks
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {mockJobDetails.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
