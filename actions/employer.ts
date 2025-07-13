"use server";
import employers from "@/data/mock-employer-1.json";
import { Employer, JobPosting } from "@/lib/types";
import jobPostingsData from "@/data/mock-jobposting-1.json";

export async function getEmployerByUserId(
  id: string
): Promise<Employer | undefined> {
  const emp = employers.find(
    (employer) => employer.user_id === id
  ) as unknown as Employer | undefined;
  return emp;
} 

export async function getEmployerJobPostings( 
  employerId: string,
): Promise<JobPosting[]> {
  const jobPostings = jobPostingsData.filter((jobPosting) => {
    if (jobPosting.employer_id !== employerId) {  
      return false;
    }
    return true;
  }) as unknown as JobPosting[];
  return jobPostings;
  }