"use client";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../ui/sheet";
import JobDetails from "../job-detail";

type JobDetailSheetProps = {
  jobId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function JobDetailSheet({
  jobId,
  open,
  onOpenChange,
}: JobDetailSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange} >
      <SheetContent className="!max-w-none w-full lg:w-[800px]">
        <SheetHeader>
          <SheetTitle>
            Job Details
          </SheetTitle>
          <SheetDescription>
            View detailed information about the selected job posting.
          </SheetDescription>
        </SheetHeader>
        <div className="w-full h-full overflow-y-auto px-4 pb-4">
          {jobId ? (
            <JobDetails jobId={jobId} />
          ) : (
            <div>No job selected</div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
