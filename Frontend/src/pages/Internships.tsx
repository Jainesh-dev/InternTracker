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
  location: string;
  category: string;
  workType: string;
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
    location: "All Locations",
    category: "All Roles",
    workType: "All Types",
  });
  
  // Dropdown UI State
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Pagination State
  const [visibleCount, setVisibleCount] = useState(9);

  // Dropdown Options
  const locations = ["All Locations", "Remote", "India", "USA", "Europe"];
  const workTypes = ["All Types", "On-site", "Remote", "Hybrid"];
  const categories = ["All Roles", "Software Engineering", "Frontend", "Backend", "AI/ML", "Design", "Product"];

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
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
      if (filters.location !== "All Locations" && i.location !== filters.location && i.location !== "Remote") {
        return false;
      }
      if (filters.category !== "All Roles" && i.category !== filters.category) {
        return false;
      }
      if (filters.workType !== "All Types" && i.type !== filters.workType) {
        return false;
      }
      return true;
    });
  }, [searchQuery, filters, data]);

  // 3. Reset Filters
  const clearAll = () => {
    setSearchQuery("");
    setFilters({ location: "All Locations", category: "All Roles", workType: "All Types" });
  };

  // Reusable Dropdown Component
  const FilterDropdown = ({ 
    label, options, filterKey 
  }: { 
    label: string, options: string[], filterKey: keyof Filters 
  }) => {
    const isOpen = activeDropdown === filterKey;
    const selectedValue = filters[filterKey];

    return (
      <div className="relative">
        <button
          onClick={() => setActiveDropdown(isOpen ? null : filterKey)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-[14px] text-[15px] font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isOpen || selectedValue !== options[0]
              ? "bg-black/5 dark:bg-white/10 text-zinc-900 dark:text-white"
              : "bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-zinc-200"
          }`}
        >
          {selectedValue === options[0] ? label : selectedValue}
          <ChevronDown className={`w-4 h-4 opacity-50 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full mt-2 w-48 left-0 z-50 p-1.5 rounded-2xl bg-white/90 dark:bg-[#1a1a1c]/90 backdrop-blur-3xl border border-black/10 dark:border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.12)] animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setFilters({ ...filters, [filterKey]: option });
                    setActiveDropdown(null);
                  }}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium transition-colors w-full text-left ${
                    selectedValue === option
                      ? "bg-black/5 dark:bg-white/10 text-zinc-900 dark:text-white"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-zinc-200"
                  }`}
                >
                  {option}
                  {selectedValue === option && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#09090B] pb-24 selection:bg-blue-500/30">
      
      {/* 1. PAGE HEADER (More concise and premium) */}
      <div className="pt-24 md:pt-32 pb-12 px-6 lg:px-8 max-w-7xl mx-auto text-center relative">
        <button
          onClick={() => navigate("/")}
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

      {/* 2. FAANG-STYLE HORIZONTAL FILTER BAR */}
      <div className="sticky top-6 z-40 px-4 md:px-8 mb-10 transition-all">
        <div 
          ref={filterRef}
          className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-2 p-2 rounded-[20px] bg-white/70 dark:bg-[#1a1a1c]/70 backdrop-blur-3xl border border-black/5 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
        >
          {/* Search */}
          <div className="relative w-full md:w-auto md:flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search companies, roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none pl-11 pr-4 py-3 text-[16px] font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 rounded-2xl focus:bg-black/5 dark:focus:bg-white/5 transition-colors"
            />
          </div>

          <div className="hidden md:block w-px h-6 bg-black/5 dark:bg-white/10 mx-1"></div>

          {/* Premium Dropdowns */}
          <div className="flex w-full md:w-auto overflow-x-auto hide-scrollbar gap-1 px-1 pb-1 md:pb-0">
            <FilterDropdown label="Role" filterKey="category" options={categories} />
            <FilterDropdown label="Location" filterKey="location" options={locations} />
            <FilterDropdown label="Work Type" filterKey="workType" options={workTypes} />
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