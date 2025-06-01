"use client";

import JobSearch from "@/components/job-search";
import JobDetailSheet from "@/components/sheets/job-detail-sheet";
import { useState } from "react";

export default function HomePage() {
  const [detailSheetOpen, setDetailSheetOpen] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);

  const viewDetails = (id: string) => {
    setJobId(id);
    setDetailSheetOpen(true);
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
      <JobDetailSheet
        jobId={jobId ?? ""}
        open={detailSheetOpen}
        onOpenChange={setDetailSheetOpen}
      />
    </div>
  );
}
