# Permissions Matrix - Job Portal Platform

## Overview

This document defines the permission matrix for all actors and actions in the job portal platform. Each action is represented by a unique code identifier, and permissions are mapped across all actor types.

## Actor Types

- **GUEST**: Guest Users (unauthenticated)
- **JOB_SEEKER**: Authenticated Job Seekers
- **EMPLOYER**: Authenticated Employers
- **ADMIN**: Platform Administrators

## Permissions Matrix

| Action Code                             | Description                            | GUEST | JOB_SEEKER | EMPLOYER | ADMIN |
| --------------------------------------- | -------------------------------------- | :---: | :--------: | :------: | :---: |
| **ACCOUNT_REGISTER_JOB_SEEKER**         | Register as Job Seeker                 |  ✅   |     ❌     |    ❌    |  ✅   |
| **ACCOUNT_REGISTER_EMPLOYER**           | Register as Employer                   |  ✅   |     ❌     |    ❌    |  ✅   |
| **ACCOUNT_LOGIN**                       | Login to existing account              |  ✅   |     ❌     |    ❌    |  ❌   |
| **ACCOUNT_RESET_PASSWORD**              | Reset password                         |  ✅   |     ✅     |    ✅    |  ✅   |
| **ACCOUNT_DELETE**                      | Delete account                         |  ❌   |     ✅     |    ✅    |  ✅   |
| **PROFILE_UPDATE_PERSONAL_INFO**        | Update personal information            |  ❌   |     ✅     |    ❌    |  ✅   |
| **PROFILE_UPLOAD_PHOTO**                | Upload/update profile photo            |  ❌   |     ✅     |    ❌    |  ✅   |
| **PROFILE_SET_VISIBILITY**              | Set profile visibility                 |  ❌   |     ✅     |    ❌    |  ✅   |
| **PROFILE_SET_AVAILABILITY**            | Set availability status                |  ❌   |     ✅     |    ❌    |  ✅   |
| **PROFILE_GENERATE_PUBLIC_URL**         | Generate public profile URL            |  ❌   |     ✅     |    ❌    |  ✅   |
| **RESUME_UPLOAD**                       | Upload resumes                         |  ❌   |     ✅     |    ❌    |  ✅   |
| **RESUME_SET_PRIMARY**                  | Set primary resume                     |  ❌   |     ✅     |    ❌    |  ✅   |
| **RESUME_DELETE**                       | Delete resumes                         |  ❌   |     ✅     |    ❌    |  ✅   |
| **RESUME_DOWNLOAD**                     | Download resumes                       |  ❌   |     ✅     |    ✅    |  ✅   |
| **EDUCATION_MANAGE**                    | Add/edit/delete education entries      |  ❌   |     ✅     |    ❌    |  ✅   |
| **EXPERIENCE_MANAGE**                   | Add/edit/delete work experience        |  ❌   |     ✅     |    ❌    |  ✅   |
| **CERTIFICATIONS_MANAGE**               | Add/edit/delete certifications         |  ❌   |     ✅     |    ❌    |  ✅   |
| **PORTFOLIO_MANAGE**                    | Add/edit/delete portfolio items        |  ❌   |     ✅     |    ❌    |  ✅   |
| **SKILLS_MANAGE**                       | Add/remove skills and proficiency      |  ❌   |     ✅     |    ❌    |  ✅   |
| **LANGUAGES_MANAGE**                    | Add/remove languages and proficiency   |  ❌   |     ✅     |    ❌    |  ✅   |
| **JOBS_BROWSE_PUBLIC**                  | Browse public job postings             |  ✅   |     ✅     |    ✅    |  ✅   |
| **JOBS_SEARCH_BASIC**                   | Search jobs with basic filters         |  ✅   |     ✅     |    ✅    |  ✅   |
| **JOBS_SEARCH_ADVANCED**                | Search jobs with advanced filters      |  ❌   |     ✅     |    ✅    |  ✅   |
| **JOBS_VIEW_DETAILS_LIMITED**           | View job details (limited)             |  ✅   |     ❌     |    ❌    |  ✅   |
| **JOBS_VIEW_DETAILS_FULL**              | View full job details                  |  ❌   |     ✅     |    ✅    |  ✅   |
| **JOBS_SAVE**                           | Save job postings                      |  ❌   |     ✅     |    ❌    |  ✅   |
| **JOBS_APPLY**                          | Apply to job postings                  |  ❌   |     ✅     |    ❌    |  ✅   |
| **JOBS_WITHDRAW_APPLICATION**           | Withdraw applications                  |  ❌   |     ✅     |    ❌    |  ✅   |
| **JOBS_TRACK_APPLICATION_STATUS**       | Track application status               |  ❌   |     ✅     |    ❌    |  ✅   |
| **JOBS_VIEW_APPLICATION_HISTORY**       | View application history               |  ❌   |     ✅     |    ❌    |  ✅   |
| **JOB_ALERTS_CREATE**                   | Create job alerts                      |  ❌   |     ✅     |    ❌    |  ✅   |
| **JOB_ALERTS_MANAGE**                   | Manage job alerts                      |  ❌   |     ✅     |    ❌    |  ✅   |
| **JOB_ALERTS_DELETE**                   | Delete job alerts                      |  ❌   |     ✅     |    ❌    |  ✅   |
| **COMPANIES_VIEW_PUBLIC**               | View company profiles (public)         |  ✅   |     ✅     |    ✅    |  ✅   |
| **COMPANIES_VIEW_DETAILED**             | View detailed company profiles         |  ❌   |     ✅     |    ✅    |  ✅   |
| **COMPANIES_FOLLOW**                    | Follow/unfollow companies              |  ❌   |     ✅     |    ❌    |  ✅   |
| **COMPANIES_REVIEW**                    | Write company reviews                  |  ❌   |     ✅     |    ❌    |  ✅   |
| **COMPANIES_RATE**                      | Rate companies                         |  ❌   |     ✅     |    ❌    |  ✅   |
| **COMPANY_UPDATE_INFO**                 | Update company information             |  ❌   |     ❌     |    ✅    |  ✅   |
| **COMPANY_UPLOAD_LOGO**                 | Upload company logo                    |  ❌   |     ❌     |    ✅    |  ✅   |
| **COMPANY_MANAGE_DETAILS**              | Manage company details and culture     |  ❌   |     ❌     |    ✅    |  ✅   |
| **COMPANY_MANAGE_LOCATIONS**            | Manage office locations                |  ❌   |     ❌     |    ✅    |  ✅   |
| **COMPANY_VERIFY_ACCOUNT**              | Verify company account                 |  ❌   |     ❌     |    ❌    |  ✅   |
| **TEAM_INVITE_MEMBERS**                 | Invite team members                    |  ❌   |     ❌     |    ✅    |  ✅   |
| **TEAM_MANAGE_ROLES**                   | Set team member roles                  |  ❌   |     ❌     |    ✅    |  ✅   |
| **TEAM_MANAGE_PERMISSIONS**             | Assign permissions to team members     |  ❌   |     ❌     |    ✅    |  ✅   |
| **TEAM_REMOVE_MEMBERS**                 | Remove team members                    |  ❌   |     ❌     |    ✅    |  ✅   |
| **JOB_POSTINGS_CREATE**                 | Create job postings                    |  ❌   |     ❌     |    ✅    |  ✅   |
| **JOB_POSTINGS_EDIT**                   | Edit job postings                      |  ❌   |     ❌     |    ✅    |  ✅   |
| **JOB_POSTINGS_PUBLISH**                | Publish/unpublish job postings         |  ❌   |     ❌     |    ✅    |  ✅   |
| **JOB_POSTINGS_PAUSE**                  | Pause job postings                     |  ❌   |     ❌     |    ✅    |  ✅   |
| **JOB_POSTINGS_ARCHIVE**                | Archive job postings                   |  ❌   |     ❌     |    ✅    |  ✅   |
| **JOB_POSTINGS_DUPLICATE**              | Duplicate job postings                 |  ❌   |     ❌     |    ✅    |  ✅   |
| **JOB_POSTINGS_TEMPLATES_CREATE**       | Create job posting templates           |  ❌   |     ❌     |    ✅    |  ✅   |
| **JOB_POSTINGS_TEMPLATES_USE**          | Use templates for new postings         |  ❌   |     ❌     |    ✅    |  ✅   |
| **JOB_POSTINGS_ANALYTICS**              | Track job posting analytics            |  ❌   |     ❌     |    ✅    |  ✅   |
| **APPLICATIONS_VIEW**                   | View applications for job postings     |  ❌   |     ❌     |    ✅    |  ✅   |
| **APPLICATIONS_FILTER**                 | Filter applications by status          |  ❌   |     ❌     |    ✅    |  ✅   |
| **APPLICATIONS_UPDATE_STATUS**          | Update application status              |  ❌   |     ❌     |    ✅    |  ✅   |
| **APPLICATIONS_ADD_NOTES**              | Add notes to applications              |  ❌   |     ❌     |    ✅    |  ✅   |
| **APPLICATIONS_EXPORT**                 | Export application data                |  ❌   |     ❌     |    ✅    |  ✅   |
| **APPLICATIONS_SEARCH**                 | Search through applications            |  ❌   |     ❌     |    ✅    |  ✅   |
| **APPLICATIONS_BULK_ACTIONS**           | Bulk actions on applications           |  ❌   |     ❌     |    ✅    |  ✅   |
| **CANDIDATES_VIEW_PROFILES**            | View candidate profiles                |  ❌   |     ❌     |    ✅    |  ✅   |
| **CANDIDATES_ACCESS_RESUMES**           | Access resumes and portfolios          |  ❌   |     ❌     |    ✅    |  ✅   |
| **CANDIDATES_REVIEW**                   | Review candidate skills and experience |  ❌   |     ❌     |    ✅    |  ✅   |
| **CANDIDATES_RATE**                     | Rate candidates                        |  ❌   |     ❌     |    ✅    |  ✅   |
| **CANDIDATES_ADD_NOTES**                | Add internal notes about candidates    |  ❌   |     ❌     |    ✅    |  ✅   |
| **INTERVIEWS_SCHEDULE**                 | Schedule interviews with candidates    |  ❌   |     ❌     |    ✅    |  ✅   |
| **INTERVIEWS_CREATE_TEMPLATES**         | Create interview templates             |  ❌   |     ❌     |    ✅    |  ✅   |
| **INTERVIEWS_RESCHEDULE**               | Reschedule interviews                  |  ❌   |     ❌     |    ✅    |  ✅   |
| **INTERVIEWS_CANCEL**                   | Cancel interviews                      |  ❌   |     ✅     |    ✅    |  ✅   |
| **INTERVIEWS_CONFIRM**                  | Confirm interview schedules            |  ❌   |     ✅     |    ❌    |  ✅   |
| **INTERVIEWS_ATTEND**                   | Attend interviews                      |  ❌   |     ✅     |    ✅    |  ✅   |
| **INTERVIEWS_ADD_NOTES**                | Add post-interview notes               |  ❌   |     ❌     |    ✅    |  ✅   |
| **INTERVIEWS_USE_EVALUATION**           | Use evaluation criteria                |  ❌   |     ❌     |    ✅    |  ✅   |
| **MESSAGES_SEND**                       | Send messages                          |  ❌   |     ✅     |    ✅    |  ✅   |
| **MESSAGES_RECEIVE**                    | Receive messages                       |  ❌   |     ✅     |    ✅    |  ✅   |
| **MESSAGES_REPLY**                      | Reply to messages                      |  ❌   |     ✅     |    ✅    |  ✅   |
| **MESSAGES_BULK_SEND**                  | Send bulk messages                     |  ❌   |     ❌     |    ✅    |  ✅   |
| **MESSAGES_SEARCH_HISTORY**             | Search message history                 |  ❌   |     ✅     |    ✅    |  ✅   |
| **MESSAGES_DELETE**                     | Delete messages                        |  ❌   |     ✅     |    ✅    |  ✅   |
| **ANALYTICS_VIEW_JOB_PERFORMANCE**      | View job posting performance           |  ❌   |     ❌     |    ✅    |  ✅   |
| **ANALYTICS_TRACK_METRICS**             | Track application metrics              |  ❌   |     ❌     |    ✅    |  ✅   |
| **ANALYTICS_GENERATE_REPORTS**          | Generate hiring activity reports       |  ❌   |     ❌     |    ✅    |  ✅   |
| **ANALYTICS_EXPORT_DATA**               | Export candidate data                  |  ❌   |     ❌     |    ✅    |  ✅   |
| **ANALYTICS_VIEW_PLATFORM**             | View platform-wide analytics           |  ❌   |     ❌     |    ❌    |  ✅   |
| **SUBSCRIPTIONS_MANAGE**                | Manage subscription plans              |  ❌   |     ❌     |    ✅    |  ✅   |
| **SUBSCRIPTIONS_VIEW_BILLING**          | View billing history                   |  ❌   |     ❌     |    ✅    |  ✅   |
| **SUBSCRIPTIONS_UPDATE_PAYMENT**        | Update payment methods                 |  ❌   |     ❌     |    ✅    |  ✅   |
| **SUBSCRIPTIONS_CANCEL**                | Cancel subscriptions                   |  ❌   |     ❌     |    ✅    |  ✅   |
| **SUBSCRIPTIONS_ACCESS_PREMIUM**        | Access premium features                |  ❌   |     ❌     |    ✅    |  ✅   |
| **USERS_VIEW_ALL**                      | View all users                         |  ❌   |     ❌     |    ❌    |  ✅   |
| **USERS_SUSPEND_ACCOUNTS**              | Suspend/activate user accounts         |  ❌   |     ❌     |    ❌    |  ✅   |
| **USERS_RESET_PASSWORDS**               | Reset user passwords                   |  ❌   |     ❌     |    ❌    |  ✅   |
| **USERS_DELETE_ACCOUNTS**               | Delete user accounts                   |  ❌   |     ❌     |    ❌    |  ✅   |
| **USERS_VIEW_ACTIVITY_LOGS**            | View user activity logs                |  ❌   |     ❌     |    ❌    |  ✅   |
| **USERS_MANAGE_PERMISSIONS**            | Manage user permissions                |  ❌   |     ❌     |    ❌    |  ✅   |
| **CONTENT_REVIEW_REPORTED**             | Review reported content                |  ❌   |     ❌     |    ❌    |  ✅   |
| **CONTENT_MODERATE_JOBS**               | Moderate job postings                  |  ❌   |     ❌     |    ❌    |  ✅   |
| **CONTENT_MODERATE_REVIEWS**            | Moderate company reviews               |  ❌   |     ❌     |    ❌    |  ✅   |
| **CONTENT_MODERATE_PROFILES**           | Moderate user profiles                 |  ❌   |     ❌     |    ❌    |  ✅   |
| **CONTENT_REMOVE_INAPPROPRIATE**        | Remove inappropriate content           |  ❌   |     ❌     |    ❌    |  ✅   |
| **CONTENT_TAKE_MODERATION_ACTIONS**     | Take moderation actions                |  ❌   |     ❌     |    ❌    |  ✅   |
| **COMPANIES_VERIFY**                    | Verify company accounts                |  ❌   |     ❌     |    ❌    |  ✅   |
| **COMPANIES_REVIEW_INFO**               | Review company information             |  ❌   |     ❌     |    ❌    |  ✅   |
| **COMPANIES_APPROVE_REGISTRATION**      | Approve/reject company registrations   |  ❌   |     ❌     |    ❌    |  ✅   |
| **SYSTEM_CONFIGURE_SETTINGS**           | Configure system settings              |  ❌   |     ❌     |    ❌    |  ✅   |
| **SYSTEM_MANAGE_SUBSCRIPTION_PLANS**    | Manage subscription plans              |  ❌   |     ❌     |    ❌    |  ✅   |
| **SYSTEM_SET_POLICIES**                 | Set platform rules and policies        |  ❌   |     ❌     |    ❌    |  ✅   |
| **SYSTEM_CONFIGURE_NOTIFICATIONS**      | Configure notification templates       |  ❌   |     ❌     |    ❌    |  ✅   |
| **SYSTEM_MANAGE_SKILLS**                | Manage skill categories                |  ❌   |     ❌     |    ❌    |  ✅   |
| **SYSTEM_UPDATE_LANGUAGES**             | Update language options                |  ❌   |     ❌     |    ❌    |  ✅   |
| **SYSTEM_MONITOR_PERFORMANCE**          | Monitor system performance             |  ❌   |     ❌     |    ❌    |  ✅   |
| **SYSTEM_TRACK_ENGAGEMENT**             | Track user engagement metrics          |  ❌   |     ❌     |    ❌    |  ✅   |
| **SUPPORT_RESPOND_REQUESTS**            | Respond to user support requests       |  ❌   |     ❌     |    ❌    |  ✅   |
| **SUPPORT_SEND_ANNOUNCEMENTS**          | Send platform announcements            |  ❌   |     ❌     |    ❌    |  ✅   |
| **SUPPORT_HANDLE_COMPLAINTS**           | Handle user complaints                 |  ❌   |     ❌     |    ❌    |  ✅   |
| **SUPPORT_PROVIDE_TECHNICAL**           | Provide technical support              |  ❌   |     ❌     |    ❌    |  ✅   |
| **DATA_EXPORT_PLATFORM**                | Export platform data                   |  ❌   |     ❌     |    ❌    |  ✅   |
| **DATA_MANAGE_BACKUPS**                 | Manage data backups                    |  ❌   |     ❌     |    ❌    |  ✅   |
| **DATA_CONFIGURE_RETENTION**            | Configure data retention policies      |  ❌   |     ❌     |    ❌    |  ✅   |
| **DATA_HANDLE_DELETION_REQUESTS**       | Handle data deletion requests          |  ❌   |     ❌     |    ❌    |  ✅   |
| **DATA_MANAGE_API_ACCESS**              | Manage API access                      |  ❌   |     ❌     |    ❌    |  ✅   |
| **NOTIFICATIONS_CONFIGURE_PREFERENCES** | Configure notification preferences     |  ❌   |     ✅     |    ✅    |  ✅   |
| **NOTIFICATIONS_RECEIVE**               | Receive notifications                  |  ❌   |     ✅     |    ✅    |  ✅   |
| **NOTIFICATIONS_MARK_READ**             | Mark notifications as read             |  ❌   |     ✅     |    ✅    |  ✅   |
| **NOTIFICATIONS_VIEW_HISTORY**          | View notification history              |  ❌   |     ✅     |    ✅    |  ✅   |
| **REVIEWS_WRITE**                       | Write reviews                          |  ❌   |     ✅     |    ✅    |  ✅   |
| **REVIEWS_RATE**                        | Rate experiences                       |  ❌   |     ✅     |    ✅    |  ✅   |
| **REVIEWS_REPORT**                      | Report inappropriate reviews           |  ❌   |     ✅     |    ✅    |  ✅   |
| **REVIEWS_RESPOND**                     | Respond to reviews                     |  ❌   |     ❌     |    ✅    |  ✅   |

## Permission Groups

### Guest Permissions

- Account registration and login
- Basic job browsing and search
- Public company profile viewing
- Password reset functionality

### Job Seeker Permissions

- Complete profile management
- Resume and document management
- Advanced job search and applications
- Company interactions and reviews
- Interview participation
- Messaging and notifications

### Employer Permissions

- Company profile management
- Team and role management
- Job posting creation and management
- Application and candidate management
- Interview scheduling and management
- Analytics and reporting
- Subscription management
- Messaging capabilities

### Admin Permissions

- Complete system administration
- User and content moderation
- Company verification
- System configuration
- Platform analytics
- Support and data management
- All user permissions for testing

## Notes

1. **Inheritance**: Higher privilege levels inherit permissions from lower levels where applicable
2. **Subscription-based**: Some employer permissions may be limited by subscription tier
3. **Context-dependent**: Some permissions may require additional context validation (e.g., team member permissions within specific companies)
4. **Audit Trail**: All permission changes and sensitive actions should be logged for audit purposes
5. **Role-based**: Employer team members may have subset permissions based on their assigned roles
