"use client";

import JobSearch from "@/components/job-search";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const viewDetails = (id: number) => {
    router.push(`/job/${id}`);
  };
  return (
    <div className="flex flex-col">
      <div>
        <div className="container mx-auto flex flex-col gap-4 py-8 px-4">
          <span className="text-2xl md:text-3xl font-bold">
            Find your dream job with ease and speed
          </span>
          <JobSearch viewDetails={viewDetails} />
        </div>
      </div>
    </div>
  );
}
