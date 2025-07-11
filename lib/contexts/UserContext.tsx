'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode, useCallback } from 'react';
import { User, JobSeeker, Employer, Admin, UserType } from '../types';
import { login as authLogin, logout as authLogout, getCurrentUser } from '@/actions/auth';
import { getJobSeekerByUserId } from '@/actions/jobseeker';
import { getEmployerByUserId } from '@/actions/employer';

// ============================================================================
// CONTEXT TYPES
// ============================================================================

interface UserState {
  user: User | null;
  profile: JobSeeker | Employer | Admin | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

type UserAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_PROFILE'; payload: JobSeeker | Employer | Admin | null }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

interface UserContextType {
  state: UserState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  updateUser: (userData: Partial<User | JobSeeker | Employer | Admin>) => Promise<void>;
  refreshUser: () => Promise<void>;
  loadProfile: () => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  userType: UserType;
  firstName?: string;
  lastName?: string;
  companyName?: string;
}

// ============================================================================
// REDUCER
// ============================================================================

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        error: null,
        isLoading: false,
      };
    case 'SET_PROFILE':
      return { ...state, profile: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        profile: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

// ============================================================================
// CONTEXT
// ============================================================================

const UserContext = createContext<UserContextType | undefined>(undefined);

// ============================================================================
// PROVIDER
// ============================================================================

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
    profile: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  // ============================================================================
  // AUTHENTICATION FUNCTIONS
  // ============================================================================

  const login = async (email: string, password: string): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      // Use the server action for login
      const result = await authLogin(email, password);

      if (result.error) {
        dispatch({ type: 'SET_ERROR', payload: result.error });
        return;
      }

      if (result.success && result.user) {
        // Cast the user data to match our TypeScript types
        const user = result.user as unknown as User;
        dispatch({ type: 'SET_USER', payload: user });
        await loadProfileForUser(user);
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Login failed' });
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Login failed' 
      });
    }
  };

  const logout = async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Call server action to clear cookie
      await authLogout();
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, clear local state
      dispatch({ type: 'LOGOUT' });
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      dispatch({ type: 'SET_USER', payload: userData as unknown as User });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Registration failed' 
      });
    }
  };

  const updateUser = async (userData: Partial<User | JobSeeker | Employer | Admin>): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      // For mock implementation, just update the local state
      // In a real implementation, you would call the update API
      const currentUser = state.user;
      if (!currentUser) {
        dispatch({ type: 'SET_ERROR', payload: 'No user logged in' });
        return;
      }

      const updatedUser = { ...currentUser, ...userData };
      dispatch({ type: 'SET_USER', payload: updatedUser });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Update failed' 
      });
    }
  };

  const refreshUser = useCallback(async (): Promise<void> => {
    try {
      // Get user from server-side cookie
      dispatch({ type: 'SET_LOADING', payload: true });
      const user = await getCurrentUser();
      dispatch({ type: 'SET_LOADING', payload: false });
      if (user) {
          const typedUser = user as unknown as User;
        dispatch({ type: 'SET_USER', payload: typedUser });
        await loadProfileForUser(typedUser);
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    } catch (error) {
      console.error('Refresh user error:', error);
      dispatch({ type: 'LOGOUT' });
    }
  }, []);

  const loadProfileForUser = async (user: User): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      if (user.user_type === 'JOB_SEEKER') {
        const jobSeeker = await getJobSeekerByUserId(user.id);
        dispatch({ type: 'SET_PROFILE', payload: jobSeeker || null });
      } else if (user.user_type === 'EMPLOYER') {
        const employer = await getEmployerByUserId(user.id);
        dispatch({ type: 'SET_PROFILE', payload: employer || null });
      } else if (user.user_type === 'ADMIN') {
        // For now, treat admin as having no additional profile data
        dispatch({ type: 'SET_PROFILE', payload: null });
      } else {
        dispatch({ type: 'SET_PROFILE', payload: null });
      }
    } catch (error) {
      console.error('Load profile error:', error);
      dispatch({ type: 'SET_PROFILE', payload: null });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadProfile = async (): Promise<void> => {
    const user = state.user;
    if (!user) {
      dispatch({ type: 'SET_PROFILE', payload: null });
      return;
    }
    await loadProfileForUser(user);
  };

  // ============================================================================
  // EFFECTS
  // ============================================================================

  // Check for existing session on mount
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================

  const contextValue: UserContextType = {
    state,
    login,
    logout,
    register,
    updateUser,
    refreshUser,
    loadProfile,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

// ============================================================================
// HOOK
// ============================================================================

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};



// Type guards for better type safety
export const isJobSeeker = (user: User | null) => {
  return user?.user_type === 'JOB_SEEKER';
};

export const isEmployer = (user: User | null) => {
  return user?.user_type === 'EMPLOYER';
};

export const isAdmin = (user: User | null) => {
  return user?.user_type === 'ADMIN';
};

// Profile type guards
export const isJobSeekerProfile = (profile: JobSeeker | Employer | Admin | null): profile is JobSeeker => {
  return profile !== null && 'first_name' in profile && 'last_name' in profile;
};

export const isEmployerProfile = (profile: JobSeeker | Employer | Admin | null): profile is Employer => {
  return profile !== null && 'company_name' in profile;
};

export const isAdminProfile = (profile: JobSeeker | Employer | Admin | null): profile is Admin => {
  return profile !== null && 'admin_level' in profile;
}; 