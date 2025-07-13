// Domain Model Types for Job Portal Platform

// ============================================================================
// STRING LITERAL UNION TYPES
// ============================================================================

export type UserType = 'GUEST' | 'JOB_SEEKER' | 'EMPLOYER' | 'ADMIN';

export type ProfileVisibility = 'PUBLIC' | 'PRIVATE' | 'EMPLOYERS_ONLY';

export type AvailabilityStatus = 'ACTIVELY_LOOKING' | 'OPEN_TO_OFFERS' | 'NOT_LOOKING';

export type CompanySize = 'STARTUP' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'ENTERPRISE';

export type AdminLevel = 'SUPER_ADMIN' | 'MODERATOR' | 'SUPPORT';

export type EmploymentType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP';

export type ExperienceLevel = 'ENTRY' | 'MID' | 'SENIOR' | 'EXECUTIVE';

export type RemoteType = 'FULLY_REMOTE' | 'HYBRID' | 'OFFICE_ONLY';

export type JobPostingStatus = 'DRAFT' | 'PUBLISHED' | 'PAUSED' | 'EXPIRED' | 'CLOSED';

export type ApplicationStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'INTERVIEWED' | 'OFFERED' | 'HIRED' | 'REJECTED' | 'WITHDRAWN';

export type ProficiencyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';

export type LanguageProficiency = 'BASIC' | 'CONVERSATIONAL' | 'FLUENT' | 'NATIVE';

export type AlertFrequency = 'INSTANT' | 'DAILY' | 'WEEKLY';

export type InterviewType = 'PHONE' | 'VIDEO' | 'IN_PERSON';

export type InterviewStatus = 'SCHEDULED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';

export type AttendanceStatus = 'ATTENDED' | 'NO_SHOW' | 'CANCELLED';

export type ReviewerType = 'JOB_SEEKER' | 'EMPLOYER';

export type RevieweeType = 'EMPLOYER' | 'CANDIDATE';

export type DeliveryMethod = 'EMAIL' | 'SMS' | 'IN_APP' | 'PUSH';

export type DeliveryStatus = 'PENDING' | 'SENT' | 'DELIVERED' | 'FAILED';

export type NotificationFrequency = 'INSTANT' | 'DAILY_DIGEST' | 'WEEKLY_SUMMARY';

export type BillingCycle = 'MONTHLY' | 'YEARLY';

export type SubscriptionStatus = 'ACTIVE' | 'CANCELLED' | 'SUSPENDED' | 'EXPIRED';

export type TeamMemberRole = 'ADMIN' | 'RECRUITER' | 'INTERVIEWER' | 'VIEWER';

export type TeamMemberStatus = 'INVITED' | 'ACTIVE' | 'SUSPENDED';

export type DataType = 'STRING' | 'INTEGER' | 'BOOLEAN' | 'JSON';

// ============================================================================
// BASE INTERFACES
// ============================================================================

export interface BaseEntity {
  id: string;
  created_at: Date;
  updated_at: Date;
}

// ============================================================================
// USER ENTITIES
// ============================================================================

export interface User extends BaseEntity {
  email: string;
  password_hash: string;
  user_type: UserType;
  is_active: boolean;
  last_login?: Date;
}

export type AuthUser = Omit<User, 'password_hash'>;

export interface JobSeeker extends BaseEntity {
  user_id: string;
  first_name: string;
  last_name: string;
  profile_photo_url?: string;
  phone_number?: string;
  location?: string;
  profile_visibility: ProfileVisibility;
  public_profile_url?: string;
  bio?: string;
  availability_status: AvailabilityStatus;
}

export interface Employer extends BaseEntity {
  user_id: string;
  company_name: string;
  company_description?: string;
  industry?: string;
  company_size?: CompanySize;
  website?: string;
  logo_url?: string;
  headquarters_location?: string;
  subscription_plan_id?: string;
  founded_year?: number;
  locations?: string[];
  culture_description?: string;
  benefits?: string[];
  rating_average?: number;
  review_count: number;
  is_verified: boolean;
}

export interface Admin extends BaseEntity {
  user_id: string;
  admin_level: AdminLevel;
  permissions: string[];
}

// ============================================================================
// JOB RELATED ENTITIES
// ============================================================================

export interface JobPosting extends BaseEntity {
  title: string;
  description: string;
  requirements?: string;
  responsibilities?: string;
  employment_type: EmploymentType;
  experience_level: ExperienceLevel;
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
  location?: string;
  is_remote: boolean;
  remote_type?: RemoteType;
  status: JobPostingStatus;
  expires_at?: Date;
  application_deadline?: Date;
  view_count: number;
  application_count: number;
  published_at?: Date;
  archived_at?: Date;
  employer_id: string;
  // --- RELATED DATA ---
  employer?: Employer;
  required_skills?: string[];
}

export interface Application extends BaseEntity {
  job_seeker_id: string;
  job_posting_id: string;
  cover_letter?: string;
  // resume_id: string;
  salary_expectation?: number;
  status: ApplicationStatus;
  applied_at: Date;
  notes?: string;
}

export interface SavedJob extends BaseEntity {
  job_seeker_id: string;
  job_posting_id: string;
  saved_at: Date;
  notes?: string;
}

export interface JobAlert extends BaseEntity {
  job_seeker_id: string;
  name: string;
  keywords?: string;
  location?: string;
  employment_type?: EmploymentType;
  experience_level?: ExperienceLevel;
  salary_min?: number;
  salary_max?: number;
  is_remote?: boolean;
  is_active: boolean;
  frequency: AlertFrequency;
}

// ============================================================================
// PROFILE ENTITIES
// ============================================================================

export interface Resume extends BaseEntity {
  job_seeker_id: string;
  filename: string;
  file_url: string;
  file_type: string;
  file_size: number;
  is_primary: boolean;
  uploaded_at: Date;
}

export interface Education extends BaseEntity {
  job_seeker_id: string;
  institution: string;
  degree: string;
  field_of_study?: string;
  start_date: Date;
  end_date?: Date;
  gpa?: number;
  description?: string;
}

export interface WorkExperience extends BaseEntity {
  job_seeker_id: string;
  company_name: string;
  position: string;
  description?: string;
  start_date: Date;
  end_date?: Date;
  is_current: boolean;
  location?: string;
}

export interface Skill extends BaseEntity {
  name: string;
  category?: string;
  is_verified: boolean;
}

export interface JobSeekerSkill {
  job_seeker_id: string;
  skill_id: string;
  proficiency_level: ProficiencyLevel;
  years_of_experience?: number;
}

export interface JobPostingSkill {
  job_posting_id: string;
  skill_id: string;
  is_required: boolean;
}

export interface Certification extends BaseEntity {
  job_seeker_id: string;
  name: string;
  issuing_organization: string;
  issue_date: Date;
  expiry_date?: Date;
  credential_id?: string;
  credential_url?: string;
}

export interface Language extends BaseEntity {
  name: string;
  code: string; // ISO 639-1
}

export interface JobSeekerLanguage {
  job_seeker_id: string;
  language_id: string;
  proficiency_level: LanguageProficiency;
}

export interface PortfolioItem extends BaseEntity {
  job_seeker_id: string;
  title: string;
  description?: string;
  project_url?: string;
  repository_url?: string;
  image_url?: string;
  technologies_used?: string[];
}

// ============================================================================
// COMPANY FOLLOW ENTITY
// ============================================================================

export interface CompanyFollow extends BaseEntity {
  job_seeker_id: string;
  employer_id: string;
  followed_at: Date;
}

// ============================================================================
// INTERVIEW ENTITIES
// ============================================================================

export interface Interview extends BaseEntity {
  application_id: string;
  interviewer_id: string;
  scheduled_at: Date;
  duration?: number;
  interview_type: InterviewType;
  location?: string;
  meeting_link?: string;
  status: InterviewStatus;
  candidate_attendance?: AttendanceStatus;
  interviewer_notes?: string;
  interview_template_id?: string;
}

export interface InterviewTemplate extends BaseEntity {
  employer_id: string;
  name: string;
  description?: string;
  duration?: number;
  interview_type?: InterviewType;
  questions?: string[];
  evaluation_criteria?: string[];
  is_default: boolean;
}

// ============================================================================
// REVIEW ENTITY
// ============================================================================

export interface Review extends BaseEntity {
  reviewer_id: string;
  reviewer_type: ReviewerType;
  reviewee_id: string;
  reviewee_type: RevieweeType;
  rating: number; // 1-5 scale
  title?: string;
  content: string;
  is_anonymous: boolean;
  is_verified: boolean;
}

// ============================================================================
// MESSAGING ENTITIES
// ============================================================================

export interface Message extends BaseEntity {
  sender_id: string;
  recipient_id: string;
  application_id?: string;
  subject?: string;
  content: string;
  is_read: boolean;
  sent_at: Date;
  read_at?: Date;
}

export interface Notification extends BaseEntity {
  user_id: string;
  type: string;
  title: string;
  content: string;
  data?: Record<string, unknown>;
  is_read: boolean;
  delivery_method: DeliveryMethod;
  delivery_status: DeliveryStatus;
  read_at?: Date;
  sent_at?: Date;
}

export interface NotificationPreferences extends BaseEntity {
  user_id: string;
  email_enabled: boolean;
  sms_enabled: boolean;
  in_app_enabled: boolean;
  push_enabled: boolean;
  frequency: NotificationFrequency;
  application_updates: boolean;
  job_matches: boolean;
  interview_reminders: boolean;
  employer_updates: boolean;
  profile_views: boolean;
  message_notifications: boolean;
  marketing_emails: boolean;
}

// ============================================================================
// SUBSCRIPTION ENTITIES
// ============================================================================

export interface SubscriptionPlan extends BaseEntity {
  name: string;
  description?: string;
  price: number;
  currency: string;
  billing_cycle: BillingCycle;
  job_posting_limit: number;
  featured_posting_limit: number;
  applicant_export_limit: number;
  team_member_limit: number;
  analytics_enabled: boolean;
  priority_support: boolean;
  is_active: boolean;
}

export interface BillingInfo extends BaseEntity {
  employer_id: string;
  subscription_plan_id: string;
  billing_email: string;
  billing_address?: string;
  payment_method?: string;
  next_billing_date: Date;
  subscription_status: SubscriptionStatus;
}

// ============================================================================
// TEAM MANAGEMENT ENTITIES
// ============================================================================

export interface TeamMember extends BaseEntity {
  employer_id: string;
  member_email: string;
  role: TeamMemberRole;
  permissions?: string[];
  status: TeamMemberStatus;
  invited_at: Date;
  joined_at?: Date;
}

export interface JobPostingTemplate extends BaseEntity {
  employer_id: string;
  name: string;
  title?: string;
  description?: string;
  requirements?: string;
  responsibilities?: string;
  employment_type?: EmploymentType;
  is_default: boolean;
}

// ============================================================================
// SYSTEM ENTITIES
// ============================================================================

export interface SystemSettings extends BaseEntity {
  key: string;
  value: string;
  data_type: DataType;
  description?: string;
  is_public: boolean;
  updated_by: string;
}

// ============================================================================
// RELATION ENTITIES
// ============================================================================

export interface JobPostingSkill {
  job_posting_id: string;
  skill_id: string;
  is_required: boolean;
}

export interface StatusChange extends BaseEntity {
  application_id: string;
  from_status: ApplicationStatus;
  to_status: ApplicationStatus;
  changed_by: string;
  reason?: string;
  notes?: string;
}

export interface JobPostingAnalytics extends BaseEntity {
  job_posting_id: string;
  date: Date;
  views: number;
  applications: number;
  saves: number;
  shares: number;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ============================================================================
// SEARCH AND FILTER TYPES
// ============================================================================

export interface JobSearchFilters {
  keywords?: string;
  location?: string;
  employment_type?: EmploymentType[];
  experience_level?: ExperienceLevel[];
  salary_min?: number;
  salary_max?: number;
  is_remote?: boolean;
  remote_type?: RemoteType[];
  company_size?: CompanySize[];
  posted_within_days?: number;
}

export interface CandidateSearchFilters {
  keywords?: string;
  location?: string;
  experience_level?: ExperienceLevel[];
  skills?: string[];
  availability_status?: AvailabilityStatus[];
  education_level?: string;
  years_of_experience_min?: number;
  years_of_experience_max?: number;
}

// ============================================================================
// DASHBOARD TYPES
// ============================================================================

export interface DashboardActivity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface JobSeekerDashboard {
  profile_completion: number;
  active_applications: number;
  saved_jobs: number;
  profile_views: number;
  interview_requests: number;
  job_alerts_count: number;
  recent_activities: DashboardActivity[];
}

export interface EmployerDashboard {
  active_job_postings: number;
  total_applications: number;
  pending_interviews: number;
  hired_candidates: number;
  subscription_status: SubscriptionStatus;
  team_members_count: number;
  recent_activities: DashboardActivity[];
}

// ============================================================================
// FORM TYPES
// ============================================================================

export interface CreateJobPostingForm {
  title: string;
  description: string;
  requirements?: string;
  responsibilities?: string;
  employment_type: EmploymentType;
  experience_level: ExperienceLevel;
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
  location?: string;
  is_remote: boolean;
  remote_type?: RemoteType;
  application_deadline?: Date;
  required_skills?: string[];
}

export interface JobSeekerProfileForm {
  first_name: string;
  last_name: string;
  phone_number?: string;
  location?: string;
  bio?: string;
  availability_status: AvailabilityStatus;
  profile_visibility: ProfileVisibility;
}

export interface ApplicationForm {
  cover_letter?: string;
  resume_id: string;
  salary_expectation?: number;
}

// ============================================================================
// 
// ============================================================================
export interface listParams {
  offset?: number;
  limit?: number;
}

export interface applicationFilter {
  status?: ApplicationStatus;
  job_posting_id?: string;
  job_seeker_id?: string;
  employer_id?: string;
}
