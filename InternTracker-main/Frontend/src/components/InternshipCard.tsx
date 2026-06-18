import React from "react";
import { MapPin, Calendar, ExternalLink, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Adjust these imports based on your actual file structure
import { Internship } from "@/data/internships";
import SaveButton from "./SaveButton";

const colorMap: Record<string, string> = {
  G: "bg-blue-500", 
  M: "bg-green-500", 
  A: "bg-gray-800 dark:bg-white dark:text-black", 
  N: "bg-red-500", 
  S: "bg-indigo-500", 
  U: "bg-zinc-900", 
  F: "bg-blue-400", 
  O: "bg-orange-500",
};

const typeBadge: Record<string, string> = {
  Remote: "bg-green-500/10 text-green-600 dark:text-green-400",
  "On-site": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Hybrid: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
};

const InternshipCard = ({ internship }: { internship: Internship }) => {
  const bg = colorMap[internship.logo] || "bg-gradient-to-br from-zinc-700 to-black";
  const badge = typeBadge[internship.type] || "";
  const navigate = useNavigate();

  const applied = JSON.parse(localStorage.getItem("applied") || "[]").some(
    (item: any) => item.id === internship.id
  );

  return (
    <div
      onClick={(e) => {
        const target = e.target as HTMLElement;
        // 🚫 Prevent navigation if clicking button or save icon
        if (target.closest("button")) return;
        navigate(`/internships/${internship.id}`);
      }}
      className="group relative rounded-[28px] border border-black/5 dark:border-white/10 bg-white/60 dark:bg-[#1a1a1c]/60 backdrop-blur-2xl p-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.08)] hover:-translate-y-1 cursor-pointer overflow-hidden flex flex-col h-full"
    >
      {/* Subtle Apple-style inner glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none" />

      {/* TOP SECTION */}
      <div className="relative flex items-start gap-4 mb-5">
        <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center text-xl font-bold text-white shadow-sm`}>
          {internship.logo}
        </div>

        <div className="flex-1 min-w-0 mt-1">
          <h3 className="font-semibold text-[17px] tracking-tight text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {internship.role}
          </h3>
          <p className="text-[15px] text-zinc-500 dark:text-zinc-400 mt-0.5">
            {internship.company}
          </p>
        </div>

        {/* SAVE BUTTON */}
        <div onClick={(e) => e.stopPropagation()} className="relative z-10 -mt-1 -mr-1">
          <SaveButton id={internship.id} />
        </div>
      </div>

      {/* META SECTION */}
      <div className="flex flex-wrap items-center gap-2 mb-8 text-[13px] font-medium">
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-300">
          <MapPin className="h-3.5 w-3.5" /> {internship.location}
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-300">
          <Calendar className="h-3.5 w-3.5" /> {internship.postedDate}
        </span>
        <span className={`px-3 py-1.5 rounded-full ${badge}`}>
          {internship.type}
        </span>
      </div>

      {/* APPLY SECTION */}
      <div className="mt-auto" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => {
            window.open(internship.applyLink, "_blank");
            const existing = JSON.parse(localStorage.getItem("applied") || "[]");
            if (!existing.find((item: any) => item.id === internship.id)) {
              existing.push({ id: internship.id, date: new Date().toISOString() });
              localStorage.setItem("applied", JSON.stringify(existing));
            }
          }}
          className={`w-full rounded-[18px] py-3.5 text-[15px] font-semibold flex items-center justify-center gap-2 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.97] ${
            applied
              ? "bg-green-500/10 text-green-600 dark:text-green-400"
              : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 shadow-sm hover:shadow-md"
          }`}
        >
          {applied ? "Applied ✓" : "Apply Now"}
          {!applied && <ExternalLink className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
};

export default InternshipCard;