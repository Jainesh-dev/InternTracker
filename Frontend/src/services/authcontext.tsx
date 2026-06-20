import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  firstName: string;
  lastName: string;
  dob: string;
  collegeName: string;
  degree: string;
  branch: string;
  gradYear: string;
  cgpa: string;
  interests: string[];
  skills: string[];
  internshipType: 'Remote' | 'Hybrid' | 'Onsite';
  locations: string[];
  weeklyGoal: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  onboardingCompleted: boolean;
  login: () => void;
  signup: () => void;
  completeOnboarding: (profile: UserProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('it_auth') === 'true';
  });
  
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(() => {
    return localStorage.getItem('it_onboarding_complete') === 'true';
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedUser = localStorage.getItem('it_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = () => {
  setIsAuthenticated(true);

  const savedUser = localStorage.getItem("it_user");

  if (savedUser) {
    setUser(JSON.parse(savedUser));
    setOnboardingCompleted(true);
  }

  localStorage.setItem("it_auth", "true");
};

  const signup = () => {
    setIsAuthenticated(true);
    localStorage.setItem('it_auth', 'true');
  };

  const completeOnboarding = (profile: UserProfile) => {
    setUser(profile);
    setOnboardingCompleted(true);
    localStorage.setItem('it_user', JSON.stringify(profile));
    localStorage.setItem('it_onboarding_complete', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('it_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, onboardingCompleted, login, signup, completeOnboarding, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};