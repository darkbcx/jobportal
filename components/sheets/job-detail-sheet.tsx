"use client";
import { useEffect } from "react";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import JobDetail, { JobDetails } from "../job-detail";

type JobDetailSheetProps = {
  jobId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

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

export default function JobDetailSheet({
  jobId,
  open,
  onOpenChange,
}: JobDetailSheetProps) {
  const [job, setJob] = useState<JobDetails | null>(null);

  useEffect(() => {
    setJob(mockJobDetails);
  }, [jobId]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="!max-w-none w-full lg:w-[800px]">
        <SheetHeader>
          <SheetTitle>
            Job Details
          </SheetTitle>
        </SheetHeader>
        <div className="w-full h-full overflow-y-auto px-4 pb-4">
          {job ? (
            <JobDetail mockJobDetails={job} />
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
