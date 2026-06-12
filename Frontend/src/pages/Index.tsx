import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { Rocket, Github, Twitter } from "lucide-react";

interface IndexProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Index = ({ isDark, toggleTheme }: IndexProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    /* Removed min-h-screen and overflow-x-hidden from here to prevent double scrollbars */
    <div className="flex flex-col bg-[#FAFAFA] dark:bg-[#09090B] transition-colors duration-1000">
      
      <Navbar 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
      />

      {/* Main content grows to fill space, but doesn't force a minimum height */}
      <main className="w-full flex-grow">
        <HeroSection isDark={isDark} />
      </main>

      {/* Footer is now part of the standard flow, so no gap or extra scrollbar */}
      <footer className="w-full relative z-20 pb-8 sm:pb-12 bg-[#FAFAFA] dark:bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className={`w-full h-px mb-8 bg-gradient-to-r transition-colors duration-1000 ${
            isDark ? "from-transparent via-white/15 to-transparent" : "from-transparent via-black/10 to-transparent"
          }`} />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className={`p-1.5 rounded-xl transition-all duration-500 border ${
                isDark ? "bg-white/10 border-white/10" : "bg-black/5 border-black/5"
              } backdrop-blur-md`}>
                <Rocket className={`h-4 w-4 ${isDark ? "text-white" : "text-black"}`} />
              </div>
              <span className={`font-semibold tracking-tighter ${isDark ? "text-white" : "text-black"}`}>
                Intern<span className="text-blue-500">Tracker</span>
              </span>
            </div>
            
            <p className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400 tracking-wide text-center">
              © 2026 InternTracker. Engineered with Liquid Glass.
            </p>
            
            <div className="flex items-center gap-5">
              <Github className="h-[18px] w-[18px] text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-[18px] w-[18px] text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;