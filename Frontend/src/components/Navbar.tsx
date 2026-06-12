import React, { useState, useEffect, useRef } from "react";
import { 
  Search, Menu, X, Rocket, Sun, Moon, Bell, User, 
  Bookmark, LayoutDashboard, Settings, History, Upload, LogOut 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { internships } from "../data/internships";

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Navbar = ({ isDark, toggleTheme, searchQuery, onSearchChange }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const profileRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // --- CLICK AWAY & ESCAPE HANDLERS ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setOpenProfile(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem("resume", reader.result as string);
      setOpenProfile(false);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredInternships = internships.filter(
    (i) =>
      i.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 8);

  return (
    <>
      {/* SPOTLIGHT SEARCH MODAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[200] flex justify-center pt-[15vh] px-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[8px]" onClick={() => setIsSearchOpen(false)} />
          <div className={`relative w-full max-w-xl h-max rounded-3xl p-3 shadow-2xl border backdrop-blur-2xl ${isDark ? "bg-[#1C1C1E]/90 border-white/10" : "bg-white/90 border-black/5"}`}>
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-zinc-400" />
              <input
                autoFocus
                type="text"
                placeholder="Search internships, companies, or roles..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className={`w-full pl-12 pr-4 py-4 bg-transparent outline-none text-lg ${isDark ? "text-white placeholder:text-zinc-600" : "text-black placeholder:text-zinc-400"}`}
              />
              <button onClick={() => setIsSearchOpen(false)} className="px-4 py-1.5 text-xs font-semibold rounded-xl bg-zinc-200/50 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all active:scale-95">ESC</button>
            </div>
            <div className="mt-2 max-h-[400px] overflow-y-auto">
              {filteredInternships.length > 0 ? (
                filteredInternships.map((internship) => (
                  <button key={internship.id} onClick={() => { navigate(`/internships/${internship.id}`); setIsSearchOpen(false); }} className="w-full text-left px-4 py-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                    <div className="font-semibold">{internship.company}</div>
                    <div className="text-sm text-zinc-500">{internship.role}</div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-zinc-500">No results found</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* NAV CONTENT */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ${scrolled ? (isDark ? "py-3 bg-black/40 backdrop-blur-3xl border-b border-white/10 shadow-2xl" : "py-3 bg-white/40 backdrop-blur-3xl border-b border-black/[0.05] shadow-lg") : "py-6 bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <div onClick={() => navigate("/")} className="flex items-center gap-3 cursor-pointer group shrink-0">
            <div className={`p-2 rounded-[14px] transition-all shadow-lg ${isDark ? "bg-white text-black" : "bg-black text-white"}`}>
              <Rocket className="h-5 w-5" />
            </div>
            <span className={`font-semibold text-xl tracking-tighter ${isDark ? "text-white" : "text-[#1D1D1F]"}`}>Intern<span className="text-blue-500">Tracker</span></span>
          </div>

          <div className="flex items-center gap-1 md:gap-2" ref={profileRef}>
            <button onClick={() => setIsSearchOpen(true)} className={`p-2.5 rounded-full transition-colors ${isDark ? "text-gray-400 hover:bg-white/10" : "text-gray-600 hover:bg-black/5"}`}>
              <Search className="h-5 w-5" />
            </button>
            <button className={`hidden sm:flex relative p-2.5 rounded-full transition-colors ${isDark ? "text-gray-400 hover:bg-white/10" : "text-gray-600 hover:bg-black/5"}`}>
              <Bell className="h-5 w-5" />
            </button>
            <button onClick={toggleTheme} className={`p-2.5 rounded-full transition-colors ${isDark ? "text-yellow-400 hover:bg-white/10" : "text-blue-600 hover:bg-black/5"}`}>
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button onClick={() => setOpenProfile(!openProfile)} className="p-2 rounded-full transition-colors">
              <div className={`w-9 h-9 rounded-full border flex items-center justify-center ${isDark ? "bg-white/5 border-white/20" : "bg-gray-100 border-gray-300"}`}>
                <User className="h-5 w-5" />
              </div>
            </button>

            {openProfile && (
              <div className={`absolute top-20 right-6 w-56 rounded-3xl shadow-2xl backdrop-blur-2xl border p-2 z-50 ${isDark ? "bg-black/80 border-white/10" : "bg-white/90 border-black/10"}`}>
                <button onClick={() => { navigate("/dashboard"); setOpenProfile(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl hover:bg-black/5 dark:hover:bg-white/10"><LayoutDashboard className="h-4 w-4 text-purple-500" /> Dashboard</button>
                <button onClick={() => { navigate("/saved"); setOpenProfile(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl hover:bg-black/5 dark:hover:bg-white/10"><Bookmark className="h-4 w-4 text-blue-500" /> Saved</button>
                <button onClick={() => { navigate("/history"); setOpenProfile(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl hover:bg-black/5 dark:hover:bg-white/10"><History className="h-4 w-4 text-orange-500" /> History</button>
                <button onClick={() => fileInputRef.current?.click()} className="w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl hover:bg-black/5 dark:hover:bg-white/10"><Upload className="h-4 w-4 text-emerald-500" /> Resume Vault</button>
                <input type="file" ref={fileInputRef} onChange={handleResumeUpload} className="hidden" />
                <div className="border-t border-black/10 dark:border-white/10 my-1" />
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 rounded-xl hover:bg-red-500/10"><LogOut className="h-4 w-4" /> Sign Out</button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;