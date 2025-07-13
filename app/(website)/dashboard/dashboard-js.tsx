"use client"

import { useState } from "react"
import {
  Bell,
  Bookmark,
  Calendar,
  Eye,
  MapPin,
  MessageSquare,
  Settings,
  User,
  AlertCircle,
  ExternalLink,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JobSeeker } from "@/lib/types"

interface DashboardJobSeekerProps {
  jobSeeker: JobSeeker | null;
}

// Mock data
const userData = {
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  avatar: "/placeholder.svg?height=80&width=80",
  headline: "Senior Frontend Developer",
  profileCompletion: 75,
  location: "San Francisco, CA",
}

const recommendedJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120k - $150k",
    type: "Full-time",
    posted: "2 days ago",
    match: 95,
  },
  {
    id: 2,
    title: "Frontend Engineer",
    company: "StartupXYZ",
    location: "Remote",
    salary: "$100k - $130k",
    type: "Full-time",
    posted: "1 day ago",
    match: 88,
  },
  {
    id: 3,
    title: "UI/UX Developer",
    company: "Design Studio",
    location: "New York, NY",
    salary: "$90k - $120k",
    type: "Contract",
    posted: "3 days ago",
    match: 82,
  },
]

const appliedJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Google",
    appliedDate: "2024-01-10",
    status: "Interview Scheduled",
    statusColor: "bg-blue-500",
  },
  {
    id: 2,
    title: "React Developer",
    company: "Meta",
    appliedDate: "2024-01-08",
    status: "Under Review",
    statusColor: "bg-yellow-500",
  },
  {
    id: 3,
    title: "Full Stack Engineer",
    company: "Netflix",
    appliedDate: "2024-01-05",
    status: "Rejected",
    statusColor: "bg-red-500",
  },
]

const savedJobs = [
  {
    id: 1,
    title: "Lead Developer",
    company: "Apple",
    location: "Cupertino, CA",
    savedDate: "2024-01-12",
  },
  {
    id: 2,
    title: "Software Engineer",
    company: "Microsoft",
    location: "Seattle, WA",
    savedDate: "2024-01-11",
  },
]

const notifications = [
  {
    id: 1,
    type: "interview",
    title: "Interview scheduled with Google",
    message: "Your interview is scheduled for tomorrow at 2 PM",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    type: "message",
    title: "New message from recruiter",
    message: "Sarah from TechCorp wants to connect",
    time: "1 day ago",
    unread: true,
  },
  {
    id: 3,
    type: "update",
    title: "Profile viewed",
    message: "Your profile was viewed by 3 recruiters",
    time: "2 days ago",
    unread: false,
  },
]

const activityStats = {
  jobsApplied: 24,
  jobsSaved: 12,
  jobsViewed: 156,
  profileViews: 89,
  responseRate: 65,
}

export default function DashboardJobSeeker({ jobSeeker }: DashboardJobSeekerProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto p-6 space-y-6">
        {/* Welcome Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                  <AvatarFallback>
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">Welcome back, {userData.name}!</h1>
                  <p className="text-muted-foreground">{userData.headline}</p>
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {userData.location}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium">Profile Completion</span>
                  <span className="text-sm text-muted-foreground">{userData.profileCompletion}%</span>
                </div>
                <Progress value={userData.profileCompletion} className="w-32 mb-2" />
                <Button size="sm" variant="outline">
                  <User className="h-4 w-4 mr-2" />
                  Complete Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Recommended Jobs */}
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recommended Jobs</CardTitle>
                    <CardDescription>Based on your profile and activity</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    See All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendedJobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{job.title}</h3>
                          <Badge variant="secondary">{job.match}% match</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {job.location}
                          </span>
                          <span>{job.salary}</span>
                          <span>{job.type}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button size="sm">Apply</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Activity Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Activity Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Jobs Applied</span>
                    <span className="font-semibold">{activityStats.jobsApplied}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Jobs Saved</span>
                    <span className="font-semibold">{activityStats.jobsSaved}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Jobs Viewed</span>
                    <span className="font-semibold">{activityStats.jobsViewed}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Profile Views</span>
                    <span className="font-semibold">{activityStats.profileViews}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Response Rate</span>
                    <span className="font-semibold">{activityStats.responseRate}%</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Applied Jobs */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Applied Jobs</CardTitle>
                    <CardDescription>Recent applications and their status</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {appliedJobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                        <p className="text-xs text-muted-foreground">Applied {job.appliedDate}</p>
                      </div>
                      <Badge className={`${job.statusColor} text-white`}>{job.status}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Messages & Notifications */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Messages & Notifications</CardTitle>
                    <CardDescription>Recent updates and messages</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Bell className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${notification.unread ? "bg-blue-100" : "bg-gray-100"}`}>
                        {notification.type === "interview" && <Calendar className="h-4 w-4 text-blue-600" />}
                        {notification.type === "message" && <MessageSquare className="h-4 w-4 text-green-600" />}
                        {notification.type === "update" && <Eye className="h-4 w-4 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                      {notification.unread && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Job Alerts */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Job Alerts</CardTitle>
                    <CardDescription>Manage your job alert preferences</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Frontend Developer</h4>
                      <p className="text-sm text-muted-foreground">San Francisco, Remote</p>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">React Developer</h4>
                      <p className="text-sm text-muted-foreground">$100k+, Full-time</p>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Create New Alert
                  </Button>
                </CardContent>
              </Card>

              {/* Saved Jobs */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Saved Jobs</CardTitle>
                    <CardDescription>Jobs you&apos;ve bookmarked for later</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {savedJobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                        <p className="text-xs text-muted-foreground">Saved {job.savedDate}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button size="sm">Apply</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Messages & Notifications</CardTitle>
                <CardDescription>Interview invites, recruiter messages, and platform updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className={`p-3 rounded-full ${notification.unread ? "bg-blue-100" : "bg-gray-100"}`}>
                      {notification.type === "interview" && <Calendar className="h-5 w-5 text-blue-600" />}
                      {notification.type === "message" && <MessageSquare className="h-5 w-5 text-green-600" />}
                      {notification.type === "update" && <Eye className="h-5 w-5 text-purple-600" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                    </div>
                    {notification.unread && <Badge variant="default">New</Badge>}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Job Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Preferences</CardTitle>
                  <CardDescription>Customize your job search preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Preferred Locations</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">San Francisco, CA</Badge>
                      <Badge variant="secondary">Remote</Badge>
                      <Badge variant="secondary">New York, NY</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Job Types</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Full-time</Badge>
                      <Badge variant="secondary">Contract</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Salary Range</h4>
                    <Badge variant="secondary">$100k - $150k</Badge>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Preferences
                  </Button>
                </CardContent>
              </Card>

              {/* Privacy & Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Notifications</CardTitle>
                  <CardDescription>Manage your privacy and notification settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Notifications</span>
                    <Badge variant="outline">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Profile Visibility</span>
                    <Badge variant="outline">Public</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Job Alerts</span>
                    <Badge variant="outline">Daily</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Recruiter Messages</span>
                    <Badge variant="outline">Enabled</Badge>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
