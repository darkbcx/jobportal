# Actions by Actors - Job Portal Platform

## Overview
This document outlines all possible actions that each actor can perform in the job portal platform, derived from the domain model analysis.

## 1. Guest Users

### Account Management
- Register as Job Seeker
- Register as Employer
- Login to existing account
- Reset password
- Browse public job postings
- View company profiles (public information)

### Job Discovery
- Search job postings (limited access)
- Filter jobs by basic criteria
- View job details (limited)
- View company information (public)

## 2. Job Seekers

### Profile Management
- Update personal information (name, phone, location, bio)
- Upload/update profile photo
- Set profile visibility (PUBLIC, PRIVATE, EMPLOYERS_ONLY)
- Set availability status (ACTIVELY_LOOKING, OPEN_TO_OFFERS, NOT_LOOKING)
- Generate public profile URL
- Delete account

### Resume & Documents
- Upload multiple resumes
- Set primary resume
- Delete resumes
- Download resumes

### Education & Experience
- Add/edit/delete education entries
- Add/edit/delete work experience
- Mark current positions
- Add/edit/delete certifications
- Add/edit/delete portfolio items

### Skills & Languages
- Add/remove skills
- Set skill proficiency levels
- Set years of experience per skill
- Add/remove languages
- Set language proficiency levels

### Job Search & Applications
- Search job postings with advanced filters
- Save job postings
- Apply to job postings
- Write custom cover letters
- Set salary expectations
- Withdraw applications
- Track application status
- View application history

### Job Alerts
- Create job alerts with specific criteria
- Set alert frequency (INSTANT, DAILY, WEEKLY)
- Activate/deactivate alerts
- Edit alert criteria
- Delete alerts
- Receive alert notifications

### Company Interaction
- Follow/unfollow companies
- View company profiles and details
- Write company reviews
- Rate companies (1-5 scale)
- View company job postings

### Interview Management
- Confirm interview schedules
- Cancel interviews
- Attend interviews (mark attendance)
- Receive interview reminders

### Communication
- Send/receive messages with employers
- Reply to application-related messages
- Receive notifications about application updates

### Reviews & Feedback
- Write reviews for companies
- Rate interview experiences
- Provide feedback on job postings

## 3. Employers

### Account & Company Management
- Update company information
- Upload company logo
- Set company description and culture
- Manage office locations
- Update company benefits
- Verify company account
- Manage subscription plan
- Update billing information

### Team Management
- Invite team members
- Set team member roles (ADMIN, RECRUITER, INTERVIEWER, VIEWER)
- Assign permissions to team members
- Remove team members
- Manage team member status

### Job Posting Management
- Create job postings
- Edit job postings
- Publish/unpublish job postings
- Pause job postings
- Set job posting expiration dates
- Archive old job postings
- Duplicate job postings
- Create job posting templates
- Use templates for new postings
- Set required skills for jobs
- Track job posting analytics (views, applications)

### Application Management
- View all applications for job postings
- Filter applications by status
- Update application status (UNDER_REVIEW, INTERVIEWED, OFFERED, HIRED, REJECTED)
- Add notes to applications
- Export application data
- Search through applications
- Bulk actions on applications

### Candidate Evaluation
- View candidate profiles
- Access resumes and portfolios
- Review candidate skills and experience
- Write candidate reviews
- Rate candidates
- Add internal notes about candidates

### Interview Management
- Schedule interviews with candidates
- Create interview templates
- Set interview types (PHONE, VIDEO, IN_PERSON)
- Set interview locations/meeting links
- Reschedule interviews
- Cancel interviews
- Mark interview attendance
- Add post-interview notes
- Use evaluation criteria

### Communication
- Send messages to job seekers
- Reply to candidate inquiries
- Send bulk messages
- Communicate with team members

### Analytics & Reporting
- View job posting performance
- Track application metrics
- Generate reports on hiring activity
- Export candidate data
- View subscription usage

### Subscription Management
- Upgrade/downgrade subscription plans
- View billing history
- Update payment methods
- Cancel subscriptions
- Access premium features based on plan

## 4. Admins

### User Management
- View all users (job seekers, employers)
- Suspend/activate user accounts
- Reset user passwords
- Delete user accounts
- View user activity logs
- Manage user permissions

### Content Moderation
- Review reported content
- Moderate job postings
- Moderate company reviews
- Moderate user profiles
- Remove inappropriate content
- Take moderation actions

### Company Verification
- Verify company accounts
- Review company information
- Approve/reject company registrations
- Manage company verification status

### System Management
- Configure system settings
- Manage subscription plans
- Set platform rules and policies
- Configure notification templates
- Manage skill categories
- Update language options

### Analytics & Monitoring
- View platform-wide analytics
- Monitor system performance
- Track user engagement metrics
- Generate platform reports
- Monitor subscription revenue

### Support & Communication
- Respond to user support requests
- Send platform announcements
- Manage notification systems
- Handle user complaints
- Provide technical support

### Data Management
- Export platform data
- Manage data backups
- Configure data retention policies
- Handle data deletion requests
- Manage API access

## Cross-Actor Actions

### Notification System
**All Actors:**
- Configure notification preferences
- Receive notifications via multiple channels (email, SMS, in-app, push)
- Mark notifications as read
- View notification history

### Messaging System
**Job Seekers & Employers:**
- Send direct messages
- Reply to messages
- Mark messages as read
- Search message history
- Delete messages

### Review System
**Job Seekers & Employers:**
- Write reviews (companies/candidates)
- Rate experiences (1-5 scale)
- Report inappropriate reviews
- Respond to reviews (companies)

## Business Rule Constraints

### Application Rules
- Job seekers can only apply once per job posting
- Applications can only be withdrawn before interview scheduling
- Employers can only schedule interviews for valid application statuses

### Subscription Rules
- Employers need active subscriptions for premium features
- Job posting limits based on subscription tier
- Team member limits based on subscription plan

### Review Rules
- Reviews can only be created after completed interactions
- Anonymous reviews allowed with restrictions
- Verified reviews require system validation

### Profile Rules
- Profile visibility affects searchability
- Public profiles accessible to all users
- Private profiles only visible to connected users

This comprehensive action list provides the foundation for defining user permissions, API endpoints, and feature development priorities for the job portal platform. 