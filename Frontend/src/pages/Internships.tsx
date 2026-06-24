import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, ChevronDown, Check } from "lucide-react";

// Components
import InternshipCard from "../components/InternshipCard";
import InternshipCardSkeleton from "../components/InternshipCardSkeleton";
import EmptyState from "../components/EmptyState";

interface InternshipsProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export interface Filters {
  state: string;
  city: string;
  jobType: string;
}

const Internships = ({
  isDark,
  toggleTheme,
}: InternshipsProps) => {
  
  const navigate = useNavigate();
  const filterRef = useRef<HTMLDivElement>(null);
  
  // Data States
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({
    state: "All States",
    city: "All Cities",
    jobType: "All Jobs",
  });
  
  // Dropdown UI State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Pagination State
  const [visibleCount, setVisibleCount] = useState(9);

  // Updated Dropdown Options
  const states = ["All States", "Maharashtra", "Karnataka", "Gujarat", "Delhi", "Tamil Nadu"];
  const cities = ["All Cities", "Mumbai", "Pune", "Nagpur", "Bangalore", "Hyderabad", "Chennai", "Delhi"];
  const jobTypes = ["All Jobs", "Frontend Developer", "Backend Developer", "Full Stack Developer", "AI/ML Engineer", "Data Analyst", "DevOps Engineer"];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 1. Data Fetching
  useEffect(() => {
    setLoading(true);
    fetch("http://127.0.0.1:5001/internships")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 2. Filtering Logic
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();

    return data.filter((i) => {
      // Text Search
      if (q && !i.role.toLowerCase().includes(q) && !i.company.toLowerCase().includes(q)) {
        return false;
      }
      // Dropdown Filters
      if (filters.state !== "All States" && i.state !== filters.state) {
        return false;
      }
      if (filters.city !== "All Cities" && i.city !== filters.city) {
        return false;
      }
      if (filters.jobType !== "All Jobs" && i.category !== filters.jobType) {
        return false;
      }
      return true;
    });
  }, [searchQuery, filters, data]);

  // 3. Reset Filters
  const clearAll = () => {
    setSearchQuery("");
    setFilters({ state: "All States", city: "All Cities", jobType: "All Jobs" });
  };

  // Reusable Category Sub-section inside the Main Filter Panel
  const FilterSection = ({ 
    title, options, currentSelection, onSelect 
  }: { 
    title: string; options: string[]; currentSelection: string; onSelect: (val: string) => void 
  }) => (
    <div className="flex flex-col gap-1.5">
      <span className="px-3 text-[12px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
        {title}
      </span>
      <div className="flex flex-col gap-0.5 max-h-[160px] overflow-y-auto hide-scrollbar border border-black/[0.03] dark:border-white/[0.03] rounded-xl p-1 bg-black/[0.02] dark:bg-white/[0.02]">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-[14px] font-medium transition-colors w-full text-left ${
              currentSelection === option
                ? "bg-black/5 dark:bg-white/10 text-zinc-900 dark:text-white"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            {option}
            {currentSelection === option && <Check className="w-3.5 h-3.5 text-zinc-900 dark:text-white" />}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#09090B] pb-24 selection:bg-blue-500/30">
      
      {/* 1. PAGE HEADER */}
      <div className="pt-24 md:pt-32 pb-12 px-6 lg:px-8 max-w-7xl mx-auto text-center relative">
        <button
          onClick={() => navigate("/home")}
          className="absolute left-6 lg:left-8 top-24 md:top-32 flex items-center gap-2 text-[15px] font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors group"
        >
          <div className="p-2 rounded-full bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          </div>
          <span className="hidden sm:inline">Back to Home</span>
        </button>

        <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tighter text-zinc-900 dark:text-white leading-tight mb-4 mt-16 md:mt-0">
          Discover Opportunities
        </h1>
        <p className="text-lg md:text-[21px] text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium tracking-tight">
          Find your next role at top global companies.
        </p>
      </div>

      {/* 2. REDESIGNED FILTER BAR WITH SINGLE DROPDOWN PANEL */}
      <div className="sticky top-6 z-40 px-4 md:px-8 mb-10 transition-all">
        <div 
          ref={filterRef}
          className="max-w-5xl mx-auto flex items-center gap-2 p-2 rounded-[20px] bg-white/70 dark:bg-[#1a1a1c]/70 backdrop-blur-3xl border border-black/5 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] relative"
        >
          {/* Search */}
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search companies, roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none pl-11 pr-4 py-3 text-[16px] font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 rounded-2xl focus:bg-black/5 dark:focus:bg-white/5 transition-colors"
            />
          </div>

          <div className="w-px h-6 bg-black/5 dark:bg-white/10 mx-1"></div>

          {/* Filters Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-[14px] text-[15px] font-semibold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isFilterOpen || filters.state !== "All States" || filters.city !== "All Cities" || filters.jobType !== "All Jobs"
                  ? "bg-black/5 dark:bg-white/10 text-zinc-900 dark:text-white"
                  : "bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              Filters
              {(filters.state !== "All States" || filters.city !== "All Cities" || filters.jobType !== "All Jobs") && (
                <span className="w-2 h-2 rounded-full bg-blue-500 block animate-pulse" />
              )}
              <ChevronDown className={`w-4 h-4 opacity-50 transition-transform duration-300 ${isFilterOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Premium Unified Filters Dropdown Panel */}
            {isFilterOpen && (
              <div className="absolute top-full mt-3 right-0 z-50 w-[300px] sm:w-[480px] p-4 rounded-2xl bg-white/95 dark:bg-[#1a1a1c]/95 backdrop-blur-3xl border border-black/10 dark:border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.12)] animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Column 1: State & City */}
                  <div className="flex flex-col gap-4">
                    <FilterSection 
                      title="State" 
                      options={states} 
                      currentSelection={filters.state} 
                      onSelect={(val) => setFilters({ ...filters, state: val })} 
                    />
                    <FilterSection 
                      title="City" 
                      options={cities} 
                      currentSelection={filters.city} 
                      onSelect={(val) => setFilters({ ...filters, city: val })} 
                    />
                  </div>

                  {/* Column 2: Job Type */}
                  <div className="sm:border-l sm:border-black/5 sm:dark:border-white/5 sm:pl-4">
                    <FilterSection 
                      title="Job Type" 
                      options={jobTypes} 
                      currentSelection={filters.jobType} 
                      onSelect={(val) => setFilters({ ...filters, jobType: val })} 
                    />
                  </div>
                </div>

                {/* Dropdown Footer Status */}
                <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[12px] text-zinc-400 dark:text-zinc-500 font-medium">
                  <span>Selected filters persist</span>
                  {(filters.state !== "All States" || filters.city !== "All Cities" || filters.jobType !== "All Jobs") && (
                    <button 
                      onClick={clearAll}
                      className="text-blue-500 hover:underline font-semibold"
                    >
                      Reset All
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. INTERNSHIP GRID */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {Array.from({ length: 6 }).map((_, i) => (
              <InternshipCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16">
            <EmptyState onClear={clearAll} />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {filtered.slice(0, visibleCount).map((internship) => (
                <InternshipCard
                  key={internship.id}
                  internship={internship}
                />
              ))}
            </div>

            {/* 4. LOAD MORE */}
            {visibleCount < filtered.length && (
              <div className="mt-16 flex justify-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-8 py-4 rounded-full bg-white dark:bg-[#1a1a1c] border border-black/5 dark:border-white/10 text-zinc-900 dark:text-white font-semibold text-[15px] shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 active:scale-95 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center gap-2"
                >
                  Load More Opportunities <ChevronDown className="w-4 h-4 opacity-50" />
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Internships;