import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Saved from "./pages/Saved";
import History from "./pages/History";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Internships from "./pages/Internships";
import InternshipDetail from "./pages/InternshipDetail";

const queryClient = new QueryClient();

const App = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

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
            <Route path="/saved" element={<Saved />} />
            <Route path="/history" element={<History />} />
            <Route
              path="/internships/:id"
              element={<InternshipDetail />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
};

export default App;