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
  Share2,
  Building,
  Globe,
  Mail,
  CheckCircle,
  Star,
} from "lucide-react";
import JobApplyDialog from "./job-apply-dialog";

interface JobDetails {
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

const mockJobDetails: JobDetails = {
  id: "1",
  title: "Senior Frontend Developer",
  company: {
    name: "TechCorp Solutions",
    logo: "/placeholder.svg?height=80&width=80&text=TC",
    size: "50-200 employees",
    industry: "Technology",
    website: "https://techcorp.com",
    description:
      "TechCorp Solutions is a leading technology company specializing in innovative web solutions and digital transformation services. We help businesses modernize their digital presence and streamline their operations.",
    founded: "2015",
    location: "San Francisco, CA",
  },
  location: "San Francisco, CA",
  workType: "Full-time",
  salary: {
    min: 120000,
    max: 160000,
    currency: "USD",
    period: "annually",
  },
  postedDate: "2024-01-15",
  deadline: "2024-02-15",
  description:
    "We are looking for a talented Senior Frontend Developer to join our dynamic team. You will be responsible for developing user-facing features, ensuring the technical feasibility of UI/UX designs, and optimizing applications for maximum speed and scalability.",
  requirements: [
    "Bachelor's degree in Computer Science or related field",
    "5+ years of experience in frontend development",
    "Expert knowledge of React.js and its ecosystem",
    "Strong proficiency in TypeScript and JavaScript",
    "Experience with modern CSS frameworks (Tailwind CSS, styled-components)",
    "Familiarity with state management libraries (Redux, Zustand)",
    "Experience with testing frameworks (Jest, React Testing Library)",
    "Knowledge of build tools and bundlers (Webpack, Vite)",
    "Understanding of RESTful APIs and GraphQL",
  ],
  responsibilities: [
    "Develop and maintain high-quality frontend applications",
    "Collaborate with designers to implement pixel-perfect UI components",
    "Write clean, maintainable, and well-documented code",
    "Optimize applications for performance and accessibility",
    "Participate in code reviews and mentor junior developers",
    "Stay up-to-date with the latest frontend technologies and best practices",
    "Work closely with backend developers to integrate APIs",
    "Contribute to the overall architecture and technical decisions",
  ],
  skills: [
    "React.js",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
    "GraphQL",
    "Jest",
    "Git",
    "Figma",
  ],
  benefits: [
    "Competitive salary and equity package",
    "Comprehensive health, dental, and vision insurance",
    "Flexible working hours and remote work options",
    "Professional development budget ($2,000/year)",
    "Unlimited PTO policy",
    "Modern office with free meals and snacks",
    "Gym membership reimbursement",
    "Latest MacBook Pro and equipment",
  ],
  level: "Senior",
  remote: true,
  applicants: 47,
};

const relatedJobs = [
  {
    id: "2",
    title: "React Developer",
    company: "StartupXYZ",
    location: "Remote",
    salary: "$90k - $120k",
    logo: "/placeholder.svg?height=40&width=40&text=SX",
  },
  {
    id: "3",
    title: "Full Stack Developer",
    company: "InnovateTech",
    location: "New York, NY",
    salary: "$110k - $140k",
    logo: "/placeholder.svg?height=40&width=40&text=IT",
  },
  {
    id: "4",
    title: "Frontend Engineer",
    company: "WebFlow Inc",
    location: "Austin, TX",
    salary: "$100k - $130k",
    logo: "/placeholder.svg?height=40&width=40&text=WF",
  },
];

export default function JobDetails() {
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

  // const handleSubmitApplication = (data: ApplicationForm) => {
  //   // e.preventDefault();
  //   // Here you would typically send the application data to your backend
  //   console.log("Application submitted:", data);
  //   setHasApplied(true);
  //   setShowApplicationForm(false);
  // };
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
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
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

          <div className="flex space-x-4">
            <Button
              size="lg"
              className="px-8"
              onClick={handleApplyClick}
              disabled={hasApplied}
            >
              {hasApplied ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Applied
                </>
              ) : (
                "Apply Now"
              )}
            </Button>
            <Button variant="outline" size="lg">
              <Mail className="w-4 h-4 mr-2" />
              Contact Recruiter
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
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

                      <h4 className="font-semibold mb-3">
                        Key Responsibilities:
                      </h4>
                      <ul className="space-y-2">
                        {mockJobDetails.responsibilities.map(
                          (responsibility, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2"
                            >
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
                        {mockJobDetails.requirements.map(
                          (requirement, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">
                                {requirement}
                              </span>
                            </li>
                          )
                        )}
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
                          <span>
                            Industry: {mockJobDetails.company.industry}
                          </span>
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
                          <div
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
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

            {/* Quick Apply */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Apply</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  <p>Application deadline:</p>
                  <p className="font-semibold text-foreground">
                    {formatDate(mockJobDetails.deadline)}
                  </p>
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleApplyClick}
                  disabled={hasApplied}
                >
                  {hasApplied ? "Application Submitted" : "Apply Now"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  By applying, you agree to our terms and conditions
                </p>
              </CardContent>
            </Card>

            {/* Related Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={job.logo || "/placeholder.svg"}
                        alt={job.company}
                      />
                      <AvatarFallback>{job.company.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">
                        {job.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {job.company}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {job.location}
                      </p>
                      <p className="text-xs font-medium text-green-600">
                        {job.salary}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      <JobApplyDialog
        open={showApplicationForm}
        onClose={() => setShowApplicationForm(false)}
        handleSubmitApplication={applySubmit}
        mockJobDetails={mockJobDetails}
      />
    </>
  );
}
