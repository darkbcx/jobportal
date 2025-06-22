import { cookies } from 'next/headers';

export interface AuthUser {
  id: string;
  email: string;
  user_type: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
}

/**
 * Set user authentication cookie
 */
export async function setAuthCookie(user: AuthUser) {
  const cookieStore = await cookies();
  cookieStore.set('user', JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

/**
 * Clear user authentication cookie
 */
export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('user');
}

/**
 * Get user from authentication cookie
 */
export async function getAuthUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user');
  
  if (!userCookie) {
    return null;
  }

  try {
    const user = JSON.parse(userCookie.value);
    return user;
  } catch {
    return null;
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getAuthUser();
  return user !== null && user.is_active === true;
}

/**
 * Type guard to check if user is a JobSeeker
 */
export function isJobSeeker(user: AuthUser | null): user is AuthUser & { user_type: 'JOB_SEEKER' } {
  return user?.user_type === 'JOB_SEEKER';
}

/**
 * Type guard to check if user is an Employer
 */
export function isEmployer(user: AuthUser | null): user is AuthUser & { user_type: 'EMPLOYER' } {
  return user?.user_type === 'EMPLOYER';
}

/**
 * Type guard to check if user is an Admin
 */
export function isAdmin(user: AuthUser | null): user is AuthUser & { user_type: 'ADMIN' } {
  return user?.user_type === 'ADMIN';
}

/**
 * Get user display name
 */
export function getUserDisplayName(user: AuthUser | null): string {
  if (!user) return 'Unknown User';
  
  if (isJobSeeker(user)) {
    const firstName = (user as AuthUser & { first_name?: string }).first_name || '';
    const lastName = (user as AuthUser & { last_name?: string }).last_name || '';
    return `${firstName} ${lastName}`.trim() || user.email;
  }
  
  if (isEmployer(user)) {
    const companyName = (user as AuthUser & { company_name?: string }).company_name;
    return companyName || user.email;
  }
  
  return user.email;
}

/**
 * Check if user has permission to access a specific feature
 */
export function hasPermission(
  user: AuthUser | null, 
  requiredUserType: string | string[]
): boolean {
  if (!user || !user.is_active) return false;
  
  const requiredTypes = Array.isArray(requiredUserType) 
    ? requiredUserType 
    : [requiredUserType];
    
  return requiredTypes.includes(user.user_type);
} 