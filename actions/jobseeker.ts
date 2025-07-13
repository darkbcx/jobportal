"use server";
import applicationsData from "@/data/mock-application.json";
import jobseekers from "@/data/mock-jobseeker-1.json";
import { Application, applicationFilter, JobSeeker } from "@/lib/types";

export async function getJobSeekerByUserId(
  id: string
): Promise<JobSeeker | undefined> {
  const js = jobseekers.find(
    (jobseeker) => jobseeker.user_id === id
  ) as unknown as JobSeeker | undefined;
  return js;
}

export async function getJobSeekerApplications(
  jobSeekerId: string,
  filter: applicationFilter = {}
): Promise<Application[]> {
  const applications = applicationsData.filter((application) => {
    if (application.job_seeker_id !== jobSeekerId) {
      return false;
    }
    if (filter.status) {
      return application.status === filter.status;
    }
    return true;
  }) as unknown as Application[];
  return applications;
}