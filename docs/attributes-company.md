# Company Attributes

## Basic Information
- **company_name** (string, required) **(ESSENTIAL)** - Official company name
- **company_slug** (string, required, unique) **(ESSENTIAL)** - URL-friendly identifier
- **description** (text) **(ESSENTIAL)** - Company overview and mission statement
- **industry** (string) **(ESSENTIAL)** - Industry sector (e.g., "Technology", "Healthcare", "Finance")
- **company_size** (enum) - Number of employees ("1-10", "11-50", "51-200", "201-1000", "1000+")
- **founded_year** (integer) - Year the company was established
- **company_type** (enum) - Organization type ("Startup", "Corporation", "Non-profit", "Government", "Agency")

## Contact Information
- **email** (string, required) **(ESSENTIAL)** - Primary contact email
- **phone** (string) - Main phone number
- **website** (string) - Company website URL
- **linkedin_url** (string) - LinkedIn company page
- **twitter_handle** (string) - Twitter/X handle

## Address Information
- **headquarters_address** (text) - Main office address
- **city** (string) **(ESSENTIAL)** - Headquarters city
- **state_province** (string) - State or province
- **country** (string) **(ESSENTIAL)** - Country
- **postal_code** (string) - ZIP/postal code
- **timezone** (string) - Primary timezone

## Media & Branding
- **logo_url** (string) **(ESSENTIAL)** - Company logo image URL
- **banner_image_url** (string) - Header/banner image URL
- **brand_colors** (json) - Primary and secondary brand colors
- **tagline** (string) - Company tagline or slogan

## Verification & Status
- **is_verified** (boolean, default: false) - Company verification status
- **verification_documents** (json) - Uploaded verification files
- **account_status** (enum, default: "active") **(ESSENTIAL)** - "active", "suspended", "pending"
- **subscription_tier** (enum, default: "basic") - "basic", "premium", "enterprise"

## Business Details
- **tax_id** (string) - Business tax identification number
- **registration_number** (string) - Business registration number
- **legal_name** (string) - Official legal business name
- **business_license** (string) - Business license information

## Preferences & Settings
- **job_posting_limit** (integer, default: 5) - Maximum active job postings allowed
- **hiring_preferences** (json) - Remote work, visa sponsorship policies
- **application_process** (json) - Custom application workflow settings
- **notification_preferences** (json) - Email and system notification settings
- **privacy_settings** (json) - Company profile visibility settings

## Social Responsibility
- **diversity_statement** (text) - Diversity and inclusion commitment
- **benefits_offered** (json) - Health, retirement, vacation benefits
- **company_culture** (text) - Workplace culture description
- **remote_work_policy** (enum) - "fully-remote", "hybrid", "office-only", "flexible"

## Performance Metrics
- **rating** (decimal) - Average company rating from employees/applicants
- **total_reviews** (integer, default: 0) - Number of company reviews
- **response_rate** (decimal) - Application response rate percentage
- **avg_hiring_time** (integer) - Average days to hire

## Timestamps
- **created_at** (datetime) **(ESSENTIAL)** - Account creation date
- **updated_at** (datetime) **(ESSENTIAL)** - Last profile update
- **last_login** (datetime) - Last employer login
- **profile_completeness** (integer) - Profile completion percentage

## Related Entities
- **admin_users** (relation) - Company administrators
- **job_postings** (relation) - Active and past job listings
- **applications_received** (relation) - All applications to company jobs
- **interviews_scheduled** (relation) - Interview records
- **hired_candidates** (relation) - Successfully hired applicants 