import JobDetail from "@/components/job-detail";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);

  return (
    <div className="flex flex-col">
      <div>
        <div className="container mx-auto flex flex-col gap-4 py-8 px-4">
          <span className="text-2xl md:text-3xl font-bold">
            Job Detail
          </span>
          <JobDetail />
        </div>
      </div>
    </div>
  );
}
