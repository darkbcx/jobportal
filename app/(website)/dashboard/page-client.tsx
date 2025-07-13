"use client";

import { useUser } from "@/components/providers/user-provider";
import DashboardEmployer from "./dashboard-em";
import { Employer, JobSeeker } from "@/lib/types";
import DashboardJobSeeker from "./dashboard-js";

export default function DashboardPageClient() {
  const { user, profile } = useUser();

  return (
    <div className="flex flex-col gap-4 p-4">
      {user?.user_type === "EMPLOYER" && <DashboardEmployer employer={profile as Employer | null} />}
      {user?.user_type === "JOB_SEEKER" && <DashboardJobSeeker jobSeeker={profile as JobSeeker | null} />}
    </div>
  );
}