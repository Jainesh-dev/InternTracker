import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Bookmark, Briefcase, MapPin, Sparkles, FolderOpen, Compass } from "lucide-react";

// Assuming these are your actual imports
import Navbar from "../components/Navbar";
import InternshipCard from "../components/InternshipCard";
import { internships, Internship } from "../data/internships";

export default function Saved() {
  const navigate = useNavigate();
  const [savedInternships, setSavedInternships] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved internships
  useEffect(() => {
    // Handling both array of IDs ["1", "2"] and array of objects [{id: "1"}, {id: "2"}]
    const stored = JSON.parse(localStorage.getItem("saved") || "[]");
    const savedIds = stored.map((item: any) => typeof item === 'object' ? String(item.id) : String(item));

    const filtered = internships.filter((i) => savedIds.includes(String(i.id)));
    setSavedInternships(filtered);
    setIsLoading(false);
  }, []);

  // Calculate Collection Insights
  const insights = useMemo(() => {
    return {
      total: savedInternships.length,
      remote: savedInternships.filter(i => i.type === "Remote").length,
      hybrid: savedInternships.filter(i => i.type === "Hybrid").length,
      onsite: savedInternships.filter(i => i.type === "On-site").length,
    };
  }, [savedInternships]);

  // Calculate Recommendations (Based on most saved category)
  const recommendations = useMemo(() => {
    if (savedInternships.length === 0) return [];
    
    // Find most common category
    const categories = savedInternships.map(i => i.category);
    const topCategory = categories.sort((a, b) => 
      categories.filter(v => v === a).length - categories.filter(v => v === b).length
    ).pop();

    // Find 3 internships in that category that aren't already saved
    return internships
      .filter(i => i.category === topCategory && !savedInternships.find(s => s.id === i.id))
      .slice(0, 3);
  }, [savedInternships]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#09090B] pb-24 selection:bg-blue-500/30 overflow-x-hidden">
      
      <Navbar isDark={false} toggleTheme={() => {}} searchQuery="" onSearchChange={() => {}} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-36">
        
        {/* 🏷 HEADER WITH INLINE BACK BUTTON */}
        <header className="mb-10 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-5 md:gap-6">
            <div>
              <div className="flex items-center gap-4 sm:gap-5 mb-3">
                {/* 🔙 MINIMAL BACK BUTTON */}
                <button
                  onClick={() => navigate("/")}
                  className="group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-90"
                  aria-label="Go back to Home"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" strokeWidth={2.5} />
                </button>

                <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-white leading-tight mt-0.5">
                  Saved Vault
                </h1>
              </div>
              <p className="pl-[56px] sm:pl-[64px] text-base sm:text-lg text-zinc-500 dark:text-zinc-400 font-medium tracking-tight">
                Keep track of the roles you don't want to miss.
              </p>
            </div>
            
            {savedInternships.length > 0 && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide backdrop-blur-md self-start md:self-end md:mb-1 ml-[56px] sm:ml-[64px] md:ml-0">
                <Bookmark className="w-4 h-4 fill-current" />
                {insights.total} opportunities
              </div>
            )}
          </div>
        </header>

        {isLoading ? (
          <div className="animate-pulse flex gap-6">
            <div className="w-full h-64 bg-black/5 dark:bg-white/5 rounded-[32px]"></div>
          </div>
        ) : savedInternships.length === 0 ? (
          /* 📭 EMPTY STATE (Premium Vault Design) */
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4 text-center rounded-[32px] sm:rounded-[40px] border border-black/5 dark:border-white/10 bg-white/40 dark:bg-[#1a1a1c]/40 backdrop-blur-3xl relative overflow-hidden mt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] aspect-square bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/20 flex items-center justify-center mb-6 sm:mb-8 shadow-inner border border-white/50 dark:border-white/10 relative z-10">
              <FolderOpen className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-3 relative z-10">
              Your vault is empty
            </h3>
            <p className="text-[15px] sm:text-[17px] text-zinc-500 max-w-md mx-auto mb-8 sm:mb-10 relative z-10">
              Save internships to build your personal collection of future career opportunities.
            </p>
            <button
              onClick={() => navigate("/internships")}
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold text-[15px] hover:scale-105 active:scale-95 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex items-center gap-2 relative z-10"
            >
              <Compass className="w-4 h-4" /> Explore Opportunities
            </button>
          </div>
        ) : (
          <>
            {/* 📊 SECTION 2: COLLECTION INSIGHTS */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12">
              <InsightCard icon={Bookmark} label="Total Saved" value={insights.total} color="text-blue-500" bg="bg-blue-500/10" />
              <InsightCard icon={MapPin} label="Remote Roles" value={insights.remote} color="text-green-500" bg="bg-green-500/10" />
              <InsightCard icon={Briefcase} label="Hybrid Roles" value={insights.hybrid} color="text-orange-500" bg="bg-orange-500/10" />
              <InsightCard icon={Briefcase} label="On-Site Roles" value={insights.onsite} color="text-purple-500" bg="bg-purple-500/10" />
            </section>

            {/* 🗂 SECTION 1: SAVED GRID */}
            <section className="mb-16 sm:mb-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {savedInternships.map((internship) => (
                  <InternshipCard key={internship.id} internship={internship} />
                ))}
              </div>
            </section>

            {/* 🌟 SECTION 3: RECOMMENDED FOR YOU */}
            {recommendations.length > 0 && (
              <section className="pt-10 sm:pt-12 border-t border-black/5 dark:border-white/10">
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                      Recommended for you
                    </h2>
                    <p className="text-[13px] sm:text-sm text-zinc-500 font-medium">
                      Because you saved {savedInternships[0]?.category} roles
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                  {recommendations.map((internship) => (
                    <InternshipCard key={`rec-${internship.id}`} internship={internship} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}

// --- MICRO-COMPONENT FOR INSIGHTS ---
function InsightCard({ icon: Icon, label, value, color, bg }: any) {
  return (
    <div className="rounded-[20px] sm:rounded-[24px] p-4 sm:p-5 border border-black/5 dark:border-white/10 bg-white/60 dark:bg-[#1a1a1c]/60 backdrop-blur-2xl transition-transform duration-500 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${bg} flex items-center justify-center shrink-0`}>
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${color}`} strokeWidth={2} />
        </div>
        <div>
          <p className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {value}
          </p>
          <p className="text-[12px] sm:text-[13px] font-medium text-zinc-500 dark:text-zinc-400">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}