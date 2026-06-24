import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./services/authcontext";
import Index from "./pages/Index"
// Existing Pages
import Saved from "./pages/Saved";
import History from "./pages/History";
import NotFound from "./pages/NotFound";
import Internships from "./pages/Internships";
import InternshipDetail from "./pages/InternshipDetail";
import Dashboard from "./pages/Dashboard";

// Auth Flow Pages
import { Auth } from "./pages/Auth";
import { Onboarding } from "./pages/OnBoarding";
import { Recommendations } from "./pages/Recommendation";

// Components
import LoadingScreen from "./components/LoadingScreen";

const queryClient = new QueryClient();

interface RouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: RouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

const OnboardingGuard = ({ children }: RouteProps) => {
  const { onboardingCompleted } = useAuth();

  if (!onboardingCompleted) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

const AppContent = () => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    return window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  if (loading) {
    return <LoadingScreen isDark={isDark} />;
  }

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-[#050505]" : "bg-[#FBFBFD]"
      }`}
    >
      <BrowserRouter>
        <Routes>
          {/* Initial Route */}
          <Route
            path="/"
            element={<Navigate to="/auth" replace /> }
          />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
              <OnboardingGuard>
              <Index
                isDark={isDark}
                toggleTheme={toggleTheme}
              />
              </OnboardingGuard>  
              </ProtectedRoute>
            }
          />

          {/* Authentication */}
          <Route path="/auth" element={<Auth />} />

          {/* New User Flow */}
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <Onboarding />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recommendations"
            element={
              <ProtectedRoute>
                <Recommendations />
              </ProtectedRoute>
            }
          />

          {/* Main Website */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <OnboardingGuard>
                  <Dashboard
                    isDark={isDark}
                    toggleTheme={toggleTheme}
                  />
                </OnboardingGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/internships"
            element={
              <ProtectedRoute>
                <OnboardingGuard>
                  <Internships
                    isDark={isDark}
                    toggleTheme={toggleTheme}
                  />
                </OnboardingGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/internship/:id"
            element={
              <ProtectedRoute>
                <OnboardingGuard>
                  <InternshipDetail
                    isDark={isDark}
                    toggleTheme={toggleTheme}
                  />
                </OnboardingGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/saved"
            element={
              <ProtectedRoute>
                <OnboardingGuard>
                  <Saved
                    isDark={isDark}
                    toggleTheme={toggleTheme}
                  />
                </OnboardingGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <OnboardingGuard>
                  <History
                    isDark={isDark}
                    toggleTheme={toggleTheme}
                  />
                </OnboardingGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;