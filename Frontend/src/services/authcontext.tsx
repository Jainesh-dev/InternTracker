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
  User: UserProfile | null;
  onboardingCompleted: boolean;
  login: () => void;
  signup: () => void;
  completeOnboarding: (profile: UserProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("token");
  });
  
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(() => {
    return localStorage.getItem('it_onboarding_complete') === 'true';
  });

  const [User, setUser] =
useState<UserProfile | null>(() => {
  const savedUser =
    localStorage.getItem(
      "it_user_profile"
    );

  return savedUser
    ? JSON.parse(savedUser)
    : null;
  });

  const login = () => {
  setIsAuthenticated(true);

  const savedUser = localStorage.getItem("it_user_profile");

  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }

  setOnboardingCompleted(
    localStorage.getItem("it_onboarding_complete") === "true"
  );
};

  const signup = () => {
    setIsAuthenticated(true);
    localStorage.setItem('token', 'temp');
  };

const completeOnboarding = (
  profile: UserProfile
) => {
  console.log("COMPLETE ONBOARDING CALLED");

  setUser(profile);
  setOnboardingCompleted(true);

  localStorage.setItem(
    "it_user_profile",
    JSON.stringify(profile)
  );

  localStorage.setItem(
    "it_onboarding_complete",
    "true"
  );

  console.log(
    "Saved:",
    localStorage.getItem(
      "it_onboarding_complete"
    )
  );
};


const logout = () => {
  setIsAuthenticated(false);
  setUser(null);

  localStorage.removeItem("token");
  localStorage.removeItem("User");
  localStorage.removeItem("it_onboarding_complete");
};

  return (
    <AuthContext.Provider value={{ isAuthenticated, User, onboardingCompleted, login, signup, completeOnboarding, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};