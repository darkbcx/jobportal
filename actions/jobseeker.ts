import jobseekers from "@/data/mock-jobseeker-1.json";
import { JobSeeker } from "@/lib/types";

export async function getJobSeekerByUserId(
  id: string
): Promise<JobSeeker | undefined> {
  const js = jobseekers.find(
    (jobseeker) => jobseeker.user_id === id
  ) as unknown as JobSeeker | undefined;
  return js;
}
