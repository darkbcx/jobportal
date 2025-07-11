"use server";

import job_postings from "@/data/mock-jobposting-1.json";
import employers from "@/data/mock-employer-1.json";
import {
  Employer,
  JobPosting,
  EmploymentType,
  ExperienceLevel,
  RemoteType,
  JobPostingStatus,
  listParams,
} from "@/lib/types";
import job_posting_skills from "@/data/mock-jobposting-skill-1.json";
import skillData from "@/data/mock-skills.json";

export async function listJobPostings(
  params?: listParams
): Promise<JobPosting[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const { offset = 0, limit = 10 } = params ?? { offset: 0, limit: 10 };
  return job_postings
    .slice(offset, offset + limit)
    .map((jobPosting) => {
      const employer = employers.find(
        (employer) => employer.id === jobPosting.employer_id
      ) as Employer | undefined;

      const required_skills = job_posting_skills
        .filter((s) => s.job_posting_id === jobPosting.id)
        .map((jobPostingSkill) => {
          const skill = skillData.skills.find(
            (s) => s.id === jobPostingSkill.skill_id
          );
          return skill?.name;
        })
        .filter((skill): skill is string => skill !== undefined) as string[];

      return {
        ...jobPosting,
        employment_type: jobPosting.employment_type as EmploymentType,
        experience_level: jobPosting.experience_level as ExperienceLevel,
        remote_type: jobPosting.remote_type as RemoteType,
        status: jobPosting.status as JobPostingStatus,
        expires_at: jobPosting.expires_at
          ? new Date(jobPosting.expires_at)
          : undefined,
        application_deadline: jobPosting.application_deadline
          ? new Date(jobPosting.application_deadline)
          : undefined,
        published_at: jobPosting.published_at
          ? new Date(jobPosting.published_at)
          : undefined,
        archived_at: jobPosting.archived_at
          ? new Date(jobPosting.archived_at)
          : undefined,
        created_at: new Date(jobPosting.created_at),
        updated_at: new Date(jobPosting.updated_at),
        employer: employer,
        required_skills: required_skills,
      };
    });
}

export async function getJobPosting(id: string): Promise<JobPosting> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const jobPosting = job_postings.find(
    (jobPosting) => jobPosting.id === id
  ) as unknown as JobPosting;
  const employer = employers.find(
    (employer) => employer.id === jobPosting.employer_id
  ) as Employer | undefined;
  const required_skills = job_posting_skills
    .filter((s) => s.job_posting_id === jobPosting.id)
    .map((jobPostingSkill) => {
      const skill = skillData.skills.find(
        (s) => s.id === jobPostingSkill.skill_id
      );
      return skill?.name;
    })
    .filter((skill): skill is string => skill !== undefined) as string[];

  return {
    ...jobPosting,
    employment_type: jobPosting.employment_type as EmploymentType,
    experience_level: jobPosting.experience_level as ExperienceLevel,
    remote_type: jobPosting.remote_type as RemoteType,
    expires_at: jobPosting.expires_at
      ? new Date(jobPosting.expires_at)
      : undefined,
    application_deadline: jobPosting.application_deadline
      ? new Date(jobPosting.application_deadline)
      : undefined,
    published_at: jobPosting.published_at
      ? new Date(jobPosting.published_at)
      : undefined,
    archived_at: jobPosting.archived_at
      ? new Date(jobPosting.archived_at)
      : undefined,
    created_at: new Date(jobPosting.created_at),
    updated_at: new Date(jobPosting.updated_at),
    employer: employer,
    required_skills: required_skills,
  };
}
