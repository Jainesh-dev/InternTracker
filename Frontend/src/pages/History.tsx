import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, Send, Bookmark, Eye, User, 
  Trophy, Flame, TrendingUp, Compass, CalendarCheck 
} from "lucide-react";
import Navbar from "../components/Navbar";
import { internships, Internship } from "../data/internships";

// --- TYPES ---
type ActivityType = "apply" | "save" | "view" | "profile";

interface Activity {
  id: string;
  type: ActivityType;
  date: Date;
  internship?: Internship;
  title: string;
  subtitle: string;
}

export default function History() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filter, setFilter] = useState<"All" | ActivityType>("All");

  // --- LOAD & TRANSFORM DATA ---
  useEffect(() => {
    const loadData = () => {
      const history: Activity[] = [];

      // 1. Load Applications
      const appliedStored = JSON.parse(localStorage.getItem("applied") || "[]");
      appliedStored.forEach((item: any) => {
        const internship = internships.find(i => String(i.id) === String(item.id));
        if (internship) {
          history.push({
            id: `apply-${item.id}`,
            type: "apply",
            date: new Date(item.date || Date.now()),
            internship,
            title: `Applied to ${internship.company}`,
            subtitle: internship.role
          });
        }
      });

      // 2. Load Saved
      const savedStored = JSON.parse(localStorage.getItem("saved") || "[]");
      savedStored.forEach((item: any) => {
        const id = typeof item === 'object' ? item.id : item;
        const date = typeof item === 'object' && item.date ? item.date : Date.now() - 86400000;
        const internship = internships.find(i => String(i.id) === String(id));
        
        if (internship) {
          history.push({
            id: `save-${id}`,
            type: "save",
            date: new Date(date),
            internship,
            title: `Saved ${internship.company}`,
            subtitle: internship.role
          });
        }
      });

      // 3. Add Mock Data (Only to show timeline UI if there is actual activity)
      if (history.length > 0) {
        history.push({
          id: "view-mock-1", type: "view", date: new Date(Date.now() - 3600000), 
          title: "Viewed Apple", subtitle: "AI Research Intern"
        });
        history.push({
          id: "profile-mock-1", type: "profile", date: new Date(Date.now() - 172800000), 
          title: "Updated Resume", subtitle: "Added React & TypeScript skills"
        });
      }

      history.sort((a, b) => b.date.getTime() - a.date.getTime());
      setActivities(history);
    };

    loadData();
  }, []);

  // --- FILTER & GROUP LOGIC ---
  const filteredActivities = useMemo(() => {
    return filter === "All" ? activities : activities.filter(a => a.type === filter);
  }, [activities, filter]);

  const groupedActivities = useMemo(() => {
    const groups: Record<string, Activity[]> = {};
    
    filteredActivities.forEach(activity => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      let key = "Older";
      if (activity.date.toDateString() === today.toDateString()) key = "Today";
      else if (activity.date.toDateString() === yesterday.toDateString()) key = "Yesterday";
      else if (today.getTime() - activity.date.getTime() < 7 * 24 * 60 * 60 * 1000) key = "Last Week";
      else if (today.getMonth() === activity.date.getMonth() && today.getFullYear() === activity.date.getFullYear()) key = "This Month";

      if (!groups[key]) groups[key] = [];
      groups[key].push(activity);
    });

    return groups;
  }, [filteredActivities]);

  // --- STATS CALCULATION ---
  const stats = useMemo(() => {
    return {
      applied: activities.filter(a => a.type === "apply").length,
      saved: activities.filter(a => a.type === "save").length,
      viewed: activities.filter(a => a.type === "view").length,
      profile: activities.filter(a => a.type === "profile").length,
    };
  }, [activities]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#09090B] pb-24 selection:bg-blue-500/30 font-sans overflow-x-hidden">
      <Navbar isDark={false} toggleTheme={() => {}} searchQuery="" onSearchChange={() => {}} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-36">
        
        {/* 🏷 HEADER WITH INLINE BACK BUTTON */}
        <header className="mb-10 md:mb-12">
          <div className="flex items-center gap-4 sm:gap-5 mb-3">
            
            {/* 🔙 MINIMAL BACK BUTTON */}
            <button
              onClick={() => navigate("/")}
              className="group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-90"
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" strokeWidth={2.5} />
            </button>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-white leading-tight mt-0.5">
              Activity History
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pl-[56px] sm:pl-[64px] text-base sm:text-lg text-zinc-500 dark:text-zinc-400 font-medium tracking-tight">
            <p>A complete timeline of your internship journey.</p>
            {activities.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold bg-blue-500/10 px-3 py-1 rounded-full text-sm w-max">
                  {activities.length} Activities
                </span>
              </div>
            )}
          </div>
        </header>

        {activities.length === 0 ? (
          /* 📭 EMPTY STATE */
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 mt-8 px-4 text-center rounded-[32px] sm:rounded-[40px] border border-black/5 dark:border-white/10 bg-white/40 dark:bg-[#1a1a1c]/40 backdrop-blur-3xl relative overflow-hidden">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-[100px] pointer-events-none" />
             <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-zinc-100 to-white dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center mb-6 sm:mb-8 shadow-inner border border-black/5 dark:border-white/10 relative z-10">
               <Compass className="w-8 h-8 sm:w-10 sm:h-10 text-zinc-400 dark:text-zinc-500" strokeWidth={1.5} />
             </div>
             <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-3 relative z-10">
               Your journey starts here.
             </h3>
             <p className="text-[15px] sm:text-[17px] text-zinc-500 max-w-md mx-auto mb-8 sm:mb-10 relative z-10">
               Apply, save, and explore opportunities to build your career timeline.
             </p>
             <button
               onClick={() => navigate("/internships")}
               className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold text-[15px] hover:scale-105 active:scale-95 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_8px_24px_rgba(0,0,0,0.12)] relative z-10"
             >
               Explore Opportunities
             </button>
          </div>
        ) : (
          <>
            {/* 📊 SECTION 1: ACTIVITY OVERVIEW */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12">
              <OverviewCard icon={Send} label="Applications" value={stats.applied} color="text-green-500" bg="bg-green-500/10" />
              <OverviewCard icon={Bookmark} label="Saved Roles" value={stats.saved} color="text-blue-500" bg="bg-blue-500/10" />
              <OverviewCard icon={Eye} label="Viewed" value={stats.viewed} color="text-purple-500" bg="bg-purple-500/10" />
              <OverviewCard icon={User} label="Profile" value={stats.profile} color="text-orange-500" bg="bg-orange-500/10" />
            </section>

            {/* 🎛 SECTION 3: APPLE-STYLE FILTERS */}
            <div className="flex overflow-x-auto hide-scrollbar mb-8 sm:mb-10 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex p-1.5 bg-black/5 dark:bg-white/5 rounded-[20px] backdrop-blur-xl border border-black/5 dark:border-white/5 w-max">
                {(["All", "apply", "save", "view", "profile"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-[14px] text-[13px] sm:text-[14px] font-semibold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] capitalize ${
                      filter === f
                        ? "bg-white dark:bg-[#1a1a1c] text-zinc-900 dark:text-white shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    {f === "apply" ? "Applications" : f === "save" ? "Saved" : f === "view" ? "Viewed" : f === "profile" ? "Profile" : "All Activity"}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-8 items-start">
              
              {/* 🕒 SECTION 2: CAREER TIMELINE */}
              <div className="w-full lg:flex-1">
                {Object.entries(groupedActivities).length === 0 ? (
                  <div className="text-zinc-500 font-medium py-10 text-center lg:text-left">No activities found for this filter.</div>
                ) : (
                  Object.entries(groupedActivities).map(([groupName, items]) => (
                    <div key={groupName} className="mb-10">
                      <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mb-5 sm:mb-6 flex items-center gap-3 tracking-tight">
                        <div className="w-2 h-2 rounded-full bg-black/20 dark:bg-white/20"></div>
                        {groupName}
                      </h3>
                      <div className="space-y-0">
                        {items.map((activity, index) => (
                          <TimelineItem 
                            key={activity.id} 
                            activity={activity} 
                            isLast={index === items.length - 1} 
                            onOpen={() => activity.internship && window.open(activity.internship.applyLink, "_blank")}
                          />
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* 💡 SIDEBAR: INSIGHTS & MILESTONES (Sticky on Desktop) */}
              <div className="w-full lg:w-[380px] shrink-0 space-y-6 lg:sticky lg:top-32 lg:pb-10">
                
                {/* SECTION 4: ACTIVITY INSIGHTS */}
                <div className="rounded-[32px] p-6 sm:p-8 border border-black/5 dark:border-white/10 bg-white/60 dark:bg-[#1a1a1c]/60 backdrop-blur-3xl">
                  <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-500" /> Activity Insights
                  </h3>
                  <div className="space-y-4 sm:space-y-5">
                    <InsightRow label="Applications This Month" value={stats.applied} />
                    <div className="h-px w-full bg-black/5 dark:bg-white/10"></div>
                    <InsightRow label="Most Saved Category" value="Engineering" />
                    <div className="h-px w-full bg-black/5 dark:bg-white/10"></div>
                    <InsightRow label="Most Active Day" value="Tuesday" />
                  </div>
                </div>

                {/* SECTION 5: RECENT MILESTONES */}
                <div className="rounded-[32px] p-6 sm:p-8 border border-black/5 dark:border-white/10 bg-gradient-to-b from-white/60 to-white/30 dark:from-[#1a1a1c]/60 dark:to-[#1a1a1c]/30 backdrop-blur-3xl">
                  <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" /> Recent Milestones
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <MilestoneCard 
                      icon={Flame} color="text-orange-500" bg="bg-orange-500/10" 
                      title="First Application" subtitle="Journey initiated." 
                    />
                    {stats.applied >= 5 && (
                      <MilestoneCard 
                        icon={Send} color="text-green-500" bg="bg-green-500/10" 
                        title="5 Applications Submitted" subtitle="Building momentum." 
                      />
                    )}
                    {stats.saved >= 10 && (
                      <MilestoneCard 
                        icon={Bookmark} color="text-blue-500" bg="bg-blue-500/10" 
                        title="10 Opportunities Saved" subtitle="Curating a solid vault." 
                      />
                    )}
                  </div>
                </div>

              </div>
            </div>
          </>
        )}
      </main>

      {/* Hide Scrollbar */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

// --- MICRO-COMPONENTS ---

function OverviewCard({ icon: Icon, label, value, color, bg }: any) {
  return (
    <div className="rounded-[20px] sm:rounded-[24px] p-4 sm:p-5 border border-black/5 dark:border-white/10 bg-white/60 dark:bg-[#1a1a1c]/60 backdrop-blur-2xl transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]">
      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl ${bg} flex items-center justify-center mb-3 sm:mb-4`}>
        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${color}`} strokeWidth={2} />
      </div>
      <p className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-0.5 sm:mb-1">
        {value}
      </p>
      <p className="text-[12px] sm:text-[13px] font-medium text-zinc-500 dark:text-zinc-400 truncate">
        {label}
      </p>
    </div>
  );
}

function TimelineItem({ activity, isLast, onOpen }: { activity: Activity, isLast: boolean, onOpen: () => void }) {
  let Icon = Send;
  let color = "text-zinc-500";
  let bg = "bg-zinc-100 dark:bg-zinc-800";
  
  if (activity.type === "apply") { Icon = Send; color = "text-green-600 dark:text-green-400"; bg = "bg-green-500/10"; }
  if (activity.type === "save") { Icon = Bookmark; color = "text-blue-600 dark:text-blue-400"; bg = "bg-blue-500/10"; }
  if (activity.type === "view") { Icon = Eye; color = "text-purple-600 dark:text-purple-400"; bg = "bg-purple-500/10"; }
  if (activity.type === "profile") { Icon = User; color = "text-orange-600 dark:text-orange-400"; bg = "bg-orange-500/10"; }

  const timeString = activity.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="relative pl-10 pb-6 sm:pb-8 group">
      {/* Timeline Line */}
      {!isLast && <div className="absolute left-[19px] top-8 bottom-0 w-px bg-black/10 dark:bg-white/10 group-hover:bg-blue-500/30 transition-colors duration-500"></div>}
      
      {/* Timeline Node */}
      <div className={`absolute left-0 top-0.5 w-10 h-10 rounded-full ${bg} flex items-center justify-center border-4 border-[#FAFAFA] dark:border-[#09090B] z-10 transition-transform duration-300 group-hover:scale-110`}>
        <Icon className={`w-4 h-4 ${color}`} strokeWidth={2.5} />
      </div>

      {/* Content Card */}
      <div 
        onClick={activity.type === "apply" ? onOpen : undefined}
        className={`rounded-[20px] sm:rounded-[24px] p-4 sm:p-5 border border-black/5 dark:border-white/10 bg-white/60 dark:bg-[#1a1a1c]/60 backdrop-blur-2xl transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] ${activity.type === "apply" ? "cursor-pointer hover:-translate-y-1" : ""}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-1.5 sm:mb-1">
          <h4 className="text-[15px] sm:text-[16px] font-bold text-zinc-900 dark:text-white tracking-tight leading-snug">
            {activity.title}
          </h4>
          <span className="text-[11px] sm:text-[12px] font-semibold text-zinc-400 flex items-center gap-1.5 bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-full w-max shrink-0">
            <CalendarCheck className="w-3 h-3" /> {timeString}
          </span>
        </div>
        <p className="text-[13px] sm:text-[14px] text-zinc-500 dark:text-zinc-400 font-medium">
          {activity.subtitle}
        </p>
      </div>
    </div>
  );
}

function InsightRow({ label, value }: { label: string, value: string | number }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[13px] sm:text-[14px] font-medium text-zinc-500 dark:text-zinc-400 truncate">{label}</span>
      <span className="text-[14px] sm:text-[15px] font-bold text-zinc-900 dark:text-white shrink-0">{value}</span>
    </div>
  );
}

function MilestoneCard({ icon: Icon, color, bg, title, subtitle }: any) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${bg} flex items-center justify-center shrink-0`}>
        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${color}`} strokeWidth={2.5} />
      </div>
      <div className="min-w-0">
        <h4 className="text-[14px] sm:text-[15px] font-bold text-zinc-900 dark:text-white truncate">{title}</h4>
        <p className="text-[12px] sm:text-[13px] font-medium text-zinc-500 truncate">{subtitle}</p>
      </div>
    </div>
  );
}