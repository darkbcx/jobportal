'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  useJobPostings, 
  useJobPosting, 
  useInfiniteJobPostings,
  useApplyToJob,
  useToggleJobSave,
  usePrefetchJob,
  queryKeys 
} from "@/lib/hooks/use-queries"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"

export default function QueryExamples() {
  const [selectedJobId, setSelectedJobId] = useState<string>("")
  const queryClient = useQueryClient()
  const prefetchJob = usePrefetchJob()

  // Example 1: Basic query with filters
  const { 
    data: jobs, 
    isLoading: jobsLoading, 
    error: jobsError,
    refetch: refetchJobs 
  } = useJobPostings({ 
    remoteOnly: true, 
    limit: 5 
  })

  // Example 2: Infinite query for pagination
  const {
    data: infiniteJobs,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: infiniteLoading
  } = useInfiniteJobPostings({ 
    remoteOnly: false, 
    limit: 3 
  })

  // Example 3: Single job query (only runs when selectedJobId is set)
  const { 
    data: selectedJob, 
    isLoading: jobLoading 
  } = useJobPosting(selectedJobId)

  // Example 4: Mutation for applying to jobs
  const applyMutation = useApplyToJob()

  // Example 5: Mutation for saving/unsaving jobs
  const saveMutation = useToggleJobSave()

  const handleApply = async (jobId: string) => {
    try {
      await applyMutation.mutateAsync({
        jobId,
        applicationData: {
          coverLetter: "I'm excited to apply for this position!",
          resume: undefined
        }
      })
      toast.success("Application submitted successfully!")
    } catch {
      toast.error("Failed to submit application")
    }
  }

  const handleSaveJob = async (jobId: string, isSaved: boolean) => {
    try {
      await saveMutation.mutateAsync({ jobId, isSaved })
      toast.success(isSaved ? "Job unsaved" : "Job saved!")
    } catch {
      toast.error("Failed to save job")
    }
  }

  const handlePrefetch = (jobId: string) => {
    prefetchJob(jobId)
    toast.info("Job details prefetched!")
  }

  const handleInvalidateCache = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.jobs.all })
    toast.success("Cache invalidated!")
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">TanStack Query Examples</h1>

      {/* Basic Query Example */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Basic Query Example
            <Button onClick={() => refetchJobs()} disabled={jobsLoading}>
              Refetch
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {jobsLoading ? (
            <div>Loading jobs...</div>
          ) : jobsError ? (
            <div className="text-destructive">Error: {jobsError.message}</div>
          ) : (
            <div className="space-y-2">
              {jobs?.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <h3 className="font-medium">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.employer?.company_name}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => setSelectedJobId(job.id)}
                      onMouseEnter={() => handlePrefetch(job.id)}
                    >
                      View Details
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleSaveJob(job.id, false)}
                    >
                      Save
                    </Button>
                    <Button 
                      size="sm" 
                      variant="secondary"
                      onClick={() => handleApply(job.id)}
                      disabled={applyMutation.isPending}
                    >
                      {applyMutation.isPending ? "Applying..." : "Apply"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Infinite Query Example */}
      <Card>
        <CardHeader>
          <CardTitle>Infinite Query Example</CardTitle>
        </CardHeader>
        <CardContent>
          {infiniteLoading ? (
            <div>Loading infinite jobs...</div>
          ) : (
            <div className="space-y-4">
              {infiniteJobs?.pages.map((page, pageIndex) => (
                <div key={pageIndex} className="space-y-2">
                  <h3 className="font-medium">Page {pageIndex + 1}</h3>
                  {page.map((job) => (
                    <div key={job.id} className="p-2 border rounded">
                      <h4 className="font-medium">{job.title}</h4>
                      <p className="text-sm text-muted-foreground">{job.employer?.company_name}</p>
                    </div>
                  ))}
                </div>
              ))}
              
              {hasNextPage && (
                <Button 
                  onClick={() => fetchNextPage()} 
                  disabled={isFetchingNextPage}
                  className="w-full"
                >
                  {isFetchingNextPage ? "Loading more..." : "Load More"}
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Single Job Query Example */}
      {selectedJobId && (
        <Card>
          <CardHeader>
            <CardTitle>Selected Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            {jobLoading ? (
              <div>Loading job details...</div>
            ) : selectedJob ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">{selectedJob.title}</h3>
                  <p className="text-muted-foreground">{selectedJob.employer?.company_name}</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">{selectedJob.employment_type}</Badge>
                  <Badge variant="outline">{selectedJob.experience_level}</Badge>
                  {selectedJob.is_remote && <Badge variant="default">Remote</Badge>}
                </div>
                <p className="text-sm">{selectedJob.description}</p>
              </div>
            ) : (
              <div>Job not found</div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Cache Management Example */}
      <Card>
        <CardHeader>
          <CardTitle>Cache Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleInvalidateCache} className="w-full">
            Invalidate All Job Cache
          </Button>
          
          <div className="text-sm text-muted-foreground">
            <p>• Hover over &quot;View Details&quot; buttons to prefetch job data</p>
            <p>• Click &quot;Refetch&quot; to manually refresh the basic query</p>
            <p>• Click &quot;Invalidate Cache&quot; to clear all job-related cache</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 