import { SearchX } from "lucide-react";

const EmptyState = ({ onClear }: { onClear: () => void }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
      <SearchX className="h-7 w-7 text-muted-foreground" />
    </div>
    <h3 className="font-display text-lg font-semibold text-foreground mb-1">No internships found</h3>
    <p className="text-sm text-muted-foreground mb-4 max-w-xs">
      Try adjusting your filters or search query to find what you're looking for.
    </p>
    <button onClick={onClear} className="text-sm font-medium text-primary hover:underline">
      Clear all filters
    </button>
  </div>
);

export default EmptyState;
