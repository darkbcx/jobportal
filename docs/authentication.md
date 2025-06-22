# Authentication System

This document describes the cookie-based authentication system implemented in the job portal application.

## Overview

The authentication system uses **HttpOnly cookies** for secure session management, providing better security than localStorage while maintaining a smooth user experience.

## Architecture

### Server-Side (Server Actions)
- **Location**: `actions/auth.ts`
- **Functions**:
  - `login(email, password)` - Authenticates user and sets cookie
  - `logout()` - Clears authentication cookie
  - `getCurrentUser()` - Retrieves user from cookie

### Client-Side (React Context)
- **Location**: `lib/contexts/UserContext.tsx`
- **Purpose**: Manages authentication state and provides hooks for components
- **Key Features**:
  - Automatic session restoration on page load
  - Loading and error states
  - Type-safe user data

### Middleware
- **Location**: `middleware.ts`
- **Purpose**: Protects routes and handles redirects
- **Protected Routes**: `/dashboard`, `/profile`, `/settings`, `/jobs/create`, `/applications`
- **Auth Routes**: `/login`, `/register`

### Utilities
- **Location**: `lib/auth-utils.ts`
- **Purpose**: Helper functions for cookie management and user type checking

## Security Features

### Cookie Configuration
```typescript
{
  httpOnly: true,           // Prevents XSS attacks
  secure: process.env.NODE_ENV === 'production',  // HTTPS only in production
  sameSite: 'lax',         // CSRF protection
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: '/',               // Cookie available site-wide
}
```

### Route Protection
- **Automatic Redirects**: Unauthenticated users are redirected to login
- **Auth Route Protection**: Logged-in users are redirected away from login/register
- **Redirect Preservation**: Original destination is preserved and restored after login

## Usage Examples

### Login Component
```tsx
import { useUser } from '@/lib/contexts/UserContext';

function LoginComponent() {
  const { login, state: { isLoading, error } } = useUser();
  
  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
    // User will be automatically redirected to intended destination
  };
}
```

### Protected Component
```tsx
import { useUser } from '@/lib/contexts/UserContext';

function ProtectedComponent() {
  const { state: { user, isAuthenticated } } = useUser();
  
  if (!isAuthenticated) {
    return <div>Please log in to access this page.</div>;
  }
  
  return <div>Welcome, {user.email}!</div>;
}
```

### Server-Side Authentication Check
```tsx
import { getCurrentUser } from '@/actions/auth';

export default async function ServerComponent() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }
  
  return <div>Hello, {user.email}!</div>;
}
```

## User Types

The system supports three user types:

### Job Seeker
- **Type**: `JOB_SEEKER`
- **Properties**: `first_name`, `last_name`, `profile_visibility`, `availability_status`
- **Features**: Job browsing, profile management

### Employer
- **Type**: `EMPLOYER`
- **Properties**: `company_name`
- **Features**: Job posting, application management

### Admin
- **Type**: `ADMIN`
- **Properties**: `admin_level`
- **Features**: User management, system administration

## Type Guards

Utility functions for type-safe user checking:

```tsx
import { isJobSeeker, isEmployer, isAdmin } from '@/lib/auth-utils';

const user = await getCurrentUser();

if (isJobSeeker(user)) {
  // TypeScript knows user is JobSeeker
  console.log(user.first_name);
}

if (isEmployer(user)) {
  // TypeScript knows user is Employer
  console.log(user.company_name);
}
```

## Demo Credentials

For testing purposes, use these demo credentials:

- **Email**: `demo@example.com`
- **Password**: `password`

## Testing the System

1. **Login Flow**:
   - Navigate to `/login`
   - Use demo credentials
   - Should redirect to dashboard

2. **Protected Routes**:
   - Try accessing `/dashboard` without login
   - Should redirect to login with `?redirect=/dashboard`
   - After login, should redirect back to dashboard

3. **Logout Flow**:
   - Click logout in header
   - Should clear session and redirect to home

4. **Session Persistence**:
   - Login and refresh page
   - Should maintain authentication state

## Migration from localStorage

The system has been migrated from localStorage to HttpOnly cookies for better security:

### Before (localStorage)
```tsx
localStorage.setItem('authToken', token);
localStorage.removeItem('authToken');
```

### After (Cookies)
```tsx
// Server-side
await setAuthCookie(user);
await clearAuthCookie();

// Client-side
const user = await getCurrentUser();
```

## Best Practices

1. **Always use server actions** for authentication operations
2. **Check authentication on both client and server** when needed
3. **Use type guards** for type-safe user data access
4. **Handle loading states** in UI components
5. **Implement proper error handling** for authentication failures

## Troubleshooting

### Common Issues

1. **Cookie not set**: Check if running on HTTPS in production
2. **Session not persisting**: Verify cookie configuration
3. **Redirect loops**: Check middleware configuration
4. **Type errors**: Ensure proper type imports and guards

### Debug Tips

1. Check browser dev tools for cookie presence
2. Verify middleware logs in console
3. Test with different user types
4. Check network tab for server action calls 