# Website Pages - Job Portal Platform

## Overview

This document outlines all the pages required for the job portal platform based on the permissions matrix and user workflows. Pages are organized by user type and functional area.

## Public Pages (GUEST Access)

### Authentication & Registration
- `/` - Landing/Home Page
- `/login` - Login Page
- `/register` - Registration Selection Page
- `/register/job-seeker` - Job Seeker Registration
- `/register/employer` - Employer Registration
- `/forgot-password` - Password Reset Request
- `/reset-password` - Password Reset Form

### Job Browsing (Limited Access)
- `/jobs` - Public Job Listings
- `/jobs/search` - Basic Job Search
- `/jobs/:id` - Job Details (Limited View)

### Company Information
- `/companies` - Public Company Directory
- `/companies/:id` - Company Profile (Public View)

### General
- `/about` - About Us
- `/contact` - Contact Information
- `/privacy` - Privacy Policy
- `/terms` - Terms of Service
- `/help` - Help Center

## Job Seeker Pages

### Dashboard & Profile
- `/dashboard` - Job Seeker Dashboard
- `/profile` - Profile Management
- `/profile/edit` - Edit Personal Information
- `/profile/photo` - Upload Profile Photo
- `/profile/settings` - Profile Visibility & Availability Settings
- `/profile/public-url` - Generate Public Profile URL

### Resume & Documents
- `/resumes` - Resume Management
- `/resumes/upload` - Upload Resume
- `/resumes/:id/edit` - Edit Resume
- `/resumes/:id/delete` - Delete Resume

### Professional Information
- `/education` - Education Management
- `/education/add` - Add Education Entry
- `/education/:id/edit` - Edit Education Entry
- `/experience` - Work Experience Management
- `/experience/add` - Add Work Experience
- `/experience/:id/edit` - Edit Work Experience
- `/certifications` - Certifications Management
- `/certifications/add` - Add Certification
- `/portfolio` - Portfolio Management
- `/portfolio/add` - Add Portfolio Item
- `/skills` - Skills Management
- `/languages` - Languages Management

### Job Search & Applications
- `/jobs/browse` - Advanced Job Browse
- `/jobs/search/advanced` - Advanced Job Search
- `/jobs/:id/details` - Full Job Details
- `/jobs/:id/apply` - Job Application Form
- `/jobs/saved` - Saved Jobs
- `/applications` - Application History
- `/applications/:id` - Application Details
- `/applications/:id/withdraw` - Withdraw Application

### Job Alerts
- `/job-alerts` - Job Alerts Management
- `/job-alerts/create` - Create Job Alert
- `/job-alerts/:id/edit` - Edit Job Alert

### Companies & Reviews
- `/companies/detailed/:id` - Detailed Company Profile
- `/companies/:id/follow` - Follow Company
- `/companies/:id/review` - Write Company Review
- `/companies/:id/rate` - Rate Company

### Interviews
- `/interviews` - Interview Schedule
- `/interviews/:id` - Interview Details
- `/interviews/:id/confirm` - Confirm Interview
- `/interviews/:id/cancel` - Cancel Interview

### Communication
- `/messages` - Message Center
- `/messages/:id` - Message Thread
- `/messages/search` - Search Message History

### Notifications
- `/notifications` - Notifications Center
- `/notifications/preferences` - Notification Preferences
- `/notifications/history` - Notification History

### Reviews & Ratings
- `/reviews/my-reviews` - My Reviews
- `/reviews/write` - Write Review

### Account
- `/account` - Account Settings
- `/account/delete` - Delete Account

## Employer Pages

### Dashboard & Analytics
- `/employer/dashboard` - Employer Dashboard
- `/employer/analytics` - Analytics Overview
- `/employer/analytics/jobs` - Job Performance Analytics
- `/employer/analytics/applications` - Application Metrics
- `/employer/analytics/reports` - Generate Reports
- `/employer/analytics/export` - Export Data

### Company Management
- `/employer/company` - Company Profile
- `/employer/company/edit` - Edit Company Information
- `/employer/company/logo` - Upload Company Logo
- `/employer/company/details` - Manage Company Details
- `/employer/company/locations` - Manage Office Locations
- `/employer/company/verification` - Company Verification Status

### Team Management
- `/employer/team` - Team Members
- `/employer/team/invite` - Invite Team Members
- `/employer/team/:id/roles` - Manage Member Roles
- `/employer/team/:id/permissions` - Assign Permissions
- `/employer/team/:id/remove` - Remove Team Member

### Job Postings
- `/employer/jobs` - Job Postings Management
- `/employer/jobs/create` - Create Job Posting
- `/employer/jobs/:id/edit` - Edit Job Posting
- `/employer/jobs/:id/publish` - Publish Job Posting
- `/employer/jobs/:id/pause` - Pause Job Posting
- `/employer/jobs/:id/archive` - Archive Job Posting
- `/employer/jobs/:id/duplicate` - Duplicate Job Posting
- `/employer/jobs/templates` - Job Posting Templates
- `/employer/jobs/templates/create` - Create Template
- `/employer/jobs/templates/:id/use` - Use Template

### Application Management
- `/employer/applications` - Applications Overview
- `/employer/applications/:jobId` - Applications for Job
- `/employer/applications/:id/details` - Application Details
- `/employer/applications/:id/status` - Update Application Status
- `/employer/applications/:id/notes` - Add Application Notes
- `/employer/applications/export` - Export Applications
- `/employer/applications/search` - Search Applications
- `/employer/applications/bulk-actions` - Bulk Actions

### Candidate Management
- `/employer/candidates` - Candidate Profiles
- `/employer/candidates/:id` - Candidate Profile View
- `/employer/candidates/:id/resume` - Access Resume
- `/employer/candidates/:id/review` - Review Candidate
- `/employer/candidates/:id/rate` - Rate Candidate
- `/employer/candidates/:id/notes` - Add Candidate Notes

### Interview Management
- `/employer/interviews` - Interview Management
- `/employer/interviews/schedule` - Schedule Interview
- `/employer/interviews/templates` - Interview Templates
- `/employer/interviews/templates/create` - Create Interview Template
- `/employer/interviews/:id/reschedule` - Reschedule Interview
- `/employer/interviews/:id/cancel` - Cancel Interview
- `/employer/interviews/:id/notes` - Add Interview Notes
- `/employer/interviews/:id/evaluation` - Interview Evaluation

### Communication
- `/employer/messages` - Message Center
- `/employer/messages/bulk` - Bulk Messaging
- `/employer/messages/:id` - Message Thread
- `/employer/messages/search` - Search Messages

### Subscription & Billing
- `/employer/subscription` - Subscription Management
- `/employer/billing` - Billing History
- `/employer/billing/payment` - Update Payment Method
- `/employer/subscription/cancel` - Cancel Subscription
- `/employer/premium` - Premium Features

### Reviews & Responses
- `/employer/reviews` - Company Reviews
- `/employer/reviews/:id/respond` - Respond to Review

## Admin Pages

### Dashboard
- `/admin` - Admin Dashboard
- `/admin/overview` - Platform Overview

### User Management
- `/admin/users` - All Users
- `/admin/users/job-seekers` - Job Seekers
- `/admin/users/employers` - Employers
- `/admin/users/:id` - User Details
- `/admin/users/:id/suspend` - Suspend User
- `/admin/users/:id/activate` - Activate User
- `/admin/users/:id/reset-password` - Reset User Password
- `/admin/users/:id/delete` - Delete User Account
- `/admin/users/:id/activity` - User Activity Logs
- `/admin/users/:id/permissions` - Manage User Permissions

### Content Moderation
- `/admin/moderation` - Moderation Dashboard
- `/admin/moderation/reported` - Reported Content
- `/admin/moderation/jobs` - Moderate Job Postings
- `/admin/moderation/reviews` - Moderate Reviews
- `/admin/moderation/profiles` - Moderate Profiles
- `/admin/moderation/actions` - Moderation Actions

### Company Management
- `/admin/companies` - Company Management
- `/admin/companies/verification` - Company Verification Queue
- `/admin/companies/:id/verify` - Verify Company
- `/admin/companies/:id/review` - Review Company Info
- `/admin/companies/registrations` - Pending Registrations

### System Configuration
- `/admin/settings` - System Settings
- `/admin/settings/notifications` - Notification Templates
- `/admin/settings/policies` - Platform Policies
- `/admin/skills` - Manage Skills Categories
- `/admin/languages` - Language Options
- `/admin/subscription-plans` - Subscription Plans

### Analytics & Monitoring
- `/admin/analytics` - Platform Analytics
- `/admin/analytics/performance` - System Performance
- `/admin/analytics/engagement` - User Engagement
- `/admin/analytics/reports` - Generate Reports

### Support & Communication
- `/admin/support` - Support Dashboard
- `/admin/support/requests` - Support Requests
- `/admin/support/announcements` - Platform Announcements
- `/admin/support/complaints` - User Complaints
- `/admin/support/technical` - Technical Support

### Data Management
- `/admin/data` - Data Management
- `/admin/data/export` - Export Platform Data
- `/admin/data/backups` - Manage Backups
- `/admin/data/retention` - Data Retention Policies
- `/admin/data/deletion` - Data Deletion Requests
- `/admin/data/api` - API Access Management

## Page Organization Notes

1. **Route Protection**: Pages are protected based on user roles and permissions
2. **Responsive Design**: All pages should be mobile-friendly
3. **SEO Optimization**: Public pages should be optimized for search engines
4. **Accessibility**: All pages should meet WCAG 2.1 standards
5. **Performance**: Implement lazy loading and code splitting for optimal performance
6. **Progressive Web App**: Consider PWA features for mobile experience

## Navigation Structure

### Header Navigation (Public)
- Home | Jobs | Companies | About | Contact | Login | Register

### Header Navigation (Job Seeker)
- Dashboard | Jobs | Companies | Applications | Messages | Profile

### Header Navigation (Employer)
- Dashboard | Jobs | Applications | Candidates | Analytics | Messages | Company

### Header Navigation (Admin)
- Dashboard | Users | Companies | Content | System | Analytics | Support

### Footer Navigation
- About | Privacy | Terms | Help | Contact | Sitemap 