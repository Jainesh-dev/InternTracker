import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Saved from "./pages/Saved";
import History from "./pages/History";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Internships from "./pages/Internships";
import InternshipDetail from "./pages/InternshipDetail";
import Dashboard from "./pages/Dashboard";
import LoadingScreen from "./components/LoadingScreen";

const queryClient = new QueryClient();


const App = () => {
  const [isDark, setIsDark] = useState(() => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    return savedTheme === "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
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
  }, 2000);
  return () => clearTimeout(timer);
}, []);

useEffect(() => {
  const mediaQuery = window.matchMedia(
    "(prefers-color-scheme: dark)"
  );

  const handleThemeChange = (
    e: MediaQueryListEvent
  ) => {
    setIsDark(e.matches);
  };

  mediaQuery.addEventListener(
    "change",
    handleThemeChange
  );

  return () =>
    mediaQuery.removeEventListener(
      "change",
      handleThemeChange
    );
}, []);

  const toggleTheme = () => setIsDark((prev) => !prev);
  if (loading) {
  return <LoadingScreen isDark={isDark} />;
}
  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={`min-h-screen transition-colors duration-1000 ${
          isDark ? "bg-[#050505]" : "bg-[#FBFBFD]"
        }`}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Index isDark={isDark} toggleTheme={toggleTheme} />}
            />
            <Route
              path="/internships"
              element={
                <Internships isDark={isDark} toggleTheme={toggleTheme} />
              }
              
            />
           <Route
  path="/dashboard"
  element={
    <Dashboard
      isDark={isDark}
      toggleTheme={toggleTheme}
    />
  }
/>

<Route
  path="/saved"
  element={
    <Saved
      isDark={isDark}
      toggleTheme={toggleTheme}
    />
  }
/>

<Route
  path="/history"
  element={
    <History
      isDark={isDark}
      toggleTheme={toggleTheme}
    />
  }
/>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
};

export default App;