import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { listJobPostings, getJobPosting } from '@/actions/jobposting'
import { listParams } from '@/lib/types'

// Types for filters and application data
interface JobFilters extends listParams {
  remoteOnly?: boolean
  location?: string
  jobType?: string
  experienceLevel?: string
  saved?: boolean
}

interface ApplicationData {
  coverLetter?: string
  resume?: File
  [key: string]: unknown
}

// Query keys for consistent cache management
export const queryKeys = {
  jobs: {
    all: ['jobs'] as const,
    lists: () => [...queryKeys.jobs.all, 'list'] as const,
    list: (filters: JobFilters) => [...queryKeys.jobs.lists(), filters] as const,
    details: () => [...queryKeys.jobs.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.jobs.details(), id] as const,
  },
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
  },
  applications: {
    all: ['applications'] as const,
    lists: () => [...queryKeys.applications.all, 'list'] as const,
    list: (filters: JobFilters) => [...queryKeys.applications.lists(), filters] as const,
    details: () => [...queryKeys.applications.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.applications.details(), id] as const,
  },
} as const

// Hook for fetching job postings with filters
export function useJobPostings(filters: JobFilters = {}) {
  return useQuery({
    queryKey: queryKeys.jobs.list(filters),
    queryFn: () => listJobPostings(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

// Hook for infinite job postings (for pagination)
export function useInfiniteJobPostings(filters: JobFilters = {}) {
  return useInfiniteQuery({
    queryKey: queryKeys.jobs.list(filters),
    queryFn: ({ pageParam = 1 }) => listJobPostings({ 
      ...filters, 
      offset: (pageParam - 1) * (filters.limit || 10),
      limit: filters.limit || 10 
    }),
    getNextPageParam: (lastPage, allPages) => {
      // Assuming the API returns pagination info
      // Adjust this based on your actual API response structure
      return lastPage.length === (filters.limit || 10) ? allPages.length + 1 : undefined
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

// Hook for fetching a single job posting
export function useJobPosting(id: string) {
  return useQuery({
    queryKey: queryKeys.jobs.detail(id),
    queryFn: () => getJobPosting(id),
    enabled: !!id, // Only run query if id is provided
    staleTime: 1000 * 60 * 10, // 10 minutes for individual jobs
  })
}

// Generic mutation hook for job applications
export function useApplyToJob() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ jobId, applicationData }: { jobId: string; applicationData: ApplicationData }) => {
      // Replace with your actual application API call
      const response = await fetch(`/api/jobs/${jobId}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to apply to job')
      }
      
      return response.json()
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch job details to update application status
      queryClient.invalidateQueries({
        queryKey: queryKeys.jobs.detail(variables.jobId),
      })
      
      // Invalidate applications list if user is viewing their applications
      queryClient.invalidateQueries({
        queryKey: queryKeys.applications.lists(),
      })
    },
  })
}

// Generic mutation hook for saving/unsaving jobs
export function useToggleJobSave() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ jobId, isSaved }: { jobId: string; isSaved: boolean }) => {
      const method = isSaved ? 'DELETE' : 'POST'
      const response = await fetch(`/api/jobs/${jobId}/save`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`Failed to ${isSaved ? 'unsave' : 'save'} job`)
      }
      
      return response.json()
    },
    onSuccess: (data, variables) => {
      // Invalidate job details to update save status
      queryClient.invalidateQueries({
        queryKey: queryKeys.jobs.detail(variables.jobId),
      })
      
      // Invalidate saved jobs list if user is viewing saved jobs
      queryClient.invalidateQueries({
        queryKey: queryKeys.jobs.list({ saved: true }),
      })
    },
  })
}

// Hook for prefetching job details (useful for hover states or preloading)
export function usePrefetchJob() {
  const queryClient = useQueryClient()
  
  return (jobId: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.jobs.detail(jobId),
      queryFn: () => getJobPosting(jobId),
      staleTime: 1000 * 60 * 10, // 10 minutes
    })
  }
} 