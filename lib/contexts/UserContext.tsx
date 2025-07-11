'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, JobSeeker, Employer, Admin, UserType } from '../types';
import { login as authLogin, logout as authLogout, getCurrentUser } from '@/actions/auth';

// ============================================================================
// CONTEXT TYPES
// ============================================================================

interface UserState {
  user: User | JobSeeker | Employer | Admin | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

type UserAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | JobSeeker | Employer | Admin | null }
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
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
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
        const user = result.user as unknown as User | JobSeeker | Employer | Admin;
        dispatch({ type: 'SET_USER', payload: user });
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

      // For mock implementation, simulate registration
      // In a real implementation, you would call the register API
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email: userData.email,
        password_hash: '', // In real implementation, this would be hashed
        user_type: userData.userType,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      };

      // Add user-specific fields based on user type
      let fullUser: User | JobSeeker | Employer | Admin;
      
      if (userData.userType === 'JOB_SEEKER') {
        fullUser = {
          ...mockUser,
          first_name: userData.firstName || '',
          last_name: userData.lastName || '',
          profile_visibility: 'PUBLIC',
          availability_status: 'ACTIVELY_LOOKING',
        } as JobSeeker;
      } else if (userData.userType === 'EMPLOYER') {
        fullUser = {
          ...mockUser,
          company_name: userData.companyName || '',
        } as Employer;
      } else {
        fullUser = mockUser;
      }

      dispatch({ type: 'SET_USER', payload: fullUser });
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

  const refreshUser = async (): Promise<void> => {
    try {
      // Get user from server-side cookie
      dispatch({ type: 'SET_LOADING', payload: true });
      const user = await getCurrentUser();
      dispatch({ type: 'SET_LOADING', payload: false });
      if (user) {
        const typedUser = user as unknown as User | JobSeeker | Employer | Admin;
        dispatch({ type: 'SET_USER', payload: typedUser });
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    } catch (error) {
      console.error('Refresh user error:', error);
      dispatch({ type: 'LOGOUT' });
    }
  };

  // ============================================================================
  // EFFECTS
  // ============================================================================

  // Check for existing session on mount
  useEffect(() => {
    refreshUser();
  }, []);

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

// ============================================================================
// UTILITY HOOKS
// ============================================================================

export const useUserProfile = () => {
  const { state, updateUser, refreshUser } = useUser();
  return {
    user: state.user,
    updateUser,
    refreshUser,
  };
};

// Type guards for better type safety
export const isJobSeeker = (user: User | JobSeeker | Employer | Admin | null): user is JobSeeker => {
  return user?.user_type === 'JOB_SEEKER';
};

export const isEmployer = (user: User | JobSeeker | Employer | Admin | null): user is Employer => {
  return user?.user_type === 'EMPLOYER';
};

export const isAdmin = (user: User | JobSeeker | Employer | Admin | null): user is Admin => {
  return user?.user_type === 'ADMIN';
}; 