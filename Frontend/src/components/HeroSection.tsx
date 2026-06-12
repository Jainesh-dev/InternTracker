import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Sparkles, ArrowUpRight, MapPin, Laptop
} from "lucide-react";

// --- THE MASTER GLASS MATERIAL COMPONENT ---
const GlassMaterial = ({ children, className = "", intensity = "medium", hover = true, isDark, onClick }: any) => {
  const variants = {
    low: isDark ? "backdrop-blur-md bg-white/[0.01]" : "backdrop-blur-md bg-white/40",
    medium: isDark ? "backdrop-blur-2xl bg-white/[0.03]" : "backdrop-blur-2xl bg-white/50",
    high: isDark ? "backdrop-blur-[60px] bg-black/40" : "backdrop-blur-[60px] bg-white/70"
  };

  return (
    <div 
      onClick={onClick}
      className={`group relative transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] 
      ${hover ? "hover:scale-[1.01] hover:-translate-y-1 active:scale-[0.98]" : ""} ${className}`}
    >
      {/* Fresnel Light Catch Edge - Enhanced for premium glass rim */}
      <div className={`absolute inset-0 rounded-[inherit] p-[1.5px] -z-10 transition-colors duration-1000 ${
        isDark ? "bg-gradient-to-br from-white/20 via-transparent to-white/5" : "bg-gradient-to-br from-white via-white/80 to-white/20"
      }`} />
      
      <div className={`relative h-full w-full rounded-[inherit] overflow-hidden border transition-all duration-1000 ${
        isDark 
          ? "border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]" 
          : "border-white/60 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),_0_12px_40px_rgba(0,0,0,0.08)]"
      } ${variants[intensity]}`}>
        {/* Subtle internal refraction highlight */}
        <div className={`absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none ${isDark ? 'opacity-10' : 'opacity-80'}`} />
        {children}
      </div>
    </div>
  );
};

// --- DATA STRUCTURES WITH BRAND EMBEDDINGS (COMPANY LOGOS) ---
const FEATURED_COHORTS = [
  { 
    id: "goog-swe", 
    company: "Google", 
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Alphabet_Logo.svg",
    role: "Software Engineering Intern", 
    location: "Bangalore, India", 
    type: "Hybrid", 
    bgGradient: "from-blue-600/20 via-purple-600/5 to-transparent" 
  },
  { 
    id: "msft-swe", 
    company: "Microsoft", 
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    role: "Core SWE Intern", 
    location: "Hyderabad, India", 
    type: "On-Site", 
    bgGradient: "from-teal-600/20 via-blue-600/5 to-transparent" 
  },
  { 
    id: "adbe-eng", 
    company: "Adobe", 
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Corporate_Logo.svg",
    role: "Engineering Intern", 
    location: "Noida, India", 
    type: "Remote", 
    bgGradient: "from-red-600/20 via-orange-600/5 to-transparent" 
  },
  { 
    id: "amzn-sde", 
    company: "Amazon", 
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    role: "SDE Intern", 
    location: "Bangalore, India", 
    type: "On-Site", 
    bgGradient: "from-orange-500/15 via-amber-600/5 to-transparent" 
  },
  { 
    id: "meta-swe", 
    company: "Meta", 
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    role: "SWE Intern", 
    location: "Remote, India", 
    type: "Remote", 
    bgGradient: "from-indigo-600/20 via-blue-600/5 to-transparent" 
  }
];

const QUICK_EXPLORE_ROWS = [
  { id: "aapl-des", company: "Apple", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", role: "Design Intern" },
  { id: "tsla-ai", company: "Tesla", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.svg", role: "AI Engineer" },
  { id: "vrcl-fe", company: "Vercel", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg", role: "Frontend Engineer" }
];

const HeroSection = ({ isDark }: { isDark: boolean }) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Auto-rotation engine inspired by Apple TV carousel loop
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % FEATURED_COHORTS.length);
        setFade(true);
      }, 400); 
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentFeatured = FEATURED_COHORTS[activeIndex];

  return (
    <section
  className="relative w-full flex flex-col items-center overflow-x-hidden overflow-y-visible pt-24 sm:pt-32 pb-12 transition-colors duration-1000"
  style={{ overflowY: "visible" }}
>
      
      {/* --- PREMIUM AMBIENT BACKDROP OPTICS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-full rounded-full blur-[120px] opacity-75 transition-colors duration-1000 ${
          isDark ? 'bg-blue-900/25' : 'bg-blue-100/40'
        }`} />
        <div className={`absolute top-[15%] right-[-15%] w-[110%] h-[90%] rounded-full blur-[140px] opacity-60 transition-colors duration-1000 ${
          isDark ? 'bg-purple-900/20' : 'bg-orange-100/30'
        }`} />
      </div>

      {/* --- RE-ENGINEERED MAXIMUM CANVAS REAL ESTATE CONTAINER (max-w-7xl) --- */}
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-8 lg:px-12 flex flex-col items-center">
        
        {/* --- EXPANDED CINEMATIC FEATURED CAROUSEL CARD LAYER --- */}
        <div className="w-full mb-8">
          <GlassMaterial 
            isDark={isDark} 
            intensity="medium" 
            className="rounded-[48px] sm:rounded-[64px] w-full group overflow-hidden cursor-pointer"
            onClick={() => navigate(`/internships/${currentFeatured.id}`)}
          >
            {/* Cinematic Gradient Backdrop Sweep */}
            <div className={`absolute inset-0 bg-gradient-to-r ${currentFeatured.bgGradient} transition-all duration-1000 mix-blend-normal pointer-events-none`} />
            
            {/* TRUE CARD SIZE EXPANSION: Generates clean spatial height across devices */}
            <div className={`p-8 sm:p-20 lg:p-28 h-[600px] sm:h-[750px] lg:h-[650px] flex flex-col justify-between relative z-10 transition-all duration-500 ${
              fade ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
            }`}>
              
              {/* SPLIT LAYOUT SYSTEM: Pushes header to left, logo completely to the right half */}
              <div className="grid lg:grid-cols-12 items-center w-full gap-8 h-full">
                
                {/* Left Area Content Context */}
                <div className="lg:col-span-7 flex flex-col justify-center relative z-20">
                  {/* Brand Identity Label + Inline Embedded Logo */}
                  <div className="flex items-center gap-4 mb-8 sm:mb-12">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center p-3 backdrop-blur-md transition-all border ${
                      isDark ? 'bg-white/10 border-white/10' : 'bg-white/60 border-white/80 shadow-sm'
                    }`}>
                      <img 
                        src={currentFeatured.logoUrl} 
                        alt={`${currentFeatured.company} Brand Logo`}
                        className={`max-w-full max-h-full object-contain ${
                          isDark && (currentFeatured.company === 'Amazon' || currentFeatured.company === 'Meta' || currentFeatured.company === 'Apple') ? 'invert' : ''
                        }`}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] sm:text-[11px] font-black tracking-[0.35em] text-blue-500 uppercase">
                        Featured Experience
                      </span>
                      <p className={`text-base font-semibold tracking-tight leading-none mt-1 transition-colors duration-1000 ${isDark ? 'text-zinc-400' : 'text-zinc-800'}`}>
                        {currentFeatured.company}
                      </p>
                    </div>
                  </div>
                  
                  {/* Scaled Typographic Header Real Estate */}
                  <h2 className={`text-4xl sm:text-6xl lg:text-[90px] font-bold tracking-tighter leading-[0.95] transition-colors duration-1000 ${isDark ? 'text-white' : 'text-black'}`}>
                    {currentFeatured.role}
                  </h2>
                </div>

                {/* Right Area Isolated Canvas Panel: Logo lives entirely separate from the Job Title */}
                <div className="hidden lg:flex lg:col-span-5 h-full items-center justify-end relative z-0 select-none">
                  <div className={`w-[85%] h-[65%] opacity-15 dark:opacity-[0.06] transition-all duration-1000 group-hover:scale-105 ${
                    isDark ? 'mix-blend-screen' : 'mix-blend-multiply'
                  }`}>
                    <img 
                      src={currentFeatured.logoUrl} 
                      alt="" 
                      className={`w-full h-full object-contain select-none pointer-events-none ${
                        isDark && (currentFeatured.company === 'Amazon' || currentFeatured.company === 'Meta' || currentFeatured.company === 'Apple') ? 'invert' : ''
                      }`}
                    />
                  </div>
                </div>

              </div>

              {/* Clean flat naked information metrics */}
              <div className="flex flex-row items-center gap-8 sm:gap-12 text-sm sm:text-base font-medium text-zinc-500 dark:text-zinc-400 relative z-10 pt-4">
                <p className="m-0 p-0 bg-transparent border-0 outline-0 shadow-none flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-500 stroke-[2.5] shrink-0" /> 
                  <span>{currentFeatured.location}</span>
                </p>
                <p className="m-0 p-0 bg-transparent border-0 outline-0 shadow-none flex items-center gap-3">
                  <Laptop className="w-5 h-5 text-purple-500 stroke-[2.5] shrink-0" /> 
                  <span>{currentFeatured.type}</span>
                </p>
              </div>

            </div>
          </GlassMaterial>
        </div>

        {/* CAROUSEL DOT INDICATORS */}
        <div className="flex items-center justify-center gap-2.5 mb-10">
          {FEATURED_COHORTS.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                index === activeIndex 
                  ? "w-10 sm:w-14 bg-blue-500" 
                  : `w-2 ${isDark ? "bg-zinc-800 hover:bg-zinc-700" : "bg-zinc-200 hover:bg-zinc-300"}`
              }`}
            />
          ))}
        </div>

        {/* --- DOWNSIZED QUICK EXPLORE PANEL --- */}
        <div className="w-full max-w-4xl space-y-4">
          {QUICK_EXPLORE_ROWS.map((row) => (
            <GlassMaterial 
              key={row.id} 
              isDark={isDark} 
              intensity="low" 
              className="rounded-[22px] w-full overflow-hidden cursor-pointer"
              onClick={() => navigate(`/internships/${row.id}`)}
            >
              <div className="px-6 sm:px-10 py-5 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center p-2.5 border backdrop-blur-md ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-white/60 border-white/80 shadow-sm'
                  }`}>
                    <img 
                      src={row.logoUrl} 
                      alt={`${row.company} Logo`} 
                      className={`max-w-full max-h-full object-contain ${
                        isDark && (row.company === 'Apple' || row.company === 'Vercel') ? 'invert' : ''
                      }`}
                    />
                  </div>
                  <div>
                    <p className={`text-sm sm:text-base font-bold tracking-tight transition-colors ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                      {row.company}
                    </p>
                    <p className="text-xs text-zinc-400 font-normal mt-0.5">
                      {row.role}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-zinc-300 group-hover:text-blue-500 dark:group-hover:text-zinc-900 transition-colors duration-300" />
              </div>
            </GlassMaterial>
          ))}
        </div>

        {/* --- OPEN PLACEMENTS BUTTON --- */}
        <div className="relative group/btn mt-6">
          {/* Hardware Ambient Underglow */}
          <div className={`absolute inset-0 rounded-full blur-xl opacity-0 group-hover/btn:opacity-100 transition-all duration-500 -z-10 ${
            isDark ? "bg-blue-500/10" : "bg-black/5"
          }`} />

          <button
            onClick={() => navigate("/internships")}
            className={`py-4 px-12 rounded-full text-xs sm:text-sm font-bold tracking-tight transition-all duration-300 active:scale-[0.98] border relative overflow-hidden flex items-center justify-center gap-2 group-hover/btn:-translate-y-0.5 ${
              isDark
                ? "bg-white text-black border-zinc-200 hover:bg-zinc-100 shadow-[0_15px_30px_rgba(255,255,255,0.02)]"
                : "bg-zinc-950 text-white border-zinc-900 hover:bg-zinc-900 shadow-[0_15px_30px_rgba(0,0,0,0.12)]"
            }`}
          >
            {/* Glossy Hardware Reflection Line */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_ease-out]" />
            
            <span className="relative z-10 flex items-center gap-1.5">
              Explore All Open Placements
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;