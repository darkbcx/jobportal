# Domain Model - Job Portal Platform

## Overview
This domain model represents the core entities, attributes, and relationships for the job portal platform based on the user stories analysis.

## Core Entities

### 1. User (Abstract Base)
**Attributes:**
- `id`: Unique identifier
- `email`: User's email address
- `password_hash`: Encrypted password
- `user_type`: Enum (GUEST, JOB_SEEKER, EMPLOYER, ADMIN)
- `is_active`: Boolean flag for account status
- `created_at`: Account creation timestamp
- `updated_at`: Last update timestamp
- `last_login`: Last login timestamp

**Relationships:**
- Has many `Notifications`
- Has many `Messages` (sent and received)
- Has one `NotificationPreferences`

### 2. JobSeeker (extends User)
**Attributes:**
- `first_name`: First name
- `last_name`: Last name
- `profile_photo_url`: URL to profile photo
- `phone_number`: Contact number
- `location`: Current location
- `profile_visibility`: Enum (PUBLIC, PRIVATE, EMPLOYERS_ONLY)
- `public_profile_url`: Shareable public profile URL
- `bio`: Personal description
- `availability_status`: Enum (ACTIVELY_LOOKING, OPEN_TO_OFFERS, NOT_LOOKING)

**Relationships:**
- Has many `Resumes`
- Has many `EducationEntries`
- Has many `WorkExperiences`
- Has many `Skills`
- Has many `Certifications`
- Has many `Languages`
- Has many `PortfolioItems`
- Has many `Applications`
- Has many `SavedJobs`
- Has many `JobAlerts`
- Has many `CompanyFollows`
- Has many `CompanyReviews`
- Has many `Interviews`

### 3. Employer (extends User)
**Attributes:**
- `company_name`: Company name
- `company_description`: Company description
- `industry`: Company industry
- `company_size`: Enum (STARTUP, SMALL, MEDIUM, LARGE, ENTERPRISE)
- `website`: Company website URL
- `logo_url`: Company logo URL
- `headquarters_location`: Main office location
- `subscription_plan_id`: Current subscription plan

**Relationships:**
- Belongs to one `Company`
- Has many `JobPostings`
- Has many `TeamMembers`
- Has many `JobPostingTemplates`
- Has many `InterviewTemplates`
- Has many `CandidateReviews`
- Has one `SubscriptionPlan`
- Has one `BillingInfo`

### 4. Admin (extends User)
**Attributes:**
- `admin_level`: Enum (SUPER_ADMIN, MODERATOR, SUPPORT)
- `permissions`: JSON array of specific permissions

**Relationships:**
- Has many `SystemSettings`
- Has many `ModerationActions`

### 5. Company
**Attributes:**
- `id`: Unique identifier
- `name`: Company name
- `description`: Company description
- `industry`: Industry category
- `size`: Company size category
- `founded_year`: Year company was founded
- `website`: Company website
- `logo_url`: Company logo URL
- `headquarters`: Main office location
- `locations`: JSON array of office locations
- `culture_description`: Company culture details
- `benefits`: JSON array of company benefits
- `rating_average`: Average rating from reviews
- `review_count`: Total number of reviews
- `is_verified`: Boolean for verified companies
- `created_at`: Registration timestamp
- `updated_at`: Last update timestamp

**Relationships:**
- Has many `Employers`
- Has many `JobPostings`
- Has many `CompanyReviews`
- Has many `CompanyFollows`

### 6. JobPosting
**Attributes:**
- `id`: Unique identifier
- `title`: Job title
- `description`: Job description
- `requirements`: Job requirements
- `responsibilities`: Job responsibilities
- `employment_type`: Enum (FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP)
- `experience_level`: Enum (ENTRY, MID, SENIOR, EXECUTIVE)
- `salary_min`: Minimum salary
- `salary_max`: Maximum salary
- `salary_currency`: Currency code
- `location`: Job location
- `is_remote`: Boolean for remote work option
- `remote_type`: Enum (FULLY_REMOTE, HYBRID, OFFICE_ONLY)
- `status`: Enum (DRAFT, PUBLISHED, PAUSED, EXPIRED, CLOSED)
- `expires_at`: Job posting expiration date
- `application_deadline`: Application deadline
- `view_count`: Number of views
- `application_count`: Number of applications
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp
- `published_at`: Publication timestamp
- `archived_at`: Archive timestamp

**Relationships:**
- Belongs to one `Company`
- Belongs to one `Employer` (creator)
- Has many `Applications`
- Has many `SavedJobs`
- Has many `JobAlerts` (matches)
- Has many `RequiredSkills`
- Has many `JobPostingAnalytics`

### 7. Application
**Attributes:**
- `id`: Unique identifier
- `job_seeker_id`: Applicant ID
- `job_posting_id`: Job posting ID
- `cover_letter`: Application cover letter
- `resume_id`: Resume used for application
- `salary_expectation`: Expected salary
- `status`: Enum (SUBMITTED, UNDER_REVIEW, INTERVIEWED, OFFERED, HIRED, REJECTED, WITHDRAWN)
- `applied_at`: Application submission timestamp
- `updated_at`: Last status update timestamp
- `notes`: Internal notes from employer

**Relationships:**
- Belongs to one `JobSeeker`
- Belongs to one `JobPosting`
- Belongs to one `Resume`
- Has many `Interviews`
- Has many `Messages`
- Has many `StatusChanges`

### 8. Resume
**Attributes:**
- `id`: Unique identifier
- `job_seeker_id`: Owner ID
- `filename`: Original filename
- `file_url`: Storage URL
- `file_type`: File type (PDF, DOC, etc.)
- `file_size`: File size in bytes
- `is_primary`: Boolean for primary resume
- `uploaded_at`: Upload timestamp

**Relationships:**
- Belongs to one `JobSeeker`
- Has many `Applications`

### 9. Education
**Attributes:**
- `id`: Unique identifier
- `job_seeker_id`: Owner ID
- `institution`: School/University name
- `degree`: Degree type
- `field_of_study`: Major/Field
- `start_date`: Start date
- `end_date`: End date (null if current)
- `gpa`: Grade point average
- `description`: Additional details

**Relationships:**
- Belongs to one `JobSeeker`

### 10. WorkExperience
**Attributes:**
- `id`: Unique identifier
- `job_seeker_id`: Owner ID
- `company_name`: Company name
- `position`: Job title
- `description`: Job description
- `start_date`: Start date
- `end_date`: End date (null if current)
- `is_current`: Boolean for current position
- `location`: Work location

**Relationships:**
- Belongs to one `JobSeeker`

### 11. Skill
**Attributes:**
- `id`: Unique identifier
- `name`: Skill name
- `category`: Skill category
- `is_verified`: Boolean for platform verification

**Relationships:**
- Has many `JobSeekerSkills`
- Has many `JobPostingSkills`

### 12. JobSeekerSkill
**Attributes:**
- `job_seeker_id`: Job seeker ID
- `skill_id`: Skill ID
- `proficiency_level`: Enum (BEGINNER, INTERMEDIATE, ADVANCED, EXPERT)
- `years_of_experience`: Years of experience

**Relationships:**
- Belongs to one `JobSeeker`
- Belongs to one `Skill`

### 13. Certification
**Attributes:**
- `id`: Unique identifier
- `job_seeker_id`: Owner ID
- `name`: Certification name
- `issuing_organization`: Issuing body
- `issue_date`: Issue date
- `expiry_date`: Expiry date
- `credential_id`: Credential ID
- `credential_url`: Verification URL

**Relationships:**
- Belongs to one `JobSeeker`

### 14. Language
**Attributes:**
- `id`: Unique identifier
- `name`: Language name
- `code`: Language code (ISO 639-1)

**Relationships:**
- Has many `JobSeekerLanguages`

### 15. JobSeekerLanguage
**Attributes:**
- `job_seeker_id`: Job seeker ID
- `language_id`: Language ID
- `proficiency_level`: Enum (BASIC, CONVERSATIONAL, FLUENT, NATIVE)

**Relationships:**
- Belongs to one `JobSeeker`
- Belongs to one `Language`

### 16. PortfolioItem
**Attributes:**
- `id`: Unique identifier
- `job_seeker_id`: Owner ID
- `title`: Project title
- `description`: Project description
- `project_url`: Live project URL
- `repository_url`: Code repository URL
- `image_url`: Project screenshot
- `technologies_used`: JSON array of technologies
- `created_at`: Creation timestamp

**Relationships:**
- Belongs to one `JobSeeker`

### 17. SavedJob
**Attributes:**
- `id`: Unique identifier
- `job_seeker_id`: Job seeker ID
- `job_posting_id`: Job posting ID
- `saved_at`: Save timestamp
- `notes`: Personal notes

**Relationships:**
- Belongs to one `JobSeeker`
- Belongs to one `JobPosting`

### 18. JobAlert
**Attributes:**
- `id`: Unique identifier
- `job_seeker_id`: Owner ID
- `name`: Alert name
- `keywords`: Search keywords
- `location`: Preferred location
- `employment_type`: Preferred employment type
- `experience_level`: Preferred experience level
- `salary_min`: Minimum salary
- `salary_max`: Maximum salary
- `is_remote`: Remote work preference
- `is_active`: Boolean for active alerts
- `frequency`: Enum (INSTANT, DAILY, WEEKLY)
- `created_at`: Creation timestamp

**Relationships:**
- Belongs to one `JobSeeker`

### 19. CompanyFollow
**Attributes:**
- `id`: Unique identifier
- `job_seeker_id`: Follower ID
- `company_id`: Company ID
- `followed_at`: Follow timestamp

**Relationships:**
- Belongs to one `JobSeeker`
- Belongs to one `Company`

### 20. Interview
**Attributes:**
- `id`: Unique identifier
- `application_id`: Application ID
- `interviewer_id`: Interviewer (employer) ID
- `scheduled_at`: Interview date/time
- `duration`: Interview duration in minutes
- `interview_type`: Enum (PHONE, VIDEO, IN_PERSON)
- `location`: Interview location (if in-person)
- `meeting_link`: Video call link
- `status`: Enum (SCHEDULED, CONFIRMED, COMPLETED, CANCELLED, NO_SHOW)
- `candidate_attendance`: Enum (ATTENDED, NO_SHOW, CANCELLED)
- `interviewer_notes`: Post-interview notes
- `interview_template_id`: Template used
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

**Relationships:**
- Belongs to one `Application`
- Belongs to one `Employer` (interviewer)
- Belongs to one `InterviewTemplate`

### 21. InterviewTemplate
**Attributes:**
- `id`: Unique identifier
- `employer_id`: Creator ID
- `name`: Template name
- `description`: Template description
- `duration`: Default duration
- `interview_type`: Default interview type
- `questions`: JSON array of interview questions
- `evaluation_criteria`: JSON array of criteria
- `is_default`: Boolean for default template

**Relationships:**
- Belongs to one `Employer`
- Has many `Interviews`

### 22. Review
**Attributes:**
- `id`: Unique identifier
- `reviewer_id`: Reviewer user ID
- `reviewer_type`: Enum (JOB_SEEKER, EMPLOYER)
- `reviewee_id`: Reviewee ID (company or candidate)
- `reviewee_type`: Enum (COMPANY, CANDIDATE)
- `rating`: Rating (1-5 scale)
- `title`: Review title
- `content`: Review content
- `is_anonymous`: Boolean for anonymous reviews
- `is_verified`: Boolean for verified reviews
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

**Relationships:**
- Belongs to one `User` (reviewer)
- Polymorphic relationship to Company or JobSeeker (reviewee)

### 23. Message
**Attributes:**
- `id`: Unique identifier
- `sender_id`: Sender user ID
- `recipient_id`: Recipient user ID
- `application_id`: Related application (optional)
- `subject`: Message subject
- `content`: Message content
- `is_read`: Boolean for read status
- `sent_at`: Send timestamp
- `read_at`: Read timestamp

**Relationships:**
- Belongs to one `User` (sender)
- Belongs to one `User` (recipient)
- Belongs to one `Application` (optional)

### 24. Notification
**Attributes:**
- `id`: Unique identifier
- `user_id`: Recipient user ID
- `type`: Notification type
- `title`: Notification title
- `content`: Notification content
- `data`: JSON data for notification context
- `is_read`: Boolean for read status
- `delivery_method`: Enum (EMAIL, SMS, IN_APP, PUSH)
- `delivery_status`: Enum (PENDING, SENT, DELIVERED, FAILED)
- `created_at`: Creation timestamp
- `read_at`: Read timestamp
- `sent_at`: Delivery timestamp

**Relationships:**
- Belongs to one `User`

### 25. NotificationPreferences
**Attributes:**
- `id`: Unique identifier
- `user_id`: User ID
- `email_enabled`: Boolean for email notifications
- `sms_enabled`: Boolean for SMS notifications
- `in_app_enabled`: Boolean for in-app notifications
- `push_enabled`: Boolean for push notifications
- `frequency`: Enum (INSTANT, DAILY_DIGEST, WEEKLY_SUMMARY)
- `application_updates`: Boolean
- `job_matches`: Boolean
- `interview_reminders`: Boolean
- `company_updates`: Boolean
- `profile_views`: Boolean
- `message_notifications`: Boolean
- `marketing_emails`: Boolean

**Relationships:**
- Belongs to one `User`

### 26. SubscriptionPlan
**Attributes:**
- `id`: Unique identifier
- `name`: Plan name
- `description`: Plan description
- `price`: Plan price
- `currency`: Currency code
- `billing_cycle`: Enum (MONTHLY, YEARLY)
- `job_posting_limit`: Number of job postings allowed
- `featured_posting_limit`: Number of featured postings
- `applicant_export_limit`: Export limit per month
- `team_member_limit`: Team collaboration limit
- `analytics_enabled`: Boolean for analytics access
- `priority_support`: Boolean for priority support
- `is_active`: Boolean for active plans

**Relationships:**
- Has many `Employers`

### 27. BillingInfo
**Attributes:**
- `id`: Unique identifier
- `employer_id`: Employer ID
- `subscription_plan_id`: Current plan ID
- `billing_email`: Billing contact email
- `billing_address`: Billing address
- `payment_method`: Payment method details
- `next_billing_date`: Next billing date
- `subscription_status`: Enum (ACTIVE, CANCELLED, SUSPENDED, EXPIRED)
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

**Relationships:**
- Belongs to one `Employer`
- Belongs to one `SubscriptionPlan`

### 28. TeamMember
**Attributes:**
- `id`: Unique identifier
- `employer_id`: Employer ID (team owner)
- `member_email`: Team member email
- `role`: Enum (ADMIN, RECRUITER, INTERVIEWER, VIEWER)
- `permissions`: JSON array of specific permissions
- `status`: Enum (INVITED, ACTIVE, SUSPENDED)
- `invited_at`: Invitation timestamp
- `joined_at`: Join timestamp

**Relationships:**
- Belongs to one `Employer`

### 29. JobPostingTemplate
**Attributes:**
- `id`: Unique identifier
- `employer_id`: Creator ID
- `name`: Template name
- `title`: Job title template
- `description`: Job description template
- `requirements`: Requirements template
- `responsibilities`: Responsibilities template
- `employment_type`: Default employment type
- `is_default`: Boolean for default template

**Relationships:**
- Belongs to one `Employer`

### 30. SystemSettings
**Attributes:**
- `id`: Unique identifier
- `key`: Setting key
- `value`: Setting value
- `data_type`: Enum (STRING, INTEGER, BOOLEAN, JSON)
- `description`: Setting description
- `is_public`: Boolean for public settings
- `updated_by`: Admin user ID
- `updated_at`: Last update timestamp

**Relationships:**
- Belongs to one `Admin` (updated_by)

## Key Relationships Summary

### User Hierarchy
```
User (abstract)
├── JobSeeker
├── Employer  
└── Admin
```

### Core Application Flow
```
JobSeeker → Application → JobPosting ← Employer
    ↓            ↓           ↓
Interview → Application → JobPosting
    ↓            ↓           ↓
 Review    →   Review   →  Company
```

### Notification System
```
User → NotificationPreferences
  ↓
Notification (Email, SMS, In-App, Push)
```

### Company Ecosystem
```
Company ← Employer → JobPosting
   ↓         ↓         ↓
CompanyFollow  TeamMember  Application
   ↓         ↓         ↓
JobSeeker → Interview → JobSeeker
```

## Business Rules

1. **User Types**: A user can only have one primary type (JobSeeker, Employer, or Admin)
2. **Applications**: A job seeker can only apply once per job posting
3. **Interviews**: Can only be scheduled for applications in valid status
4. **Subscriptions**: Employers must have active subscription for premium features
5. **Notifications**: Delivery based on user preferences and system settings
6. **Reviews**: Can only be created after completed interactions (interviews, hiring)
7. **Job Alerts**: Automatically match against new job postings
8. **File Uploads**: Size and type restrictions apply for resumes and photos
9. **Profile Visibility**: Affects searchability and profile access
10. **Team Members**: Role-based access control for employer collaboration

This domain model provides a comprehensive foundation for the job portal platform, capturing all the entities, relationships, and business rules identified from the user stories. 