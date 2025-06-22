"use client";

import { useState, useEffect } from "react";
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
import { getJobPosting } from "@/actions/jobposting";
import { JobPosting } from "@/lib/types";
import { useUser } from "@/lib/contexts/UserContext";

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
  jobId: string;
}

export default function JobDetails({ jobId }: JobDetailsProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [jobPosting, setJobPosting] = useState<JobPosting | null>(null);
  const [loading, setLoading] = useState(true);
  const { state: { user } } = useUser();

  useEffect(() => {
    const fetchJobPosting = async () => {
      try {
        const job = await getJobPosting(jobId);
        setJobPosting(job);
      } catch (error) {
        console.error("Error fetching job posting:", error);
      } finally {
        setLoading(false);
      }
    };
    if (jobId) {
      fetchJobPosting();
    }
  }, [jobId]);

  const formatSalary = (jobPosting: JobPosting) => {
    if (!jobPosting.salary_min || !jobPosting.salary_max) {
      return "Salary not specified";
    }
    return `$${jobPosting.salary_min.toLocaleString()} - $${jobPosting.salary_max.toLocaleString()} ${
      jobPosting.salary_currency || "USD"
    } annually`;
  };

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString("en-US", {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading job details...</div>
      </div>
    );
  }

  if (!jobPosting) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Job not found</div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <Card className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-start space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage
                  src={jobPosting.employer?.logo_url || "/placeholder.svg"}
                  alt={jobPosting.employer?.company_name || "Company"}
                />
                <AvatarFallback>
                  {jobPosting.employer?.company_name?.slice(0, 2) || "CO"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {jobPosting.title}
                </h1>
                <p className="text-xl text-muted-foreground mb-4">
                  {jobPosting.employer?.company_name}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{jobPosting.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{jobPosting.employment_type.replace('_', ' ')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{formatSalary(jobPosting)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{jobPosting.application_count} applicants</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Posted {formatDate(jobPosting.published_at || jobPosting.created_at)}</span>
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
            <Badge variant="secondary">{jobPosting.experience_level}</Badge>
            {jobPosting.is_remote && <Badge variant="secondary">Remote</Badge>}
            {jobPosting.application_deadline && (
              <Badge variant="outline">
                Deadline: {formatDate(jobPosting.application_deadline)}
              </Badge>
            )}
          </div>

          {!showApplicationForm && user?.user_type === 'JOB_SEEKER' && (
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
                jobPosting={jobPosting}
                handleSubmitApplication={applySubmit}
                cancelSubmitApplication={() => setShowApplicationForm(false)}
              />
            </CardContent>
          </Card>
        )}

        {/* Skills */}
        {jobPosting.required_skills && jobPosting.required_skills.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Required Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {jobPosting.required_skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <Card>
          <CardContent className="px-6">
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
                    {jobPosting.description}
                  </p>

                  {jobPosting.responsibilities && (
                    <>
                      <h4 className="font-semibold mb-3">Key Responsibilities:</h4>
                      <ul className="space-y-2">
                        {jobPosting.responsibilities.split('\n').map((responsibility, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {responsibility.trim()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </AccordionContent>
              </AccordionItem>

              {jobPosting.requirements && (
                <AccordionItem value="requirements">
                  <AccordionTrigger className="text-lg font-semibold">
                    Requirements & Qualifications
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <ul className="space-y-3">
                      {jobPosting.requirements.split('\n').map((requirement, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            {requirement.trim()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}

              {jobPosting.employer && (
                <AccordionItem value="company">
                  <AccordionTrigger className="text-lg font-semibold">
                    About {jobPosting.employer.company_name}
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {jobPosting.employer.company_description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <span>Industry: {jobPosting.employer.industry}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>Size: {jobPosting.employer.company_size}</span>
                      </div>
                      {jobPosting.employer.founded_year && (
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>Founded: {jobPosting.employer.founded_year}</span>
                        </div>
                      )}
                      {jobPosting.employer.website && (
                        <div className="flex items-center space-x-2">
                          <Globe className="w-4 h-4 text-muted-foreground" />
                          <span>Website: {jobPosting.employer.website}</span>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {jobPosting.employer?.benefits && jobPosting.employer.benefits.length > 0 && (
                <AccordionItem value="benefits">
                  <AccordionTrigger className="text-lg font-semibold">
                    Benefits & Perks
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {jobPosting.employer.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
