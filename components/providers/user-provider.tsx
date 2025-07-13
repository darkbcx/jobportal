"use client"

import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Admin, Employer, JobSeeker, User } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'
import { getJobSeekerByUserId } from '@/actions/jobseeker'
import { getEmployerByUserId } from '@/actions/employer'

interface UserContextType {
  user: User | null
  profile: JobSeeker | Employer | Admin | null
  updateProfile: () => Promise<void>
  isLoading: boolean
  error: string | null
}

const UserContext = createContext<UserContextType | null>(null)

interface UserProviderProps {
  children: ReactNode
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }: UserProviderProps) => {
  // const queryClient = useQueryClient()
  const { data: session, status:authStatus } = useSession()

  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { data: profile, isLoading: profileLoading, error: profileError } = useQuery({
    queryKey: ['logged-in-user-profile', user?.id],
    queryFn: async () => {
      if(user) {
        switch(user.user_type) {
          case 'JOB_SEEKER':
            return getJobSeekerByUserId(user.id)
          case 'EMPLOYER':
            return getEmployerByUserId(user.id)
          case 'ADMIN':
            return null
          default:
            return null
        }
      }
    },
    enabled: !!user?.id,
  })

  const updateProfile = async () => {
    console.log('updateProfile')
  }

  useEffect(() => {
    if(authStatus === 'loading') {
      setIsLoading(true);
      return;
    }

    if(authStatus === 'unauthenticated') {
      setUser(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    if (session?.user) {
      setUser({...session.user, password_hash: ''});
      setIsLoading(false);
      setError(null);
      return;
    }

  }, [session, authStatus])

  // Separate effect to handle profile errors
  useEffect(() => {
    if(profileError) {
      setError(profileError.message);
      setIsLoading(false);
    }
  }, [profileError])

  // Update loading state based on profile loading
  useEffect(() => {
    if (user && profileLoading) {
      setIsLoading(true);
    } else if (user && !profileLoading) {
      setIsLoading(false);
    }
  }, [user, profileLoading])

  const contextValue: UserContextType = {
    user,
    profile: profile as JobSeeker | Employer | Admin | null,
    updateProfile,
    isLoading,
    error
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}