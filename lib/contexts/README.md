# UserContext Provider

A comprehensive React context provider for managing user authentication and profile state in the job portal application.

## Features

- **Authentication Management**: Login, logout, and registration functionality
- **User Profile Management**: Update user profile information
- **Session Persistence**: Automatic token management and session restoration
- **Type Safety**: Full TypeScript support with proper type guards
- **Error Handling**: Comprehensive error handling and loading states
- **Multiple User Types**: Support for JobSeeker, Employer, and Admin user types

## Usage

### Basic Setup

The `UserProvider` is already configured in the root layout (`app/layout.tsx`):

```tsx
import { UserProvider } from '@/lib/contexts/UserContext';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
```

### Using the Context

#### Authentication Hook

```tsx
import { useUser } from '@/lib/contexts/UserContext';

function LoginComponent() {
  const { login, logout, register, state: { user, isAuthenticated, isLoading, error } } = useUser();

  const handleLogin = async () => {
    await login('user@example.com', 'password');
  };

  const handleLogout = async () => {
    await logout();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

#### User Profile Hook

```tsx
import { useUserProfile } from '@/lib/contexts/UserContext';

function ProfileComponent() {
  const { user, updateUser, refreshUser } = useUserProfile();

  const handleUpdateProfile = async () => {
    await updateUser({
      first_name: 'John',
      last_name: 'Doe',
      location: 'New York'
    });
  };

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <button onClick={handleUpdateProfile}>Update Profile</button>
    </div>
  );
}
```

#### Type Guards

```tsx
import { isJobSeeker, isEmployer, isAdmin } from '@/lib/contexts/UserContext';

function UserDashboard() {
  const { state: { user } } = useUser();

  if (isJobSeeker(user)) {
    return <JobSeekerDashboard user={user} />;
  }

  if (isEmployer(user)) {
    return <EmployerDashboard user={user} />;
  }

  if (isAdmin(user)) {
    return <AdminDashboard user={user} />;
  }

  return <GuestDashboard />;
}
```