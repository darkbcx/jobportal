'use client';

import { useUser, isJobSeekerProfile, isEmployerProfile } from '@/lib/contexts/UserContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';

export default function TestProfilePage() {
  const { state: { user, isAuthenticated, isLoading, profile }, logout, refreshUser, loadProfile } = useUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Loading User...</CardTitle>
            <CardDescription>Please wait while we load your account information.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You need to be logged in to access this page.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <a href="/login">Go to Login</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Profile Loading Test</h1>
              <p className="text-gray-600">Testing profile loading functionality</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={refreshUser} variant="outline" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh User
              </Button>
              <Button onClick={loadProfile} variant="outline" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Reload Profile
              </Button>
              <Button onClick={logout} variant="outline" className="flex items-center gap-2">
                Logout
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* User Information */}
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>Basic user account details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-500">Email:</span>
                  <p className="text-sm">{user.email}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">User Type:</span>
                  <p className="text-sm capitalize">{user.user_type.replace('_', ' ').toLowerCase()}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">User ID:</span>
                  <p className="text-sm font-mono">{user.id}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Status:</span>
                  <p className="text-sm">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      user.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Profile Information
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              </CardTitle>
              <CardDescription>Detailed profile data loaded after authentication</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : profile ? (
                <div className="space-y-3">
                  {isJobSeekerProfile(profile) && (
                    <>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Name:</span>
                        <p className="text-sm font-medium">{profile.first_name} {profile.last_name}</p>
                      </div>
                      {profile.location && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Location:</span>
                          <p className="text-sm">{profile.location}</p>
                        </div>
                      )}
                      {profile.phone_number && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Phone:</span>
                          <p className="text-sm">{profile.phone_number}</p>
                        </div>
                      )}
                      {profile.bio && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Bio:</span>
                          <p className="text-sm">{profile.bio}</p>
                        </div>
                      )}
                      <div>
                        <span className="text-sm font-medium text-gray-500">Availability:</span>
                        <p className="text-sm capitalize">{profile.availability_status.replace('_', ' ').toLowerCase()}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Profile Visibility:</span>
                        <p className="text-sm capitalize">{profile.profile_visibility.replace('_', ' ').toLowerCase()}</p>
                      </div>
                    </>
                  )}
                  {isEmployerProfile(profile) && (
                    <>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Company:</span>
                        <p className="text-sm font-medium">{profile.company_name}</p>
                      </div>
                      {profile.industry && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Industry:</span>
                          <p className="text-sm">{profile.industry}</p>
                        </div>
                      )}
                      {profile.company_size && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Company Size:</span>
                          <p className="text-sm capitalize">{profile.company_size.replace('_', ' ').toLowerCase()}</p>
                        </div>
                      )}
                      {profile.headquarters_location && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Headquarters:</span>
                          <p className="text-sm">{profile.headquarters_location}</p>
                        </div>
                      )}
                      {profile.website && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Website:</span>
                          <p className="text-sm">{profile.website}</p>
                        </div>
                      )}
                      {profile.company_description && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Description:</span>
                          <p className="text-sm">{profile.company_description}</p>
                        </div>
                      )}
                      <div>
                        <span className="text-sm font-medium text-gray-500">Verified:</span>
                        <p className="text-sm">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            profile.is_verified 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {profile.is_verified ? 'Verified' : 'Not Verified'}
                          </span>
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">No profile information available</p>
                  <p className="text-xs text-gray-400 mt-1">Profile may not be loaded yet or user type not supported</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Debug Information */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Debug Information</CardTitle>
            <CardDescription>Technical details for debugging</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-500">User Loading:</span>
                <p className={isLoading ? 'text-yellow-600' : 'text-green-600'}>
                  {isLoading ? 'Loading...' : 'Complete'}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-500">Profile Loading:</span>
                <p className={isLoading ? 'text-yellow-600' : 'text-green-600'}>
                  {isLoading ? 'Loading...' : 'Complete'}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-500">User Authenticated:</span>
                <p className={isAuthenticated ? 'text-green-600' : 'text-red-600'}>
                  {isAuthenticated ? 'Yes' : 'No'}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-500">Profile Available:</span>
                <p className={profile ? 'text-green-600' : 'text-red-600'}>
                  {profile ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 