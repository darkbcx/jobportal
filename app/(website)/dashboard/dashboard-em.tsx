"use client";

import { useState } from "react";
import {
  Bell,
  Calendar,
  Eye,
  MessageSquare,
  Plus,
  Settings,
  Users,
  Clock,
  CheckCircle,
  PauseCircle,
  XCircle,
  Star,
  Building,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Employer } from "@/lib/types";

// Mock data
const companyData = {
  name: "TechCorp Inc.",
  logo: "/placeholder.svg?height=80&width=80",
  industry: "Technology",
  profileCompletion: 85,
  location: "San Francisco, CA",
  employees: "500-1000",
};

const jobPostings = [
  {
    id: 1,
    title: "Senior React Developer",
    status: "active",
    applications: 24,
    views: 156,
    posted: "2024-01-10",
    expires: "2024-02-10",
  },
  {
    id: 2,
    title: "Product Manager",
    status: "active",
    applications: 18,
    views: 89,
    posted: "2024-01-08",
    expires: "2024-02-08",
  },
  {
    id: 3,
    title: "UX Designer",
    status: "paused",
    applications: 12,
    views: 67,
    posted: "2024-01-05",
    expires: "2024-02-05",
  },
  {
    id: 4,
    title: "Backend Engineer",
    status: "expired",
    applications: 31,
    views: 203,
    posted: "2023-12-15",
    expires: "2024-01-15",
  },
];

const recentApplications = [
  {
    id: 1,
    candidateName: "Sarah Johnson",
    candidateAvatar: "/placeholder.svg?height=40&width=40",
    jobTitle: "Senior React Developer",
    submissionTime: "2 hours ago",
    status: "new",
  },
  {
    id: 2,
    candidateName: "Michael Chen",
    candidateAvatar: "/placeholder.svg?height=40&width=40",
    jobTitle: "Product Manager",
    submissionTime: "4 hours ago",
    status: "reviewed",
  },
  {
    id: 3,
    candidateName: "Emily Davis",
    candidateAvatar: "/placeholder.svg?height=40&width=40",
    jobTitle: "UX Designer",
    submissionTime: "1 day ago",
    status: "shortlisted",
  },
  {
    id: 4,
    candidateName: "David Wilson",
    candidateAvatar: "/placeholder.svg?height=40&width=40",
    jobTitle: "Senior React Developer",
    submissionTime: "2 days ago",
    status: "interviewed",
  },
];

const savedCandidates = [
  {
    id: 1,
    name: "Alex Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    title: "Senior Frontend Developer",
    experience: "5+ years",
    tags: ["React", "TypeScript", "Node.js"],
    notes: "Strong technical skills, great culture fit",
    savedDate: "2024-01-12",
  },
  {
    id: 2,
    name: "Jessica Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    title: "Product Designer",
    experience: "3+ years",
    tags: ["Figma", "User Research", "Prototyping"],
    notes: "Excellent portfolio, creative problem solver",
    savedDate: "2024-01-11",
  },
];

const messages = [
  {
    id: 1,
    type: "application",
    title: "New application received",
    message: "Sarah Johnson applied for Senior React Developer",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 2,
    type: "interview",
    title: "Interview confirmation",
    message: "Michael Chen confirmed interview for tomorrow",
    time: "3 hours ago",
    unread: true,
  },
  {
    id: 3,
    type: "message",
    title: "Candidate message",
    message: "Emily Davis sent a follow-up message",
    time: "1 day ago",
    unread: false,
  },
];

const upcomingInterviews = [
  {
    id: 1,
    candidateName: "Michael Chen",
    jobTitle: "Product Manager",
    date: "2024-01-15",
    time: "2:00 PM",
    type: "Video Call",
    status: "confirmed",
  },
  {
    id: 2,
    candidateName: "Emily Davis",
    jobTitle: "UX Designer",
    date: "2024-01-16",
    time: "10:00 AM",
    type: "In-person",
    status: "pending",
  },
  {
    id: 3,
    candidateName: "David Wilson",
    jobTitle: "Senior React Developer",
    date: "2024-01-17",
    time: "3:30 PM",
    type: "Phone Call",
    status: "confirmed",
  },
];

const performanceMetrics = {
  totalViews: 515,
  totalApplications: 85,
  conversionRate: 16.5,
  avgTimeToHire: 18,
};

interface DashboardEmployerProps {
  employer: Employer | null;
}

export default function DashboardEmployer({
  employer,
}: DashboardEmployerProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "paused":
        return <PauseCircle className="h-4 w-4 text-yellow-600" />;
      case "expired":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "paused":
        return "bg-yellow-500";
      case "expired":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getApplicationStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500";
      case "reviewed":
        return "bg-yellow-500";
      case "shortlisted":
        return "bg-green-500";
      case "interviewed":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto p-6 space-y-6">
        {/* Welcome Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={companyData.logo || "/placeholder.svg"}
                    alt={companyData.name}
                  />
                  <AvatarFallback>
                    <Building className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">
                    Welcome back, {companyData.name}!
                  </h1>
                  <p className="text-muted-foreground">
                    {companyData.industry} • {companyData.employees} employees
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {companyData.location}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium">
                    Profile Completion
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {companyData.profileCompletion}%
                  </span>
                </div>
                <Progress
                  value={companyData.profileCompletion}
                  className="w-32 mb-2"
                />
                <Button size="sm" variant="outline">
                  <Building className="h-4 w-4 mr-2" />
                  Complete Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Job Postings Overview */}
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Job Postings Overview</CardTitle>
                    <CardDescription>
                      Current status of your job posts
                    </CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Post a Job
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {
                          jobPostings.filter((job) => job.status === "active")
                            .length
                        }
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Active
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">
                        {
                          jobPostings.filter((job) => job.status === "paused")
                            .length
                        }
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Paused
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {
                          jobPostings.filter((job) => job.status === "expired")
                            .length
                        }
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Expired
                      </div>
                    </div>
                  </div>
                  {jobPostings.slice(0, 3).map((job) => (
                    <div
                      key={job.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(job.status)}
                        <div>
                          <h3 className="font-semibold">{job.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{job.applications} applications</span>
                            <span>{job.views} views</span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        className={`${getStatusColor(
                          job.status
                        )} text-white capitalize`}
                      >
                        {job.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>
                    Overall job posting performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Views</span>
                    <span className="font-semibold">
                      {performanceMetrics.totalViews}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Applications</span>
                    <span className="font-semibold">
                      {performanceMetrics.totalApplications}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Conversion Rate</span>
                    <span className="font-semibold">
                      {performanceMetrics.conversionRate}%
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg. Time to Hire</span>
                    <span className="font-semibold">
                      {performanceMetrics.avgTimeToHire} days
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Recent Applications */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>
                      Latest applications across all job posts
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentApplications.map((application) => (
                    <div
                      key={application.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={
                              application.candidateAvatar || "/placeholder.svg"
                            }
                          />
                          <AvatarFallback>
                            {application.candidateName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">
                            {application.candidateName}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {application.jobTitle}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {application.submissionTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={`${getApplicationStatusColor(
                            application.status
                          )} text-white capitalize`}
                        >
                          {application.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Messages & Notifications */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Messages & Notifications</CardTitle>
                    <CardDescription>
                      Recent updates and messages
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Bell className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className="flex items-start space-x-3"
                    >
                      <div
                        className={`p-2 rounded-full ${
                          message.unread ? "bg-blue-100" : "bg-gray-100"
                        }`}
                      >
                        {message.type === "application" && (
                          <Users className="h-4 w-4 text-blue-600" />
                        )}
                        {message.type === "interview" && (
                          <Calendar className="h-4 w-4 text-green-600" />
                        )}
                        {message.type === "message" && (
                          <MessageSquare className="h-4 w-4 text-purple-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{message.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {message.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {message.time}
                        </p>
                      </div>
                      {message.unread && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>All Job Postings</CardTitle>
                  <CardDescription>
                    Manage your job posts and their performance
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Post New Job
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {jobPostings.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(job.status)}
                      <div>
                        <h3 className="font-semibold">{job.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Posted: {job.posted}</span>
                          <span>Expires: {job.expires}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right text-sm">
                        <div className="font-medium">
                          {job.applications} applications
                        </div>
                        <div className="text-muted-foreground">
                          {job.views} views
                        </div>
                      </div>
                      <Badge
                        className={`${getStatusColor(
                          job.status
                        )} text-white capitalize`}
                      >
                        {job.status}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="candidates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Saved Candidates</CardTitle>
                <CardDescription>
                  Bookmarked and shortlisted candidates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {savedCandidates.map((candidate) => (
                  <div key={candidate.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={candidate.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {candidate.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{candidate.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {candidate.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {candidate.experience}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {candidate.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      &quot;{candidate.notes}&quot;
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Saved on {candidate.savedDate}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interviews" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Upcoming Interviews</CardTitle>
                  <CardDescription>
                    Scheduled meetings and interviews
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Sync Calendar
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div
                    key={interview.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {interview.candidateName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {interview.jobTitle}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{interview.date}</span>
                          <span>{interview.time}</span>
                          <span>{interview.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          interview.status === "confirmed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {interview.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Company Profile */}
              <Card>
                <CardHeader>
                  <CardTitle>Company Profile</CardTitle>
                  <CardDescription>
                    Manage your company details and branding
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Company Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span>{companyData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Industry:</span>
                        <span>{companyData.industry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Size:</span>
                        <span>{companyData.employees}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span>{companyData.location}</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Building className="h-4 w-4 mr-2" />
                    Edit Company Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Settings & Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Settings & Preferences</CardTitle>
                  <CardDescription>
                    Manage notifications and team access
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Notifications</span>
                    <Badge variant="outline">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Application Alerts</span>
                    <Badge variant="outline">Instant</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Team Access</span>
                    <Badge variant="outline">5 Members</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Branding</span>
                    <Badge variant="outline">Premium</Badge>
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
  );
}
