import { Filter, X, ChevronDown } from "lucide-react";
import { locations, companies, categories, workTypes } from "@/data/internships";

export interface Filters {
  location: string;
  company: string;
  category: string;
  workType: string;
}

interface FilterPanelProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  mobileOpen: boolean;
  onToggleMobile: () => void;
}

const SelectFilter = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) => (
  <div>
    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl bg-secondary/70 text-foreground text-sm px-3.5 py-2.5 pr-8 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 appearance-none cursor-pointer transition-all"
      >
        <option value="">All</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
    </div>
  </div>
);

const FilterPanel = ({ filters, onChange, mobileOpen, onToggleMobile }: FilterPanelProps) => {
  const update = (key: keyof Filters, val: string) => onChange({ ...filters, [key]: val });
  const activeCount = Object.values(filters).filter(Boolean).length;

  const clearAll = () => onChange({ location: "", company: "", category: "", workType: "" });

  const content = (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-foreground text-sm flex items-center gap-2">
          <Filter className="h-4 w-4 text-primary" /> Filters
          {activeCount > 0 && (
            <span className="hero-gradient text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </h3>
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-xs font-medium text-primary hover:text-accent transition-colors">
            Reset
          </button>
        )}
      </div>
      <SelectFilter label="Location" value={filters.location} options={locations} onChange={(v) => update("location", v)} />
      <SelectFilter label="Company" value={filters.company} options={companies} onChange={(v) => update("company", v)} />
      <SelectFilter label="Category" value={filters.category} options={categories} onChange={(v) => update("category", v)} />
      <SelectFilter label="Work Type" value={filters.workType} options={workTypes} onChange={(v) => update("workType", v)} />
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={onToggleMobile}
        className="lg:hidden flex items-center gap-2 text-sm font-semibold text-foreground glass-strong border border-border/60 rounded-xl px-4 py-2.5 mb-4 hover:border-primary/30 transition-all"
      >
        <Filter className="h-4 w-4 text-primary" /> Filters
        {activeCount > 0 && (
          <span className="hero-gradient text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm" onClick={onToggleMobile}>
          <div
            className="absolute right-0 top-0 h-full w-72 bg-card p-6 shadow-2xl animate-slide-up overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onToggleMobile} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-5 w-5" />
            </button>
            {content}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-60 shrink-0">
        <div className="sticky top-24 bg-card rounded-2xl card-shadow border border-border/60 p-5">
          {content}
        </div>
      </aside>
    </>
  );
};

export default FilterPanel;
