import React, { useState } from "react";
import { 
  Send, Bookmark, Phone, TrendingUp, 
  Target, UploadCloud, Compass, History, FolderHeart, ArrowLeft 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <>
      {/* @ts-ignore - Note: Ensure your Navbar component accepts these props in its own file */}
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#09090B] pt-32 pb-24 selection:bg-blue-500/30 font-sans flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          
          {/* PAGE HEADER */}
          <header className="relative mb-10">
            <div className="flex items-center gap-4 mb-2">
              <button
                onClick={() => navigate("/")}
                className="p-2.5 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all group shrink-0"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
              </button>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-white leading-tight">
                Career Dashboard
              </h1>
            </div>
            <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 font-medium tracking-tight sm:ml-14">
              Track your internship journey and career progress.
            </p>
          </header>

          {/* SECTION 1: STATS OVERVIEW */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard icon={<Send />} label="Applied" value="24" trend="+3 this week" color="bg-blue-500" />
            <StatCard icon={<Bookmark />} label="Saved" value="18" trend="4 expiring soon" color="bg-purple-500" />
            <StatCard icon={<Phone />} label="Interviews" value="4" trend="1 next week" color="bg-orange-500" />
            <StatCard icon={<TrendingUp />} label="Success Rate" value="67%" trend="+12% vs last month" color="bg-emerald-500" />
          </section>

          {/* MIDDLE TIER: CAREER PROGRESS & INSIGHTS */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            
            {/* SECTION 4: CAREER PROGRESS (Span 2 columns) */}
            <div className="lg:col-span-2 group relative rounded-[32px] p-8 border border-black/5 dark:border-white/10 bg-white/60 dark:bg-[#1a1a1c]/60 backdrop-blur-3xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:scale-[1.01] overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm tracking-wide uppercase mb-2">
                    <Target className="w-4 h-4" /> Target Role
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
                    Backend Engineer
                  </h2>
                  
                  <div className="flex items-center gap-8">
                    <div>
                      <p className="text-zinc-500 text-sm font-medium mb-1">Applications</p>
                      <p className="text-2xl font-bold text-zinc-900 dark:text-white">15</p>
                    </div>
                    <div className="w-px h-8 bg-black/10 dark:bg-white/10"></div>
                    <div>
                      <p className="text-zinc-500 text-sm font-medium mb-1">Projects</p>
                      <p className="text-2xl font-bold text-zinc-900 dark:text-white">3</p>
                    </div>
                    <div className="w-px h-8 bg-black/10 dark:bg-white/10"></div>
                    <div>
                      <p className="text-zinc-500 text-sm font-medium mb-1">Skills</p>
                      <p className="text-2xl font-bold text-zinc-900 dark:text-white">7</p>
                    </div>
                  </div>
                </div>

                {/* Apple Fitness-style Circular Progress */}
                <div className="shrink-0 relative flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="56" className="stroke-black/5 dark:stroke-white/5" strokeWidth="12" fill="none" />
                    <circle cx="64" cy="64" r="56" className="stroke-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" strokeWidth="12" fill="none" strokeDasharray="351.86" strokeDashoffset={351.86 - (351.86 * 0.68)} strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s ease-out" }} />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tighter">68<span className="text-lg">%</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3: APPLICATION INSIGHTS */}
            <div className="group rounded-[32px] p-8 border border-black/5 dark:border-white/10 bg-white/60 dark:bg-[#1a1a1c]/60 backdrop-blur-3xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:scale-[1.02]">
              <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
                Applications by Category
              </h3>
              <div className="space-y-4">
                <InsightBar label="Backend" percentage={45} color="bg-blue-500" />
                <InsightBar label="Frontend" percentage={25} color="bg-indigo-500" />
                <InsightBar label="Data Science" percentage={15} color="bg-purple-500" />
                <InsightBar label="AI/ML" percentage={10} color="bg-emerald-500" />
                <InsightBar label="Cloud" percentage={5} color="bg-orange-500" />
              </div>
            </div>
          </section>

          {/* BOTTOM TIER: ACTIVITY & ACTIONS */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* SECTION 2: ACTIVITY TIMELINE */}
            <div className="lg:col-span-1 rounded-[32px] p-8 border border-black/5 dark:border-white/10 bg-white/60 dark:bg-[#1a1a1c]/60 backdrop-blur-3xl">
              <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
                Recent Activity
              </h3>
              <div className="relative pl-4 border-l-2 border-black/5 dark:border-white/10 space-y-6">
                <TimelineItem title="Applied to Google" subtitle="Software Engineering Intern" time="2h ago" type="apply" />
                <TimelineItem title="Saved Adobe" subtitle="Engineering Intern" time="5h ago" type="save" />
                <TimelineItem title="Applied to Microsoft" subtitle="Software Intern" time="1d ago" type="apply" />
                <TimelineItem title="Viewed Nvidia" subtitle="AI Research Intern" time="2d ago" type="view" />
              </div>
            </div>

            {/* SECTION 5: QUICK ACTIONS */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ActionCard icon={<UploadCloud />} title="Upload Resume" desc="Update your master CV" color="bg-blue-500" />
              <ActionCard icon={<Compass />} title="Browse Opportunities" desc="Discover new roles" color="bg-indigo-500" />
              <ActionCard icon={<FolderHeart />} title="View Saved" desc="Review your bookmarks" color="bg-pink-500" />
              <ActionCard icon={<History />} title="Application History" desc="Track past applications" color="bg-orange-500" />
            </div>

          </section>
        </div>
      </div>
    </>
  );
}


// --- MICRO-COMPONENTS ---
// Added proper TypeScript Interfaces to resolve `any` errors implicitly

interface StatCardProps {
  icon: React.ReactElement;
  label: string;
  value: string | number;
  trend: string;
  color: string;
}

function StatCard({ icon, label, value, trend, color }: StatCardProps) {
  return (
    <div className="group relative rounded-[32px] p-6 border border-black/5 dark:border-white/10 bg-white/60 dark:bg-[#1a1a1c]/60 backdrop-blur-3xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:scale-[1.02] overflow-hidden">
      <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-10 blur-3xl rounded-full pointer-events-none`} />
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-zinc-900 dark:text-white border border-white/20 dark:border-white/5 backdrop-blur-md`}>
          {React.cloneElement(icon, { className: `w-5 h-5 ${color.replace('bg-', 'text-')}` })}
        </div>
      </div>
      <div>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium tracking-tight mb-1">{label}</p>
        <h3 className="text-3xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-2">{value}</h3>
        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-500">{trend}</p>
      </div>
    </div>
  );
}

interface InsightBarProps {
  label: string;
  percentage: number;
  color: string;
}

function InsightBar({ label, percentage, color }: InsightBarProps) {
  return (
    <div>
      <div className="flex justify-between text-[13px] font-semibold mb-1.5">
        <span className="text-zinc-700 dark:text-zinc-300">{label}</span>
        <span className="text-zinc-500">{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

interface TimelineItemProps {
  title: string;
  subtitle: string;
  time: string;
  type: 'apply' | 'save' | 'view' | string;
}

function TimelineItem({ title, subtitle, time, type }: TimelineItemProps) {
  const getDotColor = () => {
    switch(type) {
      case 'apply': return 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]';
      case 'save': return 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]';
      default: return 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]';
    }
  };

  return (
    <div className="relative group cursor-default">
      <div className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full ${getDotColor()} border-2 border-white dark:border-[#1a1a1c]`} />
      <div className="group-hover:translate-x-1 transition-transform duration-300">
        <p className="text-[15px] font-semibold text-zinc-900 dark:text-white">{title}</p>
        <p className="text-[13px] text-zinc-500 font-medium mb-1">{subtitle}</p>
        <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">{time}</p>
      </div>
    </div>
  );
}

interface ActionCardProps {
  icon: React.ReactElement;
  title: string;
  desc: string;
  color: string;
}

function ActionCard({ icon, title, desc, color }: ActionCardProps) {
  return (
    <button className="group relative w-full text-left rounded-[32px] p-6 border border-black/5 dark:border-white/10 bg-white/60 dark:bg-[#1a1a1c]/60 backdrop-blur-3xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:scale-[1.02] overflow-hidden">
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 ${color} blur-[80px] transition-opacity duration-700 pointer-events-none`} />
      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-2xl ${color} bg-opacity-10 flex items-center justify-center mb-4 border border-white/20 dark:border-white/5 group-hover:scale-110 transition-transform duration-500`}>
          {React.cloneElement(icon, { className: `w-6 h-6 ${color.replace('bg-', 'text-')}` })}
        </div>
        <h4 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white mb-1">{title}</h4>
        <p className="text-sm font-medium text-zinc-500">{desc}</p>
      </div>
    </button>
  );
}