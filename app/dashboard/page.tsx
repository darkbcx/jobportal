'use client';

import { useUser } from '@/lib/contexts/UserContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut, User, Building, Briefcase } from 'lucide-react';

export default function DashboardPage() {
  const { state: { user, isAuthenticated }, logout } = useUser();

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

  const getUserIcon = () => {
    switch (user.user_type) {
      case 'JOB_SEEKER':
        return <User className="h-6 w-6" />;
      case 'EMPLOYER':
        return <Building className="h-6 w-6" />;
      case 'ADMIN':
        return <Briefcase className="h-6 w-6" />;
      default:
        return <User className="h-6 w-6" />;
    }
  };

  const getUserTypeLabel = () => {
    switch (user.user_type) {
      case 'JOB_SEEKER':
        return 'Job Seeker';
      case 'EMPLOYER':
        return 'Employer';
      case 'ADMIN':
        return 'Administrator';
      default:
        return 'User';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back to your account</p>
            </div>
            <Button onClick={logout} variant="outline" className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* User Info Card */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              {getUserIcon()}
              <div>
                <CardTitle className="text-lg">Account Info</CardTitle>
                <CardDescription>{getUserTypeLabel()}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-500">Email:</span>
                  <p className="text-sm">{user.email}</p>
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

          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {user.user_type === 'JOB_SEEKER' && (
                  <>
                    <Button variant="outline" className="w-full justify-start">
                      <Briefcase className="h-4 w-4 mr-2" />
                      Browse Jobs
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <User className="h-4 w-4 mr-2" />
                      Update Profile
                    </Button>
                  </>
                )}
                {user.user_type === 'EMPLOYER' && (
                  <>
                    <Button variant="outline" className="w-full justify-start">
                      <Briefcase className="h-4 w-4 mr-2" />
                      Post Job
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <User className="h-4 w-4 mr-2" />
                      View Applications
                    </Button>
                  </>
                )}
                {user.user_type === 'ADMIN' && (
                  <>
                    <Button variant="outline" className="w-full justify-start">
                      <Building className="h-4 w-4 mr-2" />
                      Manage Users
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Briefcase className="h-4 w-4 mr-2" />
                      Manage Jobs
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Session Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Session Info</CardTitle>
              <CardDescription>Your current session details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-500">Login Time:</span>
                  <p className="text-sm">{new Date().toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Session Type:</span>
                  <p className="text-sm">Cookie-based</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Security:</span>
                  <p className="text-sm">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      HttpOnly Cookie
                    </span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 